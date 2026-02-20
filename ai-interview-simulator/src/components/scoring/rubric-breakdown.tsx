import { motion } from "framer-motion"
import type { AnswerScore, ScoreDimension } from "@/types/scoring"
import { getScoreColor } from "@/lib/utils"
import { scoringRubrics } from "@/data/rubrics"
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

interface RubricBreakdownProps {
  scores: AnswerScore[]
}

export function RubricBreakdown({ scores }: RubricBreakdownProps) {
  const dimensions: ScoreDimension[] = ["correctness", "depth", "communication", "problem-solving", "relevance"]

  const averages = dimensions.map((dim) => {
    const rubric = scoringRubrics.find((r) => r.dimension === dim)
    const dimScores = scores.flatMap((s) =>
      s.dimensions.filter((d) => d.dimension === dim).map((d) => d.score)
    )
    const avg = dimScores.length > 0 ? dimScores.reduce((a, b) => a + b, 0) / dimScores.length : 0
    return {
      dimension: dim,
      label: rubric?.label || dim,
      description: rubric?.description || "",
      average: Math.round(avg * 10) / 10,
    }
  })

  const getIcon = (score: number) => {
    if (score >= 4) return <CheckCircle2 className="h-5 w-5 text-emerald-400" />
    if (score >= 3) return <CheckCircle2 className="h-5 w-5 text-yellow-400" />
    if (score >= 2) return <AlertTriangle className="h-5 w-5 text-orange-400" />
    return <XCircle className="h-5 w-5 text-rose-400" />
  }

  const getGradient = (score: number) => {
    if (score >= 4) return "from-emerald-500 to-emerald-600"
    if (score >= 3) return "from-yellow-500 to-amber-500"
    if (score >= 2) return "from-orange-500 to-amber-600"
    return "from-rose-500 to-rose-600"
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-zinc-100">Rubric Breakdown</h3>
        <span className="text-xs text-zinc-500">5 dimensions evaluated</span>
      </div>
      <div className="space-y-5">
        {averages.map((item, i) => (
          <motion.div
            key={item.dimension}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(item.average)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-semibold text-zinc-200">{item.label}</span>
                    <p className="text-xs text-zinc-500 mt-0.5">{item.description}</p>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(item.average)}`}>
                    {item.average}
                    <span className="text-sm text-zinc-500">/5</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800/80 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${getGradient(item.average)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.average / 5) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
