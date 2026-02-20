import type { AudioAnalysis, ConfidenceMetrics, FillerWordAnalysis } from "@/types/analysis"
import { FILLER_WORDS } from "@/types/analysis"

export function analyzeTranscript(transcript: string, durationSeconds: number): AudioAnalysis {
  const words = transcript.toLowerCase().split(/\s+/).filter(Boolean)
  const totalWords = words.length
  const speechRate = totalWords / (durationSeconds / 60) // words per minute

  // Count filler words
  let totalFillerWords = 0
  for (const filler of FILLER_WORDS) {
    const regex = new RegExp(`\\b${filler}\\b`, "gi")
    const matches = transcript.match(regex)
    if (matches) totalFillerWords += matches.length
  }

  // Estimate pauses from ellipsis, long gaps, etc.
  const pausePatterns = transcript.match(/\.\.\.|—|,\s*,|\s{3,}/g)
  const pauseFrequency = (pausePatterns?.length || 0) / (durationSeconds / 60)

  return {
    speechRate,
    pauseFrequency,
    averagePauseDuration: pauseFrequency > 0 ? 1.2 : 0,
    volumeConsistency: 70 + Math.random() * 25, // Simulated — real impl would use Web Audio API
    fillerWordRatio: totalWords > 0 ? totalFillerWords / totalWords : 0,
    totalWords,
    totalFillerWords,
  }
}

export function calculateConfidence(analysis: AudioAnalysis): ConfidenceMetrics {
  // Speech rate scoring: ideal is 130-170 wpm
  const idealRate = 150
  const rateDeviation = Math.abs(analysis.speechRate - idealRate) / idealRate
  const speechRateScore = Math.max(0, 100 - rateDeviation * 100)

  // Pause scoring: fewer unexpected pauses = higher confidence
  const pauseScore = Math.max(0, 100 - analysis.pauseFrequency * 10)

  // Filler word scoring: fewer = better
  const fillerScore = Math.max(0, 100 - analysis.fillerWordRatio * 500)

  // Volume consistency
  const volumeScore = analysis.volumeConsistency

  // Weighted overall
  const overall =
    speechRateScore * 0.25 +
    pauseScore * 0.20 +
    fillerScore * 0.35 +
    volumeScore * 0.20

  return {
    overall: Math.round(Math.min(100, Math.max(0, overall))),
    speechRateScore: Math.round(speechRateScore),
    pauseScore: Math.round(pauseScore),
    fillerScore: Math.round(fillerScore),
    volumeScore: Math.round(volumeScore),
    trend: [],
  }
}

export function analyzeFillerWords(transcript: string, durationSeconds: number): FillerWordAnalysis {
  const distribution: { word: string; count: number; percentage: number }[] = []
  let totalCount = 0

  for (const filler of FILLER_WORDS) {
    const regex = new RegExp(`\\b${filler}\\b`, "gi")
    const matches = transcript.match(regex)
    if (matches && matches.length > 0) {
      totalCount += matches.length
      distribution.push({ word: filler, count: matches.length, percentage: 0 })
    }
  }

  // Calculate percentages
  for (const item of distribution) {
    item.percentage = totalCount > 0 ? (item.count / totalCount) * 100 : 0
  }

  distribution.sort((a, b) => b.count - a.count)

  const ratePerMinute = totalCount / (durationSeconds / 60)
  let severity: FillerWordAnalysis["severity"] = "low"
  if (ratePerMinute > 15) severity = "critical"
  else if (ratePerMinute > 10) severity = "high"
  else if (ratePerMinute > 5) severity = "moderate"

  return {
    totalCount,
    uniqueWords: distribution.map((d) => d.word),
    distribution,
    ratePerMinute,
    severity,
  }
}

// Generate mock confidence for demo mode
export function generateMockConfidence(): ConfidenceMetrics {
  const base = 55 + Math.random() * 30
  return {
    overall: Math.round(base),
    speechRateScore: Math.round(60 + Math.random() * 35),
    pauseScore: Math.round(50 + Math.random() * 40),
    fillerScore: Math.round(40 + Math.random() * 50),
    volumeScore: Math.round(65 + Math.random() * 30),
    trend: Array.from({ length: 5 }, () => Math.round(base + (Math.random() - 0.5) * 20)),
  }
}
