import type { InterviewQuestion, InterviewRole, QuestionCategory, DifficultyLevel } from "@/types/interview"

interface QuestionTemplate {
  text: string
  category: QuestionCategory
  difficulty: DifficultyLevel
  roles: InterviewRole[]
  followUp: string
  expectedTopics: string[]
}

const questionTemplates: QuestionTemplate[] = [
  // Behavioral Questions
  {
    text: "Tell me about a time you had to make a difficult technical decision under pressure. What was the situation, and what did you do?",
    category: "behavioral",
    difficulty: "mid",
    roles: ["frontend", "backend", "fullstack", "machine-learning", "data-science", "devops"],
    followUp: "What would you do differently if faced with the same situation today?",
    expectedTopics: ["decision-making", "pressure management", "trade-offs", "outcome"],
  },
  {
    text: "Describe a project where you had to collaborate with a team that had conflicting opinions on the technical approach.",
    category: "behavioral",
    difficulty: "mid",
    roles: ["frontend", "backend", "fullstack", "machine-learning", "data-science", "devops"],
    followUp: "How did you ensure everyone felt heard while still moving forward?",
    expectedTopics: ["collaboration", "conflict resolution", "communication", "compromise"],
  },
  {
    text: "Tell me about a time you identified and fixed a critical production bug. Walk me through your debugging process.",
    category: "behavioral",
    difficulty: "senior",
    roles: ["frontend", "backend", "fullstack", "devops"],
    followUp: "What processes did you put in place to prevent similar issues?",
    expectedTopics: ["debugging", "incident response", "root cause analysis", "prevention"],
  },
  {
    text: "Describe a situation where you had to learn a new technology quickly to deliver on a project.",
    category: "behavioral",
    difficulty: "junior",
    roles: ["frontend", "backend", "fullstack", "machine-learning", "data-science", "devops"],
    followUp: "How do you approach learning new technologies in general?",
    expectedTopics: ["learning ability", "adaptability", "resourcefulness", "time management"],
  },
  {
    text: "Tell me about a time you mentored someone or helped a teammate grow technically.",
    category: "behavioral",
    difficulty: "senior",
    roles: ["frontend", "backend", "fullstack", "machine-learning", "data-science", "devops"],
    followUp: "How do you balance mentoring with your own deliverables?",
    expectedTopics: ["mentorship", "leadership", "knowledge sharing", "empathy"],
  },

  // Frontend Technical
  {
    text: "Explain the Virtual DOM in React. Why does React use it, and how does reconciliation work?",
    category: "coding-concepts",
    difficulty: "mid",
    roles: ["frontend", "fullstack"],
    followUp: "How does React Fiber improve on the original reconciliation algorithm?",
    expectedTopics: ["virtual DOM", "diffing", "reconciliation", "performance", "batch updates"],
  },
  {
    text: "How would you optimize a React application that has become slow with many re-renders?",
    category: "problem-solving",
    difficulty: "senior",
    roles: ["frontend", "fullstack"],
    followUp: "What tools would you use to profile and measure the improvements?",
    expectedTopics: ["memoization", "React.memo", "useMemo", "useCallback", "code splitting", "profiler"],
  },
  {
    text: "Design a real-time collaborative text editor. What are the key technical challenges?",
    category: "system-design",
    difficulty: "staff",
    roles: ["frontend", "fullstack"],
    followUp: "How would you handle conflict resolution when two users edit the same section?",
    expectedTopics: ["CRDT", "OT", "WebSocket", "state sync", "conflict resolution"],
  },
  {
    text: "Explain the difference between CSS Grid and Flexbox. When would you use each?",
    category: "coding-concepts",
    difficulty: "junior",
    roles: ["frontend", "fullstack"],
    followUp: "Can you give an example of a layout that's better suited for Grid vs Flexbox?",
    expectedTopics: ["layout", "2D vs 1D", "grid areas", "flex direction", "responsive design"],
  },

  // Backend Technical
  {
    text: "How would you design an API rate limiter? Walk me through the algorithms and trade-offs.",
    category: "system-design",
    difficulty: "senior",
    roles: ["backend", "fullstack", "devops"],
    followUp: "How would you handle rate limiting in a distributed system with multiple servers?",
    expectedTopics: ["token bucket", "sliding window", "Redis", "distributed systems", "HTTP 429"],
  },
  {
    text: "Explain the CAP theorem and how it applies to database selection for a microservices architecture.",
    category: "coding-concepts",
    difficulty: "senior",
    roles: ["backend", "fullstack"],
    followUp: "Give an example of when you'd choose eventual consistency over strong consistency.",
    expectedTopics: ["consistency", "availability", "partition tolerance", "trade-offs", "eventual consistency"],
  },
  {
    text: "What is the difference between SQL and NoSQL databases? When would you choose one over the other?",
    category: "coding-concepts",
    difficulty: "junior",
    roles: ["backend", "fullstack", "data-science"],
    followUp: "What about NewSQL databases? When might they be appropriate?",
    expectedTopics: ["relational", "document store", "ACID", "scalability", "schema flexibility"],
  },
  {
    text: "Design a URL shortener service like bit.ly. How would you handle billions of URLs?",
    category: "system-design",
    difficulty: "mid",
    roles: ["backend", "fullstack"],
    followUp: "How would you handle analytics and track click-through rates?",
    expectedTopics: ["hashing", "base62", "database design", "caching", "redirect", "analytics"],
  },

  // ML / Data Science
  {
    text: "Explain the bias-variance trade-off. How do you diagnose whether a model suffers from high bias or high variance?",
    category: "coding-concepts",
    difficulty: "mid",
    roles: ["machine-learning", "data-science"],
    followUp: "What regularization techniques would you use for each case?",
    expectedTopics: ["underfitting", "overfitting", "cross-validation", "regularization", "learning curves"],
  },
  {
    text: "Design a recommendation system for an e-commerce platform. What approaches would you consider?",
    category: "system-design",
    difficulty: "senior",
    roles: ["machine-learning", "data-science"],
    followUp: "How would you handle the cold start problem for new users and items?",
    expectedTopics: ["collaborative filtering", "content-based", "hybrid", "matrix factorization", "cold start"],
  },
  {
    text: "What is the difference between batch processing and stream processing for ML pipelines?",
    category: "architecture",
    difficulty: "mid",
    roles: ["machine-learning", "data-science", "devops"],
    followUp: "When would you choose one over the other in a production ML system?",
    expectedTopics: ["latency", "throughput", "Kafka", "Spark", "real-time inference"],
  },

  // DevOps
  {
    text: "Explain the concept of Infrastructure as Code. What are the benefits, and what tools would you use?",
    category: "coding-concepts",
    difficulty: "mid",
    roles: ["devops", "backend", "fullstack"],
    followUp: "How do you manage secrets and sensitive configuration in IaC?",
    expectedTopics: ["Terraform", "CloudFormation", "reproducibility", "version control", "drift detection"],
  },
  {
    text: "Design a CI/CD pipeline for a microservices application with 20+ services. What are the key considerations?",
    category: "system-design",
    difficulty: "senior",
    roles: ["devops", "backend"],
    followUp: "How would you handle database migrations across services?",
    expectedTopics: ["pipeline stages", "testing strategy", "canary deployment", "rollback", "monitoring"],
  },

  // Problem Solving
  {
    text: "You notice that your application's response time has increased by 3x over the past week. How would you investigate and resolve this?",
    category: "problem-solving",
    difficulty: "mid",
    roles: ["frontend", "backend", "fullstack", "devops"],
    followUp: "What monitoring and alerting would you set up to catch this earlier?",
    expectedTopics: ["monitoring", "profiling", "bottleneck identification", "APM", "logging"],
  },
  {
    text: "Your team is tasked with migrating a monolithic application to microservices. How would you approach this?",
    category: "architecture",
    difficulty: "staff",
    roles: ["backend", "fullstack", "devops"],
    followUp: "What are the biggest risks, and how would you mitigate them?",
    expectedTopics: ["strangler fig", "bounded contexts", "API gateway", "data migration", "incremental approach"],
  },
]

let questionIdCounter = 0

export function generateQuestions(
  role: InterviewRole,
  difficulty: DifficultyLevel,
  type: "behavioral" | "technical" | "mixed",
  count: number,
  timePerQuestion: number
): InterviewQuestion[] {
  const behavioralCategories: QuestionCategory[] = ["behavioral"]
  const technicalCategories: QuestionCategory[] = ["system-design", "coding-concepts", "problem-solving", "architecture"]

  let filtered = questionTemplates.filter((q) => q.roles.includes(role))

  if (type === "behavioral") {
    filtered = filtered.filter((q) => behavioralCategories.includes(q.category))
  } else if (type === "technical") {
    filtered = filtered.filter((q) => technicalCategories.includes(q.category))
  }

  // Sort by difficulty proximity
  const difficultyOrder: DifficultyLevel[] = ["junior", "mid", "senior", "staff"]
  const targetIdx = difficultyOrder.indexOf(difficulty)
  filtered.sort((a, b) => {
    const aDist = Math.abs(difficultyOrder.indexOf(a.difficulty) - targetIdx)
    const bDist = Math.abs(difficultyOrder.indexOf(b.difficulty) - targetIdx)
    return aDist - bDist
  })

  // Shuffle with proximity bias
  const shuffled = filtered.sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)

  return selected.map((q) => ({
    id: `q-${++questionIdCounter}`,
    text: q.text,
    category: q.category,
    difficulty: q.difficulty,
    followUp: q.followUp,
    expectedTopics: q.expectedTopics,
    timeLimit: timePerQuestion,
  }))
}
