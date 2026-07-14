import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaUserFriends, FaUtensils, FaCompass, FaChevronRight, FaMountain, FaCalendarAlt } from 'react-icons/fa';
import { getDictionary, Locale } from '@/lib/dictionary';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const isRu = params.locale === 'ru';
    return {
        title: isRu
            ? 'Коллекции впечатлений и Идеи выходного дня | Дача — Каш'
            : 'Curated Collections & Weekend Getaway Ideas | Dalaman Guide',
        description: isRu
            ? 'Авторские подборки маршрутов: романтические уикенды в Каше, семейный отдых в Дальяне, треккинговые тропы Ликии и гастрономические туры.'
            : 'Handpicked travel collections: romantic weekends in Kas, family retreats in Dalyan, Lycian Way trekking paths, and culinary road trips.'
    };
}

const getCollections = (locale: string, dict: any) => [
    {
        title: locale === 'ru' ? 'Романтика & Богемный Каш' : (dict?.main_content?.collections?.romantic || 'Romantic Kaş'),
        count: locale === 'ru' ? '48 часов на двоих' : '48 Hours for Two',
        image: "/api/images/locations/kas/ruines/kastombs/kastombs.jpg",
        tag: locale === 'ru' ? 'Уикенд' : 'Weekend',
        icon: <FaHeart />,
        description: locale === 'ru' 
            ? 'Уединенные бутик-отели Чукурбага, закат с вином в античном амфитеатре Antiphellos и приватная лодка над затонувшим городом Кекова.'
            : 'Secluded Çukurbağ villas, sunset wine inside the Antiphellos amphitheater, and private boats above sunken Kekova.',
        color: "bg-pink-500",
        href: `/${locale}/routes/weekends`
    },
    {
        title: locale === 'ru' ? 'Треккинг & Ликийская тропа' : 'Trekking & Lycian Way',
        count: locale === 'ru' ? '12+ горных этапов' : '12+ Mountain Stages',
        image: "/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg",
        tag: locale === 'ru' ? 'Атлас троп' : 'Trail Atlas',
        icon: <FaMountain />,
        description: locale === 'ru'
            ? 'Исчерпывающий интерактивный атлас: от Оваджика и Кабака до ущелья Саклыкент и Карийского пути. Перепады высот и источники воды.'
            : 'The definitive interactive trail atlas: from Ovacik and Kabak to Saklikent gorge and the Carian Trail. Elevations & water sources.',
        color: "bg-emerald-600",
        href: `/${locale}/routes/trekking`
    },
    {
        title: locale === 'ru' ? 'Семейный Дальян & Черепахи' : (dict?.main_content?.collections?.family || 'Family Dalyan & Turtles'),
        count: locale === 'ru' ? '48 часов эко-релакса' : '48 Hours Eco-Relax',
        image: "/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg",
        tag: locale === 'ru' ? 'С детьми' : 'Family',
        icon: <FaUserFriends />,
        description: locale === 'ru'
            ? 'Прогулка на лодке по тростниковым лабиринтам к пляжу Изтузу, встреча с черепахами Caretta, термы Султание и качели над рекой Юварлакчай.'
            : 'Reed-maze boat trips to Iztuzu turtle beach, Sultaniye thermal mud pools, and over-water wooden swings in Yuvarlakçay.',
        color: "bg-blue-500",
        href: `/${locale}/routes/weekends`
    },
    {
        title: locale === 'ru' ? 'Маршруты однодневных поездок' : 'Day Trips & Road Trips',
        count: locale === 'ru' ? '8 лучших авто-маршрутов' : '8 Top Road Trips',
        image: "/api/images/locations/dacha/ruine/knidos/knidos.jpg",
        tag: locale === 'ru' ? 'Роуд-трип' : 'Road Trip',
        icon: <FaCompass />,
        description: locale === 'ru'
            ? 'Куда поехать на один день из Даламана, Фетхие или Мармариса: античный Книдос, ветряные мельницы Кызлан и секретные бухты.'
            : 'Where to drive for a perfect day from Dalaman, Fethiye or Marmaris: ancient Knidos, Kizlan windmills and hidden coves.',
        color: "bg-amber-500",
        href: `/${locale}/articles/34_turisticheskie_marshruty_i_odnodnevnye_poezdki`
    }
];

const CollectionsPage = async ({ params }: { params: { locale: string } }) => {
    const locale = params.locale || 'ru';
    const dict = await getDictionary(locale as Locale);
    const list = getCollections(locale, dict);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
            <Header locale={locale} />
            
            <main className="flex-grow w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-8 py-24 pb-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest mb-4 border border-emerald-200/60 shadow-sm">
                        <FaCompass className="text-emerald-600" /> {locale === 'ru' ? 'АВТОРСКИЕ ГАЙДЫ И ПОДБОРКИ' : 'CURATED GUIDES & HUB'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase italic tracking-tight">
                        {locale === 'ru' ? 'Коллекции Впечатлений & Идеи Выходного Дня' : 'Curated Collections & Weekend Ideas'}
                    </h1>
                    <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed">
                        {locale === 'ru'
                            ? 'Мы собрали для вас готовые капсульные путешествия: от интерактивного атласа горных троп и 48-часовых уикендов с расчетом бюджета до гастрономических маршрутов и секретных пляжей без туристических толп.'
                            : 'We compiled turnkey capsule adventures: from our interactive mountain trail atlas and 48-hour weekend plans with inflation-shielded budgets to culinary road trips and hidden beaches.'}
                    </p>
                </div>

                {/* Quick Action Hub Banners */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                    <Link
                        href={`/${locale}/routes/weekends`}
                        className="group relative rounded-[2.5rem] p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl overflow-hidden border border-slate-700 hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                        <div className="flex items-center gap-3 text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">
                            <FaCalendarAlt size={16} /> {locale === 'ru' ? 'Готовые 48-часовые планы' : 'Turnkey 48-Hour Plans'}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight mb-2">
                            {locale === 'ru' ? 'Идеи Выходного Дня' : 'Weekend Getaway Ideas'}
                        </h3>
                        <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed mb-6">
                            {locale === 'ru' ? '4 проработанных таймлайна (Пятница вечер – Воскресенье) с бюджетом в евро и лирах на двоих, чек-листами и точными часами.' : '4 curated weekend timelines (Friday-Sunday) with 2-person budget breakdowns, checklists, and hour-by-hour schedules.'}
                        </p>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 group-hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-colors">
                            {locale === 'ru' ? 'Открыть уикенды →' : 'Explore Weekends →'}
                        </span>
                    </Link>

                    <Link
                        href={`/${locale}/routes/trekking`}
                        className="group relative rounded-[2.5rem] p-8 bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-2xl overflow-hidden border border-emerald-700/50 hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
                        <div className="flex items-center gap-3 text-emerald-300 text-xs font-black uppercase tracking-widest mb-3">
                            <FaMountain size={16} /> {locale === 'ru' ? 'Ликийская и Карийская тропы' : 'Lycian & Carian Trails'}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight mb-2">
                            {locale === 'ru' ? 'Атлас Треккинга' : 'Trekking & Trails Atlas'}
                        </h3>
                        <p className="text-emerald-100/90 text-xs md:text-sm font-medium leading-relaxed mb-6">
                            {locale === 'ru' ? '12+ этапов по часам и километрам с набором высот, фильтрами сложности и источниками питьевой воды (`Çeşme`).' : '12+ stages with exact distances, elevation gain/loss profiles, difficulty filters, and natural water fountain locations.'}
                        </p>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-950 group-hover:bg-emerald-100 font-black text-xs uppercase tracking-wider shadow-lg transition-colors">
                            {locale === 'ru' ? 'Открыть атлас троп →' : 'Explore Trail Atlas →'}
                        </span>
                    </Link>
                </div>

                {/* Collections Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {list.map((item, idx) => (
                        <div key={idx} className="group bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute top-6 right-6">
                                    <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-white border border-white/20">
                                        {item.tag}
                                    </span>
                                </div>
                                <div className="absolute bottom-6 left-8 flex items-center space-x-4">
                                    <div className={`p-3.5 rounded-2xl ${item.color} text-white shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div className="text-white">
                                        <h3 className="font-black text-xl leading-tight uppercase italic">{item.title}</h3>
                                        <p className="text-emerald-300 text-[10px] font-black uppercase tracking-widest mt-0.5">{item.count}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    {item.description}
                                </p>
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:text-emerald-700 transition-colors"
                                >
                                    <span>{locale === 'ru' ? 'Перейти в подборку' : 'Explore Collection'}</span>
                                    <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <FaChevronRight size={10} />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            
            <Footer locale={locale} />
        </div>
    );
};

export default CollectionsPage;
