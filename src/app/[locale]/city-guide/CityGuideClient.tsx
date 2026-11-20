"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaPlaneArrival,
  FaCompass,
  FaUsers,
  FaAnchor,
  FaLeaf,
  FaHiking,
  FaLandmark,
  FaClock,
  FaUmbrellaBeach,
  FaCalendarAlt,
  FaChevronRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaRoute,
  FaMapMarkedAlt,
  FaBookOpen,
  FaUndo,
  FaCarSide,
  FaSortAmountDown,
} from 'react-icons/fa';
import {
  RESORTS_CATALOG,
  RESORT_COMBOS,
  FEATURED_SATELLITES,
  MORE_SATELLITES,
  type LocaleCode,
  type ResortItem,
  type ResortStyleId,
  type DistanceBucket,
  type SatelliteKind,
} from '@/lib/resorts-data';

export interface EnrichedResortItem extends ResortItem {
  beachCount: number;
  sightCount: number;
}

interface CityGuideClientProps {
  locale: string;
  resorts: EnrichedResortItem[];
}

type SortMode = 'geo' | 'nearest' | 'budget';

interface UiCopy {
  axisTitle: string;
  axisSubtitle: string;
  gatewayBadge: string;
  zoneWest: string;
  zoneEast: string;
  kmUnit: string;
  minUnit: string;
  pickerTitle: string;
  pickerSubtitle: string;
  styleLabel: string;
  distanceLabel: string;
  sortLabel: string;
  showingCount: (shown: number, total: number) => string;
  resetFilters: string;
  styles: Record<'all' | ResortStyleId, string>;
  distances: Record<'all' | DistanceBucket, string>;
  sorts: Record<SortMode, string>;
  metricDlm: string;
  metricBeaches: string;
  metricSeason: string;
  bestForTitle: string;
  tradeoffTitle: string;
  openGuide: string;
  subBeaches: string;
  subSights: string;
  subTransport: string;
  emptyTitle: string;
  emptyDesc: string;
  emptyBtn: string;
  tableTitle: string;
  tableSubtitle: string;
  colResort: string;
  colDlm: string;
  colBeaches: string;
  colBestFor: string;
  colBudget: string;
  colSeason: string;
  colAction: string;
  shortGuide: string;
  inflationNote: string;
  airportGuideLink: string;
  transferCalcLink: string;
  combosEyebrow: string;
  combosTitle: string;
  combosSubtitle: string;
  viewRouteBtn: string;
  nextTitle: string;
  nextSubtitle: string;
  nextCards: {
    articleTitle: string;
    articleDesc: string;
    smallTownsTitle: string;
    smallTownsDesc: string;
    beachesTitle: string;
    beachesDesc: string;
    mapTitle: string;
    mapDesc: string;
  };
  quickTagsLabel: string;
  tagAirport: string;
  tagTransfers: string;
  tagRoutes: string;
  tagClimate: string;
  satellites: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterBeach: string;
    filterVillage: string;
    badgeBeach: string;
    badgeVillage: string;
    morePlacesTitle: string;
    readArticle: string;
    overviewLink: string;
  };
}

const UI_COPY: Record<LocaleCode, UiCopy> = {
  ru: {
    axisTitle: 'Географическая ось побережья: Запад ← ✈️ Даламан (DLM) → Восток',
    axisSubtitle: 'Нажмите на курорт, чтобы перейти к его карточке и условиям отдыха',
    gatewayBadge: '✈️ Главные ворота (DLM)',
    zoneWest: 'Запад от DLM',
    zoneEast: 'Восток от DLM',
    kmUnit: 'км',
    minUnit: 'мин',
    pickerTitle: 'Подберите курорт под свой отдых',
    pickerSubtitle: 'Фильтруйте 8 главных узлов региона по формату отдыха и времени дороги из аэропорта Даламан',
    styleLabel: 'Формат отдыха',
    distanceLabel: 'Дорога от аэропорта DLM',
    sortLabel: 'Порядок:',
    showingCount: (shown, total) => `Показано ${shown} из ${total}`,
    resetFilters: 'Сбросить фильтры',
    styles: {
      all: 'Все форматы',
      family: 'Семья и песок',
      yachting: 'Яхты и бухты',
      nature: 'Тишина и природа',
      active: 'Актив и спорт',
      culture: 'Античность и колорит',
    },
    distances: {
      all: 'Любая дальность',
      near: 'До 35 мин (рядом с DLM)',
      mid: '45–90 мин (средняя)',
      far: 'От 2 часов (дальний край)',
    },
    sorts: {
      geo: 'С запада на восток',
      nearest: 'Ближе к аэропорту DLM',
      budget: 'Сначала бюджетнее',
    },
    metricDlm: 'От аэропорта DLM',
    metricBeaches: 'Характер пляжей',
    metricSeason: 'Лучший сезон',
    bestForTitle: 'Кому подойдёт',
    tradeoffTitle: 'На что обратить внимание',
    openGuide: 'Открыть гид',
    subBeaches: 'Пляжи',
    subSights: 'Места и история',
    subTransport: 'Транспорт',
    emptyTitle: 'По выбранным параметрам курортов не нашлось',
    emptyDesc: 'Попробуйте ослабить фильтр по удалённости от аэропорта или выбрать другой стиль отдыха.',
    emptyBtn: 'Показать все 8 курортов',
    tableTitle: 'Сравнение всех 8 курортов одним взглядом',
    tableSubtitle: 'Единая шпаргалка по расстояниям от DLM, пляжам, аудитории и бюджету',
    colResort: 'Курорт',
    colDlm: 'От DLM',
    colBeaches: 'Пляжи',
    colBestFor: 'Кому подойдёт',
    colBudget: 'Бюджет',
    colSeason: 'Сезон',
    colAction: 'Переход',
    shortGuide: 'Гид →',
    inflationNote: 'Защита от инфляции: уровни € / €€ / €€€ отражают относительный ценовой класс курорта по жилью и питанию без устаревающих цен в лирах.',
    airportGuideLink: 'Гид по аэропорту DLM',
    transferCalcLink: 'Тарифы на трансфер и такси',
    combosEyebrow: 'СОВЕТ ИНСАЙДЕРА НА 10–14 ДНЕЙ',
    combosTitle: 'Как скомбинировать 2 курорта за одну поездку',
    combosSubtitle: 'При наличии 10–14 дней выгоднее разделить отпуск на две базы, чтобы не тратить по 4–5 часов на серпантины D400.',
    viewRouteBtn: 'Смотреть маршруты',
    nextTitle: 'Куда перейти дальше',
    nextSubtitle: 'Полезные разделы путеводителя, чтобы перейти от выбора города к деталям поездки',
    nextCards: {
      articleTitle: 'Статья-лонгрид о курортах',
      articleDesc: 'Подробный разбор каждого направления от Датчи до Каша',
      smallTownsTitle: 'Атмосферные деревни побережья',
      smallTownsDesc: 'Обзор Акьяки, Старой Датчи, Селимие, Бозбуруна и Каякёя',
      beachesTitle: 'Каталог всех пляжей',
      beachesDesc: 'Фильтр по городам, фото и описания 40 бухт побережья',
      mapTitle: 'Интерактивная карта',
      mapDesc: 'Все курорты, пляжи, руины и точки интереса на карте',
    },
    quickTagsLabel: 'Быстрое планирование:',
    tagAirport: 'Аэропорт Даламан (DLM)',
    tagTransfers: 'Трансферы и такси',
    tagRoutes: 'Автомаршруты',
    tagClimate: 'Климат и сезоны',
    satellites: {
      eyebrow: 'СПУТНИКИ И КОЛОРИТНЫЕ ДЕРЕВНИ',
      title: 'Курорты-спутники и атмосферные деревни',
      subtitle: 'Популярные пляжные базы вроде Сарыгерме, Олюдениза и Ичмелера и колоритные деревни для выездов на полдня — всё в одном месте без дублей меню.',
      filterAll: 'Все 15 мест',
      filterBeach: 'Пляжные спутники (7)',
      filterVillage: 'Атмосферные деревни (8)',
      badgeBeach: 'Пляжный спутник',
      badgeVillage: 'Атмосферная деревня',
      morePlacesTitle: 'Ещё 6 ключевых спутников и деревень региона',
      readArticle: 'Читать гид',
      overviewLink: 'Подробный обзор всех деревень →',
    },
  },
  en: {
    axisTitle: 'Coastline Axis: West ← ✈️ Dalaman (DLM) → East',
    axisSubtitle: 'Click any resort to jump straight to its profile and trade-offs',
    gatewayBadge: '✈️ Main Gateway (DLM)',
    zoneWest: 'West of DLM',
    zoneEast: 'East of DLM',
    kmUnit: 'km',
    minUnit: 'min',
    pickerTitle: 'Find the Right Resort for Your Trip',
    pickerSubtitle: 'Filter the 8 main coastal hubs by travel style and transfer time from Dalaman Airport',
    styleLabel: 'Travel Style',
    distanceLabel: 'Transfer from DLM Airport',
    sortLabel: 'Sort:',
    showingCount: (shown, total) => `Showing ${shown} of ${total}`,
    resetFilters: 'Reset filters',
    styles: {
      all: 'All Styles',
      family: 'Family & Sand',
      yachting: 'Yachts & Coves',
      nature: 'Quiet & Nature',
      active: 'Active & Sports',
      culture: 'History & Charm',
    },
    distances: {
      all: 'Any Distance',
      near: 'Up to 35 min (Near DLM)',
      mid: '45–90 min (Mid-range)',
      far: '2+ hours (Peninsula edges)',
    },
    sorts: {
      geo: 'West to East',
      nearest: 'Closest to DLM Airport',
      budget: 'Most Budget-Friendly First',
    },
    metricDlm: 'From DLM Airport',
    metricBeaches: 'Beach Profile',
    metricSeason: 'Best Season',
    bestForTitle: 'Best For',
    tradeoffTitle: 'Good to Know (Trade-off)',
    openGuide: 'Explore Guide',
    subBeaches: 'Beaches',
    subSights: 'Sights',
    subTransport: 'Transport',
    emptyTitle: 'No resorts match this exact combination',
    emptyDesc: 'Try loosening the airport transfer time filter or switching to another travel style.',
    emptyBtn: 'Show All 8 Resorts',
    tableTitle: 'All 8 Resorts Compared at a Glance',
    tableSubtitle: 'Quick reference for transfer times from DLM, beach types, vibe, and relative budget',
    colResort: 'Resort',
    colDlm: 'From DLM',
    colBeaches: 'Beaches',
    colBestFor: 'Best For',
    colBudget: 'Budget',
    colSeason: 'Season',
    colAction: 'Link',
    shortGuide: 'Guide →',
    inflationNote: 'Inflation Shield: € / €€ / €€€ tiers show relative accommodation and dining costs without outdated Lira figures.',
    airportGuideLink: 'Dalaman Airport (DLM) Guide',
    transferCalcLink: 'Transfer & Taxi Rates',
    combosEyebrow: 'INSIDER 10–14 DAY STRATEGY',
    combosTitle: 'Smart Two-Base Resort Combinations',
    combosSubtitle: 'With 10–14 days, splitting your stay across two bases saves hours of repeat driving along the D400 switchbacks.',
    viewRouteBtn: 'Explore Routes',
    nextTitle: 'Where to Go Next',
    nextSubtitle: 'Jump directly from choosing your resort base to beaches, villages, and road logistics',
    nextCards: {
      articleTitle: 'In-Depth Resorts Article',
      articleDesc: 'Editorial deep dive comparing every coast hub from Datça to Kaş',
      smallTownsTitle: 'Authentic Coastal Villages',
      smallTownsDesc: 'Overview of Akyaka, Old Datça, Selimiye, Bozburun & Kayaköy',
      beachesTitle: 'Full Beach Directory',
      beachesDesc: 'Filter 40 coastal beaches and coves by city with real photos',
      mapTitle: 'Interactive Coast Map',
      mapDesc: 'See resorts, bays, ancient ruins, and routes on one map',
    },
    quickTagsLabel: 'Quick Planning:',
    tagAirport: 'Dalaman Airport (DLM)',
    tagTransfers: 'Transfers & Taxi',
    tagRoutes: 'Road Trips',
    tagClimate: 'Climate & Seasons',
    satellites: {
      eyebrow: 'SATELLITE BASES & AUTHENTIC VILLAGES',
      title: 'Satellite Resorts & Authentic Villages',
      subtitle: 'Major beach bases like Sarıgerme, Ölüdeniz, and İçmeler grouped cleanly alongside half-day atmospheric villages with zero duplicate menus.',
      filterAll: 'All 15 Places',
      filterBeach: 'Beach Satellites (7)',
      filterVillage: 'Authentic Villages (8)',
      badgeBeach: 'Beach Satellite',
      badgeVillage: 'Authentic Village',
      morePlacesTitle: '6 More Must-Know Satellites & Coastal Villages',
      readArticle: 'Read Guide',
      overviewLink: 'Full villages overview article →',
    },
  },
  de: {
    axisTitle: 'Küstenachse: Westen ← ✈️ Dalaman (DLM) → Osten',
    axisSubtitle: 'Klicken Sie auf einen Ort, um direkt zu seinem Profil zu springen',
    gatewayBadge: '✈️ Haupttor (DLM)',
    zoneWest: 'Westlich von DLM',
    zoneEast: 'Östlich von DLM',
    kmUnit: 'km',
    minUnit: 'Min.',
    pickerTitle: 'Den passenden Urlaubsort finden',
    pickerSubtitle: 'Filtern Sie die 8 wichtigsten Küstenorte nach Reisestil und Transferzeit ab Flughafen Dalaman',
    styleLabel: 'Reisestil',
    distanceLabel: 'Fahrzeit ab DLM',
    sortLabel: 'Sortierung:',
    showingCount: (shown, total) => `${shown} von ${total} angezeigt`,
    resetFilters: 'Filter zurücksetzen',
    styles: {
      all: 'Alle Stile',
      family: 'Familie & Sand',
      yachting: 'Yachten & Buchten',
      nature: 'Ruhe & Natur',
      active: 'Aktiv & Sport',
      culture: 'Antike & Flair',
    },
    distances: {
      all: 'Alle Entfernungen',
      near: 'Bis 35 Min. (DLM-nah)',
      mid: '45–90 Min. (Mittel)',
      far: 'Ab 2 Std. (Randlagen)',
    },
    sorts: {
      geo: 'Von West nach Ost',
      nearest: 'Am nächsten zum DLM',
      budget: 'Günstigste zuerst',
    },
    metricDlm: 'Ab Flughafen DLM',
    metricBeaches: 'Strandtyp',
    metricSeason: 'Beste Reisezeit',
    bestForTitle: 'Ideal für',
    tradeoffTitle: 'Worauf achten',
    openGuide: 'Ortsguide öffnen',
    subBeaches: 'Strände',
    subSights: 'Sehenswertes',
    subTransport: 'Transport',
    emptyTitle: 'Kein Ort passt exakt zu dieser Auswahl',
    emptyDesc: 'Lockern Sie den Entfernungsfilter oder wählen Sie einen anderen Reisestil.',
    emptyBtn: 'Alle 8 Orte anzeigen',
    tableTitle: 'Alle 8 Küstenorte im direkten Vergleich',
    tableSubtitle: 'Kompaktübersicht zu Transferzeiten ab DLM, Stränden, Zielgruppe und Budgetklasse',
    colResort: 'Urlaubsort',
    colDlm: 'Ab DLM',
    colBeaches: 'Strände',
    colBestFor: 'Ideal für',
    colBudget: 'Budget',
    colSeason: 'Saison',
    colAction: 'Guide',
    shortGuide: 'Guide →',
    inflationNote: 'Inflationsschutz: Die Klassen € / €€ / €€€ zeigen das relative Preisniveau ohne schnell veraltende Lira-Beträge.',
    airportGuideLink: 'Flughafen Dalaman (DLM)',
    transferCalcLink: 'Transfer- & Taxipreise',
    combosEyebrow: 'INSIDER-TIPP FÜR 10–14 TAGE',
    combosTitle: 'Zwei Standorte clever kombinieren',
    combosSubtitle: 'Bei 10–14 Tagen lohnt es sich, die Reise auf zwei Küstenbasen aufzuteilen, statt täglich auf der D400 zurückzufahren.',
    viewRouteBtn: 'Routen ansehen',
    nextTitle: 'Nächste Planungsschritte',
    nextSubtitle: 'Direkte Wege zu Stränden, authentischen Dörfern und konkreten Reiserouten',
    nextCards: {
      articleTitle: 'Ausführlicher Orts-Ratgeber',
      articleDesc: 'Detaillierter Vergleich von Datça bis Kaş als Lesestrecke',
      smallTownsTitle: 'Authentische Dörfer der Küste',
      smallTownsDesc: 'Überblick über Akyaka, Alt-Datça, Selimiye, Bozburun & Kayaköy',
      beachesTitle: 'Alle Strände im Überblick',
      beachesDesc: '40 Strände & Buchten nach Orten filtern mit echten Fotos',
      mapTitle: 'Interaktive Küstenkarte',
      mapDesc: 'Alle Orte, Buchten und antiken Stätten auf einer Karte',
    },
    quickTagsLabel: 'Schnellzugriff:',
    tagAirport: 'Flughafen DLM',
    tagTransfers: 'Transfers & Taxi',
    tagRoutes: 'Autotouren',
    tagClimate: 'Klima & Reisezeit',
    satellites: {
      eyebrow: 'BADEORTE & AUTHENTISCHE DÖRFER',
      title: 'Badeorte & authentische Dörfer rund um die Hauptzentren',
      subtitle: 'Beliebte Strandziele wie Sarıgerme, Ölüdeniz und İçmeler übersichtlich vereint mit historischen Dörfern für Halbtagesausflüge.',
      filterAll: 'Alle 15 Orte',
      filterBeach: 'Badeorte (7)',
      filterVillage: 'Authentische Dörfer (8)',
      badgeBeach: 'Badeort',
      badgeVillage: 'Authentisches Dorf',
      morePlacesTitle: '6 weitere Badeorte & Dörfer im Überblick',
      readArticle: 'Guide lesen',
      overviewLink: 'Zum kompletten Dörfer-Überblick →',
    },
  },
  tr: {
    axisTitle: 'Kıyı Hattı Ekseni: Batı ← ✈️ Dalaman (DLM) → Doğu',
    axisSubtitle: 'Kartına ve detaylarına atlamak için bir tatil beldesine tıklayın',
    gatewayBadge: '✈️ Ana Kapı (DLM)',
    zoneWest: 'DLM Batısı',
    zoneEast: 'DLM Doğusu',
    kmUnit: 'km',
    minUnit: 'dk',
    pickerTitle: 'Tarzınıza Uygun Tatil Beldesini Seçin',
    pickerSubtitle: 'Bölgenin 8 ana merkezini tatil tarzına ve Dalaman Havalimanı’ndan sürüş süresine göre filtreleyin',
    styleLabel: 'Tatil Tarzı',
    distanceLabel: 'DLM Havalimanına Uzaklık',
    sortLabel: 'Sırala:',
    showingCount: (shown, total) => `${total} beldeden ${shown} tanesi gösteriliyor`,
    resetFilters: 'Filtreleri sıfırla',
    styles: {
      all: 'Tüm Tarzlar',
      family: 'Aile ve Kum',
      yachting: 'Yat ve Koylar',
      nature: 'Doğa ve Sakinlik',
      active: 'Aktif ve Spor',
      culture: 'Tarih ve Doku',
    },
    distances: {
      all: 'Tüm Mesafeler',
      near: '35 dk’ya kadar (DLM yakını)',
      mid: '45–90 dk (Orta mesafe)',
      far: '2+ saat (Uç noktalar)',
    },
    sorts: {
      geo: 'Batıdan Doğuya',
      nearest: 'Havalimanına En Yakın',
      budget: 'Önce Bütçe Dostu',
    },
    metricDlm: 'DLM Havalimanı',
    metricBeaches: 'Plaj Yapısı',
    metricSeason: 'En İyi Sezon',
    bestForTitle: 'Kimler İçin Uygun',
    tradeoffTitle: 'Dikkat Edilmesi Gerekenler',
    openGuide: 'Rehberi Aç',
    subBeaches: 'Plajlar',
    subSights: 'Gezilecek Yerler',
    subTransport: 'Ulaşım',
    emptyTitle: 'Bu filtrelere uygun belde bulunamadı',
    emptyDesc: 'Mesafe filtresini genişletmeyi veya farklı bir tatil tarzı seçmeyi deneyin.',
    emptyBtn: '8 Beldenin Tümünü Göster',
    tableTitle: '8 Tatil Beldesinin Tek Bakışta Karşılaştırması',
    tableSubtitle: 'DLM’den süre, plaj yapısı, hedef kitle ve bütçe sınıfı için hızlı özet tablosu',
    colResort: 'Bölge',
    colDlm: 'DLM Mesafe',
    colBeaches: 'Plajlar',
    colBestFor: 'Kime Uygun',
    colBudget: 'Bütçe',
    colSeason: 'Sezon',
    colAction: 'Detay',
    shortGuide: 'Rehber →',
    inflationNote: 'Enflasyon Koruması: € / €€ / €€€ seviyeleri, güncelliğini hızla yitiren TL rakamları yerine göreceli maliyet sınıfını gösterir.',
    airportGuideLink: 'Dalaman Havalimanı (DLM) Rehberi',
    transferCalcLink: 'Transfer ve Taksi Tarifeleri',
    combosEyebrow: '10–14 GÜNLÜK ROTA STRATEJİSİ',
    combosTitle: 'Tek Tatilde 2 Belde Nasıl Birleştirilir?',
    combosSubtitle: '10–14 gününüz varsa konaklamayı iki merkeze bölmek, D400 virajlarında her gün saatlerce yol gitmenizi önler.',
    viewRouteBtn: 'Rotaları İncele',
    nextTitle: 'Sonraki Adımlar',
    nextSubtitle: 'Konaklayacağınız bölgeyi seçtikten sonra plajlar, köyler ve yol planına geçin',
    nextCards: {
      articleTitle: 'Detaylı Bölge Rehberi Yazısı',
      articleDesc: 'Datça’dan Kaş’a tüm beldelerin kapsamlı editör karşılaştırması',
      smallTownsTitle: 'Otantik Kıyı Köyleri',
      smallTownsDesc: 'Akyaka, Eski Datça, Selimiye, Bozburun ve Kayaköy genel bakışı',
      beachesTitle: 'Tüm Plajlar Kataloğu',
      beachesDesc: '40 koy ve plajı şehirlere göre gerçek fotoğraflarla filtreleyin',
      mapTitle: 'İnteraktif Kıyı Haritası',
      mapDesc: 'Tüm beldeleri, koyları ve antik kentleri tek haritada görün',
    },
    quickTagsLabel: 'Hızlı Planlama:',
    tagAirport: 'Dalaman Havalimanı (DLM)',
    tagTransfers: 'Transfer ve Taksi',
    tagRoutes: 'Araç Rotaları',
    tagClimate: 'İklim ve Sezonlar',
    satellites: {
      eyebrow: 'UYDU BELDELER VE OTANTİK KÖYLER',
      title: 'Uydu Tatil Beldeleri ve Otantik Kıyı Köyleri',
      subtitle: 'Sarıgerme, Ölüdeniz ve İçmeler gibi popüler sahil merkezleri ile yarım günlük geziler için özgün köyler aynı çatı altında.',
      filterAll: 'Tümü (15 Yer)',
      filterBeach: 'Sahil Beldeleri (7)',
      filterVillage: 'Otantik Köyler (8)',
      badgeBeach: 'Sahil Beldesi',
      badgeVillage: 'Otantik Köy',
      morePlacesTitle: 'Bölgedeki 6 Önemli Uydu Belde ve Köy Daha',
      readArticle: 'Rehberi Oku',
      overviewLink: 'Tüm köyler genel rehberine git →',
    },
  },
};

const STYLE_ICONS: Record<'all' | ResortStyleId, React.ReactNode> = {
  all: <FaCompass size={13} />,
  family: <FaUsers size={13} />,
  yachting: <FaAnchor size={13} />,
  nature: <FaLeaf size={13} />,
  active: <FaHiking size={13} />,
  culture: <FaLandmark size={13} />,
};

export default function CityGuideClient({ locale, resorts }: CityGuideClientProps) {
  const activeLocale: LocaleCode = (['ru', 'en', 'de', 'tr'].includes(locale) ? locale : 'en') as LocaleCode;
  const ui = UI_COPY[activeLocale];

  const [selectedStyle, setSelectedStyle] = useState<'all' | ResortStyleId>('all');
  const [selectedDistance, setSelectedDistance] = useState<'all' | DistanceBucket>('all');
  const [sortBy, setSortBy] = useState<SortMode>('geo');
  const [satelliteFilter, setSatelliteFilter] = useState<'all' | SatelliteKind>('all');

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${activeLocale}${cleanPath}`;
  };

  const sortResorts = (list: EnrichedResortItem[], mode: SortMode): EnrichedResortItem[] => {
    const copy = [...list];
    if (mode === 'nearest') {
      return copy.sort((a, b) => a.distanceKm - b.distanceKm || a.geoOrder - b.geoOrder);
    }
    if (mode === 'budget') {
      return copy.sort((a, b) => a.budgetTier - b.budgetTier || a.distanceKm - b.distanceKm);
    }
    return copy.sort((a, b) => a.geoOrder - b.geoOrder);
  };

  const filteredResorts = useMemo(() => {
    const matched = resorts.filter((item) => {
      const styleMatch = selectedStyle === 'all' || item.styles.includes(selectedStyle);
      const distanceMatch = selectedDistance === 'all' || item.distanceBucket === selectedDistance;
      return styleMatch && distanceMatch;
    });
    return sortResorts(matched, sortBy);
  }, [resorts, selectedStyle, selectedDistance, sortBy]);

  const sortedAllResorts = useMemo(() => sortResorts(resorts, sortBy), [resorts, sortBy]);

  const filteredFeaturedSatellites = useMemo(
    () =>
      satelliteFilter === 'all'
        ? FEATURED_SATELLITES
        : FEATURED_SATELLITES.filter((item) => item.kind === satelliteFilter),
    [satelliteFilter]
  );

  const filteredMoreSatellites = useMemo(
    () =>
      satelliteFilter === 'all'
        ? MORE_SATELLITES
        : MORE_SATELLITES.filter((item) => item.kind === satelliteFilter),
    [satelliteFilter]
  );

  const hasActiveFilters = selectedStyle !== 'all' || selectedDistance !== 'all';

  const handleResetFilters = () => {
    setSelectedStyle('all');
    setSelectedDistance('all');
  };

  const handleAxisClick = (slug: string) => {
    const isCurrentlyVisible = filteredResorts.some((r) => r.slug === slug);
    if (!isCurrentlyVisible) {
      setSelectedStyle('all');
      setSelectedDistance('all');
      setTimeout(() => {
        document.getElementById(`resort-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      return;
    }
    document.getElementById(`resort-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const resortBySlug = useMemo(() => {
    const map: Record<string, ResortItem> = {};
    for (const item of RESORTS_CATALOG) {
      map[item.slug] = item;
    }
    return map;
  }, []);

  return (
    <div className="portal-container pb-20">
      {/* 1. Floating Coastline Axis Bar */}
      <section className="bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-white/15 -mt-10 relative z-20 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-300">
            <FaPlaneArrival className="flex-shrink-0" />
            <span>{ui.axisTitle}</span>
          </div>
          <span className="text-[11px] sm:text-xs text-slate-300 font-medium">{ui.axisSubtitle}</span>
        </div>

        <div className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {resorts
            .slice()
            .sort((a, b) => a.geoOrder - b.geoOrder)
            .map((resort) => {
              const name = resort.name[activeLocale] || resort.name.en;
              return (
                <button
                  key={resort.slug}
                  type="button"
                  onClick={() => handleAxisClick(resort.slug)}
                  className={`flex-shrink-0 text-left px-3.5 py-2.5 rounded-xl border transition-all min-w-[132px] ${
                    resort.isGateway
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-md hover:bg-cyan-500'
                      : 'bg-white/10 border-white/10 text-white hover:bg-white/20 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-extrabold truncate">
                      {resort.isGateway ? '✈️ ' : ''}
                      {name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        resort.isGateway ? 'bg-white/20 text-white' : 'bg-slate-800 text-cyan-300'
                      }`}
                    >
                      {resort.budgetLabel}
                    </span>
                  </div>
                  <div className={`text-[11px] font-medium ${resort.isGateway ? 'text-cyan-100' : 'text-slate-300'}`}>
                    {resort.distanceKm} {ui.kmUnit} • ~{resort.durationMin} {ui.minUnit}
                  </div>
                </button>
              );
            })}
        </div>
      </section>

      {/* 2. Interactive Filter & Picker Bar */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/70 mb-8 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{ui.pickerTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{ui.pickerSubtitle}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              {ui.showingCount(filteredResorts.length, resorts.length)}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-full transition-colors"
              >
                <FaUndo size={10} />
                <span>{ui.resetFilters}</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 1: Style Filter */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">{ui.styleLabel}</span>
          <div className="flex flex-wrap gap-2">
            {(['all', 'family', 'yachting', 'nature', 'active', 'culture'] as const).map((styleKey) => {
              const active = selectedStyle === styleKey;
              return (
                <button
                  key={styleKey}
                  type="button"
                  onClick={() => setSelectedStyle(styleKey)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    active
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {STYLE_ICONS[styleKey]}
                  <span>{ui.styles[styleKey]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Distance Filter & Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {ui.distanceLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {(['all', 'near', 'mid', 'far'] as const).map((distKey) => {
                const active = selectedDistance === distKey;
                return (
                  <button
                    key={distKey}
                    type="button"
                    onClick={() => setSelectedDistance(distKey)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      active
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <FaClock size={11} className={active ? 'text-cyan-400' : 'text-slate-400'} />
                    <span>{ui.distances[distKey]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-end">
            <label htmlFor="resort-sort" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <FaSortAmountDown size={12} className="text-cyan-600" />
              <span>{ui.sortLabel}</span>
            </label>
            <select
              id="resort-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortMode)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            >
              <option value="geo">{ui.sorts.geo}</option>
              <option value="nearest">{ui.sorts.nearest}</option>
              <option value="budget">{ui.sorts.budget}</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Resorts Grid */}
      {filteredResorts.length > 0 ? (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {filteredResorts.map((resort) => {
            const name = resort.name[activeLocale] || resort.name.en;
            const tagline = resort.tagline[activeLocale] || resort.tagline.en;
            const beachType = resort.beachType[activeLocale] || resort.beachType.en;
            const season = resort.season[activeLocale] || resort.season.en;
            const bestFor = resort.bestFor[activeLocale] || resort.bestFor.en;
            const tradeoff = resort.tradeoff[activeLocale] || resort.tradeoff.en;
            const highlights = resort.highlights[activeLocale] || resort.highlights.en;

            const topBadge = resort.isGateway
              ? ui.gatewayBadge
              : `${resort.zone === 'west' ? ui.zoneWest : ui.zoneEast} • ${resort.distanceKm} ${ui.kmUnit}`;

            return (
              <article
                key={resort.slug}
                id={`resort-${resort.slug}`}
                className={`group scroll-mt-28 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border ${
                  resort.isGateway ? 'border-cyan-500/70 ring-2 ring-cyan-500/15' : 'border-slate-200/70'
                }`}
              >
                {/* Card Media Header */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <Image
                    src={resort.image}
                    alt={name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-slate-900/15" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-md ${
                        resort.isGateway
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-900/70 text-white border border-white/20'
                      }`}
                    >
                      {topBadge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/95 text-slate-900 shadow-sm">
                      {resort.budgetLabel}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="text-2xl font-extrabold tracking-tight leading-tight mb-1">{name}</h3>
                    <p className="text-xs sm:text-sm text-white/90 font-medium leading-snug">{tagline}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-4">
                  {/* 3-Column Metrics Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-200/60">
                    <div>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        <FaClock size={10} className="text-cyan-600" /> {ui.metricDlm}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {resort.distanceKm} {ui.kmUnit} • ~{resort.durationMin} {ui.minUnit}
                      </span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        <FaUmbrellaBeach size={10} className="text-cyan-600" /> {ui.metricBeaches}
                      </span>
                      <span className="text-xs font-bold text-slate-900 leading-snug block">{beachType}</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        <FaCalendarAlt size={10} className="text-cyan-600" /> {ui.metricSeason}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{season}</span>
                    </div>
                  </div>

                  {/* Highlight Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {highlights.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Best For & Trade-off */}
                  <div className="space-y-2.5 flex-grow">
                    <div className="p-3.5 rounded-xl bg-cyan-50/60 border border-cyan-100 flex items-start gap-2.5">
                      <FaCheckCircle className="text-cyan-600 flex-shrink-0 mt-0.5" size={14} />
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 block mb-0.5">
                          {ui.bestForTitle}
                        </span>
                        <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">{bestFor}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5">
                      <FaExclamationTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={13} />
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block mb-0.5">
                          {ui.tradeoffTitle}
                        </span>
                        <p className="text-xs sm:text-[13px] text-amber-950/90 font-medium leading-relaxed">{tradeoff}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Interlinking Bar */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Link
                        href={localize(`/${resort.slug}/beaches`)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 text-xs font-semibold border border-slate-200/70 transition-colors"
                      >
                        {ui.subBeaches}
                        {resort.beachCount > 0 ? ` (${resort.beachCount})` : ''}
                      </Link>
                      <Link
                        href={localize(`/${resort.slug}/sights`)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 text-xs font-semibold border border-slate-200/70 transition-colors"
                      >
                        {ui.subSights}
                        {resort.sightCount > 0 ? ` (${resort.sightCount})` : ''}
                      </Link>
                      <Link
                        href={localize(`/${resort.slug}/transport`)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 text-xs font-semibold border border-slate-200/70 transition-colors"
                      >
                        {ui.subTransport}
                      </Link>
                    </div>

                    <Link
                      href={localize(`/${resort.slug}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      <span>{ui.openGuide}</span>
                      <FaChevronRight size={10} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="bg-white rounded-2xl p-10 sm:p-14 text-center shadow-sm border border-slate-200/70 mb-14">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">{ui.emptyTitle}</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">{ui.emptyDesc}</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-colors"
          >
            <FaUndo size={11} />
            <span>{ui.emptyBtn}</span>
          </button>
        </section>
      )}

      {/* Satellites & Authentic Villages Hub */}
      <section id="satellites" className="scroll-mt-28 mb-14 bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-200/70">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
          <div>
            <span className="eyebrow-badge mb-1.5">{ui.satellites.eyebrow}</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{ui.satellites.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-3xl">{ui.satellites.subtitle}</p>
          </div>
          <Link
            href={localize('/articles/small-towns-and-villages-overview')}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 whitespace-nowrap flex-shrink-0"
          >
            {ui.satellites.overviewLink}
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              { key: 'all', label: ui.satellites.filterAll },
              { key: 'beach_hub', label: ui.satellites.filterBeach },
              { key: 'village', label: ui.satellites.filterVillage },
            ] as const
          ).map((tab) => {
            const active = satelliteFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSatelliteFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  active
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Featured Photo Cards (Verified 100% Authentic Local Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filteredFeaturedSatellites.map((item) => {
            const itemName = item.name[activeLocale] || item.name.en;
            const itemMeta = item.meta[activeLocale] || item.meta.en;
            const itemSummary = item.summary[activeLocale] || item.summary.en;
            const parentName = resortBySlug[item.parentSlug]?.name[activeLocale] || item.parentSlug;
            const isBeach = item.kind === 'beach_hub';

            return (
              <article
                key={item.id}
                className="group bg-slate-50/70 rounded-2xl overflow-hidden border border-slate-200/70 hover:border-cyan-300 hover:shadow-sm transition-all flex flex-col"
              >
                {item.image && (
                  <Link href={localize(item.href)} className="relative h-48 w-full overflow-hidden block">
                    <Image
                      src={item.image}
                      alt={itemName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/15 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs ${
                        isBeach ? 'bg-cyan-600/95 text-white' : 'bg-emerald-600/95 text-white'
                      }`}
                    >
                      {isBeach ? ui.satellites.badgeBeach : ui.satellites.badgeVillage}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <h3 className="text-base sm:text-lg font-extrabold leading-tight">{itemName}</h3>
                      <p className="text-[11px] text-white/85 font-medium mt-0.5">{itemMeta}</p>
                    </div>
                  </Link>
                )}

                <div className="p-4 flex flex-col justify-between flex-grow space-y-3 bg-white">
                  <p className="text-xs text-slate-600 leading-relaxed">{itemSummary}</p>
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={localize(`/${item.parentSlug}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors"
                    >
                      {parentName}
                    </Link>
                    <Link
                      href={localize(item.href)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-800"
                    >
                      <span>{ui.satellites.readArticle}</span>
                      <FaChevronRight size={9} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Additional Satellites & Villages (Clean Typography Cards — Zero Fake Photos) */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-4">{ui.satellites.morePlacesTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMoreSatellites.map((item) => {
              const itemName = item.name[activeLocale] || item.name.en;
              const itemMeta = item.meta[activeLocale] || item.meta.en;
              const itemSummary = item.summary[activeLocale] || item.summary.en;
              const parentName = resortBySlug[item.parentSlug]?.name[activeLocale] || item.parentSlug;
              const isBeach = item.kind === 'beach_hub';

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-cyan-50/40 border border-slate-200/70 hover:border-cyan-200 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isBeach ? 'bg-cyan-100 text-cyan-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isBeach ? ui.satellites.badgeBeach : ui.satellites.badgeVillage}
                      </span>
                      <Link
                        href={localize(`/${item.parentSlug}`)}
                        className="text-[11px] font-bold text-slate-500 hover:text-cyan-700 transition-colors"
                      >
                        {parentName}
                      </Link>
                    </div>
                    <div>
                      <Link href={localize(item.href)} className="hover:text-cyan-700 transition-colors">
                        <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{itemName}</h4>
                      </Link>
                      <span className="text-[11px] text-slate-500 font-medium block mt-0.5">{itemMeta}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{itemSummary}</p>
                  </div>

                  <Link
                    href={localize(item.href)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-800 pt-1"
                  >
                    <span>{ui.satellites.readArticle}</span>
                    <FaChevronRight size={9} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Full 8-Resort Comparison Table */}
      <section className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-200/70 mb-14">
        <div className="mb-5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{ui.tableTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{ui.tableSubtitle}</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">{ui.colResort}</th>
                <th className="py-3.5 px-4">{ui.colDlm}</th>
                <th className="py-3.5 px-4">{ui.colBeaches}</th>
                <th className="py-3.5 px-4">{ui.colBestFor}</th>
                <th className="py-3.5 px-4">{ui.colBudget}</th>
                <th className="py-3.5 px-4">{ui.colSeason}</th>
                <th className="py-3.5 px-4 text-right">{ui.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
              {sortedAllResorts.map((resort) => {
                const name = resort.name[activeLocale] || resort.name.en;
                const beachType = resort.beachType[activeLocale] || resort.beachType.en;
                const bestFor = resort.bestFor[activeLocale] || resort.bestFor.en;
                const season = resort.season[activeLocale] || resort.season.en;
                return (
                  <tr
                    key={resort.slug}
                    className={resort.isGateway ? 'bg-cyan-50/40 hover:bg-cyan-50/70' : 'hover:bg-slate-50/80'}
                  >
                    <td className="py-3.5 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                      <Link href={localize(`/${resort.slug}`)} className="hover:text-cyan-700 transition-colors">
                        {resort.isGateway ? '✈️ ' : ''}
                        {name}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold whitespace-nowrap">
                      {resort.distanceKm} {ui.kmUnit} (~{resort.durationMin} {ui.minUnit})
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-[200px]">{beachType}</td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-[260px]">{bestFor}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{resort.budgetLabel}</td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{season}</td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={localize(`/${resort.slug}`)}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-600 text-cyan-700 hover:text-white font-bold text-xs transition-colors"
                      >
                        {ui.shortGuide}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Inflation Shield Footnote & Airport/Transfer Links */}
        <div className="mt-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <FaShieldAlt className="text-amber-600 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-amber-950 font-medium leading-relaxed">{ui.inflationNote}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <Link
              href={localize('/articles/airport-dalaman')}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-cyan-50 text-slate-800 hover:text-cyan-700 text-xs font-bold border border-amber-200 transition-colors"
            >
              {ui.airportGuideLink}
            </Link>
            <Link
              href={localize('/services/transfers')}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-cyan-50 text-slate-800 hover:text-cyan-700 text-xs font-bold border border-amber-200 transition-colors"
            >
              {ui.transferCalcLink}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 10–14 Day Two-Base Combos */}
      <section className="mb-14">
        <div className="mb-6">
          <span className="eyebrow-badge mb-1.5">{ui.combosEyebrow}</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{ui.combosTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{ui.combosSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RESORT_COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold">
                  {combo.durationLabel[activeLocale] || combo.durationLabel.en}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                  {combo.title[activeLocale] || combo.title.en}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {combo.description[activeLocale] || combo.description.en}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {combo.resortSlugs.map((slug) => {
                    const r = resortBySlug[slug];
                    if (!r) return null;
                    return (
                      <Link
                        key={slug}
                        href={localize(`/${slug}`)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-cyan-600 text-slate-700 hover:text-white text-xs font-bold transition-colors"
                      >
                        {r.name[activeLocale] || r.name.en}
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href={localize(combo.routeHref)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800"
                >
                  <span>{ui.viewRouteBtn}</span>
                  <FaChevronRight size={10} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Next Steps Interlinking */}
      <section className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-200/70">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{ui.nextTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{ui.nextSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link
            href={localize('/articles/main-resorts')}
            className="group p-5 rounded-2xl bg-slate-50 hover:bg-cyan-50/70 border border-slate-200/70 hover:border-cyan-300 transition-all flex flex-col justify-between gap-3"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center mb-3">
                <FaBookOpen size={17} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors mb-1">
                {ui.nextCards.articleTitle}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ui.nextCards.articleDesc}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700">
              {ui.openGuide} <FaChevronRight size={9} />
            </span>
          </Link>

          <Link
            href={localize('/articles/small-towns-and-villages-overview')}
            className="group p-5 rounded-2xl bg-slate-50 hover:bg-cyan-50/70 border border-slate-200/70 hover:border-cyan-300 transition-all flex flex-col justify-between gap-3"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
                <FaCompass size={17} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors mb-1">
                {ui.nextCards.smallTownsTitle}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ui.nextCards.smallTownsDesc}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700">
              {ui.openGuide} <FaChevronRight size={9} />
            </span>
          </Link>

          <Link
            href={localize('/beaches')}
            className="group p-5 rounded-2xl bg-slate-50 hover:bg-cyan-50/70 border border-slate-200/70 hover:border-cyan-300 transition-all flex flex-col justify-between gap-3"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-3">
                <FaUmbrellaBeach size={17} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors mb-1">
                {ui.nextCards.beachesTitle}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ui.nextCards.beachesDesc}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700">
              {ui.openGuide} <FaChevronRight size={9} />
            </span>
          </Link>

          <Link
            href={localize('/map')}
            className="group p-5 rounded-2xl bg-slate-50 hover:bg-cyan-50/70 border border-slate-200/70 hover:border-cyan-300 transition-all flex flex-col justify-between gap-3"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center mb-3">
                <FaMapMarkedAlt size={17} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors mb-1">
                {ui.nextCards.mapTitle}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ui.nextCards.mapDesc}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700">
              {ui.openGuide} <FaChevronRight size={9} />
            </span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1">{ui.quickTagsLabel}</span>
          <Link
            href={localize('/articles/airport-dalaman')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 text-xs font-semibold transition-colors"
          >
            <FaPlaneArrival size={11} />
            <span>{ui.tagAirport}</span>
          </Link>
          <Link
            href={localize('/services/transfers')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 text-xs font-semibold transition-colors"
          >
            <FaCarSide size={11} />
            <span>{ui.tagTransfers}</span>
          </Link>
          <Link
            href={localize('/routes')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 text-xs font-semibold transition-colors"
          >
            <FaRoute size={11} />
            <span>{ui.tagRoutes}</span>
          </Link>
          <Link
            href={localize('/articles/climate-and-seasons')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 text-xs font-semibold transition-colors"
          >
            <FaCalendarAlt size={11} />
            <span>{ui.tagClimate}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
