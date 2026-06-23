import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { fallbackCatalog, fetchCatalog } from './services/ridekeyApi'

const CATALOG_UPDATED_KEY = 'ridekey_catalog_updated_at'

const mergeCatalog = (nextCatalog = {}) => ({
  ...fallbackCatalog,
  ...nextCatalog,
  bikeFilters: {
    ...fallbackCatalog.bikeFilters,
    ...(nextCatalog.bikeFilters || {}),
  },
})

const CatalogContext = createContext({
  ...fallbackCatalog,
  refreshCatalog: async () => fallbackCatalog,
})

export const notifyCatalogChanged = () => {
  if (typeof window === 'undefined') return
  localStorage.setItem(CATALOG_UPDATED_KEY, String(Date.now()))
}

export const CatalogProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(fallbackCatalog)
  const lastRefreshRef = useRef(0)

  const refreshCatalog = useCallback(async () => {
    lastRefreshRef.current = Date.now()
    const nextCatalog = await fetchCatalog()
    const mergedCatalog = mergeCatalog(nextCatalog)
    setCatalog(mergedCatalog)
    return mergedCatalog
  }, [])

  useEffect(() => {
    let active = true

    fetchCatalog().then((nextCatalog) => {
      if (active) {
        setCatalog(mergeCatalog(nextCatalog))
      }
    })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const refreshIfVisible = () => {
      if (document.visibilityState === 'hidden') return
      const now = Date.now()
      if (now - lastRefreshRef.current < 1000) return
      refreshCatalog()
    }

    const handleStorage = (event) => {
      if (event.key === CATALOG_UPDATED_KEY) {
        refreshCatalog()
      }
    }

    window.addEventListener('focus', refreshIfVisible)
    document.addEventListener('visibilitychange', refreshIfVisible)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('focus', refreshIfVisible)
      document.removeEventListener('visibilitychange', refreshIfVisible)
      window.removeEventListener('storage', handleStorage)
    }
  }, [refreshCatalog])

  const value = useMemo(
    () => ({
      ...catalog,
      refreshCatalog,
    }),
    [catalog, refreshCatalog],
  )

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  )
}

export const useCatalog = () => useContext(CatalogContext)
