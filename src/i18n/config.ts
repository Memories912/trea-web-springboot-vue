export const languages = {
  zh: { label: '中文', flag: '🇨🇳', key: 'zh' },
  en: { label: 'English', flag: '🇬🇧', key: 'en' },
  ja: { label: '日本語', flag: '🇯🇵', key: 'ja' },
  ko: { label: '한국어', flag: '🇰🇷', key: 'ko' },
} as const

export type LangCode = keyof typeof languages

export type TData = Record<string, string | Record<string, string | string[]>>

export function t(key: string, data: TData, lang: LangCode): string {
  const parts = key.split('.')
  let val: unknown = data[lang]
  for (const p of parts) {
    if (typeof val !== 'object' || val === null) return key
    val = (val as Record<string, unknown>)[p]
  }
  return typeof val === 'string' ? val : key
}

export function getLangFromCookie(cookie?: string): LangCode {
  if (!cookie) return 'zh'
  const match = cookie.match(/lang=(\w+)/)
  if (match && match[1] in languages) return match[1] as LangCode
  return 'zh'
}
