import { motion } from "framer-motion"
import { Brain, Github, Zap } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/setup", label: "Start Interview" },
  { path: "/results", label: "Results" },
]

export function NavBar() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Brain className="h-8 w-8 text-emerald-400 transition-transform group-hover:scale-110" />
              <Zap className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-lg font-bold gradient-text">InterviewAI</span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.path
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
