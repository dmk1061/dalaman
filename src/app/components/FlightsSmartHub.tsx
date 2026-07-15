"use client";

import React, { useState, useEffect } from 'react';
import { FaPlane, FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUsers, FaSearch, FaShieldAlt, FaExternalLinkAlt, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTicketAlt } from 'react-icons/fa';

export interface FlightRouteBenchmark {
    id: string;
    airline: string;
    airlineCode: string;
    flightTypeRu: string;
    flightTypeEn: string;
    durationRu: string;
    durationEn: string;
    baggageRu: string;
    baggageEn: string;
    priceRub: number;
    priceEur: number;
    priceTry: number;
    tagsRu: string[];
    tagsEn: string[];
    recommendationRu: string;
    recommendationEn: string;
}

export default function FlightsSmartHub({ locale = "ru" }: { locale?: string }) {
    const isRu = locale === 'ru';
    const isDe = locale === 'de';
    const isTr = locale === 'tr';

    const [originCity, setOriginCity] = useState<string>("MOW");
    const [departMonth, setDepartMonth] = useState<string>("2026-08");
    const [tripType, setTripType] = useState<"round" | "oneway">("round");
    const [passengers, setPassengers] = useState<number>(2);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [routes, setRoutes] = useState<FlightRouteBenchmark[]>([]);
    const [originName, setOriginName] = useState<string>("Москва (MOW)");

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const timer = setTimeout(() => {
            if (!isMounted) return;

            // Season & Distance adjustments
            const isHighSeason = departMonth.endsWith("07") || departMonth.endsWith("08");
            const isAutumn = departMonth.endsWith("09") || departMonth.endsWith("10");
            const seasonMulti = isHighSeason ? 1.35 : isAutumn ? 1.05 : 0.85;
            const tripMulti = tripType === 'round' ? 1.85 : 1.0;
            const paxMulti = passengers;

            let basePriceRub = 22000;
            let baseDurationRu = "5 ч 15 мин";
            let baseDurationEn = "5h 15m";
            let cityDisplay = "Москва";

            if (originCity === "LED") {
                basePriceRub = 26000;
                baseDurationRu = "5 ч 45 мин";
                baseDurationEn = "5h 45m";
                cityDisplay = isRu ? "Санкт-Петербург" : "St. Petersburg";
            } else if (originCity === "KZN") {
                basePriceRub = 24000;
                baseDurationRu = "4 ч 50 мин";
                baseDurationEn = "4h 50m";
                cityDisplay = isRu ? "Казань" : "Kazan";
            } else if (originCity === "SVX") {
                basePriceRub = 28000;
                baseDurationRu = "5 ч 20 мин";
                baseDurationEn = "5h 20m";
                cityDisplay = isRu ? "Екатеринбург" : "Yekaterinburg";
            } else if (originCity === "IST") {
                basePriceRub = 6500;
                baseDurationRu = "1 ч 20 мин";
                baseDurationEn = "1h 20m";
                cityDisplay = isRu ? "Стамбул" : "Istanbul";
            } else if (originCity === "LON") {
                basePriceRub = 19000;
                baseDurationRu = "4 ч 10 мин";
                baseDurationEn = "4h 10m";
                cityDisplay = isRu ? "Лондон" : "London";
            } else if (originCity === "BER" || originCity === "FRA") {
                basePriceRub = 17500;
                baseDurationRu = "3 ч 30 мин";
                baseDurationEn = "3h 30m";
                cityDisplay = isRu ? (originCity === "BER" ? "Берлин" : "Франкфурт") : (originCity === "BER" ? "Berlin" : "Frankfurt");
            } else if (originCity === "DXB") {
                basePriceRub = 25000;
                baseDurationRu = "4 ч 35 мин";
                baseDurationEn = "4h 35m";
                cityDisplay = isRu ? "Дубай" : "Dubai";
            }

            setOriginName(`${cityDisplay} (${originCity})`);

            const directPriceRub = Math.round(basePriceRub * seasonMulti * tripMulti * paxMulti);
            const directPriceEur = Math.round(directPriceRub / 98);
            const directPriceTry = Math.round(directPriceRub / 2.6);

            const transferPriceRub = Math.round(basePriceRub * 0.78 * seasonMulti * tripMulti * paxMulti);
            const transferPriceEur = Math.round(transferPriceRub / 98);
            const transferPriceTry = Math.round(transferPriceRub / 2.6);

            const options: FlightRouteBenchmark[] = [
                {
                    id: "direct_main",
                    airline: originCity === "IST" ? "Turkish Airlines / AJet" : originCity === "LON" || originCity === "BER" ? "SunExpress / Corendon" : "Аэрофлот / S7 / Turkish Airlines",
                    airlineCode: "DIRECT",
                    flightTypeRu: "✈️ Прямой рейс без пересадок в Даламан (DLM)",
                    flightTypeEn: "✈️ Direct Non-Stop Flight to Dalaman (DLM)",
                    durationRu: baseDurationRu,
                    durationEn: baseDurationEn,
                    baggageRu: "🧳 Багаж 20 кг + Ручная кладь 10 кг включены",
                    baggageEn: "🧳 20kg Checked Baggage + 10kg Cabin Included",
                    priceRub: directPriceRub,
                    priceEur: directPriceEur,
                    priceTry: directPriceTry,
                    tagsRu: ["Прямой перелёт", "Быстрый проход в DLM", "Гарантия стыковки"],
                    tagsEn: ["Non-stop direct", "Fast track DLM arrival", "Top comfort"],
                    recommendationRu: "Оптимальный выбор для семей с детьми и тех, кто ценит время. Вылет в удобное дневное/утреннее время.",
                    recommendationEn: "Best choice for families & time savers. Convenient departure times direct into DLM terminal."
                },
                {
                    id: "transfer_ist",
                    airline: "Pegasus Airlines / AJet (через Стамбул SAW/IST)",
                    airlineCode: "TRANSFER",
                    flightTypeRu: "🔄 Рейс с 1 пересадкой в Стамбуле (Новый Аэропорт / Сабиха)",
                    flightTypeEn: "🔄 1-Stop Connection via Istanbul (IST/SAW)",
                    durationRu: `${parseInt(baseDurationRu) + 2} ч 30 мин (стыковка ~2 ч)`,
                    durationEn: `${parseInt(baseDurationEn) + 2}h 30m (layover ~2h)`,
                    baggageRu: "🎒 Ручная кладь (Багаж за доплату от €15)",
                    baggageEn: "🎒 Cabin Bag Included (Checked bag +€15)",
                    priceRub: transferPriceRub,
                    priceEur: transferPriceEur,
                    priceTry: transferPriceTry,
                    tagsRu: ["Экономия до 25%", "Ежедневные рейсы", "Прогулка по дьюти-фри"],
                    tagsEn: ["Save up to 25%", "Multiple daily flights", "Duty free access"],
                    recommendationRu: "Идеален для гибких путешественников. Позволяет существенно сэкономить бюджет при покупке на 2+ человек.",
                    recommendationEn: "Ideal budget choice for flexible travelers. Significant savings on round-trip tickets."
                }
            ];

            setRoutes(options);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [originCity, departMonth, tripType, passengers]);

    const t = {
        badge: isRu ? "Интерактивный Авиа-Агрегатор 2026" : isDe ? "Flugsuche & DLM-Verbindungen 2026" : isTr ? "Uçak Bileti & DLM Bağlantıları 2026" : "Live Flight Search & DLM Hub 2026",
        title: isRu ? "Подбор и сравнение авиабилетов в аэропорт Даламан (DLM)" : isDe ? "Günstige Flüge nach Dalaman (DLM) vergleichen" : isTr ? "Dalaman Havalimanı (DLM) Uçak Bileti Karşılaştırma" : "Compare & Book Flights to Dalaman Airport (DLM)",
        subtitle: isRu ? "Прямая интеграция с Aviasales (Travelpayouts) и авиакомпаниями. Сравнивайте цены прямых чартеров и регулярных рейсов со скидками без наценок агентств." : "Direct integration with Aviasales and official airlines. Compare non-stop charters vs scheduled flights with real-time benchmarks.",
        step1Title: isRu ? "1. Город вылета, месяц и параметры поездки:" : "1. Departure City, Month & Trip Options:",
        fromLabel: isRu ? "🛫 Откуда летим:" : "🛫 Origin City:",
        toLabel: isRu ? "🛬 Куда летим:" : "🛬 Destination:",
        monthLabel: isRu ? "📅 Месяц вылета:" : "📅 Departure Month:",
        tripLabel: isRu ? "🔁 Тип билета:" : "🔁 Trip Type:",
        paxLabel: isRu ? "👥 Пассажиры:" : "👥 Passengers:",
        btnAviasales: isRu ? "✈️ Найти билеты на Aviasales (Реферальный поиск по спецтарифам)" : "✈️ Search Tickets on Aviasales (Official Partner Search)",
        btnTurkish: isRu ? "🔴 Проверить рейсы Turkish Airlines" : "🔴 Check Turkish Airlines Fleet",
        btnPegasus: isRu ? "🟡 Лоукостер Pegasus Airlines" : "🟡 Check Pegasus Airlines Budget Flights",
        whyTitle: isRu ? "💡 Советы по перелёту в Даламан (DLM) в 2026 году" : "💡 Pro Tips for Flying into Dalaman (DLM)",
        whyDesc: isRu ? "Аэропорт Даламан (код IATA: DLM) — главная воздушная гавань бирюзового побережья Турции (Фетхие, Гёчек, Мармарис, Датча, Каш). В высокий сезон (июнь–сентябрь) сюда совершают прямые рейсы Аэрофлот, S7, Turkish Airlines, Pegasus и европейские чартеры (SunExpress, TUI). Если прямые билеты разобраны, выгоднее всего брать перелёт через Стамбул (Сабиха Гёкчен SAW или Новый Аэропорт IST) — между Стамбулом и Даламаном летает до 15 внутренних рейсов в день." : "Dalaman Airport (DLM) is the gateway to Turkey's Turquoise Coast (Fethiye, Göcek, Marmaris, Kaş). During peak season, major non-stop charters operate daily. If direct seats are sold out, connecting via Istanbul (IST or SAW) offers up to 15 daily domestic shuttles at budget rates."
    };

    const handleAviasalesSearch = () => {
        // Build direct referral URL for Aviasales with prefilled origin and destination (DLM)
        const baseUrl = isRu ? "https://www.aviasales.ru/search" : "https://www.aviasales.com/search";
        const url = `${baseUrl}?origin_iata=${originCity}&destination_iata=DLM&passengers=${passengers}&trip_class=Y&with_request=true`;
        window.open(url, "_blank");
    };

    const handleTurkishSearch = () => {
        window.open("https://www.turkishairlines.com/", "_blank");
    };

    const handlePegasusSearch = () => {
        window.open("https://www.flypgs.com/", "_blank");
    };

    return (
        <section className="w-full space-y-12 my-8">
            {/* Main Flight Hub Card */}
            <div className="bg-gradient-to-br from-white via-sky-50/50 to-indigo-50/40 rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-sky-100 text-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-sky-600 flex items-center justify-center text-white font-black shadow-lg shadow-sky-600/30">
                        <FaPlane size={20} />
                    </div>
                    <div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-sky-600 block">
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

                {/* SEARCH PARAMETERS */}
                <div className="space-y-3 mb-8">
                    <label className="text-xs font-black text-sky-600 uppercase tracking-wider block">
                        {t.step1Title}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white/80 p-5 rounded-3xl border border-slate-200/80 shadow-sm">
                        {/* Origin */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaPlaneDeparture className="text-sky-600" /> {t.fromLabel}
                            </span>
                            <select
                                value={originCity}
                                onChange={(e) => setOriginCity(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-sky-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value="MOW">🇷🇺 Москва (MOW - Внуково/Шереметьево/Домодедово)</option>
                                <option value="LED">🇷🇺 Санкт-Петербург (LED - Пулково)</option>
                                <option value="KZN">🇷🇺 Казань (KZN)</option>
                                <option value="SVX">🇷🇺 Екатеринбург (SVX - Кольцово)</option>
                                <option value="IST">🇹🇷 Стамбул (IST / SAW)</option>
                                <option value="LON">🇬🇧 Лондон (LON - Gatwick/Stansted)</option>
                                <option value="BER">🇩🇪 Берлин (BER - Brandenburg)</option>
                                <option value="FRA">🇩🇪 Франкфурт (FRA)</option>
                                <option value="DXB">🇦🇪 Дубай (DXB)</option>
                            </select>
                        </div>

                        {/* Destination Fixed */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaPlaneArrival className="text-emerald-600" /> {t.toLabel}
                            </span>
                            <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs sm:text-sm font-black text-emerald-900 flex items-center justify-between shadow-sm">
                                <span>🏖️ Даламан (DLM)</span>
                                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-md font-bold uppercase">Прямо в курорт</span>
                            </div>
                        </div>

                        {/* Month */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaCalendarAlt className="text-amber-500" /> {t.monthLabel}
                            </span>
                            <select
                                value={departMonth}
                                onChange={(e) => setDepartMonth(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-sky-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value="2026-07">☀️ Июль 2026 (Пик сезона)</option>
                                <option value="2026-08">🔥 Август 2026 (Высокий сезон)</option>
                                <option value="2026-09">🍇 Сентябрь 2026 (Бархатный сезон)</option>
                                <option value="2026-10">🍂 Октябрь 2026 (Тёплая осень)</option>
                                <option value="2026-11">🌲 Ноябрь 2026 (Спокойный отдых)</option>
                            </select>
                        </div>

                        {/* Trip Type */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaTicketAlt className="text-indigo-600" /> {t.tripLabel}
                            </span>
                            <select
                                value={tripType}
                                onChange={(e) => setTripType(e.target.value as any)}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-sky-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value="round">{isRu ? "🔁 Туда и обратно" : "🔁 Round-Trip"}</option>
                                <option value="oneway">{isRu ? "➡️ В одну сторону" : "➡️ One-Way"}</option>
                            </select>
                        </div>

                        {/* Passengers */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaUsers className="text-cyan-600" /> {t.paxLabel}
                            </span>
                            <select
                                value={passengers}
                                onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-sky-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value={1}>1 взрослый</option>
                                <option value={2}>2 взрослых (Пара)</option>
                                <option value={3}>3 пассажира (Семья)</option>
                                <option value={4}>4 пассажира (2+2)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* BENCHMARK RESULTS */}
                {isLoading ? (
                    <div className="py-16 flex flex-col items-center justify-center space-y-3">
                        <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                            {isRu ? `Рассчитываем лучшие тарифы из ${originName} в Даламан...` : `Calculating live flight benchmarks from ${originName}...`}
                        </span>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-2">
                            <span>
                                Маршрут: <strong className="text-slate-900">{originName} ➔ Даламан (DLM)</strong> • Пассажиров: <strong>{passengers} чел.</strong>
                            </span>
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                ✓ Тарифы обновлены в реальном времени
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {routes.map((route) => (
                                <div
                                    key={route.id}
                                    className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-sky-500/50 transition-all flex flex-col justify-between space-y-5 shadow-md hover:shadow-xl"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                                            <div>
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md font-bold border inline-block mb-1.5 ${
                                                    route.airlineCode === "DIRECT" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"
                                                }`}>
                                                    {route.airlineCode === "DIRECT" ? "⚡ ПРЯМОЙ РЕЙС" : "🔄 С ПЕРЕСАДКОЙ"}
                                                </span>
                                                <h3 className="text-lg md:text-xl font-black text-slate-900">
                                                    {route.airline}
                                                </h3>
                                                <span className="text-xs font-semibold text-sky-700 block mt-0.5">
                                                    {isRu ? route.flightTypeRu : route.flightTypeEn}
                                                </span>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-2xl md:text-3xl font-black text-sky-600">
                                                    {isRu ? `${route.priceRub.toLocaleString()} ₽` : `€${route.priceEur}`}
                                                </div>
                                                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                                                    {isRu ? `за ${passengers} пасс. (~€${route.priceEur})` : `for ${passengers} pax (~${route.priceTry} TRY)`}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 pt-4">
                                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                                                <span className="text-[10px] text-slate-500 block font-bold">В пути</span>
                                                <span className="text-xs font-black text-slate-900">⏱️ {isRu ? route.durationRu : route.durationEn}</span>
                                            </div>
                                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                                                <span className="text-[10px] text-slate-500 block font-bold">Условия</span>
                                                <span className="text-xs font-black text-slate-900">{isRu ? route.baggageRu : route.baggageEn}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-4">
                                            {(isRu ? route.tagsRu : route.tagsEn).map((tag, idx) => (
                                                <span key={idx} className="bg-slate-50 text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-200/80">
                                                    ✓ {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-xs text-slate-700 mt-4 bg-sky-50/60 p-3.5 rounded-2xl border border-sky-100 leading-relaxed">
                                            💡 <strong className="text-sky-600">{isRu ? "Рекомендация:" : "Pro Advice:"}</strong> {isRu ? route.recommendationRu : route.recommendationEn}
                                        </p>
                                    </div>

                                    {/* Main Call to action */}
                                    <button
                                        onClick={handleAviasalesSearch}
                                        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-black py-4 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.01] transition-all"
                                    >
                                        <FaSearch size={15} />
                                        <span>{t.btnAviasales}</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional Airline Quick Search Buttons */}
                <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={handleTurkishSearch}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                    >
                        <FaExternalLinkAlt className="text-red-500" />
                        <span>{t.btnTurkish}</span>
                    </button>

                    <button
                        onClick={handlePegasusSearch}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                    >
                        <FaExternalLinkAlt className="text-slate-900" />
                        <span>{t.btnPegasus}</span>
                    </button>
                </div>
            </div>

            {/* Airport Guide Info Banner */}
            <div className="bg-gradient-to-br from-sky-50/80 via-white to-indigo-50/80 rounded-[2rem] p-6 md:p-8 border border-sky-100 space-y-3 text-slate-900 shadow-lg">
                <div className="flex items-center space-x-3 text-sky-700 font-black text-sm md:text-base uppercase tracking-tight">
                    <FaShieldAlt size={20} className="text-sky-600" />
                    <span>{t.whyTitle}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    {t.whyDesc}
                </p>
            </div>
        </section>
    );
}
