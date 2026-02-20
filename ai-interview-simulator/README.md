# 🧠 InterviewAI — Real-Time AI Interview Simulator

> Practice technical & behavioral interviews with AI-powered rubric scoring, confidence analysis, and bias-free hiring recommendations — inspired by Google's structured interview process.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-interview-simulator)

## ✨ Features

### Core Interview Engine
- **Dynamic Question Generation** — Role-specific questions from a curated bank covering behavioral, system design, coding concepts, and problem solving
- **Speech-to-Text** — Real-time transcription powered by OpenAI Whisper API (with mock fallback)
- **Adaptive Difficulty** — Questions adjusted for Junior, Mid, Senior, and Staff+ levels
- **STAR Method Framework** — Behavioral evaluation using Situation, Task, Action, Result scoring

### AI-Powered Scoring
- **5-Dimension Rubric** — Each answer scored on Correctness, Depth, Communication, Problem Solving, and Relevance (1-5 scale)
- **LLM-Based Evaluation** — GPT-4 evaluates answers against structured rubrics with evidence-based explanations
- **Score Explainability** — Every score includes evidence quotes, explanations, and improvement suggestions
- **Scoring Calibration** — Anchor-based calibration ensures consistency across sessions

### Confidence & Emotion Analysis
- **Real-Time Confidence Meter** — Animated gauge tracking speech rate, pause frequency, filler words, and volume
- **Filler Word Detection** — Identifies and highlights 19+ filler words with frequency analysis
- **Speech Rate Analysis** — Tracks words-per-minute against optimal 130-170 WPM range

### Bias Reduction
- **Blind Scoring** — LLM prompts strip identifying information (names, companies, universities)
- **Multi-Pass Evaluation** — Answers scored twice with averaged results for consistency
- **Bias Pattern Detection** — Flags halo effect, anchor bias, and severity bias
- **Statistical Normalization** — Z-score normalization across scoring sessions

### Hiring Recommendation
- **Strong Hire / Hire / No Hire / Strong No Hire** — Clear recommendation with confidence intervals
- **Strengths & Weaknesses Summary** — Data-driven assessment of candidate performance
- **Risk Assessment** — Identified bias patterns and calibration flags
- **Answer-by-Answer Review** — Expandable timeline with per-question scoring breakdown

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | Framer Motion |
| State | Zustand |
| Charts | Recharts |
| Icons | Lucide React |
| STT | OpenAI Whisper API |
| Scoring | OpenAI GPT-4 API |
| Deployment | Vercel |

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-interview-simulator.git
cd ai-interview-simulator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app works **fully without an API key** using realistic mock data — perfect for demos.

### Optional: Add OpenAI API Key
For real Whisper transcription and GPT-4 scoring, add your API key in the setup screen or create a `.env` file:

```
VITE_OPENAI_API_KEY=sk-your-key-here
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Bento grid, nav bar, page wrapper
│   ├── landing/        # Hero, feature grid, tech marquee
│   ├── setup/          # Interview config, role selector, difficulty picker
│   ├── interview/      # Interview room, audio visualizer, timer, confidence meter
│   ├── scoring/        # Radar chart, rubric breakdown, bias indicator, explainability
│   └── report/         # Hiring recommendation, answer review
├── hooks/              # Custom React hooks
├── services/           # AI scoring, Whisper STT, confidence analysis, bias reduction
├── store/              # Zustand global state
├── types/              # TypeScript type definitions
├── data/               # Question bank, rubrics, behavioral frameworks
├── lib/                # Utilities and constants
└── pages/              # Route-level page components
```

## 🎨 Design System

- **Theme**: Dark mode with zinc/slate base
- **Accents**: Emerald (positive), Violet (info), Rose (warnings)
- **Cards**: Glassmorphism with backdrop-blur and subtle borders
- **Layout**: Responsive bento grid with varying span sizes
- **Typography**: Inter font with clear hierarchy
- **Animations**: Page transitions, staggered reveals, hover effects, animated counters

## 📊 Scoring Methodology

### Rubric Dimensions
1. **Correctness** (25%) — Technical accuracy of the response
2. **Depth** (20%) — Level of detail and thoroughness
3. **Communication** (20%) — Clarity, structure, and engagement
4. **Problem Solving** (20%) — Reasoning approach and trade-off analysis
5. **Relevance** (15%) — How well the answer addresses the question

### Bias Reduction Pipeline
1. Strip identifying information (blind scoring)
2. Score with structured rubric prompts
3. Run multi-pass evaluation (average two passes)
4. Detect bias patterns (halo, anchor, severity)
5. Apply statistical normalization
6. Generate confidence intervals

## 🌐 Deployment

Deploy to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-interview-simulator)

Or manually:
```bash
npm run build
npx vercel --prod
```

## 📄 License

MIT License — feel free to use this for your portfolio, learning, or building upon.

---

Built with ❤️ using React, TypeScript, and AI
