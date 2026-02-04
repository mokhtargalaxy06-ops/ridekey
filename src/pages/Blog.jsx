import { blogs } from '../data/blogs'
import { useI18n } from '../i18nContext'

export default function Blog() {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      <p className="section-subtitle">{t.nav.blog}</p>
      <h1 className="section-title mt-3">{t.blog.title}</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <article key={blog.id} className="rounded-2xl border border-white/10 bg-night p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{blog.tag}</p>
            <h2 className="mt-3 text-lg font-semibold text-white">{blog.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{blog.excerpt}</p>
            <p className="mt-4 text-xs text-slate-500">{blog.date}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
