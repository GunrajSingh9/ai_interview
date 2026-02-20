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
import { Trophy, TrendingUp, AlertCircle, RotateCcw, Sparkles, Target, Zap, Clock } from "lucide-react"
import { Link } from "react-router-dom"

export function ScoreDashboard() {
  const { report, session, scores, confidenceMetrics, reset } = useInterviewStore()

  const displayReport = report || generateDemoReport()
  const displayScores = scores.length > 0 ? scores : generateDemoScores()

  const rec = getRecommendationLevel(displayReport.overallScore)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-4">
          <Sparkles className="h-4 w-4" />
          Interview Complete
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-3">
          Your <span className="gradient-text">Results</span>
        </h1>
        <p className="text-zinc-400 max-w-md mx-auto">
          {session ? `${session.config.role} • ${session.config.difficulty} level • ${session.questions.length} questions` : "Demo results showcase"}
        </p>
      </motion.div>

      <BentoGrid className="lg:grid-cols-4">
        <BentoCard colSpan={1} delay={0} glowColor="emerald" className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 mb-4">
            <Trophy className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Overall Score</div>
          <div className={`text-5xl font-bold ${getScoreColor(displayReport.overallScore)} mb-1`}>
            {displayReport.overallScore}
          </div>
          <div className="text-sm text-zinc-500">out of 5</div>
          <div className="mt-4 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(displayReport.overallScore / 5) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </BentoCard>

        <BentoCard colSpan={1} delay={0.05} className="text-center">
          <div className={`inline-block px-4 py-2 rounded-xl text-sm font-bold ${rec.color} ${rec.bgColor} mb-4 border ${rec.color.replace('text-', 'border-')}/20`}>
            {rec.label}
          </div>
          <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Recommendation</div>
          <div className="text-xl font-semibold text-zinc-200 capitalize">
            {displayReport.recommendation.replace(/-/g, " ")}
          </div>
          <div className="mt-4 text-xs text-zinc-500">
            Based on {displayReport.answerScores?.length || scores.length} evaluated answers
          </div>
        </BentoCard>

        <BentoCard colSpan={1} delay={0.1} className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 mb-4">
            <TrendingUp className="h-6 w-6 text-violet-400" />
          </div>
          <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Confidence</div>
          <div className="text-5xl font-bold text-violet-400 mb-1">
            {displayReport.confidenceSummary.averageConfidence}
          </div>
          <div className="text-sm text-zinc-500">percent</div>
          <div className={`mt-4 inline-flex items-center gap-1.5 text-xs ${
            displayReport.confidenceSummary.trend === 'improving' ? 'text-emerald-400' :
            displayReport.confidenceSummary.trend === 'declining' ? 'text-rose-400' :
            'text-zinc-400'
          }`}>
            <TrendingUp className={`h-3 w-3 ${displayReport.confidenceSummary.trend === 'declining' ? 'rotate-180' : ''}`} />
            {displayReport.confidenceSummary.trend}
          </div>
        </BentoCard>

        <BentoCard colSpan={1} delay={0.15} className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 mb-4">
            <AlertCircle className="h-6 w-6 text-rose-400" />
          </div>
          <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Filler Words</div>
          <div className="text-5xl font-bold text-rose-400 mb-1">
            {displayReport.fillerWordSummary.totalFillerWords}
          </div>
          <div className="text-sm text-zinc-500">total</div>
          <div className="mt-4 text-xs text-zinc-500">
            {displayReport.fillerWordSummary.fillerWordRate.toFixed(1)} per minute
          </div>
        </BentoCard>
      </BentoGrid>

      <BentoGrid className="lg:grid-cols-3">
        <BentoCard colSpan={1} delay={0.2} glowColor="violet" className="min-h-[350px]">
          <RadarChart scores={displayScores} />
        </BentoCard>

        <BentoCard colSpan={2} delay={0.25}>
          <RubricBreakdown scores={displayScores} />
        </BentoCard>
      </BentoGrid>

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

      <HiringRecommendation report={displayReport} />

      <AnswerReview
        scores={displayScores}
        questions={session?.questions}
        answers={session?.answers}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center pt-4"
      >
        <Link
          to="/setup"
          onClick={reset}
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-lg hover:bg-emerald-400 transition-all duration-200 shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)] hover:shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)]"
        >
          <RotateCcw className="h-5 w-5" />
          Start New Interview
        </Link>
      </motion.div>
    </div>
  )
}

function generateDemoReport() {
  return {
    sessionId: "demo-session",
    overallScore: 4.2,
    recommendation: "hire" as const,
    answerScores: [],
    strengths: [
      "Strong communication skills (avg: 4.5/5)",
      "Strong problem-solving skills (avg: 4.2/5)",
      "Excellent technical correctness (avg: 4.0/5)",
    ],
    weaknesses: [],
    riskFactors: [],
    improvementAreas: [
      "Continue deepening knowledge of edge cases and advanced concepts.",
      "Add more discussion of performance implications.",
    ],
    fillerWordSummary: {
      totalFillerWords: 8,
      fillerWordRate: 2.7,
      mostCommon: [
        { word: "um", count: 3 },
        { word: "like", count: 2 },
        { word: "basically", count: 2 },
        { word: "you know", count: 1 },
      ],
    },
    confidenceSummary: {
      averageConfidence: 82,
      trend: "improving" as const,
      lowestPoint: { questionIndex: 1, score: 72 },
    },
  }
}

function generateDemoScores() {
  return Array.from({ length: 5 }, (_, i) => generateMockScore(`demo-q-${i}`))
}
