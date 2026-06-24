import { Link } from 'react-router-dom'
import SEO from './SEO'

export default function CmsPage({ page }) {
  const content = page.content || {}
  const sections = Array.isArray(content.sections) ? content.sections : []

  return (
    <div className="pb-24">
      <SEO
        title={page.seoTitle || page.title}
        description={page.seoDescription}
        path={page.path}
        image={page.heroImage}
        noindex={!page.isPublished}
      />

      <section className="relative overflow-hidden border-b border-white/10 pt-28">
        {page.heroImage && (
          <>
            <img
              src={page.heroImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/80 to-ink" />
          </>
        )}
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          {content.eyebrow && (
            <p className="section-subtitle text-accent">{content.eyebrow}</p>
          )}
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-white md:text-6xl">
            {content.heading || page.title}
          </h1>
          {content.intro && (
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              {content.intro}
            </p>
          )}
          {content.buttonLabel && content.buttonUrl && (
            <Link
              to={content.buttonUrl}
              className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
            >
              {content.buttonLabel}
            </Link>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-8 px-6 pt-14">
        {sections.map((section, index) => (
          <section
            key={`${section.heading || 'section'}-${index}`}
            className={`grid items-center gap-8 rounded-3xl border border-white/10 bg-night p-7 md:p-10 ${
              section.image ? 'md:grid-cols-2' : ''
            }`}
          >
            {section.image && index % 2 === 1 && (
              <img
                src={section.image}
                alt={section.heading || ''}
                className="h-72 w-full rounded-2xl object-cover"
              />
            )}
            <div>
              {section.eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {section.eyebrow}
                </p>
              )}
              {section.heading && (
                <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                  {section.heading}
                </h2>
              )}
              {section.body && (
                <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">
                  {section.body}
                </div>
              )}
              {section.buttonLabel && section.buttonUrl && (
                <Link
                  to={section.buttonUrl}
                  className="mt-6 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {section.buttonLabel}
                </Link>
              )}
            </div>
            {section.image && index % 2 === 0 && (
              <img
                src={section.image}
                alt={section.heading || ''}
                className="h-72 w-full rounded-2xl object-cover"
              />
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
