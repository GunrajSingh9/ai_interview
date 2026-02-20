import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, ChevronDown, ChevronUp, Quote, Sparkles } from "lucide-react"
import type { AnswerScore } from "@/types/scoring"
import { getScoreColor } from "@/lib/utils"

interface ScoreExplainabilityProps {
  scores: AnswerScore[]
}

export function ScoreExplainability({ scores }: ScoreExplainabilityProps) {
  const [expandedDim, setExpandedDim] = useState<string | null>(null)

  const score = scores[0]
  if (!score) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 rounded-lg bg-yellow-500/10">
          <Lightbulb className="h-4 w-4 text-yellow-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-100">Score Breakdown</h3>
      </div>

      <div className="space-y-2">
        {score.dimensions.map((dim, i) => (
          <motion.div
            key={dim.dimension}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-zinc-900/40 border border-zinc-800/50 overflow-hidden"
          >
            <button
              onClick={() => setExpandedDim(expandedDim === dim.dimension ? null : dim.dimension)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-zinc-800/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`text-xl font-bold ${getScoreColor(dim.score)}`}>
                  {dim.score}
                </span>
                <span className="text-sm text-zinc-200 capitalize font-medium">
                  {dim.dimension.replace("-", " ")}
                </span>
              </div>
              <div className={`p-1 rounded transition-colors ${expandedDim === dim.dimension ? 'bg-zinc-800' : ''}`}>
                {expandedDim === dim.dimension ? (
                  <ChevronUp className="h-4 w-4 text-zinc-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-zinc-400" />
                )}
              </div>
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
                  <div className="px-3 pb-4 space-y-3 border-t border-zinc-800/50 pt-3">
                    <p className="text-xs text-zinc-400 leading-relaxed">{dim.explanation}</p>
                    
                    {dim.evidence.length > 0 && (
                      <div className="p-3 rounded-lg bg-zinc-900/50">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Quote className="h-3 w-3 text-violet-400" />
                          <p className="text-xs text-violet-400 font-medium">Evidence</p>
                        </div>
                        {dim.evidence.map((e, i) => (
                          <p key={i} className="text-xs text-zinc-400 italic leading-relaxed">
                            "{e}"
                          </p>
                        ))}
                      </div>
                    )}
                    
                    {dim.suggestions.length > 0 && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <Sparkles className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-emerald-400 font-medium mb-1">To improve</p>
                          {dim.suggestions.map((s, i) => (
                            <p key={i} className="text-xs text-zinc-400">{s}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
