"use client";

import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaCompass,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaLandmark,
  FaLeaf,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaMountain,
  FaRoute,
  FaSearchPlus,
  FaShieldAlt,
  FaTint,
  FaTree,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import NatureParks3DMap from './NatureParks3DMap';
import {
  NATURE_MAP_POINTS,
  NATURE_PARK_PROFILES,
  NATURE_RULES_2026,
  NATURE_ZONE_PRESETS,
  REGIONAL_ENDEMICS,
  WATER_TEMP_CONTRASTS,
  WILDLIFE_SEASONS,
  type LocaleCode,
  type NaturePointKind,
  type NatureProfileFilterId,
  type NatureRule2026,
  type NatureZoneId,
} from '@/lib/nature-parks';

type NatureGoalChoice = 'cool-canyon' | 'wildlife-turtles' | 'pine-mountain';
type NatureSeasonChoice = 'spring-mar-may' | 'summer-jun-sep' | 'autumn-oct-nov';
type GroupChoice = 'family-easy' | 'active-hikers';

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

const MAP_PIN_DOT: Record<NaturePointKind, string> = {
  'national-park': 'bg-emerald-500',
  'turtle-reserve': 'bg-teal-500',
  'canyon-river': 'bg-sky-500',
  'lake-mountain': 'bg-amber-500',
};

interface HubCopy {
  shieldTitle: string;
  shieldDesc: string;
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
  mapKindLabels: Record<NaturePointKind, string>;
  profilesEyebrow: string;
  profilesTitle: string;
  profilesSubtitle: string;
  profileFilters: Record<NatureProfileFilterId, string>;
  feeTagLabel: string;
  statusTagLabel: string;
  tempTagLabel: string;
  seasonTagLabel: string;
  highlightsLabel: string;
  readArticleBtn: string;
  showOnMapBtn: string;
  gmapsBtn: string;
  plannerEyebrow: string;
  plannerTitle: string;
  plannerSubtitle: string;
  pickerTitle: string;
  pickerSubtitle: string;
  pickerGoalLabel: string;
  pickerSeasonLabel: string;
  pickerGroupLabel: string;
  goalOpts: { id: NatureGoalChoice; label: string }[];
  seasonOpts: { id: NatureSeasonChoice; label: string }[];
  groupOpts: { id: GroupChoice; label: string }[];
  verdictCaution: string;
  verdictReady: string;
  pickerFocusBtn: string;
  waterScaleTitle: string;
  waterScaleSubtitle: string;
  wildlifeTitle: string;
  endemicsEyebrow: string;
  endemicsTitle: string;
  endemicsSubtitle: string;
  whereToSeeLabel: string;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerDesc: string;
  btnTrekking: string;
  btnBeaches: string;
  btnThermal: string;
  btnAncient: string;
  rulesEyebrow: string;
  rulesTitle: string;
  rulesSubtitle: string;
  sourceLabel: string;
}

const HUB_COPY: Record<LocaleCode, HubCopy> = {
  ru: {
    shieldTitle: '2 главных правила природы 2026: черепахи с 20:00 + запрет входа в леса летом (Июнь–Октябрь)',
    shieldDesc:
      'С мая по октябрь на пляжи Изтузу и Патара нельзя выходить с 20:00 до 08:00. А в июне–октябре при сухой жаре губернаторство Муглы закрывает вход в дикие хвойные леса (*Ormanlara Giriş Yasağı*) — планируйте в жару Саклыкент, Юварлакчай и реку Азмак.',
    mapEyebrow: 'ЖИВАЯ 3D-КАРТА ПРИРОДЫ И ЗАПОВЕДНИКОВ',
    mapTitle: 'Интерактивная 3D-карта 15 парков, заповедников, каньонов и озёр',
    mapSubtitle:
      'Стартует с обзора от залива Гёкова до дюн Патары: нажмите на зону, фильтр (Нацпарки, Заповедники черепах, Каньоны и реки, Горы/озёра), чип ниже или «Ближайший (GPS)».',
    allZonesCode: 'ВСЁ ПОБЕРЕЖЬЕ',
    allZonesBtn: 'Весь регион (15)',
    allZonesSub: 'Гёкова — Патара',
    quickPinsTitle: 'Быстрый подлёт к каньонам, рекам и заповедникам',
    selectedCoordsLabel: 'GPS-координаты',
    resetZoomBtn: 'Весь регион (отдалить)',
    gmapsRouteBtn: 'Маршрут в Google Maps',
    mapKindLabels: {
      'national-park': 'Национальный / Природный парк',
      'turtle-reserve': 'Заповедник черепах и редких видов',
      'canyon-river': 'Каньон / Ледяная река',
      'lake-mountain': 'Озеро / Кедровая гора',
    },
    profilesEyebrow: '8 КЛЮЧЕВЫХ ПРИРОДНЫХ ОБЪЕКТОВ С ФОТО',
    profilesTitle: 'Черепашьи косы, ледяные ущелья и заповедные заливы',
    profilesSubtitle:
      'Сравните статус охраны, температуру воды (+6 °C в Юварлакчае против +28 °C в лагуне), парковые сборы 2026 года и переходите к подробным маршрутам.',
    profileFilters: {
      all: 'Все объекты (8)',
      reserves: 'Заповедники (3)',
      'canyons-rivers': 'Каньоны и ледяные реки (3)',
      'parks-lagoons': 'Нацпарки и лагуны (2)',
    },
    feeTagLabel: 'Вход и режим',
    statusTagLabel: 'Статус охраны',
    tempTagLabel: 'Температура воды',
    seasonTagLabel: 'Когда ехать',
    highlightsLabel: 'Что важно знать на месте',
    readArticleBtn: 'Подробный гид →',
    showOnMapBtn: 'На 3D-карте ↑',
    gmapsBtn: 'Google Maps',
    plannerEyebrow: 'ПОДБОРЩИК ПРОХЛАДЫ И ПРИРОДНЫЙ КАЛЕНДАРЬ',
    plannerTitle: 'Куда сбежать от жары + Температуры рек (+6…+40 °C)',
    plannerSubtitle:
      'Укажите формат отдыха, сезон и состав группы: система учтёт весенний паводок Саклыкента, летние лесные запреты и опасность спуска в Долину Бабочек по скалам.',
    pickerTitle: 'Подборщик природного маршрута без ошибок',
    pickerSubtitle: 'Выберите стихию, месяц поездки и формат компании.',
    pickerGoalLabel: '1. Какой контраст природы ищете?',
    pickerSeasonLabel: '2. Когда планируете поездку?',
    pickerGroupLabel: '3. Кто едет с вами?',
    goalOpts: [
      { id: 'cool-canyon', label: 'Прохлада в каньоне / ледяной реке' },
      { id: 'wildlife-turtles', label: 'Черепахи DEKAMER, бабочки, дельта' },
      { id: 'pine-mountain', label: 'Хвойные парки, кедры и водопады' },
    ],
    seasonOpts: [
      { id: 'spring-mar-may', label: 'Весна (Март – Май)' },
      { id: 'summer-jun-sep', label: 'Жаркое лето (Июнь – Сентябрь)' },
      { id: 'autumn-oct-nov', label: 'Бархатная осень (Окт – Нояб)' },
    ],
    groupOpts: [
      { id: 'family-easy', label: 'С детьми / без сложного экстрима' },
      { id: 'active-hikers', label: 'Активные туристы (вброд / треккинг)' },
    ],
    verdictCaution: '⚠️ УЧТИТЕ СЕЗОННЫЕ ЗАПРЕТЫ И СНАРЯЖЕНИЕ',
    verdictReady: '✅ ИДЕАЛЬНЫЙ ПРИРОДНЫЙ СЦЕНАРИЙ',
    pickerFocusBtn: 'Показать точку на 3D-карте ↑',
    waterScaleTitle: 'Шкала температур воды региона (+6 °C → +40 °C)',
    waterScaleSubtitle: 'От талых ключей горы Сандрас до термального озера Кёйджегиз.',
    wildlifeTitle: 'Календарь дикой природы: когда цветут, выводятся и мигрируют',
    endemicsEyebrow: '4 ГЛАВНЫХ ЭНДЕМИКА И СИМВОЛА',
    endemicsTitle: 'Кого берегут заповедники от Гёковы до Патары',
    endemicsSubtitle:
      'Увидеть реликтовый ликвидамбр возрастом миллионы лет, бабочку Геру и морских черепах можно бесплатно — соблюдая бережную дистанцию.',
    whereToSeeLabel: 'Где искать в природе:',
    bannerEyebrow: 'СВЯЗАННЫЕ ГИДЫ ПОРТАЛА',
    bannerTitle: 'Соедините нацпарки с треккингом, античностью, пляжами и термами',
    bannerDesc:
      'Откройте Атлас Ликийской тропы, каталог пляжей, 3D-хаб античных городов рядом с парками и карту горячих источников Султание.',
    btnTrekking: 'Атлас Ликийской тропы',
    btnBeaches: 'Гид по пляжам и бухтам',
    btnThermal: 'Термы Султание у Кёйджегиза',
    btnAncient: 'Античные города (3D-хаб)',
    rulesEyebrow: 'ЗАКОНЫ, СБОРЫ И БЕЗОПАСНОСТЬ 2026',
    rulesTitle: '4 строгих правила: от ночных пляжей 20:00 до штрафов в лесах и Mavi Kart',
    rulesSubtitle:
      'Перед выездом проверьте летние пожарные ограничения Муглы, экипировку аквашузами и отличие парковых сборов DKMP от MuseumPass.',
    sourceLabel: 'Официальный источник',
  },
  en: {
    shieldTitle: '2 Essential Nature Rules 2026: 20:00 Turtle Lockout + Summer Pine Forest Bans (Jun–Oct)',
    shieldDesc:
      'Between May and October, İztuzu & Patara lock strictly 20:00–08:00. In dry summer peaks (Jun–Oct), Muğla bans hiking deep wild pine forests (*Ormanlara Giriş Yasağı*)—head to Saklıkent Gorge, Yuvarlakçay or Azmak River instead.',
    mapEyebrow: 'LIVE 3D NATURE & PARKS MAP',
    mapTitle: 'Interactive 3D Map of 15 National Parks, Reserves, Canyons & Cold Rivers',
    mapSubtitle:
      'Opens on the full Gökova-to-Patara span: click any cluster, filter pill (National Parks, Turtle Reserves, Canyons & Rivers, Lakes & Peaks) or jump chip below.',
    allZonesCode: 'FULL OVERVIEW',
    allZonesBtn: 'Full Coast (15)',
    allZonesSub: 'Gökova — Patara',
    quickPinsTitle: 'Fly directly to canyons, glacial springs & turtle reserves',
    selectedCoordsLabel: 'GPS Coordinates',
    resetZoomBtn: 'Full Region (Zoom Out)',
    gmapsRouteBtn: 'Directions in Google Maps',
    mapKindLabels: {
      'national-park': 'National / Tabiat Park',
      'turtle-reserve': 'Turtle & Wildlife Reserve',
      'canyon-river': 'Canyon / Glacial River',
      'lake-mountain': 'Lake / Cedar Mountain',
    },
    profilesEyebrow: '8 SIGNATURE NATURAL PARKS & CANYONS',
    profilesTitle: 'Loggerhead Nesting Spits, Icy Gorges & Protected Turquoise Bays',
    profilesSubtitle:
      'Compare protection tiers, wild water contrast (+6 °C mountain springs vs +28 °C lagoons) and 2026 DKMP tolls before linking straight to detailed guides.',
    profileFilters: {
      all: 'All Sites (8)',
      reserves: 'Wildlife Reserves (3)',
      'canyons-rivers': 'Canyons & Rivers (3)',
      'parks-lagoons': 'Parks & Lagoons (2)',
    },
    feeTagLabel: 'Access / Fee',
    statusTagLabel: 'Conservation Tier',
    tempTagLabel: 'Water Temp',
    seasonTagLabel: 'Best Window',
    highlightsLabel: 'What Matters on Site',
    readArticleBtn: 'Full Guide →',
    showOnMapBtn: 'Locate on 3D Map ↑',
    gmapsBtn: 'Google Maps',
    plannerEyebrow: 'COOL ESCAPE PICKER & WILDLIFE CALENDAR',
    plannerTitle: 'Where to Beat Coastal Heat + Water Temperature Spectrum (+6–40 °C)',
    plannerSubtitle:
      'Pick your nature goal, season & group style below—accounting for spring Saklıkent snowmelt, summer wildfire forest closures and Faralya cliff-rope hazards.',
    pickerTitle: 'Smart Nature & Canyon Route Picker',
    pickerSubtitle: 'Match landscape, travel month & fitness comfort.',
    pickerGoalLabel: '1. What natural contrast do you want?',
    pickerSeasonLabel: '2. When are you visiting?',
    pickerGroupLabel: '3. Group profile?',
    goalOpts: [
      { id: 'cool-canyon', label: 'Icy canyon / spring river cooling' },
      { id: 'wildlife-turtles', label: 'Caretta DEKAMER, moths & reeds' },
      { id: 'pine-mountain', label: 'Cedar peaks, waterfalls & forest parks' },
    ],
    seasonOpts: [
      { id: 'spring-mar-may', label: 'Spring (Mar – May)' },
      { id: 'summer-jun-sep', label: 'Peak Heat (Jun – Sep)' },
      { id: 'autumn-oct-nov', label: 'Velvet Autumn (Oct – Nov)' },
    ],
    groupOpts: [
      { id: 'family-easy', label: 'Families / relaxed walking' },
      { id: 'active-hikers', label: 'Active hikers / river wading' },
    ],
    verdictCaution: '⚠️ HEED SEASONAL CURFEWS & GEAR ALERTS',
    verdictReady: '✅ IDEAL NATURE ESCAPE',
    pickerFocusBtn: 'Pin Best Spot on 3D Map ↑',
    waterScaleTitle: 'Coastal Water Temp Spectrum (+6 °C → +40 °C)',
    waterScaleSubtitle: 'From snowy Mount Sandras springs to steaming Köyceğiz thermal waters.',
    wildlifeTitle: 'Year-Round Wildlife & Forest Season Windows',
    endemicsEyebrow: '4 FLAGSHIP SPECIES & RELICS',
    endemicsTitle: 'Rare Wildlife & Prehistoric Trees Protected Across the Coast',
    endemicsSubtitle:
      'Discover tertiary sweetgum groves, river softshells, tiger moths and sea turtles responsibly without leaving footprints behind.',
    whereToSeeLabel: 'Where to spot:',
    bannerEyebrow: 'CONNECTED COASTAL GUIDES',
    bannerTitle: 'Combine National Parks with Hiking, Ancient Ruins, Beaches & Thermal Spas',
    bannerDesc:
      'Explore our Lycian Way trail atlas, beach directory, 3D ancient cities hub bordering the canyons, and Sultaniye thermal lake guide.',
    btnTrekking: 'Lycian Way Trail Atlas',
    btnBeaches: 'Best Beaches & Coves',
    btnThermal: 'Sultaniye Springs by Köyceğiz',
    btnAncient: 'Ancient Cities (3D Hub)',
    rulesEyebrow: '2026 CONSERVATION LAWS & GEAR',
    rulesTitle: '4 Critical Nature Rules: 20:00 Beaches, Wildfire Patrols, Aqua Shoes & Mavi Kart',
    rulesSubtitle:
      'Check Muğla’s dry-summer forest closures, strap-on canyon footwear rules, and how DKMP nature tolls differ from MuseumPass.',
    sourceLabel: 'Official Source',
  },
  de: {
    shieldTitle: '2 Praxis-Regeln 2026: Schildkröten-Nachtsperre ab 20:00 + Sommer-Waldsperren (Juni–Okt)',
    shieldDesc:
      'Zwischen Mai und Oktober schließen İztuzu & Patara strikt von 20:00–08:00 Uhr. Im trockenen Hochsommer verhängt Muğla oft Betretungsverbote für wilde Kiefernwälder (*Ormanlara Giriş Yasağı*)—weichen Sie dann auf Saklıkent, Yuvarlakçay & Azmak aus.',
    mapEyebrow: 'INTERAKTIVE 3D-NATUR- & PARKKARTE',
    mapTitle: 'Live 3D-Karte: 15 Nationalparks, Schutzgebiete, Schluchten & Flüsse',
    mapSubtitle:
      'Startet mit der Gesamtsicht von Gökova bis Patara: Wählen Sie Cluster, Kategorie-Filter (Parks, Schildkröten, Schluchten, Seen/Berge) oder Schnell-Chips unten.',
    allZonesCode: 'ÜBERSICHT',
    allZonesBtn: 'Ganze Küste (15)',
    allZonesSub: 'Gökova bis Patara',
    quickPinsTitle: 'Direkt zu Schluchten, kalten Quellen & Schutzzonen springen',
    selectedCoordsLabel: 'GPS-Koordinaten',
    resetZoomBtn: 'Ganze Region (Rauszoomen)',
    gmapsRouteBtn: 'Route in Google Maps',
    mapKindLabels: {
      'national-park': 'National- / Naturpark',
      'turtle-reserve': 'Schildkröten-Schutzzone',
      'canyon-river': 'Schlucht / Bergfluss',
      'lake-mountain': 'See / Zedernberg',
    },
    profilesEyebrow: '8 TOP-NATURPARKS & SCHLUCHTEN IM DETAIL',
    profilesTitle: 'Niststrände, +9 °C Eiswasserschluchten & geschützte Lagunen',
    profilesSubtitle:
      'Vergleichen Sie Schutzstatus, Wassertemperaturen (+6 °C Bergquelle vs. +28 °C Lagune) sowie Parkgebühren 2026 und öffnen Sie direkt die passenden Guides.',
    profileFilters: {
      all: 'Alle Profile (8)',
      reserves: 'Schutzgebiete (3)',
      'canyons-rivers': 'Schluchten & Flüsse (3)',
      'parks-lagoons': 'Nationalparks & Lagunen (2)',
    },
    feeTagLabel: 'Eintritt / Zugang',
    statusTagLabel: 'Schutzstatus',
    tempTagLabel: 'Wassertemperatur',
    seasonTagLabel: 'Beste Reisezeit',
    highlightsLabel: 'Wichtig vor Ort',
    readArticleBtn: 'Detail-Guide lesen →',
    showOnMapBtn: 'Auf 3D-Karte ↑',
    gmapsBtn: 'Google Maps',
    plannerEyebrow: 'ANTI-HITZE-PLANER & NATURKALENDER',
    plannerTitle: 'Wohin bei Sommerhitze? + Wassertemperaturen (+6–40 °C)',
    plannerSubtitle:
      'Wählen Sie Landschaft, Reisezeit & Gruppe: berücksichtigt Hochwasser im Frühjahr, Waldsperren im Hochsommer und die gefährliche Seil-Route im Schmetterlingstal.',
    pickerTitle: 'Schlauer Natur- & Schluchten-Matcher',
    pickerSubtitle: 'Erlebnis, Saison und Komfortstufe kombinieren.',
    pickerGoalLabel: '1. Welches Naturerlebnis suchen Sie?',
    pickerSeasonLabel: '2. Wann reisen Sie?',
    pickerGroupLabel: '3. Wer kommt mit?',
    goalOpts: [
      { id: 'cool-canyon', label: 'Eiskalte Schlucht / Bergfluss' },
      { id: 'wildlife-turtles', label: 'Caretta-Klinik, Falter & Flussdelta' },
      { id: 'pine-mountain', label: 'Zederngipfel, Wasserfälle & Wald' },
    ],
    seasonOpts: [
      { id: 'spring-mar-may', label: 'Frühling (März – Mai)' },
      { id: 'summer-jun-sep', label: 'Hochsommer (Juni – Sept)' },
      { id: 'autumn-oct-nov', label: 'Goldener Herbst (Okt – Nov)' },
    ],
    groupOpts: [
      { id: 'family-easy', label: 'Familie / entspannte Wege' },
      { id: 'active-hikers', label: 'Aktive Wanderer / Flussbett' },
    ],
    verdictCaution: '⚠️ SAISON-SPERREN & AUSRÜSTUNG BEACHTEN',
    verdictReady: '✅ PERFEKTES NATUR-ZIEL',
    pickerFocusBtn: 'Ziel auf 3D-Karte zeigen ↑',
    waterScaleTitle: 'Wassertemperatur-Kontrast (+6 °C → +40 °C)',
    waterScaleSubtitle: 'Vom Sandras-Schmelzwasser bis zu den heißen Quellen am Köyceğiz-See.',
    wildlifeTitle: 'Natur- & Tierkalender nach Jahreszeiten',
    endemicsEyebrow: '4 BESONDERE ARTEN & RELIKTE',
    endemicsTitle: 'Was die Naturparks von Gökova bis Patara besonders macht',
    endemicsSubtitle:
      'Seltene Relikt-Amberbäume, Nil-Weichschildkröten, Spanische Flaggen und Meeresschildkröten respektvoll erleben.',
    whereToSeeLabel: 'Wo zu entdecken:',
    bannerEyebrow: 'VERKNÜPFTE KÜSTEN-GUIDES',
    bannerTitle: 'Nationalparks mit Trekking, Antike, Stränden & Thermen verbinden',
    bannerDesc:
      'Entdecken Sie unseren Wanderatlas für den Lykischen Weg, Strandverzeichnis, den 3D-Ruinen-Hub sowie die Thermalbäder in Sultaniye.',
    btnTrekking: 'Wanderatlas Lykischer Weg',
    btnBeaches: 'Strände & Buchten',
    btnThermal: 'Sultaniye-Thermen (Köyceğiz)',
    btnAncient: 'Antike Städte (3D-Hub)',
    rulesEyebrow: 'SCHUTZGESETZE & AUSRÜSTUNG 2026',
    rulesTitle: '4 Wichtige Regeln: 20:00-Strandsperre, Waldbrand-Kontrolle, Wasserschuhe & Mavi Kart',
    rulesSubtitle:
      'Warum MuseumPass in DKMP-Naturparks nicht gilt, warum feste Wasserschuhe in Saklıkent Pflicht sind und wie Mavi Kart funktioniert.',
    sourceLabel: 'Offizielle Quelle',
  },
  tr: {
    shieldTitle: '2026’nın 2 Kritik Doğa Kuralı: 20:00 Caretta Kapanışı + Yaz Orman Giriş Yasakları (Haz–Eki)',
    shieldDesc:
      'Mayıs–Ekim arası İztuzu ve Patara kumsalları 20:00–08:00 kapalıdır. Kurak yaz aylarında Muğla Valiliği yangın riskiyle ormanlara girişi yasaklar (*Ormanlara Giriş Yasağı*) — sıcak günlerde Saklıkent, Yuvarlakçay ve Azmak’ı tercih edin.',
    mapEyebrow: 'CANLI 3D DOĞA VE MİLLÎ PARK HARİTASI',
    mapTitle: '15 Millî Park, Koruma Alanı, Kanyon ve Soğuk Nehir — 3D Harita',
    mapSubtitle:
      'Gökova’dan Patara’ya tüm kıyı koruma şeridini gösterir: odaklanmak için bir bölge, kategori filtresi (Millî Park, Caretta, Kanyon/Nehir, Göl/Zirve) veya aşağıdaki etiketlere tıklayın.',
    allZonesCode: 'GENEL BAKIŞ',
    allZonesBtn: 'Tüm Kıyı (15)',
    allZonesSub: 'Gökova — Patara',
    quickPinsTitle: 'Kanyonlara, buz gibi sulara ve koruma koylarına hızlı odaklanın',
    selectedCoordsLabel: 'GPS Koordinatları',
    resetZoomBtn: 'Tüm Bölge (Uzaklaş)',
    gmapsRouteBtn: 'Google Haritalar Yol Tarifi',
    mapKindLabels: {
      'national-park': 'Millî Park / Tabiat Parkı',
      'turtle-reserve': 'Caretta & Doğa Koruma',
      'canyon-river': 'Kanyon / Soğuk Nehir',
      'lake-mountain': 'Göl / Sedir Dağı',
    },
    profilesEyebrow: 'FOTOĞRAFLI 8 ANA DOĞA PARKI VE KANYON',
    profilesTitle: 'Kaplumbağa Kumsalları, Buz Gibi Kanyonlar ve Koruma Lagünleri',
    profilesSubtitle:
      'Koruma statülerini, su sıcaklık farklarını (+6 °C Yuvarlakçay vs +28 °C lagün) ve 2026 DKMP gişe ücretlerini inceleyip tam rehbere geçin.',
    profileFilters: {
      all: 'Tüm Alanlar (8)',
      reserves: 'Koruma Alanları (3)',
      'canyons-rivers': 'Kanyon & Soğuk Sular (3)',
      'parks-lagoons': 'Millî Park & Lagün (2)',
    },
    feeTagLabel: 'Giriş & Saatler',
    statusTagLabel: 'Koruma Statüsü',
    tempTagLabel: 'Su Sıcaklığı',
    seasonTagLabel: 'En İyi Dönem',
    highlightsLabel: 'Saha Detayları',
    readArticleBtn: 'Detaylı Rehber →',
    showOnMapBtn: '3D Haritada Gör ↑',
    gmapsBtn: 'Google Haritalar',
    plannerEyebrow: 'SERİN ROTA SEÇİCİ VE YABAN HAYATI TAKVİMİ',
    plannerTitle: 'Yaz Sıcağında Nereye Kaçılır? + Bölge Su Sıcaklıkları (+6…+40 °C)',
    plannerSubtitle:
      'Doğa beklentinizi, mevsimi ve grubunuzu seçin: bahar sel sularını, yaz orman yasaklarını ve Faralya ip inişi tehlikesini gözeterek en doğru noktayı önersin.',
    pickerTitle: 'Akıllı Doğa ve Kanyon Rota Seçici',
    pickerSubtitle: 'Doğa tipi, mevsim ve yürüyüş temposunu seçin.',
    pickerGoalLabel: '1. Nasıl bir doğa deneyimi arıyorsunuz?',
    pickerSeasonLabel: '2. Ne zaman gidiyorsunuz?',
    pickerGroupLabel: '3. Grup profiliniz?',
    goalOpts: [
      { id: 'cool-canyon', label: 'Buz gibi kanyon ve soğuk nehir' },
      { id: 'wildlife-turtles', label: 'DEKAMER Caretta, kelebek ve delta' },
      { id: 'pine-mountain', label: 'Sedir zirveleri, şelale ve orman' },
    ],
    seasonOpts: [
      { id: 'spring-mar-may', label: 'İlkbahar (Mart – Mayıs)' },
      { id: 'summer-jun-sep', label: 'Sıcak Yaz (Haziran – Eylül)' },
      { id: 'autumn-oct-nov', label: 'Ilık Sonbahar (Ekim – Kasım)' },
    ],
    groupOpts: [
      { id: 'family-easy', label: 'Aile / rahat yürüyüş' },
      { id: 'active-hikers', label: 'Aktif doğa / kanyon geçişi' },
    ],
    verdictCaution: '⚠️ MEVSİM YASAKLARI VE EKİPMANA DİKKAT',
    verdictReady: '✅ İDEAL DOĞA ROTASI',
    pickerFocusBtn: 'Uygun Noktayı 3D Haritada Aç ↑',
    waterScaleTitle: 'Bölge Su Sıcaklık Spektrumu (+6 °C → +40 °C)',
    waterScaleSubtitle: 'Sandras dağ sularından Köyceğiz gölü termal kaynaklarına.',
    wildlifeTitle: '4 Mevsim Yaban Hayatı ve Orman Takvimi',
    endemicsEyebrow: '4 ENDEMİK VE NADİR TÜR',
    endemicsTitle: 'Gökova’dan Patara’ya Korunan Eşsiz Canlılar ve Relikt Ağaçlar',
    endemicsSubtitle:
      'Milyon yıllık Anadolu sığla ağaçlarını, Nil kaplumbağasını, Jarse Kaplanı kelebeğini ve Caretta Caretta’ları doğaya saygıyla gözlemleyin.',
    whereToSeeLabel: 'Nerede görülür:',
    bannerEyebrow: 'BAĞLANTILI KEŞİF REHBERLERİ',
    bannerTitle: 'Millî Parkları Likya Yolu, Antik Kentler, Plajlar ve Termal ile Birleştirin',
    bannerDesc:
      'İnteraktif Likya Yolu yürüyüş atlasını, plaj kataloğunu, kanyonlara komşu 3D antik kentler rehberini ve Sultaniye kaplıcalarını inceleyin.',
    btnTrekking: 'Likya Yolu Atlası',
    btnBeaches: 'En İyi Plaj ve Koylar',
    btnThermal: 'Sultaniye Kaplıcaları',
    btnAncient: 'Antik Kentler (3D)',
    rulesEyebrow: '2026 DOĞA KORUMA KANUNLARI VE GÜVENLİK',
    rulesTitle: '4 Kritik Kural: 20:00 Plaj Yasağı, Orman Devriyeleri, Kanyon Ayakkabısı & Mavi Kart',
    rulesSubtitle:
      'Yaz orman giriş yasakları, Saklıkent’te cırtlı ayakkabı zorunluluğu ve DKMP park gişelerinin MüzeKart’tan farkı.',
    sourceLabel: 'Resmî Kaynak',
  },
};

function getRuleHeaderClass(tone: NatureRule2026['tone']): string {
  switch (tone) {
    case 'emerald':
      return 'bg-emerald-700 text-white';
    case 'rose':
      return 'bg-rose-700 text-white';
    case 'cyan':
      return 'bg-cyan-700 text-white';
    default:
      return 'bg-amber-600 text-white';
  }
}

export default function NatureParksHub({ locale }: { locale: LocaleCode }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale) ? locale : 'en';
  const t = HUB_COPY[activeLocale];

  // 3D Map state
  const mapSectionRef = useRef<HTMLElement | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<NatureZoneId | 'all'>('all');
  const [activeKindFilter, setActiveKindFilter] = useState<NaturePointKind | 'all'>('all');
  const [focusedPointId, setFocusedPointId] = useState<string | null>(null);

  // Profiles filter
  const [profileFilter, setProfileFilter] = useState<NatureProfileFilterId>('all');

  // Cool escape picker
  const [goal, setGoal] = useState<NatureGoalChoice>('cool-canyon');
  const [season, setSeason] = useState<NatureSeasonChoice>('summer-jun-sep');
  const [group, setGroup] = useState<GroupChoice>('family-easy');

  const visibleMapPoints = useMemo(() => {
    return NATURE_MAP_POINTS.filter(
      (p) =>
        (activeZoneId === 'all' || p.zoneId === activeZoneId) &&
        (activeKindFilter === 'all' || p.kind === activeKindFilter)
    );
  }, [activeKindFilter, activeZoneId]);

  const focusedPoint = useMemo(() => {
    return NATURE_MAP_POINTS.find((p) => p.id === focusedPointId) || null;
  }, [focusedPointId]);

  const visibleProfiles = useMemo(() => {
    if (profileFilter === 'all') return NATURE_PARK_PROFILES;
    return NATURE_PARK_PROFILES.filter((p) => p.filterGroup === profileFilter);
  }, [profileFilter]);

  const pickerVerdict = useMemo(() => {
    if (goal === 'cool-canyon' && season === 'spring-mar-may') {
      return {
        status: 'caution' as const,
        zone: 'koycegiz-dalyan' as NatureZoneId,
        point: 'yuvarlakcay',
        msg: {
          ru: 'Весной (особенно в марте–апреле) из-за таяния снегов проход вброд по дну **Саклыкента** часто закрыт из-за бурного потока! Лучше выберите реку **Юварлакчай**, полноводный **водопад Топарлар** или кристальную **реку Азмак** в Акьяке.',
          en: 'In spring snowmelt (Mar–Apr), **Saklıkent** riverbed wading often closes for high water. Switch cleanly to **Yuvarlakçay**, roaring **Toparlar Waterfall** or boat rides down the crystal **Azmak River**.',
          de: 'Während der Schneeschmelze (März–April) ist das Flussbett in **Saklıkent** oft zu tief gesperrt. Weichen Sie auf den **Yuvarlakçay**, den vollen **Toparlar-Wasserfall** oder den **Azmak-Fluss** aus.',
          tr: 'İlkbaharda (Mart–Nisan) eriyen karlar nedeniyle **Saklıkent** su içi geçişi kapanabilir; bu dönemde **Yuvarlakçay**, gür akan **Toparlar Şelalesi** veya **Azmak Nehri** daha rahattır.',
        }[activeLocale],
      };
    }

    if (goal === 'cool-canyon') {
      const activePoint = group === 'active-hikers' ? 'saklikent-gorge' : 'yuvarlakcay';
      const activeZone: NatureZoneId =
        group === 'active-hikers' ? 'saklikent-patara' : 'koycegiz-dalyan';
      return {
        status: group === 'active-hikers' ? ('caution' as const) : ('ready' as const),
        zone: activeZone,
        point: activePoint,
        msg: (group === 'active-hikers'
          ? {
              ru: 'Ваш хит — **ущелье Саклыкент (09:00) + водопад Гизликент**! Температура потока держится около **+8…+10 °C** даже в +40 °C жары. Обязательно наденьте закрытые **аквашузы на липучках** и уберите телефон в герметичный чехол.',
              en: 'Lock in **Saklıkent Gorge (09:00) + Gizlikent Waterfall**! Shaded +8–10 °C canyon water beats peak heat completely—just wear **strapped aqua shoes** (never flip-flops!) and pack a waterproof phone pouch.',
              de: 'Top-Ziel: **Saklıkent-Schlucht (09:00) + Gizlikent-Wasserfall** bei +8–10 °C im Schatten! Unbedingt **feste Wasserschuhe mit Klettverschluss** anziehen.',
              tr: 'En serin macera: **Saklıkent Kanyonu (09:00) + Gizlikent Şelalesi**! Yaz ortasında +8–10 °C suda yürümek için **cırtlı kapalı deniz ayakkabısı** şarttır.',
            }
          : {
              ru: 'Идеально для всей семьи без сложного брода — ледяной **Юварлакчай (+8 °C)** или лодка по **реке Азмак (+10 °C)**! Отдохнёте на деревянных топчанах прямо над водой в тени платанов со свежей форелью без срыва сланцев течением.',
              en: 'Zero tricky wading: relax on wooden gazebos over glacial **+8 °C Yuvarlakçay** streams (with safe ladders & swings) or take a quiet cooperative boat down the **Azmak River** in Akyaka.',
              de: 'Stressfrei & familienfreundlich: Entspannen über dem eiskalten **Yuvarlakçay (+8 °C)** auf Holzpavillons unter Platanen oder per ruhigem Boot über den **Azmak-Fluss**.',
              tr: 'Aileler için zahmetsiz serinlik: **Yuvarlakçay**’ın su üstü taht köşklerinde veya **Akyaka Azmak Nehri** kooperatif teknelerinde akıntıyla uğraşmadan doğanın tadını çıkarın.',
            })[activeLocale],
      };
    }

    if (goal === 'pine-mountain' && season === 'summer-jun-sep') {
      return {
        status: 'caution' as const,
        zone: 'oludeniz-valleys' as NatureZoneId,
        point: 'babadag-peak',
        msg: {
          ru: 'Внимание на **Ormanlara Giriş Yasağı**: в сухую жару июня–сентября дикие сосновые тропы вокруг Мармариса и Датчи часто закрыты пожарными патрулями! Выбирайте официальные канатные и парковые зоны: **канатку на кедровый Бабадаг (1 969 м)** либо тенистый **парк Гюнлюклю** у моря.',
          en: 'Check **Ormanlara Giriş Yasağı**: dry Jun–Sep months restrict wild pine trails across Muğla. Stick safely to official parks: take **Babadağ Teleferik** up to 1,969 m cool cedars or picnic inside **Günlüklü Sweetgum Park**.',
          de: 'Achtung **Waldsperre im Sommer**: Wilde Kiefernwege sind oft zu. Nutzen Sie offizielle Parks wie die **Babadağ-Seilbahn (1.969 m Zedernluft)** oder schattige Picknickzonen im **Günlüklü-Park**.',
          tr: 'Yazın **Ormanlara Giriş Yasağı** nedeniyle serbest orman yürüyüşleri kapatılabilir. Güvenli alternatifler: **Babadağ Teleferik (1.969 m sedir serinliği)** veya resmî **Günlüklü Tabiat Parkı**.',
        }[activeLocale],
      };
    }

    if (goal === 'pine-mountain') {
      return {
        status: 'ready' as const,
        zone: 'gokova-marmaris' as NatureZoneId,
        point: 'marmaris-nimara',
        msg: {
          ru: 'Лучший сезон для хвойных массивов! Прогуляйтесь по сосновому **Национальному парку Мармарис до пещеры Нимара** на полуострове Дженнет, загляните в амбровую рощу **Гюнлюклю** или спуститесь по Ликийской тропе к бухте **Кабак**.',
          en: 'Prime open-forest weather! Hike fragrant pine paths inside **Marmaris National Park to Nimara Cave**, breathe tertiary resin inside **Günlüklü Sweetgum Grove**, or hike the Lycian Way above **Kabak Valley**.',
          de: 'Beste Zeit für offene Wälder! Wandern Sie im **Nationalpark Marmaris zur Nimara-Höhle**, durch den **Günlüklü-Amberbaumwald** oder über **Kabak** auf dem Lykischen Weg.',
          tr: 'Orman yürüyüşleri için mükemmel mevsim! **Marmaris Millî Parkı içinde Nimara Mağarası** patikasını, **Günlüklü** sığla korusunu veya **Kabak** sırtlarını güvenle yürüyebilirsiniz.',
        }[activeLocale],
      };
    }

    // wildlife-turtles
    if (group === 'active-hikers' && season !== 'autumn-oct-nov') {
      return {
        status: 'caution' as const,
        zone: 'oludeniz-valleys' as NatureZoneId,
        point: 'butterfly-valley',
        msg: {
          ru: 'Если ваша цель — бабочки и дикая **Долина Бабочек**, обязательно спускайтесь туда **ТОЛЬКО на лодке из Олюдениза** (верёвки со скал Фаральи крайне опасны!). А для черепах заезжайте на рассвете или к **10:00 в центр DEKAMER на Изтузу** (пляж закрыт 20:00–08:00).',
          en: 'Targeting **Butterfly Valley** moths & rear waterfall? Take **ONLY a shuttle boat from Ölüdeniz** (ignore dangerous Faralya cliff ropes!). For loggerhead turtles, pair **İztuzu DEKAMER clinic at 10:00** before the 20:00 beach curfew.',
          de: 'Für das **Schmetterlingstal** bitte **ausschließlich das Shuttle-Boot ab Ölüdeniz** nutzen (nie den Seilpfad!). Für Schildkröten empfehlen wir den Besuch bei **DEKAMER auf İztuzu um 10:00 Uhr**.',
          tr: '**Kelebekler Vadisi** şelalesi ve kelebekleri için **sadece Ölüdeniz’den tekne** kullanın (Faralya ip inişi ölümcüldür!). Caretta için **İztuzu DEKAMER’e 10:00’da** gidin (20:00 kumsal yasağı!).',
        }[activeLocale],
      };
    }

    return {
      status: 'ready' as const,
      zone: 'koycegiz-dalyan' as NatureZoneId,
      point: 'iztuzu-dekamer',
      msg: {
        ru: 'Золотой экомаршрут: в **10:00 загляните в бесплатную клинику DEKAMER** на восточном краю косы **Изтузу** (рассказы о спасении *Caretta caretta*), затем пройдите по камышам Дальяна на лодке к озеру **Кёйджегиз** и птичьим угодьям.',
        en: 'Gold-standard wildlife loop: arrive around **10:00 at DEKAMER Turtle Hospital** on eastern **İztuzu** (free feeding talks), then cruise by boat past Dalyan reed marshes to serene **Lake Köyceğiz**.',
        de: 'Der Klassiker: um **10:00 Uhr in die Klinik DEKAMER** am Ostende von **İztuzu** (Eintritt frei), danach per Boot durch das Schilfdelta von Dalyan bis zum **Köyceğiz-See**.',
        tr: 'En özel doğa rotası: saat **10:00’da İztuzu doğu ucundaki ücretsiz DEKAMER hastanesini** ziyaret edin, ardından Dalyan sazlıkları içinden tekneyle **Köyceğiz Gölü**’ne açılın.',
      }[activeLocale],
    };
  }, [activeLocale, goal, group, season]);

  return (
    <div className="portal-container py-10 md:py-14 space-y-16 md:space-y-20">
      {/* 0. Top Turtle Curfew & Summer Forest Ban Shield */}
      <div className="rounded-2xl bg-emerald-50 border border-emerald-300/90 p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <FaShieldAlt size={22} />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm md:text-base font-extrabold text-emerald-950 flex items-center gap-2">
            <FaTree className="text-emerald-700 flex-shrink-0" />
            <span>{t.shieldTitle}</span>
          </h2>
          <p className="text-xs md:text-sm text-emerald-900 font-medium leading-relaxed">
            {renderFormattedText(t.shieldDesc)}
          </p>
        </div>
      </div>

      {/* 1. Interactive 3D Map + Zone Presets & Stationary Chips */}
      <section ref={mapSectionRef} id="nature-map" className="scroll-mt-28 space-y-6">
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
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                : 'bg-emerald-50 text-emerald-950 border-emerald-200 hover:border-emerald-400'
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

          {NATURE_ZONE_PRESETS.map((preset) => {
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
                    : 'bg-white text-slate-800 border-slate-200/90 hover:border-emerald-400'
                }`}
              >
                <span
                  className={`block text-[10px] font-black uppercase tracking-wider mb-0.5 ${
                    active ? 'text-emerald-300' : 'text-emerald-700'
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

        <NatureParks3DMap
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

        {/* Stationary Quick-Jump Chips Bar (kept above Spotlight Card to avoid layout jump) */}
        <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-800">
              <FaSearchPlus className="text-emerald-600" />
              <span>{t.quickPinsTitle}</span>
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              {visibleMapPoints.length} / {NATURE_MAP_POINTS.length}
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
                      ? 'bg-slate-900 text-emerald-300 border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${MAP_PIN_DOT[pt.kind]}`} />
                  <span className="truncate max-w-[230px]">
                    {pt.title[activeLocale].replace(/\*/g, '')}
                  </span>
                  <span
                    className={`text-[10px] font-semibold opacity-75 hidden sm:inline ${
                      isSelected ? 'text-emerald-200' : 'text-slate-500'
                    }`}
                  >
                    · {pt.statusBadge[activeLocale]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Park Spotlight Card */}
        {focusedPoint && (
          <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-emerald-400 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider">
                  <span className={`w-2 h-2 rounded-full ${MAP_PIN_DOT[focusedPoint.kind]}`} />
                  {t.mapKindLabels[focusedPoint.kind]}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-extrabold">
                  {focusedPoint.statusBadge[activeLocale]}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600">
                  <FaMapMarkerAlt className="text-emerald-600" size={11} />
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
              <p className="text-xs sm:text-sm font-semibold text-sky-800">
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
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <FaExternalLinkAlt size={10} />
                <span>{t.gmapsRouteBtn}</span>
              </a>
            </div>
          </div>
        )}
      </section>

      {/* 2. 8 Protected Natural Parks, Reserves & Canyons */}
      <section id="nature-profiles" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaTree /> {t.profilesEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.profilesTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.profilesSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs self-start lg:self-auto">
            {(['all', 'reserves', 'canyons-rivers', 'parks-lagoons'] as NatureProfileFilterId[]).map(
              (pf) => (
                <button
                  key={pf}
                  type="button"
                  onClick={() => setProfileFilter(pf)}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                    profileFilter === pf
                      ? 'bg-slate-900 text-emerald-300'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.profileFilters[pf]}
                </button>
              )
            )}
          </div>
        </div>

        <div className="space-y-6">
          {visibleProfiles.map((park) => (
            <article
              key={park.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col lg:flex-row"
            >
              <div className="relative h-64 sm:h-72 lg:h-auto lg:w-[390px] flex-shrink-0 bg-slate-900">
                <Image
                  src={park.image}
                  alt={park.title[activeLocale].replace(/\*/g, '')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 390px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/35 lg:hidden" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-emerald-300 border border-white/15 text-[10px] font-extrabold uppercase tracking-wider">
                  {park.code}
                </span>
              </div>

              <div className="p-6 md:p-7 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div>
                    <span className="hidden lg:inline-block text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 mb-1">
                      {park.code} · {park.bestSeason[activeLocale]}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                      {renderFormattedText(park.title[activeLocale])}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-sky-800 mt-1">
                      {renderFormattedText(park.subtitle[activeLocale])}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.feeTagLabel}
                      </span>
                      <strong className="text-emerald-800 font-extrabold">
                        {park.feeBadge[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.statusTagLabel}
                      </span>
                      <strong className="text-slate-900 font-bold">
                        {park.statusBadge[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.tempTagLabel}
                      </span>
                      <strong className="text-sky-800 font-extrabold">
                        {park.waterTempBadge[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.seasonTagLabel}
                      </span>
                      <strong className="text-slate-900 font-bold">
                        {park.bestSeason[activeLocale]}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {renderFormattedText(park.description[activeLocale])}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {t.highlightsLabel}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-700 font-medium">
                      {park.highlights[activeLocale].map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                          <span>{renderFormattedText(hl)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-950 font-medium">
                    {renderFormattedText(park.ruleWarning[activeLocale])}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <Link
                    href={`/${activeLocale}/articles/${park.articleSlug}`}
                    className="text-xs font-extrabold text-sky-700 hover:text-sky-900 hover:underline"
                  >
                    {t.readArticleBtn}
                  </Link>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="#nature-map"
                      onClick={() => {
                        setActiveKindFilter('all');
                        setActiveZoneId(park.zoneId);
                        setFocusedPointId(park.mapPointId);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <FaMapMarkedAlt size={11} className="text-emerald-600" />
                      <span>{t.showOnMapBtn}</span>
                    </a>
                    <a
                      href={park.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
                    >
                      <FaExternalLinkAlt size={10} /> {t.gmapsBtn}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Cool Escape Picker + Water Temperature Contrast + Wildlife Calendar */}
      <section id="cool-escape" className="scroll-mt-28 space-y-12">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaTint /> {t.plannerEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.plannerTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.plannerSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 6 cols: Interactive Nature & Cool-Escape Picker */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div>
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FaCompass className="text-emerald-600" />
                <span>{t.pickerTitle}</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">{t.pickerSubtitle}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="block font-extrabold text-slate-700 mb-2">
                  {t.pickerGoalLabel}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {t.goalOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGoal(opt.id)}
                      className={`px-3 py-2.5 rounded-xl font-bold border text-center transition-colors ${
                        goal === opt.id
                          ? 'bg-slate-900 text-emerald-300 border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block font-extrabold text-slate-700 mb-2">
                  {t.pickerSeasonLabel}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {t.seasonOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSeason(opt.id)}
                      className={`px-3 py-2.5 rounded-xl font-bold border text-center transition-colors ${
                        season === opt.id
                          ? 'bg-slate-900 text-emerald-300 border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block font-extrabold text-slate-700 mb-2">
                  {t.pickerGroupLabel}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.groupOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGroup(opt.id)}
                      className={`px-3 py-2.5 rounded-xl font-bold border text-center transition-colors ${
                        group === opt.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl p-4 md:p-5 border space-y-2.5 ${
                pickerVerdict.status === 'caution'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-2 font-extrabold text-sm">
                {pickerVerdict.status === 'caution' ? (
                  <FaExclamationTriangle className="text-amber-600 flex-shrink-0 text-base" />
                ) : (
                  <FaCheckCircle className="text-emerald-600 flex-shrink-0 text-base" />
                )}
                <span>
                  {pickerVerdict.status === 'caution' ? t.verdictCaution : t.verdictReady}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {renderFormattedText(pickerVerdict.msg)}
              </p>

              <div className="pt-1 flex justify-end">
                <a
                  href="#nature-map"
                  onClick={() => {
                    setActiveKindFilter('all');
                    setActiveZoneId(pickerVerdict.zone);
                    setFocusedPointId(pickerVerdict.point);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 text-xs font-extrabold transition-colors"
                >
                  {t.pickerFocusBtn}
                </a>
              </div>
            </div>
          </div>

          {/* Right 6 cols: Water Temperature Spectrum + Wildlife Seasons */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 border border-slate-800 shadow-sm space-y-4">
              <div>
                <h3 className="text-base md:text-lg font-extrabold flex items-center gap-2">
                  <FaTint className="text-sky-400" />
                  <span>{t.waterScaleTitle}</span>
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-0.5">{t.waterScaleSubtitle}</p>
              </div>

              <div className="space-y-3">
                {WATER_TEMP_CONTRASTS.map((wt) => (
                  <div key={wt.id} className="space-y-1">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-100">{wt.place[activeLocale]}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-sky-300 font-extrabold">
                        {wt.tempLabel}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${wt.barClass}`}
                        style={{ width: `${wt.fillPct}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">{wt.note[activeLocale]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FaCalendarAlt className="text-emerald-600" />
                <span>{t.wildlifeTitle}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WILDLIFE_SEASONS.map((ws) => (
                  <div
                    key={ws.id}
                    className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-1.5"
                  >
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold">
                      {ws.seasonBadge[activeLocale]}
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                      {ws.title[activeLocale]}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                      {renderFormattedText(ws.description[activeLocale])}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 4 Endemics + Interlinking Banner + Conservation Rules 2026 */}
      <section id="eco-rules" className="scroll-mt-28 space-y-12">
        {/* 4 Endemics */}
        <div className="space-y-5">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaLeaf /> {t.endemicsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.endemicsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.endemicsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REGIONAL_ENDEMICS.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl p-5 md:p-6 border border-emerald-200/80 shadow-xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wider">
                    {item.badge[activeLocale]}
                  </span>
                  <span className="text-[11px] font-bold italic text-slate-500">
                    {item.latinName}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {item.title[activeLocale]}
                </h3>
                <p className="text-xs font-bold text-teal-800">
                  {t.whereToSeeLabel} {item.whereToSee[activeLocale]}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {renderFormattedText(item.description[activeLocale])}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Dark Interlinking Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider border border-emerald-500/30">
              <FaRoute size={10} /> {t.bannerEyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{t.bannerTitle}</h3>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              {t.bannerDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-shrink-0">
            <Link
              href={`/${activeLocale}/routes/trekking`}
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaMountain size={11} /> {t.btnTrekking}
            </Link>
            <Link
              href={`/${activeLocale}/beaches`}
              className="px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaUmbrellaBeach size={11} /> {t.btnBeaches}
            </Link>
            <Link
              href={`/${activeLocale}/thermal-spa`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-teal-300" /> {t.btnThermal}
            </Link>
            <Link
              href={`/${activeLocale}/ancient-cities`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaLandmark size={11} className="text-amber-300" /> {t.btnAncient}
            </Link>
          </div>
        </div>

        {/* 4 Strict Nature Rules 2026 */}
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
            {NATURE_RULES_2026.map((card) => (
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
                        <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 mt-1.5" />
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
                    className="font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
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
