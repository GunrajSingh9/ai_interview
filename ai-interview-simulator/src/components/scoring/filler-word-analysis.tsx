import { motion } from "framer-motion"
import { MessageCircleWarning } from "lucide-react"

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
      <div className="flex items-center gap-2 mb-4">
        <MessageCircleWarning className="h-4 w-4 text-rose-400" />
        <h3 className="text-sm font-semibold text-zinc-300">Filler Words</h3>
      </div>

      <div className="text-center mb-4">
        <span className="text-3xl font-bold text-rose-400">{fillerWordSummary.totalFillerWords}</span>
        <span className="text-sm text-zinc-500 ml-1">total</span>
        <div className="text-xs text-zinc-500 mt-1">
          {fillerWordSummary.fillerWordRate.toFixed(1)} per minute
        </div>
      </div>

      <div className="space-y-3">
        {fillerWordSummary.mostCommon.slice(0, 5).map((item, i) => (
          <motion.div
            key={item.word}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs text-zinc-400 w-16 text-right font-mono">"{item.word}"</span>
            <div className="flex-1 h-4 rounded bg-zinc-800/50 overflow-hidden">
              <motion.div
                className="h-full rounded bg-rose-400/60"
                initial={{ width: 0 }}
                animate={{ width: `${(item.count / maxCount) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
            </div>
            <span className="text-xs font-bold text-zinc-300 w-6">{item.count}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
