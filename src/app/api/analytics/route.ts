import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const SESSION_TTL_MS = 5 * 60 * 1000; // 5 минут окно онлайн-активности
const HOURS_24_MS = 24 * 60 * 60 * 1000;
const DAYS_30_MS = 30 * 24 * 60 * 60 * 1000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'analytics.json');

interface AnalyticsStore {
  activeSessions: Record<string, number>;
  hourlyViews: Record<string, number>;
  dailyVisitors: Record<string, string[]>;
}

const globalForAnalytics = globalThis as unknown as {
  __dalamanAnalytics?: AnalyticsStore;
};

function createEmptyStore(): AnalyticsStore {
  return {
    activeSessions: {},
    hourlyViews: {},
    dailyVisitors: {},
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

export async function GET() {
  const now = Date.now();
  const store = readStore();
  const metrics = pruneAndCompute(store, now);
  writeStore(store);

  return NextResponse.json(metrics, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = sanitizeSessionId((body as Record<string, unknown>)?.sessionId);
    const registerView = Boolean((body as Record<string, unknown>)?.registerView);

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

      if (!Array.isArray(store.dailyVisitors[dayKey])) {
        store.dailyVisitors[dayKey] = [];
      }
      if (!store.dailyVisitors[dayKey].includes(sessionId)) {
        store.dailyVisitors[dayKey].push(sessionId);
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
