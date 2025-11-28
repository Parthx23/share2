import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/[token]'],
    },
    sitemap: 'https://fastshare.vercel.app/sitemap.xml',
  }
}