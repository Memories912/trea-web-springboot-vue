'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export const langNames = { zh: '中文', en: 'English', ja: '日本語', ko: '한국어' } as const
export const langFlags = { zh: '🇨🇳', en: '🇬🇧', ja: '🇯🇵', ko: '🇰🇷' } as const
export type LangCode = keyof typeof langNames

const LangCtx = createContext<{
  lang: LangCode
  setLang: (l: LangCode) => void
  t: (key: string) => string
}>({ lang: 'zh', setLang: () => {}, t: (k: string) => k })

export function useT() {
  return useContext(LangCtx)
}

export function LangProvider({ children, translations, defaultLang = 'zh' }: {
  children: ReactNode
  translations: Record<string, Record<string, string>>
  defaultLang?: LangCode
}) {
  const [lang, setLang] = useState<LangCode>(defaultLang)

  const setLangAndCookie = useCallback((l: LangCode) => {
    setLang(l)
    document.cookie = `lang=${l}; path=/; max-age=31536000`
  }, [])

  const t = useCallback((key: string) => {
    return translations[lang]?.[key] ?? translations['zh']?.[key] ?? key
  }, [lang, translations])

  return (
    <LangCtx.Provider value={{ lang, setLang: setLangAndCookie, t }}>
      {children}
    </LangCtx.Provider>
  )
}

const T = {} as Record<string, string>

// Helper to create the flat translations record

