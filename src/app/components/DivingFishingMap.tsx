"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FaBan, FaCompass, FaExternalLinkAlt, FaFish, FaLayerGroup, FaMapMarkedAlt, FaWater } from 'react-icons/fa';
import {
  COASTAL_SPOTS,
  COAST_ZONES,
  type CoastZoneId,
  type CoastalSpot,
  type LocaleCode,
  type SpotCategory,
} from '@/lib/diving-fishing';

interface DivingFishingMapProps {
  locale: LocaleCode;
  selectedZone: 'all' | CoastZoneId;
  categoryFilter: 'all' | SpotCategory;
  selectedSpotId: string | null;
  onSelectSpot: (spotId: string) => void;
  onResetAll: () => void;
}

const REGION_OVERVIEW = {
  center: [28.62, 36.53] as [number, number],
  zoom: 8.15,
};

const CATEGORY_COLORS: Record<SpotCategory, string> = {
  diving: '#0891b2',     // cyan-600
  fishing: '#d97706',    // amber-600
  both: '#0d9488',       // teal-600
  restricted: '#e11d48', // rose-600
};

const MAP_COPY: Record<
  LocaleCode,
  {
    badge: string;
    fullCoast: string;
    satellite: string;
    topo: string;
    legendDiving: string;
    legendFishing: string;
    legendBoth: string;
    legendRestricted: string;
    catLabels: Record<SpotCategory, string>;
    openGoogleMaps: string;
    jumpToSpot: string;
    hint: string;
    fallbackTitle: string;
    fallbackDesc: string;
  }
> = {
  ru: {
    badge: 'Интерактивная морская карта Датча — Каш',
    fullCoast: 'Весь берег (16)',
    satellite: 'Спутник',
    topo: 'Карта рельефа',
    legendDiving: 'Дайвинг / Снорклинг',
    legendFishing: 'Рыбалка',
    legendBoth: 'Обе активности',
    legendRestricted: 'Заповедник / Запрет',
    catLabels: {
      diving: 'Дайвинг и снорклинг',
      fishing: 'Морская и береговая рыбалка',
      both: 'Дайвинг + Рыбалка',
      restricted: 'Особо охраняемая / закрытая зона',
    },
    openGoogleMaps: 'Google Maps',
    jumpToSpot: 'Карточка спота ↓',
    hint: 'Клик по маркеру открывает описание спота · Колёсико — масштаб',
    fallbackTitle: 'Интерактивная карта недоступна в этом браузере (нет WebGL)',
    fallbackDesc: 'Используйте переключатель 4 зон справа и ссылки на Google Maps в карточках спотов ниже.',
  },
  en: {
    badge: 'Interactive Coastal Spot Map · Datça to Kaş',
    fullCoast: 'Full Coast (16)',
    satellite: 'Satellite',
    topo: 'Topo Map',
    legendDiving: 'Diving / Snorkel',
    legendFishing: 'Fishing',
    legendBoth: 'Both',
    legendRestricted: 'Protected / No-Take',
    catLabels: {
      diving: 'Diving & Snorkeling',
      fishing: 'Shore & Boat Fishing',
      both: 'Diving + Fishing',
      restricted: 'Protected Sanctuary / Restricted',
    },
    openGoogleMaps: 'Google Maps',
    jumpToSpot: 'View spot details ↓',
    hint: 'Click any pin for depth, legal status & GPS link · Scroll to zoom',
    fallbackTitle: 'WebGL map view is unavailable in this browser',
    fallbackDesc: 'Use the 4-zone switcher on the right and Google Maps links inside each spot card below.',
  },
  de: {
    badge: 'Interaktive Küstenkarte · Datça bis Kaş',
    fullCoast: 'Gesamte Küste (16)',
    satellite: 'Satellit',
    topo: 'Topokarte',
    legendDiving: 'Tauchen / Schnorcheln',
    legendFishing: 'Angeln',
    legendBoth: 'Beides',
    legendRestricted: 'Schutzzone / Sperre',
    catLabels: {
      diving: 'Tauchen & Schnorcheln',
      fishing: 'Küsten- & Bootsangeln',
      both: 'Tauchen + Angeln',
      restricted: 'Schutzgebiet / Sperrzone',
    },
    openGoogleMaps: 'Google Maps',
    jumpToSpot: 'Zur Spot-Karte ↓',
    hint: 'Marker anklicken für Tiefe, Schutzstatus & GPS-Link',
    fallbackTitle: 'WebGL-Kartenansicht wird in diesem Browser nicht unterstützt',
    fallbackDesc: 'Nutzen Sie die 4 Zonen rechts und die Google-Maps-Links in den Spot-Karten unten.',
  },
  tr: {
    badge: 'İnteraktif Kıyı Haritası · Datça’dan Kaş’a',
    fullCoast: 'Tüm Kıyı (16)',
    satellite: 'Uydu',
    topo: 'Topo Harita',
    legendDiving: 'Dalış / Şnorkel',
    legendFishing: 'Balıkçılık',
    legendBoth: 'Her İkisi',
    legendRestricted: 'Koruma / Yasak Alan',
    catLabels: {
      diving: 'Dalış ve Şnorkel',
      fishing: 'Kıyı ve Tekne Balıkçılığı',
      both: 'Dalış + Balıkçılık',
      restricted: 'Özel Koruma / Yasak Saha',
    },
    openGoogleMaps: 'Google Haritalar',
    jumpToSpot: 'Nokta detayına git ↓',
    hint: 'Derinlik, yasal durum ve harita linki için işaretçiye tıklayın',
    fallbackTitle: 'Bu tarayıcıda WebGL harita görünümü desteklenmiyor',
    fallbackDesc: 'Sağdaki 4 bölge seçicisini ve aşağıdaki nokta kartlarındaki Google Haritalar bağlantılarını kullanın.',
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPopupHtml(spot: CoastalSpot, locale: LocaleCode, t: (typeof MAP_COPY)['en']): string {
  const title = spot.title[locale] || spot.title.en;
  const depth = spot.depthOrMethod[locale] || spot.depthOrMethod.en;
  const catLabel = t.catLabels[spot.category];
  const color = CATEGORY_COLORS[spot.category];
  const note = spot.lawAndSafetyNote[locale] || spot.lawAndSafetyNote.en;

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:250px;padding:2px;">
      <div style="display:inline-block;padding:2px 8px;border-radius:9999px;background:${color};color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">
        ${escapeHtml(catLabel)}
      </div>
      <div style="font-size:13px;font-weight:800;color:#0f172a;line-height:1.25;margin-bottom:4px;">
        ${escapeHtml(title)}
      </div>
      <div style="font-size:11px;font-weight:700;color:#0e7490;margin-bottom:5px;">
        ${escapeHtml(depth)}
      </div>
      <div style="font-size:11px;color:#475569;line-height:1.35;margin-bottom:8px;">
        ${escapeHtml(note)}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;border-top:1px solid #e2e8f0;padding-top:6px;">
        <a href="#spot-${escapeHtml(spot.id)}" style="font-size:11px;font-weight:800;color:#0891b2;text-decoration:none;">
          ${escapeHtml(t.jumpToSpot)}
        </a>
        <a href="${escapeHtml(spot.mapsUrl)}" target="_blank" rel="noopener noreferrer" style="font-size:11px;font-weight:700;color:#334155;text-decoration:underline;">
          ${escapeHtml(t.openGoogleMaps)} ↗
        </a>
      </div>
    </div>
  `;
}

export default function DivingFishingMap({
  locale,
  selectedZone,
  categoryFilter,
  selectedSpotId,
  onSelectSpot,
  onResetAll,
}: DivingFishingMapProps) {
  const t = MAP_COPY[locale] || MAP_COPY.en;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const maplibreRef = useRef<any>(null);
  const markersRef = useRef<{ spotId: string; marker: any; btn: HTMLButtonElement; category: SpotCategory }[]>([]);
  const popupRef = useRef<any>(null);
  const onSelectSpotRef = useRef(onSelectSpot);
  onSelectSpotRef.current = onSelectSpot;

  const [baseLayer, setBaseLayer] = useState<'satellite' | 'topo'>('satellite');
  const [webglError, setWebglError] = useState(false);

  // Initialize MapLibre once
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
          attributionControl: false,
        });

        mapInstance.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');
        mapRef.current = mapInstance;

        markersRef.current = COASTAL_SPOTS.map((spot, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.title = spot.title[locale] || spot.title.en;
          btn.textContent = spot.category === 'restricted' ? '!' : String(idx + 1);
          btn.style.cssText = [
            'width:28px',
            'height:28px',
            'border-radius:9999px',
            `background:${CATEGORY_COLORS[spot.category]}`,
            'color:#ffffff',
            'border:2.5px solid #ffffff',
            'font-size:11px',
            'font-weight:800',
            'cursor:pointer',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'box-shadow:0 4px 12px rgba(0,0,0,0.45)',
            'transition:transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease',
          ].join(';');

          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            onSelectSpotRef.current(spot.id);
            if (popupRef.current) popupRef.current.remove();
            popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
              .setLngLat(spot.coordinates)
              .setHTML(buildPopupHtml(spot, locale, MAP_COPY[locale] || MAP_COPY.en))
              .addTo(mapInstance);
          });

          const marker = new maplibregl.Marker({ element: btn, anchor: 'center' })
            .setLngLat(spot.coordinates)
            .addTo(mapInstance);

          return { spotId: spot.id, marker, btn, category: spot.category };
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
  }, [locale]);

  // Update visible markers when filters or selected spot change
  useEffect(() => {
    markersRef.current.forEach(({ spotId, btn, category }) => {
      const spot = COASTAL_SPOTS.find((s) => s.id === spotId);
      if (!spot) return;

      const matchesZone = selectedZone === 'all' || spot.zoneId === selectedZone;
      const matchesCat =
        categoryFilter === 'all' ||
        category === categoryFilter ||
        (categoryFilter === 'diving' && category === 'both') ||
        (categoryFilter === 'fishing' && category === 'both');

      const visible = matchesZone && matchesCat;
      btn.style.display = visible ? 'flex' : 'none';

      const isActive = spotId === selectedSpotId;
      btn.style.transform = isActive ? 'scale(1.28)' : 'scale(1)';
      btn.style.boxShadow = isActive
        ? '0 0 0 4px rgba(103, 232, 249, 0.75), 0 6px 16px rgba(0,0,0,0.5)'
        : '0 4px 12px rgba(0,0,0,0.45)';
      btn.style.zIndex = isActive ? '10' : '1';
    });
  }, [selectedZone, categoryFilter, selectedSpotId]);

  // Fly camera when zone changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (selectedZone === 'all') {
      map.flyTo({ center: REGION_OVERVIEW.center, zoom: REGION_OVERVIEW.zoom, speed: 1.0, essential: true });
      return;
    }
    const zone = COAST_ZONES.find((z) => z.id === selectedZone);
    if (zone) {
      map.flyTo({ center: zone.center, zoom: zone.zoom, speed: 1.05, essential: true });
    }
  }, [selectedZone]);

  // Fly & open popup when selectedSpotId changes externally
  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = maplibreRef.current;
    if (!map || !maplibregl || !selectedSpotId) return;

    const spot = COASTAL_SPOTS.find((s) => s.id === selectedSpotId);
    if (!spot) return;

    if (popupRef.current) popupRef.current.remove();
    popupRef.current = new maplibregl.Popup({ offset: 18, closeButton: true })
      .setLngLat(spot.coordinates)
      .setHTML(buildPopupHtml(spot, locale, t))
      .addTo(map);

    map.flyTo({ center: spot.coordinates, zoom: 11.8, speed: 1.0, essential: true });
  }, [selectedSpotId, locale, t]);

  const handleToggleLayer = (next: 'satellite' | 'topo') => {
    setBaseLayer(next);
    const map = mapRef.current;
    if (!map) return;
    if (map.getLayer('esri-satellite') && map.getLayer('opentopo-layer')) {
      map.setLayoutProperty('esri-satellite', 'visibility', next === 'satellite' ? 'visible' : 'none');
      map.setLayoutProperty('opentopo-layer', 'visibility', next === 'topo' ? 'visible' : 'none');
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300">
          <FaCompass /> {t.badge}
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleToggleLayer('satellite')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              baseLayer === 'satellite'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FaLayerGroup size={10} /> {t.satellite}
          </button>
          <button
            type="button"
            onClick={() => handleToggleLayer('topo')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              baseLayer === 'topo'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FaMapMarkedAlt size={10} /> {t.topo}
          </button>
          <button
            type="button"
            onClick={() => {
              onResetAll();
              if (popupRef.current) popupRef.current.remove();
              mapRef.current?.flyTo({
                center: REGION_OVERVIEW.center,
                zoom: REGION_OVERVIEW.zoom,
                speed: 1.0,
                essential: true,
              });
            }}
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            {t.fullCoast}
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      {webglError ? (
        <div className="h-[380px] sm:h-[430px] flex flex-col items-center justify-center p-6 text-center bg-slate-900/95 space-y-3">
          <FaMapMarkedAlt className="text-4xl text-cyan-400" />
          <p className="font-bold text-sm text-white">{t.fallbackTitle}</p>
          <p className="text-xs text-slate-400 max-w-md">{t.fallbackDesc}</p>
          <a
            href="https://maps.google.com/?q=36.53,28.62"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white"
          >
            <FaExternalLinkAlt size={10} /> {t.openGoogleMaps}
          </a>
        </div>
      ) : (
        <div ref={containerRef} className="w-full h-[380px] sm:h-[430px] bg-slate-950" />
      )}

      {/* Legend Footer */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 ring-1 ring-white/50" />
            <FaWater size={10} className="text-cyan-400" /> {t.legendDiving}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-1 ring-white/50" />
            <FaFish size={10} className="text-amber-400" /> {t.legendFishing}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 ring-1 ring-white/50" />
            {t.legendBoth}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 ring-1 ring-white/50" />
            <FaBan size={10} className="text-rose-400" /> {t.legendRestricted}
          </span>
        </div>
        <span className="text-slate-400 font-medium">{t.hint}</span>
      </div>
    </div>
  );
}
