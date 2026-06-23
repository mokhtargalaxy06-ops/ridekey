import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { JsonLd } from '../components/JsonLd'
import { useCatalog } from '../catalogContext'
import { useI18n } from '../i18nContext'
import { absoluteUrl } from '../seo/siteConfig'
import { usePageSeo } from '../seo/usePageSeo'
// Page: Blog

export default function Blog() {
  const { t } = useI18n()
  const { blogs } = useCatalog()
  const seo = usePageSeo('blog')
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      <SEO
        {...seo}
        keywords={[
          'best motorcycle roads in Morocco',
          'Marrakech motorcycle rental guide',
          'desert motorcycle adventure Morocco'
        ]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'RideKey Morocco motorcycle rental guides',
          url: absoluteUrl('/blog'),
          blogPost: blogs.map((blog) => ({
            '@type': 'BlogPosting',
            headline: blog.title,
            url: absoluteUrl(`/blog/${blog.id}`),
            datePublished: blog.publishedAt
          }))
        }}
      />
      <p className="section-subtitle">{t.nav.blog}</p>
      <h1 className="section-title mt-3">{t.blog.title}</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <article key={blog.id} className="rounded-2xl border border-white/10 bg-night p-6">
            <img
              src={blog.image}
              alt={`${blog.title} by RideKey Morocco`}
              loading="lazy"
              decoding="async"
              width="1200"
              height="800"
              className="-mx-6 -mt-6 mb-6 h-44 w-[calc(100%+3rem)] object-cover"
            />
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{blog.tag}</p>
            <h2 className="mt-3 text-lg font-semibold text-white">
              <Link to={`/blog/${blog.id}`} className="transition hover:text-accent">
                {blog.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-slate-400">{blog.excerpt}</p>
            <p className="mt-4 text-xs text-slate-500">{blog.date}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
