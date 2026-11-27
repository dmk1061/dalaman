"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaCompass,
  FaExternalLinkAlt,
  FaFish,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaShoppingBag,
  FaStar,
  FaTimes,
  FaUtensils,
  FaWineGlassAlt,
} from 'react-icons/fa';
import GastronomyMap from './GastronomyMap';
import {
  DINING_FORMATS,
  DINING_SPOTS,
  GASTRO_RULES_2026,
  GASTRO_ZONES,
  REGIONAL_DISHES,
  WAITER_PHRASES,
  type DietaryTag,
  type DishCategory,
  type GastroZoneId,
  type LocaleCode,
  type MealTime,
  type RegionalDish,
  type VenueCategory,
} from '@/lib/gastronomy';

interface GastroHubCopy {
  inflationTitle: string;
  inflationDesc: string;
  mapEyebrow: string;
  mapTitle: string;
  mapSubtitle: string;
  showAllZones: (n: number) => string;
  spotsCount: (n: number) => string;
  mapCatAll: string;
  mapCatSeafood: string;
  mapCatLokanta: string;
  mapCatRiver: string;
  mapCatBreakfast: string;
  encyEyebrow: string;
  encyTitle: string;
  encySubtitle: string;
  searchPlaceholder: string;
  catAll: string;
  catSignature: string;
  catMezeBreakfast: string;
  catGrillOven: string;
  catDessertsDrinks: string;
  dietAll: string;
  dietSeafood: string;
  dietMeat: string;
  dietVeg: string;
  dietSweetDrink: string;
  metricPrice: string;
  metricTime: string;
  metricWhere: string;
  timeLabels: Record<MealTime, string>;
  openCardBtn: string;
  resetDishFilters: string;
  noDishesFound: string;
  formatsEyebrow: string;
  formatsTitle: string;
  formatsSubtitle: string;
  tabFormats: string;
  tabRituals: string;
  includedLabel: string;
  insiderTipLabel: string;
  phrasesTitle: string;
  phrasesSubtitle: string;
  crossBannerEyebrow: string;
  crossBannerTitle: string;
  crossBannerDesc: string;
  btnMarkets: string;
  btnDivingFishing: string;
  btnArticleGastro: string;
  btnArticleDrinks: string;
  spotsEyebrow: string;
  spotsTitle: string;
  spotsSubtitle: string;
  spotMetricFormat: string;
  spotMetricBudget: string;
  spotMetricTime: string;
  spotHighlightsLabel: string;
  spotOrderLabel: string;
  spotDishesLabel: string;
  spotShowOnMap: string;
  spotOpenGmaps: string;
  spotsEmpty: string;
  spotsResetBtn: string;
  rulesEyebrow: string;
  rulesTitle: string;
  rulesSubtitle: string;
  officialSourceLabel: string;
  modalWhatItIs: string;
  modalOrderTip: string;
  modalBestPlaces: string;
  modalWhereToEat: string;
  modalSeasonActivity: string;
  modalPhotoCredit: string;
  modalClose: string;
  zonePrefix: string;
  monthShortNames: string[];
}

const HUB_UI: Record<LocaleCode, GastroHubCopy> = {
  ru: {
    inflationTitle: 'Щит от инфляции и правила турецкого чека 2026',
    inflationDesc:
      'Цены на ужины на побережье от Датчи до Каша приведены в евро (€) для защиты от колебаний курса лиры: скромный обед в локантах Даламана, Кёйджегиза и верхнего Каша укладывается в 5–10 €, конструктор на Рыбном рынке Фетхие — в 18–32 €, а ужин с рыбой и вином на набережных Гёджека или Каша — в 25–55 € с человека. Всегда уточняйте цену рыбы за килограмм до взвешивания и проверяйте строки Kuver / Servis Ücreti 10% внизу чека.',
    mapEyebrow: 'ИНТЕРАКТИВНАЯ КАРТА ВКУСОВ · 4 ЗОНЫ ПОБЕРЕЖЬЯ',
    mapTitle: 'Где вкусно поесть от Датчи до Каша: 16 проверенных кварталов и локаций',
    mapSubtitle:
      'Переключайте 4 зоны справа или фильтр формата заведений, чтобы найти локальные локанты для местных, Рыбный рынок Фетхие, столики над горными реками и лучшие таверны у воды.',
    showAllZones: (n) => `Показать все ${n} локаций`,
    spotsCount: (n) => `${n} мест`,
    mapCatAll: 'Все места',
    mapCatSeafood: 'Рыба и мейхане',
    mapCatLokanta: 'Локанты и пиде',
    mapCatRiver: 'Реки и форель',
    mapCatBreakfast: 'Завтраки и кафе',
    encyEyebrow: 'ЭНЦИКЛОПЕДИЯ КУХНИ · 24 БЛЮДА РЕГИОНА',
    encyTitle: 'Главные блюда Эгейского берега и Муглы: что заказывать по меню',
    encySubtitle:
      'Реальные фотографии блюд, точные турецкие названия, произношение, ориентиры цен и советы о том, как заказывать правильно — от Чёкертме и голубого краба Дальяна до супов, пиде и горячего кюнефе.',
    searchPlaceholder: 'Поиск по блюду, турецкому названию (Çökertme, Pide, Künefe)...',
    catAll: 'Все блюда',
    catSignature: 'Хиты Муглы и море',
    catMezeBreakfast: 'Завтрак, супы и мезе',
    catGrillOven: 'Мангал, печь и локанты',
    catDessertsDrinks: 'Десерты и напитки',
    dietAll: 'Любое питание',
    dietSeafood: 'Рыба и морепродукты',
    dietMeat: 'Мясо и птица',
    dietVeg: 'Вегетарианское',
    dietSweetDrink: 'Десерты и напитки',
    metricPrice: 'Ориентир чека',
    metricTime: 'Лучшее время',
    metricWhere: 'Где искать',
    timeLabels: {
      breakfast: 'Утро / завтрак',
      lunch: 'Обед (12–16 ч.)',
      dinner: 'Ужин / вечер',
      anytime: 'Весь день',
    },
    openCardBtn: 'Карточка блюда',
    resetDishFilters: 'Сбросить фильтры блюд',
    noDishesFound: 'По вашему запросу и фильтрам блюд не найдено.',
    formatsEyebrow: 'ФОРМАТЫ ЗАВЕДЕНИЙ, ЦЕНЫ 2026 И РИТУАЛЫ',
    formatsTitle: 'Шесть вывесок Турции, 4 ритуала побережья и фразы для заказа',
    formatsSubtitle:
      'Почему турки разделяют обед в локантах, вечер в мейхане и десертную пастане, как устроен Рыбный рынок Фетхие и что сказать официанту на турецком.',
    tabFormats: '🍽️ 6 вывесок и средние чеки',
    tabRituals: '🍷 4 ритуала берега и напитки',
    includedLabel: 'Что ждёт внутри:',
    insiderTipLabel: 'Совет инсайдера:',
    phrasesTitle: '10 фраз на турецком для официанта и проверки чека',
    phrasesSubtitle:
      'Покажите или прочитайте эти короткие фразы в локантах, пекарнях и тавернах — это убережёт от лишних трат и сделает сервис ещё теплее:',
    crossBannerEyebrow: 'ДОПОЛНИТЕЛЬНЫЕ ГИДЫ ПОРТАЛА',
    crossBannerTitle: 'Базары, свежий улов, вина и подробные статьи о кухне региона',
    crossBannerDesc:
      'Изучите расписание фермерских рынков (Пн–Вс), посмотрите определитель 23 видов морских рыб или прочитайте подробные гиды по местным напиткам и этикету.',
    btnMarkets: 'Рынки Пн–Вс (3D-карта) →',
    btnDivingFishing: 'Рыбы региона (23 вида) →',
    btnArticleGastro: 'Статья: Гастрономический гид',
    btnArticleDrinks: 'Статья: Ракы, вина и крафт',
    spotsEyebrow: 'КАТАЛОГ ПОБЕРЕЖЬЯ · 16 ЛОКАЦИЙ',
    spotsTitle: 'Где именно пробовать региональную кухню: улицы, рынки и террасы',
    spotsSubtitle:
      'Список синхронизирован с картой выше. Нажмите на чип любого блюда в карточке места, чтобы сразу открыть его описание и подсказку по заказу.',
    spotMetricFormat: 'Формат',
    spotMetricBudget: 'Средний чек',
    spotMetricTime: 'Лучшее время',
    spotHighlightsLabel: 'Главные причины зайти:',
    spotOrderLabel: 'Совет по заказу и брони:',
    spotDishesLabel: 'Что пробовать здесь (кликните на блюдо):',
    spotShowOnMap: 'Показать на карте ↑',
    spotOpenGmaps: 'Google Maps',
    spotsEmpty: 'По выбранной зоне и формату мест не найдено.',
    spotsResetBtn: 'Сбросить фильтры карты и мест',
    rulesEyebrow: 'ПРАВИЛА И ЭТИКЕТ 2026',
    rulesTitle: 'Как читать турецкий счёт, проверять рыбу на льду и закон об алкоголе',
    rulesSubtitle:
      'Четыре практические памятки, которые экономят бюджет и помогают комфортно выбирать еду всей семье (включая вегетарианцев и детей).',
    officialSourceLabel: 'Источник:',
    modalWhatItIs: 'Что это за блюдо',
    modalOrderTip: 'Как правильно заказывать и есть',
    modalBestPlaces: 'Где лучше пробовать в регионе',
    modalWhereToEat: 'Нажмите на локацию, чтобы показать её на карте:',
    modalSeasonActivity: 'Лучшие месяцы и сезонность',
    modalPhotoCredit: 'Фотография (Wikimedia Commons):',
    modalClose: 'Закрыть',
    zonePrefix: 'Зона',
    monthShortNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  },
  en: {
    inflationTitle: '2026 Inflation Shield & Turkish Bill Rules',
    inflationDesc:
      'Dining benchmarks from Datça to Kaş are quoted in Euros (€) to shield against Lira swings: neighborhood lokantas in Dalaman, Köyceğiz, and upper Kaş cost €5–10; Fethiye Fish Market pick-and-grill dinners run €18–32; and marina seafood with wine ranges €25–55 per person. Always confirm wild fish price per kilogram before weighing and check the bottom of bills for Kuver or 10% Servis Ücreti.',
    mapEyebrow: 'INTERACTIVE COASTAL FOOD MAP · 4 ZONES',
    mapTitle: 'Where to Eat from Datça to Kaş: 16 Verified Quarters & Terraces',
    mapSubtitle:
      'Switch the 4 coastal zones or venue pills to locate no-markup neighborhood lokantas, Fethiye Balık Pazarı, icy river trout pavilions, and sunset meyhanes.',
    showAllZones: (n) => `Show all ${n} places`,
    spotsCount: (n) => `${n} places`,
    mapCatAll: 'All spots',
    mapCatSeafood: 'Seafood & Meyhane',
    mapCatLokanta: 'Lokantas & Pide',
    mapCatRiver: 'River & Trout',
    mapCatBreakfast: 'Breakfast & Rooftops',
    encyEyebrow: 'CULINARY ENCYCLOPEDIA · 24 REGIONAL DISHES',
    encyTitle: 'Essential Dishes of Turkey’s Aegean Coast & Muğla: Menu Decoder',
    encySubtitle:
      'Real photographs, exact Turkish names, phonetic hints, € price ranges, and insider ordering tips—from Muğla Çökertme and Dalyan blue crab to clay-pot trout, wood-fired pide, and hot künefe.',
    searchPlaceholder: 'Search dishes or Turkish menu names (Çökertme, Pide, Künefe)...',
    catAll: 'All dishes',
    catSignature: 'Muğla & Sea Signatures',
    catMezeBreakfast: 'Breakfast, Soups & Meze',
    catGrillOven: 'Grill, Wood Oven & Pots',
    catDessertsDrinks: 'Desserts & Drinks',
    dietAll: 'All diets',
    dietSeafood: 'Seafood & Fish',
    dietMeat: 'Meat & Kebabs',
    dietVeg: 'Vegetarian / Vegan-friendly',
    dietSweetDrink: 'Sweets & Drinks',
    metricPrice: 'Typical spend',
    metricTime: 'Best time',
    metricWhere: 'Where to find',
    timeLabels: {
      breakfast: 'Breakfast / morning',
      lunch: 'Lunch (12:00–16:00)',
      dinner: 'Dinner / evening',
      anytime: 'All day',
    },
    openCardBtn: 'Dish guide',
    resetDishFilters: 'Reset dish filters',
    noDishesFound: 'No dishes match your search or dietary filters.',
    formatsEyebrow: 'TURKISH DINING FORMATS, 2026 CHECKS & RITUALS',
    formatsTitle: 'Six Restaurant Types, 4 Coastal Rituals & Waiter Phrases',
    formatsSubtitle:
      'Why Turkish dining separates pot-cooked lokantas from evening meyhanes and bakeries, how Fethiye Fish Market works, and key phrases to ask before paying.',
    tabFormats: '🍽️ 6 Venue Formats & Budgets',
    tabRituals: '🍷 4 Coastal Rituals & Drinks',
    includedLabel: 'What to expect:',
    insiderTipLabel: 'Insider tip:',
    phrasesTitle: '10 Essential Turkish Phrases for Ordering & Paying',
    phrasesSubtitle:
      'Use these friendly phrases in lokantas, fish markets, and tavernas to avoid surprises and connect warmly with staff:',
    crossBannerEyebrow: 'CONNECTED PORTAL GUIDES',
    crossBannerTitle: 'Explore Weekly Pazars, Wild Fish Species & Deep-Dive Food Articles',
    crossBannerDesc:
      'Pair your culinary itinerary with our Mon–Sun Farmers’ Market 3D calendar, the 23-species fish encyclopedia, or full editorial guides on regional wines and rakı.',
    btnMarkets: 'Mon–Sun Markets (3D Map) →',
    btnDivingFishing: '23 Local Fish Species →',
    btnArticleGastro: 'Article: Gastronomy Guide',
    btnArticleDrinks: 'Article: Rakı, Wines & Craft',
    spotsEyebrow: 'COASTAL DINING DIRECTORY · 16 QUARTERS',
    spotsTitle: 'Exact Streets, Markets & Waterfronts to Try Each Dish',
    spotsSubtitle:
      'Synchronized with the map above. Click any dish pill inside a dining card to open its full menu guide and ordering tips.',
    spotMetricFormat: 'Format',
    spotMetricBudget: 'Typical bill',
    spotMetricTime: 'Best hours',
    spotHighlightsLabel: 'Why go here:',
    spotOrderLabel: 'Ordering & booking note:',
    spotDishesLabel: 'Dishes to try here (tap any pill):',
    spotShowOnMap: 'Show on map ↑',
    spotOpenGmaps: 'Google Maps',
    spotsEmpty: 'No dining spots match the selected zone and venue category.',
    spotsResetBtn: 'Reset map & spot filters',
    rulesEyebrow: 'DINING ETIQUETTE & LAWS 2026',
    rulesTitle: 'Reading Bills, Weighing Fresh Fish & Alcohol Curfew Rules',
    rulesSubtitle:
      'Four practical cheat sheets covering kuver, 10% service charges, retail alcohol cutoff hours, and vegetarian/kid-safe picks.',
    officialSourceLabel: 'Reference:',
    modalWhatItIs: 'What this dish is',
    modalOrderTip: 'How to order & eat it like a local',
    modalBestPlaces: 'Best areas across the coast',
    modalWhereToEat: 'Tap a spot to focus it on the interactive map:',
    modalSeasonActivity: 'Best months & seasonality',
    modalPhotoCredit: 'Photo (Wikimedia Commons):',
    modalClose: 'Close',
    zonePrefix: 'Zone',
    monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  de: {
    inflationTitle: '2026 Inflationsschutz & Türkische Rechnungsregeln',
    inflationDesc:
      'Alle Preisorientierungen von Datça bis Kaş sind in Euro (€) angegeben: Ein ehrliches Mittagessen in einer Lokanta in Dalaman oder Köyceğiz kostet 5–10 €, das „Aussuchen & Grillen“-Prinzip auf dem Fischmarkt in Fethiye ca. 18–32 € und ein Meze-Fischabend mit Wein in Göcek oder Kaş 25–55 € pro Person. Fragen Sie bei ganzem Fisch immer vorher nach dem Kilopreis (Kilo fiyatı) und prüfen Sie unten auf dem Bon Kuver / 10 % Servis Ücreti.',
    mapEyebrow: 'INTERAKTIVE GENUSSKARTE · 4 KÜSTENZONEN',
    mapTitle: 'Wo man zwischen Datça und Kaş am besten isst: 16 geprüfte Orte',
    mapSubtitle:
      'Wählen Sie rechts eine der 4 Zonen oder filtern Sie nach Lokaltyp – von günstigen Einheimischen-Lokantas über den Fischmarkt Fethiye bis zu Gebirgsbach-Terrassen.',
    showAllZones: (n) => `Alle ${n} Orte anzeigen`,
    spotsCount: (n) => `${n} Orte`,
    mapCatAll: 'Alle Orte',
    mapCatSeafood: 'Fisch & Meyhane',
    mapCatLokanta: 'Lokanta & Pide',
    mapCatRiver: 'Fluss & Forelle',
    mapCatBreakfast: 'Frühstück & Dach',
    encyEyebrow: 'KULINARIK-LEXIKON · 24 REGIONALE GERICHTE',
    encyTitle: 'Die wichtigsten Gerichte rund um Muğla & die Türkisküste',
    encySubtitle:
      'Echte Fotos, exakte türkische Bezeichnungen, Aussprache, Preisspannen und Bestelltipps – von Çökertme-Kebab und Dalyan-Blaukrabbe über Tontopf-Forelle bis Künefe.',
    searchPlaceholder: 'Gericht oder türkischen Namen suchen (Çökertme, Pide, Künefe)...',
    catAll: 'Alle Gerichte',
    catSignature: 'Muğla & Meer',
    catMezeBreakfast: 'Frühstück, Suppen & Meze',
    catGrillOven: 'Grill, Steinofen & Töpfe',
    catDessertsDrinks: 'Desserts & Getränke',
    dietAll: 'Alle Kategorien',
    dietSeafood: 'Fisch & Meeresfrüchte',
    dietMeat: 'Fleisch & Kebab',
    dietVeg: 'Vegetarisch / Vegan',
    dietSweetDrink: 'Süßes & Getränke',
    metricPrice: 'Preisniveau',
    metricTime: 'Beste Zeit',
    metricWhere: 'Wo zu finden',
    timeLabels: {
      breakfast: 'Frühstück / Morgen',
      lunch: 'Mittag (12–16 Uhr)',
      dinner: 'Abendessen',
      anytime: 'Ganztägig',
    },
    openCardBtn: 'Gericht-Details',
    resetDishFilters: 'Filter zurücksetzen',
    noDishesFound: 'Keine Gerichte für diese Auswahl gefunden.',
    formatsEyebrow: 'LOKALFORMATE, PREISE 2026 & RITUALE',
    formatsTitle: 'Sechs türkische Lokal-Typen, 4 Küstenrituale & Bestellphrasen',
    formatsSubtitle:
      'Wie sich Lokanta, Ocakbaşı, Pideci und Meyhane unterscheiden, wie der Fischmarkt in Fethiye abläuft und welche Sätze beim Bestellen helfen.',
    tabFormats: '🍽️ 6 Lokalformate & Budgets',
    tabRituals: '🍷 4 Küstenrituale & Getränke',
    includedLabel: 'Was Sie erwartet:',
    insiderTipLabel: 'Insider-Tipp:',
    phrasesTitle: '10 wichtige türkische Sätze für Bestellung & Rechnung',
    phrasesSubtitle:
      'Mit diesen kurzen Sätzen bestellen Sie souverän wie Einheimische und vermeiden Missverständnisse beim Preis:',
    crossBannerEyebrow: 'WEITERE PORTAL-GUIDES',
    crossBannerTitle: 'Wochenmärkte, Fischarten & ausführliche Kulinarik-Artikel',
    crossBannerDesc:
      'Kombinieren Sie Ihre Restaurant-Tour mit dem Mo–So Marktkalender auf der 3D-Karte, dem Fisch-Lexikon oder unseren Artikeln zu Weinen & Rakı.',
    btnMarkets: 'Märkte Mo–So (3D-Karte) →',
    btnDivingFishing: '23 Fischarten der Küste →',
    btnArticleGastro: 'Artikel: Kulinarik-Guide',
    btnArticleDrinks: 'Artikel: Rakı, Wein & Craft',
    spotsEyebrow: 'RESTAURANT- & VIERTEL-KATALOG · 16 ORTE',
    spotsTitle: 'Straßen, Märkte & Terrassen für authentische regionale Küche',
    spotsSubtitle:
      'Synchronisiert mit der Karte oben. Klicken Sie in einer Ortskarte auf ein Gericht, um sofort die Details zu öffnen.',
    spotMetricFormat: 'Format',
    spotMetricBudget: 'Richtpreis',
    spotMetricTime: 'Beste Zeit',
    spotHighlightsLabel: 'Highlights vor Ort:',
    spotOrderLabel: 'Bestell- & Reservierungstipp:',
    spotDishesLabel: 'Empfohlene Gerichte (antippen):',
    spotShowOnMap: 'Auf Karte zeigen ↑',
    spotOpenGmaps: 'Google Maps',
    spotsEmpty: 'Keine Lokale für diese Zonen- und Kategorie-Auswahl.',
    spotsResetBtn: 'Kartenfilter zurücksetzen',
    rulesEyebrow: 'REGELN & ETIKETTE 2026',
    rulesTitle: 'Rechnung prüfen, frischen Fisch erkennen & Alkoholverbot ab 22 Uhr',
    rulesSubtitle:
      'Vier kompakte Merkblätter zu Kuver, Trinkgeld, Einzelhandels-Sperrstunde und vegetarischen sowie kinderfreundlichen Gerichten.',
    officialSourceLabel: 'Quelle:',
    modalWhatItIs: 'Was ist das für ein Gericht?',
    modalOrderTip: 'Wie man richtig bestellt & genießt',
    modalBestPlaces: 'Die besten Gegenden der Region',
    modalWhereToEat: 'Auf einen Ort klicken, um ihn auf der Karte zu markieren:',
    modalSeasonActivity: 'Beste Monate & Saison',
    modalPhotoCredit: 'Foto (Wikimedia Commons):',
    modalClose: 'Schließen',
    zonePrefix: 'Zone',
    monthShortNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  },
  tr: {
    inflationTitle: '2026 Bütçe Rehberi ve Restoran Hesap Kuralları',
    inflationDesc:
      'Datça’dan Kaş’a tüm kıyı şeridi için fiyat aralıkları döviz dalgalanmalarına karşı Euro (€) bazında verilmiştir: Dalaman, Köyceğiz ve Kaş çarşısındaki esnaf lokantalarında öğle yemeği 5–10 €, Fethiye Balık Pazarı seç-pişirt akşamı 18–32 €, Göcek veya Kaş marinalarında şaraplı balık sofrası kişi başı 25–55 € tutar. Bütün balıkta kilo fiyatını tartı öncesi sorun ve adisyon sonunda Kuver / %10 Servis Ücreti olup olmadığını kontrol edin.',
    mapEyebrow: 'İNTERAKTİF GASTRONOMİ HARİTASI · 4 BÖLGE',
    mapTitle: 'Datça’dan Kaş’a Nerede Ne Yenir: 16 Onaylı Semt ve Mekân',
    mapSubtitle:
      'Sağdaki 4 bölgeyi veya kategori filtrelerini kullanarak yerli esnaf lokantalarını, Fethiye Balık Pazarı’nı, buz gibi dere üstü çardakları ve gün batımı meyhanelerini inceleyin.',
    showAllZones: (n) => `Tümünü göster (${n})`,
    spotsCount: (n) => `${n} nokta`,
    mapCatAll: 'Tüm noktalar',
    mapCatSeafood: 'Balık & Meyhane',
    mapCatLokanta: 'Lokanta & Pide',
    mapCatRiver: 'Dere & Alabalık',
    mapCatBreakfast: 'Kahvaltı & Teras',
    encyEyebrow: 'MUTFAK ANSİKLOPEDİSİ · 24 YÖRESEL LEZZET',
    encyTitle: 'Muğla ve Turkuaz Kıyıların Temel Yemekleri: Menü Rehberi',
    encySubtitle:
      'Gerçek fotoğraflar, yerel adları, ortalama € tutarları ve ustasından sipariş tüyoları: Çökertme kebabı ve Dalyan mavi yengecinden güveç alabalığa, taş fırın pideden sıcak künefeye.',
    searchPlaceholder: 'Yemek adı veya Türkçe anahtar kelime ara (Çökertme, Pide, Künefe)...',
    catAll: 'Tüm yemekler',
    catSignature: 'Muğla & Deniz İmzaları',
    catMezeBreakfast: 'Kahvaltı, Çorba & Meze',
    catGrillOven: 'Ocakbaşı, Fırın & Ev Yemeği',
    catDessertsDrinks: 'Tatlılar & İçecekler',
    dietAll: 'Tümü',
    dietSeafood: 'Balık & Deniz Ürünü',
    dietMeat: 'Et & Kebap',
    dietVeg: 'Vejetaryen / Zeytinyağlı',
    dietSweetDrink: 'Tatlı & İçecek',
    metricPrice: 'Ortalama tutar',
    metricTime: 'En iyi saat',
    metricWhere: 'Nerede bulunur',
    timeLabels: {
      breakfast: 'Sabah / kahvaltı',
      lunch: 'Öğle (12:00–16:00)',
      dinner: 'Akşam yemeği',
      anytime: 'Gün boyu',
    },
    openCardBtn: 'Detayları aç',
    resetDishFilters: 'Filtreleri sıfırla',
    noDishesFound: 'Aramanıza veya seçilen filtrelere uygun yemek bulunamadı.',
    formatsEyebrow: 'MEKÂN TÜRLERİ, 2026 BÜTÇELERİ VE RİTÜELLER',
    formatsTitle: '6 Türkiye Restoran Formatı, 4 Sahil Ritüeli ve Sipariş Rehberi',
    formatsSubtitle:
      'Esnaf lokantası, pideci, ocakbaşı ve Ege meyhanesi arasındaki farklar, Fethiye Balık Pazarı’nın işleyişi ve hesap sorarken işinize yarayacak pratik cümleler.',
    tabFormats: '🍽️ 6 Mekân Formatı ve Bütçe',
    tabRituals: '🍷 4 Sahil Ritüeli ve İçecekler',
    includedLabel: 'İçeride sizi ne bekler:',
    insiderTipLabel: 'İçeriden ipucu:',
    phrasesTitle: 'Sipariş ve Hesap İçin 10 Pratik İfade',
    phrasesSubtitle:
      'Lokantalarda, balık tezgâhlarında ve kafelerde doğru sipariş vermek ve sürpriz ücretlerle karşılaşmamak için pratik sözlük:',
    crossBannerEyebrow: 'BAĞLANTILI REHBERLER',
    crossBannerTitle: 'Semt Pazarları, Kıyı Balıkları ve Detaylı Yazılar',
    crossBannerDesc:
      'Gastronomi turunuzu Pazartesi–Pazar halk pazarları 3D haritamızla, 23 kıyı balığı ansiklopedisiyle veya şarap/rakı yazılarımızla birleştirin.',
    btnMarkets: 'Pazarlar & El Sanatları (3D) →',
    btnDivingFishing: '23 Kıyı Balığı Türü →',
    btnArticleGastro: 'Yazı: Gastronomi Rehberi',
    btnArticleDrinks: 'Yazı: Rakı, Şarap & Kraft',
    spotsEyebrow: 'KIYI MEKÂN REHBERİ · 16 NOKTA',
    spotsTitle: 'Bölge Lezzetlerini Tadabileceğiniz Sokaklar, Çarşılar ve Teraslar',
    spotsSubtitle:
      'Yukarıdaki harita ile eşzamanlıdır. Kartlardaki herhangi bir yemeğe tıklayarak detaylı bilgi penceresini açabilirsiniz.',
    spotMetricFormat: 'Format',
    spotMetricBudget: 'Bütçe',
    spotMetricTime: 'En iyi saat',
    spotHighlightsLabel: 'Öne çıkan özellikler:',
    spotOrderLabel: 'Sipariş ve rezervasyon notu:',
    spotDishesLabel: 'Burada ne denenir (tıklayın):',
    spotShowOnMap: 'Haritada göster ↑',
    spotOpenGmaps: 'Google Haritalar',
    spotsEmpty: 'Seçili bölge ve kategori için nokta bulunamadı.',
    spotsResetBtn: 'Harita filtrelerini sıfırla',
    rulesEyebrow: 'KURALLAR VE ADAP 2026',
    rulesTitle: 'Hesap Okuma, Taze Balık Kontrolü ve Saat 22:00 Alkol Kuralı',
    rulesSubtitle:
      'Kuver, %10 servis ücreti, perakende satış saati ve vejetaryen/çocuk dostu seçimler için 4 özet rehber.',
    officialSourceLabel: 'Kaynak:',
    modalWhatItIs: 'Nedir ve nasıl hazırlanır?',
    modalOrderTip: 'Doğru sipariş ve yeme tüyosu',
    modalBestPlaces: 'Bölgede en iyi nerede yenir?',
    modalWhereToEat: 'Haritada göstermek için bir noktaya tıklayın:',
    modalSeasonActivity: 'En ideal aylar ve mevsim',
    modalPhotoCredit: 'Fotoğraf (Wikimedia Commons):',
    modalClose: 'Kapat',
    zonePrefix: 'Bölge',
    monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  },
};

function getDishCategoryStyles(category: DishCategory): {
  badge: string;
  border: string;
  banner: string;
} {
  switch (category) {
    case 'signature':
      return {
        badge: 'bg-rose-600 text-white border-rose-500',
        border: 'border-rose-200/80 hover:border-rose-400',
        banner: 'bg-rose-50 text-rose-900 border-rose-200',
      };
    case 'meze-breakfast':
      return {
        badge: 'bg-emerald-600 text-white border-emerald-500',
        border: 'border-emerald-200/80 hover:border-emerald-400',
        banner: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      };
    case 'grill-oven':
      return {
        badge: 'bg-amber-600 text-white border-amber-500',
        border: 'border-amber-200/80 hover:border-amber-400',
        banner: 'bg-amber-50 text-amber-900 border-amber-200',
      };
    case 'desserts-drinks':
      return {
        badge: 'bg-indigo-600 text-white border-indigo-500',
        border: 'border-indigo-200/80 hover:border-indigo-400',
        banner: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      };
  }
}

function getVenueBadgeClass(cat: VenueCategory): string {
  switch (cat) {
    case 'seafood-meyhane':
      return 'bg-cyan-600 text-white';
    case 'lokanta-pide':
      return 'bg-amber-600 text-white';
    case 'river-nature':
      return 'bg-emerald-600 text-white';
    case 'breakfast-cafe':
      return 'bg-rose-600 text-white';
  }
}

function getRuleHeaderClass(tone: 'amber' | 'cyan' | 'rose' | 'slate'): string {
  switch (tone) {
    case 'amber':
      return 'bg-amber-950 text-amber-100';
    case 'cyan':
      return 'bg-cyan-950 text-cyan-100';
    case 'rose':
      return 'bg-rose-950 text-rose-100';
    default:
      return 'bg-slate-900 text-white';
  }
}

export default function GastronomyHub({ locale }: { locale: string }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale)
    ? (locale as LocaleCode)
    : 'en';
  const t = HUB_UI[activeLocale];

  const [selectedZone, setSelectedZone] = useState<'all' | GastroZoneId>('all');
  const [mapCategory, setMapCategory] = useState<'all' | VenueCategory>('all');
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | DishCategory>('all');
  const [dietFilter, setDietFilter] = useState<'all' | DietaryTag>('all');
  const [modalDish, setModalDish] = useState<RegionalDish | null>(null);

  const [formatTab, setFormatTab] = useState<'formats' | 'rituals'>('formats');

  useEffect(() => {
    if (!modalDish) return;
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setModalDish(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalDish]);

  const spotCountByZone = useMemo(() => {
    const counts: Record<GastroZoneId, number> = {
      'zone-1': 0,
      'zone-2': 0,
      'zone-3': 0,
      'zone-4': 0,
    };
    DINING_SPOTS.forEach((s) => {
      counts[s.zoneId] += 1;
    });
    return counts;
  }, []);

  const dishCategoryCounts = useMemo(() => {
    const counts: Record<DishCategory, number> = {
      signature: 0,
      'meze-breakfast': 0,
      'grill-oven': 0,
      'desserts-drinks': 0,
    };
    REGIONAL_DISHES.forEach((d) => {
      counts[d.category] += 1;
    });
    return counts;
  }, []);

  const filteredDishes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return REGIONAL_DISHES.filter((d) => {
      if (categoryFilter !== 'all' && d.category !== categoryFilter) return false;
      if (dietFilter !== 'all' && !d.dietaryTags.includes(dietFilter)) return false;
      if (!q) return true;
      const haystack = [
        d.trName,
        d.pronunciation,
        d.name[activeLocale],
        d.name.en,
        d.shortSubtitle[activeLocale],
        d.whatItIs[activeLocale],
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery, categoryFilter, dietFilter, activeLocale]);

  const filteredSpots = useMemo(() => {
    return DINING_SPOTS.filter((spot) => {
      const matchesZone = selectedZone === 'all' || spot.zoneId === selectedZone;
      const matchesCat = mapCategory === 'all' || spot.category === mapCategory;
      return matchesZone && matchesCat;
    });
  }, [selectedZone, mapCategory]);

  const activeFormats = useMemo(
    () => DINING_FORMATS.filter((item) => item.tab === formatTab),
    [formatTab]
  );

  const selectedZoneObj =
    selectedZone === 'all' ? null : GASTRO_ZONES.find((z) => z.id === selectedZone) || null;

  const categoryBadgeText = (cat: DishCategory) => {
    switch (cat) {
      case 'signature':
        return t.catSignature;
      case 'meze-breakfast':
        return t.catMezeBreakfast;
      case 'grill-oven':
        return t.catGrillOven;
      case 'desserts-drinks':
        return t.catDessertsDrinks;
    }
  };

  const dietBadgeText = (tag: DietaryTag) => {
    switch (tag) {
      case 'seafood':
        return t.dietSeafood;
      case 'meat':
        return t.dietMeat;
      case 'vegetarian':
        return t.dietVeg;
      case 'sweet-drink':
        return t.dietSweetDrink;
    }
  };

  const venueBadgeText = (cat: VenueCategory) => {
    switch (cat) {
      case 'seafood-meyhane':
        return t.mapCatSeafood;
      case 'lokanta-pide':
        return t.mapCatLokanta;
      case 'river-nature':
        return t.mapCatRiver;
      case 'breakfast-cafe':
        return t.mapCatBreakfast;
    }
  };

  const resetMapFilters = () => {
    setSelectedZone('all');
    setMapCategory('all');
    setSelectedSpotId(null);
  };

  const handleJumpFromModalToSpot = (spotId: string) => {
    setModalDish(null);
    setSelectedZone('all');
    setMapCategory('all');
    setSelectedSpotId(spotId);
    const el = document.getElementById('map-zones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Inflation Shield & Bill Notice */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 border-l-4 border-l-amber-600 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 text-lg flex-shrink-0 border border-amber-200/60">
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

      {/* 2. Interactive Gastronomy Encyclopedia (24 Dishes) */}
      <section id="dishes" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaUtensils /> {t.encyEyebrow}
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
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
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
                  { id: 'all', label: t.dietAll },
                  { id: 'seafood', label: t.dietSeafood },
                  { id: 'meat', label: t.dietMeat },
                  { id: 'vegetarian', label: t.dietVeg },
                  { id: 'sweet-drink', label: t.dietSweetDrink },
                ] as const
              ).map((dt) => (
                <button
                  key={dt.id}
                  type="button"
                  onClick={() => setDietFilter(dt.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    dietFilter === dt.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {dt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.catAll} ({REGIONAL_DISHES.length})
            </button>
            {(
              [
                { id: 'signature', label: t.catSignature, count: dishCategoryCounts.signature },
                {
                  id: 'meze-breakfast',
                  label: t.catMezeBreakfast,
                  count: dishCategoryCounts['meze-breakfast'],
                },
                { id: 'grill-oven', label: t.catGrillOven, count: dishCategoryCounts['grill-oven'] },
                {
                  id: 'desserts-drinks',
                  label: t.catDessertsDrinks,
                  count: dishCategoryCounts['desserts-drinks'],
                },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  categoryFilter === cat.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Dish Cards Grid */}
        {filteredDishes.length === 0 ? (
          <div className="portal-card p-10 text-center space-y-3 text-slate-500">
            <FaUtensils className="mx-auto text-3xl text-slate-300" />
            <p className="font-bold text-sm">{t.noDishesFound}</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setDietFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
            >
              {t.resetDishFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => {
              const st = getDishCategoryStyles(dish.category);
              return (
                <article
                  key={dish.id}
                  className={`group bg-white rounded-2xl border ${st.border} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col`}
                >
                  {/* Real Dish Photo */}
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={`${dish.name[activeLocale]} (${dish.trName})`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/25" />

                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow ${st.badge}`}
                      >
                        {categoryBadgeText(dish.category)}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-amber-200 text-[11px] font-bold border border-white/15">
                        TR: {dish.trName}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap gap-1">
                      {dish.dietaryTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-900/75 text-white/95 text-[10px] font-bold border border-white/15"
                        >
                          {dietBadgeText(tag)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                          {dish.name[activeLocale]}
                        </h3>
                        <p className="text-xs italic text-slate-500 font-semibold">
                          {dish.trName}
                          {activeLocale === 'ru' ? ` · [${dish.pronunciation}]` : ''}
                        </p>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                          {dish.shortSubtitle[activeLocale]}
                        </p>
                      </div>

                      {/* 3-Column Metrics Strip */}
                      <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px]">
                        <div>
                          <span className="text-slate-500 font-semibold block">{t.metricPrice}</span>
                          <strong className="text-slate-900 font-extrabold">
                            {dish.priceRangeEur[activeLocale]}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">{t.metricTime}</span>
                          <strong className="text-amber-700 font-extrabold">
                            {t.timeLabels[dish.bestTime]}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">{t.metricWhere}</span>
                          <strong className="text-slate-900 font-bold line-clamp-2">
                            {dish.whereFormat[activeLocale]}
                          </strong>
                        </div>
                      </div>

                      {/* Quick Tip Strip */}
                      <div
                        className={`p-2.5 rounded-xl border text-[11px] font-bold flex items-start gap-2 ${st.banner}`}
                      >
                        <FaStar className="flex-shrink-0 mt-0.5 text-amber-500" />
                        <span className="leading-snug line-clamp-2">
                          {dish.howToOrderTip[activeLocale]}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-400 truncate max-w-[55%]">
                        {dish.imageAttribution.license} · {dish.imageAttribution.artist}
                      </span>
                      <button
                        type="button"
                        onClick={() => setModalDish(dish)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition-colors flex-shrink-0"
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
      </section>

      {/* 3. Interactive Coastal Map + 4-Zone Selector */}
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

          {/* Venue Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 'all', label: t.mapCatAll },
                { id: 'seafood-meyhane', label: t.mapCatSeafood },
                { id: 'lokanta-pide', label: t.mapCatLokanta },
                { id: 'river-nature', label: t.mapCatRiver },
                { id: 'breakfast-cafe', label: t.mapCatBreakfast },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setMapCategory(btn.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  mapCategory === btn.id
                    ? 'bg-amber-600 text-white shadow-sm'
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
            <GastronomyMap
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
              {GASTRO_ZONES.map((zone) => {
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
                        ? 'bg-slate-900 text-white border-amber-500 shadow-md'
                        : 'bg-white text-slate-800 border-slate-200/80 hover:border-amber-400'
                    }`}
                  >
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-extrabold flex-shrink-0 ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-amber-300'
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
                            isSelected ? 'text-amber-300' : 'text-amber-700'
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

            {selectedZoneObj && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 font-medium leading-relaxed">
                {selectedZoneObj.highlightNote[activeLocale]}
              </div>
            )}

            <button
              type="button"
              onClick={resetMapFilters}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-colors border ${
                selectedZone === 'all' && mapCategory === 'all'
                  ? 'bg-amber-600 text-white border-amber-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {t.showAllZones(DINING_SPOTS.length)}
            </button>
          </div>
        </div>
      </section>

      {/* 4. Coastal Dining Spots Catalog (16 Places) */}
      <section id="spots" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaMapMarkerAlt /> {t.spotsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.spotsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.spotsSubtitle}
            </p>
          </div>
        </div>

        {filteredSpots.length === 0 ? (
          <div className="portal-card p-10 text-center space-y-3 text-slate-500">
            <FaMapMarkerAlt className="mx-auto text-3xl text-slate-300" />
            <p className="font-bold text-sm">{t.spotsEmpty}</p>
            <button
              type="button"
              onClick={resetMapFilters}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
            >
              {t.spotsResetBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSpots.map((spot) => {
              const globalIdx = DINING_SPOTS.findIndex((s) => s.id === spot.id);
              const isSelected = spot.id === selectedSpotId;
              const zoneObj = GASTRO_ZONES.find((z) => z.id === spot.zoneId);

              return (
                <article
                  key={spot.id}
                  id={`gastro-spot-${spot.id}`}
                  className={`scroll-mt-28 bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                      : 'border-slate-200/80 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    <Image
                      src={spot.image}
                      alt={spot.title[activeLocale]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/85 text-white text-[11px] font-extrabold border border-white/15">
                        #{globalIdx + 1} · {t.zonePrefix} {zoneObj?.code}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${getVenueBadgeClass(
                          spot.category
                        )}`}
                      >
                        {venueBadgeText(spot.category)}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-lg font-extrabold leading-snug">
                        {spot.title[activeLocale]}
                      </h3>
                      <p className="text-xs text-amber-200 font-semibold mt-0.5 line-clamp-1">
                        {spot.subtitle[activeLocale]}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* 3-Column Metrics */}
                      <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px]">
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.spotMetricFormat}
                          </span>
                          <strong className="text-slate-900 font-extrabold line-clamp-2">
                            {spot.formatLabel[activeLocale]}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.spotMetricBudget}
                          </span>
                          <strong className="text-amber-700 font-extrabold">
                            {spot.priceTier[activeLocale]}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.spotMetricTime}
                          </span>
                          <strong className="text-slate-900 font-bold line-clamp-2">
                            {spot.bestTime[activeLocale]}
                          </strong>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {spot.description[activeLocale]}
                      </p>

                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1.5">
                          {t.spotHighlightsLabel}
                        </span>
                        <ul className="space-y-1 text-xs text-slate-700 font-medium">
                          {spot.highlights[activeLocale].map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <FaCheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5 text-[11px]" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950">
                        <strong className="block font-extrabold mb-0.5">{t.spotOrderLabel}</strong>
                        <span className="leading-relaxed">{spot.orderingAndBookingNote[activeLocale]}</span>
                      </div>

                      {/* Linked Dishes */}
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1.5">
                          {t.spotDishesLabel}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {spot.dishIds.map((dishId) => {
                            const dish = REGIONAL_DISHES.find((d) => d.id === dishId);
                            if (!dish) return null;
                            return (
                              <button
                                key={dishId}
                                type="button"
                                onClick={() => setModalDish(dish)}
                                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-[11px] font-bold text-slate-800 transition-colors"
                              >
                                {dish.name[activeLocale]}
                              </button>
                            );
                          })}
                        </div>
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
                        className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
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

      {/* 5. Formats, Rituals & Turkish Waiter Phrasebook */}
      <section id="formats" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaWineGlassAlt /> {t.formatsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.formatsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.formatsSubtitle}
            </p>
          </div>

          <div className="inline-flex bg-slate-200/70 p-1 rounded-xl self-start">
            <button
              type="button"
              onClick={() => setFormatTab('formats')}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                formatTab === 'formats'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabFormats}
            </button>
            <button
              type="button"
              onClick={() => setFormatTab('rituals')}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                formatTab === 'rituals'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabRituals}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeFormats.map((item) => (
            <div
              key={item.id}
              className="portal-card p-5 md:p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                      {item.badge[activeLocale]}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {item.title[activeLocale]}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {item.hoursOrContext[activeLocale]}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="block text-xl font-black text-amber-700">
                      {item.priceRangeEur}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-semibold max-w-[140px]">
                      {item.priceUnit[activeLocale]}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
                    {t.includedLabel}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {item.includedItems[activeLocale].map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5 text-[11px]" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                <strong className="text-slate-900 font-extrabold block mb-0.5">
                  {t.insiderTipLabel}
                </strong>
                <span className="leading-relaxed">{item.insiderTip[activeLocale]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Waiter Phrasebook */}
        <div className="portal-card p-5 md:p-7 space-y-4">
          <div>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900">{t.phrasesTitle}</h3>
            <p className="text-xs md:text-sm text-slate-600 mt-1 font-medium">
              {t.phrasesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {WAITER_PHRASES.map((p) => {
              const meaning =
                activeLocale === 'ru'
                  ? p.ruMeaning
                  : activeLocale === 'de'
                  ? p.deMeaning
                  : activeLocale === 'tr'
                  ? p.trContext
                  : p.enMeaning;
              return (
                <div
                  key={p.trPhrase}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="text-sm font-extrabold text-slate-900">{p.trPhrase}</strong>
                      {activeLocale === 'ru' && (
                        <span className="text-[11px] font-semibold text-amber-700">
                          [{p.pronunciation}]
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-800">{meaning}</p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {p.whenToUse[activeLocale]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cross-Hub Navigation Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-7 border border-slate-800 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block">
              {t.crossBannerEyebrow}
            </span>
            <h3 className="text-lg md:text-xl font-extrabold">{t.crossBannerTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.crossBannerDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-shrink-0">
            <Link
              href={`/${activeLocale}/markets-crafts`}
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaShoppingBag size={11} /> {t.btnMarkets}
            </Link>
            <Link
              href={`/${activeLocale}/diving-fishing`}
              className="px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaFish size={11} /> {t.btnDivingFishing}
            </Link>
            <Link
              href={`/${activeLocale}/articles/gastronomy`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-amber-300" /> {t.btnArticleGastro}
            </Link>
            <Link
              href={`/${activeLocale}/articles/alkogol-v-turtsii-chto-pit-i-gde-pokupat`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaWineGlassAlt size={11} className="text-amber-300" /> {t.btnArticleDrinks}
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Rules & Etiquette Cards (2026) */}
      <section id="rules" className="scroll-mt-28 space-y-6">
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
          {GASTRO_RULES_2026.map((card) => (
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
                  className="font-bold text-amber-700 hover:underline inline-flex items-center gap-1"
                >
                  {card.sourceLabel} <FaExternalLinkAlt size={9} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dish Detail Modal */}
      {modalDish && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setModalDish(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={modalDish.name[activeLocale]}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-72 bg-slate-900">
              <Image
                src={modalDish.image}
                alt={modalDish.name[activeLocale]}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

              <button
                type="button"
                onClick={() => setModalDish(null)}
                aria-label={t.modalClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/20"
              >
                <FaTimes size={14} />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                      getDishCategoryStyles(modalDish.category).badge
                    }`}
                  >
                    {categoryBadgeText(modalDish.category)}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold">
                    TR: {modalDish.trName}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  {modalDish.name[activeLocale]}
                </h3>
                {activeLocale === 'ru' && (
                  <p className="text-xs sm:text-sm italic text-amber-200 font-semibold">
                    [{modalDish.pronunciation}]
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">{t.metricPrice}</span>
                  <strong className="text-slate-900 font-extrabold">
                    {modalDish.priceRangeEur[activeLocale]}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">{t.metricTime}</span>
                  <strong className="text-amber-700 font-extrabold">
                    {t.timeLabels[modalDish.bestTime]}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">{t.metricWhere}</span>
                  <strong className="text-slate-900 font-extrabold">
                    {modalDish.whereFormat[activeLocale]}
                  </strong>
                </div>
              </div>

              {/* 12-Month Seasonality Strip */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-amber-600" /> {t.modalSeasonActivity}
                </h4>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                  {t.monthShortNames.map((mName, idx) => {
                    const mNum = idx + 1;
                    const active = modalDish.bestMonths.includes(mNum);
                    return (
                      <div
                        key={mName}
                        className={`py-1.5 rounded-lg text-center text-[11px] font-bold border ${
                          active
                            ? 'bg-amber-600 text-white border-amber-700'
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
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 mb-1">
                    {t.modalWhatItIs}
                  </h4>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {modalDish.whatItIs[activeLocale]}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-1">
                    {t.modalOrderTip}
                  </h4>
                  <p className="text-amber-950 font-medium leading-relaxed">
                    {modalDish.howToOrderTip[activeLocale]}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 mb-1">
                    {t.modalBestPlaces}
                  </h4>
                  <p className="text-slate-700 font-medium leading-relaxed mb-3">
                    {modalDish.bestPlacesNote[activeLocale]}
                  </p>
                  <p className="text-[11px] font-bold text-slate-500 mb-2">{t.modalWhereToEat}</p>
                  <div className="flex flex-wrap gap-2">
                    {modalDish.recommendedSpotIds.map((spotId) => {
                      const spot = DINING_SPOTS.find((s) => s.id === spotId);
                      if (!spot) return null;
                      return (
                        <button
                          key={spotId}
                          type="button"
                          onClick={() => handleJumpFromModalToSpot(spot.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
                        >
                          <FaMapMarkerAlt size={10} className="text-amber-300" />
                          <span>{spot.title[activeLocale]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Wikimedia Attribution & Close */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <a
                  href={modalDish.imageAttribution.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-amber-700 underline inline-flex items-center gap-1"
                >
                  <span>
                    {t.modalPhotoCredit} {modalDish.imageAttribution.artist} (
                    {modalDish.imageAttribution.license})
                  </span>
                  <FaExternalLinkAlt size={9} />
                </a>

                <button
                  type="button"
                  onClick={() => setModalDish(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors"
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
