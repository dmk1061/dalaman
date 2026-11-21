"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronRight,
  FaClock,
  FaCompass,
  FaCube,
  FaExclamationTriangle,
  FaFilter,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaMountain,
  FaRoute,
  FaStar,
  FaTint,
} from 'react-icons/fa';
import {
  TRAIL_STAGES,
  TRAIL_ZONES,
  type LocaleCode,
  type TrailStage,
  type TrailZoneId,
} from '@/lib/trekking-data';

interface AtlasUiCopy {
  overviewEyebrow: string;
  overviewTitle: string;
  overviewSubtitle: string;
  overviewMapAlt: string;
  showAllZonesBtn: (total: number) => string;
  trailsCountSuffix: (count: number) => string;
  featuredEyebrow: string;
  featuredTitle: string;
  featuredDesc: string;
  featuredCta: string;
  inflationShieldTitle: string;
  inflationShieldDesc: string;
  filtersHeading: string;
  filterZoneAll: string;
  filterAllRegions: string;
  filterLycian: string;
  filterCarian: string;
  filterDayhike: string;
  filterCanyon: string;
  filterAllDiff: string;
  diff1: string;
  diff2: string;
  diff3: string;
  diff4: string;
  diff5: string;
  regionLabels: Record<TrailStage['region'], string>;
  statsDist: string;
  statsGain: string;
  statsLoss: string;
  statsPeak: string;
  statsDur: string;
  kmUnit: string;
  mUnit: string;
  hourUnit: string;
  startLabel: string;
  endLabel: string;
  waterLabel: string;
  highlightsLabel: string;
  gearLabel: string;
  readGuideBtn: string;
  detailedGuideBadge: string;
  detailedGuideBtn: string;
  openMapBtn: string;
  noResults: string;
  resetAllBtn: string;
  zonePrefix: string;
}

const ATLAS_UI_BY_LOCALE: Record<LocaleCode, AtlasUiCopy> = {
  ru: {
    overviewEyebrow: 'ОБЗОРНАЯ КАРТА ПОБЕРЕЖЬЯ · 4 ГЕОГРАФИЧЕСКИЕ ЗОНЫ',
    overviewTitle: 'Выберите зону от Датчи до Каша на карте',
    overviewSubtitle:
      'По аналогии с атласами Стива Раззетти весь регион Даламан разбит на 4 пронумерованные зоны. Нажмите на прямоугольник на диораме или в списке справа, чтобы отфильтровать тропы.',
    overviewMapAlt: 'Обзорная 3D-диорама побережья Датча — Каш с четырьмя зонами треккинга',
    showAllZonesBtn: (total) => `Показать все ${total} троп`,
    trailsCountSuffix: (count) =>
      count === 1 ? '1 тропа' : count >= 2 && count <= 4 ? `${count} тропы` : `${count} троп`,
    featuredEyebrow: 'ВСЕ 15 ТРОП В 3D · СТАРТ С TREK 07',
    featuredTitle: 'Все 15 маршрутов теперь с 3D-рельефом, профилем высот и GPX',
    featuredDesc:
      'Каждый этап от Датчи до Каша получил отдельную страницу с 3D-картой полёта птицы, 2D Topo-режимом, профилем Copernicus DEM и скачиванием GPX. Для первого знакомства начните с TREK 07: Каякёй → Олюдениз (+ ветка Soğuk Su).',
    featuredCta: 'Открыть TREK 07 в 3D, профиль и GPX →',
    inflationShieldTitle: 'Щит от инфляции и сборы в парках 2026',
    inflationShieldDesc:
      'Вход на открытые участки Ликийской и Карийской троп бесплатен. Плата берётся только в нацпарках и на территории охраняемых руин (Книдос, Каунос, Каякёй, Саклыкент, Симена) — актуальные тарифы muze.gov.tr привязаны к евро. В горные деревни всегда берите наличные лиры.',
    filtersHeading: 'Фильтры маршрутов по зоне, типу тропы и сложности',
    filterZoneAll: 'Все 4 зоны (15)',
    filterAllRegions: '🗺️ Все типы (15)',
    filterLycian: '🏔️ Ликийская тропа',
    filterCarian: '🌿 Карийская тропа',
    filterDayhike: '🥾 Однодневные хайки',
    filterCanyon: '🌊 Каньоны',
    filterAllDiff: '🎯 Любая сложность',
    diff1: '⭐ Лёгкие',
    diff2: '⭐⭐ Умеренные',
    diff3: '⭐⭐⭐ Средние',
    diff4: '⭐⭐⭐⭐ Сложные',
    diff5: '⭐⭐⭐⭐⭐ Экстрим',
    regionLabels: {
      lycian: '🏔️ Ликийская тропа',
      carian: '🌿 Карийская тропа',
      dayhike: '🥾 Однодневный хайк',
      canyon: '🌊 Каньон',
    },
    statsDist: 'Дистанция:',
    statsGain: 'Набор:',
    statsLoss: 'Спуск:',
    statsPeak: 'Пик:',
    statsDur: 'Время:',
    kmUnit: 'км',
    mUnit: 'м',
    hourUnit: 'ч.',
    startLabel: '🚀 Точка старта:',
    endLabel: '🏁 Точка финиша:',
    waterLabel: '💧 Вода (Çeşme):',
    highlightsLabel: '✨ Главные впечатления этапа:',
    gearLabel: '🎒 Экипировка и безопасность:',
    readGuideBtn: 'Общий гид по однодневным тропам',
    detailedGuideBadge: '3D-карта · Профиль высот · GPX',
    detailedGuideBtn: 'Открыть 3D-гид и GPX',
    openMapBtn: 'Google Maps',
    noResults: 'По выбранным фильтрам маршрутов не найдено.',
    resetAllBtn: 'Сбросить все фильтры',
    zonePrefix: 'Зона',
  },
  en: {
    overviewEyebrow: 'REGIONAL OVERVIEW MAP · 4 GEOGRAPHIC ZONES',
    overviewTitle: 'Pick a Coastal Zone from Datça to Kaş',
    overviewSubtitle:
      'Modeled after Steve Razzetti’s classic trekking guides, the Dalaman coast is divided into 4 numbered zones. Click any framed zone on the diorama or legend to filter trails.',
    overviewMapAlt: '3D coastline overview from Datça to Kaş showing four numbered trekking zones',
    showAllZonesBtn: (total) => `Show all ${total} trails`,
    trailsCountSuffix: (count) => (count === 1 ? '1 trail' : `${count} trails`),
    featuredEyebrow: 'ALL 15 TRAILS IN 3D · START WITH TREK 07',
    featuredTitle: 'Every Route Now Features 3D Terrain, Elevation Profile & GPX',
    featuredDesc:
      'All 15 trails from Datça to Kaş now open in interactive bird’s-eye 3D views with 2D Topo mode, Copernicus DEM elevation charts, and GPX downloads. Start with signature TREK 07: Kayaköy → Ölüdeniz (+ Soğuk Su branch).',
    featuredCta: 'Explore TREK 07 3D Guide & GPX →',
    inflationShieldTitle: '2026 Inflation Shield & Park Fees',
    inflationShieldDesc:
      'Open stretches of the Lycian Way and Carian Trail are 100% free. Entrance fees apply only at fenced ruins and national parks (Knidos, Kaunos, Kayaköy, Saklıkent, Simena) — check current EUR-indexed tariffs at muze.gov.tr and carry Turkish Lira cash for mountain villages.',
    filtersHeading: 'Filter trails by zone, trail type & difficulty',
    filterZoneAll: 'All 4 Zones (15)',
    filterAllRegions: '🗺️ All Types (15)',
    filterLycian: '🏔️ Lycian Way',
    filterCarian: '🌿 Carian Trail',
    filterDayhike: '🥾 Day Hikes',
    filterCanyon: '🌊 Canyons',
    filterAllDiff: '🎯 Any Difficulty',
    diff1: '⭐ Easy',
    diff2: '⭐⭐ Moderate',
    diff3: '⭐⭐⭐ Intermediate',
    diff4: '⭐⭐⭐⭐ Advanced',
    diff5: '⭐⭐⭐⭐⭐ Extreme',
    regionLabels: {
      lycian: '🏔️ Lycian Way',
      carian: '🌿 Carian Trail',
      dayhike: '🥾 Day Hike',
      canyon: '🌊 Canyon',
    },
    statsDist: 'Distance:',
    statsGain: 'Ascent:',
    statsLoss: 'Descent:',
    statsPeak: 'Peak:',
    statsDur: 'Est. Time:',
    kmUnit: 'km',
    mUnit: 'm',
    hourUnit: 'h',
    startLabel: '🚀 Start Point:',
    endLabel: '🏁 End Point:',
    waterLabel: '💧 Water (Çeşme):',
    highlightsLabel: '✨ Stage Highlights:',
    gearLabel: '🎒 Gear & Safety Advice:',
    readGuideBtn: 'Coastal day-hikes overview',
    detailedGuideBadge: '3D Map · Elevation Profile · GPX',
    detailedGuideBtn: 'Open 3D Guide & GPX',
    openMapBtn: 'Google Maps',
    noResults: 'No trails match the current filters.',
    resetAllBtn: 'Reset all filters',
    zonePrefix: 'Zone',
  },
  de: {
    overviewEyebrow: 'ÜBERSICHTSKARTE · 4 GEOGRAFISCHE ZONEN',
    overviewTitle: 'Wählen Sie eine Küstenzone von Datça bis Kaş',
    overviewSubtitle:
      'Nach dem Vorbild klassischer Trekking-Atlanten ist die Region in 4 nummerierte Zonen unterteilt. Klicken Sie auf eine Zone auf der Karte oder rechts in der Übersicht.',
    overviewMapAlt: '3D-Übersichtskarte der Küste von Datça bis Kaş mit vier Wanderzonen',
    showAllZonesBtn: (total) => `Alle ${total} Routen zeigen`,
    trailsCountSuffix: (count) => (count === 1 ? '1 Route' : `${count} Routen`),
    featuredEyebrow: 'ALLE 15 ROUTEN IN 3D · EMPFEHLUNG TREK 07',
    featuredTitle: 'Jede Route jetzt mit 3D-Gelände, Höhenprofil & GPX',
    featuredDesc:
      'Alle 15 Etappen von Datça bis Kaş öffnen sich nun in der interaktiven 3D-Vogelperspektive mit 2D-Topo-Karte, Copernicus-DEM-Profil und GPX-Export. Ideal für den Einstieg: TREK 07 Kayaköy → Ölüdeniz.',
    featuredCta: 'TREK 07 in 3D & GPX öffnen →',
    inflationShieldTitle: 'Inflationsschutz & Parkgebühren 2026',
    inflationShieldDesc:
      'Freie Abschnitte des Lykischen und Karischen Weges sind kostenlos. Eintritt gilt nur in Nationalparks und umzäunten Ruinen (Knidos, Kaunos, Kayaköy, Saklıkent, Simena) — Tarife unter muze.gov.tr prüfen und Lira-Bargeld für Bergdörfer mitnehmen.',
    filtersHeading: 'Routen nach Zone, Kategorie & Schwierigkeit filtern',
    filterZoneAll: 'Alle 4 Zonen (15)',
    filterAllRegions: '🗺️ Alle Typen (15)',
    filterLycian: '🏔️ Lykischer Weg',
    filterCarian: '🌿 Karischer Weg',
    filterDayhike: '🥾 Tagestouren',
    filterCanyon: '🌊 Schluchten',
    filterAllDiff: '🎯 Jede Schwierigkeit',
    diff1: '⭐ Leicht',
    diff2: '⭐⭐ Moderat',
    diff3: '⭐⭐⭐ Mittelschwer',
    diff4: '⭐⭐⭐⭐ Anspruchsvoll',
    diff5: '⭐⭐⭐⭐⭐ Extrem',
    regionLabels: {
      lycian: '🏔️ Lykischer Weg',
      carian: '🌿 Karischer Weg',
      dayhike: '🥾 Tagestour',
      canyon: '🌊 Schlucht',
    },
    statsDist: 'Distanz:',
    statsGain: 'Aufstieg:',
    statsLoss: 'Abstieg:',
    statsPeak: 'Gipfel:',
    statsDur: 'Dauer:',
    kmUnit: 'km',
    mUnit: 'm',
    hourUnit: 'Std.',
    startLabel: '🚀 Startpunkt:',
    endLabel: '🏁 Zielpunkt:',
    waterLabel: '💧 Wasser (Çeşme):',
    highlightsLabel: '✨ Höhepunkte:',
    gearLabel: '🎒 Ausrüstung & Sicherheit:',
    readGuideBtn: 'Tagestouren-Übersicht lesen',
    detailedGuideBadge: '3D-Karte · Höhenprofil · GPX',
    detailedGuideBtn: '3D-Guide & GPX öffnen',
    openMapBtn: 'Google Maps',
    noResults: 'Keine Routen für diese Filterauswahl gefunden.',
    resetAllBtn: 'Filter zurücksetzen',
    zonePrefix: 'Zone',
  },
  tr: {
    overviewEyebrow: 'BÖLGESEL GENEL HARİTA · 4 COĞRAFİ BÖLGE',
    overviewTitle: 'Datça’dan Kaş’a Harita Üzerinden Bölge Seçin',
    overviewSubtitle:
      'Klasik trekking atlasları gibi tüm Dalaman kıyısı 4 numaralı bölgeye ayrılmıştır. Rotaları filtrelemek için haritadaki veya listedeki bölge kutularına tıklayın.',
    overviewMapAlt: 'Datça’dan Kaş’a dört yürüyüş bölgesini gösteren 3D kıyı haritası',
    showAllZonesBtn: (total) => `Tüm ${total} rotayı göster`,
    trailsCountSuffix: (count) => `${count} rota`,
    featuredEyebrow: '15 ROTA ARTIK 3D HARİTADA · ÖNERİLEN PARKUR 07',
    featuredTitle: 'Tüm 15 Parkur İçin Canlı 3D Arazi, Rakım Profili ve GPX İndirme',
    featuredDesc:
      'Datça’dan Kaş’a kadar tüm 15 rota artık 3D kuş bakışı harita, 2D Topo görünümü, Copernicus DEM rakım grafiği ve GPX dosyasıyla açılıyor. İlk keşif için TREK 07: Kayaköy → Ölüdeniz ile başlayın.',
    featuredCta: 'TREK 07 3D Rehber ve GPX’i Aç →',
    inflationShieldTitle: '2026 Enflasyon Koruması ve Milli Park Ücretleri',
    inflationShieldDesc:
      'Likya ve Karya Yollarının açık patikaları ücretsizdir. Giriş ücreti yalnızca ören yerleri ve milli park kapılarında alınır (Knidos, Kaunos, Kayaköy, Saklıkent, Simena) — güncel tarifeler için muze.gov.tr adresini kontrol edin ve dağ köyleri için nakit TL taşıyın.',
    filtersHeading: 'Rotaları bölge, tür ve zorluğa göre filtrele',
    filterZoneAll: 'Tüm 4 Bölge (15)',
    filterAllRegions: '🗺️ Tüm Türler (15)',
    filterLycian: '🏔️ Likya Yolu',
    filterCarian: '🌿 Karya Yolu',
    filterDayhike: '🥾 Günübirlik',
    filterCanyon: '🌊 Kanyon',
    filterAllDiff: '🎯 Tüm Zorluklar',
    diff1: '⭐ Kolay',
    diff2: '⭐⭐ Orta/Hafif',
    diff3: '⭐⭐⭐ Orta',
    diff4: '⭐⭐⭐⭐ Zorlu',
    diff5: '⭐⭐⭐⭐⭐ Ekstrem',
    regionLabels: {
      lycian: '🏔️ Likya Yolu',
      carian: '🌿 Karya Yolu',
      dayhike: '🥾 Günübirlik',
      canyon: '🌊 Kanyon',
    },
    statsDist: 'Mesafe:',
    statsGain: 'Tırmanış:',
    statsLoss: 'İniş:',
    statsPeak: 'Zirve:',
    statsDur: 'Süre:',
    kmUnit: 'km',
    mUnit: 'm',
    hourUnit: 'sa.',
    startLabel: '🚀 Başlangıç:',
    endLabel: '🏁 Bitiş:',
    waterLabel: '💧 Su (Çeşme):',
    highlightsLabel: '✨ Öne Çıkanlar:',
    gearLabel: '🎒 Ekipman ve Güvenlik:',
    readGuideBtn: 'Günübirlik rota rehberini oku',
    detailedGuideBadge: '3D Harita · Rakım Profili · GPX',
    detailedGuideBtn: '3D Rehber ve GPX’i Aç',
    openMapBtn: 'Google Maps',
    noResults: 'Seçilen filtrelere uygun rota bulunamadı.',
    resetAllBtn: 'Filtreleri sıfırla',
    zonePrefix: 'Bölge',
  },
};

const DIFFICULTY_LABELS: Record<number, Record<LocaleCode, string>> = {
  1: { ru: '⭐ Лёгкая прогулка', en: '⭐ Easy Walk', de: '⭐ Leichte Tour', tr: '⭐ Kolay Yürüyüş' },
  2: { ru: '⭐⭐ Умеренная', en: '⭐⭐ Moderate', de: '⭐⭐ Moderat', tr: '⭐⭐ Orta / Hafif' },
  3: { ru: '⭐⭐⭐ Средняя', en: '⭐⭐⭐ Intermediate', de: '⭐⭐⭐ Mittelschwer', tr: '⭐⭐⭐ Orta Zorlukta' },
  4: { ru: '⭐⭐⭐⭐ Сложный горный трек', en: '⭐⭐⭐⭐ Advanced Trek', de: '⭐⭐⭐⭐ Anspruchsvoll', tr: '⭐⭐⭐⭐ Zorlu Dağ Etabı' },
  5: { ru: '⭐⭐⭐⭐⭐ Экстремальная', en: '⭐⭐⭐⭐⭐ Extreme Grade', de: '⭐⭐⭐⭐⭐ Extrem', tr: '⭐⭐⭐⭐⭐ Ekstrem' },
};

function getDifficultyBadgeColor(diff: number): string {
  switch (diff) {
    case 1:
      return 'bg-sky-600 text-white border-sky-700';
    case 2:
      return 'bg-cyan-600 text-white border-cyan-700';
    case 3:
      return 'bg-amber-600 text-white border-amber-700';
    case 4:
      return 'bg-orange-600 text-white border-orange-700';
    case 5:
      return 'bg-rose-600 text-white border-rose-700';
    default:
      return 'bg-slate-600 text-white border-slate-700';
  }
}

export default function TrekkingAtlas({ locale = 'ru' }: { locale?: string }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale)
    ? (locale as LocaleCode)
    : 'en';

  const [selectedZone, setSelectedZone] = useState<'all' | TrailZoneId>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | 'all'>('all');

  const t = ATLAS_UI_BY_LOCALE[activeLocale];

  const zoneCounts = useMemo(() => {
    const counts: Record<TrailZoneId, number> = {
      'datca-bozburun': 0,
      'dalyan-gocek': 0,
      'fethiye-oludeniz': 0,
      'patara-kas': 0,
    };
    for (const s of TRAIL_STAGES) {
      counts[s.zoneId] += 1;
    }
    return counts;
  }, []);

  const filteredStages = useMemo(() => {
    return TRAIL_STAGES.filter((stage) => {
      if (selectedZone !== 'all' && stage.zoneId !== selectedZone) return false;
      if (selectedRegion !== 'all' && stage.region !== selectedRegion) return false;
      if (selectedDifficulty !== 'all' && stage.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedZone, selectedRegion, selectedDifficulty]);

  const toggleZone = (zoneId: TrailZoneId) => {
    setSelectedZone((prev) => (prev === zoneId ? 'all' : zoneId));
  };

  const resetAllFilters = () => {
    setSelectedZone('all');
    setSelectedRegion('all');
    setSelectedDifficulty('all');
  };

  const zoneMap = useMemo(() => {
    const map: Record<string, (typeof TRAIL_ZONES)[number]> = {};
    for (const z of TRAIL_ZONES) map[z.id] = z;
    return map;
  }, []);

  return (
    <div className="w-full space-y-8">
      {/* 1. Regional 4-Zone Overview Map (Steve Razzetti NEPAL spread style) */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6">
        <div className="mb-4">
          <span className="eyebrow-badge mb-1">
            <FaCompass /> {t.overviewEyebrow}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.overviewTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-3xl">
            {t.overviewSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Interactive Diorama with 4 Framed Zones */}
          <div className="lg:col-span-8">
            <div className="relative w-full aspect-[1376/768] rounded-xl overflow-hidden bg-[#142c52] border border-slate-300 shadow-inner">
              <Image
                src="/map-diorama.webp"
                alt={t.overviewMapAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 880px"
                className="object-cover select-none"
                priority
              />
              <div className="absolute inset-0 bg-slate-950/15 pointer-events-none" />

              {TRAIL_ZONES.map((zone) => {
                const isSelected = selectedZone === zone.id;
                const isDimmed = selectedZone !== 'all' && !isSelected;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => toggleZone(zone.id)}
                    style={zone.box}
                    aria-pressed={isSelected}
                    aria-label={`${zone.code} ${zone.title[activeLocale]}`}
                    className={`absolute rounded-lg border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between p-1.5 sm:p-2 text-left focus:outline-none ${
                      isSelected
                        ? 'border-cyan-300 bg-cyan-500/25 shadow-lg shadow-cyan-950/50 ring-2 ring-cyan-300/60 z-20'
                        : isDimmed
                        ? 'border-white/35 bg-slate-950/35 hover:border-cyan-300/80 hover:bg-cyan-500/15'
                        : 'border-white/75 bg-slate-950/10 hover:border-cyan-300 hover:bg-cyan-500/20 z-10'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-extrabold tracking-wider w-fit shadow-sm ${
                        isSelected
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-900/90 text-cyan-300 border border-white/25'
                      }`}
                    >
                      {zone.code}
                    </span>
                    <span className="hidden sm:inline-block bg-slate-900/85 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/15 truncate max-w-full">
                      {zone.title[activeLocale]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Zone Legend Directory */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50 rounded-xl border border-slate-200/80 p-4 space-y-3">
            <div className="space-y-2">
              {TRAIL_ZONES.map((zone) => {
                const isSelected = selectedZone === zone.id;
                const count = zoneCounts[zone.id];
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => toggleZone(zone.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-cyan-500 shadow-md'
                        : 'bg-white text-slate-800 border-slate-200/80 hover:border-cyan-400'
                    }`}
                  >
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-extrabold flex-shrink-0 ${
                        isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-900 text-cyan-300'
                      }`}
                    >
                      {zone.code}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-xs sm:text-sm font-extrabold truncate">
                          {zone.title[activeLocale]}
                        </strong>
                        <span
                          className={`text-[11px] font-bold flex-shrink-0 ${
                            isSelected ? 'text-cyan-300' : 'text-cyan-700'
                          }`}
                        >
                          {t.trailsCountSuffix(count)}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] mt-0.5 leading-snug ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {zone.subtitle[activeLocale]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setSelectedZone('all')}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-colors border ${
                selectedZone === 'all'
                  ? 'bg-cyan-600 text-white border-cyan-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {t.showAllZonesBtn(TRAIL_STAGES.length)}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Featured Detailed 3D Spread Banner (TREK 07) */}
      <section className="bg-slate-900 text-white rounded-2xl p-5 md:p-7 shadow-lg border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider border border-cyan-500/30">
            <FaCube size={11} /> {t.featuredEyebrow}
          </span>
          <h3 className="text-lg md:text-2xl font-extrabold tracking-tight text-white">
            {t.featuredTitle}
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
            {t.featuredDesc}
          </p>
        </div>

        <Link
          href={`/${activeLocale}/routes/trekking/kayakoy-oludeniz`}
          className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold tracking-wide transition-colors shadow-lg shadow-cyan-600/25"
        >
          {t.featuredCta}
        </Link>
      </section>

      {/* 3. Inflation Shield & Park Fees Notice */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 border-l-4 border-l-cyan-600 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-700 text-lg flex-shrink-0 border border-cyan-200/60">
            <FaInfoCircle />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm md:text-base text-slate-900">
              {t.inflationShieldTitle}
            </h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              {t.inflationShieldDesc}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Filters Bar */}
      <div className="portal-card p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
          <FaFilter className="text-cyan-600" /> {t.filtersHeading}
        </div>

        {/* Zone Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedZone('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedZone === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.filterZoneAll}
          </button>
          {TRAIL_ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => setSelectedZone(z.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedZone === z.id
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {z.code} · {z.title[activeLocale]} ({zoneCounts[z.id]})
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
          {[
            { id: 'all', label: t.filterAllRegions },
            { id: 'lycian', label: t.filterLycian },
            { id: 'carian', label: t.filterCarian },
            { id: 'dayhike', label: t.filterDayhike },
            { id: 'canyon', label: t.filterCanyon },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedRegion(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-colors ${
                selectedRegion === tab.id
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Difficulty Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setSelectedDifficulty('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedDifficulty === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.filterAllDiff}
          </button>
          {[1, 2, 3, 4, 5].map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {diff === 1
                ? t.diff1
                : diff === 2
                ? t.diff2
                : diff === 3
                ? t.diff3
                : diff === 4
                ? t.diff4
                : t.diff5}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Stages List */}
      {filteredStages.length === 0 ? (
        <div className="portal-card p-12 text-center text-slate-500 space-y-4">
          <FaMountain className="mx-auto text-4xl text-slate-300" />
          <p className="font-bold">{t.noResults}</p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-700 transition-colors"
          >
            {t.resetAllBtn}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredStages.map((stage) => {
            const stageTitle = stage.title[activeLocale] || stage.title.en;
            const stageSubtitle = stage.subtitle[activeLocale] || stage.subtitle.en;
            const stageDesc = stage.description[activeLocale] || stage.description.en;
            const startPt = stage.startPoint[activeLocale] || stage.startPoint.en;
            const endPt = stage.endPoint[activeLocale] || stage.endPoint.en;
            const waterInfo = stage.waterSources[activeLocale] || stage.waterSources.en;
            const highlights = stage.highlights[activeLocale] || stage.highlights.en;
            const gear = stage.gearAdvice[activeLocale] || stage.gearAdvice.en;
            const diffLabel = DIFFICULTY_LABELS[stage.difficulty]?.[activeLocale] || '';
            const zone = zoneMap[stage.zoneId];

            return (
              <article
                id={`trek-${stage.id}`}
                key={stage.id}
                className="scroll-mt-28 group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row"
              >
                {/* Left/Top Image & Badges */}
                <div className="relative lg:w-2/5 h-64 lg:h-auto min-h-[300px] overflow-hidden flex-shrink-0 bg-slate-900">
                  <img
                    src={stage.image}
                    alt={stageTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/15 lg:to-slate-950/55" />

                  <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-slate-900/90 text-cyan-300 rounded-full text-[11px] font-extrabold tracking-wider border border-white/20">
                      TREK {String(stage.trekNumber).padStart(2, '0')}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md border ${getDifficultyBadgeColor(
                        stage.difficulty
                      )}`}
                    >
                      {diffLabel}
                    </span>
                    <span className="px-3 py-1 bg-slate-900/75 backdrop-blur-md text-white rounded-full text-[11px] font-bold border border-white/20">
                      {t.regionLabels[stage.region]}
                    </span>
                    {stage.hasDetailedGuide && (
                      <span className="px-3 py-1 bg-cyan-600 text-white rounded-full text-[11px] font-extrabold shadow-md border border-cyan-300/40 inline-flex items-center gap-1">
                        <FaCube size={10} /> {t.detailedGuideBadge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white lg:hidden">
                    <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block mb-0.5">
                      {t.zonePrefix} {zone.code} · {zone.title[activeLocale]}
                    </span>
                    <h3 className="text-xl font-extrabold leading-tight">{stageTitle}</h3>
                    <p className="text-xs text-cyan-100 font-semibold mt-1">{stageSubtitle}</p>
                  </div>
                </div>

                {/* Right/Bottom Detailed Content */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-5">
                  <div>
                    <div className="hidden lg:block mb-4">
                      <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-cyan-700 mb-1">
                        {t.zonePrefix} {zone.code} · {zone.title[activeLocale]}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {stageTitle}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-700 mt-1.5">{stageSubtitle}</p>
                    </div>

                    {/* Quantitative Metric Bar (5 metrics incl. Peak) */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-3.5 px-4 rounded-xl bg-slate-50 border border-slate-200/70 mb-5 text-xs">
                      <div>
                        <span className="text-slate-500 font-semibold block">{t.statsDist}</span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          {stage.distanceKm} {t.kmUnit}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">{t.statsGain}</span>
                        <span className="font-extrabold text-cyan-700 text-sm">
                          +{stage.elevationGainM} {t.mUnit}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">{t.statsLoss}</span>
                        <span className="font-extrabold text-rose-600 text-sm">
                          -{stage.elevationLossM} {t.mUnit}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">{t.statsPeak}</span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          {stage.maxElevationM} {t.mUnit}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">{t.statsDur}</span>
                        <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                          <FaClock className="text-cyan-600" /> {stage.durationHours} {t.hourUnit}
                        </span>
                      </div>
                    </div>

                    {/* Main Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-5 font-medium">
                      {stageDesc}
                    </p>

                    {/* Waypoints & Water Info Block */}
                    <div className="space-y-2.5 p-4 md:p-5 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs mb-5">
                      <div className="flex items-start gap-2.5 text-slate-700 font-medium">
                        <FaMapMarkerAlt className="text-cyan-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 font-bold">{t.startLabel}</strong>{' '}
                          {startPt}
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 text-slate-700 font-medium">
                        <FaMapMarkerAlt className="text-rose-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 font-bold">{t.endLabel}</strong>{' '}
                          {endPt}
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 text-slate-700 font-medium pt-2.5 border-t border-slate-200/70">
                        <FaTint className="text-sky-600 flex-shrink-0 mt-0.5 text-sm" />
                        <div>
                          <strong className="text-slate-900 font-bold">{t.waterLabel}</strong>{' '}
                          {waterInfo}
                        </div>
                      </div>
                    </div>

                    {/* Highlights list */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <FaStar className="text-amber-500" /> {t.highlightsLabel}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                        {highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gear & Safety Advice */}
                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/70 flex items-start gap-3 text-xs text-amber-950 font-medium mb-6">
                      <FaExclamationTriangle className="text-amber-600 flex-shrink-0 text-sm mt-0.5" />
                      <div>
                        <strong className="font-bold block uppercase tracking-wide text-amber-800 mb-0.5">
                          {t.gearLabel}
                        </strong>
                        {gear}
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3 justify-between">
                    <Link
                      href={`/${activeLocale}/articles/trekking-routes-lycian-coast`}
                      className="text-xs font-bold text-cyan-700 hover:text-cyan-800 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <span>{t.readGuideBtn}</span> <FaChevronRight size={10} />
                    </Link>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                      {stage.hasDetailedGuide && (
                        <Link
                          href={`/${activeLocale}/routes/trekking/${stage.id}`}
                          className="w-full sm:w-auto px-5 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2"
                        >
                          <FaCube /> {t.detailedGuideBtn}
                        </Link>
                      )}
                      <a
                        href={stage.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                          stage.hasDetailedGuide
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                            : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-600/20'
                        }`}
                      >
                        <FaRoute /> {t.openMapBtn}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
