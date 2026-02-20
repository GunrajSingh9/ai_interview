import type { AnswerScore, BiasFlag } from "@/types/scoring"

// Strip identifying information from transcripts before scoring
export function sanitizeForBlindScoring(transcript: string): string {
  // Remove names (basic pattern - real impl would use NER)
  let sanitized = transcript.replace(
    /\b(my name is|I'm|I am)\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?\b/gi,
    "[REDACTED_NAME]"
  )

  // Remove company names that might bias
  sanitized = sanitized.replace(
    /\b(at Google|at Meta|at Amazon|at Apple|at Microsoft|at Netflix|at FAANG)\b/gi,
    "at [COMPANY]"
  )

  // Remove university names
  sanitized = sanitized.replace(
    /\b(MIT|Stanford|Harvard|Berkeley|Carnegie Mellon|Caltech|Oxford|Cambridge)\b/gi,
    "[UNIVERSITY]"
  )

  // Remove age-related identifiers
  sanitized = sanitized.replace(/\b\d{1,2}\s*years?\s*old\b/gi, "[AGE_REDACTED]")

  return sanitized
}

// Multi-pass scoring: average two evaluations for consistency
export function multiPassAverage(score1: AnswerScore, score2: AnswerScore): AnswerScore {
  const avgDimensions = score1.dimensions.map((dim1, i) => {
    const dim2 = score2.dimensions[i]
    return {
      ...dim1,
      score: Math.round(((dim1.score + dim2.score) / 2) * 10) / 10,
      explanation: dim1.score !== dim2.score
        ? `Pass 1: ${dim1.explanation} | Pass 2: ${dim2.explanation}`
        : dim1.explanation,
    }
  })

  const avgOverall =
    Math.round(((score1.overallScore + score2.overallScore) / 2) * 10) / 10

  return {
    ...score1,
    dimensions: avgDimensions,
    overallScore: avgOverall,
    confidence: Math.round((score1.confidence + score2.confidence) / 2),
    biasFlags: [...score1.biasFlags, ...score2.biasFlags],
  }
}

// Detect potential bias patterns in scoring
export function detectBiasPatterns(scores: AnswerScore[]): BiasFlag[] {
  const flags: BiasFlag[] = []

  if (scores.length < 2) return flags

  // Check for halo effect: all dimensions scoring similarly
  for (const score of scores) {
    const dimScores = score.dimensions.map((d) => d.score)
    const range = Math.max(...dimScores) - Math.min(...dimScores)
    if (range <= 0.5 && dimScores.length > 3) {
      flags.push({
        type: "halo-effect",
        description: "All dimensions scored nearly identically — possible halo effect detected.",
        mitigationApplied: "Dimensions reviewed independently with focused prompts.",
      })
    }
  }

  // Check for anchor bias: scores clustering around first answer's score
  if (scores.length >= 3) {
    const firstScore = scores[0].overallScore
    const laterScores = scores.slice(1)
    const deviation = laterScores.reduce(
      (sum, s) => sum + Math.abs(s.overallScore - firstScore), 0
    ) / laterScores.length

    if (deviation < 0.3) {
      flags.push({
        type: "anchor-bias",
        description: "Later scores cluster near the first answer's score — possible anchoring effect.",
        mitigationApplied: "Each answer scored independently with fresh context.",
      })
    }
  }

  // Check for severity bias: consistently harsh or lenient
  const avgScore = scores.reduce((sum, s) => sum + s.overallScore, 0) / scores.length
  if (avgScore < 2.0) {
    flags.push({
      type: "severity-bias",
      description: "Overall scoring appears unusually harsh.",
      mitigationApplied: "Scores calibrated against anchor examples.",
    })
  } else if (avgScore > 4.5) {
    flags.push({
      type: "severity-bias",
      description: "Overall scoring appears unusually lenient.",
      mitigationApplied: "Scores calibrated against anchor examples.",
    })
  }

  return flags
}

// Statistical normalization
export function normalizeScores(scores: AnswerScore[]): AnswerScore[] {
  if (scores.length === 0) return scores

  const overallScores = scores.map((s) => s.overallScore)
  const mean = overallScores.reduce((a, b) => a + b, 0) / overallScores.length
  const stdDev = Math.sqrt(
    overallScores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / overallScores.length
  )

  if (stdDev === 0) return scores

  return scores.map((score) => ({
    ...score,
    overallScore: Math.round(
      Math.max(1, Math.min(5, 3 + ((score.overallScore - mean) / stdDev) * 0.8)) * 10
    ) / 10,
    calibrationNote: `Normalized from ${score.overallScore} (μ=${mean.toFixed(1)}, σ=${stdDev.toFixed(1)})`,
  }))
}
