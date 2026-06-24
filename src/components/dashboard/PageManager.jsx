import { useMemo, useState } from 'react'
import {
  Copy,
  ExternalLink,
  FilePlus2,
  FileText,
  ImagePlus,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import {
  deleteAdminResource,
  saveAdminResource,
  uploadAdminMedia,
} from '../../services/ridekeyApi'
import { notifyCatalogChanged } from '../../catalogContext'

const systemPaths = new Set([
  '/',
  '/bikes',
  '/rentals',
  '/rides',
  '/about',
  '/blog',
  '/contact',
  '/dashboard',
])

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const normalizePath = (value) => {
  const cleaned = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/[^a-z0-9/_-]+/g, '-')
    .replace(/\/+/g, '/')
  if (!cleaned || cleaned === '/') return cleaned
  return `/${cleaned.replace(/^\/|\/$/g, '')}`
}

const emptyPage = () => ({
  id: '',
  title: '',
  path: '',
  seoTitle: '',
  seoDescription: '',
  heroImage: '',
  isPublished: false,
  content: {
    eyebrow: '',
    heading: '',
    intro: '',
    buttonLabel: '',
    buttonUrl: '',
    sections: [{ eyebrow: '', heading: '', body: '', image: '', buttonLabel: '', buttonUrl: '' }],
  },
})

const normalizeSection = (section) =>
  typeof section === 'string'
    ? { eyebrow: '', heading: section, body: '', image: '', buttonLabel: '', buttonUrl: '' }
    : {
        eyebrow: section?.eyebrow || '',
        heading: section?.heading || '',
        body: section?.body || '',
        image: section?.image || '',
        buttonLabel: section?.buttonLabel || '',
        buttonUrl: section?.buttonUrl || '',
      }

const pageForForm = (page) => {
  const content = page.content || {}
  const sections = Array.isArray(content.sections)
    ? content.sections.map(normalizeSection)
    : []

  return {
    ...emptyPage(),
    ...page,
    heroImage: page.heroImage || '',
    seoTitle: page.seoTitle || '',
    seoDescription: page.seoDescription || '',
    isPublished: Boolean(page.isPublished),
    content: {
      eyebrow: content.eyebrow || '',
      heading: content.heading || '',
      intro: content.intro || '',
      buttonLabel: content.buttonLabel || '',
      buttonUrl: content.buttonUrl || '',
      sections: sections.length ? sections : [normalizeSection()],
      notes: content.notes || '',
    },
  }
}

const Field = ({ label, hint, children }) => (
  <label className="block text-sm font-medium text-slate-200">
    {label}
    {hint && <span className="ml-2 text-xs font-normal text-slate-500">{hint}</span>}
    {children}
  </label>
)

export default function PageManager({
  items,
  token,
  loadItems,
  refreshCatalog,
  setStatus,
}) {
  const [form, setForm] = useState(emptyPage)
  const [editingId, setEditingId] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState('')

  const isSystemPage = systemPaths.has(form.path)
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((page) => {
      const matchesQuery =
        !query ||
        [page.title, page.path, page.id, page.seoDescription]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query))
      const matchesFilter =
        filter === 'all' ||
        (filter === 'published' && page.isPublished) ||
        (filter === 'draft' && !page.isPublished)
      return matchesQuery && matchesFilter
    })
  }, [filter, items, search])

  const resetEditor = () => {
    setEditingId('')
    setForm(emptyPage())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const editPage = (page) => {
    setEditingId(page.id)
    setForm(pageForForm(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'title' && !editingId) {
        if (!current.id || current.id === slugify(current.title)) next.id = slugify(value)
        if (!current.path || current.path === `/${slugify(current.title)}`) next.path = `/${slugify(value)}`
        if (!current.content.heading || current.content.heading === current.title) {
          next.content = { ...current.content, heading: value }
        }
      }
      return next
    })
  }

  const updateContent = (field, value) =>
    setForm((current) => ({
      ...current,
      content: { ...current.content, [field]: value },
    }))

  const updateSection = (index, field, value) =>
    setForm((current) => ({
      ...current,
      content: {
        ...current.content,
        sections: current.content.sections.map((section, sectionIndex) =>
          sectionIndex === index ? { ...section, [field]: value } : section,
        ),
      },
    }))

  const uploadImage = async (files, target, sectionIndex = null) => {
    const file = files?.[0]
    if (!file) return
    const uploadKey = sectionIndex === null ? target : `${target}-${sectionIndex}`
    setUploading(uploadKey)
    setStatus('Uploading image...')

    try {
      const uploaded = await uploadAdminMedia(token, file, `pages-${target}`)
      if (sectionIndex === null) updateField(target, uploaded.url)
      else updateSection(sectionIndex, 'image', uploaded.url)
      setStatus('Image uploaded.')
    } catch (error) {
      setStatus(error.message)
    } finally {
      setUploading('')
    }
  }

  const savePage = async (publish) => {
    const title = form.title.trim()
    const id = slugify(form.id || title)
    const path = normalizePath(form.path)
    if (!title || !id) {
      setStatus('A page title and valid ID are required.')
      return
    }
    if (!path || (path === '/dashboard' && editingId !== 'dashboard')) {
      setStatus(path === '/dashboard' ? 'The dashboard route is reserved.' : 'A valid page path is required.')
      return
    }

    const sections = form.content.sections
      .map((section) => ({
        eyebrow: section.eyebrow.trim(),
        heading: section.heading.trim(),
        body: section.body.trim(),
        image: section.image.trim(),
        buttonLabel: section.buttonLabel.trim(),
        buttonUrl: section.buttonUrl.trim(),
      }))
      .filter((section) => Object.values(section).some(Boolean))

    const payload = {
      id,
      title,
      path,
      seoTitle: form.seoTitle.trim() || title,
      seoDescription: form.seoDescription.trim() || null,
      heroImage: form.heroImage.trim() || null,
      isPublished: publish,
      content: {
        eyebrow: form.content.eyebrow.trim(),
        heading: form.content.heading.trim() || title,
        intro: form.content.intro.trim(),
        buttonLabel: form.content.buttonLabel.trim(),
        buttonUrl: form.content.buttonUrl.trim(),
        sections,
        ...(form.content.notes ? { notes: form.content.notes } : {}),
      },
    }

    setSaving(true)
    setStatus(publish ? 'Publishing page...' : 'Saving draft...')
    try {
      await saveAdminResource('pages', token, payload, editingId)
      await loadItems()
      await refreshCatalog()
      notifyCatalogChanged()
      setEditingId(id)
      setForm(pageForForm(payload))
      setStatus(publish ? 'Page published.' : 'Draft saved.')
    } catch (error) {
      setStatus(error.message)
    } finally {
      setSaving(false)
    }
  }

  const duplicatePage = (page) => {
    const copy = pageForForm(page)
    const id = `${page.id}-copy`
    setEditingId('')
    setForm({
      ...copy,
      id,
      title: `${page.title} (Copy)`,
      path: `${page.path === '/' ? '/home' : page.path}-copy`,
      isPublished: false,
    })
    setStatus('Page copy opened as a draft.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deletePage = async (page) => {
    if (systemPaths.has(page.path)) {
      setStatus('Core application pages cannot be deleted. Save them as drafts to unpublish them.')
      return
    }
    if (!window.confirm(`Delete “${page.title}”? This cannot be undone.`)) return

    setStatus('Deleting page...')
    try {
      await deleteAdminResource('pages', token, page.id)
      if (editingId === page.id) resetEditor()
      await loadItems()
      await refreshCatalog()
      notifyCatalogChanged()
      setStatus('Page deleted.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
      <section className="rounded-2xl border border-white/10 bg-night p-5 md:p-7">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {editingId ? 'Editing page' : 'New page'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {editingId ? form.title || 'Untitled page' : 'Create a page'}
            </h2>
            {isSystemPage && (
              <p className="mt-2 text-xs text-amber-300">
                System page: metadata and publication are managed here; its specialized app layout remains intact.
              </p>
            )}
          </div>
          {editingId && (
            <button
              type="button"
              onClick={resetEditor}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"
            >
              <FilePlus2 size={16} />
              New page
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Page title">
              <input
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                placeholder="Page title"
                className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
              />
            </Field>
            <Field label="Page ID" hint="Internal identifier">
              <input
                value={form.id}
                disabled={Boolean(editingId)}
                onChange={(event) => updateField('id', slugify(event.target.value))}
                placeholder="page-id"
                className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white disabled:opacity-60"
              />
            </Field>
          </div>

          <Field label="URL path" hint="Example: /our-services">
            <input
              value={form.path}
              disabled={isSystemPage}
              onChange={(event) => updateField('path', normalizePath(event.target.value))}
              placeholder="/new-page"
              className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white disabled:opacity-60"
            />
          </Field>

          <div className="rounded-2xl border border-white/10 bg-ink/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Hero image</h3>
                <p className="mt-1 text-xs text-slate-400">Large landscape image recommended.</p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">
                <ImagePlus size={16} />
                {uploading === 'heroImage' ? 'Uploading...' : 'Upload'}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => {
                    uploadImage(event.target.files, 'heroImage')
                    event.target.value = ''
                  }}
                />
              </label>
            </div>
            {form.heroImage ? (
              <div className="relative mt-4 overflow-hidden rounded-xl">
                <img src={form.heroImage} alt="" className="h-52 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => updateField('heroImage', '')}
                  className="absolute right-3 top-3 rounded-full bg-black/70 p-2"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="mt-4 flex h-32 items-center justify-center rounded-xl border border-dashed border-white/15 text-sm text-slate-500">
                No hero image
              </div>
            )}
            <input
              value={form.heroImage}
              onChange={(event) => updateField('heroImage', event.target.value)}
              placeholder="Or paste an image URL"
              className="mt-3 w-full rounded-xl border-white/10 bg-ink text-sm text-white"
            />
          </div>

          {!isSystemPage && (
            <>
              <div className="rounded-2xl border border-white/10 bg-ink/40 p-4">
                <h3 className="font-semibold text-white">Hero content</h3>
                <div className="mt-4 grid gap-4">
                  <Field label="Eyebrow">
                    <input
                      value={form.content.eyebrow}
                      onChange={(event) => updateContent('eyebrow', event.target.value)}
                      placeholder="Small label above the title"
                      className="mt-2 w-full rounded-xl border-white/10 bg-night text-white"
                    />
                  </Field>
                  <Field label="Heading">
                    <input
                      value={form.content.heading}
                      onChange={(event) => updateContent('heading', event.target.value)}
                      placeholder={form.title || 'Main page heading'}
                      className="mt-2 w-full rounded-xl border-white/10 bg-night text-white"
                    />
                  </Field>
                  <Field label="Introduction">
                    <textarea
                      rows="4"
                      value={form.content.intro}
                      onChange={(event) => updateContent('intro', event.target.value)}
                      placeholder="Introduce the page and its purpose."
                      className="mt-2 w-full rounded-xl border-white/10 bg-night text-white"
                    />
                  </Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Button label">
                      <input
                        value={form.content.buttonLabel}
                        onChange={(event) => updateContent('buttonLabel', event.target.value)}
                        placeholder="Contact us"
                        className="mt-2 w-full rounded-xl border-white/10 bg-night text-white"
                      />
                    </Field>
                    <Field label="Button URL">
                      <input
                        value={form.content.buttonUrl}
                        onChange={(event) => updateContent('buttonUrl', event.target.value)}
                        placeholder="/contact"
                        className="mt-2 w-full rounded-xl border-white/10 bg-night text-white"
                      />
                    </Field>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Page sections</h3>
                    <p className="mt-1 text-xs text-slate-400">Add reusable text, image, and call-to-action blocks.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        content: {
                          ...current.content,
                          sections: [...current.content.sections, normalizeSection()],
                        },
                      }))
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold"
                  >
                    <Plus size={15} />
                    Add section
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {form.content.sections.map((section, index) => (
                    <div key={index} className="rounded-2xl border border-white/10 bg-ink/50 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Section {index + 1}
                        </p>
                        {form.content.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setForm((current) => ({
                                ...current,
                                content: {
                                  ...current.content,
                                  sections: current.content.sections.filter((_, i) => i !== index),
                                },
                              }))
                            }
                            className="rounded-full p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <div className="mt-3 grid gap-3">
                        <input
                          value={section.eyebrow}
                          onChange={(event) => updateSection(index, 'eyebrow', event.target.value)}
                          placeholder="Small section label"
                          className="w-full rounded-xl border-white/10 bg-night text-white"
                        />
                        <input
                          value={section.heading}
                          onChange={(event) => updateSection(index, 'heading', event.target.value)}
                          placeholder="Section heading"
                          className="w-full rounded-xl border-white/10 bg-night text-white"
                        />
                        <textarea
                          rows="6"
                          value={section.body}
                          onChange={(event) => updateSection(index, 'body', event.target.value)}
                          placeholder="Section content"
                          className="w-full rounded-xl border-white/10 bg-night text-white"
                        />
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <input
                            value={section.image}
                            onChange={(event) => updateSection(index, 'image', event.target.value)}
                            placeholder="Section image URL"
                            className="min-w-0 flex-1 rounded-xl border-white/10 bg-night text-white"
                          />
                          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-semibold">
                            <ImagePlus size={15} />
                            {uploading === `section-${index}` ? 'Uploading...' : 'Upload image'}
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(event) => {
                                uploadImage(event.target.files, 'section', index)
                                event.target.value = ''
                              }}
                            />
                          </label>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <input
                            value={section.buttonLabel}
                            onChange={(event) => updateSection(index, 'buttonLabel', event.target.value)}
                            placeholder="Button label"
                            className="rounded-xl border-white/10 bg-night text-white"
                          />
                          <input
                            value={section.buttonUrl}
                            onChange={(event) => updateSection(index, 'buttonUrl', event.target.value)}
                            placeholder="Button URL"
                            className="rounded-xl border-white/10 bg-night text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="rounded-2xl border border-white/10 bg-ink/40 p-4">
            <h3 className="font-semibold text-white">Search engine settings</h3>
            <div className="mt-4 grid gap-4">
              <Field label="SEO title" hint={`${form.seoTitle.length}/60`}>
                <input
                  maxLength="60"
                  value={form.seoTitle}
                  onChange={(event) => updateField('seoTitle', event.target.value)}
                  placeholder={form.title || 'Search result title'}
                  className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
                />
              </Field>
              <Field label="Meta description" hint={`${form.seoDescription.length}/160`}>
                <textarea
                  rows="3"
                  maxLength="160"
                  value={form.seoDescription}
                  onChange={(event) => updateField('seoDescription', event.target.value)}
                  placeholder="Concise description for search results."
                  className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="sticky bottom-3 mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-night/95 p-3 shadow-2xl backdrop-blur sm:flex-row">
          <button
            type="button"
            disabled={saving}
            onClick={() => savePage(false)}
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold disabled:opacity-50"
          >
            Save as draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => savePage(true)}
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {form.isPublished ? 'Update published page' : 'Publish page'}
          </button>
          {editingId && form.isPublished && form.path !== '/dashboard' && (
            <a
              href={form.path}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm text-slate-300"
            >
              Preview
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </section>

      <aside className="self-start rounded-2xl border border-white/10 bg-night p-5 xl:sticky xl:top-28">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Pages</h2>
            <p className="mt-1 text-xs text-slate-400">{items.length} pages</p>
          </div>
          <button
            type="button"
            onClick={resetEditor}
            className="rounded-full bg-accent p-3 text-white"
            aria-label="Create new page"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search pages…"
            className="w-full rounded-xl border-white/10 bg-ink pl-10 text-sm text-white"
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {['all', 'published', 'draft'].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-3 py-2 text-xs font-semibold capitalize ${
                filter === value ? 'bg-white text-ink' : 'bg-white/5 text-slate-400'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="mt-5 max-h-[70vh] space-y-3 overflow-y-auto pr-1">
          {filteredItems.map((page) => (
            <article
              key={page.id}
              className={`rounded-xl border p-4 ${
                editingId === page.id ? 'border-accent/60 bg-accent/5' : 'border-white/10 bg-ink/50'
              }`}
            >
              <button type="button" onClick={() => editPage(page)} className="w-full text-left">
                <div className="flex items-start gap-3">
                  {page.heroImage ? (
                    <img src={page.heroImage} alt="" className="h-14 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-14 w-16 items-center justify-center rounded-lg bg-white/5 text-slate-500">
                      <FileText size={20} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${page.isPublished ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {page.isPublished ? 'Published' : 'Draft'}
                        {systemPaths.has(page.path) ? ' · System' : ''}
                      </span>
                    </div>
                    <h3 className="mt-1 truncate text-sm font-semibold text-white">{page.title}</h3>
                    <p className="mt-1 truncate text-xs text-slate-500">{page.path}</p>
                  </div>
                </div>
              </button>
              <div className="mt-3 flex justify-end gap-1 border-t border-white/5 pt-3">
                <button
                  type="button"
                  onClick={() => duplicatePage(page)}
                  className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                  aria-label={`Duplicate ${page.title}`}
                >
                  <Copy size={15} />
                </button>
                {page.isPublished && page.path !== '/dashboard' && (
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => deletePage(page)}
                  className="rounded-full p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                  aria-label={`Delete ${page.title}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
          {!filteredItems.length && (
            <div className="rounded-xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-slate-500">
              No pages match this view.
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
