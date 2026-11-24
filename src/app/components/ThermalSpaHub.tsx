"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCar,
  FaCheckCircle,
  FaClock,
  FaCompass,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaFire,
  FaFlask,
  FaHeartbeat,
  FaHotTub,
  FaInfoCircle,
  FaRoute,
  FaShieldAlt,
  FaSpa,
  FaSun,
  FaThermometerHalf,
  FaTimesCircle,
  FaUsers,
  FaWater,
} from 'react-icons/fa';
import ThermalSpa3DMap from './ThermalSpa3DMap';
import {
  HAMMAM_STAGES,
  THERMAL_CALENDAR,
  THERMAL_CROWD_SLOTS,
  THERMAL_REGION_PRESETS,
  THERMAL_SAFETY_RULES_2026,
  THERMAL_SPRINGS,
  WELLNESS_PACKAGES,
  WELLNESS_VENUES,
  type LocaleCode,
  type SpringFilterId,
  type ThermalRegionId,
  type ThermalSafetyRule,
} from '@/lib/thermal-spa';

type WellnessGoal = 'thermal' | 'hammam' | 'spa';
type SkinStatus = 'before-tan' | 'tanned' | 'sunburned';
type HealthProfile = 'healthy' | 'bp-varicose' | 'scuba';
type TransportMode = 'car' | 'boat-tour';

interface HubCopy {
  inflationTitle: string;
  inflationDesc: string;
  mapEyebrow: string;
  mapTitle: string;
  mapSubtitle: string;
  showAllRegionsBtn: string;
  springsEyebrow: string;
  springsTitle: string;
  springsSubtitle: string;
  filterLabels: Record<SpringFilterId, string>;
  springTempLabel: string;
  springMineralsLabel: string;
  springHoursLabel: string;
  springDlmLabel: string;
  springHighlightsLabel: string;
  springFocusMapBtn: string;
  springGmapsBtn: string;
  crowdTitle: string;
  crowdSubtitle: string;
  crowdSvgTitle: string;
  crowdPeakBadge: string;
  crowdLowBadge: string;
  crowdClickHint: string;
  crowdTempFeelLabel: string;
  crowdBoatLabel: string;
  crowdTipLabel: string;
  ritualEyebrow: string;
  ritualTitle: string;
  ritualSubtitle: string;
  ritualStageImgAlt: string;
  ritualTempLabel: string;
  ritualDurLabel: string;
  ritualTipLabel: string;
  checkerTitle: string;
  checkerSubtitle: string;
  checkerGoalLabel: string;
  checkerSkinLabel: string;
  checkerHealthLabel: string;
  checkerTransportLabel: string;
  goalOpts: { id: WellnessGoal; label: string }[];
  skinOpts: { id: SkinStatus; label: string }[];
  healthOpts: { id: HealthProfile; label: string }[];
  transportOpts: { id: TransportMode; label: string }[];
  verdictStop: string;
  verdictCaution: string;
  verdictReady: string;
  checkerFocusBtn: string;
  pkgEyebrow: string;
  pkgTitle: string;
  pkgSubtitle: string;
  tabThermalFirst: string;
  tabHammamSecond: string;
  includedLabel: string;
  insiderTipLabel: string;
  venuesTitle: string;
  venuesSubtitle: string;
  calEyebrow: string;
  calTitle: string;
  calSubtitle: string;
  calAirTemp: string;
  calSpringTemp: string;
  calBestPick: string;
  monthNames: string[];
  monthShortNames: string[];
  bannerEyebrow: string;
  bannerTitle: string;
  bannerDesc: string;
  btnKoycegizArticle: string;
  btnPamukkaleArticle: string;
  btnCarRental: string;
  btnParagliding: string;
  rulesEyebrow: string;
  rulesTitle: string;
  rulesSubtitle: string;
  sourceLabel: string;
}

const HUB_COPY: Record<LocaleCode, HubCopy> = {
  ru: {
    inflationTitle: 'Главный секрет экономии 2026: термы 100–150 ₺ и правило серебра',
    inflationDesc:
      'В отличие от курортных СПА (€55–€120), главные горячие радоново-серные источники Султание управляются муниципалитетом и стоят 100–150 ₺ (~€2–3,5), а селеновые бассейны Капыкаргын и содово-серное озеро Датчи — вообще бесплатны. Важно: перед заходом в любой серный источник снимите ВСЁ серебро и часы — металл чернеет за 5 минут!',
    mapEyebrow: '3D-КАРТА ГОРЯЧИХ ИСТОЧНИКОВ, ГРЯЗЕЙ И ХАММАМОВ',
    mapTitle: 'Термы Султание, Даламан Капыкаргын, Датча, Паспатур и Памуккале',
    mapSubtitle:
      'Выбирайте геотермальный кластер, нажимайте на оранжевые пины горячих источников (°C), янтарные грязи (MUD) и бирюзовые исторические бани (H).',
    showAllRegionsBtn: 'Весь берег + Памуккале',
    springsEyebrow: 'ГОРЯЧИЕ ИСТОЧНИКИ И ГРЯЗИ В ПЕРВУЮ ОЧЕРЕДЬ',
    springsTitle: '6 природных источников и термальных зон побережья (сравнение и честные мифы)',
    springsSubtitle:
      'От радоновых купелей +42 °C в Султание и бесплатного селена у аэропорта до Памуккале (+36 °C / +58 °C) и честного разбора Бухты Клеопатры.',
    filterLabels: {
      all: 'Все источники (6)',
      hot: 'Горячие 35–58 °C',
      mud: 'Сера и лечебные грязи',
      'free-budget': 'Бесплатно или ~2–3 €',
    },
    springTempLabel: 'Вода',
    springMineralsLabel: 'Минеральный состав',
    springHoursLabel: 'Режим / Доступ',
    springDlmLabel: 'От аэропорта DLM',
    springHighlightsLabel: 'Чем интересен источник:',
    springFocusMapBtn: 'Показать в 3D ↑',
    springGmapsBtn: 'Google Maps',
    crowdTitle: 'Когда ехать в Султание и Дальян, чтобы не толкаться с лодками (08:30–18:30)',
    crowdSubtitle:
      'Нажмите на любой час дня на графике: с 11:30 до 15:30 приходят десятки экскурсионных теплоходов, а к 08:30 и после 16:00 термы почти пусты.',
    crowdSvgTitle: 'Загрузка источников Султание лодочными группами по часам (%)',
    crowdPeakBadge: 'Пик теплоходов (11:30–15:30)',
    crowdLowBadge: 'Свободно (08:30 / 16:30+)',
    crowdClickHint: 'Кликните на столбец или время ↓',
    crowdTempFeelLabel: 'Атмосфера у воды',
    crowdBoatLabel: 'Трафик туристов',
    crowdTipLabel: 'Лайфхак:',
    ritualEyebrow: 'КЛАССИЧЕСКИЙ ХАММАМ (5 ЭТАПОВ) И ЧЕКЕР БЕЗОПАСНОСТИ',
    ritualTitle: 'Как устроен османский хаммам + подбор процедур без вреда здоровью',
    ritualSubtitle:
      'Пройдите 5 шагов от раздевалки Джамекян до горячего мрамора Гёбек-таши и проверьте противопоказания (давление, загар, дайвинг).',
    ritualStageImgAlt: 'Исторический купол османского хаммама со звёздчатыми световыми окнами и фонарями',
    ritualTempLabel: 'Температура',
    ritualDurLabel: 'Этап',
    ritualTipLabel: 'Этикет и совет:',
    checkerTitle: 'Интерактивный чекер допуска и подбора источника / хаммама',
    checkerSubtitle: 'Укажите ваши планы, состояние кожи, здоровье и транспорт:',
    checkerGoalLabel: '1. Что хочется сейчас?',
    checkerSkinLabel: '2. Состояние кожи и загара',
    checkerHealthLabel: '3. Здоровье и недавний дайвинг',
    checkerTransportLabel: '4. Как вы передвигаетесь?',
    goalOpts: [
      { id: 'thermal', label: 'Горячие термы / грязи' },
      { id: 'hammam', label: 'Хаммам + скраб кесе' },
      { id: 'spa', label: 'Спокойное СПА / массаж' },
    ],
    skinOpts: [
      { id: 'before-tan', label: '1–2 день (до загара)' },
      { id: 'tanned', label: 'Уже загорел(а)' },
      { id: 'sunburned', label: 'Свежий ожог кожи!' },
    ],
    healthOpts: [
      { id: 'healthy', label: 'Без ограничений' },
      { id: 'bp-varicose', label: 'Давление / Беременность / Варикоз' },
      { id: 'scuba', label: 'Был дайвинг < 24 ч назад!' },
    ],
    transportOpts: [
      { id: 'car', label: 'Своя / арендная машина' },
      { id: 'boat-tour', label: 'Без машины (лодка / трансфер)' },
    ],
    verdictStop: '⛔ СТОП: ПРОЦЕДУРА СЕЙЧАС ПРОТИВОПОКАЗАНА',
    verdictCaution: '⚠️ С ОСТОРОЖНОСТЬЮ / КОРРЕКЦИЯ РЕЖИМА',
    verdictReady: '✅ ИДЕАЛЬНОЕ СОВПАДЕНИЕ · ПОЛНЫЙ ДОПУСК',
    checkerFocusBtn: 'Показать на 3D-карте ↑',
    pkgEyebrow: 'ЦЕНЫ 2026: ТЕРМЫ VS ХАММАМЫ И СПИСОК КОМПЛЕКСОВ',
    pkgTitle: 'Сравнение бюджетов 2026: от 0–3 € на источниках до €120 в маринах',
    pkgSubtitle:
      'По умолчанию показаны природные горячие источники и грязи, на второй вкладке — муниципальные, исторические и 5★ хаммамы.',
    tabThermalFirst: '♨️ Горячие источники и грязи',
    tabHammamSecond: '🧖 Турецкие хаммамы и СПА',
    includedLabel: 'Что включено и важные нюансы:',
    insiderTipLabel: 'Совет инсайдера:',
    venuesTitle: 'Ключевые термальные центры, старинные бани и СПА региона',
    venuesSubtitle: 'Проверенные ориентиры от озера Кёйджегиз и Даламана до Фетхие, Датчи и Каша:',
    calEyebrow: 'КРУГЛОГОДИЧНЫЙ КАЛЕНДАРЬ (12 МЕСЯЦЕВ)',
    calTitle: 'Почему горячие источники лучше всего с октября по апрель',
    calSubtitle:
      'В отличие от пляжей, термы 40 °C и хаммамы не знают зимнего простоя — зимой они дают максимальный кайф без лодочных толп.',
    calAirTemp: 'Воздух на улице',
    calSpringTemp: 'Вода в термах',
    calBestPick: 'Лучший выбор месяца',
    monthNames: [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ],
    monthShortNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    bannerEyebrow: 'АВТО-МАРШРУТЫ И ДРУГИЕ ГИДЫ ПОРТАЛА',
    bannerTitle: 'Как добраться до тихих источников без экскурсионных толп?',
    bannerDesc:
      'Арендуйте авто для заезда на закат в Султание или утренний Капыкаргын, изучите наш гид по озеру Кёйджегиз, Памуккале или поднимитесь на Бабадаг (через 24 ч после дайвинга).',
    btnKoycegizArticle: 'Статья: Озеро Кёйджегиз и Султание',
    btnPamukkaleArticle: 'Статья: Памуккале в 2026 году',
    btnCarRental: 'Сервис: Аренда авто у DLM →',
    btnParagliding: 'Хаб: Параглайдинг (Бабадаг) →',
    rulesEyebrow: 'ЗДОРОВЬЕ, ХИМИЯ СЕРЫ И ЭТИКЕТ 2026',
    rulesTitle: '4 главных правила терм, серебра, загара и скорой 112',
    rulesSubtitle:
      'Короткий чек-лист перед тем, как зайти в горячую радоновую купель или лечь на мрамор к банщику.',
    sourceLabel: 'Источник:',
  },
  en: {
    inflationTitle: '2026 Value Secret: 100–150 ₺ Hot Springs & Silver Jewelry Rule',
    inflationDesc:
      'While luxury marina spas charge €55–€120+, Lake Köyceğiz’s flagship 39–42 °C Sultaniye Hot Springs are municipally operated at just 100–150 ₺ (~€2–3.5), and Kapıkargın Kükürt & Datça Ilıca are completely free! Critical chemistry alert: remove ALL silver rings, necklaces, and watches before approaching sulfur pools—metal tarnishes black in 5 minutes.',
    mapEyebrow: '3D GEOTHERMAL, MUD BATHS & HAMMAM MAP',
    mapTitle: 'Sultaniye Springs, Kapıkargın, Datça, Paspatur & Pamukkale in 3D',
    mapSubtitle:
      'Switch between coastal geothermal clusters, tap orange hot-spring pins (°C), amber mud bays (MUD), and cyan historic baths (H).',
    showAllRegionsBtn: 'Full Region + Pamukkale',
    springsEyebrow: 'HOT SPRINGS & MINERAL MUDS FIRST',
    springsTitle: '6 Real Geothermal Springs & Mud Complexes (Temps, Minerals & Myths)',
    springsSubtitle:
      'From 42 °C lakeside radon domes in Sultaniye and free selenium pools 10 min from DLM to reopened Pamukkale (+36 °C / +58 °C) and Cleopatra Bay myths.',
    filterLabels: {
      all: 'All Springs (6)',
      hot: 'Hot Pools 35–58 °C',
      mud: 'Sulfur & Peloid Muds',
      'free-budget': 'Free or €2–3 Gate',
    },
    springTempLabel: 'Water Temp',
    springMineralsLabel: 'Mineral Chemistry',
    springHoursLabel: 'Hours & Access',
    springDlmLabel: 'From DLM Airport',
    springHighlightsLabel: 'Why visit this spring:',
    springFocusMapBtn: 'Focus in 3D ↑',
    springGmapsBtn: 'Google Maps',
    crowdTitle: 'Sultaniye & Dalyan Boat-Wave Timing (08:30–18:30)',
    crowdSubtitle:
      'Click any hourly column: excursion boats flood docks between 11:30 and 15:30, whereas driving at 08:30 or after 16:00 gives near-private lakeside soaking.',
    crowdSvgTitle: 'Estimated Sultaniye Dock Crowd Pressure Across Day (%)',
    crowdPeakBadge: 'Tour Boat Peak (11:30–15:30)',
    crowdLowBadge: 'Quiet Self-Drive (08:30 / 16:30+)',
    crowdClickHint: 'Tap an hourly bar below ↓',
    crowdTempFeelLabel: 'Lake & Air Atmosphere',
    crowdBoatLabel: 'Visitor Traffic',
    crowdTipLabel: 'Timing hack:',
    ritualEyebrow: '5-STAGE OTTOMAN HAMMAM & MEDICAL READINESS',
    ritualTitle: 'Inside a Genuine Turkish Hammam + Wellness Safety Checker',
    ritualSubtitle:
      'Walk step-by-step from Camekan disrobing rooms to the heated Göbek Taşı marble slab and test contraindications (sunburn, blood pressure, recent diving).',
    ritualStageImgAlt: 'Historic Ottoman stone bathhouse dome with geometric star skylights and glowing brass lanterns',
    ritualTempLabel: 'Temperature',
    ritualDurLabel: 'Phase',
    ritualTipLabel: 'Etiquette & tip:',
    checkerTitle: 'Interactive Thermal & Hammam Readiness Checker',
    checkerSubtitle: 'Set your goal, skin tan state, health profile, and transport mode:',
    checkerGoalLabel: '1. Preferred experience',
    checkerSkinLabel: '2. Current skin / tan state',
    checkerHealthLabel: '3. Health & scuba profile',
    checkerTransportLabel: '4. Transport mode',
    goalOpts: [
      { id: 'thermal', label: 'Hot Springs & Muds' },
      { id: 'hammam', label: 'Hammam + Kese Scrub' },
      { id: 'spa', label: 'Gentle Massage / Spa' },
    ],
    skinOpts: [
      { id: 'before-tan', label: 'Day 1–2 (Pre-Tan)' },
      { id: 'tanned', label: 'Already Tanned' },
      { id: 'sunburned', label: 'Fresh Sunburn!' },
    ],
    healthOpts: [
      { id: 'healthy', label: 'No Restrictions' },
      { id: 'bp-varicose', label: 'High BP / Pregnancy / Varicose' },
      { id: 'scuba', label: 'Scuba Dived <24h Ago!' },
    ],
    transportOpts: [
      { id: 'car', label: 'Rental / Own Car' },
      { id: 'boat-tour', label: 'Boat Tour / Hotel Transfer' },
    ],
    verdictStop: '⛔ STOP: NOT RECOMMENDED RIGHT NOW',
    verdictCaution: '⚠️ MODIFIED / CONSULT DOCTOR OR ADJUST PLAN',
    verdictReady: '✅ PERFECT MATCH · ALL CLEAR',
    checkerFocusBtn: 'Show Spot on 3D Map ↑',
    pkgEyebrow: '2026 RATES: HOT SPRINGS VS HAMMAMS & VENUES',
    pkgTitle: 'Price Guide 2026: From Free / €2–3 Springs to €120 Marina Suites',
    pkgSubtitle:
      'Default tab covers natural hot springs & mud excursions first; toggle the second tab for local municipal, historic Ottoman & 5★ spas.',
    tabThermalFirst: '♨️ Hot Springs & Mud Baths',
    tabHammamSecond: '🧖 Turkish Hammams & Spas',
    includedLabel: 'Included & key conditions:',
    insiderTipLabel: 'Insider tip:',
    venuesTitle: 'Featured Thermal Complexes, Historic Bathhouses & Marina Spas',
    venuesSubtitle: 'Verified spots spanning Lake Köyceğiz, Dalaman Airport area, Fethiye, Datça & Kaş:',
    calEyebrow: '12-MONTH GEOTHERMAL & HAMMAM CALENDAR',
    calTitle: 'Why Hot Springs Shine Brightest From October Through April',
    calSubtitle:
      'Geothermal 40 °C water and heated marble slabs deliver pure magic on cool autumn and winter days—completely free of peak summer boat crowds.',
    calAirTemp: 'Outside Air',
    calSpringTemp: 'Thermal Water',
    calBestPick: 'Monthly sweet spot',
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    bannerEyebrow: 'SELF-DRIVE ROUTES & RELATED GUIDES',
    bannerTitle: 'Want Quiet Hot Springs Without Midday Tour Boats?',
    bannerDesc:
      'Rent a car to catch sunset soaks at Sultaniye or morning pools near Dalaman Airport, read our Lake Köyceğiz & Pamukkale guides, or fly from Babadağ.',
    btnKoycegizArticle: 'Guide: Lake Köyceğiz & Sultaniye',
    btnPamukkaleArticle: 'Guide: Pamukkale & Antique Pool',
    btnCarRental: 'Service: Car Rental at DLM →',
    btnParagliding: 'Hub: Babadağ Paragliding 3D →',
    rulesEyebrow: 'MEDICAL SAFETY, SULFUR CHEMISTRY & ETIQUETTE',
    rulesTitle: '4 Essential Rules for 40 °C Springs, Silver Jewelry, Kese & 112',
    rulesSubtitle:
      'Quick safety briefing before immersing in radon pools or stepping onto hot hammam marble.',
    sourceLabel: 'Source:',
  },
  de: {
    inflationTitle: 'Spar-Tipp 2026: Gemeinde-Thermen für 100–150 ₺ & Silber-Warnung',
    inflationDesc:
      'Während Luxus-Hotel-Spas 55–120 € kosten, kostet das 40 °C heiße Thermalbad Sultaniye nur 100–150 ₺ (~2–3,5 €), und die Schwefelpools Kapıkargın sowie Datça Ilıca Gölü sind sogar kostenlos! Wichtig: Vor jedem Schwefelbad Silberschmuck und Uhren ablegen—Sie laufen binnen Minuten tiefschwarz an.',
    mapEyebrow: '3D-KARTE: THERMALQUELLEN, SCHLAMMBÄDER & HAMAMS',
    mapTitle: 'Sultaniye, Kapıkargın, Datça, Paspatur & Pamukkale im 3D-Blick',
    mapSubtitle:
      'Wählen Sie eine Region und prüfen Sie orange Thermalquellen (°C), bernsteinfarbene Schlammbäder (MUD) und historische Kuppel-Hamams (H).',
    showAllRegionsBtn: 'Ganze Küste + Pamukkale',
    springsEyebrow: 'THERMALQUELLEN & HEILSCHLAMM ZUERST',
    springsTitle: '6 reale Thermal- & Schlammquellen (Temperaturen, Mineralien & Mythen)',
    springsSubtitle:
      'Von den 42 °C-Radonbecken in Sultaniye über Selenquellen 10 Min. ab DLM bis Pamukkale (+36 °C / +58 °C) und der Wahrheit über Kleopatras Bucht.',
    filterLabels: {
      all: 'Alle Quellen (6)',
      hot: 'Heiß 35–58 °C',
      mud: 'Schwefel & Heilschlamm',
      'free-budget': 'Gratis oder ~2–3 €',
    },
    springTempLabel: 'Wassertemperatur',
    springMineralsLabel: 'Mineralien',
    springHoursLabel: 'Öffnung & Zugang',
    springDlmLabel: 'Ab Flughafen DLM',
    springHighlightsLabel: 'Besonderheiten:',
    springFocusMapBtn: 'In 3D zeigen ↑',
    springGmapsBtn: 'Google Maps',
    crowdTitle: 'Wann Sultaniye ruhig ist: Bootswelle vs. Selbstfahrer (08:30–18:30)',
    crowdSubtitle:
      'Klicken Sie auf eine Stunde: Zwischen 11:30 und 15:30 Uhr füllen Ausflugsboote das Ufer—um 08:30 Uhr oder ab 16:00 Uhr gehört das Wasser Ihnen.',
    crowdSvgTitle: 'Besucheraufkommen an den Quellen von Sultaniye (%)',
    crowdPeakBadge: 'Bootsspitze (11:30–15:30)',
    crowdLowBadge: 'Ruhige Zeiten (08:30 / 16:30+)',
    crowdClickHint: 'Auf eine Stunde klicken ↓',
    crowdTempFeelLabel: 'Klima am See',
    crowdBoatLabel: 'Besucherlage',
    crowdTipLabel: 'Zeit-Tipp:',
    ritualEyebrow: 'KLASSISCHES HAMAM (5 SCHRITTE) & GESUNDHEITSCHECK',
    ritualTitle: 'So funktioniert das echte türkische Hamam + Eignungs-Check',
    ritualSubtitle:
      'Entdecken Sie alle 5 Kammern vom Camekan bis zum Marmorstein Göbek Taşı und testen Sie Sonnenbrand-, Kreislauf- und Tauchregeln.',
    ritualStageImgAlt: 'Historische osmanische Hamam-Kuppel mit Sternenfenstern und warmem Laternenlicht',
    ritualTempLabel: 'Temperatur',
    ritualDurLabel: 'Phase',
    ritualTipLabel: 'Etikette & Tipp:',
    checkerTitle: 'Schnell-Check: Welche Quelle oder welches Hamam passt heute?',
    checkerSubtitle: 'Wählen Sie Wunsch, Hautstatus, Gesundheit und Anreise:',
    checkerGoalLabel: '1. Gewünschtes Erlebnis',
    checkerSkinLabel: '2. Aktueller Bräunungsstatus',
    checkerHealthLabel: '3. Gesundheit & Tauchen',
    checkerTransportLabel: '4. Mobilität vor Ort',
    goalOpts: [
      { id: 'thermal', label: 'Thermalquellen & Schlamm' },
      { id: 'hammam', label: 'Hamam + Kese-Peeling' },
      { id: 'spa', label: 'Sanftes Spa / Massage' },
    ],
    skinOpts: [
      { id: 'before-tan', label: 'Tag 1–2 (Vor Bräune)' },
      { id: 'tanned', label: 'Schon gebräunt' },
      { id: 'sunburned', label: 'Frischer Sonnenbrand!' },
    ],
    healthOpts: [
      { id: 'healthy', label: 'Keine Einschränkungen' },
      { id: 'bp-varicose', label: 'Bluthochdruck / Schwanger / Krampfadern' },
      { id: 'scuba', label: 'Getaucht vor < 24 Std.!' },
    ],
    transportOpts: [
      { id: 'car', label: 'Mietwagen' },
      { id: 'boat-tour', label: 'Bootstour / Hotel-Shuttle' },
    ],
    verdictStop: '⛔ STOPP: ANWENDUNG AKTUELL NICHT EMPFOHLEN',
    verdictCaution: '⚠️ MIT VORSICHT / ANPASSUNG EMPFOHLEN',
    verdictReady: '✅ PERFEKTES MATCH · VOLL BEREIT',
    checkerFocusBtn: 'Ort auf 3D-Karte zeigen ↑',
    pkgEyebrow: 'PREISE 2026: THERMEN VS. HAMAMS & ADRESSEN',
    pkgTitle: 'Kostenvergleich 2026: Von Gratis-Quellen bis zum 5★-Marina-Spa',
    pkgSubtitle:
      'Im ersten Tab stehen Thermal- und Schlammbäder im Fokus; der zweite Tab zeigt Stadt-, Kuppel- und Luxus-Hamams.',
    tabThermalFirst: '♨️ Thermalquellen & Schlammbäder',
    tabHammamSecond: '🧖 Türkische Hamams & Spas',
    includedLabel: 'Leistungen & Hinweise:',
    insiderTipLabel: 'Insider-Tipp:',
    venuesTitle: 'Ausgewählte Thermalbäder, historische Hamams & Spas',
    venuesSubtitle: 'Bekannte Adressen von Köyceğiz und Dalaman bis Fethiye, Datça und Kaş:',
    calEyebrow: 'GANZJAHRES-KALENDER (12 MONATE)',
    calTitle: 'Warum Oktober bis April die schönste Thermal-Saison sind',
    calSubtitle:
      'Wenn es draußen kühler wird, entfalten 40 °C-Quellen und heißer Marmor ihren ganzen Zauber ganz ohne Sommerhitze.',
    calAirTemp: 'Außentemperatur',
    calSpringTemp: 'Quelltemperatur',
    calBestPick: 'Empfehlung des Monats',
    monthNames: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
    ],
    monthShortNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    bannerEyebrow: 'MIETWAGEN-ROUTEN & WEITERE GUIDES',
    bannerTitle: 'Die ruhigen Quellen abseits der Ausflugsboote erleben?',
    bannerDesc:
      'Mit dem Mietwagen genießen Sie Sultaniye zum Sonnenuntergang oder Kapıkargın direkt ab DLM—lesen Sie auch unsere Guides zu Köyceğiz und Pamukkale.',
    btnKoycegizArticle: 'Guide: Köyceğiz-See & Sultaniye',
    btnPamukkaleArticle: 'Guide: Pamukkale & Antikpool',
    btnCarRental: 'Service: Mietwagen ab DLM →',
    btnParagliding: 'Hub: Babadağ Paragliding 3D →',
    rulesEyebrow: 'MEDIZINISCHE REGELN, SCHWEFEL & ETIKETTE',
    rulesTitle: '4 goldene Regeln zu 20-Min-Limit, Silberschmuck, Kese & 112',
    rulesSubtitle:
      'Das Wichtigste zu Kreislauf, Schmuckschutz und Ablauf im Schlammbad.',
    sourceLabel: 'Quelle:',
  },
  tr: {
    inflationTitle: '2026 Tasarruf Sırrı: 100–150 ₺ Belediye Kaplıcası & Gümüş Uyarısı',
    inflationDesc:
      'Lüks marina spaları €55–€120+ bandındayken, Köyceğiz Belediyesi tarafından işletilen 39–42 °C Sultaniye Kaplıcaları yalnızca 100–150 ₺ (~€2–3,5), Dalaman Kapıkargın ve Datça Ilıca Gölü ise tamamen ücretsizdir! Önemli uyarı: Kükürtlü suya veya çamura girmeden önce TÜM gümüş yüzük, kolye ve saatlerinizi çıkarın—dakikalar içinde kararır.',
    mapEyebrow: '3D KAPLICA, ÇAMUR BANYOSU VE HAMAM HARİTASI',
    mapTitle: 'Sultaniye, Kapıkargın, Datça, Paspatur ve Pamukkale 3D Görünümü',
    mapSubtitle:
      'Termal bölgeler arasında geçiş yapın; turuncu sıcak kaynakları (°C), kehribar çamur alanlarını (MUD) ve camgöbeği tarihî hamamları (H) inceleyin.',
    showAllRegionsBtn: 'Tüm Kıyı + Pamukkale',
    springsEyebrow: 'ÖNCELİKLİ OLARAK SICAK KAPLICALAR VE ŞİFALI ÇAMURLAR',
    springsTitle: 'Bölgenin 6 Doğal Termal ve Çamur Noktası (Sıcaklık, Mineral & Gerçekler)',
    springsSubtitle:
      'Sultaniye’nin 42 °C radonlu sularından DLM yanındaki ücretsiz selenyuma, Mayıs 2026’da açılan Pamukkale Antik Havuz’a ve Hamam Koyu gerçeğine kadar.',
    filterLabels: {
      all: 'Tümü (6 Nokta)',
      hot: 'Sıcak Havuz (35–58 °C)',
      mud: 'Kükürt & Peloid Çamur',
      'free-budget': 'Ücretsiz veya 100–150 ₺',
    },
    springTempLabel: 'Su Sıcaklığı',
    springMineralsLabel: 'Mineral Yapısı',
    springHoursLabel: 'Saat & Erişim',
    springDlmLabel: 'DLM Mesafesi',
    springHighlightsLabel: 'Öne çıkan faydalar:',
    springFocusMapBtn: '3D Haritada Gör ↑',
    springGmapsBtn: 'Google Haritalar',
    crowdTitle: 'Sultaniye’ye Tekne Kalabalığına Yakalanmadan Gitme Saatleri (08:30–18:30)',
    crowdSubtitle:
      'Saat sütunlarına tıklayın: 11:30–15:30 arası tur tekneleriyle kalabalık zirve yaparken, 08:30 ve 16:00 sonrası termaller neredeyse bomboştur.',
    crowdSvgTitle: 'Sultaniye İskelesi Saatlik Ziyaretçi Yoğunluğu (%)',
    crowdPeakBadge: 'Tekne Yoğunluğu (11:30–15:30)',
    crowdLowBadge: 'Sakin Saatler (08:30 / 16:30+)',
    crowdClickHint: 'Bir saat dilimine dokunun ↓',
    crowdTempFeelLabel: 'Göl ve Hava Durumu',
    crowdBoatLabel: 'Tur Trafiği',
    crowdTipLabel: 'Saat ipucu:',
    ritualEyebrow: '5 AŞAMALI OSMANLI HAMAMI & SAĞLIK KONTROLÜ',
    ritualTitle: 'Gerçek Türk Hamamı Ritüeli ve Kişisel Uygunluk Testi',
    ritualSubtitle:
      'Camekandan Göbek Taşına 5 aşamalı tarihî hamam kültürünü inceleyin; güneş yanığı, tansiyon ve dalış sonrası kuralları kontrol edin.',
    ritualStageImgAlt: 'Işıklı fil gözü pencereli ve fenerli tarihî Osmanlı hamam kubbesi',
    ritualTempLabel: 'Sıcaklık',
    ritualDurLabel: 'Aşama',
    ritualTipLabel: 'Adab & İpucu:',
    checkerTitle: 'İnteraktif Kaplıca & Hamam Uygunluk Testi',
    checkerSubtitle: 'Hedefinizi, bronzluk durumunuzu, sağlık profilinizi ve ulaşım şeklinizi seçin:',
    checkerGoalLabel: '1. Ne deneyimlemek istiyorsunuz?',
    checkerSkinLabel: '2. Güneşlenme / Cilt Durumu',
    checkerHealthLabel: '3. Sağlık ve Dalış Geçmişi',
    checkerTransportLabel: '4. Ulaşım Şekliniz',
    goalOpts: [
      { id: 'thermal', label: 'Sıcak Kaplıca & Çamur' },
      { id: 'hammam', label: 'Hamam + Kese Köpük' },
      { id: 'spa', label: 'Yumuşak Spa / Masaj' },
    ],
    skinOpts: [
      { id: 'before-tan', label: 'İlk 1–2 Gün (Bronzluk Öncesi)' },
      { id: 'tanned', label: 'Bronzlaşmış Cilt' },
      { id: 'sunburned', label: 'Taze Güneş Yanığı!' },
    ],
    healthOpts: [
      { id: 'healthy', label: 'Kısıtlama Yok' },
      { id: 'bp-varicose', label: 'Tansiyon / Hamilelik / Varis' },
      { id: 'scuba', label: 'Son 24 Saatte Dalış Yaptım!' },
    ],
    transportOpts: [
      { id: 'car', label: 'Özel / Kiralık Araç' },
      { id: 'boat-tour', label: 'Tekne Turu / Transfer' },
    ],
    verdictStop: '⛔ DURUN: BU İŞLEM ŞU AN UYGUN DEĞİL',
    verdictCaution: '⚠️ DİKKATLİ / PLAN GÜNCELLEMESİ ÖNERİLİR',
    verdictReady: '✅ MÜKEMMEL UYUM · HAZIRSINIZ',
    checkerFocusBtn: '3D Haritada Göster ↑',
    pkgEyebrow: '2026 FİYATLARI: KAPLICALAR VS HAMAMLAR & TESİSLER',
    pkgTitle: '2026 Bütçe Rehberi: Ücretsiz Kaynaklardan €120 Butik Spaya',
    pkgSubtitle:
      'Varsayılan sekmede sıcak su ve çamur tesisleri yer alır; ikinci sekmeden yerel, tarihî ve 5★ hamam fiyatlarını karşılaştırabilirsiniz.',
    tabThermalFirst: '♨️ Sıcak Kaplıca & Çamur Tesisleri',
    tabHammamSecond: '🧖 Türk Hamamları & Spalar',
    includedLabel: 'Neler dâhil ve önemli kurallar:',
    insiderTipLabel: 'Yerel ipucu:',
    venuesTitle: 'Bölgenin Öne Çıkan Kaplıcaları, Tarihî Hamamları ve Spaları',
    venuesSubtitle: 'Köyceğiz, Dalaman, Fethiye, Datça ve Kaş genelindeki başlıca merkezler:',
    calEyebrow: '12 AYLIK TERMAL VE HAMAM TAKVİMİ',
    calTitle: 'Kaplıcalar Neden Ekim–Nisan Arasında Çok Daha Keyiflidir?',
    calSubtitle:
      'Deniz serinlediğinde +40 °C termal havuzlar ve sıcak mermer göbek taşı tekne kalabalığı olmadan yılın en yüksek dinlenme konforunu verir.',
    calAirTemp: 'Dış Hava',
    calSpringTemp: 'Kaynak Suyu',
    calBestPick: 'Ayın en iyi seçimi',
    monthNames: [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ],
    monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    bannerEyebrow: 'ARAÇ ROTALARI VE DİĞER REHBERLER',
    bannerTitle: 'Sakin Gün Batımı Kaplıcası İçin Araç veya Rehber mi Lazım?',
    bannerDesc:
      'Tekne kalabalığının çekildiği saatlerde Sultaniye veya Kapıkargın’a uğramak için araç kiralama seçeneklerine bakın ya da Köyceğiz ve Pamukkale rehberlerimizi okuyun.',
    btnKoycegizArticle: 'Rehber: Köyceğiz Gölü & Sultaniye',
    btnPamukkaleArticle: 'Rehber: Pamukkale & Antik Havuz',
    btnCarRental: 'Hizmet: DLM Araç Kiralama →',
    btnParagliding: 'Rehber: Babadağ Yamaç Paraşütü 3D →',
    rulesEyebrow: 'SAĞLIK KURALLARI, KÜKÜRT KİMYASI VE ADAB 2026',
    rulesTitle: '20 Dakika Sınırı, Gümüş Takılar, Kese ve Acil Hat 112 Kuralları',
    rulesSubtitle:
      'Termal havuza veya sıcak hamam mermerine adım atmadan önce bilmeniz gereken 4 temel kural.',
    sourceLabel: 'Kaynak:',
  },
};

function getRuleHeaderClass(tone: ThermalSafetyRule['tone']): string {
  switch (tone) {
    case 'cyan':
      return 'bg-cyan-700 text-white';
    case 'amber':
      return 'bg-amber-400 text-slate-950';
    case 'rose':
      return 'bg-rose-700 text-white';
    case 'slate':
    default:
      return 'bg-slate-900 text-white';
  }
}

export default function ThermalSpaHub({ locale }: { locale: string }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale)
    ? (locale as LocaleCode)
    : 'en';
  const t = HUB_COPY[activeLocale];

  const [activeRegionId, setActiveRegionId] = useState<ThermalRegionId | 'all'>('sultaniye');
  const [focusedPointId, setFocusedPointId] = useState<string | null>('sultaniye-springs');
  const [springFilter, setSpringFilter] = useState<SpringFilterId>('all');
  const [selectedCrowdId, setSelectedCrowdId] = useState<string>('1630');
  const [activeStage, setActiveStage] = useState<number>(2);
  const [pkgTab, setPkgTab] = useState<'thermal-mud' | 'hammam-spa'>('thermal-mud');
  const [activeMonth, setActiveMonth] = useState<number>(10);

  // Checker states
  const [goal, setGoal] = useState<WellnessGoal>('thermal');
  const [skin, setSkin] = useState<SkinStatus>('before-tan');
  const [health, setHealth] = useState<HealthProfile>('healthy');
  const [transport, setTransport] = useState<TransportMode>('car');

  const visibleSprings = useMemo(() => {
    if (springFilter === 'all') return THERMAL_SPRINGS;
    return THERMAL_SPRINGS.filter((s) => s.filterTags.includes(springFilter));
  }, [springFilter]);

  const activeCrowdSlot = useMemo(
    () => THERMAL_CROWD_SLOTS.find((c) => c.id === selectedCrowdId) || THERMAL_CROWD_SLOTS[3],
    [selectedCrowdId]
  );

  const currentStageObj = useMemo(
    () => HAMMAM_STAGES.find((st) => st.step === activeStage) || HAMMAM_STAGES[1],
    [activeStage]
  );

  const visiblePackages = useMemo(
    () => WELLNESS_PACKAGES.filter((p) => p.category === pkgTab),
    [pkgTab]
  );

  const activeCalMonth = useMemo(
    () => THERMAL_CALENDAR.find((m) => m.month === activeMonth) || THERMAL_CALENDAR[9],
    [activeMonth]
  );

  const checkerResult = useMemo(() => {
    let status: 'stop' | 'caution' | 'ready' = 'ready';
    let targetPointId = 'sultaniye-springs';
    let targetRegionId: ThermalRegionId = 'sultaniye';

    const messages: Record<LocaleCode, { headline: string; body: string }> = {
      ru: { headline: '', body: '' },
      en: { headline: '', body: '' },
      de: { headline: '', body: '' },
      tr: { headline: '', body: '' },
    };

    if (health === 'scuba' && (goal === 'thermal' || goal === 'hammam')) {
      status = 'stop';
      targetPointId = 'gocek-boutique-spa';
      targetRegionId = 'fethiye-gocek';
      messages.ru = {
        headline: t.verdictStop,
        body: 'После дайвинга с аквалангом НЕЛЬЗЯ идти в горячие 40 °C термы или жаркий 50 °C хаммам минимум 12–24 часа: перегрев расширяет сосуды и повышает риск декомпрессионной болезни. Перенесите парение на завтра или выберите прохладный СПА-отдых.',
      };
      messages.en = {
        headline: t.verdictStop,
        body: 'Avoid 40 °C hot springs and 50 °C steam/hammam halls for 12–24 hours after scuba diving—heat vasodilation triggers decompression nitrogen risks. Wait until tomorrow or pick gentle ambient massage.',
      };
      messages.de = {
        headline: t.verdictStop,
        body: 'Nach dem Tauchen mindestens 12–24 Stunden auf 40 °C-Thermen und 50 °C-Hamams verzichten (Gefäßerweiterung erhöht Dekompressionsrisiko). Besser morgen oder zur leichten Massage.',
      };
      messages.tr = {
        headline: t.verdictStop,
        body: 'Tüplü dalıştan sonraki 12–24 saatte 40 °C kaplıcalara veya 50 °C sıcak hamama GİRMEYİN; aşırı ısı damarları genişleterek dekompresyon riskini artırır. Yarını bekleyin.',
      };
      return { status, targetPointId, targetRegionId, msg: messages[activeLocale] };
    }

    if (skin === 'sunburned' && goal === 'hammam') {
      status = 'stop';
      targetPointId = 'gocek-boutique-spa';
      targetRegionId = 'fethiye-gocek';
      messages.ru = {
        headline: t.verdictStop,
        body: 'Категорически нельзя делать скраб кесе или греться на 50 °C мраморе с обгоревшей красной кожей — это вызовет сильную боль и микротравмы! Отложите хаммам до заживления и выберите мягкий увлажняющий уход с алоэ.',
      };
      messages.en = {
        headline: t.verdictStop,
        body: 'NEVER apply an abrasive *kese* scrub or enter 50 °C steam rooms with active sunburn—it worsens inflammation severely. Pause hammam scrubbing and choose cool aloe hydration instead.',
      };
      messages.de = {
        headline: t.verdictStop,
        body: 'Kein *Kese*-Peeling und kein 50 °C-Dampfbad bei frischem Sonnenbrand! Warten Sie bis zur Abheilung und wählen Sie kühlende Aloe-Pflege.',
      };
      messages.tr = {
        headline: t.verdictStop,
        body: 'Güneşten yanmış ve kızarmış cilde kesinlikle kese veya 50 °C sıcak hamam uygulanmaz! İyileşene kadar hamamı erteleyin.',
      };
      return { status, targetPointId, targetRegionId, msg: messages[activeLocale] };
    }

    if (health === 'bp-varicose' && goal === 'thermal') {
      status = 'caution';
      targetPointId = 'kapikargin-kukurt';
      targetRegionId = 'dalaman';
      messages.ru = {
        headline: t.verdictCaution,
        body: 'При гипертонии, беременности или варикозе горячая радоново-серная купель Султание (+40–42 °C) требует разрешения врача. Безопаснее выбрать мягкую 27–28 °C воду Капыкаргына (или Ылыджа Гёлю), либо ограничить заход 5–10 минутами после консультации.',
      };
      messages.en = {
        headline: t.verdictCaution,
        body: 'High blood pressure, varicose veins, or pregnancy require doctor clearance before stepping into 40–42 °C Sultaniye springs. Milder 27–28 °C pools at Kapıkargın or Datça Ilıca Gölü place far gentler load on circulation.',
      };
      messages.de = {
        headline: t.verdictCaution,
        body: 'Bei Bluthochdruck, Schwangerschaft oder Krampfadern vor 40 °C-Thermen ärztlich abklären. Deutlich kreislaufschonender sind 27–28 °C in Kapıkargın oder Datça Ilıca Gölü.',
      };
      messages.tr = {
        headline: t.verdictCaution,
        body: 'Yüksek tansiyon, hamilelik veya variste 40 °C kaplıca öncesi doktor onayı şarttır. 27–28 °C sıcaklığındaki Kapıkargın veya Datça Ilıca Gölü çok daha hafif ve konforludur.',
      };
      return { status, targetPointId, targetRegionId, msg: messages[activeLocale] };
    }

    if (skin === 'tanned' && goal === 'hammam') {
      status = 'caution';
      targetPointId = 'fethiye-paspatur-hammam';
      targetRegionId = 'fethiye-gocek';
      messages.ru = {
        headline: t.verdictCaution,
        body: 'Поскольку вы уже загорели, скажите банщику «БЕЗ кесе» или просите самый мягкий нажим (*yavaş*) — иначе жёсткая рукавица снимет свежий загар пятнами! Ограничьтесь пенным облаком и масляным массажем в Паспатуре или Мармарисе.',
      };
      messages.en = {
        headline: t.verdictCaution,
        body: 'Already tanned? Ask your attendant to skip the coarse *kese* mitt or go ultra-light ("yavaş") so your bronze doesn’t rub off unevenly—enjoy foam wash & oil massage instead.',
      };
      messages.de = {
        headline: t.verdictCaution,
        body: 'Bereits braun gebrannt? Bitten Sie um Weglassen des rauen *Kese*-Handschuhs und genießen Sie nur Schaum- und Ölmassage, damit die Bräune gleichmäßig bleibt.',
      };
      messages.tr = {
        headline: t.verdictCaution,
        body: 'Halihazırda bronzlaştıysanız kese işleminin alacalı iz bırakmaması için çok hafif yapılmasını (“yavaş”) isteyin veya sadece köpük + yağ masajı yaptırın.',
      };
      return { status, targetPointId, targetRegionId, msg: messages[activeLocale] };
    }

    if (health === 'bp-varicose' && (goal === 'hammam' || goal === 'spa')) {
      status = 'caution';
      targetPointId = 'gocek-boutique-spa';
      targetRegionId = 'fethiye-gocek';
      messages.ru = {
        headline: t.verdictCaution,
        body: 'Пропустите горячую парилку/гёбек-таши (45–50 °C) при давлении или беременности и закажите только прохладный кабинет СПА с деликатным массажем в Гёчеке или Каше (после согласования с врачом).',
      };
      messages.en = {
        headline: t.verdictCaution,
        body: 'Skip the hot 45–50 °C *hararet* steam hall for blood-pressure or pregnancy safety and opt strictly for a cool private spa suite massage with therapist notice.',
      };
      messages.de = {
        headline: t.verdictCaution,
        body: 'Verzichten Sie bei Kreislaufproblemen/Schwangerschaft auf den heißen Dampf- und Marmorraum und buchen Sie direkt eine sanfte Massage im kühlen Studio.',
      };
      messages.tr = {
        headline: t.verdictCaution,
        body: 'Sıcak buhar odası yerine doktor onayınızla doğrudan serin spa odasında hafif rahatlatıcı masaj programını tercih edin.',
      };
      return { status, targetPointId, targetRegionId, msg: messages[activeLocale] };
    }

    // Ideal Ready paths
    if (goal === 'thermal') {
      targetPointId = 'sultaniye-springs';
      targetRegionId = 'sultaniye';
      if (transport === 'car') {
        messages.ru = {
          headline: t.verdictReady,
          body: 'Езжайте на авто в Термы Султание (+39–42 °C) по западному берегу озера Кёйджегиз либо к открытию (08:30–10:30), либо на закат (16:30–19:30) — вход всего 100–150 ₺ без лодочных толп! Не забудьте снять серебро и взять тёмный купальник.',
        };
        messages.en = {
          headline: t.verdictReady,
          body: 'Drive along Lake Köyceğiz’s scenic west road to Sultaniye Hot Springs (39–42 °C) at 08:30 or after 16:30 to dodge tour-boat peaks for just 100–150 ₺ gate entry! Lock away silver jewelry and wear dark swimwear.',
        };
        messages.de = {
          headline: t.verdictReady,
          body: 'Fahren Sie per Mietwagen am Westufer des Köyceğiz-Sees um 08:30 oder ab 16:30 Uhr nach Sultaniye (+40 °C)—ohne Bootsgruppen für nur ~2–3 € Eintritt! Silberschmuck ablegen.',
        };
        messages.tr = {
          headline: t.verdictReady,
          body: 'Aracınızla saat 08:30 veya 16:30 sonrasında göl kenarından Sultaniye Kaplıcalarına (40 °C) gidin; tur tekneleri olmadan 100–150 ₺’ye şifa bulun. Gümüşleri çıkarmayı unutmayın!',
        };
      } else {
        messages.ru = {
          headline: t.verdictReady,
          body: 'Без авто проще всего взять речной тур из Дальяна к грязям Пелоид и источникам Султание (либо доехать на такси за 10 мин от DLM в бесплатные бассейны Капыкаргын 28 °C). Снимите серебро и наденьте тёмный купальник!',
        };
        messages.en = {
          headline: t.verdictReady,
          body: 'Board a classic river boat out of Dalyan combining Sultaniye muds, Kaunos tombs & İztuzu Beach—or hop a 10-min taxi from DLM to Kapıkargın Kükürt pools. Pack dark swimwear and no silver!',
        };
        messages.de = {
          headline: t.verdictReady,
          body: 'Ideal ohne Auto: Dalyan-Flussbootstour zu den Schlammbädern + Königsgräbern oder kurzes Taxi ab DLM nach Kapıkargın. Dunkle Badesachen und kein Silber!',
        };
        messages.tr = {
          headline: t.verdictReady,
          body: 'Araçsız en pratik seçenek Dalyan’dan kalkan çamur banyosu + İztuzu tekne turudur (veya DLM’den 10 dk taksiyle Kapıkargın). Koyu mayo giyin, gümüş takı takmayın.',
        };
      }
    } else if (goal === 'hammam') {
      targetPointId = 'fethiye-paspatur-hammam';
      targetRegionId = 'fethiye-gocek';
      messages.ru = {
        headline: t.verdictReady,
        body: 'Золотое время для хаммама: старый османский купол Паспатур (1591) в Фетхие или утренний сеанс 09:00 в Армуталане (Мармарис). После кесе и пенного облака пляжный загар ляжет идеально ровно!',
      };
      messages.en = {
        headline: t.verdictReady,
        body: 'Prime timing! Book Fethiye’s historic 16th-c. Paspatur bathhouse or a quiet 09:00 AM Marmaris/Armutalan shift—your *kese* scrub sets up an ultra-even Mediterranean tan.',
      };
      messages.de = {
        headline: t.verdictReady,
        body: 'Perfektes Timing vor dem Sonnenbad! Besuchen Sie das historische Paspatur-Hamam (1591) in Fethiye oder eine frühe 09:00-Uhr-Session in Armutalan.',
      };
      messages.tr = {
        headline: t.verdictReady,
        body: 'Mükemmel zamanlama! Fethiye’nin tarihî Paspatur Hamamını (1591) veya Marmaris’in sakin 09:00 seansını seçin; kese sonrası bronzluğunuz pürüzsüz olur.',
      };
    } else {
      targetPointId = 'gocek-boutique-spa';
      targetRegionId = 'fethiye-gocek';
      messages.ru = {
        headline: t.verdictReady,
        body: 'Отличный выбор для глубокого расслабления: камерные спа-сьюты в маринах Гёчека (€50–120+) или термальный 4★ курорт Therme Maris у Даламана (пелоиды, бассейны и профильный массаж).',
      };
      messages.en = {
        headline: t.verdictReady,
        body: 'Ideal match: reserve an intimate marina spa suite in Göcek/Kaş for aromatherapy deep-tissue work, or book Therme Maris Resort near Dalaman Airport for private thermal soaking.',
      };
      messages.de = {
        headline: t.verdictReady,
        body: 'Beste Wahl für tiefe Erholung: exklusive Boutique-Spas in Göcek/Kaş (€40–120+) oder das Therme Maris Resort nahe Dalaman.',
      };
      messages.tr = {
        headline: t.verdictReady,
        body: 'Derin rahatlama için ideal: Göcek marina spaları, Kaş butik masaj salonları veya Dalaman yakını Therme Maris termal tesisi.',
      };
    }

    return { status, targetPointId, targetRegionId, msg: messages[activeLocale] };
  }, [activeLocale, goal, health, skin, t.verdictCaution, t.verdictReady, t.verdictStop, transport]);

  return (
    <div className="portal-container py-10 md:py-14 space-y-16 md:space-y-20">
      {/* 0. Geothermal Budget & Sulfur Silver Shield */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 md:p-6 shadow-xs flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
          <FaShieldAlt className="text-lg" />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm md:text-base font-extrabold text-amber-950">
            {t.inflationTitle}
          </h2>
          <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
            {t.inflationDesc}
          </p>
        </div>
      </div>

      {/* 1. Interactive 3D Map */}
      <section id="thermal-map" className="scroll-mt-28 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaCompass /> {t.mapEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.mapTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
              {t.mapSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFocusedPointId(null);
              setActiveRegionId('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors border self-start md:self-auto ${
              activeRegionId === 'all'
                ? 'bg-slate-900 text-amber-300 border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
            }`}
          >
            {t.showAllRegionsBtn}
          </button>
        </div>

        {/* Quick Cluster Switchers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {THERMAL_REGION_PRESETS.map((preset) => {
            const isSelected = activeRegionId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setFocusedPointId(null);
                  setActiveRegionId(preset.id);
                }}
                className={`text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200/80 hover:border-amber-400 shadow-xs'
                }`}
              >
                <div className="min-w-0">
                  <span
                    className={`block text-[10px] font-extrabold uppercase tracking-wider truncate ${
                      isSelected ? 'text-amber-300' : 'text-amber-700'
                    }`}
                  >
                    {preset.code}
                  </span>
                  <span className="block text-xs sm:text-sm font-extrabold truncate mt-0.5">
                    {preset.title[activeLocale]}
                  </span>
                  <span
                    className={`block text-[10px] truncate mt-0.5 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {preset.subtitle[activeLocale]}
                  </span>
                </div>
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  <FaHotTub size={14} />
                </span>
              </button>
            );
          })}
        </div>

        <ThermalSpa3DMap
          locale={activeLocale}
          activeRegionId={activeRegionId}
          focusedPointId={focusedPointId}
          onSelectPoint={(pid) => setFocusedPointId(pid)}
          onSelectRegion={(rid) => setActiveRegionId(rid)}
        />
      </section>

      {/* 2. HOT SPRINGS & MUD BATHS FIRST (#thermal-springs) */}
      <section id="thermal-springs" className="scroll-mt-28 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaFire /> {t.springsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.springsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.springsSubtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs self-start lg:self-auto">
            {(['all', 'hot', 'mud', 'free-budget'] as SpringFilterId[]).map((fid) => (
              <button
                key={fid}
                type="button"
                onClick={() => setSpringFilter(fid)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                  springFilter === fid
                    ? 'bg-slate-900 text-amber-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.filterLabels[fid]}
              </button>
            ))}
          </div>
        </div>

        {/* Spring Photo Cards */}
        <div className="space-y-6">
          {visibleSprings.map((sp) => (
            <article
              key={sp.id}
              className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row"
            >
              <div className="relative lg:w-2/5 h-60 lg:h-auto min-h-[265px] overflow-hidden flex-shrink-0 bg-slate-900">
                <img
                  src={sp.image}
                  alt={sp.title[activeLocale]}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-slate-900/90 text-amber-300 rounded-full text-[11px] font-extrabold border border-white/20">
                    {sp.code}
                  </span>
                  <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-[11px] font-extrabold shadow">
                    {sp.priceBadge[activeLocale]}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                  <h3 className="text-lg font-extrabold leading-tight">
                    {sp.title[activeLocale]}
                  </h3>
                  <p className="text-xs text-amber-200 font-semibold mt-0.5">
                    {sp.subtitle[activeLocale]}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-7 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="hidden lg:block">
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-orange-700 mb-1">
                      {sp.code} · {sp.distanceFromDlm[activeLocale]}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                      {sp.title[activeLocale]}
                    </h3>
                    <p className="text-sm font-semibold text-cyan-800 mt-1">
                      {sp.subtitle[activeLocale]}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.springTempLabel}
                      </span>
                      <strong className="text-orange-700 font-extrabold">{sp.waterTemp}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.springMineralsLabel}
                      </span>
                      <strong className="text-slate-900 font-extrabold">
                        {sp.minerals[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.springHoursLabel}
                      </span>
                      <strong className="text-slate-900 font-bold">
                        {sp.hoursLabel[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">
                        {t.springDlmLabel}
                      </span>
                      <strong className="text-slate-900 font-bold">
                        {sp.distanceFromDlm[activeLocale]}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {sp.description[activeLocale]}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FaFlask className="text-orange-600" /> {t.springHighlightsLabel}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-600 font-medium">
                      {sp.highlights[activeLocale].map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-1.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/85 border border-amber-200/80 text-xs text-amber-950 font-medium">
                    {sp.caveatNote[activeLocale]}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
                  <a
                    href="#thermal-map"
                    onClick={() => setFocusedPointId(sp.mapPointId)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    {t.springFocusMapBtn}
                  </a>
                  <a
                    href={sp.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
                  >
                    <FaExternalLinkAlt size={10} /> {t.springGmapsBtn}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Sultaniye & Dalyan Boat-Crowd Wave SVG */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-white flex items-center gap-2">
                <FaClock className="text-amber-400" /> {t.crowdTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {t.crowdSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-[11px] font-bold">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> {t.crowdLowBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> {t.crowdPeakBadge}
              </span>
            </div>

            <svg
              viewBox="0 0 540 215"
              className="w-full h-auto overflow-visible"
              role="img"
              aria-label={t.crowdSvgTitle}
            >
              {/* Grid lines */}
              {[0, 50, 100].map((pct) => {
                const gy = 175 - (pct / 100) * 135;
                return (
                  <g key={pct}>
                    <line
                      x1="45"
                      y1={gy}
                      x2="515"
                      y2={gy}
                      stroke="rgba(148,163,184,0.2)"
                      strokeDasharray={pct === 0 ? undefined : '4 4'}
                    />
                    <text x="6" y={gy + 4} fill="#94a3b8" fontSize="10" fontWeight="700">
                      {pct}%
                    </text>
                  </g>
                );
              })}

              {/* Clickable Bars */}
              {THERMAL_CROWD_SLOTS.map((slot, idx) => {
                const barWidth = 56;
                const x = 68 + idx * 92;
                const barH = (slot.crowdPct / 100) * 135;
                const y = 175 - barH;
                const isSelected = slot.id === activeCrowdSlot.id;
                const barFill =
                  slot.crowdPct >= 80
                    ? '#e11d48'
                    : slot.crowdPct >= 50
                    ? '#f59e0b'
                    : '#10b981';

                return (
                  <g
                    key={slot.id}
                    onClick={() => setSelectedCrowdId(slot.id)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barH}
                      rx="10"
                      fill={barFill}
                      opacity={isSelected ? 1 : 0.65}
                      stroke={isSelected ? '#ffffff' : 'transparent'}
                      strokeWidth={isSelected ? 2.5 : 0}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 8}
                      textAnchor="middle"
                      fill={isSelected ? '#fde047' : '#e2e8f0'}
                      fontSize="11"
                      fontWeight="800"
                    >
                      {slot.crowdPct}%
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y="198"
                      textAnchor="middle"
                      fill={isSelected ? '#fbbf24' : '#cbd5e1'}
                      fontSize="11"
                      fontWeight="800"
                    >
                      {slot.timeLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
            <span className="block text-[11px] text-slate-400 font-semibold">
              {t.crowdClickHint}
            </span>
          </div>

          <div className="lg:col-span-6 bg-slate-800/80 rounded-2xl p-5 md:p-6 border border-slate-700/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold">
                  {activeCrowdSlot.timeLabel}
                </span>
                <h4 className="text-base md:text-lg font-extrabold text-white">
                  {activeCrowdSlot.name[activeLocale]}
                </h4>
              </div>
              <span className="text-xs font-extrabold text-amber-300">
                {'★'.repeat(activeCrowdSlot.quietScore)}
                {'☆'.repeat(5 - activeCrowdSlot.quietScore)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/75 rounded-xl p-3 border border-slate-700/60">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  {t.crowdTempFeelLabel}
                </span>
                <span className="text-slate-100 font-semibold mt-0.5 block">
                  {activeCrowdSlot.tempFeel[activeLocale]}
                </span>
              </div>
              <div className="bg-slate-900/75 rounded-xl p-3 border border-slate-700/60">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  {t.crowdBoatLabel}
                </span>
                <span className="text-amber-300 font-bold mt-0.5 block">
                  {activeCrowdSlot.boatTraffic[activeLocale]}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              <strong className="text-amber-300">{t.crowdTipLabel}</strong>{' '}
              {activeCrowdSlot.insiderTip[activeLocale]}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Authentic 5-Stage Ottoman Hammam + Health & Wellness Checker */}
      <section id="hammam-ritual" className="scroll-mt-28 space-y-6">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaSpa /> {t.ritualEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.ritualTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.ritualSubtitle}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left: 5-Stage Interactive Hammam Dome Walkthrough */}
          <div className="lg:col-span-6 p-6 md:p-7 bg-slate-900 text-white flex flex-col justify-between space-y-5">
            <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden border border-slate-700/80">
              <img
                src="/images/thermal-spa/hammam-dome.jpg"
                alt={t.ritualStageImgAlt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent" />
              <div className="absolute bottom-3 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase">
                  {currentStageObj.code}
                </span>
                <span className="text-xs font-extrabold text-cyan-300">
                  {currentStageObj.tempRange} · {currentStageObj.durationMin}
                </span>
              </div>
            </div>

            {/* 5 Stage Selector Buttons */}
            <div className="grid grid-cols-5 gap-1.5">
              {HAMMAM_STAGES.map((st) => {
                const isSel = st.step === activeStage;
                return (
                  <button
                    key={st.step}
                    type="button"
                    onClick={() => setActiveStage(st.step)}
                    className={`py-2 px-1.5 rounded-xl border text-center transition-colors ${
                      isSel
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-cyan-400 font-bold'
                    }`}
                  >
                    <span className="block text-[10px]">{st.step}.</span>
                    <span className="block text-[10px] sm:text-[11px] truncate">
                      {st.turkishTerm.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-800/75 rounded-2xl p-4 border border-slate-700/80 space-y-2.5">
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                {currentStageObj.title[activeLocale]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {currentStageObj.summary[activeLocale]}
              </p>
              <div className="pt-2 border-t border-slate-700/70 text-xs text-amber-300 font-semibold">
                <strong className="uppercase text-[10px] tracking-wider block text-amber-400 mb-0.5">
                  {t.ritualTipLabel}
                </strong>
                {currentStageObj.etiquetteTip[activeLocale]}
              </div>
            </div>
          </div>

          {/* Right: Health & Wellness Readiness Checker */}
          <div className="lg:col-span-6 p-6 md:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 flex items-center justify-center flex-shrink-0">
                  <FaHeartbeat />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900">
                    {t.checkerTitle}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {t.checkerSubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="font-extrabold text-slate-700 block mb-1.5">
                    {t.checkerGoalLabel}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {t.goalOpts.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setGoal(opt.id)}
                        className={`px-2.5 py-2 rounded-xl font-bold border text-center transition-colors ${
                          goal === opt.id
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
                  <span className="font-extrabold text-slate-700 block mb-1.5">
                    {t.checkerSkinLabel}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {t.skinOpts.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSkin(opt.id)}
                        className={`px-2.5 py-2 rounded-xl font-bold border text-center transition-colors ${
                          skin === opt.id
                            ? opt.id === 'sunburned'
                              ? 'bg-rose-700 text-white border-rose-700'
                              : 'bg-slate-900 text-cyan-300 border-slate-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-extrabold text-slate-700 block mb-1.5">
                    {t.checkerHealthLabel}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {t.healthOpts.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setHealth(opt.id)}
                        className={`px-2.5 py-2 rounded-xl font-bold border text-center transition-colors ${
                          health === opt.id
                            ? opt.id === 'scuba'
                              ? 'bg-rose-700 text-white border-rose-700'
                              : opt.id === 'bp-varicose'
                              ? 'bg-amber-500 text-slate-950 border-amber-500'
                              : 'bg-slate-900 text-cyan-300 border-slate-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-extrabold text-slate-700 block mb-1.5">
                    {t.checkerTransportLabel}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {t.transportOpts.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTransport(opt.id)}
                        className={`px-2.5 py-2 rounded-xl font-bold border text-center transition-colors ${
                          transport === opt.id
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
            </div>

            {/* Checker Verdict */}
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
                <span>{checkerResult.msg.headline}</span>
              </div>

              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {checkerResult.msg.body}
              </p>

              <div className="pt-1 flex justify-end">
                <a
                  href="#thermal-map"
                  onClick={() => {
                    setActiveRegionId(checkerResult.targetRegionId);
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

      {/* 4. 2026 Tariffs (Thermal FIRST) & Venues */}
      <section id="prices-rules" className="scroll-mt-28 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaThermometerHalf /> {t.pkgEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.pkgTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.pkgSubtitle}
            </p>
          </div>

          <div className="inline-flex bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setPkgTab('thermal-mud')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                pkgTab === 'thermal-mud'
                  ? 'bg-slate-900 text-amber-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabThermalFirst}
            </button>
            <button
              type="button"
              onClick={() => setPkgTab('hammam-spa')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                pkgTab === 'hammam-spa'
                  ? 'bg-slate-900 text-cyan-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabHammamSecond}
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visiblePackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-[10px] font-extrabold uppercase tracking-wider">
                    {pkg.badge[activeLocale]}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {pkg.title[activeLocale]}
                </h3>

                <div className="p-3.5 rounded-xl bg-slate-900 text-white">
                  <span className="block text-xl font-extrabold text-amber-300">
                    {pkg.priceBenchmark}
                  </span>
                  <span className="block text-[11px] text-slate-300 mt-0.5">
                    {pkg.priceNote[activeLocale]}
                  </span>
                </div>

                <p className="text-xs font-bold text-cyan-700">
                  {pkg.durationOrAccess[activeLocale]}
                </p>

                <div>
                  <span className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1.5">
                    {t.includedLabel}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                    {pkg.includedItems[activeLocale].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FaCheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5 text-[11px]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/85 border border-amber-200/80 text-xs text-amber-950 font-medium">
                <strong className="font-extrabold">{t.insiderTipLabel}</strong>{' '}
                {pkg.insiderTip[activeLocale]}
              </div>
            </div>
          ))}
        </div>

        {/* Verified Venues Directory */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <FaUsers className="text-orange-600" /> {t.venuesTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              {t.venuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WELLNESS_VENUES.map((venue) => (
              <div
                key={venue.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-extrabold text-orange-800 uppercase">
                      {venue.city[activeLocale]}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {venue.badge[activeLocale]}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">{venue.name}</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {venue.summary[activeLocale]}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/70 space-y-2 text-[11px]">
                  <div className="font-bold text-cyan-800">
                    {venue.formatAndHours[activeLocale]}
                  </div>
                  <div className="flex items-center justify-between gap-2 text-slate-500">
                    <span className="truncate">{venue.address}</span>
                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-700 hover:underline font-extrabold flex-shrink-0 inline-flex items-center gap-1"
                    >
                      Map <FaExternalLinkAlt size={9} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 12-Month Geothermal & Hammam Calendar */}
      <section className="space-y-6">
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

        <div className="bg-white rounded-3xl p-5 md:p-7 border border-slate-200/80 shadow-sm space-y-5">
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {THERMAL_CALENDAR.map((entry) => {
              const isActive = entry.month === activeMonth;
              return (
                <button
                  key={entry.month}
                  type="button"
                  onClick={() => setActiveMonth(entry.month)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-[1.03]'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:border-amber-400'
                  }`}
                >
                  <span className="block text-xs font-extrabold">
                    {t.monthShortNames[entry.month - 1]}
                  </span>
                  <span
                    className={`block text-[10px] font-bold mt-0.5 ${
                      isActive ? 'text-amber-300' : 'text-orange-700'
                    }`}
                  >
                    {entry.airTempC}
                  </span>
                  <span className="block text-[9px] mt-0.5 text-amber-500">
                    {'★'.repeat(entry.comfortScore)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 md:p-5 border border-slate-200/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-amber-300 text-xs font-extrabold uppercase">
                  {t.monthNames[activeCalMonth.month - 1]}
                </span>
                <span className="px-3 py-1 rounded-xl bg-orange-100 text-orange-900 text-xs font-extrabold">
                  {'★'.repeat(activeCalMonth.comfortScore)}
                  {'☆'.repeat(5 - activeCalMonth.comfortScore)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                <span>
                  🌡️ {t.calAirTemp}:{' '}
                  <strong className="text-slate-900">{activeCalMonth.airTempC}</strong>
                </span>
                <span>
                  ♨️ {t.calSpringTemp}:{' '}
                  <strong className="text-orange-700">{activeCalMonth.springTempC}</strong>
                </span>
                <span>
                  ✨ {t.calBestPick}:{' '}
                  <strong className="text-cyan-800">
                    {activeCalMonth.bestChoice[activeLocale]}
                  </strong>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {activeCalMonth.summary[activeLocale]}
            </p>
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
            href={`/${activeLocale}/services/car-rental`}
            className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold text-center transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <FaCar size={11} /> {t.btnCarRental}
          </Link>
          <Link
            href={`/${activeLocale}/paragliding`}
            className="px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold text-center transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <FaSun size={11} /> {t.btnParagliding}
          </Link>
          <Link
            href={`/${activeLocale}/articles/koycegiz-lake`}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <FaBookOpen size={11} className="text-amber-300" /> {t.btnKoycegizArticle}
          </Link>
          <Link
            href={`/${activeLocale}/articles/pamukkale-guide`}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <FaWater size={11} className="text-cyan-300" /> {t.btnPamukkaleArticle}
          </Link>
        </div>
      </div>

      {/* 6. Safety Rules, Silver Alert & Medical Regulations */}
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
          {THERMAL_SAFETY_RULES_2026.map((card) => (
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
                      <span className="w-2 h-2 rounded-full bg-orange-600 flex-shrink-0 mt-1.5" />
                      <span>{pt}</span>
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
                  className="font-bold text-orange-700 hover:underline inline-flex items-center gap-1"
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
