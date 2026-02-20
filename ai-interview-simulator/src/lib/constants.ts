import type { InterviewRole, DifficultyLevel, InterviewType } from "@/types/interview"

export const ROLES: { value: InterviewRole; label: string; icon: string; description: string }[] = [
  { value: "frontend", label: "Frontend Engineer", icon: "🎨", description: "React, CSS, Performance, Accessibility" },
  { value: "backend", label: "Backend Engineer", icon: "⚙️", description: "APIs, Databases, System Design" },
  { value: "fullstack", label: "Fullstack Engineer", icon: "🔗", description: "End-to-end development" },
  { value: "machine-learning", label: "ML Engineer", icon: "🧠", description: "Models, Training, MLOps" },
  { value: "data-science", label: "Data Scientist", icon: "📊", description: "Analysis, Statistics, ML" },
  { value: "devops", label: "DevOps Engineer", icon: "🚀", description: "CI/CD, Infrastructure, Cloud" },
]

export const DIFFICULTIES: { value: DifficultyLevel; label: string; description: string; color: string }[] = [
  { value: "junior", label: "Junior", description: "0-2 years experience", color: "text-emerald-400" },
  { value: "mid", label: "Mid-Level", description: "2-5 years experience", color: "text-blue-400" },
  { value: "senior", label: "Senior", description: "5-8 years experience", color: "text-violet-400" },
  { value: "staff", label: "Staff+", description: "8+ years experience", color: "text-amber-400" },
]

export const INTERVIEW_TYPES: { value: InterviewType; label: string; description: string }[] = [
  { value: "behavioral", label: "Behavioral", description: "STAR method, leadership, collaboration" },
  { value: "technical", label: "Technical", description: "System design, coding concepts, architecture" },
  { value: "mixed", label: "Mixed", description: "Blend of behavioral and technical" },
]

export const TIME_OPTIONS = [
  { value: 60, label: "1 min" },
  { value: 120, label: "2 min" },
  { value: 180, label: "3 min" },
  { value: 300, label: "5 min" },
]

export const QUESTION_COUNT_OPTIONS = [3, 5, 7, 10]

export const TECH_STACK_ITEMS = [
  "React", "TypeScript", "Tailwind CSS", "Framer Motion", "OpenAI Whisper",
  "GPT-4", "WebRTC", "Zustand", "Recharts", "Vite", "Vercel",
  "shadcn/ui", "Radix UI", "Web Audio API", "MediaRecorder",
]
