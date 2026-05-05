import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mian Muhammad Usman',
    short_name: 'MMUSMAN',
    description:
      'Official website of Mian Muhammad Usman featuring advisory profile, strategic work, speaking, and contact routes.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#c9a84c',
    orientation: 'portrait',
    categories: ['business', 'consulting', 'education'],
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/opengraph-image',
        sizes: '1200x630',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
