"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  FaGlobeEurope,
  FaUsers,
  FaEye,
  FaChartLine,
  FaLock,
  FaSyncAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFileAlt,
  FaClock,
  FaArrowLeft,
  FaRobot,
  FaEyeSlash,
  FaSignOutAlt,
  FaLanguage,
  FaLink,
  FaSearch,
} from 'react-icons/fa';

interface CityGeoNode {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  count: number;
  lastSeen: number;
}

interface CountryStat {
  country: string;
  countryCode: string;
  views: number;
  uniqueVisitors: number;
}

interface DailyHistoryItem {
  date: string;
  uniqueVisitors: number;
  pageViews: number;
}

interface TopPageItem {
  path: string;
  views: number;
}

interface VisitLogEntry {
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

interface BotLogEntry {
  ts: number;
  country: string;
  countryCode: string;
  city: string;
  path: string;
  botName: string;
  reason: string;
  userAgent: string;
}

interface TrafficSourceItem {
  source: string;
  count: number;
}

interface BrowserLangItem {
  lang: string;
  count: number;
}

interface BotAgentItem {
  name: string;
  count: number;
}

interface DetailedAnalyticsData {
  onlineNow: number;
  views24h: number;
  visitors30d: number;
  botViews24h?: number;
  dailyHistory: DailyHistoryItem[];
  countries: CountryStat[];
  cityNodes: CityGeoNode[];
  topPages: TopPageItem[];
  trafficSources?: TrafficSourceItem[];
  browserLangs?: BrowserLangItem[];
  botAgents?: BotAgentItem[];
  recentLog: VisitLogEntry[];
  recentBotLog?: BotLogEntry[];
}

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return '🌍';
  const upper = code.toUpperCase();
  const A = 0x1f1e6;
  const c1 = upper.charCodeAt(0) - 65;
  const c2 = upper.charCodeAt(1) - 65;
  if (c1 < 0 || c1 > 25 || c2 < 0 || c2 > 25) return '🌍';
  return String.fromCodePoint(A + c1, A + c2);
}

// Simplified landmass outline polygons [lat, lon] so the 3D Globe looks recognizable without external geojson files
const LAND_POLYGONS: [number, number][][] = [
  // Europe & Anatolia / Mediterranean
  [
    [36, -9], [43, -9], [48, -4], [54, 8], [60, 10], [68, 16], [70, 28], [60, 30],
    [55, 38], [47, 39], [45, 36], [42, 28], [41, 29], [42, 35], [41, 41], [37, 43],
    [36, 36], [36.7, 28.8], [38, 26], [40, 26], [38, 23], [40, 20], [45, 13], [40, 18],
    [38, 15], [43, 10], [43, 5], [36, -5], [36, -9],
  ],
  // Great Britain
  [
    [50, -5], [55, -5], [58, -3], [53, 1], [51, 1], [50, -5],
  ],
  // Africa
  [
    [36, -6], [37, 10], [32, 15], [31, 32], [22, 37], [12, 44], [11, 51], [-2, 41],
    [-15, 40], [-26, 33], [-34, 25], [-34, 18], [-18, 12], [-5, 12], [4, 9], [5, -4],
    [10, -15], [15, -17], [25, -15], [36, -6],
  ],
  // Asia
  [
    [37, 43], [45, 50], [55, 60], [68, 70], [72, 110], [66, 170], [55, 140], [40, 122],
    [31, 121], [22, 114], [10, 105], [2, 103], [16, 97], [22, 88], [8, 77], [20, 72],
    [25, 66], [26, 56], [24, 51], [13, 45], [30, 33], [36, 36], [37, 43],
  ],
  // North America
  [
    [70, -160], [70, -70], [50, -55], [42, -70], [30, -81], [25, -80], [28, -96],
    [19, -96], [8, -78], [15, -92], [23, -106], [32, -117], [48, -124], [60, -145], [70, -160],
  ],
  // South America
  [
    [10, -75], [8, -60], [-5, -35], [-23, -43], [-35, -54], [-54, -68], [-45, -75],
    [-18, -71], [-5, -81], [5, -77], [10, -75],
  ],
  // Australia
  [
    [-12, 131], [-12, 142], [-25, 153], [-38, 146], [-34, 135], [-34, 115], [-22, 114], [-15, 124], [-12, 131],
  ],
];

function InteractiveVisitorGlobe({ cityNodes }: { cityNodes: CityGeoNode[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef<{ lon: number; lat: number }>({ lon: -28.8, lat: -36.7 });
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const autoRotateRef = useRef<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const project = (latDeg: number, lonDeg: number, radius: number, cx: number, cy: number) => {
      const lat = (latDeg * Math.PI) / 180;
      const lon = ((lonDeg + rotationRef.current.lon) * Math.PI) / 180;
      const tilt = (rotationRef.current.lat * Math.PI) / 180;

      const x0 = Math.cos(lat) * Math.sin(lon);
      const y0 = Math.sin(lat);
      const z0 = Math.cos(lat) * Math.cos(lon);

      const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
      const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
      const x = x0;

      return {
        x: cx + x * radius,
        y: cy - y * radius,
        z,
      };
    };

    const render = () => {
      tick += 1;
      if (autoRotateRef.current && !isDraggingRef.current) {
        rotationRef.current.lon -= 0.18;
      }

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth || 460;
      const height = canvas.clientHeight || 420;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;

      // Outer atmospheric glow
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.18);
      glow.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      glow.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
      ctx.fill();

      // Globe sphere ocean background
      const oceanGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      oceanGrad.addColorStop(0, '#0f2942');
      oceanGrad.addColorStop(0.7, '#09192b');
      oceanGrad.addColorStop(1, '#040c17');
      ctx.fillStyle = oceanGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Sphere border
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Clip to globe circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Draw latitude & longitude grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.11)';
      ctx.lineWidth = 1;

      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -80; lat <= 80; lat += 5) {
          const p = project(lat, lon, radius, cx, cy);
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 5) {
          const p = project(lat, lon, radius, cx, cy);
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Draw continent outlines
      ctx.fillStyle = 'rgba(14, 116, 144, 0.25)';
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.42)';
      ctx.lineWidth = 1.2;

      for (const poly of LAND_POLYGONS) {
        ctx.beginPath();
        let started = false;
        for (const [lat, lon] of poly) {
          const p = project(lat, lon, radius, cx, cy);
          if (p.z > -0.05) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.fill();
        ctx.stroke();
      }

      // Dalaman hub coordinates (36.77N, 28.80E)
      const dalamanPos = project(36.7667, 28.8, radius, cx, cy);

      // Draw arcs and blinking points for all visitor cities
      const activeNodes: CityGeoNode[] =
        cityNodes.length > 0
          ? cityNodes
          : [{ city: 'Dalaman', country: 'Turkey', countryCode: 'TR', lat: 36.7667, lon: 28.8, count: 1, lastSeen: Date.now() }];

      for (let i = 0; i < activeNodes.length; i++) {
        const node = activeNodes[i];
        const p = project(node.lat, node.lon, radius, cx, cy);
        if (p.z <= 0) continue; // Behind the globe

        // Arc connecting visitor city to Dalaman Hub if both visible
        if (dalamanPos.z > 0 && (Math.abs(node.lat - 36.7667) > 0.5 || Math.abs(node.lon - 28.8) > 0.5)) {
          const midX = (p.x + dalamanPos.x) / 2;
          const midY = (p.y + dalamanPos.y) / 2 - 22;
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.28)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.quadraticCurveTo(midX, midY, dalamanPos.x, dalamanPos.y);
          ctx.stroke();
        }

        // Expanding pulse ring
        const pulsePhase = ((tick + i * 17) % 70) / 70;
        const ringRadius = 3 + pulsePhase * 15;
        ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - pulsePhase) * 0.85})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing core dot
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.8, 0, Math.PI * 2);
        ctx.fill();

        // City label for top nodes
        if (i < 12 && p.z > 0.25) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
          ctx.font = 'bold 10px Inter, sans-serif';
          ctx.fillText(`${node.city} (${node.count})`, p.x + 7, p.y + 3);
        }
      }

      // Draw Dalaman Golden Gateway Star beacon
      if (dalamanPos.z > 0) {
        const dPulse = (tick % 50) / 50;
        ctx.strokeStyle = `rgba(251, 191, 36, ${1 - dPulse})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(dalamanPos.x, dalamanPos.y, 4 + dPulse * 18, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(dalamanPos.x, dalamanPos.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [cityNodes]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    rotationRef.current.lon += dx * 0.45;
    rotationRef.current.lat = Math.max(-75, Math.min(75, rotationRef.current.lat + dy * 0.45));
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden p-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-2 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            3D Глобус визитов в реальном времени
          </span>
        </div>
        <button
          onClick={() => setAutoRotate((v) => !v)}
          className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 border border-slate-700 transition-colors"
        >
          {autoRotate ? '⏸ Пауза вращения' : '▶ Вращать глобус'}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-[380px] sm:h-[420px] cursor-grab active:cursor-grabbing"
      />

      <div className="w-full flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 mt-2 border-t border-slate-800/80 pt-2.5">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Золотой маяк: Даламан (DLM)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Изумрудные точки: города посетителей (можно крутить мышкой)
        </span>
      </div>
    </div>
  );
}

export default function AdminStatsPage({ params }: { params: { locale: string } }) {
  const locale = params?.locale || 'ru';
  const [adminKey, setAdminKey] = useState<string>('');
  const [inputKey, setInputKey] = useState<string>('');
  const [data, setData] = useState<DetailedAnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<boolean>(false);
  const [ignoreSelf, setIgnoreSelf] = useState<boolean>(false);
  const [logTab, setLogTab] = useState<'humans' | 'bots'>('humans');

  const fetchStats = async (keyToUse: string) => {
    if (!keyToUse) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setAuthError(false);
    try {
      const res = await fetch(`/api/analytics?detail=1&key=${encodeURIComponent(keyToUse)}`, {
        cache: 'no-store',
      });
      if (res.status === 401) {
        setAuthError(true);
        setData(null);
        try {
          window.localStorage.removeItem('dalaman_admin_key');
        } catch {
          // игнорируем ошибку storage
        }
        setLoading(false);
        return;
      }
      if (res.ok) {
        const json = await res.json();
        setData(json);
        try {
          window.localStorage.setItem('dalaman_admin_key', keyToUse);
        } catch {
          // игнорируем ошибку storage
        }
      }
    } catch {
      // network error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let resolvedKey = '';
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const fromUrl = urlParams.get('key');
      const fromStorage = window.localStorage.getItem('dalaman_admin_key');
      resolvedKey = fromUrl || fromStorage || '';
      setIgnoreSelf(window.localStorage.getItem('dalaman_ignore_analytics') === '1');
    } catch {
      resolvedKey = '';
    }

    if (!resolvedKey) {
      setLoading(false);
      return;
    }

    setAdminKey(resolvedKey);
    setInputKey(resolvedKey);
    fetchStats(resolvedKey);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputKey.trim();
    if (!cleaned) return;
    setAdminKey(cleaned);
    fetchStats(cleaned);
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('dalaman_admin_key');
    } catch {
      // игнорируем ошибку storage
    }
    setData(null);
    setAdminKey('');
    setInputKey('');
    setAuthError(false);
  };

  const toggleIgnoreSelf = () => {
    const next = !ignoreSelf;
    setIgnoreSelf(next);
    try {
      if (next) {
        window.localStorage.setItem('dalaman_ignore_analytics', '1');
      } else {
        window.localStorage.removeItem('dalaman_ignore_analytics');
      }
    } catch {
      // игнорируем ошибку storage
    }
  };

  if (!data && !loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <FaLock size={18} />
            </div>
            <div>
              <h1 className="text-lg font-extrabold">Закрытая статистика Dalaman.info</h1>
              <p className="text-xs text-slate-400">Доступ только для владельца портала</p>
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              Неверный ключ доступа. Попробуйте ещё раз.
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Секретный ключ доступа
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Введите секретный ключ доступа"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Открыть панель аналитики
          </button>
        </form>
      </div>
    );
  }

  const totalCountryViews =
    data?.countries.reduce((acc, c) => acc + c.views, 0) || 1;
  const trafficSources = data?.trafficSources || [];
  const totalSourceCount =
    trafficSources.reduce((acc, s) => acc + s.count, 0) || 1;
  const browserLangs = data?.browserLangs || [];
  const botAgents = data?.botAgents || [];
  const totalBotAgentCount =
    botAgents.reduce((acc, b) => acc + b.count, 0) || 1;
  const recentHumans = data?.recentLog || [];
  const recentBots = data?.recentBotLog || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 mb-2"
            >
              <FaArrowLeft size={10} /> Вернуться на главную страницу Dalaman.info
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <FaGlobeEurope className="text-cyan-400" />
              <span>Центр аналитики и географии гостей Dalaman.info</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={toggleIgnoreSelf}
              title="Не учитывать посещения с этого браузера в общей статистике"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
                ignoreSelf
                  ? 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
            >
              <FaEyeSlash size={12} />
              <span>{ignoreSelf ? 'Мои визиты скрыты' : 'Скрыть мои визиты'}</span>
            </button>

            <button
              onClick={() => fetchStats(adminKey)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <FaSyncAlt className={loading ? 'animate-spin' : ''} size={12} />
              <span>Обновить данные</span>
            </button>

            <button
              onClick={handleLogout}
              title="Сбросить ключ доступа в этом браузере"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <FaSignOutAlt size={12} />
              <span>Выйти</span>
            </button>
          </div>
        </div>

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <FaUsers /> Сейчас онлайн
            </div>
            <div className="text-3xl font-extrabold text-white">{data?.onlineNow ?? '—'}</div>
            <div className="text-[11px] text-slate-400 mt-1">Активные сессии за последние 5 мин</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
              <FaEye /> Просмотров за 24 часа
            </div>
            <div className="text-3xl font-extrabold text-white">{data?.views24h ?? '—'}</div>
            <div className="text-[11px] text-slate-400 mt-1">Открытий страниц за сутки</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              <FaChartLine /> Уникальных гостей (30д)
            </div>
            <div className="text-3xl font-extrabold text-white">{data?.visitors30d ?? '—'}</div>
            <div className="text-[11px] text-slate-400 mt-1">Уникальные браузеры за 30 дней</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <FaMapMarkerAlt /> География (Страны / Города)
            </div>
            <div className="text-3xl font-extrabold text-white">
              {data?.countries.length ?? 0} / {data?.cityNodes.length ?? 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Стран и городов на глобусе</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
              <FaRobot /> Отсеяно ботов (24ч)
            </div>
            <div className="text-3xl font-extrabold text-white">{data?.botViews24h ?? 0}</div>
            <div className="text-[11px] text-slate-400 mt-1">Не влияют на статистику гостей</div>
          </div>
        </div>

        {/* Main Grid: 3D Globe on Left + Country & City Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <InteractiveVisitorGlobe cityNodes={data?.cityNodes || []} />
          </div>

          {/* Countries & Cities Breakdown */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <FaGlobeEurope className="text-cyan-400" />
              <span>Распределение по странам</span>
            </h2>

            {data?.countries && data.countries.length > 0 ? (
              <div className="space-y-3 max-h-[210px] overflow-y-auto pr-1">
                {data.countries.map((c) => {
                  const pct = Math.round((c.views / totalCountryViews) * 100);
                  return (
                    <div key={c.countryCode} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-2">
                          <span className="text-base">{countryCodeToFlag(c.countryCode)}</span>
                          <span>{c.country}</span>
                        </span>
                        <span className="text-slate-300 font-semibold">
                          {c.uniqueVisitors} гост. • {c.views} просм. ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                          style={{ width: `${Math.max(4, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Статистика по странам накапливается по мере новых визитов.</p>
            )}

            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Точки городов на глобусе
              </h3>
              <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {(data?.cityNodes || []).map((node, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <span className="truncate font-semibold text-slate-200 pr-2">
                      {countryCodeToFlag(node.countryCode)} {node.city}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px]">
                      {node.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Grid: Traffic Sources & Browser Languages + Bot Indexers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Traffic Sources & Browser Languages */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <FaLink className="text-emerald-400" />
              <span>Источники трафика и языки гостей (живые)</span>
            </h2>

            {trafficSources.length > 0 ? (
              <div className="space-y-3 max-h-[210px] overflow-y-auto pr-1">
                {trafficSources.map((item) => {
                  const pct = Math.round((item.count / totalSourceCount) * 100);
                  return (
                    <div key={item.source} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-100 truncate pr-2">{item.source}</span>
                        <span className="text-slate-300 font-semibold flex-shrink-0">
                          {item.count} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                          style={{ width: `${Math.max(4, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Данные об источниках переходов накапливаются по мере новых живых заходов.
              </p>
            )}

            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <FaLanguage className="text-cyan-400" size={14} />
                <span>Языки браузера гостей</span>
              </h3>
              {browserLangs.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {browserLangs.map((item) => (
                    <span
                      key={item.lang}
                      className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200"
                    >
                      <span className="text-cyan-400 uppercase">{item.lang}</span>
                      <span className="text-slate-500 mx-1">•</span>
                      <span>{item.count}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Статистика языков браузера появится с новыми входами.</p>
              )}
            </div>
          </div>

          {/* 2. Search Engines & Bots */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <FaSearch className="text-rose-400" />
              <span>Поисковики и боты (индексация)</span>
            </h2>

            {botAgents.length > 0 ? (
              <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
                {botAgents.map((bot) => {
                  const pct = Math.round((bot.count / totalBotAgentCount) * 100);
                  return (
                    <div key={bot.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-100 flex items-center gap-2 truncate pr-2">
                          <FaRobot className="text-rose-400 flex-shrink-0" size={11} />
                          <span className="truncate">{bot.name}</span>
                        </span>
                        <span className="text-slate-300 font-semibold flex-shrink-0">
                          {bot.count} просм. ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full"
                          style={{ width: `${Math.max(4, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Запросы от поисковых краулеров, AI-ботов и headless-клиентов будут отображаться здесь после фильтрации.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Grid: Daily History by Date + Top Pages + Live Recent Visits Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. Daily History by Date */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <FaCalendarAlt className="text-amber-400" />
              <span>Посещаемость по датам (30 дней)</span>
            </h2>
            <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto">
              {(data?.dailyHistory || []).map((day) => (
                <div key={day.date} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-200">{day.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                      {day.uniqueVisitors} уник.
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                      {day.pageViews} просм.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Top Visited Pages */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <FaFileAlt className="text-cyan-400" />
              <span>Самые популярные страницы</span>
            </h2>
            <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto">
              {(data?.topPages || []).length > 0 ? (
                data!.topPages.map((p) => (
                  <div key={p.path} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                    <Link
                      href={p.path}
                      className="font-mono text-cyan-300 hover:underline truncate"
                      title={p.path}
                    >
                      {p.path}
                    </Link>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-white font-bold flex-shrink-0">
                      {p.views}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-2">Данные по страницам появятся с новыми переходами.</p>
              )}
            </div>
          </div>

          {/* 3. Live Recent Visits Log (Люди / Боты) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <FaClock className="text-emerald-400" />
                <span>Журнал последних визитов</span>
              </h2>
              <div className="inline-flex rounded-xl bg-slate-950 border border-slate-800 p-0.5 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setLogTab('humans')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    logTab === 'humans'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Люди ({recentHumans.length})
                </button>
                <button
                  type="button"
                  onClick={() => setLogTab('bots')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    logTab === 'bots'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Боты ({recentBots.length})
                </button>
              </div>
            </div>

            {logTab === 'humans' ? (
              <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto pr-1">
                {recentHumans.length > 0 ? (
                  recentHumans.map((entry, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 space-y-1 text-xs"
                      title={entry.userAgent || undefined}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-slate-200 truncate">
                          {countryCodeToFlag(entry.countryCode)} {entry.city}, {entry.country}
                        </div>
                        <span className="text-[11px] text-slate-400 flex-shrink-0 font-mono">
                          {new Date(entry.ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 truncate">{entry.path}</div>
                      {(entry.source || entry.browserLang || entry.device || entry.referrer) && (
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                          {entry.source && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-semibold">
                              {entry.source}
                            </span>
                          )}
                          {entry.browserLang && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono uppercase">
                              {entry.browserLang}
                            </span>
                          )}
                          {entry.device && (
                            <span
                              className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300"
                              title={entry.userAgent || undefined}
                            >
                              {entry.device}
                            </span>
                          )}
                          {entry.referrer && (
                            <span
                              className="truncate max-w-[180px] text-slate-400"
                              title={entry.referrer}
                            >
                              ← {entry.referrer}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-2">Журнал визитов заполняется в реальном времени.</p>
                )}
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto pr-1">
                {recentBots.length > 0 ? (
                  recentBots.map((entry, idx) => (
                    <div key={idx} className="py-2.5 space-y-1 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-slate-200 truncate">
                          {countryCodeToFlag(entry.countryCode)} {entry.city}, {entry.country}
                        </div>
                        <span className="text-[11px] text-slate-400 flex-shrink-0 font-mono">
                          {new Date(entry.ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 truncate">{entry.path}</div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                          {entry.botName}
                        </span>
                        <span className="text-slate-400">({entry.reason})</span>
                      </div>
                      <div
                        className="text-[10px] font-mono text-slate-500 truncate"
                        title={entry.userAgent}
                      >
                        {entry.userAgent || 'Empty User-Agent'}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-2">Отфильтрованные боты пока не зафиксированы.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
