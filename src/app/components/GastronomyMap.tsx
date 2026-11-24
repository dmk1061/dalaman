"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaCoffee,
  FaCompass,
  FaFish,
  FaLayerGroup,
  FaMapMarkedAlt,
  FaTree,
  FaUtensils,
} from 'react-icons/fa';
import LeafletFallbackMap, {
  type LeafletCameraTarget,
  type LeafletMarkerItem,
} from './LeafletFallbackMap';
import {
  DINING_SPOTS,
  GASTRO_ZONES,
  type DiningSpot,
  type GastroZoneId,
  type LocaleCode,
  type VenueCategory,
} from '@/lib/gastronomy';

interface GastronomyMapProps {
  locale: LocaleCode;
  selectedZone: 'all' | GastroZoneId;
  categoryFilter: 'all' | VenueCategory;
  selectedSpotId: string | null;
  onSelectSpot: (spotId: string) => void;
  onResetAll: () => void;
}

const REGION_OVERVIEW = {
  center: [28.57, 36.62] as [number, number],
  zoom: 8.0,
};

const CATEGORY_COLORS: Record<VenueCategory, string> = {
  'seafood-meyhane': '#0891b2', // cyan-600
  'lokanta-pide': '#d97706',    // amber-600
  'river-nature': '#059669',    // emerald-600
  'breakfast-cafe': '#e11d48',  // rose-600
};

const MAP_COPY: Record<
  LocaleCode,
  {
    badge: string;
    fullCoast: string;
    satellite: string;
    topo: string;
    legendSeafood: string;
    legendLokanta: string;
    legendRiver: string;
    legendBreakfast: string;
    catLabels: Record<VenueCategory, string>;
    openGoogleMaps: string;
    jumpToSpot: string;
    hint: string;
    fallbackTitle: string;
    fallbackDesc: string;
  }
> = {
  ru: {
    badge: 'Интерактивная гастро-карта Датча — Каш',
    fullCoast: 'Весь берег (16)',
    satellite: 'Спутник',
    topo: 'Карта рельефа',
    legendSeafood: 'Рыба и мейхане',
    legendLokanta: 'Локанты и пиде',
    legendRiver: 'Реки и форель',
    legendBreakfast: 'Завтраки и кафе',
    catLabels: {
      'seafood-meyhane': 'Рыба, морепродукты и мейхане',
      'lokanta-pide': 'Локанты, пиде и кебабные',
      'river-nature': 'Речные террасы и форель',
      'breakfast-cafe': 'Завтраки, сады и кофейни',
    },
    openGoogleMaps: 'Google Maps',
    jumpToSpot: 'Карточка места ↓',
    hint: 'Клик по маркеру открывает формат, средний чек и совет по заказу',
    fallbackTitle: 'Интерактивная карта недоступна в этом браузере',
    fallbackDesc: 'Используйте переключатель 4 зон справа и ссылки Google Maps в карточках мест ниже.',
  },
  en: {
    badge: 'Interactive Gastronomy Map · Datça to Kaş',
    fullCoast: 'Full Coast (16)',
    satellite: 'Satellite',
    topo: 'Topo Map',
    legendSeafood: 'Seafood & Meyhane',
    legendLokanta: 'Lokanta & Pide',
    legendRiver: 'River & Trout',
    legendBreakfast: 'Breakfast & Café',
    catLabels: {
      'seafood-meyhane': 'Seafood & Aegean Meyhane',
      'lokanta-pide': 'Lokanta, Pide & Kebap',
      'river-nature': 'River Platforms & Mountain Trout',
      'breakfast-cafe': 'Village Breakfast & Rooftops',
    },
    openGoogleMaps: 'Google Maps',
    jumpToSpot: 'View place details ↓',
    hint: 'Click any pin for dining format, budget tier & ordering advice',
    fallbackTitle: 'Interactive map is unavailable in this browser',
    fallbackDesc: 'Use the 4-zone switcher on the right and Google Maps links inside each spot card below.',
  },
  de: {
    badge: 'Interaktive Gastro-Karte · Datça bis Kaş',
    fullCoast: 'Ganze Küste (16)',
    satellite: 'Satellit',
    topo: 'Topokarte',
    legendSeafood: 'Fisch & Meyhane',
    legendLokanta: 'Lokanta & Pide',
    legendRiver: 'Fluss & Forelle',
    legendBreakfast: 'Frühstück & Café',
    catLabels: {
      'seafood-meyhane': 'Fisch, Meze & Meyhane',
      'lokanta-pide': 'Lokanta, Pide & Kebap',
      'river-nature': 'Flussterrassen & Forelle',
      'breakfast-cafe': 'Dorffrühstück & Dachterrassen',
    },
    openGoogleMaps: 'Google Maps',
    jumpToSpot: 'Zur Ort-Karte ↓',
    hint: 'Marker anklicken für Format, Preisniveau & Bestelltipp',
    fallbackTitle: 'Interaktive Karte wird in diesem Browser nicht unterstützt',
    fallbackDesc: 'Nutzen Sie die 4 Zonen rechts und Google-Maps-Links in den Karten unten.',
  },
  tr: {
    badge: 'İnteraktif Gastronomi Haritası · Datça’dan Kaş’a',
    fullCoast: 'Tüm Kıyı (16)',
    satellite: 'Uydu',
    topo: 'Topo Harita',
    legendSeafood: 'Balık & Meyhane',
    legendLokanta: 'Lokanta & Pide',
    legendRiver: 'Dere & Alabalık',
    legendBreakfast: 'Kahvaltı & Kafe',
    catLabels: {
      'seafood-meyhane': 'Deniz Ürünleri ve Ege Meyhanesi',
      'lokanta-pide': 'Esnaf Lokantası, Pide ve Kebap',
      'river-nature': 'Dere Üstü Masalar ve Alabalık',
      'breakfast-cafe': 'Serpme Kahvaltı ve Teraslar',
    },
    openGoogleMaps: 'Google Haritalar',
    jumpToSpot: 'Mekân detayına git ↓',
    hint: 'Format, ortalama bütçe ve sipariş notu için işaretçiye tıklayın',
    fallbackTitle: 'Bu tarayıcıda interaktif harita görüntülenemiyor',
    fallbackDesc: 'Sağdaki 4 bölge seçicisini ve aşağıdaki mekân kartlarındaki Google Haritalar linklerini kullanın.',
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPopupHtml(spot: DiningSpot, locale: LocaleCode, t: (typeof MAP_COPY)['en']): string {
  const title = spot.title[locale] || spot.title.en;
  const price = spot.priceTier[locale] || spot.priceTier.en;
  const catLabel = t.catLabels[spot.category];
  const color = CATEGORY_COLORS[spot.category];
  const note = spot.orderingAndBookingNote[locale] || spot.orderingAndBookingNote.en;

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:255px;padding:2px;">
      <div style="display:inline-block;padding:2px 8px;border-radius:9999px;background:${color};color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">
        ${escapeHtml(catLabel)}
      </div>
      <div style="font-size:13px;font-weight:800;color:#0f172a;line-height:1.25;margin-bottom:4px;">
        ${escapeHtml(title)}
      </div>
      <div style="font-size:11px;font-weight:700;color:#b45309;margin-bottom:5px;">
        ${escapeHtml(price)}
      </div>
      <div style="font-size:11px;color:#475569;line-height:1.35;margin-bottom:8px;">
        ${escapeHtml(note)}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;border-top:1px solid #e2e8f0;padding-top:6px;">
        <a href="#gastro-spot-${escapeHtml(spot.id)}" style="font-size:11px;font-weight:800;color:#0891b2;text-decoration:none;">
          ${escapeHtml(t.jumpToSpot)}
        </a>
        <a href="${escapeHtml(spot.mapsUrl)}" target="_blank" rel="noopener noreferrer" style="font-size:11px;font-weight:700;color:#334155;text-decoration:underline;">
          ${escapeHtml(t.openGoogleMaps)} ↗
        </a>
      </div>
    </div>
  `;
}

export default function GastronomyMap({
  locale,
  selectedZone,
  categoryFilter,
  selectedSpotId,
  onSelectSpot,
  onResetAll,
}: GastronomyMapProps) {
  const t = MAP_COPY[locale] || MAP_COPY.en;

  const [baseLayer, setBaseLayer] = useState<'satellite' | 'topo'>('satellite');
  const [cameraTarget, setCameraTarget] = useState<LeafletCameraTarget | null>(null);
  const [popupNonce, setPopupNonce] = useState(0);

  const nonceRef = useRef(0);
  const prevZoneRef = useRef(selectedZone);
  const prevSpotRef = useRef(selectedSpotId);

  const markers = useMemo<LeafletMarkerItem[]>(() => {
    return DINING_SPOTS.map((spot, idx) => {
      const matchesZone = selectedZone === 'all' || spot.zoneId === selectedZone;
      const matchesCat = categoryFilter === 'all' || spot.category === categoryFilter;
      const visible = matchesZone && matchesCat;
      const isActive = spot.id === selectedSpotId;

      return {
        id: spot.id,
        coordinates: spot.coordinates,
        label: String(idx + 1),
        title: spot.title[locale] || spot.title.en,
        color: CATEGORY_COLORS[spot.category],
        minWidth: 28,
        height: 28,
        fontSize: 11,
        visible,
        active: isActive,
        activeRingColor: 'rgba(251, 146, 60, 0.85)',
        popupHtml: buildPopupHtml(spot, locale, t),
      };
    });
  }, [locale, t, selectedZone, categoryFilter, selectedSpotId]);

  useEffect(() => {
    if (prevZoneRef.current === selectedZone) return;
    prevZoneRef.current = selectedZone;
    nonceRef.current += 1;

    if (selectedZone === 'all') {
      setCameraTarget({
        nonce: nonceRef.current,
        mode: 'flyTo',
        center: REGION_OVERVIEW.center,
        zoom: REGION_OVERVIEW.zoom,
      });
      return;
    }

    const zone = GASTRO_ZONES.find((z) => z.id === selectedZone);
    if (zone) {
      setCameraTarget({
        nonce: nonceRef.current,
        mode: 'flyTo',
        center: zone.center,
        zoom: zone.zoom,
      });
    }
  }, [selectedZone]);

  useEffect(() => {
    if (prevSpotRef.current === selectedSpotId) return;
    prevSpotRef.current = selectedSpotId;
    if (!selectedSpotId) return;

    const spot = DINING_SPOTS.find((s) => s.id === selectedSpotId);
    if (!spot) return;

    nonceRef.current += 1;
    setCameraTarget({
      nonce: nonceRef.current,
      mode: 'flyTo',
      center: spot.coordinates,
      zoom: 12.2,
    });
    setPopupNonce((n) => n + 1);
  }, [selectedSpotId]);

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300">
          <FaCompass /> {t.badge}
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setBaseLayer('satellite')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              baseLayer === 'satellite'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FaLayerGroup size={10} /> {t.satellite}
          </button>
          <button
            type="button"
            onClick={() => setBaseLayer('topo')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              baseLayer === 'topo'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FaMapMarkedAlt size={10} /> {t.topo}
          </button>
          <button
            type="button"
            onClick={() => {
              onResetAll();
              nonceRef.current += 1;
              setCameraTarget({
                nonce: nonceRef.current,
                mode: 'flyTo',
                center: REGION_OVERVIEW.center,
                zoom: REGION_OVERVIEW.zoom,
              });
            }}
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            {t.fullCoast}
          </button>
        </div>
      </div>

      {/* WebGL-free Leaflet Map */}
      <LeafletFallbackMap
        baseLayer={baseLayer}
        initialCenter={REGION_OVERVIEW.center}
        initialZoom={REGION_OVERVIEW.zoom}
        cameraTarget={cameraTarget}
        markers={markers}
        activePopupId={selectedSpotId}
        popupNonce={popupNonce}
        onSelectMarker={onSelectSpot}
        heightClassName="h-[380px] sm:h-[430px]"
        emergencyMapsUrl="https://maps.google.com/?q=36.62,28.57"
        emergencyMapsLabel={t.openGoogleMaps}
        emergencyTitle={t.fallbackTitle}
        emergencyDesc={t.fallbackDesc}
      />

      {/* Legend Footer */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 ring-1 ring-white/50" />
            <FaFish size={10} className="text-cyan-400" /> {t.legendSeafood}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-1 ring-white/50" />
            <FaUtensils size={10} className="text-amber-400" /> {t.legendLokanta}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-1 ring-white/50" />
            <FaTree size={10} className="text-emerald-400" /> {t.legendRiver}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 ring-1 ring-white/50" />
            <FaCoffee size={10} className="text-rose-400" /> {t.legendBreakfast}
          </span>
        </div>
        <span className="text-slate-400 font-medium">{t.hint}</span>
      </div>
    </div>
  );
}
