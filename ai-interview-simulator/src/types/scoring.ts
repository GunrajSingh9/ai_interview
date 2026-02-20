export type ScoreDimension = "correctness" | "depth" | "communication" | "problem-solving" | "relevance"

export interface DimensionScore {
  dimension: ScoreDimension
  score: number // 1-5
  explanation: string
  evidence: string[]
  suggestions: string[]
}

export interface AnswerScore {
  questionId: string
  dimensions: DimensionScore[]
  overallScore: number
  biasFlags: BiasFlag[]
  calibrationNote?: string
  confidence: number // 0-100 confidence in the score
}

export interface BiasFlag {
  type: "language-bias" | "halo-effect" | "anchor-bias" | "severity-bias"
  description: string
  mitigationApplied: string
}

export interface CalibrationAnchor {
  dimension: ScoreDimension
  scoreLevel: number
  anchorAnswer: string
  explanation: string
}

export interface RubricCriteria {
  dimension: ScoreDimension
  label: string
  description: string
  levels: {
    score: number
    label: string
    description: string
  }[]
}

export type HiringRecommendation = "strong-hire" | "hire" | "no-hire" | "strong-no-hire"

export interface InterviewReport {
  sessionId: string
  overallScore: number
  recommendation: HiringRecommendation
  answerScores: AnswerScore[]
  strengths: string[]
  weaknesses: string[]
  riskFactors: string[]
  improvementAreas: string[]
  fillerWordSummary: {
    totalFillerWords: number
    fillerWordRate: number
    mostCommon: { word: string; count: number }[]
  }
  confidenceSummary: {
    averageConfidence: number
    trend: "improving" | "declining" | "stable"
    lowestPoint: { questionIndex: number; score: number }
  }
}
