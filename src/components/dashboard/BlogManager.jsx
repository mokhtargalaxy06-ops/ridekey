import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Copy,
  ExternalLink,
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

const today = () => new Date().toISOString().slice(0, 10)

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const emptyPost = () => ({
  id: '',
  title: '',
  seoTitle: '',
  tag: '',
  image: '',
  excerpt: '',
  keywords: '',
  publishedAt: today(),
  updatedAt: today(),
  isPublished: false,
  sections: [{ heading: '', body: '' }],
})

const postForForm = (post) => ({
  ...emptyPost(),
  ...post,
  keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : post.keywords || '',
  sections: Array.isArray(post.sections) && post.sections.length
    ? post.sections.map((section) => ({
        heading: section.heading || '',
        body: section.body || '',
      }))
    : [{ heading: '', body: '' }],
  isPublished: Boolean(post.isPublished),
})

const formatDate = (value) => {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

const Field = ({ label, hint, children }) => (
  <label className="block text-sm font-medium text-slate-200">
    {label}
    {hint && <span className="ml-2 text-xs font-normal text-slate-500">{hint}</span>}
    {children}
  </label>
)

export default function BlogManager({
  items,
  token,
  loadItems,
  refreshCatalog,
  setStatus,
}) {
  const [form, setForm] = useState(emptyPost)
  const [editingId, setEditingId] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return items.filter((item) => {
      const matchesQuery =
        !query ||
        [item.title, item.id, item.tag, item.excerpt]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query))
      const matchesStatus =
        filter === 'all' ||
        (filter === 'published' && item.isPublished) ||
        (filter === 'draft' && !item.isPublished)

      return matchesQuery && matchesStatus
    })
  }, [filter, items, search])

  const resetEditor = () => {
    setEditingId('')
    setForm(emptyPost())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const editPost = (post) => {
    setEditingId(post.id)
    setForm(postForForm(post))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const duplicatePost = (post) => {
    const copyId = `${post.id}-copy`
    setEditingId('')
    setForm({
      ...postForForm(post),
      id: copyId,
      title: `${post.title} (Copy)`,
      seoTitle: `${post.seoTitle || post.title} (Copy)`,
      isPublished: false,
      publishedAt: today(),
      updatedAt: today(),
    })
    setStatus('Copy created in the editor. Save it when ready.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'title' && !editingId && (!current.id || current.id === slugify(current.title))) {
        next.id = slugify(value)
      }
      return next
    })
  }

  const updateSection = (index, field, value) => {
    setForm((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section,
      ),
    }))
  }

  const savePost = async (publish) => {
    const title = form.title.trim()
    const id = slugify(form.id || title)
    const sections = form.sections
      .map((section) => ({
        heading: section.heading.trim(),
        body: section.body.trim(),
      }))
      .filter((section) => section.heading || section.body)

    if (!title) {
      setStatus('A post title is required.')
      return
    }
    if (!id) {
      setStatus('A valid URL slug is required.')
      return
    }
    if (!form.excerpt.trim()) {
      setStatus('Add a short excerpt before saving.')
      return
    }
    if (!sections.length || sections.some((section) => !section.heading || !section.body)) {
      setStatus('Every article section needs both a heading and body.')
      return
    }

    const publishedAt = form.publishedAt || today()
    const payload = {
      id,
      title,
      seoTitle: form.seoTitle.trim() || title,
      date: formatDate(publishedAt),
      publishedAt,
      updatedAt: today(),
      isPublished: publish,
      tag: form.tag.trim() || null,
      image: form.image.trim() || null,
      excerpt: form.excerpt.trim(),
      keywords: form.keywords
        .split(/[,\n]/)
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      sections,
    }

    setSaving(true)
    setStatus(publish ? 'Publishing article...' : 'Saving draft...')

    try {
      await saveAdminResource('blogs', token, payload, editingId)
      await loadItems()
      await refreshCatalog()
      notifyCatalogChanged()
      setEditingId(id)
      setForm(postForForm(payload))
      setStatus(publish ? 'Article published.' : 'Draft saved.')
    } catch (error) {
      setStatus(error.message)
    } finally {
      setSaving(false)
    }
  }

  const deletePost = async (post) => {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return

    setStatus('Deleting article...')
    try {
      await deleteAdminResource('blogs', token, post.id)
      if (editingId === post.id) resetEditor()
      await loadItems()
      await refreshCatalog()
      notifyCatalogChanged()
      setStatus('Article deleted.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  const uploadImage = async (files) => {
    const file = files?.[0]
    if (!file) return

    setUploading(true)
    setStatus('Uploading cover image...')
    try {
      const uploaded = await uploadAdminMedia(token, file, 'blogs-cover')
      updateField('image', uploaded.url)
      setStatus('Cover image uploaded.')
    } catch (error) {
      setStatus(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
      <section className="rounded-2xl border border-white/10 bg-night p-5 md:p-7">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {editingId ? 'Editing article' : 'New article'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {editingId ? form.title || 'Untitled article' : 'Create blog post'}
            </h2>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={resetEditor}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200"
            >
              <Plus size={16} />
              New post
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-5">
          <Field label="Title">
            <input
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="A clear, useful article title"
              className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="URL slug" hint="Used in /blog/…">
              <input
                value={form.id}
                onChange={(event) => updateField('id', slugify(event.target.value))}
                placeholder="article-url-slug"
                className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
              />
            </Field>
            <Field label="Category">
              <input
                value={form.tag}
                onChange={(event) => updateField('tag', event.target.value)}
                placeholder="Morocco Routes"
                className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
              />
            </Field>
          </div>

          <Field label="Excerpt" hint={`${form.excerpt.length}/320`}>
            <textarea
              rows="3"
              maxLength="320"
              value={form.excerpt}
              onChange={(event) => updateField('excerpt', event.target.value)}
              placeholder="A concise summary shown on blog cards and search results."
              className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
            />
          </Field>

          <div className="rounded-2xl border border-white/10 bg-ink/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Cover image</h3>
                <p className="mt-1 text-xs text-slate-400">Recommended: 1200 × 800px.</p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15">
                <ImagePlus size={16} />
                {uploading ? 'Uploading...' : 'Upload'}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  disabled={uploading}
                  onChange={(event) => {
                    uploadImage(event.target.files)
                    event.target.value = ''
                  }}
                />
              </label>
            </div>
            {form.image ? (
              <div className="relative mt-4 overflow-hidden rounded-xl">
                <img src={form.image} alt="" className="h-52 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => updateField('image', '')}
                  className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white"
                  aria-label="Remove cover image"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="mt-4 flex h-36 items-center justify-center rounded-xl border border-dashed border-white/15 text-sm text-slate-500">
                No cover image selected
              </div>
            )}
            <input
              value={form.image}
              onChange={(event) => updateField('image', event.target.value)}
              placeholder="Or paste an image URL"
              className="mt-3 w-full rounded-xl border-white/10 bg-ink text-sm text-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Article content</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Build the article from readable heading and paragraph sections.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    sections: [...current.sections, { heading: '', body: '' }],
                  }))
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold"
              >
                <Plus size={15} />
                Add section
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {form.sections.map((section, index) => (
                <div key={index} className="rounded-2xl border border-white/10 bg-ink/50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Section {index + 1}
                    </p>
                    {form.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            sections: current.sections.filter((_, sectionIndex) => sectionIndex !== index),
                          }))
                        }
                        className="rounded-full p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`Remove section ${index + 1}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <input
                    value={section.heading}
                    onChange={(event) => updateSection(index, 'heading', event.target.value)}
                    placeholder="Section heading"
                    className="mt-3 w-full rounded-xl border-white/10 bg-night text-white"
                  />
                  <textarea
                    rows="6"
                    value={section.body}
                    onChange={(event) => updateSection(index, 'body', event.target.value)}
                    placeholder="Write the section content…"
                    className="mt-3 w-full rounded-xl border-white/10 bg-night text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-ink/40 p-4">
            <h3 className="font-semibold text-white">SEO & publishing</h3>
            <div className="mt-4 grid gap-5">
              <Field label="SEO title" hint={`${form.seoTitle.length}/60`}>
                <input
                  value={form.seoTitle}
                  maxLength="60"
                  onChange={(event) => updateField('seoTitle', event.target.value)}
                  placeholder={form.title || 'Search result title'}
                  className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
                />
              </Field>
              <Field label="Keywords" hint="Separate with commas">
                <input
                  value={form.keywords}
                  onChange={(event) => updateField('keywords', event.target.value)}
                  placeholder="motorcycle Morocco, Atlas routes, Marrakech"
                  className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
                />
              </Field>
              <Field label="Publish date">
                <input
                  type="date"
                  value={form.publishedAt}
                  onChange={(event) => updateField('publishedAt', event.target.value)}
                  className="mt-2 w-full rounded-xl border-white/10 bg-ink text-white"
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="sticky bottom-3 mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-night/95 p-3 shadow-2xl backdrop-blur sm:flex-row sm:items-center">
          <button
            type="button"
            disabled={saving}
            onClick={() => savePost(false)}
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            Save as draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => savePost(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            <CheckCircle2 size={17} />
            {form.isPublished ? 'Update published post' : 'Publish post'}
          </button>
          {editingId && form.isPublished && (
            <a
              href={`/blog/${form.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-white"
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
            <h2 className="text-xl font-semibold text-white">Blog posts</h2>
            <p className="mt-1 text-xs text-slate-400">{items.length} total articles</p>
          </div>
          <button
            type="button"
            onClick={resetEditor}
            className="rounded-full bg-accent p-3 text-white"
            aria-label="Create new post"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search posts…"
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
          {filteredItems.map((post) => (
            <article
              key={post.id}
              className={`rounded-xl border p-4 transition ${
                editingId === post.id
                  ? 'border-accent/60 bg-accent/5'
                  : 'border-white/10 bg-ink/50 hover:border-white/20'
              }`}
            >
              <button type="button" onClick={() => editPost(post)} className="w-full text-left">
                <div className="flex items-start gap-3">
                  {post.image ? (
                    <img src={post.image} alt="" className="h-14 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-14 w-16 items-center justify-center rounded-lg bg-white/5 text-slate-500">
                      <FileText size={20} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          post.isPublished ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-white">{post.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{formatDate(post.publishedAt)}</p>
                  </div>
                </div>
              </button>
              <div className="mt-3 flex items-center justify-end gap-1 border-t border-white/5 pt-3">
                <button
                  type="button"
                  onClick={() => duplicatePost(post)}
                  className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                  aria-label={`Duplicate ${post.title}`}
                >
                  <Copy size={15} />
                </button>
                {post.isPublished && (
                  <a
                    href={`/blog/${post.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                    aria-label={`View ${post.title}`}
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => deletePost(post)}
                  className="rounded-full p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                  aria-label={`Delete ${post.title}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
          {!filteredItems.length && (
            <div className="rounded-xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-slate-500">
              No posts match this view.
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
