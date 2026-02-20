import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import type { AnswerScore } from "@/types/scoring"
import { getScoreColor } from "@/lib/utils"

interface ScoreExplainabilityProps {
  scores: AnswerScore[]
}

export function ScoreExplainability({ scores }: ScoreExplainabilityProps) {
  const [expandedDim, setExpandedDim] = useState<string | null>(null)

  // Take the first score as representative
  const score = scores[0]
  if (!score) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-4 w-4 text-yellow-400" />
        <h3 className="text-sm font-semibold text-zinc-300">Why These Scores?</h3>
      </div>

      <div className="space-y-2">
        {score.dimensions.map((dim) => (
          <div key={dim.dimension} className="rounded-lg bg-zinc-900/30">
            <button
              onClick={() => setExpandedDim(expandedDim === dim.dimension ? null : dim.dimension)}
              className="w-full flex items-center justify-between p-3 text-left"
            >
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${getScoreColor(dim.score)}`}>
                  {dim.score}
                </span>
                <span className="text-xs text-zinc-300 capitalize">
                  {dim.dimension.replace("-", " ")}
                </span>
              </div>
              {expandedDim === dim.dimension ? (
                <ChevronUp className="h-3 w-3 text-zinc-500" />
              ) : (
                <ChevronDown className="h-3 w-3 text-zinc-500" />
              )}
            </button>

            <AnimatePresence>
              {expandedDim === dim.dimension && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 space-y-2">
                    <p className="text-xs text-zinc-400">{dim.explanation}</p>
                    {dim.evidence.length > 0 && (
                      <div>
                        <p className="text-xs text-zinc-500 font-medium mb-1">Evidence:</p>
                        {dim.evidence.map((e, i) => (
                          <p key={i} className="text-xs text-zinc-400 italic pl-2 border-l border-zinc-700">
                            "{e}"
                          </p>
                        ))}
                      </div>
                    )}
                    {dim.suggestions.length > 0 && (
                      <div>
                        <p className="text-xs text-emerald-400/70 font-medium mb-1">To improve:</p>
                        {dim.suggestions.map((s, i) => (
                          <p key={i} className="text-xs text-zinc-400">• {s}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
