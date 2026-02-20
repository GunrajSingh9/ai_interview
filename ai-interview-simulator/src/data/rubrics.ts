import type { RubricCriteria } from "@/types/scoring"

export const scoringRubrics: RubricCriteria[] = [
  {
    dimension: "correctness",
    label: "Technical Correctness",
    description: "Accuracy of technical knowledge and facts presented",
    levels: [
      { score: 1, label: "Incorrect", description: "Major factual errors or fundamental misunderstandings" },
      { score: 2, label: "Partially Correct", description: "Some correct elements but significant gaps or errors" },
      { score: 3, label: "Mostly Correct", description: "Generally accurate with minor inaccuracies" },
      { score: 4, label: "Correct", description: "Accurate and demonstrates solid understanding" },
      { score: 5, label: "Exceptional", description: "Precise, nuanced, and shows expert-level knowledge" },
    ],
  },
  {
    dimension: "depth",
    label: "Depth of Knowledge",
    description: "Level of detail and thoroughness in the response",
    levels: [
      { score: 1, label: "Surface", description: "Very superficial, no meaningful detail" },
      { score: 2, label: "Basic", description: "Covers basics but lacks depth" },
      { score: 3, label: "Moderate", description: "Good coverage with some deeper insights" },
      { score: 4, label: "Deep", description: "Thorough exploration with nuanced understanding" },
      { score: 5, label: "Expert", description: "Comprehensive, explores edge cases and trade-offs" },
    ],
  },
  {
    dimension: "communication",
    label: "Communication Clarity",
    description: "How clearly and structuredly the answer is presented",
    levels: [
      { score: 1, label: "Unclear", description: "Disorganized, hard to follow" },
      { score: 2, label: "Somewhat Clear", description: "Some structure but jumps around" },
      { score: 3, label: "Clear", description: "Logical flow, easy to follow" },
      { score: 4, label: "Very Clear", description: "Well-structured with clear examples" },
      { score: 5, label: "Exceptional", description: "Masterful storytelling, perfect structure, engaging" },
    ],
  },
  {
    dimension: "problem-solving",
    label: "Problem Solving",
    description: "Quality of reasoning, approach, and analytical thinking",
    levels: [
      { score: 1, label: "No Approach", description: "No clear method or reasoning shown" },
      { score: 2, label: "Basic Approach", description: "Shows some reasoning but unstructured" },
      { score: 3, label: "Structured", description: "Clear approach with logical steps" },
      { score: 4, label: "Strong", description: "Considers alternatives and trade-offs" },
      { score: 5, label: "Exceptional", description: "Systematic, creative, considers multiple dimensions" },
    ],
  },
  {
    dimension: "relevance",
    label: "Relevance",
    description: "How well the answer addresses the actual question asked",
    levels: [
      { score: 1, label: "Off-topic", description: "Does not address the question" },
      { score: 2, label: "Tangential", description: "Partially related but misses key points" },
      { score: 3, label: "Relevant", description: "Addresses the question with minor tangents" },
      { score: 4, label: "Focused", description: "Directly addresses all aspects of the question" },
      { score: 5, label: "Precise", description: "Perfectly targeted, addresses all aspects comprehensively" },
    ],
  },
]

export const dimensionWeights: Record<string, number> = {
  correctness: 0.25,
  depth: 0.20,
  communication: 0.20,
  "problem-solving": 0.20,
  relevance: 0.15,
}
