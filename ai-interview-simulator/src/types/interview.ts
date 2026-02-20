export type InterviewRole = "frontend" | "backend" | "fullstack" | "machine-learning" | "data-science" | "devops"

export type InterviewType = "behavioral" | "technical" | "mixed"

export type DifficultyLevel = "junior" | "mid" | "senior" | "staff"

export type QuestionCategory = "behavioral" | "system-design" | "coding-concepts" | "problem-solving" | "architecture"

export interface InterviewConfig {
  role: InterviewRole
  type: InterviewType
  difficulty: DifficultyLevel
  timePerQuestion: number // seconds
  totalQuestions: number
}

export interface InterviewQuestion {
  id: string
  text: string
  category: QuestionCategory
  difficulty: DifficultyLevel
  followUp?: string
  expectedTopics: string[]
  timeLimit: number
}

export interface InterviewAnswer {
  questionId: string
  transcript: string
  audioBlob?: Blob
  duration: number
  fillerWords: FillerWordInstance[]
  confidenceScore: number
  speechRate: number
}

export interface FillerWordInstance {
  word: string
  timestamp: number
  count: number
}

export type InterviewStatus = "idle" | "setup" | "in-progress" | "processing" | "completed"

export interface InterviewSession {
  id: string
  config: InterviewConfig
  questions: InterviewQuestion[]
  answers: InterviewAnswer[]
  currentQuestionIndex: number
  status: InterviewStatus
  startedAt?: number
  completedAt?: number
}
