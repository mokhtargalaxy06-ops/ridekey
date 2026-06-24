import { useCatalog } from '../catalogContext'
import SEO from './SEO'

export default function ManagedPageRoute({ pageId, children }) {
  const { pages } = useCatalog()
  const page = pages.find((item) => item.id === pageId)

  if (page && !page.isPublished) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <SEO
          title={`${page.title} is unavailable`}
          description="This page is not currently published."
          path={page.path}
          noindex
        />
        <h1 className="text-3xl font-semibold text-white">Page unavailable</h1>
        <p className="mt-3 text-slate-400">This page is currently saved as a draft.</p>
      </div>
    )
  }

  return children
}
