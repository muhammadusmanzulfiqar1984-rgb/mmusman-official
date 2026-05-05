import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/la-vinda/', '/mafi-presentation/', '/textile-v2/'],
      },
    ],
    host: 'https://www.mmusman.com',
    sitemap: 'https://www.mmusman.com/sitemap.xml',
  }
}
