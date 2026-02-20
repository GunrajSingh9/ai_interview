import { motion } from "framer-motion"
import { Award, ThumbsUp, ThumbsDown, TrendingUp, AlertTriangle, Sparkles, CheckCircle2 } from "lucide-react"
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
  const isPositive = rec.label.includes("Hire") && !rec.label.includes("No")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Hiring Decision</h2>
        <p className="text-sm text-zinc-500">AI-powered recommendation based on structured evaluation</p>
      </div>

      <div className={`relative overflow-hidden rounded-2xl p-8 text-center mb-8 ${
        isPositive 
          ? 'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20' 
          : 'bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent border border-rose-500/20'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/50 via-transparent to-transparent" />
        <div className="relative">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
            isPositive ? 'bg-emerald-500/20' : 'bg-rose-500/20'
          }`}>
            {isPositive ? (
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            ) : (
              <ThumbsDown className="h-8 w-8 text-rose-400" />
            )}
          </div>
          <div className={`text-5xl font-extrabold mb-3 ${rec.color}`}>
            {rec.label}
          </div>
          <div className="text-sm text-zinc-400">
            Based on overall score of <span className="font-semibold text-zinc-200">{report.overallScore}/5</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl p-5 bg-emerald-500/5 border border-emerald-500/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <ThumbsUp className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-100">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {report.strengths.length > 0 ? (
              report.strengths.map((s, i) => (
                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                  {s}
                </li>
              ))
            ) : (
              <li className="text-sm text-zinc-500">No standout strengths identified</li>
            )}
          </ul>
        </div>

        <div className="rounded-xl p-5 bg-rose-500/5 border border-rose-500/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-rose-500/10">
              <ThumbsDown className="h-4 w-4 text-rose-400" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-100">Weaknesses</h3>
          </div>
          <ul className="space-y-2">
            {report.weaknesses.length > 0 ? (
              report.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                  {w}
                </li>
              ))
            ) : (
              <li className="text-sm text-zinc-500">No significant weaknesses</li>
            )}
          </ul>
        </div>

        <div className="rounded-xl p-5 bg-violet-500/5 border border-violet-500/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-violet-500/10">
              <Sparkles className="h-4 w-4 text-violet-400" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-100">To Improve</h3>
          </div>
          <ul className="space-y-2">
            {report.improvementAreas.slice(0, 3).map((area, i) => (
              <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {report.riskFactors.length > 0 && (
        <div className="mt-4 rounded-xl p-4 bg-yellow-500/5 border border-yellow-500/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-zinc-200">Risk Factors</h3>
          </div>
          <ul className="space-y-1">
            {report.riskFactors.map((risk, i) => (
              <li key={i} className="text-sm text-zinc-400">• {risk}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}
