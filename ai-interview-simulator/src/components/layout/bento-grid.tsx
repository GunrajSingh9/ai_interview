import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: ReactNode
  className?: string
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
  delay?: number
  glowColor?: "emerald" | "violet" | "rose" | "none"
}

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  delay = 0,
  glowColor = "none",
}: BentoCardProps) {
  const spanClasses = {
    col: { 1: "", 2: "md:col-span-2", 3: "md:col-span-2 lg:col-span-3" },
    row: { 1: "", 2: "row-span-2" },
  }

  const glowClasses = {
    emerald: "hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.3)]",
    violet: "hover:shadow-[0_0_40px_-10px_rgba(167,139,250,0.3)]",
    rose: "hover:shadow-[0_0_40px_-10px_rgba(251,113,133,0.3)]",
    none: "",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "glass rounded-xl p-6 transition-all duration-300",
        "hover:bg-zinc-800/60 hover:border-zinc-700/50",
        spanClasses.col[colSpan],
        spanClasses.row[rowSpan],
        glowClasses[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  )
}
