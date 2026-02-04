import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])

  return (
    <button
      className="rounded-full border border-white/15 px-3 py-2 text-xs text-white"
      onClick={() => setDark((prev) => !prev)}
    >
      {dark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}
