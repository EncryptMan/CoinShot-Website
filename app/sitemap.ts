import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://coinshot.pro/',
      lastModified: new Date('2024-08-05'), // '2022-02-16T00:00:00Z'
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://coinshot.pro/commands',
      lastModified: new Date('2024-07-21'), // '2022-02-16T00:00:00Z'
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://coinshot.pro/premium',
      lastModified: new Date('2024-08-15'), // '2022-02-16T00:00:00Z'
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://coinshot.pro/blog',
      lastModified: new Date('2024-02-17'), // '2022-02-16T00:00:00Z'
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://coinshot.pro/blog/top-cryptocurrency-servers',
      lastModified: new Date('2024-02-17'), // '2022-02-16T00:00:00Z'
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://coinshot.pro/login',
      lastModified: new Date('2024-07-21'), // '2022-02-16T00:00:00Z'
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: 'https://coinshot.pro/terms',
      lastModified: new Date('2024-03-11'), // '2022-02-16T00:00:00Z'
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: 'https://coinshot.pro/privacy',
      lastModified: new Date('2024-03-11'), // '2022-02-16T00:00:00Z'
      changeFrequency: 'monthly',
      priority: 0.2,
    }
  ]
}