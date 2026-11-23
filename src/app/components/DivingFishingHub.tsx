"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  FaAnchor,
  FaBan,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaCompass,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaFilter,
  FaFish,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaShoppingBag,
  FaSkullCrossbones,
  FaStar,
  FaTimes,
  FaWater,
} from 'react-icons/fa';
import DivingFishingMap from './DivingFishingMap';
import {
  COASTAL_SPOTS,
  COAST_ZONES,
  GEAR_SHOP_HUBS,
  MARINE_SPECIES,
  REGULATIONS_2026,
  RENTAL_OPTIONS,
  SEASON_CALENDAR,
  TURKISH_BAIT_GLOSSARY,
  type ActivityFormat,
  type CoastZoneId,
  type FishingLegalityStatus,
  type LocaleCode,
  type MarineSpecies,
  type SpotCategory,
} from '@/lib/diving-fishing';

interface HubUiCopy {
  inflationTitle: string;
  inflationDesc: string;
  mapEyebrow: string;
  mapTitle: string;
  mapSubtitle: string;
  showAllZones: (n: number) => string;
  spotsCount: (n: number) => string;
  mapCatAll: string;
  mapCatDiving: string;
  mapCatFishing: string;
  mapCatBoth: string;
  mapCatRestricted: string;
  encyEyebrow: string;
  encyTitle: string;
  encySubtitle: string;
  searchPlaceholder: string;
  statusAll: string;
  statusAllowed: string;
  statusSeasonal: string;
  statusProhibited: string;
  statusToxic: string;
  actAll: string;
  actShore: string;
  actBoat: string;
  actDiving: string;
  metricMinSize: string;
  metricLimit: string;
  metricDepth: string;
  noMinLabel: string;
  cmUnit: string;
  openCardBtn: string;
  resetSpeciesFilters: string;
  noSpeciesFound: string;
  calEyebrow: string;
  calTitle: string;
  calSubtitle: string;
  calWaterTemp: string;
  calVisibility: string;
  calDivingScore: string;
  calTunaOpen: string;
  calTunaClosed: string;
  calActiveSpecies: string;
  monthNames: string[];
  monthShortNames: string[];
  rentalsEyebrow: string;
  rentalsTitle: string;
  rentalsSubtitle: string;
  tabDiving: string;
  tabFishing: string;
  includedLabel: string;
  insiderTipLabel: string;
  baitTitle: string;
  baitSubtitle: string;
  shopsTitle: string;
  shopsSubtitle: string;
  shopKindLabels: Record<'shop' | 'dive' | 'marina', string>;
  openAllOnMap: string;
  servicesBannerEyebrow: string;
  servicesBannerTitle: string;
  servicesBannerDesc: string;
  btnServiceDiving: string;
  btnServiceFishing: string;
  btnArticleDiving: string;
  btnArticleLaws: string;
  spotsEyebrow: string;
  spotsTitle: string;
  spotsSubtitle: string;
  spotMetricMethod: string;
  spotMetricLevel: string;
  spotMetricSeason: string;
  spotHighlightsLabel: string;
  spotLawLabel: string;
  spotSpeciesLabel: string;
  spotShowOnMap: string;
  spotOpenGmaps: string;
  spotsEmpty: string;
  spotsResetBtn: string;
  lawsEyebrow: string;
  lawsTitle: string;
  lawsSubtitle: string;
  officialSourceLabel: string;
  modalHabitat: string;
  modalTip: string;
  modalSafetyOrFood: string;
  modalSeasonActivity: string;
  modalPhotoCredit: string;
  modalClose: string;
  zonePrefix: string;
}

const HUB_UI: Record<LocaleCode, HubUiCopy> = {
  ru: {
    inflationTitle: 'Щит от инфляции и статус правил 2026 (Tebliğ № 6/2)',
    inflationDesc:
      'Цены на дайвинг и рыболовные катера в Каше, Гёджеке и Фетхие привязаны к евро (€), тогда как в локальных рыболовных магазинах (Av & Balık) и прибрежных городах расчёты идут в турецких лирах. Все нормы вылова, минимальные размеры и запретные сроки сверены с действующим циркуляром Минсельхоза Турции Tebliğ № 6/2 на 2024–2028 гг.',
    mapEyebrow: 'ИНТЕРАКТИВНАЯ КАРТА ПОБЕРЕЖЬЯ · 4 ЗОНЫ',
    mapTitle: 'Выберите участок побережья Датча — Каш или фильтр активности',
    mapSubtitle:
      'Нажмите на зону справа или на маркер на спутниковой карте, чтобы изучить глубины, точки берегового спиннинга, дайв-сайты и закрытые заповедники (Кекова, Изтузу, Олюдениз).',
    showAllZones: (n) => `Показать все ${n} спотов побережья`,
    spotsCount: (n) => (n === 1 ? '1 спот' : n >= 2 && n <= 4 ? `${n} спота` : `${n} спотов`),
    mapCatAll: '🗺️ Все точки (16)',
    mapCatDiving: '🤿 Дайвинг и снорклинг',
    mapCatFishing: '🎣 Рыбалка',
    mapCatBoth: '⚖️ Обе активности',
    mapCatRestricted: '⛔ Запретные зоны',
    encyEyebrow: 'ЖИВОЙ СПРАВОЧНИК · 23 МОРСКИХ ВИДА',
    encyTitle: 'Энциклопедия рыб и обитателей региона: что можно ловить, а что под запретом',
    encySubtitle:
      'Реальные фотографии видов, турецкие названия для рынков и капитанов, минимальный размер (см), дневные лимиты, сезонные окна и критические предупреждения о ядовитой рыбе.',
    searchPlaceholder: 'Поиск по названию (напр. Дорада, Çipura, Orfoz, Balon, Тунец)...',
    statusAll: 'Все виды',
    statusAllowed: '🟢 Разрешено',
    statusSeasonal: '🟡 Сезон / квота',
    statusProhibited: '🔴 Запрещено',
    statusToxic: '☠️ Ядовитые / опасные',
    actAll: 'Все форматы',
    actShore: '🎣 С берега',
    actBoat: '🚤 С лодки / троллинг',
    actDiving: '🤿 Видно на дайвинге',
    metricMinSize: 'Мин. размер',
    metricLimit: 'Дневной лимит',
    metricDepth: 'Глубина',
    noMinLabel: 'Не задан',
    cmUnit: 'см',
    openCardBtn: 'Подробная карточка',
    resetSpeciesFilters: 'Сбросить фильтры видов',
    noSpeciesFound: 'По вашему запросу морских видов не найдено.',
    calEyebrow: 'СЕЗОННОСТЬ НА 12 МЕСЯЦЕВ',
    calTitle: 'Календарь прозрачности воды, температуры и окна вылова',
    calSubtitle:
      'Нажмите на любой месяц, чтобы увидеть оптимальные виды рыб, комфорт погружений и статус легального окна синепёрого тунца (15 июня — 15 октября).',
    calWaterTemp: 'Вода',
    calVisibility: 'Видимость',
    calDivingScore: 'Дайвинг',
    calTunaOpen: 'Тунец: ОКНО ОТКРЫТО (с 15.06 по 15.10 с e-BCD)',
    calTunaClosed: 'Тунец: ЗАПРЕТ (окно только 15.06–15.10)',
    calActiveSpecies: 'Ключевые виды месяца (нажмите для карточки):',
    monthNames: [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ],
    monthShortNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    rentalsEyebrow: 'СНАРЯЖЕНИЕ, КАТЕРА И МАГАЗИНЫ ПОБЕРЕЖЬЯ',
    rentalsTitle: 'Аренда дайв-оборудования, рыболовных катеров и локальные магазинчики',
    rentalsSubtitle:
      'Как реально устроен прокат в Турции: почему дайв-снаряжение почти всегда включено в цену выхода с ботом, когда выгоднее купить недорогой спиннинг, где искать живую наживку и проверенные магазины по городам.',
    tabDiving: '🤿 Дайвинг и снорклинг (цены и прокат)',
    tabFishing: '🎣 Рыбалка: снасти, катера и магазины',
    includedLabel: 'Что входит и как устроено:',
    insiderTipLabel: 'Совет инсайдера:',
    baitTitle: 'Мини-разговорник наживки на турецком для местных лавок (Av & Balık)',
    baitSubtitle: 'Покажите или назовите эти слова продавцу, чтобы быстро подобрать свежую наживку под целевую рыбу:',
    shopsTitle: 'Проверенные магазины снастей, марины и дайв-центры по городам (6 хабов)',
    shopsSubtitle: 'Реальные ориентиры на побережье от Даламана и Фетхие до Каша, Мармариса и Датчи со ссылками на Google Maps:',
    shopKindLabels: {
      shop: 'Магазин снастей',
      dive: 'Дайв-центр (TSSF)',
      marina: 'Марина / чартеры',
    },
    openAllOnMap: 'Искать на карте города',
    servicesBannerEyebrow: 'ГОТОВЫЕ СЕРВИСЫ И СТАТЬИ ПОРТАЛА',
    servicesBannerTitle: 'Нужен подбор дайв-центра или лицензированного катера на рыбалку?',
    servicesBannerDesc:
      'Переходите на сервисные страницы портала или изучите наши подробные текстовые обзоры про самолёт C-47 Dakota и правила подводной охоты.',
    btnServiceDiving: 'Сервис-хаб: Дайвинг →',
    btnServiceFishing: 'Сервис-хаб: Морская рыбалка →',
    btnArticleDiving: 'Статья: Подводный мир Каша и Фетхие',
    btnArticleLaws: 'Статья: Дайвинг, тунец и охота 2026',
    spotsEyebrow: 'КАТАЛОГ ПОБЕРЕЖЬЯ · 16 СПОТОВ',
    spotsTitle: 'Лучшие дайв-сайты, точки для рыбалки и охраняемые зоны',
    spotsSubtitle:
      'Список синхронизирован с картой выше. Нажмите на любую рыбу в карточке спота, чтобы открыть её энциклопедическую карточку.',
    spotMetricMethod: 'Глубина / Метод',
    spotMetricLevel: 'Уровень / Статус',
    spotMetricSeason: 'Видимость / Сезон',
    spotHighlightsLabel: 'Особенности точки:',
    spotLawLabel: 'Закон и безопасность:',
    spotSpeciesLabel: 'Кого здесь видят или ловят:',
    spotShowOnMap: 'Показать на карте ↑',
    spotOpenGmaps: 'Google Maps',
    spotsEmpty: 'По выбранной зоне и типу активности точек не найдено.',
    spotsResetBtn: 'Сбросить фильтр карты и спотов',
    lawsEyebrow: 'ЗАКОНЫ ТУРЦИИ 2026 · TEBLİĞ № 6/2 И TSSF',
    lawsTitle: 'Памятка по лицензиям, квотам, подводной охоте и безопасности у DLM',
    lawsSubtitle:
      'Официальные правила любительского лова, подводной охоты и медицинская памятка на случай укола ядовитой рыбы — кратко и без мифов уличных зазывал.',
    officialSourceLabel: 'Первоисточник:',
    modalHabitat: 'Где обитает и держится',
    modalTip: 'Как поймать или увидеть под водой',
    modalSafetyOrFood: 'Вкус, безопасность и первая помощь',
    modalSeasonActivity: 'Активность по месяцам года',
    modalPhotoCredit: 'Фотография (Wikimedia Commons):',
    modalClose: 'Закрыть',
    zonePrefix: 'Зона',
  },
  en: {
    inflationTitle: '2026 Inflation Shield & Active Fishing Laws (Tebliğ № 6/2)',
    inflationDesc:
      'Diving packages and sportfishing charters in Kaş, Göcek, and Fethiye are benchmarked in Euros (€), whereas coastal tackle shops (Av & Balık) operate in Turkish Lira. Every minimum size, bag limit, and seasonal closure follows Ministry Circular Tebliğ № 6/2 (2024–2028).',
    mapEyebrow: 'INTERACTIVE COASTAL MAP · 4 ZONES',
    mapTitle: 'Select a Coastal Zone from Datça to Kaş or Filter by Activity',
    mapSubtitle:
      'Click any numbered zone on the right or tap satellite pins to explore dive depths, shore-spinning estuaries, offshore fishing drop-offs, and strictly protected zones.',
    showAllZones: (n) => `Show all ${n} coastal spots`,
    spotsCount: (n) => (n === 1 ? '1 spot' : `${n} spots`),
    mapCatAll: '🗺️ All Spots (16)',
    mapCatDiving: '🤿 Diving & Snorkel',
    mapCatFishing: '🎣 Fishing',
    mapCatBoth: '⚖️ Both Activities',
    mapCatRestricted: '⛔ Protected / Banned',
    encyEyebrow: 'FIELD ENCYCLOPEDIA · 23 MARINE SPECIES',
    encyTitle: 'Mediterranean Fish & Wildlife Guide: Legal Catch, Quotas & Hazards',
    encySubtitle:
      'Verified species photography, local Turkish names for menus and skippers, legal minimum sizes (cm), daily caps, seasonal bans, and venomous fish alerts.',
    searchPlaceholder: 'Search by name (e.g., Bream, Çipura, Orfoz, Tuna, Lionfish)...',
    statusAll: 'All Species',
    statusAllowed: '🟢 Legal Year-Round',
    statusSeasonal: '🟡 Seasonal / Quota',
    statusProhibited: '🔴 Strictly Banned',
    statusToxic: '☠️ Toxic / Hazardous',
    actAll: 'All Formats',
    actShore: '🎣 Shore Angling',
    actBoat: '🚤 Boat / Trolling',
    actDiving: '🤿 Seen Diving',
    metricMinSize: 'Min. Size',
    metricLimit: 'Daily Limit',
    metricDepth: 'Depth Range',
    noMinLabel: 'Not specified',
    cmUnit: 'cm',
    openCardBtn: 'Full Species Sheet',
    resetSpeciesFilters: 'Reset species filters',
    noSpeciesFound: 'No marine species match your current search or filter.',
    calEyebrow: '12-MONTH MARINE PLANNER',
    calTitle: 'Monthly Water Temperature, Visibility & Catch Calendar',
    calSubtitle:
      'Select any month to check average sea temperature, underwater visibility, active fish species, and the strict Bluefin Tuna retention window (June 15 – October 15).',
    calWaterTemp: 'Sea Temp',
    calVisibility: 'Visibility',
    calDivingScore: 'Diving',
    calTunaOpen: 'Bluefin Tuna: OPEN WINDOW (Jun 15 – Oct 15 w/ e-BCD)',
    calTunaClosed: 'Bluefin Tuna: CLOSED (Legal window Jun 15 – Oct 15 only)',
    calActiveSpecies: 'Highlighted species this month (tap for full card):',
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    rentalsEyebrow: 'GEAR RENTAL, BOATS & LOCAL TACKLE SHOPS',
    rentalsTitle: 'Scuba Rental, Sportfishing Charters & Verified Tackle Shops',
    rentalsSubtitle:
      'How rentals work in coastal Turkey: why dive kits bundle into boat trips, why buying a compact travel rod often beats renting, local bait phrases, and real city-by-city tackle shops.',
    tabDiving: '🤿 Diving & Snorkel Rentals',
    tabFishing: '🎣 Fishing Tackle, Charters & Shops',
    includedLabel: 'What’s included & how it works:',
    insiderTipLabel: 'Insider tip:',
    baitTitle: 'Turkish Live-Bait Cheat Sheet for Local Tackle Shops (Av & Balık)',
    baitSubtitle: 'Show these names at local counters to buy fresh Mediterranean bait matching your target fish:',
    shopsTitle: 'Verified Tackle Shops, Marinas & Dive Centers Across 6 Hubs',
    shopsSubtitle: 'Real brick-and-mortar shops and licensed marine bases from Dalaman and Fethiye to Kaş, Marmaris, and Datça:',
    shopKindLabels: {
      shop: 'Tackle Shop',
      dive: 'Dive Center (TSSF)',
      marina: 'Marina / Charters',
    },
    openAllOnMap: 'Search city on Maps',
    servicesBannerEyebrow: 'PORTAL SERVICES & IN-DEPTH ARTICLES',
    servicesBannerTitle: 'Ready to book a dive boat or licensed sportfishing charter?',
    servicesBannerDesc:
      'Jump straight to our dedicated service hubs or read our editorial articles on Kaş wreck diving and Turkish spearfishing statutes.',
    btnServiceDiving: 'Service Hub: Diving →',
    btnServiceFishing: 'Service Hub: Tuna Fishing →',
    btnArticleDiving: 'Guide: Kaş & Fethiye Dive Sites',
    btnArticleLaws: 'Guide: Diving, Tuna & Spearfishing 2026',
    spotsEyebrow: 'COASTAL DIRECTORY · 16 SPOTS',
    spotsTitle: 'Top Dive Sites, Shore/Boat Fishing Marks & Protected Sanctuaries',
    spotsSubtitle:
      'Synced with the interactive map above. Tap any species badge inside a spot card to inspect its legal limit and habits.',
    spotMetricMethod: 'Depth / Method',
    spotMetricLevel: 'Level / Status',
    spotMetricSeason: 'Visibility / Season',
    spotHighlightsLabel: 'Spot Highlights:',
    spotLawLabel: 'Regulations & Safety:',
    spotSpeciesLabel: 'Commonly spotted or targeted here:',
    spotShowOnMap: 'Focus on map ↑',
    spotOpenGmaps: 'Google Maps',
    spotsEmpty: 'No spots match your active zone and category filter.',
    spotsResetBtn: 'Reset map & spot filters',
    lawsEyebrow: 'TURKISH MARINE LAW 2026 · TEBLİĞ № 6/2 & TSSF',
    lawsTitle: 'Licenses, Quotas, Spearfishing Bans & DLM Flight Safety',
    lawsSubtitle:
      'Essential legal rules for recreational anglers, divers, and spearfishers—verified against official regulations without street-tout myths.',
    officialSourceLabel: 'Official source:',
    modalHabitat: 'Habitat & Distribution',
    modalTip: 'How to Catch or Spot Underwater',
    modalSafetyOrFood: 'Culinary Notes, Safety & First Aid',
    modalSeasonActivity: 'Peak Months Across the Year',
    modalPhotoCredit: 'Photo credit (Wikimedia Commons):',
    modalClose: 'Close',
    zonePrefix: 'Zone',
  },
  de: {
    inflationTitle: '2026 Inflationsschutz & Aktive Fischereiregeln (Tebliğ Nr. 6/2)',
    inflationDesc:
      'Tauchpakete und Angelcharter in Kaş, Göcek und Fethiye orientieren sich am Euro (€), während lokale Angelläden (Av & Balık) in Türkischer Lira abrechnen. Alle Mindestmaße, Tageslimits und Schonzeiten entsprechen dem Ministeriums-Erlass Tebliğ Nr. 6/2 (2024–2028).',
    mapEyebrow: 'INTERAKTIVE KÜSTENKARTE · 4 ZONEN',
    mapTitle: 'Küstenabschnitt von Datça bis Kaş wählen oder nach Aktivität filtern',
    mapSubtitle:
      'Klicken Sie rechts auf eine Zone oder auf die Marker in der Satellitenkarte, um Tiefen, Brandungsreviere, Tauchspots und Schutzzonen (Kekova, İztuzu, Ölüdeniz) zu erkunden.',
    showAllZones: (n) => `Alle ${n} Küstenspots anzeigen`,
    spotsCount: (n) => (n === 1 ? '1 Spot' : `${n} Spots`),
    mapCatAll: '🗺️ Alle Spots (16)',
    mapCatDiving: '🤿 Tauchen & Schnorcheln',
    mapCatFishing: '🎣 Angeln',
    mapCatBoth: '⚖️ Beides',
    mapCatRestricted: '⛔ Schutzzonen / Verbot',
    encyEyebrow: 'ARTEN-ENZYKLOPÄDIE · 23 MEERESARTEN',
    encyTitle: 'Fische & Meeresbewohner der Region: Erlaubt, geschont oder giftig',
    encySubtitle:
      'Authentische Fotos, türkische Namen für Restaurants & Skipper, gesetzliche Mindestmaße (cm), Fanglimits, Schonzeiten und Gefahrenhinweise.',
    searchPlaceholder: 'Suche nach Name (z. B. Goldbrasse, Çipura, Orfoz, Thunfisch)...',
    statusAll: 'Alle Arten',
    statusAllowed: '🟢 Ganzjährig erlaubt',
    statusSeasonal: '🟡 Schonzeit / Quote',
    statusProhibited: '🔴 Streng geschützt',
    statusToxic: '☠️ Giftig / Invasiv',
    actAll: 'Alle Formate',
    actShore: '🎣 Uferangeln',
    actBoat: '🚤 Boot / Trolling',
    actDiving: '🤿 Beim Tauchen',
    metricMinSize: 'Mindestmaß',
    metricLimit: 'Tageslimit',
    metricDepth: 'Tiefe',
    noMinLabel: 'Keins',
    cmUnit: 'cm',
    openCardBtn: 'Art-Steckbrief öffnen',
    resetSpeciesFilters: 'Filter zurücksetzen',
    noSpeciesFound: 'Keine Meeresarten für Ihre aktuelle Suche gefunden.',
    calEyebrow: '12-MONATS-PLANER',
    calTitle: 'Kalender für Wassertemperatur, Sichtweite & Fangsaison',
    calSubtitle:
      'Wählen Sie einen Monat für Details zu Wassertemperatur, Tauchsicht, aktiven Arten und dem strikten Zeitfenster für Blauflossen-Thunfisch (15. Juni – 15. Oktober).',
    calWaterTemp: 'Wasser',
    calVisibility: 'Sicht',
    calDivingScore: 'Tauchen',
    calTunaOpen: 'Roter Thun: OFFEN (15.06.–15.10. nur mit e-BCD)',
    calTunaClosed: 'Roter Thun: GESCHLOSSEN (Fenster nur 15.06.–15.10.)',
    calActiveSpecies: 'Top-Arten dieses Monats (Klick für Steckbrief):',
    monthNames: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
    ],
    monthShortNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    rentalsEyebrow: 'AUSRÜSTUNG, CHARTERBOOTE & LOKALE LÄDEN',
    rentalsTitle: 'Tauchausrüstung, Angelboote & verifizierte Fachgeschäfte',
    rentalsSubtitle:
      'Praxistipps für die Türkei: Warum Tauchausrüstung meist im Bootspreis steckt, wann der Kauf einer kompakten Reiserute günstiger ist und welche lokalen Angelläden frische Köder führen.',
    tabDiving: '🤿 Tauchen & Schnorcheln (Miete & Kurse)',
    tabFishing: '🎣 Angeln: Gerät, Boote & Fachläden',
    includedLabel: 'Leistungen & Ablauf:',
    insiderTipLabel: 'Insider-Tipp:',
    baitTitle: 'Türkisches Köder-Vokabular für den Angelladen (Av & Balık)',
    baitSubtitle: 'Nennen oder zeigen Sie diese Begriffe vor Ort für passende frische Naturköder:',
    shopsTitle: 'Verifizierte Angelläden, Marinas & Tauchbasen in 6 Orten',
    shopsSubtitle: 'Konkrete Adressen und Google-Maps-Links von Dalaman und Fethiye bis Kaş, Marmaris und Datça:',
    shopKindLabels: {
      shop: 'Angelladen',
      dive: 'Tauchbasis (TSSF)',
      marina: 'Marina / Charter',
    },
    openAllOnMap: 'Auf Google Maps suchen',
    servicesBannerEyebrow: 'PORTAL-SERVICES & ARTIKEL',
    servicesBannerTitle: 'Tauchboot oder lizenziertes Hochsee-Angelboot anfragen?',
    servicesBannerDesc:
      'Besuchen Sie unsere Service-Übersichten oder lesen Sie die ausführlichen Hintergrundartikel zu Wracks in Kaş und den türkischen Gesetzen.',
    btnServiceDiving: 'Service-Hub: Tauchen →',
    btnServiceFishing: 'Service-Hub: Hochseeangeln →',
    btnArticleDiving: 'Artikel: Tauchspots Kaş & Fethiye',
    btnArticleLaws: 'Artikel: Tauchen, Thunfisch & Gesetze 2026',
    spotsEyebrow: 'KÜSTENKATALOG · 16 SPOTS',
    spotsTitle: 'Die besten Tauchspots, Angelplätze und Schutzgebiete',
    spotsSubtitle:
      'Mit der Karte synchronisiert. Ein Klick auf eine Fischart öffnet direkt den detaillierten Steckbrief.',
    spotMetricMethod: 'Tiefe / Methode',
    spotMetricLevel: 'Level / Status',
    spotMetricSeason: 'Sicht / Saison',
    spotHighlightsLabel: 'Highlights des Spots:',
    spotLawLabel: 'Gesetz & Sicherheit:',
    spotSpeciesLabel: 'Häufig beobachtet oder geangelt:',
    spotShowOnMap: 'Auf Karte zeigen ↑',
    spotOpenGmaps: 'Google Maps',
    spotsEmpty: 'Für diese Filterkombination wurden keine Spots gefunden.',
    spotsResetBtn: 'Kartenfilter zurücksetzen',
    lawsEyebrow: 'TÜRKISCHES SEERECHT 2026 · TEBLİĞ NR. 6/2 & TSSF',
    lawsTitle: 'Lizenzen, Quoten, Harpunen-Verbot & Flugpause ab DLM',
    lawsSubtitle:
      'Verbindliche Regeln für Freizeitangler, Taucher und Apnoejäger — geprüft nach aktuellem Ministeriums-Erlass.',
    officialSourceLabel: 'Offizielle Quelle:',
    modalHabitat: 'Lebensraum & Vorkommen',
    modalTip: 'Fang- & Beobachtungstipps',
    modalSafetyOrFood: 'Kulinarik, Sicherheit & Erste Hilfe',
    modalSeasonActivity: 'Aktivität über das Jahr',
    modalPhotoCredit: 'Bildnachweis (Wikimedia Commons):',
    modalClose: 'Schließen',
    zonePrefix: 'Zone',
  },
  tr: {
    inflationTitle: '2026 Enflasyon Koruması ve Güncel Av Kuralları (6/2 Tebliğ)',
    inflationDesc:
      'Kaş, Göcek ve Fethiye’deki dalış turları ile açık deniz tekne kiralamaları çoğunlukla Euro (€) bazlı, yerel av bayilerindeki malzeme ve yemler ise TL bazlı fiyatlanır. Tüm asgari boy, limit ve zaman yasakları 2024–2028 dönemini kapsayan 6/2 Numaralı Tebliğ esas alınarak hazırlanmıştır.',
    mapEyebrow: 'İNTERAKTİF KIYI HARİTASI · 4 BÖLGE',
    mapTitle: 'Datça’dan Kaş’a kıyı bölgesini seçin veya aktiviteye göre filtreleyin',
    mapSubtitle:
      'Sağdaki bölgelere ya da uydu haritasındaki işaretçilere tıklayarak dalış derinliklerini, kıyı at-çek meralarını ve Kekova, İztuzu, Ölüdeniz gibi koruma sahalarını inceleyin.',
    showAllZones: (n) => `Tüm ${n} kıyı noktasını göster`,
    spotsCount: (n) => `${n} nokta`,
    mapCatAll: '🗺️ Tüm Noktalar (16)',
    mapCatDiving: '🤿 Dalış & Şnorkel',
    mapCatFishing: '🎣 Balıkçılık',
    mapCatBoth: '⚖️ Her İkisi',
    mapCatRestricted: '⛔ Koruma / Yasak Saha',
    encyEyebrow: 'CANLI REHBER · 23 DENİZ TÜRÜ',
    encyTitle: 'Bölge Balıkları Ansiklopedisi: Hangisi Serbest, Hangisi Yasak?',
    encySubtitle:
      'Gerçek fotoğraflar, yerel Türkçe ve Latince isimler, 6/2 Tebliğ yasal boy limitleri (cm), günlük adet/kg sınırları, yasak dönemler ve zehirli istilacı tür uyarıları.',
    searchPlaceholder: 'İsimle ara (örn. Çipura, Levrek, Orfoz, Orkinos, Balon)...',
    statusAll: 'Tüm Türler',
    statusAllowed: '🟢 Yıl Boyu Serbest',
    statusSeasonal: '🟡 Dönem / Kotalı',
    statusProhibited: '🔴 Kesin Yasak',
    statusToxic: '☠️ Zehirli / Tehlikeli',
    actAll: 'Tüm Formatlar',
    actShore: '🎣 Kıyı Avı',
    actBoat: '🚤 Tekne / Sırtı',
    actDiving: '🤿 Dalışta Görülür',
    metricMinSize: 'Asgari Boy',
    metricLimit: 'Günlük Limit',
    metricDepth: 'Derinlik',
    noMinLabel: 'Belirtilmemiş',
    cmUnit: 'cm',
    openCardBtn: 'Detay Kartını Aç',
    resetSpeciesFilters: 'Tür filtrelerini sıfırla',
    noSpeciesFound: 'Aramanıza uygun deniz canlısı bulunamadı.',
    calEyebrow: '12 AYLIK SEZON PLANLAYICI',
    calTitle: 'Su Sıcaklığı, Su Altı Görüşü ve Av Takvimi',
    calSubtitle:
      'Herhangi bir aya tıklayarak su sıcaklığını, görüş mesafesini, verimli türleri ve Mavi Yüzgeçli Orkinos yasal dönemini (15 Haziran – 15 Ekim) görün.',
    calWaterTemp: 'Su Sıcaklığı',
    calVisibility: 'Görüş',
    calDivingScore: 'Dalış Puanı',
    calTunaOpen: 'Orkinos: SEZON AÇIK (15.06–15.10 e-BCD zorunlu)',
    calTunaClosed: 'Orkinos: YASAK DÖNEM (yalnızca 15.06–15.10 serbest)',
    calActiveSpecies: 'Bu ay öne çıkan türler (kart için tıklayın):',
    monthNames: [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ],
    monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    rentalsEyebrow: 'EKİPMAN KİRALAMA, TEKNELER VE YEREL AV BAYİLERİ',
    rentalsTitle: 'Dalış Ekipmanı, Balıkçı Tekneleri ve Güvenilir Malzeme Dükkanları',
    rentalsSubtitle:
      'Türkiye kıyılarında ekipman pratiği: Dalış malzemesinin neden tekne paketine dahil olduğu, neden olta kiralamak yerine seyahat kamışı almanın daha ekonomik olduğu ve ilçe ilçe av bayileri.',
    tabDiving: '🤿 Dalış ve Şnorkel Kiralama',
    tabFishing: '🎣 Olta Takımı, Tekne ve Av Bayileri',
    includedLabel: 'Paket kapsamı ve işleyiş:',
    insiderTipLabel: 'Yerel ipucu:',
    baitTitle: 'Av Bayileri İçin Hızlı Canlı Yem Sözlüğü',
    baitSubtitle: 'Hedef balığa göre doğru taze yemi istemek için bu isimleri kullanabilirsiniz:',
    shopsTitle: '6 Merkezde Doğrulanmış Av Bayileri, Marinalar ve Dalış Okulları',
    shopsSubtitle: 'Dalaman’dan Fethiye’ye, Kaş’tan Marmaris ve Datça’ya gerçek adresler ve Google Haritalar bağlantıları:',
    shopKindLabels: {
      shop: 'Av & Balık Bayisi',
      dive: 'Dalış Merkezi (TSSF)',
      marina: 'Marina / Tekne',
    },
    openAllOnMap: 'Şehirdeki tümünü haritada gör',
    servicesBannerEyebrow: 'HİZMETLER VE DETAY REHBERLER',
    servicesBannerTitle: 'Lisanslı dalış teknesi veya sportif balıkçılık turu mu arıyorsunuz?',
    servicesBannerDesc:
      'Doğrudan hizmet sayfalarımıza geçebilir veya Kaş batıkları ile 2026 zıpkın/orkinos mevzuatı rehberlerimizi okuyabilirsiniz.',
    btnServiceDiving: 'Hizmetler: Dalış Turları →',
    btnServiceFishing: 'Hizmetler: Açık Deniz Balıkçılığı →',
    btnArticleDiving: 'Rehber: Kaş ve Fethiye Dalışı',
    btnArticleLaws: 'Rehber: Dalış, Orkinos ve Yasalar 2026',
    spotsEyebrow: 'KIYI REHBERİ · 16 NOKTA',
    spotsTitle: 'En İyi Dalış Noktaları, Balık Meraları ve Koruma Alanları',
    spotsSubtitle:
      'Yukarıdaki harita ile senkronizedir. Kartların içindeki balık etiketlerine tıklayarak yasal limitlerini anında inceleyebilirsiniz.',
    spotMetricMethod: 'Derinlik / Yöntem',
    spotMetricLevel: 'Seviye / Statü',
    spotMetricSeason: 'Görüş / Sezon',
    spotHighlightsLabel: 'Noktanın Öne Çıkanları:',
    spotLawLabel: 'Yasal Durum & Güvenlik:',
    spotSpeciesLabel: 'Burada görülen veya avlanan türler:',
    spotShowOnMap: 'Haritada göster ↑',
    spotOpenGmaps: 'Google Haritalar',
    spotsEmpty: 'Seçilen bölge ve kategoriye uygun nokta bulunamadı.',
    spotsResetBtn: 'Harita ve nokta filtrelerini sıfırla',
    lawsEyebrow: 'TÜRKİYE MEVZUATI 2026 · 6/2 TEBLİĞ VE TSSF',
    lawsTitle: 'Belgeler, Kotalar, Zıpkın Kuralları ve DLM Uçuş Güvenliği',
    lawsSubtitle:
      'Amatör balıkçılar, dalgıçlar ve zıpkıncılar için Tarım ve Orman Bakanlığı ile Sahil Güvenlik kurallarının özeti.',
    officialSourceLabel: 'Resmi kaynak:',
    modalHabitat: 'Yaşam Alanı ve Dağılım',
    modalTip: 'Avlanma veya Su Altında Görme İpucu',
    modalSafetyOrFood: 'Lezzet, Güvenlik ve İlk Yardım',
    modalSeasonActivity: 'Yıl İçi Aktivite Takvimi',
    modalPhotoCredit: 'Fotoğraf kaynağı (Wikimedia Commons):',
    modalClose: 'Kapat',
    zonePrefix: 'Bölge',
  },
};

function getStatusStyles(status: FishingLegalityStatus) {
  switch (status) {
    case 'allowed':
      return {
        badge: 'bg-emerald-600 text-white border-emerald-400/40',
        border: 'border-emerald-200/80',
        banner: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        icon: <FaCheckCircle className="text-emerald-600 flex-shrink-0" />,
      };
    case 'seasonal':
      return {
        badge: 'bg-amber-500 text-slate-950 border-amber-300',
        border: 'border-amber-200/80',
        banner: 'bg-amber-50 border-amber-200 text-amber-950',
        icon: <FaExclamationTriangle className="text-amber-600 flex-shrink-0" />,
      };
    case 'prohibited':
      return {
        badge: 'bg-rose-600 text-white border-rose-400/40',
        border: 'border-rose-200/80',
        banner: 'bg-rose-50 border-rose-200 text-rose-950',
        icon: <FaBan className="text-rose-600 flex-shrink-0" />,
      };
    case 'toxic':
      return {
        badge: 'bg-slate-900 text-amber-300 border-amber-400/60',
        border: 'border-rose-300',
        banner: 'bg-rose-950 text-amber-200 border-rose-800',
        icon: <FaSkullCrossbones className="text-amber-400 flex-shrink-0" />,
      };
  }
}

function getSpotCategoryStyles(cat: SpotCategory) {
  switch (cat) {
    case 'diving':
      return 'bg-cyan-600 text-white border-cyan-400/40';
    case 'fishing':
      return 'bg-amber-500 text-slate-950 border-amber-300';
    case 'both':
      return 'bg-teal-600 text-white border-teal-400/40';
    case 'restricted':
      return 'bg-rose-600 text-white border-rose-400/40';
  }
}

function getLawCardHeaderClass(tone: 'cyan' | 'amber' | 'rose' | 'slate') {
  switch (tone) {
    case 'cyan':
      return 'bg-cyan-700 text-white';
    case 'amber':
      return 'bg-amber-600 text-white';
    case 'rose':
      return 'bg-rose-700 text-white';
    case 'slate':
      return 'bg-slate-900 text-white';
  }
}

export default function DivingFishingHub({ locale }: { locale: LocaleCode }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale) ? locale : 'en';
  const t = HUB_UI[activeLocale];

  // Map & spot filters
  const [selectedZone, setSelectedZone] = useState<'all' | CoastZoneId>('all');
  const [mapCategory, setMapCategory] = useState<'all' | SpotCategory>('all');
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

  // Encyclopedia filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | FishingLegalityStatus>('all');
  const [activityFilter, setActivityFilter] = useState<'all' | ActivityFormat>('all');
  const [modalSpecies, setModalSpecies] = useState<MarineSpecies | null>(null);

  // Season calendar (default to November or current month 1..12)
  const [activeMonth, setActiveMonth] = useState<number>(() => new Date().getMonth() + 1);

  // Rental tabs
  const [rentalTab, setRentalTab] = useState<'diving' | 'fishing'>('diving');

  useEffect(() => {
    if (!modalSpecies) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalSpecies(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalSpecies]);

  const zoneMap = useMemo(() => {
    const rec: Record<string, (typeof COAST_ZONES)[number]> = {};
    COAST_ZONES.forEach((z) => {
      rec[z.id] = z;
    });
    return rec;
  }, []);

  const speciesMap = useMemo(() => {
    const rec: Record<string, MarineSpecies> = {};
    MARINE_SPECIES.forEach((s) => {
      rec[s.id] = s;
    });
    return rec;
  }, []);

  const spotCountByZone = useMemo(() => {
    const counts: Record<CoastZoneId, number> = {
      'zone-1': 0,
      'zone-2': 0,
      'zone-3': 0,
      'zone-4': 0,
    };
    COASTAL_SPOTS.forEach((sp) => {
      counts[sp.zoneId] += 1;
    });
    return counts;
  }, []);

  const statusCounts = useMemo(() => {
    const counts: Record<FishingLegalityStatus, number> = {
      allowed: 0,
      seasonal: 0,
      prohibited: 0,
      toxic: 0,
    };
    MARINE_SPECIES.forEach((s) => {
      counts[s.status] += 1;
    });
    return counts;
  }, []);

  const filteredSpots = useMemo(() => {
    return COASTAL_SPOTS.filter((sp) => {
      const matchZone = selectedZone === 'all' || sp.zoneId === selectedZone;
      const matchCat =
        mapCategory === 'all' ||
        sp.category === mapCategory ||
        (mapCategory === 'diving' && sp.category === 'both') ||
        (mapCategory === 'fishing' && sp.category === 'both');
      return matchZone && matchCat;
    });
  }, [selectedZone, mapCategory]);

  const filteredSpecies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MARINE_SPECIES.filter((s) => {
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchActivity = activityFilter === 'all' || s.activities.includes(activityFilter);
      const matchQuery =
        !q ||
        s.name[activeLocale].toLowerCase().includes(q) ||
        s.name.en.toLowerCase().includes(q) ||
        s.trLocalName.toLowerCase().includes(q) ||
        s.latinName.toLowerCase().includes(q);
      return matchStatus && matchActivity && matchQuery;
    });
  }, [activeLocale, searchQuery, statusFilter, activityFilter]);

  const filteredRentals = useMemo(
    () => RENTAL_OPTIONS.filter((r) => r.tab === rentalTab),
    [rentalTab]
  );

  const selectedMonthEntry = useMemo(
    () => SEASON_CALENDAR.find((m) => m.month === activeMonth) || SEASON_CALENDAR[8],
    [activeMonth]
  );

  const statusBadgeText = (status: FishingLegalityStatus) => {
    switch (status) {
      case 'allowed':
        return t.statusAllowed;
      case 'seasonal':
        return t.statusSeasonal;
      case 'prohibited':
        return t.statusProhibited;
      case 'toxic':
        return t.statusToxic;
    }
  };

  const activityBadgeText = (act: ActivityFormat) => {
    switch (act) {
      case 'shore':
        return t.actShore;
      case 'boat':
        return t.actBoat;
      case 'diving':
        return t.actDiving;
    }
  };

  const categoryBadgeText = (cat: SpotCategory) => {
    switch (cat) {
      case 'diving':
        return t.mapCatDiving;
      case 'fishing':
        return t.mapCatFishing;
      case 'both':
        return t.mapCatBoth;
      case 'restricted':
        return t.mapCatRestricted;
    }
  };

  const resetMapFilters = () => {
    setSelectedZone('all');
    setMapCategory('all');
    setSelectedSpotId(null);
  };

  return (
    <div className="space-y-12">
      {/* 1. Inflation Shield & Rules Notice */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 border-l-4 border-l-cyan-600 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-700 text-lg flex-shrink-0 border border-cyan-200/60">
            <FaShieldAlt />
          </div>
          <div className="space-y-1">
            <h2 className="font-bold text-sm md:text-base text-slate-900">{t.inflationTitle}</h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              {t.inflationDesc}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Coastal Map + 4-Zone Selector */}
      <section id="map-zones" className="scroll-mt-28 portal-card p-5 md:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaCompass /> {t.mapEyebrow}
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.mapTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.mapSubtitle}
            </p>
          </div>

          {/* Layer Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 'all', label: t.mapCatAll },
                { id: 'diving', label: t.mapCatDiving },
                { id: 'fishing', label: t.mapCatFishing },
                { id: 'restricted', label: t.mapCatRestricted },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setMapCategory(btn.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  mapCategory === btn.id
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8">
            <DivingFishingMap
              locale={activeLocale}
              selectedZone={selectedZone}
              categoryFilter={mapCategory}
              selectedSpotId={selectedSpotId}
              onSelectSpot={(id) => setSelectedSpotId(id)}
              onResetAll={resetMapFilters}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
            <div className="space-y-2.5">
              {COAST_ZONES.map((zone) => {
                const isSelected = selectedZone === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() =>
                      setSelectedZone((prev) => (prev === zone.id ? 'all' : zone.id))
                    }
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
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
                          {t.spotsCount(spotCountByZone[zone.id])}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] mt-1 leading-snug ${
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
              onClick={resetMapFilters}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-colors border ${
                selectedZone === 'all' && mapCategory === 'all'
                  ? 'bg-cyan-600 text-white border-cyan-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {t.showAllZones(COASTAL_SPOTS.length)}
            </button>
          </div>
        </div>
      </section>

      {/* 3. Marine Encyclopedia (23 Species) + 12-Month Calendar */}
      <section id="encyclopedia" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaFish /> {t.encyEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.encyTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.encySubtitle}
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="portal-card p-4 md:p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'all', label: t.actAll },
                  { id: 'shore', label: t.actShore },
                  { id: 'boat', label: t.actBoat },
                  { id: 'diving', label: t.actDiving },
                ] as const
              ).map((act) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => setActivityFilter(act.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activityFilter === act.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                statusFilter === 'all'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.statusAll} ({MARINE_SPECIES.length})
            </button>
            {(
              [
                { id: 'allowed', label: t.statusAllowed, count: statusCounts.allowed },
                { id: 'seasonal', label: t.statusSeasonal, count: statusCounts.seasonal },
                { id: 'prohibited', label: t.statusProhibited, count: statusCounts.prohibited },
                { id: 'toxic', label: t.statusToxic, count: statusCounts.toxic },
              ] as const
            ).map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatusFilter(st.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  statusFilter === st.id
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st.label} ({st.count})
              </button>
            ))}
          </div>
        </div>

        {/* Species Cards Grid */}
        {filteredSpecies.length === 0 ? (
          <div className="portal-card p-10 text-center space-y-3 text-slate-500">
            <FaFish className="mx-auto text-3xl text-slate-300" />
            <p className="font-bold text-sm">{t.noSpeciesFound}</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setActivityFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-700"
            >
              {t.resetSpeciesFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSpecies.map((sp) => {
              const st = getStatusStyles(sp.status);
              return (
                <article
                  key={sp.id}
                  className={`group bg-white rounded-2xl border ${st.border} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col`}
                >
                  {/* Real Species Photo */}
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img
                      src={sp.image}
                      alt={`${sp.name[activeLocale]} (${sp.latinName})`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/25" />

                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow ${st.badge}`}
                      >
                        {statusBadgeText(sp.status)}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-cyan-200 text-[11px] font-bold border border-white/15">
                        TR: {sp.trLocalName}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap gap-1">
                      {sp.activities.map((a) => (
                        <span
                          key={a}
                          className="px-2 py-0.5 rounded-md bg-slate-900/75 text-white/95 text-[10px] font-bold border border-white/15"
                        >
                          {activityBadgeText(a)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                          {sp.name[activeLocale]}
                        </h3>
                        <p className="text-xs italic text-slate-500 font-semibold">
                          {sp.latinName}
                        </p>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                          {sp.shortSubtitle[activeLocale]}
                        </p>
                      </div>

                      {/* 3-Column Metrics Strip */}
                      <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px]">
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.metricMinSize}
                          </span>
                          <strong className="text-slate-900 font-extrabold">
                            {sp.minSizeCm ? `${sp.minSizeCm} ${t.cmUnit}` : t.noMinLabel}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.metricDepth}
                          </span>
                          <strong className="text-cyan-700 font-extrabold">{sp.depthRangeM}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.metricLimit}
                          </span>
                          <strong className="text-slate-900 font-bold line-clamp-2">
                            {sp.dailyLimit[activeLocale]}
                          </strong>
                        </div>
                      </div>

                      {/* Season / Warning Strip */}
                      <div
                        className={`p-2.5 rounded-xl border text-[11px] font-bold flex items-start gap-2 ${st.banner}`}
                      >
                        {st.icon}
                        <span className="leading-snug">{sp.closedSeason[activeLocale]}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-400 truncate max-w-[55%]">
                        {sp.imageAttribution.license} · {sp.imageAttribution.artist}
                      </span>
                      <button
                        type="button"
                        onClick={() => setModalSpecies(sp)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-cyan-700 text-white text-xs font-bold transition-colors flex-shrink-0"
                      >
                        <span>{t.openCardBtn}</span>
                        <FaChevronRight size={9} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* 12-Month Interactive Calendar */}
        <div className="portal-card p-5 md:p-7 space-y-5">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaCalendarAlt /> {t.calEyebrow}
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900">{t.calTitle}</h3>
            <p className="text-xs md:text-sm text-slate-600 mt-1 font-medium">{t.calSubtitle}</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {SEASON_CALENDAR.map((entry) => {
              const isActive = entry.month === activeMonth;
              return (
                <button
                  key={entry.month}
                  type="button"
                  onClick={() => setActiveMonth(entry.month)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white border-cyan-500 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:border-cyan-400'
                  }`}
                >
                  <span className="block text-xs font-extrabold">
                    {t.monthShortNames[entry.month - 1]}
                  </span>
                  <span
                    className={`block text-[10px] font-bold mt-0.5 ${
                      isActive ? 'text-cyan-300' : 'text-cyan-700'
                    }`}
                  >
                    {entry.waterTempC}
                  </span>
                  <span className="block text-[9px] mt-0.5 opacity-80">
                    {entry.isTunaWindow ? '🐟 OK' : '—'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 md:p-5 border border-slate-200/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-cyan-300 text-xs font-extrabold uppercase">
                  {t.monthNames[selectedMonthEntry.month - 1]}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedMonthEntry.isTunaWindow
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {selectedMonthEntry.isTunaWindow ? t.calTunaOpen : t.calTunaClosed}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                <span>
                  🌊 {t.calWaterTemp}:{' '}
                  <strong className="text-slate-900">{selectedMonthEntry.waterTempC}</strong>
                </span>
                <span>
                  👁️ {t.calVisibility}:{' '}
                  <strong className="text-cyan-700">{selectedMonthEntry.visibilityM}</strong>
                </span>
                <span>
                  🤿 {t.calDivingScore}:{' '}
                  <strong className="text-amber-500">
                    {'★'.repeat(selectedMonthEntry.divingRating)}
                    {'☆'.repeat(5 - selectedMonthEntry.divingRating)}
                  </strong>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {selectedMonthEntry.summary[activeLocale]}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/70">
              <span className="text-xs font-bold text-slate-500">{t.calActiveSpecies}</span>
              {selectedMonthEntry.topSpeciesIds.map((spId) => {
                const sp = speciesMap[spId];
                if (!sp) return null;
                return (
                  <button
                    key={spId}
                    type="button"
                    onClick={() => setModalSpecies(sp)}
                    className="px-3 py-1 rounded-full bg-white hover:bg-cyan-50 border border-slate-200 hover:border-cyan-400 text-xs font-bold text-slate-800 transition-colors"
                  >
                    {sp.name[activeLocale]} ({sp.trLocalName})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Equipment Rentals, Boat Charters & Real City Tackle Shops */}
      <section id="rentals" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaShoppingBag /> {t.rentalsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.rentalsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.rentalsSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRentalTab('diving')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-colors ${
                rentalTab === 'diving'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.tabDiving}
            </button>
            <button
              type="button"
              onClick={() => setRentalTab('fishing')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-colors ${
                rentalTab === 'fishing'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.tabFishing}
            </button>
          </div>
        </div>

        {/* 3 Rental Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredRentals.map((opt) => (
            <div
              key={opt.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-[11px] font-extrabold">
                    {opt.badge[activeLocale]}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                    {opt.title[activeLocale]}
                  </h3>
                  <div className="mt-3 p-3.5 rounded-xl bg-slate-900 text-white">
                    <div className="text-2xl font-extrabold text-cyan-300">{opt.priceRangeEur}</div>
                    <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                      {opt.priceUnit[activeLocale]}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-cyan-700 mt-2.5">
                    {opt.durationOrFormat[activeLocale]}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    {t.includedLabel}
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    {opt.includedItems[activeLocale].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FaCheckCircle className="text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-950 font-medium">
                <strong className="font-extrabold block text-amber-800 mb-0.5">
                  {t.insiderTipLabel}
                </strong>
                {opt.insiderTip[activeLocale]}
              </div>
            </div>
          ))}
        </div>

        {/* Turkish Bait Mini-Dictionary */}
        <div className="portal-card p-5 md:p-6 space-y-4">
          <div>
            <h3 className="text-base md:text-lg font-extrabold text-slate-900">{t.baitTitle}</h3>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">{t.baitSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TURKISH_BAIT_GLOSSARY.map((b) => {
              const localMeaning =
                activeLocale === 'ru'
                  ? b.ruName
                  : activeLocale === 'de'
                  ? b.deName
                  : activeLocale === 'tr'
                  ? b.enName
                  : b.enName;
              return (
                <div
                  key={b.trName}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-sm font-extrabold text-cyan-800">{b.trName}</strong>
                    <span className="text-[11px] font-semibold text-slate-500">{localMeaning}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    🎯 {b.targetFish[activeLocale]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verified Tackle Shops & Dive Centers by City */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">{t.shopsTitle}</h3>
            <p className="text-xs md:text-sm text-slate-600 mt-0.5 font-medium">
              {t.shopsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {GEAR_SHOP_HUBS.map((hub) => (
              <div
                key={hub.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-extrabold text-slate-900">
                      {hub.city[activeLocale]}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {zoneMap[hub.zoneId]?.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {hub.summary[activeLocale]}
                  </p>
                  <div className="text-[11px] text-slate-500 font-medium flex items-start gap-1.5">
                    <FaMapMarkerAlt className="text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{hub.whereToLook[activeLocale]}</span>
                  </div>

                  {/* Verified Shops List */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {hub.verifiedSpots.map((vs) => (
                      <a
                        key={vs.name}
                        href={vs.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50/70 border border-slate-200/70 hover:border-cyan-300 transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <strong className="text-xs font-extrabold text-slate-900 group-hover:text-cyan-800">
                            {vs.name}
                          </strong>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 flex-shrink-0">
                            {t.shopKindLabels[vs.kind]}
                          </span>
                        </div>
                        <div className="text-[11px] text-cyan-700 font-semibold mt-0.5">
                          {vs.address}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {vs.note[activeLocale]}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href={hub.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-cyan-700 text-white text-xs font-bold transition-colors"
                >
                  <FaExternalLinkAlt size={10} /> {t.openAllOnMap}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Interlinking Dark Banner to Service Hubs & Articles */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider border border-cyan-500/30">
              <FaAnchor size={10} /> {t.servicesBannerEyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
              {t.servicesBannerTitle}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              {t.servicesBannerDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-shrink-0">
            <Link
              href={`/${activeLocale}/services/diving`}
              className="px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold text-center transition-colors"
            >
              {t.btnServiceDiving}
            </Link>
            <Link
              href={`/${activeLocale}/services/tuna-fishing`}
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold text-center transition-colors"
            >
              {t.btnServiceFishing}
            </Link>
            <Link
              href={`/${activeLocale}/articles/diving`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-cyan-300" /> {t.btnArticleDiving}
            </Link>
            <Link
              href={`/${activeLocale}/articles/diving-and-tuna-fishing`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-amber-300" /> {t.btnArticleLaws}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Coastal Spots Catalog (16 Spots in TrekkingAtlas card layout) */}
      <section id="spots" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaWater /> {t.spotsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.spotsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.spotsSubtitle}
            </p>
          </div>
          {(selectedZone !== 'all' || mapCategory !== 'all') && (
            <button
              type="button"
              onClick={resetMapFilters}
              className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold self-start md:self-auto"
            >
              {t.spotsResetBtn}
            </button>
          )}
        </div>

        {filteredSpots.length === 0 ? (
          <div className="portal-card p-10 text-center space-y-3 text-slate-500">
            <FaFilter className="mx-auto text-3xl text-slate-300" />
            <p className="font-bold text-sm">{t.spotsEmpty}</p>
            <button
              type="button"
              onClick={resetMapFilters}
              className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
            >
              {t.spotsResetBtn}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSpots.map((spot) => {
              const zone = zoneMap[spot.zoneId];
              const isHighlighted = selectedSpotId === spot.id;
              return (
                <article
                  id={`spot-${spot.id}`}
                  key={spot.id}
                  className={`scroll-mt-28 group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border transition-all duration-300 flex flex-col lg:flex-row ${
                    isHighlighted
                      ? 'border-cyan-500 ring-2 ring-cyan-500/30 shadow-lg'
                      : 'border-slate-200/80 hover:shadow-lg'
                  }`}
                >
                  {/* Left Photo */}
                  <div className="relative lg:w-2/5 h-60 lg:h-auto min-h-[260px] overflow-hidden flex-shrink-0 bg-slate-900">
                    <img
                      src={spot.image}
                      alt={spot.title[activeLocale]}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-slate-900/90 text-cyan-300 rounded-full text-[11px] font-extrabold border border-white/20">
                        {t.zonePrefix} {zone.code}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold border shadow ${getSpotCategoryStyles(
                          spot.category
                        )}`}
                      >
                        {categoryBadgeText(spot.category)}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                      <h3 className="text-lg font-extrabold leading-tight">
                        {spot.title[activeLocale]}
                      </h3>
                      <p className="text-xs text-cyan-200 font-semibold mt-0.5">
                        {spot.subtitle[activeLocale]}
                      </p>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="p-6 md:p-7 flex-grow flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <div className="hidden lg:block">
                        <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-cyan-700 mb-1">
                          {t.zonePrefix} {zone.code} · {zone.title[activeLocale]}
                        </span>
                        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                          {spot.title[activeLocale]}
                        </h3>
                        <p className="text-sm font-semibold text-cyan-700 mt-1">
                          {spot.subtitle[activeLocale]}
                        </p>
                      </div>

                      {/* 3-Column Metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.spotMetricMethod}
                          </span>
                          <strong className="text-slate-900 font-extrabold">
                            {spot.depthOrMethod[activeLocale]}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.spotMetricLevel}
                          </span>
                          <strong className="text-cyan-700 font-extrabold">
                            {spot.level[activeLocale]}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.spotMetricSeason}
                          </span>
                          <strong className="text-slate-900 font-extrabold">
                            {spot.visibilityOrSeason[activeLocale]}
                          </strong>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {spot.description[activeLocale]}
                      </p>

                      {/* Highlights */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <FaStar className="text-amber-500" /> {t.spotHighlightsLabel}
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-600 font-medium">
                          {spot.highlights[activeLocale].map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Law & Safety Callout */}
                      <div
                        className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs font-medium ${
                          spot.category === 'restricted'
                            ? 'bg-rose-50 border-rose-200 text-rose-950'
                            : 'bg-amber-50/80 border-amber-200/80 text-amber-950'
                        }`}
                      >
                        <FaExclamationTriangle
                          className={`flex-shrink-0 mt-0.5 ${
                            spot.category === 'restricted' ? 'text-rose-600' : 'text-amber-600'
                          }`}
                        />
                        <div>
                          <strong className="font-bold">{t.spotLawLabel}</strong>{' '}
                          {spot.lawAndSafetyNote[activeLocale]}
                        </div>
                      </div>

                      {/* Clickable Species Chips */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-500 mr-1">
                          {t.spotSpeciesLabel}
                        </span>
                        {spot.speciesIds.map((spId) => {
                          const sp = speciesMap[spId];
                          if (!sp) return null;
                          return (
                            <button
                              key={spId}
                              type="button"
                              onClick={() => setModalSpecies(sp)}
                              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-400 text-[11px] font-bold text-slate-800 transition-colors"
                            >
                              {sp.name[activeLocale]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
                      <a
                        href="#map-zones"
                        onClick={() => setSelectedSpotId(spot.id)}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                      >
                        {t.spotShowOnMap}
                      </a>
                      <a
                        href={spot.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
                      >
                        <FaExternalLinkAlt size={10} /> {t.spotOpenGmaps}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. Regulations & Safety Cards (2026) */}
      <section id="laws" className="scroll-mt-28 space-y-6">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaInfoCircle /> {t.lawsEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.lawsTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.lawsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {REGULATIONS_2026.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl border-2 border-slate-900 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className={`px-5 py-3.5 ${getLawCardHeaderClass(card.tone)}`}>
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
                      <span className="w-2 h-2 rounded-full bg-cyan-600 flex-shrink-0 mt-1.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-semibold">{t.officialSourceLabel}</span>
                <a
                  href={card.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-cyan-700 hover:underline inline-flex items-center gap-1"
                >
                  {card.sourceLabel} <FaExternalLinkAlt size={9} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Species Detail Modal */}
      {modalSpecies && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setModalSpecies(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={modalSpecies.name[activeLocale]}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-72 bg-slate-900">
              <img
                src={modalSpecies.image}
                alt={modalSpecies.name[activeLocale]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

              <button
                type="button"
                onClick={() => setModalSpecies(null)}
                aria-label={t.modalClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/20"
              >
                <FaTimes size={14} />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                      getStatusStyles(modalSpecies.status).badge
                    }`}
                  >
                    {statusBadgeText(modalSpecies.status)}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold">
                    TR: {modalSpecies.trLocalName}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  {modalSpecies.name[activeLocale]}
                </h3>
                <p className="text-xs sm:text-sm italic text-cyan-200 font-semibold">
                  {modalSpecies.latinName}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">{t.metricMinSize}</span>
                  <strong className="text-slate-900 font-extrabold">
                    {modalSpecies.minSizeNote[activeLocale]}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">{t.metricLimit}</span>
                  <strong className="text-slate-900 font-extrabold">
                    {modalSpecies.dailyLimit[activeLocale]}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">{t.metricDepth}</span>
                  <strong className="text-cyan-700 font-extrabold">
                    {modalSpecies.depthRangeM}
                  </strong>
                </div>
              </div>

              {/* Closed Season Banner */}
              <div
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-start gap-2.5 ${
                  getStatusStyles(modalSpecies.status).banner
                }`}
              >
                {getStatusStyles(modalSpecies.status).icon}
                <span>{modalSpecies.closedSeason[activeLocale]}</span>
              </div>

              {/* 12-Month Activity Strip */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  {t.modalSeasonActivity}
                </h4>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                  {t.monthShortNames.map((mName, idx) => {
                    const mNum = idx + 1;
                    const active = modalSpecies.bestMonths.includes(mNum);
                    return (
                      <div
                        key={mName}
                        className={`py-1.5 rounded-lg text-center text-[11px] font-bold border ${
                          active
                            ? 'bg-cyan-600 text-white border-cyan-700'
                            : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                      >
                        {mName}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Structured Info Blocks */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 mb-1">
                    {t.modalHabitat}
                  </h4>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {modalSpecies.habitat[activeLocale]}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 mb-1">
                    {t.modalTip}
                  </h4>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {modalSpecies.catchingOrSpottingTip[activeLocale]}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-1">
                    {t.modalSafetyOrFood}
                  </h4>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {modalSpecies.culinaryOrDangerNote[activeLocale]}
                  </p>
                </div>
              </div>

              {/* Wikimedia Attribution & Close */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <a
                  href={modalSpecies.imageAttribution.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-cyan-700 underline inline-flex items-center gap-1"
                >
                  <span>
                    {t.modalPhotoCredit} {modalSpecies.imageAttribution.artist} (
                    {modalSpecies.imageAttribution.license})
                  </span>
                  <FaExternalLinkAlt size={9} />
                </a>

                <button
                  type="button"
                  onClick={() => setModalSpecies(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-700 text-white font-bold text-xs transition-colors"
                >
                  {t.modalClose}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
