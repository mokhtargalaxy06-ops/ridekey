import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18nContext'
import { business } from '../seo/siteConfig'
// Component: Footer

export default function Footer() {
  const { t } = useI18n()
  const links = [
    { label: t.nav.motorcycles, to: '/bikes' },
    { label: t.nav.rentals, to: '/rentals' },
    { label: t.nav.rides || 'Motorcycle tours Morocco', to: '/rides' },
    { label: t.nav.blog, to: '/blog' },
    { label: t.nav.contact, to: '/contact' }
  ]
  const socialLinks = [
    { icon: Facebook, href: business.sameAs[1], label: 'RideKey Morocco on Facebook' },
    { icon: Instagram, href: business.sameAs[0], label: 'RideKey Morocco on Instagram' },
    { icon: Twitter, href: 'https://twitter.com/ridekey', label: 'RideKey Morocco on Twitter' },
    { icon: Linkedin, href: business.sameAs[3], label: 'RideKey Morocco on LinkedIn' }
  ]

  return (
    <footer className="bg-night text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <h3 className="text-xl font-semibold text-white">{t.footer.title}</h3>
            <p className="mt-3 text-sm text-slate-400">
              {t.footer.copy}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{t.footer.company}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{t.footer.follow}</h4>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
