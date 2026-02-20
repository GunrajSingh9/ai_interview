import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { formatTime } from "@/lib/utils"

interface TimerDisplayProps {
  timeLimit: number
  isRunning: boolean
  onTimeUp: () => void
}

export function TimerDisplay({ timeLimit, isRunning, onTimeUp }: TimerDisplayProps) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning) {
      setElapsed(0)
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= timeLimit - 1) {
            onTimeUp()
            return timeLimit
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, timeLimit, onTimeUp])

  const remaining = timeLimit - elapsed
  const progress = elapsed / timeLimit
  const isWarning = remaining <= 30 && remaining > 10
  const isCritical = remaining <= 10

  const circumference = 2 * Math.PI * 54 // radius = 54

  return (
    <div className="glass rounded-xl p-5 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-4 w-4 text-zinc-400" />
        <span className="text-sm font-semibold text-zinc-300">Time Remaining</span>
      </div>

      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-zinc-800"
          />
          <motion.circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            className={
              isCritical ? "text-rose-400" :
              isWarning ? "text-yellow-400" :
              "text-emerald-400"
            }
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold font-mono ${
            isCritical ? "text-rose-400" :
            isWarning ? "text-yellow-400" :
            "text-zinc-100"
          }`}>
            {formatTime(remaining)}
          </span>
        </div>
      </div>
    </div>
  )
}
