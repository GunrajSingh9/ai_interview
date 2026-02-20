import { motion } from "framer-motion"
import type { AnswerScore, ScoreDimension } from "@/types/scoring"
import { getScoreColor } from "@/lib/utils"
import { scoringRubrics } from "@/data/rubrics"

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

  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">Rubric Breakdown</h3>
      <div className="space-y-4">
        {averages.map((item, i) => (
          <motion.div
            key={item.dimension}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className="text-sm font-medium text-zinc-200">{item.label}</span>
                <span className="text-xs text-zinc-500 ml-2">{item.description}</span>
              </div>
              <span className={`text-sm font-bold ${getScoreColor(item.average)}`}>
                {item.average}/5
              </span>
            </div>
            <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  item.average >= 4 ? "bg-emerald-400" :
                  item.average >= 3 ? "bg-yellow-400" :
                  item.average >= 2 ? "bg-orange-400" :
                  "bg-rose-400"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${(item.average / 5) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
