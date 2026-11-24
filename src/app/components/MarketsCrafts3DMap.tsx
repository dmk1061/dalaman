"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  FaCrosshairs,
  FaCube,
  FaExternalLinkAlt,
  FaGlobeEurope,
  FaLayerGroup,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import {
  MARKET_MAP_POINTS,
  MARKET_ZONE_PRESETS,
  type LocaleCode,
  type MarketMapPoint,
  type MarketMapPointKind,
  type MarketZoneId,
} from '@/lib/markets-crafts';

export type MapViewMode = '3d' | 'sat2d' | 'topo';

interface MarketsCrafts3DMapProps {
  locale: LocaleCode;
  activeZoneId: MarketZoneId | 'all';
  activeKindFilter: MarketMapPointKind | 'all';
  focusedPointId: string | null;
  onSelectPoint: (pointId: string) => void;
  onSelectZone: (zoneId: MarketZoneId | 'all') => void;
  onSelectKindFilter: (kind: MarketMapPointKind | 'all') => void;
}

const REGION_OVERVIEW = {
  center: [28.65, 36.60] as [number, number],
  zoom: 7.9,
  pitch: 30,
  bearing: 0,
};

const KIND_COLORS: Record<MarketMapPointKind, string> = {
  'weekly-pazar': '#059669',  // emerald-600
  'old-bazaar': '#d97706',    // amber-600
  'craft-village': '#7c3aed', // violet-600
  'mall-avm': '#0284c7',      // sky-600
};

const MAP_UI: Record<
  LocaleCode,
  {
    badge3d: string;
    btnAll: string;
    btn3dSat: string;
    btnSat2d: string;
    btn2dTopo: string;
    btnGps: string;
    gpsLocating: string;
    gpsResultPrefix: string;
    gpsKm: string;
    gpsUnsupported: string;
    gpsDenied: string;
    filterAll: string;
    filterPazar: string;
    filterBazaar: string;
    filterCraft: string;
    filterAvm: string;
    legendPazar: string;
    legendBazaar: string;
    legendCraft: string;
    legendAvm: string;
    kindLabels: Record<MarketMapPointKind, string>;
    scheduleLabel: string;
    coordsLabel: string;
    openGmaps: string;
    controlsHint: string;
    fallbackTitle: string;
    fallbackDesc: string;
  }
> = {
  ru: {
    badge3d: '3D-карта 15 рынков, базаров и ремесленных деревень',
    btnAll: 'Весь регион (Датча — Каш)',
    btn3dSat: '3D-Макет',
    btnSat2d: 'Спутник 2D',
    btn2dTopo: 'Топокарта (2D)',
    btnGps: 'Ближайший (GPS)',
    gpsLocating: 'Ищем...',
    gpsResultPrefix: 'Ближайший к вам:',
    gpsKm: 'км',
    gpsUnsupported: 'Браузер не поддерживает геолокацию — выберите город или рынок вручную.',
    gpsDenied: 'Нет доступа к геопозиции — разрешите геолокацию в браузере или выберите точку ниже.',
    filterAll: 'Все (15)',
    filterPazar: 'Рынки Пн–Вс',
    filterBazaar: 'Старые базары',
    filterCraft: 'Деревни ремёсел',
    filterAvm: 'ТЦ без торга',
    legendPazar: 'Еженедельный рынок (PZR)',
    legendBazaar: 'Старый базар (OLD)',
    legendCraft: 'Деревня ремёсел (ART)',
    legendAvm: 'Молл / ТЦ без торга (AVM)',
    kindLabels: {
      'weekly-pazar': 'Еженедельный фермерский/вещевой рынок',
      'old-bazaar': 'Исторический базар / торговая улочка',
      'craft-village': 'Ремесленная деревня / кооператив',
      'mall-avm': 'Современный ТЦ с фиксированными ценами',
    },
    scheduleLabel: 'Дни работы',
    coordsLabel: 'Координаты',
    openGmaps: 'Маршрут в Google Maps',
    controlsHint: 'Колёсико — масштаб · ЛКМ — сдвиг · ПКМ / Ctrl+ЛКМ — наклон 3D-макета · Клик по пинам',
    fallbackTitle: '3D-карта недоступна в текущем браузере (нет WebGL)',
    fallbackDesc: 'Используйте расписание рынков по дням недели и карточки геометок с прямыми ссылками Google Maps.',
  },
  en: {
    badge3d: '3D Map of 15 Markets, Old Bazaars & Craft Villages',
    btnAll: 'Full Coast (Datça — Kaş)',
    btn3dSat: '3D Model',
    btnSat2d: '2D Satellite',
    btn2dTopo: '2D Topo',
    btnGps: 'Nearest (GPS)',
    gpsLocating: 'Locating...',
    gpsResultPrefix: 'Nearest spot to you:',
    gpsKm: 'km',
    gpsUnsupported: 'Geolocation is unsupported in this browser—pick a zone or market pin below.',
    gpsDenied: 'Location permission denied—allow GPS in your browser or choose a pin below.',
    filterAll: 'All (15)',
    filterPazar: 'Weekly Pazars',
    filterBazaar: 'Old Bazaars',
    filterCraft: 'Craft Villages',
    filterAvm: 'Fixed-Price AVM',
    legendPazar: 'Weekly Pazar (PZR)',
    legendBazaar: 'Old Bazaar Lane (OLD)',
    legendCraft: 'Craft Village (ART)',
    legendAvm: 'Fixed-Price AVM Mall (AVM)',
    kindLabels: {
      'weekly-pazar': 'Weekly Open-Air Pazar',
      'old-bazaar': 'Historic Bazaar & Old Town',
      'craft-village': 'Mountain Craft & Honey Village',
      'mall-avm': 'Modern Fixed-Tag Mall (AVM)',
    },
    scheduleLabel: 'Schedule',
    coordsLabel: 'GPS',
    openGmaps: 'Directions in Google Maps',
    controlsHint: 'Scroll to zoom · Drag to pan · Right-click / Ctrl+Drag to tilt 3D · Tap pins',
    fallbackTitle: '3D WebGL view is unavailable in this browser',
    fallbackDesc: 'Use the market chips below and Mon–Sun schedule cards with direct Google Maps links.',
  },
  de: {
    badge3d: '3D-Karte der 15 Wochenmärkte, Basare & Handwerksdörfer',
    btnAll: 'Ganze Küste (Datça — Kaş)',
    btn3dSat: '3D-Modell',
    btnSat2d: '2D Satellit',
    btn2dTopo: '2D Topo',
    btnGps: 'Nächster (GPS)',
    gpsLocating: 'Suche...',
    gpsResultPrefix: 'Am nächsten gelegen:',
    gpsKm: 'km',
    gpsUnsupported: 'Geolokalisierung nicht unterstützt—wählen Sie unten einen Ort aus.',
    gpsDenied: 'Standortzugriff verweigert—bitte im Browser freigeben oder Pin unten antippen.',
    filterAll: 'Alle (15)',
    filterPazar: 'Wochenmärkte',
    filterBazaar: 'Altstadt-Basare',
    filterCraft: 'Handwerksdörfer',
    filterAvm: 'Festpreis-Malls',
    legendPazar: 'Wochenmarkt (PZR)',
    legendBazaar: 'Altstadt-Basar (OLD)',
    legendCraft: 'Handwerksdorf (ART)',
    legendAvm: 'Festpreis-Mall (AVM)',
    kindLabels: {
      'weekly-pazar': 'Wochenmarkt (Pazar)',
      'old-bazaar': 'Historisches Basarviertel',
      'craft-village': 'Berg- & Handwerksdorf',
      'mall-avm': 'Modernes Einkaufszentrum (AVM)',
    },
    scheduleLabel: 'Markttage',
    coordsLabel: 'Koordinaten',
    openGmaps: 'Route in Google Maps',
    controlsHint: 'Scrollen = Zoom · Ziehen = Bewegen · Rechtsklick / Strg+Ziehen = 3D kippen · Pins antippen',
    fallbackTitle: '3D-WebGL-Ansicht in diesem Browser nicht verfügbar',
    fallbackDesc: 'Nutzen Sie die Standort-Chips und Marktkarten unten mit Google-Maps-Links.',
  },
  tr: {
    badge3d: '15 Semt Pazarı, Tarihî Çarşı ve El Sanatı Köyü — 3D Harita',
    btnAll: 'Tüm Kıyı (Datça — Kaş)',
    btn3dSat: '3D Maket',
    btnSat2d: '2D Uydu',
    btn2dTopo: '2D Topo',
    btnGps: 'En Yakın (GPS)',
    gpsLocating: 'Aranıyor...',
    gpsResultPrefix: 'Size en yakın pazar:',
    gpsKm: 'km',
    gpsUnsupported: 'Tarayıcı konum servisini desteklemiyor—aşağıdan ilçe veya nokta seçin.',
    gpsDenied: 'Konum izni reddedildi—tarayıcıdan izin verin veya aşağıdaki pinlerden seçin.',
    filterAll: 'Tümü (15)',
    filterPazar: 'Semt Pazarları',
    filterBazaar: 'Tarihî Çarşılar',
    filterCraft: 'Zanaat Köyleri',
    filterAvm: 'Sabit Fiyat AVM',
    legendPazar: 'Semt Pazarı (PZR)',
    legendBazaar: 'Tarihî Çarşı (OLD)',
    legendCraft: 'El Sanatı Köyü (ART)',
    legendAvm: 'Sabit Fiyatlı AVM (AVM)',
    kindLabels: {
      'weekly-pazar': 'Haftalık Halk Pazarı',
      'old-bazaar': 'Tarihî Çarşı / Sanat Sokağı',
      'craft-village': 'Üretici ve Dokuma Köyü',
      'mall-avm': 'Sabit Fiyatlı Alışveriş Merkezi',
    },
    scheduleLabel: 'Günler',
    coordsLabel: 'Koordinat',
    openGmaps: 'Google Haritalar Yol Tarifi',
    controlsHint: 'Tekerlek = Yakınlaş · Sürükle = Gezin · Sağ tık / Ctrl+Sürükle = 3D eğ · Pinlere tıkla',
    fallbackTitle: 'Bu tarayıcıda 3D WebGL görünümü desteklenmiyor',
    fallbackDesc: 'Aşağıdaki pazar noktalarını ve Google Haritalar bağlantılarını kullanabilirsiniz.',
  },
};

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function isValidLngLatPair(coords: unknown): coords is [number, number] {
  return (
    Array.isArray(coords) &&
    coords.length === 2 &&
    typeof coords[0] === 'number' &&
    typeof coords[1] === 'number' &&
    Number.isFinite(coords[0]) &&
    Number.isFinite(coords[1]) &&
    coords[1] >= -85 &&
    coords[1] <= 85 &&
    coords[0] >= -180 &&
    coords[0] <= 180
  );
}

function isMapStateValid(map: any): boolean {
  try {
    const c = map.getCenter?.();
    const z = map.getZoom?.();
    return Boolean(c && Number.isFinite(c.lng) && Number.isFinite(c.lat) && Number.isFinite(z));
  } catch {
    return false;
  }
}

function safeFlyTo(
  map: any,
  opts: {
    center: [number, number];
    zoom: number;
    pitch?: number;
    bearing?: number;
    duration?: number;
  }
) {
  if (!map || !isValidLngLatPair(opts.center) || !Number.isFinite(opts.zoom)) return;
  const safeZoom = Math.min(17, Math.max(6, opts.zoom));
  const safePitch = Number.isFinite(opts.pitch) ? Math.min(60, Math.max(0, opts.pitch!)) : 0;
  const safeBearing = Number.isFinite(opts.bearing) ? opts.bearing! : 0;

  try {
    map.stop();
  } catch {
    // ignore stop errors
  }

  if (!isMapStateValid(map)) {
    try {
      map.jumpTo({
        center: opts.center,
        zoom: safeZoom,
        pitch: safePitch,
        bearing: safeBearing,
      });
    } catch {
      // ignore fallback errors
    }
    return;
  }

  try {
    map.easeTo({
      center: opts.center,
      zoom: safeZoom,
      pitch: safePitch,
      bearing: safeBearing,
      duration: opts.duration ?? 850,
      essential: true,
    });
  } catch {
    try {
      map.jumpTo({
        center: opts.center,
        zoom: safeZoom,
        pitch: safePitch,
        bearing: safeBearing,
      });
    } catch {
      // ignore fallback errors
    }
  }
}

function safeFitPoints(
  map: any,
  maplibregl: any,
  points: MarketMapPoint[],
  is3d: boolean
) {
  const validPts = points.filter((p) => isValidLngLatPair(p.coordinates));
  if (!map || !maplibregl || validPts.length === 0) return;

  if (validPts.length === 1) {
    safeFlyTo(map, {
      center: validPts[0].coordinates,
      zoom: 13.8,
      pitch: is3d ? 44 : 0,
      bearing: 0,
    });
    return;
  }

  let minLng = validPts[0].coordinates[0];
  let maxLng = minLng;
  let minLat = validPts[0].coordinates[1];
  let maxLat = minLat;
  for (let i = 1; i < validPts.length; i += 1) {
    const [lng, lat] = validPts[i].coordinates;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }

  if (Math.abs(maxLng - minLng) < 1e-5 && Math.abs(maxLat - minLat) < 1e-5) {
    safeFlyTo(map, {
      center: [minLng, minLat],
      zoom: 13.8,
      pitch: is3d ? 44 : 0,
      bearing: 0,
    });
    return;
  }

  if (!isMapStateValid(map)) {
    safeFlyTo(map, {
      center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2],
      zoom: 9.2,
      pitch: is3d ? 34 : 0,
      bearing: 0,
    });
    return;
  }

  try {
    map.stop();
    const bounds = new maplibregl.LngLatBounds([minLng, minLat], [maxLng, maxLat]);
    map.fitBounds(bounds, {
      padding: 64,
      maxZoom: 11.4,
      pitch: is3d ? 36 : 0,
      duration: 850,
      linear: true,
    });
  } catch {
    safeFlyTo(map, {
      center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2],
      zoom: 9.2,
      pitch: is3d ? 34 : 0,
      bearing: 0,
    });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatPopupText(str: string): string {
  return escapeHtml(str).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function buildPopupHtml(point: MarketMapPoint, locale: LocaleCode, ui: (typeof MAP_UI)['en']): string {
  const color = KIND_COLORS[point.kind];
  const title = point.title[locale] || point.title.en;
  const openDays = point.openDaysBadge[locale] || point.openDaysBadge.en;
  const subtitle = point.subtitle[locale] || point.subtitle.en;
  const note = point.note[locale] || point.note.en;
  const [lon, lat] = point.coordinates;

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:280px;padding:2px;">
      <div style="display:inline-block;padding:2px 8px;border-radius:9999px;background:${color};color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">
        ${escapeHtml(ui.kindLabels[point.kind])}
      </div>
      <div style="font-size:13px;font-weight:800;color:#0f172a;line-height:1.25;margin-bottom:4px;">
        ${formatPopupText(title)}
      </div>
      <div style="font-size:11px;font-weight:700;color:#b45309;margin-bottom:2px;">
        ${escapeHtml(ui.scheduleLabel)}: ${escapeHtml(openDays)}
      </div>
      <div style="font-size:10.5px;font-weight:600;color:#475569;margin-bottom:4px;">
        📍 ${escapeHtml(ui.coordsLabel)}: ${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E
      </div>
      <div style="font-size:10.5px;font-weight:700;color:#047857;margin-bottom:5px;">
        ${formatPopupText(subtitle)}
      </div>
      <div style="font-size:11px;color:#475569;line-height:1.35;margin-bottom:8px;">
        ${formatPopupText(note)}
      </div>
      <a href="${escapeHtml(point.mapsUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:5px 10px;border-radius:8px;background:#0284c7;color:#ffffff;font-size:11px;font-weight:800;text-decoration:none;">
        ${escapeHtml(ui.openGmaps)} ↗
      </a>
    </div>
  `;
}

export default function MarketsCrafts3DMap({
  locale,
  activeZoneId,
  activeKindFilter,
  focusedPointId,
  onSelectPoint,
  onSelectZone,
  onSelectKindFilter,
}: MarketsCrafts3DMapProps) {
  const ui = MAP_UI[locale] || MAP_UI.en;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const maplibreRef = useRef<any>(null);
  const markersRef = useRef<{ id: string; marker: any; btn: HTMLButtonElement; kind: MarketMapPointKind }[]>([]);
  const popupRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);

  const onSelectPointRef = useRef(onSelectPoint);
  onSelectPointRef.current = onSelectPoint;

  const prevCameraKeyRef = useRef<string>(`${activeZoneId}|${activeKindFilter}|${focusedPointId ?? ''}`);

  const [viewMode, setViewMode] = useState<MapViewMode>('3d');
  const viewModeRef = useRef<MapViewMode>(viewMode);
  viewModeRef.current = viewMode;

  const [webglError, setWebglError] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'locating' | 'found' | 'error'>('idle');
  const [gpsNotice, setGpsNotice] = useState<{ title?: string; distanceKm?: number; errorText?: string } | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let mapInstance: any = null;

    async function initMap() {
      if (!containerRef.current) return;
      try {
        const canvas = document.createElement('canvas');
        const hasGl = Boolean(
          canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        );
        if (!hasGl) {
          setWebglError(true);
          return;
        }

        const mod = await import('maplibre-gl');
        const maplibregl = mod.default || mod;
        if (isCancelled || !containerRef.current) return;
        maplibreRef.current = maplibregl;

        mapInstance = new maplibregl.Map({
          container: containerRef.current,
          style: {
            version: 8,
            sources: {
              esri: {
                type: 'raster',
                tiles: [
                  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                ],
                tileSize: 256,
                maxzoom: 17,
              },
              opentopo: {
                type: 'raster',
                tiles: ['https://a.tile.opentopomap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                maxzoom: 17,
              },
            },
            layers: [
              { id: 'bg', type: 'background', paint: { 'background-color': '#0f172a' } },
              {
                id: 'esri-satellite',
                type: 'raster',
                source: 'esri',
                layout: { visibility: 'visible' },
              },
              {
                id: 'opentopo-layer',
                type: 'raster',
                source: 'opentopo',
                layout: { visibility: 'none' },
              },
            ],
          },
          center: REGION_OVERVIEW.center,
          zoom: REGION_OVERVIEW.zoom,
          pitch: REGION_OVERVIEW.pitch,
          bearing: REGION_OVERVIEW.bearing,
          minZoom: 6,
          maxZoom: 17,
          maxPitch: 60,
          attributionControl: false,
        });

        mapInstance.addControl(
          new maplibregl.NavigationControl({ visualizePitch: true }),
          'top-right'
        );
        mapRef.current = mapInstance;

        markersRef.current = MARKET_MAP_POINTS.map((pt) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.title = pt.title[locale] || pt.title.en;
          btn.textContent =
            pt.kind === 'weekly-pazar'
              ? 'PZR'
              : pt.kind === 'old-bazaar'
              ? 'OLD'
              : pt.kind === 'craft-village'
              ? 'ART'
              : 'AVM';

          btn.style.cssText = [
            'min-width:34px',
            'height:28px',
            'padding:0 7px',
            'border-radius:9999px',
            `background:${KIND_COLORS[pt.kind]}`,
            'color:#ffffff',
            'border:2.5px solid #ffffff',
            'font-size:10px',
            'font-weight:800',
            'cursor:pointer',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'box-shadow:0 0 0 3px rgba(255,255,255,0.22), 0 4px 12px rgba(0,0,0,0.45)',
            'transition:transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease',
          ].join(';');

          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            onSelectPointRef.current(pt.id);
            if (popupRef.current) popupRef.current.remove();
            popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
              .setLngLat(pt.coordinates)
              .setHTML(buildPopupHtml(pt, locale, MAP_UI[locale] || MAP_UI.en))
              .addTo(mapInstance);
          });

          const marker = new maplibregl.Marker({ element: btn, anchor: 'center' })
            .setLngLat(pt.coordinates)
            .addTo(mapInstance);

          return { id: pt.id, marker, btn, kind: pt.kind };
        });

        mapInstance.on('error', (ev: any) => {
          if (ev?.error?.message && /webgl/i.test(ev.error.message)) {
            setWebglError(true);
          }
        });
      } catch {
        setWebglError(true);
      }
    }

    initMap();

    return () => {
      isCancelled = true;
      popupRef.current = null;
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      markersRef.current.forEach((m) => m.marker.remove());
      markersRef.current = [];
      if (mapInstance) mapInstance.remove();
      mapRef.current = null;
      maplibreRef.current = null;
    };
  }, [locale]);

  // Update pin styles when filter or focused pin changes
  useEffect(() => {
    markersRef.current.forEach(({ id, btn, kind }) => {
      const matchesFilter = activeKindFilter === 'all' || kind === activeKindFilter;
      const active = id === focusedPointId;
      btn.style.opacity = matchesFilter ? '1' : '0.18';
      btn.style.pointerEvents = matchesFilter ? 'auto' : 'none';
      btn.style.transform = !matchesFilter
        ? 'scale(0.82)'
        : active
        ? 'scale(1.28)'
        : 'scale(1)';
      btn.style.boxShadow = active
        ? '0 0 0 5px rgba(245,158,11,0.92), 0 8px 20px rgba(0,0,0,0.55)'
        : matchesFilter
        ? '0 0 0 3px rgba(255,255,255,0.22), 0 4px 12px rgba(0,0,0,0.45)'
        : 'none';
      btn.style.zIndex = active ? '10' : matchesFilter ? '2' : '0';
    });
  }, [activeKindFilter, focusedPointId]);

  // Single coordinated camera & popup effect to prevent racing flyTo transitions
  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = maplibreRef.current;
    if (!map || !maplibregl) return;

    const cameraKey = `${activeZoneId}|${activeKindFilter}|${focusedPointId ?? ''}`;
    if (prevCameraKeyRef.current === cameraKey) return;
    prevCameraKeyRef.current = cameraKey;

    const is3d = viewModeRef.current === '3d';

    if (focusedPointId) {
      const pt = MARKET_MAP_POINTS.find((p) => p.id === focusedPointId);
      if (!pt || !isValidLngLatPair(pt.coordinates)) return;

      if (popupRef.current) popupRef.current.remove();
      popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
        .setLngLat(pt.coordinates)
        .setHTML(buildPopupHtml(pt, locale, ui))
        .addTo(map);

      safeFlyTo(map, {
        center: pt.coordinates,
        zoom: 14.5,
        pitch: is3d ? 46 : 0,
        bearing: is3d ? 12 : 0,
      });
      return;
    }

    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }

    if (activeZoneId !== 'all') {
      const preset = MARKET_ZONE_PRESETS.find((z) => z.id === activeZoneId);
      if (preset) {
        safeFlyTo(map, {
          center: preset.coordinates,
          zoom: preset.zoom,
          pitch: is3d ? preset.pitch : 0,
          bearing: is3d ? preset.bearing : 0,
        });
      }
      return;
    }

    if (activeKindFilter !== 'all') {
      const matching = MARKET_MAP_POINTS.filter((p) => p.kind === activeKindFilter);
      if (matching.length > 0) {
        safeFitPoints(map, maplibregl, matching, is3d);
        return;
      }
    }

    safeFlyTo(map, {
      center: REGION_OVERVIEW.center,
      zoom: REGION_OVERVIEW.zoom,
      pitch: is3d ? REGION_OVERVIEW.pitch : 0,
      bearing: 0,
    });
  }, [activeZoneId, activeKindFilter, focusedPointId, locale, ui]);

  const handleToggleView = (next: MapViewMode) => {
    setViewMode(next);
    const map = mapRef.current;
    if (!map) return;

    const showTopo = next === 'topo';
    const is3d = next === '3d';

    if (map.getLayer('esri-satellite') && map.getLayer('opentopo-layer')) {
      map.setLayoutProperty('esri-satellite', 'visibility', showTopo ? 'none' : 'visible');
      map.setLayoutProperty('opentopo-layer', 'visibility', showTopo ? 'visible' : 'none');
    }

    const focusedPt = focusedPointId ? MARKET_MAP_POINTS.find((p) => p.id === focusedPointId) : null;
    const preset = MARKET_ZONE_PRESETS.find((z) => z.id === activeZoneId);

    let targetCenter = REGION_OVERVIEW.center;
    let targetZoom = REGION_OVERVIEW.zoom;
    if (focusedPt && isValidLngLatPair(focusedPt.coordinates)) {
      targetCenter = focusedPt.coordinates;
      targetZoom = 14.5;
    } else if (preset && isValidLngLatPair(preset.coordinates)) {
      targetCenter = preset.coordinates;
      targetZoom = preset.zoom;
    } else if (isMapStateValid(map)) {
      const cur = map.getCenter();
      targetCenter = [cur.lng, cur.lat];
      targetZoom = map.getZoom();
    }

    safeFlyTo(map, {
      center: targetCenter,
      zoom: targetZoom,
      pitch: is3d ? (focusedPt ? 46 : preset?.pitch ?? REGION_OVERVIEW.pitch) : 0,
      bearing: is3d ? (focusedPt ? 12 : preset?.bearing ?? 0) : 0,
      duration: 650,
    });
  };

  const handleLocateNearest = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGpsStatus('error');
      setGpsNotice({ errorText: ui.gpsUnsupported });
      return;
    }

    setGpsStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;
        const pool =
          activeKindFilter === 'all'
            ? MARKET_MAP_POINTS
            : MARKET_MAP_POINTS.filter((p) => p.kind === activeKindFilter);
        const candidates = pool.length > 0 ? pool : MARKET_MAP_POINTS;

        let nearest = candidates[0];
        let minKm = haversineKm(userLat, userLon, nearest.coordinates[1], nearest.coordinates[0]);
        for (let i = 1; i < candidates.length; i += 1) {
          const cand = candidates[i];
          const d = haversineKm(userLat, userLon, cand.coordinates[1], cand.coordinates[0]);
          if (d < minKm) {
            minKm = d;
            nearest = cand;
          }
        }

        const map = mapRef.current;
        const maplibregl = maplibreRef.current;
        if (map && maplibregl) {
          if (userMarkerRef.current) userMarkerRef.current.remove();
          const el = document.createElement('div');
          el.textContent = 'YOU';
          el.style.cssText = [
            'padding:4px 8px',
            'border-radius:9999px',
            'background:#2563eb',
            'color:#ffffff',
            'border:2.5px solid #ffffff',
            'font-size:10px',
            'font-weight:900',
            'box-shadow:0 0 0 5px rgba(37,99,235,0.35), 0 4px 12px rgba(0,0,0,0.45)',
          ].join(';');
          userMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'center' })
            .setLngLat([userLon, userLat])
            .addTo(map);
        }

        setGpsStatus('found');
        setGpsNotice({
          title: nearest.title[locale] || nearest.title.en,
          distanceKm: minKm < 10 ? Number(minKm.toFixed(1)) : Math.round(minKm),
        });
        onSelectZone(nearest.zoneId);
        onSelectPoint(nearest.id);
      },
      () => {
        setGpsStatus('error');
        setGpsNotice({ errorText: ui.gpsDenied });
      },
      { enableHighAccuracy: false, timeout: 7000 }
    );
  };

  const kindFilters: { id: MarketMapPointKind | 'all'; label: string; dotClass?: string }[] = [
    { id: 'all', label: ui.filterAll },
    { id: 'weekly-pazar', label: ui.filterPazar, dotClass: 'bg-emerald-500' },
    { id: 'old-bazaar', label: ui.filterBazaar, dotClass: 'bg-amber-500' },
    { id: 'craft-village', label: ui.filterCraft, dotClass: 'bg-violet-500' },
    { id: 'mall-avm', label: ui.filterAvm, dotClass: 'bg-sky-500' },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300">
          <FaCube /> {ui.badge3d}
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleToggleView('3d')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              viewMode === '3d'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FaLayerGroup size={10} /> {ui.btn3dSat}
          </button>
          <button
            type="button"
            onClick={() => handleToggleView('sat2d')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              viewMode === 'sat2d'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FaGlobeEurope size={10} /> {ui.btnSat2d}
          </button>
          <button
            type="button"
            onClick={() => handleToggleView('topo')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              viewMode === 'topo'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FaMapMarkedAlt size={10} /> {ui.btn2dTopo}
          </button>
          <button
            type="button"
            onClick={handleLocateNearest}
            disabled={gpsStatus === 'locating'}
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60 text-white transition-colors"
          >
            <FaCrosshairs size={10} />
            <span>{gpsStatus === 'locating' ? ui.gpsLocating : ui.btnGps}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (popupRef.current) {
                popupRef.current.remove();
                popupRef.current = null;
              }
              if (
                activeZoneId === 'all' &&
                !focusedPointId &&
                activeKindFilter === 'all' &&
                mapRef.current
              ) {
                safeFlyTo(mapRef.current, {
                  center: REGION_OVERVIEW.center,
                  zoom: REGION_OVERVIEW.zoom,
                  pitch: viewModeRef.current === '3d' ? REGION_OVERVIEW.pitch : 0,
                  bearing: 0,
                });
                return;
              }
              onSelectZone('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
              activeZoneId === 'all' && !focusedPointId
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {ui.btnAll}
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center gap-1.5">
        {kindFilters.map((kf) => {
          const active = activeKindFilter === kf.id;
          return (
            <button
              key={kf.id}
              type="button"
              onClick={() => onSelectKindFilter(kf.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
                active
                  ? 'bg-white text-slate-950'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {kf.dotClass && <span className={`w-2 h-2 rounded-full ${kf.dotClass}`} />}
              <span>{kf.label}</span>
            </button>
          );
        })}
      </div>

      {/* Optional GPS Notice */}
      {gpsNotice && (
        <div
          className={`px-4 py-2 border-b text-xs font-semibold flex flex-wrap items-center justify-between gap-2 ${
            gpsStatus === 'error'
              ? 'bg-amber-950/90 border-amber-800 text-amber-200'
              : 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
          }`}
        >
          <div className="inline-flex items-center gap-2">
            <FaMapMarkerAlt className="flex-shrink-0" />
            {gpsNotice.errorText ? (
              <span>{gpsNotice.errorText}</span>
            ) : (
              <span>
                {ui.gpsResultPrefix}{' '}
                <strong className="text-white">{gpsNotice.title}</strong> ({gpsNotice.distanceKm}{' '}
                {ui.gpsKm})
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setGpsNotice(null)}
            className="text-[11px] underline opacity-80 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      {/* Canvas */}
      {webglError ? (
        <div className="h-[420px] sm:h-[470px] flex flex-col items-center justify-center p-6 text-center bg-slate-900/95 space-y-3">
          <FaMapMarkedAlt className="text-4xl text-amber-400" />
          <p className="font-bold text-sm text-white">{ui.fallbackTitle}</p>
          <p className="text-xs text-slate-400 max-w-md">{ui.fallbackDesc}</p>
          <a
            href="https://maps.google.com/?q=36.6221,29.1153"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white"
          >
            <FaExternalLinkAlt size={10} /> {ui.openGmaps}
          </a>
        </div>
      ) : (
        <div ref={containerRef} className="w-full h-[420px] sm:h-[470px] bg-slate-950" />
      )}

      {/* Legend */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-1 ring-white/50" />
            {ui.legendPazar}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-1 ring-white/50" />
            {ui.legendBazaar}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-600 ring-1 ring-white/50" />
            {ui.legendCraft}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 ring-1 ring-white/50" />
            {ui.legendAvm}
          </span>
        </div>
        <span className="text-slate-400 font-medium">{ui.controlsHint}</span>
      </div>
    </div>
  );
}
