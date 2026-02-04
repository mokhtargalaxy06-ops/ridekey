import { useI18n } from '../i18nContext'

export default function Newsletter() {
  const { t } = useI18n()
  return (
    <section className="rounded-3xl bg-accent/10 p-10 text-white">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="section-subtitle">{t.common.newsletter}</p>
          <h3 className="section-title mt-3">{t.home.newsletterTitle}</h3>
          <p className="mt-3 text-sm text-slate-200">{t.home.newsletterCopy}</p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            className="flex-1 rounded-full border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
            placeholder={t.common.email}
            type="email"
          />
          <button className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow">
            {t.common.subscribe}
          </button>
        </div>
      </div>
    </section>
  )
}
