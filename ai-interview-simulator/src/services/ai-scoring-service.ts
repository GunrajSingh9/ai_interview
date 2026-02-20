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
    const score = generateRealisticScore(dim)
    return {
      dimension: dim,
      score,
      explanation: getMockExplanation(dim, score),
      evidence: [getMockEvidence(dim, score)],
      suggestions: [getMockSuggestion(dim, score)],
    }
  })

  return {
    questionId,
    dimensions: mockDimensions,
    overallScore: calculateWeightedScore(mockDimensions),
    biasFlags: [],
    confidence: 75 + Math.floor(Math.random() * 20),
  }
}

function generateRealisticScore(dimension: ScoreDimension): number {
  const weights = {
    correctness: [0.05, 0.15, 0.30, 0.35, 0.15],
    depth: [0.05, 0.20, 0.30, 0.30, 0.15],
    communication: [0.05, 0.10, 0.25, 0.40, 0.20],
    "problem-solving": [0.05, 0.15, 0.30, 0.35, 0.15],
    relevance: [0.05, 0.10, 0.25, 0.40, 0.20],
  }
  
  const dist = weights[dimension] || weights.correctness
  const rand = Math.random()
  let cumulative = 0
  for (let i = 0; i < dist.length; i++) {
    cumulative += dist[i]
    if (rand < cumulative) return i + 1
  }
  return 4
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
      5: "Exceptional technical accuracy with precise terminology and comprehensive understanding of all concepts.",
    },
    depth: {
      2: "Response stays at surface level without exploring nuances.",
      3: "Good coverage of main points with some deeper insights.",
      4: "Thorough exploration showing strong depth of knowledge.",
      5: "Demonstrates expert-level depth with advanced concepts, edge cases, and nuanced analysis.",
    },
    communication: {
      2: "Answer lacks clear structure and jumps between topics.",
      3: "Well-organized response with logical flow.",
      4: "Excellent clarity with well-structured examples and transitions.",
      5: "Outstanding communication with perfect structure, compelling examples, and engaging delivery.",
    },
    "problem-solving": {
      2: "Shows basic reasoning but misses alternative approaches.",
      3: "Structured approach with consideration of trade-offs.",
      4: "Strong analytical thinking with creative problem decomposition.",
      5: "Demonstrates exceptional problem-solving with innovative approaches and comprehensive trade-off analysis.",
    },
    relevance: {
      2: "Partially addresses the question with some tangents.",
      3: "Directly addresses the core question with minor digressions.",
      4: "Precisely targeted response covering all aspects asked.",
      5: "Perfectly addresses all aspects of the question with insightful connections to broader contexts.",
    },
  }
  return explanations[dim]?.[score] || "Score based on overall quality assessment."
}

function getMockEvidence(dim: ScoreDimension, score: number): string {
  const evidence: Record<ScoreDimension, Record<number, string>> = {
    correctness: {
      2: "Some technical details were imprecise in the explanation.",
      3: "Candidate demonstrated understanding of core concepts in their explanation.",
      4: "Accurate use of technical terminology and correct explanation of complex concepts.",
      5: "Demonstrated expert-level knowledge with precise technical details and accurate explanations of advanced concepts.",
    },
    depth: {
      2: "Basic coverage without exploring underlying principles.",
      3: "Response included discussion of edge cases and trade-offs.",
      4: "Explored multiple layers of the problem with consideration of scalability and performance.",
      5: "Provided comprehensive analysis including edge cases, performance implications, and real-world applications.",
    },
    communication: {
      2: "Ideas were present but could be organized more clearly.",
      3: "Answer followed a clear structure with examples.",
      4: "Used clear transitions, structured examples, and maintained audience engagement.",
      5: "Exceptional use of analogies, clear explanations, and perfect pacing throughout the response.",
    },
    "problem-solving": {
      2: "Identified the problem but solution approach was limited.",
      3: "Candidate broke down the problem into manageable components.",
      4: "Presented multiple approaches with clear reasoning for the chosen solution.",
      5: "Demonstrated exceptional analytical skills with innovative solutions and comprehensive risk assessment.",
    },
    relevance: {
      2: "Some aspects of the question were not fully addressed.",
      3: "Response directly addressed the key aspects of the question.",
      4: "All parts of the question were answered with appropriate detail.",
      5: "Comprehensively addressed all aspects while adding valuable context and forward-looking insights.",
    },
  }
  return evidence[dim]?.[score] || "Evidence based on response analysis."
}

function getMockSuggestion(dim: ScoreDimension, score: number): string {
  const suggestions: Record<ScoreDimension, Record<number, string>> = {
    correctness: {
      2: "Review core technical concepts and practice explaining them with precise terminology.",
      3: "Consider referencing specific implementation details to strengthen accuracy.",
      4: "Continue deepening knowledge of edge cases and advanced concepts.",
      5: "Consider mentoring others to share your strong technical understanding.",
    },
    depth: {
      2: "Practice diving deeper into the 'why' behind technical decisions.",
      3: "Explore edge cases and discuss how the solution scales.",
      4: "Add more discussion of performance implications and alternative approaches.",
      5: "Great depth - consider documenting your thought process for knowledge sharing.",
    },
    communication: {
      2: "Use the STAR framework to structure responses more clearly.",
      3: "Use the STAR framework for behavioral questions to add structure.",
      4: "Add more transitional phrases to connect complex ideas.",
      5: "Excellent communication - your structure and clarity are exemplary.",
    },
    "problem-solving": {
      2: "Practice breaking down problems into smaller components before solving.",
      3: "Present multiple approaches before choosing one and explain trade-offs.",
      4: "Add more discussion of potential risks and mitigation strategies.",
      5: "Exceptional problem-solving - consider documenting approaches for team learning.",
    },
    relevance: {
      2: "Start by restating the question to ensure alignment before diving in.",
      3: "Start by restating the question to ensure alignment before diving in.",
      4: "Consider proactively addressing related concerns the interviewer might have.",
      5: "Perfect relevance - your responses are always on-point and comprehensive.",
    },
  }
  return suggestions[dim]?.[score] || "Continue practicing to improve."
}
