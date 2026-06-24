import { bikes, priceRanges, brands, displacements, types } from '../data/bikes'
import { blogs } from '../data/blogs'
import { gearItems } from '../data/gear'
import { rideShowcase, rides, ridesPage } from '../data/rides'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? 'https://api.ridekey.ma/api' : 'http://127.0.0.1:8001/api')

export const ADMIN_SESSION_EXPIRED_EVENT = 'ridekey:admin-session-expired'

const expireAdminSession = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('ridekey_admin_token')
  window.dispatchEvent(new CustomEvent(ADMIN_SESSION_EXPIRED_EVENT))
}

const getJson = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`RideKey API request failed: ${response.status}`)
  }

  return response.json()
}

export const fallbackCatalog = {
  bikes,
  bikeFilters: {
    brands,
    types,
    displacements,
    priceRanges,
  },
  gear: gearItems,
  rides,
  rideShowcase,
  ridesPage,
  blogs,
  pages: [],
}

export const fetchCatalog = async () => {
  try {
    return await getJson('/catalog')
  } catch (error) {
    console.warn(error)
    return fallbackCatalog
  }
}

export const submitContactRequest = (payload) =>
  fetch(`${API_BASE_URL}/contact-requests`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

export const submitRentalRequest = (payload) =>
  fetch(`${API_BASE_URL}/rental-requests`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

export const submitRideRequest = (payload) =>
  fetch(`${API_BASE_URL}/ride-requests`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

export const adminLogin = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Invalid admin credentials')
  }

  return response.json()
}

const adminRequest = async (resource, token, options = {}) => {
  const response = await fetch(`${API_BASE_URL}/admin/${resource}${options.id ? `/${options.id}` : ''}`, {
    method: options.method || 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    if (response.status === 401) {
      expireAdminSession()
    }
    const error = await response.json().catch(() => ({}))
    const validationMessages = error.errors
      ? Object.values(error.errors).flat().join(' ')
      : ''
    throw new Error(validationMessages || error.message || `Admin request failed: ${response.status}`)
  }

  return response.json()
}

export const fetchAdminResource = (resource, token) =>
  adminRequest(resource, token)

export const saveAdminResource = (resource, token, item, currentId) =>
  adminRequest(resource, token, {
    method: currentId ? 'PUT' : 'POST',
    id: currentId,
    body: item,
  })

export const deleteAdminResource = (resource, token, id) =>
  adminRequest(resource, token, {
    method: 'DELETE',
    id,
  })

export const uploadAdminMedia = async (token, file, folder = 'media') => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await fetch(`${API_BASE_URL}/admin/uploads`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    if (response.status === 401) {
      expireAdminSession()
    }
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Upload failed: ${response.status}`)
  }

  return response.json()
}
