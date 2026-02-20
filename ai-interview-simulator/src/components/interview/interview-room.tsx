import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useInterviewStore } from "@/store/interview-store"
import { QuestionDisplay } from "./question-display"
import { AudioVisualizer } from "./audio-visualizer"
import { RecordingControls } from "./recording-controls"
import { TranscriptPanel } from "./transcript-panel"
import { TimerDisplay } from "./timer-display"
import { ConfidenceMeter } from "./confidence-meter"
import { generateMockTranscript } from "@/services/whisper-service"
import type { InterviewAnswer } from "@/types/interview"
import { Loader2 } from "lucide-react"

export function InterviewRoom() {
  const navigate = useNavigate()
  const { session, submitAnswer, nextQuestion, completeInterview, status } = useInterviewStore()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [currentConfidence, setCurrentConfidence] = useState(65)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!session || status !== "in-progress") {
    if (status === "processing") {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <Loader2 className="h-12 w-12 text-emerald-400 animate-spin" />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Analyzing Your Interview</h2>
            <p className="text-zinc-400">Scoring answers, detecting bias, calibrating results...</p>
          </div>
        </div>
      )
    }
    navigate("/setup")
    return null
  }

  const currentQuestion = session.questions[session.currentQuestionIndex]
  const isLastQuestion = session.currentQuestionIndex === session.questions.length - 1

  const handleStartRecording = useCallback(() => {
    setIsRecording(true)
    setTranscript("")
    // Simulate real-time confidence fluctuation
    const interval = setInterval(() => {
      setCurrentConfidence((prev) => {
        const delta = (Math.random() - 0.5) * 10
        return Math.min(100, Math.max(20, prev + delta))
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleStopRecording = useCallback(async () => {
    setIsRecording(false)
    setIsProcessing(true)

    // Get transcript (mock or real)
    const text = await generateMockTranscript()
    setTranscript(text)

    const answer: InterviewAnswer = {
      questionId: currentQuestion.id,
      transcript: text,
      duration: 60 + Math.random() * 60,
      fillerWords: [],
      confidenceScore: currentConfidence,
      speechRate: 130 + Math.random() * 40,
    }

    submitAnswer(answer)
    setIsProcessing(false)
  }, [currentQuestion, currentConfidence, submitAnswer])

  const handleNext = useCallback(async () => {
    if (isLastQuestion) {
      await completeInterview()
      navigate("/results")
    } else {
      nextQuestion()
      setTranscript("")
      setCurrentConfidence(65)
    }
  }, [isLastQuestion, completeInterview, nextQuestion, navigate])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <motion.div
            className="h-full bg-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((session.currentQuestionIndex + 1) / session.questions.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-sm text-zinc-400 font-medium">
          {session.currentQuestionIndex + 1}/{session.questions.length}
        </span>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Question + Transcript */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            <QuestionDisplay
              key={currentQuestion.id}
              question={currentQuestion}
              index={session.currentQuestionIndex}
            />
          </AnimatePresence>

          {/* Audio Visualizer */}
          <div className="glass rounded-xl p-6">
            <AudioVisualizer isActive={isRecording} />
            <RecordingControls
              isRecording={isRecording}
              isProcessing={isProcessing}
              hasTranscript={transcript.length > 0}
              isLastQuestion={isLastQuestion}
              onStart={handleStartRecording}
              onStop={handleStopRecording}
              onNext={handleNext}
            />
          </div>

          {/* Transcript */}
          <AnimatePresence>
            {transcript && <TranscriptPanel transcript={transcript} />}
          </AnimatePresence>
        </div>

        {/* Right: Timer + Confidence */}
        <div className="space-y-4">
          <TimerDisplay
            timeLimit={currentQuestion.timeLimit}
            isRunning={isRecording}
            onTimeUp={handleStopRecording}
          />
          <ConfidenceMeter score={currentConfidence} isActive={isRecording} />

          {/* Question info */}
          <div className="glass rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-zinc-300">Question Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Category</span>
                <span className="text-zinc-300 capitalize">{currentQuestion.category.replace("-", " ")}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Difficulty</span>
                <span className="text-zinc-300 capitalize">{currentQuestion.difficulty}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Expected Topics</span>
                <span className="text-zinc-300 text-right max-w-[60%]">
                  {currentQuestion.expectedTopics.slice(0, 3).join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
