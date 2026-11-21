"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FaCube, FaDownload, FaExternalLinkAlt, FaLayerGroup, FaMapMarkedAlt } from 'react-icons/fa';
import type { LocaleCode } from '@/lib/trekking-data';
import type { ProfileWaypointItem } from './TrailElevationProfile';

interface Trail3DViewerProps {
  trailId: string;
  trailName: string;
  points: [number, number, number, number][];
  sideBranchSogukSu: [number, number, number][];
  waypoints: ProfileWaypointItem[];
  activeWaypointIdx: number | null;
  onSelectWaypoint: (idx: number) => void;
  mapsUrl: string;
  attribution: string;
  locale: LocaleCode;
}

type ViewPreset = 'overview' | 'start' | 'finish' | 'topo';

const UI_COPY: Record<
  LocaleCode,
  {
    badge3d: string;
    presetOverview: string;
    presetStart: string;
    presetFinish: string;
    presetTopo: string;
    downloadGpx: string;
    openGoogleMaps: string;
    legendMain: string;
    legendBranch: string;
    controlsHint: string;
    fallbackTitle: string;
    fallbackDesc: string;
    mUnit: string;
    kmUnit: string;
  }
> = {
  ru: {
    badge3d: 'Интерактивная 3D-карта полёта птицы',
    presetOverview: 'Весь трек (3D)',
    presetStart: 'Старт: Каякёй и гребень',
    presetFinish: 'Финиш: лагуна Олюдениз',
    presetTopo: 'Топокарта (2D)',
    downloadGpx: 'Скачать GPX',
    openGoogleMaps: 'Google Maps',
    legendMain: 'Основной трек OSM (5,3 км)',
    legendBranch: 'Ветка в бухту Soğuk Su (+1,7 км)',
    controlsHint: 'ЛКМ — сдвиг · ПКМ / Ctrl+ЛКМ — наклон и поворот 3D-рельефа · Клик 1–7 — точка',
    fallbackTitle: '3D-карта недоступна в текущем браузере (нет WebGL)',
    fallbackDesc: 'Вы можете скачать реальный GPX-трек OpenStreetMap или открыть маршрут в Google Maps.',
    mUnit: 'м',
    kmUnit: 'км',
  },
  en: {
    badge3d: 'Interactive 3D Bird’s-Eye Map',
    presetOverview: 'Full Trail (3D)',
    presetStart: 'Start: Kayaköy & Crest',
    presetFinish: 'Finish: Ölüdeniz Lagoon',
    presetTopo: 'Topo Map (2D)',
    downloadGpx: 'Download GPX',
    openGoogleMaps: 'Google Maps',
    legendMain: 'Main OSM Track (5.3 km)',
    legendBranch: 'Soğuk Su Cove Branch (+1.7 km)',
    controlsHint: 'Drag to pan · Right-click / Ctrl+Drag to tilt & rotate 3D terrain · Click pins 1–7',
    fallbackTitle: '3D WebGL view is unavailable in this browser',
    fallbackDesc: 'You can still download the verified OpenStreetMap GPX file or open the trail in Google Maps.',
    mUnit: 'm',
    kmUnit: 'km',
  },
  de: {
    badge3d: 'Interaktive 3D-Vogelperspektive',
    presetOverview: 'Gesamtroute (3D)',
    presetStart: 'Start: Kayaköy & Kamm',
    presetFinish: 'Ziel: Lagune Ölüdeniz',
    presetTopo: 'Topo-Karte (2D)',
    downloadGpx: 'GPX laden',
    openGoogleMaps: 'Google Maps',
    legendMain: 'Haupttrack OSM (5,3 km)',
    legendBranch: 'Abzweig Soğuk Su (+1,7 km)',
    controlsHint: 'Ziehen = Bewegen · Rechtsklick / Strg+Ziehen = 3D-Ansicht kippen · Klick auf 1–7',
    fallbackTitle: '3D-WebGL-Ansicht wird von diesem Browser nicht unterstützt',
    fallbackDesc: 'Sie können den verifizierten OpenStreetMap-GPX-Track herunterladen oder Google Maps öffnen.',
    mUnit: 'm',
    kmUnit: 'km',
  },
  tr: {
    badge3d: 'İnteraktif 3D Kuş Bakışı Harita',
    presetOverview: 'Tüm Parkur (3D)',
    presetStart: 'Başlangıç: Kayaköy & Sırt',
    presetFinish: 'Bitiş: Ölüdeniz Lagünü',
    presetTopo: 'Topo Harita (2D)',
    downloadGpx: 'GPX İndir',
    openGoogleMaps: 'Google Maps',
    legendMain: 'Ana OSM Parkuru (5,3 km)',
    legendBranch: 'Soğuk Su Koyu Ayrımı (+1,7 km)',
    controlsHint: 'Sürükle = Gezin · Sağ tık / Ctrl+Sürükle = 3D eğim & döndürme · 1–7 noktalarına tıkla',
    fallbackTitle: 'Bu tarayıcıda 3D WebGL desteği kullanılamıyor',
    fallbackDesc: 'Doğrulanmış OpenStreetMap GPX dosyasını indirebilir veya Google Haritalar’da açabilirsiniz.',
    mUnit: 'm',
    kmUnit: 'km',
  },
};

const PRESET_VIEWS: Record<
  ViewPreset,
  { center: [number, number]; zoom: number; pitch: number; bearing: number }
> = {
  overview: { center: [29.1035, 36.562], zoom: 13.7, pitch: 62, bearing: 40 },
  start: { center: [29.0926, 36.5715], zoom: 15.1, pitch: 65, bearing: 120 },
  finish: { center: [29.1115, 36.5535], zoom: 14.8, pitch: 64, bearing: 115 },
  topo: { center: [29.1035, 36.562], zoom: 13.8, pitch: 0, bearing: 0 },
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
  const html = `
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
  popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
    .setLngLat([wp.lon, wp.lat])
    .setHTML(html)
    .addTo(map);
}

export default function Trail3DViewer({
  trailId,
  trailName,
  points,
  sideBranchSogukSu,
  waypoints,
  activeWaypointIdx,
  onSelectWaypoint,
  mapsUrl,
  attribution,
  locale,
}: Trail3DViewerProps) {
  const t = UI_COPY[locale] || UI_COPY.en;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const maplibreRef = useRef<any>(null);
  const markerElsRef = useRef<HTMLButtonElement[]>([]);
  const popupRef = useRef<any>(null);
  const onSelectRef = useRef(onSelectWaypoint);
  onSelectRef.current = onSelectWaypoint;

  const [activePreset, setActivePreset] = useState<ViewPreset>('overview');
  const [webglError, setWebglError] = useState(false);

  const activePresetRef = useRef<ViewPreset>(activePreset);
  activePresetRef.current = activePreset;
  const unitsRef = useRef({ kmUnit: t.kmUnit, mUnit: t.mUnit });
  unitsRef.current = { kmUnit: t.kmUnit, mUnit: t.mUnit };

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
          properties: { name: 'Soğuk Su Koyu Branch' },
          geometry: {
            type: 'LineString',
            coordinates: sideBranchSogukSu.map((p) => [p[0], p[1]]),
          },
        };

        const styleConfig: any = {
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
            'main-trail': {
              type: 'geojson',
              data: mainLineGeoJson,
            },
            'branch-trail': {
              type: 'geojson',
              data: branchLineGeoJson,
            },
          },
          terrain: {
            source: 'terrainSource',
            exaggeration: 1.8,
          },
          layers: [
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
            },
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
            },
          ],
        };

        mapInstance = new maplibregl.Map({
          container: containerRef.current,
          style: styleConfig,
          ...PRESET_VIEWS.overview,
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

        mapInstance.on('error', (ev: any) => {
          // Ignore single tile errors; only fallback if context creation itself fails
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
      if (popupRef.current) popupRef.current.remove();
      if (mapInstance) {
        mapInstance.remove();
      }
      mapRef.current = null;
      markerElsRef.current = [];
    };
  }, [points, sideBranchSogukSu, trailName, waypoints]);

  // Sync active waypoint highlight & fly camera when changed externally (e.g., from elevation profile)
  useEffect(() => {
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
    const map = mapRef.current;
    if (!map) return;

    const isTopo = preset === 'topo';
    if (map.getLayer('esri-satellite') && map.getLayer('opentopo-layer')) {
      map.setLayoutProperty('esri-satellite', 'visibility', isTopo ? 'none' : 'visible');
      map.setLayoutProperty('opentopo-layer', 'visibility', isTopo ? 'visible' : 'none');
    }
    map.setTerrain(isTopo ? null : { source: 'terrainSource', exaggeration: 1.8 });

    map.flyTo({
      ...PRESET_VIEWS[preset],
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

    const branchTrkPts = sideBranchSogukSu
      .map(
        ([lon, lat, ele]) =>
          `      <trkpt lat="${lat.toFixed(6)}" lon="${lon.toFixed(6)}"><ele>${ele}</ele></trkpt>`
      )
      .join('\n');

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
      `  </trk>\n` +
      `  <trk>\n` +
      `    <name>Soğuk Su Koyu Branch (Cold Water Bay)</name>\n` +
      `    <trkseg>\n` +
      `${branchTrkPts}\n` +
      `    </trkseg>\n` +
      `  </trk>\n` +
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
                { id: 'start', label: t.presetStart },
                { id: 'finish', label: t.presetFinish },
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
      {webglError ? (
        <div className="p-8 sm:p-12 text-center bg-slate-950/70 space-y-4">
          <FaMapMarkedAlt className="mx-auto text-4xl text-cyan-400" />
          <h4 className="text-base font-bold text-white">{t.fallbackTitle}</h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">{t.fallbackDesc}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleDownloadGpx}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
            >
              <FaDownload size={11} /> {t.downloadGpx}
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700"
            >
              <FaExternalLinkAlt size={10} /> {t.openGoogleMaps}
            </a>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] bg-slate-950">
          <div ref={containerRef} className="w-full h-full" />

          {/* Floating Legend */}
          <div className="absolute left-3 top-3 z-10 bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 text-[11px] space-y-1 pointer-events-none">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-4 h-1 rounded bg-red-500 inline-block" />
              <span>{t.legendMain}</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-200 font-semibold">
              <span className="w-4 border-t-2 border-dashed border-cyan-400 inline-block" />
              <span>{t.legendBranch}</span>
            </div>
          </div>

          {/* Bottom Interaction Hint */}
          <div className="hidden sm:block absolute left-3 bottom-3 z-10 bg-slate-900/80 backdrop-blur-md border border-white/15 rounded-lg px-2.5 py-1 text-[11px] text-slate-300 pointer-events-none">
            {t.controlsHint}
          </div>
        </div>
      )}

      {/* Mandatory ODbL / DEM Attribution Bar */}
      <div className="px-4 py-2 bg-slate-950 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
        <span>{attribution}</span>
        <span>Esri World Imagery / OpenTopoMap / AWS Terrarium DEM</span>
      </div>
    </div>
  );
}
