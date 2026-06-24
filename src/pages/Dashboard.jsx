import { useEffect, useMemo, useState } from 'react'
import {
  adminLogin,
  deleteAdminResource,
  fetchAdminResource,
  saveAdminResource,
  uploadAdminMedia,
} from '../services/ridekeyApi'
import { notifyCatalogChanged, useCatalog } from '../catalogContext'
import BlogManager from '../components/dashboard/BlogManager'
import PageManager from '../components/dashboard/PageManager'

const resources = {
  bikes: {
    label: 'Bikes',
    fields: [
      'id',
      'name',
      'brand',
      'type',
      'price',
      'rentalRate',
      'engine',
      'displacement',
      'torque',
      'topSpeed',
      'power',
      'weight',
      'image',
      'gallery',
      'description',
    ],
    numbers: ['price', 'rentalRate'],
    arrays: ['gallery'],
    defaults: {
      price: 0,
      rentalRate: 0,
    },
  },
  blogs: {
    label: 'Blogs',
    fields: [
      'id',
      'title',
      'seoTitle',
      'date',
      'publishedAt',
      'updatedAt',
      'tag',
      'image',
      'excerpt',
      'keywords',
      'sections',
    ],
    arrays: ['keywords'],
    json: ['sections'],
    jsonDefaults: {
      sections: [],
    },
    nullable: ['seoTitle', 'date', 'publishedAt', 'updatedAt', 'tag', 'image', 'excerpt'],
  },
  gear: {
    label: 'Gear',
    fields: ['id', 'name', 'category', 'rating', 'price', 'priceValue', 'image', 'url', 'cta'],
    numbers: ['rating', 'priceValue'],
    defaults: {
      rating: 5,
      price: 'MAD 0',
      priceValue: 0,
    },
    nullable: ['category', 'image', 'url', 'cta'],
  },
  rides: {
    label: 'Rides',
    fields: ['id', 'title', 'price', 'startDate', 'startTime', 'endDate', 'endTime', 'image', 'video'],
    json: ['video'],
    jsonDefaults: {
      video: {},
    },
    defaults: {
      price: 'MAD 0',
    },
    nullable: ['startDate', 'startTime', 'endDate', 'endTime', 'image'],
  },
  pages: {
    label: 'Pages',
    fields: [
      'id',
      'title',
      'path',
      'seoTitle',
      'seoDescription',
      'heroImage',
      'isPublished',
      'content',
    ],
    booleans: ['isPublished'],
    json: ['content'],
    jsonDefaults: {
      content: {},
    },
  },
}

const emptyFor = (resource) =>
  resources[resource].fields.reduce((acc, field) => {
    acc[field] = Object.hasOwn(resources[resource].defaults || {}, field)
      ? resources[resource].defaults[field]
      : resources[resource].arrays?.includes(field)
      ? ''
      : resources[resource].json?.includes(field)
        ? JSON.stringify(resources[resource].jsonDefaults?.[field] ?? {}, null, 2)
        : ''
    return acc
  }, {})

const stringifyForForm = (resource, item) =>
  resources[resource].fields.reduce((acc, field) => {
    const value = item[field]
    if (resources[resource].arrays?.includes(field)) {
      acc[field] = Array.isArray(value) ? value.join('\n') : value || ''
    } else if (resources[resource].json?.includes(field)) {
      acc[field] = JSON.stringify(value || resources[resource].jsonDefaults?.[field] || {}, null, 2)
    } else {
      acc[field] = value ?? ''
    }
    return acc
  }, {})

const parseJsonField = (resource, field, value, form) => {
  const trimmed = String(value || '').trim()

  if (!trimmed) {
    return resources[resource].jsonDefaults?.[field] ?? null
  }

  try {
    return JSON.parse(trimmed)
  } catch (error) {
    if (resource === 'blogs' && field === 'sections') {
      return [
        {
          heading: form.title || 'Section',
          body: trimmed,
        },
      ]
    }

    throw new Error(`${field} must be valid JSON.`)
  }
}

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const parseForm = (resource, form) =>
  resources[resource].fields.reduce((acc, field) => {
    const value = form[field]
    if (resources[resource].numbers?.includes(field)) {
      const defaultValue = resources[resource].defaults?.[field] ?? 0
      acc[field] = value === '' ? defaultValue : Number(value) || defaultValue
    } else if (resources[resource].booleans?.includes(field)) {
      acc[field] = value === true || value === 'true' || value === '1'
    } else if (resources[resource].arrays?.includes(field)) {
      acc[field] = String(value || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
    } else if (resources[resource].json?.includes(field)) {
      acc[field] = parseJsonField(resource, field, value, form)
    } else if (resources[resource].nullable?.includes(field)) {
      acc[field] = value === '' ? null : value
    } else {
      acc[field] = value
    }
    return acc
  }, {})

const preparePayload = (resource, form, editingId) => {
  const payload = parseForm(resource, form)

  if (!payload.id) {
    payload.id = editingId || slugify(payload.title || payload.name)
  }

  if (resource === 'blogs') {
    if (!payload.date) {
      payload.date = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
    }

    if (!payload.publishedAt) {
      payload.publishedAt = new Date().toISOString().split('T')[0]
    }

    if (!payload.updatedAt) {
      payload.updatedAt = payload.publishedAt
    }

    if (!payload.seoTitle) {
      payload.seoTitle = payload.title
    }

    if (!payload.excerpt) {
      payload.excerpt = payload.sections?.[0]?.body || payload.title
    }
  }

  return payload
}

const parseJsonPreview = (value) => {
  try {
    return value ? JSON.parse(value) : {}
  } catch (error) {
    return {}
  }
}

export default function Dashboard() {
  const { refreshCatalog } = useCatalog()
  const [token, setToken] = useState(() => localStorage.getItem('ridekey_admin_token') || '')
  const [login, setLogin] = useState({ email: 'admin@ridekey.ma', password: '' })
  const [resource, setResource] = useState('bikes')
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyFor('bikes'))
  const [editingId, setEditingId] = useState('')
  const [status, setStatus] = useState('')

  const config = resources[resource]

  const loadItems = async () => {
    if (!token) return
    const response = await fetchAdminResource(resource, token)
    setItems(response.data || [])
  }

  useEffect(() => {
    setForm(emptyFor(resource))
    setEditingId('')
  }, [resource])

  useEffect(() => {
    loadItems().catch((error) => setStatus(error.message))
  }, [resource, token])

  const title = useMemo(
    () => (editingId ? `Edit ${config.label.slice(0, -1)}` : `Create ${config.label.slice(0, -1)}`),
    [config.label, editingId],
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    setStatus('Signing in...')
    try {
      const response = await adminLogin(login)
      localStorage.setItem('ridekey_admin_token', response.token)
      setToken(response.token)
      setStatus('Signed in.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setStatus('Saving...')
    try {
      const payload = preparePayload(resource, form, editingId)
      await saveAdminResource(resource, token, payload, editingId)
      setForm(emptyFor(resource))
      setEditingId('')
      await loadItems()
      await refreshCatalog()
      notifyCatalogChanged()
      setStatus('Saved.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  const handleDelete = async (id) => {
    setStatus('Deleting...')
    try {
      await deleteAdminResource(resource, token, id)
      await loadItems()
      await refreshCatalog()
      notifyCatalogChanged()
      setStatus('Deleted.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  const handleUpload = async (field, files) => {
    const selected = Array.from(files || [])
    if (!selected.length) return

    setStatus('Uploading...')
    try {
      const uploaded = await Promise.all(
        selected.map((file) => uploadAdminMedia(token, file, `${resource}-${field}`)),
      )
      const urls = uploaded.map((item) => item.url)

      if (field === 'gallery') {
        const existing = form.gallery ? `${form.gallery.trim()}\n` : ''
        setForm({ ...form, gallery: `${existing}${urls.join('\n')}` })
      } else if (field === 'video') {
        const current = parseJsonPreview(form.video)
        setForm({
          ...form,
          video: JSON.stringify({ ...current, src: urls[0] }, null, 2),
        })
      } else if (field === 'heroImage') {
        setForm({ ...form, heroImage: urls[0] })
      } else {
        setForm({ ...form, [field]: urls[0] })
      }

      setStatus('Upload complete.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  const handleRidePosterUpload = async (files) => {
    const file = files?.[0]
    if (!file) return

    setStatus('Uploading poster...')
    try {
      const uploaded = await uploadAdminMedia(token, file, `${resource}-poster`)
      const current = parseJsonPreview(form.video)
      setForm({
        ...form,
        video: JSON.stringify({ ...current, poster: uploaded.url }, null, 2),
      })
      setStatus('Poster uploaded.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-6 pb-24 pt-32">
        <h1 className="section-title">Dashboard</h1>
        <form onSubmit={handleLogin} className="mt-8 rounded-2xl border border-white/10 bg-night p-6">
          <label className="text-sm text-slate-300">
            Email
            <input
              className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
              value={login.email}
              onChange={(event) => setLogin({ ...login, email: event.target.value })}
            />
          </label>
          <label className="mt-4 block text-sm text-slate-300">
            Password
            <input
              type="password"
              className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
              value={login.password}
              onChange={(event) => setLogin({ ...login, password: event.target.value })}
            />
          </label>
          <button className="mt-6 w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">
            Sign in
          </button>
          {status && <p className="mt-4 text-sm text-slate-300">{status}</p>}
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-subtitle">Admin</p>
          <h1 className="section-title mt-3">RideKey Dashboard</h1>
        </div>
        <button
          className="rounded-full border border-white/20 px-5 py-2 text-sm"
          onClick={() => {
            localStorage.removeItem('ridekey_admin_token')
            setToken('')
          }}
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {Object.entries(resources).map(([key, item]) => (
          <button
            key={key}
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              resource === key ? 'bg-accent text-white' : 'border border-white/15 text-slate-200'
            }`}
            onClick={() => setResource(key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {status && <p className="mt-5 text-sm text-slate-300">{status}</p>}

      {resource === 'blogs' ? (
        <BlogManager
          items={items}
          token={token}
          loadItems={loadItems}
          refreshCatalog={refreshCatalog}
          setStatus={setStatus}
        />
      ) : resource === 'pages' ? (
        <PageManager
          items={items}
          token={token}
          loadItems={loadItems}
          refreshCatalog={refreshCatalog}
          setStatus={setStatus}
        />
      ) : (
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSave} className="rounded-2xl border border-white/10 bg-night p-6">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <div className="mt-5 grid gap-4">
            {config.fields.map((field) => {
              const isLong =
                ['description', 'excerpt', 'gallery', 'keywords', 'sections', 'video'].includes(field)
              const isRideMedia = resource === 'rides' && ['image', 'video'].includes(field)
              const isUploadableImage = field === 'image'
              const isUploadableHero = field === 'heroImage'
              const isUploadableGallery = field === 'gallery'
              const isUploadableVideo = field === 'video'
              const isBoolean = config.booleans?.includes(field)

              if (isRideMedia) {
                const video = parseJsonPreview(form.video)

                return (
                  <div key={field} className="rounded-xl border border-white/10 bg-ink/40 p-4">
                    <p className="text-sm font-semibold text-white">
                      {field === 'image' ? 'Ride image' : 'Ride video'}
                    </p>

                    {field === 'image' ? (
                      <>
                        {form.image ? (
                          <img
                            src={form.image}
                            alt=""
                            className="mt-3 h-36 w-full rounded-lg object-cover"
                          />
                        ) : (
                          <div className="mt-3 flex h-36 items-center justify-center rounded-lg border border-dashed border-white/15 text-sm text-slate-400">
                            No image attached.
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="mt-3 block w-full cursor-pointer rounded-lg border border-white/10 bg-ink text-sm text-slate-300 file:mr-4 file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                          onChange={(event) => {
                            handleUpload(field, event.target.files)
                            event.target.value = ''
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {video.src ? (
                          <video
                            src={video.src}
                            poster={video.poster}
                            controls
                            className="mt-3 h-40 w-full rounded-lg bg-black object-cover"
                          />
                        ) : (
                          <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-dashed border-white/15 text-sm text-slate-400">
                            No video attached.
                          </div>
                        )}

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <label className="text-xs text-slate-400">
                            Attach video
                            <input
                              type="file"
                              accept="video/*"
                              className="mt-2 block w-full cursor-pointer rounded-lg border border-white/10 bg-ink text-sm text-slate-300 file:mr-4 file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                              onChange={(event) => {
                                handleUpload(field, event.target.files)
                                event.target.value = ''
                              }}
                            />
                          </label>
                          <label className="text-xs text-slate-400">
                            Attach poster image
                            <input
                              type="file"
                              accept="image/*"
                              className="mt-2 block w-full cursor-pointer rounded-lg border border-white/10 bg-ink text-sm text-slate-300 file:mr-4 file:border-0 file:bg-white/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                              onChange={(event) => {
                                handleRidePosterUpload(event.target.files)
                                event.target.value = ''
                              }}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                )
              }

              return (
                <label key={field} className="text-sm text-slate-300">
                  {field}
                  {isBoolean ? (
                    <select
                      className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                      value={String(form[field] ?? true)}
                      onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                    >
                      <option value="true">Published</option>
                      <option value="false">Draft</option>
                    </select>
                  ) : isLong ? (
                    <textarea
                      rows={field === 'sections' ? 8 : 4}
                      className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                      value={form[field] ?? ''}
                      onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                    />
                  ) : (
                    <input
                      className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                      value={form[field] ?? ''}
                      onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                    />
                  )}
                  {(isUploadableImage || isUploadableHero || isUploadableGallery || isUploadableVideo) && (
                    <input
                      type="file"
                      accept={isUploadableVideo ? 'video/*' : 'image/*'}
                      multiple={isUploadableGallery}
                      className="mt-2 block w-full cursor-pointer rounded-lg border border-white/10 bg-ink text-sm text-slate-300 file:mr-4 file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                      onChange={(event) => {
                        handleUpload(field, event.target.files)
                        event.target.value = ''
                      }}
                    />
                  )}
                  {isUploadableVideo && (
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-2 block w-full cursor-pointer rounded-lg border border-white/10 bg-ink text-sm text-slate-300 file:mr-4 file:border-0 file:bg-white/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                      onChange={async (event) => {
                        const file = event.target.files?.[0]
                        if (!file) return
                        setStatus('Uploading poster...')
                        try {
                          const uploaded = await uploadAdminMedia(token, file, `${resource}-poster`)
                          const current = parseJsonPreview(form.video)
                          setForm({
                            ...form,
                            video: JSON.stringify({ ...current, poster: uploaded.url }, null, 2),
                          })
                          setStatus('Poster uploaded.')
                        } catch (error) {
                          setStatus(error.message)
                        }
                        event.target.value = ''
                      }}
                    />
                  )}
                </label>
              )
            })}
          </div>
          <div className="mt-6 flex gap-3">
            <button className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">
              Save
            </button>
            <button
              type="button"
              className="rounded-full border border-white/20 px-5 py-3 text-sm"
              onClick={() => {
                setForm(emptyFor(resource))
                setEditingId('')
              }}
            >
              New
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-white/10 bg-night p-6">
          <h2 className="text-xl font-semibold text-white">{config.label}</h2>
          <div className="mt-5 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-ink/60 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-white">{item.name || item.title}</p>
                  <p className="text-xs text-slate-400">{item.id}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-full border border-white/20 px-4 py-2 text-xs"
                    onClick={() => {
                      setEditingId(item.id)
                      setForm(stringifyForForm(resource, item))
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!items.length && <p className="text-sm text-slate-400">No records yet.</p>}
          </div>
        </div>
      </div>
      )}
    </div>
  )
}
