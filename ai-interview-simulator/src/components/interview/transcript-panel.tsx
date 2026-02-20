import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { FILLER_WORDS } from "@/types/analysis"

interface TranscriptPanelProps {
  transcript: string
}

export function TranscriptPanel({ transcript }: TranscriptPanelProps) {
  const highlightFillerWords = (text: string) => {
    let result = text
    for (const filler of FILLER_WORDS) {
      const regex = new RegExp(`\\b(${filler})\\b`, "gi")
      result = result.replace(
        regex,
        `<mark class="bg-rose-400/20 text-rose-300 px-0.5 rounded">$1</mark>`
      )
    }
    return result
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-zinc-400" />
        <h3 className="text-sm font-semibold text-zinc-300">Transcript</h3>
        <span className="text-xs text-rose-400/70 ml-auto">Filler words highlighted</span>
      </div>
      <p
        className="text-sm text-zinc-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlightFillerWords(transcript) }}
      />
    </motion.div>
  )
}
