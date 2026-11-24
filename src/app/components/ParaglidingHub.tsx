"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  FaBalanceScale,
  FaBookOpen,
  FaCalendarAlt,
  FaCamera,
  FaCheckCircle,
  FaClock,
  FaCompass,
  FaCube,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaFeatherAlt,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaMountain,
  FaPaperPlane,
  FaShieldAlt,
  FaStar,
  FaTimesCircle,
  FaUsers,
  FaWind,
} from 'react-icons/fa';
import Paragliding3DMap from './Paragliding3DMap';
import {
  BABADAG_RUNWAYS,
  DAILY_TIME_SLOTS,
  FLIGHT_PACKAGES,
  FLYING_SITES,
  PARAGLIDING_CALENDAR,
  PARAGLIDING_OPERATORS,
  PARAGLIDING_RULES_2026,
  type FlightSiteId,
  type LocaleCode,
} from '@/lib/paragliding';

interface HubCopy {
  inflationTitle: string;
  inflationDesc: string;
  mapEyebrow: string;
  mapTitle: string;
  mapSubtitle: string;
  showAllSitesBtn: string;
  runwaysEyebrow: string;
  runwaysTitle: string;
  runwaysSubtitle: string;
  svgBeachLabel: string;
  svgBaseLabel: string;
  svgRunwayHint: string;
  runwayMetricAlt: string;
  runwayMetricWind: string;
  runwayMetricTemp: string;
  runwayMetricDur: string;
  runwayAccessLabel: string;
  runwayBestForLabel: string;
  runwayFacilitiesLabel: string;
  showRunwayOnMapBtn: string;
  teleferikTitle: string;
  teleferikBadge: string;
  teleferikDesc: string;
  teleferikWarn: string;
  teleferikLinkLabel: string;
  slotsEyebrow: string;
  slotsTitle: string;
  slotsSubtitle: string;
  calmLabel: string;
  thermalLabel: string;
  photoLabel: string;
  slotBestFor: string;
  slotTipLabel: string;
  checkerTitle: string;
  checkerSubtitle: string;
  checkerWeight: string;
  checkerAge: string;
  checkerGoal: string;
  checkerDive: string;
  weightOpts: { id: 'under25' | 'norm' | 'heavy' | 'over110'; label: string }[];
  ageOpts: { id: 'under4' | 'child47' | 'adult' | 'senior'; label: string }[];
  goalOpts: { id: 'calm' | 'sunset' | 'acro'; label: string }[];
  diveOpts: { no: string; yes: string };
  verdictDenied: string;
  verdictCaution: string;
  verdictReady: string;
  verdictDiveStop: string;
  verdictWeightStop: string;
  verdictWeightUnder: string;
  verdictAgeStop: string;
  verdictWeightWarn: string;
  verdictChildNote: string;
  verdictOkDetail: (slot: string) => string;
  pkgEyebrow: string;
  pkgTitle: string;
  pkgSubtitle: string;
  tabTandem: string;
  tabSolo: string;
  includedLabel: string;
  insiderTipLabel: string;
  opsTitle: string;
  opsSubtitle: string;
  calEyebrow: string;
  calTitle: string;
  calSubtitle: string;
  calBeachTemp: string;
  calMountainTemp: string;
  calFlyScore: string;
  calRunway: string;
  calAirGamesBadge: string;
  monthNames: string[];
  monthShortNames: string[];
  sitesEyebrow: string;
  sitesTitle: string;
  sitesSubtitle: string;
  siteAltLabel: string;
  siteDropLabel: string;
  siteDurLabel: string;
  siteDlmLabel: string;
  siteHighlightsLabel: string;
  siteFocusMapBtn: string;
  siteGmapsBtn: string;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerDesc: string;
  btnServiceExcursions: string;
  btnArticleBabadag: string;
  btnArticleOludeniz: string;
  btnDivingFishing: string;
  rulesEyebrow: string;
  rulesTitle: string;
  rulesSubtitle: string;
  sourceLabel: string;
}

const HUB_COPY: Record<LocaleCode, HubCopy> = {
  ru: {
    inflationTitle: 'Щит от инфляции и статус SHGM 2026',
    inflationDesc:
      'Коммерческие тандемные полёты на Бабадаге привязаны к доллару/евро ($130–160 / €120–150), а билеты канатной дороги Babadağ Teleferik и фотопакеты корректируются по курсу лиры. Все старты работают под жёстким контролем гражданской авиации SHGM и цифровой системы SHM Fethiye.',
    mapEyebrow: '3D-КАРТА ПОЛЁТОВ И РЕЛЬЕФА · 3 ЛОКАЦИИ',
    mapTitle: 'Облетите Бабадаг (1969 м), Сакар-Тепе и Каш в 3D',
    mapSubtitle:
      'Вращайте 3D-гору правой кнопкой мыши, нажимайте на точки старта (1200–1969 м), пляж посадки Бельджекиз, линию канатной дороги или зону водных SIV-тренировок.',
    showAllSitesBtn: 'Показать весь берег (Датча — Каш)',
    runwaysEyebrow: 'СХЕМА ВЫСОТ БАБАДАГА · 4 СТАРТОВЫЕ ПЛОЩАДКИ',
    runwaysTitle: 'Как устроен профиль склона (0 м → 1969 м) и Babadağ Teleferik',
    runwaysSubtitle:
      'Нажмите на любую отметку высоты на схеме ниже, чтобы увидеть рабочее направление ветра, разницу температур с пляжем и время планирования.',
    svgBeachLabel: '0 м · Бельджекиз',
    svgBaseLabel: '226 м · Канатка',
    svgRunwayHint: 'Нажмите на точку старта (1200–1969 м) ↓',
    runwayMetricAlt: 'Высота старта',
    runwayMetricWind: 'Рабочий ветер',
    runwayMetricTemp: 'Прохладнее пляжа',
    runwayMetricDur: 'Время в воздухе',
    runwayAccessLabel: 'Как подняться:',
    runwayBestForLabel: 'Когда используют:',
    runwayFacilitiesLabel: 'Что есть наверху:',
    showRunwayOnMapBtn: 'Показать площадку на 3D-карте ↑',
    teleferikTitle: 'Канатная дорога Babadağ Teleferik (Оваджик → 1700–1900 м)',
    teleferikBadge: '890–950 ₺ (~€17–22) · туда-обратно',
    teleferikDesc:
      'Закрытые 8-местные гондолы доставляют туристов и пилотов к ресторанам и стартам 1200/1700 м за ~15–18 минут. Выше (1800/1900 м) ведут открытые кресельные подъёмники.',
    teleferikWarn:
      'Дети 0–7 лет едут бесплатно в закрытой гондоле до 1700 м, но НЕ допускаются на открытую креселку к 1800/1900 м!',
    teleferikLinkLabel: 'Подробный гид по горе Бабадаг →',
    slotsEyebrow: 'СЛОТЫ ВРЕМЕНИ И ДОПУСК К ПОЛЁТУ',
    slotsTitle: 'Выберите час полёта (08:30–17:00) и проверьте свой допуск',
    slotsSubtitle:
      'Ощущения на Бабадаге кардинально зависят от времени суток: в 08:30 — полный штиль, в 13:00 — мощные термики, в 17:00 — золотой закатный свет.',
    calmLabel: 'Спокойствие воздуха',
    thermalLabel: 'Термики и драйв',
    photoLabel: 'Свет для фото',
    slotBestFor: 'Кому подходит идеально:',
    slotTipLabel: 'Совет по вылету:',
    checkerTitle: 'Быстрый чекер допуска: подойдёт ли вам полёт и какой слот выбрать?',
    checkerSubtitle: 'Отметьте параметры пассажира (сопоставление с лимитами SHGM / EN и правилами дайвинга):',
    checkerWeight: 'Вес пассажира',
    checkerAge: 'Возраст',
    checkerGoal: 'Желаемый характер полёта',
    checkerDive: 'Погружение с аквалангом за последние 24 часа?',
    weightOpts: [
      { id: 'under25', label: '< 25 кг' },
      { id: 'norm', label: '25–90 кг' },
      { id: 'heavy', label: '91–105 кг' },
      { id: 'over110', label: '> 110 кг' },
    ],
    ageOpts: [
      { id: 'under4', label: '< 4 лет' },
      { id: 'child47', label: '4–7 лет' },
      { id: 'adult', label: '8–70 лет' },
      { id: 'senior', label: '70+ лет' },
    ],
    goalOpts: [
      { id: 'calm', label: 'Спокойный первый раз' },
      { id: 'sunset', label: 'Золотой закат' },
      { id: 'acro', label: 'Акро и драйв' },
    ],
    diveOpts: { no: 'Нет, не нырял(а)', yes: 'Да, был дайвинг!' },
    verdictDenied: '⛔ ПОЛЁТ И ПОДЪЁМ НА ГОРУ ПРОТИВОПОКАЗАНЫ',
    verdictCaution: '⚠️ ДОПУСК С ОГРАНИЧЕНИЯМИ / УТОЧНЕНИЕМ',
    verdictReady: '✅ ОТЛИЧНО! ВЫ ПОЛНОСТЬЮ ГОТОВЫ К ПОЛЁТУ',
    verdictDiveStop:
      'После дайвинга с аквалангом обязательно выждите 18–24 часа перед подъёмом на Бабадаг (1700–1969 м), чтобы избежать риска декомпрессионной болезни!',
    verdictWeightStop:
      'Большинство коммерческих тандем-крыльев сертифицированы на пассажира до 100–110 кг. Вес выше 110 кг обычно не допускается по лимитам SHGM.',
    verdictWeightUnder:
      'Минимальный вес для безопасной фиксации в пассажирской подвеске — 25–30 кг.',
    verdictAgeStop:
      'Детей младше 4 лет на тандемный полёт не берут (многие школы принимают строго с 5–7 лет).',
    verdictWeightWarn:
      'В диапазоне 91–105 кг обязательно заранее сообщите точный вес оператору: нужен крупный тандем-пилот и достаточный встречный ветер (на ряде школ для женщин порог ~90 кг).',
    verdictChildNote:
      'Ребёнку 4–7 лет подойдёт утренний штилевой слот 08:30 со старта 1700 м (на креселку 1800/1900 м детей до 7 лет не пускают!).',
    verdictOkDetail: (slot) =>
      `Рекомендуемый слот: ${slot}. Наденьте закрытые кроссовки на шнуровке, возьмите ветровку (+10…12 °C прохладнее, чем на пляже) и оставьте телефон в застёгнутом кармане.`,
    pkgEyebrow: 'ЦЕНЫ 2026, SIV-ТРЕНИРОВКИ И ФЕСТИВАЛЬ',
    pkgTitle: 'Форматы тандема, медиа-пакеты и программа для соло-пилотов',
    pkgSubtitle:
      'Честная разбивка, за что платят туристы и самостоятельные пилоты, чтобы избежать неприятных доплат на старте.',
    tabTandem: '🪂 Тандемные полёты (для туристов)',
    tabSolo: '🧭 Соло-пилоты, SIV-курсы и Air Games',
    includedLabel: 'Что включено и важные нюансы:',
    insiderTipLabel: 'Совет инсайдера:',
    opsTitle: 'Проверенные лицензированные школы и центры (SHGM / TÜRSAB)',
    opsSubtitle:
      'Известные официальные операторы в Олюденизе, а также ориентиры для стартов в Каше и над заливом Гёкова:',
    calEyebrow: 'ПОЛЁТЫ ПО МЕСЯЦАМ (12 МЕСЯЦЕВ)',
    calTitle: 'Календарь погоды: пляж vs вершина 1700 м и фестиваль Air Games',
    calSubtitle:
      'Даже в летний зной наверху прохладно; нажмите на любой месяц, чтобы узнать рабочий старт и температурную разницу.',
    calBeachTemp: 'Пляж',
    calMountainTemp: 'Бабадаг 1700 м',
    calFlyScore: 'Лётность',
    calRunway: 'Старт',
    calAirGamesBadge: '🎪 Месяц фестиваля Ölüdeniz Air Games',
    monthNames: [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ],
    monthShortNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    sitesEyebrow: 'СРАВНЕНИЕ 3 ЛЁТНЫХ РЕГИОНОВ ПОБЕРЕЖЬЯ',
    sitesTitle: 'Олюдениз (Бабадаг), Сакар-Тепе (Акьяка) и гора Асас (Каш)',
    sitesSubtitle:
      'Если вы живёте в Мармарисе или Каше — сравните расстояния, высоты и условия локальных стартов.',
    siteAltLabel: 'Высота старта',
    siteDropLabel: 'Перепад',
    siteDurLabel: 'Длительность',
    siteDlmLabel: 'От аэропорта DLM',
    siteHighlightsLabel: 'Особенности локации:',
    siteFocusMapBtn: 'Показать в 3D ↑',
    siteGmapsBtn: 'Google Maps',
    bannerEyebrow: 'ДРУГИЕ АКТИВНОСТИ И ГИДЫ ПОРТАЛА',
    bannerTitle: 'Планируете активный отпуск между Датчей и Кашем?',
    bannerDesc:
      'Изучите наш подробный гид по смотровым террасам Бабадага без прыжка, посмотрите сервис экскурсий или перейдите в новый хаб «Дайвинг и рыбалка».',
    btnServiceExcursions: 'Сервис-хаб: Экскурсии →',
    btnArticleBabadag: 'Статья: Гора Бабадаг без прыжка',
    btnArticleOludeniz: 'Статья: Курорт Олюдениз',
    btnDivingFishing: 'Хаб: Дайвинг и рыбалка →',
    rulesEyebrow: 'АВИАПРАВИЛА SHGM И БЕЗОПАСНОСТЬ 2026',
    rulesTitle: 'Обязательные регламенты пилотов, экипировки и здоровья',
    rulesSubtitle:
      'Короткая выжимка официальных директив SHGM / SHM Fethiye и требований на старт-рампах.',
    sourceLabel: 'Источник:',
  },
  en: {
    inflationTitle: '2026 Inflation Shield & SHGM Status',
    inflationDesc:
      'Commercial tandem packages on Mount Babadağ are benchmarked in USD/EUR ($130–$160 / €120–€150), while Babadağ Teleferik cable car tickets and pilot GoPro add-ons adjust in Turkish Lira. Every flight operates under strict Civil Aviation (SHGM) and SHM Fethiye digital oversight.',
    mapEyebrow: '3D FLIGHT & TERRAIN MAP · 3 COASTAL HUBS',
    mapTitle: 'Orbit Babadağ (1,969 m), Sakartepe & Kaş in Live 3D',
    mapSubtitle:
      'Tilt and rotate the 3D mountain with right-click drag, inspect every launch runway (1,200–1,969 m), Belcekız beach landing, Teleferik cable line, and the over-water SIV training box.',
    showAllSitesBtn: 'Show Full Coast (Datça — Kaş)',
    runwaysEyebrow: 'BABADAĞ ALTITUDE PROFILE · 4 LAUNCH RUNWAYS',
    runwaysTitle: 'Mountain Elevation Profile (0 m → 1,969 m) & Cable Car',
    runwaysSubtitle:
      'Click any runway elevation node below to inspect operating wind alignments, summit cooling, and glide times.',
    svgBeachLabel: '0 m · Belcekız LZ',
    svgBaseLabel: '226 m · Teleferik',
    svgRunwayHint: 'Tap a takeoff altitude node (1,200–1,969 m) ↓',
    runwayMetricAlt: 'Launch Elevation',
    runwayMetricWind: 'Wind Direction',
    runwayMetricTemp: 'Summit Cooling',
    runwayMetricDur: 'Flight Time',
    runwayAccessLabel: 'Access:',
    runwayBestForLabel: 'Best used when:',
    runwayFacilitiesLabel: 'At the launch:',
    showRunwayOnMapBtn: 'Focus Runway on 3D Map ↑',
    teleferikTitle: 'Babadağ Teleferik Cable Car (Ovacık → 1,700–1,900 m)',
    teleferikBadge: '890–950 TL (~€17–22) · Round-Trip',
    teleferikDesc:
      'Enclosed 8-seat gondolas lift sightseers and pilots to 1,200 m & 1,700 m terraces in 15–18 minutes, connecting to open chairlifts up to 1,800/1,900 m.',
    teleferikWarn:
      'Children 0–7 ride enclosed gondolas free to 1,700 m, yet are STRICTLY BARRED from open upper chairlifts (1,800/1,900 m)!',
    teleferikLinkLabel: 'Read Complete Mount Babadağ Guide →',
    slotsEyebrow: 'DAILY TIME SLOTS & ELIGIBILITY CHECKER',
    slotsTitle: 'Compare Daily Slots (08:30–17:00) & Check Flight Readiness',
    slotsSubtitle:
      'Mountain air transforms across the day: glass calm at 08:30, soaring thermal lifts at 13:00, and golden-hour magic at 17:00.',
    calmLabel: 'Air Smoothness',
    thermalLabel: 'Thermal Lift',
    photoLabel: 'Photo Light',
    slotBestFor: 'Best matched for:',
    slotTipLabel: 'Booking & clothing tip:',
    checkerTitle: 'Instant Passenger Readiness Checker: Can You Fly & Which Slot Fits?',
    checkerSubtitle: 'Toggle your parameters against official SHGM wing ratings and scuba safety intervals:',
    checkerWeight: 'Passenger Weight',
    checkerAge: 'Age Bracket',
    checkerGoal: 'Flight Style',
    checkerDive: 'Scuba dive within last 24 hours?',
    weightOpts: [
      { id: 'under25', label: '< 25 kg' },
      { id: 'norm', label: '25–90 kg' },
      { id: 'heavy', label: '91–105 kg' },
      { id: 'over110', label: '> 110 kg' },
    ],
    ageOpts: [
      { id: 'under4', label: '< 4 yrs' },
      { id: 'child47', label: '4–7 yrs' },
      { id: 'adult', label: '8–70 yrs' },
      { id: 'senior', label: '70+ yrs' },
    ],
    goalOpts: [
      { id: 'calm', label: 'Calm First Flight' },
      { id: 'sunset', label: 'Sunset Views' },
      { id: 'acro', label: 'Acro & Spirals' },
    ],
    diveOpts: { no: 'No scuba dive', yes: 'Yes, dived <24h ago!' },
    verdictDenied: '⛔ FLIGHT / MOUNTAIN ASCENT NOT PERMITTED',
    verdictCaution: '⚠️ CONDITIONAL APPROVAL — CONFIRM WITH OPERATOR',
    verdictReady: '✅ ALL CLEAR! YOU ARE READY TO FLY',
    verdictDiveStop:
      'Wait 18–24 hours after scuba diving before riding up Mount Babadağ (1,700–1,969 m) or flying—rapid altitude ascent poses decompression sickness risks!',
    verdictWeightStop:
      'Most commercial tandem wings are SHGM-certified up to 100–110 kg passenger weight. Guests above 110 kg generally cannot be carried safely.',
    verdictWeightUnder: 'Minimum harness weight threshold is 25–30 kg so children sit securely.',
    verdictAgeStop:
      'Minimum passenger age is generally 4–5 years (many operators require 7+ with clear runway-jog comprehension).',
    verdictWeightWarn:
      'Between 91–105 kg, notify your operator beforehand so they assign a matching tandem wing/pilot and favorable headwind (some operators apply ~90 kg female limits).',
    verdictChildNote:
      'Ages 4–7 should take the smooth 08:30 slot launching from 1,700 m (kids 0–7 cannot board open chairlifts to 1,800/1,900 m).',
    verdictOkDetail: (slot) =>
      `Best time slot: ${slot}. Wear laced sneakers (no sandals), pack a windbreaker (-10 to -12 °C cooler on summit), and keep phones pocketed.`,
    pkgEyebrow: '2026 RATES, SIV CLINICS & FESTIVAL',
    pkgTitle: 'Tandem Packages, GoPro Media Pricing & Solo Pilot Hub',
    pkgSubtitle:
      'Transparent cost breakdown covering mountain entry fees, 360° video add-ons, SIV clinics, and October’s Air Games.',
    tabTandem: '🪂 Tandem Flights & Teleferik',
    tabSolo: '🧭 Solo Pilots, SIV & Air Games',
    includedLabel: 'Included & key notes:',
    insiderTipLabel: 'Insider tip:',
    opsTitle: 'Established Licensed Paragliding Companies (SHGM / TÜRSAB)',
    opsSubtitle:
      'Well-known official operators along Belcekız strip plus regional contacts in Kaş and Gökova:',
    calEyebrow: '12-MONTH FLYING PLANNER',
    calTitle: 'Beach vs 1,700 m Summit Temperatures & Best Months',
    calSubtitle:
      'Even peak August feels crisp at launch; select any month for typical temperatures, flyability, and active runways.',
    calBeachTemp: 'Beach',
    calMountainTemp: 'Babadağ 1,700 m',
    calFlyScore: 'Flyability',
    calRunway: 'Runway',
    calAirGamesBadge: '🎪 Ölüdeniz Air Games Festival Month',
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    sitesEyebrow: '3 REGIONAL FLYING SITES COMPARED',
    sitesTitle: 'Babadağ (Ölüdeniz), Sakartepe (Akyaka) & Asas (Kaş)',
    sitesSubtitle:
      'Compare launch heights, vertical drops, DLM drive times, and local considerations across the Turquoise Coast.',
    siteAltLabel: 'Takeoff',
    siteDropLabel: 'Vertical Drop',
    siteDurLabel: 'Flight Time',
    siteDlmLabel: 'From DLM',
    siteHighlightsLabel: 'Site Highlights:',
    siteFocusMapBtn: 'Fly to on 3D Map ↑',
    siteGmapsBtn: 'Google Maps',
    bannerEyebrow: 'EXPLORE MORE ON DALAMAN.INFO',
    bannerTitle: 'Pair Your Flight with Coastal Water & Mountain Adventures',
    bannerDesc:
      'Check our standalone Babadağ cable car guide, browse vetted tour operators, or switch to our interactive Diving & Fishing hub.',
    btnServiceExcursions: 'Service Hub: Excursions →',
    btnArticleBabadag: 'Guide: Mount Babadağ',
    btnArticleOludeniz: 'Guide: Ölüdeniz Beach',
    btnDivingFishing: 'Hub: Diving & Fishing →',
    rulesEyebrow: 'SHGM STATUTES & SAFETY 2026',
    rulesTitle: 'Pilot Licensing, Limits, Gear Rules & Scuba Wait Times',
    rulesSubtitle:
      'Core operational directives from SHGM, SHM Fethiye, and Babadağ launch marshals.',
    sourceLabel: 'Source:',
  },
  de: {
    inflationTitle: '2026 Inflationsschutz & SHGM-Status',
    inflationDesc:
      'Tandemflüge am Babadağ orientieren sich an USD/EUR (ca. 120–150 €), während Babadağ-Teleferik-Tickets und Video-Pakete in Türkischer Lira angepasst werden. Alle Flüge unterliegen strenger SHGM-Kontrolle.',
    mapEyebrow: '3D-GELÄNDE- & FLUGKARTE · 3 REGIONEN',
    mapTitle: 'Babadağ (1.969 m), Sakartepe & Kaş interaktiv in 3D erleben',
    mapSubtitle:
      'Drehen Sie das 3D-Bergmassiv mit der rechten Maustaste und klicken Sie auf die vier Startrampen, den Strand von Belcekız, die Seilbahn oder die SIV-Zone über dem Meer.',
    showAllSitesBtn: 'Ganze Küste anzeigen (Datça – Kaş)',
    runwaysEyebrow: 'HÖHENPROFIL BABADAĞ · 4 STARTPLÄTZE',
    runwaysTitle: 'Vom Strand bis 1.969 m Gipfel & Babadağ Teleferik',
    runwaysSubtitle:
      'Klicken Sie auf eine Höhenmarke im Profil, um Windrichtung, Temperaturunterschied und Flugdauer anzuzeigen.',
    svgBeachLabel: '0 m · Belcekız LZ',
    svgBaseLabel: '226 m · Seilbahn',
    svgRunwayHint: 'Starthöhe im Profil auswählen (1.200–1.969 m) ↓',
    runwayMetricAlt: 'Starthöhe',
    runwayMetricWind: 'Windrichtung',
    runwayMetricTemp: 'Abkühlung oben',
    runwayMetricDur: 'Flugdauer',
    runwayAccessLabel: 'Auffahrt:',
    runwayBestForLabel: 'Einsatzbereich:',
    runwayFacilitiesLabel: 'Infrastruktur:',
    showRunwayOnMapBtn: 'Auf 3D-Karte fokussieren ↑',
    teleferikTitle: 'Seilbahn Babadağ Teleferik (Ovacık → 1.700–1.900 m)',
    teleferikBadge: '890–950 TL (~17–22 €) · Hin & Zurück',
    teleferikDesc:
      'Moderne 8er-Gondeln fahren in 15–18 Min. zu den Restaurants auf 1.200/1.700 m; weiter nach oben bis 1.800/1.900 m führen offene Sessellifte.',
    teleferikWarn:
      'Kinder von 0–7 Jahren fahren gratis bis 1.700 m in der Gondel, dürfen aber NICHT auf den offenen Sessellift (1.800/1.900 m)!',
    teleferikLinkLabel: 'Ausführlicher Babadağ-Guide →',
    slotsEyebrow: 'TAGESZEITEN & FLUGTAUGLICHKEITS-CHECK',
    slotsTitle: 'Flugzeit wählen (08:30–17:00) & persönliche Eignung prüfen',
    slotsSubtitle:
      'Von ruhiger Morgenluft um 08:30 über starke Mittagsthermik bis zum goldenen Sonnenuntergang.',
    calmLabel: 'Ruhe der Luft',
    thermalLabel: 'Thermik / Dynamik',
    photoLabel: 'Fotolicht',
    slotBestFor: 'Ideal geeignet für:',
    slotTipLabel: 'Praxis-Tipp:',
    checkerTitle: 'Schnell-Check: Passt der Tandemflug für Sie?',
    checkerSubtitle: 'Daten angeben und sofort passende Startzeit sowie Sicherheits-Hinweise erhalten:',
    checkerWeight: 'Körpergewicht',
    checkerAge: 'Alter',
    checkerGoal: 'Flugwunsch',
    checkerDive: 'Gerätetauchen in den letzten 24 Std.?',
    weightOpts: [
      { id: 'under25', label: '< 25 kg' },
      { id: 'norm', label: '25–90 kg' },
      { id: 'heavy', label: '91–105 kg' },
      { id: 'over110', label: '> 110 kg' },
    ],
    ageOpts: [
      { id: 'under4', label: '< 4 J.' },
      { id: 'child47', label: '4–7 J.' },
      { id: 'adult', label: '8–70 J.' },
      { id: 'senior', label: '70+ J.' },
    ],
    goalOpts: [
      { id: 'calm', label: 'Ruhiger Erstflug' },
      { id: 'sunset', label: 'Sonnenuntergang' },
      { id: 'acro', label: 'Akrobatik' },
    ],
    diveOpts: { no: 'Nein', yes: 'Ja, getaucht!' },
    verdictDenied: '⛔ FLUG / BERGFAHRT AKTUELL NICHT MÖGLICH',
    verdictCaution: '⚠️ EINGESCHRÄNKTE FREIGABE — VORAB KLÄREN',
    verdictReady: '✅ ALLES BESTENS — BEREIT FÜR DEN START',
    verdictDiveStop:
      'Nach dem Tauchen unbedingt 18–24 Stunden warten, bevor man auf den Babadağ (1.700–1.969 m) fährt oder fliegt (Dekompressionsgefahr)!',
    verdictWeightStop:
      'Tandemschirme sind in der Regel bis maximal 100–110 kg Passagiergewicht zugelassen.',
    verdictWeightUnder: 'Mindestgewicht für einen sicheren Sitz im Gurtzeug liegt bei 25–30 kg.',
    verdictAgeStop: 'Mindestalter für Tandemflüge liegt meist bei 4–5 Jahren (teils ab 7 Jahren).',
    verdictWeightWarn:
      'Zwischen 91–105 kg bitte direkt beim Anbieter vorab angeben, damit Schirmgröße und Pilot optimal passen.',
    verdictChildNote:
      'Für Kinder von 4–7 Jahren empfiehlt sich der ruhige 08:30-Slot ab 1.700 m (Sessellift bis 1.900 m ist für 0–7 J. gesperrt!).',
    verdictOkDetail: (slot) =>
      `Empfohlener Slot: ${slot}. Geschlossene Turnschuhe anziehen, Windjacke mitnehmen und Handys sicher verstauen.`,
    pkgEyebrow: 'PREISE 2026, SIV-KURSE & FESTIVAL',
    pkgTitle: 'Tandem-Pakete, Medienkosten & Infos für Solo-Piloten',
    pkgSubtitle:
      'Klare Preisübersicht inklusive Bergfahrt, GoPro/360°-Paketen, SIV-Trainings und Air Games.',
    tabTandem: '🪂 Tandemflüge & Seilbahn',
    tabSolo: '🧭 Solo-Piloten, SIV & Air Games',
    includedLabel: 'Enthaltene Leistungen:',
    insiderTipLabel: 'Insider-Tipp:',
    opsTitle: 'Renommierte lizenzierte Flugschulen (SHGM / TÜRSAB)',
    opsSubtitle:
      'Bekannte lizenzierte Anbieter an der Promenade von Ölüdeniz sowie für Kaş und Sakartepe:',
    calEyebrow: '12-MONATS-KALENDER',
    calTitle: 'Strand- vs. Bergtemperaturen (1.700 m) & beste Reisezeit',
    calSubtitle:
      'Wählen Sie einen Monat für Details zu Temperaturunterschied, Startpiste und dem Oktober-Festival.',
    calBeachTemp: 'Strand',
    calMountainTemp: 'Babadağ 1.700 m',
    calFlyScore: 'Flugwetter',
    calRunway: 'Startplatz',
    calAirGamesBadge: '🎪 Monat der Ölüdeniz Air Games',
    monthNames: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
    ],
    monthShortNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    sitesEyebrow: '3 FLUGREVIERE IM VERGLEICH',
    sitesTitle: 'Babadağ (Ölüdeniz), Sakartepe (Akyaka) & Asas (Kaş)',
    sitesSubtitle:
      'Höhenunterschiede, Transferzeiten ab Flughafen Dalaman (DLM) und regionale Besonderheiten.',
    siteAltLabel: 'Starthöhe',
    siteDropLabel: 'Höhendiff.',
    siteDurLabel: 'Flugzeit',
    siteDlmLabel: 'Ab Flughafen DLM',
    siteHighlightsLabel: 'Besonderheiten:',
    siteFocusMapBtn: 'In 3D zeigen ↑',
    siteGmapsBtn: 'Google Maps',
    bannerEyebrow: 'WEITERE GUIDES & AKTIVITÄTEN',
    bannerTitle: 'Abenteuer zwischen Datça und Kaş perfekt kombinieren',
    bannerDesc:
      'Entdecken Sie auch unseren Seilbahn-Guide zum Babadağ ohne Flug oder unseren neuen Hub für Tauchen & Angeln.',
    btnServiceExcursions: 'Service-Hub: Ausflüge →',
    btnArticleBabadag: 'Artikel: Berg Babadağ',
    btnArticleOludeniz: 'Artikel: Ölüdeniz',
    btnDivingFishing: 'Hub: Tauchen & Angeln →',
    rulesEyebrow: 'SHGM-VORSCHRIFTEN & SICHERHEIT 2026',
    rulesTitle: 'Lizenzen, Gewichtsgrenzen, Schuhpflicht & Tauch-Regel',
    rulesSubtitle:
      'Verbindliche Regeln der türkischen Luftfahrtbehörde SHGM und der Startplatzleitung.',
    sourceLabel: 'Quelle:',
  },
  tr: {
    inflationTitle: '2026 Enflasyon Koruması ve SHGM Durumu',
    inflationDesc:
      'Babadağ ticari tandem uçuşları genellikle USD/EUR ($130–$160 / €120–€150) endeksli, Babadağ Teleferik ve medya paketleri ise TL bazlı güncellenir. Tüm uçuşlar Sivil Havacılık (SHGM) ve SHM Fethiye dijital kontrolündedir.',
    mapEyebrow: '3D UÇUŞ VE ARAZİ HARİTASI · 3 MERKEZ',
    mapTitle: 'Babadağ (1.969 m), Sakartepe ve Kaş’ı Canlı 3D Keşfedin',
    mapSubtitle:
      '3D dağı sağ tık ile döndürün; 1.200–1.969 m kalkış pistlerine, Belcekız iniş bandına, teleferik hattına ve deniz üzeri SIV sahasına tıklayın.',
    showAllSitesBtn: 'Tüm Kıyıyı Göster (Datça – Kaş)',
    runwaysEyebrow: 'BABADAĞ İRTİFA ŞEMASI · 4 KALKIŞ PİSTİ',
    runwaysTitle: 'Dağ Profili (0 m → 1.969 m) ve Babadağ Teleferik',
    runwaysSubtitle:
      'Rüzgar yönünü, sıcaklık farkını ve süzülüş süresini görmek için şemadaki herhangi bir kalkış noktasına tıklayın.',
    svgBeachLabel: '0 m · Belcekız',
    svgBaseLabel: '226 m · Teleferik',
    svgRunwayHint: 'Kalkış yüksekliğini seçin (1.200–1.969 m) ↓',
    runwayMetricAlt: 'Kalkış İrtifası',
    runwayMetricWind: 'Rüzgar Yönü',
    runwayMetricTemp: 'Zirve Serinliği',
    runwayMetricDur: 'Uçuş Süresi',
    runwayAccessLabel: 'Ulaşım:',
    runwayBestForLabel: 'Kullanım durumu:',
    runwayFacilitiesLabel: 'Pist imkanları:',
    showRunwayOnMapBtn: 'Pisti 3D Haritada Göster ↑',
    teleferikTitle: 'Babadağ Teleferik (Ovacık → 1.700–1.900 m)',
    teleferikBadge: '890–950 TL (~€17–22) · Gidiş-Dönüş',
    teleferikDesc:
      '8 kişilik kapalı gondollar 15–18 dakikada 1.200 ve 1.700 m tesislerine çıkarır; buradan 1.800 ve 1.900 m pistlerine açık telesiyej bağlanır.',
    teleferikWarn:
      '0–7 yaş çocuklar 1.700 m’ye kadar kapalı gondolda ücretsizdir ancak açık telesiyeje (1.800/1.900 m) KESİNLİKLE alınmaz!',
    teleferikLinkLabel: 'Detaylı Babadağ Rehberini Oku →',
    slotsEyebrow: 'GÜNLÜK UÇUŞ SAATLERİ VE UYGUNLUK KONTROLÜ',
    slotsTitle: 'Uçuş Saatini Seçin (08:30–17:00) ve Uygunluğunuzu Test Edin',
    slotsSubtitle:
      '08:30’da çarşaf gibi sakin hava, 13:00’te güçlü termikler, 17:00’de altın gün batımı ışığı yaşanır.',
    calmLabel: 'Hava Sakinliği',
    thermalLabel: 'Termik / İrtifa',
    photoLabel: 'Fotoğraf Işığı',
    slotBestFor: 'Kimler için ideal:',
    slotTipLabel: 'Rezervasyon ve kıyafet ipucu:',
    checkerTitle: 'Hızlı Uçuş Uygunluk Testi: Hangi Saat Size Göre?',
    checkerSubtitle: 'Kilo, yaş ve dalış bilgilerinizi seçerek anlık öneri alın:',
    checkerWeight: 'Yolcu Kilosu',
    checkerAge: 'Yaş Aralığı',
    checkerGoal: 'Uçuş Tercihi',
    checkerDive: 'Son 24 saat içinde tüplü dalış yaptınız mı?',
    weightOpts: [
      { id: 'under25', label: '< 25 kg' },
      { id: 'norm', label: '25–90 kg' },
      { id: 'heavy', label: '91–105 kg' },
      { id: 'over110', label: '> 110 kg' },
    ],
    ageOpts: [
      { id: 'under4', label: '< 4 yaş' },
      { id: 'child47', label: '4–7 yaş' },
      { id: 'adult', label: '8–70 yaş' },
      { id: 'senior', label: '70+ yaş' },
    ],
    goalOpts: [
      { id: 'calm', label: 'Sakin İlk Uçuş' },
      { id: 'sunset', label: 'Gün Batımı' },
      { id: 'acro', label: 'Akrobasi' },
    ],
    diveOpts: { no: 'Hayır, dalmadım', yes: 'Evet, 24 sa. içinde daldım!' },
    verdictDenied: '⛔ UÇUŞ VE ZİRVE ÇIKIŞI UYGUN DEĞİL',
    verdictCaution: '⚠️ KOŞULLU UYGUNLUK — ACENTE İLE TEYİTLEŞİN',
    verdictReady: '✅ HARİKA! UÇUŞA TAMAMEN HAZIRSINIZ',
    verdictDiveStop:
      'Tüplü dalıştan sonraki 18–24 saat içinde 1.700–1.969 m Babadağ’a çıkmayın veya uçmayın — ani irtifa vurgun riski taşır!',
    verdictWeightStop:
      'Ticari tandem kanatlar genellikle en fazla 100–110 kg yolcu için SHGM onaylıdır.',
    verdictWeightUnder: 'Kuşam içine güvenli oturuş için minimum ağırlık 25–30 kg’dır.',
    verdictAgeStop: 'Tandem uçuşlarda minimum yaş sınırı genellikle 4–5 yaştır (bazı okullarda 7+).',
    verdictWeightWarn:
      '91–105 kg aralığındaysanız doğru kanat ve rüzgar penceresi için kilonuzu mutlaka rezervasyon sırasında belirtin.',
    verdictChildNote:
      '4–7 yaş çocuklar için 1.700 m kalkışlı 08:30 sabah uçuşu en idealidir (açık telesiyeje 0–7 yaş alınmaz!).',
    verdictOkDetail: (slot) =>
      `Önerilen saat: ${slot}. Bağcıklı spor ayakkabı giyin, yanınıza rüzgarlık alın (zirve plajdan 10–12 °C serindir) ve telefonunuzu cebinizde tutun.`,
    pkgEyebrow: '2026 FİYATLAR, SIV VE HAVA OYUNLARI',
    pkgTitle: 'Tandem Paketleri, 360° Çekim ve Solo Pilot Rehberi',
    pkgSubtitle:
      'Pist giriş ücretleri, GoPro/360° kamera farkı, SIV kampları ve Ekim Hava Oyunları Festivali hakkında şeffaf özet.',
    tabTandem: '🪂 Tandem Uçuş & Teleferik',
    tabSolo: '🧭 Solo Pilot, SIV ve Hava Oyunları',
    includedLabel: 'Kapsam ve önemli detaylar:',
    insiderTipLabel: 'Yerel ipucu:',
    opsTitle: 'Önde Gelen Lisanslı Uçuş Okulları (SHGM / TÜRSAB)',
    opsSubtitle:
      'Belcekız kordonundaki köklü yetkili firmalar ile Kaş ve Sakartepe merkezleri:',
    calEyebrow: '12 AYLIK UÇUŞ TAKVİMİ',
    calTitle: 'Sahil vs 1.700 m Zirve Sıcaklığı ve En İyi Aylar',
    calSubtitle:
      'Yaz ortasında bile kalkış pisti serindir; herhangi bir aya tıklayarak tavsiye edilen pisti ve hava durumunu görün.',
    calBeachTemp: 'Sahil',
    calMountainTemp: 'Babadağ 1.700 m',
    calFlyScore: 'Uçuş Puanı',
    calRunway: 'Pist',
    calAirGamesBadge: '🎪 Ölüdeniz Hava Oyunları Festivali Ayı',
    monthNames: [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ],
    monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    sitesEyebrow: 'BÖLGEDEKİ 3 UÇUŞ MERKEZİ',
    sitesTitle: 'Babadağ (Ölüdeniz), Sakartepe (Akyaka) ve Asas Dağı (Kaş)',
    sitesSubtitle:
      'Marmaris veya Kaş’ta konaklıyorsanız bölgesel pistlerin irtifa farkını ve özelliklerini karşılaştırın.',
    siteAltLabel: 'Kalkış',
    siteDropLabel: 'İrtifa Farkı',
    siteDurLabel: 'Süre',
    siteDlmLabel: 'DLM Mesafesi',
    siteHighlightsLabel: 'Bölge Avantajları:',
    siteFocusMapBtn: '3D Haritada Göster ↑',
    siteGmapsBtn: 'Google Haritalar',
    bannerEyebrow: 'DİĞER REHBERLER VE AKTİVİTELER',
    bannerTitle: 'Turkuaz Kıyılarda Tatilinizi Zenginleştirin',
    bannerDesc:
      'Uçmadan teleferikle zirveye çıkma rehberimizi okuyabilir veya yeni Dalış & Balıkçılık sayfamızı keşfedebilirsiniz.',
    btnServiceExcursions: 'Hizmetler: Turlar →',
    btnArticleBabadag: 'Rehber: Babadağ Zirve',
    btnArticleOludeniz: 'Rehber: Ölüdeniz Plajı',
    btnDivingFishing: 'Rehber: Dalış ve Balıkçılık →',
    rulesEyebrow: 'SHGM KURALLARI VE GÜVENLİK 2026',
    rulesTitle: 'Pilot Lisansı, Kilo/Yaş Sınırları ve Ekipman Zorunlulukları',
    rulesSubtitle:
      'Sivil Havacılık Genel Müdürlüğü (SHGM), SHM Fethiye ve Babadağ pist şeflerinin temel kuralları.',
    sourceLabel: 'Kaynak:',
  },
};

const SVG_NODES = [
  { id: 'lz', runwayId: null, mapPointId: 'belcekiz-lz', x: 78, y: 215, alt: '0 m', color: '#059669' },
  { id: 'base', runwayId: null, mapPointId: 'teleferik-base', x: 220, y: 192, alt: '226 m', color: '#d97706' },
  { id: 'runway-1200', runwayId: 'runway-1200', mapPointId: 'babadag-1200', x: 385, y: 125, alt: '1200 m', color: '#0891b2' },
  { id: 'runway-1700', runwayId: 'runway-1700', mapPointId: 'babadag-1700', x: 525, y: 74, alt: '1700 m', color: '#0891b2' },
  { id: 'runway-1800', runwayId: 'runway-1800', mapPointId: 'babadag-1800', x: 645, y: 58, alt: '1800 m', color: '#0891b2' },
  { id: 'runway-1969', runwayId: 'runway-1969', mapPointId: 'babadag-1969', x: 780, y: 36, alt: '1969 m', color: '#0e7490' },
] as const;

function getRuleHeaderClass(tone: 'cyan' | 'amber' | 'rose' | 'slate') {
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

function renderScoreBars(score: number, activeColor: string) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-1.5 w-4 rounded-full ${n <= score ? activeColor : 'bg-slate-200'}`}
        />
      ))}
    </div>
  );
}

export default function ParaglidingHub({ locale }: { locale: LocaleCode }) {
  const activeLocale: LocaleCode = ['ru', 'en', 'de', 'tr'].includes(locale) ? locale : 'en';
  const t = HUB_COPY[activeLocale];

  // 3D Map & Site state
  const [activeSiteId, setActiveSiteId] = useState<FlightSiteId | 'all'>('babadag');
  const [focusedPointId, setFocusedPointId] = useState<string | null>(null);

  // Selected Babadağ runway
  const [selectedRunwayId, setSelectedRunwayId] = useState<string>('runway-1700');

  // Selected Time Slot
  const [selectedSlotId, setSelectedSlotId] = useState<string>('slot-1030');

  // Eligibility Checker state
  const [weightBand, setWeightBand] = useState<'under25' | 'norm' | 'heavy' | 'over110'>('norm');
  const [ageBand, setAgeBand] = useState<'under4' | 'child47' | 'adult' | 'senior'>('adult');
  const [goalMode, setGoalMode] = useState<'calm' | 'sunset' | 'acro'>('calm');
  const [divedLast24h, setDivedLast24h] = useState<boolean>(false);

  // Packages tab
  const [packageTab, setPackageTab] = useState<'tandem' | 'solo-siv'>('tandem');

  // Calendar month
  const [activeMonth, setActiveMonth] = useState<number>(() => new Date().getMonth() + 1);

  const selectedRunway = useMemo(
    () => BABADAG_RUNWAYS.find((r) => r.id === selectedRunwayId) || BABADAG_RUNWAYS[1],
    [selectedRunwayId]
  );

  const selectedSlot = useMemo(
    () => DAILY_TIME_SLOTS.find((s) => s.id === selectedSlotId) || DAILY_TIME_SLOTS[1],
    [selectedSlotId]
  );

  const filteredPackages = useMemo(
    () => FLIGHT_PACKAGES.filter((p) => p.tab === packageTab),
    [packageTab]
  );

  const activeCalendarEntry = useMemo(
    () => PARAGLIDING_CALENDAR.find((m) => m.month === activeMonth) || PARAGLIDING_CALENDAR[9],
    [activeMonth]
  );

  const activeSvgNode = useMemo(
    () => SVG_NODES.find((n) => n.runwayId === selectedRunway.id) || SVG_NODES[3],
    [selectedRunway.id]
  );

  const checkerVerdict = useMemo(() => {
    if (divedLast24h) {
      return {
        tone: 'denied' as const,
        headline: t.verdictDenied,
        detail: t.verdictDiveStop,
      };
    }
    if (weightBand === 'over110') {
      return {
        tone: 'denied' as const,
        headline: t.verdictDenied,
        detail: t.verdictWeightStop,
      };
    }
    if (weightBand === 'under25') {
      return {
        tone: 'denied' as const,
        headline: t.verdictDenied,
        detail: t.verdictWeightUnder,
      };
    }
    if (ageBand === 'under4') {
      return {
        tone: 'denied' as const,
        headline: t.verdictDenied,
        detail: t.verdictAgeStop,
      };
    }
    if (weightBand === 'heavy') {
      return {
        tone: 'caution' as const,
        headline: t.verdictCaution,
        detail: t.verdictWeightWarn,
      };
    }
    if (ageBand === 'child47') {
      return {
        tone: 'caution' as const,
        headline: t.verdictCaution,
        detail: t.verdictChildNote,
      };
    }

    const recSlot =
      goalMode === 'calm' || ageBand === 'senior'
        ? '08:30 / 10:30'
        : goalMode === 'sunset'
        ? '17:00 (Sunset)'
        : '13:00 / 15:00';

    return {
      tone: 'ready' as const,
      headline: t.verdictReady,
      detail: t.verdictOkDetail(recSlot),
    };
  }, [ageBand, divedLast24h, goalMode, t, weightBand]);

  return (
    <div className="space-y-12">
      {/* 1. Inflation Shield & SHGM Status Notice */}
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

      {/* 2. Interactive 3D Map + Regional Sites Selector */}
      <section id="flight-map-3d" className="scroll-mt-28 portal-card p-5 md:p-7 space-y-5">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8">
            <Paragliding3DMap
              locale={activeLocale}
              activeSiteId={activeSiteId}
              focusedPointId={focusedPointId}
              onSelectPoint={(ptId) => setFocusedPointId(ptId)}
              onSelectSite={(siteId) => {
                setFocusedPointId(null);
                setActiveSiteId(siteId);
              }}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            <div className="space-y-3">
              {FLYING_SITES.map((site) => {
                const isSelected = activeSiteId === site.id;
                return (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => {
                      setFocusedPointId(null);
                      setActiveSiteId(site.id);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-cyan-500 shadow-md'
                        : 'bg-white text-slate-800 border-slate-200/80 hover:border-cyan-400'
                    }`}
                  >
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-extrabold flex-shrink-0 ${
                        isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-900 text-cyan-300'
                      }`}
                    >
                      {site.takeoffAltM}
                    </span>
                    <div className="min-w-0 flex-1">
                      <strong className="text-xs sm:text-sm font-extrabold block leading-snug">
                        {site.title[activeLocale]}
                      </strong>
                      <p
                        className={`text-[11px] mt-1 leading-snug ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {site.subtitle[activeLocale]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setFocusedPointId(null);
                setActiveSiteId('all');
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-colors border ${
                activeSiteId === 'all'
                  ? 'bg-cyan-600 text-white border-cyan-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {t.showAllSitesBtn}
            </button>
          </div>
        </div>
      </section>

      {/* 3. Babadağ Elevation Diagram (4 Runways) + Babadağ Teleferik Card */}
      <section id="runways-teleferik" className="scroll-mt-28 space-y-6">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaMountain /> {t.runwaysEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.runwaysTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.runwaysSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Slope SVG + Runway Details */}
          <div className="xl:col-span-8 portal-card p-5 md:p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-cyan-700">{t.svgRunwayHint}</span>
                <div className="flex flex-wrap gap-1.5">
                  {BABADAG_RUNWAYS.map((rw) => (
                    <button
                      key={rw.id}
                      type="button"
                      onClick={() => setSelectedRunwayId(rw.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-colors ${
                        selectedRunway.id === rw.id
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {rw.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mountain Profile SVG */}
              <div className="rounded-2xl bg-slate-950 p-3 sm:p-4 border border-slate-800 overflow-x-auto">
                <svg
                  viewBox="0 0 860 250"
                  className="w-full min-w-[540px] h-auto select-none"
                  role="img"
                  aria-label={t.runwaysTitle}
                >
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    <linearGradient id="rockGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  <rect x="0" y="0" width="860" height="250" rx="12" fill="url(#skyGrad)" />

                  {/* Turquoise Sea floor on left */}
                  <path d="M0,215 L145,215 L145,250 L0,250 Z" fill="#0e7490" opacity="0.55" />

                  {/* Mountain slope silhouette */}
                  <path
                    d="M145,215 L220,192 L385,125 L525,74 L645,58 L780,36 L860,55 L860,250 L145,250 Z"
                    fill="url(#rockGrad)"
                    stroke="#475569"
                    strokeWidth="2"
                  />

                  {/* Teleferik Cable Line */}
                  <polyline
                    points="220,192 385,125 525,74 645,58 780,36"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="5,4"
                    opacity="0.75"
                  />

                  {/* Active Glide Path Arc from selected runway to Belcekız LZ */}
                  <path
                    d={`M ${activeSvgNode.x},${activeSvgNode.y} Q ${(activeSvgNode.x + 78) / 2},${Math.max(
                      18,
                      activeSvgNode.y - 30
                    )} 78,215`}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeDasharray="7,5"
                  />

                  {/* Interactive Nodes */}
                  {SVG_NODES.map((node) => {
                    const isRunway = Boolean(node.runwayId);
                    const isSelected = node.runwayId === selectedRunway.id;
                    const label =
                      node.id === 'lz'
                        ? t.svgBeachLabel
                        : node.id === 'base'
                        ? t.svgBaseLabel
                        : node.alt;

                    return (
                      <g
                        key={node.id}
                        className={isRunway ? 'cursor-pointer' : undefined}
                        onClick={() => {
                          if (node.runwayId) setSelectedRunwayId(node.runwayId);
                        }}
                      >
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 11 : isRunway ? 8 : 6}
                          fill={isSelected ? '#22d3ee' : node.color}
                          stroke="#ffffff"
                          strokeWidth={isSelected ? 3 : 2}
                        />
                        <text
                          x={node.x}
                          y={node.id === 'lz' || node.id === 'base' ? node.y - 14 : node.y - 15}
                          textAnchor="middle"
                          fill={isSelected ? '#67e8f9' : '#f8fafc'}
                          fontSize={isSelected ? '13' : '11'}
                          fontWeight="800"
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Selected Runway Details */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {selectedRunway.name[activeLocale]}
                </h3>
                <a
                  href="#flight-map-3d"
                  onClick={() => {
                    setActiveSiteId('babadag');
                    setFocusedPointId(selectedRunway.mapPointId);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-colors"
                >
                  {t.showRunwayOnMapBtn}
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-white border border-slate-200/70 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">{t.runwayMetricAlt}</span>
                  <strong className="text-slate-900 font-extrabold text-sm">
                    {selectedRunway.altitudeM} m
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">{t.runwayMetricWind}</span>
                  <strong className="text-cyan-700 font-extrabold text-sm">
                    {selectedRunway.windDirections}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">{t.runwayMetricTemp}</span>
                  <strong className="text-sky-700 font-extrabold text-sm">
                    {selectedRunway.tempDropFromBeachC}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">{t.runwayMetricDur}</span>
                  <strong className="text-slate-900 font-extrabold text-sm">
                    {selectedRunway.flightDurationMin}
                  </strong>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {selectedRunway.description[activeLocale]}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-200/70">
                <div>
                  <strong className="text-slate-900 block mb-0.5">{t.runwayAccessLabel}</strong>
                  <span className="text-slate-600 font-medium">
                    {selectedRunway.accessMethod[activeLocale]}
                  </span>
                </div>
                <div>
                  <strong className="text-slate-900 block mb-0.5">{t.runwayBestForLabel}</strong>
                  <span className="text-slate-600 font-medium">
                    {selectedRunway.bestFor[activeLocale]}
                  </span>
                </div>
                <div>
                  <strong className="text-slate-900 block mb-0.5">
                    {t.runwayFacilitiesLabel}
                  </strong>
                  <span className="text-slate-600 font-medium">
                    {selectedRunway.facilities[activeLocale]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Teleferik Card */}
          <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-52 bg-slate-900">
                <img
                  src="/api/images/locations/fethiye/todo/babadag/babadag2.jpg"
                  alt={t.teleferikTitle}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 right-4 text-white font-extrabold text-sm leading-snug">
                  {t.teleferikTitle}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-extrabold">
                  {t.teleferikBadge}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {t.teleferikDesc}
                </p>

                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 font-bold flex items-start gap-2.5">
                  <FaExclamationTriangle className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{t.teleferikWarn}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href={`/${activeLocale}/articles/babadag`}
                className="block w-full text-center py-3 px-4 rounded-xl bg-slate-900 hover:bg-cyan-700 text-white text-xs font-bold transition-colors"
              >
                {t.teleferikLinkLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Daily Time Slots (08:30–17:00) + Flight Readiness Checker */}
      <section id="slots-schools" className="scroll-mt-28 space-y-8">
        <div className="portal-card p-5 md:p-7 space-y-6">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaClock /> {t.slotsEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.slotsTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
              {t.slotsSubtitle}
            </p>
          </div>

          {/* 5 Slot Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {DAILY_TIME_SLOTS.map((slot) => {
              const active = slot.id === selectedSlot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    active
                      ? 'bg-slate-900 text-white border-cyan-500 shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200/80 hover:border-cyan-400'
                  }`}
                >
                  <div className="text-lg font-extrabold text-cyan-400">
                    {active ? slot.timeRange : <span className="text-slate-900">{slot.timeRange}</span>}
                  </div>
                  <div className="text-xs font-bold mt-0.5 line-clamp-2">
                    {slot.name[activeLocale]}
                  </div>
                  <div
                    className={`text-[10px] font-semibold mt-1 ${
                      active ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    {slot.demandLevel[activeLocale]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Slot Breakdown */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200/70">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <FaFeatherAlt className="text-emerald-600" /> {t.calmLabel}
                </span>
                {renderScoreBars(selectedSlot.calmnessScore, 'bg-emerald-500')}
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <FaWind className="text-amber-500" /> {t.thermalLabel}
                </span>
                {renderScoreBars(selectedSlot.thermalScore, 'bg-amber-500')}
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <FaCamera className="text-cyan-600" /> {t.photoLabel}
                </span>
                {renderScoreBars(selectedSlot.photoLightScore, 'bg-cyan-600')}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-2">
                <p className="text-slate-700 font-medium leading-relaxed">
                  {selectedSlot.airConditions[activeLocale]}
                </p>
                <p className="text-slate-800 font-semibold">
                  <strong className="text-cyan-700">{t.slotBestFor}</strong>{' '}
                  {selectedSlot.recommendedFor[activeLocale]}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 font-medium self-start">
                <strong className="font-bold text-amber-800 block mb-0.5">{t.slotTipLabel}</strong>
                {selectedSlot.bookingTip[activeLocale]}
              </div>
            </div>
          </div>

          {/* Interactive Passenger Readiness Checker */}
          <div className="bg-white rounded-2xl p-5 border-2 border-slate-900 space-y-4">
            <div>
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FaBalanceScale className="text-cyan-600" /> {t.checkerTitle}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{t.checkerSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block">{t.checkerWeight}</span>
                <div className="flex flex-wrap gap-1.5">
                  {t.weightOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setWeightBand(opt.id)}
                      className={`px-2.5 py-1.5 rounded-lg font-bold transition-colors ${
                        weightBand === opt.id
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block">{t.checkerAge}</span>
                <div className="flex flex-wrap gap-1.5">
                  {t.ageOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAgeBand(opt.id)}
                      className={`px-2.5 py-1.5 rounded-lg font-bold transition-colors ${
                        ageBand === opt.id
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block">{t.checkerGoal}</span>
                <div className="flex flex-wrap gap-1.5">
                  {t.goalOpts.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGoalMode(opt.id)}
                      className={`px-2.5 py-1.5 rounded-lg font-bold transition-colors ${
                        goalMode === opt.id
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block">{t.checkerDive}</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDivedLast24h(false)}
                    className={`px-2.5 py-1.5 rounded-lg font-bold transition-colors ${
                      !divedLast24h
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t.diveOpts.no}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDivedLast24h(true)}
                    className={`px-2.5 py-1.5 rounded-lg font-bold transition-colors ${
                      divedLast24h
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t.diveOpts.yes}
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                checkerVerdict.tone === 'denied'
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : checkerVerdict.tone === 'caution'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              }`}
            >
              {checkerVerdict.tone === 'denied' ? (
                <FaTimesCircle className="text-rose-600 text-lg flex-shrink-0 mt-0.5" />
              ) : checkerVerdict.tone === 'caution' ? (
                <FaExclamationTriangle className="text-amber-600 text-lg flex-shrink-0 mt-0.5" />
              ) : (
                <FaCheckCircle className="text-emerald-600 text-lg flex-shrink-0 mt-0.5" />
              )}
              <div>
                <strong className="font-extrabold block mb-0.5">{checkerVerdict.headline}</strong>
                <p className="font-medium leading-relaxed">{checkerVerdict.detail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Tabs + Verified Operators + Calendar */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <span className="eyebrow-badge mb-1.5">
                <FaPaperPlane /> {t.pkgEyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t.pkgTitle}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
                {t.pkgSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPackageTab('tandem')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-colors ${
                  packageTab === 'tandem'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {t.tabTandem}
              </button>
              <button
                type="button"
                onClick={() => setPackageTab('solo-siv')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-colors ${
                  packageTab === 'solo-siv'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {t.tabSolo}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-[11px] font-extrabold">
                    {pkg.badge[activeLocale]}
                  </span>

                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {pkg.title[activeLocale]}
                    </h3>
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-900 text-white">
                      <div className="text-xl font-extrabold text-cyan-300">
                        {pkg.priceBenchmark}
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                        {pkg.priceNote[activeLocale]}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-cyan-700 mt-2.5">
                      {pkg.durationOrFormat[activeLocale]}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      {t.includedLabel}
                    </span>
                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                      {pkg.includedItems[activeLocale].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
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
                  {pkg.insiderTip[activeLocale]}
                </div>
              </div>
            ))}
          </div>

          {/* Verified Operators */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <FaUsers className="text-cyan-600" /> {t.opsTitle}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-0.5 font-medium">
                {t.opsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {PARAGLIDING_OPERATORS.map((op) => (
                <div
                  key={op.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-cyan-700">
                        {op.city[activeLocale]}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {op.badge[activeLocale]}
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900">{op.name}</h4>
                    <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-cyan-600 flex-shrink-0" />
                      <span>{op.address}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {op.summary[activeLocale]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-emerald-700">
                      {op.licenseNote[activeLocale]}
                    </span>
                    <a
                      href={op.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-cyan-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors flex-shrink-0"
                    >
                      <FaExternalLinkAlt size={9} /> Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 12-Month Flying & Weather Calendar */}
          <div className="portal-card p-5 md:p-7 space-y-5">
            <div>
              <span className="eyebrow-badge mb-1.5">
                <FaCalendarAlt /> {t.calEyebrow}
              </span>
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900">{t.calTitle}</h3>
              <p className="text-xs md:text-sm text-slate-600 mt-1 font-medium">{t.calSubtitle}</p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
              {PARAGLIDING_CALENDAR.map((entry) => {
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
                      {entry.beachTempC}
                    </span>
                    <span className="block text-[9px] mt-0.5 text-amber-500">
                      {entry.isAirGames ? '🎪' : `${'★'.repeat(entry.flyabilityScore)}`}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 md:p-5 border border-slate-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-xl bg-slate-900 text-cyan-300 text-xs font-extrabold uppercase">
                    {t.monthNames[activeCalendarEntry.month - 1]}
                  </span>
                  {activeCalendarEntry.isAirGames && (
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold">
                      {t.calAirGamesBadge}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                  <span>
                    🏖️ {t.calBeachTemp}:{' '}
                    <strong className="text-slate-900">{activeCalendarEntry.beachTempC}</strong>
                  </span>
                  <span>
                    🏔️ {t.calMountainTemp}:{' '}
                    <strong className="text-cyan-700">
                      {activeCalendarEntry.babadag1700TempC}
                    </strong>
                  </span>
                  <span>
                    🪂 {t.calRunway}:{' '}
                    <strong className="text-slate-900">
                      {activeCalendarEntry.recommendedRunway}
                    </strong>
                  </span>
                  <span>
                    <strong className="text-amber-500">
                      {'★'.repeat(activeCalendarEntry.flyabilityScore)}
                      {'☆'.repeat(5 - activeCalendarEntry.flyabilityScore)}
                    </strong>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {activeCalendarEntry.summary[activeLocale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Regional Flying Sites Comparison + Interlinking Banner */}
      <section id="sites" className="scroll-mt-28 space-y-6">
        <div>
          <span className="eyebrow-badge mb-1.5">
            <FaMountain /> {t.sitesEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.sitesTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            {t.sitesSubtitle}
          </p>
        </div>

        <div className="space-y-6">
          {FLYING_SITES.map((site) => (
            <article
              key={site.id}
              className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row"
            >
              <div className="relative lg:w-2/5 h-60 lg:h-auto min-h-[260px] overflow-hidden flex-shrink-0 bg-slate-900">
                <img
                  src={site.image}
                  alt={site.title[activeLocale]}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-slate-900/90 text-cyan-300 rounded-full text-[11px] font-extrabold border border-white/20">
                    {site.code}
                  </span>
                  <span className="px-3 py-1 bg-cyan-600 text-white rounded-full text-[11px] font-extrabold shadow">
                    {site.takeoffAltM}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                  <h3 className="text-lg font-extrabold leading-tight">
                    {site.title[activeLocale]}
                  </h3>
                  <p className="text-xs text-cyan-200 font-semibold mt-0.5">
                    {site.subtitle[activeLocale]}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-7 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="hidden lg:block">
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-cyan-700 mb-1">
                      {site.code} · {site.distanceFromDlm[activeLocale]}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                      {site.title[activeLocale]}
                    </h3>
                    <p className="text-sm font-semibold text-cyan-700 mt-1">
                      {site.subtitle[activeLocale]}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block">{t.siteAltLabel}</span>
                      <strong className="text-slate-900 font-extrabold">{site.takeoffAltM}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">{t.siteDropLabel}</span>
                      <strong className="text-cyan-700 font-extrabold">{site.verticalDropM}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">{t.siteDurLabel}</span>
                      <strong className="text-slate-900 font-extrabold">{site.flightMinutes}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">{t.siteDlmLabel}</span>
                      <strong className="text-slate-900 font-bold">
                        {site.distanceFromDlm[activeLocale]}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {site.description[activeLocale]}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FaStar className="text-amber-500" /> {t.siteHighlightsLabel}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-600 font-medium">
                      {site.highlights[activeLocale].map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 font-medium">
                    {site.caveatsAndRules[activeLocale]}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
                  <a
                    href="#flight-map-3d"
                    onClick={() => {
                      setFocusedPointId(null);
                      setActiveSiteId(site.id);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    {t.siteFocusMapBtn}
                  </a>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
                  >
                    <FaExternalLinkAlt size={10} /> {t.siteGmapsBtn}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Interlinking Dark Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider border border-cyan-500/30">
              <FaCube size={10} /> {t.bannerEyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{t.bannerTitle}</h3>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              {t.bannerDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-shrink-0">
            <Link
              href={`/${activeLocale}/services/excursions-tours`}
              className="px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold text-center transition-colors"
            >
              {t.btnServiceExcursions}
            </Link>
            <Link
              href={`/${activeLocale}/diving-fishing`}
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold text-center transition-colors"
            >
              {t.btnDivingFishing}
            </Link>
            <Link
              href={`/${activeLocale}/articles/babadag`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-cyan-300" /> {t.btnArticleBabadag}
            </Link>
            <Link
              href={`/${activeLocale}/articles/oludeniz`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <FaBookOpen size={11} className="text-amber-300" /> {t.btnArticleOludeniz}
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SHGM Regulations & Safety 2026 */}
      <section id="safety-rules" className="scroll-mt-28 space-y-6">
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
          {PARAGLIDING_RULES_2026.map((card) => (
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
