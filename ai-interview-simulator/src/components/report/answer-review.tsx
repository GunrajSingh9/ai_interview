import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react"
import type { AnswerScore } from "@/types/scoring"
import type { InterviewQuestion, InterviewAnswer } from "@/types/interview"
import { getScoreColor } from "@/lib/utils"

interface AnswerReviewProps {
  scores: AnswerScore[]
  questions?: InterviewQuestion[]
  answers?: InterviewAnswer[]
}

export function AnswerReview({ scores, questions, answers }: AnswerReviewProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-violet-400" />
        Answer-by-Answer Review
      </h2>

      <div className="space-y-3">
        {scores.map((score, idx) => {
          const question = questions?.[idx]
          const answer = answers?.[idx]
          const isExpanded = expandedIndex === idx

          return (
            <div key={score.questionId} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`text-lg font-bold ${getScoreColor(score.overallScore)}`}>
                    {score.overallScore}
                  </div>
                  <div>
                    <div className="text-sm text-zinc-200">
                      Question {idx + 1}
                      {question && (
                        <span className="text-zinc-500 ml-2 text-xs capitalize">
                          {question.category.replace("-", " ")}
                        </span>
                      )}
                    </div>
                    {question && (
                      <div className="text-xs text-zinc-500 truncate max-w-md">
                        {question.text.slice(0, 80)}...
                      </div>
                    )}
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-zinc-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-zinc-500" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4 border-t border-zinc-800/50">
                      {question && (
                        <div className="pt-3">
                          <p className="text-xs text-zinc-500 font-medium mb-1">Question:</p>
                          <p className="text-sm text-zinc-300">{question.text}</p>
                        </div>
                      )}

                      {answer && (
                        <div>
                          <p className="text-xs text-zinc-500 font-medium mb-1">Your Answer:</p>
                          <p className="text-xs text-zinc-400 leading-relaxed">{answer.transcript}</p>
                        </div>
                      )}

                      {/* Dimension scores */}
                      <div className="grid grid-cols-5 gap-2">
                        {score.dimensions.map((dim) => (
                          <div key={dim.dimension} className="text-center p-2 rounded-lg bg-zinc-900/30">
                            <div className={`text-lg font-bold ${getScoreColor(dim.score)}`}>
                              {dim.score}
                            </div>
                            <div className="text-[10px] text-zinc-500 capitalize">
                              {dim.dimension.replace("-", " ")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
