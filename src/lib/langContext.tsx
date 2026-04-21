'use client'
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import translations, {
  LangCode, Translations, getStoredLang, storeLang, applyLangToDocument
} from './i18n'

interface LangContextValue {
  lang: LangCode
  t: Translations
  setLang: (lang: LangCode) => void
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  t: translations['en'],
  setLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en')

  useEffect(() => {
    const stored = getStoredLang()
    setLangState(stored)
    applyLangToDocument(stored)
  }, [])

  const setLang = useCallback((next: LangCode) => {
    setLangState(next)
    storeLang(next)
    applyLangToDocument(next)
  }, [])

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
