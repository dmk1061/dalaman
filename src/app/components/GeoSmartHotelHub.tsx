"use client";

import React, { useState, useEffect } from 'react';
import { FaHotel, FaCalendarAlt, FaMapMarkerAlt, FaShieldAlt, FaUsers, FaSearch, FaWhatsapp, FaHome, FaStar, FaInfoCircle, FaCheckCircle, FaGlobe, FaFlag } from 'react-icons/fa';

export interface AccommodationItem {
    id: string;
    type: 'apartment' | 'boutique' | 'resort' | 'villa';
    titleRu: string;
    titleEn: string;
    locationNameRu: string;
    locationNameEn: string;
    rating: number;
    reviewsCount: number;
    pricePerNightTry: number;
    pricePerNightEur: number;
    totalPriceEur: number;
    paymentType: 'pay_at_hotel' | 'free_cancellation' | 'all_inclusive';
    paymentBadgeRu: string;
    paymentBadgeEn: string;
    featuresRu: string[];
    featuresEn: string[];
    recommendedForRu: string;
    recommendedForEn: string;
}

interface ApiResponse {
    isLiveApi: boolean;
    source: string;
    geoMode: string;
    timestamp: string;
    location: string;
    checkIn: string;
    nights: number;
    guests: number;
    accommodationsCount: number;
    accommodations: AccommodationItem[];
}

export default function GeoSmartHotelHub({ locale = "ru" }: { locale?: string }) {
    const isRu = locale === 'ru';
    const isDe = locale === 'de';
    const isTr = locale === 'tr';

    const defaultDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const [geoMode, setGeoMode] = useState<'tr' | 'intl'>('tr'); // Default to Turkey legal Otelz mode
    const [location, setLocation] = useState<string>("fethiye");
    const [checkIn, setCheckIn] = useState<string>(defaultDate);
    const [nights, setNights] = useState<number>(7);
    const [guests, setGuests] = useState<number>(2);
    const [selectedType, setSelectedType] = useState<string>("all");

    const [items, setItems] = useState<AccommodationItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sourceNote, setSourceNote] = useState<string>("");

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        fetch(`/api/hotel-prices?location=${location}&checkIn=${checkIn}&nights=${nights}&guests=${guests}&type=${selectedType}&geo=${geoMode}`)
            .then(res => res.json())
            .then((data: ApiResponse) => {
                if (isMounted) {
                    setItems(data.accommodations || []);
                    setSourceNote(data.source || "Market Index");
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.error("Failed to fetch accommodation rates:", err);
                if (isMounted) setIsLoading(false);
            });

        return () => { isMounted = false; };
    }, [location, checkIn, nights, guests, selectedType, geoMode]);

    const t = {
        badge: isRu ? "Geo-Smart Шлюз Отелей и Вилл 2026 (100% Легально)" : isDe ? "Geo-Smart Hotel & Villa Hub 2026" : isTr ? "Geo-Smart Otel ve Villa Rezervasyon Şebekesi 2026" : "Geo-Smart Hotel & Villa Hub 2026",
        title: isRu ? "Интерактивный подбор отелей, апартаментов и частных вилл" : isDe ? "Interaktive Auswahl von Hotels, Ferienwohnungen und Villen" : isTr ? "Otel, Daire ve Özel Villa İnteraktif Seçim Merkezi" : "Interactive Hotel, Apartment, and Luxury Villa Finder",
        subtitle: isRu ? "Выбирайте свой географический режим: в соответствии с законом Турции № 1618 мы обеспечиваем бронирование через официальный турецкий шлюз Otelz.com без предоплаты или международный шлюз Booking.com." : "Select your geographic mode: in full compliance with Turkish Law No. 1618, we route local queries via official Turkey partner Otelz.com (pay at check-in) or international Booking.com.",
        geoSwitchLabel: isRu ? "📍 Где вы находитесь прямо сейчас (для легального бронирования без VPN)?" : isDe ? "📍 Wo befinden Sie sich derzeit (für legale Buchungen ohne VPN)?" : isTr ? "📍 Şu an neredesiniz (VPN gerektirmeyen yasal rezervasyon için)?" : "📍 Where are you right now (for legal booking without VPN)?",
        geoTr: isRu ? "🇹🇷 Я в Турции (Работаем через Otelz.com / Оплата в отеле)" : isDe ? "🇹🇷 Ich bin in der Türkei (Otelz.com / Bezahlung im Hotel)" : isTr ? "🇹🇷 Türkiye'deyim (Otelz.com / Otelde Ödeme İmkanı)" : "🇹🇷 Inside Turkey (Otelz.com / Pay at Check-in)",
        geoIntl: isRu ? "🌍 Я за пределами Турции (Работаем через Booking.com)" : isDe ? "🌍 Außerhalb der Türkei (Booking.com Gateway)" : isTr ? "🌍 Yurtdışındayım (Booking.com Arama Şebekesi)" : "🌍 Outside Turkey (Booking.com International)",
        step1Title: isRu ? "1. Курорт, даты заезда и количество гостей:" : isDe ? "1. Resort, Reisedaten und Gästeanzahl:" : isTr ? "1. Bölge, Giriş Tarihi ve Konuk Sayısı:" : "1. Resort, Check-in Date & Guest Count:",
        locLabel: isRu ? "📍 Выберите курорт / район:" : isDe ? "📍 Ort / Region auswählen:" : isTr ? "📍 Bölge Seçiniz:" : "📍 Select Resort / Area:",
        checkInLabel: isRu ? "📅 Дата заезда:" : isDe ? "📅 Anreisedatum:" : isTr ? "📅 Giriş Tarihi:" : "📅 Check-in Date:",
        nightsLabel: isRu ? "🌙 Ночей проживания:" : isDe ? "🌙 Anzahl Nächte:" : isTr ? "🌙 Gece Sayısı:" : "🌙 Duration (Nights):",
        guestsLabel: isRu ? "👥 Гостей:" : isDe ? "👥 Gäste:" : isTr ? "👥 Konuk Sayısı:" : "👥 Guests:",
        step2Title: isRu ? "2. Категория жилья и уровень комфорта:" : isDe ? "2. Unterkunftsart und Komfortstufe:" : isTr ? "2. Konaklama Türü ve Konfor:" : "2. Accommodation Type & Comfort Level:",
        typeAll: isRu ? "⭐ Все варианты" : isDe ? "⭐ Alle Optionen" : isTr ? "⭐ Tüm Seçenekler" : "⭐ All Options",
        typeApt: isRu ? "🏠 Апартаменты 1+1 / 2+1" : isDe ? "🏠 Ferienwohnungen 1+1" : isTr ? "🏠 Daireler 1+1 / 2+1" : "🏠 Apartments 1+1",
        typeBoutique: isRu ? "🏨 Бутик-отели (Завтрак)" : isDe ? "🏨 Boutique-Hotels" : isTr ? "🏨 Butik Oteller" : "🏨 Boutique Hotels",
        typeResort: isRu ? "🌴 5★ Resorts All-Inclusive" : isDe ? "🌴 5★ Resorts All-Inclusive" : isTr ? "🌴 5★ Tatil Köyleri" : "🌴 5★ Resorts All-Inclusive",
        typeVilla: isRu ? "🏡 Частные Виллы с Бассейном" : isDe ? "🏡 Luxusvillen mit Pool" : isTr ? "🏡 Özel Havuzlu Villalar" : "🏡 Private Pool Villas",
        perNight: isRu ? "за ночь" : isDe ? "pro Nacht" : isTr ? "gecelik" : "per night",
        totalFor: isRu ? `Итого за ${nights} ноч.` : isDe ? `Gesamt für ${nights} Nächte` : isTr ? `${nights} gecelik toplam` : `Total for ${nights} nights`,
        btnGateway: isRu
            ? (geoMode === 'tr' ? "🇹🇷 Открыть в Otelz.com на эти даты" : "🌍 Открыть в Booking.com на эти даты")
            : (geoMode === 'tr' ? "🇹🇷 Search on Otelz.com (Turkey Official)" : "🌍 Search on Booking.com"),
        btnWhatsApp: isRu ? "💬 Забронировать виллу/бутик напрямую в WhatsApp (Без комиссии)" : isDe ? "💬 Direkt via WhatsApp buchen (Keine Provision)" : isTr ? "💬 WhatsApp ile Doğrudan Rezerve Et (Komisyonsuz)" : "💬 Direct WhatsApp Concierge Inquiry (No OTA Fee)",
        legalNoteTitle: isRu ? "💡 Почему бронирование через Otelz.com в Турции — это легально, выгодно и удобно?" : "💡 Why Otelz.com is Turkey's #1 legal booking alternative?",
        legalNoteDesc: isRu ? "Согласно решению турецких судов и Закону № 1618 (TÜRSAB), зарубежные платформы (такие как Booking.com) не могут предлагать бронирование турецких отелей пользователям с турецких IP-адресов. Переключив наш шлюз в режим «🇹🇷 Я в Турции», вы попадаете в официальную турецкую систему Otelz.com — где представлены абсолютно те же отели Даламана, Фетхие и Каша с гарантией лучшей цены, плюс уникальная опция «Оплата при заселении на ресепшне» без блокировки средств на картах!" : "By order of Turkish courts and TÜRSAB Law No. 1618, international platforms (like Booking.com) restrict domestic Turkish hotel reservations from local Turkish IP addresses. By selecting our '🇹🇷 Inside Turkey' mode, you are connected directly to official Turkish partner Otelz.com — featuring the exact same hotel inventory across Dalaman, Fethiye, and Kaş with 'Pay at Hotel' options and zero upfront credit card prepayment!"
    };

    const handleGatewaySearch = (item: AccommodationItem) => {
        if (geoMode === 'tr') {
            // Route to official Otelz search gateway
            window.open(`https://www.otelz.com/en/search?destination=${encodeURIComponent(item.locationNameEn.split('/')[0].trim())}`, "_blank");
        } else {
            // Route to Booking.com
            window.open(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(item.locationNameEn.split('/')[0].trim())}`, "_blank");
        }
    };

    const handleWhatsAppDirect = (item: AccommodationItem) => {
        const text = encodeURIComponent(
            `Hello from Dalaman Guide (dalaman.info)!\nI want to make a direct concierge booking request without platform fees:\n` +
            `- Property / Type: ${item.titleEn} (${item.type.toUpperCase()})\n` +
            `- Location: ${item.locationNameEn}\n` +
            `- Check-in Date: ${checkIn}\n` +
            `- Duration: ${nights} nights (${guests} Guests)\n` +
            `- Estimated Rate: €${item.pricePerNightEur}/night (Total: €${item.totalPriceEur})\n` +
            `- Payment Preference: ${item.paymentBadgeEn}\n\n` +
            `Please confirm direct property availability!`
        );
        window.open(`https://wa.me/905300000000?text=${text}`, "_blank");
    };

    return (
        <section className="w-full space-y-12 my-8">
            {/* Main Geo-Smart Accommodation Card */}
            <div className="bg-gradient-to-br from-white via-sky-50/50 to-indigo-50/40 rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-sky-100 text-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/30">
                        <FaHotel size={20} />
                    </div>
                    <div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600 block">
                            {t.badge}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">
                            {t.title}
                        </h2>
                    </div>
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-4xl mb-6 font-medium">
                    {t.subtitle}
                </p>

                {/* GEO-SMART LEGAL MODE SWITCHER */}
                <div className="bg-white/90 p-5 rounded-3xl border border-sky-200 mb-8 space-y-3 shadow-sm">
                    <span className="text-xs font-black text-amber-600 uppercase tracking-wider flex items-center gap-2">
                        <FaFlag className="text-amber-500" /> {t.geoSwitchLabel}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            onClick={() => setGeoMode('tr')}
                            className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                                geoMode === 'tr'
                                    ? "bg-gradient-to-r from-red-600/10 to-amber-600/10 border-red-500 text-slate-900 font-black shadow-md scale-[1.01]"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
                            }`}
                        >
                            <div className="space-y-1">
                                <span className="text-xs sm:text-sm font-black block text-slate-900">{t.geoTr}</span>
                                <span className="text-[10px] text-slate-500 font-medium block">Рекомендуется для всех внутри Турции (Закон № 1618)</span>
                            </div>
                            {geoMode === 'tr' && <FaCheckCircle className="text-emerald-600 text-lg flex-shrink-0 ml-2" />}
                        </button>

                        <button
                            onClick={() => setGeoMode('intl')}
                            className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                                geoMode === 'intl'
                                    ? "bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-blue-500 text-slate-900 font-black shadow-md scale-[1.01]"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
                            }`}
                        >
                            <div className="space-y-1">
                                <span className="text-xs sm:text-sm font-black block text-slate-900">{t.geoIntl}</span>
                                <span className="text-[10px] text-slate-500 font-medium block">Рекомендуется при бронировании из Европы до вылета</span>
                            </div>
                            {geoMode === 'intl' && <FaCheckCircle className="text-cyan-600 text-lg flex-shrink-0 ml-2" />}
                        </button>
                    </div>
                </div>

                {/* STEP 1: RESORT & DATES */}
                <div className="space-y-3 mb-8">
                    <label className="text-xs font-black text-indigo-600 uppercase tracking-wider block">
                        {t.step1Title}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/80 p-5 rounded-3xl border border-slate-200/80 shadow-sm">
                        {/* Location */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-indigo-600" /> {t.locLabel}
                            </span>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value="fethiye">🌅 Фетхие (Чалыш / Олюдениз / Центр)</option>
                                <option value="sarigerme">🌴 Сарыгерме (Песчаные пляжи / 5★)</option>
                                <option value="gocek">⛵ Гёчек (Яхтенные марины / Люкс)</option>
                                <option value="kas">🌺 Каш / Калкан (Бутик-отели и виллы)</option>
                                <option value="dalaman_city">🏡 Даламан (Близость к аэропорту и морю)</option>
                                <option value="dalyan">🐢 Дальян (Берег реки и пляж черепах)</option>
                            </select>
                        </div>

                        {/* Check In Date */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaCalendarAlt className="text-amber-500" /> {t.checkInLabel}
                            </span>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500 transition-all cursor-pointer shadow-sm"
                            />
                        </div>

                        {/* Nights Count */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center justify-between">
                                <span className="flex items-center gap-1.5"><FaHotel className="text-indigo-600" /> {t.nightsLabel}</span>
                                {nights >= 14 ? (
                                    <span className="text-[10px] text-emerald-700 font-black bg-emerald-100 px-2 py-0.5 rounded-md">-15% Длительная</span>
                                ) : nights >= 7 ? (
                                    <span className="text-[10px] text-indigo-700 font-black bg-indigo-100 px-2 py-0.5 rounded-md">-10% Неделя</span>
                                ) : null}
                            </span>
                            <select
                                value={nights}
                                onChange={(e) => setNights(parseInt(e.target.value, 10))}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value={2}>2 ночи (уикенд)</option>
                                <option value={3}>3 ночи (короткий отдых)</option>
                                <option value={5}>5 ночей (рабочая неделя)</option>
                                <option value={7}>7 ночей (стандартный отпуск -10%)</option>
                                <option value={10}>10 ночей (расширенный тур)</option>
                                <option value={14}>14 ночей (2 недели -15% супер-скидка!)</option>
                                <option value={21}>21 ночь (3 недели зимовки/экспат)</option>
                                <option value={30}>30 ночей (месяц проживания)</option>
                            </select>
                        </div>

                        {/* Guests Count */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                <FaUsers className="text-cyan-600" /> {t.guestsLabel}
                            </span>
                            <select
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                                className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-cyan-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value={1}>1 Гость (соло)</option>
                                <option value={2}>2 Гостя (пара)</option>
                                <option value={3}>3 Гостя (семья 2+1)</option>
                                <option value={4}>4 Гостя (семья 2+2 / компания)</option>
                                <option value={6}>6 Гостей (большая вилла)</option>
                                <option value={8}>8+ Гостей (групповой чартер)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* STEP 2: ACCOMMODATION TYPE FILTER */}
                <div className="space-y-3 mb-8">
                    <label className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                        {t.step2Title}
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                        {[
                            { id: "all", label: t.typeAll },
                            { id: "apartment", label: t.typeApt },
                            { id: "boutique", label: t.typeBoutique },
                            { id: "resort", label: t.typeResort },
                            { id: "villa", label: t.typeVilla }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedType(tab.id)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                                    selectedType === tab.id
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20 scale-105 font-black"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SOURCE NOTE & COUNT */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-200 pt-4 mb-6">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Шлюз: <strong className="text-slate-900 font-black">{sourceNote}</strong>
                    </span>
                    <span>
                        Доступных вариантов: <strong className="text-indigo-600 font-black">{items.length}</strong>
                    </span>
                </div>

                {/* RESULTS GRID */}
                {isLoading ? (
                    <div className="py-16 flex flex-col items-center justify-center space-y-3">
                        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                            {isRu ? "Запрос актуальных тарифов и свободных номеров..." : "Querying live accommodation benchmark rates..."}
                        </span>
                    </div>
                ) : items.length === 0 ? (
                    <div className="py-12 bg-white rounded-3xl border border-slate-200 text-center p-6 shadow-sm">
                        <p className="text-sm font-bold text-slate-700">
                            {isRu ? "По вашему запросу не найдено вариантов. Попробуйте выбрать 'Все варианты' или изменить курорт." : "No accommodations match your exact filter."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {items.map(item => (
                            <div
                                key={item.id}
                                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-5 shadow-md hover:shadow-xl"
                            >
                                <div>
                                    {/* Top row: Title + Price */}
                                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                                                    {item.type.toUpperCase()}
                                                </span>
                                                <span className="flex items-center text-amber-500 text-xs font-bold gap-1">
                                                    <FaStar /> {item.rating} ({item.reviewsCount} отзывов)
                                                </span>
                                            </div>
                                            <h3 className="text-lg md:text-xl font-black text-slate-900">
                                                {isRu ? item.titleRu : item.titleEn}
                                            </h3>
                                            <span className="text-xs font-semibold text-slate-600 block mt-0.5">
                                                {isRu ? item.locationNameRu : item.locationNameEn}
                                            </span>
                                            <span className="text-[11px] font-bold text-emerald-700 block mt-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 w-fit">
                                                {isRu ? item.paymentBadgeRu : item.paymentBadgeEn}
                                            </span>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className="text-2xl md:text-3xl font-black text-indigo-600">
                                                €{item.pricePerNightEur}
                                            </div>
                                            <span className="text-[10px] text-slate-500 uppercase font-bold block">
                                                {t.perNight} (~{item.pricePerNightTry} TRY)
                                            </span>
                                            <span className="text-xs font-black text-amber-600 block mt-1">
                                                {t.totalFor}: €{item.totalPriceEur}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features badges */}
                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {(isRu ? item.featuresRu : item.featuresEn).map((feat, idx) => (
                                            <span key={idx} className="bg-slate-50 text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-200/80">
                                                ✓ {feat}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Recommended note */}
                                    <p className="text-xs text-slate-700 mt-4 bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-100 leading-relaxed">
                                        💡 <strong className="text-indigo-600">{isRu ? "Почему рекомендуем:" : "Our Expert Note:"}</strong> {isRu ? item.recommendedForRu : item.recommendedForEn}
                                    </p>
                                </div>

                                {/* Booking Call to Actions */}
                                <div className="space-y-2 pt-2">
                                    <button
                                        onClick={() => handleGatewaySearch(item)}
                                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3.5 px-4 rounded-2xl text-xs md:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 hover:scale-[1.01] transition-all"
                                    >
                                        <FaSearch size={14} />
                                        <span>{t.btnGateway}</span>
                                    </button>

                                    <button
                                        onClick={() => handleWhatsAppDirect(item)}
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

            {/* Legal compliance explanation block */}
            <div className="bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80 rounded-[2rem] p-6 md:p-8 border border-indigo-100 space-y-3 text-slate-900 shadow-lg">
                <div className="flex items-center space-x-3 text-indigo-700 font-black text-sm md:text-base uppercase tracking-tight">
                    <FaShieldAlt size={20} className="text-indigo-600" />
                    <span>{t.legalNoteTitle}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    {t.legalNoteDesc}
                </p>
            </div>
        </section>
    );
}
