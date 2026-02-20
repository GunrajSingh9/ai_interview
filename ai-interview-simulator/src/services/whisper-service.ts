import { delay } from "@/lib/utils"

const WHISPER_API_URL = "https://api.openai.com/v1/audio/transcriptions"

export async function transcribeAudio(audioBlob: Blob, apiKey?: string): Promise<string> {
  if (apiKey) {
    try {
      return await transcribeWithWhisper(audioBlob, apiKey)
    } catch (error) {
      console.warn("Whisper transcription failed, using mock:", error)
    }
  }
  return generateMockTranscript()
}

async function transcribeWithWhisper(audioBlob: Blob, apiKey: string): Promise<string> {
  const formData = new FormData()
  formData.append("file", audioBlob, "recording.webm")
  formData.append("model", "whisper-1")
  formData.append("language", "en")

  const response = await fetch(WHISPER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  })

  if (!response.ok) throw new Error(`Whisper API error: ${response.statusText}`)

  const data = await response.json()
  return data.text
}

const mockTranscripts = [
  "So when I faced this challenge, I first analyzed the root cause by looking at our monitoring dashboards and logs. I noticed that the database queries were taking significantly longer after a recent deployment. I basically, you know, went through each query and found that a missing index on the users table was causing full table scans. After adding the index, response times dropped by 80 percent. I then set up automated alerts to catch similar regressions early.",

  "The way I approach system design is to start with the requirements. For a URL shortener, we need to handle, um, high read throughput since redirects happen much more frequently than URL creation. I would use a base-62 encoding scheme for generating short codes, with a distributed counter to avoid collisions. For storage, I'd actually use a key-value store like Redis for fast lookups, backed by a relational database for persistence. The whole thing would sit behind a load balancer with CDN caching for popular URLs.",

  "React uses what's called a virtual DOM, which is basically a lightweight JavaScript representation of the actual DOM. When state changes, React creates a new virtual tree and compares it with the previous one through a process called reconciliation. It uses a diffing algorithm that, well, operates in O(n) time by making two assumptions: elements of different types produce different trees, and developers can hint at which child elements are stable with keys. Only the actual changes get applied to the real DOM, which is much more efficient.",

  "In my previous role, I led the migration from a monolithic architecture to microservices. The approach I took was the strangler fig pattern, where we gradually replaced components of the monolith with independent services. We started with the least coupled component, which was the notification system. I established clear API contracts between services and implemented an event-driven architecture using message queues. The migration took about six months and resulted in a 40 percent improvement in deployment frequency.",

  "For handling the cold start problem in a recommendation system, I would implement a hybrid approach. For new users, we can use content-based recommendations based on their initial preferences and demographic data. For new items, we can use item features and metadata to find similar items that already have ratings. As we collect more interaction data, the system gradually shifts toward collaborative filtering. I'd also implement an explore-exploit strategy using multi-armed bandits to balance showing recommendations we're confident about with discovering new user preferences.",
]

export async function generateMockTranscript(): Promise<string> {
  await delay(500 + Math.random() * 1000)
  return mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)]
}
