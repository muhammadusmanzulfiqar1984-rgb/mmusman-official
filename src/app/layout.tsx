import type { Metadata } from 'next'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import VoiceOrb from '@/components/effects/VoiceOrb'
import ChatWidget from '@/components/ai/ChatWidget'
import ConsentBanner from '@/components/ai/ConsentBanner'
import EffectsLayer from '@/components/effects/EffectsLayer'

export const metadata: Metadata = {
  title: 'Mian Muhammad Usman — Lawyer, Trader, System Builder & Multi-Industry Strategist',
  description: 'Lawyer, trader, founder and system architect with hands-on experience across retail, oil & gas, capital markets, fashion, law and political strategy. Speaker and executive advisor.',
  keywords: ['Mian Muhammad Usman', 'system design', 'trading', 'advisory', 'keynote speaker', 'retail strategy'],
  metadataBase: new URL('https://mmusman.com'),
  openGraph: {
    title: 'Mian Muhammad Usman — Lawyer, Trader, System Builder & Multi-Industry Strategist',
    description: 'Lawyer, trader, founder and system architect with hands-on experience across six industries.',
    type: 'website',
    url: 'https://mmusman.com',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@200;300;400;500&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <EffectsLayer />
        {children}
        <VoiceOrb />
        <ChatWidget />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  )
}
