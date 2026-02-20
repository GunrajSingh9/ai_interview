export interface BehavioralFramework {
  id: string
  name: string
  description: string
  components: { key: string; label: string; description: string; weight: number }[]
}

export const starFramework: BehavioralFramework = {
  id: "star",
  name: "STAR Method",
  description: "Situation, Task, Action, Result — structured behavioral assessment",
  components: [
    {
      key: "situation",
      label: "Situation",
      description: "Did the candidate clearly describe the context and background?",
      weight: 0.15,
    },
    {
      key: "task",
      label: "Task",
      description: "Was the specific challenge or responsibility clearly articulated?",
      weight: 0.20,
    },
    {
      key: "action",
      label: "Action",
      description: "Did the candidate describe specific actions they personally took?",
      weight: 0.35,
    },
    {
      key: "result",
      label: "Result",
      description: "Were outcomes quantified or clearly described? Did they reflect on impact?",
      weight: 0.30,
    },
  ],
}

export const leadershipPrinciples = [
  { id: "ownership", label: "Ownership", description: "Takes responsibility, thinks long-term" },
  { id: "bias-for-action", label: "Bias for Action", description: "Values speed and calculated risk-taking" },
  { id: "dive-deep", label: "Dive Deep", description: "Stays connected to details and audits frequently" },
  { id: "earn-trust", label: "Earn Trust", description: "Listens attentively, speaks candidly" },
  { id: "deliver-results", label: "Deliver Results", description: "Focuses on key inputs and delivers with quality" },
  { id: "learn-and-be-curious", label: "Learn & Be Curious", description: "Always learning and seeking to improve" },
  { id: "hire-and-develop", label: "Hire & Develop the Best", description: "Raises the performance bar" },
  { id: "insist-on-standards", label: "Insist on High Standards", description: "Continually raising the bar" },
]
