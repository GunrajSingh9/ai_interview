import { cn } from "@/lib/utils"
import type { InterviewRole } from "@/types/interview"

interface RoleSelectorProps {
  roles: { value: InterviewRole; label: string; icon: string; description: string }[]
  selected: InterviewRole
  onSelect: (role: InterviewRole) => void
}

export function RoleSelector({ roles, selected, onSelect }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {roles.map((role) => (
        <button
          key={role.value}
          onClick={() => onSelect(role.value)}
          className={cn(
            "p-4 rounded-xl text-left transition-all duration-200",
            selected === role.value
              ? "glass border-emerald-400/30 bg-emerald-400/5 shadow-[0_0_20px_-5px_rgba(52,211,153,0.2)]"
              : "glass glass-hover"
          )}
        >
          <span className="text-2xl">{role.icon}</span>
          <div className={cn(
            "text-sm font-semibold mt-2",
            selected === role.value ? "text-emerald-400" : "text-zinc-200"
          )}>
            {role.label}
          </div>
          <div className="text-xs text-zinc-500 mt-1">{role.description}</div>
        </button>
      ))}
    </div>
  )
}
