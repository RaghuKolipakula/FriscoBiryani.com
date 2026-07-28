import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://friscobiryani.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
  ]
}
