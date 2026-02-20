import { motion } from "framer-motion"
import { BentoCard } from "@/components/layout/bento-grid"
import { Award, ThumbsUp, ThumbsDown, AlertTriangle, TrendingUp } from "lucide-react"
import { getRecommendationLevel } from "@/lib/utils"

interface HiringRecommendationProps {
  report: {
    overallScore: number
    recommendation: string
    strengths: string[]
    weaknesses: string[]
    improvementAreas: string[]
    riskFactors: string[]
  }
}

export function HiringRecommendation({ report }: HiringRecommendationProps) {
  const rec = getRecommendationLevel(report.overallScore)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
        <Award className="h-5 w-5 text-emerald-400" />
        Hiring Recommendation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Recommendation */}
        <BentoCard glowColor={rec.label.includes("Hire") && !rec.label.includes("No") ? "emerald" : "rose"}>
          <div className="text-center">
            <div className={`text-4xl font-extrabold ${rec.color} mb-2`}>
              {rec.label}
            </div>
            <div className="text-xs text-zinc-500">
              Based on {report.overallScore}/5 overall score
            </div>
          </div>
        </BentoCard>

        {/* Strengths */}
        <BentoCard>
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-zinc-300">Strengths</h3>
          </div>
          <ul className="space-y-1.5">
            {report.strengths.length > 0 ? (
              report.strengths.map((s, i) => (
                <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  {s}
                </li>
              ))
            ) : (
              <li className="text-xs text-zinc-500">No standout strengths identified</li>
            )}
          </ul>
        </BentoCard>

        {/* Weaknesses */}
        <BentoCard>
          <div className="flex items-center gap-2 mb-3">
            <ThumbsDown className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-semibold text-zinc-300">Weaknesses</h3>
          </div>
          <ul className="space-y-1.5">
            {report.weaknesses.length > 0 ? (
              report.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                  {w}
                </li>
              ))
            ) : (
              <li className="text-xs text-zinc-500">No significant weaknesses</li>
            )}
          </ul>
        </BentoCard>

        {/* Improvement Areas */}
        <BentoCard>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-zinc-300">To Improve</h3>
          </div>
          <ul className="space-y-1.5">
            {report.improvementAreas.slice(0, 4).map((area, i) => (
              <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>
        </BentoCard>
      </div>

      {/* Risk factors */}
      {report.riskFactors.length > 0 && (
        <div className="mt-4 glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-zinc-300">Risk Factors</h3>
          </div>
          <ul className="space-y-1">
            {report.riskFactors.map((risk, i) => (
              <li key={i} className="text-xs text-zinc-400">• {risk}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}
