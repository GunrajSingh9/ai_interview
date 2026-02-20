import { BentoGrid, BentoCard } from "@/components/layout/bento-grid"
import { Mic, Brain, BarChart3, ShieldCheck, Lightbulb, Target } from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Speech-to-Text",
    description: "Real-time transcription powered by OpenAI Whisper. Captures every word with filler word detection and speech rate analysis.",
    colSpan: 2 as const,
    glowColor: "emerald" as const,
    iconColor: "text-emerald-400",
  },
  {
    icon: Brain,
    title: "AI Rubric Scoring",
    description: "5-dimension evaluation: Correctness, Depth, Communication, Problem Solving, and Relevance.",
    colSpan: 1 as const,
    glowColor: "violet" as const,
    iconColor: "text-violet-400",
  },
  {
    icon: ShieldCheck,
    title: "Bias Reduction",
    description: "Blind scoring, multi-pass evaluation, and demographic-neutral language detection for fair assessment.",
    colSpan: 1 as const,
    glowColor: "rose" as const,
    iconColor: "text-rose-400",
  },
  {
    icon: BarChart3,
    title: "Confidence Analysis",
    description: "Real-time confidence meter based on speech rate, pause frequency, filler word ratio, and volume consistency.",
    colSpan: 1 as const,
    glowColor: "emerald" as const,
    iconColor: "text-emerald-400",
  },
  {
    icon: Target,
    title: "Score Calibration",
    description: "Anchor-based scoring calibration ensures consistent evaluation across all candidates and sessions.",
    colSpan: 1 as const,
    glowColor: "violet" as const,
    iconColor: "text-violet-400",
  },
  {
    icon: Lightbulb,
    title: "Explainable Scores",
    description: "Every score comes with evidence from your transcript, improvement suggestions, and comparison to ideal answers.",
    colSpan: 2 as const,
    glowColor: "emerald" as const,
    iconColor: "text-yellow-400",
  },
]

export function FeatureGrid() {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
          Built for{" "}
          <span className="gradient-text-violet">Serious Practice</span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Every feature is designed to replicate and improve upon real structured interview processes used at top companies.
        </p>
      </div>

      <BentoGrid className="lg:grid-cols-3">
        {features.map((feature, i) => (
          <BentoCard
            key={feature.title}
            colSpan={feature.colSpan}
            delay={i * 0.1}
            glowColor={feature.glowColor}
          >
            <feature.icon className={`h-8 w-8 ${feature.iconColor} mb-4`} />
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">{feature.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
          </BentoCard>
        ))}
      </BentoGrid>
    </section>
  )
}
