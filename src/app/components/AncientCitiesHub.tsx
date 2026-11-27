"use client";

import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBookOpen,
  FaCalculator,
  FaCheckCircle,
  FaClock,
  FaCompass,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaHistory,
  FaInfoCircle,
  FaLandmark,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaMountain,
  FaRoute,
  FaSearchPlus,
  FaShieldAlt,
  FaTicketAlt,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import AncientCities3DMap from './AncientCities3DMap';
import {
  ANCIENT_CITY_PROFILES,
  ANCIENT_EPOCHS,
  ANCIENT_MAP_POINTS,
  ANCIENT_ROUTE_COMBOS,
  ANCIENT_VISIT_RULES_2026,
  ANCIENT_ZONE_PRESETS,
  MUSEUMPASS_AKDENIZ_EUR,
  MUSEUMPASS_EGE_EUR,
  MUSEUMPASS_TURKIYE_EUR,
  TICKET_CALC_SITES,
  type AncientPointKind,
  type AncientVisitRule,
  type AncientZoneId,
  type LocaleCode,
  type ProfileFilterId,
} from '@/lib/ancient-cities';

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

const MAP_PIN_DOT: Record<AncientPointKind, string> = {
  'unesco-flagship': 'bg-amber-500',
  'caria-harbor': 'bg-sky-500',
  'free-mountain': 'bg-emerald-500',
  'coastal-ruins': 'bg-rose-500',
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
  mapKindLabels: Record<AncientPointKind, string>;
  profilesEyebrow: string;
  profilesTitle: string;
  profilesSubtitle: string;
  profileFilters: Record<ProfileFilterId, string>;
  ticketTagLabel: string;
  passTagLabel: string;
  durationTagLabel: string;
  bestTimeTagLabel: string;
  highlightsLabel: string;
  readArticleBtn: string;
  showOnMapBtn: string;
  gmapsBtn: string;
  plannerEyebrow: string;
  plannerTitle: string;
  plannerSubtitle: string;
  calcTitle: string;
  calcSubtitle: string;
  calcPresetLycia: string;
  calcPresetDemre: string;
  calcPresetAll: string;
  calcClearBtn: string;
  calcEgeHeading: string;
  calcAkdenizHeading: string;
  calcSingleTotalLabel: string;
  calcComparePassLabel: string;
  calcBorderAlertTitle: string;
  calcBorderAlertDesc: string;
  routesTitle: string;
  routesWhyLabel: string;
  routesShowMapBtn: string;
  epochsEyebrow: string;
  epochsTitle: string;
  freeEyebrow: string;
  freeTitle: string;
  freeSubtitle: string;
  freeEntryBadge: string;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerDesc: string;
  btnTrekking: string;
  btnBeaches: string;
  btnThermal: string;
  btnHistory: string;
  rulesEyebrow: string;
  rulesTitle: string;
  rulesSubtitle: string;
  sourceLabel: string;
}

const HUB_COPY: Record<LocaleCode, HubCopy> = {
  ru: {
    shieldTitle: '2 главных секрета 2026: граница MuseumPass по реке Эшен + 5 бесплатных руин без касс',
    shieldDesc:
      'Тлос, Каунос, Книдос и Летоон относятся к Мугле (MuseumPass Ege), а Ксантос, Патара и Мира через реку — уже к Анталье (MuseumPass Akdeniz, 90 €). Не покупайте дорогой абонемент вслепую — проверьте сумму в калькуляторе ниже и учтите полуденную жару на известняке.',
    mapEyebrow: 'ЖИВАЯ 3D-КАРТА АНТИЧНОСТИ',
    mapTitle: 'Интерактивная 3D-карта 15 античных городов Ликии и Карии (Книдос — Мира)',
    mapSubtitle:
      'Стартует с обзора всего побережья от мыса Датчи до Демре: выберите кластер, фильтр типа (ЮНЕСКО, порты Карии, бесплатные горные полисы) или чип объекта ниже для плавного подлёта.',
    allZonesCode: 'ВСЁ ПОБЕРЕЖЬЕ',
    allZonesBtn: 'Весь регион (15)',
    allZonesSub: 'Обзор Книдос — Мира',
    quickPinsTitle: 'Быстрый подлёт к античным руинам, театрам и некрополям',
    selectedCoordsLabel: 'GPS-координаты',
    resetZoomBtn: 'Весь регион (отдалить)',
    gmapsRouteBtn: 'Маршрут в Google Maps',
    mapKindLabels: {
      'unesco-flagship': 'Флагман Ликии / ЮНЕСКО',
      'caria-harbor': 'Античный порт Карии',
      'free-mountain': 'Бесплатный полис (0 €)',
      'coastal-ruins': 'Крепость / Гробницы',
    },
    profilesEyebrow: '8 КЛЮЧЕВЫХ АРХЕОПАРКОВ С ФОТО И СОВЕТАМИ',
    profilesTitle: 'Золотое кольцо Ликии, гавани Карии и уединённые города без толп',
    profilesSubtitle:
      'Отфильтруйте формат маршрута, сравните реальную стоимость входа 2026 года, лучшее время без жары и сразу переходите к подробному гиду по каждому городу.',
    profileFilters: {
      all: 'Все города (8)',
      'lycia-top': 'ЮНЕСКО и Топ Ликии (4)',
      'caria-ports': 'Порты Карии у воды (2)',
      'hidden-special': 'Без толп и особый формат (2)',
    },
    ticketTagLabel: 'Билет 2026',
    passTagLabel: 'Музейная карта',
    durationTagLabel: 'На осмотр',
    bestTimeTagLabel: 'Лучший час',
    highlightsLabel: 'Что важно знать на месте',
    readArticleBtn: 'Подробный гид →',
    showOnMapBtn: 'На 3D-карте ↑',
    gmapsBtn: 'Google Maps',
    plannerEyebrow: 'КАЛЬКУЛЯТОР БИЛЕТОВ 2026 И МАРШРУТЫ БЕЗ ПЕРЕГРЕВА',
    plannerTitle: 'Разовые билеты vs MuseumPass + 3 готовых маршрута на полдня',
    plannerSubtitle:
      'Отметьте галочками платные памятники, которые хотите посетить — калькулятор сразу покажет честную сумму в евро, разделит Муглу и Анталью и подскажет, окупится ли абонемент.',
    calcTitle: 'Калькулятор билетов muze.gov.tr (2026)',
    calcSubtitle: 'Отметьте выбранные сайты или примените готовый набор.',
    calcPresetLycia: 'Кольцо Ликии',
    calcPresetDemre: 'Восток: Патара + Демре',
    calcPresetAll: 'Выбрать все (11)',
    calcClearBtn: 'Сбросить',
    calcEgeHeading: 'Провинция Мугла (зона MuseumPass Ege)',
    calcAkdenizHeading: 'Провинция Анталья (зона MuseumPass Akdeniz · 90 €)',
    calcSingleTotalLabel: 'Сумма разовых билетов',
    calcComparePassLabel: 'Сравнение с MuseumPass 2026',
    calcBorderAlertTitle: 'В корзине две разные провинции (Мугла + Анталья)!',
    calcBorderAlertDesc:
      'Один региональный пасс не закроет оба берега реки Эшен. Либо берите разовые билеты, либо учитывайте Türkiye Pass (165 €), только если также едете в Эфес, Памуккале или Анталью.',
    routesTitle: '3 готовых маршрута: античность + прохлада воды',
    routesWhyLabel: 'ПОЧЕМУ ЭТО РАБОТАЕТ',
    routesShowMapBtn: 'Показать точку на 3D-карте ↑',
    epochsEyebrow: '4 ЭПОХИ ПОБЕРЕЖЬЯ',
    epochsTitle: 'Кто и когда построил эти города: от Ликийского союза до 1923 года',
    freeEyebrow: '5 ОТКРЫТЫХ ПОЛИСОВ БЕЗ ТУРНИКЕТОВ',
    freeTitle: 'Куда заехать совершенно бесплатно (0 €): горы, сосны и закатный театр',
    freeSubtitle:
      'Если не хочется платить за билеты и стоять рядом с экскурсионными автобусами — сохраните эти 5 бесплатных локаций с координатами на 3D-карте.',
    freeEntryBadge: 'Вход 0 € · Открытая территория',
    bannerEyebrow: 'СВЯЗАННЫЕ МАРШРУТЫ ПОРТАЛА',
    bannerTitle: 'Совместите античные города с треккингом, пляжами и термами',
    bannerDesc:
      'Откройте Атлас Ликийской и Карийской троп, карту лучших пляжей (включая Патару и Изтузу), гид по термам Султание рядом с Кауносом и полную историю региона.',
    btnTrekking: 'Атлас Ликийской тропы',
    btnBeaches: 'Гид по пляжам и бухтам',
    btnThermal: 'Термы Султание у Кауноса',
    btnHistory: 'Полная история региона',
    rulesEyebrow: 'ПРАКТИКА, БИЛЕТЫ И ЗАПРЕТЫ 2026',
    rulesTitle: '4 правила поездок по руинам: пассы, обувь, дроны и часы работы',
    rulesSubtitle:
      'Перед выездом проверьте летний и зимний режим касс `muze.gov.tr`, запрет квадрокоптеров в археозонах и границу провинций по реке Эшен.',
    sourceLabel: 'Официальный источник',
  },
  en: {
    shieldTitle: '2 Key 2026 Hacks: Eşen River MuseumPass Border + 5 Completely Free Ruins (€0)',
    shieldDesc:
      'Tlos, Kaunos, Knidos & Letoon sit in Muğla (MuseumPass Ege), while Xanthos, Patara & Myra 4 km east sit in Antalya (MuseumPass Akdeniz, €90). Run the calculator below before buying any pass—and skip bare stone glare between 11:30 and 16:00.',
    mapEyebrow: 'LIVE 3D ARCHAEOLOGY MAP',
    mapTitle: 'Interactive 3D Map of 15 Ancient Cities Across Lycia & Caria (Knidos — Myra)',
    mapSubtitle:
      'Opens on the full coastal span from Datça to Demre: tap any region cluster, filter badge (UNESCO Top, Carian Harbors, Free Mountain Sites) or jump chip below.',
    allZonesCode: 'FULL OVERVIEW',
    allZonesBtn: 'Full Coast (15)',
    allZonesSub: 'Knidos — Myra',
    quickPinsTitle: 'Fly straight to theaters, rock tombs & cliffside citadels',
    selectedCoordsLabel: 'GPS Coordinates',
    resetZoomBtn: 'Full Region (Zoom Out)',
    gmapsRouteBtn: 'Directions in Google Maps',
    mapKindLabels: {
      'unesco-flagship': 'Lycia Flagship / UNESCO',
      'caria-harbor': 'Ancient Carian Port',
      'free-mountain': 'Free Open City (€0)',
      'coastal-ruins': 'Rock Tombs / Castle',
    },
    profilesEyebrow: '8 SIGNATURE ARCHAEOLOGICAL PARKS',
    profilesTitle: 'The Golden Ring of Lycia, Carian Ports & Crowd-Free Gems',
    profilesSubtitle:
      'Filter by trip style, compare verified 2026 `muze.gov.tr` ticket tariffs and peak-heat timing, then jump to detailed field guides or locate pins on the 3D map.',
    profileFilters: {
      all: 'All Highlight Sites (8)',
      'lycia-top': 'UNESCO & Lycia Top (4)',
      'caria-ports': 'Carian Coastal Ports (2)',
      'hidden-special': 'Crowd-Free & Heritage (2)',
    },
    ticketTagLabel: '2026 Ticket',
    passTagLabel: 'MuseumPass Zone',
    durationTagLabel: 'Time Needed',
    bestTimeTagLabel: 'Best Window',
    highlightsLabel: 'On-Site Essentials',
    readArticleBtn: 'Full Field Guide →',
    showOnMapBtn: 'Locate on 3D Map ↑',
    gmapsBtn: 'Google Maps',
    plannerEyebrow: '2026 TICKET CALCULATOR & HEAT-SMART COMBOS',
    plannerTitle: 'Pay-As-You-Go vs MuseumPass + 3 Anti-Heat Half-Day Loops',
    plannerSubtitle:
      'Tick the paid ruins on your wish list to compare single gate tickets in EUR against MuseumPass Ege/Akdeniz/Türkiye—no more guessing across the provincial border.',
    calcTitle: 'muze.gov.tr 2026 Ticket & Pass Calculator',
    calcSubtitle: 'Toggle paid monuments or load a preset itinerary.',
    calcPresetLycia: 'Lycia Classic',
    calcPresetDemre: 'Patara + Demre East',
    calcPresetAll: 'Select All (11)',
    calcClearBtn: 'Clear',
    calcEgeHeading: 'Muğla Province (MuseumPass Ege Zone)',
    calcAkdenizHeading: 'Antalya Province (MuseumPass Akdeniz · €90)',
    calcSingleTotalLabel: 'Single Tickets Sum',
    calcComparePassLabel: 'MuseumPass Verdict',
    calcBorderAlertTitle: 'Your list crosses TWO provinces (Muğla + Antalya)!',
    calcBorderAlertDesc:
      'No single regional pass covers both sides of the Eşen River. Pay-at-gate usually wins unless you also visit major hubs like Ephesus, Pamukkale or Antalya Aspendos with the €165 Türkiye Pass.',
    routesTitle: '3 Heat-Smart Circuits: Ruins + Cold Canyon or Thermal Water',
    routesWhyLabel: 'WHY THIS COMBO WORKS',
    routesShowMapBtn: 'Pin Starting Site on 3D Map ↑',
    epochsEyebrow: '4 HISTORICAL LAYERS',
    epochsTitle: 'Who Built These Cities: From Lycian Federalism to 1923 Kayaköy',
    freeEyebrow: '5 FREE OPEN-AIR CITIES (ZERO TICKETS)',
    freeTitle: 'Walk Spectacular Ruins for €0: Mountain Citadels & Sunset Theatres',
    freeSubtitle:
      'Skip queues and ticket booths entirely at these five open-access sites—just pack water and good sneakers.',
    freeEntryBadge: 'Free Entry (€0) · Unfenced',
    bannerEyebrow: 'CONNECTED COASTAL GUIDES',
    bannerTitle: 'Pair Ancient Cities with Hiking Trails, Dunes & Hot Springs',
    bannerDesc:
      'Link up our interactive Lycian Way trail atlas, turquoise beach directory (Patara & İztuzu), Sultaniye mineral springs by Kaunos, and full regional history.',
    btnTrekking: 'Lycian Way Trail Atlas',
    btnBeaches: 'Best Beaches & Coves',
    btnThermal: 'Sultaniye Springs by Kaunos',
    btnHistory: 'Full Coast History Guide',
    rulesEyebrow: '2026 HOURS, SHOES & DRONE RULES',
    rulesTitle: '4 Critical Site Rules: Provincial Passes, Grip, Drones & Cashless Gates',
    rulesSubtitle:
      'Know the summer vs winter closing times, EUR-to-TRY card billing at gates, and strict SHGM drone bans inside fenced Ministry monuments.',
    sourceLabel: 'Verified Source',
  },
  de: {
    shieldTitle: '2 Praxis-Hacks 2026: MuseumPass-Grenze am Eşen-Fluss + 5 Gratis-Ruinen (0 €)',
    shieldDesc:
      'Tlos, Kaunos, Knidos & Letoon liegen in Muğla (MuseumPass Ege), Xanthos, Patara & Myra gleich nebenan in Antalya (MuseumPass Akdeniz, 90 €). Prüfen Sie Ihre Route vorab im Rechner und meiden Sie Kalkstein-Hitze zwischen 11:30 und 16:00 Uhr.',
    mapEyebrow: 'INTERAKTIVE 3D-ARCHÄOLOGIEKARTE',
    mapTitle: 'Live 3D-Karte: 15 Antike Städte in Lykien & Karien (Knidos — Myra)',
    mapSubtitle:
      'Startet mit dem Überblick von Datça bis Demre: Wählen Sie eine Zone, einen Kategorie-Filter (UNESCO, Karien, Kostenlos) oder einen Schnell-Chip unter der Karte.',
    allZonesCode: 'ÜBERSICHT',
    allZonesBtn: 'Ganze Küste (15)',
    allZonesSub: 'Knidos bis Myra',
    quickPinsTitle: 'Direkt zu Theatern, Felsengräbern & Akropolen fliegen',
    selectedCoordsLabel: 'GPS-Koordinaten',
    resetZoomBtn: 'Ganze Region (Rauszoomen)',
    gmapsRouteBtn: 'Route in Google Maps',
    mapKindLabels: {
      'unesco-flagship': 'Lykien-Flaggschiff / UNESCO',
      'caria-harbor': 'Antiker karischer Hafen',
      'free-mountain': 'Kostenlose Stätte (0 €)',
      'coastal-ruins': 'Felsengräber / Burg',
    },
    profilesEyebrow: '8 TOP-AUSGRABUNGEN MIT FOTOS & PRAXISTIPPS',
    profilesTitle: 'Das Goldene Dreieck Lykiens, Karische Häfen & stille Entdeckungen',
    profilesSubtitle:
      'Filtern Sie nach Reiseprofil, prüfen Sie offizielle 2026-Eintritte und beste Tageszeiten oder öffnen Sie direkt den passenden Detailartikel.',
    profileFilters: {
      all: 'Alle Profile (8)',
      'lycia-top': 'UNESCO & Top-Lykien (4)',
      'caria-ports': 'Karische Seehäfen (2)',
      'hidden-special': 'Ohne Massen & Besonders (2)',
    },
    ticketTagLabel: 'Ticket 2026',
    passTagLabel: 'MuseumPass-Zone',
    durationTagLabel: 'Zeitbedarf',
    bestTimeTagLabel: 'Beste Zeit',
    highlightsLabel: 'Wichtig vor Ort',
    readArticleBtn: 'Detail-Guide lesen →',
    showOnMapBtn: 'Auf 3D-Karte ↑',
    gmapsBtn: 'Google Maps',
    plannerEyebrow: 'TICKETRECHNER 2026 & ANTI-HITZE-ROUTEN',
    plannerTitle: 'Einzeltickets vs. MuseumPass + 3 Halbtages-Kombis ohne Hitzestress',
    plannerSubtitle:
      'Haken Sie Ihre Wunschziele an: Der Rechner vergleicht sofort den Einzeleintritt in Euro mit dem MuseumPass und warnt bei der Provinzgrenze.',
    calcTitle: 'muze.gov.tr Ticket- & Passrechner 2026',
    calcSubtitle: 'Ziele auswählen oder fertige Vorauswahl testen.',
    calcPresetLycia: 'Lykien-Runde',
    calcPresetDemre: 'Patara + Demre Ost',
    calcPresetAll: 'Alle wählen (11)',
    calcClearBtn: 'Zurücksetzen',
    calcEgeHeading: 'Provinz Muğla (MuseumPass Ege Zone)',
    calcAkdenizHeading: 'Provinz Antalya (MuseumPass Akdeniz · 90 €)',
    calcSingleTotalLabel: 'Summe Einzeltickets',
    calcComparePassLabel: 'MuseumPass-Check',
    calcBorderAlertTitle: 'Auswahl kreuzt ZWEI Provinzen (Muğla + Antalya)!',
    calcBorderAlertDesc:
      'Kein einzelner Regionalpass deckt beide Seiten des Eşen-Flusses ab. Meist sind Einzeltickets deutlich günstiger—außer Sie besuchen auch noch Ephesos oder Pamukkale (Türkiye Pass 165 €).',
    routesTitle: '3 clevere Kombis: Antike + kühles Wasser',
    routesWhyLabel: 'WARUM DAS IDEAL IST',
    routesShowMapBtn: 'Startpunkt auf 3D-Karte ↑',
    epochsEyebrow: '4 ZEITSCHICHTEN DER KÜSTE',
    epochsTitle: 'Wer diese Städte baute: Vom Lykischen Bund bis Kayaköy 1923',
    freeEyebrow: '5 KOSTENLOSE RUINEN OHNE KASSE (0 €)',
    freeTitle: 'Beeindruckende Antike für 0 €: Bergstädte im Wald & Küstentheater',
    freeSubtitle:
      'Kein Ticketkauf, keine Reisebusse: Diese fünf frei zugänglichen Anlagen bieten maximale Atmosphäre—denken Sie an Trinkwasser und griffige Schuhe.',
    freeEntryBadge: 'Eintritt frei (0 €) · Offen',
    bannerEyebrow: 'PASSENDE GUIDE-THEMEN',
    bannerTitle: 'Antike Städte verbinden mit Wanderwegen, Stränden & Thermalquellen',
    bannerDesc:
      'Entdecken Sie den Wanderatlas für den Lykischen Weg, unseren Strandguide (inkl. Patara & İztuzu), Sultaniye nahe Kaunos und die Regionalgeschichte.',
    btnTrekking: 'Wanderatlas Lykischer Weg',
    btnBeaches: 'Strände & Buchten',
    btnThermal: 'Sultaniye-Thermen bei Kaunos',
    btnHistory: 'Geschichte der Region',
    rulesEyebrow: 'PRAXISREGELN, SCHUHE & DROHNEN 2026',
    rulesTitle: '4 Wichtige Regeln vor Ort: Passgrenze, Marmor, Drohnen & Zeiten',
    rulesSubtitle:
      'Beachten Sie Sommer-/Winter-Schließzeiten der `muze.gov.tr`-Kassen, das strikte Drohnenverbot und den Schutz der Meeresschildkröten ab 20:00 Uhr.',
    sourceLabel: 'Offizielle Quelle',
  },
  tr: {
    shieldTitle: '2026’nın 2 Büyük İpucu: Eşen Çayı MüzeKart/Pass Sınırı + Gişesiz 5 Ücretsiz Ören Yeri (0 €)',
    shieldDesc:
      'Tlos, Kaunos, Knidos ve Letoon Muğla (MuseumPass Ege), hemen yanındaki Ksanthos, Patara ve Myra ise Antalya (MuseumPass Akdeniz, 90 €) tarafındadır. Tekil bilet toplamını aşağıdaki hesaplayıcıda görün ve 11:30–16:00 öğle sıcağını gölgede geçirin.',
    mapEyebrow: 'CANLI 3D ARKEOLOJİ HARİTASI',
    mapTitle: 'Likya ve Karya’nın 15 Antik Kenti — 3D Harita (Knidos — Myra)',
    mapSubtitle:
      'Datça ucundan Demre’ye tüm kıyı şeridini gösterir: bir bölge kümesine, kategori filtresine (UNESCO, Karya, Ücretsiz) veya aşağıdaki nokta etiketlerine tıklayın.',
    allZonesCode: 'GENEL BAKIŞ',
    allZonesBtn: 'Tüm Kıyı (15)',
    allZonesSub: 'Knidos — Myra',
    quickPinsTitle: 'Antik tiyatrolara, kaya mezarlarına ve akropollere hızlı odaklanın',
    selectedCoordsLabel: 'GPS Koordinatları',
    resetZoomBtn: 'Tüm Bölge (Uzaklaş)',
    gmapsRouteBtn: 'Google Haritalar Yol Tarifi',
    mapKindLabels: {
      'unesco-flagship': 'Likya Zirvesi / UNESCO',
      'caria-harbor': 'Antik Karya Limanı',
      'free-mountain': 'Ücretsiz Açık Kent (0 €)',
      'coastal-ruins': 'Kaya Mezarı / Kale',
    },
    profilesEyebrow: 'FOTOĞRAFLI 8 ANA ÖREN YERİ PROFİLİ',
    profilesTitle: 'Likya’nın Altın Halkası, Karya Limanları ve Kalabalıksız Keşifler',
    profilesSubtitle:
      'İlgi alanınıza göre filtreleyin, 2026 `muze.gov.tr` yabancı bilet aralıklarını ve ideal ziyaret saatlerini karşılaştırın.',
    profileFilters: {
      all: 'Tüm Profil Kentler (8)',
      'lycia-top': 'UNESCO & Likya Zirvesi (4)',
      'caria-ports': 'Karya Kıyı Limanları (2)',
      'hidden-special': 'Kalabalıksız & Özel (2)',
    },
    ticketTagLabel: '2026 Bilet',
    passTagLabel: 'Bölge Pass',
    durationTagLabel: 'Gezi Süresi',
    bestTimeTagLabel: 'En İyi Saat',
    highlightsLabel: 'Saha Detayları',
    readArticleBtn: 'Detaylı Rehber →',
    showOnMapBtn: '3D Haritada Gör ↑',
    gmapsBtn: 'Google Haritalar',
    plannerEyebrow: '2026 BİLET HESAPLAYICI VE SERİN ROTALAR',
    plannerTitle: 'Tekil Bilet mi MuseumPass mı? + Sıcağa Yakalanmayan 3 Hazır Rota',
    plannerSubtitle:
      'Gezmek istediğiniz ücretli antik kentleri işaretleyin: hesaplayıcı Euro toplamını çıkarsın, Muğla/Antalya sınırını ayırsın ve hangisinin kârlı olduğunu göstersin.',
    calcTitle: 'muze.gov.tr 2026 Yabancı Ziyaretçi Bilet Hesaplayıcı',
    calcSubtitle: 'Alanları seçin veya hazır rotalardan birini yükleyin.',
    calcPresetLycia: 'Likya Klasik',
    calcPresetDemre: 'Patara + Demre Doğu',
    calcPresetAll: 'Tümünü Seç (11)',
    calcClearBtn: 'Sıfırla',
    calcEgeHeading: 'Muğla İli (MuseumPass Ege Bölgesi)',
    calcAkdenizHeading: 'Antalya İli (MuseumPass Akdeniz · 90 €)',
    calcSingleTotalLabel: 'Tekil Bilet Toplamı',
    calcComparePassLabel: 'Pass Karşılaştırması',
    calcBorderAlertTitle: 'Seçiminiz İKİ farklı ili (Muğla + Antalya) kapsıyor!',
    calcBorderAlertDesc:
      'Tek bir bölgesel pass Eşen Çayı’nın iki yakasını birden kapsamaz (Türkiye vatandaşları için T.C. MüzeKart elbette hepsinde geçerlidir; yabancı konuklar için tekil biletler genelde daha ekonomiktir).',
    routesTitle: '3 Akıllı Yarım/Tam Gün Rotası: Tarih + Serin Su',
    routesWhyLabel: 'NEDEN İDEAL?',
    routesShowMapBtn: 'Rotayı 3D Haritada Aç ↑',
    epochsEyebrow: 'KIYININ 4 TARİHÎ KATMANI',
    epochsTitle: 'Bu Kentleri Kim Kurdu? Likya Birliği’nden 1923 Kayaköy’e',
    freeEyebrow: 'GİŞESİZ VE ÜCRETSİZ 5 ANTİK KENT (0 €)',
    freeTitle: 'Bilet Ödemeden Gezilebilen 5 Muhteşem Nokta: Yayla Kentleri ve Tiyatro',
    freeSubtitle:
      'Sıra beklemeden ve ücret ödemeden gezebileceğiniz beş açık ören yeri — yanınıza bol su ve kaymaz tabanlı ayakkabı almayı unutmayın.',
    freeEntryBadge: 'Ücretsiz Giriş (0 €) · Açık Alan',
    bannerEyebrow: 'BAĞLANTILI KEŞİF REHBERLERİ',
    bannerTitle: 'Antik Kentleri Yürüyüş Rotaları, Plajlar ve Kaplıcalarla Birleştirin',
    bannerDesc:
      'Likya Yolu interaktif atlasını, Patara ve İztuzu dâhil en iyi plajlar rehberini, Kaunos yanındaki Sultaniye kaplıcalarını ve bölge tarihini inceleyin.',
    btnTrekking: 'Likya Yolu Atlası',
    btnBeaches: 'En İyi Plaj ve Koylar',
    btnThermal: 'Kaunos Yanında Sultaniye',
    btnHistory: 'Bölge Tarihi Rehberi',
    rulesEyebrow: '2026 ZİYARET SAATLERİ VE KURALLAR',
    rulesTitle: 'Ören Yerine Gitmeden Bilmeniz Gereken 4 Kritik Kural',
    rulesSubtitle:
      'Yaz/kış gişe kapanış saatleri, kaygan mermerlerde doğru ayakkabı, izinsiz drone yasağı ve Eşen Çayı il sınırı detayı.',
    sourceLabel: 'Resmî Kaynak',
  },
};

function getRuleHeaderClass(tone: AncientVisitRule['tone']): string {
  switch (tone) {
    case 'amber':
      return 'bg-amber-600 text-white';
    case 'rose':
      return 'bg-rose-700 text-white';
    case 'cyan':
      return 'bg-cyan-700 text-white';
    default:
      return 'bg-slate-900 text-white';
  }
}

export default function AncientCitiesHub({ locale }: { locale: LocaleCode }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale) ? locale : 'en';
  const t = HUB_COPY[activeLocale];

  // 3D Map state
  const mapSectionRef = useRef<HTMLElement | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<AncientZoneId | 'all'>('all');
  const [activeKindFilter, setActiveKindFilter] = useState<AncientPointKind | 'all'>('all');
  const [focusedPointId, setFocusedPointId] = useState<string | null>(null);

  // Profiles filter state
  const [profileFilter, setProfileFilter] = useState<ProfileFilterId>('all');

  // Ticket calculator state
  const [selectedCalcIds, setSelectedCalcIds] = useState<string[]>([
    'calc-tlos',
    'calc-letoon',
    'calc-xanthos',
    'calc-patara',
  ]);

  // Combo routes tab state
  const [activeComboId, setActiveComboId] = useState<string>(ANCIENT_ROUTE_COMBOS[0].id);

  const visibleMapPoints = useMemo(() => {
    return ANCIENT_MAP_POINTS.filter(
      (p) =>
        (activeZoneId === 'all' || p.zoneId === activeZoneId) &&
        (activeKindFilter === 'all' || p.kind === activeKindFilter)
    );
  }, [activeKindFilter, activeZoneId]);

  const focusedPoint = useMemo(() => {
    return ANCIENT_MAP_POINTS.find((p) => p.id === focusedPointId) || null;
  }, [focusedPointId]);

  const visibleProfiles = useMemo(() => {
    if (profileFilter === 'all') return ANCIENT_CITY_PROFILES;
    return ANCIENT_CITY_PROFILES.filter((p) => p.filterGroup === profileFilter);
  }, [profileFilter]);

  const freeMountainSites = useMemo(() => {
    return ANCIENT_MAP_POINTS.filter((p) => p.passRegion === 'free');
  }, []);

  const calcStats = useMemo(() => {
    const picked = TICKET_CALC_SITES.filter((s) => selectedCalcIds.includes(s.id));
    const egeSum = picked
      .filter((s) => s.passRegion === 'ege')
      .reduce((acc, s) => acc + s.priceEur, 0);
    const akdenizSum = picked
      .filter((s) => s.passRegion === 'akdeniz')
      .reduce((acc, s) => acc + s.priceEur, 0);
    const totalSum = egeSum + akdenizSum;
    const hasMixedProvinces = egeSum > 0 && akdenizSum > 0;
    return { pickedCount: picked.length, egeSum, akdenizSum, totalSum, hasMixedProvinces };
  }, [selectedCalcIds]);

  const activeCombo = useMemo(() => {
    return ANCIENT_ROUTE_COMBOS.find((c) => c.id === activeComboId) || ANCIENT_ROUTE_COMBOS[0];
  }, [activeComboId]);

  const toggleCalcSite = (siteId: string) => {
    setSelectedCalcIds((prev) =>
      prev.includes(siteId) ? prev.filter((id) => id !== siteId) : [...prev, siteId]
    );
  };

  return (
    <div className="portal-container py-10 md:py-14 space-y-16 md:space-y-20">
      {/* 0. Top Provincial Border & Free Sites Shield */}
      <div className="rounded-2xl bg-amber-50 border border-amber-300/90 p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-sm">
          <FaShieldAlt size={22} />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm md:text-base font-extrabold text-amber-950 flex items-center gap-2">
            <FaLandmark className="text-amber-700 flex-shrink-0" />
            <span>{t.shieldTitle}</span>
          </h2>
          <p className="text-xs md:text-sm text-amber-900 font-medium leading-relaxed">
            {t.shieldDesc}
          </p>
        </div>
      </div>

      {/* 1. Interactive 3D Map + Zone Presets & Stationary Chips */}
      <section ref={mapSectionRef} id="ancient-map" className="scroll-mt-28 space-y-6">
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

        {/* Full Region Button FIRST + 5 Zone Presets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            type="button"
            onClick={() => {
              setFocusedPointId(null);
              setActiveZoneId('all');
            }}
            className={`text-left p-3 rounded-2xl border transition-all flex flex-col justify-center ${
              activeZoneId === 'all' && !focusedPointId
                ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                : 'bg-amber-50 text-amber-950 border-amber-200 hover:border-amber-400'
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

          {ANCIENT_ZONE_PRESETS.map((preset) => {
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
                    : 'bg-white text-slate-800 border-slate-200/90 hover:border-amber-400'
                }`}
              >
                <span
                  className={`block text-[10px] font-black uppercase tracking-wider mb-0.5 ${
                    active ? 'text-amber-300' : 'text-amber-700'
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

        <AncientCities3DMap
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

        {/* Stationary Quick-Jump Chips Bar (kept above Spotlight Card to avoid downward shift) */}
        <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-800">
              <FaSearchPlus className="text-amber-600" />
              <span>{t.quickPinsTitle}</span>
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              {visibleMapPoints.length} / {ANCIENT_MAP_POINTS.length}
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
                      ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${MAP_PIN_DOT[pt.kind]}`} />
                  <span className="truncate max-w-[230px]">
                    {pt.title[activeLocale].replace(/\*/g, '')}
                  </span>
                  <span
                    className={`text-[10px] font-semibold opacity-75 hidden sm:inline ${
                      isSelected ? 'text-amber-200' : 'text-slate-500'
                    }`}
                  >
                    · {pt.ticketBadge[activeLocale]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Ancient City Spotlight Card */}
        {focusedPoint && (
          <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-amber-400 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                  <span className={`w-2 h-2 rounded-full ${MAP_PIN_DOT[focusedPoint.kind]}`} />
                  {t.mapKindLabels[focusedPoint.kind]}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-extrabold">
                  {focusedPoint.ticketBadge[activeLocale]}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600">
                  <FaMapMarkerAlt className="text-amber-600" size={11} />
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
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <FaExternalLinkAlt size={10} />
                <span>{t.gmapsRouteBtn}</span>
              </a>
            </div>
          </div>
        )}
      </section>

      {/* 2. 8 Archaeological City Profiles with Category Filter */}
      <section id="ancient-profiles" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaLandmark /> {t.profilesEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.profilesTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.profilesSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs self-start lg:self-auto">
            {(['all', 'lycia-top', 'caria-ports', 'hidden-special'] as ProfileFilterId[]).map(
              (pf) => (
                <button
                  key={pf}
                  type="button"
                  onClick={() => setProfileFilter(pf)}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                    profileFilter === pf
                      ? 'bg-slate-900 text-amber-300'
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
          {visibleProfiles.map((city) => (
            <article
              key={city.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col lg:flex-row"
            >
              <div className="relative h-64 sm:h-72 lg:h-auto lg:w-[390px] flex-shrink-0 bg-slate-900">
                <Image
                  src={city.image}
                  alt={city.title[activeLocale].replace(/\*/g, '')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 390px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/35 lg:hidden" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-amber-300 border border-white/15 text-[10px] font-extrabold uppercase tracking-wider">
                  {city.code}
                </span>
              </div>

              <div className="p-6 md:p-7 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div>
                    <span className="hidden lg:inline-block text-[11px] font-extrabold uppercase tracking-widest text-amber-700 mb-1">
                      {city.code} · {city.bestTime[activeLocale]}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                      {renderFormattedText(city.title[activeLocale])}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-sky-800 mt-1">
                      {renderFormattedText(city.subtitle[activeLocale])}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.ticketTagLabel}
                      </span>
                      <strong className="text-amber-800 font-extrabold">
                        {city.ticketBadge[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.passTagLabel}
                      </span>
                      <strong className="text-slate-900 font-bold">
                        {city.passBadge[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.durationTagLabel}
                      </span>
                      <strong className="text-slate-900 font-bold">
                        {city.durationBadge[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.bestTimeTagLabel}
                      </span>
                      <strong className="text-emerald-800 font-bold">
                        {city.bestTime[activeLocale]}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {renderFormattedText(city.description[activeLocale])}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {t.highlightsLabel}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-700 font-medium">
                      {city.highlights[activeLocale].map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                          <span>{renderFormattedText(hl)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-950 font-medium">
                    {renderFormattedText(city.insiderNote[activeLocale])}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <Link
                    href={`/${activeLocale}/articles/${city.articleSlug}`}
                    className="text-xs font-extrabold text-sky-700 hover:text-sky-900 hover:underline"
                  >
                    {t.readArticleBtn}
                  </Link>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="#ancient-map"
                      onClick={() => {
                        setActiveKindFilter('all');
                        setActiveZoneId(city.zoneId);
                        setFocusedPointId(city.mapPointId);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <FaMapMarkedAlt size={11} className="text-amber-600" />
                      <span>{t.showOnMapBtn}</span>
                    </a>
                    <a
                      href={city.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
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

      {/* 3. Ticket Calculator 2026 + Anti-Heat Route Combos + 4 Historical Epochs */}
      <section id="pass-calculator" className="scroll-mt-28 space-y-12">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaCalculator /> {t.plannerEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.plannerTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.plannerSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 6 cols: Interactive Ticket & MuseumPass Calculator */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div>
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FaTicketAlt className="text-amber-600" />
                <span>{t.calcTitle}</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">{t.calcSubtitle}</p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setSelectedCalcIds(['calc-tlos', 'calc-letoon', 'calc-xanthos', 'calc-patara'])
                }
                className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-extrabold transition-colors"
              >
                {t.calcPresetLycia}
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedCalcIds([
                    'calc-patara',
                    'calc-xanthos',
                    'calc-simena',
                    'calc-myra',
                    'calc-stnicholas',
                  ])
                }
                className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-extrabold transition-colors"
              >
                {t.calcPresetDemre}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCalcIds(TICKET_CALC_SITES.map((s) => s.id))}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                {t.calcPresetAll}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCalcIds([])}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold transition-colors"
              >
                {t.calcClearBtn}
              </button>
            </div>

            {/* Province Checklists */}
            <div className="space-y-4">
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-sky-800 mb-2">
                  {t.calcEgeHeading}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TICKET_CALC_SITES.filter((s) => s.passRegion === 'ege').map((site) => {
                    const checked = selectedCalcIds.includes(site.id);
                    return (
                      <button
                        key={site.id}
                        type="button"
                        onClick={() => toggleCalcSite(site.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                          checked
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="block text-xs font-extrabold truncate">
                            {site.title[activeLocale]}
                          </span>
                          <span
                            className={`block text-[10px] truncate ${
                              checked ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {site.note[activeLocale]}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-lg text-xs font-extrabold flex-shrink-0 ${
                            checked ? 'bg-amber-500 text-slate-950' : 'bg-white text-slate-800 border border-slate-200'
                          }`}
                        >
                          {site.priceEur} €
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 mb-2">
                  {t.calcAkdenizHeading}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TICKET_CALC_SITES.filter((s) => s.passRegion === 'akdeniz').map((site) => {
                    const checked = selectedCalcIds.includes(site.id);
                    return (
                      <button
                        key={site.id}
                        type="button"
                        onClick={() => toggleCalcSite(site.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                          checked
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="block text-xs font-extrabold truncate">
                            {site.title[activeLocale]}
                          </span>
                          <span
                            className={`block text-[10px] truncate ${
                              checked ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {site.note[activeLocale]}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-lg text-xs font-extrabold flex-shrink-0 ${
                            checked ? 'bg-amber-500 text-slate-950' : 'bg-white text-slate-800 border border-slate-200'
                          }`}
                        >
                          {site.priceEur} €
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Calculation Summary */}
            <div className="rounded-2xl bg-slate-900 text-white p-4 md:p-5 space-y-3">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-slate-800/90 p-2.5">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">
                    Muğla (Ege)
                  </span>
                  <strong className="text-base md:text-lg font-extrabold text-sky-300">
                    {calcStats.egeSum} €
                  </strong>
                </div>
                <div className="rounded-xl bg-slate-800/90 p-2.5">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">
                    Antalya (Akdeniz)
                  </span>
                  <strong className="text-base md:text-lg font-extrabold text-amber-300">
                    {calcStats.akdenizSum} €
                  </strong>
                </div>
                <div className="rounded-xl bg-amber-500 text-slate-950 p-2.5">
                  <span className="block text-[10px] font-black uppercase">
                    {t.calcSingleTotalLabel}
                  </span>
                  <strong className="text-base md:text-lg font-black">
                    {calcStats.totalSum} €
                  </strong>
                </div>
              </div>

              <div className="text-xs text-slate-200 leading-relaxed pt-1 border-t border-slate-800">
                <span className="font-extrabold text-amber-300 block mb-1">
                  {t.calcComparePassLabel}:
                </span>
                {calcStats.pickedCount === 0 ? (
                  <span>
                    0 € — {t.calcSubtitle}
                  </span>
                ) : calcStats.hasMixedProvinces ? (
                  <div className="flex items-start gap-2 text-amber-200">
                    <FaExclamationTriangle className="flex-shrink-0 mt-0.5 text-amber-400" />
                    <span>
                      <strong>{t.calcBorderAlertTitle}</strong> {t.calcBorderAlertDesc} (
                      {calcStats.egeSum} € + {calcStats.akdenizSum} € ={' '}
                      <strong>{calcStats.totalSum} €</strong> vs Türkiye Pass {MUSEUMPASS_TURKIYE_EUR}{' '}
                      €).
                    </span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-emerald-300">
                    <FaCheckCircle className="flex-shrink-0 mt-0.5" />
                    <span>
                      {calcStats.totalSum} € &lt;{' '}
                      {calcStats.akdenizSum > 0
                        ? `MuseumPass Akdeniz (${MUSEUMPASS_AKDENIZ_EUR} €)`
                        : `MuseumPass Ege (${MUSEUMPASS_EGE_EUR} €)`}{' '}
                      —{' '}
                      {activeLocale === 'ru'
                        ? 'разовые билеты на кассе здесь заметно выгоднее абонемента!'
                        : activeLocale === 'de'
                        ? 'Einzeltickets an der Kasse sind hier klar günstiger als der Pass!'
                        : activeLocale === 'tr'
                        ? 'tekil gişe biletleri bölgesel pass fiyatından belirgin şekilde daha ekonomiktir!'
                        : 'paying per gate cleanly beats buying a regional pass for this cluster!'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right 6 cols: 3 Anti-Heat Route Combos */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div>
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FaClock className="text-amber-600" />
                <span>{t.routesTitle}</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {ANCIENT_ROUTE_COMBOS.map((combo, idx) => (
                <button
                  key={combo.id}
                  type="button"
                  onClick={() => setActiveComboId(combo.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    combo.id === activeCombo.id
                      ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <span className="block text-[10px] font-black uppercase opacity-75">
                    0{idx + 1}
                  </span>
                  <span className="block text-xs font-extrabold leading-snug line-clamp-2">
                    {combo.title[activeLocale]}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-4 md:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                  {activeCombo.badge[activeLocale]}
                </span>
                <h4 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">
                  {activeCombo.title[activeLocale]}
                </h4>
                <p className="text-xs text-sky-800 font-semibold mt-0.5">
                  {activeCombo.subtitle[activeLocale]}
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                {activeCombo.steps[activeLocale].map((st, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{renderFormattedText(st)}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-xs text-emerald-950">
                <span className="font-extrabold uppercase text-[10px] tracking-wider text-emerald-800 block mb-1">
                  {t.routesWhyLabel}
                </span>
                <p className="font-medium leading-relaxed">
                  {renderFormattedText(activeCombo.whyItWorks[activeLocale])}
                </p>
              </div>

              <div className="flex justify-end">
                <a
                  href="#ancient-map"
                  onClick={() => {
                    setActiveKindFilter('all');
                    setActiveZoneId(activeCombo.zoneId);
                    setFocusedPointId(activeCombo.focusPointId);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-extrabold transition-colors"
                >
                  {t.routesShowMapBtn}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Historical Epochs Timeline */}
        <div className="space-y-5">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaHistory /> {t.epochsEyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.epochsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ANCIENT_EPOCHS.map((ep, idx) => (
              <div
                key={ep.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                    {ep.periodBadge}
                  </span>
                  <span className="text-xs font-black text-slate-300">0{idx + 1}</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {ep.title[activeLocale]}
                </h4>
                <span className="block text-[11px] font-bold text-sky-800">
                  {ep.keyPlaces[activeLocale]}
                </span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {renderFormattedText(ep.summary[activeLocale])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 5 Free €0 Sites + Interlinking Banner + Practical Rules 2026 */}
      <section id="practical-rules" className="scroll-mt-28 space-y-12">
        {/* 5 Free Open-Air Cities */}
        <div className="space-y-5">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaMountain /> {t.freeEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.freeTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.freeSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeMountainSites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-2xl p-5 border border-emerald-200/90 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wider">
                    {t.freeEntryBadge}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {site.title[activeLocale]}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {renderFormattedText(site.note[activeLocale])}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-slate-600 hover:text-amber-700 inline-flex items-center gap-1"
                  >
                    {t.gmapsBtn} <FaExternalLinkAlt size={9} />
                  </a>
                  <a
                    href="#ancient-map"
                    onClick={() => {
                      setActiveKindFilter('all');
                      setActiveZoneId(site.zoneId);
                      setFocusedPointId(site.id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold transition-colors"
                  >
                    {t.showOnMapBtn}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Interlinking Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider border border-amber-500/30">
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
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold text-center transition-colors inline-flex items-center justify-center gap-1.5"
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
              <FaInfoCircle size={11} className="text-emerald-300" /> {t.btnThermal}
            </Link>
            <Link
              href={`/${activeLocale}/articles/history`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-amber-300" /> {t.btnHistory}
            </Link>
          </div>
        </div>

        {/* 4 Practical Rules 2026 */}
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
            {ANCIENT_VISIT_RULES_2026.map((card) => (
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
                        <span className="w-2 h-2 rounded-full bg-amber-600 flex-shrink-0 mt-1.5" />
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
                    className="font-bold text-amber-800 hover:underline inline-flex items-center gap-1"
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
