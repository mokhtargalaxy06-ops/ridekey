import { ShieldCheck, Sparkles } from 'lucide-react'
import { useI18n } from '../i18nContext'

export default function About() {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      <div className="rounded-3xl border border-white/10 bg-night p-10">
        <p className="section-subtitle">{t.nav.about}</p>
        <h1 className="section-title mt-3">{t.about.title}</h1>
        <p className="mt-4 text-sm text-slate-300">{t.about.copy}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-6">
            <Sparkles className="text-accent" />
            <h3 className="mt-4 text-lg font-semibold text-white">{t.about.buildTitle}</h3>
            <p className="mt-2 text-sm text-slate-400">{t.about.buildCopy}</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <ShieldCheck className="text-accent" />
            <h3 className="mt-4 text-lg font-semibold text-white">{t.about.trustTitle}</h3>
            <p className="mt-2 text-sm text-slate-400">{t.about.trustCopy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
