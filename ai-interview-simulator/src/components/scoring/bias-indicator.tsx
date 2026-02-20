import { ShieldCheck, ShieldAlert, Shield } from "lucide-react"
import type { AnswerScore } from "@/types/scoring"
import { detectBiasPatterns } from "@/services/bias-reduction"

interface BiasIndicatorProps {
  scores: AnswerScore[]
}

export function BiasIndicator({ scores }: BiasIndicatorProps) {
  const biasFlags = detectBiasPatterns(scores)
  const allFlags = scores.flatMap((s) => s.biasFlags)
  const combinedFlags = [...biasFlags, ...allFlags]
  const isClean = combinedFlags.length === 0

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className={`p-1.5 rounded-lg ${isClean ? 'bg-emerald-500/10' : 'bg-yellow-500/10'}`}>
          {isClean ? (
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          ) : (
            <ShieldAlert className="h-4 w-4 text-yellow-400" />
          )}
        </div>
        <h3 className="text-sm font-semibold text-zinc-100">Bias Analysis</h3>
      </div>

      {isClean ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-7 w-7 text-emerald-400" />
          </div>
          <p className="text-base text-emerald-400 font-semibold mb-2">No bias detected</p>
          <p className="text-xs text-zinc-500 max-w-[200px] mx-auto">
            All responses scored fairly with blind evaluation
          </p>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          {combinedFlags.map((flag, i) => (
            <div key={i} className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="h-4 w-4 text-yellow-400" />
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wide">
                  {flag.type.replace(/-/g, " ")}
                </span>
              </div>
              <p className="text-xs text-zinc-400">{flag.description}</p>
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                {flag.mitigationApplied}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-400 font-medium mb-3">Protections Applied</p>
        <div className="grid grid-cols-2 gap-2">
          {["Blind scoring", "Multi-pass eval", "Calibration", "Normalization"].map((item) => (
            <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/30">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-zinc-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
