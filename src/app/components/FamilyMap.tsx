"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaCompass,
  FaLayerGroup,
  FaMapMarkedAlt,
  FaSwimmer,
  FaTree,
  FaUmbrellaBeach,
  FaWater,
} from 'react-icons/fa';
import LeafletFallbackMap, {
  type LeafletCameraTarget,
  type LeafletMarkerItem,
} from './LeafletFallbackMap';
import {
  FAMILY_SPOTS,
  FAMILY_ZONES,
  type AgeGroup,
  type FamilySpot,
  type FamilySpotCategory,
  type FamilyZoneId,
  type LocaleCode,
  type StrollerGrade,
} from '@/lib/family';

interface FamilyMapProps {
  locale: LocaleCode;
  selectedZone: 'all' | FamilyZoneId;
  categoryFilter: 'all' | FamilySpotCategory;
  ageFilter: 'all' | AgeGroup;
  strollerOnly: boolean;
  selectedSpotId: string | null;
  onSelectSpot: (spotId: string) => void;
  onResetAll: () => void;
}

const REGION_OVERVIEW = {
  center: [28.88, 36.64] as [number, number],
  zoom: 8.1,
};

const CATEGORY_COLORS: Record<FamilySpotCategory, string> = {
  'calm-beach': '#0284c7',     // sky-600
  'waterpark-ride': '#ea580c', // orange-600
  'nature-animals': '#059669', // emerald-600
  'park-promenade': '#7c3aed', // violet-600
};

const MAP_COPY: Record<
  LocaleCode,
  {
    badge: string;
    fullCoast: string;
    satellite: string;
    topo: string;
    legendBeach: string;
    legendWaterpark: string;
    legendNature: string;
    legendPark: string;
    catLabels: Record<FamilySpotCategory, string>;
    strollerLabels: Record<StrollerGrade, string>;
    dlmSuffix: string;
    openGoogleMaps: string;
    jumpToSpot: string;
    hint: string;
    fallbackTitle: string;
    fallbackDesc: string;
  }
> = {
  ru: {
    badge: 'Семейная карта Мармарис — Дальян — Каш',
    fullCoast: 'Весь берег (16)',
    satellite: 'Спутник',
    topo: 'Карта рельефа',
    legendBeach: 'Спокойные пляжи',
    legendWaterpark: 'Аквапарки и канатка',
    legendNature: 'Черепахи и реки',
    legendPark: 'Парки и променады',
    catLabels: {
      'calm-beach': 'Пологий пляж без волн',
      'waterpark-ride': 'Аквапарк / канатка / сплав',
      'nature-animals': 'Животные, черепахи и реки',
      'park-promenade': 'Ровный парк и променад',
    },
    strollerLabels: {
      easy: '🟢 Коляска OK',
      partial: '🟡 Песок / лодка',
      carrier: '🔴 Эргорюкзак',
    },
    dlmSuffix: 'мин от DLM',
    openGoogleMaps: 'Google Maps',
    jumpToSpot: 'Карточка места ↓',
    hint: 'Клик по маркеру показывает путь от DLM, индекс коляски и совет',
    fallbackTitle: 'Интерактивная карта недоступна в этом браузере',
    fallbackDesc: 'Используйте 4 зоны справа и ссылки Google Maps в карточках мест ниже.',
  },
  en: {
    badge: 'Family Coast Map · Marmaris to Kaş',
    fullCoast: 'Full Coast (16)',
    satellite: 'Satellite',
    topo: 'Topo Map',
    legendBeach: 'Calm Beaches',
    legendWaterpark: 'Waterparks & Rides',
    legendNature: 'Turtles & Rivers',
    legendPark: 'Parks & Boardwalks',
    catLabels: {
      'calm-beach': 'Calm Kid-Safe Beach',
      'waterpark-ride': 'Waterpark, Lift or River Float',
      'nature-animals': 'Wildlife, Turtles & Shade Creeks',
      'park-promenade': 'Step-Free Park & Promenade',
    },
    strollerLabels: {
      easy: '🟢 Stroller OK',
      partial: '🟡 Sand / boat',
      carrier: '🔴 Carrier only',
    },
    dlmSuffix: 'min from DLM',
    openGoogleMaps: 'Google Maps',
    jumpToSpot: 'Spot details ↓',
    hint: 'Click any pin for DLM transfer time, stroller index & parent tip',
    fallbackTitle: 'Interactive map is unavailable in this browser',
    fallbackDesc: 'Use the 4 zones on the right and Google Maps links inside the spot cards below.',
  },
  de: {
    badge: 'Familienkarte · Marmaris bis Kaş',
    fullCoast: 'Ganze Küste (16)',
    satellite: 'Satellit',
    topo: 'Topokarte',
    legendBeach: 'Ruhige Strände',
    legendWaterpark: 'Aquaparks & Seilbahn',
    legendNature: 'Schildkröten & Flüsse',
    legendPark: 'Parks & Promenaden',
    catLabels: {
      'calm-beach': 'Ruhiger Kinderstrand',
      'waterpark-ride': 'Aquapark, Seilbahn & Tubing',
      'nature-animals': 'Tiere, Schildkröten & Schatten',
      'park-promenade': 'Ebener Park & Promenade',
    },
    strollerLabels: {
      easy: '🟢 Buggy OK',
      partial: '🟡 Sand / Boot',
      carrier: '🔴 Nur Trage',
    },
    dlmSuffix: 'Min. ab DLM',
    openGoogleMaps: 'Google Maps',
    jumpToSpot: 'Zur Spot-Karte ↓',
    hint: 'Marker anklicken für DLM-Fahrtzeit, Buggy-Index & Eltern-Tipp',
    fallbackTitle: 'Interaktive Karte wird in diesem Browser nicht unterstützt',
    fallbackDesc: 'Nutzen Sie die 4 Zonen rechts und Google-Maps-Links in den Karten unten.',
  },
  tr: {
    badge: 'Aile Haritası · Marmaris’ten Kaş’a',
    fullCoast: 'Tüm Kıyı (16)',
    satellite: 'Uydu',
    topo: 'Topo Harita',
    legendBeach: 'Sakin Kumsallar',
    legendWaterpark: 'Su Parkı & Teleferik',
    legendNature: 'Kaplumbağa & Dere',
    legendPark: 'Park & Kordon',
    catLabels: {
      'calm-beach': 'Sığ ve Dalgasız Plaj',
      'waterpark-ride': 'Su Parkı, Teleferik veya Rafting',
      'nature-animals': 'Doğa, Caretta ve Serin Dere',
      'park-promenade': 'Engelsiz Park ve Yürüyüş Yolu',
    },
    strollerLabels: {
      easy: '🟢 Puset OK',
      partial: '🟡 Kum / tekne',
      carrier: '🔴 Sadece kanguru',
    },
    dlmSuffix: 'dk (DLM)',
    openGoogleMaps: 'Google Haritalar',
    jumpToSpot: 'Kartı gör ↓',
    hint: 'DLM süresi, puset uygunluğu ve ebeveyn notu için pini seçin',
    fallbackTitle: 'Bu tarayıcıda interaktif harita görüntülenemiyor',
    fallbackDesc: 'Sağdaki 4 bölge seçicisini ve aşağıdaki Google Haritalar bağlantılarını kullanın.',
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPopupHtml(spot: FamilySpot, locale: LocaleCode, t: (typeof MAP_COPY)['en']): string {
  const title = spot.name[locale] || spot.name.en;
  const town = spot.town[locale] || spot.town.en;
  const catLabel = t.catLabels[spot.category];
  const color = CATEGORY_COLORS[spot.category];
  const strollerLabel = t.strollerLabels[spot.stroller];
  const tip = spot.parentTip[locale] || spot.parentTip.en;
  const mapsUrl = `https://maps.google.com/?q=${spot.coords[1]},${spot.coords[0]}`;

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:265px;padding:2px;">
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:5px;">
        <span style="display:inline-block;padding:2px 8px;border-radius:9999px;background:${color};color:#ffffff;font-size:10px;font-weight:800;letter-spacing:0.03em;">
          ${escapeHtml(catLabel)}
        </span>
        <span style="display:inline-block;padding:2px 7px;border-radius:9999px;background:#f1f5f9;color:#0f172a;font-size:10px;font-weight:800;">
          ${spot.dlmMinutes} ${escapeHtml(t.dlmSuffix)}
        </span>
      </div>
      <div style="font-size:13px;font-weight:800;color:#0f172a;line-height:1.25;margin-bottom:3px;">
        ${spot.number}. ${escapeHtml(title)}
      </div>
      <div style="font-size:11px;font-weight:700;color:#1d4ed8;margin-bottom:5px;">
        ${escapeHtml(town)} · ${escapeHtml(strollerLabel)} · ${escapeHtml(spot.budgetEur)}
      </div>
      <div style="font-size:11px;color:#475569;line-height:1.35;margin-bottom:8px;">
        ${escapeHtml(tip)}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;border-top:1px solid #e2e8f0;padding-top:6px;">
        <a href="#family-spot-${escapeHtml(spot.id)}" style="font-size:11px;font-weight:800;color:#0284c7;text-decoration:none;">
          ${escapeHtml(t.jumpToSpot)}
        </a>
        <a href="${escapeHtml(mapsUrl)}" target="_blank" rel="noopener noreferrer" style="font-size:11px;font-weight:700;color:#334155;text-decoration:underline;">
          ${escapeHtml(t.openGoogleMaps)} ↗
        </a>
      </div>
    </div>
  `;
}

export default function FamilyMap({
  locale,
  selectedZone,
  categoryFilter,
  ageFilter,
  strollerOnly,
  selectedSpotId,
  onSelectSpot,
  onResetAll,
}: FamilyMapProps) {
  const t = MAP_COPY[locale] || MAP_COPY.en;

  const [baseLayer, setBaseLayer] = useState<'satellite' | 'topo'>('satellite');
  const [cameraTarget, setCameraTarget] = useState<LeafletCameraTarget | null>(null);
  const [popupNonce, setPopupNonce] = useState(0);

  const nonceRef = useRef(0);
  const prevZoneRef = useRef(selectedZone);
  const prevSpotRef = useRef(selectedSpotId);

  const markers = useMemo<LeafletMarkerItem[]>(() => {
    return FAMILY_SPOTS.map((spot) => {
      const matchesZone = selectedZone === 'all' || spot.zoneId === selectedZone;
      const matchesCat = categoryFilter === 'all' || spot.category === categoryFilter;
      const matchesAge = ageFilter === 'all' || spot.ageGroups.includes(ageFilter);
      const matchesStroller = !strollerOnly || spot.stroller === 'easy';
      const visible = matchesZone && matchesCat && matchesAge && matchesStroller;
      const isActive = spot.id === selectedSpotId;

      return {
        id: spot.id,
        coordinates: spot.coords,
        label: String(spot.number),
        title: spot.name[locale] || spot.name.en,
        color: CATEGORY_COLORS[spot.category],
        minWidth: 28,
        height: 28,
        fontSize: 11,
        visible,
        active: isActive,
        activeRingColor: 'rgba(56, 189, 248, 0.85)',
        popupHtml: buildPopupHtml(spot, locale, t),
      };
    });
  }, [locale, t, selectedZone, categoryFilter, ageFilter, strollerOnly, selectedSpotId]);

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

    const zone = FAMILY_ZONES.find((z) => z.id === selectedZone);
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

    const spot = FAMILY_SPOTS.find((s) => s.id === selectedSpotId);
    if (!spot) return;

    nonceRef.current += 1;
    setCameraTarget({
      nonce: nonceRef.current,
      mode: 'flyTo',
      center: spot.coords,
      zoom: 12.2,
    });
    setPopupNonce((n) => n + 1);
  }, [selectedSpotId]);

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300">
          <FaCompass /> {t.badge}
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setBaseLayer('satellite')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${
              baseLayer === 'satellite'
                ? 'bg-sky-600 text-white'
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
                ? 'bg-sky-600 text-white'
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
        emergencyMapsUrl="https://maps.google.com/?q=36.64,28.88"
        emergencyMapsLabel={t.openGoogleMaps}
        emergencyTitle={t.fallbackTitle}
        emergencyDesc={t.fallbackDesc}
      />

      {/* Legend Footer */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 ring-1 ring-white/50" />
            <FaUmbrellaBeach size={10} className="text-sky-400" /> {t.legendBeach}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600 ring-1 ring-white/50" />
            <FaWater size={10} className="text-orange-400" /> {t.legendWaterpark}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-1 ring-white/50" />
            <FaSwimmer size={10} className="text-emerald-400" /> {t.legendNature}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-600 ring-1 ring-white/50" />
            <FaTree size={10} className="text-violet-400" /> {t.legendPark}
          </span>
        </div>
        <span className="text-slate-400 font-medium">{t.hint}</span>
      </div>
    </div>
  );
}
