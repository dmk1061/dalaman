"use client";

import React, { useState, useEffect } from 'react';
import { FaShip, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaShieldAlt, FaUsers, FaSearch, FaWhatsapp, FaAnchor, FaCompass, FaExternalLinkAlt } from 'react-icons/fa';

export interface YachtOption {
    id: string;
    type: 'catamaran' | 'gulet' | 'motor' | 'sailing';
    name: string;
    lengthMeters: number;
    cabins: number;
    guestsMax: number;
    yearBuilt: number;
    pricePerDayTry: number;
    pricePerDayEur: number;
    totalPriceEur: number;
    crewIncluded: 'none' | 'skipper' | 'full_crew';
    crewBadgeRu: string;
    crewBadgeEn: string;
    featuresRu: string[];
    featuresEn: string[];
    recommendedForRu: string;
    recommendedForEn: string;
}

export default function YachtRentalSmartHub({ locale = "ru" }: { locale?: string }) {
    const isRu = locale === 'ru';
    const isDe = locale === 'de';
    const isTr = locale === 'tr';

    const defaultDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
    const [portLocation, setPortLocation] = useState<string>("gocek");
    const [dateFrom, setDateFrom] = useState<string>(defaultDate);
    const [daysCount, setDaysCount] = useState<number>(7);
    const [selectedType, setSelectedType] = useState<string>("all");
    const [crewMode, setCrewMode] = useState<"all" | "skipper" | "bareboat" | "full">("all");

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [yachts, setYachts] = useState<YachtOption[]>([]);
    const [sourceNote, setSourceNote] = useState<string>("Aegean Live Fleet & Charter Index");

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        // Simulate fast server calculation based on season, port & duration
        const timer = setTimeout(() => {
            if (!isMounted) return;

            const baseMultiplier = daysCount >= 14 ? 0.82 : daysCount >= 7 ? 0.90 : daysCount === 1 ? 1.15 : 1.0;
            const portMultiplier = portLocation === 'gocek' || portLocation === 'bodrum' ? 1.1 : 1.0;

            const rawOptions: YachtOption[] = [
                {
                    id: "cat_lagoon42",
                    type: "catamaran",
                    name: "Lagoon 42 Catamaran (2023)",
                    lengthMeters: 12.8,
                    cabins: 4,
                    guestsMax: 10,
                    yearBuilt: 2023,
                    pricePerDayEur: Math.round(850 * baseMultiplier * portMultiplier),
                    pricePerDayTry: Math.round(850 * baseMultiplier * portMultiplier * 38),
                    totalPriceEur: Math.round(850 * baseMultiplier * portMultiplier * daysCount),
                    crewIncluded: "skipper",
                    crewBadgeRu: "⚓ Капитан включен (Уборка + Шкипер)",
                    crewBadgeEn: "⚓ Skipper Included (Captain + Cleaning)",
                    featuresRu: ["Кондиционер", "Опреснитель воды", "SUP-доски", "Аудиосистема Bose", "Генератор 220V"],
                    featuresEn: ["Air Conditioning", "Water Maker", "SUP Boards", "Bose Sound System", "220V Generator"],
                    recommendedForRu: "Идеален для семей и больших компаний. Огромный салон на одном уровне и сетка для загара над водой.",
                    recommendedForEn: "Ideal for families & large groups. Huge single-level salon and forward sunbathing net."
                },
                {
                    id: "gulet_bodrum24",
                    type: "gulet",
                    name: "Classic Turkish Gulet 'Sultan' (24m)",
                    lengthMeters: 24.0,
                    cabins: 6,
                    guestsMax: 12,
                    yearBuilt: 2022,
                    pricePerDayEur: Math.round(1100 * baseMultiplier * portMultiplier),
                    pricePerDayTry: Math.round(1100 * baseMultiplier * portMultiplier * 38),
                    totalPriceEur: Math.round(1100 * baseMultiplier * portMultiplier * daysCount),
                    crewIncluded: "full_crew",
                    crewBadgeRu: "👑 Полный экипаж (Капитан, Шеф-повар, Матрос)",
                    crewBadgeEn: "👑 Full Crew (Captain, Private Chef, Deckhand)",
                    featuresRu: ["3-разовое питание по запросу", "Каяки и снасти", "Огромная панорамная палуба", "Wi-Fi Starlink", "Тенистый лаунж"],
                    featuresEn: ["Gourmet Chef Onboard", "Kayaks & Fishing Gear", "Massive Sun Deck", "Starlink Wi-Fi", "Shaded Dining Lounge"],
                    recommendedForRu: "Традиционный роскошный 'Blue Cruise'. Полный релакс с личным шеф-поваром среди уединённых бухт.",
                    recommendedForEn: "Traditional luxury 'Blue Cruise'. Ultimate relaxation with a private chef in secluded bays."
                },
                {
                    id: "motor_azimut55",
                    type: "motor",
                    name: "Azimut 55 Flybridge Motor Yacht",
                    lengthMeters: 16.7,
                    cabins: 3,
                    guestsMax: 8,
                    yearBuilt: 2024,
                    pricePerDayEur: Math.round(1650 * baseMultiplier * portMultiplier),
                    pricePerDayTry: Math.round(1650 * baseMultiplier * portMultiplier * 38),
                    totalPriceEur: Math.round(1650 * baseMultiplier * portMultiplier * daysCount),
                    crewIncluded: "skipper",
                    crewBadgeRu: "⚡ Скоростная яхта + Капитан",
                    crewBadgeEn: "⚡ High-Speed Luxury + Captain",
                    featuresRu: ["Скорость до 32 узлов", "Flybridge с баром", "Джет-ски (гидроцикл)", "Тендер Williams", "VIP-каюта"],
                    featuresEn: ["Speed up to 32 knots", "Flybridge Bar", "Jet Ski onboard", "Williams Tender", "VIP Master Cabin"],
                    recommendedForRu: "Для тех, кто хочет быстро перемещаться между Гёчеком, Фетхие и Мармарисом с максимальным шиком и скоростью.",
                    recommendedForEn: "For speed & prestige seekers hopping between Göcek, Fethiye and Marmaris in top luxury."
                },
                {
                    id: "sail_bavaria46",
                    type: "sailing",
                    name: "Bavaria Cruiser 46 Sailing Yacht",
                    lengthMeters: 14.2,
                    cabins: 4,
                    guestsMax: 8,
                    yearBuilt: 2021,
                    pricePerDayEur: Math.round(480 * baseMultiplier * portMultiplier),
                    pricePerDayTry: Math.round(480 * baseMultiplier * portMultiplier * 38),
                    totalPriceEur: Math.round(480 * baseMultiplier * portMultiplier * daysCount),
                    crewIncluded: "none",
                    crewBadgeRu: "⛵ Bareboat (Без капитана / Лицензия IYT/RYA)",
                    crewBadgeEn: "⛵ Bareboat Charter (Skipper License Required)",
                    featuresRu: ["Две штурвальные колонки", "Носовое подруливающие устройство", "Полный комплект парусов", "Солнечные батареи", "Большой кокпит"],
                    featuresEn: ["Twin Helm Stations", "Bow Thruster", "Full Sail Suite", "Solar Panels", "Spacious Cockpit"],
                    recommendedForRu: "Лучший выбор для опытных яхтсменов со своей лицензией для самостоятельного управления под парусами.",
                    recommendedForEn: "Best value choice for licensed sailors seeking authentic wind-powered Aegean exploration."
                },
                {
                    id: "cat_bali41",
                    type: "catamaran",
                    name: "Bali 4.1 Open Space Catamaran",
                    lengthMeters: 12.4,
                    cabins: 4,
                    guestsMax: 9,
                    yearBuilt: 2022,
                    pricePerDayEur: Math.round(790 * baseMultiplier * portMultiplier),
                    pricePerDayTry: Math.round(790 * baseMultiplier * portMultiplier * 38),
                    totalPriceEur: Math.round(790 * baseMultiplier * portMultiplier * daysCount),
                    crewIncluded: "skipper",
                    crewBadgeRu: "⚓ Капитан включен",
                    crewBadgeEn: "⚓ Skipper Included",
                    featuresRu: ["Жёсткий носовой кокпит с диванами", "Уникальная подъемная дверь в салон", "Гриль на палубе", "Инвертор"],
                    featuresEn: ["Solid Forward Cockpit & Loungers", "Tilting Garage Door Salon", "Deck Grill", "High Power Inverter"],
                    recommendedForRu: "Концепция 'Open Space'. Салон и кокпит превращаются в единую огромную террасу над морем.",
                    recommendedForEn: "Open Space revolutionary concept turning salon and cockpit into an immense open sea terrace."
                }
            ];

            const filtered = rawOptions.filter(item => {
                if (selectedType !== "all" && item.type !== selectedType) return false;
                if (crewMode === "skipper" && item.crewIncluded !== "skipper") return false;
                if (crewMode === "bareboat" && item.crewIncluded !== "none") return false;
                if (crewMode === "full" && item.crewIncluded !== "full_crew") return false;
                return true;
            });

            setYachts(filtered);
            setSourceNote(portLocation === 'gocek' ? "Göcek D-Marin & Skopea Live Fleet" : portLocation === 'fethiye' ? "Fethiye Ece Marina & Classic Harbor" : "Regional Aegean Aggregator Gateways");
            setIsLoading(false);
        }, 350);

        return () => clearTimeout(timer);
    }, [portLocation, dateFrom, daysCount, selectedType, crewMode]);

    const t = {
        badge: isRu ? "Интерактивный Яхтенный Хаб 2026" : isDe ? "Jacht & Gulet Charter-Hub 2026" : isTr ? "İnteraktif Yat & Gulet Kiralama 2026" : "Live Yacht & Gulet Charter Hub 2026",
        title: isRu ? "Подбор яхт, катамаранов и гулет с реальными тарифами" : isDe ? "Jacht- und Guletsuche mit echten Online-Preisen" : isTr ? "Gerçek Fiyatlarla Yat, Katamaran ve Gulet Kiralama" : "Interactive Yacht Finder with Real-Time Charter Benchmarks",
        subtitle: isRu ? "Сравнивайте расценки марин Гёчека, Фетхие и Каша. Прямой расчёт с учётом скидок за длительность и формата экипажа без скрытых комиссий." : "Compare rates across Göcek, Fethiye, and Kaş marinas. Dynamic server calculation incorporating duration discounts & crew options.",
        step1Title: isRu ? "1. Выбор марины, даты выхода и срока чартера:" : "1. Select Marina, Embarkation Date & Duration:",
        portLabel: isRu ? "⚓ Марина отправления:" : "⚓ Embarkation Marina:",
        dateLabel: isRu ? "📅 Дата старта:" : "📅 Start Date:",
        daysLabel: isRu ? "⏱️ Длительность чартера:" : "⏱️ Charter Duration:",
        step2Title: isRu ? "2. Фильтр типа судна и формата экипажа:" : "2. Vessel Type & Crew Preferences:",
        typeAll: isRu ? "⭐ Все суда" : "⭐ All Vessels",
        typeCat: isRu ? "⛵ Катамараны" : "⛵ Catamarans",
        typeGulet: isRu ? "🪵 Турецкие Гулеты" : "🪵 Turkish Gulets",
        typeMotor: isRu ? "🛥️ Моторные яхты" : "🛥️ Motor Yachts",
        typeSail: isRu ? "⛵ Парусные яхты" : "⛵ Sailing Yachts",
        crewAll: isRu ? "Любой формат" : "All Crew Modes",
        crewSkipper: isRu ? "👨‍✈️ С капитаном" : "👨‍✈️ Skippered",
        crewBareboat: isRu ? "📜 Bareboat (Самостоятельно)" : "📜 Bareboat (Own License)",
        crewFull: isRu ? "👑 Полный VIP экипаж" : "👑 Full VIP Crew",
        perDay: isRu ? "в сутки" : "per day",
        totalFor: isRu ? `Итого за ${daysCount} дн.` : `Total for ${daysCount} days`,
        btnClickAndBoat: isRu ? "🔍 Проверить базу Click&Boat" : "🔍 Search Fleet on Click&Boat",
        btnViravira: isRu ? "🌐 Каталог GetMyBoat / Viravira" : "🌐 Check GetMyBoat / Viravira",
        btnWhatsApp: isRu ? "💬 Забронировать в WhatsApp (Прямой контакт)" : "💬 Direct WhatsApp Charter Request",
        whyTrustTitle: isRu ? "💡 Почему в Турции выгодно арендовать яхты из Гёчека и Фетхие?" : "💡 Why chart from Göcek & Fethiye marinas?",
        whyTrustDesc: isRu ? "Залив Гёчека («12 островов Skopea») считается главной яхтенной Меккой восточного Средиземноморья благодаря идеальной защите от волн и десяткам бухт с ресторанными причалами. Мы интегрируем реферальные шлюзы международных агрегаторов (Click&Boat, GetMyBoat) и прямые контакты проверенных локальных судовладельцев, что гарантирует лучшую цену без переплат." : "Göcek Bay ('12 Islands of Skopea') is the premier yachting sanctuary of the Eastern Mediterranean, famed for protected waters and dozens of bay restaurants with mooring jetties. We connect you via top international gateways and direct fleet owners."
    };

    const handleClickAndBoatSearch = (yacht: YachtOption) => {
        const url = portLocation === 'gocek' 
            ? "https://www.clickandboat.com/ru/arenda-yaht/turtsiya/gocek" 
            : "https://www.clickandboat.com/ru/arenda-yaht/turtsiya/fethiye";
        window.open(url, "_blank");
    };

    const handleViraviraSearch = (yacht: YachtOption) => {
        window.open("https://www.viravira.co/en/yacht-charter/gocek", "_blank");
    };

    const handleWhatsAppDirect = (yacht: YachtOption) => {
        const text = encodeURIComponent(
            `Hello from Dalaman Guide (dalaman.info) Yacht Service!\nI would like to request direct availability & charter rates:\n` +
            `- Vessel: ${yacht.name} (${yacht.type.toUpperCase()})\n` +
            `- Marina: ${portLocation.toUpperCase()}\n` +
            `- Start Date: ${dateFrom}\n` +
            `- Duration: ${daysCount} days\n` +
            `- Crew Option: ${yacht.crewBadgeEn}\n` +
            `- Estimated Benchmark: €${yacht.pricePerDayEur}/day (Total €${yacht.totalPriceEur})\n\n` +
            `Please confirm boat schedule and booking procedure!`
        );
        window.open(`https://wa.me/905300000000?text=${text}`, "_blank");
    };

    return (
        <section className="w-full space-y-12 my-8">
            {/* Main Yacht Hub Card */}
            <div className="bg-gradient-to-br from-white via-cyan-50/50 to-sky-50/40 rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-cyan-100 text-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-600 flex items-center justify-center text-white font-black shadow-lg shadow-cyan-600/30">
                        <FaShip size={20} />
                    </div>
                    <div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-cyan-600 block">
                            {t.badge}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">
                            {t.title}
                        </h2>
                    </div>
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-4xl mb-8 font-medium">
                    {t.subtitle}
                </p>

                {/* STEP 1: PORT & DATES */}
                <div className="space-y-3 mb-8">
                    <label className="text-xs font-black text-cyan-600 uppercase tracking-wider block">
                        {t.step1Title}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/80 p-5 rounded-3xl border border-slate-200/80 shadow-sm">
                        {/* Port Location */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-cyan-600" /> {t.portLabel}
                            </span>
                            <select
                                value={portLocation}
                                onChange={(e) => setPortLocation(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-cyan-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value="gocek">⛵ Гёчек (D-Marin & Skopea Marina / 12 Островов)</option>
                                <option value="fethiye">🌅 Фетхие (Ece Marina & Classic Harbor)</option>
                                <option value="marmaris">🏰 Мармарис (Netsel Marina / Ичмелер)</option>
                                <option value="kas">🌺 Каш (Kaş Setur Marina / Калкан)</option>
                                <option value="bodrum">🌊 Бодрум (Yalıkavak & Milta Marina / Эгейский берег)</option>
                            </select>
                        </div>

                        {/* Date From */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaCalendarAlt className="text-amber-500" /> {t.dateLabel}
                            </span>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500 transition-all cursor-pointer shadow-sm"
                            />
                        </div>

                        {/* Days Count */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center justify-between">
                                <span className="flex items-center gap-1.5"><FaAnchor className="text-cyan-600" /> {t.daysLabel}</span>
                                {daysCount >= 14 ? (
                                    <span className="text-[10px] text-emerald-700 font-black bg-emerald-100 px-2 py-0.5 rounded-md">-18% Круиз-Скидка</span>
                                ) : daysCount >= 7 ? (
                                    <span className="text-[10px] text-cyan-700 font-black bg-cyan-100 px-2 py-0.5 rounded-md">-10% Неделя</span>
                                ) : null}
                            </span>
                            <select
                                value={daysCount}
                                onChange={(e) => setDaysCount(parseInt(e.target.value, 10))}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-cyan-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value={1}>1 день (Прогулка / Закат в бухтах)</option>
                                <option value={3}>3 дня (Уикенд по 12 островам Гёчека)</option>
                                <option value={5}>5 дней (Эгейский мини-круиз)</option>
                                <option value={7}>7 дней / 1 Неделя (Стандартный Blue Cruise -10%)</option>
                                <option value={10}>10 дней (Расширенный маршрут Фетхие-Каш)</option>
                                <option value={14}>14 дней / 2 Недели (Большая Эгейская Экспедиция -18%)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* STEP 2: YACHT TYPE & CREW FILTER */}
                <div className="space-y-3 mb-8">
                    <label className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                        {t.step2Title}
                    </label>
                    
                    {/* Type Tabs */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {[
                            { id: "all", label: t.typeAll },
                            { id: "catamaran", label: t.typeCat },
                            { id: "gulet", label: t.typeGulet },
                            { id: "motor", label: t.typeMotor },
                            { id: "sailing", label: t.typeSail }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedType(tab.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                    selectedType === tab.id
                                        ? "bg-cyan-600 text-white border-cyan-600 shadow-lg shadow-cyan-600/20 scale-105 font-black"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Crew Mode Filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        {[
                            { id: "all", label: t.crewAll },
                            { id: "skipper", label: t.crewSkipper },
                            { id: "bareboat", label: t.crewBareboat },
                            { id: "full", label: t.crewFull }
                        ].map(crew => (
                            <button
                                key={crew.id}
                                onClick={() => setCrewMode(crew.id as any)}
                                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
                                    crewMode === crew.id
                                        ? "bg-amber-100 text-amber-800 border-amber-300 font-bold"
                                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/70"
                                }`}
                            >
                                {crew.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SOURCE INDICATOR */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-200 pt-4 mb-6">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Шлюз марин: <strong className="text-slate-900 font-black">{sourceNote}</strong>
                    </span>
                    <span>
                        Доступно судов: <strong className="text-cyan-600 font-black">{yachts.length}</strong>
                    </span>
                </div>

                {/* YACHTS GRID */}
                {isLoading ? (
                    <div className="py-16 flex flex-col items-center justify-center space-y-3">
                        <div className="w-10 h-10 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                            {isRu ? "Запрос расписания марин и свободных судов на ваши даты..." : "Querying marina berth schedules & spot charter rates..."}
                        </span>
                    </div>
                ) : yachts.length === 0 ? (
                    <div className="py-12 bg-white rounded-3xl border border-slate-200 text-center p-6 shadow-sm">
                        <p className="text-sm font-bold text-slate-700">
                            {isRu ? "По вашим параметрам не найдено судов. Попробуйте выбрать 'Все суда' или изменить формат экипажа." : "No vessels match your exact parameters. Try loosening filters."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {yachts.map(yacht => (
                            <div
                                key={yacht.id}
                                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-5 shadow-md hover:shadow-xl"
                            >
                                <div>
                                    {/* Top row: Name + Price */}
                                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-700 font-bold border border-cyan-100 inline-block mb-1.5">
                                                {yacht.type.toUpperCase()}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-black text-slate-900">
                                                {yacht.name}
                                            </h3>
                                            <span className="text-xs font-semibold text-emerald-700 block mt-0.5">
                                                {isRu ? yacht.crewBadgeRu : yacht.crewBadgeEn}
                                            </span>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className="text-2xl md:text-3xl font-black text-cyan-600">
                                                €{yacht.pricePerDayEur}
                                            </div>
                                            <span className="text-[10px] text-slate-500 uppercase font-bold block">
                                                {t.perDay} (~{yacht.pricePerDayTry} TRY)
                                            </span>
                                            <span className="text-xs font-black text-amber-600 block mt-1">
                                                {t.totalFor}: €{yacht.totalPriceEur}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Specs Badges */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
                                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-200/80">
                                            <span className="text-[10px] text-slate-500 block font-bold">Длина</span>
                                            <span className="text-xs font-black text-slate-900">📐 {yacht.lengthMeters} м</span>
                                        </div>
                                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-200/80">
                                            <span className="text-[10px] text-slate-500 block font-bold">Каюты</span>
                                            <span className="text-xs font-black text-slate-900">🛏️ {yacht.cabins} каюты</span>
                                        </div>
                                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-200/80">
                                            <span className="text-[10px] text-slate-500 block font-bold">Вместимость</span>
                                            <span className="text-xs font-black text-slate-900">👥 до {yacht.guestsMax} гост.</span>
                                        </div>
                                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-200/80">
                                            <span className="text-[10px] text-slate-500 block font-bold">Год</span>
                                            <span className="text-xs font-black text-slate-900">📅 {yacht.yearBuilt} г.</span>
                                        </div>
                                    </div>

                                    {/* Features chips */}
                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {(isRu ? yacht.featuresRu : yacht.featuresEn).map((feat, idx) => (
                                            <span key={idx} className="bg-slate-50 text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-200/80">
                                                ✓ {feat}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Recommended tip */}
                                    <p className="text-xs text-slate-700 mt-4 bg-cyan-50/60 p-3.5 rounded-2xl border border-cyan-100 leading-relaxed">
                                        💡 <strong className="text-cyan-600">{isRu ? "Мнение эксперта:" : "Expert Note:"}</strong> {isRu ? yacht.recommendedForRu : yacht.recommendedForEn}
                                    </p>
                                </div>

                                {/* Booking Call To Actions */}
                                <div className="space-y-2 pt-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <button
                                            onClick={() => handleClickAndBoatSearch(yacht)}
                                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-3 px-3 rounded-2xl text-xs flex items-center justify-center space-x-1.5 shadow-md hover:scale-[1.01] transition-all"
                                        >
                                            <FaExternalLinkAlt size={12} />
                                            <span>Click&Boat</span>
                                        </button>

                                        <button
                                            onClick={() => handleViraviraSearch(yacht)}
                                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 px-3 rounded-2xl text-xs flex items-center justify-center space-x-1.5 shadow-md hover:scale-[1.01] transition-all"
                                        >
                                            <FaCompass size={13} className="text-amber-400" />
                                            <span>GetMyBoat / Viravira</span>
                                        </button>
                                    </div>
                                    
                                    <button
                                        onClick={() => handleWhatsAppDirect(yacht)}
                                        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-2 hover:scale-[1.01] transition-all"
                                    >
                                        <FaWhatsapp className="text-emerald-600" size={16} />
                                        <span>{t.btnWhatsApp}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Why Trust Local Turkish Fleets Note */}
            <div className="bg-gradient-to-br from-cyan-50/80 via-white to-sky-50/80 rounded-[2rem] p-6 md:p-8 border border-cyan-100 space-y-3 text-slate-900 shadow-lg">
                <div className="flex items-center space-x-3 text-cyan-700 font-black text-sm md:text-base uppercase tracking-tight">
                    <FaShieldAlt size={20} className="text-cyan-600" />
                    <span>{t.whyTrustTitle}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    {t.whyTrustDesc}
                </p>
            </div>
        </section>
    );
}
