"use client";

import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCocktail,
  FaCoins,
  FaCompass,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaFlag,
  FaGlassCheers,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaMoon,
  FaMusic,
  FaRoute,
  FaSearchPlus,
  FaShieldAlt,
  FaTaxi,
  FaUtensils,
  FaWineGlassAlt,
} from 'react-icons/fa';
import Nightlife3DMap from './Nightlife3DMap';
import {
  DRINK_BUDGET_TIERS,
  NIGHTLIFE_DISTRICTS,
  NIGHTLIFE_MAP_POINTS,
  NIGHTLIFE_ZONE_PRESETS,
  NIGHT_SAFETY_RULES_2026,
  NIGHT_TIMELINE_SLOTS,
  REGIONAL_FESTIVALS,
  TURKEY_HOLIDAYS_2027,
  type FestivalCategoryId,
  type FestivalSeasonId,
  type LocaleCode,
  type NightlifePointKind,
  type NightlifeZoneId,
  type NightSafetyRule,
  type TurkeyHolidayNotice,
  type VibeFilterId,
} from '@/lib/nightlife';

type NightVibeChoice = 'club-dance' | 'live-jazz' | 'chill-wine';
type BaseResortChoice =
  | 'marmaris-icmeler'
  | 'fethiye-oludeniz'
  | 'gocek-dalyan'
  | 'kas-kalkan'
  | 'datca-akyaka';
type ReturnTimeChoice = 'before-midnight' | 'late-0200';

function renderFormattedText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-extrabold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={idx} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

const MAP_PIN_DOT: Record<NightlifePointKind, string> = {
  'mega-club': 'bg-rose-500',
  'pub-street': 'bg-amber-500',
  'rooftop-jazz': 'bg-violet-500',
  'marina-meyhane': 'bg-cyan-500',
  festival: 'bg-emerald-500',
};

interface HubCopy {
  curfewShieldTitle: string;
  curfewShieldDesc: string;
  mapEyebrow: string;
  mapTitle: string;
  mapSubtitle: string;
  allZonesCode: string;
  allZonesBtn: string;
  allZonesSub: string;
  quickPinsTitle: string;
  selectedCoordsLabel: string;
  resetZoomBtn: string;
  gmapsRouteBtn: string;
  mapKindLabels: Record<NightlifePointKind, string>;
  districtsEyebrow: string;
  districtsTitle: string;
  districtsSubtitle: string;
  vibeFilters: Record<VibeFilterId, string>;
  hoursTagLabel: string;
  entryTagLabel: string;
  vibeTagLabel: string;
  distanceTagLabel: string;
  highlightsLabel: string;
  showOnMapBtn: string;
  gmapsBtn: string;
  plannerEyebrow: string;
  plannerTitle: string;
  plannerSubtitle: string;
  curveTitle: string;
  curveClubLegend: string;
  curveLoungeLegend: string;
  curvePeakNote: string;
  curveClickHint: string;
  crowdLabel: string;
  bestForLabel: string;
  insiderTipLabel: string;
  matcherTitle: string;
  matcherSubtitle: string;
  matcherVibeLabel: string;
  matcherBaseLabel: string;
  matcherReturnLabel: string;
  vibeOpts: { id: NightVibeChoice; label: string }[];
  baseOpts: { id: BaseResortChoice; label: string }[];
  returnOpts: { id: ReturnTimeChoice; label: string }[];
  verdictCaution: string;
  verdictReady: string;
  matcherFocusBtn: string;
  festivalsEyebrow: string;
  festivalsTitle: string;
  festivalsSubtitle: string;
  festSeasonFilters: Record<FestivalSeasonId, string>;
  festCategoryFilters: Record<FestivalCategoryId, string>;
  festCategoryLabels: Record<Exclude<FestivalCategoryId, 'all'>, string>;
  festInsiderLabel: string;
  festEmptyText: string;
  festResetFiltersBtn: string;
  holidaysEyebrow: string;
  holidaysTitle: string;
  holidaysDesc: string;
  btnFullCalendar: string;
  btnHolidayGuide: string;
  budgetEyebrow: string;
  budgetTitle: string;
  budgetSubtitle: string;
  moneySaverLabel: string;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerDesc: string;
  btnGastronomy: string;
  btnAlcoholArticle: string;
  btnTransport: string;
  btnMarkets: string;
  rulesEyebrow: string;
  rulesTitle: string;
  rulesSubtitle: string;
  sourceLabel: string;
}

const HUB_COPY: Record<LocaleCode, HubCopy> = {
  ru: {
    curfewShieldTitle: '3 главных правила ночи 2026: магазины 22:00 · террасы 00:00 · такси UKOME 24/7',
    curfewShieldDesc:
      'Спиртное в супермаркетах блокируется ровно в 22:00 (Закон № 6487). По правилам Муглы открытые бары набережных стихают в 00:00 — после полуночи танцуют только внутри закрытых клубов Мармариса и Хисароню. У жёлтых такси нет «двойного ночного тарифа».',
    mapEyebrow: 'ЖИВАЯ 3D-КАРТА НОЧНОЙ ЖИЗНИ И ФЕСТИВАЛЕЙ',
    mapTitle: 'Интерактивная 3D-карта 21 локации: бары, клубы и площадки фестивалей',
    mapSubtitle:
      'Стартует с обзора всего побережья от Датчи до Каша: выберите район, фильтр категории (включая зелёные метки FEST), чип ниже или «Ближайший (GPS)». Переключайте вид: 3D-Макет, Спутник 2D или Топокарта.',
    allZonesCode: 'ВСЁ ПОБЕРЕЖЬЕ',
    allZonesBtn: 'Весь регион (21)',
    allZonesSub: 'Обзор Датча — Каш',
    quickPinsTitle: 'Быстрый подлёт к барам, руфтопам и площадкам фестивалей',
    selectedCoordsLabel: 'GPS-координаты',
    resetZoomBtn: 'Весь регион (отдалить)',
    gmapsRouteBtn: 'Маршрут в Google Maps',
    mapKindLabels: {
      'mega-club': 'Клубный квартал (до 04:00)',
      'pub-street': 'Пабы и бич-бары',
      'rooftop-jazz': 'Руфтопы, рок и джаз',
      'marina-meyhane': 'Марины и мейхане',
      festival: 'Фестиваль / Регата',
    },
    districtsEyebrow: '5 ХАРАКТЕРОВ НОЧНОГО ПОБЕРЕЖЬЯ',
    districtsTitle: 'Где танцевать до утра, где слушать рок, а где всё спит в 00:00',
    districtsSubtitle:
      'Отфильтруйте формат отдыха, чтобы ещё до бронирования отеля понимать контраст между мега-клубами Мармариса, британским Хисароню, живым Паспатуром и камерными крышами Каша.',
    vibeFilters: {
      all: 'Все районы (5)',
      'mega-club': 'Мега-клубы (1)',
      'pub-street': 'Пабы и шоу (1)',
      'rooftop-jazz': 'Рок, джаз и крыши (2)',
      'marina-meyhane': 'Марины и тихий чилл (1)',
    },
    hoursTagLabel: 'Режим',
    entryTagLabel: 'Вход / Фейс',
    vibeTagLabel: 'Атмосфера',
    distanceTagLabel: 'Логистика',
    highlightsLabel: 'Ключевые нюансы района',
    showOnMapBtn: 'На 3D-карте ↑',
    gmapsBtn: 'Google Maps',
    plannerEyebrow: 'РИТМ НОЧИ И ПОДБОР МАРШРУТА',
    plannerTitle: 'Расписание ночи 19:30–04:00 + Подборщик куда пойти сегодня',
    plannerSubtitle:
      'Интерактивный график показывает перелом в 00:00 (переход с открытых террас в закрытые клубы), а справа — умный подборщик точки и обратного транспорта под ваш курорт.',
    curveTitle: 'Ритм побережья по часам: клубы vs лаунжи и закаты',
    curveClubLegend: 'Драйв клубов и танцполов (%)',
    curveLoungeLegend: 'Атмосфера лаунжей / крыш (%)',
    curvePeakNote: '22:00 стоп-розница · 00:00 тишина террас',
    curveClickHint: 'Нажмите на час или точку графика',
    crowdLabel: 'Формат часа',
    bestForLabel: 'Лучшие точки сейчас',
    insiderTipLabel: 'Совет инсайдера',
    matcherTitle: 'Подборщик вечера: бар, время и дорога назад',
    matcherSubtitle: 'Выберите желаемый вайб, курорт вашего отеля и час возвращения.',
    matcherVibeLabel: '1. Какой вечер вы ищете?',
    matcherBaseLabel: '2. Где находится ваш отель?',
    matcherReturnLabel: '3. Во сколько планируете вернуться?',
    vibeOpts: [
      { id: 'club-dance', label: 'Танцы и клубы до утра' },
      { id: 'live-jazz', label: 'Живой рок, джаз, руфтопы' },
      { id: 'chill-wine', label: 'Вино в марине / мейхане' },
    ],
    baseOpts: [
      { id: 'marmaris-icmeler', label: 'Мармарис / Ичмелер' },
      { id: 'fethiye-oludeniz', label: 'Фетхие / Олюдениз' },
      { id: 'gocek-dalyan', label: 'Гёджек / Дальян' },
      { id: 'kas-kalkan', label: 'Каш / Калкан' },
      { id: 'datca-akyaka', label: 'Датча / Акьяка' },
    ],
    returnOpts: [
      { id: 'before-midnight', label: 'До 00:00–00:30 (пешком / маршрутка)' },
      { id: 'late-0200', label: 'Позже 01:00–03:30 ночи' },
    ],
    verdictCaution: '⚠️ ОБРАТИТЕ ВНИМАНИЕ НА ЛОКАЦИЮ И ЧАСЫ',
    verdictReady: '✅ ИДЕАЛЬНЫЙ СЦЕНАРИЙ ВЕЧЕРА',
    matcherFocusBtn: 'Показать район на 3D-карте ↑',
    festivalsEyebrow: 'КАЛЕНДАРЬ ФЕСТИВАЛЕЙ И РЕГАТ ПОБЕРЕЖЬЯ',
    festivalsTitle: '8 главных фестивалей от Датчи до Каша: миндаль, джаз, авиашоу и регаты',
    festivalsSubtitle:
      'Самые яркие события региона идут не только в разгар лета, но и в межсезонье (февраль–апрель и бархатный октябрь). Фильтруйте по сезону и нажимайте кнопку подлёта к площадке на 3D-карте.',
    festSeasonFilters: {
      all: 'Весь год (8)',
      winter: 'Зима (1)',
      spring: 'Весна (1)',
      summer: 'Лето (3)',
      autumn: 'Осень (3)',
    },
    festCategoryFilters: {
      all: 'Все форматы',
      'music-arts': 'Музыка и театр',
      'gastro-culture': 'Гастро, природа и ремёсла',
      'regatta-sport': 'Регаты, заплывы и авиашоу',
    },
    festCategoryLabels: {
      'music-arts': 'Музыка и искусство',
      'gastro-culture': 'Гастро и культура',
      'regatta-sport': 'Регата и экстрим',
    },
    festInsiderLabel: 'Совет очевидца',
    festEmptyText: 'По этой комбинации сезона и формата событий нет — сбросьте фильтр, чтобы увидеть все 8 фестивалей.',
    festResetFiltersBtn: 'Показать все 8 фестивалей',
    holidaysEyebrow: 'ОФИЦИАЛЬНЫЙ КАЛЕНДАРЬ ТУРЦИИ 2027 (DIYANET)',
    holidaysTitle: 'Байрамы и госпраздники 2027: когда закрыты банки и растут цены на отели',
    holidaysDesc:
      'Исламские праздники сдвигаются на 10–11 дней назад каждый год — учитывайте эти даты при планировании дороги по D400, аренды авто и покупки билетов в Даламан.',
    btnFullCalendar: 'Полный календарь (12 месяцев)',
    btnHolidayGuide: 'Праздники и логистика Турции',
    budgetEyebrow: 'ЦЕНЫ 2026 НА НАПИТКИ И ТАКСИ',
    budgetTitle: 'Сколько стоит ночь на побережье: пиво, коктейли, мейхане и UKOME',
    budgetSubtitle:
      'Из-за высоких акцизов в Турции алкоголь в барах стоит дороже европейских супермаркетов — ориентируйтесь на эти честные вилки 2026 года.',
    moneySaverLabel: 'КАК НЕ ПЕРЕПЛАТИТЬ',
    bannerEyebrow: 'СВЯЗАННЫЕ ГИДЫ ПОРТАЛА',
    bannerTitle: 'Куда сходить на ужин перед барами, алкоголь до 22:00 и ночной транспорт',
    bannerDesc:
      'Совместите ужин в гастро-гиде, узнайте о локальных напитках (ракы, крафт Gara Guzu, вина) и правилах вызова официального такси без переплат.',
    btnGastronomy: 'Гастрогид: ужин и мезе',
    btnAlcoholArticle: 'Алкоголь и правило 22:00',
    btnTransport: 'Ночное такси и долмуши',
    btnMarkets: 'Рынки, базары и сувениры',
    rulesEyebrow: 'ЗАКОНЫ 2025–2026, ТАКСИ И БЕЗОПАСНОСТЬ',
    rulesTitle: '4 правила ночного города: от закона 22:00 до счетов и кнопки 112',
    rulesSubtitle:
      'Сохраните эти нюансы перед выходом: реальный регламент тишины 00:00, оплата картой строго в TRY без комиссии DCC и вызов жёлтого такси по счётчику.',
    sourceLabel: 'Официальный источник',
  },
  en: {
    curfewShieldTitle: '3 Essential Night Rules 2026: Stores 22:00 · Open-Air 00:00 · 24h Metered Taxis',
    curfewShieldDesc:
      'Retail bottle shops halt alcohol sales nationwide at 22:00 (Law 6487). Under strict Muğla rules, outdoor beach/terrace music dims sharply at 00:00—continuing late only inside soundproofed clubs in Marmaris & Hisarönü. Yellow taxis run one 24h meter rate with zero night surcharge.',
    mapEyebrow: 'INTERACTIVE 3D NIGHTLIFE & FESTIVALS MAP',
    mapTitle: 'Live 3D Map of 21 Bars, Rooftops, Jazz Lanes & Festival Venues',
    mapSubtitle:
      'Opens on the full Datça–Kaş coastal span with color-coded pins (including emerald FEST sites): click any town, quick venue chip below, or "Nearest (GPS)".',
    allZonesCode: 'FULL OVERVIEW',
    allZonesBtn: 'Full Coast (21)',
    allZonesSub: 'Datça — Kaş pins',
    quickPinsTitle: 'Fly directly to any bar street, jazz harbor or festival stage',
    selectedCoordsLabel: 'GPS Coordinates',
    resetZoomBtn: 'Full Region (Zoom Out)',
    gmapsRouteBtn: 'Directions in Google Maps',
    mapKindLabels: {
      'mega-club': 'Nightclub Hub (Till 04:00)',
      'pub-street': 'Pubs & Beach Bars',
      'rooftop-jazz': 'Rooftops, Rock & Jazz',
      'marina-meyhane': 'Marina & Meyhanes',
      festival: 'Festival / Regatta Venue',
    },
    districtsEyebrow: '5 DISTINCT NIGHT PERSONALITIES',
    districtsTitle: 'Where to Dance Until 04:00, Hear Live Guitars, or Sleep by Midnight',
    districtsSubtitle:
      'Filter by vibe before booking hotels so you know the contrast between Marmaris Bar Street, Hisarönü neon pubs, Paspatur rock alleys, Kaş rooftops & quiet marinas.',
    vibeFilters: {
      all: 'All Districts (5)',
      'mega-club': 'Mega-Clubs (1)',
      'pub-street': 'Pub Strip (1)',
      'rooftop-jazz': 'Live Music & Rooftops (2)',
      'marina-meyhane': 'Quiet Marinas & Meyhanes (1)',
    },
    hoursTagLabel: 'Hours',
    entryTagLabel: 'Door Policy',
    vibeTagLabel: 'Energy / Music',
    distanceTagLabel: 'Logistics',
    highlightsLabel: 'What Matters on Site',
    showOnMapBtn: 'Locate on 3D Map ↑',
    gmapsBtn: 'Google Maps',
    plannerEyebrow: 'NIGHT TIMELINE & ROUTE MATCHER',
    plannerTitle: 'Evening Rhythm 19:30–04:00 + Smart Where-To-Go Tonight Picker',
    plannerSubtitle:
      'Track the critical midnight handover from sunset beach patios to indoor dancefloors, and match your vibe, base resort & return hour below.',
    curveTitle: 'Coastal Night Curve: Club Energy vs Sunset Lounge Vibe',
    curveClubLegend: 'Club & Dancefloor Energy (%)',
    curveLoungeLegend: 'Sunset Rooftop / Lounge Vibe (%)',
    curvePeakNote: '22:00 Retail Cutoff · 00:00 Patio Curfew',
    curveClickHint: 'Click any hour or chart node',
    crowdLabel: 'Atmosphere',
    bestForLabel: 'Best Places Right Now',
    insiderTipLabel: 'Local Insider Tip',
    matcherTitle: 'Where to Go Tonight: Venue & Return Ride Planner',
    matcherSubtitle: 'Pick your mood, hotel resort & planned return hour.',
    matcherVibeLabel: '1. What kind of night do you want?',
    matcherBaseLabel: '2. Where is your hotel?',
    matcherReturnLabel: '3. Planned return window?',
    vibeOpts: [
      { id: 'club-dance', label: 'Late-night DJs & dancefloors' },
      { id: 'live-jazz', label: 'Live bands, jazz & rooftops' },
      { id: 'chill-wine', label: 'Marina wine / meyhane dinner' },
    ],
    baseOpts: [
      { id: 'marmaris-icmeler', label: 'Marmaris / İçmeler' },
      { id: 'fethiye-oludeniz', label: 'Fethiye / Ölüdeniz' },
      { id: 'gocek-dalyan', label: 'Göcek / Dalyan' },
      { id: 'kas-kalkan', label: 'Kaş / Kalkan' },
      { id: 'datca-akyaka', label: 'Datça / Akyaka' },
    ],
    returnOpts: [
      { id: 'before-midnight', label: 'By 00:00–00:30 (walk / dolmuş)' },
      { id: 'late-0200', label: 'Late 01:00–03:30 AM' },
    ],
    verdictCaution: '⚠️ CHECK RESORT CURFEW & RETURN LOGISTICS',
    verdictReady: '✅ PERFECT NIGHT MATCH',
    matcherFocusBtn: 'Pin Best District on 3D Map ↑',
    festivalsEyebrow: 'COASTAL FESTIVALS & REGATTAS CALENDAR',
    festivalsTitle: '8 Signature Festivals (Datça to Kaş): Blossoms, Jazz, Air Games & Sails',
    festivalsSubtitle:
      'The coast’s finest gatherings bloom outside peak package crowds—especially February–April and crisp velvet October. Filter by season and pin any festival venue on the 3D map.',
    festSeasonFilters: {
      all: 'Full Year (8)',
      winter: 'Winter (1)',
      spring: 'Spring (1)',
      summer: 'Summer (3)',
      autumn: 'Autumn (3)',
    },
    festCategoryFilters: {
      all: 'All Themes',
      'music-arts': 'Music & Theatre',
      'gastro-culture': 'Food, Nature & Crafts',
      'regatta-sport': 'Regattas, Swim & Air Shows',
    },
    festCategoryLabels: {
      'music-arts': 'Music & Arts',
      'gastro-culture': 'Food & Culture',
      'regatta-sport': 'Regatta & Air Show',
    },
    festInsiderLabel: 'Local Timing Tip',
    festEmptyText: 'No festivals match this exact season + category combo—reset filters to browse all 8 events.',
    festResetFiltersBtn: 'Show All 8 Festivals',
    holidaysEyebrow: '2027 TURKEY PUBLIC & LUNAR HOLIDAYS (DIYANET)',
    holidaysTitle: 'Bayram Surges & National Days 2027: Bank Closures & Booking Alerts',
    holidaysDesc:
      'Islamic holidays shift ~10–11 days earlier every year—factor these surges into Dalaman flights, car rentals and D400 road transfers.',
    btnFullCalendar: '12-Month Event Calendar',
    btnHolidayGuide: 'Public Holidays & Etiquette',
    budgetEyebrow: '2026 BAR & TRANSIT BENCHMARKS',
    budgetTitle: 'Night Out Budget: Draft Beer, Cocktails, Meyhane & Metered Taxis',
    budgetSubtitle:
      'Turkish alcohol taxes keep club tabs closer to Western Europe—use these realistic 2026 EUR/TRY ranges to plan without surprises.',
    moneySaverLabel: 'SMART BUDGET TIP',
    bannerEyebrow: 'CONNECTED COASTAL GUIDES',
    bannerTitle: 'Pre-Bar Dinners, Law 6487 Retail Alcohol & Late-Night Transport',
    bannerDesc:
      'Pair your night with our Aegean gastronomy guide, local *Gara Guzu* & *rakı* breakdown, and step-by-step taxi/dolmuş instructions.',
    btnGastronomy: 'Aegean Gastronomy Guide',
    btnAlcoholArticle: 'Drinks & 22:00 Store Rule',
    btnTransport: 'Late Dolmuş & UKOME Taxis',
    btnMarkets: 'Markets, Bazaars & Crafts',
    rulesEyebrow: '2025–2026 ORDINANCES, TABS & SAFETY',
    rulesTitle: '4 Critical Nightlife Rules: Curfews, Itemized Bills, TRY & 112',
    rulesSubtitle:
      'Stay sharp on the 00:00 open-air sound cutoff, 22:00 supermarket alcohol locks, rejecting euro DCC card fees, and calling official cabs cleanly.',
    sourceLabel: 'Verified Source',
  },
  de: {
    curfewShieldTitle: '3 Nacht-Regeln 2026: Laden-Stopp 22:00 · Außenruhe 00:00 · 24h-Einheitstaxi',
    curfewShieldDesc:
      'Supermärkte verkaufen landesweit ab 22:00 Uhr keinen Alkohol (Gesetz 6487). Durch strenge Lärmregeln endet Außenmusik um 00:00 Uhr—später wird nur in geschlossenen Clubs in Marmaris & Hisarönü gefeiert. Gelbe Taxis kennen keinen Nachttarif-Zuschlag.',
    mapEyebrow: 'INTERAKTIVE 3D-NACHTLEBEN- & FESTIVALKARTE',
    mapTitle: 'Live 3D-Karte: 21 Ausgehmeilen, Rooftops & Festival-Schauplätze',
    mapSubtitle:
      'Startet mit der Gesamtansicht von Datça bis Kaş: Wählen Sie Stadt, Kategorie-Filter (inkl. grüne FEST-Pins), Schnell-Chip oder „Nächster (GPS)“.',
    allZonesCode: 'ÜBERSICHT',
    allZonesBtn: 'Ganze Küste (21)',
    allZonesSub: 'Datça bis Kaş',
    quickPinsTitle: 'Direkt zu Ausgehvierteln, Jazzhäfen oder Festivalorten springen',
    selectedCoordsLabel: 'GPS-Koordinaten',
    resetZoomBtn: 'Ganze Region (Rauszoomen)',
    gmapsRouteBtn: 'Route in Google Maps',
    mapKindLabels: {
      'mega-club': 'Club-Meile (bis 04:00)',
      'pub-street': 'Pubs & Strandbars',
      'rooftop-jazz': 'Rooftops, Rock & Jazz',
      'marina-meyhane': 'Marina & Meyhanes',
      festival: 'Festival / Regatta-Ort',
    },
    districtsEyebrow: '5 UNTERSCHIEDLICHE NACHT-CHARAKTERE',
    districtsTitle: 'Wo man bis 04:00 tanzt, Live-Rock hört oder ab Mitternacht schläft',
    districtsSubtitle:
      'Filtern Sie nach Stimmung, um schon vor der Hotelbuchung den Kontrast zwischen Marmaris, Hisarönü, Paspatur, Kaş-Dachterrassen und Göcek zu kennen.',
    vibeFilters: {
      all: 'Alle Viertel (5)',
      'mega-club': 'Mega-Clubs (1)',
      'pub-street': 'Party-Pubs (1)',
      'rooftop-jazz': 'Live-Musik & Dächer (2)',
      'marina-meyhane': 'Ruhige Marinas (1)',
    },
    hoursTagLabel: 'Zeiten',
    entryTagLabel: 'Einlass',
    vibeTagLabel: 'Musik / Energie',
    distanceTagLabel: 'Anfahrt',
    highlightsLabel: 'Wichtig vor Ort',
    showOnMapBtn: 'Auf 3D-Karte ↑',
    gmapsBtn: 'Google Maps',
    plannerEyebrow: 'ABEND-TIMING & VIERTEL-PLANER',
    plannerTitle: 'Nachtrhythmus 19:30–04:00 + Ausgeh-Check für heute Abend',
    plannerSubtitle:
      'Sehen Sie den Übergang um 00:00 Uhr von Außenterrassen in geschlossene Hallen und finden Sie das beste Ziel passend zu Ihrem Urlaubsort.',
    curveTitle: 'Abendkurve an der Küste: Club-Energie vs. Lounge-Stimmung',
    curveClubLegend: 'Club- & Tanzflächen-Energie (%)',
    curveLoungeLegend: 'Sundowner & Lounge-Atmosphäre (%)',
    curvePeakNote: '22:00 Ladenstopp · 00:00 Außen-Sperrstunde',
    curveClickHint: 'Stunde oder Kurvenpunkt antippen',
    crowdLabel: 'Stimmung',
    bestForLabel: 'Beste Adresse jetzt',
    insiderTipLabel: 'Insider-Tipp',
    matcherTitle: 'Ausgeh-Planer: Wohin heute Abend + Rückweg',
    matcherSubtitle: 'Wählen Sie Ihren Musikwunsch, Urlaubsort und Rückkehrzeitpunkt.',
    matcherVibeLabel: '1. Worauf haben Sie Lust?',
    matcherBaseLabel: '2. Wo liegt Ihr Hotel?',
    matcherReturnLabel: '3. Wann geht es zurück?',
    vibeOpts: [
      { id: 'club-dance', label: 'Clubs & Tanzen bis spät' },
      { id: 'live-jazz', label: 'Live-Bands, Jazz & Rooftops' },
      { id: 'chill-wine', label: 'Marina-Wein / Meyhane' },
    ],
    baseOpts: [
      { id: 'marmaris-icmeler', label: 'Marmaris / İçmeler' },
      { id: 'fethiye-oludeniz', label: 'Fethiye / Ölüdeniz' },
      { id: 'gocek-dalyan', label: 'Göcek / Dalyan' },
      { id: 'kas-kalkan', label: 'Kaş / Kalkan' },
      { id: 'datca-akyaka', label: 'Datça / Akyaka' },
    ],
    returnOpts: [
      { id: 'before-midnight', label: 'Bis 00:00–00:30 (zu Fuß / Dolmuş)' },
      { id: 'late-0200', label: 'Später (01:00–03:30 Uhr)' },
    ],
    verdictCaution: '⚠️ SPERRSTUNDE & HEIMWEG BEACHTEN',
    verdictReady: '✅ PERFEKTE ABENDWAHL',
    matcherFocusBtn: 'Passendes Viertel auf 3D-Karte ↑',
    festivalsEyebrow: 'FESTIVAL- & REGATTA-KALENDER',
    festivalsTitle: '8 Küsten-Festivals (Datça bis Kaş): Mandelblüte, Jazz, Air Games & Segelwoche',
    festivalsSubtitle:
      'Die stimmungsvollsten Feste steigen oft außerhalb der Hochsaison (Februar–April sowie goldener Oktober). Filtern Sie nach Jahreszeit und springen Sie direkt auf die 3D-Karte.',
    festSeasonFilters: {
      all: 'Ganzes Jahr (8)',
      winter: 'Winter (1)',
      spring: 'Frühling (1)',
      summer: 'Sommer (3)',
      autumn: 'Herbst (3)',
    },
    festCategoryFilters: {
      all: 'Alle Themen',
      'music-arts': 'Musik & Theater',
      'gastro-culture': 'Genuss, Natur & Handwerk',
      'regatta-sport': 'Regatten, Schwimmen & Flugshow',
    },
    festCategoryLabels: {
      'music-arts': 'Musik & Kunst',
      'gastro-culture': 'Kulinarik & Kultur',
      'regatta-sport': 'Regatta & Flugshow',
    },
    festInsiderLabel: 'Insider-Tipp vor Ort',
    festEmptyText: 'Keine Treffer für diese Kombination aus Saison & Thema—Filter zurücksetzen für alle 8 Festivals.',
    festResetFiltersBtn: 'Alle 8 Festivals zeigen',
    holidaysEyebrow: 'FEIERTAGE & BAYRAM-TERMINE 2027 (DIYANET)',
    holidaysTitle: 'Feiertage & Reisewellen 2027: Wann Banken schließen & Preise steigen',
    holidaysDesc:
      'Islamische Feste wandern jährlich 10–11 Tage nach vorn—kalkulieren Sie diese Wochenenden bei Mietwagen, Inlandsflügen und Fahrten auf der D400 ein.',
    btnFullCalendar: '12-Monats-Eventkalender',
    btnHolidayGuide: 'Feiertage & Etikette Türkei',
    budgetEyebrow: 'GETRÄNKE- & TAXIPREISE 2026',
    budgetTitle: 'Was kostet ein Abend: Bier, Cocktails, Meyhane & UKOME-Taxi',
    budgetSubtitle:
      'Wegen hoher Alkoholsteuern entsprechen Barpreise oft westeuropäischem Niveau—mit diesen Richtwerten kalkulieren Sie sicher.',
    moneySaverLabel: 'SPARTIPP',
    bannerEyebrow: 'PASSENDE GUIDE-THEMEN',
    bannerTitle: 'Abendessen vorab, 22-Uhr-Alkoholgesetz & Spät-Transport',
    bannerDesc:
      'Kombinieren Sie unsere Restaurant-Tipps mit den Regeln für regionale Weine/Craft-Bier und dem UKOME-Taxitarif.',
    btnGastronomy: 'Kulinarik-Guide',
    btnAlcoholArticle: 'Getränke & 22-Uhr-Regel',
    btnTransport: 'Nacht-Dolmuş & Taxi',
    btnMarkets: 'Wochenmärkte & Basare',
    rulesEyebrow: 'GESETZE 2025/2026, ZAHLUNG & SICHERHEIT',
    rulesTitle: '4 Wichtige Ausgehregeln: 00:00-Sperrstunde, Belege, TRY & Notruf 112',
    rulesSubtitle:
      'Alle Praxisregeln auf einen Blick: Außen-Lärmlimit 00:00, Supermarkt-Limit 22:00, Kartenzahlung in TRY und sichere Taxis.',
    sourceLabel: 'Offizielle Quelle',
  },
  tr: {
    curfewShieldTitle: '2026 Gece Hayatı 3 Altın Kural: Market 22:00 · Açık Hava 00:00 · 24 Saat Tek Taksimetre',
    curfewShieldDesc:
      'Market ve tekellerde alkol satışı saat 22:00’de durur (6487 Sayılı Kanun). Muğla denetimleriyle sahil ve teraslarda açık alan müziği 00:00’da kısılır; geç saat eğlencesi Marmaris ve Hisarönü kapalı kulüplerinde sürer. Sarı taksilerde gece çift tarife yoktur.',
    mapEyebrow: 'CANLI 3D GECE HAYATI VE FESTİVAL HARİTASI',
    mapTitle: '21 Eğlence Sokağı, Teras Bar ve Festival Alanı — 3D Harita',
    mapSubtitle:
      'Harita tüm Datça–Kaş kıyı şeridini gösterir (yeşil FEST pinleri dahil): yakınlaşmak için bir bölge, kategori filtresi veya «En Yakın (GPS)» düğmesine tıklayın.',
    allZonesCode: 'GENEL BAKIŞ',
    allZonesBtn: 'Tüm Kıyı (21)',
    allZonesSub: 'Datça — Kaş arası',
    quickPinsTitle: 'Haritadaki bar sokaklarına, caz limanlarına ve festival alanlarına odaklanın',
    selectedCoordsLabel: 'GPS Koordinatları',
    resetZoomBtn: 'Tüm Bölge (Uzaklaş)',
    gmapsRouteBtn: 'Google Haritalar Yol Tarifi',
    mapKindLabels: {
      'mega-club': 'Kulüp Koridoru (04:00)',
      'pub-street': 'Pub & Sahil Barları',
      'rooftop-jazz': 'Teras, Rock & Caz',
      'marina-meyhane': 'Marina & Meyhane',
      festival: 'Festival / Yarış Alanı',
    },
    districtsEyebrow: '5 FARKLI KIYI KARAKTERİ',
    districtsTitle: 'Nerede 04:00’e Kadar Dans Edilir, Nerede 00:00’da Sessizlik Başlar?',
    districtsSubtitle:
      'Otel seçmeden önce Marmaris Barlar Sokağı, Hisarönü, Paspatur canlı müzik sokakları, Kaş çatı terasları ve sakin Göcek arasındaki farkı görün.',
    vibeFilters: {
      all: 'Tüm Bölgeler (5)',
      'mega-club': 'Mega Kulüpler (1)',
      'pub-street': 'Pub Caddeleri (1)',
      'rooftop-jazz': 'Canlı Müzik & Teras (2)',
      'marina-meyhane': 'Sakin Marina & Meyhane (1)',
    },
    hoursTagLabel: 'Saatler',
    entryTagLabel: 'Giriş Kuralı',
    vibeTagLabel: 'Enerji / Tarz',
    distanceTagLabel: 'Ulaşım',
    highlightsLabel: 'Öne Çıkan Detaylar',
    showOnMapBtn: '3D Haritada Gör ↑',
    gmapsBtn: 'Google Haritalar',
    plannerEyebrow: 'GECE AKIŞI VE MEKAN SEÇİCİ',
    plannerTitle: '19:30–04:00 Eğlence Eğrisi + Bu Akşam Nereye Gidilir?',
    plannerSubtitle:
      'Saat 00:00’daki açık hava / kapalı kulüp geçişini inceleyin ve konakladığınız ilçeye göre en doğru akşam rotasını belirleyin.',
    curveTitle: 'Kıyıda Gece Ritmi: Kulüp Enerjisi vs. Gün Batımı Terasları',
    curveClubLegend: 'Kulüp & Dans Pisti Enerjisi (%)',
    curveLoungeLegend: 'Teras & Meyhane Atmosferi (%)',
    curvePeakNote: '22:00 Market Sınırı · 00:00 Açık Hava Eşiği',
    curveClickHint: 'Bir saate veya grafik noktasına dokunun',
    crowdLabel: 'Ortam',
    bestForLabel: 'Bu Saatte En İyi Noktalar',
    insiderTipLabel: 'Yerel İpucu',
    matcherTitle: 'Akşam Planlayıcı: Mekan, Saat ve Dönüş',
    matcherSubtitle: 'Aradığınız modu, konakladığınız yeri ve dönüş saatini seçin.',
    matcherVibeLabel: '1. Nasıl bir akşam istiyorsunuz?',
    matcherBaseLabel: '2. Oteliniz nerede?',
    matcherReturnLabel: '3. Saat kaçta döneceksiniz?',
    vibeOpts: [
      { id: 'club-dance', label: 'Sabaha kadar DJ & dans kulübü' },
      { id: 'live-jazz', label: 'Canlı rock, caz ve çatı bar' },
      { id: 'chill-wine', label: 'Marina şarap / meyhane sohbeti' },
    ],
    baseOpts: [
      { id: 'marmaris-icmeler', label: 'Marmaris / İçmeler' },
      { id: 'fethiye-oludeniz', label: 'Fethiye / Ölüdeniz' },
      { id: 'gocek-dalyan', label: 'Göcek / Dalyan' },
      { id: 'kas-kalkan', label: 'Kaş / Kalkan' },
      { id: 'datca-akyaka', label: 'Datça / Akyaka' },
    ],
    returnOpts: [
      { id: 'before-midnight', label: '00:00–00:30 öncesi (yürüyüş / dolmuş)' },
      { id: 'late-0200', label: 'Geç saat (01:00–03:30)' },
    ],
    verdictCaution: '⚠️ SAAT VE DÖNÜŞ LOJİSTİĞİNE DİKKAT',
    verdictReady: '✅ MÜKEMMEL AKŞAM PLANI',
    matcherFocusBtn: 'Uygun Bölgeyi 3D Haritada Aç ↑',
    festivalsEyebrow: 'BÖLGESEL FESTİVALLER VE REGATTA TAKVİMİ',
    festivalsTitle: 'Datça’dan Kaş’a 8 Öne Çıkan Festival: Badem Çiçeği, Caz, Hava Oyunları & Yelken',
    festivalsSubtitle:
      'Bölgenin en samimi kültür ve spor buluşmaları yaz pikinin dışında (Şubat–Nisan ve Ekim) gerçekleşir. Sezona göre filtreleyin ve alanı 3D haritada görün.',
    festSeasonFilters: {
      all: 'Tüm Yıl (8)',
      winter: 'Kış (1)',
      spring: 'İlkbahar (1)',
      summer: 'Yaz (3)',
      autumn: 'Sonbahar (3)',
    },
    festCategoryFilters: {
      all: 'Tüm Kategoriler',
      'music-arts': 'Müzik & Tiyatro',
      'gastro-culture': 'Gastronomi, Doğa & Zanaat',
      'regatta-sport': 'Yelken, Yüzme & Hava Oyunları',
    },
    festCategoryLabels: {
      'music-arts': 'Müzik & Sanat',
      'gastro-culture': 'Lezzet & Kültür',
      'regatta-sport': 'Yelken & Gösteri',
    },
    festInsiderLabel: 'Yerel İpucu',
    festEmptyText: 'Seçilen sezon ve kategori kombinasyonu için etkinlik bulunamadı—tüm 8 festivali görmek için filtreyi sıfırlayın.',
    festResetFiltersBtn: 'Tüm 8 Festivali Göster',
    holidaysEyebrow: '2027 RESMÎ VE DİNÎ BAYRAMLAR (DİYANET)',
    holidaysTitle: '2027 Bayram Yoğunluğu ve Millî Günler: Banka Saatleri ve Trafik Uyarıları',
    holidaysDesc:
      'Dinî bayramlar ay takvimi gereği her yıl ~10–11 gün öne kayar; Dalaman uçuşları, araç kiralama ve D400 planlamasında bu tarihleri göz önünde bulundurun.',
    btnFullCalendar: '12 Aylık Etkinlik Takvimi',
    btnHolidayGuide: 'Bayramlar & Seyahat Rehberi',
    budgetEyebrow: '2026 BAR VE ULAŞIM BÜTÇESİ',
    budgetTitle: 'Bir Akşam Ne Kadar Tutar? Bira, Kokteyl, Meyhane ve UKOME',
    budgetSubtitle:
      'Yüksek alkol vergileri nedeniyle bar fiyatları Avrupa ortalamalarına yakındır; 2026 yılı güncel EUR/TRY aralıklarıyla bütçenizi planlayın.',
    moneySaverLabel: 'TASARRUF İPUCU',
    bannerEyebrow: 'BAĞLANTILI REHBERLER',
    bannerTitle: 'Bar Öncesi Akşam Yemeği, 22:00 Kuralı ve Gece Ulaşımı',
    bannerDesc:
      'Gastronomi rehberimizle akşam yemeğinizi seçin, yerel Gara Guzu & rakı kültürünü ve duraktan güvenli taksi çağırmayı inceleyin.',
    btnGastronomy: 'Bölge Gastronomi Rehberi',
    btnAlcoholArticle: 'İçecekler ve 22:00 Kuralı',
    btnTransport: 'Gece Dolmuş & UKOME Taksi',
    btnMarkets: 'Pazarlar, Çarşılar ve El Sanatları',
    rulesEyebrow: 'KANUNLAR, TAKSİ VE GÜVENLİK',
    rulesTitle: 'Gece Dışarı Çıkmadan Önce Bilmeniz Gereken 4 Kritik Kural',
    rulesSubtitle:
      '00:00 açık alan ses kuralı, 22:00 market kilidi, adisyon kontrolü, POS cihazında TRY seçimi ve 112 acil hattı.',
    sourceLabel: 'Resmî Bilgi',
  },
};

function getRuleHeaderClass(tone: NightSafetyRule['tone']): string {
  switch (tone) {
    case 'rose':
      return 'bg-rose-700 text-white';
    case 'amber':
      return 'bg-amber-600 text-white';
    case 'cyan':
      return 'bg-cyan-700 text-white';
    default:
      return 'bg-slate-900 text-white';
  }
}

function getHolidayAccentClass(tone: TurkeyHolidayNotice['tone']): string {
  switch (tone) {
    case 'rose':
      return 'bg-rose-500/20 text-rose-300 border-rose-500/35';
    case 'amber':
      return 'bg-amber-500/20 text-amber-300 border-amber-500/35';
    default:
      return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/35';
  }
}

export default function NightlifeHub({ locale }: { locale: LocaleCode }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale) ? locale : 'en';
  const t = HUB_COPY[activeLocale];

  // 3D Map state (starts with full coast overview)
  const mapSectionRef = useRef<HTMLElement | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<NightlifeZoneId | 'all'>('all');
  const [activeKindFilter, setActiveKindFilter] = useState<NightlifePointKind | 'all'>('all');
  const [focusedPointId, setFocusedPointId] = useState<string | null>(null);

  // District vibe filter state
  const [vibeFilter, setVibeFilter] = useState<VibeFilterId>('all');

  // Festivals & regattas filter state
  const [seasonFilter, setSeasonFilter] = useState<FestivalSeasonId>('all');
  const [festivalCatFilter, setFestivalCatFilter] = useState<FestivalCategoryId>('all');

  // Night timeline state
  const [activeSlotId, setActiveSlotId] = useState<string>('2200');

  // Interactive Evening Matcher state
  const [vibe, setVibe] = useState<NightVibeChoice>('live-jazz');
  const [base, setBase] = useState<BaseResortChoice>('fethiye-oludeniz');
  const [returnTime, setReturnTime] = useState<ReturnTimeChoice>('before-midnight');

  const visibleMapPoints = useMemo(() => {
    return NIGHTLIFE_MAP_POINTS.filter(
      (p) =>
        (activeZoneId === 'all' || p.zoneId === activeZoneId) &&
        (activeKindFilter === 'all' || p.kind === activeKindFilter)
    );
  }, [activeKindFilter, activeZoneId]);

  const focusedPoint = useMemo(() => {
    return NIGHTLIFE_MAP_POINTS.find((p) => p.id === focusedPointId) || null;
  }, [focusedPointId]);

  const visibleDistricts = useMemo(() => {
    if (vibeFilter === 'all') return NIGHTLIFE_DISTRICTS;
    return NIGHTLIFE_DISTRICTS.filter((d) => d.kind === vibeFilter);
  }, [vibeFilter]);

  const filteredFestivals = useMemo(() => {
    return REGIONAL_FESTIVALS.filter(
      (f) =>
        (seasonFilter === 'all' || f.season === seasonFilter) &&
        (festivalCatFilter === 'all' || f.category === festivalCatFilter)
    );
  }, [festivalCatFilter, seasonFilter]);

  const activeSlot = useMemo(() => {
    return NIGHT_TIMELINE_SLOTS.find((s) => s.id === activeSlotId) || NIGHT_TIMELINE_SLOTS[1];
  }, [activeSlotId]);

  const matcherResult = useMemo(() => {
    if (vibe === 'club-dance' && (base === 'gocek-dalyan' || base === 'datca-akyaka')) {
      return {
        status: 'caution' as const,
        targetPointId: base === 'gocek-dalyan' ? 'gocek-marina-lounges' : 'datca-eski-meyhane',
        targetZoneId: (base === 'gocek-dalyan' ? 'gocek-dalyan' : 'datca-akyaka') as NightlifeZoneId,
        msg: {
          ru: 'Важно знать до выхода: в Гёджеке, Дальяне и на Датче **НЕТ ночных дискотек до утра** — там всё стихает к **00:00–00:30**! За клубами до 03:30–04:00 нужно ехать на такси UKOME в Мармарис или в Хисароню (40–90 мин пути и ~€35–75 в одну сторону). Либо выберите спокойный вечер у воды на месте.',
          en: 'Know before heading out: Göcek, Dalyan, Datça & Akyaka have **ZERO dawn EDM clubs**—everything winds down quietly around **00:00–00:30**. True late clubbing means a 40–90 min ride to Marmaris Bar Street or Hisarönü (€35–75+ one-way UKOME cab).',
          de: 'Wichtig vorab: In Göcek, Dalyan, Datça & Akyaka gibt es **KEINE Clubs bis 04:00 Uhr**—alles wird gegen **00:00–00:30** ruhig. Für echte Clubs brauchen Sie ein Taxi nach Marmaris oder Hisarönü (40–90 Min., ca. 35–75 € pro Fahrt).',
          tr: 'Önemli uyarı: Göcek, Dalyan, Datça ve Akyaka’da sabaha kadar süren disko YOKTUR—bölge **00:00–00:30** arası tamamen sakinleşir. Kulüp için Marmaris Barlar Sokağı veya Hisarönü’ne 40–90 dk araç/taksi gerekir.',
        }[activeLocale],
      };
    }

    if (vibe === 'club-dance' && base === 'kas-kalkan') {
      return {
        status: 'caution' as const,
        targetPointId: 'kas-harbor-rooftops',
        targetZoneId: 'kas-kalkan' as NightlifeZoneId,
        msg: {
          ru: 'В **Каше и Калкане** нет огромных пенных клубов и мейнстрим-дискотек. Зато коктейльные руфтопы, джаз и винил-бары в переулках старого Каша работают стильно до **02:00–02:30**, а всё расположено в 5 минутах пешком без нужды в такси.',
          en: '**Kaş & Kalkan** intentionally avoid big foam/EDM clubs. Switch gears to Kaş Old Town’s indie vinyl bars, jazz corners & harbor rooftops open stylishly until **02:00–02:30 AM** within 5-minute walking distance.',
          de: '**Kaş & Kalkan** haben bewusst keine Großraumdiskos. Dafür genießen Sie stilvolle Vinyl-, Jazz- und Dachterrassen-Bars in Kaş bis **02:00–02:30 Uhr** bequem zu Fuß.',
          tr: '**Kaş ve Kalkan**’da büyük disko/köpük kulüpleri yoktur; bunun yerine Eski Çarşı sokaklarında plak, caz ve teras barlar **02:00–02:30**’a kadar yürüyüş mesafesinde açıktır.',
        }[activeLocale],
      };
    }

    if (vibe === 'club-dance' && returnTime === 'before-midnight') {
      return {
        status: 'caution' as const,
        targetPointId:
          base === 'marmaris-icmeler' ? 'marmaris-uzunyali-promenade' : 'hisaronu-bar-street',
        targetZoneId: (base === 'marmaris-icmeler' ? 'marmaris' : 'fethiye-hisaronu') as NightlifeZoneId,
        msg: {
          ru:
            base === 'marmaris-icmeler'
              ? 'Клубы Bar Street в Мармарисе только заполняются к 23:30, а ровно в **00:00** набережная **Uzunyalı** отключает уличный звук! Если хотите вернуться до 00:30, идеально провести вечер на пляжных барах Uzunyalı (20:30–00:00) или успеть на последний долмуш в Ичмелер.'
              : 'Главные танцполы в Хисароню разгоняются после **23:00–23:30**. Для возврата до полуночи удобнее начать с коктейля в 20:30, или сдвинуться на вечернюю живую музыку в Паспатур (Фетхие) и поехать на последней маршрутке.',
          en:
            base === 'marmaris-icmeler'
              ? 'Marmaris Bar Street clubs only peak after 23:30, whereas open-air **Uzunyalı** dims sound at **00:00**. For a pre-midnight finish, start early at Uzunyalı beach bars (20:30–00:00) or stay flexible past midnight indoors.'
              : 'Hisarönü dancefloors hit peak energy after **23:00–23:30**. If returning by midnight, start early around 20:30 or choose Fethiye Paspatur live music before the final shuttle.',
          de:
            base === 'marmaris-icmeler'
              ? 'Clubs in der Bar Street füllen sich erst ab 23:30 Uhr, während **Uzunyalı** um **00:00 Uhr** leise wird. Für eine Rückkehr vor Mitternacht ab 20:30 Uhr am Strand starten.'
              : 'Die Tanzflächen in Hisarönü starten erst ab **23:00–23:30** richtig durch. Wer um Mitternacht heim will, startet früh um 20:30 oder wählt Paspatur.',
          tr:
            base === 'marmaris-icmeler'
              ? 'Marmaris Barlar Sokağı kulüpleri 23:30’da dolar; açık hava **Uzunyalı** sahili ise **00:00**’da müziği kısar. Gece yarısı öncesi dönüş için 20:30’da Uzunyalı sahilinden başlayın.'
              : 'Hisarönü dans pistleri 23:00–23:30’dan sonra zirve yapar; 00:00 öncesi dönecekseniz saat 20:30’da erken başlamanız önerilir.',
        }[activeLocale],
      };
    }

    if (vibe === 'club-dance') {
      const isMarmaris = base === 'marmaris-icmeler';
      return {
        status: 'ready' as const,
        targetPointId: isMarmaris ? 'marmaris-bar-street' : 'hisaronu-bar-street',
        targetZoneId: (isMarmaris ? 'marmaris' : 'fethiye-hisaronu') as NightlifeZoneId,
        msg: (isMarmaris
          ? {
              ru: 'Ваш вектор — **Улица Баров Мармариса (39. Sokak)**! В 21:00–23:30 можно разогреться в марине Нетсел или на Uzunyalı, а к 00:00 перейти внутрь закрытых клубов Bar Street (работают до 03:30–04:00). Назад в Ичмелер: долмуши ходят до 01:00–02:00, позже — официальное жёлтое такси по единому 24h тарифу UKOME (€15–20).',
              en: 'Lock in **Marmaris Bar Street (39. Sokak)**! Warm up at Netsel Marina or Uzunyalı before 23:30, then step inside Bar Street’s soundproofed clubs (open till 03:30–04:00). Summer shuttles to İçmeler run till ~01:30; later cabs charge the single 24h UKOME meter (€15–20).',
              de: 'Ihr Hotspot: **Bar Street Marmaris (39. Sokak)**! Warm-up ab 21:00 an der Marina oder Uzunyalı, ab 00:00 Uhr drinnen in den Clubs bis 04:00 Uhr. Rückfahrt nach İçmeler per Spät-Dolmuş (bis ~01:30) oder UKOME-Taxi (15–20 €).',
              tr: 'Rotanız **Marmaris Barlar Sokağı (39. Sokak)**! 23:30’a kadar Uzunyalı veya Netsel Marina’da ısınıp 00:00’da kapalı kulüplere geçebilirsiniz (04:00’e dek açık). İçmeler dolmuşu 01:30 sonrası biterse taksimetreli UKOME taksi (€15–20) kullanın.',
            }
          : {
              ru: 'Ваш адрес — **Бар-стрит Хисароню (Hisarönü)**! До 21:30 закат на пляже Бельджекиз, затем 10 мин вверх в горы в неоновые пабы и клубы (пик 23:00–02:30). В пик лета ночные долмуши до Фетхие/Олюдениза ходят до ~01:30; позже берите жёлтое такси с кнопки *Taksi Durağı* по единому тарифу (€15–22).',
              en: 'Head to **Hisarönü Bar Street**! Catch sunset at Belcekız lagoon, ride 10 minutes uphill for neon pubs & dancefloors peaking 23:00–02:30. Seasonal dolmuşes run past midnight; late cabs from official *Taksi Durağı* buttons cost ~€15–22 metered.',
              de: 'Ab nach **Hisarönü Bar Street**! Erst Sonnenuntergang in Ölüdeniz, dann 10 Min. hoch in die Partymeile (Peak 23:00–02:30). Später mit dem gelben UKOME-Taxi (~15–22 €) sicher zurück.',
              tr: 'Doğru adres **Hisarönü Barlar Caddesi**! Ölüdeniz’de gün batımı sonrası 10 dakikada yukarı çıkıp 23:00–02:30 arası eğlenceye katılabilirsiniz; gece geç saatte resmi taksimetreli taksi ~€15–22 tutar.',
            })[activeLocale],
      };
    }

    if (vibe === 'live-jazz') {
      const targetMap: Record<
        BaseResortChoice,
        { zone: NightlifeZoneId; point: string; msg: Record<LocaleCode, string> }
      > = {
        'fethiye-oludeniz': {
          zone: 'fethiye-hisaronu',
          point: 'fethiye-paspatur-bars',
          msg: {
            ru: 'Идите в **Старый город Фетхие (Паспатур)**! После ужина на Рыбном рынке загляните в каменные переулки под зонтиками — живой турецкий рок, блюз и акустика начинаются в 21:30 и идут до 01:30–02:00. До Олюдениза/Чалыша после 01:00 заказывайте жёлтое такси через бармена.',
            en: 'Head straight to **Fethiye Paspatur Old Town**! Start at the Fish Market and step into lantern-lit stone pubs where Turkish rock, blues & acoustic bands play 21:30–02:00.',
            de: 'Gehen Sie in die **Altstadt Paspatur in Fethiye**! Ab 21:30 Uhr spielen echte Rock-, Blues- und Akustikbands bis ca. 02:00 Uhr.',
            tr: '**Fethiye Paspatur** tam size göre! Balık Pazarı yemeğinin ardından taş sokaklarda 21:30–02:00 arası kaliteli canlı Türkçe rock ve blues sahneleri bulacaksınız.',
          },
        },
        'kas-kalkan': {
          zone: 'kas-kalkan',
          point: 'kas-harbor-rooftops',
          msg: {
            ru: 'Идеальный вечер в **Старом Каше**! Начните в 19:30 с коктейля на руфтопе над гаванью и островом Мейс, а к 22:00 спуститесь в джаз- и виниловые бары переулков (до 02:00–02:30, всё в 5 минутах пешком!).',
            en: 'A textbook **Kaş** night! Start at 19:30 on a harbor rooftop terrace facing Kastellorizo island, then drift at 22:00 into tiny Old Town jazz & vinyl bars (walkable until 02:30 AM).',
            de: 'Ein perfekter Abend in **Kaş**! 19:30 Uhr Sunset-Cocktail auf dem Rooftop mit Blick auf Kastellorizo, ab 22:00 Uhr Jazz & Vinyl in den Gassen.',
            tr: 'Mükemmel **Kaş** akşamı: 19:30’da Meis manzaralı bir çatı barda kokteyl, 22:00 sonrası dar sokaklarda caz ve plak barları (hepsi 5 dk yürüyüş mesafesinde!).',
          },
        },
        'datca-akyaka': {
          zone: 'datca-akyaka',
          point: 'akyaka-azmak-evening',
          msg: {
            ru: 'Для живого звучания и молодёжного драйва выбирайте **кайт-бары и террасы Азмака в Акьяке** (с 18:30, локальный крафт *Gara Guzu*, акустика) или романтичные дворики **Эски-Датчи** (тихо стихают к 00:30).',
            en: 'Hit **Akyaka’s après-kite river terraces** for acoustic nights and local **Gara Guzu** craft beer until ~01:30, or candlelit Eski Datça courtyard bars wrapping calmly by 00:30.',
            de: 'Für lockere Akustik-Sets und lokales **Gara Guzu**-Bier empfiehlt sich **Akyaka** bis 01:30 Uhr (oder die ruhigen Innenhöfe in Eski Datça).',
            tr: 'Canlı akustik müzik ve yerel **Gara Guzu** birası için **Akyaka** sahil ve Azmak barları 01:30’a kadar keyiflidir; Eski Datça avluları ise daha erken ve sakindir.',
          },
        },
        'marmaris-icmeler': {
          zone: 'marmaris',
          point: 'icmeler-evening-bars',
          msg: {
            ru: 'В районе Мармариса живую музыку без рейва дают **рок-пабы на входе Bar Street**, бары с кавер-группами в **Ичмелере** и сцена на набережной Uzunyalı (уличные террасы замолкают в 00:00, внутри рок-баров до 02:00+).',
            en: 'Around Marmaris, look for live rock venues tucked inside Bar Street, **İçmeler** canal cover-band pubs (great until 00:30), or Uzunyalı before the midnight outdoor cutoff.',
            de: 'In Marmaris spielen Live-Coverbands in den Pubs von **İçmeler** (bis ~00:30) sowie in den Rockbars der Bar Street.',
            tr: 'Marmaris çevresinde canlı müzik için **İçmeler** kanal barları (00:30’a dek) veya Barlar Sokağı girişindeki rock publar en iyi seçenektir.',
          },
        },
        'gocek-dalyan': {
          zone: 'gocek-dalyan',
          point: 'dalyan-riverside-pubs',
          msg: {
            ru: 'В **Дальяне** у канала с видом на ночную подсветку скальных гробниц играет лёгкая акустика (до ~00:30–01:00). Если захочется настоящего рока до 02:00 — до Паспатура в Фетхие всего 35 минут по трассе.',
            en: '**Dalyan riverside terraces** offer mellow acoustic vibes facing lit cliff tombs until ~00:30–01:00, or hop 35 minutes over to Fethiye’s **Paspatur** for bigger live bands.',
            de: 'In **Dalyan** gibt es entspannte Akustik-Bars gegenüber den beleuchteten Felsengräbern (bis ~00:30); für größere Live-Bands liegt Fethiye (Paspatur) 35 Min. entfernt.',
            tr: '**Dalyan** kanal kenarı ışıklı mezarlar karşısında 00:30’a dek hafif müzik sunar; daha hareketli canlı sahneler için 35 dk mesafedeki Fethiye **Paspatur** idealdir.',
          },
        },
      };
      const picked = targetMap[base];
      return {
        status: 'ready' as const,
        targetPointId: picked.point,
        targetZoneId: picked.zone,
        msg: picked.msg[activeLocale],
      };
    }

    // chill-wine / marina meyhane
    const wineMap: Record<
      BaseResortChoice,
      { zone: NightlifeZoneId; point: string; msg: Record<LocaleCode, string> }
    > = {
      'marmaris-icmeler': {
        zone: 'marmaris',
        point: 'marmaris-netsel-marina',
        msg: {
          ru: 'Ваш выбор — **Netsel Marina в Мармарисе**! Вы окажетесь в 3 минутах от центра, но в тишине белых яхт, с хорошим бокалом вина и без единого уличного зазывалы.',
          en: 'Stroll straight to **Marmaris Netsel Marina**—elegant yacht views, crisp Turkish wines, and zero Bar Street hustle.',
          de: 'Besuchen Sie die **Netsel Marina in Marmaris**—elegante Yacht-Atmosphäre und gute Weine ohne den Trubel der Bar Street.',
          tr: '**Marmaris Netsel Marina** mükemmel seçimdir: Barlar Sokağı karmaşası olmadan yatların arasında şık ve huzurlu bir akşam.',
        },
      },
      'fethiye-oludeniz': {
        zone: 'fethiye-hisaronu',
        point: 'fethiye-kordon-marina',
        msg: {
          ru: 'Проведите вечер на **набережной Кордон у Марины Фетхие** (или в соседнем **Чалыше** к закату 18:45): неспешное мезе, рыбный ужин и бокал вина с видом на яхты.',
          en: 'Unwind along **Fethiye’s Kordon Marina** promenade (or catch sunset at **Çalış** at 18:45) with *meze*, grilled fish, and Aegean wine.',
          de: 'Genießen Sie **Fethiyes Kordon-Promenade** (oder den Sonnenuntergang in **Çalış**) mit frischem Fisch und türkischem Wein.',
          tr: '**Fethiye Kordon ve Marina** (veya gün batımında **Çalış**) taze meze, balık ve yat manzaralı sakin şarap keyfi için idealdir.',
        },
      },
      'gocek-dalyan': {
        zone: 'gocek-dalyan',
        point: 'gocek-marina-lounges',
        msg: {
          ru: '**Марины Гёджека** созданы именно для этого: стильные винные карты, уютные яхтенные лаунжи и идеальная ночная тишина после 00:00 (а в Дальяне — ужин с видом на освещённые гробницы).',
          en: '**Göcek’s yacht marinas** are tailor-made for this: boutique wine bars, linen-table *meyhanes* and restful quiet after 00:00 (or lit rock-tomb terraces in **Dalyan**).',
          de: '**Göceks Yacht-Marinas** sind dafür gemacht: exzellente Weinkarten, stilvolle Lounges und erholsame Nachtruhe ab Mitternacht.',
          tr: '**Göcek marinaları** tam bu beklentiye göre tasarlanmıştır: seçkin şarap evleri, şık sofralar ve gece yarısından sonra kusursuz huzur.',
        },
      },
      'kas-kalkan': {
        zone: 'kas-kalkan',
        point: 'kalkan-rooftop-terraces',
        msg: {
          ru: 'Белоснежные **террасы на крышах Калкана** или старые винные дворики **Каша** подарят лучший панорамный ужин с вином и джином. Если берете вино с собой на виллу — успейте в *Migros* до **22:00**!',
          en: 'Choose **Kalkan’s whitewashed rooftop terraces** or **Kaş’s stone wine lanes** for panoramic sea views. Buying wine for your villa terrace? Hit *Migros* before **22:00** sharp.',
          de: '**Kalkans Dachterrassen** oder die kleinen Weinbars in **Kaş** bieten Traum-Panoramen. Wein für das Apartment? Unbedingt vor **22:00 Uhr** kaufen!',
          tr: '**Kalkan çatı terasları** veya **Kaş taş sokakları** muhteşem koy manzarası eşliğinde şarap/kokteyl keyfi sunar. Villa alışverişi için 22:00 sınırını unutmayın!',
        },
      },
      'datca-akyaka': {
        zone: 'datca-akyaka',
        point: 'datca-eski-meyhane',
        msg: {
          ru: 'Золотой стандарт тихого гедонизма: 3 часа в прибрежной *мейхане* **Датчи** за осьминогом и ракы либо поздний бокал под бугенвиллеями в **Эски-Датче** (все заведения работают без клубной суеты).',
          en: 'Pure Aegean slow living: three unhurried hours over octopus *meze* and *rakı* at **Datça Harbor**, or candlelit stone patios in **Eski Datça**.',
          de: 'Entschleunigung pur: drei entspannte Stunden bei Oktupus-*Meze* am **Hafen von Datça** oder unter Bougainvilleen in **Eski Datça**.',
          tr: 'Ege’nin en sakin akşamı: **Datça Limanı**’nda 3 saatlik meze-rakı sofrası veya **Eski Datça**’nın begonvilli taş avlularında şarap keyfi.',
        },
      },
    };
    const pickedWine = wineMap[base];
    return {
      status: 'ready' as const,
      targetPointId: pickedWine.point,
      targetZoneId: pickedWine.zone,
      msg: pickedWine.msg[activeLocale],
    };
  }, [activeLocale, base, returnTime, vibe]);

  return (
    <div className="portal-container py-10 md:py-14 space-y-16 md:space-y-20">
      {/* 0. Top 2026 Curfew & Law 6487 Shield */}
      <div className="rounded-2xl bg-amber-50 border border-amber-300/90 p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-sm">
          <FaShieldAlt size={22} />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm md:text-base font-extrabold text-amber-950 flex items-center gap-2">
            <FaMoon className="text-amber-700 flex-shrink-0" />
            <span>{t.curfewShieldTitle}</span>
          </h2>
          <p className="text-xs md:text-sm text-amber-900 font-medium leading-relaxed">
            {t.curfewShieldDesc}
          </p>
        </div>
      </div>

      {/* 1. Interactive 3D Map + Zone Presets & Stationary Chips */}
      <section ref={mapSectionRef} id="nightlife-map" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaCompass /> {t.mapEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.mapTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.mapSubtitle}
            </p>
          </div>
        </div>

        {/* Full Region Button FIRST + 5 Coastal Zone Presets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            type="button"
            onClick={() => {
              setFocusedPointId(null);
              setActiveZoneId('all');
            }}
            className={`text-left p-3 rounded-2xl border transition-all flex flex-col justify-center ${
              activeZoneId === 'all' && !focusedPointId
                ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                : 'bg-rose-50 text-rose-950 border-rose-200 hover:border-rose-400'
            }`}
          >
            <span className="block text-[10px] font-black uppercase tracking-wider opacity-85">
              {t.allZonesCode}
            </span>
            <span className="block text-xs font-extrabold leading-tight">{t.allZonesBtn}</span>
            <span className="block text-[10px] font-semibold opacity-75 mt-0.5">
              {t.allZonesSub}
            </span>
          </button>

          {NIGHTLIFE_ZONE_PRESETS.map((preset) => {
            const active = activeZoneId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setFocusedPointId(null);
                  setActiveZoneId(preset.id);
                }}
                className={`text-left p-3 rounded-2xl border transition-all ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200/90 hover:border-rose-400'
                }`}
              >
                <span
                  className={`block text-[10px] font-black uppercase tracking-wider mb-0.5 ${
                    active ? 'text-rose-300' : 'text-rose-700'
                  }`}
                >
                  {preset.code}
                </span>
                <span className="block text-xs font-extrabold leading-tight">
                  {preset.title[activeLocale]}
                </span>
              </button>
            );
          })}
        </div>

        <Nightlife3DMap
          locale={activeLocale}
          activeZoneId={activeZoneId}
          activeKindFilter={activeKindFilter}
          focusedPointId={focusedPointId}
          onSelectPoint={(pointId) => setFocusedPointId(pointId)}
          onSelectZone={(zoneId) => {
            setFocusedPointId(null);
            setActiveZoneId(zoneId);
          }}
          onSelectKindFilter={(kind) => {
            setFocusedPointId(null);
            setActiveKindFilter(kind);
          }}
        />

        {/* Quick-Jump Marker Chips Bar (kept stationary right below the map) */}
        <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-800">
              <FaSearchPlus className="text-rose-600" />
              <span>{t.quickPinsTitle}</span>
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              {visibleMapPoints.length} / {NIGHTLIFE_MAP_POINTS.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {visibleMapPoints.map((pt) => {
              const isSelected = focusedPointId === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => {
                    setActiveZoneId(pt.zoneId);
                    setFocusedPointId(pt.id);
                    const rect = mapSectionRef.current?.getBoundingClientRect();
                    if (rect && rect.top < 12) {
                      mapSectionRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all inline-flex items-center gap-2 text-left ${
                    isSelected
                      ? 'bg-slate-900 text-rose-300 border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-rose-400 hover:bg-rose-50/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${MAP_PIN_DOT[pt.kind]}`} />
                  <span className="truncate max-w-[230px]">
                    {pt.title[activeLocale].replace(/\*/g, '')}
                  </span>
                  <span
                    className={`text-[10px] font-semibold opacity-75 hidden sm:inline ${
                      isSelected ? 'text-rose-200' : 'text-slate-500'
                    }`}
                  >
                    · {pt.hoursBadge[activeLocale]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Nightlife Point Spotlight Card (below chips so buttons never jump down) */}
        {focusedPoint && (
          <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-rose-400 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-rose-300 text-[10px] font-extrabold uppercase tracking-wider">
                  <span className={`w-2 h-2 rounded-full ${MAP_PIN_DOT[focusedPoint.kind]}`} />
                  {t.mapKindLabels[focusedPoint.kind]}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-[11px] font-extrabold">
                  {focusedPoint.hoursBadge[activeLocale]}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600">
                  <FaMapMarkerAlt className="text-rose-600" size={11} />
                  {t.selectedCoordsLabel}:{' '}
                  <strong className="text-slate-900">
                    {focusedPoint.coordinates[1].toFixed(4)}° N,{' '}
                    {focusedPoint.coordinates[0].toFixed(4)}° E
                  </strong>
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                {renderFormattedText(focusedPoint.title[activeLocale])}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-violet-800">
                {renderFormattedText(focusedPoint.subtitle[activeLocale])}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {renderFormattedText(focusedPoint.note[activeLocale])}
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  setFocusedPointId(null);
                  setActiveZoneId('all');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold transition-colors"
              >
                {t.resetZoomBtn}
              </button>
              <a
                href={focusedPoint.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <FaExternalLinkAlt size={10} />
                <span>{t.gmapsRouteBtn}</span>
              </a>
            </div>
          </div>
        )}
      </section>

      {/* 2. 5 Nightlife District Profiles + Vibe Filter */}
      <section id="night-districts" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaMusic /> {t.districtsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.districtsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.districtsSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs self-start lg:self-auto">
            {(['all', 'mega-club', 'pub-street', 'rooftop-jazz', 'marina-meyhane'] as VibeFilterId[]).map(
              (vf) => (
                <button
                  key={vf}
                  type="button"
                  onClick={() => setVibeFilter(vf)}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                    vibeFilter === vf
                      ? 'bg-slate-900 text-rose-300'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.vibeFilters[vf]}
                </button>
              )
            )}
          </div>
        </div>

        <div className="space-y-6">
          {visibleDistricts.map((dist) => (
            <article
              key={dist.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col lg:flex-row"
            >
              <div className="relative h-64 sm:h-72 lg:h-auto lg:w-[390px] flex-shrink-0 bg-slate-900">
                <Image
                  src={dist.image}
                  alt={dist.title[activeLocale].replace(/\*/g, '')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 390px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/35 lg:hidden" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-rose-300 border border-white/15 text-[10px] font-extrabold uppercase tracking-wider">
                  {dist.code}
                </span>
              </div>

              <div className="p-6 md:p-7 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div>
                    <span className="hidden lg:inline-block text-[11px] font-extrabold uppercase tracking-widest text-rose-700 mb-1">
                      {dist.code} · {dist.distanceNote[activeLocale]}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                      {renderFormattedText(dist.title[activeLocale])}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-violet-800 mt-1">
                      {renderFormattedText(dist.subtitle[activeLocale])}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.hoursTagLabel}
                      </span>
                      <strong className="text-slate-900 font-extrabold">
                        {dist.hoursBadge[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.entryTagLabel}
                      </span>
                      <strong className="text-rose-800 font-extrabold">
                        {renderFormattedText(dist.entryRule[activeLocale])}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.vibeTagLabel}
                      </span>
                      <strong className="text-slate-900 font-bold">
                        {dist.vibeMeter[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.distanceTagLabel}
                      </span>
                      <strong className="text-slate-900 font-bold">
                        {dist.distanceNote[activeLocale]}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {renderFormattedText(dist.description[activeLocale])}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {t.highlightsLabel}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-700 font-medium">
                      {dist.highlights[activeLocale].map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0 mt-1.5" />
                          <span>{renderFormattedText(hl)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-950 font-medium">
                    {renderFormattedText(dist.caveatNote[activeLocale])}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
                  <a
                    href="#nightlife-map"
                    onClick={() => {
                      setActiveKindFilter('all');
                      setActiveZoneId(dist.zoneId);
                      setFocusedPointId(dist.mapPointId);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <FaMapMarkedAlt size={11} className="text-rose-600" />
                    <span>{t.showOnMapBtn}</span>
                  </a>
                  <a
                    href={dist.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
                  >
                    <FaExternalLinkAlt size={10} /> {t.gmapsBtn}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Interactive Night Curve (19:30–02:00) + Where To Go Tonight Matcher */}
      <section id="evening-planner" className="scroll-mt-28 space-y-6">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaClock /> {t.plannerEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.plannerTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.plannerSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 6 cols: Interactive Night Rhythm SVG Curve */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-extrabold text-slate-900">
                {t.curveTitle}
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-[11px] font-bold">
                {t.curvePeakNote}
              </span>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 text-white">
              <svg viewBox="0 0 600 220" className="w-full h-44 overflow-visible">
                {[0, 25, 50, 75, 100].map((pct) => {
                  const y = 180 - pct * 1.45;
                  return (
                    <g key={pct}>
                      <line
                        x1="48"
                        y1={y}
                        x2="560"
                        y2={y}
                        stroke="rgba(148,163,184,0.18)"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="38"
                        y={y + 4}
                        textAnchor="end"
                        fill="#94a3b8"
                        fontSize="10"
                        fontWeight="600"
                      >
                        {pct}%
                      </text>
                    </g>
                  );
                })}

                {/* Club energy curve line (Rose) */}
                <polyline
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={NIGHT_TIMELINE_SLOTS.map((slot, i) => {
                    const x = 95 + i * 145;
                    const y = 180 - slot.clubEnergyPct * 1.45;
                    return `${x},${y}`;
                  }).join(' ')}
                />

                {/* Lounge/rooftop vibe curve line (Violet dashed) */}
                <polyline
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={NIGHT_TIMELINE_SLOTS.map((slot, i) => {
                    const x = 95 + i * 145;
                    const y = 180 - slot.loungeVibePct * 1.45;
                    return `${x},${y}`;
                  }).join(' ')}
                />

                {NIGHT_TIMELINE_SLOTS.map((slot, i) => {
                  const x = 95 + i * 145;
                  const yClub = 180 - slot.clubEnergyPct * 1.45;
                  const yLounge = 180 - slot.loungeVibePct * 1.45;
                  const active = slot.id === activeSlot.id;
                  return (
                    <g
                      key={slot.id}
                      onClick={() => setActiveSlotId(slot.id)}
                      className="cursor-pointer"
                    >
                      {active && (
                        <line
                          x1={x}
                          y1="25"
                          x2={x}
                          y2="184"
                          stroke="rgba(255,255,255,0.28)"
                          strokeWidth="2"
                        />
                      )}
                      <circle
                        cx={x}
                        cy={yClub}
                        r={active ? 7 : 5}
                        fill="#f43f5e"
                        stroke="#ffffff"
                        strokeWidth={active ? 2.5 : 1.5}
                      />
                      <circle
                        cx={x}
                        cy={yLounge}
                        r={active ? 7 : 5}
                        fill="#a78bfa"
                        stroke="#ffffff"
                        strokeWidth={active ? 2.5 : 1.5}
                      />
                      <text
                        x={x}
                        y="204"
                        textAnchor="middle"
                        fill={active ? '#fda4af' : '#cbd5e1'}
                        fontSize="12"
                        fontWeight={active ? '800' : '600'}
                      >
                        {slot.timeLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    {t.curveClubLegend}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                    {t.curveLoungeLegend}
                  </span>
                </div>
                <span className="text-slate-400">{t.curveClickHint}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {NIGHT_TIMELINE_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setActiveSlotId(slot.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold border transition-colors ${
                    slot.id === activeSlot.id
                      ? 'bg-slate-900 text-rose-300 border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-rose-400'
                  }`}
                >
                  {slot.timeLabel}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-slate-900 font-extrabold text-sm sm:text-base">
                  {activeSlot.timeLabel} · {activeSlot.name[activeLocale]}
                </strong>
                <span className="text-xs font-bold text-slate-600">
                  {t.crowdLabel}: {activeSlot.crowdLevel[activeLocale]}
                </span>
              </div>
              <p className="text-violet-900 font-semibold text-xs">
                <strong>{t.bestForLabel}:</strong>{' '}
                {renderFormattedText(activeSlot.bestFor[activeLocale])}
              </p>
              <p className="text-slate-700 font-medium text-xs leading-relaxed">
                <strong>{t.insiderTipLabel}:</strong>{' '}
                {renderFormattedText(activeSlot.insiderTip[activeLocale])}
              </p>
            </div>
          </div>

          {/* Right 6 cols: Interactive Evening Destination Matcher */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div>
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FaCocktail className="text-rose-600" />
                <span>{t.matcherTitle}</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">{t.matcherSubtitle}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="block font-extrabold text-slate-700 mb-2">
                  {t.matcherVibeLabel}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {t.vibeOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setVibe(opt.id)}
                      className={`px-3 py-2.5 rounded-xl font-bold border text-center transition-colors ${
                        vibe === opt.id
                          ? 'bg-slate-900 text-rose-300 border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-rose-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block font-extrabold text-slate-700 mb-2">
                  {t.matcherBaseLabel}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {t.baseOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setBase(opt.id)}
                      className={`px-3 py-2.5 rounded-xl font-bold border text-center transition-colors ${
                        base === opt.id
                          ? 'bg-slate-900 text-rose-300 border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-rose-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="flex items-center gap-1.5 font-extrabold text-slate-700 mb-2">
                  <FaTaxi className="text-slate-500" />
                  <span>{t.matcherReturnLabel}</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.returnOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setReturnTime(opt.id)}
                      className={`px-3 py-2.5 rounded-xl font-bold border text-center transition-colors ${
                        returnTime === opt.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-rose-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Matcher Verdict Box */}
            <div
              className={`rounded-2xl p-4 md:p-5 border space-y-2.5 ${
                matcherResult.status === 'caution'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-2 font-extrabold text-sm">
                {matcherResult.status === 'caution' ? (
                  <FaExclamationTriangle className="text-amber-600 flex-shrink-0 text-base" />
                ) : (
                  <FaCheckCircle className="text-emerald-600 flex-shrink-0 text-base" />
                )}
                <span>
                  {matcherResult.status === 'caution' ? t.verdictCaution : t.verdictReady}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {renderFormattedText(matcherResult.msg)}
              </p>

              <div className="pt-1 flex justify-end">
                <a
                  href="#nightlife-map"
                  onClick={() => {
                    setActiveKindFilter('all');
                    setActiveZoneId(matcherResult.targetZoneId);
                    setFocusedPointId(matcherResult.targetPointId);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 text-xs font-extrabold transition-colors"
                >
                  {t.matcherFocusBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. Coastal Festivals, Regattas & 2027 Holiday Surges */}
      <section id="festivals" className="scroll-mt-28 space-y-8">
        <div className="space-y-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaCalendarAlt /> {t.festivalsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.festivalsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.festivalsSubtitle}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
              {(['all', 'winter', 'spring', 'summer', 'autumn'] as FestivalSeasonId[]).map((sf) => (
                <button
                  key={sf}
                  type="button"
                  onClick={() => setSeasonFilter(sf)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                    seasonFilter === sf
                      ? 'bg-emerald-700 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.festSeasonFilters[sf]}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
              {(['all', 'music-arts', 'gastro-culture', 'regatta-sport'] as FestivalCategoryId[]).map(
                (cf) => (
                  <button
                    key={cf}
                    type="button"
                    onClick={() => setFestivalCatFilter(cf)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                      festivalCatFilter === cf
                        ? 'bg-slate-900 text-emerald-300'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t.festCategoryFilters[cf]}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {filteredFestivals.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-700">{t.festEmptyText}</p>
            <button
              type="button"
              onClick={() => {
                setSeasonFilter('all');
                setFestivalCatFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold transition-colors"
            >
              {t.festResetFiltersBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredFestivals.map((fest) => (
              <article
                key={fest.id}
                className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-extrabold inline-flex items-center gap-1.5">
                      <FaCalendarAlt size={10} className="text-emerald-700" />
                      {fest.monthBadge[activeLocale]}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider">
                      {t.festCategoryLabels[fest.category]}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                      {fest.locationBadge[activeLocale]} · {fest.nativeName}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {fest.title[activeLocale]}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {renderFormattedText(fest.description[activeLocale])}
                  </p>

                  <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-950">
                    <span className="font-extrabold uppercase text-[10px] tracking-wider text-amber-800 block mb-1">
                      {t.festInsiderLabel}
                    </span>
                    <p className="font-medium leading-relaxed">
                      {renderFormattedText(fest.insiderTip[activeLocale])}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  {fest.relatedHref && fest.relatedLabel ? (
                    <Link
                      href={`/${activeLocale}${fest.relatedHref}`}
                      className="text-xs font-extrabold text-emerald-800 hover:text-emerald-950 hover:underline"
                    >
                      {fest.relatedLabel[activeLocale]}
                    </Link>
                  ) : (
                    <span />
                  )}

                  <a
                    href="#nightlife-map"
                    onClick={() => {
                      setActiveKindFilter('all');
                      setActiveZoneId(fest.zoneId);
                      setFocusedPointId(fest.mapPointId);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 text-xs font-extrabold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <FaMapMarkedAlt size={11} />
                    <span>{t.showOnMapBtn}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 2027 Turkish National & Lunar Holiday Surges */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-lg space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider border border-amber-500/30">
                <FaFlag size={10} /> {t.holidaysEyebrow}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                {t.holidaysTitle}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                {t.holidaysDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <Link
                href={`/${activeLocale}/articles/events-and-festivals-calendar`}
                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-colors"
              >
                {t.btnFullCalendar}
              </Link>
              <Link
                href={`/${activeLocale}/articles/events-festivals`}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-bold border border-white/15 transition-colors"
              >
                {t.btnHolidayGuide}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TURKEY_HOLIDAYS_2027.map((hol) => (
              <div
                key={hol.id}
                className="rounded-xl bg-slate-800/80 border border-slate-700/80 p-4 space-y-2.5"
              >
                <span
                  className={`inline-block px-2.5 py-1 rounded-full border text-[10px] font-extrabold uppercase tracking-wider ${getHolidayAccentClass(
                    hol.tone
                  )}`}
                >
                  {hol.dateBadge[activeLocale]}
                </span>
                <h4 className="text-sm font-extrabold text-white leading-snug">
                  {hol.title[activeLocale]}
                </h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {renderFormattedText(hol.impactNote[activeLocale])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 2026 Drink & Taxi Budget Cards + Dark Interlinking Banner + Safety Rules */}
      <section id="prices-rules" className="scroll-mt-28 space-y-12">
        <div className="space-y-6">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaCoins /> {t.budgetEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.budgetTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.budgetSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DRINK_BUDGET_TIERS.map((tier) => (
              <article
                key={tier.id}
                className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
                      <FaGlassCheers size={10} className="text-rose-600" />
                      {tier.categoryBadge[activeLocale]}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 text-xs font-extrabold">
                      {tier.priceRange}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {tier.title[activeLocale]}
                    </h3>
                    <span className="block text-xs font-bold text-violet-700 mt-0.5">
                      {tier.tryBenchmark} · {tier.subtitle[activeLocale]}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {renderFormattedText(tier.description[activeLocale])}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/90 text-xs text-emerald-950">
                  <span className="font-extrabold uppercase text-[10px] tracking-wider text-emerald-800 block mb-1">
                    {t.moneySaverLabel}
                  </span>
                  <p className="font-medium leading-relaxed">
                    {renderFormattedText(tier.moneySaverTip[activeLocale])}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dark Interlinking Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-extrabold uppercase tracking-wider border border-rose-500/30">
              <FaRoute size={10} /> {t.bannerEyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{t.bannerTitle}</h3>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              {t.bannerDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-shrink-0">
            <Link
              href={`/${activeLocale}/gastronomy`}
              className="px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaUtensils size={11} /> {t.btnGastronomy}
            </Link>
            <Link
              href={`/${activeLocale}/articles/alkogol-v-turtsii-chto-pit-i-gde-pokupat`}
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaWineGlassAlt size={11} /> {t.btnAlcoholArticle}
            </Link>
            <Link
              href={`/${activeLocale}/articles/transport`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaTaxi size={11} className="text-cyan-300" /> {t.btnTransport}
            </Link>
            <Link
              href={`/${activeLocale}/markets-crafts`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-amber-300" /> {t.btnMarkets}
            </Link>
          </div>
        </div>

        {/* 4 Nighttime Laws, Taxis & Safety Rules */}
        <div className="space-y-6">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaInfoCircle /> {t.rulesEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.rulesTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.rulesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {NIGHT_SAFETY_RULES_2026.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl border-2 border-slate-900 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className={`px-5 py-3.5 ${getRuleHeaderClass(card.tone)}`}>
                    <span className="block text-[10px] font-extrabold uppercase tracking-widest opacity-85">
                      {card.eyebrow[activeLocale]}
                    </span>
                    <h3 className="text-base md:text-lg font-extrabold leading-snug mt-0.5">
                      {card.title[activeLocale]}
                    </h3>
                  </div>
                  <ul className="p-5 space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                    {card.points[activeLocale].map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-rose-600 flex-shrink-0 mt-1.5" />
                        <span>{renderFormattedText(pt)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500 font-semibold">{t.sourceLabel}</span>
                  <a
                    href={card.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-rose-700 hover:underline inline-flex items-center gap-1"
                  >
                    {card.sourceLabel} <FaExternalLinkAlt size={9} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
