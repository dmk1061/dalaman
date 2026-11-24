"use client";

import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaAward,
  FaBalanceScale,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCoins,
  FaCompass,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRoute,
  FaSearchPlus,
  FaShieldAlt,
  FaShoppingBag,
  FaStore,
  FaSuitcase,
  FaTags,
  FaTimesCircle,
  FaUtensils,
} from 'react-icons/fa';
import MarketsCrafts3DMap from './MarketsCrafts3DMap';
import {
  BAZAAR_DISTRICTS,
  CRAFT_TREASURES,
  CUSTOMS_SAFETY_RULES_2026,
  MARKET_HOUR_SLOTS,
  MARKET_MAP_POINTS,
  MARKET_ZONE_PRESETS,
  WEEKLY_MARKETS_SCHEDULE,
  type CraftCategoryId,
  type CustomsSafetyRule,
  type DayOfWeekId,
  type LocaleCode,
  type MarketMapPointKind,
  type MarketZoneId,
} from '@/lib/markets-crafts';

type ItemCategory = 'food-produce' | 'textile-craft' | 'stone-antique';
type VenueType = 'weekly-pazar' | 'old-bazaar' | 'mall-supermarket' | 'street-beach';
type LuggageMode = 'carry-on' | 'checked-bag';

interface DayTabMeta {
  id: DayOfWeekId;
  short: Record<LocaleCode, string>;
  full: Record<LocaleCode, string>;
}

const DAY_TABS: DayTabMeta[] = [
  {
    id: 'mon',
    short: { ru: 'Пн', en: 'Mon', de: 'Mo', tr: 'Pzt' },
    full: { ru: 'Понедельник', en: 'Monday', de: 'Montag', tr: 'Pazartesi' },
  },
  {
    id: 'tue',
    short: { ru: 'Вт', en: 'Tue', de: 'Di', tr: 'Sal' },
    full: { ru: 'Вторник', en: 'Tuesday', de: 'Dienstag', tr: 'Salı' },
  },
  {
    id: 'wed',
    short: { ru: 'Ср', en: 'Wed', de: 'Mi', tr: 'Çar' },
    full: { ru: 'Среда', en: 'Wednesday', de: 'Mittwoch', tr: 'Çarşamba' },
  },
  {
    id: 'thu',
    short: { ru: 'Чт', en: 'Thu', de: 'Do', tr: 'Per' },
    full: { ru: 'Четверг', en: 'Thursday', de: 'Donnerstag', tr: 'Perşembe' },
  },
  {
    id: 'fri',
    short: { ru: 'Пт', en: 'Fri', de: 'Fr', tr: 'Cum' },
    full: { ru: 'Пятница', en: 'Friday', de: 'Freitag', tr: 'Cuma' },
  },
  {
    id: 'sat',
    short: { ru: 'Сб', en: 'Sat', de: 'Sa', tr: 'Cmt' },
    full: { ru: 'Суббота', en: 'Saturday', de: 'Samstag', tr: 'Cumartesi' },
  },
  {
    id: 'sun',
    short: { ru: 'Вс', en: 'Sun', de: 'So', tr: 'Paz' },
    full: { ru: 'Воскресенье', en: 'Sunday', de: 'Sonntag', tr: 'Pazar' },
  },
];

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

interface HubCopy {
  cashShieldTitle: string;
  cashShieldDesc: string;
  calEyebrow: string;
  calTitle: string;
  calSubtitle: string;
  allDaysBtn: string;
  hoursLabel: string;
  haggleYesBadge: string;
  haggleFixedBadge: string;
  showOnMapBtn: string;
  gmapsBtn: string;
  mapEyebrow: string;
  mapTitle: string;
  mapSubtitle: string;
  allZonesBtn: string;
  allZonesCode: string;
  allZonesSub: string;
  quickPinsTitle: string;
  selectedCoordsLabel: string;
  resetZoomBtn: string;
  gmapsRouteBtn: string;
  mapKindLabels: Record<MarketMapPointKind, string>;
  craftsEyebrow: string;
  craftsTitle: string;
  craftsSubtitle: string;
  craftFilters: Record<CraftCategoryId, string>;
  verifyRealLabel: string;
  avoidFakeLabel: string;
  districtsEyebrow: string;
  districtsTitle: string;
  districtsSubtitle: string;
  scheduleTagLabel: string;
  bargainTagLabel: string;
  bestTimeTagLabel: string;
  distanceTagLabel: string;
  highlightsLabel: string;
  timingCheckerEyebrow: string;
  timingCheckerTitle: string;
  timingCheckerSubtitle: string;
  curveTitle: string;
  curveFreshLegend: string;
  curveDiscountLegend: string;
  curveBestPeak: string;
  curveClickHint: string;
  crowdLabel: string;
  bestForLabel: string;
  insiderTipLabel: string;
  checkerTitle: string;
  checkerSubtitle: string;
  checkerItemLabel: string;
  checkerVenueLabel: string;
  checkerLuggageLabel: string;
  itemOpts: { id: ItemCategory; label: string }[];
  venueOpts: { id: VenueType; label: string }[];
  luggageOpts: { id: LuggageMode; label: string }[];
  verdictStop: string;
  verdictCaution: string;
  verdictReady: string;
  checkerFocusBtn: string;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerDesc: string;
  btnCurrency: string;
  btnGastronomy: string;
  btnGlossary: string;
  btnThermal: string;
  rulesEyebrow: string;
  rulesTitle: string;
  rulesSubtitle: string;
  sourceLabel: string;
}

const HUB_COPY: Record<LocaleCode, HubCopy> = {
  ru: {
    cashShieldTitle: 'Главное правило рынков и таможни 2026: наличные мелкие лиры + Закон № 2863',
    cashShieldDesc:
      'В деревнях Ортаджа, Кёйджегиз и Ешилюзюмлю фермеры берут только наличные 50/100/200 TRY; мёд и оливковое масло >100 мл сдавайте только в багаж DLM; а вывоз любых античных монет, черепков амфор и камней строго запрещён законом.',
    calEyebrow: 'РАСПИСАНИЕ ПО ДНЯМ НЕДЕЛИ · ПН — ВС',
    calTitle: 'Календарь еженедельных рынков (Pazar): куда ехать сегодня',
    calSubtitle:
      'Выберите день недели — каждый город побережья от Датчи до Каша принимает кочующий рынок строго в свой день. За овощами лучше приезжать в 08:30, за текстилем — после 14:30.',
    allDaysBtn: 'Все дни (16)',
    hoursLabel: 'Часы',
    haggleYesBadge: 'Торг 25–35% (текстиль)',
    haggleFixedBadge: 'Фикс. цена (еда/весы)',
    showOnMapBtn: 'На 3D-карте ↑',
    gmapsBtn: 'Google Maps',
    mapEyebrow: 'ЖИВАЯ 3D-КАРТА ПОБЕРЕЖЬЯ',
    mapTitle: 'Интерактивная 3D-карта 15 рынков, старых базаров и деревень ремёсел',
    mapSubtitle:
      'Изначально открыт весь регион Датча — Каш с подсвеченными геометками: нажмите на ближайший город, чип рынка или «Ближайший (GPS)», чтобы приблизить 3D-макет. Переключайте вид: 3D-Макет, Спутник 2D или Топокарта.',
    allZonesBtn: 'Весь регион (15)',
    allZonesCode: 'ВСЁ ПОБЕРЕЖЬЕ',
    allZonesSub: 'Обзор Датча — Каш',
    quickPinsTitle: 'Быстрый подлёт к геометкам на 3D-макете',
    selectedCoordsLabel: 'GPS-координаты',
    resetZoomBtn: 'Весь регион (отдалить)',
    gmapsRouteBtn: 'Маршрут в Google Maps',
    mapKindLabels: {
      'weekly-pazar': 'Еженедельный рынок',
      'old-bazaar': 'Старый базар / улочка',
      'craft-village': 'Деревня ремёсел',
      'mall-avm': 'ТЦ без торга (AVM)',
    },
    craftsEyebrow: 'АВТЕНТИЧНЫЕ РЕМЁСЛА И ГАСТРО-СУВЕНИРЫ',
    craftsTitle: '8 настоящих сокровищ Ликии и Карии: как отличить от подделки',
    craftsSubtitle:
      'Сравните оригинальные изделия (ткань дастар из Ешилюзюмлю, 100% пештемаль, килимы с бахромой основы, масло сыгла, сосновый мёд и керамика Каша) по 5-секундному тесту качества.',
    craftFilters: {
      all: 'Все товары (8)',
      'textile-craft': 'Ткани и ковры (3)',
      'food-honey': 'Мёд, масло и дары (4)',
      'ceramic-art': 'Керамика и галереи (1)',
    },
    verifyRealLabel: 'КАК ПРОВЕРИТЬ ОРИГИНАЛ',
    avoidFakeLabel: 'ОСТЕРЕГАЙТЕСЬ ПОДДЕЛКИ',
    districtsEyebrow: 'ГЛАВНЫЕ ТОРГОВЫЕ КВАРТАЛЫ И АТМОСФЕРА',
    districtsTitle: '4 знаковых места для шопинга: от Паспатура до ТЦ Erasta AVM',
    districtsSubtitle:
      'Где искать вечерние улочки под зонтиками, женские ткацкие кооперативы в горах, свежий фисташковый лукум на развес и качественные турецкие бренды с чеком и Tax-Free.',
    scheduleTagLabel: 'Режим',
    bargainTagLabel: 'Торг / Оплата',
    bestTimeTagLabel: 'Лучший час',
    distanceTagLabel: 'Логистика',
    highlightsLabel: 'Что важно знать на месте',
    timingCheckerEyebrow: 'ТАЙМИНГ БАЗАРА И ПРОВЕРКА ПОКУПОК',
    timingCheckerTitle: 'Во сколько идти на базар + Чекер торга и таможни DLM',
    timingCheckerSubtitle:
      'Интерактивный график падения свежести и роста скидок с 08:30 до 17:00, а справа — мгновенная проверка: уместен ли торг, нужны ли наличные лиры и пропустит ли товар досмотр в аэропорту.',
    curveTitle: 'Кривая дня на турецком рынке: свежесть vs готовность к торгу',
    curveFreshLegend: 'Свежесть продуктов (%)',
    curveDiscountLegend: 'Гибкость торга и скидок (%)',
    curveBestPeak: '08:30 — отборная еда · 14:30 — лучший торг',
    curveClickHint: 'Нажмите на час или точку графика',
    crowdLabel: 'Обстановка',
    bestForLabel: 'Что брать в этот час',
    insiderTipLabel: 'Совет инсайдера',
    checkerTitle: 'Быстрый чекер: торг, карта или наличные, багаж DLM',
    checkerSubtitle: 'Выберите товар, формат точки и ваш тип багажа на обратный вылет.',
    checkerItemLabel: '1. Что планируете купить?',
    checkerVenueLabel: '2. Где покупаете?',
    checkerLuggageLabel: '3. Как везёте в аэропорту DLM?',
    itemOpts: [
      { id: 'food-produce', label: 'Еда, мёд, масло, специи' },
      { id: 'textile-craft', label: 'Текстиль, ковёр, керамика' },
      { id: 'stone-antique', label: '«Античный» камень / монета' },
    ],
    venueOpts: [
      { id: 'weekly-pazar', label: 'Рынок по дням (Pazar)' },
      { id: 'old-bazaar', label: 'Старый базар / Галерея' },
      { id: 'mall-supermarket', label: 'ТЦ Erasta / Migros / BİM' },
      { id: 'street-beach', label: 'Пляж / С рук на улице' },
    ],
    luggageOpts: [
      { id: 'carry-on', label: 'Только ручная кладь' },
      { id: 'checked-bag', label: 'Есть сдаваемый чемодан' },
    ],
    verdictStop: '⛔ СТОП: НАРУШЕНИЕ ЗАКОНА № 2863',
    verdictCaution: '⚠️ ОСТОРОЖНО: ВАЖНЫЕ НЮАНСЫ',
    verdictReady: '✅ ОТЛИЧНЫЙ ПЛАН ПОКУПКИ',
    checkerFocusBtn: 'Показать точку на 3D-карте ↑',
    bannerEyebrow: 'ПОЛЕЗНЫЕ МАТЕРИАЛЫ ПОРТАЛА',
    bannerTitle: 'Курс лиры без обмана, турецкая кухня и разговорник для базара',
    bannerDesc:
      'Чтобы не переплачивать на терминалах DCC и уверенно торговаться словом «Ne kadar?», загляните в наши соседние гиды — там собраны реальные курсы, советы по картам и словарь.',
    btnCurrency: 'Обмен валют и карты TRY',
    btnGastronomy: 'Гастрогид: что пробовать',
    btnGlossary: 'Разговорник для рынка',
    btnThermal: 'Термы, грязи и хаммамы',
    rulesEyebrow: 'ЗАКОНЫ, ТАМОЖНЯ И БЕЗОПАСНАЯ ОПЛАТА',
    rulesTitle: '4 критических правила покупателя перед вылетом из Даламана',
    rulesSubtitle:
      'Сохраните эти требования: Закон № 2863 о древностях, упаковка жидкостей в жестяные банки и правила отказа от невыгодной конвертации DCC.',
    sourceLabel: 'Официальная база',
  },
  en: {
    cashShieldTitle: '2026 Market & Customs Golden Rule: Small TRY Notes + Law No. 2863',
    cashShieldDesc:
      'Village farmers across Ortaca, Köyceğiz & Yeşilüzümlü are cash-only (pack 50/100/200 TRY bills); honey & olive oil over 100 ml travel strictly in DLM checked luggage; and taking antique shards, coins or beach rocks is a criminal offense.',
    calEyebrow: 'WEEKLY PAZAR CALENDAR · MON — SUN',
    calTitle: 'Coastal Market Schedule: Where Open-Air Bazaars Happen Today',
    calSubtitle:
      'Filter by day of the week—each town from Datça to Kaş hosts its roving bazaar on a dedicated municipal day. Shop food at 08:30; negotiate textiles gently after 14:30.',
    allDaysBtn: 'All Days (16)',
    hoursLabel: 'Hours',
    haggleYesBadge: 'Haggle 25–35% (Textiles)',
    haggleFixedBadge: 'Fixed Tag (Produce)',
    showOnMapBtn: 'Locate on 3D Map ↑',
    gmapsBtn: 'Google Maps',
    mapEyebrow: 'INTERACTIVE 3D COASTAL MAP',
    mapTitle: 'Live 3D Map of 15 Markets, Old Bazaars & Craft Villages',
    mapSubtitle:
      'Starts with an overview of the entire Datça–Kaş coast with highlighted pins: click any town, quick market chip below, or "Nearest (GPS)" to zoom cleanly into the 3D terrain model.',
    allZonesBtn: 'Full Coast (15)',
    allZonesCode: 'FULL OVERVIEW',
    allZonesSub: 'Datça — Kaş pins',
    quickPinsTitle: 'Fly directly to any market pin on the 3D model',
    selectedCoordsLabel: 'GPS Coordinates',
    resetZoomBtn: 'Full Region (Zoom Out)',
    gmapsRouteBtn: 'Directions in Google Maps',
    mapKindLabels: {
      'weekly-pazar': 'Weekly Pazar',
      'old-bazaar': 'Historic Bazaar',
      'craft-village': 'Craft Village',
      'mall-avm': 'Fixed-Tag AVM',
    },
    craftsEyebrow: 'AUTHENTIC REGIONAL CRAFTS & EDIBLES',
    craftsTitle: '8 Signature Treasures of Lycia & Caria: Verify Real vs Fake',
    craftsSubtitle:
      'Master quick hands-on authenticity checks for Yeşilüzümlü *dastar* hand-weaving, 100% cotton *peştemals*, Yörük kilims, pure *sığla* balm, pine honey & Kaş ceramics.',
    craftFilters: {
      all: 'All Items (8)',
      'textile-craft': 'Looms & Rugs (3)',
      'food-honey': 'Honey, Oil & Almonds (4)',
      'ceramic-art': 'Studio Ceramics (1)',
    },
    verifyRealLabel: 'HOW TO VERIFY AUTHENTIC',
    avoidFakeLabel: 'SPOT TOURIST FAKES',
    districtsEyebrow: 'ICONIC SHOPPING QUARTERS & MALLS',
    districtsTitle: '4 Signature Shopping Experiences: Paspatur to Erasta AVM',
    districtsSubtitle:
      'Balance lantern-lit old alleys and mountain weaving cooperatives with loose pistachio *lokum* counters and fixed-price Tax-Free malls.',
    scheduleTagLabel: 'Open',
    bargainTagLabel: 'Haggling / Pay',
    bestTimeTagLabel: 'Prime Window',
    distanceTagLabel: 'Access',
    highlightsLabel: 'Smart Shopper Notes',
    timingCheckerEyebrow: 'BAZAAR TIMING & CUSTOMS COMPLIANCE',
    timingCheckerTitle: 'Best Hour to Shop + Interactive Haggling & DLM Customs Checker',
    timingCheckerSubtitle:
      'Inspect how orchard freshness fades while bargaining leverage climbs from 08:30 to 17:00—then test your exact item, venue & luggage mode before buying.',
    curveTitle: 'Market Day Curve: Freshness vs Bargaining Leverage',
    curveFreshLegend: 'Orchard Freshness (%)',
    curveDiscountLegend: 'Haggling / Markdown Flex (%)',
    curveBestPeak: '08:30 Finest Food · 14:30 Best Haggle',
    curveClickHint: 'Select any time slot or SVG point',
    crowdLabel: 'Vibe & Crowds',
    bestForLabel: 'Top Pick at This Hour',
    insiderTipLabel: 'Local Insider Tip',
    checkerTitle: 'Instant Buyer, Haggling & DLM Customs Readiness Checker',
    checkerSubtitle: 'Combine item type, shopping venue & flight bag setup below.',
    checkerItemLabel: '1. What are you buying?',
    checkerVenueLabel: '2. Where are you buying it?',
    checkerLuggageLabel: '3. Flight bag setup (DLM)?',
    itemOpts: [
      { id: 'food-produce', label: 'Fruit, Honey, Oil, Spices' },
      { id: 'textile-craft', label: 'Peştemal, Kilim, Ceramics' },
      { id: 'stone-antique', label: '"Old" Coin / Shard / Stone' },
    ],
    venueOpts: [
      { id: 'weekly-pazar', label: 'Weekly Outdoor Pazar' },
      { id: 'old-bazaar', label: 'Old Town / Craft Studio' },
      { id: 'mall-supermarket', label: 'Erasta Mall / Migros / BİM' },
      { id: 'street-beach', label: 'Unlicensed Peddler / Beach' },
    ],
    luggageOpts: [
      { id: 'carry-on', label: 'Cabin Carry-On Only' },
      { id: 'checked-bag', label: 'Checked Suitcase' },
    ],
    verdictStop: '⛔ STOP: ILLEGAL UNDER LAW NO. 2863',
    verdictCaution: '⚠️ CAUTION: PACKING OR QUALITY CHECK',
    verdictReady: '✅ SMART & COMPLIANT PURCHASE',
    checkerFocusBtn: 'Pin Best Location on 3D Map ↑',
    bannerEyebrow: 'CONNECTED GUIDE RESOURCES',
    bannerTitle: 'Avoid Card DCC Traps, Decode Turkish Food & Haggle Like a Local',
    bannerDesc:
      'Pair your shopping run with our currency/TRY card guide, gastronomy picks, and local market phrases—or unwind afterward in regional thermal springs.',
    btnCurrency: 'TRY Cash & Card Fees',
    btnGastronomy: 'Regional Gastronomy Guide',
    btnGlossary: 'Market Turkish Phrasebook',
    btnThermal: 'Hot Springs & Hammams',
    rulesEyebrow: 'TURKISH LAW, DLM BAGGAGE & SMART PAYMENTS',
    rulesTitle: '4 Critical Buyer Rules Before Heading to Dalaman Airport',
    rulesSubtitle:
      'Protect your trip with Antiquities Law No. 2863, liquid packing in metal tins, polite 25–35% *pazarlık* boundaries, and refusing EUR/USD DCC terminal conversions.',
    sourceLabel: 'Verified Source',
  },
  de: {
    cashShieldTitle: 'Markt- & Zoll-Grundregel 2026: Kleine TRY-Scheine + Gesetz Nr. 2863',
    cashShieldDesc:
      'Dorf-Bauern in Ortaca, Köyceğiz & Yeşilüzümlü akzeptieren oft nur Bargeld (50/100/200 TRY); Honig & Olivenöl >100 ml gehören ins Aufgabegepäck; antike Münzen, Scherben & Steine unterliegen strengstem Ausfuhrverbot.',
    calEyebrow: 'WOCHENMARKT-KALENDER · MO — SO',
    calTitle: 'Wochenmärkte (Pazar) an der Küste: Welcher Markt heute öffnet',
    calSubtitle:
      'Wählen Sie Ihren Wochentag—jede Stadt von Datça bis Kaş hat ihren festen Markttag. Obst & Honig um 08:30 Uhr kaufen, Textil-Feilschen am besten ab 14:30 Uhr.',
    allDaysBtn: 'Alle Tage (16)',
    hoursLabel: 'Zeit',
    haggleYesBadge: 'Handeln 25–35 % (Textil)',
    haggleFixedBadge: 'Festpreis (Obst/Kilo)',
    showOnMapBtn: 'Auf 3D-Karte ↑',
    gmapsBtn: 'Google Maps',
    mapEyebrow: 'INTERAKTIVE 3D-KÜSTENKARTE',
    mapTitle: 'Live 3D-Karte: 15 Wochenmärkte, Altstadt-Basare & Handwerksdörfer',
    mapSubtitle:
      'Startet mit dem Überblick über die gesamte Küste (Datça bis Kaş) mit markierten Pins: Klicken Sie auf eine Stadt, einen Schnell-Chip unten oder „Nächster (GPS)“, um ins 3D-Modell heranzuzoomen.',
    allZonesBtn: 'Ganze Küste (15)',
    allZonesCode: 'ÜBERSICHT',
    allZonesSub: 'Datça bis Kaş',
    quickPinsTitle: 'Direkt zu einem Markt-Pin im 3D-Modell zoomen',
    selectedCoordsLabel: 'GPS-Koordinaten',
    resetZoomBtn: 'Ganze Region (Rauszoomen)',
    gmapsRouteBtn: 'Route in Google Maps',
    mapKindLabels: {
      'weekly-pazar': 'Wochenmarkt',
      'old-bazaar': 'Altstadt-Basar',
      'craft-village': 'Handwerksdorf',
      'mall-avm': 'Festpreis-Mall',
    },
    craftsEyebrow: 'ECHTES HANDWERK & DELIKATESSEN',
    craftsTitle: '8 Authentische Schätze Lykiens & Kariens: Echt vs. Kopie',
    craftsSubtitle:
      'So erkennen Sie echtes *Dastar*-Leinen aus Yeşilüzümlü, *100 % Pamuk*-Peştemals, geknüpfte Yörük-Kelims, *Sığla*-Öl, Pinienhonig und Künstler-Keramik aus Kaş.',
    craftFilters: {
      all: 'Alle Artikel (8)',
      'textile-craft': 'Textil & Kelim (3)',
      'food-honey': 'Honig, Öl & Mandeln (4)',
      'ceramic-art': 'Keramik & Studios (1)',
    },
    verifyRealLabel: 'SO ERKENNEN SIE ORIGINALE',
    avoidFakeLabel: 'WARNUNG VOR KOPIEN',
    districtsEyebrow: 'EINKAUFSVIERTEL & FESTPREIS-MALLS',
    districtsTitle: '4 Charaktervolle Shopping-Ziele: Von Paspatur bis Erasta AVM',
    districtsSubtitle:
      'Schattige Basargassen, Berg-Webereien, loser Pistazien-Lokum an der Theke und klimatisierte Markenshops mit Tax-Free.',
    scheduleTagLabel: 'Zeiten',
    bargainTagLabel: 'Handeln / Zahlung',
    bestTimeTagLabel: 'Beste Zeit',
    distanceTagLabel: 'Anfahrt',
    highlightsLabel: 'Praxis-Hinweise',
    timingCheckerEyebrow: 'MARKT-TIMING & ZOLL-CHECK',
    timingCheckerTitle: 'Optimale Marktzeit + Interaktiver Preis- & Zoll-Check DLM',
    timingCheckerSubtitle:
      'Vergleichen Sie Frische und Verhandlungsspielraum von 08:30 bis 17:00 Uhr und prüfen Sie Ihren Einkauf vorab auf Zoll- und Gepäcktauglichkeit.',
    curveTitle: 'Tageskurve auf dem Wochenmarkt: Frische vs. Rabatt-Spielraum',
    curveFreshLegend: 'Produkt-Frische (%)',
    curveDiscountLegend: 'Handelsspielraum / Rabatte (%)',
    curveBestPeak: '08:30 Top-Obst · 14:30 Beste Textil-Preise',
    curveClickHint: 'Stunde oder Kurvenpunkt antippen',
    crowdLabel: 'Atmosphäre',
    bestForLabel: 'Ideal zu dieser Stunde',
    insiderTipLabel: 'Insider-Tipp',
    checkerTitle: 'Schnell-Check: Feilschen, Kartenzahlung & Flughafen-Zoll',
    checkerSubtitle: 'Wählen Sie Warenart, Kaufort und Ihr Gepäck für den Rückflug.',
    checkerItemLabel: '1. Was möchten Sie kaufen?',
    checkerVenueLabel: '2. Wo kaufen Sie ein?',
    checkerLuggageLabel: '3. Wie fliegen Sie ab DLM?',
    itemOpts: [
      { id: 'food-produce', label: 'Obst, Honig, Olivenöl, Gewürze' },
      { id: 'textile-craft', label: 'Peştemal, Kelim, Keramik' },
      { id: 'stone-antique', label: '„Antike“ Münze / Scherbe / Stein' },
    ],
    venueOpts: [
      { id: 'weekly-pazar', label: 'Wochenmarkt (Pazar)' },
      { id: 'old-bazaar', label: 'Altstadt-Basar / Atelier' },
      { id: 'mall-supermarket', label: 'Erasta Mall / Migros / BİM' },
      { id: 'street-beach', label: 'Fliegender Händler / Strand' },
    ],
    luggageOpts: [
      { id: 'carry-on', label: 'Nur Handgepäck' },
      { id: 'checked-bag', label: 'Aufgabegepäck vorhanden' },
    ],
    verdictStop: '⛔ STOPP: VERBOTEN NACH GESETZ NR. 2863',
    verdictCaution: '⚠️ ACHTUNG: GEPÄCK- / QUALITÄTSHINWEIS',
    verdictReady: '✅ ALLES OPTIMAL GEPLANT',
    checkerFocusBtn: 'Passenden Ort auf 3D-Karte zeigen ↑',
    bannerEyebrow: 'WEITERFÜHRENDE GUIDE-THEMEN',
    bannerTitle: 'TRY-Zahlungstipps, Türkische Küche & Markt-Sprachführer',
    bannerDesc:
      'Vermeiden Sie DCC-Kartenaufschläge, lernen Sie die besten regionalen Delikatessen kennen oder entspannen Sie nach dem Marktbummel in einer Thermalquelle.',
    btnCurrency: 'Geldwechsel & Karten (TRY)',
    btnGastronomy: 'Kulinarik-Guide',
    btnGlossary: 'Türkisch-Glossar',
    btnThermal: 'Thermen & Hamams',
    rulesEyebrow: 'ZOLLRECHT, FLUGGEPÄCK & BEZAHLUNG',
    rulesTitle: '4 Wichtige Käuferregeln vor dem Rückflug ab Dalaman',
    rulesSubtitle:
      'Denkmalschutzgesetz Nr. 2863, flüssige Souvenirs im Metallkanister, faires *Pazarlık*-Feilschen und Abrechnung in TRY statt EUR.',
    sourceLabel: 'Offizielle Quelle',
  },
  tr: {
    cashShieldTitle: '2026 Pazar ve Gümrük Altın Kuralı: Bozuk TL Nakit + 2863 Sayılı Kanun',
    cashShieldDesc:
      'Ortaca, Köyceğiz ve Yeşilüzümlü köylü pazarlarında POS cihazı bulunmayabilir (yanınızda 50/100/200 ₺ bulundurun); 100 ml üzeri bal ve zeytinyağını uçak altı bagaja verin; eski sikke veya denizden çıkan antik taş parçaları kesinlikle yasaktır.',
    calEyebrow: 'HAFTALIK SEMT PAZARLARI · PZT — PAZ',
    calTitle: 'Günlere Göre Kıyı Pazarları Takvimi: Bugün Nerede Pazar Var?',
    calSubtitle:
      'Haftanın gününü seçin—Datça’dan Kaş’a her ilçenin kendine ait bir pazar günü vardır. Taze meyve için 08:30, tekstil pazarlığı için 14:30 sonrası idealdir.',
    allDaysBtn: 'Tüm Günler (16)',
    hoursLabel: 'Saat',
    haggleYesBadge: 'Tekstil Pazarlığı (%25–35)',
    haggleFixedBadge: 'Etiket Fiyatı (Gıda/Kilo)',
    showOnMapBtn: '3D Haritada Gör ↑',
    gmapsBtn: 'Google Haritalar',
    mapEyebrow: 'CANLI 3D KIYI HARİTASI',
    mapTitle: '15 Semt Pazarı, Tarihî Çarşı ve El Sanatı Köyü — 3D Harita',
    mapSubtitle:
      'Harita başlangıçta tüm Datça–Kaş kıyı şeridini işaretli pinlerle gösterir: 3D modele yaklaşmak için bir ilçe, aşağıdaki hızlı nokta etiketi veya «En Yakın (GPS)» düğmesine tıklayın.',
    allZonesBtn: 'Tüm Kıyı (15)',
    allZonesCode: 'GENEL BAKIŞ',
    allZonesSub: 'Datça — Kaş arası',
    quickPinsTitle: '3D haritadaki pazar noktalarına hızlı yakınlaşın',
    selectedCoordsLabel: 'GPS Koordinatları',
    resetZoomBtn: 'Tüm Bölge (Uzaklaş)',
    gmapsRouteBtn: 'Google Haritalar Yol Tarifi',
    mapKindLabels: {
      'weekly-pazar': 'Semt Pazarı',
      'old-bazaar': 'Tarihî Çarşı',
      'craft-village': 'Zanaat Köyü',
      'mall-avm': 'Sabit Fiyat AVM',
    },
    craftsEyebrow: 'COĞRAFİ İŞARETLİ VE ÖZGÜN ÜRÜNLER',
    craftsTitle: 'Likya & Karya’nın 8 Gerçek Değeri: Taklitten Nasıl Ayırt Edilir?',
    craftsSubtitle:
      'Yeşilüzümlü *dastar* dokuması, %100 pamuk peştemal, Yörük kilimi, endemik sığla yağı, çam balı ve Kaş seramikleri için 5 saniyelik gerçeklik kontrolü.',
    craftFilters: {
      all: 'Tüm Ürünler (8)',
      'textile-craft': 'Dokuma & Kilim (3)',
      'food-honey': 'Bal, Zeytinyağı & Badem (4)',
      'ceramic-art': 'Seramik & Atölye (1)',
    },
    verifyRealLabel: 'GERÇEĞİ NASIL ANLAŞILIR',
    avoidFakeLabel: 'SAHTE ÜRÜN UYARISI',
    districtsEyebrow: 'ÖNE ÇIKAN ÇARŞILAR VE AVM’LER',
    districtsTitle: '4 Karakteristik Alışveriş Rotası: Paspatur’dan Erasta AVM’ye',
    districtsSubtitle:
      'Şemsiyeli eski çarşı sokaklarını, dağ köylerindeki kadın kooperatiflerini, kilo ile taze fıstıklı lokum pastanelerini ve faturalı AVM mağazalarını keşfedin.',
    scheduleTagLabel: 'Açık Saat',
    bargainTagLabel: 'Pazarlık / Ödeme',
    bestTimeTagLabel: 'En İyi Zaman',
    distanceTagLabel: 'Ulaşım',
    highlightsLabel: 'Önemli İpuçları',
    timingCheckerEyebrow: 'PAZAR SAATİ VE GÜMRÜK TESTİ',
    timingCheckerTitle: 'Pazara Saat Kaçta Gidilir? + Pazarlık & DLM Gümrük Testi',
    timingCheckerSubtitle:
      '08:30–17:00 arası tazelik ile gün sonu indirim eğrisini inceleyin ve sağdaki araçla ürününüzün pazarlık/bagaj uygunluğunu anında test edin.',
    curveTitle: 'Pazar Günü Eğrisi: Ürün Tazeliği vs. Pazarlık Esnekliği',
    curveFreshLegend: 'Tazelik ve İlk Seçim (%)',
    curveDiscountLegend: 'İndirim & Pazarlık Payı (%)',
    curveBestPeak: '08:30 En Taze Gıda · 14:30 En Rahat Tekstil Pazarlığı',
    curveClickHint: 'Bir saate veya grafik noktasına dokunun',
    crowdLabel: 'Ortam',
    bestForLabel: 'Bu Saatte Ne Alınır?',
    insiderTipLabel: 'Yerel Tavsiye',
    checkerTitle: 'Hızlı Kontrol: Pazarlık, Ödeme Tipi ve Havalimanı Bagajı',
    checkerSubtitle: 'Alacağınız ürünü, alışveriş noktasını ve bagaj durumunuzu seçin.',
    checkerItemLabel: '1. Ne satın almayı planlıyorsunuz?',
    checkerVenueLabel: '2. Nereden alıyorsunuz?',
    checkerLuggageLabel: '3. Uçuş bagajınız (DLM)?',
    itemOpts: [
      { id: 'food-produce', label: 'Meyve, Bal, Zeytinyağı, Baharat' },
      { id: 'textile-craft', label: 'Peştemal, Kilim, Seramik' },
      { id: 'stone-antique', label: 'Tarihî Sikke / Taş / Çömlek' },
    ],
    venueOpts: [
      { id: 'weekly-pazar', label: 'Haftalık Semt Pazarı' },
      { id: 'old-bazaar', label: 'Tarihî Çarşı / Atölye' },
      { id: 'mall-supermarket', label: 'Erasta AVM / Migros / BİM' },
      { id: 'street-beach', label: 'Sahil / Sokak Satıcısı' },
    ],
    luggageOpts: [
      { id: 'carry-on', label: 'Sadece Kabin Bagajı' },
      { id: 'checked-bag', label: 'Kayıtlı Uçak Altı Bagajı Var' },
    ],
    verdictStop: '⛔ DUR: 2863 SAYILI KANUNA GÖRE YASAK',
    verdictCaution: '⚠️ DİKKAT: BAGAJ VEYA KALİTE UYARISI',
    verdictReady: '✅ SORUNSUZ VE DOĞRU PLAN',
    checkerFocusBtn: 'En Uygun Noktayı 3D Haritada Aç ↑',
    bannerEyebrow: 'BAĞLANTILI BÖLGE REHBERLERİ',
    bannerTitle: 'Kur Farkı Ödemeyin, Yöresel Lezzetleri Tanıyın ve Rahatça Gezin',
    bannerDesc:
      'Alışveriş öncesi döviz/kart kurallarımıza ve gastronomi rehberimize göz atın; pazar turu sonrası ise termal kaplıcalarda dinlenebilirsiniz.',
    btnCurrency: 'Döviz, Nakit ve Kart (TRY)',
    btnGastronomy: 'Bölge Gastronomi Rehberi',
    btnGlossary: 'Pazar ve Kültür Sözlüğü',
    btnThermal: 'Kaplıcalar ve Hamamlar',
    rulesEyebrow: 'KANUNLAR, UÇAK BAGAJI VE AKILLI ÖDEME',
    rulesTitle: 'Dalaman Dönüşü Öncesi 4 Hayati Alışveriş Kuralı',
    rulesSubtitle:
      '2863 Sayılı Kültür Varlıkları Kanunu, teneke kutuda zeytinyağı paketleme, manavda pazarlık etmeme adabı ve POS cihazında TRY seçimi.',
    sourceLabel: 'Güvenilir Kaynak',
  },
};

const MAP_PIN_DOT: Record<MarketMapPointKind, string> = {
  'weekly-pazar': 'bg-emerald-500',
  'old-bazaar': 'bg-amber-500',
  'craft-village': 'bg-violet-500',
  'mall-avm': 'bg-sky-500',
};

function getRuleHeaderClass(tone: CustomsSafetyRule['tone']): string {
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

export default function MarketsCraftsHub({ locale }: { locale: LocaleCode }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale) ? locale : 'en';
  const t = HUB_COPY[activeLocale];

  // Weekly Pazar Calendar state
  const [selectedDay, setSelectedDay] = useState<DayOfWeekId | 'all'>('tue');

  // 3D Map state (start with full coast overview)
  const mapSectionRef = useRef<HTMLElement | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<MarketZoneId | 'all'>('all');
  const [activeKindFilter, setActiveKindFilter] = useState<MarketMapPointKind | 'all'>('all');
  const [focusedPointId, setFocusedPointId] = useState<string | null>(null);

  const visibleMapPoints = useMemo(() => {
    return MARKET_MAP_POINTS.filter(
      (p) =>
        (activeZoneId === 'all' || p.zoneId === activeZoneId) &&
        (activeKindFilter === 'all' || p.kind === activeKindFilter)
    );
  }, [activeKindFilter, activeZoneId]);

  const focusedPoint = useMemo(() => {
    return MARKET_MAP_POINTS.find((p) => p.id === focusedPointId) || null;
  }, [focusedPointId]);

  // Crafts filter state
  const [craftFilter, setCraftFilter] = useState<CraftCategoryId>('all');

  // Market-Hour Timeline state
  const [activeSlotId, setActiveSlotId] = useState<string>('0830');

  // Interactive Buyer / Haggling / Customs Checker state
  const [item, setItem] = useState<ItemCategory>('food-produce');
  const [venue, setVenue] = useState<VenueType>('weekly-pazar');
  const [luggage, setLuggage] = useState<LuggageMode>('checked-bag');

  const dayCounts = useMemo(() => {
    const counts: Record<DayOfWeekId, number> = {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
    };
    WEEKLY_MARKETS_SCHEDULE.forEach((m) => {
      counts[m.day] += 1;
    });
    return counts;
  }, []);

  const visibleMarkets = useMemo(() => {
    if (selectedDay === 'all') return WEEKLY_MARKETS_SCHEDULE;
    return WEEKLY_MARKETS_SCHEDULE.filter((m) => m.day === selectedDay);
  }, [selectedDay]);

  const visibleCrafts = useMemo(() => {
    if (craftFilter === 'all') return CRAFT_TREASURES;
    return CRAFT_TREASURES.filter((c) => c.category === craftFilter);
  }, [craftFilter]);

  const activeSlot = useMemo(() => {
    return MARKET_HOUR_SLOTS.find((s) => s.id === activeSlotId) || MARKET_HOUR_SLOTS[0];
  }, [activeSlotId]);

  const checkerResult = useMemo(() => {
    if (item === 'stone-antique') {
      return {
        status: 'stop' as const,
        targetPointId: 'fethiye-paspatur-fish',
        targetZoneId: 'fethiye' as MarketZoneId,
        msg: {
          ru: 'КАТЕГОРИЧЕСКИ НЕЛЬЗЯ ПОКУПАТЬ И ВЫВОЗИТЬ! По турецкому Закону № 2863 любые «старые монеты», черепки амфор со дна моря и резные камни с пляжей на досмотре в аэропорту DLM ведут к снятию с рейса, конфискации и уголовному делу. Покупайте только современную керамику и обязательно берите чек (fatura) на дорогие вещи «под старину».',
          en: 'DO NOT BUY OR PACK! Under Turkish Antiquities Law No. 2863, street-peddler "ancient coins", sea-worn amphora shards, and carved marble fragments trigger detention and criminal prosecution at DLM Airport X-ray. Stick strictly to signed modern ceramics and keep official receipts (*fatura*).',
          de: 'STRENG VERBOTEN! Nach dem türkischen Gesetz Nr. 2863 führen angebliche „antike Münzen“, Amphorenscherben oder bearbeitete Steine bei der Röntgenkontrolle am Flughafen DLM zur Festnahme und Strafanzeige. Nur moderne Werkstatt-Keramik mit *Fatura*-Quittung kaufen.',
          tr: 'KESİNLİKLE SATIN ALMAYIN! 2863 Sayılı Kültür Varlıkları Kanunu gereği eski görünümlü sikke, amfora kırığı veya taş parçalarının taşınması ve yurt dışına çıkarılması ağır hapis/para cezası suçudur. Yalnızca güncel atölye seramikleri alın ve faturanızı saklayın.',
        }[activeLocale],
      };
    }

    if (item === 'food-produce' && luggage === 'carry-on') {
      return {
        status: 'caution' as const,
        targetPointId: 'koycegiz-mon-pazar',
        targetZoneId: 'dalaman-dalyan' as MarketZoneId,
        msg: {
          ru: 'Ограничение 100 мл в ручной клади DLM! С одной ручной кладью вы НЕ пронесёте сосновый мёд, оливковое масло, пекмез или кремы *sığla* в таре >100 мл — их изымут на досмотре. Берите сухие специи в вакууме (сумах, тимьян), кофе в банках по 100 г и фисташковый лукум, либо докупите место багажа.',
          en: '100 ml DLM Cabin Rule Applies! Do NOT pack glass pine honey jars, olive oil tins, *pekmez* syrup, or *sığla* balms over 100 ml in carry-on—security will confiscate them. Instead buy vacuum-sealed dried spices, coffee pouches, and solid pistachio *lokum* boxes.',
          de: '100-ml-Handgepäck-Limit in Dalaman! Pinienhonig, Olivenöl, *Pekmez*-Sirup und *Sığla*-Balsam über 100 ml werden an der Sicherheitskontrolle beschlagnahmt. Im Handgepäck gehen nur vakuumierte Gewürze, Kaffee und fester *Lokum*.',
          tr: 'DLM Kabin Bagajında 100 ml Sınırı! Çam balı, zeytinyağı, pekmez ve 100 ml üzeri sığla kremleri kabine alınmaz. El bagajında yalnızca vakumlu baharat, Türk kahvesi ve katı lokum taşıyabilirsiniz.',
        }[activeLocale],
      };
    }

    if (venue === 'mall-supermarket') {
      return {
        status: 'ready' as const,
        targetPointId: 'erasta-fethiye-avm',
        targetZoneId: 'fethiye' as MarketZoneId,
        msg: {
          ru: 'ТЦ Erasta AVM, Blue Port и сети Migros / BİM — формат БЕЗ торга с кассовым чеком. При оплате зарубежной картой на терминале ВСЕГДА нажимайте «Оплата в TRY» (отказывайтесь от DCC в EUR/USD, чтобы не терять 5–10%), а при покупках одежды в бутиках просите чек *Tax-Free*.',
          en: 'Erasta Fethiye AVM, Blue Port & Migros/BİM operate strictly at fixed shelf prices (zero haggling). Always select **"Charge in TRY"** on card terminals (skip euro/USD DCC conversion!) and request **Tax-Free** forms on brand-name apparel.',
          de: 'In Erasta AVM, Blue Port und Migros/BİM gelten feste Kassenpreise ohne Handeln. Am Kartenterminal immer **"In TRY zahlen"** wählen (DCC-Gebühr vermeiden!) und bei Kleidung ab dem Mindestbetrag **Tax-Free** verlangen.',
          tr: 'Erasta AVM, Blue Port ve Migros/BİM mağazalarında fiyatlar etiketlidir—pazarlık yapılmaz. Yabancı kart kullanıyorsanız POS cihazında her zaman **TRY** çekimini seçin ve yüksek tutarlı giyim alışverişinde **Tax-Free** faturası isteyin.',
        }[activeLocale],
      };
    }

    if (venue === 'street-beach') {
      return {
        status: 'caution' as const,
        targetPointId: 'yesiluzumlu-dastar',
        targetZoneId: 'fethiye' as MarketZoneId,
        msg: {
          ru: 'Осторожно с пляжными лотками и уличными зазывалами! Там чаще всего продают полотенца из полиэстера «3 за 10 €», фабричный лукум в картоне и синтетические шарфы под видом шёлка. Лучше дойдите до утреннего *Pazar*, кооператива Ешилюзюмлю или ТЦ с чеками.',
          en: 'Caution with promenade & beach hawkers: you are far more likely to encounter €3 polyester "3-for-10" towels, factory scarves, and stale boxed lokum. Head to a scheduled morning *Pazar* or Yeşilüzümlü weaving cooperatives for authentic quality.',
          de: 'Vorsicht an Strandpromenaden und bei fliegenden Händlern: Dort dominieren Polyester-Tücher („3 für 10 €“), Kunstfaser-Schals und Karton-Lokum. Echte Handarbeit wartet auf dem Wochenmarkt oder im Bergdorf Yeşilüzümlü.',
          tr: 'Sahil ve sokak tezgâhlarına dikkat: €3’lık polyester peştemal, fabrika şalı ve bayat kutu lokum riski yüksektir. Gerçek dokuma için semt pazarlarını veya Yeşilüzümlü kadın kooperatiflerini tercih edin.',
        }[activeLocale],
      };
    }

    if (item === 'food-produce' && venue === 'weekly-pazar') {
      return {
        status: 'ready' as const,
        targetPointId: 'fethiye-tuesday-pazar',
        targetZoneId: 'fethiye' as MarketZoneId,
        msg: {
          ru: 'Идеально приехать в 08:30–09:30 с мелкими купюрами 50/100/200 TRY! На продуктовых рядах рынка НЕ торгуются — цены указаны на табличках за килограмм. Масло берите в жестяной банке *teneke*, а специи просите запаять в вакуум для сдаваемого багажа.',
          en: 'Arrive at 08:30–09:30 AM with small **50, 100 & 200 TRY cash notes** (village farmers rarely take cards). Do **NOT haggle** over produce per-kilo signs. Buy olive oil in metal tins (*teneke*) wrapped inside towels in your checked bag.',
          de: 'Ideal um 08:30–09:30 Uhr mit kleinen **50/100/200-TRY-Scheinen**! Bei Obst, Käse & Oliven mit Kilopreisen wird **NICHT gefeilscht**. Olivenöl am besten im Metallkanister (*Teneke*) sicher ins Aufgabegepäck verpacken.',
          tr: 'Saat 08:30–09:30 arası yanınızda küçük **50, 100 ve 200 ₺ nakit** ile gidin. Semt pazarlarındaki meyve-sebze, peynir ve bal tezgâhlarında pazarlık yapılmaz. Zeytinyağını uçak altı bagaj için teneke ambalajda alın.',
        }[activeLocale],
      };
    }

    if (item === 'textile-craft') {
      return {
        status: 'ready' as const,
        targetPointId: venue === 'old-bazaar' ? 'kas-uzuncarsi-fri' : 'fethiye-paspatur-fish',
        targetZoneId: venue === 'old-bazaar' ? ('kas' as MarketZoneId) : ('fethiye' as MarketZoneId),
        msg: {
          ru:
            venue === 'old-bazaar'
              ? 'На старых базарах (Паспатур, Мармарис) вежливый торг на 25–35% приветствуется за наличные лиры (в авторских студиях Узун-Чарши в Каше — лишь мягкие 10%). Проверьте бахрому ковра и 100% *Pamuk* хлопок; на ковры дороже €150 обязательно возьмите чек *fatura*.'
              : 'За пештемалями, рубашками и сумками на еженедельный рынок лучше прийти после 14:30. При покупке 2–3 вещей за наличные лиры продавцы охотно сбрасывают 25–35%. Всегда проверяйте бирку *100% Pamuk* вместо блестящей синтетики!',
          en:
            venue === 'old-bazaar'
              ? 'Inside Paspatur & Marmaris Bazaars, polite 25–35% bargaining works well in TRY cash (Kaş *Uzun Çarşı* artist studios prefer gentler 10% courtesy). Inspect real *dastar* weave or kilim warp fringes—and collect a *fatura* receipt for rugs over €150.'
              : 'Browse textile stalls on weekly markets after 14:30 when crowds thin. Calm multi-item bargaining (25–35% off first quote) in cash TRY yields real *100% Pamuk* cotton wraps instead of shiny €3 polyester.',
          de:
            venue === 'old-bazaar'
              ? 'In Paspatur & im Marmaris-Basar sind 25–35 % Nachlass in Bar-Lira üblich (in Kunstgalerien wie Kaş *Uzun Çarşı* eher dezente 10 %). Echte *Dastar*-Struktur / Kelim-Kettfransen prüfen und ab €150 unbedingt *Fatura*-Beleg einstecken!'
              : 'Textilzelte auf Wochenmärkten am besten nach 14:30 Uhr besuchen: Beim Kauf mehrerer Teile in bar sind 25–35 % Rabatt realistisch. Stets auf echtes *100 % Pamuk* (matt) statt glänzender Kunstfaser achten.',
          tr:
            venue === 'old-bazaar'
              ? 'Paspatur ve Marmaris Çarşısı’nda nakit TL ile %25–35 nazik pazarlık doğaldır (Kaş Uzun Çarşı sanat atölyelerinde ise fiyatlar emeğe dayalıdır). €150 üzeri el halılarında gümrük için mutlaka *fatura* alın.'
              : 'Haftalık pazarların tekstil reyonları için 14:30 sonrası çok uygundur; 2–3 parça peştemal veya keten alırken nakit ile %25–35 indirim alabilirsiniz. Parlak polyester yerine mat *%100 Pamuk* etiketini kontrol edin.',
        }[activeLocale],
      };
    }

    // Fallback: food-produce in old-bazaar (Turkish delight pastane / spice shops)
    return {
      status: 'ready' as const,
      targetPointId: 'fethiye-paspatur-fish',
      targetZoneId: 'fethiye' as MarketZoneId,
      msg: {
        ru: 'В лавках старого города и кондитерских (Pastane) покупайте фисташковый лукум на развес после дегустации и просите запаять специи в вакуум — такие свертки легко долетают в сдаваемом чемодане.',
        en: 'Inside old-town confectioneries (*pastanes*) and Paspatur spice shops, sample fresh pistachio *lokum* by weight and ask merchants to vacuum-seal dry herbs & teas clean for your checked suitcase.',
        de: 'In Altstadt-Konditoreien (*Pastane*) frischen Pistazien-*Lokum* probieren und lose abwiegen lassen; trockene Gewürze direkt vakuumiert ins Aufgabegepäck packen.',
        tr: 'Tarihî çarşıdaki pastanelerde taze dökme lokumu tadarak seçin ve açık baharatları bagajda koku yapmaması için vakumlatın.',
      }[activeLocale],
    };
  }, [activeLocale, item, luggage, venue]);

  return (
    <div className="portal-container py-10 md:py-14 space-y-16 md:space-y-20">
      {/* Cash & Law 2863 Top Shield */}
      <div className="rounded-2xl bg-amber-50 border border-amber-300/90 p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-sm">
          <FaShieldAlt size={22} />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm md:text-base font-extrabold text-amber-950 flex items-center gap-2">
            <FaCoins className="text-amber-700 flex-shrink-0" />
            <span>{t.cashShieldTitle}</span>
          </h2>
          <p className="text-xs md:text-sm text-amber-900 font-medium leading-relaxed">
            {t.cashShieldDesc}
          </p>
        </div>
      </div>

      {/* 1. Interactive 3D Map + Zone Overview & Quick Pin Jump */}
      <section ref={mapSectionRef} id="markets-map" className="scroll-mt-28 space-y-6">
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
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
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

          {MARKET_ZONE_PRESETS.map((preset) => {
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

        <MarketsCrafts3DMap
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
              <FaSearchPlus className="text-amber-600" />
              <span>{t.quickPinsTitle}</span>
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              {visibleMapPoints.length} / {MARKET_MAP_POINTS.length}
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
                    · {pt.openDaysBadge[activeLocale]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Market Spotlight Card (rendered below chips so buttons never jump down) */}
        {focusedPoint && (
          <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-amber-400 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                  <span className={`w-2 h-2 rounded-full ${MAP_PIN_DOT[focusedPoint.kind]}`} />
                  {t.mapKindLabels[focusedPoint.kind]}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-extrabold">
                  {focusedPoint.openDaysBadge[activeLocale]}
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
              <p className="text-xs sm:text-sm font-semibold text-emerald-800">
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

      {/* 2. Weekly Pazar Calendar (Mon-Sun) */}
      <section id="weekly-calendar" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaCalendarAlt /> {t.calEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.calTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.calSubtitle}
            </p>
          </div>
        </div>

        {/* Mon-Sun Selector Pills */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-wrap gap-2">
          {DAY_TABS.map((day) => {
            const isActive = selectedDay === day.id;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setSelectedDay(day.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                }`}
              >
                <span className="sm:hidden">{day.short[activeLocale]}</span>
                <span className="hidden sm:inline">{day.full[activeLocale]}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {dayCounts[day.id]}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setSelectedDay('all')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all border ml-auto ${
              selectedDay === 'all'
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {t.allDaysBtn}
          </button>
        </div>

        {/* Markets Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleMarkets.map((mkt) => (
            <article
              key={mkt.id}
              className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <FaShoppingBag size={10} className="text-amber-700" />
                    {mkt.badge[activeLocale]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600">
                    <FaClock size={10} className="text-slate-400" />
                    {mkt.hours}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {mkt.city[activeLocale]}
                </h3>

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold ${
                      mkt.haggleAllowed
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-sky-50 text-sky-900 border border-sky-200'
                    }`}
                  >
                    <FaTags size={10} />
                    {mkt.haggleAllowed ? t.haggleYesBadge : t.haggleFixedBadge}
                  </span>
                </div>

                <p className="text-xs font-bold text-emerald-800 bg-emerald-50/70 px-3 py-2 rounded-xl border border-emerald-100">
                  {renderFormattedText(mkt.bestFor[activeLocale])}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {renderFormattedText(mkt.description[activeLocale])}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <a
                  href="#markets-map"
                  onClick={() => {
                    setActiveKindFilter('all');
                    setActiveZoneId(mkt.zoneId);
                    setFocusedPointId(mkt.mapPointId);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <FaMapMarkedAlt size={11} className="text-amber-600" />
                  <span>{t.showOnMapBtn}</span>
                </a>
                <a
                  href={mkt.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>{t.gmapsBtn}</span>
                  <FaExternalLinkAlt size={9} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Authentic Crafts (8 Cards) + 4 Shopping Districts Showcase */}
      <section id="authentic-crafts" className="scroll-mt-28 space-y-12">
        {/* Authentic Crafts Filter & Matrix */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <span className="eyebrow-badge mb-1.5">
                <FaAward /> {t.craftsEyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t.craftsTitle}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
                {t.craftsSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs self-start lg:self-auto">
              {(['all', 'textile-craft', 'food-honey', 'ceramic-art'] as CraftCategoryId[]).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCraftFilter(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                      craftFilter === cat
                        ? 'bg-slate-900 text-amber-300'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t.craftFilters[cat]}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleCrafts.map((craft) => (
              <article
                key={craft.id}
                className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-900 border border-violet-200 text-[10px] font-extrabold uppercase tracking-wider">
                      {craft.badge[activeLocale]}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 text-xs font-extrabold">
                      {craft.priceRange}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {renderFormattedText(craft.title[activeLocale])}
                    </h3>
                    <span className="block text-xs font-bold text-amber-700 mt-0.5">
                      {craft.originTown[activeLocale]}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {renderFormattedText(craft.description[activeLocale])}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/90 text-xs text-emerald-950">
                    <span className="font-extrabold uppercase text-[10px] tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
                      <FaCheckCircle className="text-emerald-600" /> {t.verifyRealLabel}
                    </span>
                    <p className="font-medium leading-relaxed">
                      {renderFormattedText(craft.howToVerifyReal[activeLocale])}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/85 border border-rose-200/80 text-xs text-rose-950">
                    <span className="font-extrabold uppercase text-[10px] tracking-wider text-rose-800 flex items-center gap-1.5 mb-1">
                      <FaExclamationTriangle className="text-rose-600" /> {t.avoidFakeLabel}
                    </span>
                    <p className="font-medium leading-relaxed">
                      {renderFormattedText(craft.avoidFakeTip[activeLocale])}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 4 Iconic Shopping Quarters & AVM Photo Cards */}
        <div className="space-y-6">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaStore /> {t.districtsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.districtsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.districtsSubtitle}
            </p>
          </div>

          <div className="space-y-6">
            {BAZAAR_DISTRICTS.map((dist) => (
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
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-amber-300 border border-white/15 text-[10px] font-extrabold uppercase tracking-wider">
                    {dist.code}
                  </span>
                </div>

                <div className="p-6 md:p-7 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <div>
                      <span className="hidden lg:inline-block text-[11px] font-extrabold uppercase tracking-widest text-amber-700 mb-1">
                        {dist.code} · {dist.distanceNote[activeLocale]}
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                        {renderFormattedText(dist.title[activeLocale])}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1">
                        {renderFormattedText(dist.subtitle[activeLocale])}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                      <div>
                        <span className="text-slate-500 font-semibold block">
                          {t.scheduleTagLabel}
                        </span>
                        <strong className="text-slate-900 font-extrabold">
                          {dist.scheduleBadge[activeLocale]}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">
                          {t.bargainTagLabel}
                        </span>
                        <strong className="text-amber-800 font-extrabold">
                          {renderFormattedText(dist.bargainRule[activeLocale])}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">
                          {t.bestTimeTagLabel}
                        </span>
                        <strong className="text-slate-900 font-bold">
                          {dist.bestTime[activeLocale]}
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
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
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
                      href="#markets-map"
                      onClick={() => {
                        setActiveKindFilter('all');
                        setActiveZoneId(dist.zoneId);
                        setFocusedPointId(dist.mapPointId);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <FaMapMarkedAlt size={11} className="text-amber-600" />
                      <span>{t.showOnMapBtn}</span>
                    </a>
                    <a
                      href={dist.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
                    >
                      <FaExternalLinkAlt size={10} /> {t.gmapsBtn}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Market-Hour Freshness vs Haggling Curve + Customs Readiness Checker */}
      <section id="haggle-customs" className="scroll-mt-28 space-y-6">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaBalanceScale /> {t.timingCheckerEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.timingCheckerTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.timingCheckerSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 6 cols: Interactive SVG Hour Curve */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-extrabold text-slate-900">
                {t.curveTitle}
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold">
                {t.curveBestPeak}
              </span>
            </div>

            {/* Interactive SVG Chart */}
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

                {/* Freshness curve line (Emerald) */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={MARKET_HOUR_SLOTS.map((slot, i) => {
                    const x = 95 + i * 145;
                    const y = 180 - slot.freshnessPct * 1.45;
                    return `${x},${y}`;
                  }).join(' ')}
                />

                {/* Bargaining flexibility curve line (Amber) */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={MARKET_HOUR_SLOTS.map((slot, i) => {
                    const x = 95 + i * 145;
                    const y = 180 - slot.priceDropPct * 1.45;
                    return `${x},${y}`;
                  }).join(' ')}
                />

                {MARKET_HOUR_SLOTS.map((slot, i) => {
                  const x = 95 + i * 145;
                  const yFresh = 180 - slot.freshnessPct * 1.45;
                  const yDrop = 180 - slot.priceDropPct * 1.45;
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
                        cy={yFresh}
                        r={active ? 7 : 5}
                        fill="#10b981"
                        stroke="#ffffff"
                        strokeWidth={active ? 2.5 : 1.5}
                      />
                      <circle
                        cx={x}
                        cy={yDrop}
                        r={active ? 7 : 5}
                        fill="#f59e0b"
                        stroke="#ffffff"
                        strokeWidth={active ? 2.5 : 1.5}
                      />
                      <text
                        x={x}
                        y="204"
                        textAnchor="middle"
                        fill={active ? '#fcd34d' : '#cbd5e1'}
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
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    {t.curveFreshLegend}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    {t.curveDiscountLegend}
                  </span>
                </div>
                <span className="text-slate-400">{t.curveClickHint}</span>
              </div>
            </div>

            {/* Time Slot Switcher Pills */}
            <div className="grid grid-cols-4 gap-2">
              {MARKET_HOUR_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setActiveSlotId(slot.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold border transition-colors ${
                    slot.id === activeSlot.id
                      ? 'bg-slate-900 text-amber-300 border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                  }`}
                >
                  {slot.timeLabel}
                </button>
              ))}
            </div>

            {/* Selected Hour Details */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-slate-900 font-extrabold text-sm sm:text-base">
                  {activeSlot.timeLabel} · {activeSlot.name[activeLocale]}
                </strong>
                <span className="text-xs font-bold text-slate-600">
                  {t.crowdLabel}: {activeSlot.crowdLevel[activeLocale]}
                </span>
              </div>
              <p className="text-emerald-900 font-semibold text-xs">
                <strong>{t.bestForLabel}:</strong>{' '}
                {renderFormattedText(activeSlot.bestFor[activeLocale])}
              </p>
              <p className="text-slate-700 font-medium text-xs leading-relaxed">
                <strong>{t.insiderTipLabel}:</strong>{' '}
                {renderFormattedText(activeSlot.insiderTip[activeLocale])}
              </p>
            </div>
          </div>

          {/* Right 6 cols: Interactive Buyer, Haggling & DLM Customs Checker */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div>
              <h3 className="text-base md:text-lg font-extrabold text-slate-900">
                {t.checkerTitle}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">{t.checkerSubtitle}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="block font-extrabold text-slate-700 mb-2">
                  {t.checkerItemLabel}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {t.itemOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setItem(opt.id)}
                      className={`px-3 py-2.5 rounded-xl font-bold border text-center transition-colors ${
                        item === opt.id
                          ? 'bg-slate-900 text-amber-300 border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block font-extrabold text-slate-700 mb-2">
                  {t.checkerVenueLabel}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {t.venueOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setVenue(opt.id)}
                      className={`px-3 py-2.5 rounded-xl font-bold border text-center transition-colors ${
                        venue === opt.id
                          ? 'bg-slate-900 text-amber-300 border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="flex items-center gap-1.5 font-extrabold text-slate-700 mb-2">
                  <FaSuitcase className="text-slate-500" />
                  <span>{t.checkerLuggageLabel}</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {t.luggageOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLuggage(opt.id)}
                      className={`px-3 py-2.5 rounded-xl font-bold border text-center transition-colors ${
                        luggage === opt.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Verdict Box */}
            <div
              className={`rounded-2xl p-4 md:p-5 border space-y-2.5 ${
                checkerResult.status === 'stop'
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : checkerResult.status === 'caution'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-2 font-extrabold text-sm">
                {checkerResult.status === 'stop' ? (
                  <FaTimesCircle className="text-rose-600 flex-shrink-0 text-base" />
                ) : checkerResult.status === 'caution' ? (
                  <FaExclamationTriangle className="text-amber-600 flex-shrink-0 text-base" />
                ) : (
                  <FaCheckCircle className="text-emerald-600 flex-shrink-0 text-base" />
                )}
                <span>
                  {checkerResult.status === 'stop'
                    ? t.verdictStop
                    : checkerResult.status === 'caution'
                    ? t.verdictCaution
                    : t.verdictReady}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {renderFormattedText(checkerResult.msg)}
              </p>

              <div className="pt-1 flex justify-end">
                <a
                  href="#markets-map"
                  onClick={() => {
                    setActiveKindFilter('all');
                    setActiveZoneId(checkerResult.targetZoneId);
                    setFocusedPointId(checkerResult.targetPointId);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-extrabold transition-colors"
                >
                  {t.checkerFocusBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            href={`/${activeLocale}/articles/currency-exchange-and-payments`}
            className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold text-center transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <FaMoneyBillWave size={11} /> {t.btnCurrency}
          </Link>
          <Link
            href={`/${activeLocale}/articles/gastronomy`}
            className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <FaUtensils size={11} /> {t.btnGastronomy}
          </Link>
          <Link
            href={`/${activeLocale}/articles/turkish-cultural-glossary`}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <FaBookOpen size={11} className="text-amber-300" /> {t.btnGlossary}
          </Link>
          <Link
            href={`/${activeLocale}/thermal-spa`}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <FaShieldAlt size={11} className="text-cyan-300" /> {t.btnThermal}
          </Link>
        </div>
      </div>

      {/* 5. Customs Law No. 2863, Baggage & Payment Safety Rules */}
      <section className="space-y-6">
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
          {CUSTOMS_SAFETY_RULES_2026.map((card) => (
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
      </section>
    </div>
  );
}
