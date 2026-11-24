"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FaCube, FaLayerGroup, FaMapMarkedAlt } from 'react-icons/fa';
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
import {
  WIND_CORRIDORS,
  WIND_MAP_POINTS,
  WIND_SPOTS,
  type LocaleCode,
  type WindMapPoint,
  type WindMapPointKind,
  type WindSpotId,
} from '@/lib/kitesurfing';

interface Kitesurfing3DMapProps {
  locale: LocaleCode;
  activeSpotId: WindSpotId | 'all';
  focusedPointId: string | null;
  onSelectPoint: (pointId: string) => void;
  onSelectSpot: (spotId: WindSpotId | 'all') => void;
}

const REGION_OVERVIEW = {
  center: [28.45, 36.75] as [number, number],
  zoom: 7.9,
  pitch: 30,
  bearing: 0,
};

const KIND_COLORS: Record<WindMapPointKind, string> = {
  'kite-zone': '#0891b2',     // cyan-600
  'windsurf-wing': '#0d9488', // teal-600
  'school-base': '#d97706',   // amber-600
  'no-kite': '#e11d48',       // rose-600
};

const MAP_UI: Record<
  LocaleCode,
  {
    badge3d: string;
    btnAll: string;
    btn3dSat: string;
    btn2dTopo: string;
    legendKite: string;
    legendWindWing: string;
    legendSchool: string;
    legendNoKite: string;
    legendCorridor: string;
    kindLabels: Record<WindMapPointKind, string>;
    windLabel: string;
    dirLabel: string;
    openGmaps: string;
    controlsHint: string;
    fallbackTitle: string;
    fallbackDesc: string;
  }
> = {
  ru: {
    badge3d: 'Интерактивная 3D-карта заливов, ветра и зонирования',
    btnAll: 'Весь берег',
    btn3dSat: '3D-Рельеф',
    btn2dTopo: 'Топокарта (2D)',
    legendKite: 'Кайт-спот',
    legendWindWing: 'Виндсёрф / Вингфойл / SUP',
    legendSchool: 'Школа / База',
    legendNoKite: 'Запретная зона (не для кайта)',
    legendCorridor: 'Вектор термика',
    kindLabels: {
      'kite-zone': 'Кайт-спот / Зона катания',
      'windsurf-wing': 'Виндсёрфинг / Винг / SUP',
      'school-base': 'Школа / Станция проката',
      'no-kite': 'Не для кайтсёрфинга (Опасно)',
    },
    windLabel: 'Ветер',
    dirLabel: 'Направление',
    openGmaps: 'Google Maps',
    controlsHint: 'ЛКМ — сдвиг · ПКМ / Ctrl+ЛКМ — наклон 3D-залива · Клик по пинам',
    fallbackTitle: '3D-карта недоступна в текущем браузере (нет WebGL)',
    fallbackDesc: 'Используйте график термика и карточки 4 спотов ниже с прямыми ссылками Google Maps.',
  },
  en: {
    badge3d: 'Interactive 3D Bay Relief & Wind Spot Map',
    btnAll: 'Full Coast',
    btn3dSat: '3D Terrain',
    btn2dTopo: '2D Topo',
    legendKite: 'Kite Zone',
    legendWindWing: 'Windsurf / Wingfoil / SUP',
    legendSchool: 'School / Station Base',
    legendNoKite: 'No-Kite Red Zone',
    legendCorridor: 'Thermal Wind Vector',
    kindLabels: {
      'kite-zone': 'Kitesurf Launching & Riding Zone',
      'windsurf-wing': 'Windsurf / Wingfoil / SUP Bay',
      'school-base': 'Certified School / Station',
      'no-kite': 'Restricted / No-Kite Coast',
    },
    windLabel: 'Wind',
    dirLabel: 'Direction',
    openGmaps: 'Google Maps',
    controlsHint: 'Drag to pan · Right-click / Ctrl+Drag to tilt 3D coast · Tap pins',
    fallbackTitle: '3D WebGL view is unavailable in this browser',
    fallbackDesc: 'Use the thermal profile chart and 4 regional spot cards below with Google Maps links.',
  },
  de: {
    badge3d: 'Interaktive 3D-Relief- & Windspot-Karte',
    btnAll: 'Ganze Küste',
    btn3dSat: '3D-Relief',
    btn2dTopo: '2D Topo',
    legendKite: 'Kite-Zone',
    legendWindWing: 'Windsurf / Wingfoil / SUP',
    legendSchool: 'Schule / Station',
    legendNoKite: 'Kite-Verbotszone',
    legendCorridor: 'Thermik-Windvektor',
    kindLabels: {
      'kite-zone': 'Kitesurf-Revier',
      'windsurf-wing': 'Windsurf / Wingfoil / SUP',
      'school-base': 'Schule / Verleih-Basis',
      'no-kite': 'Kein Kite-Spot (Verboten)',
    },
    windLabel: 'Wind',
    dirLabel: 'Richtung',
    openGmaps: 'Google Maps',
    controlsHint: 'Ziehen = Bewegen · Rechtsklick / Strg+Ziehen = 3D-Ansicht kippen · Pins antippen',
    fallbackTitle: '3D-WebGL-Ansicht in diesem Browser nicht verfügbar',
    fallbackDesc: 'Nutzen Sie das Thermik-Diagramm und die 4 Spot-Karten unten mit Google-Maps-Links.',
  },
  tr: {
    badge3d: 'İnteraktif 3D Körfez ve Rüzgâr Sporları Haritası',
    btnAll: 'Tüm Kıyı',
    btn3dSat: '3D Arazi',
    btn2dTopo: '2D Topo',
    legendKite: 'Kite Alanı',
    legendWindWing: 'Rüzgar Sörfü / Wingfoil / SUP',
    legendSchool: 'Okul / İstasyon',
    legendNoKite: 'Kite Yasak Bölgesi',
    legendCorridor: 'Termik Rüzgâr Hattı',
    kindLabels: {
      'kite-zone': 'Kitesurf Alanı',
      'windsurf-wing': 'Rüzgar Sörfü / Wingfoil / SUP',
      'school-base': 'Okul / Ekipman İstasyonu',
      'no-kite': 'Kite İçin Yasak / Tehlikeli Kıyı',
    },
    windLabel: 'Rüzgâr',
    dirLabel: 'Yön',
    openGmaps: 'Google Haritalar',
    controlsHint: 'Sürükle = Gezin · Sağ tık / Ctrl+Sürükle = 3D körfezi eğ · Noktalara tıkla',
    fallbackTitle: 'Bu tarayıcıda 3D WebGL görünümü desteklenmiyor',
    fallbackDesc: 'Aşağıdaki günlük termik grafiğini ve 4 kıyı noktasının Google Haritalar bağlantılarını kullanın.',
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPopupHtml(point: WindMapPoint, locale: LocaleCode, ui: (typeof MAP_UI)['en']): string {
  const color = KIND_COLORS[point.kind];
  const title = point.title[locale] || point.title.en;
  const note = point.note[locale] || point.note.en;

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:255px;padding:2px;">
      <div style="display:inline-block;padding:2px 8px;border-radius:9999px;background:${color};color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">
        ${escapeHtml(ui.kindLabels[point.kind])}
      </div>
      <div style="font-size:13px;font-weight:800;color:#0f172a;line-height:1.25;margin-bottom:4px;">
        ${escapeHtml(title)}
      </div>
      <div style="font-size:11px;font-weight:700;color:#0e7490;margin-bottom:5px;">
        ${escapeHtml(ui.windLabel)}: ${escapeHtml(point.windKnots)} · ${escapeHtml(point.windDirs)}
      </div>
      <div style="font-size:11px;color:#475569;line-height:1.35;margin-bottom:8px;">
        ${escapeHtml(note)}
      </div>
      <a href="${escapeHtml(point.mapsUrl)}" target="_blank" rel="noopener noreferrer" style="font-size:11px;font-weight:800;color:#0891b2;text-decoration:underline;">
        ${escapeHtml(ui.openGmaps)} ↗
      </a>
    </div>
  `;
}

export default function Kitesurfing3DMap({
  locale,
  activeSpotId,
  focusedPointId,
  onSelectPoint,
  onSelectSpot,
}: Kitesurfing3DMapProps) {
  const ui = MAP_UI[locale] || MAP_UI.en;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const maplibreRef = useRef<any>(null);
  const markersRef = useRef<{ id: string; marker: any; btn: HTMLButtonElement; kind: WindMapPointKind }[]>([]);
  const popupRef = useRef<any>(null);
  const onSelectPointRef = useRef(onSelectPoint);
  onSelectPointRef.current = onSelectPoint;

  const [viewMode, setViewMode] = useState<'3d' | 'topo'>('3d');
  const viewModeRef = useRef<'3d' | 'topo'>(viewMode);
  viewModeRef.current = viewMode;
  const [webglError, setWebglError] = useState(false);

  const [fallbackCameraTarget, setFallbackCameraTarget] = useState<LeafletCameraTarget | null>(null);
  const [fallbackPopupNonce, setFallbackPopupNonce] = useState(0);
  const fallbackNonceRef = useRef(0);
  const prevSpotRef = useRef(activeSpotId);
  const prevPointRef = useRef(focusedPointId);

  const fbCopy = FALLBACK_2D_LABELS[locale] || FALLBACK_2D_LABELS.en;
  const initialSpot = WIND_SPOTS.find((s) => s.id === 'akyaka')!;
  const fallbackInitialSpot = WIND_SPOTS.find((s) => s.id === activeSpotId);

  const fallbackPolylines = useMemo<LeafletPolylineItem[]>(() => {
    return WIND_CORRIDORS.map((c) => ({
      id: c.id,
      coordinates: c.coordinates,
      color: '#06b6d4',
      weight: 3,
      dashArray: '8 6',
      casingColor: '#ffffff',
      casingWeight: 5,
      casingOpacity: 0.72,
    }));
  }, []);

  const fallbackMarkers = useMemo<LeafletMarkerItem[]>(() => {
    return WIND_MAP_POINTS.map((pt) => ({
      id: pt.id,
      coordinates: pt.coordinates,
      label:
        pt.kind === 'no-kite'
          ? 'NO'
          : pt.kind === 'school-base'
          ? 'S'
          : pt.kind === 'windsurf-wing'
          ? 'W'
          : 'K',
      title: pt.title[locale] || pt.title.en,
      color: KIND_COLORS[pt.kind],
      minWidth: 28,
      height: 28,
      paddingX: 6,
      fontSize: 10,
      active: pt.id === focusedPointId,
      activeRingColor: 'rgba(103,232,249,0.75)',
      popupHtml: buildPopupHtml(pt, locale, ui),
    }));
  }, [focusedPointId, locale, ui]);

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

        const corridorGeoJson = {
          type: 'FeatureCollection' as const,
          features: WIND_CORRIDORS.map((c) => ({
            type: 'Feature' as const,
            properties: { id: c.id },
            geometry: {
              type: 'LineString' as const,
              coordinates: c.coordinates,
            },
          })),
        };

        mapInstance = new maplibregl.Map({
          container: containerRef.current,
          failIfMajorPerformanceCaveat: false,
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
              terrainSource: {
                type: 'raster-dem',
                tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
                tileSize: 256,
                encoding: 'terrarium',
                maxzoom: 14,
              },
              windCorridors: {
                type: 'geojson',
                data: corridorGeoJson,
              },
            },
            terrain: {
              source: 'terrainSource',
              exaggeration: 1.5,
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
              {
                id: 'wind-corridor-casing',
                type: 'line',
                source: 'windCorridors',
                paint: { 'line-color': '#ffffff', 'line-width': 5, 'line-opacity': 0.72 },
              },
              {
                id: 'wind-corridor-lines',
                type: 'line',
                source: 'windCorridors',
                paint: {
                  'line-color': '#06b6d4',
                  'line-width': 3,
                  'line-dasharray': [3, 2],
                },
              },
            ],
          },
          center: initialSpot.coordinates,
          zoom: initialSpot.zoom,
          pitch: initialSpot.pitch,
          bearing: initialSpot.bearing,
          maxPitch: 75,
          attributionControl: false,
        });

        mapInstance.addControl(
          new maplibregl.NavigationControl({ visualizePitch: true }),
          'top-right'
        );
        mapRef.current = mapInstance;

        markersRef.current = WIND_MAP_POINTS.map((pt) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.title = pt.title[locale] || pt.title.en;
          btn.textContent =
            pt.kind === 'no-kite'
              ? 'NO'
              : pt.kind === 'school-base'
              ? 'S'
              : pt.kind === 'windsurf-wing'
              ? 'W'
              : 'K';

          btn.style.cssText = [
            'min-width:28px',
            'height:28px',
            'padding:0 6px',
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
            'box-shadow:0 4px 12px rgba(0,0,0,0.45)',
            'transition:transform 0.15s ease, box-shadow 0.15s ease',
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

        detachLoss = attachWebGLLossHandler(mapInstance, () => {
          if (!isCancelled) setWebglError(true);
        });

        mapInstance.on('error', (ev: any) => {
          if (ev?.error?.message && /webgl/i.test(ev.error.message)) {
            console.warn('[Kitesurfing3DMap] MapLibre WebGL error:', ev.error);
            if (!isCancelled) setWebglError(true);
          }
        });
      } catch (err) {
        console.warn('[Kitesurfing3DMap] WebGL init failed, switching to 2D Leaflet:', err);
        if (!isCancelled) setWebglError(true);
      }
    }

    initMap();

    return () => {
      isCancelled = true;
      detachLoss();
      popupRef.current = null;
      markersRef.current.forEach((m) => m.marker.remove());
      markersRef.current = [];
      if (mapInstance) mapInstance.remove();
      mapRef.current = null;
    };
  }, [initialSpot.bearing, initialSpot.coordinates, initialSpot.pitch, initialSpot.zoom, locale, webglError]);

  // Fly camera when active spot switches
  useEffect(() => {
    const spotChanged = prevSpotRef.current !== activeSpotId;
    prevSpotRef.current = activeSpotId;

    if (spotChanged) {
      fallbackNonceRef.current += 1;
      if (activeSpotId === 'all') {
        setFallbackCameraTarget({
          nonce: fallbackNonceRef.current,
          mode: 'flyTo',
          center: REGION_OVERVIEW.center,
          zoom: REGION_OVERVIEW.zoom,
        });
      } else {
        const spot = WIND_SPOTS.find((s) => s.id === activeSpotId);
        if (spot) {
          setFallbackCameraTarget({
            nonce: fallbackNonceRef.current,
            mode: 'flyTo',
            center: spot.coordinates,
            zoom: spot.zoom,
          });
        }
      }
    }

    const map = mapRef.current;
    if (!map) return;
    const isTopo = viewModeRef.current === 'topo';
    if (activeSpotId === 'all') {
      map.flyTo({
        center: REGION_OVERVIEW.center,
        zoom: REGION_OVERVIEW.zoom,
        pitch: isTopo ? 0 : REGION_OVERVIEW.pitch,
        bearing: 0,
        speed: 1.0,
        essential: true,
      });
      return;
    }
    const spot = WIND_SPOTS.find((s) => s.id === activeSpotId);
    if (spot) {
      map.flyTo({
        center: spot.coordinates,
        zoom: spot.zoom,
        pitch: isTopo ? 0 : spot.pitch,
        bearing: isTopo ? 0 : spot.bearing,
        speed: 1.0,
        essential: true,
      });
    }
  }, [activeSpotId]);

  // Highlight & focus point when changed externally
  useEffect(() => {
    const pointChanged = prevPointRef.current !== focusedPointId;
    prevPointRef.current = focusedPointId;

    if (pointChanged && focusedPointId) {
      const pt = WIND_MAP_POINTS.find((p) => p.id === focusedPointId);
      if (pt) {
        fallbackNonceRef.current += 1;
        setFallbackCameraTarget({
          nonce: fallbackNonceRef.current,
          mode: 'flyTo',
          center: pt.coordinates,
          zoom: pt.kind === 'no-kite' ? 12.2 : 13.4,
        });
        setFallbackPopupNonce((n) => n + 1);
      }
    }

    const map = mapRef.current;
    const maplibregl = maplibreRef.current;
    markersRef.current.forEach(({ id, btn }) => {
      const active = id === focusedPointId;
      btn.style.transform = active ? 'scale(1.24)' : 'scale(1)';
      btn.style.boxShadow = active
        ? '0 0 0 4px rgba(103,232,249,0.75), 0 6px 16px rgba(0,0,0,0.5)'
        : '0 4px 12px rgba(0,0,0,0.45)';
      btn.style.zIndex = active ? '10' : '1';
    });

    if (!focusedPointId || !map || !maplibregl) return;
    const pt = WIND_MAP_POINTS.find((p) => p.id === focusedPointId);
    if (!pt) return;

    if (popupRef.current) popupRef.current.remove();
    popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
      .setLngLat(pt.coordinates)
      .setHTML(buildPopupHtml(pt, locale, ui))
      .addTo(map);

    map.flyTo({
      center: pt.coordinates,
      zoom: pt.kind === 'no-kite' ? 12.2 : 13.4,
      pitch: viewModeRef.current === 'topo' ? 0 : 44,
      speed: 1.0,
      essential: true,
    });
  }, [focusedPointId, locale, ui]);

  const handleToggleView = (next: '3d' | 'topo') => {
    setViewMode(next);
    const map = mapRef.current;
    if (!map) return;
    const isTopo = next === 'topo';
    if (map.getLayer('esri-satellite') && map.getLayer('opentopo-layer')) {
      map.setLayoutProperty('esri-satellite', 'visibility', isTopo ? 'none' : 'visible');
      map.setLayoutProperty('opentopo-layer', 'visibility', isTopo ? 'visible' : 'none');
    }
    map.setTerrain(isTopo ? null : { source: 'terrainSource', exaggeration: 1.5 });
    const spot = WIND_SPOTS.find((s) => s.id === activeSpotId);
    map.flyTo({
      pitch: isTopo ? 0 : spot?.pitch ?? 38,
      bearing: isTopo ? 0 : spot?.bearing ?? 0,
      speed: 0.9,
      essential: true,
    });
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300">
          <FaCube /> {ui.badge3d}
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleToggleView('3d')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              viewMode === '3d'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FaLayerGroup size={10} /> {ui.btn3dSat}
          </button>
          <button
            type="button"
            onClick={() => handleToggleView('topo')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              viewMode === 'topo'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FaMapMarkedAlt size={10} /> {ui.btn2dTopo}
          </button>
          <button
            type="button"
            onClick={() => {
              if (popupRef.current) popupRef.current.remove();
              if (activeSpotId === 'all') {
                fallbackNonceRef.current += 1;
                setFallbackCameraTarget({
                  nonce: fallbackNonceRef.current,
                  mode: 'flyTo',
                  center: REGION_OVERVIEW.center,
                  zoom: REGION_OVERVIEW.zoom,
                });
              }
              onSelectSpot('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
              activeSpotId === 'all'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {ui.btnAll}
          </button>
        </div>
      </div>

      {/* Canvas */}
      {webglError ? (
        <LeafletFallbackMap
          baseLayer={viewMode === 'topo' ? 'topo' : 'satellite'}
          initialCenter={
            activeSpotId === 'all'
              ? REGION_OVERVIEW.center
              : fallbackInitialSpot?.coordinates ?? initialSpot.coordinates
          }
          initialZoom={
            activeSpotId === 'all'
              ? REGION_OVERVIEW.zoom
              : fallbackInitialSpot?.zoom ?? initialSpot.zoom
          }
          cameraTarget={fallbackCameraTarget}
          markers={fallbackMarkers}
          activePopupId={focusedPointId}
          popupNonce={fallbackPopupNonce}
          onSelectMarker={onSelectPoint}
          polylines={fallbackPolylines}
          heightClassName="h-[390px] sm:h-[440px]"
          fallbackBadgeText={fbCopy.badge}
          retry3dLabel={fbCopy.retry3d}
          onRetry3d={() => setWebglError(false)}
          emergencyMapsUrl="https://maps.google.com/?q=37.0378,28.3292"
          emergencyMapsLabel={ui.openGmaps}
          emergencyTitle={ui.fallbackTitle}
          emergencyDesc={ui.fallbackDesc}
        />
      ) : (
        <div ref={containerRef} className="w-full h-[390px] sm:h-[440px] bg-slate-950" />
      )}

      {/* Legend */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 ring-1 ring-white/50" />
            {ui.legendKite}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 ring-1 ring-white/50" />
            {ui.legendWindWing}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-1 ring-white/50" />
            {ui.legendSchool}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 ring-1 ring-white/50" />
            {ui.legendNoKite}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-3 h-0.5 bg-cyan-400 inline-block" />
            {ui.legendCorridor}
          </span>
        </div>
        <span className="text-slate-400 font-medium">{ui.controlsHint}</span>
      </div>
    </div>
  );
}
