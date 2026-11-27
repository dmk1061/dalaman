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
  ANCIENT_MAP_POINTS,
  ANCIENT_ZONE_PRESETS,
  type AncientMapPoint,
  type AncientPointKind,
  type AncientZoneId,
  type LocaleCode,
} from '@/lib/ancient-cities';

export type MapViewMode = '3d' | 'sat2d' | 'topo';

interface AncientCities3DMapProps {
  locale: LocaleCode;
  activeZoneId: AncientZoneId | 'all';
  activeKindFilter: AncientPointKind | 'all';
  focusedPointId: string | null;
  onSelectPoint: (pointId: string) => void;
  onSelectZone: (zoneId: AncientZoneId | 'all') => void;
  onSelectKindFilter: (kind: AncientPointKind | 'all') => void;
}

const REGION_OVERVIEW = {
  center: [28.68, 36.50] as [number, number],
  zoom: 7.6,
  pitch: 30,
  bearing: 0,
};

const KIND_COLORS: Record<AncientPointKind, string> = {
  'unesco-flagship': '#d97706', // amber-600
  'caria-harbor': '#0284c7',    // sky-600
  'free-mountain': '#059669',   // emerald-600
  'coastal-ruins': '#e11d48',   // rose-600
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
    filterUnesco: string;
    filterCaria: string;
    filterFree: string;
    filterCoast: string;
    legendUnesco: string;
    legendCaria: string;
    legendFree: string;
    legendCoast: string;
    kindLabels: Record<AncientPointKind, string>;
    ticketLabel: string;
    coordsLabel: string;
    openGmaps: string;
    controlsHint: string;
    fallbackTitle: string;
    fallbackDesc: string;
  }
> = {
  ru: {
    badge3d: '3D-карта 15 античных городов Ликии и Карии (Книдос — Мира)',
    btnAll: 'Весь регион (Книдос — Мира)',
    btn3dSat: '3D-Макет',
    btnSat2d: 'Спутник 2D',
    btn2dTopo: 'Топокарта (2D)',
    btnGps: 'Ближайший (GPS)',
    gpsLocating: 'Ищем...',
    gpsResultPrefix: 'Ближайшие руины к вам:',
    gpsKm: 'км',
    gpsUnsupported: 'Браузер не поддерживает геолокацию — выберите зону или точку ниже.',
    gpsDenied: 'Нет доступа к геопозиции — разрешите доступ или выберите руины ниже.',
    filterAll: 'Все (15)',
    filterUnesco: 'ЮНЕСКО и Топ Ликии (TOP)',
    filterCaria: 'Порты Карии (CARIA)',
    filterFree: 'Бесплатные руины (FREE)',
    filterCoast: 'Крепости и гробницы (SITE)',
    legendUnesco: 'Топ Ликии и ЮНЕСКО (TOP)',
    legendCaria: 'Кария (CARIA)',
    legendFree: 'Вход 0 € (FREE)',
    legendCoast: 'Гробницы и крепости (SITE)',
    kindLabels: {
      'unesco-flagship': 'Флагман Ликии / ЮНЕСКО',
      'caria-harbor': 'Античный порт Карии',
      'free-mountain': 'Бесплатный открытый полис (0 €)',
      'coastal-ruins': 'Скальные гробницы / крепость',
    },
    ticketLabel: 'Билет и пасс',
    coordsLabel: 'Координаты',
    openGmaps: 'Маршрут в Google Maps',
    controlsHint: 'Колёсико — масштаб · ЛКМ — сдвиг · ПКМ / Ctrl+ЛКМ — наклон 3D · Клик по пинам',
    fallbackTitle: '3D-карта недоступна в текущем браузере (нет WebGL)',
    fallbackDesc: 'Используйте чипы геометок ниже и карточки городов со ссылками Google Maps.',
  },
  en: {
    badge3d: '3D Map of 15 Ancient Cities of Lycia & Caria (Knidos — Myra)',
    btnAll: 'Full Span (Knidos — Myra)',
    btn3dSat: '3D Model',
    btnSat2d: '2D Satellite',
    btn2dTopo: '2D Topo',
    btnGps: 'Nearest (GPS)',
    gpsLocating: 'Locating...',
    gpsResultPrefix: 'Nearest ancient site:',
    gpsKm: 'km',
    gpsUnsupported: 'Geolocation unsupported here—pick any ancient zone or pin below.',
    gpsDenied: 'GPS permission denied—allow access or click any ruin chip below.',
    filterAll: 'All (15)',
    filterUnesco: 'UNESCO & Lycia Top (TOP)',
    filterCaria: 'Carian Ports (CARIA)',
    filterFree: 'Free Entry €0 (FREE)',
    filterCoast: 'Tombs & Forts (SITE)',
    legendUnesco: 'Lycia Top / UNESCO (TOP)',
    legendCaria: 'Carian Ports (CARIA)',
    legendFree: 'Free Open Sites (FREE)',
    legendCoast: 'Tombs & Castles (SITE)',
    kindLabels: {
      'unesco-flagship': 'Lycia Flagship / UNESCO',
      'caria-harbor': 'Ancient Carian Harbor',
      'free-mountain': 'Free Open City (€0)',
      'coastal-ruins': 'Rock Tombs / Fort',
    },
    ticketLabel: 'Ticket & Pass',
    coordsLabel: 'GPS',
    openGmaps: 'Directions in Google Maps',
    controlsHint: 'Scroll to zoom · Drag to pan · Right-click / Ctrl+Drag to tilt 3D · Tap pins',
    fallbackTitle: '3D WebGL view is unavailable in this browser',
    fallbackDesc: 'Use the quick-jump site chips below with direct Google Maps links.',
  },
  de: {
    badge3d: '3D-Karte: 15 Antike Städte in Lykien & Karien (Knidos — Myra)',
    btnAll: 'Gesamtküste (Knidos — Myra)',
    btn3dSat: '3D-Modell',
    btnSat2d: '2D Satellit',
    btn2dTopo: '2D Topo',
    btnGps: 'Nächste (GPS)',
    gpsLocating: 'Suche...',
    gpsResultPrefix: 'Nächstgelegene Ruinen:',
    gpsKm: 'km',
    gpsUnsupported: 'Standortbestimmung nicht unterstützt—wählen Sie unten eine Stätte.',
    gpsDenied: 'GPS abgelehnt—Standort freigeben oder Chip unten wählen.',
    filterAll: 'Alle (15)',
    filterUnesco: 'UNESCO & Top-Lykien (TOP)',
    filterCaria: 'Karische Häfen (CARIA)',
    filterFree: 'Kostenlos 0 € (FREE)',
    filterCoast: 'Gräber & Burgen (SITE)',
    legendUnesco: 'Lykien Top / UNESCO (TOP)',
    legendCaria: 'Karien (CARIA)',
    legendFree: 'Eintritt 0 € (FREE)',
    legendCoast: 'Gräber & Burgen (SITE)',
    kindLabels: {
      'unesco-flagship': 'Lykien-Flaggschiff / UNESCO',
      'caria-harbor': 'Antiker karischer Hafen',
      'free-mountain': 'Kostenlose Ruinenstadt (0 €)',
      'coastal-ruins': 'Felsengräber / Festung',
    },
    ticketLabel: 'Eintritt & Pass',
    coordsLabel: 'Koordinaten',
    openGmaps: 'Route in Google Maps',
    controlsHint: 'Scrollen = Zoom · Ziehen = Bewegen · Rechtsklick / Strg+Ziehen = 3D kippen · Pins antippen',
    fallbackTitle: '3D-WebGL-Ansicht in diesem Browser nicht verfügbar',
    fallbackDesc: 'Nutzen Sie die Schnell-Chips und Google-Maps-Links unten.',
  },
  tr: {
    badge3d: '15 Likya ve Karya Antik Kenti 3D Haritası (Knidos — Myra)',
    btnAll: 'Tüm Kıyı (Knidos — Myra)',
    btn3dSat: '3D Maket',
    btnSat2d: '2D Uydu',
    btn2dTopo: '2D Topo',
    btnGps: 'En Yakın (GPS)',
    gpsLocating: 'Aranıyor...',
    gpsResultPrefix: 'Size en yakın antik kent:',
    gpsKm: 'km',
    gpsUnsupported: 'Konum servisi desteklenmiyor—aşağıdan antik kent seçin.',
    gpsDenied: 'Konum izni reddedildi—izin verin veya aşağıdaki pinlerden seçin.',
    filterAll: 'Tümü (15)',
    filterUnesco: 'UNESCO & Zirve Likya (TOP)',
    filterCaria: 'Karya Limanları (CARIA)',
    filterFree: 'Ücretsiz Giriş 0 € (FREE)',
    filterCoast: 'Mezar & Kaleler (SITE)',
    legendUnesco: 'Likya / UNESCO (TOP)',
    legendCaria: 'Karya (CARIA)',
    legendFree: 'Ücretsiz 0 € (FREE)',
    legendCoast: 'Kaya Mezarı / Kale (SITE)',
    kindLabels: {
      'unesco-flagship': 'Likya Zirvesi / UNESCO',
      'caria-harbor': 'Antik Karya Limanı',
      'free-mountain': 'Ücretsiz Açık Kent (0 €)',
      'coastal-ruins': 'Kaya Mezarı / Kale',
    },
    ticketLabel: 'Bilet & Pass',
    coordsLabel: 'Koordinat',
    openGmaps: 'Google Haritalar Yol Tarifi',
    controlsHint: 'Tekerlek = Yakınlaş · Sürükle = Gezin · Sağ tık / Ctrl+Sürükle = 3D eğ · Pinlere tıkla',
    fallbackTitle: 'Bu tarayıcıda 3D WebGL görünümü desteklenmiyor',
    fallbackDesc: 'Aşağıdaki hızlı mekan etiketlerini ve Google Haritalar linklerini kullanabilirsiniz.',
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

function safeEaseTo(
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
  points: AncientMapPoint[],
  is3d: boolean
) {
  const validPts = points.filter((p) => isValidLngLatPair(p.coordinates));
  if (!map || !maplibregl || validPts.length === 0) return;

  if (validPts.length === 1) {
    safeEaseTo(map, {
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
    safeEaseTo(map, {
      center: [minLng, minLat],
      zoom: 13.8,
      pitch: is3d ? 44 : 0,
      bearing: 0,
    });
    return;
  }

  if (!isMapStateValid(map)) {
    safeEaseTo(map, {
      center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2],
      zoom: 9.0,
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
    safeEaseTo(map, {
      center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2],
      zoom: 9.0,
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
  return escapeHtml(str)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function buildPopupHtml(point: AncientMapPoint, locale: LocaleCode, ui: (typeof MAP_UI)['en']): string {
  const color = KIND_COLORS[point.kind];
  const title = point.title[locale] || point.title.en;
  const ticket = point.ticketBadge[locale] || point.ticketBadge.en;
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
        ${escapeHtml(ui.ticketLabel)}: ${escapeHtml(ticket)}
      </div>
      <div style="font-size:10.5px;font-weight:600;color:#475569;margin-bottom:4px;">
        📍 ${escapeHtml(ui.coordsLabel)}: ${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E
      </div>
      <div style="font-size:10.5px;font-weight:700;color:#0369a1;margin-bottom:5px;">
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

export default function AncientCities3DMap({
  locale,
  activeZoneId,
  activeKindFilter,
  focusedPointId,
  onSelectPoint,
  onSelectZone,
  onSelectKindFilter,
}: AncientCities3DMapProps) {
  const ui = MAP_UI[locale] || MAP_UI.en;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const maplibreRef = useRef<any>(null);
  const markersRef = useRef<{ id: string; marker: any; btn: HTMLButtonElement; kind: AncientPointKind }[]>([]);
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

        markersRef.current = ANCIENT_MAP_POINTS.map((pt) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.title = pt.title[locale] || pt.title.en;
          btn.textContent =
            pt.kind === 'unesco-flagship'
              ? 'TOP'
              : pt.kind === 'caria-harbor'
              ? 'CARIA'
              : pt.kind === 'free-mountain'
              ? 'FREE'
              : 'SITE';

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
        ? '0 0 0 5px rgba(245,158,11,0.9), 0 8px 20px rgba(0,0,0,0.55)'
        : matchesFilter
        ? '0 0 0 3px rgba(255,255,255,0.22), 0 4px 12px rgba(0,0,0,0.45)'
        : 'none';
      btn.style.zIndex = active ? '10' : matchesFilter ? '2' : '0';
    });
  }, [activeKindFilter, focusedPointId]);

  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = maplibreRef.current;
    if (!map || !maplibregl) return;

    const cameraKey = `${activeZoneId}|${activeKindFilter}|${focusedPointId ?? ''}`;
    if (prevCameraKeyRef.current === cameraKey) return;
    prevCameraKeyRef.current = cameraKey;

    const is3d = viewModeRef.current === '3d';

    if (focusedPointId) {
      const pt = ANCIENT_MAP_POINTS.find((p) => p.id === focusedPointId);
      if (!pt || !isValidLngLatPair(pt.coordinates)) return;

      if (popupRef.current) popupRef.current.remove();
      popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
        .setLngLat(pt.coordinates)
        .setHTML(buildPopupHtml(pt, locale, ui))
        .addTo(map);

      safeEaseTo(map, {
        center: pt.coordinates,
        zoom: 14.3,
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
      const preset = ANCIENT_ZONE_PRESETS.find((z) => z.id === activeZoneId);
      if (preset) {
        safeEaseTo(map, {
          center: preset.coordinates,
          zoom: preset.zoom,
          pitch: is3d ? preset.pitch : 0,
          bearing: is3d ? preset.bearing : 0,
        });
      }
      return;
    }

    if (activeKindFilter !== 'all') {
      const matching = ANCIENT_MAP_POINTS.filter((p) => p.kind === activeKindFilter);
      if (matching.length > 0) {
        safeFitPoints(map, maplibregl, matching, is3d);
        return;
      }
    }

    safeEaseTo(map, {
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

    const focusedPt = focusedPointId
      ? ANCIENT_MAP_POINTS.find((p) => p.id === focusedPointId)
      : null;
    const preset = ANCIENT_ZONE_PRESETS.find((z) => z.id === activeZoneId);

    let targetCenter = REGION_OVERVIEW.center;
    let targetZoom = REGION_OVERVIEW.zoom;
    if (focusedPt && isValidLngLatPair(focusedPt.coordinates)) {
      targetCenter = focusedPt.coordinates;
      targetZoom = 14.3;
    } else if (preset && isValidLngLatPair(preset.coordinates)) {
      targetCenter = preset.coordinates;
      targetZoom = preset.zoom;
    } else if (isMapStateValid(map)) {
      const cur = map.getCenter();
      targetCenter = [cur.lng, cur.lat];
      targetZoom = map.getZoom();
    }

    safeEaseTo(map, {
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
            ? ANCIENT_MAP_POINTS
            : ANCIENT_MAP_POINTS.filter((p) => p.kind === activeKindFilter);
        const candidates = pool.length > 0 ? pool : ANCIENT_MAP_POINTS;

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

  const kindFilters: { id: AncientPointKind | 'all'; label: string; dotClass?: string }[] = [
    { id: 'all', label: ui.filterAll },
    { id: 'unesco-flagship', label: ui.filterUnesco, dotClass: 'bg-amber-500' },
    { id: 'caria-harbor', label: ui.filterCaria, dotClass: 'bg-sky-500' },
    { id: 'free-mountain', label: ui.filterFree, dotClass: 'bg-emerald-500' },
    { id: 'coastal-ruins', label: ui.filterCoast, dotClass: 'bg-rose-500' },
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
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 bg-sky-700 hover:bg-sky-600 disabled:opacity-60 text-white transition-colors"
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
                safeEaseTo(mapRef.current, {
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
              : 'bg-sky-950/90 border-sky-800 text-sky-100'
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
            href="https://maps.google.com/?q=36.2612,29.3180"
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
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-1 ring-white/50" />
            {ui.legendUnesco}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 ring-1 ring-white/50" />
            {ui.legendCaria}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-1 ring-white/50" />
            {ui.legendFree}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 ring-1 ring-white/50" />
            {ui.legendCoast}
          </span>
        </div>
        <span className="text-slate-400 font-medium">{ui.controlsHint}</span>
      </div>
    </div>
  );
}
