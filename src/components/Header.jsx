import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { useI18n } from '../i18nContext'

export default function Header() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/bikes', label: t.nav.motorcycles },
    { to: '/about', label: t.nav.about },
    { to: '/blog', label: t.nav.blog },
    { to: '/contact', label: t.nav.contact }
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/90 backdrop-blur border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3 text-lg font-semibold">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent">
            RV
          </span>
          Riveline
        </NavLink>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition ${isActive ? 'text-accent' : 'text-slate-200 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <NavLink
            to="/bikes#whatsapp-checkout"
            className="rounded-full bg-accent px-4 py-2 text-xs font-semibold"
          >
            {t.home.ctaBook}
          </NavLink>
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-ink/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${isActive ? 'text-accent' : 'text-slate-200 hover:text-white'}`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
