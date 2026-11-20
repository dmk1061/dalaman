import fs from 'fs';
import path from 'path';

export interface KaleidoscopeLocationItem {
  id: string;
  title: string;
  subtitle: string;
  regionName: string;
  image: string;
  href: string;
}

const REGION_NAMES: Record<string, Record<string, string>> = {
  ru: {
    dalaman: 'Даламан',
    fethiye: 'Фетхие',
    marmaris: 'Мармарис',
    kas: 'Каш',
    dalyan: 'Дальян',
    gocek: 'Гёджек',
    dacha: 'Датча',
    koycegiz: 'Кёйджегиз',
  },
  en: {
    dalaman: 'Dalaman',
    fethiye: 'Fethiye',
    marmaris: 'Marmaris',
    kas: 'Kaş',
    dalyan: 'Dalyan',
    gocek: 'Göcek',
    dacha: 'Datça',
    koycegiz: 'Köyceğiz',
  },
  de: {
    dalaman: 'Dalaman',
    fethiye: 'Fethiye',
    marmaris: 'Marmaris',
    kas: 'Kaş',
    dalyan: 'Dalyan',
    gocek: 'Göcek',
    dacha: 'Datça',
    koycegiz: 'Köyceğiz',
  },
  tr: {
    dalaman: 'Dalaman',
    fethiye: 'Fethiye',
    marmaris: 'Marmaris',
    kas: 'Kaş',
    dalyan: 'Dalyan',
    gocek: 'Göcek',
    dacha: 'Datça',
    koycegiz: 'Köyceğiz',
  },
};

function cleanHeading(rawLine: string, fallback: string, locale: string): { title: string; subtitle: string } {
  const withoutHash = rawLine.replace(/^#+\s*/, '').trim();
  if (!withoutHash) {
    return { title: fallback, subtitle: '' };
  }

  // Split by em-dash or en-dash (" — " or " – ") into primary title and short subtitle
  const dashParts = withoutHash.split(/\s+[—–]\s+/);
  let mainTitle = dashParts[0].trim();
  const subtitle = dashParts.length > 1 ? dashParts.slice(1).join(' — ').trim() : '';

  // For Russian locale, remove parenthetical Turkish transliteration if it makes the card title overly long
  if (locale === 'ru') {
    mainTitle = mainTitle.replace(/\s*\([^)]+\)\s*$/, '').trim();
  }

  return {
    title: mainTitle || fallback,
    subtitle,
  };
}

/**
 * Automatically scans `content/locations/<city>/(beach|ruine|ruines|todo)/<item>`
 * so any newly added location folder immediately appears in the Kaleidoscope carousel without hardcoding.
 */
export function getKaleidoscopeLocations(locale: string = 'ru'): KaleidoscopeLocationItem[] {
  const locationsRoot = path.join(process.cwd(), 'content', 'locations');
  if (!fs.existsSync(locationsRoot)) {
    return [];
  }

  const regionDict = REGION_NAMES[locale] || REGION_NAMES['en'];
  const items: KaleidoscopeLocationItem[] = [];

  const cities = fs.readdirSync(locationsRoot).filter((dir) => {
    const fullPath = path.join(locationsRoot, dir);
    return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
  });

  const categoryFolders = [
    { dirName: 'beach', routeSegment: 'beach' },
    { dirName: 'ruine', routeSegment: 'sight' },
    { dirName: 'ruines', routeSegment: 'sight' },
    { dirName: 'todo', routeSegment: 'sight' },
  ];

  for (const city of cities) {
    const regionName = regionDict[city] || city;

    for (const cat of categoryFolders) {
      const catDir = path.join(locationsRoot, city, cat.dirName);
      if (!fs.existsSync(catDir) || !fs.statSync(catDir).isDirectory()) {
        continue;
      }

      const placeFolders = fs.readdirSync(catDir);
      for (const placeSlug of placeFolders) {
        const placePath = path.join(catDir, placeSlug);
        if (!fs.statSync(placePath).isDirectory()) {
          continue;
        }

        const files = fs.readdirSync(placePath);
        const imageFiles = files.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
        if (imageFiles.length === 0) {
          continue;
        }

        // Prefer primary image matching folder name if present, else first image
        const preferredImg =
          imageFiles.find((f) => f.toLowerCase().startsWith(placeSlug.toLowerCase() + '.')) ||
          imageFiles[0];

        const imageUrl = `/api/images/locations/${city}/${cat.dirName}/${placeSlug}/${preferredImg}`;

        // Pick localized text file
        let textFile = files.find((f) => f.toLowerCase() === `${placeSlug.toLowerCase()}.${locale}.txt`);
        if (!textFile && locale !== 'ru') {
          textFile = files.find((f) => f.toLowerCase().endsWith(`.${locale}.txt`));
        }
        if (!textFile) {
          textFile = files.find((f) => f.toLowerCase() === `${placeSlug.toLowerCase()}.txt`);
        }
        if (!textFile) {
          textFile = files.find((f) => f.endsWith('.txt') && !/\.(en|de|tr)\.txt$/i.test(f));
        }

        let title = placeSlug;
        let subtitle = '';

        if (textFile) {
          try {
            const raw = fs.readFileSync(path.join(placePath, textFile), 'utf8');
            const firstNonEmptyLine =
              raw
                .split(/\r?\n/)
                .map((l) => l.trim())
                .find((l) => l.length > 0) || placeSlug;
            const parsed = cleanHeading(firstNonEmptyLine, placeSlug, locale);
            title = parsed.title;
            subtitle = parsed.subtitle;
          } catch {
            // keep fallback
          }
        }

        items.push({
          id: `${city}-${cat.routeSegment}-${placeSlug}`,
          title,
          subtitle,
          regionName,
          image: imageUrl,
          href: `/${city}/${cat.routeSegment}/${placeSlug}`,
        });
      }
    }
  }

  return items;
}
