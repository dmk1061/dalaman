import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/car-prices', '/api/hotel-prices', '/api/analytics'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
