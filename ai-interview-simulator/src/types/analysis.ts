export interface AudioAnalysis {
  speechRate: number // words per minute
  pauseFrequency: number // pauses per minute
  averagePauseDuration: number // seconds
  volumeConsistency: number // 0-100
  fillerWordRatio: number // filler words / total words
  totalWords: number
  totalFillerWords: number
}

export interface ConfidenceMetrics {
  overall: number // 0-100
  speechRateScore: number
  pauseScore: number
  fillerScore: number
  volumeScore: number
  trend: number[] // per-question confidence scores
}

export interface FillerWordAnalysis {
  totalCount: number
  uniqueWords: string[]
  distribution: { word: string; count: number; percentage: number }[]
  ratePerMinute: number
  severity: "low" | "moderate" | "high" | "critical"
}

export const FILLER_WORDS = [
  "um", "uh", "like", "you know", "basically", "actually", "so",
  "right", "well", "literally", "honestly", "I mean", "kind of",
  "sort of", "just", "really", "very", "obviously", "essentially"
] as const

export type FillerWord = typeof FILLER_WORDS[number]
