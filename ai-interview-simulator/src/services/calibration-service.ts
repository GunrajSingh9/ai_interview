import type { CalibrationAnchor, AnswerScore, ScoreDimension } from "@/types/scoring"

export const calibrationAnchors: CalibrationAnchor[] = [
  {
    dimension: "correctness",
    scoreLevel: 1,
    anchorAnswer: "I think React uses threads to update the DOM directly.",
    explanation: "Fundamentally incorrect — React uses a virtual DOM, not threads.",
  },
  {
    dimension: "correctness",
    scoreLevel: 3,
    anchorAnswer: "React uses a virtual DOM to compare changes before updating the real DOM. It batches updates for performance.",
    explanation: "Correct high-level understanding with minor gaps in reconciliation details.",
  },
  {
    dimension: "correctness",
    scoreLevel: 5,
    anchorAnswer: "React maintains a virtual DOM tree. During reconciliation, it performs a diffing algorithm comparing the new virtual tree with the previous one, then batches minimal DOM mutations. React Fiber introduced incremental rendering with priority-based scheduling.",
    explanation: "Precise, nuanced understanding with advanced concepts (Fiber, scheduling).",
  },
  {
    dimension: "communication",
    scoreLevel: 1,
    anchorAnswer: "So like, um, the thing is... you know, it's like, basically... the DOM stuff.",
    explanation: "Extremely unclear, excessive filler words, no structure.",
  },
  {
    dimension: "communication",
    scoreLevel: 3,
    anchorAnswer: "React has a virtual DOM. First, it creates a copy. Then, it compares changes. Finally, it updates only what changed.",
    explanation: "Clear sequential structure, easy to follow.",
  },
  {
    dimension: "communication",
    scoreLevel: 5,
    anchorAnswer: "Let me break this into three parts. First, I'll explain what the Virtual DOM is. Then, I'll walk through the reconciliation process. Finally, I'll discuss why this matters for performance. The Virtual DOM is...",
    explanation: "Masterful structure — previews the outline, uses transitions, engaging delivery.",
  },
]

// Check if a score is within acceptable range of calibration anchors
export function checkCalibration(
  score: AnswerScore,
  dimension: ScoreDimension
): { isCalibrated: boolean; deviation: number; note: string } {
  const dimScore = score.dimensions.find((d) => d.dimension === dimension)
  if (!dimScore) return { isCalibrated: true, deviation: 0, note: "" }

  const anchors = calibrationAnchors.filter((a) => a.dimension === dimension)
  if (anchors.length === 0) return { isCalibrated: true, deviation: 0, note: "" }

  // Find nearest anchor
  const nearest = anchors.reduce((prev, curr) =>
    Math.abs(curr.scoreLevel - dimScore.score) < Math.abs(prev.scoreLevel - dimScore.score)
      ? curr
      : prev
  )

  const deviation = Math.abs(nearest.scoreLevel - dimScore.score)
  const isCalibrated = deviation <= 1

  return {
    isCalibrated,
    deviation,
    note: isCalibrated
      ? `Score aligns with calibration anchor at level ${nearest.scoreLevel}.`
      : `Score deviates ${deviation.toFixed(1)} points from nearest anchor (level ${nearest.scoreLevel}). Review recommended.`,
  }
}

// Generate a calibration report for all scores
export function generateCalibrationReport(scores: AnswerScore[]): {
  overallCalibrated: boolean
  dimensionReports: { dimension: ScoreDimension; avgDeviation: number; calibrated: boolean }[]
  flags: string[]
} {
  const dimensions: ScoreDimension[] = [
    "correctness", "depth", "communication", "problem-solving", "relevance",
  ]

  const dimensionReports = dimensions.map((dim) => {
    const checks = scores.map((s) => checkCalibration(s, dim))
    const avgDeviation = checks.reduce((sum, c) => sum + c.deviation, 0) / checks.length
    return {
      dimension: dim,
      avgDeviation: Math.round(avgDeviation * 10) / 10,
      calibrated: avgDeviation <= 1,
    }
  })

  const flags: string[] = []
  for (const report of dimensionReports) {
    if (!report.calibrated) {
      flags.push(`${report.dimension}: Average deviation of ${report.avgDeviation} from calibration anchors.`)
    }
  }

  return {
    overallCalibrated: flags.length === 0,
    dimensionReports,
    flags,
  }
}
