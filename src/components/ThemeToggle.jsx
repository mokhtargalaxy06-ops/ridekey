import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
// Component: ThemeToggle

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('riveline-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? true
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
    localStorage.setItem('riveline-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      className="rounded-full border border-white/15 px-3 py-2 text-xs text-white"
      onClick={() => setDark((prev) => !prev)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}
