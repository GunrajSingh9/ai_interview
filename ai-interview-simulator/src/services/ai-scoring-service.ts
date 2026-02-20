import type { AnswerScore, DimensionScore, ScoreDimension } from "@/types/scoring"
import type { InterviewQuestion } from "@/types/interview"
import { dimensionWeights } from "@/data/rubrics"
import { delay } from "@/lib/utils"

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

interface ScoringRequest {
  question: InterviewQuestion
  answer: string
  role: string
  apiKey?: string
}

export async function scoreAnswer(request: ScoringRequest): Promise<AnswerScore> {
  if (request.apiKey) {
    try {
      return await scoreWithLLM(request)
    } catch {
      console.warn("LLM scoring failed, falling back to mock scoring")
    }
  }
  return generateMockScore(request.question.id)
}

async function scoreWithLLM(request: ScoringRequest): Promise<AnswerScore> {
  const prompt = buildScoringPrompt(request)

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${request.apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert technical interviewer evaluating candidate responses. 
Score objectively using the provided rubric. Return ONLY valid JSON.
IMPORTANT: Apply blind scoring — ignore any personal identifiers. Focus solely on content quality.`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  })

  const data = await response.json()
  const parsed = JSON.parse(data.choices[0].message.content)

  return {
    questionId: request.question.id,
    dimensions: parsed.dimensions,
    overallScore: calculateWeightedScore(parsed.dimensions),
    biasFlags: parsed.biasFlags || [],
    calibrationNote: parsed.calibrationNote,
    confidence: parsed.confidence || 75,
  }
}

function buildScoringPrompt(request: ScoringRequest): string {
  return `
Evaluate this interview answer for a ${request.role} position.

**Question:** ${request.question.text}
**Expected Topics:** ${request.question.expectedTopics.join(", ")}
**Candidate Answer:** ${request.answer}

Score each dimension from 1-5 and provide evidence-based explanations.

Return JSON in this exact format:
{
  "dimensions": [
    {
      "dimension": "correctness",
      "score": <1-5>,
      "explanation": "<why this score>",
      "evidence": ["<quote from answer>"],
      "suggestions": ["<improvement tip>"]
    },
    { "dimension": "depth", ... },
    { "dimension": "communication", ... },
    { "dimension": "problem-solving", ... },
    { "dimension": "relevance", ... }
  ],
  "biasFlags": [],
  "calibrationNote": "<any calibration notes>",
  "confidence": <50-100>
}`
}

function calculateWeightedScore(dimensions: DimensionScore[]): number {
  let total = 0
  let weightSum = 0
  for (const dim of dimensions) {
    const weight = dimensionWeights[dim.dimension] || 0.2
    total += dim.score * weight
    weightSum += weight
  }
  return Math.round((total / weightSum) * 10) / 10
}

// Mock scoring for demo mode
export function generateMockScore(questionId: string): AnswerScore {
  const dimensions: ScoreDimension[] = [
    "correctness", "depth", "communication", "problem-solving", "relevance"
  ]

  const mockDimensions: DimensionScore[] = dimensions.map((dim) => {
    const score = Math.floor(Math.random() * 3) + 2 // 2-4 range
    return {
      dimension: dim,
      score,
      explanation: getMockExplanation(dim, score),
      evidence: [getMockEvidence(dim)],
      suggestions: [getMockSuggestion(dim)],
    }
  })

  return {
    questionId,
    dimensions: mockDimensions,
    overallScore: calculateWeightedScore(mockDimensions),
    biasFlags: [],
    confidence: 70 + Math.floor(Math.random() * 25),
  }
}

export async function generateMockScoreAsync(questionId: string): Promise<AnswerScore> {
  await delay(800 + Math.random() * 1200)
  return generateMockScore(questionId)
}

function getMockExplanation(dim: ScoreDimension, score: number): string {
  const explanations: Record<ScoreDimension, Record<number, string>> = {
    correctness: {
      2: "Some technical inaccuracies detected in the core concepts discussed.",
      3: "Generally accurate response with minor gaps in understanding.",
      4: "Demonstrates solid technical knowledge with accurate explanations.",
    },
    depth: {
      2: "Response stays at surface level without exploring nuances.",
      3: "Good coverage of main points with some deeper insights.",
      4: "Thorough exploration showing strong depth of knowledge.",
    },
    communication: {
      2: "Answer lacks clear structure and jumps between topics.",
      3: "Well-organized response with logical flow.",
      4: "Excellent clarity with well-structured examples and transitions.",
    },
    "problem-solving": {
      2: "Shows basic reasoning but misses alternative approaches.",
      3: "Structured approach with consideration of trade-offs.",
      4: "Strong analytical thinking with creative problem decomposition.",
    },
    relevance: {
      2: "Partially addresses the question with some tangents.",
      3: "Directly addresses the core question with minor digressions.",
      4: "Precisely targeted response covering all aspects asked.",
    },
  }
  return explanations[dim]?.[score] || "Score based on overall quality assessment."
}

function getMockEvidence(dim: ScoreDimension): string {
  const evidence: Record<ScoreDimension, string> = {
    correctness: "Candidate demonstrated understanding of core concepts in their explanation.",
    depth: "Response included discussion of edge cases and trade-offs.",
    communication: "Answer followed a clear structure with examples.",
    "problem-solving": "Candidate broke down the problem into manageable components.",
    relevance: "Response directly addressed the key aspects of the question.",
  }
  return evidence[dim]
}

function getMockSuggestion(dim: ScoreDimension): string {
  const suggestions: Record<ScoreDimension, string> = {
    correctness: "Consider referencing specific implementation details to strengthen accuracy.",
    depth: "Explore edge cases and discuss how the solution scales.",
    communication: "Use the STAR framework for behavioral questions to add structure.",
    "problem-solving": "Present multiple approaches before choosing one and explain trade-offs.",
    relevance: "Start by restating the question to ensure alignment before diving in.",
  }
  return suggestions[dim]
}
