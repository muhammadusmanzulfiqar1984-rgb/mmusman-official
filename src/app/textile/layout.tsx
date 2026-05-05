import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Textile Intelligence Archive — Mian Muhammad Usman',
  description:
    'Restricted textile intelligence archive and strategic supply-chain dossier.',
  alternates: {
    canonical: '/textile',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function TextileLayout({ children }: { children: React.ReactNode }) {
  return children
}
