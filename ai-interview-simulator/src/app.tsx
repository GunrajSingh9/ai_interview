import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { NavBar } from "@/components/layout/nav-bar"
import { LandingPage } from "@/pages/landing-page"
import { SetupPage } from "@/pages/setup-page"
import { InterviewPage } from "@/pages/interview-page"
import { ResultsPage } from "@/pages/results-page"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  )
}
