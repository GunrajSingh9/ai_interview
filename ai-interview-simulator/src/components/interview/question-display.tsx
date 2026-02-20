import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"
import type { InterviewQuestion } from "@/types/interview"

interface QuestionDisplayProps {
  question: InterviewQuestion
  index: number
}

export function QuestionDisplay({ question, index }: QuestionDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-emerald-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
              Question {index + 1}
            </span>
            <span className="text-xs text-zinc-500 capitalize">
              {question.category.replace("-", " ")}
            </span>
          </div>
          <p className="text-lg text-zinc-100 leading-relaxed font-medium">
            {question.text}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
