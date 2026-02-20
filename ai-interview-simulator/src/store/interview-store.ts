import { create } from "zustand"
import type { InterviewConfig, InterviewSession, InterviewAnswer, InterviewStatus } from "@/types/interview"
import type { AnswerScore, InterviewReport, HiringRecommendation } from "@/types/scoring"
import type { ConfidenceMetrics } from "@/types/analysis"
import { generateQuestions } from "@/data/question-bank"
import { generateMockScoreAsync } from "@/services/ai-scoring-service"
import { generateMockConfidence } from "@/services/confidence-analyzer"
import { detectBiasPatterns } from "@/services/bias-reduction"
import { getRecommendationLevel } from "@/lib/utils"

interface InterviewStore {
  // Session state
  session: InterviewSession | null
  config: InterviewConfig
  status: InterviewStatus
  apiKey: string

  // Results
  scores: AnswerScore[]
  confidenceMetrics: ConfidenceMetrics[]
  report: InterviewReport | null

  // Actions
  setConfig: (config: Partial<InterviewConfig>) => void
  setApiKey: (key: string) => void
  startInterview: () => void
  submitAnswer: (answer: InterviewAnswer) => void
  nextQuestion: () => void
  completeInterview: () => Promise<void>
  generateReport: () => void
  reset: () => void
}

const defaultConfig: InterviewConfig = {
  role: "frontend",
  type: "mixed",
  difficulty: "mid",
  timePerQuestion: 120,
  totalQuestions: 5,
}

export const useInterviewStore = create<InterviewStore>((set, get) => ({
  session: null,
  config: defaultConfig,
  status: "idle",
  apiKey: "",
  scores: [],
  confidenceMetrics: [],
  report: null,

  setConfig: (partial) => set((state) => ({ config: { ...state.config, ...partial } })),
  setApiKey: (key) => set({ apiKey: key }),

  startInterview: () => {
    const { config } = get()
    const questions = generateQuestions(
      config.role,
      config.difficulty,
      config.type,
      config.totalQuestions,
      config.timePerQuestion
    )

    const session: InterviewSession = {
      id: `session-${Date.now()}`,
      config,
      questions,
      answers: [],
      currentQuestionIndex: 0,
      status: "in-progress",
      startedAt: Date.now(),
    }

    set({ session, status: "in-progress", scores: [], confidenceMetrics: [], report: null })
  },

  submitAnswer: (answer) => {
    const { session } = get()
    if (!session) return

    const confidence = generateMockConfidence()
    set((state) => ({
      session: state.session
        ? { ...state.session, answers: [...state.session.answers, answer] }
        : null,
      confidenceMetrics: [...state.confidenceMetrics, confidence],
    }))
  },

  nextQuestion: () => {
    set((state) => {
      if (!state.session) return state
      const nextIdx = state.session.currentQuestionIndex + 1
      if (nextIdx >= state.session.questions.length) {
        return { status: "processing" }
      }
      return {
        session: { ...state.session, currentQuestionIndex: nextIdx },
      }
    })
  },

  completeInterview: async () => {
    const { session } = get()
    if (!session) return

    set({ status: "processing" })

    // Score each answer
    const scores: AnswerScore[] = []
    for (const question of session.questions) {
      const score = await generateMockScoreAsync(question.id)
      scores.push(score)
    }

    set({
      scores,
      session: { ...session, status: "completed", completedAt: Date.now() },
    })

    // Generate report
    get().generateReport()
    set({ status: "completed" })
  },

  generateReport: () => {
    const { session, scores, confidenceMetrics } = get()
    if (!session || scores.length === 0) return

    const biasFlags = detectBiasPatterns(scores)
    const avgScore = scores.reduce((sum, s) => sum + s.overallScore, 0) / scores.length
    const avgConfidence =
      confidenceMetrics.length > 0
        ? confidenceMetrics.reduce((sum, c) => sum + c.overall, 0) / confidenceMetrics.length
        : 65

    // Determine trend
    const confTrend = confidenceMetrics.map((c) => c.overall)
    let trend: "improving" | "declining" | "stable" = "stable"
    if (confTrend.length >= 2) {
      const firstHalf = confTrend.slice(0, Math.floor(confTrend.length / 2))
      const secondHalf = confTrend.slice(Math.floor(confTrend.length / 2))
      const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
      const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
      if (secondAvg - firstAvg > 5) trend = "improving"
      else if (firstAvg - secondAvg > 5) trend = "declining"
    }

    // Find lowest confidence point
    const lowestConf = confTrend.reduce(
      (lowest, score, idx) =>
        score < lowest.score ? { questionIndex: idx, score } : lowest,
      { questionIndex: 0, score: 100 }
    )

    // Collect strengths and weaknesses
    const allDimensions = scores.flatMap((s) => s.dimensions)
    const dimAverages = new Map<string, number[]>()
    for (const dim of allDimensions) {
      const existing = dimAverages.get(dim.dimension) || []
      existing.push(dim.score)
      dimAverages.set(dim.dimension, existing)
    }

    const strengths: string[] = []
    const weaknesses: string[] = []
    for (const [dim, vals] of dimAverages) {
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length
      if (avg >= 3.5) strengths.push(`Strong ${dim} skills (avg: ${avg.toFixed(1)}/5)`)
      else if (avg < 2.5) weaknesses.push(`Needs improvement in ${dim} (avg: ${avg.toFixed(1)}/5)`)
    }

    const rec = getRecommendationLevel(avgScore)
    let recommendation: HiringRecommendation = "no-hire"
    if (rec.label === "Strong Hire") recommendation = "strong-hire"
    else if (rec.label === "Hire") recommendation = "hire"
    else if (rec.label === "Strong No Hire") recommendation = "strong-no-hire"

    const report: InterviewReport = {
      sessionId: session.id,
      overallScore: Math.round(avgScore * 10) / 10,
      recommendation,
      answerScores: scores.map((s) => ({
        ...s,
        biasFlags: [...s.biasFlags, ...biasFlags.filter((_, i) => i < 1)],
      })),
      strengths,
      weaknesses,
      riskFactors: biasFlags.map((f) => f.description),
      improvementAreas: scores
        .flatMap((s) => s.dimensions)
        .filter((d) => d.score <= 2)
        .flatMap((d) => d.suggestions),
      fillerWordSummary: {
        totalFillerWords: Math.floor(Math.random() * 20) + 5,
        fillerWordRate: Math.random() * 8 + 2,
        mostCommon: [
          { word: "um", count: Math.floor(Math.random() * 8) + 2 },
          { word: "like", count: Math.floor(Math.random() * 6) + 1 },
          { word: "basically", count: Math.floor(Math.random() * 4) + 1 },
        ],
      },
      confidenceSummary: {
        averageConfidence: Math.round(avgConfidence),
        trend,
        lowestPoint: lowestConf,
      },
    }

    set({ report })
  },

  reset: () =>
    set({
      session: null,
      status: "idle",
      scores: [],
      confidenceMetrics: [],
      report: null,
    }),
}))
