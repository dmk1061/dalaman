import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://dalaman.info';
const locales = ['ru', 'en', 'de', 'tr'];
const locations = ['dacha', 'marmaris', 'koycegiz', 'dalyan', 'dalaman', 'gocek', 'fethiye', 'kas'];

export default function sitemap(): MetadataRoute.Sitemap {
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
    '/beaches',
    '/blogs',
    '/city-guide',
    '/city-guide/small-towns',
    '/collections',
    '/contacts',
    '/dalaman-guide',
    '/map',
    '/pharmacies',
    '/routes',
    '/services',
    '/services/car-rental',
    '/services/diving',
    '/services/excursions-tours',
    '/services/real-estate',
    '/services/transfers',
    '/services/tuna-fishing',
    '/services/yacht-rental',
    '/services/flights',
    '/articles/airport-dalaman',
    '/articles/transport',
  ];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 0.9 : 0.8,
      });
    }
  }

  // 2. All 83 articles across 4 locales
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
      for (const locale of locales) {
        routes.push({
          url: `${baseUrl}/${locale}/articles/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  }

  // 3. Locations and their subpages across 4 locales
  const locationsDir = path.join(process.cwd(), 'content/locations');
  if (fs.existsSync(locationsDir)) {
    for (const loc of locations) {
      for (const locale of locales) {
        // Main location page
        routes.push({
          url: `${baseUrl}/${locale}/${loc}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.85,
        });

        // Hub subpages
        for (const sub of ['beaches', 'sights', 'transport', 'info']) {
          routes.push({
            url: `${baseUrl}/${locale}/${loc}/${sub}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
          });
        }

        // Beaches
        const beachDir = path.join(locationsDir, loc, 'beach');
        if (fs.existsSync(beachDir)) {
          const beaches = fs.readdirSync(beachDir, { withFileTypes: true });
          for (const b of beaches) {
            if (b.isDirectory()) {
              routes.push({
                url: `${baseUrl}/${locale}/${loc}/beach/${b.name}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.65,
              });
            }
          }
        }

        // Sights
        for (const sightFolder of ['ruine', 'ruines']) {
          const sDir = path.join(locationsDir, loc, sightFolder);
          if (fs.existsSync(sDir)) {
            const sights = fs.readdirSync(sDir, { withFileTypes: true });
            for (const s of sights) {
              if (s.isDirectory()) {
                routes.push({
                  url: `${baseUrl}/${locale}/${loc}/sight/${s.name}`,
                  lastModified: new Date(),
                  changeFrequency: 'monthly',
                  priority: 0.65,
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
