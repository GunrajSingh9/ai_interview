import { Mic, Square, ArrowRight, Loader2, CheckCircle } from "lucide-react"

interface RecordingControlsProps {
  isRecording: boolean
  isProcessing: boolean
  hasTranscript: boolean
  isLastQuestion: boolean
  onStart: () => void
  onStop: () => void
  onNext: () => void
}

export function RecordingControls({
  isRecording,
  isProcessing,
  hasTranscript,
  isLastQuestion,
  onStart,
  onStop,
  onNext,
}: RecordingControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {!isRecording && !hasTranscript && !isProcessing && (
        <button
          onClick={onStart}
          className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 transition-all shadow-[0_0_20px_-5px_rgba(52,211,153,0.4)]"
        >
          <div className="relative">
            <Mic className="h-5 w-5" />
          </div>
          Start Recording
        </button>
      )}

      {isRecording && (
        <button
          onClick={onStop}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-400 transition-all shadow-[0_0_20px_-5px_rgba(251,113,133,0.4)]"
        >
          <Square className="h-4 w-4 fill-current" />
          Stop Recording
        </button>
      )}

      {isProcessing && (
        <div className="flex items-center gap-2 px-6 py-3 rounded-xl glass text-zinc-300">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </div>
      )}

      {hasTranscript && !isRecording && !isProcessing && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle className="h-4 w-4" />
            Answer recorded
          </div>
          <button
            onClick={onNext}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 transition-all shadow-[0_0_20px_-5px_rgba(52,211,153,0.4)]"
          >
            {isLastQuestion ? "Finish Interview" : "Next Question"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  )
}
