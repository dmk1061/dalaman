"use client";

import React, { useState, useMemo } from 'react';
import { FaCompass, FaMapMarkedAlt, FaUsers, FaUserTie, FaSearch, FaExternalLinkAlt, FaStar, FaClock, FaCheckCircle, FaShieldAlt, FaMountain, FaShip, FaLandmark, FaTree } from 'react-icons/fa';

export interface ExcursionItem {
    id: string;
    titleRu: string;
    titleEn: string;
    format: "group" | "private";
    category: "adrenaline" | "boat" | "history" | "nature";
    durationRu: string;
    durationEn: string;
    priceGroupRub: number;
    priceGroupEur: number;
    pricePrivateRub: number;
    pricePrivateEur: number;
    highlightsRu: string[];
    highlightsEn: string[];
    bestForRu: string;
    bestForEn: string;
    recommendedAggregator: "Sputnik8" | "Tripster" | "GetYourGuide";
}

const allExcursions: ExcursionItem[] = [
    {
        id: "paragliding_oludeniz",
        titleRu: "🪂 Полёт на параплане над Голубой Лагуной Олюдениза (Бабадаг 2000м)",
        titleEn: "🪂 Tandem Paragliding over Oludeniz Blue Lagoon (Babadag 2000m)",
        format: "private",
        category: "adrenaline",
        durationRu: "2–3 часа (полёт ~35 мин)",
        durationEn: "2–3 hours (flight ~35 min)",
        priceGroupRub: 12500,
        priceGroupEur: 125,
        pricePrivateRub: 14500,
        pricePrivateEur: 145,
        highlightsRu: ["Прыжок с высоты 1960 метров с пилотом-инструктором", "Захватывающая 360° панорама Эгейского и Средиземного морей", "Включены фото и 360° видео на GoPro", "Трансфер из отелей Фетхие и Олюдениза"],
        highlightsEn: ["Launch from 1960m peak with certified master pilot", "Breathtaking 360° views of Turquoise Lagoon", "HD GoPro photos & 360° video pack included", "Roundtrip hotel transfers included"],
        bestForRu: "Идеально для любителей адреналина и тех, кто хочет получить главные визитные карточки Турции для соцсетей.",
        bestForEn: "Best for thrill-seekers & capturing Turkey's most iconic Instagram photo opportunity.",
        recommendedAggregator: "Sputnik8"
    },
    {
        id: "12islands_boat",
        titleRu: "⛵ Морской круиз «12 Островов Гёчека» на двухпалубной яхте с обедом",
        titleEn: "⛵ 12 Islands of Göcek Boat Cruise with Fresh BBQ Lunch",
        format: "group",
        category: "boat",
        durationRu: "Полный день (09:30 – 17:30)",
        durationEn: "Full Day (09:30 – 17:30)",
        priceGroupRub: 3500,
        priceGroupEur: 35,
        pricePrivateRub: 38000,
        pricePrivateEur: 380,
        highlightsRu: ["Купание в 5 бирюзовых бухтах (Бухта Клеопатры, Яassıca, Терсане)", "Свежеприготовленный обед на палубе (рыба/курица гриль, мезе)", "Возможность увидеть дельфинов и морских черепах", "Остановки для снорклинга в прозрачной воде"],
        highlightsEn: ["Swimming at 5 pristine bays (Cleopatra Baths, Yassica Islands, Tersane)", "Freshly grilled BBQ lunch served onboard", "Possibility to spot wild dolphins & Caretta turtles", "Crystal clear snorkeling stops"],
        bestForRu: "Лучший выбор для спокойного семейного отдыха, загара и наслаждения чистейшим морем без усталости.",
        bestForEn: "Top family choice for relaxing, swimming in turquoise coves, and enjoying sea breezes.",
        recommendedAggregator: "Sputnik8"
    },
    {
        id: "saklikent_jeep",
        titleRu: "🚙 Джип-сафари в каньон Саклыкент, Тлос и водопады Гизликент",
        titleEn: "🚙 Off-Road Jeep Safari to Saklikent Gorge, Tlos Ruins & Gizlikent Waterfalls",
        format: "group",
        category: "adrenaline",
        durationRu: "Полный день (08:30 – 18:00)",
        durationEn: "Full Day (08:30 – 18:00)",
        priceGroupRub: 3200,
        priceGroupEur: 32,
        pricePrivateRub: 24000,
        pricePrivateEur: 240,
        highlightsRu: ["Захватывающие водные битвы между открытыми джипами", "Прогулка по дну второго по величине каньона в Европе (Саклыкент)", "Купание под прохладным струящимся водопадом Гизликент", "Посещение античного акрополя Тлос и скальных гробниц Ликии"],
        highlightsEn: ["Fun water fights between open-top safari jeeps", "Trekking inside Europe's 2nd largest canyon (Saklikent)", "Refreshing shower under secret Gizlikent waterfalls", "Exploring ancient Tlos acropolis & Lycian rock tombs"],
        bestForRu: "Максимум эмоций, веселья и освежающей прохлады в жаркий летний день. Подходит для активных компаний и семей с детьми.",
        bestForEn: "High energy, great fun, and cooling canyon waters on hot summer days.",
        recommendedAggregator: "Tripster"
    },
    {
        id: "dalyan_turtles",
        titleRu: "🐢 Речной круиз по Дальяну: Гробницы Ликии, Грязевые ванны и Черепаший пляж",
        titleEn: "🐢 Dalyan River Cruise: Lycian Kings Tombs, Mud Baths & Turtle Beach",
        format: "group",
        category: "nature",
        durationRu: "Полный день (08:00 – 18:30)",
        durationEn: "Full Day (08:00 – 18:30)",
        priceGroupRub: 4600,
        priceGroupEur: 46,
        pricePrivateRub: 32000,
        pricePrivateEur: 320,
        highlightsRu: ["Ловля и наблюдение гигантских черепах Caretta-Caretta (до 100 кг)", "Целебные сероводородные и минеральные грязевые ванны", "Вид с воды на грандиозные скальные гробницы царей Кауноса", "Отдых на знаменитом песчаном пляже Изтузу (где река встречается с морем)"],
        highlightsEn: ["Spotting wild giant Caretta-Caretta loggerhead turtles", "Therapeutic sulfur & mineral mud thermal pools", "Scenic boat ride past majestic Lycian Rock Tombs of Kaunos", "Relaxing at Iztuzu Beach dividing freshwater delta & Mediterranean"],
        bestForRu: "Уникальная оздоровительно-познавательная поездка, объединяющая природу, термальные источники и древнюю историю.",
        bestForEn: "Unique wellness & nature trip combining thermal healing waters, history, and protected wildlife.",
        recommendedAggregator: "Sputnik8"
    },
    {
        id: "kekova_myra",
        titleRu: "👑 Авторский тур: Затонувший город Кекова, Мира Ликийская и Каш",
        titleEn: "👑 Private Custom Tour: Sunken City Kekova, Myra & Bohemian Kaş",
        format: "private",
        category: "history",
        durationRu: "Индивидуально 9–10 часов",
        durationEn: "Private Day Tour (9–10 hours)",
        priceGroupRub: 6500,
        priceGroupEur: 65,
        pricePrivateRub: 28000,
        pricePrivateEur: 280,
        highlightsRu: ["Морская прогулка на лодке со стеклянным дном над руинами затонувшего города", "Посещение амфитеатра и гробниц древней столицы Мира (где служил Николай Чудотворец)", "Прогулка по узким улочкам и богемным кафе самого уютного городка Каш", "Личный гид-историк на комфортабельном кондиционированном авто/минивэне"],
        highlightsEn: ["Glass-bottom boat tour over ancient sunken ruins of Kekova", "Visiting St. Nicholas Church & monumental Lycian theater in Myra", "Strolling the bougainvillea alleys of charming coastal town Kaş", "Private expert historian guide with luxury VIP transport"],
        bestForRu: "Для ценителей глубокой истории, комфорта без туристических толп и индивидуального подхода.",
        bestForEn: "For discerning travelers seeking deep history, total flexibility, and VIP private guidance.",
        recommendedAggregator: "Tripster"
    }
];

export default function ExcursionsSmartHub({ locale = "ru" }: { locale?: string }) {
    const isRu = locale === 'ru';
    const isDe = locale === 'de';
    const isTr = locale === 'tr';

    const [selectedResort, setSelectedResort] = useState<string>("all");
    const [selectedFormat, setSelectedFormat] = useState<"all" | "group" | "private">("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const filteredExcursions = useMemo(() => {
        return allExcursions.filter((item) => {
            if (selectedFormat !== "all" && item.format !== selectedFormat) return false;
            if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
            return true;
        });
    }, [selectedFormat, selectedCategory]);

    const t = {
        badge: isRu ? "Интерактивный Агрегатор Экскурсий 2026" : isDe ? "Ausflugs- & Touren-Vergleich 2026" : isTr ? "Tur & Gezi Karşılaştırma 2026" : "Live Excursions & Tours Aggregator 2026",
        title: isRu ? "Групповые экскурсии и Авторские туры с местными гидами" : isDe ? "Gruppenausflüge und private Touren mit lokalen Guides vergleichen" : trTitle(isTr),
        subtitle: isRu ? "Прямые интеграции с лидерами рынка: Sputnik8 (лучшие групповые и морские туры) и Tripster (авторские индивидуальные маршруты от местных жителей без толпы)." : "Direct integration with top aggregators: Sputnik8 (best value group trips & boat charters) and Tripster (private custom tours with local expert guides).",
        filterResort: isRu ? "📍 Курорт / Откуда старт:" : "📍 Resort / Departure:",
        filterFormat: isRu ? "👥 Формат проведения:" : "👥 Tour Format:",
        filterCategory: isRu ? "🎯 Тематика тура:" : "🎯 Category:",
        btnSputnik: isRu ? "🎟️ Поиск и бронь на Sputnik8 (Групповые и морские туры со скидкой)" : "🎟️ Search & Book on Sputnik8 (Best Price Group & Boat Trips)",
        btnTripster: isRu ? "👑 Выбрать гида на Tripster (Авторские индивидуальные туры)" : "👑 Find Local Guide on Tripster (Private Custom Tours)",
        btnGetYourGuide: isRu ? "🌍 Проверить на GetYourGuide / Viator (Международные группы)" : "🌍 Check GetYourGuide / Viator (International Selection)",
        pricePrefixGroup: isRu ? "Групповой тариф от:" : "Group rate from:",
        pricePrefixPrivate: isRu ? "Индивидуальный тур (за всех):" : "Private tour (total per group):",
        durationLabel: isRu ? "⏱️ Длительность:" : "⏱️ Duration:",
        bestForLabel: isRu ? "💡 Для кого идеально:" : "💡 Recommended For:"
    };

    function trTitle(tr: boolean) {
        return tr ? "Dalaman Bölgesi Grup Turları ve Özel Rehberli Geziler" : "Group Excursions & Private Custom Tours with Local Guides";
    }

    const handleSputnikSearch = () => {
        let destination = "fethiye";
        if (selectedResort === "marmaris") destination = "marmaris";
        else if (selectedResort === "kas") destination = "kas";
        else if (selectedResort === "dalyan") destination = "dalyan";
        window.open(`https://www.sputnik8.com/ru/${destination}`, "_blank");
    };

    const handleTripsterSearch = () => {
        let destination = "Fethiye";
        if (selectedResort === "marmaris") destination = "Marmaris";
        else if (selectedResort === "kas") destination = "Kas";
        window.open(`https://experience.tripster.ru/experience/${destination}/`, "_blank");
    };

    const handleGetYourGuideSearch = () => {
        window.open("https://www.getyourguide.com/fethiye-l1373/", "_blank");
    };

    return (
        <section className="w-full space-y-12 my-8">
            {/* Main Hub Container */}
            <div className="bg-gradient-to-br from-white via-teal-50/40 to-sky-50/50 rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-teal-100/80 text-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-black shadow-lg shadow-teal-600/30">
                        <FaCompass size={20} />
                    </div>
                    <div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-teal-600 block">
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

                {/* FILTER CONTROLS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white/90 p-5 rounded-3xl border border-slate-200/80 shadow-sm mb-8">
                    {/* Resort */}
                    <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <FaMapMarkedAlt className="text-teal-600" /> {t.filterResort}
                        </span>
                        <select
                            value={selectedResort}
                            onChange={(e) => setSelectedResort(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-600 transition-all cursor-pointer shadow-sm"
                        >
                            <option value="all">🌐 Все курорты (Фетхие, Олюдениз, Мармарис, Каш)</option>
                            <option value="fethiye">📍 Фетхие, Гёчек и Олюдениз</option>
                            <option value="marmaris">📍 Мармарис и Ичмелер</option>
                            <option value="kas">📍 Каш и Калкан</option>
                            <option value="dalyan">📍 Дальян и Кёйджегиз</option>
                        </select>
                    </div>

                    {/* Format */}
                    <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <FaUsers className="text-sky-600" /> {t.filterFormat}
                        </span>
                        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl">
                            <button
                                onClick={() => setSelectedFormat("all")}
                                className={`py-2 px-2 text-[11px] font-black rounded-xl transition-all ${selectedFormat === "all" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                            >
                                Все
                            </button>
                            <button
                                onClick={() => setSelectedFormat("group")}
                                className={`py-2 px-2 text-[11px] font-black rounded-xl transition-all ${selectedFormat === "group" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                            >
                                👥 Групповые
                            </button>
                            <button
                                onClick={() => setSelectedFormat("private")}
                                className={`py-2 px-2 text-[11px] font-black rounded-xl transition-all ${selectedFormat === "private" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                            >
                                👑 Авторские
                            </button>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <FaMountain className="text-amber-500" /> {t.filterCategory}
                        </span>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-600 transition-all cursor-pointer shadow-sm"
                        >
                            <option value="all">🌟 Все категории (Экстрим, Море, История, Природа)</option>
                            <option value="adrenaline">🪂 Экстрим и Адреналин (Параплан, Рафтинг, Джипы)</option>
                            <option value="boat">⛵ Морские прогулки и Острова (Яхты, Бухты)</option>
                            <option value="history">🏛️ Античная Ликия и История (Кекова, Тлос, Мира)</option>
                            <option value="nature">🐢 Природа и Термальные ванны (Дальян, Черепахи)</option>
                        </select>
                    </div>
                </div>

                {/* BENCHMARK GRID */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-2">
                        <span>
                            Найдено топовых предложений: <strong className="text-slate-900">{filteredExcursions.length}</strong>
                        </span>
                        <span className="text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                            ✓ Ориентиры цен на сезон 2026 со страховкой
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredExcursions.map((exc) => (
                            <div
                                key={exc.id}
                                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-teal-500/50 transition-all flex flex-col justify-between space-y-5 shadow-md hover:shadow-xl"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                                                    exc.format === "group" ? "bg-blue-50 text-blue-800 border-blue-200" : "bg-purple-50 text-purple-800 border-purple-200"
                                                }`}>
                                                    {exc.format === "group" ? "👥 ГРУППОВОЙ ТУР" : "👑 ИНДИВИДУАЛЬНЫЙ (АВТОРСКИЙ)"}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                                    {exc.category === "adrenaline" ? "🔥 Экстрим" : exc.category === "boat" ? "⛵ Круиз" : exc.category === "history" ? "🏛️ История" : "🌿 Природа"}
                                                </span>
                                            </div>
                                            <h3 className="text-lg md:text-xl font-black text-slate-900 leading-snug">
                                                {isRu ? exc.titleRu : exc.titleEn}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-4">
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                                            <span className="text-[10px] text-slate-500 block font-bold">{t.durationLabel}</span>
                                            <span className="text-xs font-black text-slate-900">{isRu ? exc.durationRu : exc.durationEn}</span>
                                        </div>
                                        <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-200/60">
                                            <span className="text-[10px] text-teal-700 block font-bold">
                                                {exc.format === "group" ? t.pricePrefixGroup : t.pricePrefixPrivate}
                                            </span>
                                            <span className="text-sm font-black text-teal-900">
                                                {exc.format === "group" ? (isRu ? `${exc.priceGroupRub.toLocaleString()} ₽ (~€${exc.priceGroupEur})` : `€${exc.priceGroupEur} / pax`) : (isRu ? `${exc.pricePrivateRub.toLocaleString()} ₽ за группу` : `€${exc.pricePrivateEur} private group`)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-4">
                                        {(isRu ? exc.highlightsRu : exc.highlightsEn).map((point, idx) => (
                                            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 font-medium">
                                                <FaCheckCircle className="text-teal-600 flex-shrink-0 mt-0.5" />
                                                <span>{point}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xs text-slate-700 mt-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 leading-relaxed italic">
                                        💡 <strong className="text-teal-700">{t.bestForLabel}</strong> {isRu ? exc.bestForRu : exc.bestForEn}
                                    </p>
                                </div>

                                {/* Booking Gateway button depending on best match */}
                                {exc.format === "group" ? (
                                    <button
                                        onClick={handleSputnikSearch}
                                        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black py-4 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.01] transition-all"
                                    >
                                        <FaSearch size={15} />
                                        <span>{isRu ? "🎟️ Забронировать на Sputnik8 (Групповой со скидкой)" : "🎟️ Book Group Tour on Sputnik8"}</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleTripsterSearch}
                                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-4 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.01] transition-all"
                                    >
                                        <FaUserTie size={15} />
                                        <span>{isRu ? "👑 Забронировать на Tripster (Авторский индивидуальный тур)" : "👑 Book Private Guide on Tripster"}</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Direct Aggregator Buttons Strip */}
                <div className="mt-10 pt-8 border-t border-slate-200/80 space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 text-center">
                        {isRu ? "🔗 Быстрый переход в каталоги партнёров-агрегаторов (Фетхие, Мармарис, Каш, Дальян)" : "🔗 Direct Gateway to Official Tour Aggregators"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                            onClick={handleSputnikSearch}
                            className="w-full bg-teal-700 hover:bg-teal-600 text-white font-black py-4 px-4 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                        >
                            <FaExternalLinkAlt size={13} />
                            <span>{t.btnSputnik}</span>
                        </button>

                        <button
                            onClick={handleTripsterSearch}
                            className="w-full bg-purple-700 hover:bg-purple-600 text-white font-black py-4 px-4 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                        >
                            <FaExternalLinkAlt size={13} />
                            <span>{t.btnTripster}</span>
                        </button>

                        <button
                            onClick={handleGetYourGuideSearch}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-4 px-4 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                        >
                            <FaExternalLinkAlt size={13} />
                            <span>{t.btnGetYourGuide}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Why choose aggregators info banner */}
            <div className="bg-gradient-to-br from-teal-50/80 via-white to-sky-50/80 rounded-[2rem] p-6 md:p-8 border border-teal-100 space-y-3 text-slate-900 shadow-lg">
                <div className="flex items-center space-x-3 text-teal-800 font-black text-sm md:text-base uppercase tracking-tight">
                    <FaShieldAlt size={20} className="text-teal-600" />
                    <span>{isRu ? "🛡️ В чём преимущество онлайн-бронирования экскурсий через Sputnik8 и Tripster?" : "🛡️ Why Book Tours & Excursions Online?"}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    {isRu 
                        ? "Уличные агентства в курортных зонах (Фетхие, Олюдениз, Мармарис) часто продают экскурсии с непредсказуемым качеством гидов и скрытыми доплатами (за билеты в нацпарки или обеды). Бронирование через проверенные агрегаторы Sputnik8 (для групповых и морских туров) и Tripster (для авторских индивидуальных поездок с русскоязычными гидами) гарантирует вам официальную страховку, реальные отзывы туристов, фиксированную цену без накруток и бесплатную отмену за 48 часов."
                        : "Street agencies across resort towns often sell tours with mixed guide quality and hidden fees. Booking via trusted partners like Sputnik8 and Tripster ensures transparent pricing, verified customer reviews, full insurance coverage, and free cancellation up to 48 hours before departure."}
                </p>
            </div>
        </section>
    );
}
