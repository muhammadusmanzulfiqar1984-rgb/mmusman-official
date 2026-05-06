import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { LangProvider } from '@/lib/langContext'
import EffectsLayerLoader from '@/components/effects/EffectsLayerLoader'

const AmbientLight       = dynamic(() => import('@/components/effects/AmbientLight'),       { ssr: false })
const AmbientPlayer      = dynamic(() => import('@/components/effects/AmbientPlayer'),      { ssr: false })
const GlowOnScroll       = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.GlowOnScroll })),       { ssr: false })
const GlassmorphismCards = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.GlassmorphismCards })), { ssr: false })
const AnimatedGradient   = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.AnimatedGradient })),   { ssr: false })
const TextRevealOnScroll = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.TextRevealOnScroll })), { ssr: false })
const GoldAccents        = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.GoldAccents })),        { ssr: false })
const ParallaxScroll     = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.ParallaxScroll })),     { ssr: false })
const HoverGlow          = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.HoverGlow })),          { ssr: false })

export const metadata: Metadata = {
  title: 'Mian Muhammad Usman — Lawyer, Trader, System Builder & Multi-Industry Strategist',
  description: 'Lawyer, trader, founder and system architect with hands-on experience across retail, oil & gas, capital markets, fashion, law and political strategy. Speaker and executive advisor.',
  keywords: ['Mian Muhammad Usman', 'system design', 'trading', 'advisory', 'keynote speaker', 'retail strategy'],
  metadataBase: new URL('https://www.mmusman.com'),
  alternates: {
    canonical: '/',
  },
  applicationName: 'Mian Muhammad Usman',
  authors: [{ name: 'Mian Muhammad Usman', url: 'https://www.mmusman.com' }],
  creator: 'Mian Muhammad Usman',
  publisher: 'Mian Muhammad Usman',
  category: 'Business and Personal Brand',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Mian Muhammad Usman — Lawyer, Trader, System Builder & Multi-Industry Strategist',
    description: 'Lawyer, trader, founder and system architect with hands-on experience across six industries.',
    type: 'website',
    url: 'https://www.mmusman.com',
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
  url: 'https://www.mmusman.com',
  image: 'https://www.mmusman.com/opengraph-image',
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
  sameAs: [
    'https://x.com/mian_usman',
    'https://www.linkedin.com',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mian Muhammad Usman',
  url: 'https://www.mmusman.com',
  inLanguage: 'en-GB',
  description:
    'Official website of Mian Muhammad Usman, featuring advisory profile, strategic work, speaking, and contact information.',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mian Muhammad Usman',
  url: 'https://www.mmusman.com',
  logo: 'https://www.mmusman.com/opengraph-image',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
          <AnimatedGradient />
          <GlassmorphismCards />
          <TextRevealOnScroll />
          <GoldAccents />
          <ParallaxScroll />
          <HoverGlow />
          <GlowOnScroll />
          <Analytics />
        </LangProvider>
      </body>
    </html>
  )
}
