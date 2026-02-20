import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import type { AnswerScore, ScoreDimension } from "@/types/scoring"

interface RadarChartProps {
  scores: AnswerScore[]
}

const dimensionLabels: Record<ScoreDimension, string> = {
  correctness: "Correctness",
  depth: "Depth",
  communication: "Communication",
  "problem-solving": "Problem Solving",
  relevance: "Relevance",
}

export function RadarChart({ scores }: RadarChartProps) {
  // Average scores across all answers for each dimension
  const dimensions: ScoreDimension[] = ["correctness", "depth", "communication", "problem-solving", "relevance"]

  const data = dimensions.map((dim) => {
    const dimScores = scores.flatMap((s) => s.dimensions.filter((d) => d.dimension === dim).map((d) => d.score))
    const avg = dimScores.length > 0 ? dimScores.reduce((a, b) => a + b, 0) / dimScores.length : 0
    return {
      dimension: dimensionLabels[dim],
      score: Math.round(avg * 10) / 10,
      fullMark: 5,
    }
  })

  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">Skill Radar</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#3f3f46" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fill: "#71717a", fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#34d399"
            fill="#34d399"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}
