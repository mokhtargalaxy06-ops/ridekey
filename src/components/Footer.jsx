import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { useI18n } from '../i18nContext'

export default function Footer() {
  const { t } = useI18n()
  const links = t.footer.links

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
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{t.footer.follow}</h4>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <span
                  key={index}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80"
                >
                  <Icon size={16} />
                </span>
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
