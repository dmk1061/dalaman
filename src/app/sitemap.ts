import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getSiteUrl, SUPPORTED_LOCALES } from '@/lib/seo';
import { DETAILED_TRAIL_SLUGS } from '@/lib/trekking-data';

const locations = ['dacha', 'marmaris', 'koycegiz', 'dalyan', 'dalaman', 'gocek', 'fethiye', 'kas'];

function buildAlternates(baseUrl: string, routePath: string) {
  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    languages[loc] = `${baseUrl}/${loc}${routePath}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const routes: MetadataRoute.Sitemap = [];

  // 1. Root and static locale pages
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  const staticRoutes = [
    '',
    '/articles',
    '/beaches',
    '/blogs',
    '/city-guide',
    '/collections',
    '/contacts',
    '/dalaman-guide',
    '/diving-fishing',
    '/kitesurfing',
    '/map',
    '/paragliding',
    '/pharmacies',
    '/privacy',
    '/routes',
    '/routes/trekking',
    ...DETAILED_TRAIL_SLUGS.map((slug) => `/routes/trekking/${slug}`),
    '/routes/weekends',
    '/services',
    '/services/car-rental',
    '/services/diving',
    '/services/excursions-tours',
    '/services/hotels',
    '/services/real-estate',
    '/services/transfers',
    '/services/tuna-fishing',
    '/services/yacht-rental',
    '/services/flights',
    '/thermal-spa',
    '/markets-crafts',
    '/gastronomy',
    '/articles/airport-dalaman',
    '/articles/transport',
  ];

  for (const locale of SUPPORTED_LOCALES) {
    for (const route of staticRoutes) {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 0.9 : 0.8,
        alternates: buildAlternates(baseUrl, route),
      });
    }
  }

  // 2. All articles across 4 locales
  const articlesDir = path.join(process.cwd(), 'content/articles');
  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir);
    const baseSlugs = new Set<string>();

    for (const f of files) {
      if (f.endsWith('.md') && !f.includes('.en.') && !f.includes('.de.') && !f.includes('.tr.')) {
        const content = fs.readFileSync(path.join(articlesDir, f), 'utf-8');
        const m = content.match(/slug:\s*["']?([^"'\s]+)/);
        if (m && m[1]) {
          baseSlugs.add(m[1]);
        } else {
          baseSlugs.add(f.replace(/\.md$/, ''));
        }
      }
    }

    for (const slug of Array.from(baseSlugs)) {
      const routePath = `/articles/${slug}`;
      for (const locale of SUPPORTED_LOCALES) {
        routes.push({
          url: `${baseUrl}/${locale}${routePath}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: buildAlternates(baseUrl, routePath),
        });
      }
    }
  }

  // 3. Locations and their subpages across 4 locales
  const locationsDir = path.join(process.cwd(), 'content/locations');
  if (fs.existsSync(locationsDir)) {
    for (const loc of locations) {
      for (const locale of SUPPORTED_LOCALES) {
        // Main location page
        routes.push({
          url: `${baseUrl}/${locale}/${loc}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.85,
          alternates: buildAlternates(baseUrl, `/${loc}`),
        });

        // Hub subpages
        for (const sub of ['beaches', 'sights', 'transport', 'info']) {
          const subFile = path.join(locationsDir, loc, `${sub}.md`);
          if (fs.existsSync(subFile)) {
            routes.push({
              url: `${baseUrl}/${locale}/${loc}/${sub}`,
              lastModified: new Date(),
              changeFrequency: 'monthly',
              priority: 0.75,
              alternates: buildAlternates(baseUrl, `/${loc}/${sub}`),
            });
          }
        }

        // Beaches
        const beachDir = path.join(locationsDir, loc, 'beach');
        if (fs.existsSync(beachDir)) {
          const beaches = fs.readdirSync(beachDir, { withFileTypes: true });
          for (const b of beaches) {
            if (b.isDirectory()) {
              const beachPath = `/${loc}/beach/${b.name}`;
              routes.push({
                url: `${baseUrl}/${locale}${beachPath}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.65,
                alternates: buildAlternates(baseUrl, beachPath),
              });
            }
          }
        }

        // Sights (ruine, ruines, todo)
        const seenSights = new Set<string>();
        for (const sightFolder of ['ruine', 'ruines', 'todo']) {
          const sDir = path.join(locationsDir, loc, sightFolder);
          if (fs.existsSync(sDir)) {
            const sights = fs.readdirSync(sDir, { withFileTypes: true });
            for (const s of sights) {
              if (s.isDirectory() && !seenSights.has(s.name)) {
                seenSights.add(s.name);
                const sightPath = `/${loc}/sight/${s.name}`;
                routes.push({
                  url: `${baseUrl}/${locale}${sightPath}`,
                  lastModified: new Date(),
                  changeFrequency: 'monthly',
                  priority: 0.65,
                  alternates: buildAlternates(baseUrl, sightPath),
                });
              }
            }
          }
        }
      }
    }
  }

  return routes;
}
