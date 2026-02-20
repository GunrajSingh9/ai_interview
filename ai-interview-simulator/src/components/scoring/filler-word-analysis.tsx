import { motion } from "framer-motion"
import { MessageCircleWarning, Volume2 } from "lucide-react"

interface FillerWordAnalysisProps {
  report: {
    fillerWordSummary: {
      totalFillerWords: number
      fillerWordRate: number
      mostCommon: { word: string; count: number }[]
    }
  }
}

export function FillerWordAnalysis({ report }: FillerWordAnalysisProps) {
  const { fillerWordSummary } = report
  const maxCount = Math.max(...fillerWordSummary.mostCommon.map((w) => w.count), 1)

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 rounded-lg bg-rose-500/10">
          <MessageCircleWarning className="h-4 w-4 text-rose-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-100">Filler Words</h3>
      </div>

      <div className="flex items-center justify-center gap-8 mb-6 p-4 rounded-xl bg-zinc-900/50">
        <div className="text-center">
          <div className="text-4xl font-bold text-rose-400">{fillerWordSummary.totalFillerWords}</div>
          <div className="text-xs text-zinc-500 mt-1">total words</div>
        </div>
        <div className="w-px h-10 bg-zinc-800" />
        <div className="text-center">
          <div className="text-4xl font-bold text-rose-400">{fillerWordSummary.fillerWordRate.toFixed(1)}</div>
          <div className="text-xs text-zinc-500 mt-1">per minute</div>
        </div>
      </div>

      <div className="space-y-3">
        {fillerWordSummary.mostCommon.slice(0, 4).map((item, i) => (
          <motion.div
            key={item.word}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs text-zinc-300 w-20 truncate font-medium">"{item.word}"</span>
            <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-400"
                initial={{ width: 0 }}
                animate={{ width: `${(item.count / maxCount) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
              />
            </div>
            <span className="text-sm font-bold text-zinc-200 w-8 text-right">{item.count}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
