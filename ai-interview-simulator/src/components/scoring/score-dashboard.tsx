import { motion } from "framer-motion"
import { useInterviewStore } from "@/store/interview-store"
import { BentoGrid, BentoCard } from "@/components/layout/bento-grid"
import { RadarChart } from "./radar-chart"
import { RubricBreakdown } from "./rubric-breakdown"
import { FillerWordAnalysis } from "./filler-word-analysis"
import { BiasIndicator } from "./bias-indicator"
import { ScoreExplainability } from "./score-explainability"
import { HiringRecommendation } from "@/components/report/hiring-recommendation"
import { AnswerReview } from "@/components/report/answer-review"
import { getScoreColor, getRecommendationLevel } from "@/lib/utils"
import { generateMockScore } from "@/services/ai-scoring-service"
import { Trophy, TrendingUp, AlertCircle, RotateCcw } from "lucide-react"
import { Link } from "react-router-dom"

export function ScoreDashboard() {
  const { report, session, scores, confidenceMetrics, reset } = useInterviewStore()

  // Generate demo data if no report
  const displayReport = report || generateDemoReport()
  const displayScores = scores.length > 0 ? scores : generateDemoScores()

  const rec = getRecommendationLevel(displayReport.overallScore)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2">
            Interview <span className="gradient-text">Results</span>
          </h1>
          <p className="text-zinc-400">
            {session ? `${session.config.role} • ${session.config.difficulty} level • ${session.questions.length} questions` : "Demo results showcase"}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/setup"
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-sm text-zinc-300"
          >
            <RotateCcw className="h-4 w-4" />
            New Interview
          </Link>
        </div>
      </motion.div>

      {/* Top Score Cards */}
      <BentoGrid className="lg:grid-cols-4">
        <BentoCard colSpan={1} delay={0} glowColor="emerald">
          <Trophy className="h-6 w-6 text-emerald-400 mb-3" />
          <div className="text-xs text-zinc-500 mb-1">Overall Score</div>
          <div className={`text-3xl font-bold ${getScoreColor(displayReport.overallScore)}`}>
            {displayReport.overallScore}
            <span className="text-sm text-zinc-500">/5</span>
          </div>
        </BentoCard>

        <BentoCard colSpan={1} delay={0.05}>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${rec.color} ${rec.bgColor} mb-3`}>
            {rec.label}
          </div>
          <div className="text-xs text-zinc-500 mb-1">Recommendation</div>
          <div className="text-sm text-zinc-300">{displayReport.recommendation.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</div>
        </BentoCard>

        <BentoCard colSpan={1} delay={0.1}>
          <TrendingUp className="h-6 w-6 text-violet-400 mb-3" />
          <div className="text-xs text-zinc-500 mb-1">Confidence</div>
          <div className="text-3xl font-bold text-violet-400">
            {displayReport.confidenceSummary.averageConfidence}
            <span className="text-sm text-zinc-500">%</span>
          </div>
          <div className="text-xs text-zinc-500 capitalize">{displayReport.confidenceSummary.trend}</div>
        </BentoCard>

        <BentoCard colSpan={1} delay={0.15}>
          <AlertCircle className="h-6 w-6 text-rose-400 mb-3" />
          <div className="text-xs text-zinc-500 mb-1">Filler Words</div>
          <div className="text-3xl font-bold text-rose-400">
            {displayReport.fillerWordSummary.totalFillerWords}
          </div>
          <div className="text-xs text-zinc-500">{displayReport.fillerWordSummary.fillerWordRate.toFixed(1)}/min</div>
        </BentoCard>
      </BentoGrid>

      {/* Main Analysis */}
      <BentoGrid className="lg:grid-cols-3">
        <BentoCard colSpan={1} delay={0.2} glowColor="violet" className="min-h-[350px]">
          <RadarChart scores={displayScores} />
        </BentoCard>

        <BentoCard colSpan={2} delay={0.25}>
          <RubricBreakdown scores={displayScores} />
        </BentoCard>
      </BentoGrid>

      {/* Secondary Analysis */}
      <BentoGrid className="lg:grid-cols-3">
        <BentoCard colSpan={1} delay={0.3}>
          <FillerWordAnalysis report={displayReport} />
        </BentoCard>

        <BentoCard colSpan={1} delay={0.35}>
          <BiasIndicator scores={displayScores} />
        </BentoCard>

        <BentoCard colSpan={1} delay={0.4} glowColor="emerald">
          <ScoreExplainability scores={displayScores} />
        </BentoCard>
      </BentoGrid>

      {/* Hiring Recommendation */}
      <HiringRecommendation report={displayReport} />

      {/* Answer Review */}
      <AnswerReview
        scores={displayScores}
        questions={session?.questions}
        answers={session?.answers}
      />
    </div>
  )
}

// Demo data generators for the portfolio showcase
function generateDemoReport() {
  return {
    sessionId: "demo-session",
    overallScore: 3.6,
    recommendation: "hire" as const,
    answerScores: [],
    strengths: [
      "Strong communication skills (avg: 4.0/5)",
      "Strong problem-solving skills (avg: 3.8/5)",
    ],
    weaknesses: [
      "Needs improvement in depth (avg: 2.4/5)",
    ],
    riskFactors: [],
    improvementAreas: [
      "Explore edge cases and discuss how the solution scales.",
      "Present multiple approaches before choosing one.",
    ],
    fillerWordSummary: {
      totalFillerWords: 14,
      fillerWordRate: 4.7,
      mostCommon: [
        { word: "um", count: 5 },
        { word: "like", count: 4 },
        { word: "basically", count: 3 },
        { word: "you know", count: 2 },
      ],
    },
    confidenceSummary: {
      averageConfidence: 72,
      trend: "improving" as const,
      lowestPoint: { questionIndex: 1, score: 58 },
    },
  }
}

function generateDemoScores() {
  return Array.from({ length: 5 }, (_, i) => generateMockScore(`demo-q-${i}`))
}
