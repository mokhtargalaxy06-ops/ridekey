import { createContext, useContext, useMemo } from 'react'
import { detectLanguage, getDirection, getTranslations } from './i18n'

const I18nContext = createContext({
  lang: 'en',
  dir: 'ltr',
  t: getTranslations('en')
})

export const I18nProvider = ({ children }) => {
  const lang = detectLanguage()
  const dir = getDirection(lang)
  const t = useMemo(() => getTranslations(lang), [lang])

  return (
    <I18nContext.Provider value={{ lang, dir, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
