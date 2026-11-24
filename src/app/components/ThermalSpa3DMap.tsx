"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FaCube, FaLayerGroup, FaMapMarkedAlt } from 'react-icons/fa';
import LeafletFallbackMap, {
  type LeafletCameraTarget,
  type LeafletMarkerItem,
} from './LeafletFallbackMap';
import {
  attachWebGLLossHandler,
  detectWebGLSupport,
  FALLBACK_2D_LABELS,
} from '@/lib/map-webgl';
import {
  THERMAL_MAP_POINTS,
  THERMAL_REGION_PRESETS,
  type LocaleCode,
  type ThermalMapPoint,
  type ThermalMapPointKind,
  type ThermalRegionId,
} from '@/lib/thermal-spa';

interface ThermalSpa3DMapProps {
  locale: LocaleCode;
  activeRegionId: ThermalRegionId | 'all';
  focusedPointId: string | null;
  onSelectPoint: (pointId: string) => void;
  onSelectRegion: (regionId: ThermalRegionId | 'all') => void;
}

const REGION_OVERVIEW = {
  center: [28.60, 37.12] as [number, number],
  zoom: 7.3,
  pitch: 28,
  bearing: 0,
};

const KIND_COLORS: Record<ThermalMapPointKind, string> = {
  'hot-spring': '#ea580c', // orange-600
  'mud-bath': '#b45309',   // amber-700
  hammam: '#0891b2',       // cyan-600
  'spa-resort': '#7c3aed', // violet-600
};

const MAP_UI: Record<
  LocaleCode,
  {
    badge3d: string;
    btnAll: string;
    btn3dSat: string;
    btn2dTopo: string;
    legendHot: string;
    legendMud: string;
    legendHammam: string;
    legendSpa: string;
    kindLabels: Record<ThermalMapPointKind, string>;
    tempLabel: string;
    openGmaps: string;
    controlsHint: string;
    fallbackTitle: string;
    fallbackDesc: string;
  }
> = {
  ru: {
    badge3d: 'Интерактивная 3D-карта горячих источников, грязей и хаммамов',
    btnAll: 'Весь регион + Памуккале',
    btn3dSat: '3D-Рельеф',
    btn2dTopo: 'Топокарта (2D)',
    legendHot: 'Горячий источник (°C)',
    legendMud: 'Грязи / Бухта (MUD)',
    legendHammam: 'Исторический хаммам (H)',
    legendSpa: 'СПА-курорт (SPA)',
    kindLabels: {
      'hot-spring': 'Геотермальный источник',
      'mud-bath': 'Грязевые ванны / Бухта',
      hammam: 'Турецкий хаммам',
      'spa-resort': 'Термальный / Бутик-СПА',
    },
    tempLabel: 'Температура / Тип',
    openGmaps: 'Google Maps',
    controlsHint: 'ЛКМ — сдвиг · ПКМ / Ctrl+ЛКМ — наклон 3D-озёр и гор · Клик по пинам',
    fallbackTitle: '3D-карта недоступна в текущем браузере (нет WebGL)',
    fallbackDesc: 'Используйте карточки горячих источников и хаммамов ниже с прямыми ссылками Google Maps.',
  },
  en: {
    badge3d: 'Interactive 3D Hot Springs, Mud Baths & Hammams Map',
    btnAll: 'Full Region + Pamukkale',
    btn3dSat: '3D Terrain',
    btn2dTopo: '2D Topo',
    legendHot: 'Hot Spring (°C)',
    legendMud: 'Mud Baths / Ruins (MUD)',
    legendHammam: 'Historic Hammam (H)',
    legendSpa: 'Spa Resort (SPA)',
    kindLabels: {
      'hot-spring': 'Geothermal Hot Spring',
      'mud-bath': 'Peloid Mud / Ruin Bay',
      hammam: 'Traditional Turkish Hammam',
      'spa-resort': 'Thermal / Boutique Spa',
    },
    tempLabel: 'Temp / Type',
    openGmaps: 'Google Maps',
    controlsHint: 'Drag to pan · Right-click / Ctrl+Drag to tilt 3D lakes & hills · Tap pins',
    fallbackTitle: '3D WebGL view is unavailable in this browser',
    fallbackDesc: 'Browse the thermal spring cards below with exact temperatures and Google Maps links.',
  },
  de: {
    badge3d: 'Interaktive 3D-Karte: Thermalquellen, Schlammbäder & Hamams',
    btnAll: 'Ganze Region + Pamukkale',
    btn3dSat: '3D-Relief',
    btn2dTopo: '2D Topo',
    legendHot: 'Thermalquelle (°C)',
    legendMud: 'Schlammbad / Bucht (MUD)',
    legendHammam: 'Historisches Hamam (H)',
    legendSpa: 'Spa-Resort (SPA)',
    kindLabels: {
      'hot-spring': 'Geothermische Quelle',
      'mud-bath': 'Schlammbad / Antike Bucht',
      hammam: 'Türkisches Hamam',
      'spa-resort': 'Thermal- / Boutique-Spa',
    },
    tempLabel: 'Temp. / Art',
    openGmaps: 'Google Maps',
    controlsHint: 'Ziehen = Bewegen · Rechtsklick / Strg+Ziehen = 3D-Landschaft kippen · Pins antippen',
    fallbackTitle: '3D-WebGL-Ansicht in diesem Browser nicht verfügbar',
    fallbackDesc: 'Nutzen Sie die Thermalquellen-Karten unten mit exakten Angaben und Google-Maps-Links.',
  },
  tr: {
    badge3d: 'İnteraktif 3D Kaplıca, Çamur Banyosu ve Hamam Haritası',
    btnAll: 'Tüm Bölge + Pamukkale',
    btn3dSat: '3D Arazi',
    btn2dTopo: '2D Topo',
    legendHot: 'Sıcak Kaplıca (°C)',
    legendMud: 'Çamur / Antik Koy (MUD)',
    legendHammam: 'Tarihî Hamam (H)',
    legendSpa: 'Termal / Butik Spa (SPA)',
    kindLabels: {
      'hot-spring': 'Doğal Termal Kaynak',
      'mud-bath': 'Çamur Banyosu / Koy',
      hammam: 'Geleneksel Türk Hamamı',
      'spa-resort': 'Termal / Butik Spa',
    },
    tempLabel: 'Sıcaklık / Tip',
    openGmaps: 'Google Haritalar',
    controlsHint: 'Sürükle = Gezin · Sağ tık / Ctrl+Sürükle = 3D göl ve dağları eğ · Noktalara tıkla',
    fallbackTitle: 'Bu tarayıcıda 3D WebGL görünümü desteklenmiyor',
    fallbackDesc: 'Aşağıdaki kaplıca ve hamam kartlarındaki Google Haritalar bağlantılarını kullanabilirsiniz.',
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPopupHtml(point: ThermalMapPoint, locale: LocaleCode, ui: (typeof MAP_UI)['en']): string {
  const color = KIND_COLORS[point.kind];
  const title = point.title[locale] || point.title.en;
  const minerals = point.mineralsOrStyle[locale] || point.mineralsOrStyle.en;
  const note = point.note[locale] || point.note.en;

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:265px;padding:2px;">
      <div style="display:inline-block;padding:2px 8px;border-radius:9999px;background:${color};color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">
        ${escapeHtml(ui.kindLabels[point.kind])}
      </div>
      <div style="font-size:13px;font-weight:800;color:#0f172a;line-height:1.25;margin-bottom:4px;">
        ${escapeHtml(title)}
      </div>
      <div style="font-size:11px;font-weight:700;color:#c2410c;margin-bottom:3px;">
        ${escapeHtml(ui.tempLabel)}: ${escapeHtml(point.tempOrType)}
      </div>
      <div style="font-size:10.5px;font-weight:700;color:#0e7490;margin-bottom:5px;">
        ${escapeHtml(minerals)}
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

export default function ThermalSpa3DMap({
  locale,
  activeRegionId,
  focusedPointId,
  onSelectPoint,
  onSelectRegion,
}: ThermalSpa3DMapProps) {
  const ui = MAP_UI[locale] || MAP_UI.en;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const maplibreRef = useRef<any>(null);
  const markersRef = useRef<{ id: string; marker: any; btn: HTMLButtonElement; kind: ThermalMapPointKind }[]>([]);
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
  const prevRegionRef = useRef(activeRegionId);
  const prevPointRef = useRef(focusedPointId);

  const fbCopy = FALLBACK_2D_LABELS[locale] || FALLBACK_2D_LABELS.en;
  const initialPreset = THERMAL_REGION_PRESETS.find((r) => r.id === 'sultaniye')!;
  const fallbackInitialPreset = THERMAL_REGION_PRESETS.find((r) => r.id === activeRegionId);

  const fallbackMarkers = useMemo<LeafletMarkerItem[]>(() => {
    return THERMAL_MAP_POINTS.map((pt) => ({
      id: pt.id,
      coordinates: pt.coordinates,
      label:
        pt.kind === 'hot-spring'
          ? '°C'
          : pt.kind === 'mud-bath'
          ? 'MUD'
          : pt.kind === 'hammam'
          ? 'H'
          : 'SPA',
      title: pt.title[locale] || pt.title.en,
      color: KIND_COLORS[pt.kind],
      minWidth: 30,
      height: 28,
      paddingX: 6,
      fontSize: 10,
      active: pt.id === focusedPointId,
      activeRingColor: 'rgba(251,146,60,0.8)',
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
            ],
          },
          center: initialPreset.coordinates,
          zoom: initialPreset.zoom,
          pitch: initialPreset.pitch,
          bearing: initialPreset.bearing,
          maxPitch: 75,
          attributionControl: false,
        });

        mapInstance.addControl(
          new maplibregl.NavigationControl({ visualizePitch: true }),
          'top-right'
        );
        mapRef.current = mapInstance;

        markersRef.current = THERMAL_MAP_POINTS.map((pt) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.title = pt.title[locale] || pt.title.en;
          btn.textContent =
            pt.kind === 'hot-spring'
              ? '°C'
              : pt.kind === 'mud-bath'
              ? 'MUD'
              : pt.kind === 'hammam'
              ? 'H'
              : 'SPA';

          btn.style.cssText = [
            'min-width:30px',
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
            console.warn('[ThermalSpa3DMap] MapLibre WebGL error:', ev.error);
            if (!isCancelled) setWebglError(true);
          }
        });
      } catch (err) {
        console.warn('[ThermalSpa3DMap] WebGL init failed, switching to 2D Leaflet:', err);
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
  }, [initialPreset.bearing, initialPreset.coordinates, initialPreset.pitch, initialPreset.zoom, locale, webglError]);

  // Fly camera when region changes
  useEffect(() => {
    const regionChanged = prevRegionRef.current !== activeRegionId;
    prevRegionRef.current = activeRegionId;

    if (regionChanged) {
      fallbackNonceRef.current += 1;
      if (activeRegionId === 'all') {
        setFallbackCameraTarget({
          nonce: fallbackNonceRef.current,
          mode: 'flyTo',
          center: REGION_OVERVIEW.center,
          zoom: REGION_OVERVIEW.zoom,
        });
      } else {
        const preset = THERMAL_REGION_PRESETS.find((r) => r.id === activeRegionId);
        if (preset) {
          setFallbackCameraTarget({
            nonce: fallbackNonceRef.current,
            mode: 'flyTo',
            center: preset.coordinates,
            zoom: preset.zoom,
          });
        }
      }
    }

    const map = mapRef.current;
    if (!map) return;
    const isTopo = viewModeRef.current === 'topo';
    if (activeRegionId === 'all') {
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
    const preset = THERMAL_REGION_PRESETS.find((r) => r.id === activeRegionId);
    if (preset) {
      map.flyTo({
        center: preset.coordinates,
        zoom: preset.zoom,
        pitch: isTopo ? 0 : preset.pitch,
        bearing: isTopo ? 0 : preset.bearing,
        speed: 1.0,
        essential: true,
      });
    }
  }, [activeRegionId]);

  // Highlight & focus point when changed externally
  useEffect(() => {
    const pointChanged = prevPointRef.current !== focusedPointId;
    prevPointRef.current = focusedPointId;

    if (pointChanged && focusedPointId) {
      const pt = THERMAL_MAP_POINTS.find((p) => p.id === focusedPointId);
      if (pt) {
        fallbackNonceRef.current += 1;
        setFallbackCameraTarget({
          nonce: fallbackNonceRef.current,
          mode: 'flyTo',
          center: pt.coordinates,
          zoom: pt.regionId === 'pamukkale' ? 12.2 : 13.1,
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
        ? '0 0 0 4px rgba(251,146,60,0.8), 0 6px 16px rgba(0,0,0,0.5)'
        : '0 4px 12px rgba(0,0,0,0.45)';
      btn.style.zIndex = active ? '10' : '1';
    });

    if (!focusedPointId || !map || !maplibregl) return;
    const pt = THERMAL_MAP_POINTS.find((p) => p.id === focusedPointId);
    if (!pt) return;

    if (popupRef.current) popupRef.current.remove();
    popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
      .setLngLat(pt.coordinates)
      .setHTML(buildPopupHtml(pt, locale, ui))
      .addTo(map);

    map.flyTo({
      center: pt.coordinates,
      zoom: pt.regionId === 'pamukkale' ? 12.2 : 13.1,
      pitch: viewModeRef.current === 'topo' ? 0 : 45,
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
    const preset = THERMAL_REGION_PRESETS.find((r) => r.id === activeRegionId);
    map.flyTo({
      pitch: isTopo ? 0 : preset?.pitch ?? 42,
      bearing: isTopo ? 0 : preset?.bearing ?? 0,
      speed: 0.9,
      essential: true,
    });
  };

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
            onClick={() => {
              if (popupRef.current) popupRef.current.remove();
              if (activeRegionId === 'all') {
                fallbackNonceRef.current += 1;
                setFallbackCameraTarget({
                  nonce: fallbackNonceRef.current,
                  mode: 'flyTo',
                  center: REGION_OVERVIEW.center,
                  zoom: REGION_OVERVIEW.zoom,
                });
              }
              onSelectRegion('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
              activeRegionId === 'all'
                ? 'bg-amber-500 text-slate-950'
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
            activeRegionId === 'all'
              ? REGION_OVERVIEW.center
              : fallbackInitialPreset?.coordinates ?? initialPreset.coordinates
          }
          initialZoom={
            activeRegionId === 'all'
              ? REGION_OVERVIEW.zoom
              : fallbackInitialPreset?.zoom ?? initialPreset.zoom
          }
          cameraTarget={fallbackCameraTarget}
          markers={fallbackMarkers}
          activePopupId={focusedPointId}
          popupNonce={fallbackPopupNonce}
          onSelectMarker={onSelectPoint}
          heightClassName="h-[390px] sm:h-[440px]"
          fallbackBadgeText={fbCopy.badge}
          retry3dLabel={fbCopy.retry3d}
          onRetry3d={() => setWebglError(false)}
          emergencyMapsUrl="https://maps.google.com/?q=36.8737,28.6026"
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
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600 ring-1 ring-white/50" />
            {ui.legendHot}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-700 ring-1 ring-white/50" />
            {ui.legendMud}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 ring-1 ring-white/50" />
            {ui.legendHammam}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-600 ring-1 ring-white/50" />
            {ui.legendSpa}
          </span>
        </div>
        <span className="text-slate-400 font-medium">{ui.controlsHint}</span>
      </div>
    </div>
  );
}
