import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollUpButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      className="fixed bottom-6 right-6 z-40 rounded-full bg-accent p-3 text-white shadow-glow"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  )
}
