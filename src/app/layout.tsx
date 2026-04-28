import type { Metadata } from 'next'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { LangProvider } from '@/lib/langContext'
import EffectsLayerLoader from '@/components/effects/EffectsLayerLoader'
import AmbientLight from '@/components/effects/AmbientLight'
import AmbientPlayer from '@/components/effects/AmbientPlayer'

export const metadata: Metadata = {
  title: 'Mian Muhammad Usman — Lawyer, Trader, System Builder & Multi-Industry Strategist',
  description: 'Lawyer, trader, founder and system architect with hands-on experience across retail, oil & gas, capital markets, fashion, law and political strategy. Speaker and executive advisor.',
  keywords: ['Mian Muhammad Usman', 'system design', 'trading', 'advisory', 'keynote speaker', 'retail strategy'],
  metadataBase: new URL('https://www.mmusman.eu'),
  openGraph: {
    title: 'Mian Muhammad Usman — Lawyer, Trader, System Builder & Multi-Industry Strategist',
    description: 'Lawyer, trader, founder and system architect with hands-on experience across six industries.',
    type: 'website',
    url: 'https://www.mmusman.eu',
    siteName: 'Mian Muhammad Usman',
    locale: 'en_GB',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mian Muhammad Usman — Lawyer, Trader, System Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mian Muhammad Usman — Lawyer, Trader, System Builder',
    description: 'Lawyer, trader, founder and system architect with hands-on experience across six industries.',
    creator: '@mianmusman',
    images: ['/opengraph-image'],
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mian Muhammad Usman',
  url: 'https://www.mmusman.eu',
  image: 'https://www.mmusman.eu/opengraph-image',
  jobTitle: 'Lawyer, Trader, System Builder & Multi-Industry Strategist',
  description: 'System architect with experience across retail, oil & gas, capital markets, fashion, law and political strategy. Speaker and executive advisor.',
  knowsAbout: [
    'System Architecture',
    'Trading & Capital Markets',
    'Legal Strategy',
    'Multi-Industry Consulting',
    'Retail Operations',
    'Strategic Advisory',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@200;300;400;500&family=DM+Mono:wght@300;400;500&family=Cairo:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider>
          <div className="letterbox-top" aria-hidden="true"></div>
          <div className="letterbox-bottom" aria-hidden="true"></div>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          {children}
          <EffectsLayerLoader />
          <AmbientLight />
          <AmbientPlayer />
          <Analytics />
        </LangProvider>
      </body>
    </html>
  )
}
