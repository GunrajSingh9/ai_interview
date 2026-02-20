import { motion } from "framer-motion"
import { Activity } from "lucide-react"

interface ConfidenceMeterProps {
  score: number
  isActive: boolean
}

export function ConfidenceMeter({ score, isActive }: ConfidenceMeterProps) {
  const getColor = (value: number) => {
    if (value >= 75) return { text: "text-emerald-400", bg: "bg-emerald-400", label: "High" }
    if (value >= 50) return { text: "text-yellow-400", bg: "bg-yellow-400", label: "Moderate" }
    if (value >= 30) return { text: "text-orange-400", bg: "bg-orange-400", label: "Low" }
    return { text: "text-rose-400", bg: "bg-rose-400", label: "Very Low" }
  }

  const color = getColor(score)

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className={`h-4 w-4 ${isActive ? color.text : "text-zinc-500"}`} />
          <span className="text-sm font-semibold text-zinc-300">Confidence</span>
        </div>
        <span className={`text-xs font-medium ${isActive ? color.text : "text-zinc-500"}`}>
          {isActive ? color.label : "Inactive"}
        </span>
      </div>

      {/* Score display */}
      <div className="text-center mb-4">
        <motion.span
          key={Math.round(score)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-4xl font-bold ${isActive ? color.text : "text-zinc-600"}`}
        >
          {Math.round(score)}
        </motion.span>
        <span className="text-zinc-500 text-sm">/100</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color.bg}`}
          animate={{ width: `${isActive ? score : 0}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Breakdown */}
      <div className="mt-4 space-y-2">
        {[
          { label: "Speech Rate", value: 70 + Math.random() * 25 },
          { label: "Pause Score", value: 60 + Math.random() * 30 },
          { label: "Filler Words", value: 50 + Math.random() * 40 },
          { label: "Volume", value: 65 + Math.random() * 30 },
        ].map((metric) => (
          <div key={metric.label} className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">{metric.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-zinc-500"
                  animate={{ width: isActive ? `${metric.value}%` : "0%" }}
                />
              </div>
              <span className="text-zinc-400 w-8 text-right">
                {isActive ? Math.round(metric.value) : "—"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
