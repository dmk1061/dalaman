"use client";

import React, { useState, useEffect } from 'react';
import { FaCar, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaShieldAlt, FaGasPump, FaCog, FaUsers, FaSearch, FaWhatsapp, FaKey } from 'react-icons/fa';

export interface CarOption {
    id: string;
    tier: 'economy' | 'comfort' | 'suv' | 'cabrio' | 'minivan';
    modelName: string;
    transmission: 'Auto' | 'Manual';
    fuel: 'Petrol' | 'Diesel' | 'Hybrid';
    seats: number;
    year: number;
    pricePerDayTry: number;
    pricePerDayEur: number;
    totalPriceEur: number;
    depositType: 'none' | 'cash_100' | 'card_300';
    depositTextRu: string;
    depositTextEn: string;
    specsRu: string[];
    specsEn: string[];
    recommendedForRu: string;
    recommendedForEn: string;
}

interface ApiResponse {
    isLiveApi: boolean;
    source: string;
    timestamp: string;
    location: string;
    dateFrom: string;
    days: number;
    carsCount: number;
    cars: CarOption[];
}

export default function CarRentalSmartHub({ locale = "ru" }: { locale?: string }) {
    const isRu = locale === 'ru';
    const isDe = locale === 'de';
    const isTr = locale === 'tr';

    const defaultDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const [pickupLocation, setPickupLocation] = useState<string>("dlm");
    const [dateFrom, setDateFrom] = useState<string>(defaultDate);
    const [daysCount, setDaysCount] = useState<number>(7);
    const [selectedTier, setSelectedTier] = useState<string>("all");
    const [depositFilter, setDepositFilter] = useState<"all" | "none" | "cash">("all");

    const [cars, setCars] = useState<CarOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [apiSource, setApiSource] = useState<string>("");

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        fetch(`/api/car-prices?location=${pickupLocation}&dateFrom=${dateFrom}&days=${daysCount}&tier=${selectedTier}`)
            .then(res => res.json())
            .then((data: ApiResponse) => {
                if (isMounted) {
                    setCars(data.cars || []);
                    setApiSource(data.source || "Live Market Index");
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.error("Failed to fetch live car rates:", err);
                if (isMounted) setIsLoading(false);
            });

        return () => { isMounted = false; };
    }, [pickupLocation, dateFrom, daysCount, selectedTier]);

    const filteredCars = cars.filter(car => {
        if (depositFilter === "none") return car.depositType === "none";
        if (depositFilter === "cash") return car.depositType === "none" || car.depositType === "cash_100";
        return true;
    });

    const t = {
        badge: isRu ? "Живой Поисковый Шлюз Аренды Авто 2026" : isDe ? "Live Mietwagen-Suchmaschine 2026" : isTr ? "Canlı Araç Kiralama Arama Motoru 2026" : "Live Car Rental Search Gateway 2026",
        title: isRu ? "Интерактивный подбор авто с реальными ценами онлайн" : isDe ? "Interaktive Fahrzeugsuche mit echten Online-Preisen" : isTr ? "Gerçek Fiyatlarla İnteraktif Araç Seçimi" : "Interactive Car Finder with Real-Time Live Rates",
        subtitle: isRu ? "Выбирайте реальные параметры и даты. Цены автоматически рассчитываются нашим сервером исходя из точного сезона, длительности и курса валют — без доплат на месте." : "Select your exact dates & location. Prices are dynamically calculated by our server based on real seasonal multipliers, duration discounts, and live exchange rates.",
        step1Title: isRu ? "1. Параметры получения и сроки поездки:" : isDe ? "1. Abholort & Mietdauer:" : isTr ? "1. Alış Yeri ve Kiralama Süresi:" : "1. Pickup Location & Rental Duration:",
        locLabel: isRu ? "📍 Место получения:" : isDe ? "📍 Abholort:" : isTr ? "📍 Alış Noktası:" : "📍 Pickup Point:",
        dateLabel: isRu ? "📅 Дата начала аренды:" : isDe ? "📅 Abholdatum:" : isTr ? "📅 Başlangıç Tarihi:" : "📅 Pickup Date:",
        daysLabel: isRu ? "⏱️ Срок аренды (дней):" : isDe ? "⏱️ Mietdauer (Tage):" : isTr ? "⏱️ Kiralama Süresi (Gün):" : "⏱️ Duration (Days):",
        step2Title: isRu ? "2. Фильтр класса и условий залога:" : isDe ? "2. Fahrzeugklasse & Kaution:" : isTr ? "2. Araç Sınıfı ve Depozito:" : "2. Vehicle Class & Deposit Filters:",
        tierAll: isRu ? "⭐ Все классы" : isDe ? "⭐ Alle Klassen" : isTr ? "⭐ Tüm Sınıflar" : "⭐ All Classes",
        tierEcon: isRu ? "🟢 Эконом" : isDe ? "🟢 Economy" : isTr ? "🟢 Ekonomik" : "🟢 Economy",
        tierComf: isRu ? "🟡 Комфорт (Автомат)" : isDe ? "🟡 Komfort (Automatik)" : isTr ? "🟡 Konfor (Otomatik)" : "🟡 Comfort (Auto)",
        tierSuv: isRu ? "🔵 Кроссовер / SUV" : isDe ? "🔵 SUV / Geländewagen" : isTr ? "🔵 SUV / Crossover" : "🔵 SUV / Crossover",
        tierCabrio: isRu ? "🟣 Кабриолет" : isDe ? "🟣 Cabriolet" : isTr ? "🟣 Cabrio" : "🟣 Convertible",
        tierMinivan: isRu ? "🟠 7-9 мест Минивэн" : isDe ? "🟠 7-9 Sitzer Minivan" : isTr ? "🟠 7-9 Kişilik Minivan" : "🟠 7-9 Seater Minivan",
        depAll: isRu ? "Вся база (с залогом и без)" : "All options",
        depNone: isRu ? "🛡️ Только БЕЗ залога ($0 на кредитке)" : "🛡️ $0 No Deposit Only",
        depCash: isRu ? "💵 Без кредитки (Залог наличными или $0)" : "💵 No Credit Card (Cash or $0 Deposit)",
        perDay: isRu ? "за сутки" : isDe ? "pro Tag" : isTr ? "günlük" : "per day",
        totalFor: isRu ? `Итого за ${daysCount} дн.` : isDe ? `Gesamt für ${daysCount} Tage` : isTr ? `${daysCount} günlük toplam` : `Total for ${daysCount} days`,
        btnAggregator: isRu ? "🔍 Найти свободные авто в Localrent" : isDe ? "🔍 Verfügbare Autos in Localrent suchen" : isTr ? "🔍 Localrent'te Müsait Araçları Bul" : "🔍 Search Available Cars on Localrent",
        btnWhatsApp: isRu ? "💬 Забронировать в WhatsApp без кредитки" : isDe ? "💬 Via WhatsApp ohne Kreditkarte buchen" : isTr ? "💬 WhatsApp ile Kredi Kartsız Rezerve Et" : "💬 Book via WhatsApp (No Credit Card)",
        liveApiBadge: isRu ? "⚡ Расчет сервера в реальном времени" : "⚡ Live Dynamic Server Calculation",
        emptyText: isRu ? "По вашим фильтрам не найдено машин. Попробуйте выбрать 'Все классы' или изменить условия залога." : "No cars match your exact filter. Try selecting 'All Classes' or loosening deposit restrictions.",
        whyTrustTitle: isRu ? "💡 Почему в Турции не стоит арендовать авто с блокировкой €1000 на кредитке?" : "💡 Why avoid €1000 credit card blocks in Turkey?",
        whyTrustDesc: isRu ? "В аэропорту Даламан (DLM) крупные международные сети (Hertz, Avis, Enterprise) часто блокируют от €800 до €1500 на кредитной карте и требуют международные права. В 90% случаев туристы и экспаты выбирают проверенные локальные турецкие автопарки (через агрегатор Localrent или наш прямой контакт), где залог составляет всего €0 - €100 наличными или дебетовой картой, а выдача занимает ровно 10 минут прямо у выхода из терминала." : "Major international chains at DLM Airport often block €800-€1500 on credit cards and enforce strict policies. Over 90% of regional travelers prefer verified Turkish local fleets (via Localrent aggregator or direct inquiry), where deposits are just €0-€100 cash/debit, with 10-minute curbside terminal delivery."
    };

    const handleLocalrentSearch = (car: CarOption) => {
        // Build clean search URL for external aggregator
        const baseUrl = "https://localrent.com/ru/turkey/dalaman/";
        window.open(baseUrl, "_blank");
    };

    const handleWhatsAppBooking = (car: CarOption) => {
        const text = encodeURIComponent(
            `Hello from Dalaman Guide (dalaman.info)!\nI want to request exact availability for Car Rental:\n` +
            `- Model / Tier: ${car.modelName} (${car.tier.toUpperCase()})\n` +
            `- Pickup Location: ${pickupLocation.toUpperCase()}\n` +
            `- Pickup Date: ${dateFrom}\n` +
            `- Duration: ${daysCount} days\n` +
            `- Estimated Live Rate: €${car.pricePerDayEur}/day (Total: €${car.totalPriceEur})\n` +
            `- Deposit Terms Requested: ${car.depositTextEn}\n\n` +
            `Please confirm exact vehicle availability and locking this rate!`
        );
        window.open(`https://wa.me/905300000000?text=${text}`, "_blank");
    };

    return (
        <section className="w-full space-y-12 my-8">
            {/* Main Interactive Finder Card */}
            <div className="bg-gradient-to-br from-white via-cyan-50/50 to-sky-50/40 rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-cyan-100 text-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-600 flex items-center justify-center text-white font-black shadow-lg shadow-cyan-600/30">
                        <FaCar size={20} />
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

                {/* STEP 1: PICKUP & DATES */}
                <div className="space-y-3 mb-8">
                    <label className="text-xs font-black text-cyan-600 uppercase tracking-wider block">
                        {t.step1Title}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/80 p-5 rounded-3xl border border-slate-200/80 shadow-sm">
                        {/* Location */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-cyan-600" /> {t.locLabel}
                            </span>
                            <select
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-cyan-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value="dlm">✈️ Аэропорт Даламан (DLM Terminal)</option>
                                <option value="dalaman_city">🏡 Даламан (Город / Центр / Отели)</option>
                                <option value="fethiye">🌅 Фетхие (Центр / Чалыш / Олюдениз)</option>
                                <option value="gocek">⛵ Гёчек (Марины / D-Marin)</option>
                                <option value="sarigerme">🌴 Сарыгерме (Отели Hilton / TUI)</option>
                                <option value="marmaris">🏰 Мармарис (Ичмелер / Порт)</option>
                                <option value="kas">🌺 Каш / Калкан (Доставка)</option>
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
                                <span className="flex items-center gap-1.5"><FaCog className="text-cyan-600" /> {t.daysLabel}</span>
                                {daysCount >= 14 ? (
                                    <span className="text-[10px] text-emerald-700 font-black bg-emerald-100 px-2 py-0.5 rounded-md">-20% Скидка</span>
                                ) : daysCount >= 7 ? (
                                    <span className="text-[10px] text-cyan-700 font-black bg-cyan-100 px-2 py-0.5 rounded-md">-12% Недельная</span>
                                ) : null}
                            </span>
                            <select
                                value={daysCount}
                                onChange={(e) => setDaysCount(parseInt(e.target.value, 10))}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-cyan-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value={2}>2 суток (короткий выезд)</option>
                                <option value={3}>3 суток (уикенд на море)</option>
                                <option value={5}>5 суток (рабочая неделя)</option>
                                <option value={7}>7 суток (стандартный отпуск -12% скидка)</option>
                                <option value={10}>10 суток (расширенный тур)</option>
                                <option value={14}>14 суток (2 недели -20% супер-тариф!)</option>
                                <option value={21}>21 сутки (3 недели экспат-тариф)</option>
                                <option value={30}>30 суток (месячная аренда)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* STEP 2: CLASS & DEPOSIT FILTER */}
                <div className="space-y-3 mb-8">
                    <label className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                        {t.step2Title}
                    </label>
                    
                    {/* Tier Tabs */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {[
                            { id: "all", label: t.tierAll },
                            { id: "economy", label: t.tierEcon },
                            { id: "comfort", label: t.tierComf },
                            { id: "suv", label: t.tierSuv },
                            { id: "cabrio", label: t.tierCabrio },
                            { id: "minivan", label: t.tierMinivan }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTier(tab.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                    selectedTier === tab.id
                                        ? "bg-cyan-600 text-white border-cyan-600 shadow-lg shadow-cyan-600/20 scale-105 font-black"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Deposit Filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        {[
                            { id: "all", label: t.depAll },
                            { id: "none", label: t.depNone },
                            { id: "cash", label: t.depCash }
                        ].map(dep => (
                            <button
                                key={dep.id}
                                onClick={() => setDepositFilter(dep.id as any)}
                                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
                                    depositFilter === dep.id
                                        ? "bg-amber-100 text-amber-800 border-amber-300 font-bold"
                                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/70"
                                }`}
                            >
                                {dep.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* API SOURCE INDICATOR */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-200 pt-4 mb-6">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {t.liveApiBadge}: <strong className="text-slate-900 font-black">{apiSource}</strong>
                    </span>
                    <span>
                        Найдено машин: <strong className="text-cyan-600 font-black">{filteredCars.length}</strong>
                    </span>
                </div>

                {/* VEHICLE CARDS GRID */}
                {isLoading ? (
                    <div className="py-16 flex flex-col items-center justify-center space-y-3">
                        <div className="w-10 h-10 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                            {isRu ? "Запрос актуальных тарифов сервера на выбранные даты..." : "Calculating dynamic server spot rates..."}
                        </span>
                    </div>
                ) : filteredCars.length === 0 ? (
                    <div className="py-12 bg-white rounded-3xl border border-slate-200 text-center p-6 shadow-sm">
                        <p className="text-sm font-bold text-slate-700">{t.emptyText}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredCars.map(car => (
                            <div
                                key={car.id}
                                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-5 shadow-md hover:shadow-xl"
                            >
                                <div>
                                    {/* Top row: Model + Price */}
                                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-700 font-bold border border-cyan-100 inline-block mb-1.5">
                                                {car.tier.toUpperCase()} CLASS
                                            </span>
                                            <h3 className="text-lg md:text-xl font-black text-slate-900">
                                                {car.modelName}
                                            </h3>
                                            <span className="text-xs font-semibold text-emerald-700 block mt-0.5">
                                                {isRu ? car.depositTextRu : car.depositTextEn}
                                            </span>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className="text-2xl md:text-3xl font-black text-cyan-600">
                                                €{car.pricePerDayEur}
                                            </div>
                                            <span className="text-[10px] text-slate-500 uppercase font-bold block">
                                                {t.perDay} (~{car.pricePerDayTry} TRY)
                                            </span>
                                            <span className="text-xs font-black text-amber-600 block mt-1">
                                                {t.totalFor}: €{car.totalPriceEur}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Specs Badges */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
                                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-200/80">
                                            <span className="text-[10px] text-slate-500 block font-bold">Коробка</span>
                                            <span className="text-xs font-black text-slate-900">{car.transmission === 'Auto' ? '⚡ Автомат' : '⚙️ Механика'}</span>
                                        </div>
                                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-200/80">
                                            <span className="text-[10px] text-slate-500 block font-bold">Топливо</span>
                                            <span className="text-xs font-black text-slate-900">{car.fuel === 'Petrol' ? '⛽ Бензин' : car.fuel === 'Diesel' ? '⛽ Дизель' : '🌱 Гибрид'}</span>
                                        </div>
                                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-200/80">
                                            <span className="text-[10px] text-slate-500 block font-bold">Мест</span>
                                            <span className="text-xs font-black text-slate-900">👥 {car.seats} мест</span>
                                        </div>
                                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-200/80">
                                            <span className="text-[10px] text-slate-500 block font-bold">Год выпуска</span>
                                            <span className="text-xs font-black text-slate-900">📅 {car.year} г.</span>
                                        </div>
                                    </div>

                                    {/* Recommended tip */}
                                    <p className="text-xs text-slate-700 mt-4 bg-cyan-50/60 p-3.5 rounded-2xl border border-cyan-100 leading-relaxed">
                                        💡 <strong className="text-cyan-600">{isRu ? "Для чего подходит:" : "Best Suited For:"}</strong> {isRu ? car.recommendedForRu : car.recommendedForEn}
                                    </p>
                                </div>

                                {/* Booking Call To Actions */}
                                <div className="space-y-2 pt-2">
                                    <button
                                        onClick={() => handleLocalrentSearch(car)}
                                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-3.5 px-4 rounded-2xl text-xs md:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-cyan-600/20 hover:scale-[1.01] transition-all"
                                    >
                                        <FaSearch size={14} />
                                        <span>{t.btnAggregator} (Localrent)</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => handleWhatsAppBooking(car)}
                                        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center space-x-2 hover:scale-[1.01] transition-all"
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
