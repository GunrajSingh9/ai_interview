import { cn } from "@/lib/utils"
import type { DifficultyLevel } from "@/types/interview"

interface DifficultyPickerProps {
  difficulties: { value: DifficultyLevel; label: string; description: string; color: string }[]
  selected: DifficultyLevel
  onSelect: (difficulty: DifficultyLevel) => void
}

export function DifficultyPicker({ difficulties, selected, onSelect }: DifficultyPickerProps) {
  return (
    <div className="flex gap-3">
      {difficulties.map((diff) => (
        <button
          key={diff.value}
          onClick={() => onSelect(diff.value)}
          className={cn(
            "flex-1 p-4 rounded-xl text-center transition-all duration-200",
            selected === diff.value
              ? "glass border-emerald-400/30 bg-emerald-400/5"
              : "glass glass-hover"
          )}
        >
          <div className={cn(
            "text-sm font-bold",
            selected === diff.value ? diff.color : "text-zinc-300"
          )}>
            {diff.label}
          </div>
          <div className="text-xs text-zinc-500 mt-1">{diff.description}</div>
        </button>
      ))}
    </div>
  )
}
