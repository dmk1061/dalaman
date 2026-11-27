"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCarSide,
  FaCheckCircle,
  FaChevronRight,
  FaChild,
  FaCompass,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaFish,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaSuitcase,
  FaSun,
  FaSwimmer,
  FaTimes,
  FaTree,
  FaUmbrellaBeach,
  FaUtensils,
  FaWater,
} from 'react-icons/fa';
import FamilyMap from './FamilyMap';
import {
  FAMILY_ACTIVITIES,
  FAMILY_SPOTS,
  FAMILY_ZONES,
  HEAT_ESCAPE_IDEAS,
  PARENT_PHRASES,
  PARENT_RULES_2026,
  RESORT_COMPARISONS,
  type ActivityCategory,
  type AgeGroup,
  type FamilyActivity,
  type FamilySpotCategory,
  type FamilyZoneId,
  type LocaleCode,
  type SeasonStatus,
  type StrollerGrade,
} from '@/lib/family';

interface FamilyHubCopy {
  profileBannerTitle: string;
  profileBannerDesc: string;
  ageAll: string;
  ageLabels: Record<AgeGroup, string>;
  strollerOnlyLabel: string;
  strollerGradeLabels: Record<StrollerGrade, string>;
  strollerGradeShort: Record<StrollerGrade, string>;
  mapEyebrow: string;
  mapTitle: string;
  mapSubtitle: string;
  showAllZones: (n: number) => string;
  spotsCount: (n: number) => string;
  mapCatAll: string;
  mapCatBeach: string;
  mapCatWaterpark: string;
  mapCatNature: string;
  mapCatPark: string;
  spotMetricDlm: string;
  spotMetricBudget: string;
  spotMetricAges: string;
  spotShadeLabel: string;
  spotTipLabel: string;
  spotActivitiesLabel: string;
  spotShowOnMap: string;
  spotOpenGmaps: string;
  spotsEmpty: string;
  spotsResetBtn: string;
  dlmUnit: string;
  freeLabel: string;
  encyEyebrow: string;
  encyTitle: string;
  encySubtitle: string;
  searchPlaceholder: string;
  catAll: string;
  catLabels: Record<ActivityCategory, string>;
  budgetFilterLabel: string;
  heatFilterLabel: string;
  metricBudget: string;
  metricDlm: string;
  metricStroller: string;
  openCardBtn: string;
  resetActivityFilters: string;
  noActivitiesFound: string;
  resortsEyebrow: string;
  resortsTitle: string;
  resortsSubtitle: string;
  resortFilterAll: string;
  resortFilterNearDlm: string;
  resortFilterCalmSand: string;
  resortFilterStroller: string;
  resortFilterQuiet: string;
  colResort: string;
  colDlm: string;
  colShore: string;
  colStroller: string;
  colQuiet: string;
  colInfra: string;
  colBestFor: string;
  resortOpenLink: string;
  guideEyebrow: string;
  guideTitle: string;
  guideSubtitle: string;
  tabHeatAndRules: string;
  tabPhrases: string;
  heatTitle: string;
  heatPlacesLabel: string;
  rulesTitle: string;
  rulesHintLabel: string;
  phrasesTitle: string;
  phrasesSubtitle: string;
  crossEyebrow: string;
  crossTitle: string;
  crossDesc: string;
  btnGastro: string;
  btnFish: string;
  btnPharmacies: string;
  btnTransfers: string;
  btnArticleFamily: string;
  modalSeasonTitle: string;
  seasonLegendPeak: string;
  seasonLegendGood: string;
  seasonLegendCool: string;
  seasonLegendClosed: string;
  modalWhatToPack: string;
  modalParentWarning: string;
  modalWhereToGo: string;
  modalPhotoCredit: string;
  modalClose: string;
  zonePrefix: string;
  monthShortNames: string[];
  noResortsMatch: string;
}

const HUB_COPY: Record<LocaleCode, FamilyHubCopy> = {
  ru: {
    profileBannerTitle: 'Быстрый подбор под вашего ребёнка (синхронизируется с картой и каталогом)',
    profileBannerDesc:
      'Выберите возраст ребёнка и нужна ли ровная дорога под прогулочную коляску — карта 16 мест и каталог 18 активностей отфильтруются мгновенно. А если летите ночным рейсом в DLM с малышом 0–3, ориентируйтесь на время пути 18–30 минут.',
    ageAll: 'Любой возраст',
    ageLabels: {
      '0-3': '0–3 г. (Малыши)',
      '4-7': '4–7 лет («Почемучки»)',
      '8-12': '8–12 лет (Школьники)',
      '13-17': '13–17 лет (Подростки)',
    },
    strollerOnlyLabel: '🟢 Только с коляской',
    strollerGradeLabels: {
      easy: '🟢 Коляска проедет',
      partial: '🟡 Песок / лодка',
      carrier: '🔴 Только эргорюкзак',
    },
    strollerGradeShort: {
      easy: '🟢 Коляска OK',
      partial: '🟡 Крупн. колёса',
      carrier: '🔴 Эргорюкзак',
    },
    mapEyebrow: 'ИНТЕРАКТИВНАЯ СЕМЕЙНАЯ КАРТА · 4 ЗОНЫ',
    mapTitle: '16 проверенных мест с детьми от Мармариса до Каша',
    mapSubtitle:
      'Нажимайте на зоны справа или фильтры категорий: спокойные пляжи без волн, аквапарки, клиника черепах DEKAMER, горные речки в жару и бесплатные приморские парки.',
    showAllZones: (n) => `Показать все ${n} мест`,
    spotsCount: (n) => `${n} мест`,
    mapCatAll: 'Все типы',
    mapCatBeach: 'Пляжи без волн',
    mapCatWaterpark: 'Аквапарки / канатка',
    mapCatNature: 'Черепахи и реки',
    mapCatPark: 'Парки и променады',
    spotMetricDlm: 'Путь от DLM',
    spotMetricBudget: 'Бюджет семьи',
    spotMetricAges: 'Возраст',
    spotShadeLabel: 'Тень и жара 12–16 ч:',
    spotTipLabel: 'Совет родителям:',
    spotActivitiesLabel: 'Чем заняться здесь (открыть карточку):',
    spotShowOnMap: 'Показать на карте ↑',
    spotOpenGmaps: 'Google Maps',
    spotsEmpty: 'По текущему фильтру возраста/коляски и зоны локаций не найдено.',
    spotsResetBtn: 'Сбросить все фильтры',
    dlmUnit: 'мин',
    freeLabel: 'Бесплатно / от 0 €',
    encyEyebrow: 'ЭНЦИКЛОПЕДИЯ АКТИВНОСТЕЙ · 18 ИДЕЙ ПОЕЗДОК',
    encyTitle: 'Куда сходить с детьми: цены на семью в € и сезонность по месяцам',
    encySubtitle:
      'Ориентиры бюджета указаны на семью (2 взр. + 1–2 реб.) в евро. Нажмите на любую карточку, чтобы увидеть чек-лист вещей, предупреждения и календарь по месяцам (вода, аквапарки, черепашата).',
    searchPlaceholder: 'Поиск: черепахи, аквапарк, Бабадаг, коляска, Сарыгерме...',
    catAll: 'Все идеи',
    catLabels: {
      'beach-park': 'Пляжи, дюны и парки',
      'waterpark-ride': 'Аквапарки и канатка',
      'animals-nature': 'Черепахи, форель и реки',
      'boat-sea': 'Морские прогулки',
      'active-teens': 'Драйв и спорт (8–17 лет)',
    },
    budgetFilterLabel: 'Бесплатно / до 25 €',
    heatFilterLabel: 'Спасение в жару / тень',
    metricBudget: 'На семью',
    metricDlm: 'От аэропорта',
    metricStroller: 'Коляска',
    openCardBtn: 'Подробнее и календарь',
    resetActivityFilters: 'Сбросить фильтры каталога',
    noActivitiesFound: 'Под эти фильтры ничего не нашлось. Попробуйте снять часть ограничений.',
    resortsEyebrow: 'СРАВНЕНИЕ КУРОРТОВ ДЛЯ СЕМЬИ · 7 БАЗ ПОБЕРЕЖЬЯ',
    resortsTitle: 'Какой курорт выбрать с ребёнком: честная таблица 2026',
    resortsSubtitle:
      'Время переезда после ночного рейса в Даламан (DLM), тип берега, проходимость с коляской, ночная тишина и доступ к детским магазинам (E-bebek / Migros).',
    resortFilterAll: 'Все 7 курортов',
    resortFilterNearDlm: '≤ 30 мин от DLM',
    resortFilterCalmSand: 'Спокойный песок',
    resortFilterStroller: '🟢 Коляска OK',
    resortFilterQuiet: 'Тихо ночью',
    colResort: 'Курорт',
    colDlm: 'От DLM',
    colShore: 'Берег и волны',
    colStroller: 'Коляска',
    colQuiet: 'Ночная тишина',
    colInfra: 'Магазины и аптеки',
    colBestFor: 'Лучше для возраста',
    resortOpenLink: 'Гид по городу →',
    guideEyebrow: 'ШПАРГАЛКА РОДИТЕЛЯ 2026',
    guideTitle: 'Как пережить жару 12–16 ч, правила аптек и мини-разговорник',
    guideSubtitle:
      'Переключайте вкладки: 4 проверенных сценария спасения от полуденного зноя, важные правила Турции про автокресла и рецепты, и 10 фраз для кафе.',
    tabHeatAndRules: '☀️ От жары 12–16 ч и 4 правила',
    tabPhrases: '🗣️ 10 фраз для кафе и такси',
    heatTitle: 'Куда спрятаться в жару с 12:00 до 16:00 (4 готовых сценария)',
    heatPlacesLabel: 'Конкретные места:',
    rulesTitle: '4 главных правила безопасности и быта с детьми в Турции (2026)',
    rulesHintLabel: 'Заметка на заметку:',
    phrasesTitle: '10 коротких фраз по-турецки, которые упрощают отпуск с ребёнком',
    phrasesSubtitle:
      'Покажите экран или произнесите по подсказке — в локанте и на катере поймут мгновенно:',
    crossEyebrow: 'СМЕЖНЫЕ СЕРВИСЫ И ГИДЫ ПОРТАЛА',
    crossTitle: 'Детское меню, трансфер с креслами и дежурные аптеки 24/7',
    crossDesc:
      'Соедините программу отдыха с нашим гидом по недорогим семейным блюдам, расписанием дежурных аптек и трансфером прямо к трапу.',
    btnGastro: 'Еда и 24 блюда (Цены €) →',
    btnFish: 'Рыбалка и морские обитатели →',
    btnPharmacies: 'Дежурные аптеки 24/7',
    btnTransfers: 'Трансфер с автокреслом',
    btnArticleFamily: 'Статья: Семейный гид',
    modalSeasonTitle: 'Сезонность по месяцам (погода, вода, работа парков)',
    seasonLegendPeak: 'Пик сезона',
    seasonLegendGood: 'Комфортно',
    seasonLegendCool: 'Прохладно / межсезонье',
    seasonLegendClosed: 'Закрыто / не сезон',
    modalWhatToPack: 'Что обязательно взять в рюкзак',
    modalParentWarning: 'На что обратить внимание родителям',
    modalWhereToGo: 'Локации на карте (нажмите, чтобы приблизить карту):',
    modalPhotoCredit: 'Фотография:',
    modalClose: 'Закрыть',
    zonePrefix: 'Зона',
    monthShortNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    noResortsMatch: 'Под выбранные фильтры курортов нет. Снимите один из критериев.',
  },
  en: {
    profileBannerTitle: 'Quick Child-Age & Stroller Matcher (syncs map & catalog)',
    profileBannerDesc:
      'Pick your child’s age group and whether you need step-free stroller paths to filter both the 16-spot map and 18-activity encyclopedia. Flying into DLM late with a baby? Aim for spots within 18–30 minutes.',
    ageAll: 'All ages',
    ageLabels: {
      '0-3': '0–3 (Toddlers)',
      '4-7': '4–7 (Early Kids)',
      '8-12': '8–12 (Explorers)',
      '13-17': '13–17 (Teens)',
    },
    strollerOnlyLabel: '🟢 Stroller OK only',
    strollerGradeLabels: {
      easy: '🟢 Step-free stroller OK',
      partial: '🟡 Sand / boat transfer',
      carrier: '🔴 Carrier / sling only',
    },
    strollerGradeShort: {
      easy: '🟢 Stroller OK',
      partial: '🟡 Sand / boat',
      carrier: '🔴 Carrier only',
    },
    mapEyebrow: 'INTERACTIVE FAMILY COAST MAP · 4 ZONES',
    mapTitle: '16 Kid-Tested Spots from Marmaris to Kaş',
    mapSubtitle:
      'Click the 4 coastal zones or venue types to locate wave-free sand beaches, seasonal waterparks, DEKAMER turtle hospital, icy heat-escape rivers, and free parks.',
    showAllZones: (n) => `Show all ${n} places`,
    spotsCount: (n) => `${n} spots`,
    mapCatAll: 'All types',
    mapCatBeach: 'Calm Beaches',
    mapCatWaterpark: 'Waterparks & Lift',
    mapCatNature: 'Turtles & Rivers',
    mapCatPark: 'Parks & Boardwalks',
    spotMetricDlm: 'From DLM',
    spotMetricBudget: 'Family budget',
    spotMetricAges: 'Best ages',
    spotShadeLabel: 'Midday shade:',
    spotTipLabel: 'Parent insider tip:',
    spotActivitiesLabel: 'Activities here (tap to open details):',
    spotShowOnMap: 'Focus on map ↑',
    spotOpenGmaps: 'Google Maps',
    spotsEmpty: 'No spots match your active age, stroller, and zone filters.',
    spotsResetBtn: 'Reset all filters',
    dlmUnit: 'min',
    freeLabel: 'Free / from €0',
    encyEyebrow: 'ACTIVITY ENCYCLOPEDIA · 18 FAMILY IDEAS',
    encyTitle: 'Things to Do with Kids: EUR Family Budgets & 12-Month Calendar',
    encySubtitle:
      'Budgets reflect a typical family (2 adults + 1–2 kids) in Euros. Tap any card for packing lists, safety notes, and month-by-month water/park availability.',
    searchPlaceholder: 'Search turtles, waterpark, Babadağ, stroller, Sarıgerme...',
    catAll: 'All ideas',
    catLabels: {
      'beach-park': 'Beaches, Dunes & Parks',
      'waterpark-ride': 'Waterparks & Cable Car',
      'animals-nature': 'Turtles, Trout & Creeks',
      'boat-sea': 'Calm Boat Cruises',
      'active-teens': 'Adventure & Sports (8–17)',
    },
    budgetFilterLabel: 'Free / under €25',
    heatFilterLabel: 'Shade / Cool Heat Escape',
    metricBudget: 'Family cost',
    metricDlm: 'DLM Drive',
    metricStroller: 'Stroller',
    openCardBtn: 'Details & calendar',
    resetActivityFilters: 'Reset catalog filters',
    noActivitiesFound: 'No activities match these filters. Try clearing one criterion.',
    resortsEyebrow: 'FAMILY RESORT COMPARISON · 7 COASTAL BASES',
    resortsTitle: 'Which Town Fits Your Family Best? Honest 2026 Matrix',
    resortsSubtitle:
      'Real Dalaman Airport (DLM) drive times after late flights, shore surface, stroller access, midnight quietness, and access to baby stores (E-bebek / Migros).',
    resortFilterAll: 'All 7 bases',
    resortFilterNearDlm: '≤ 30 min from DLM',
    resortFilterCalmSand: 'Calm sand',
    resortFilterStroller: '🟢 Stroller OK',
    resortFilterQuiet: 'Quiet nights',
    colResort: 'Resort base',
    colDlm: 'DLM Transfer',
    colShore: 'Shore & Swell',
    colStroller: 'Stroller',
    colQuiet: 'Sleep Quietness',
    colInfra: 'Supplies & Clinics',
    colBestFor: 'Sweet-spot ages',
    resortOpenLink: 'Town guide →',
    guideEyebrow: '2026 PARENT SURVIVAL CHEAT SHEET',
    guideTitle: 'Beating 12:00–16:00 Heat, Car Seats, Pharmacy Laws & Phrases',
    guideSubtitle:
      'Switch tabs for 4 tested midday cool-down blueprints, critical car-seat and antibiotic laws, and 10 handy Turkish café/taxi phrases.',
    tabHeatAndRules: '☀️ 12–16h Heat Escapes & 4 Rules',
    tabPhrases: '🗣️ 10 Café & Logistics Phrases',
    heatTitle: 'Four Ways to Escape 12:00–16:00 Peak Heat with Kids',
    heatPlacesLabel: 'Exact stops:',
    rulesTitle: 'Four Essential Safety & Logistics Rules in Turkey (2026)',
    rulesHintLabel: 'Quick takeaway:',
    phrasesTitle: '10 Turkish Phrases That Smooth Every Day with Kids',
    phrasesSubtitle:
      'Show your screen or read aloud — café staff, boat crews, and lokantas respond warmly:',
    crossEyebrow: 'CONNECTED FAMILY TOOLS',
    crossTitle: 'Kid-Safe Dining, Child-Seat Transfers & 24/7 Duty Pharmacies',
    crossDesc:
      'Pair your trip plan with our 24-dish EUR food guide (for non-spicy mild meals), rotating 24/7 Muğla pharmacy directory, and pre-booked airport vans.',
    btnGastro: '24 Regional Dishes (€) →',
    btnFish: '23 Marine Species & Reefs →',
    btnPharmacies: '24/7 Duty Pharmacies',
    btnTransfers: 'DLM Child-Seat Transfers',
    btnArticleFamily: 'Editorial: Family Guide',
    modalSeasonTitle: 'Month-by-Month Availability (Sea Temp & Parks)',
    seasonLegendPeak: 'Peak season',
    seasonLegendGood: 'Comfortable',
    seasonLegendCool: 'Cool / off-peak',
    seasonLegendClosed: 'Closed / seasonal break',
    modalWhatToPack: 'Packing checklist',
    modalParentWarning: 'Parent safety note',
    modalWhereToGo: 'Spot(s) on the map (tap to zoom directly):',
    modalPhotoCredit: 'Photo credit:',
    modalClose: 'Close',
    zonePrefix: 'Zone',
    monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    noResortsMatch: 'No resorts match all selected criteria at once.',
  },
  de: {
    profileBannerTitle: 'Schnellfilter nach Kindesalter & Kinderwagen (synchron mit Karte & Katalog)',
    profileBannerDesc:
      'Wählen Sie das Alter Ihres Kindes und ob Sie ebene Buggy-Wege brauchen – Karte und 18 Ideen passen sich sofort an. Nach späten Flügen nach DLM sind Ziele in 18–30 Min. Gold wert.',
    ageAll: 'Alle Alter',
    ageLabels: {
      '0-3': '0–3 J. (Kleinkind)',
      '4-7': '4–7 J. (Kita/Vor)',
      '8-12': '8–12 J. (Schulkind)',
      '13-17': '13–17 J. (Teens)',
    },
    strollerOnlyLabel: '🟢 Nur Buggy-geeignet',
    strollerGradeLabels: {
      easy: '🟢 Stufenlos Buggy OK',
      partial: '🟡 Sand / Boot',
      carrier: '🔴 Nur Trage / Kraxe',
    },
    strollerGradeShort: {
      easy: '🟢 Buggy OK',
      partial: '🟡 Sand / Boot',
      carrier: '🔴 Nur Trage',
    },
    mapEyebrow: 'INTERAKTIVE FAMILIENKARTE · 4 KÜSTENZONEN',
    mapTitle: '16 geprüfte Familien-Orte von Marmaris bis Kaş',
    mapSubtitle:
      'Filtern Sie nach 4 Zonen oder Kategorien: ruhige Sandstrände ohne Brandung, Aquaparks, Schildkrötenklinik DEKAMER, +8 °C-Flüsse und Gratis-Parks.',
    showAllZones: (n) => `Alle ${n} Orte zeigen`,
    spotsCount: (n) => `${n} Orte`,
    mapCatAll: 'Alle Typen',
    mapCatBeach: 'Ruhige Strände',
    mapCatWaterpark: 'Aquaparks & Seilbahn',
    mapCatNature: 'Tiere & Flüsse',
    mapCatPark: 'Parks & Promenaden',
    spotMetricDlm: 'Ab Flughafen DLM',
    spotMetricBudget: 'Familienbudget',
    spotMetricAges: 'Ideal für',
    spotShadeLabel: 'Schatten & Hitze:',
    spotTipLabel: 'Eltern-Tipp:',
    spotActivitiesLabel: 'Aktivitäten vor Ort (antippen):',
    spotShowOnMap: 'Auf Karte zeigen ↑',
    spotOpenGmaps: 'Google Maps',
    spotsEmpty: 'Keine Orte entsprechen den gewählten Alter-/Buggy- und Zonenfiltern.',
    spotsResetBtn: 'Alle Filter zurücksetzen',
    dlmUnit: 'Min.',
    freeLabel: 'Gratis / ab 0 €',
    encyEyebrow: 'AKTIVITÄTEN-LEXIKON · 18 FAMILIEN-IDEEN',
    encyTitle: 'Was unternehmen? Familienpreise in € & 12-Monats-Saison',
    encySubtitle:
      'Alle Preisspannen gelten grob für 2 Erwachsene + 1–2 Kinder in Euro. Auf jede Karte klicken für Packliste, Hinweise und Monatskalender.',
    searchPlaceholder: 'Suchen: Schildkröten, Aquapark, Babadağ, Buggy, Sarıgerme...',
    catAll: 'Alle Ideen',
    catLabels: {
      'beach-park': 'Strände, Dünen & Parks',
      'waterpark-ride': 'Aquaparks & Seilbahn',
      'animals-nature': 'Schildkröten, Forellen & Flüsse',
      'boat-sea': 'Ruhige Bootsfahrten',
      'active-teens': 'Action & Sport (8–17)',
    },
    budgetFilterLabel: 'Gratis / bis 25 €',
    heatFilterLabel: 'Schatten / Hitzeschutz',
    metricBudget: 'Familie',
    metricDlm: 'Ab DLM',
    metricStroller: 'Kinderwagen',
    openCardBtn: 'Details & Kalender',
    resetActivityFilters: 'Katalogfilter leeren',
    noActivitiesFound: 'Keine passenden Aktivitäten gefunden.',
    resortsEyebrow: 'URLAUBSORT-VERGLEICH · 7 BASEN FÜR FAMILIEN',
    resortsTitle: 'Welcher Badeort passt zu Ihrer Familie? Ehrlicher Vergleich 2026',
    resortsSubtitle:
      'Fahrtzeit ab Dalaman (DLM), Strandbeschaffenheit, Kinderwagentauglichkeit, Nachtruhe sowie Supermärkte (Migros, E-bebek) und Kliniken.',
    resortFilterAll: 'Alle 7 Orte',
    resortFilterNearDlm: '≤ 30 Min. ab DLM',
    resortFilterCalmSand: 'Ruhiger Sand',
    resortFilterStroller: '🟢 Buggy OK',
    resortFilterQuiet: 'Ruhige Nächte',
    colResort: 'Urlaubsort',
    colDlm: 'Ab DLM',
    colShore: 'Ufer & Wellen',
    colStroller: 'Buggy',
    colQuiet: 'Nachtruhe',
    colInfra: 'Einkauf & Ärzte',
    colBestFor: 'Top für Alter',
    resortOpenLink: 'Ortsguide →',
    guideEyebrow: 'ELTERN-SPICKZETTEL 2026',
    guideTitle: 'Mittagshitze 12–16 Uhr meistern, Kindersitze, Apotheken & Sätze',
    guideSubtitle:
      'Wechseln Sie zwischen 4 kühlen Mittags-Plänen samt Türkei-Regeln (Kindersitz, e-Rezept) und 10 nützlichen Sätzen für Restaurants.',
    tabHeatAndRules: '☀️ Hitze-Tipps & 4 Regeln',
    tabPhrases: '🗣️ 10 Sätze für Café & Taxi',
    heatTitle: 'Vier Tricks gegen die Mittagshitze (12:00–16:00 Uhr)',
    heatPlacesLabel: 'Konkrete Adressen:',
    rulesTitle: 'Vier wichtige Eltern-Regeln für die Türkei (2026)',
    rulesHintLabel: 'Merksatz:',
    phrasesTitle: '10 türkische Sätze, die mit Kindern sofort Türen öffnen',
    phrasesSubtitle:
      'Im Zweifel einfach dem Kellner oder Skipper auf dem Display zeigen:',
    crossEyebrow: 'VERKNÜPFTE PORTAL-GUIDES',
    crossTitle: 'Mildes Essen, Kindersitz-Transfer & Notdienst-Apotheken 24/7',
    crossDesc:
      'Kombinieren Sie Ihren Plan mit den 24 milden Gerichten in €, den laufenden Notdienst-Apotheken und vorbestelltem Transfer ab DLM.',
    btnGastro: '24 Gerichte & Lokantas (€) →',
    btnFish: '23 Fischarten & Schnorcheln →',
    btnPharmacies: 'Notapotheken 24/7',
    btnTransfers: 'Transfer mit Kindersitz',
    btnArticleFamily: 'Artikel: Familienurlaub',
    modalSeasonTitle: 'Saison nach Monaten (Wassertemperatur & Parks)',
    seasonLegendPeak: 'Hauptsaison',
    seasonLegendGood: 'Angenehm',
    seasonLegendCool: 'Kühl / Nebensaison',
    seasonLegendClosed: 'Geschlossen / Pause',
    modalWhatToPack: 'Packliste für den Rucksack',
    modalParentWarning: 'Wichtiger Elternhinweis',
    modalWhereToGo: 'Zugehörige Orte auf der Karte (klicken zum Zoomen):',
    modalPhotoCredit: 'Foto:',
    modalClose: 'Schließen',
    zonePrefix: 'Zone',
    monthShortNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    noResortsMatch: 'Kein Ort erfüllt alle gewählten Filter gleichzeitig.',
  },
  tr: {
    profileBannerTitle: 'Yaş Grubu ve Puset Hızlı Filtresi (Harita & Katalog Senkron)',
    profileBannerDesc:
      'Çocuğunuzun yaşını ve bebek arabası/puset ihtiyacınızı seçin — 16 noktalı harita ve 18 aktivite rehberi anında filtrelensin. Geç uçuş inişinde 18–30 dakikalık beldeler hayat kurtarır.',
    ageAll: 'Tüm Yaşlar',
    ageLabels: {
      '0-3': '0–3 Yaş (Bebek)',
      '4-7': '4–7 Yaş (Okul Öncesi)',
      '8-12': '8–12 Yaş (Okul Çağı)',
      '13-17': '13–17 Yaş (Gençler)',
    },
    strollerOnlyLabel: '🟢 Sadece Puset Uygun',
    strollerGradeLabels: {
      easy: '🟢 Puset Tam Uygun',
      partial: '🟡 Kum / Tekne Binişi',
      carrier: '🔴 Sadece Kanguru',
    },
    strollerGradeShort: {
      easy: '🟢 Puset OK',
      partial: '🟡 Kum / Tekne',
      carrier: '🔴 Kanguru',
    },
    mapEyebrow: 'İNTERAKTİF AİLE HARİTASI · 4 BÖLGE',
    mapTitle: 'Marmaris’ten Kaş’a Çocukla Gidilecek 16 Onaylı Durak',
    mapSubtitle:
      'Sağdaki 4 bölgeyi veya kategori filtrelerini kullanın: dalgasız sığ kumsallar, su parkları, DEKAMER kaplumbağa hastanesi ve +8 °C serin dere bahçeleri.',
    showAllZones: (n) => `Tümünü göster (${n} durak)`,
    spotsCount: (n) => `${n} durak`,
    mapCatAll: 'Tüm tipler',
    mapCatBeach: 'Sakin Plajlar',
    mapCatWaterpark: 'Su Parkı & Teleferik',
    mapCatNature: 'Doğa & Kaplumbağa',
    mapCatPark: 'Park & Kordon',
    spotMetricDlm: 'DLM Mesafe',
    spotMetricBudget: 'Aile Bütçesi',
    spotMetricAges: 'Uygun Yaş',
    spotShadeLabel: 'Gölge ve Öğle Sıcağı:',
    spotTipLabel: 'Ebeveyn Notu:',
    spotActivitiesLabel: 'Buradaki aktiviteler (detay için dokunun):',
    spotShowOnMap: 'Haritada göster ↑',
    spotOpenGmaps: 'Google Haritalar',
    spotsEmpty: 'Seçili yaş, puset ve bölge filtrelerine uygun durak bulunamadı.',
    spotsResetBtn: 'Tüm filtreleri sıfırla',
    dlmUnit: 'dk',
    freeLabel: 'Ücretsiz / 0 €’dan',
    encyEyebrow: 'AKTİVİTE ANSİKLOPEDİSİ · 18 AİLE ROTASI',
    encyTitle: 'Çocuklarla Ne Yapılır? EUR Aile Bütçesi ve 12 Aylık Takvim',
    encySubtitle:
      'Bütçeler 2 yetişkin + 1–2 çocuklu bir aile içindir. Çanta hazırlığı, ebeveyn uyarıları ve su parkı/deniz suyu ayları için kartlara tıklayın.',
    searchPlaceholder: 'Ara: kaplumbağa, su parkı, Babadağ, puset, Sarıgerme...',
    catAll: 'Tümü',
    catLabels: {
      'beach-park': 'Plaj, Kumul ve Parklar',
      'waterpark-ride': 'Su Parkları ve Teleferik',
      'animals-nature': 'Caretta, Alabalık ve Dereler',
      'boat-sea': 'Sakin Tekne Turları',
      'active-teens': 'Gençler İçin Aksiyon (8–17)',
    },
    budgetFilterLabel: 'Ücretsiz / ≤25 €',
    heatFilterLabel: 'Gölgelik / Öğle Serinliği',
    metricBudget: 'Aile Tutarı',
    metricDlm: 'Havalimanı',
    metricStroller: 'Puset',
    openCardBtn: 'Detay ve Takvim',
    resetActivityFilters: 'Katalog filtrelerini temizle',
    noActivitiesFound: 'Bu filtrelere uygun aktivite bulunamadı.',
    resortsEyebrow: 'AİLE BELDE KARŞILAŞTIRMASI · 7 MERKEZ',
    resortsTitle: 'Çocukla Hangi Belde Daha Rahat? Dürüst 2026 Matrisi',
    resortsSubtitle:
      'Dalaman (DLM) iniş süresi, kumsal/taş durumu, bebek arabası uyumu, gece gürültüsü ve E-bebek / Migros / hastane erişimi.',
    resortFilterAll: '7 Belde',
    resortFilterNearDlm: '≤ 30 dk (DLM)',
    resortFilterCalmSand: 'Sakin Kumsal',
    resortFilterStroller: '🟢 Puset OK',
    resortFilterQuiet: 'Gece Sakin',
    colResort: 'Belde / Merkez',
    colDlm: 'DLM Yol',
    colShore: 'Kıyı & Dalga',
    colStroller: 'Puset',
    colQuiet: 'Gece Sessizliği',
    colInfra: 'Market & Sağlık',
    colBestFor: 'En İyi Yaşlar',
    resortOpenLink: 'Belde rehberi →',
    guideEyebrow: '2026 EBEVEYN CEP REHBERİ',
    guideTitle: '12:00–16:00 Sıcağından Kaçış, Oto Koltuğu, Eczane & Pratik Sözlük',
    guideSubtitle:
      'Sekmeler arasında geçiş yaparak serin öğle rotalarını, 4 temel Türkiye kuralını ve restoran/taksi ifadelerini inceleyin.',
    tabHeatAndRules: '☀️ Öğle Serinliği & 4 Kural',
    tabPhrases: '🗣️ 10 Pratik İfade',
    heatTitle: '12:00–16:00 Güneşinden Kaçmanın 4 Akıllı Yolu',
    heatPlacesLabel: 'Nokta adresler:',
    rulesTitle: '2026 Aile Tatilinde Bilinmesi Gereken 4 Kritik Kural',
    rulesHintLabel: 'Özet Not:',
    phrasesTitle: 'Restoranda ve Teknede İşinizi Kolaylaştıran 10 Cümle',
    phrasesSubtitle:
      'Çocuklarla seyahat ederken esnaf lokantasında ve teknelerde en sık ihtiyaç duyulan talepler:',
    crossEyebrow: 'BAĞLANTILI PORTAL REHBERLERİ',
    crossTitle: 'Yöresel Çocuk Menüsü, Koltuklu Transfer ve Nöbetçi Eczaneler',
    crossDesc:
      'Aile planınızı 24 yöresel lezzet rehberi (acısız ev yemekleri), güncel Muğla nöbetçi eczaneleri ve bebek koltuklu özel transferle tamamlayın.',
    btnGastro: '24 Yöresel Lezzet (€) →',
    btnFish: '23 Deniz Türü Ansiklopedisi →',
    btnPharmacies: 'Nöbetçi Eczaneler 24/7',
    btnTransfers: 'Bebek Koltuklu Transfer',
    btnArticleFamily: 'Makale: Aile Tatili',
    modalSeasonTitle: 'Aylara Göre Uygunluk (Deniz Suyu & Açık Sezon)',
    seasonLegendPeak: 'Zirve sezon',
    seasonLegendGood: 'İdeal / Ilık',
    seasonLegendCool: 'Serin dönem',
    seasonLegendClosed: 'Kapalı / Sezon dışı',
    modalWhatToPack: 'Sırt çantası kontrol listesi',
    modalParentWarning: 'Ebeveyn güvenlik uyarısı',
    modalWhereToGo: 'Haritadaki duraklar (yakınlaştırmak için dokunun):',
    modalPhotoCredit: 'Fotoğraf:',
    modalClose: 'Kapat',
    zonePrefix: 'Bölge',
    monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    noResortsMatch: 'Tüm filtreleri aynı anda karşılayan belde bulunamadı.',
  },
};

function getStrollerBadgeClass(grade: StrollerGrade): string {
  switch (grade) {
    case 'easy':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'partial':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'carrier':
      return 'bg-rose-100 text-rose-800 border-rose-200';
  }
}

function getSpotCategoryBadgeClass(cat: FamilySpotCategory): string {
  switch (cat) {
    case 'calm-beach':
      return 'bg-sky-600 text-white';
    case 'waterpark-ride':
      return 'bg-orange-600 text-white';
    case 'nature-animals':
      return 'bg-emerald-600 text-white';
    case 'park-promenade':
      return 'bg-violet-600 text-white';
  }
}

function getActivityCategoryBadgeClass(cat: ActivityCategory): string {
  switch (cat) {
    case 'beach-park':
      return 'bg-sky-500/90 text-white border-sky-300/40';
    case 'waterpark-ride':
      return 'bg-orange-500/90 text-white border-orange-300/40';
    case 'animals-nature':
      return 'bg-emerald-600/90 text-white border-emerald-300/40';
    case 'boat-sea':
      return 'bg-cyan-600/90 text-white border-cyan-300/40';
    case 'active-teens':
      return 'bg-indigo-600/90 text-white border-indigo-300/40';
  }
}

function getSeasonCellClass(status: SeasonStatus): string {
  switch (status) {
    case 'peak':
      return 'bg-emerald-600 text-white border-emerald-700';
    case 'good':
      return 'bg-sky-100 text-sky-900 border-sky-300';
    case 'cool':
      return 'bg-amber-50 text-amber-900 border-amber-200';
    case 'closed':
      return 'bg-slate-100 text-slate-400 border-slate-200 line-through';
  }
}

export default function FamilyHub({ locale }: { locale: LocaleCode }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale) ? locale : 'en';
  const t = HUB_COPY[activeLocale];

  // Shared Child Age & Stroller filters synced across Map + Spots + Activities
  const [ageFilter, setAgeFilter] = useState<'all' | AgeGroup>('all');
  const [strollerOnly, setStrollerOnly] = useState(false);

  // Map & Spots state
  const [selectedZone, setSelectedZone] = useState<'all' | FamilyZoneId>('all');
  const [spotCategory, setSpotCategory] = useState<'all' | FamilySpotCategory>('all');
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

  // Activities state
  const [searchQuery, setSearchQuery] = useState('');
  const [activityCategory, setActivityCategory] = useState<'all' | ActivityCategory>('all');
  const [budgetOnly, setBudgetOnly] = useState(false);
  const [heatOnly, setHeatOnly] = useState(false);
  const [modalActivity, setModalActivity] = useState<FamilyActivity | null>(null);

  // Resort comparison quick filters
  const [resortNearDlm, setResortNearDlm] = useState(false);
  const [resortCalmSand, setResortCalmSand] = useState(false);
  const [resortStrollerOk, setResortStrollerOk] = useState(false);
  const [resortQuiet, setResortQuiet] = useState(false);

  // Parent survival guide tab
  const [guideTab, setGuideTab] = useState<'heat-rules' | 'phrases'>('heat-rules');

  useEffect(() => {
    if (!modalActivity) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalActivity(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalActivity]);

  const spotCountByZone = useMemo(() => {
    const map: Record<FamilyZoneId, number> = {
      'datca-marmaris': 0,
      'koycegiz-dalyan-dalaman': 0,
      'gocek-fethiye-oludeniz': 0,
      'saklikent-patara-kas': 0,
    };
    FAMILY_SPOTS.forEach((s) => {
      map[s.zoneId] += 1;
    });
    return map;
  }, []);

  const activityCategoryCounts = useMemo(() => {
    const counts: Record<ActivityCategory, number> = {
      'beach-park': 0,
      'waterpark-ride': 0,
      'animals-nature': 0,
      'boat-sea': 0,
      'active-teens': 0,
    };
    FAMILY_ACTIVITIES.forEach((a) => {
      counts[a.category] += 1;
    });
    return counts;
  }, []);

  const filteredSpots = useMemo(() => {
    return FAMILY_SPOTS.filter((spot) => {
      if (selectedZone !== 'all' && spot.zoneId !== selectedZone) return false;
      if (spotCategory !== 'all' && spot.category !== spotCategory) return false;
      if (ageFilter !== 'all' && !spot.ageGroups.includes(ageFilter)) return false;
      if (strollerOnly && spot.stroller !== 'easy') return false;
      return true;
    });
  }, [selectedZone, spotCategory, ageFilter, strollerOnly]);

  const filteredActivities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FAMILY_ACTIVITIES.filter((act) => {
      if (activityCategory !== 'all' && act.category !== activityCategory) return false;
      if (ageFilter !== 'all' && !act.ageGroups.includes(ageFilter)) return false;
      if (strollerOnly && act.stroller !== 'easy') return false;
      if (budgetOnly && !act.isFreeOrBudget) return false;
      if (heatOnly && !act.heatEscapeFriendly) return false;
      if (!q) return true;
      const haystack = [
        act.name[activeLocale],
        act.name.en,
        act.shortSubtitle[activeLocale],
        act.description[activeLocale],
        act.whatToPack[activeLocale],
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery, activityCategory, ageFilter, strollerOnly, budgetOnly, heatOnly, activeLocale]);

  const filteredResorts = useMemo(() => {
    return RESORT_COMPARISONS.filter((r) => {
      if (resortNearDlm && r.dlmMinutes > 30) return false;
      if (resortCalmSand && !r.hasCalmSand) return false;
      if (resortStrollerOk && r.stroller !== 'easy') return false;
      if (resortQuiet && !r.quietNights) return false;
      return true;
    });
  }, [resortNearDlm, resortCalmSand, resortStrollerOk, resortQuiet]);

  const selectedZoneObj =
    selectedZone === 'all' ? null : FAMILY_ZONES.find((z) => z.id === selectedZone) || null;

  const spotCategoryLabel = (cat: FamilySpotCategory) => {
    switch (cat) {
      case 'calm-beach':
        return t.mapCatBeach;
      case 'waterpark-ride':
        return t.mapCatWaterpark;
      case 'nature-animals':
        return t.mapCatNature;
      case 'park-promenade':
        return t.mapCatPark;
    }
  };

  const resetAllFilters = () => {
    setSelectedZone('all');
    setSpotCategory('all');
    setAgeFilter('all');
    setStrollerOnly(false);
    setSelectedSpotId(null);
  };

  const resetActivityCatalogFilters = () => {
    setSearchQuery('');
    setActivityCategory('all');
    setAgeFilter('all');
    setStrollerOnly(false);
    setBudgetOnly(false);
    setHeatOnly(false);
  };

  const handleJumpFromModalToSpot = (spotId: string) => {
    setModalActivity(null);
    setSelectedZone('all');
    setSpotCategory('all');
    setAgeFilter('all');
    setStrollerOnly(false);
    setSelectedSpotId(spotId);
    const el = document.getElementById('map-zones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Synced Parent Profile Banner (Age Group + Stroller Index) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 border-l-4 border-l-sky-600 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700 text-lg flex-shrink-0 border border-sky-200/70">
            <FaChild />
          </div>
          <div className="space-y-1">
            <h2 className="font-bold text-sm md:text-base text-slate-900">
              {t.profileBannerTitle}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              {t.profileBannerDesc}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setAgeFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              ageFilter === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.ageAll}
          </button>
          {(['0-3', '4-7', '8-12', '13-17'] as AgeGroup[]).map((ag) => (
            <button
              key={ag}
              type="button"
              onClick={() => setAgeFilter((prev) => (prev === ag ? 'all' : ag))}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                ageFilter === ag
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.ageLabels[ag]}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setStrollerOnly((v) => !v)}
            className={`ml-auto px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              strollerOnly
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {t.strollerOnlyLabel}
          </button>
        </div>
      </div>

      {/* 2. Interactive Family Map + 4 Zones + 16 Spots Directory */}
      <section id="map-zones" className="scroll-mt-28 space-y-6">
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

          {/* Venue Category Pills */}
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 'all', label: t.mapCatAll },
                { id: 'calm-beach', label: t.mapCatBeach },
                { id: 'waterpark-ride', label: t.mapCatWaterpark },
                { id: 'nature-animals', label: t.mapCatNature },
                { id: 'park-promenade', label: t.mapCatPark },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setSpotCategory(btn.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  spotCategory === btn.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map + 4 Zone Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8">
            <FamilyMap
              locale={activeLocale}
              selectedZone={selectedZone}
              categoryFilter={spotCategory}
              ageFilter={ageFilter}
              strollerOnly={strollerOnly}
              selectedSpotId={selectedSpotId}
              onSelectSpot={(id) => setSelectedSpotId(id)}
              onResetAll={resetAllFilters}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
            <div className="space-y-2.5">
              {FAMILY_ZONES.map((zone) => {
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
                        ? 'bg-slate-900 text-white border-sky-500 shadow-md'
                        : 'bg-white text-slate-800 border-slate-200/80 hover:border-sky-400'
                    }`}
                  >
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-extrabold flex-shrink-0 ${
                        isSelected ? 'bg-sky-500 text-slate-950' : 'bg-slate-900 text-sky-300'
                      }`}
                    >
                      {zone.order}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-xs sm:text-sm font-extrabold truncate">
                          {zone.name[activeLocale]}
                        </strong>
                        <span
                          className={`text-[11px] font-bold flex-shrink-0 ${
                            isSelected ? 'text-sky-300' : 'text-sky-700'
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
                      <span
                        className={`inline-block mt-1.5 text-[10px] font-extrabold ${
                          isSelected ? 'text-emerald-300' : 'text-emerald-700'
                        }`}
                      >
                        {zone.dlmMinutes[activeLocale]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedZoneObj && (
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200/80 text-xs text-sky-950 font-medium leading-relaxed">
                {selectedZoneObj.subtitle[activeLocale]}
              </div>
            )}

            <button
              type="button"
              onClick={resetAllFilters}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-colors border ${
                selectedZone === 'all' &&
                spotCategory === 'all' &&
                ageFilter === 'all' &&
                !strollerOnly
                  ? 'bg-sky-600 text-white border-sky-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {t.showAllZones(FAMILY_SPOTS.length)}
            </button>
          </div>
        </div>

        {/* 16 Family Spots Cards Grid */}
        {filteredSpots.length === 0 ? (
          <div className="portal-card p-10 text-center space-y-3 text-slate-500">
            <FaMapMarkerAlt className="mx-auto text-3xl text-slate-300" />
            <p className="font-bold text-sm">{t.spotsEmpty}</p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700"
            >
              {t.spotsResetBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSpots.map((spot) => {
              const isSelected = spot.id === selectedSpotId;
              const zoneObj = FAMILY_ZONES.find((z) => z.id === spot.zoneId);
              const mapsUrl = `https://maps.google.com/?q=${spot.coords[1]},${spot.coords[0]}`;

              return (
                <article
                  key={spot.id}
                  id={`family-spot-${spot.id}`}
                  className={`scroll-mt-28 bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
                    isSelected
                      ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-lg'
                      : 'border-slate-200/80 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    <Image
                      src={spot.image}
                      alt={spot.name[activeLocale]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/85 text-white text-[11px] font-extrabold border border-white/15">
                        #{spot.number} · {t.zonePrefix} {zoneObj?.order}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${getSpotCategoryBadgeClass(
                          spot.category
                        )}`}
                      >
                        {spotCategoryLabel(spot.category)}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-lg font-extrabold leading-snug">
                        {spot.name[activeLocale]}
                      </h3>
                      <p className="text-xs text-sky-200 font-semibold mt-0.5 line-clamp-1">
                        {spot.town[activeLocale]}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* 3-Column Spot Metrics + Stroller Pill */}
                      <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px]">
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.spotMetricDlm}
                          </span>
                          <strong className="text-slate-900 font-extrabold">
                            {spot.dlmMinutes} {t.dlmUnit}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.spotMetricBudget}
                          </span>
                          <strong className="text-sky-700 font-extrabold">{spot.budgetEur}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">
                            {t.metricStroller}
                          </span>
                          <strong className="text-slate-900 font-bold">
                            {t.strollerGradeShort[spot.stroller]}
                          </strong>
                        </div>
                      </div>

                      {/* Age Badges */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStrollerBadgeClass(
                            spot.stroller
                          )}`}
                        >
                          {t.strollerGradeLabels[spot.stroller]}
                        </span>
                        {spot.ageGroups.map((ag) => (
                          <span
                            key={ag}
                            className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold"
                          >
                            {ag}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {spot.summary[activeLocale]}
                      </p>

                      <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                        <strong className="text-slate-900">{t.spotShadeLabel} </strong>
                        <span>{spot.shadeAndHeat[activeLocale]}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-200/70 text-xs text-sky-950">
                        <strong className="block font-extrabold mb-0.5">{t.spotTipLabel}</strong>
                        <span className="leading-relaxed">{spot.parentTip[activeLocale]}</span>
                      </div>

                      {/* Linked Activities */}
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1.5">
                          {t.spotActivitiesLabel}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {spot.activityIds.map((actId) => {
                            const act = FAMILY_ACTIVITIES.find((a) => a.id === actId);
                            if (!act) return null;
                            return (
                              <button
                                key={actId}
                                type="button"
                                onClick={() => setModalActivity(act)}
                                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 border border-slate-200 hover:border-sky-400 text-[11px] font-bold text-slate-800 transition-colors"
                              >
                                {act.name[activeLocale]}
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
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
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

      {/* 3. Family Activity Encyclopedia (18 Activities + Seasonality Modal) */}
      <section id="activities" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaSwimmer /> {t.encyEyebrow}
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
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
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

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setBudgetOnly((v) => !v)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  budgetOnly
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {t.budgetFilterLabel}
              </button>
              <button
                type="button"
                onClick={() => setHeatOnly((v) => !v)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  heatOnly
                    ? 'bg-cyan-600 text-white border-cyan-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <FaSun className="inline mr-1 text-[10px]" />
                {t.heatFilterLabel}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActivityCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                activityCategory === 'all'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.catAll} ({FAMILY_ACTIVITIES.length})
            </button>
            {(
              [
                'beach-park',
                'waterpark-ride',
                'animals-nature',
                'boat-sea',
                'active-teens',
              ] as ActivityCategory[]
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActivityCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activityCategory === cat
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.catLabels[cat]} ({activityCategoryCounts[cat]})
              </button>
            ))}
          </div>
        </div>

        {/* 18-Activity Cards Grid */}
        {filteredActivities.length === 0 ? (
          <div className="portal-card p-10 text-center space-y-3 text-slate-500">
            <FaChild className="mx-auto text-3xl text-slate-300" />
            <p className="font-bold text-sm">{t.noActivitiesFound}</p>
            <button
              type="button"
              onClick={resetActivityCatalogFilters}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700"
            >
              {t.resetActivityFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => (
              <article
                key={act.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <Image
                    src={act.image}
                    alt={act.name[activeLocale]}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getActivityCategoryBadgeClass(
                        act.category
                      )}`}
                    >
                      {t.catLabels[act.category]}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getStrollerBadgeClass(
                        act.stroller
                      )}`}
                    >
                      {t.strollerGradeShort[act.stroller]}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-base sm:text-lg font-extrabold leading-snug">
                      {act.name[activeLocale]}
                    </h3>
                    <p className="text-[11px] text-sky-200 font-semibold mt-0.5 line-clamp-1">
                      {act.shortSubtitle[activeLocale]}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px]">
                      <div>
                        <span className="text-slate-500 font-semibold block">{t.metricBudget}</span>
                        <strong className="text-sky-700 font-extrabold">
                          {act.familyBudgetEur === '0 €' ? t.freeLabel : act.familyBudgetEur}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">{t.metricDlm}</span>
                        <strong className="text-slate-900 font-bold line-clamp-1">
                          {act.dlmDriveRange[activeLocale]}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">{t.spotMetricAges}</span>
                        <strong className="text-slate-900 font-extrabold">
                          {act.ageGroups.join(', ')}
                        </strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {act.description[activeLocale]}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalActivity(act)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCalendarAlt size={11} />
                    <span>{t.openCardBtn}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. 7-Resort Family Comparison Matrix */}
      <section id="resorts-matrix" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaUmbrellaBeach /> {t.resortsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.resortsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.resortsSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => {
                setResortNearDlm(false);
                setResortCalmSand(false);
                setResortStrollerOk(false);
                setResortQuiet(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                !resortNearDlm && !resortCalmSand && !resortStrollerOk && !resortQuiet
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.resortFilterAll}
            </button>
            <button
              type="button"
              onClick={() => setResortNearDlm((v) => !v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                resortNearDlm
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.resortFilterNearDlm}
            </button>
            <button
              type="button"
              onClick={() => setResortCalmSand((v) => !v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                resortCalmSand
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.resortFilterCalmSand}
            </button>
            <button
              type="button"
              onClick={() => setResortStrollerOk((v) => !v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                resortStrollerOk
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.resortFilterStroller}
            </button>
            <button
              type="button"
              onClick={() => setResortQuiet((v) => !v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                resortQuiet
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.resortFilterQuiet}
            </button>
          </div>
        </div>

        {filteredResorts.length === 0 ? (
          <div className="portal-card p-8 text-center text-sm font-semibold text-slate-500">
            {t.noResortsMatch}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-3.5 px-4 font-extrabold">{t.colResort}</th>
                    <th className="py-3.5 px-3 font-extrabold">{t.colDlm}</th>
                    <th className="py-3.5 px-3 font-extrabold">{t.colShore}</th>
                    <th className="py-3.5 px-3 font-extrabold">{t.colStroller}</th>
                    <th className="py-3.5 px-3 font-extrabold">{t.colQuiet}</th>
                    <th className="py-3.5 px-3 font-extrabold">{t.colInfra}</th>
                    <th className="py-3.5 px-4 font-extrabold">{t.colBestFor}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {filteredResorts.map((resort) => (
                    <tr key={resort.id} className="hover:bg-sky-50/40 align-top">
                      <td className="py-4 px-4 w-48">
                        <strong className="text-sm font-extrabold text-slate-900 block">
                          {resort.name[activeLocale]}
                        </strong>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug font-medium">
                          {resort.verdict[activeLocale]}
                        </p>
                        <Link
                          href={`/${activeLocale}${resort.hrefSlug}`}
                          className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-sky-700 hover:underline"
                        >
                          {t.resortOpenLink}
                        </Link>
                      </td>
                      <td className="py-4 px-3 font-bold text-slate-900 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-lg text-[11px] font-extrabold ${
                            resort.dlmMinutes <= 30
                              ? 'bg-emerald-100 text-emerald-800'
                              : resort.dlmMinutes <= 65
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {resort.dlmLabel[activeLocale]}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-slate-700 font-medium max-w-[200px]">
                        {resort.shoreType[activeLocale]}
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-[11px] font-extrabold border ${getStrollerBadgeClass(
                            resort.stroller
                          )}`}
                        >
                          {t.strollerGradeShort[resort.stroller]}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-slate-700 font-medium max-w-[180px]">
                        {resort.quietLabel[activeLocale]}
                      </td>
                      <td className="py-4 px-3 text-slate-700 font-medium max-w-[190px]">
                        {resort.infraLabel[activeLocale]}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {resort.bestAges.map((ag) => (
                            <span
                              key={ag}
                              className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-bold"
                            >
                              {ag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResorts.map((resort) => (
                <div
                  key={resort.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <strong className="text-sm font-extrabold text-slate-900">
                      {resort.name[activeLocale]}
                    </strong>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border flex-shrink-0 ${getStrollerBadgeClass(
                        resort.stroller
                      )}`}
                    >
                      {t.strollerGradeShort[resort.stroller]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 font-bold text-[11px]">
                      {resort.dlmLabel[activeLocale]}
                    </span>
                    {resort.bestAges.map((ag) => (
                      <span
                        key={ag}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[11px]"
                      >
                        {ag}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-700 font-medium">
                    <strong>{t.colShore}: </strong>
                    {resort.shoreType[activeLocale]}
                  </p>
                  <p className="text-slate-700 font-medium">
                    <strong>{t.colQuiet}: </strong>
                    {resort.quietLabel[activeLocale]}
                  </p>
                  <p className="text-slate-700 font-medium">
                    <strong>{t.colInfra}: </strong>
                    {resort.infraLabel[activeLocale]}
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 font-medium">
                    {resort.verdict[activeLocale]}
                  </div>
                  <Link
                    href={`/${activeLocale}${resort.hrefSlug}`}
                    className="inline-flex items-center gap-1 font-bold text-sky-700 hover:underline"
                  >
                    {t.resortOpenLink}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* 5. Parent Survival Guide 2026 (Heat Escapes, 4 Rules & 10 Phrases) */}
      <section id="parent-guide" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaShieldAlt /> {t.guideEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.guideTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.guideSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setGuideTab('heat-rules')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                guideTab === 'heat-rules'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.tabHeatAndRules}
            </button>
            <button
              type="button"
              onClick={() => setGuideTab('phrases')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                guideTab === 'phrases'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.tabPhrases}
            </button>
          </div>
        </div>

        {guideTab === 'heat-rules' ? (
          <div className="space-y-8">
            {/* 4 Heat-Escape Scenarios */}
            <div className="space-y-3">
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FaSun className="text-amber-500" /> {t.heatTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {HEAT_ESCAPE_IDEAS.map((idea) => (
                  <div
                    key={idea.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                        <FaWater size={10} /> {idea.timeWindow}
                      </span>
                      <FaTree className="text-emerald-600 text-sm" />
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {idea.title[activeLocale]}
                    </h4>
                    <p className="text-xs font-bold text-slate-800 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                      <span className="text-slate-500 font-semibold">{t.heatPlacesLabel} </span>
                      {idea.places[activeLocale]}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {idea.summary[activeLocale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Essential Rules 2026 */}
            <div className="space-y-3">
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FaInfoCircle className="text-sky-600" /> {t.rulesTitle}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {PARENT_RULES_2026.map((rule) => (
                  <div
                    key={rule.id}
                    className="bg-white rounded-2xl border-2 border-slate-900 shadow-sm overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="px-5 py-3.5 bg-slate-900 text-white">
                        <span className="block text-[10px] font-extrabold uppercase tracking-widest text-sky-300">
                          {rule.badge[activeLocale]}
                        </span>
                        <h4 className="text-sm sm:text-base font-extrabold leading-snug mt-0.5">
                          {rule.title[activeLocale]}
                        </h4>
                      </div>
                      <div className="p-5 space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                        <p className="leading-relaxed">{rule.summary[activeLocale]}</p>
                        <div className="p-3 rounded-xl bg-sky-50 border border-sky-200/70 text-xs text-sky-950 font-semibold">
                          {rule.actionHint[activeLocale]}
                        </div>
                      </div>
                    </div>
                    {rule.linkHref && rule.linkLabel && (
                      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
                        <Link
                          href={`/${activeLocale}${rule.linkHref}`}
                          className="text-xs font-extrabold text-sky-700 hover:underline inline-flex items-center gap-1"
                        >
                          {rule.linkLabel[activeLocale]}
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 10 Turkish Parent Phrases */
          <div className="portal-card p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                {t.phrasesTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                {t.phrasesSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {PARENT_PHRASES.map((p) => (
                <div
                  key={p.trPhrase}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-sm font-extrabold text-slate-900">{p.trPhrase}</strong>
                    {activeLocale === 'ru' && (
                      <span className="text-[11px] font-semibold text-sky-700">
                        [{p.pronunciation}]
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-800">{p.translation[activeLocale]}</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {p.context[activeLocale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Cross-Link Portal CTA Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-sky-300">
              <FaCheckCircle /> {t.crossEyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold">{t.crossTitle}</h3>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              {t.crossDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-shrink-0">
            <Link
              href={`/${activeLocale}/gastronomy`}
              className="px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaUtensils size={11} /> {t.btnGastro}
            </Link>
            <Link
              href={`/${activeLocale}/diving-fishing`}
              className="px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaFish size={11} /> {t.btnFish}
            </Link>
            <Link
              href={`/${activeLocale}/services/transfers`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaCarSide size={11} className="text-sky-300" /> {t.btnTransfers}
            </Link>
            <Link
              href={`/${activeLocale}/pharmacies`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-emerald-300" /> {t.btnPharmacies}
            </Link>
            <Link
              href={`/${activeLocale}/articles/family-vacation-kids-entertainment`}
              className="sm:col-span-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 text-xs font-semibold text-center border border-white/10 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaChevronRight size={9} className="text-sky-300" /> {t.btnArticleFamily}
            </Link>
          </div>
        </div>
      </section>

      {/* Activity Detail Modal */}
      {modalActivity && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setModalActivity(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={modalActivity.name[activeLocale]}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-72 bg-slate-900">
              <Image
                src={modalActivity.image}
                alt={modalActivity.name[activeLocale]}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

              <button
                type="button"
                onClick={() => setModalActivity(null)}
                aria-label={t.modalClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/20"
              >
                <FaTimes size={14} />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getActivityCategoryBadgeClass(
                      modalActivity.category
                    )}`}
                  >
                    {t.catLabels[modalActivity.category]}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getStrollerBadgeClass(
                      modalActivity.stroller
                    )}`}
                  >
                    {t.strollerGradeLabels[modalActivity.stroller]}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  {modalActivity.name[activeLocale]}
                </h3>
                <p className="text-xs sm:text-sm text-sky-200 font-semibold mt-0.5">
                  {modalActivity.shortSubtitle[activeLocale]}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">{t.metricBudget}</span>
                  <strong className="text-sky-700 font-extrabold">
                    {modalActivity.familyBudgetEur === '0 €'
                      ? t.freeLabel
                      : modalActivity.familyBudgetEur}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">{t.metricDlm}</span>
                  <strong className="text-slate-900 font-extrabold">
                    {modalActivity.dlmDriveRange[activeLocale]}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">{t.spotMetricAges}</span>
                  <strong className="text-slate-900 font-extrabold">
                    {modalActivity.ageGroups.map((a) => t.ageLabels[a]).join(' · ')}
                  </strong>
                </div>
              </div>

              {/* 12-Month Seasonality Strip */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-sky-600" /> {t.modalSeasonTitle}
                </h4>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                  {t.monthShortNames.map((mName, idx) => {
                    const status = modalActivity.seasonality[idx] || 'cool';
                    return (
                      <div
                        key={mName}
                        className={`py-1.5 rounded-lg text-center text-[11px] font-bold border ${getSeasonCellClass(
                          status
                        )}`}
                      >
                        {mName}
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] font-bold text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-600" /> {t.seasonLegendPeak}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-sky-200 border border-sky-300" />{' '}
                    {t.seasonLegendGood}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-200" />{' '}
                    {t.seasonLegendCool}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-300" />{' '}
                    {t.seasonLegendClosed}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-2">
                  {modalActivity.seasonNote[activeLocale]}
                </p>
              </div>

              {/* Details & Checklists */}
              <div className="space-y-4 text-xs sm:text-sm">
                <p className="text-slate-700 font-medium leading-relaxed">
                  {modalActivity.description[activeLocale]}
                </p>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1.5">
                    <FaSuitcase /> {t.modalWhatToPack}
                  </h4>
                  <p className="text-emerald-950 font-medium leading-relaxed">
                    {modalActivity.whatToPack[activeLocale]}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                    <FaExclamationTriangle /> {t.modalParentWarning}
                  </h4>
                  <p className="text-amber-950 font-medium leading-relaxed">
                    {modalActivity.parentWarning[activeLocale]}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-500 mb-2">{t.modalWhereToGo}</p>
                  <div className="flex flex-wrap gap-2">
                    {modalActivity.recommendedSpotIds.map((spotId) => {
                      const spot = FAMILY_SPOTS.find((s) => s.id === spotId);
                      if (!spot) return null;
                      return (
                        <button
                          key={spotId}
                          type="button"
                          onClick={() => handleJumpFromModalToSpot(spot.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold transition-colors"
                        >
                          <FaMapMarkerAlt size={10} className="text-sky-300" />
                          <span>{spot.name[activeLocale]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                {modalActivity.photoCredit ? (
                  <span className="text-slate-500 font-medium">
                    {t.modalPhotoCredit} {modalActivity.photoCredit}
                  </span>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  onClick={() => setModalActivity(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs transition-colors"
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
