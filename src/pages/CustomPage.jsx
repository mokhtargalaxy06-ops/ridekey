import { useLocation } from 'react-router-dom'
import { useCatalog } from '../catalogContext'
import CmsPage from '../components/CmsPage'
import SEO from '../components/SEO'

export default function CustomPage() {
  const { pathname } = useLocation()
  const { pages } = useCatalog()
  const page = pages.find((item) => item.path === pathname)

  if (!page || !page.isPublished || page.path === '/dashboard') {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <SEO title="Page not found" description="The requested page could not be found." path={pathname} noindex />
        <h1 className="text-3xl font-semibold text-white">Page not found</h1>
        <p className="mt-3 text-slate-400">This page is unavailable or has not been published.</p>
      </div>
    )
  }

  return <CmsPage page={page} />
}
