"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FaCube, FaDownload, FaExternalLinkAlt, FaLayerGroup, FaMapMarkedAlt } from 'react-icons/fa';
import type { LocaleCode } from '@/lib/trekking-data';
import type { ProfileWaypointItem } from './TrailElevationProfile';
import LeafletFallbackMap, {
  type LeafletCameraTarget,
  type LeafletMarkerItem,
  type LeafletPolylineItem,
} from './LeafletFallbackMap';
import {
  attachWebGLLossHandler,
  detectWebGLSupport,
  FALLBACK_2D_LABELS,
} from '@/lib/map-webgl';

export interface TrailSideBranchProp {
  label: string;
  distanceKm: number;
  points: [number, number, number][];
}

interface Trail3DViewerProps {
  trailId: string;
  trailName: string;
  totalKm: number;
  points: [number, number, number, number][];
  sideBranch?: TrailSideBranchProp;
  waypoints: ProfileWaypointItem[];
  activeWaypointIdx: number | null;
  onSelectWaypoint: (idx: number) => void;
  mapsUrl: string;
  attribution: string;
  locale: LocaleCode;
}

type ViewPreset = 'overview' | 'start' | 'finish' | 'topo';

interface CameraPreset {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
}

const KAYAKOY_PRESET_VIEWS: Record<ViewPreset, CameraPreset> = {
  overview: { center: [29.1035, 36.562], zoom: 13.7, pitch: 62, bearing: 40 },
  start: { center: [29.0926, 36.5715], zoom: 15.1, pitch: 65, bearing: 120 },
  finish: { center: [29.1115, 36.5535], zoom: 14.8, pitch: 64, bearing: 115 },
  topo: { center: [29.1035, 36.562], zoom: 13.8, pitch: 0, bearing: 0 },
};

function computeCameraPresets(
  trailId: string,
  points: [number, number, number, number][]
): Record<ViewPreset, CameraPreset> {
  if (trailId === 'kayakoy-oludeniz' || points.length < 2) {
    return KAYAKOY_PRESET_VIEWS;
  }

  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  for (const [lon, lat] of points) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }

  const centerLon = (minLon + maxLon) / 2;
  const centerLat = (minLat + maxLat) / 2;
  const cosLat = Math.cos((centerLat * Math.PI) / 180);

  const start = points[0];
  const end = points[points.length - 1];
  const dLon = (end[0] - start[0]) * cosLat;
  const dLat = end[1] - start[1];
  const az = ((Math.atan2(dLon, dLat) * 180) / Math.PI + 360) % 360;

  // Choose perpendicular bearing (az - 90) so Start stays on the left & Finish on the right, matching the elevation profile
  const overviewBearing = (az - 90 + 360) % 360;
  const spanDeg = Math.hypot((maxLon - minLon) * cosLat, maxLat - minLat);
  const rawZoom = 11.3 - Math.log2(Math.max(spanDeg, 0.015) / 0.12);
  const overviewZoom = Math.min(14.4, Math.max(11.4, rawZoom));
  const detailZoom = Math.min(15.2, overviewZoom + 1.3);

  return {
    overview: { center: [centerLon, centerLat], zoom: overviewZoom, pitch: 60, bearing: overviewBearing },
    start: { center: [start[0], start[1]], zoom: detailZoom, pitch: 64, bearing: az },
    finish: { center: [end[0], end[1]], zoom: detailZoom, pitch: 64, bearing: (az + 180) % 360 },
    topo: { center: [centerLon, centerLat], zoom: overviewZoom + 0.1, pitch: 0, bearing: 0 },
  };
}

const UI_COPY: Record<
  LocaleCode,
  {
    badge3d: string;
    presetOverview: string;
    startPrefix: string;
    finishPrefix: string;
    presetTopo: string;
    downloadGpx: string;
    openGoogleMaps: string;
    legendMain: string;
    controlsHint: (count: number) => string;
    fallbackTitle: string;
    fallbackDesc: string;
    mUnit: string;
    kmUnit: string;
  }
> = {
  ru: {
    badge3d: 'Интерактивная 3D-карта полёта птицы',
    presetOverview: 'Весь трек (3D)',
    startPrefix: 'Старт',
    finishPrefix: 'Финиш',
    presetTopo: 'Топокарта (2D)',
    downloadGpx: 'Скачать GPX',
    openGoogleMaps: 'Google Maps',
    legendMain: 'Основной трек OSM',
    controlsHint: (count) =>
      `ЛКМ — сдвиг · ПКМ / Ctrl+ЛКМ — наклон и поворот 3D-рельефа · Клик 1–${count} — точка`,
    fallbackTitle: '3D-карта недоступна в текущем браузере (нет WebGL)',
    fallbackDesc: 'Вы можете скачать реальный GPX-трек OpenStreetMap или открыть маршрут в Google Maps.',
    mUnit: 'м',
    kmUnit: 'км',
  },
  en: {
    badge3d: 'Interactive 3D Bird’s-Eye Map',
    presetOverview: 'Full Trail (3D)',
    startPrefix: 'Start',
    finishPrefix: 'Finish',
    presetTopo: 'Topo Map (2D)',
    downloadGpx: 'Download GPX',
    openGoogleMaps: 'Google Maps',
    legendMain: 'Main OSM Track',
    controlsHint: (count) =>
      `Drag to pan · Right-click / Ctrl+Drag to tilt & rotate 3D terrain · Click pins 1–${count}`,
    fallbackTitle: '3D WebGL view is unavailable in this browser',
    fallbackDesc: 'You can still download the verified OpenStreetMap GPX file or open the trail in Google Maps.',
    mUnit: 'm',
    kmUnit: 'km',
  },
  de: {
    badge3d: 'Interaktive 3D-Vogelperspektive',
    presetOverview: 'Gesamtroute (3D)',
    startPrefix: 'Start',
    finishPrefix: 'Ziel',
    presetTopo: 'Topo-Karte (2D)',
    downloadGpx: 'GPX laden',
    openGoogleMaps: 'Google Maps',
    legendMain: 'Haupttrack OSM',
    controlsHint: (count) =>
      `Ziehen = Bewegen · Rechtsklick / Strg+Ziehen = 3D-Ansicht kippen · Klick auf 1–${count}`,
    fallbackTitle: '3D-WebGL-Ansicht wird von diesem Browser nicht unterstützt',
    fallbackDesc: 'Sie können den verifizierten OpenStreetMap-GPX-Track herunterladen oder Google Maps öffnen.',
    mUnit: 'm',
    kmUnit: 'km',
  },
  tr: {
    badge3d: 'İnteraktif 3D Kuş Bakışı Harita',
    presetOverview: 'Tüm Parkur (3D)',
    startPrefix: 'Başlangıç',
    finishPrefix: 'Bitiş',
    presetTopo: 'Topo Harita (2D)',
    downloadGpx: 'GPX İndir',
    openGoogleMaps: 'Google Maps',
    legendMain: 'Ana OSM Parkuru',
    controlsHint: (count) =>
      `Sürükle = Gezin · Sağ tık / Ctrl+Sürükle = 3D eğim & döndürme · 1–${count} noktalarına tıkla`,
    fallbackTitle: 'Bu tarayıcıda 3D WebGL desteği kullanılamıyor',
    fallbackDesc: 'Doğrulanmış OpenStreetMap GPX dosyasını indirebilir veya Google Haritalar’da açabilirsiniz.',
    mUnit: 'm',
    kmUnit: 'km',
  },
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildWaypointPopupHtml(
  wp: ProfileWaypointItem,
  idx: number,
  kmUnit: string,
  mUnit: string
): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:220px;padding:2px;">
      <div style="font-size:11px;font-weight:800;color:#0891b2;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:3px;">
        ${idx + 1}. ${escapeHtml(wp.title)}
      </div>
      <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:4px;">
        ${wp.km.toFixed(2)} ${escapeHtml(kmUnit)} · ${wp.ele} ${escapeHtml(mUnit)}
      </div>
      <div style="font-size:11px;color:#475569;line-height:1.35;">
        ${escapeHtml(wp.note)}
      </div>
    </div>
  `;
}

function showWaypointPopup(
  maplibregl: any,
  map: any,
  wp: ProfileWaypointItem,
  idx: number,
  popupRef: React.MutableRefObject<any>,
  kmUnit: string,
  mUnit: string
) {
  if (popupRef.current) {
    popupRef.current.remove();
  }
  const html = buildWaypointPopupHtml(wp, idx, kmUnit, mUnit);
  popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
    .setLngLat([wp.lon, wp.lat])
    .setHTML(html)
    .addTo(map);
}

export default function Trail3DViewer({
  trailId,
  trailName,
  totalKm,
  points,
  sideBranch,
  waypoints,
  activeWaypointIdx,
  onSelectWaypoint,
  mapsUrl,
  attribution,
  locale,
}: Trail3DViewerProps) {
  const t = UI_COPY[locale] || UI_COPY.en;
  const presets = React.useMemo(() => computeCameraPresets(trailId, points), [trailId, points]);
  const presetsRef = useRef(presets);
  presetsRef.current = presets;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const maplibreRef = useRef<any>(null);
  const markerElsRef = useRef<HTMLButtonElement[]>([]);
  const popupRef = useRef<any>(null);
  const onSelectRef = useRef(onSelectWaypoint);
  onSelectRef.current = onSelectWaypoint;

  const [activePreset, setActivePreset] = useState<ViewPreset>('overview');
  const [webglError, setWebglError] = useState(false);

  const [fallbackCameraTarget, setFallbackCameraTarget] = useState<LeafletCameraTarget | null>(null);
  const [fallbackPopupNonce, setFallbackPopupNonce] = useState(0);
  const fallbackNonceRef = useRef(0);
  const prevWaypointIdxRef = useRef(activeWaypointIdx);

  const fbCopy = FALLBACK_2D_LABELS[locale] || FALLBACK_2D_LABELS.en;
  const activePresetRef = useRef<ViewPreset>(activePreset);
  activePresetRef.current = activePreset;
  const unitsRef = useRef({ kmUnit: t.kmUnit, mUnit: t.mUnit });
  unitsRef.current = { kmUnit: t.kmUnit, mUnit: t.mUnit };

  const branchKey = sideBranch ? `${sideBranch.label}:${sideBranch.points.length}` : 'none';

  const fallbackPolylines = useMemo<LeafletPolylineItem[]>(() => {
    const lines: LeafletPolylineItem[] = [
      {
        id: 'main-trail',
        coordinates: points.map(([lon, lat]) => [lon, lat]),
        color: '#ef4444',
        weight: 4,
        casingColor: '#ffffff',
        casingWeight: 7,
        casingOpacity: 0.9,
      },
    ];
    if (sideBranch && sideBranch.points.length > 1) {
      lines.push({
        id: 'branch-trail',
        coordinates: sideBranch.points.map(([lon, lat]) => [lon, lat]),
        color: '#06b6d4',
        weight: 3,
        dashArray: '6 5',
        casingColor: '#ffffff',
        casingWeight: 5.5,
        casingOpacity: 0.8,
      });
    }
    return lines;
  }, [points, sideBranch]);

  const fallbackMarkers = useMemo<LeafletMarkerItem[]>(() => {
    return waypoints.map((wp, idx) => {
      const isSelected = idx === activeWaypointIdx;
      return {
        id: String(idx),
        coordinates: [wp.lon, wp.lat],
        label: String(idx + 1),
        title: wp.title,
        color: isSelected ? '#0891b2' : '#0f172a',
        borderColor: isSelected ? '#67e8f9' : '#ffffff',
        minWidth: 26,
        height: 26,
        fontSize: 11,
        active: isSelected,
        activeRingColor: 'rgba(103, 232, 249, 0.75)',
        popupHtml: buildWaypointPopupHtml(wp, idx, t.kmUnit, t.mUnit),
      };
    });
  }, [activeWaypointIdx, t.kmUnit, t.mUnit, waypoints]);

  useEffect(() => {
    if (webglError) return;
    let isCancelled = false;
    let mapInstance: any = null;
    let detachLoss = () => {};

    async function initMap() {
      if (!containerRef.current) return;
      try {
        if (!detectWebGLSupport()) {
          setWebglError(true);
          return;
        }

        const mod = await import('maplibre-gl');
        const maplibregl = mod.default || mod;
        if (isCancelled || !containerRef.current) return;
        maplibreRef.current = maplibregl;

        const hasBranch = Boolean(sideBranch && sideBranch.points.length > 1);

        const mainLineGeoJson = {
          type: 'Feature',
          properties: { name: trailName },
          geometry: {
            type: 'LineString',
            coordinates: points.map((p) => [p[0], p[1]]),
          },
        };

        const branchLineGeoJson = {
          type: 'Feature',
          properties: { name: sideBranch?.label || '' },
          geometry: {
            type: 'LineString',
            coordinates: hasBranch ? sideBranch!.points.map((p) => [p[0], p[1]]) : [],
          },
        };

        const sources: Record<string, any> = {
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
          terrainSource: {
            type: 'raster-dem',
            tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
            tileSize: 256,
            encoding: 'terrarium',
            maxzoom: 14,
          },
          'main-trail': {
            type: 'geojson',
            data: mainLineGeoJson,
          },
        };

        if (hasBranch) {
          sources['branch-trail'] = {
            type: 'geojson',
            data: branchLineGeoJson,
          };
        }

        const layers: any[] = [
          {
            id: 'background',
            type: 'background',
            paint: { 'background-color': '#0f172a' },
          },
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
        ];

        if (hasBranch) {
          layers.push(
            {
              id: 'branch-trail-casing',
              type: 'line',
              source: 'branch-trail',
              paint: {
                'line-color': '#ffffff',
                'line-width': 5,
                'line-opacity': 0.8,
              },
            },
            {
              id: 'branch-trail-line',
              type: 'line',
              source: 'branch-trail',
              paint: {
                'line-color': '#06b6d4',
                'line-width': 3,
                'line-dasharray': [2, 1.5],
              },
            }
          );
        }

        layers.push(
          {
            id: 'main-trail-casing',
            type: 'line',
            source: 'main-trail',
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
              'line-color': '#ffffff',
              'line-width': 6.5,
              'line-opacity': 0.9,
            },
          },
          {
            id: 'main-trail-line',
            type: 'line',
            source: 'main-trail',
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
              'line-color': '#ef4444',
              'line-width': 3.8,
            },
          }
        );

        const styleConfig: any = {
          version: 8,
          sources,
          terrain: {
            source: 'terrainSource',
            exaggeration: 1.8,
          },
          layers,
        };

        mapInstance = new maplibregl.Map({
          container: containerRef.current,
          failIfMajorPerformanceCaveat: false,
          style: styleConfig,
          ...presetsRef.current.overview,
          maxPitch: 75,
          attributionControl: false,
        });

        mapInstance.addControl(
          new maplibregl.NavigationControl({ visualizePitch: true }),
          'top-right'
        );

        mapRef.current = mapInstance;

        markerElsRef.current = waypoints.map((wp, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = String(idx + 1);
          btn.title = wp.title;
          btn.style.cssText = [
            'width:26px',
            'height:26px',
            'border-radius:9999px',
            'background:#0f172a',
            'color:#ffffff',
            'border:2.5px solid #ffffff',
            'font-size:11px',
            'font-weight:800',
            'cursor:pointer',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'box-shadow:0 4px 12px rgba(0,0,0,0.45)',
            'transition:transform 0.15s ease, background 0.15s ease',
          ].join(';');

          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            onSelectRef.current(idx);
            showWaypointPopup(
              maplibregl,
              mapInstance,
              wp,
              idx,
              popupRef,
              unitsRef.current.kmUnit,
              unitsRef.current.mUnit
            );
          });

          new maplibregl.Marker({ element: btn, anchor: 'center' })
            .setLngLat([wp.lon, wp.lat])
            .addTo(mapInstance);

          return btn;
        });

        detachLoss = attachWebGLLossHandler(mapInstance, () => {
          if (!isCancelled) setWebglError(true);
        });

        mapInstance.on('error', (ev: any) => {
          if (ev?.error?.message && /webgl/i.test(ev.error.message)) {
            console.warn('[Trail3DViewer] MapLibre WebGL error:', ev.error);
            if (!isCancelled) setWebglError(true);
          }
        });
      } catch (err) {
        console.warn('[Trail3DViewer] WebGL init failed, switching to 2D Leaflet:', err);
        if (!isCancelled) setWebglError(true);
      }
    }

    initMap();

    return () => {
      isCancelled = true;
      detachLoss();
      popupRef.current = null;
      if (mapInstance) {
        mapInstance.remove();
      }
      mapRef.current = null;
      markerElsRef.current = [];
    };
  }, [branchKey, points, sideBranch, trailName, waypoints, webglError]);

  // Sync active waypoint highlight & fly camera when changed externally (e.g., from elevation profile)
  useEffect(() => {
    const waypointChanged = prevWaypointIdxRef.current !== activeWaypointIdx;
    prevWaypointIdxRef.current = activeWaypointIdx;

    if (waypointChanged && activeWaypointIdx !== null && waypoints[activeWaypointIdx]) {
      const wp = waypoints[activeWaypointIdx];
      fallbackNonceRef.current += 1;
      setFallbackCameraTarget({
        nonce: fallbackNonceRef.current,
        mode: 'flyTo',
        center: [wp.lon, wp.lat],
        zoom: 15.0,
      });
      setFallbackPopupNonce((n) => n + 1);
    }

    const map = mapRef.current;
    const maplibregl = maplibreRef.current;

    markerElsRef.current.forEach((btn, idx) => {
      const isSelected = idx === activeWaypointIdx;
      btn.style.background = isSelected ? '#0891b2' : '#0f172a';
      btn.style.transform = isSelected ? 'scale(1.22)' : 'scale(1)';
      btn.style.borderColor = isSelected ? '#67e8f9' : '#ffffff';
    });

    if (activeWaypointIdx !== null && map && maplibregl && waypoints[activeWaypointIdx]) {
      const wp = waypoints[activeWaypointIdx];
      showWaypointPopup(
        maplibregl,
        map,
        wp,
        activeWaypointIdx,
        popupRef,
        unitsRef.current.kmUnit,
        unitsRef.current.mUnit
      );
      map.flyTo({
        center: [wp.lon, wp.lat],
        zoom: 15.0,
        pitch: activePresetRef.current === 'topo' ? 0 : 64,
        speed: 0.9,
        essential: true,
      });
    }
  }, [activeWaypointIdx, waypoints]);

  const handleSelectPreset = (preset: ViewPreset) => {
    setActivePreset(preset);
    fallbackNonceRef.current += 1;
    setFallbackCameraTarget({
      nonce: fallbackNonceRef.current,
      mode: 'flyTo',
      center: presets[preset].center,
      zoom: presets[preset].zoom,
    });

    const map = mapRef.current;
    if (!map) return;

    const isTopo = preset === 'topo';
    if (map.getLayer('esri-satellite') && map.getLayer('opentopo-layer')) {
      map.setLayoutProperty('esri-satellite', 'visibility', isTopo ? 'none' : 'visible');
      map.setLayoutProperty('opentopo-layer', 'visibility', isTopo ? 'visible' : 'none');
    }
    map.setTerrain(isTopo ? null : { source: 'terrainSource', exaggeration: 1.8 });

    map.flyTo({
      ...presets[preset],
      speed: 0.95,
      essential: true,
    });
  };

  const handleDownloadGpx = () => {
    const wptXml = waypoints
      .map(
        (wp, idx) =>
          `  <wpt lat="${wp.lat.toFixed(6)}" lon="${wp.lon.toFixed(6)}">\n` +
          `    <ele>${wp.ele}</ele>\n` +
          `    <name>${idx + 1}. ${escapeXml(wp.title)}</name>\n` +
          `    <desc>${escapeXml(wp.note)}</desc>\n` +
          `  </wpt>`
      )
      .join('\n');

    const mainTrkPts = points
      .map(
        ([lon, lat, ele]) =>
          `      <trkpt lat="${lat.toFixed(6)}" lon="${lon.toFixed(6)}"><ele>${ele}</ele></trkpt>`
      )
      .join('\n');

    const hasBranch = Boolean(sideBranch && sideBranch.points.length > 1);
    const branchXml = hasBranch
      ? `\n  <trk>\n` +
        `    <name>${escapeXml(sideBranch!.label)}</name>\n` +
        `    <trkseg>\n` +
        sideBranch!.points
          .map(
            ([lon, lat, ele]) =>
              `      <trkpt lat="${lat.toFixed(6)}" lon="${lon.toFixed(6)}"><ele>${ele}</ele></trkpt>`
          )
          .join('\n') +
        `\n    </trkseg>\n  </trk>`
      : '';

    const gpx =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<gpx version="1.1" creator="Dalaman.info Trail Atlas" xmlns="http://www.topografix.com/GPX/1/1">\n` +
      `  <metadata>\n` +
      `    <name>${escapeXml(trailName)}</name>\n` +
      `    <desc>${escapeXml(attribution)}</desc>\n` +
      `  </metadata>\n` +
      `${wptXml}\n` +
      `  <trk>\n` +
      `    <name>${escapeXml(trailName)}</name>\n` +
      `    <trkseg>\n` +
      `${mainTrkPts}\n` +
      `    </trkseg>\n` +
      `  </trk>${branchXml}\n` +
      `</gpx>\n`;

    const blob = new Blob([gpx], { type: 'application/gpx+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trailId}-dalaman-info.gpx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const startShort = waypoints[0]?.shortLabel || t.startPrefix;
  const endShort = waypoints[waypoints.length - 1]?.shortLabel || t.finishPrefix;
  const formattedTotalKm =
    locale === 'ru' || locale === 'de' || locale === 'tr'
      ? totalKm.toFixed(1).replace('.', ',')
      : totalKm.toFixed(1);
  const hasVisibleBranch = Boolean(sideBranch && sideBranch.points.length > 1);

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
      {/* Control Toolbar */}
      <div className="px-4 py-3.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 mr-1">
            <FaCube /> {t.badge3d}
          </span>

          <div className="inline-flex flex-wrap items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
            {(
              [
                { id: 'overview', label: t.presetOverview },
                { id: 'start', label: `${t.startPrefix}: ${startShort}` },
                { id: 'finish', label: `${t.finishPrefix}: ${endShort}` },
                { id: 'topo', label: t.presetTopo },
              ] as { id: ViewPreset; label: string }[]
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => handleSelectPreset(btn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activePreset === btn.id
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {btn.id === 'topo' && <FaLayerGroup className="inline mr-1.5 text-[10px]" />}
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadGpx}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <FaDownload size={11} />
            <span>{t.downloadGpx}</span>
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
          >
            <FaExternalLinkAlt size={10} />
            <span>{t.openGoogleMaps}</span>
          </a>
        </div>
      </div>

      {/* Map Viewport or WebGL Fallback */}
      <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] bg-slate-950">
        {webglError ? (
          <LeafletFallbackMap
            baseLayer={activePreset === 'topo' ? 'topo' : 'satellite'}
            initialCenter={presets[activePreset].center}
            initialZoom={presets[activePreset].zoom}
            cameraTarget={fallbackCameraTarget}
            markers={fallbackMarkers}
            activePopupId={activeWaypointIdx !== null ? String(activeWaypointIdx) : null}
            popupNonce={fallbackPopupNonce}
            onSelectMarker={(id) => onSelectWaypoint(Number(id))}
            polylines={fallbackPolylines}
            heightClassName="h-full"
            fallbackBadgeText={fbCopy.badge}
            retry3dLabel={fbCopy.retry3d}
            onRetry3d={() => setWebglError(false)}
            emergencyMapsUrl={mapsUrl}
            emergencyMapsLabel={t.openGoogleMaps}
            emergencyTitle={t.fallbackTitle}
            emergencyDesc={t.fallbackDesc}
          />
        ) : (
          <div ref={containerRef} className="w-full h-full" />
        )}

        {/* Floating Legend */}
        <div className="absolute left-3 top-3 z-10 bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 text-[11px] space-y-1 pointer-events-none">
          <div className="flex items-center gap-2 text-white font-semibold">
            <span className="w-4 h-1 rounded bg-red-500 inline-block" />
            <span>
              {t.legendMain} ({formattedTotalKm} {t.kmUnit})
            </span>
          </div>
          {hasVisibleBranch && sideBranch && (
            <div className="flex items-center gap-2 text-cyan-200 font-semibold">
              <span className="w-4 border-t-2 border-dashed border-cyan-400 inline-block" />
              <span>{sideBranch.label}</span>
            </div>
          )}
        </div>

        {/* Bottom Interaction Hint */}
        <div className="hidden sm:block absolute left-3 bottom-3 z-10 bg-slate-900/80 backdrop-blur-md border border-white/15 rounded-lg px-2.5 py-1 text-[11px] text-slate-300 pointer-events-none">
          {t.controlsHint(waypoints.length)}
        </div>
      </div>

      {/* Mandatory ODbL / DEM Attribution Bar */}
      <div className="px-4 py-2 bg-slate-950 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
        <span>{attribution}</span>
        <span>Esri World Imagery / OpenTopoMap / AWS Terrarium DEM</span>
      </div>
    </div>
  );
}
