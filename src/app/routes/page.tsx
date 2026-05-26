import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { FaCar, FaCalendarAlt, FaInfoCircle, FaMapMarkerAlt, FaClock, FaRoute, FaCompass } from 'react-icons/fa';

const itineraries = [
    {
        title: "Древняя Эллада и дикие бухты",
        subtitle: "Полуостров Датча",
        distance: "110 км",
        duration: "1 день",
        description: "Путешествие по узкому и дикому полуострову Датча. От ветряных мельниц Кызлан до античного амфитеатра Афродиты в Книдосе на стыке двух морей.",
        image: "/api/images/locations/dacha/ruine/knidos/knidos.jpg",
        stops: [
            { name: "Мельницы Кызлан", desc: "Фотосессия у старинных каменных башен XIX века." },
            { name: "Старая Датча (Eski Datça)", desc: "Прогулка по каменным улочкам, увитым бугенвиллеями." },
            { name: "Бухта Карги (Kargı)", desc: "Купание и обед со свежей рыбой в спокойной галечной бухте." },
            { name: "Античный Книдос", desc: "Провожаем закат у маяка на самой западной точке полуострова." }
        ],
        mapsQuery: "Eski Datca to Knidos"
    },
    {
        title: "Ликийское ожерелье: каньоны, черепахи и руины",
        subtitle: "Маршрут из Фетхие",
        distance: "150 км",
        duration: "1-2 дня",
        description: "Классический ликийский роуд-трип. Сочетание прохлады горного каньона, загадочного города-призрака Каякёй и золотых дюн древней Патары.",
        image: "/api/images/locations/kas/ruines/patara/patara.jpg",
        stops: [
            { name: "Город-призрак Каякёй", desc: "Заброшенная греческая деревня на холмах." },
            { name: "Каньон Саклыкент", desc: "Пешая прогулка по дну гигантского ущелья в ледяной воде." },
            { name: "Руины Патары", desc: "Осмотр римского маяка Нерона и древнего парламента." },
            { name: "Песчаные дюны Патары", desc: "Провожаем солнце на бесконечном 18-километровом пляже." }
        ],
        mapsQuery: "Kayakoy to Saklikent to Patara Ancient City"
    },
    {
        title: "Озера, черепахи и термальные ванны",
        subtitle: "Круг по Кёйджегизу и Дальяну",
        distance: "85 км",
        duration: "1 день",
        description: "Оздоровительно-природный маршрут. Купание в минеральных источниках, лодочный круиз мимо гробниц и отдых на заповедной песчаной косе.",
        image: "/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg",
        stops: [
            { name: "Набережная Кёйджегиза", desc: "Утренний кофе под амбровыми деревьями у пресного озера." },
            { name: "Термальные источники Султание", desc: "Омолаживающие ванны с лечебной грязью и радоном." },
            { name: "Река Дальян и гробницы Кавна", desc: "Вид на высеченные в скалах усыпальницы ликийских царей." },
            { name: "Черепаший пляж Изтузу", desc: "Отдых на песчаной косе между рекой и морем." }
        ],
        mapsQuery: "Koycegiz to Sultaniye Hot Springs to Dalyan to Iztuzu Beach"
    }
];

const markets = [
    { day: "Понедельник", places: [
        { name: "Кёйджегиз (Köyceğiz)", type: "Главный городской базар у озера — фрукты, мед, текстиль" },
        { name: "Дальян (Dalyan)", type: "Локальный продуктовый рынок" }
    ]},
    { day: "Вторник", places: [
        { name: "Фетхие (Fethiye)", type: "Самый большой вещевой и продуктовый базар региона (текстиль, сувениры)" }
    ]},
    { day: "Среда", places: [
        { name: "Фетхие / Чалыш (Çalış)", type: "Средний продуктовый базар рядом с пляжем" }
    ]},
    { day: "Четверг", places: [
        { name: "Мармарис (Marmaris)", type: "Большой рынок в центре города" },
        { name: "Гёджек (Göcek)", type: "Популярный фермерский рынок у марины" }
    ]},
    { day: "Пятница", places: [
        { name: "Фетхие (Fethiye)", type: "Крупный продуктовый рынок (сыры, овощи, оливки)" }
    ]},
    { day: "Суббота", places: [
        { name: "Дальян (Dalyan)", type: "Традиционный базар с сувенирами и сладостями" },
        { name: "Ортаджа (Ortaca)", type: "Аутентичный фермерский рынок для местных" }
    ]},
    { day: "Воскресенье", places: [
        { name: "Ичмелер (İçmeler)", type: "Небольшой рынок в курортной зоне Мармариса" },
        { name: "Гёджек (Göcek)", type: "Воскресные продуктовые ряды" }
    ]}
];

const RoutesPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-12 pb-20">
                {/* Intro */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">ПУТЕШЕСТВИЯ НА АВТО</span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">
                        Маршруты и логистика
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Готовые автодорожные маршруты, актуальный календарь местных рынков и важные советы по логистике для самостоятельной поездки.
                    </p>
                </div>

                {/* Section 1: Itineraries */}
                <div className="space-y-16 mb-24">
                    <div className="border-b border-slate-200 pb-4 mb-8">
                        <h2 className="text-2xl font-black text-slate-800 uppercase italic flex items-center gap-2">
                            <FaRoute className="text-cyan-600" /> Готовые автомобильные маршруты
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {itineraries.map((itinerary, index) => (
                            <div key={index} className="group bg-white rounded-[2.5rem] overflow-hidden premium-shadow border border-slate-100 flex flex-col hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-56 w-full">
                                    <img
                                        src={itinerary.image}
                                        alt={itinerary.title}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                        <div>
                                            <span className="px-3 py-1 bg-cyan-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider mb-2 inline-block">
                                                {itinerary.subtitle}
                                            </span>
                                            <h3 className="text-white font-black text-lg uppercase italic leading-tight">{itinerary.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center space-x-6 text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">
                                            <span className="flex items-center gap-1.5"><FaCompass /> {itinerary.distance}</span>
                                            <span className="flex items-center gap-1.5"><FaClock /> {itinerary.duration}</span>
                                        </div>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                                            {itinerary.description}
                                        </p>
                                        <div className="space-y-4 mb-8">
                                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Ключевые точки:</h4>
                                            <ol className="space-y-3">
                                                {itinerary.stops.map((stop, sIdx) => (
                                                    <li key={sIdx} className="flex gap-3 text-xs text-slate-600 font-medium leading-normal">
                                                        <span className="w-5 h-5 rounded-full bg-cyan-50 text-cyan-600 font-bold flex items-center justify-center flex-shrink-0">{sIdx + 1}</span>
                                                        <div>
                                                            <strong className="text-slate-800">{stop.name}</strong> — {stop.desc}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(itinerary.mapsQuery)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center block bg-cyan-600 text-white py-3.5 rounded-2xl hover:bg-cyan-700 font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-cyan-100"
                                    >
                                        Открыть маршрут на карте
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Market Calendar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    <div className="lg:col-span-8">
                        <div className="border-b border-slate-200 pb-4 mb-8">
                            <h2 className="text-2xl font-black text-slate-800 uppercase italic flex items-center gap-2">
                                <FaCalendarAlt className="text-cyan-600" /> Календарь кочующих рынков (Базары)
                            </h2>
                        </div>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                            В Турции фермерский рынок («pazar») — это главное событие недели для покупки свежайших продуктов, местных сыров, оливок, приправ и домашнего оливкового масла. Рынок кочует из города в город по расписанию:
                        </p>

                        <div className="bg-white rounded-[2.5rem] overflow-hidden premium-shadow border border-slate-100 divide-y divide-slate-100">
                            {markets.map((dayItem, idx) => (
                                <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start hover:bg-slate-50/50 transition-colors">
                                    <div className="w-full md:w-32 flex-shrink-0">
                                        <span className="inline-block px-4 py-1.5 bg-cyan-50 text-cyan-700 rounded-full text-xs font-black uppercase tracking-wider">
                                            {dayItem.day}
                                        </span>
                                    </div>
                                    <div className="flex-grow space-y-3">
                                        {dayItem.places.map((place, pIdx) => (
                                            <div key={pIdx} className="text-sm">
                                                <h4 className="font-bold text-slate-800">{place.name}</h4>
                                                <p className="text-slate-400 text-xs mt-0.5">{place.type}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Road Logistics */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="border-b border-slate-200 pb-4 mb-8">
                            <h2 className="text-2xl font-black text-slate-800 uppercase italic flex items-center gap-2">
                                <FaInfoCircle className="text-cyan-600" /> Дорожная логистика
                            </h2>
                        </div>

                        <div className="bg-white rounded-[2rem] p-6 premium-shadow border border-slate-100 space-y-6">
                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Оплата дорог (HGS)
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                    Для проезда по платным мостам и автобанам в Турции используется бесконтактный стикер HGS, крепящийся на лобовое стекло. Если вы арендуете машину, система обычно встроена, и счет выставляется при сдаче. Для личного авто стикер покупается в любом отделении почты PTT.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Аренда авто и залог
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                    Рекомендуется бронировать автомобили с полной страховкой (Full Casco). При оформлении блокируется франшиза на кредитной карте (от 100 до 300 евро). Проверяйте наличие HGS-чипа при получении машины.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Парковка в Каше и Мармарисе
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                    Парковки в центрах городов платные. В Каше пользуйтесь муниципальной парковкой у порта (Каш Марина). В Фетхие и Мармарисе работают парковщики в жилетах (система IsPark), принимающие оплату на месте.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Горные дороги и серпантины
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                    Трасса D400 — отличного качества, четырехполосная. Однако съезды к уединенным бухтам (например, Кабак или Чифтебюк) — это грунтовые или узкие горные серпантины. Будьте предельно осторожны при езде в темное время суток.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RoutesPage;
