import { motion } from "framer-motion"

interface AudioVisualizerProps {
  isActive: boolean
}

export function AudioVisualizer({ isActive }: AudioVisualizerProps) {
  const bars = 40

  return (
    <div className="flex items-center justify-center gap-[3px] h-20 mb-4">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-emerald-400"
          animate={
            isActive
              ? {
                  height: [8, 20 + Math.random() * 40, 8],
                  opacity: [0.4, 0.9, 0.4],
                }
              : { height: 4, opacity: 0.15 }
          }
          transition={
            isActive
              ? {
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.02,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}
