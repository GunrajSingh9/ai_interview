import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export function getScoreColor(score: number, max: number = 5): string {
  const ratio = score / max
  if (ratio >= 0.8) return "text-emerald-400"
  if (ratio >= 0.6) return "text-yellow-400"
  if (ratio >= 0.4) return "text-orange-400"
  return "text-rose-400"
}

export function getScoreBgColor(score: number, max: number = 5): string {
  const ratio = score / max
  if (ratio >= 0.8) return "bg-emerald-400/10 border-emerald-400/20"
  if (ratio >= 0.6) return "bg-yellow-400/10 border-yellow-400/20"
  if (ratio >= 0.4) return "bg-orange-400/10 border-orange-400/20"
  return "bg-rose-400/10 border-rose-400/20"
}

export function getRecommendationLevel(score: number): {
  label: string
  color: string
  bgColor: string
} {
  if (score >= 4.2) return { label: "Strong Hire", color: "text-emerald-400", bgColor: "bg-emerald-400/10" }
  if (score >= 3.2) return { label: "Hire", color: "text-green-400", bgColor: "bg-green-400/10" }
  if (score >= 2.2) return { label: "No Hire", color: "text-orange-400", bgColor: "bg-orange-400/10" }
  return { label: "Strong No Hire", color: "text-rose-400", bgColor: "bg-rose-400/10" }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
