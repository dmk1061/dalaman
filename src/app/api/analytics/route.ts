import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const SESSION_TTL_MS = 5 * 60 * 1000; // 5 минут окно онлайн-активности
const HOURS_24_MS = 24 * 60 * 60 * 1000;
const DAYS_30_MS = 30 * 24 * 60 * 60 * 1000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'analytics.json');
const ADMIN_SECRET = process.env.ANALYTICS_ADMIN_KEY || 'dalaman2026';

export interface CityGeoNode {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  count: number;
  lastSeen: number;
}

export interface CountryStatEntry {
  country: string;
  countryCode: string;
  views: number;
  visitors: string[];
}

export interface VisitLogEntry {
  ts: number;
  country: string;
  countryCode: string;
  city: string;
  lat: number;
  lon: number;
  path: string;
}

interface AnalyticsStore {
  activeSessions: Record<string, number>;
  hourlyViews: Record<string, number>;
  dailyVisitors: Record<string, string[]>;
  dailyViews: Record<string, number>;
  countries: Record<string, CountryStatEntry>;
  cityNodes: Record<string, CityGeoNode>;
  pageViews: Record<string, number>;
  recentLog: VisitLogEntry[];
}

interface GeoInfo {
  country: string;
  countryCode: string;
  city: string;
  lat: number;
  lon: number;
}

const globalForAnalytics = globalThis as unknown as {
  __dalamanAnalytics?: AnalyticsStore;
  __dalamanIpGeoCache?: Map<string, GeoInfo>;
};

function createEmptyStore(): AnalyticsStore {
  return {
    activeSessions: {},
    hourlyViews: {},
    dailyVisitors: {},
    dailyViews: {},
    countries: {},
    cityNodes: {},
    pageViews: {},
    recentLog: [],
  };
}

function readStore(): AnalyticsStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw) as Partial<AnalyticsStore>;
      const store: AnalyticsStore = {
        activeSessions: parsed.activeSessions && typeof parsed.activeSessions === 'object' ? parsed.activeSessions : {},
        hourlyViews: parsed.hourlyViews && typeof parsed.hourlyViews === 'object' ? parsed.hourlyViews : {},
        dailyVisitors: parsed.dailyVisitors && typeof parsed.dailyVisitors === 'object' ? parsed.dailyVisitors : {},
        dailyViews: parsed.dailyViews && typeof parsed.dailyViews === 'object' ? parsed.dailyViews : {},
        countries: parsed.countries && typeof parsed.countries === 'object' ? parsed.countries : {},
        cityNodes: parsed.cityNodes && typeof parsed.cityNodes === 'object' ? parsed.cityNodes : {},
        pageViews: parsed.pageViews && typeof parsed.pageViews === 'object' ? parsed.pageViews : {},
        recentLog: Array.isArray(parsed.recentLog) ? parsed.recentLog : [],
      };
      globalForAnalytics.__dalamanAnalytics = store;
      return store;
    }
  } catch (error) {
    console.warn('Analytics store read warning, using in-memory fallback:', error);
  }
  if (!globalForAnalytics.__dalamanAnalytics) {
    globalForAnalytics.__dalamanAnalytics = createEmptyStore();
  }
  return globalForAnalytics.__dalamanAnalytics;
}

function writeStore(store: AnalyticsStore): void {
  globalForAnalytics.__dalamanAnalytics = store;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store), 'utf8');
  } catch (error) {
    console.warn('Analytics store write warning (in-memory preserved):', error);
  }
}

function getHourKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 13); // YYYY-MM-DDTHH
}

function getDayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10); // YYYY-MM-DD
}

function extractClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0].trim();
    if (first) return first.replace(/^::ffff:/, '');
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim().replace(/^::ffff:/, '');
  }
  return '127.0.0.1';
}

async function resolveIpGeo(ip: string): Promise<GeoInfo> {
  const defaultGeo: GeoInfo = {
    country: 'Turkey',
    countryCode: 'TR',
    city: 'Dalaman',
    lat: 36.7667,
    lon: 28.8,
  };

  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return defaultGeo;
  }

  if (!globalForAnalytics.__dalamanIpGeoCache) {
    globalForAnalytics.__dalamanIpGeoCache = new Map();
  }
  const cache = globalForAnalytics.__dalamanIpGeoCache;
  const cached = cache.get(ip);
  if (cached) return cached;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
        const info: GeoInfo = {
          country: String(data.country || 'Unknown'),
          countryCode: String(data.country_code || 'UN').toUpperCase(),
          city: String(data.city || data.region || 'Unknown'),
          lat: Number(data.latitude),
          lon: Number(data.longitude),
        };
        if (cache.size > 2000) cache.clear();
        cache.set(ip, info);
        return info;
      }
    }
  } catch {
    // Fallback to ip-api if ipwho.is times out
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,city,lat,lon`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data && data.status === 'success' && typeof data.lat === 'number' && typeof data.lon === 'number') {
        const info: GeoInfo = {
          country: String(data.country || 'Unknown'),
          countryCode: String(data.countryCode || 'UN').toUpperCase(),
          city: String(data.city || 'Unknown'),
          lat: Number(data.lat),
          lon: Number(data.lon),
        };
        cache.set(ip, info);
        return info;
      }
    }
  } catch {
    // Use default fallback
  }

  return defaultGeo;
}

function pruneAndCompute(store: AnalyticsStore, now: number) {
  // 1. Очистка неактивных сессий старше 5 минут
  for (const [sid, lastSeen] of Object.entries(store.activeSessions)) {
    if (typeof lastSeen !== 'number' || now - lastSeen > SESSION_TTL_MS) {
      delete store.activeSessions[sid];
    }
  }

  // 2. Очистка почасовых просмотров старше 48 часов и подсчет за последние 24 часа
  const cutoff24h = now - HOURS_24_MS;
  const cutoff48h = now - 2 * HOURS_24_MS;
  let views24h = 0;

  for (const [hourKey, count] of Object.entries(store.hourlyViews)) {
    const hourTs = Date.parse(`${hourKey}:00:00.000Z`);
    if (Number.isNaN(hourTs) || hourTs < cutoff48h) {
      delete store.hourlyViews[hourKey];
    } else if (hourTs >= cutoff24h - 3600_000) {
      views24h += Number(count) || 0;
    }
  }

  // 3. Очистка дневных уникальных гостей старше 30 дней и подсчет уникальных за 30 дней
  const cutoff30d = now - DAYS_30_MS;
  const uniqueSet = new Set<string>();

  for (const [dayKey, visitors] of Object.entries(store.dailyVisitors)) {
    const dayTs = Date.parse(`${dayKey}T00:00:00.000Z`);
    if (Number.isNaN(dayTs) || dayTs < cutoff30d) {
      delete store.dailyVisitors[dayKey];
      delete store.dailyViews[dayKey];
    } else if (Array.isArray(visitors)) {
      for (const vid of visitors) {
        uniqueSet.add(vid);
      }
    }
  }

  const onlineNow = Object.keys(store.activeSessions).length;

  return {
    onlineNow,
    views24h,
    visitors30d: uniqueSet.size,
  };
}

function sanitizeSessionId(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const cleaned = raw.trim();
  if (!/^[a-zA-Z0-9_-]{6,64}$/.test(cleaned)) {
    return null;
  }
  return cleaned;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isDetail = searchParams.get('detail') === '1';
  const key = searchParams.get('key') || '';

  const now = Date.now();
  const store = readStore();
  const metrics = pruneAndCompute(store, now);
  writeStore(store);

  if (!isDetail) {
    return NextResponse.json(metrics, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }

  if (key !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized: invalid admin key' }, { status: 401 });
  }

  // Build sorted daily history for the last 30 days
  const allDays = Object.keys(store.dailyVisitors).sort((a, b) => b.localeCompare(a));
  const dailyHistory = allDays.map((date) => {
    const visitorsArr = Array.isArray(store.dailyVisitors[date]) ? store.dailyVisitors[date] : [];
    const viewsCount = store.dailyViews[date] || visitorsArr.length;
    return {
      date,
      uniqueVisitors: visitorsArr.length,
      pageViews: viewsCount,
    };
  });

  // Build sorted countries list
  const countriesList = Object.values(store.countries)
    .map((c) => ({
      country: c.country,
      countryCode: c.countryCode,
      views: c.views,
      uniqueVisitors: Array.isArray(c.visitors) ? c.visitors.length : 1,
    }))
    .sort((a, b) => b.views - a.views);

  // Build sorted city nodes for 3D Globe
  const cityNodesList = Object.values(store.cityNodes).sort((a, b) => b.lastSeen - a.lastSeen);

  // Build top pages
  const topPages = Object.entries(store.pageViews)
    .map(([pagePath, views]) => ({ path: pagePath, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  return NextResponse.json(
    {
      ...metrics,
      dailyHistory,
      countries: countriesList,
      cityNodes: cityNodesList,
      topPages,
      recentLog: store.recentLog.slice(0, 60),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = sanitizeSessionId((body as Record<string, unknown>)?.sessionId);
    const registerView = Boolean((body as Record<string, unknown>)?.registerView);
    const rawPath = typeof (body as Record<string, unknown>)?.pathname === 'string' ? String((body as Record<string, unknown>).pathname) : '/';
    const cleanPath = rawPath.slice(0, 120) || '/';

    if (!sessionId) {
      return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 });
    }

    const now = Date.now();
    const store = readStore();

    store.activeSessions[sessionId] = now;

    if (registerView) {
      const hourKey = getHourKey(now);
      const dayKey = getDayKey(now);
      store.hourlyViews[hourKey] = (store.hourlyViews[hourKey] || 0) + 1;
      store.dailyViews[dayKey] = (store.dailyViews[dayKey] || 0) + 1;

      if (!Array.isArray(store.dailyVisitors[dayKey])) {
        store.dailyVisitors[dayKey] = [];
      }
      if (!store.dailyVisitors[dayKey].includes(sessionId)) {
        store.dailyVisitors[dayKey].push(sessionId);
      }

      store.pageViews[cleanPath] = (store.pageViews[cleanPath] || 0) + 1;

      // Resolve visitor geography by IP
      const clientIp = extractClientIp(request);
      const geo = await resolveIpGeo(clientIp);

      const cCode = geo.countryCode || 'TR';
      if (!store.countries[cCode]) {
        store.countries[cCode] = {
          country: geo.country,
          countryCode: cCode,
          views: 0,
          visitors: [],
        };
      }
      store.countries[cCode].views += 1;
      if (!store.countries[cCode].visitors.includes(sessionId)) {
        store.countries[cCode].visitors.push(sessionId);
      }

      const cityKey = `${cCode}:${geo.city}`;
      if (!store.cityNodes[cityKey]) {
        store.cityNodes[cityKey] = {
          city: geo.city,
          country: geo.country,
          countryCode: cCode,
          lat: geo.lat,
          lon: geo.lon,
          count: 0,
          lastSeen: now,
        };
      }
      store.cityNodes[cityKey].count += 1;
      store.cityNodes[cityKey].lastSeen = now;

      store.recentLog.unshift({
        ts: now,
        country: geo.country,
        countryCode: cCode,
        city: geo.city,
        lat: geo.lat,
        lon: geo.lon,
        path: cleanPath,
      });
      if (store.recentLog.length > 100) {
        store.recentLog = store.recentLog.slice(0, 100);
      }
    }

    const metrics = pruneAndCompute(store, now);
    writeStore(store);

    return NextResponse.json(metrics, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Analytics POST error:', error);
    return NextResponse.json({ error: 'Analytics error' }, { status: 500 });
  }
}
