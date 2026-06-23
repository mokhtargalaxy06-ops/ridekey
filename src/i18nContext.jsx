import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { detectLanguage, getDirection, getTranslations } from './i18n'

const I18nContext = createContext({
  lang: 'en',
  dir: 'ltr',
  t: getTranslations('en'),
  setLang: () => {}
})

export const I18nProvider = ({ children }) => {
  // Persist user language preference between sessions.
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('Ridekey-lang')
    return stored || detectLanguage()
  })
  const dir = getDirection(lang)
  const t = useMemo(() => getTranslations(lang), [lang])

  useEffect(() => {
    localStorage.setItem('Ridekey-lang', lang)
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, dir, t, setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
