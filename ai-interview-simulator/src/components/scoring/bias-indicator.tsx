import { ShieldCheck, ShieldAlert } from "lucide-react"
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
      <div className="flex items-center gap-2 mb-4">
        {isClean ? (
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
        ) : (
          <ShieldAlert className="h-4 w-4 text-yellow-400" />
        )}
        <h3 className="text-sm font-semibold text-zinc-300">Bias Analysis</h3>
      </div>

      {isClean ? (
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <p className="text-sm text-emerald-400 font-medium">No bias detected</p>
          <p className="text-xs text-zinc-500 mt-1">
            Blind scoring, multi-pass evaluation, and demographic-neutral language applied.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {combinedFlags.map((flag, i) => (
            <div key={i} className="p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/10">
              <div className="text-xs font-medium text-yellow-400 mb-1 capitalize">
                {flag.type.replace(/-/g, " ")}
              </div>
              <p className="text-xs text-zinc-400">{flag.description}</p>
              <p className="text-xs text-zinc-500 mt-1">
                Mitigation: {flag.mitigationApplied}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Always show mitigations applied */}
      <div className="mt-4 pt-3 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 font-medium mb-2">Protections Applied:</p>
        <ul className="space-y-1">
          {["Blind scoring (identifiers stripped)", "Multi-pass evaluation", "Calibration anchors", "Statistical normalization"].map((item) => (
            <li key={item} className="text-xs text-zinc-500 flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
