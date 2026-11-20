import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export interface PulseNewsItem {
  id: string;
  category: string;
  dateLabel: string;
  title: string;
  summary: string;
  href: string;
  image: string;
  isExternal?: boolean;
  sourceName?: string;
}

const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours cache

const globalForPulse = globalThis as unknown as {
  __dalamanPulseCache?: Record<string, { timestamp: number; items: PulseNewsItem[] }>;
};

const STOP_WORDS = [
  'погиб', 'смерт', 'убийств', 'дтп', 'авари', 'арест', 'суд ', 'полици', 'теракт', 'пожар', 'труп',
  'killed', 'murder', 'dead', 'death', 'crash', 'accident', 'arrest', 'court', 'crime', 'stabbing',
  'cinayet', 'öldü', 'yaralı', 'kaza', 'tutukлан', 'gözaltı', 'intihar',
  'unfall', 'getötet', 'mord', 'verhaftet',
];

function decodeXmlEntities(str: string): string {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function pickImageAndCategory(title: string, locale: string): { image: string; category: string } {
  const lower = title.toLowerCase();
  const isRu = locale === 'ru';

  if (lower.includes('фетхие') || lower.includes('олюдениз') || lower.includes('fethiye') || lower.includes('ölüdeniz') || lower.includes('oludeniz') || lower.includes('babadag')) {
    return {
      image: '/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg',
      category: isRu ? 'Фетхие и Олюдениз' : 'Fethiye & Ölüdeniz',
    };
  }
  if (lower.includes('мармарис') || lower.includes('ичмелер') || lower.includes('marmaris') || lower.includes('içmeler')) {
    return {
      image: '/api/images/locations/marmaris/beach/Icmeler/icmeler.jpg',
      category: isRu ? 'Мармарис' : 'Marmaris',
    };
  }
  if (lower.includes('дальян') || lower.includes('изтузу') || lower.includes('черепах') || lower.includes('dalyan') || lower.includes('iztuzu') || lower.includes('turtle') || lower.includes('caretta')) {
    return {
      image: '/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg',
      category: isRu ? 'Дальян и Изтузу' : 'Dalyan & İztuzu',
    };
  }
  if (lower.includes('каш') || lower.includes('капуташ') || lower.includes('патар') || lower.includes('kaş') || lower.includes('kas ') || lower.includes('kaputaş') || lower.includes('patara')) {
    return {
      image: '/api/images/locations/kas/beach/kaputas/kaputas.jpg',
      category: isRu ? 'Каш и Патара' : 'Kaş & Patara',
    };
  }
  if (lower.includes('гёджек') || lower.includes('гечек') || lower.includes('яхт') || lower.includes('göcek') || lower.includes('gocek') || lower.includes('yacht')) {
    return {
      image: '/api/images/locations/gocek/beach/bedri/bedri.jpg',
      category: isRu ? 'Гёджек и яхтинг' : 'Göcek & Yachting',
    };
  }
  if (lower.includes('датч') || lower.includes('книдос') || lower.includes('datça') || lower.includes('datca') || lower.includes('knidos')) {
    return {
      image: '/api/images/locations/dacha/ruine/knidos/knidos.jpg',
      category: isRu ? 'Полуостров Датча' : 'Datça Peninsula',
    };
  }
  return {
    image: '/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg',
    category: isRu ? 'Даламан и регион' : 'Dalaman & Region',
  };
}

function formatRssDate(pubDateRaw: string, locale: string): string {
  try {
    const d = new Date(pubDateRaw);
    if (Number.isNaN(d.getTime())) {
      return locale === 'ru' ? 'Свежий выпуск' : 'Recent';
    }
    return d.toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'de' ? 'de-DE' : locale === 'tr' ? 'tr-TR' : 'en-GB', {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return locale === 'ru' ? 'Свежий выпуск' : 'Recent';
  }
}

function getEditorialFallbacks(locale: string): PulseNewsItem[] {
  const prefix = `/${locale}`;
  return [
    {
      id: 'editorial-dlm-shuttles',
      category: locale === 'ru' ? 'Аэропорт DLM и логистика' : 'DLM Airport & Shuttles',
      dateLabel: locale === 'ru' ? 'Гид портала' : 'Portal Guide',
      title:
        locale === 'ru'
          ? 'Расписание шаттлов Havaş и Muttaş под прилёты в аэропорт Даламан'
          : 'Havaş & Muttaş Shuttle Schedules Synchronized with Dalaman Arrivals',
      summary:
        locale === 'ru'
          ? 'Как быстро уехать из терминала DLM в Мармарис, Фетхие и Датчу: стоянки автобусов, оплата картами и тарифы.'
          : 'Direct bus connections from DLM Domestic ramp to Fethiye, Marmaris, and Datça Harbor.',
      href: `${prefix}/articles/airport-dalaman`,
      image: '/api/images/locations/dalaman/beach/Kayacik/kayacik.jpg',
      isExternal: false,
      sourceName: 'Dalaman.info',
    },
    {
      id: 'editorial-caretta',
      category: locale === 'ru' ? 'Экология и пляжи' : 'Nature & Beaches',
      dateLabel: locale === 'ru' ? 'Дальян и Сарыгерме' : 'Dalyan & Sarıgerme',
      title:
        locale === 'ru'
          ? 'Мониторинг морских черепах Caretta caretta на косе Изтузу и пляжах Даламана'
          : 'Caretta caretta Sea Turtle Conservation at İztuzu & Sarıgerme Beaches',
      summary:
        locale === 'ru'
          ? 'Часы доступа на заповедную косу, работа госпиталя черепах DEKAMER и правила вечернего посещения.'
          : 'Visiting hours, DEKAMER rescue center open tours, and conservation rules along the coast.',
      href: `${prefix}/articles/iztuzu-beach`,
      image: '/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg',
      isExternal: false,
      sourceName: 'Dalaman.info',
    },
    {
      id: 'editorial-calendar',
      category: locale === 'ru' ? 'События и фестивали' : 'Events & Regattas',
      dateLabel: locale === 'ru' ? 'Афиша побережья' : 'Coastal Calendar',
      title:
        locale === 'ru'
          ? 'Календарь событий региона: от парусных регат в Гёджеке до фестивалей в Датче и Фетхие'
          : 'Regional Event Calendar: From Göcek Regattas to Datça & Fethiye Festivals',
      summary:
        locale === 'ru'
          ? 'Главные культурные праздники, гастрономические ярмарки, заплывы и регаты по месяцам года.'
          : 'Key cultural festivals, culinary fairs, open-water swims, and international yacht regattas month by month.',
      href: `${prefix}/articles/events-and-festivals-calendar`,
      image: '/api/images/locations/gocek/beach/tersane/tersane.jpg',
      isExternal: false,
      sourceName: 'Dalaman.info',
    },
    {
      id: 'editorial-babadag',
      category: locale === 'ru' ? 'Горы и панорамы' : 'Trails & Mountains',
      dateLabel: locale === 'ru' ? 'Фетхие и Олюдениз' : 'Fethiye & Ölüdeniz',
      title:
        locale === 'ru'
          ? 'Канатная дорога Бабадаг (Babadağ Teleferik) и панорамные станции над Олюденизом'
          : 'Babadağ Cable Car Stations & Panoramic Decks Above Ölüdeniz',
      summary:
        locale === 'ru'
          ? 'Режим работы подъёмников, смотровые площадки на высоте 1700–1969 м и старты тандем-парапланов.'
          : 'Lift operating hours, 1700m–1969m viewpoints, alpine dining, and tandem paragliding takeoffs.',
      href: `${prefix}/articles/babadag`,
      image: '/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg',
      isExternal: false,
      sourceName: 'Dalaman.info',
    },
  ];
}

async function fetchRssFeed(locale: string): Promise<PulseNewsItem[]> {
  const feedUrls: Record<string, string[]> = {
    ru: [
      'https://news.google.com/rss/search?q=(%D0%94%D0%B0%D0%BB%D0%B0%D0%BC%D0%B0%D0%BD+OR+%D0%A4%D0%B5%D1%82%D1%85%D0%B8%D0%B5+OR+%D0%9C%D0%B0%D1%80%D0%BC%D0%B0%D1%80%D0%B8%D1%81+OR+%D0%94%D0%B0%D0%BB%D1%8C%D1%8F%D0%BD)+%D0%A2%D1%83%D1%80%D1%86%D0%B8%D1%8F+%D1%82%D1%83%D1%80%D0%B8%D0%B7%D0%BC&hl=ru&gl=RU&ceid=RU:ru',
    ],
    en: [
      'https://www.fethiyetimes.com/feed/',
      'https://news.google.com/rss/search?q=(Dalaman+OR+Fethiye+OR+Marmaris+OR+Dalyan)+Turkey+tourism&hl=en-US&gl=US&ceid=US:en',
    ],
    de: [
      'https://news.google.com/rss/search?q=(Dalaman+OR+Fethiye+OR+Marmaris+OR+Dalyan)+T%C3%BCrkei+Urlaub&hl=de&gl=DE&ceid=DE:de',
    ],
    tr: [
      'https://news.google.com/rss/search?q=(Dalaman+OR+Fethiye+OR+Marmaris+OR+Dalyan)+Mu%C4%9Fla+turizm&hl=tr&gl=TR&ceid=TR:tr',
    ],
  };

  const urls = feedUrls[locale] || feedUrls['en'];
  const parsedItems: PulseNewsItem[] = [];
  const seenTitles = new Set<string>();

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; DalamanInfoNewsBot/1.0; +https://dalaman.info)',
        },
        cache: 'no-store',
      });
      clearTimeout(timeout);

      if (!res.ok) continue;
      const xml = await res.text();

      const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
      let match: RegExpExecArray | null;

      while ((match = itemRegex.exec(xml)) !== null && parsedItems.length < 3) {
        const block = match[1];
        const rawTitle = (block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
        const rawLink = (block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || '').trim();
        const rawPubDate = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || '').trim();
        const rawSource = (block.match(/<source[^>]*>([\s\S]*?)<\/source>/i)?.[1] || '').trim();
        const rawDesc = (block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || '').trim();

        if (!rawTitle || !rawLink) continue;

        let cleanTitle = decodeXmlEntities(rawTitle);
        let sourceName = decodeXmlEntities(rawSource);

        // Google News appends " - Source Name" at the end of title
        const dashIdx = cleanTitle.lastIndexOf(' - ');
        if (dashIdx > 20) {
          if (!sourceName) {
            sourceName = cleanTitle.slice(dashIdx + 3).trim();
          }
          cleanTitle = cleanTitle.slice(0, dashIdx).trim();
        }

        const lowerCheck = cleanTitle.toLowerCase();
        if (STOP_WORDS.some((w) => lowerCheck.includes(w))) {
          continue;
        }

        if (seenTitles.has(lowerCheck)) continue;
        seenTitles.add(lowerCheck);

        const cleanDesc = decodeXmlEntities(rawDesc);
        const { image, category } = pickImageAndCategory(cleanTitle, locale);
        const dateLabel = formatRssDate(rawPubDate, locale);

        const summary =
          cleanDesc && cleanDesc.length > 25 && !cleanDesc.toLowerCase().startsWith(cleanTitle.slice(0, 15).toLowerCase())
            ? cleanDesc.slice(0, 160)
            : sourceName
            ? locale === 'ru'
              ? `Лента новостей региона • Источник: ${sourceName}`
              : `Regional News Feed • Source: ${sourceName}`
            : locale === 'ru'
            ? 'Актуальная новость туристического региона Даламан — Мугла.'
            : 'Live regional tourism update from the Dalaman & Muğla coast.';

        parsedItems.push({
          id: `rss-${parsedItems.length}-${Date.now()}`,
          category,
          dateLabel: sourceName ? `${dateLabel} • ${sourceName}` : dateLabel,
          title: cleanTitle,
          summary,
          href: rawLink,
          image,
          isExternal: true,
          sourceName: sourceName || 'News Feed',
        });
      }
    } catch {
      // Ignore network/timeout errors and fall back gracefully
    }
  }

  return parsedItems;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'ru';

  if (!globalForPulse.__dalamanPulseCache) {
    globalForPulse.__dalamanPulseCache = {};
  }

  const now = Date.now();
  const cached = globalForPulse.__dalamanPulseCache[locale];
  if (cached && now - cached.timestamp < CACHE_TTL_MS && cached.items.length >= 4) {
    return NextResponse.json({ items: cached.items });
  }

  const rssItems = await fetchRssFeed(locale);
  const fallbacks = getEditorialFallbacks(locale);

  // Combine up to 2 live RSS news items with our core seasonal editorial items so the 4-card grid is always rich
  const combined: PulseNewsItem[] = [...rssItems.slice(0, 2), ...fallbacks].slice(0, 4);

  globalForPulse.__dalamanPulseCache[locale] = {
    timestamp: now,
    items: combined,
  };

  return NextResponse.json({ items: combined });
}
