"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  FaAward,
  FaBan,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCompass,
  FaCube,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaLifeRing,
  FaMapMarkerAlt,
  FaRoute,
  FaShieldAlt,
  FaSlidersH,
  FaStar,
  FaSuitcase,
  FaSun,
  FaTachometerAlt,
  FaUsers,
  FaWater,
  FaWind,
} from 'react-icons/fa';
import Kitesurfing3DMap from './Kitesurfing3DMap';
import {
  DISCIPLINE_OVERVIEWS,
  IKO_STAGES,
  NO_KITE_ZONES,
  THERMAL_SLOTS,
  WIND_CALENDAR,
  WIND_PACKAGES,
  WIND_SAFETY_RULES_2026,
  WIND_SCHOOLS,
  WIND_SPOTS,
  type LocaleCode,
  type WindDisciplineId,
  type WindSafetyRule,
  type WindSpotId,
} from '@/lib/kitesurfing';

type WeightBucket = 'u60' | '60-75' | '76-90' | '90p';
type WindBucket = 'light' | 'mid' | 'strong';
type SeasonBucket = 'apr-may' | 'jun-sep' | 'oct-nov';

interface HubCopy {
  inflationTitle: string;
  inflationDesc: string;
  mapEyebrow: string;
  mapTitle: string;
  mapSubtitle: string;
  showAllSpotsBtn: string;
  thermalEyebrow: string;
  thermalTitle: string;
  thermalSubtitle: string;
  svgCurveTitle: string;
  svgMorningNote: string;
  svgThermalNote: string;
  svgClickHint: string;
  metricKnots: string;
  metricSurface: string;
  metricPower: string;
  metricCraft: string;
  tipLabel: string;
  calcTitle: string;
  calcSubtitle: string;
  calcWeightLabel: string;
  calcWindLabel: string;
  calcDisciplineLabel: string;
  calcSeasonLabel: string;
  weightOpts: { id: WeightBucket; label: string }[];
  windOpts: { id: WindBucket; label: string }[];
  discOpts: { id: WindDisciplineId; label: string }[];
  seasonOpts: { id: SeasonBucket; label: string }[];
  calcRecSizeLabel: string;
  calcWetsuitLabel: string;
  calcSpotLabel: string;
  calcFocusMapBtn: string;
  discEyebrow: string;
  discTitle: string;
  discSubtitle: string;
  discWindLabel: string;
  discHoursLabel: string;
  discSpotLabel: string;
  ikoTitle: string;
  ikoSubtitle: string;
  ikoUnlocksLabel: string;
  pkgEyebrow: string;
  pkgTitle: string;
  pkgSubtitle: string;
  tabCourses: string;
  tabRental: string;
  includedLabel: string;
  insiderTipLabel: string;
  schoolsTitle: string;
  schoolsSubtitle: string;
  calEyebrow: string;
  calTitle: string;
  calSubtitle: string;
  calWindDays: string;
  calAvgWind: string;
  calWaterTemp: string;
  calWetsuit: string;
  calKiteSizes: string;
  monthNames: string[];
  monthShortNames: string[];
  spotsEyebrow: string;
  spotsTitle: string;
  spotsSubtitle: string;
  spotWindLabel: string;
  spotWaterLabel: string;
  spotDiscLabel: string;
  spotDlmLabel: string;
  spotHighlightsLabel: string;
  spotFocusMapBtn: string;
  spotGmapsBtn: string;
  noKiteEyebrow: string;
  noKiteTitle: string;
  noKiteSubtitle: string;
  noKiteFocusBtn: string;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerDesc: string;
  btnTransfer: string;
  btnAkyakaArticle: string;
  btnParagliding: string;
  btnDivingFishing: string;
  rulesEyebrow: string;
  rulesTitle: string;
  rulesSubtitle: string;
  sourceLabel: string;
}

const HUB_COPY: Record<LocaleCode, HubCopy> = {
  ru: {
    inflationTitle: 'Щит от инфляции и реальный прогноз термика 2026',
    inflationDesc:
      'Обучение IKO и аренда кайт/виндсёрф-комплектов на станциях Муглы номинированы в евро (€340–€550 за 6 ч, прокат €60–€80/день), что защищает от скачков курса лиры. Важный секрет Акьяки: стандартные погодные приложения часто занижают ветер на 5–8 узлов, так как не видят локальную «аэродинамическую трубу» залива Гёкова в ясные дни.',
    mapEyebrow: '3D-КАРТА ЗАЛИВОВ И ВЕТРОВЫХ ЗОН · 4 СПОТА + КРАСНАЯ ЗОНА',
    mapTitle: 'Кайт-споты Акьяки и Датчи vs лайтвинд Сарыгерме и Чалыша',
    mapSubtitle:
      'Переключайтесь между заливом Гёкова (Акчапынар), полуостровом Датча, Сарыгерме и Фетхие; осмотрите 13 точек зонирования и 3 запрещённые зоны (Олюдениз, Гёчек, Каш).',
    showAllSpotsBtn: 'Весь берег (Датча — Каш)',
    thermalEyebrow: 'ЧАСОВОЙ ПРОФИЛЬ ТЕРМИКА И КАЛЬКУЛЯТОР СНАРЯЖЕНИЯ',
    thermalTitle: 'Как «включается» ветер в Гёкове (09:00 → 19:00) и подбор размера',
    thermalSubtitle:
      'Нажмите на любой час на кривой термика или подберите под свой вес оптимальный купол кайта, парус, винг, гидрокостюм и спот.',
    svgCurveTitle: 'Дневной профиль термика залива Гёкова (узлы)',
    svgMorningNote: 'Утром — Азмак на SUP',
    svgThermalNote: 'Термик 14–20+ уз.',
    svgClickHint: 'Нажмите на любой час дня ↓',
    metricKnots: 'Сила ветра',
    metricSurface: 'Состояние воды',
    metricPower: 'Тяга на воде',
    metricCraft: 'Оптимальный снаряд',
    tipLabel: 'Совет по сеансу:',
    calcTitle: 'Калькулятор размера крыла, гидрокостюма и спота',
    calcSubtitle: 'Задайте 4 параметра, чтобы подобрать точный размер снаряжения и лучший залив:',
    calcWeightLabel: 'Вес райдера',
    calcWindLabel: 'Сила ветра на споте',
    calcDisciplineLabel: 'Дисциплина',
    calcSeasonLabel: 'Сезон (месяцы)',
    weightOpts: [
      { id: 'u60', label: '< 60 кг' },
      { id: '60-75', label: '60–75 кг' },
      { id: '76-90', label: '76–90 кг' },
      { id: '90p', label: '90+ кг' },
    ],
    windOpts: [
      { id: 'light', label: '8–12 узлов (слабый)' },
      { id: 'mid', label: '13–17 узлов (средний)' },
      { id: 'strong', label: '18–23 узла (сильный)' },
    ],
    discOpts: [
      { id: 'kitesurf', label: 'Кайтсёрфинг' },
      { id: 'windsurf', label: 'Виндсёрфинг' },
      { id: 'wingfoil', label: 'Вингфойл' },
    ],
    seasonOpts: [
      { id: 'apr-may', label: 'Апрель–Май' },
      { id: 'jun-sep', label: 'Июнь–Сентябрь' },
      { id: 'oct-nov', label: 'Октябрь–Ноябрь' },
    ],
    calcRecSizeLabel: 'Рекомендуемый размер:',
    calcWetsuitLabel: 'Гидроодежда:',
    calcSpotLabel: 'Идеальный спот:',
    calcFocusMapBtn: 'Показать спот на 3D-карте ↑',
    discEyebrow: 'ТРИ ВОДНЫХ НАПРАВЛЕНИЯ И ПУТЬ IKO LEVEL 1–3',
    discTitle: 'Кайт, виндсёрфинг и вингфойл: что выбрать под ваш курорт',
    discSubtitle:
      'В Акьяке доминирует кайтсёрфинг, а в Датче, Сарыгерме и Чалыше раскрываются виндсёрфинг и вингфойл без длинных строп.',
    discWindLabel: 'Рабочий ветер',
    discHoursLabel: 'До старта',
    discSpotLabel: 'Где катать',
    ikoTitle: 'Дорожная карта обучения кайту (IKO Level 1 → Level 3+)',
    ikoSubtitle:
      'Зачем тратить 9–12 часов с инструктором: именно карта IKO Level 3 (уверенное вырезание на ветер и самоспасение) открывает аренду оборудования по всему миру.',
    ikoUnlocksLabel: 'Результат:',
    pkgEyebrow: 'ЦЕНЫ 2026 НА ОБУЧЕНИЕ, ПРОКАТ И ХРАНЕНИЕ',
    pkgTitle: 'Тарифы школ IKO, прокат комплектов и список баз региона',
    pkgSubtitle:
      'Сравните стоимость групповых и индивидуальных уроков с ценами на аренду снаряжения и локеры для своего кайтбэга.',
    tabCourses: '🎓 Обучение и курсы (IKO / Виндсёрф)',
    tabRental: '🏄 Прокат снаряжения и Storage (IKO 3+)',
    includedLabel: 'Что входит и важные условия:',
    insiderTipLabel: 'Совет инсайдера:',
    schoolsTitle: 'Проверенные кайт-школы, виндсёрф-станции и сёрф-клубы',
    schoolsSubtitle: 'Официальные центры в Акьяке, на Датче, в Сарыгерме и на северном пляже Чалыш:',
    calEyebrow: 'СЕЗОН ВЕТРА И ВОДЫ ПО МЕСЯЦАМ (12 МЕСЯЦЕВ)',
    calTitle: 'Календарь надёжности термика, температуры воды и экипировки',
    calSubtitle:
      'В июне–августе термик в заливе Гёкова срабатывает в 92–96% дней; нажмите на любой месяц для деталей по костюму и размеру купола.',
    calWindDays: 'Ветровых дней',
    calAvgWind: 'Типичный ветер',
    calWaterTemp: 'Вода',
    calWetsuit: 'Экипировка',
    calKiteSizes: 'Ходовые кайты',
    monthNames: [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ],
    monthShortNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    spotsEyebrow: '4 РЕАЛЬНЫХ СПОТА ПОБЕРЕЖЬЯ',
    spotsTitle: 'Акьяка, Датча (Кызлан), Сарыгерме и пляж Чалыш в деталях',
    spotsSubtitle:
      'Без преувеличений и выдумок: только реально работающие ветровые акватории Муглы от 17 км до 150 км от аэропорта DLM.',
    spotWindLabel: 'Ветер',
    spotWaterLabel: 'Вода и дно',
    spotDiscLabel: 'Дисциплины',
    spotDlmLabel: 'От аэропорта DLM',
    spotHighlightsLabel: 'Главные плюсы спота:',
    spotFocusMapBtn: 'Показать в 3D ↑',
    spotGmapsBtn: 'Google Maps',
    noKiteEyebrow: 'ЧЕСТНЫЙ РАЗБОР МИФОВ · КУДА НЕ НАДО ВЕЗТИ КАЙТ',
    noKiteTitle: 'Почему НЕ катаются в Олюденизе, Гёчеке и Каше',
    noKiteSubtitle:
      'Интернет пестрит зазывалами с несуществующим кайтингом в скалах или заповедных лагунах. Вот реальные причины, почему туда не стоит везти кайт-рюкзак.',
    noKiteFocusBtn: 'Показать красную зону ↑',
    bannerEyebrow: 'ТРАНСФЕР С ДОСКОЙ И ДРУГИЕ АКТИВНОСТИ',
    bannerTitle: 'Как довезти чехол из DLM или совместить ветер с небом и морем?',
    bannerDesc:
      'Закажите минивэн-трансфер из аэропорта (рейсовые автобусы высаживают в 3 км над Акьякой), откройте гид по реке Азмак или перейдите в соседние 3D-хабы.',
    btnTransfer: 'Трансфер из DLM (с доской) →',
    btnAkyakaArticle: 'Статья: Акьяка и река Азмак',
    btnParagliding: 'Хаб: Параглайдинг (Бабадаг) →',
    btnDivingFishing: 'Хаб: Дайвинг и рыбалка →',
    rulesEyebrow: 'ПРАВИЛА БЕЗОПАСНОСТИ, СТРАХОВКА И ЛОГИСТИКА 2026',
    rulesTitle: 'Расхождение на воде, запрет гидроциклов и экстренный вызов 112',
    rulesSubtitle:
      'Базовый свод правил безопасного трафика на Акчапынаре, требований IKO и медицинской страховки в Турции.',
    sourceLabel: 'Источник:',
  },
  en: {
    inflationTitle: '2026 EUR Inflation Shield & Real Thermal Wind Rule',
    inflationDesc:
      'IKO lessons and gear rentals across Muğla surf centers are benchmarked in Euros (€340–€550 per 6 h course, €60–€80/day rental). Crucial Akyaka tip: global forecast apps frequently under-predict Gökova Bay by 5–8 knots because they miss the local mountain thermal funnel on sunny afternoons.',
    mapEyebrow: '3D BAY RELIEF & WIND ZONING MAP · 4 REAL SPOTS + RED ZONES',
    mapTitle: 'Inspect Akyaka, Datça, Sarıgerme & Çalış in Live 3D',
    mapSubtitle:
      'Switch between Akçapınar Kite Lagoon, Kızlan–Gebekum dunes, light-wind Sarıgerme, and Çalış Bay—plus 3 prohibited Red Zones (Ölüdeniz, Göcek, Kaş).',
    showAllSpotsBtn: 'Full Coast (Datça — Kaş)',
    thermalEyebrow: 'HOURLY THERMAL ENGINE & GEAR CALCULATOR',
    thermalTitle: 'How Gökova’s Thermal Builds (09:00 → 19:00) & Gear Sizer',
    thermalSubtitle:
      'Tap any hour along the thermal wind curve or dial in your weight, wind force, and craft to match kite/sail size, wetsuit, and ideal bay.',
    svgCurveTitle: 'Gökova Bay Diurnal Thermal Wind Curve (Knots)',
    svgMorningNote: 'AM: Azmak SUP Glass',
    svgThermalNote: 'Peak Thermal 14–20+ kt',
    svgClickHint: 'Click any hourly node below ↓',
    metricKnots: 'Wind Speed',
    metricSurface: 'Water Surface',
    metricPower: 'Thermal Drive',
    metricCraft: 'Matched Craft',
    tipLabel: 'Session tip:',
    calcTitle: 'Kite, Sail, Wingfoil & Wetsuit Size Calculator',
    calcSubtitle: 'Toggle 4 inputs for a tailored gear recommendation and optimal Muğla bay:',
    calcWeightLabel: 'Rider Weight',
    calcWindLabel: 'Forecast Wind Force',
    calcDisciplineLabel: 'Discipline',
    calcSeasonLabel: 'Travel Window',
    weightOpts: [
      { id: 'u60', label: '< 60 kg' },
      { id: '60-75', label: '60–75 kg' },
      { id: '76-90', label: '76–90 kg' },
      { id: '90p', label: '90+ kg' },
    ],
    windOpts: [
      { id: 'light', label: '8–12 kt (Light)' },
      { id: 'mid', label: '13–17 kt (Steady)' },
      { id: 'strong', label: '18–23 kt (Powered)' },
    ],
    discOpts: [
      { id: 'kitesurf', label: 'Kitesurfing' },
      { id: 'windsurf', label: 'Windsurfing' },
      { id: 'wingfoil', label: 'Wingfoiling' },
    ],
    seasonOpts: [
      { id: 'apr-may', label: 'Apr–May' },
      { id: 'jun-sep', label: 'Jun–Sep' },
      { id: 'oct-nov', label: 'Oct–Nov' },
    ],
    calcRecSizeLabel: 'Suggested Size:',
    calcWetsuitLabel: 'Wetsuit:',
    calcSpotLabel: 'Best Matched Spot:',
    calcFocusMapBtn: 'Focus Spot on 3D Map ↑',
    discEyebrow: 'THREE DISCIPLINES & IKO LEVEL 1–3 ROADMAP',
    discTitle: 'Kitesurf, Windsurf or Wingfoil: Choosing Your Sport by Bay',
    discSubtitle:
      'Akyaka dominates twintip kiting, while Datça, Sarıgerme, and Çalış unlock prime windsurfing and line-free wingfoiling.',
    discWindLabel: 'Wind Window',
    discHoursLabel: 'Learning Curve',
    discSpotLabel: 'Best Bays',
    ikoTitle: 'Kitesurf Progression Roadmap (IKO Level 1 → Level 3+)',
    ikoSubtitle:
      'Why 9–12 coached hours matter: passing IKO Level 3 (consistent upwind riding & self-rescue) is what unlocks independent rentals worldwide.',
    ikoUnlocksLabel: 'Unlocks:',
    pkgEyebrow: '2026 COACHING PACKAGES, RENTALS & STORAGE',
    pkgTitle: 'IKO Lesson Rates, Gear Hire & Verified Coastal Centers',
    pkgSubtitle:
      'Compare semi-private and 1-on-1 tuition rates against full-kit rentals and beach storage lockers.',
    tabCourses: '🎓 Courses & Lessons (IKO / Windsurf)',
    tabRental: '🏄 Gear Hire & Storage (IKO 3+)',
    includedLabel: 'Included & key conditions:',
    insiderTipLabel: 'Insider tip:',
    schoolsTitle: 'Verified Kite Schools, Surf Clubs & Watersport Stations',
    schoolsSubtitle: 'Long-standing licensed hubs in Akyaka, Datça, Sarıgerme, and northern Çalış:',
    calEyebrow: '12-MONTH WIND & WATER CALENDAR',
    calTitle: 'Monthly Thermal Reliability, Sea Temperature & Gear Guide',
    calSubtitle:
      'June–August deliver 92–96% wind days in Gökova Bay; select any month below for water warmth, wetsuit thickness, and kite sizes.',
    calWindDays: 'Wind Days',
    calAvgWind: 'Typical Wind',
    calWaterTemp: 'Sea Temp',
    calWetsuit: 'Wetsuit',
    calKiteSizes: 'Go-To Kites',
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    spotsEyebrow: '4 GENUINE WIND SPOTS (DATÇA — FETHİYE)',
    spotsTitle: 'Akyaka, Datça (Kızlan), Sarıgerme & Çalış Explained Honestly',
    spotsSubtitle:
      'Zero tourist myths: compare only real, rideable bays from 20 minutes to 2 h 15 min drive from Dalaman Airport (DLM).',
    spotWindLabel: 'Wind Engine',
    spotWaterLabel: 'Water & Bottom',
    spotDiscLabel: 'Best For',
    spotDlmLabel: 'From DLM Airport',
    spotHighlightsLabel: 'Spot advantages:',
    spotFocusMapBtn: 'Focus in 3D ↑',
    spotGmapsBtn: 'Google Maps',
    noKiteEyebrow: 'MYTH-BUSTER · WHERE NOT TO BRING A KITE',
    noKiteTitle: 'Why You Cannot Kitesurf in Ölüdeniz, Göcek or Kaş',
    noKiteSubtitle:
      'Avoid travel blog clickbait sending kiters into rocky cliffs, packed marinas, or low-flying paraglider approaches.',
    noKiteFocusBtn: 'Inspect Red Zone ↑',
    bannerEyebrow: 'BOARDBAG TRANSFERS & MULTI-SPORT COAST',
    bannerTitle: 'Flying Into DLM With Gear or Combining Wind, Air & Reefs?',
    bannerDesc:
      'Reserve a private minivan from Dalaman (public shuttles drop 3 km above Akyaka town), read our Azmak River guide, or jump into Paragliding & Diving hubs.',
    btnTransfer: 'Private DLM Boardbag Transfer →',
    btnAkyakaArticle: 'Guide: Akyaka & Azmak River',
    btnParagliding: 'Hub: Babadağ Paragliding 3D →',
    btnDivingFishing: 'Hub: Diving & Fishing →',
    rulesEyebrow: 'WATER RULES, INSURANCE & LOGISTICS 2026',
    rulesTitle: 'Right of Way, Jet-Ski Ban, IKO Checks & 112 Rescue',
    rulesSubtitle:
      'Essential water traffic priority, Akçapınar zoning, insurance riders, and DLM airport boardbag tips.',
    sourceLabel: 'Source:',
  },
  de: {
    inflationTitle: 'EUR-Preisschutz & Thermik-Geheimtipp 2026',
    inflationDesc:
      'Kurse und Materialverleih in Muğla sind in Euro kalkuliert (€340–€550 für 6 Std., Miete €60–€80/Tag). Wichtig für Akyaka: Globale Wetter-Apps unterschätzen den Thermik-Düsenwind im Golf von Gökova an sonnigen Tagen oft um 5–8 Knoten.',
    mapEyebrow: '3D-KÜSTEN- & WINDSPOT-KARTE · 4 SPOTS + VERBOTSZONEN',
    mapTitle: 'Akyaka, Datça, Sarıgerme & Çalış im interaktiven 3D-Blick',
    mapSubtitle:
      'Wechseln Sie zwischen Akçapınar, den Dünen von Gebekum, Sarıgerme und Çalış—und prüfen Sie die 3 roten Kite-Verbotszonen (Ölüdeniz, Göcek, Kaş).',
    showAllSpotsBtn: 'Ganze Küste (Datça — Kaş)',
    thermalEyebrow: 'TAGESTHERMIK-KURVE & MATERIAL-RECHNER',
    thermalTitle: 'Wann der Thermik-Wind anspringt (09:00 → 19:00) & Größenwahl',
    thermalSubtitle:
      'Klicken Sie auf eine Stunde im Windprofil oder wählen Sie Gewicht, Windstärke und Sportart für die exakte Materialempfehlung.',
    svgCurveTitle: 'Tagesverlauf der Thermik im Golf von Gökova (Knoten)',
    svgMorningNote: 'Morgens: SUP auf Azmak',
    svgThermalNote: 'Thermik 14–20+ Knoten',
    svgClickHint: 'Auf eine Stunde klicken ↓',
    metricKnots: 'Windstärke',
    metricSurface: 'Wasserfläche',
    metricPower: 'Winddruck',
    metricCraft: 'Ideales Setup',
    tipLabel: 'Session-Tipp:',
    calcTitle: 'Interaktiver Größenrechner für Kite, Segel, Wing & Neo',
    calcSubtitle: '4 Parameter wählen und direkt passende Größe + Top-Revier erhalten:',
    calcWeightLabel: 'Fahrergewicht',
    calcWindLabel: 'Windbereich',
    calcDisciplineLabel: 'Disziplin',
    calcSeasonLabel: 'Reisezeit',
    weightOpts: [
      { id: 'u60', label: '< 60 kg' },
      { id: '60-75', label: '60–75 kg' },
      { id: '76-90', label: '76–90 kg' },
      { id: '90p', label: '90+ kg' },
    ],
    windOpts: [
      { id: 'light', label: '8–12 kt (Leicht)' },
      { id: 'mid', label: '13–17 kt (Mittel)' },
      { id: 'strong', label: '18–23 kt (Kräftig)' },
    ],
    discOpts: [
      { id: 'kitesurf', label: 'Kitesurfen' },
      { id: 'windsurf', label: 'Windsurfen' },
      { id: 'wingfoil', label: 'Wingfoilen' },
    ],
    seasonOpts: [
      { id: 'apr-may', label: 'Apr–Mai' },
      { id: 'jun-sep', label: 'Jun–Sep' },
      { id: 'oct-nov', label: 'Okt–Nov' },
    ],
    calcRecSizeLabel: 'Empfohlene Größe:',
    calcWetsuitLabel: 'Neopren / Kleidung:',
    calcSpotLabel: 'Optimaler Spot:',
    calcFocusMapBtn: 'Spot auf 3D-Karte zeigen ↑',
    discEyebrow: 'DREI WINDSPORT-WELTEN & IKO-STUFENPLAN',
    discTitle: 'Kite, Windsurfen oder Wingfoil: Welcher Sport passt wohin?',
    discSubtitle:
      'Akyaka führt beim Kiten, während Datça, Sarıgerme und Çalış ideale Bedingungen für Windsurfen und Wingfoilen bieten.',
    discWindLabel: 'Windbereich',
    discHoursLabel: 'Lernzeit',
    discSpotLabel: 'Top-Reviere',
    ikoTitle: 'Ausbildungsweg Kitesurfen (IKO Level 1 → Level 3+)',
    ikoSubtitle:
      'Warum sich 9–12 Trainerstunden lohnen: Erst die IKO Level 3 Karte (Höhelaufen & Selbstrettung) öffnet weltweit den freien Materialverleih.',
    ikoUnlocksLabel: 'Freigabe:',
    pkgEyebrow: 'PREISE 2026 FÜR KURSE, VERLEIH & LAGERUNG',
    pkgTitle: 'Tarife für Unterricht, Mietmaterial & etablierte Basen',
    pkgSubtitle:
      'Transparente Übersicht von Gruppen-/Privatkursen, Verleihpreisen und Storage-Spinden am Strand.',
    tabCourses: '🎓 Schulung & Kurse (IKO / Windsurf)',
    tabRental: '🏄 Verleih & Storage (IKO 3+)',
    includedLabel: 'Enthalten & Konditionen:',
    insiderTipLabel: 'Insider-Tipp:',
    schoolsTitle: 'Zertifizierte Kiteschulen, Surfclubs & Stationen',
    schoolsSubtitle: 'Bekannte Anlaufstellen in Akyaka, auf Datça, in Sarıgerme und Nord-Çalış:',
    calEyebrow: '12-MONATS-WIND- & WASSERTEMPERATUR-KALENDER',
    calTitle: 'Windsicherheit, Meerestemperatur & Neo-Wahl pro Monat',
    calSubtitle:
      'Von Juni bis August bringt Gökova 92–96 % Windtage; wählen Sie einen Monat für alle Praxisdaten.',
    calWindDays: 'Windtage',
    calAvgWind: 'Typ. Wind',
    calWaterTemp: 'Wasser',
    calWetsuit: 'Neopren',
    calKiteSizes: 'Kitegrößen',
    monthNames: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
    ],
    monthShortNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    spotsEyebrow: '4 ECHTE REVIERE VON DATÇA BIS FETHIYE',
    spotsTitle: 'Akyaka, Datça (Kızlan), Sarıgerme & Çalış im Vergleich',
    spotsSubtitle:
      'Keine geschönten Werbeversprechen—nur echte, sicher befahrbare Windspots zwischen 20 Min. und 2 Std. 15 Min. ab Flughafen DLM.',
    spotWindLabel: 'Thermik / Wind',
    spotWaterLabel: 'Wasser & Einstieg',
    spotDiscLabel: 'Geeignet für',
    spotDlmLabel: 'Ab Flughafen DLM',
    spotHighlightsLabel: 'Spot-Vorteile:',
    spotFocusMapBtn: 'In 3D zeigen ↑',
    spotGmapsBtn: 'Google Maps',
    noKiteEyebrow: 'FAKTENCHECK · WO MAN NICHT KITET',
    noKiteTitle: 'Warum Ölüdeniz, Göcek und Kaş KEINE Kitespots sind',
    noKiteSubtitle:
      'Lassen Sie den Kitesack bei Steilküsten, Yachthäfen und Gleitschirm-Landeplätzen lieber zu Hause.',
    noKiteFocusBtn: 'Verbotszone zeigen ↑',
    bannerEyebrow: 'SPERRGEPÄCK-TRANSFER & KÜSTEN-HUBS',
    bannerTitle: 'Mit dem Kitebag über Dalaman anreisen oder Sport kombinieren?',
    bannerDesc:
      'Buchen Sie einen privaten Minivan ab DLM (Linienbusse halten 3 km oberhalb von Akyaka) oder wechseln Sie zu Paragliding und Tauchen.',
    btnTransfer: 'Minivan-Transfer mit Boardbag →',
    btnAkyakaArticle: 'Guide: Akyaka & Fluss Azmak',
    btnParagliding: 'Hub: Babadağ Paragliding 3D →',
    btnDivingFishing: 'Hub: Tauchen & Angeln →',
    rulesEyebrow: 'SICHERHEIT, VERSICHERUNG & LOGISTIK 2026',
    rulesTitle: 'Vorfahrtsregeln, Jetski-Verbot, IKO-Check & Notruf 112',
    rulesSubtitle:
      'Wichtige Sicherheitsstandards in Akçapınar, Tipps zur Auslandsversicherung und Anreise ab DLM.',
    sourceLabel: 'Quelle:',
  },
  tr: {
    inflationTitle: '2026 Euro Fiyat Koruması ve Gerçek Termik Kuralı',
    inflationDesc:
      'Muğla su sporları okullarında kurslar (6 saat €340–€550) ve kiralamalar (€60–€80/gün) Euro bazlıdır. Kritik Akyaka sırrı: Genel hava tahmin uygulamaları güneşli günlerde Gökova Körfezinin yerel termik tünelini genellikle 5–8 knot daha düşük gösterir.',
    mapEyebrow: '3D KÖRFEZ RÖLYEFİ VE RÜZGÂR HARİTASI · 4 NOKTA + YASAK BÖLGELER',
    mapTitle: 'Akyaka, Datça, Sarıgerme ve Çalış Sahillerini 3D İnceleyin',
    mapSubtitle:
      'Akçapınar Kite Plajı, Kızlan–Gebekum kumulları, Sarıgerme ve Çalış arasında geçiş yapın; Ölüdeniz, Göcek ve Kaş kırmızı bölgelerinin neden uygun olmadığını görün.',
    showAllSpotsBtn: 'Tüm Kıyı (Datça — Kaş)',
    thermalEyebrow: 'SAATLİK TERMİK EĞRİSİ VE EKİPMAN HESAPLAYICI',
    thermalTitle: 'Gökova Rüzgârı Nasıl Yükselir (09:00 → 19:00) ve Boy Seçimi',
    thermalSubtitle:
      'Termik eğrisindeki saatlere dokunun veya kilonuz ile mevsime göre ideal kite/yelken boyunu ve bölgeyi anında hesaplayın.',
    svgCurveTitle: 'Gökova Körfezi Günlük Termik Rüzgâr Profili (Knot)',
    svgMorningNote: 'Sabah: Azmak SUP',
    svgThermalNote: 'Termik 14–20+ kt',
    svgClickHint: 'İstediğiniz saate dokunun ↓',
    metricKnots: 'Rüzgâr Hızı',
    metricSurface: 'Su Durumu',
    metricPower: 'Rüzgâr Gücü',
    metricCraft: 'İdeal Branş',
    tipLabel: 'Seans tavsiyesi:',
    calcTitle: 'Kite, Yelken, Wingfoil ve Wetsuit Boy Hesaplayıcı',
    calcSubtitle: 'Size en uygun ekipman ölçüsünü ve sahili görmek için 4 alanı seçin:',
    calcWeightLabel: 'Sürücü Kilosu',
    calcWindLabel: 'Rüzgâr Şiddeti',
    calcDisciplineLabel: 'Branş',
    calcSeasonLabel: 'Dönem',
    weightOpts: [
      { id: 'u60', label: '< 60 kg' },
      { id: '60-75', label: '60–75 kg' },
      { id: '76-90', label: '76–90 kg' },
      { id: '90p', label: '90+ kg' },
    ],
    windOpts: [
      { id: 'light', label: '8–12 kt (Hafif)' },
      { id: 'mid', label: '13–17 kt (Orta)' },
      { id: 'strong', label: '18–23 kt (Sert)' },
    ],
    discOpts: [
      { id: 'kitesurf', label: 'Kitesurf' },
      { id: 'windsurf', label: 'Rüzgar Sörfü' },
      { id: 'wingfoil', label: 'Wingfoil' },
    ],
    seasonOpts: [
      { id: 'apr-may', label: 'Nis–May' },
      { id: 'jun-sep', label: 'Haz–Eyl' },
      { id: 'oct-nov', label: 'Eki–Kas' },
    ],
    calcRecSizeLabel: 'Önerilen Ölçü:',
    calcWetsuitLabel: 'Kıyafet / Wetsuit:',
    calcSpotLabel: 'En Uygun Nokta:',
    calcFocusMapBtn: 'Noktayı 3D Haritada Göster ↑',
    discEyebrow: 'ÜÇ RÜZGÂR BRANŞI VE IKO SEVİYE 1–3 YOL HARİTASI',
    discTitle: 'Kitesurf, Rüzgar Sörfü veya Wingfoil: Hangisi Size Uygun?',
    discSubtitle:
      'Akyaka kitesurf için tartışmasız liderken; Datça, Sarıgerme ve Çalış rüzgar sörfü ve ipsiz wingfoil ile parlar.',
    discWindLabel: 'Rüzgâr Aralığı',
    discHoursLabel: 'Eğitim Süresi',
    discSpotLabel: 'En İyi Koylar',
    ikoTitle: 'Kitesurf Eğitim Yol Haritası (IKO Seviye 1 → Seviye 3+)',
    ikoSubtitle:
      '9–12 saatlik eğitim neden önemli: Dünya genelinde tek başınıza kite kiralayabilmek için IKO 3 (rüzgarüstü seyir & öz kurtarma) şarttır.',
    ikoUnlocksLabel: 'Kazandırdığı hak:',
    pkgEyebrow: '2026 EĞİTİM, KİRALAMA VE DEPOLAMA FİYATLARI',
    pkgTitle: 'IKO Eğitim Paketleri, Ekipman Kiralama ve Lisanslı Okullar',
    pkgSubtitle:
      'Grup/özel ders ücretlerini, saatlik/günlük kiralamaları ve kendi ekipmanınız için kilitli dolap paketlerini inceleyin.',
    tabCourses: '🎓 Eğitim & Kurslar (IKO / Sörf)',
    tabRental: '🏄 Ekipman Kiralama & Depo (IKO 3+)',
    includedLabel: 'Paket içeriği ve kurallar:',
    insiderTipLabel: 'Yerel ipucu:',
    schoolsTitle: 'Bölgenin Öne Çıkan Lisanslı Okul ve Sörf Kulüpleri',
    schoolsSubtitle: 'Akyaka, Datça, Sarıgerme ve Koca Çalış sahillerindeki köklü merkezler:',
    calEyebrow: '12 AYLIK RÜZGÂR VE SU SICAKLIĞI TAKVİMİ',
    calTitle: 'Aylara Göre Termik Olasılığı, Deniz Sıcaklığı ve Donanım',
    calSubtitle:
      'Haziran–Ağustos döneminde Gökova %92–96 rüzgârlı geçer; kıyafet ve uçurtma boyu için bir ay seçin.',
    calWindDays: 'Rüzgârlı Gün',
    calAvgWind: 'Ortalama Rüzgâr',
    calWaterTemp: 'Su Sıcaklığı',
    calWetsuit: 'Wetsuit',
    calKiteSizes: 'Yaygın Kiteler',
    monthNames: [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ],
    monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    spotsEyebrow: 'GERÇEK RÜZGÂR SPORU KIYILARI (4 BÖLGE)',
    spotsTitle: 'Akyaka, Datça (Kızlan), Sarıgerme ve Çalış Detaylı Karşılaştırma',
    spotsSubtitle:
      'Abartısız rehber: Dalaman Havalimanına (DLM) 20 dakikadan 2 saat 15 dakikaya kadar ulaşılabilen gerçekten sörf yapılan 4 sahil.',
    spotWindLabel: 'Rüzgâr Tipi',
    spotWaterLabel: 'Su ve Zemin',
    spotDiscLabel: 'Uygun Branşlar',
    spotDlmLabel: 'DLM Mesafesi',
    spotHighlightsLabel: 'Saha avantajları:',
    spotFocusMapBtn: '3D Haritada Gör ↑',
    spotGmapsBtn: 'Google Haritalar',
    noKiteEyebrow: 'YANLIŞ BİLİNENLER · KİTE YAPILMAYAN YERLER',
    noKiteTitle: 'Ölüdeniz, Göcek ve Kaş’ta Neden Kitesurf Yapılmaz?',
    noKiteSubtitle:
      'İnternetteki yanlış listeler nedeniyle ağır kite çantanızı kayalık falezler veya yat limanlarına taşımayın.',
    noKiteFocusBtn: 'Kırmızı Bölgeyi Gör ↑',
    bannerEyebrow: 'BOARD ÇANTASI TRANSFERİ & DİĞER MACERALAR',
    bannerTitle: 'DLM’den Ekipmanla mı Geliyorsunuz, Yoksa Diğer Sporlara mı Bakıyorsunuz?',
    bannerDesc:
      'Havalimanı otobüsleri Akyaka’nın 3 km yukarısında durduğu için özel minivan planlayın veya Babadağ ve Dalış rehberlerimize geçin.',
    btnTransfer: 'DLM Board Çantalı Transfer →',
    btnAkyakaArticle: 'Rehber: Akyaka ve Kadın Azmağı',
    btnParagliding: 'Rehber: Babadağ Yamaç Paraşütü 3D →',
    btnDivingFishing: 'Rehber: Dalış ve Balıkçılık →',
    rulesEyebrow: 'SU ÜSTÜ KURALLARI, SİGORTA VE LOJİSTİK 2026',
    rulesTitle: 'Geçiş Üstünlüğü, Jet-Ski Yasağı, IKO Şartı ve 112 Acil',
    rulesSubtitle:
      'Akçapınar plaj kuralları, ekstrem su sporları sigortası ve Dalaman havalimanı transfer notları.',
    sourceLabel: 'Kaynak:',
  },
};

function computeGearAdvice(
  weight: WeightBucket,
  wind: WindBucket,
  discipline: WindDisciplineId,
  season: SeasonBucket,
  locale: LocaleCode
): { size: string; wetsuit: string; spotId: WindSpotId; note: string } {
  let size = '';
  let spotId: WindSpotId = 'akyaka';

  if (discipline === 'kitesurf') {
    const matrix: Record<WindBucket, Record<WeightBucket, string>> = {
      light: { u60: '11–12 m²', '60-75': '13–14 m²', '76-90': '14–15 m²', '90p': '15–17 m² / Foil' },
      mid: { u60: '8–9 m²', '60-75': '10–11 m²', '76-90': '11–12 m²', '90p': '13–14 m²' },
      strong: { u60: '6–7 m²', '60-75': '8–9 m²', '76-90': '9–10 m²', '90p': '10–12 m²' },
    };
    size = matrix[wind][weight];
    spotId = wind === 'light' ? 'sarigerme' : wind === 'strong' ? 'datca' : 'akyaka';
  } else if (discipline === 'windsurf') {
    const matrix: Record<WindBucket, Record<WeightBucket, string>> = {
      light: { u60: '4.5–5.5 m² (135–155 L)', '60-75': '5.5–6.5 m² (145 L)', '76-90': '6.5–7.5 m² (155 L)', '90p': '7.0–8.0 m² (160 L)' },
      mid: { u60: '4.2–4.8 m² (110 L)', '60-75': '5.0–5.8 m² (120 L)', '76-90': '5.8–6.5 m² (130 L)', '90p': '6.2–7.0 m² (135 L)' },
      strong: { u60: '3.7–4.2 m² (95 L)', '60-75': '4.4–5.0 m² (105 L)', '76-90': '5.0–5.6 m² (115 L)', '90p': '5.4–6.2 m² (120 L)' },
    };
    size = matrix[wind][weight];
    spotId = wind === 'light' ? 'sarigerme' : wind === 'strong' ? 'datca' : 'calis';
  } else {
    const matrix: Record<WindBucket, Record<WeightBucket, string>> = {
      light: { u60: '5.0 m² Wing + 1500 cm² Foil', '60-75': '5.5 m² Wing + 1750 cm² Foil', '76-90': '6.0 m² Wing + 1900 cm² Foil', '90p': '6.5–7.0 m² Wing + 2100 cm² Foil' },
      mid: { u60: '4.0 m² Wing + 1250 cm² Foil', '60-75': '4.5–5.0 m² Wing + 1450 cm² Foil', '76-90': '5.0 m² Wing + 1600 cm² Foil', '90p': '5.5 m² Wing + 1750 cm² Foil' },
      strong: { u60: '3.0–3.5 m² Wing + 1100 cm² Foil', '60-75': '3.5–4.0 m² Wing + 1250 cm² Foil', '76-90': '4.0–4.5 m² Wing + 1350 cm² Foil', '90p': '4.5–5.0 m² Wing + 1500 cm² Foil' },
    };
    size = matrix[wind][weight];
    spotId = wind === 'light' ? 'sarigerme' : wind === 'strong' ? 'datca' : 'calis';
  }

  const wetsuits: Record<SeasonBucket, Record<LocaleCode, string>> = {
    'apr-may': {
      ru: 'Короткий / тонкий 3/2 мм',
      en: 'Shorty / 3/2 mm Wetsuit',
      de: 'Shorty / 3/2 mm Neo',
      tr: 'Shorty / 3/2 mm Wetsuit',
    },
    'jun-sep': {
      ru: 'Лайкра и шорты (+ SPF 50)',
      en: 'Boardshorts & Rashguard (+ SPF 50)',
      de: 'Boardshorts & Lycra (+ LSF 50)',
      tr: 'Şort & UPF Lycra (+ SPF 50)',
    },
    'oct-nov': {
      ru: 'Тонкий длинный 3/2 или 4/3 мм',
      en: 'Full 3/2 or 4/3 mm Wetsuit',
      de: 'Langer 3/2 oder 4/3 mm Neo',
      tr: 'Uzun 3/2 veya 4/3 mm Wetsuit',
    },
  };

  const spotNotes: Record<WindSpotId, Record<LocaleCode, string>> = {
    akyaka: {
      ru: 'Мелководье Акчапынара идеально прощает ошибки и держит 14–20 узлов каждый ясный день с мая по сентябрь.',
      en: 'Akçapınar waist-deep lagoon delivers forgiving launches and textbook 14–20 kt afternoon thermals.',
      de: 'Akçapınars stehtiefe Lagune bietet verlässliche 14–20 Knoten und sichere Bedingungen ohne Steine.',
      tr: 'Akçapınar sığ kum sahası hata affedicidir ve güneşli günlerde düzenli 14–20 knot termik üretir.',
    },
    datca: {
      ru: 'Кызлан–Гебекум даёт плотный кросс-шор Мельтеми без плотного трафика новичков.',
      en: 'Kızlan–Gebekum rewards powered riders with open Meltemi chop far from beginner crowds.',
      de: 'Kızlan–Gebekum glänzt bei frischem Meltemi für geübte Fahrer und Windsurfer mit viel Platz.',
      tr: 'Kızlan–Gebekum sert Meltem günlerinde okul kalabalığından uzak temiz rüzgâr ve uzun seyir sunar.',
    },
    sarigerme: {
      ru: 'В 20 минутах от аэропорта DLM: идеально под большой кайт/гидрофойл или спокойный старт на виндсёрфе.',
      en: 'Just 20 min from DLM Airport—tailor-made for light-wind foils, wingfoiling, and relaxed windsurfing.',
      de: 'Nur 20 Min. ab Flughafen DLM—perfekt für Leichtwind-Foils, Wingfoilen und entspanntes Windsurfen.',
      tr: 'DLM’ye 20 dk uzaklıkta hafif rüzgâr foil, wingfoil ve sakin rüzgar sörfü için en konforlu koy.',
    },
    calis: {
      ru: 'На северном краю Коджа-Чалыш дует ровный бриз на станции виндсёрфа и вингфойла рядом с Фетхие.',
      en: 'Northern Koca Çalış catches Fethiye’s afternoon breeze straight off Surf Cafe stations for windsurf & wingfoil.',
      de: 'Im Norden von Çalış fangen Windsurfer und Wingfoiler ab mittags verlässliche Thermik direkt bei Fethiye auf.',
      tr: 'Çalış kuzeyindeki Surf Cafe bölgesi Fethiye’den ayrılmadan rüzgar sörfü ve wingfoil için idealdir.',
    },
  };

  return {
    size,
    wetsuit: wetsuits[season][locale],
    spotId,
    note: spotNotes[spotId][locale],
  };
}

function getRuleHeaderClass(tone: WindSafetyRule['tone']): string {
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

export default function KitesurfingHub({ locale }: { locale: string }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale)
    ? (locale as LocaleCode)
    : 'en';
  const t = HUB_COPY[activeLocale];

  const [activeSpotId, setActiveSpotId] = useState<WindSpotId | 'all'>('akyaka');
  const [focusedPointId, setFocusedPointId] = useState<string | null>('akyaka-center-beach');
  const [selectedHourId, setSelectedHourId] = useState<string>('1500');
  const [pkgTab, setPkgTab] = useState<'courses' | 'rental-storage'>('courses');
  const [activeMonth, setActiveMonth] = useState<number>(7);

  // Calculator state
  const [weight, setWeight] = useState<WeightBucket>('60-75');
  const [wind, setWind] = useState<WindBucket>('mid');
  const [discipline, setDiscipline] = useState<WindDisciplineId>('kitesurf');
  const [season, setSeason] = useState<SeasonBucket>('jun-sep');

  const activeSlot = useMemo(
    () => THERMAL_SLOTS.find((s) => s.id === selectedHourId) || THERMAL_SLOTS[3],
    [selectedHourId]
  );

  const visiblePackages = useMemo(
    () => WIND_PACKAGES.filter((p) => p.category === pkgTab),
    [pkgTab]
  );

  const activeCalendarEntry = useMemo(
    () => WIND_CALENDAR.find((m) => m.month === activeMonth) || WIND_CALENDAR[6],
    [activeMonth]
  );

  const advice = useMemo(
    () => computeGearAdvice(weight, wind, discipline, season, activeLocale),
    [weight, wind, discipline, season, activeLocale]
  );

  const advisedSpot = useMemo(
    () => WIND_SPOTS.find((s) => s.id === advice.spotId) || WIND_SPOTS[0],
    [advice.spotId]
  );

  // SVG wind curve coordinates across 6 hourly nodes (x = 70..550, y mapped 0..24 kt => 195..38)
  const svgPoints = useMemo(() => {
    const xs = [70, 166, 262, 358, 454, 550];
    return THERMAL_SLOTS.map((slot, idx) => {
      const x = xs[idx];
      const y = 195 - (slot.svgKnots / 24) * 150;
      return { slot, x, y };
    });
  }, []);

  const linePath = useMemo(() => {
    if (svgPoints.length === 0) return '';
    return svgPoints.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');
  }, [svgPoints]);

  const areaPath = useMemo(() => {
    if (svgPoints.length === 0) return '';
    return `${linePath} L ${svgPoints[svgPoints.length - 1].x} 200 L ${svgPoints[0].x} 200 Z`;
  }, [linePath, svgPoints]);

  return (
    <div className="portal-container py-10 md:py-14 space-y-16 md:space-y-20">
      {/* 0. Inflation & Thermal Forecast Shield */}
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

      {/* 1. Interactive 3D Coast & Wind Spots Map */}
      <section id="wind-map" className="scroll-mt-28 space-y-5">
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
              setActiveSpotId('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors border self-start md:self-auto ${
              activeSpotId === 'all'
                ? 'bg-slate-900 text-cyan-300 border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-400'
            }`}
          >
            {t.showAllSpotsBtn}
          </button>
        </div>

        {/* Quick Spot Switchers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {WIND_SPOTS.map((spot) => {
            const isSelected = activeSpotId === spot.id;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => {
                  setFocusedPointId(null);
                  setActiveSpotId(spot.id);
                }}
                className={`text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200/80 hover:border-cyan-400 shadow-xs'
                }`}
              >
                <div className="min-w-0">
                  <span
                    className={`block text-[10px] font-extrabold uppercase tracking-wider truncate ${
                      isSelected ? 'text-cyan-300' : 'text-cyan-700'
                    }`}
                  >
                    {spot.code} · {spot.windKnots}
                  </span>
                  <span className="block text-sm font-extrabold truncate mt-0.5">
                    {spot.title[activeLocale]}
                  </span>
                  <span
                    className={`block text-[11px] truncate mt-0.5 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {spot.levelBadge[activeLocale]}
                  </span>
                </div>
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-cyan-50 text-cyan-700'
                  }`}
                >
                  <FaWind />
                </span>
              </button>
            );
          })}
        </div>

        <Kitesurfing3DMap
          locale={activeLocale}
          activeSpotId={activeSpotId}
          focusedPointId={focusedPointId}
          onSelectPoint={(pid) => setFocusedPointId(pid)}
          onSelectSpot={(sid) => setActiveSpotId(sid)}
        />
      </section>

      {/* 2. Hourly Thermal Curve SVG + Gear Calculator */}
      <section id="thermal-profile" className="scroll-mt-28 space-y-6">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaClock /> {t.thermalEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.thermalTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.thermalSubtitle}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Interactive SVG Thermal Profile */}
          <div className="lg:col-span-6 p-6 md:p-7 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 text-white flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                {t.svgCurveTitle}
              </span>
              <span className="text-[11px] font-bold text-slate-300">{t.svgClickHint}</span>
            </div>

            <div className="w-full">
              <svg
                viewBox="0 0 600 245"
                className="w-full h-auto overflow-visible"
                role="img"
                aria-label={t.svgCurveTitle}
              >
                <defs>
                  <linearGradient id="thermalAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#0891b2" stopOpacity="0.06" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines (0, 10, 15, 20 kt) */}
                {[
                  { kt: 0, label: '0 kt' },
                  { kt: 10, label: '10 kt' },
                  { kt: 15, label: '15 kt' },
                  { kt: 20, label: '20 kt' },
                ].map((grid) => {
                  const gy = 195 - (grid.kt / 24) * 150;
                  return (
                    <g key={grid.kt}>
                      <line
                        x1="48"
                        y1={gy}
                        x2="575"
                        y2={gy}
                        stroke={grid.kt === 15 ? 'rgba(34,211,238,0.35)' : 'rgba(148,163,184,0.18)'}
                        strokeDasharray={grid.kt === 0 ? undefined : '4 4'}
                      />
                      <text x="8" y={gy + 4} fill="#94a3b8" fontSize="10" fontWeight="700">
                        {grid.label}
                      </text>
                    </g>
                  );
                })}

                {/* Thermal Shading */}
                <path d={areaPath} fill="url(#thermalAreaGrad)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Morning vs Peak Badges */}
                <text x="72" y="28" fill="#cbd5e1" fontSize="10" fontWeight="700">
                  {t.svgMorningNote}
                </text>
                <text x="315" y="28" fill="#67e8f9" fontSize="10" fontWeight="800">
                  {t.svgThermalNote}
                </text>

                {/* Clickable Hourly Nodes */}
                {svgPoints.map(({ slot, x, y }) => {
                  const isActive = slot.id === activeSlot.id;
                  return (
                    <g
                      key={slot.id}
                      onClick={() => setSelectedHourId(slot.id)}
                      className="cursor-pointer"
                    >
                      <line
                        x1={x}
                        y1={y}
                        x2={x}
                        y2="195"
                        stroke={isActive ? '#fde047' : 'rgba(255,255,255,0.12)'}
                        strokeWidth={isActive ? '2' : '1'}
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? 10 : 7}
                        fill={isActive ? '#f59e0b' : '#0891b2'}
                        stroke="#ffffff"
                        strokeWidth={isActive ? 3 : 2}
                      />
                      <text
                        x={x}
                        y={y - 14}
                        textAnchor="middle"
                        fill={isActive ? '#fde047' : '#e2e8f0'}
                        fontSize="11"
                        fontWeight="800"
                      >
                        ~{slot.svgKnots} kt
                      </text>
                      <text
                        x={x}
                        y="220"
                        textAnchor="middle"
                        fill={isActive ? '#22d3ee' : '#cbd5e1'}
                        fontSize="11"
                        fontWeight="800"
                      >
                        {slot.timeLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Hourly Detail Readout */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 text-xs font-extrabold">
                    {activeSlot.timeLabel}
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    {activeSlot.name[activeLocale]}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-amber-300">
                  {activeSlot.knotsMin}–{activeSlot.knotsMax} kt
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900/70 rounded-xl px-3 py-2 border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">
                    {t.metricSurface}
                  </span>
                  <span className="text-slate-100 font-semibold">
                    {activeSlot.waterSurface[activeLocale]}
                  </span>
                </div>
                <div className="bg-slate-900/70 rounded-xl px-3 py-2 border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">
                    {t.metricCraft}
                  </span>
                  <span className="text-cyan-300 font-bold">
                    {activeSlot.bestCraft[activeLocale]}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-cyan-300">{t.tipLabel}</strong>{' '}
                {activeSlot.insiderTip[activeLocale]}
              </p>
            </div>
          </div>

          {/* Interactive Gear & Spot Sizing Calculator */}
          <div className="lg:col-span-6 p-6 md:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center flex-shrink-0">
                  <FaSlidersH />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900">
                    {t.calcTitle}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{t.calcSubtitle}</p>
                </div>
              </div>

              {/* 4 Selector Groups */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="font-extrabold text-slate-700 block mb-1.5">
                    1. {t.calcWeightLabel}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {t.weightOpts.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setWeight(opt.id)}
                        className={`px-2 py-2 rounded-xl font-bold border text-center transition-colors ${
                          weight === opt.id
                            ? 'bg-slate-900 text-cyan-300 border-slate-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-cyan-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-extrabold text-slate-700 block mb-1.5">
                    2. {t.calcWindLabel}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {t.windOpts.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setWind(opt.id)}
                        className={`px-2.5 py-2 rounded-xl font-bold border text-center transition-colors ${
                          wind === opt.id
                            ? 'bg-slate-900 text-cyan-300 border-slate-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-cyan-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-extrabold text-slate-700 block mb-1.5">
                    3. {t.calcDisciplineLabel}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {t.discOpts.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDiscipline(opt.id)}
                        className={`px-2.5 py-2 rounded-xl font-bold border text-center transition-colors ${
                          discipline === opt.id
                            ? 'bg-cyan-600 text-white border-cyan-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-cyan-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-extrabold text-slate-700 block mb-1.5">
                    4. {t.calcSeasonLabel}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {t.seasonOpts.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSeason(opt.id)}
                        className={`px-2.5 py-2 rounded-xl font-bold border text-center transition-colors ${
                          season === opt.id
                            ? 'bg-slate-900 text-amber-300 border-slate-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-cyan-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Verdict Card */}
            <div className="p-4 md:p-5 rounded-2xl bg-cyan-50/90 border border-cyan-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white rounded-xl p-3 border border-cyan-200/70">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                    {t.calcRecSizeLabel}
                  </span>
                  <strong className="text-base font-extrabold text-cyan-700 mt-0.5 block">
                    {advice.size}
                  </strong>
                </div>
                <div className="bg-white rounded-xl p-3 border border-cyan-200/70">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                    {t.calcWetsuitLabel}
                  </span>
                  <strong className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                    {advice.wetsuit}
                  </strong>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-cyan-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                    {t.calcSpotLabel}
                  </span>
                  <strong className="text-sm font-extrabold text-slate-900">
                    {advisedSpot.title[activeLocale]}
                  </strong>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{advice.note}</p>
                </div>
                <a
                  href="#wind-map"
                  onClick={() => {
                    setFocusedPointId(null);
                    setActiveSpotId(advice.spotId);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-extrabold transition-colors flex-shrink-0"
                >
                  {t.calcFocusMapBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Wind Disciplines & IKO Level 1-3 Roadmap */}
      <section className="space-y-8">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaTachometerAlt /> {t.discEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.discTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.discSubtitle}
          </p>
        </div>

        {/* 3 Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DISCIPLINE_OVERVIEWS.map((disc) => (
            <div
              key={disc.id}
              className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-[10px] font-extrabold uppercase tracking-wider">
                    {disc.badge[activeLocale]}
                  </span>
                  <span className="text-xs font-extrabold text-slate-700">{disc.windThreshold}</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">{disc.title[activeLocale]}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {disc.summary[activeLocale]}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500 font-semibold">{t.discHoursLabel}:</span>
                  <strong className="text-slate-900 text-right">
                    {disc.beginnerHours[activeLocale]}
                  </strong>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500 font-semibold">{t.discSpotLabel}:</span>
                  <strong className="text-cyan-700 text-right">{disc.bestSpot[activeLocale]}</strong>
                </div>
                <div className="pt-1 text-[11px] font-bold text-amber-800 bg-amber-50 rounded-lg px-2.5 py-1.5 border border-amber-200/70">
                  {disc.rentalRule[activeLocale]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* IKO Progression Strip */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-800 space-y-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider border border-cyan-500/30 mb-2">
              <FaAward /> IKO CERTIFICATION
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold">{t.ikoTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">{t.ikoSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {IKO_STAGES.map((stage) => (
              <div
                key={stage.level}
                className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 text-[11px] font-extrabold">
                      {stage.code}
                    </span>
                    <span className="text-[11px] font-bold text-slate-300">
                      {stage.hoursLabel[activeLocale]}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-white">
                    {stage.title[activeLocale]}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {stage.skills[activeLocale].map((sk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheckCircle className="text-cyan-400 flex-shrink-0 mt-0.5 text-[11px]" />
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-700/80 text-xs">
                  <span className="text-[10px] font-bold uppercase text-amber-300 block">
                    {t.ikoUnlocksLabel}
                  </span>
                  <span className="font-bold text-white">{stage.unlocks[activeLocale]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 2026 Courses, Rental Rates & Verified Schools */}
      <section id="schools-prices" className="scroll-mt-28 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaWater /> {t.pkgEyebrow}
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
              onClick={() => setPkgTab('courses')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                pkgTab === 'courses'
                  ? 'bg-slate-900 text-cyan-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabCourses}
            </button>
            <button
              type="button"
              onClick={() => setPkgTab('rental-storage')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                pkgTab === 'rental-storage'
                  ? 'bg-slate-900 text-cyan-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabRental}
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
                  <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-[10px] font-extrabold uppercase tracking-wider">
                    {pkg.badge[activeLocale]}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {pkg.formatNote[activeLocale]}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {pkg.title[activeLocale]}
                </h3>

                <div className="p-3.5 rounded-xl bg-slate-900 text-white">
                  <span className="block text-xl font-extrabold text-cyan-300">
                    {pkg.priceBenchmark}
                  </span>
                  <span className="block text-[11px] text-slate-300 mt-0.5">
                    {pkg.priceNote[activeLocale]}
                  </span>
                </div>

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

        {/* Verified Schools Catalog */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <FaUsers className="text-cyan-600" /> {t.schoolsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              {t.schoolsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WIND_SCHOOLS.map((school) => (
              <div
                key={school.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-extrabold text-cyan-800 uppercase">
                      {school.city[activeLocale]}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {school.badge[activeLocale]}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">{school.name}</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {school.summary[activeLocale]}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/70 space-y-2 text-[11px]">
                  <div className="font-bold text-cyan-700">{school.gearAndCert[activeLocale]}</div>
                  <div className="flex items-center justify-between gap-2 text-slate-500">
                    <span className="truncate">{school.address}</span>
                    <a
                      href={school.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-700 hover:underline font-extrabold flex-shrink-0 inline-flex items-center gap-1"
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

      {/* 5. 12-Month Wind Reliability & Water Temp Calendar */}
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
            {WIND_CALENDAR.map((entry) => {
              const isActive = entry.month === activeMonth;
              return (
                <button
                  key={entry.month}
                  type="button"
                  onClick={() => setActiveMonth(entry.month)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-[1.03]'
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
                    {entry.windDaysPct}%
                  </span>
                  <span className="block text-[9px] mt-0.5 text-amber-500">
                    {entry.waterTempC}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 md:p-5 border border-slate-200/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-cyan-300 text-xs font-extrabold uppercase">
                  {t.monthNames[activeCalendarEntry.month - 1]}
                </span>
                <span className="px-3 py-1 rounded-xl bg-cyan-100 text-cyan-900 text-xs font-extrabold">
                  {t.calWindDays}: {activeCalendarEntry.windDaysPct}%
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                <span>
                  💨 {t.calAvgWind}:{' '}
                  <strong className="text-slate-900">{activeCalendarEntry.avgKnots}</strong>
                </span>
                <span>
                  🌊 {t.calWaterTemp}:{' '}
                  <strong className="text-cyan-700">{activeCalendarEntry.waterTempC}</strong>
                </span>
                <span>
                  🧥 {t.calWetsuit}:{' '}
                  <strong className="text-slate-900">
                    {activeCalendarEntry.wetsuit[activeLocale]}
                  </strong>
                </span>
                <span>
                  🪁 {t.calKiteSizes}:{' '}
                  <strong className="text-slate-900">{activeCalendarEntry.kiteSizeRange}</strong>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {activeCalendarEntry.summary[activeLocale]}
            </p>
          </div>
        </div>
      </section>

      {/* 6. 4 Genuine Wind Spot Cards + Red-Zone Myth-Buster + Banner */}
      <section id="spots" className="scroll-mt-28 space-y-8">
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

        <div className="space-y-6">
          {WIND_SPOTS.map((spot) => (
            <article
              key={spot.id}
              className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row"
            >
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
                    {spot.code}
                  </span>
                  <span className="px-3 py-1 bg-cyan-600 text-white rounded-full text-[11px] font-extrabold shadow">
                    {spot.windKnots}
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

              <div className="p-6 md:p-7 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="hidden lg:block">
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-cyan-700 mb-1">
                      {spot.code} · {spot.distanceFromDlm[activeLocale]}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                      {spot.title[activeLocale]}
                    </h3>
                    <p className="text-sm font-semibold text-cyan-700 mt-1">
                      {spot.subtitle[activeLocale]}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block">{t.spotWindLabel}</span>
                      <strong className="text-slate-900 font-extrabold">
                        {spot.windType[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">{t.spotWaterLabel}</span>
                      <strong className="text-cyan-700 font-extrabold">
                        {spot.waterState[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">{t.spotDiscLabel}</span>
                      <strong className="text-slate-900 font-extrabold">
                        {spot.bestDisciplines[activeLocale]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">{t.spotDlmLabel}</span>
                      <strong className="text-slate-900 font-bold">
                        {spot.distanceFromDlm[activeLocale]}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {spot.description[activeLocale]}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FaStar className="text-amber-500" /> {t.spotHighlightsLabel}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-600 font-medium">
                      {spot.highlights[activeLocale].map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 font-medium">
                    {spot.caveatNote[activeLocale]}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
                  <a
                    href="#wind-map"
                    onClick={() => {
                      setFocusedPointId(null);
                      setActiveSpotId(spot.id);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    {t.spotFocusMapBtn}
                  </a>
                  <a
                    href={spot.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
                  >
                    <FaExternalLinkAlt size={10} /> {t.spotGmapsBtn}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Red-Zone Myth-Buster: Where NOT to Kite */}
        <div className="bg-rose-50/70 rounded-3xl p-6 md:p-8 border border-rose-200 space-y-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <FaBan /> {t.noKiteEyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">{t.noKiteTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1 max-w-3xl">
              {t.noKiteSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NO_KITE_ZONES.map((zone) => (
              <div
                key={zone.id}
                className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-extrabold text-slate-900">
                      {zone.title[activeLocale]}
                    </h4>
                    <FaExclamationTriangle className="text-rose-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs font-bold text-rose-800 bg-rose-50 rounded-xl px-3 py-2 border border-rose-100">
                    {zone.mythClaim[activeLocale]}
                  </p>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {zone.realityReason[activeLocale]}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <a
                    href="#wind-map"
                    onClick={() => setFocusedPointId(zone.mapPointId)}
                    className="text-xs font-bold text-slate-700 hover:text-rose-700"
                  >
                    {t.noKiteFocusBtn}
                  </a>
                  <Link
                    href={`/${activeLocale}${zone.alternativeHref}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-extrabold text-center transition-colors"
                  >
                    {zone.alternativeLabel[activeLocale]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interlinking Dark Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider border border-cyan-500/30">
              <FaSuitcase size={10} /> {t.bannerEyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{t.bannerTitle}</h3>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              {t.bannerDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-shrink-0">
            <Link
              href={`/${activeLocale}/services/transfers`}
              className="px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaRoute size={11} /> {t.btnTransfer}
            </Link>
            <Link
              href={`/${activeLocale}/paragliding`}
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaSun size={11} /> {t.btnParagliding}
            </Link>
            <Link
              href={`/${activeLocale}/articles/akyaka-azmak`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-cyan-300" /> {t.btnAkyakaArticle}
            </Link>
            <Link
              href={`/${activeLocale}/diving-fishing`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaLifeRing size={11} className="text-amber-300" /> {t.btnDivingFishing}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Safety Rules, Right of Way & Logistics 2026 */}
      <section id="rules-safety" className="scroll-mt-28 space-y-6">
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
          {WIND_SAFETY_RULES_2026.map((card) => (
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
                      <span className="w-2 h-2 rounded-full bg-cyan-600 flex-shrink-0 mt-1.5" />
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
                  className="font-bold text-cyan-700 hover:underline inline-flex items-center gap-1"
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
