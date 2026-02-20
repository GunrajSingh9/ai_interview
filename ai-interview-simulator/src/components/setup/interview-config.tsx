import { motion } from "framer-motion"
import { ArrowRight, Key } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useInterviewStore } from "@/store/interview-store"
import { ROLES, DIFFICULTIES, INTERVIEW_TYPES, TIME_OPTIONS, QUESTION_COUNT_OPTIONS } from "@/lib/constants"
import { RoleSelector } from "./role-selector"
import { DifficultyPicker } from "./difficulty-picker"
import { cn } from "@/lib/utils"

export function InterviewConfig() {
  const navigate = useNavigate()
  const { config, setConfig, setApiKey, apiKey, startInterview } = useInterviewStore()

  const handleStart = () => {
    startInterview()
    navigate("/interview")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-3">
          Configure Your <span className="gradient-text">Interview</span>
        </h1>
        <p className="text-zinc-400">Customize the session to match your target role and experience level.</p>
      </motion.div>

      {/* Role Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-zinc-200 mb-4">Select Role</h2>
        <RoleSelector
          roles={ROLES}
          selected={config.role}
          onSelect={(role) => setConfig({ role })}
        />
      </motion.div>

      {/* Difficulty */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-zinc-200 mb-4">Difficulty Level</h2>
        <DifficultyPicker
          difficulties={DIFFICULTIES}
          selected={config.difficulty}
          onSelect={(difficulty) => setConfig({ difficulty })}
        />
      </motion.div>

      {/* Interview Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-zinc-200 mb-4">Interview Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {INTERVIEW_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => setConfig({ type: type.value })}
              className={cn(
                "p-4 rounded-xl text-left transition-all duration-200",
                config.type === type.value
                  ? "glass border-emerald-400/30 bg-emerald-400/5"
                  : "glass glass-hover"
              )}
            >
              <div className={cn(
                "text-sm font-semibold mb-1",
                config.type === type.value ? "text-emerald-400" : "text-zinc-200"
              )}>
                {type.label}
              </div>
              <div className="text-xs text-zinc-500">{type.description}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Time & Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-200 mb-4">Time Per Question</h2>
          <div className="flex gap-2">
            {TIME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setConfig({ timePerQuestion: opt.value })}
                className={cn(
                  "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all",
                  config.timePerQuestion === opt.value
                    ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/30"
                    : "glass glass-hover text-zinc-400"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-200 mb-4">Number of Questions</h2>
          <div className="flex gap-2">
            {QUESTION_COUNT_OPTIONS.map((count) => (
              <button
                key={count}
                onClick={() => setConfig({ totalQuestions: count })}
                className={cn(
                  "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all",
                  config.totalQuestions === count
                    ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/30"
                    : "glass glass-hover text-zinc-400"
                )}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* API Key (Optional) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Key className="h-4 w-4 text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-300">OpenAI API Key (Optional)</h2>
        </div>
        <p className="text-xs text-zinc-500 mb-3">
          Add your API key for real Whisper transcription and GPT-4 scoring. Without it, the app uses realistic mock data.
        </p>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400/50 transition-colors"
        />
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center pt-4"
      >
        <button
          onClick={handleStart}
          className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-lg hover:bg-emerald-400 transition-all duration-200 shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)] hover:shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)]"
        >
          Begin Interview
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  )
}
