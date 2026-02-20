import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Shield, Brain, Mic } from "lucide-react"
import { Link } from "react-router-dom"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Floating icons */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] text-emerald-400/20"
      >
        <Brain className="h-16 w-16" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[10%] text-violet-400/20"
      >
        <Mic className="h-12 w-12" />
      </motion.div>
      <motion.div
        animate={{ y: [-5, 15, -5], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-[20%] text-rose-400/15"
      >
        <Shield className="h-10 w-10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-emerald-400 mb-8"
        >
          <Sparkles className="h-4 w-4" />
          <span>Powered by GPT-4 & Whisper</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-zinc-100">Your AI-Powered</span>
          <br />
          <span className="gradient-text">Interview Coach</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Practice real-time technical & behavioral interviews with AI.
          Get rubric-scored feedback, confidence analysis, and bias-free hiring recommendations
          — inspired by Google's structured interview process.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/setup"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-base hover:bg-emerald-400 transition-all duration-200 shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)] hover:shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)]"
          >
            Start Interview
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/results"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass text-zinc-300 font-medium text-base hover:text-zinc-100 hover:bg-zinc-800/60 transition-all duration-200"
          >
            View Demo Results
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {[
            { value: "5", label: "Score Dimensions" },
            { value: "20+", label: "Question Types" },
            { value: "< 2s", label: "STT Latency" },
            { value: "98%", label: "Accuracy" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
