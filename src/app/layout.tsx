import type { Metadata } from 'next'
import './globals.css'
import FloatingActions from '@/components/FloatingActions'
import { ContactProvider } from '@/components/ContactModal'
import { LangProvider } from '@/i18n/index'
import { translations } from '@/i18n/data'
import { cookies } from 'next/headers'
import GsapRegistry from '@/gsap/GsapRegistry'

export const metadata: Metadata = {
  title: 'GlobalTrade Supply — 全球供应链服务商',
  description: '从中国采购到全球交付，一站式供应链解决方案',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const langCookie = cookieStore.get('lang')?.value || 'zh'
  const validLangs = ['zh', 'en', 'ja', 'ko']
  const defaultLang = validLangs.includes(langCookie) ? langCookie as 'zh'|'en'|'ja'|'ko' : 'zh'

  const htmlLang = defaultLang === 'zh' ? 'zh-CN' : defaultLang === 'en' ? 'en' : defaultLang === 'ja' ? 'ja' : 'ko'

  return (
    <html lang={htmlLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LangProvider translations={translations} defaultLang={defaultLang}>
          <ContactProvider>
            <GsapRegistry>
              {children}
              <FloatingActions />
            </GsapRegistry>
          </ContactProvider>
        </LangProvider>
      </body>
    </html>
  )
}
