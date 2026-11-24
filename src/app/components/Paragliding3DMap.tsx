"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FaCube, FaExternalLinkAlt, FaLayerGroup, FaMapMarkedAlt } from 'react-icons/fa';
import {
  FLIGHT_MAP_POINTS,
  FLYING_SITES,
  GLIDE_CORRIDORS,
  TELEFERIK_LINE,
  type FlightMapPoint,
  type FlightSiteId,
  type LocaleCode,
  type MapPointKind,
} from '@/lib/paragliding';

interface Paragliding3DMapProps {
  locale: LocaleCode;
  activeSiteId: FlightSiteId | 'all';
  focusedPointId: string | null;
  onSelectPoint: (pointId: string) => void;
  onSelectSite: (siteId: FlightSiteId | 'all') => void;
}

const REGION_OVERVIEW = {
  center: [28.98, 36.58] as [number, number],
  zoom: 8.2,
  pitch: 32,
  bearing: 0,
};

const KIND_COLORS: Record<MapPointKind, string> = {
  takeoff: '#0891b2',   // cyan-600
  landing: '#059669',   // emerald-600
  teleferik: '#d97706', // amber-600
  siv: '#4f46e5',       // indigo-600
};

const MAP_UI: Record<
  LocaleCode,
  {
    badge3d: string;
    btnAll: string;
    btn3dSat: string;
    btn2dTopo: string;
    legendTakeoff: string;
    legendLanding: string;
    legendTeleferik: string;
    legendSiv: string;
    legendGlide: string;
    kindLabels: Record<MapPointKind, string>;
    altLabel: string;
    windLabel: string;
    openGmaps: string;
    controlsHint: string;
    fallbackTitle: string;
    fallbackDesc: string;
  }
> = {
  ru: {
    badge3d: 'Интерактивная 3D-карта рельефа и полётов',
    btnAll: 'Весь берег',
    btn3dSat: '3D-Рельеф',
    btn2dTopo: 'Топокарта (2D)',
    legendTakeoff: 'Старт (Takeoff)',
    legendLanding: 'Посадка (LZ)',
    legendTeleferik: 'Канатка Teleferik',
    legendSiv: 'Зона SIV над водой',
    legendGlide: 'Траектория спуска',
    kindLabels: {
      takeoff: 'Стартовая площадка',
      landing: 'Зона посадки (LZ)',
      teleferik: 'Канатная дорога',
      siv: 'Зона SIV над морем',
    },
    altLabel: 'Высота',
    windLabel: 'Ветер',
    openGmaps: 'Google Maps',
    controlsHint: 'ЛКМ — сдвиг · ПКМ / Ctrl+ЛКМ — наклон и поворот 3D-горы · Клик по пинам',
    fallbackTitle: '3D-карта недоступна в текущем браузере (нет WebGL)',
    fallbackDesc: 'Используйте схему высот и карточки локаций ниже с прямыми ссылками Google Maps.',
  },
  en: {
    badge3d: 'Interactive 3D Mountain Relief & Glide Map',
    btnAll: 'Full Coast',
    btn3dSat: '3D Terrain',
    btn2dTopo: '2D Topo',
    legendTakeoff: 'Takeoff Runway',
    legendLanding: 'Landing Zone (LZ)',
    legendTeleferik: 'Cable Car Line',
    legendSiv: 'Over-Water SIV Box',
    legendGlide: 'Glide Corridor',
    kindLabels: {
      takeoff: 'Takeoff Launch',
      landing: 'Landing Zone (LZ)',
      teleferik: 'Cable Car Station',
      siv: 'SIV Training Box',
    },
    altLabel: 'Elevation',
    windLabel: 'Wind',
    openGmaps: 'Google Maps',
    controlsHint: 'Drag to pan · Right-click / Ctrl+Drag to tilt & orbit 3D mountain · Tap pins',
    fallbackTitle: '3D WebGL view is unavailable in this browser',
    fallbackDesc: 'Use the Babadağ altitude profile and regional site cards below with Google Maps links.',
  },
  de: {
    badge3d: 'Interaktive 3D-Gelände- & Flugkarte',
    btnAll: 'Ganze Küste',
    btn3dSat: '3D-Relief',
    btn2dTopo: '2D Topo',
    legendTakeoff: 'Startplatz',
    legendLanding: 'Landeplatz (LZ)',
    legendTeleferik: 'Seilbahn',
    legendSiv: 'SIV-Zone (Wasser)',
    legendGlide: 'Gleitkorridor',
    kindLabels: {
      takeoff: 'Startplatz',
      landing: 'Landeplatz',
      teleferik: 'Seilbahnstation',
      siv: 'SIV-Trainingszone',
    },
    altLabel: 'Höhe',
    windLabel: 'Wind',
    openGmaps: 'Google Maps',
    controlsHint: 'Ziehen = Bewegen · Rechtsklick / Strg+Ziehen = 3D-Ansicht kippen & drehen',
    fallbackTitle: '3D-WebGL-Ansicht in diesem Browser nicht verfügbar',
    fallbackDesc: 'Nutzen Sie das Höhenprofil und die Standortkarten unten mit Google-Maps-Links.',
  },
  tr: {
    badge3d: 'İnteraktif 3D Arazi ve Uçuş Haritası',
    btnAll: 'Tüm Kıyı',
    btn3dSat: '3D Arazi',
    btn2dTopo: '2D Topo',
    legendTakeoff: 'Kalkış Pisti',
    legendLanding: 'İniş Alanı (LZ)',
    legendTeleferik: 'Teleferik Hattı',
    legendSiv: 'Su Üzeri SIV Sahası',
    legendGlide: 'Süzülüş Hattı',
    kindLabels: {
      takeoff: 'Kalkış Pisti',
      landing: 'İniş Alanı',
      teleferik: 'Teleferik İstasyonu',
      siv: 'SIV Eğitim Sahası',
    },
    altLabel: 'İrtifa',
    windLabel: 'Rüzgar',
    openGmaps: 'Google Haritalar',
    controlsHint: 'Sürükle = Gezin · Sağ tık / Ctrl+Sürükle = 3D dağı döndür & eğ · Noktalara tıkla',
    fallbackTitle: 'Bu tarayıcıda 3D WebGL görünümü desteklenmiyor',
    fallbackDesc: 'Aşağıdaki Babadağ irtifa şemasını ve Google Haritalar bağlantılarını kullanabilirsiniz.',
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPopupHtml(point: FlightMapPoint, locale: LocaleCode, ui: (typeof MAP_UI)['en']): string {
  const color = KIND_COLORS[point.kind];
  const title = point.title[locale] || point.title.en;
  const note = point.note[locale] || point.note.en;

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:250px;padding:2px;">
      <div style="display:inline-block;padding:2px 8px;border-radius:9999px;background:${color};color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">
        ${escapeHtml(ui.kindLabels[point.kind])}
      </div>
      <div style="font-size:13px;font-weight:800;color:#0f172a;line-height:1.25;margin-bottom:4px;">
        ${escapeHtml(title)}
      </div>
      <div style="font-size:11px;font-weight:700;color:#0e7490;margin-bottom:5px;">
        ${escapeHtml(ui.altLabel)}: ${point.altitudeM} m · ${escapeHtml(ui.windLabel)}: ${escapeHtml(point.windDirs)}
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

export default function Paragliding3DMap({
  locale,
  activeSiteId,
  focusedPointId,
  onSelectPoint,
  onSelectSite,
}: Paragliding3DMapProps) {
  const ui = MAP_UI[locale] || MAP_UI.en;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const maplibreRef = useRef<any>(null);
  const markersRef = useRef<{ id: string; marker: any; btn: HTMLButtonElement; kind: MapPointKind }[]>([]);
  const popupRef = useRef<any>(null);
  const onSelectPointRef = useRef(onSelectPoint);
  onSelectPointRef.current = onSelectPoint;

  const [viewMode, setViewMode] = useState<'3d' | 'topo'>('3d');
  const viewModeRef = useRef<'3d' | 'topo'>(viewMode);
  viewModeRef.current = viewMode;
  const [webglError, setWebglError] = useState(false);

  const initialSite = FLYING_SITES.find((s) => s.id === 'babadag')!;

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

        const teleferikGeoJson = {
          type: 'Feature' as const,
          properties: {},
          geometry: {
            type: 'LineString' as const,
            coordinates: TELEFERIK_LINE,
          },
        };

        const glideGeoJson = {
          type: 'FeatureCollection' as const,
          features: GLIDE_CORRIDORS.map((c) => ({
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
              teleferik: { type: 'geojson', data: teleferikGeoJson },
              glides: { type: 'geojson', data: glideGeoJson },
            },
            terrain: {
              source: 'terrainSource',
              exaggeration: 1.65,
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
                id: 'teleferik-casing',
                type: 'line',
                source: 'teleferik',
                paint: { 'line-color': '#ffffff', 'line-width': 5, 'line-opacity': 0.85 },
              },
              {
                id: 'teleferik-line',
                type: 'line',
                source: 'teleferik',
                paint: {
                  'line-color': '#f59e0b',
                  'line-width': 3,
                  'line-dasharray': [2, 1.5],
                },
              },
              {
                id: 'glide-casing',
                type: 'line',
                source: 'glides',
                paint: { 'line-color': '#ffffff', 'line-width': 5, 'line-opacity': 0.7 },
              },
              {
                id: 'glide-lines',
                type: 'line',
                source: 'glides',
                paint: {
                  'line-color': '#06b6d4',
                  'line-width': 3,
                  'line-dasharray': [3, 2],
                },
              },
            ],
          },
          center: initialSite.coordinates,
          zoom: initialSite.zoom,
          pitch: initialSite.pitch,
          bearing: initialSite.bearing,
          maxPitch: 75,
          attributionControl: false,
        });

        mapInstance.addControl(
          new maplibregl.NavigationControl({ visualizePitch: true }),
          'top-right'
        );
        mapRef.current = mapInstance;

        markersRef.current = FLIGHT_MAP_POINTS.map((pt) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.title = pt.title[locale] || pt.title.en;
          btn.textContent =
            pt.kind === 'teleferik'
              ? 'T'
              : pt.kind === 'landing'
              ? 'LZ'
              : pt.kind === 'siv'
              ? 'SIV'
              : `${pt.altitudeM >= 1000 ? `${(pt.altitudeM / 1000).toFixed(1)}k` : pt.altitudeM}`;

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
      markersRef.current.forEach((m) => m.marker.remove());
      markersRef.current = [];
      if (mapInstance) mapInstance.remove();
      mapRef.current = null;
    };
  }, [initialSite.bearing, initialSite.coordinates, initialSite.pitch, initialSite.zoom, locale]);

  // Fly camera when active site changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const isTopo = viewModeRef.current === 'topo';
    if (activeSiteId === 'all') {
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
    const site = FLYING_SITES.find((s) => s.id === activeSiteId);
    if (site) {
      map.flyTo({
        center: site.coordinates,
        zoom: site.zoom,
        pitch: isTopo ? 0 : site.pitch,
        bearing: isTopo ? 0 : site.bearing,
        speed: 1.0,
        essential: true,
      });
    }
  }, [activeSiteId]);

  // Highlight & focus point when changed externally
  useEffect(() => {
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
    const pt = FLIGHT_MAP_POINTS.find((p) => p.id === focusedPointId);
    if (!pt) return;

    if (popupRef.current) popupRef.current.remove();
    popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
      .setLngLat(pt.coordinates)
      .setHTML(buildPopupHtml(pt, locale, ui))
      .addTo(map);

    map.flyTo({
      center: pt.coordinates,
      zoom: pt.siteId === 'babadag' ? 13.4 : 13.1,
      pitch: viewModeRef.current === 'topo' ? 0 : 62,
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
    map.setTerrain(isTopo ? null : { source: 'terrainSource', exaggeration: 1.65 });
    const site = FLYING_SITES.find((s) => s.id === activeSiteId);
    map.flyTo({
      pitch: isTopo ? 0 : site?.pitch ?? 58,
      bearing: isTopo ? 0 : site?.bearing ?? 0,
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
              onSelectSite('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
              activeSiteId === 'all'
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
        <div className="h-[390px] sm:h-[440px] flex flex-col items-center justify-center p-6 text-center bg-slate-900/95 space-y-3">
          <FaMapMarkedAlt className="text-4xl text-cyan-400" />
          <p className="font-bold text-sm text-white">{ui.fallbackTitle}</p>
          <p className="text-xs text-slate-400 max-w-md">{ui.fallbackDesc}</p>
          <a
            href="https://maps.google.com/?q=36.5401,29.1690"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white"
          >
            <FaExternalLinkAlt size={10} /> {ui.openGmaps}
          </a>
        </div>
      ) : (
        <div ref={containerRef} className="w-full h-[390px] sm:h-[440px] bg-slate-950" />
      )}

      {/* Legend */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 ring-1 ring-white/50" />
            {ui.legendTakeoff}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-1 ring-white/50" />
            {ui.legendLanding}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-3 h-0.5 bg-amber-500 inline-block" />
            {ui.legendTeleferik}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-1 ring-white/50" />
            {ui.legendSiv}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-3 h-0.5 bg-cyan-400 inline-block" />
            {ui.legendGlide}
          </span>
        </div>
        <span className="text-slate-400 font-medium">{ui.controlsHint}</span>
      </div>
    </div>
  );
}
