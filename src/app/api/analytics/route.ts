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
  userAgent?: string;
  device?: string;
  referrer?: string;
  source?: string;
  browserLang?: string;
}

export interface BotLogEntry {
  ts: number;
  country: string;
  countryCode: string;
  city: string;
  path: string;
  botName: string;
  reason: string;
  userAgent: string;
}

interface ClientSignals {
  webdriver?: boolean;
  screenW?: number;
  screenH?: number;
  languagesCount?: number;
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
  botHourlyViews: Record<string, number>;
  botAgents: Record<string, number>;
  recentBotLog: BotLogEntry[];
  trafficSources: Record<string, number>;
  browserLangs: Record<string, number>;
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
    botHourlyViews: {},
    botAgents: {},
    recentBotLog: [],
    trafficSources: {},
    browserLangs: {},
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
        botHourlyViews: parsed.botHourlyViews && typeof parsed.botHourlyViews === 'object' ? parsed.botHourlyViews : {},
        botAgents: parsed.botAgents && typeof parsed.botAgents === 'object' ? parsed.botAgents : {},
        recentBotLog: Array.isArray(parsed.recentBotLog) ? parsed.recentBotLog : [],
        trafficSources: parsed.trafficSources && typeof parsed.trafficSources === 'object' ? parsed.trafficSources : {},
        browserLangs: parsed.browserLangs && typeof parsed.browserLangs === 'object' ? parsed.browserLangs : {},
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

const BOT_PATTERNS: Array<{ pattern: RegExp; name: string }> = [
  { pattern: /bytespider/i, name: 'Bytespider (ByteDance)' },
  { pattern: /petalbot/i, name: 'PetalBot (Huawei)' },
  { pattern: /baiduspider/i, name: 'Baiduspider' },
  { pattern: /sogou|yisouspider|360spider/i, name: 'Chinese Search Bot' },
  { pattern: /googlebot|google-inspectiontool|mediapartners-google|adsbot-google/i, name: 'Googlebot' },
  { pattern: /yandexbot|yandexmobilebot|yandeximages|yandexmetrika|yandexrenderresources|yandexwebmaster|yandexaccessibilitybot/i, name: 'YandexBot' },
  { pattern: /bingbot|bingpreview|msnbot/i, name: 'Bingbot' },
  { pattern: /duckduckbot/i, name: 'DuckDuckBot' },
  { pattern: /applebot/i, name: 'Applebot' },
  { pattern: /gptbot|oai-searchbot|chatgpt-user/i, name: 'OpenAI Bot' },
  { pattern: /claudebot|anthropic-ai|claude-web/i, name: 'ClaudeBot' },
  { pattern: /perplexitybot/i, name: 'PerplexityBot' },
  { pattern: /ccbot|amazonbot|meta-externalagent/i, name: 'AI Crawler' },
  { pattern: /ahrefsbot|semrushbot|mj12bot|dotbot|screaming frog/i, name: 'SEO Crawler' },
  { pattern: /facebookexternalhit|twitterbot|telegrambot|slackbot|discordbot|linkedinbot|vkshare/i, name: 'Social Preview Bot' },
  { pattern: /headlesschrome|phantomjs|puppeteer|playwright|selenium|webdriver/i, name: 'Headless Browser' },
  { pattern: /lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot|statuscake/i, name: 'Monitor / Audit' },
  { pattern: /curl\/|wget\/|python-requests|python-urllib|go-http-client|axios\/|node-fetch|scrapy|httpclient|okhttp/i, name: 'HTTP Client / Scraper' },
  { pattern: /\b(bot|crawler|spider|scraper|slurp)\b/i, name: 'Other Bot' },
];

// Отделяет краулеры, скраперы и headless-браузеры от живых туристов без ложных срабатываний на обычные браузеры
function detectBot(
  userAgent: string,
  clientSignals?: ClientSignals
): { isBot: boolean; botName: string; reason: string } {
  if (!userAgent || userAgent.trim().length < 12) {
    return { isBot: true, botName: 'Empty/Short UA', reason: 'Empty User-Agent' };
  }

  for (const entry of BOT_PATTERNS) {
    if (entry.pattern.test(userAgent)) {
      return { isBot: true, botName: entry.name, reason: 'User-Agent pattern' };
    }
  }

  if (clientSignals?.webdriver === true) {
    return { isBot: true, botName: 'Headless / WebDriver', reason: 'navigator.webdriver' };
  }
  if (clientSignals && clientSignals.screenW === 0 && clientSignals.screenH === 0) {
    return { isBot: true, botName: 'Headless (0x0 screen)', reason: 'Zero viewport' };
  }
  if (clientSignals && clientSignals.languagesCount === 0 && /chrome|firefox/i.test(userAgent)) {
    return { isBot: true, botName: 'Headless (no langs)', reason: 'Empty navigator.languages' };
  }

  return { isBot: false, botName: '', reason: '' };
}

// Формирует краткую сводку устройства и браузера для удобного просмотра в журнале
function parseUserAgentSummary(ua: string): string {
  const device = /ipad|tablet/i.test(ua)
    ? 'Tablet'
    : /mobile|android|iphone|ipod/i.test(ua)
    ? 'Mobile'
    : 'Desktop';

  const browser = /yabrowser/i.test(ua)
    ? 'YaBrowser'
    : /edg\//i.test(ua)
    ? 'Edge'
    : /opr\/|opera/i.test(ua)
    ? 'Opera'
    : /firefox|fxios/i.test(ua)
    ? 'Firefox'
    : /chrome|crios/i.test(ua)
    ? 'Chrome'
    : /safari/i.test(ua)
    ? 'Safari'
    : 'Other';

  return `${device} · ${browser}`;
}

// Определяет источник перехода по внешнему referrer (исключая собственный домен)
function classifyTrafficSource(rawReferrer: string): { source: string; cleanReferrer: string } {
  const trimmed = typeof rawReferrer === 'string' ? rawReferrer.trim() : '';
  if (!trimmed) {
    return { source: 'Прямой заход', cleanReferrer: '' };
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { source: 'Прямой заход', cleanReferrer: '' };
    }

    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    if (
      !host ||
      host === 'dalaman.info' ||
      host.endsWith('.dalaman.info') ||
      host === 'localhost' ||
      host === '127.0.0.1'
    ) {
      return { source: 'Прямой заход', cleanReferrer: '' };
    }

    let source = host.slice(0, 60);
    if (host.includes('google.')) source = 'Google';
    else if (host.includes('yandex.') || host === 'ya.ru' || host.endsWith('.ya.ru')) source = 'Yandex';
    else if (host.includes('bing.com')) source = 'Bing';
    else if (host.includes('duckduckgo.com')) source = 'DuckDuckGo';
    else if (host.includes('baidu.com')) source = 'Baidu';
    else if (host.includes('yahoo.com')) source = 'Yahoo';
    else if (host === 't.me' || host.includes('telegram.')) source = 'Telegram';
    else if (host.includes('xiaohongshu.com')) source = 'Xiaohongshu';
    else if (host.includes('vk.com')) source = 'VK';
    else if (host.includes('youtube.com') || host === 'youtu.be') source = 'YouTube';
    else if (host.includes('facebook.com') || host === 'fb.com') source = 'Facebook';
    else if (host.includes('instagram.com')) source = 'Instagram';
    else if (host.includes('chatgpt.com') || host.includes('perplexity.ai')) source = 'AI Search';

    return {
      source,
      cleanReferrer: parsed.href.slice(0, 200),
    };
  } catch {
    return { source: 'Прямой заход', cleanReferrer: '' };
  }
}

// Нормализует язык браузера (полный код для лога и базовый 2-буквенный код для агрегации)
function normalizeBrowserLang(
  clientLang: string,
  acceptLangHeader: string
): { fullLang: string; langBucket: string } {
  const rawClient = typeof clientLang === 'string' ? clientLang.trim() : '';
  const rawHeader = typeof acceptLangHeader === 'string'
    ? acceptLangHeader.split(',')[0].split(';')[0].trim()
    : '';
  const candidate = (rawClient || rawHeader).slice(0, 12);
  if (!candidate) {
    return { fullLang: '', langBucket: '' };
  }

  const parts = candidate.split(/[-_]/);
  const base = (parts[0] || '').toLowerCase();
  if (!/^[a-z]{2,3}$/.test(base)) {
    return { fullLang: '', langBucket: '' };
  }

  const region = parts[1] && /^[a-zA-Z]{2,4}$/.test(parts[1]) ? `-${parts[1].toUpperCase()}` : '';
  return {
    fullLang: `${base}${region}`,
    langBucket: base,
  };
}

function pruneAndCompute(store: AnalyticsStore, now: number) {
  // 1. Очистка неактивных сессий старше 5 минут
  for (const [sid, lastSeen] of Object.entries(store.activeSessions)) {
    if (typeof lastSeen !== 'number' || now - lastSeen > SESSION_TTL_MS) {
      delete store.activeSessions[sid];
    }
  }

  // 2. Очистка почасовых просмотров (люди и боты) старше 48 часов и подсчет за последние 24 часа
  const cutoff24h = now - HOURS_24_MS;
  const cutoff48h = now - 2 * HOURS_24_MS;
  let views24h = 0;
  let botViews24h = 0;

  for (const [hourKey, count] of Object.entries(store.hourlyViews)) {
    const hourTs = Date.parse(`${hourKey}:00:00.000Z`);
    if (Number.isNaN(hourTs) || hourTs < cutoff48h) {
      delete store.hourlyViews[hourKey];
    } else if (hourTs >= cutoff24h - 3600_000) {
      views24h += Number(count) || 0;
    }
  }

  for (const [hourKey, count] of Object.entries(store.botHourlyViews)) {
    const hourTs = Date.parse(`${hourKey}:00:00.000Z`);
    if (Number.isNaN(hourTs) || hourTs < cutoff48h) {
      delete store.botHourlyViews[hourKey];
    } else if (hourTs >= cutoff24h - 3600_000) {
      botViews24h += Number(count) || 0;
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
    botViews24h,
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
    return NextResponse.json(
      {
        onlineNow: metrics.onlineNow,
        views24h: metrics.views24h,
        visitors30d: metrics.visitors30d,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
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

  // Источники трафика (топ 15)
  const trafficSources = Object.entries(store.trafficSources)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Языки браузера (топ 12)
  const browserLangs = Object.entries(store.browserLangs)
    .map(([lang, count]) => ({ lang, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  // Поисковые и прочие боты (топ 15)
  const botAgents = Object.entries(store.botAgents)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  return NextResponse.json(
    {
      onlineNow: metrics.onlineNow,
      views24h: metrics.views24h,
      visitors30d: metrics.visitors30d,
      botViews24h: metrics.botViews24h,
      dailyHistory,
      countries: countriesList,
      cityNodes: cityNodesList,
      topPages,
      trafficSources,
      browserLangs,
      botAgents,
      recentLog: store.recentLog.slice(0, 60),
      recentBotLog: store.recentBotLog.slice(0, 60),
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
    const bodyObj = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
    const sessionId = sanitizeSessionId(bodyObj.sessionId);
    const registerView = Boolean(bodyObj.registerView);
    const rawPath = typeof bodyObj.pathname === 'string' ? bodyObj.pathname : '/';
    const cleanPath = rawPath.slice(0, 120) || '/';
    const rawReferrer = typeof bodyObj.referrer === 'string' ? bodyObj.referrer : '';
    const rawBrowserLang = typeof bodyObj.browserLang === 'string' ? bodyObj.browserLang : '';
    const isEntry = typeof bodyObj.isEntry === 'boolean' ? bodyObj.isEntry : true;

    const rawSignals = bodyObj.clientSignals && typeof bodyObj.clientSignals === 'object'
      ? (bodyObj.clientSignals as Record<string, unknown>)
      : undefined;
    const clientSignals: ClientSignals | undefined = rawSignals
      ? {
          webdriver: rawSignals.webdriver === true,
          screenW: typeof rawSignals.screenW === 'number' ? rawSignals.screenW : undefined,
          screenH: typeof rawSignals.screenH === 'number' ? rawSignals.screenH : undefined,
          languagesCount: typeof rawSignals.languagesCount === 'number' ? rawSignals.languagesCount : undefined,
        }
      : undefined;

    if (!sessionId) {
      return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 });
    }

    const userAgent = (request.headers.get('user-agent') || '').slice(0, 260);
    const acceptLang = request.headers.get('accept-language') || '';
    const botCheck = detectBot(userAgent, clientSignals);

    const now = Date.now();
    const store = readStore();

    if (botCheck.isBot) {
      // Отсеиваем ботов и краулеров, сохраняя отдельный лог для контроля индексации
      if (registerView) {
        const hourKey = getHourKey(now);
        store.botHourlyViews[hourKey] = (store.botHourlyViews[hourKey] || 0) + 1;
        store.botAgents[botCheck.botName] = (store.botAgents[botCheck.botName] || 0) + 1;

        const clientIp = extractClientIp(request);
        const geo = await resolveIpGeo(clientIp);

        store.recentBotLog.unshift({
          ts: now,
          country: geo.country,
          countryCode: geo.countryCode || 'UN',
          city: geo.city,
          path: cleanPath,
          botName: botCheck.botName,
          reason: botCheck.reason,
          userAgent,
        });
        if (store.recentBotLog.length > 100) {
          store.recentBotLog = store.recentBotLog.slice(0, 100);
        }
      }

      const metrics = pruneAndCompute(store, now);
      writeStore(store);

      return NextResponse.json(
        {
          onlineNow: metrics.onlineNow,
          views24h: metrics.views24h,
          visitors30d: metrics.visitors30d,
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      );
    }

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

      const device = parseUserAgentSummary(userAgent);
      const { source, cleanReferrer } = classifyTrafficSource(rawReferrer);
      const { fullLang, langBucket } = normalizeBrowserLang(rawBrowserLang, acceptLang);

      if (isEntry) {
        store.trafficSources[source] = (store.trafficSources[source] || 0) + 1;
        if (langBucket) {
          store.browserLangs[langBucket] = (store.browserLangs[langBucket] || 0) + 1;
        }
      }

      store.recentLog.unshift({
        ts: now,
        country: geo.country,
        countryCode: cCode,
        city: geo.city,
        lat: geo.lat,
        lon: geo.lon,
        path: cleanPath,
        userAgent,
        device,
        referrer: cleanReferrer,
        source,
        browserLang: fullLang,
      });
      if (store.recentLog.length > 100) {
        store.recentLog = store.recentLog.slice(0, 100);
      }
    }

    const metrics = pruneAndCompute(store, now);
    writeStore(store);

    return NextResponse.json(
      {
        onlineNow: metrics.onlineNow,
        views24h: metrics.views24h,
        visitors30d: metrics.visitors30d,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Analytics POST error:', error);
    return NextResponse.json({ error: 'Analytics error' }, { status: 500 });
  }
}
