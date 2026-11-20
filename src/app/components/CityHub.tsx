"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUmbrellaBeach, FaHistory, FaBus, FaChevronRight, FaPlaneArrival, FaSun, FaHeart, FaHome, FaCompass } from 'react-icons/fa';
import { ALL_SATELLITES, type LocaleCode } from '@/lib/resorts-data';

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dictionaries: Record<string, any> = { ru, en, de, tr };

const quickStatsByCity: Record<string, Record<string, { airport: string, season: string, vibe: string }>> = {
    'dalaman': {
        ru: { airport: '~15 мин от DLM', season: 'Май – Октябрь', vibe: 'Аэропорт, река Даламан, термальные источники' },
        en: { airport: '~15 min from DLM', season: 'May – Oct', vibe: 'Gateway hub, river rafting, thermal springs' },
        de: { airport: '~15 Min vom DLM', season: 'Mai – Okt', vibe: 'Flughafen-Hub, Rafting, Thermalquellen' },
        tr: { airport: 'DLM den ~15 dk', season: 'Mayıs – Eki', vibe: 'Havalimanı merkezi, nehir raftingi, kaplıcalar' }
    },
    'gocek': {
        ru: { airport: '~25 мин от DLM', season: 'Апрель – Ноябрь', vibe: 'Столица яхтинга, 12 островов, люкс-марины' },
        en: { airport: '~25 min from DLM', season: 'Apr – Nov', vibe: 'Yachting capital, 12 islands, luxury marinas' },
        de: { airport: '~25 Min vom DLM', season: 'Apr – Nov', vibe: 'Jacht-Hauptstadt, 12 Inseln, Luxus-Marinas' },
        tr: { airport: 'DLM den ~25 dk', season: 'Nis – Kas', vibe: 'Yat başkenti, 12 adalar, lüks marinalar' }
    },
    'dalyan': {
        ru: { airport: '~35 мин от DLM', season: 'Май – Октябрь', vibe: 'Черепахи Caretta, гробницы Ликии, грязевые ванны' },
        en: { airport: '~35 min from DLM', season: 'May – Oct', vibe: 'Caretta sea turtles, Lycian tombs, mud baths' },
        de: { airport: '~35 Min vom DLM', season: 'Mai – Okt', vibe: 'Meeresschildkröten, Felsengräber, Schlammbäder' },
        tr: { airport: 'DLM den ~35 dk', season: 'Mayıs – Eki', vibe: 'Caretta kaplumbağaları, kral mezarları, çamur banyoları' }
    },
    'koycegiz': {
        ru: { airport: '~40 мин от DLM', season: 'Круглый год', vibe: 'Тихое озеро, эвкалипты, термальные ванны Султание' },
        en: { airport: '~40 min from DLM', season: 'Year-round', vibe: 'Peaceful lake, eucalyptus forest, Sultaniye spas' },
        de: { airport: '~40 Min vom DLM', season: 'Ganzjährig', vibe: 'Ruhiger See, Eukalyptuswälder, Thermalbäder' },
        tr: { airport: 'DLM den ~40 dk', season: 'Yıl boyu', vibe: 'Sakin göl, sığla ağaçları, Sultaniye kaplıcaları' }
    },
    'fethiye': {
        ru: { airport: '~45 мин от DLM', season: 'Май – Октябрь', vibe: 'Олюдениз, параглайдинг, каньон Саклыкент' },
        en: { airport: '~45 min from DLM', season: 'May – Oct', vibe: 'Oludeniz blue lagoon, paragliding, Saklikent gorge' },
        de: { airport: '~45 Min vom DLM', season: 'Mai – Okt', vibe: 'Ölüdeniz Blaue Lagune, Paragliding, Schlucht' },
        tr: { airport: 'DLM den ~45 dk', season: 'Mayıs – Eki', vibe: 'Ölüdeniz mavi lagün, yamaç paraşütü, kanyon' }
    },
    'marmaris': {
        ru: { airport: '~1ч 20м от DLM', season: 'Май – Октябрь', vibe: 'Энергичная ночная жизнь, замок, сосновые бухты' },
        en: { airport: '~1h 20m from DLM', season: 'May – Oct', vibe: 'Vibrant nightlife, castle, pine forest bays' },
        de: { airport: '~1h 20m vom DLM', season: 'Mai – Okt', vibe: 'Lebhaftes Nachtleben, Burg, Pinienbuchten' },
        tr: { airport: 'DLM den ~1s 20dk', season: 'Mayıs – Eki', vibe: 'Hareketli gece hayatı, tarihi kale, çam koyları' }
    },
    'dacha': {
        ru: { airport: '~2ч 15м от DLM', season: 'Июнь – Сентябрь', vibe: 'Миндаль, оливковое масло, руины Книдос, чистый воздух' },
        en: { airport: '~2h 15m from DLM', season: 'Jun – Sep', vibe: 'Almonds, olive oil, Knidos ruins, pristine air' },
        de: { airport: '~2h 15m vom DLM', season: 'Jun – Sep', vibe: 'Mandeln, Olivenöl, Knidos-Ruinen, reine Luft' },
        tr: { airport: 'DLM den ~2s 15dk', season: 'Haz – Eyl', vibe: 'Badem, zeytinyağı, Knidos antik kenti, tertemiz hava' }
    },
    'kas': {
        ru: { airport: '~2ч 30м от DLM', season: 'Май – Ноябрь', vibe: 'Богемный дайвинг, затонувший город Кекова, Капуташ' },
        en: { airport: '~2h 30m from DLM', season: 'May – Nov', vibe: 'Bohemian diving hub, sunken city Kekova, Kaputas' },
        de: { airport: '~2h 30m vom DLM', season: 'Mai – Nov', vibe: 'Tauchparadies, versunkene Stadt Kekova, Kaputaş' },
        tr: { airport: 'DLM den ~2s 30dk', season: 'Mayıs – Kas', vibe: 'Bohem dalış merkezi, batık şehir Kekova, Kaputaş' }
    }
};

const statsUiLabels: Record<string, { airport: string, season: string, vibe: string }> = {
    ru: { airport: 'Трансфер от аэропорта', season: 'Лучший сезон', vibe: 'Атмосфера и вайб' },
    en: { airport: 'Airport DLM Transfer', season: 'Best Season', vibe: 'Vibe & Highlights' },
    de: { airport: 'Transfer vom Flughafen', season: 'Beste Reisezeit', vibe: 'Atmosphäre & Highlights' },
    tr: { airport: 'Havalimanı Ulaşım', season: 'En İyi Sezon', vibe: 'Atmosfer ve Öne Çıkanlar' }
};

const hubNavLabels: Record<string, {
    home: string;
    allResorts: string;
    satellitesTitle: string;
    satellitesSubtitle: string;
    satellitesAllLink: string;
    satelliteBadgeBeach: string;
    satelliteBadgeVillage: string;
    readGuide: string;
    compareTitle: string;
    compareDesc: string;
    compareBtn: string;
}> = {
    ru: {
        home: 'Главная',
        allResorts: 'Все курорты',
        satellitesTitle: 'Спутники и атмосферные места рядом',
        satellitesSubtitle: 'Популярные пляжные базы и колоритные деревни, до которых удобно добираться из этого узла',
        satellitesAllLink: 'Все 15 спутников на карте обзора →',
        satelliteBadgeBeach: 'Пляжный спутник',
        satelliteBadgeVillage: 'Атмосферная деревня',
        readGuide: 'Читать гид',
        compareTitle: 'Сравнить с другими курортами побережья',
        compareDesc: 'Посмотрите расстояния от аэропорта DLM, тип пляжей, бюджет и кому какой из 8 курортов подойдёт лучше всего.',
        compareBtn: 'Смотреть и сравнить все 8 курортов',
    },
    en: {
        home: 'Home',
        allResorts: 'All Resorts',
        satellitesTitle: 'Nearby Satellites & Authentic Villages',
        satellitesSubtitle: 'Popular neighboring beach towns and half-day villages linked directly to this coastal hub',
        satellitesAllLink: 'See all 15 satellites in the overview →',
        satelliteBadgeBeach: 'Beach Satellite',
        satelliteBadgeVillage: 'Authentic Village',
        readGuide: 'Read Guide',
        compareTitle: 'Compare with Other Resorts on the Coast',
        compareDesc: 'Check DLM airport transfer times, beach types, budget levels, and find the best match among all 8 coastal hubs.',
        compareBtn: 'Compare All 8 Coastal Resorts',
    },
    de: {
        home: 'Startseite',
        allResorts: 'Alle Küstenorte',
        satellitesTitle: 'Badeorte & authentische Dörfer in der Nähe',
        satellitesSubtitle: 'Beliebte Strandorte und charaktervolle Dörfer rund um diesen Küstenort im direkten Überblick',
        satellitesAllLink: 'Alle 15 Orte im Regionen-Guide →',
        satelliteBadgeBeach: 'Badeort',
        satelliteBadgeVillage: 'Authentisches Dorf',
        readGuide: 'Guide lesen',
        compareTitle: 'Mit anderen Küstenorten vergleichen',
        compareDesc: 'Transferzeiten ab DLM, Strandtypen und Reisestile für alle 8 Urlaubsorte von Datça bis Kaş im Überblick.',
        compareBtn: 'Alle 8 Küstenorte vergleichen',
    },
    tr: {
        home: 'Ana Sayfa',
        allResorts: 'Tüm Bölgeler',
        satellitesTitle: 'Yakındaki Uydu Beldeler ve Otantik Köyler',
        satellitesSubtitle: 'Bu merkeze bağlı popüler sahil koyları ve yarım günlük gezi köyleri',
        satellitesAllLink: 'Tüm 15 uydu beldeyi karşılaştır →',
        satelliteBadgeBeach: 'Sahil Beldesi',
        satelliteBadgeVillage: 'Otantik Köy',
        readGuide: 'Rehberi Oku',
        compareTitle: 'Kıyıdaki Diğer Beldelerle Karşılaştırın',
        compareDesc: 'DLM’den transfer sürelerini, plaj tiplerini ve tüm 8 tatil merkezinin öne çıkan özelliklerini inceleyin.',
        compareBtn: 'Tüm 8 Tatil Beldesini Karşılaştır',
    },
};

interface CityHubProps {
    location: string;
    locationName: string;
    info: {
        title: string;
        description: string;
        contentHtml: string;
    };
    beaches?: any;
    sights?: any;
    transport?: any;
    images?: string[];
    locale?: string;
}

const CityHub = ({ location, locationName, info, beaches, images = [], locale = 'en' }: CityHubProps) => {
    const dict = dictionaries[locale] || dictionaries['en'];
    const navUi = hubNavLabels[locale] || hubNavLabels['en'];
    const activeLoc: LocaleCode = (['ru', 'en', 'de', 'tr'].includes(locale) ? locale : 'en') as LocaleCode;
    const citySatellites = ALL_SATELLITES.filter((s) => s.parentSlug === location);
    const heroImage = images.length > 0 ? images[0] : `/api/images/locations/${location}/ruine/knidos/knidos.jpg`;

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${locale}${cleanPath}`;
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* City Hero Section */}
            <section className="relative h-[55vh] min-h-[420px] overflow-hidden flex items-center">
                <Image
                    src={heroImage}
                    alt={locationName}
                    fill
                    className="object-cover transform scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/35 to-slate-950/75" />

                <div className="relative z-10 portal-container text-center px-4">
                    <div className="mb-4 flex justify-center">
                        <nav
                            aria-label="Breadcrumb"
                            className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-white/85 bg-slate-900/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15"
                        >
                            <Link href={localize('/')} className="hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors">
                                <FaHome size={11} className="text-cyan-300" />
                                <span>{navUi.home}</span>
                            </Link>
                            <FaChevronRight size={9} className="text-white/40" />
                            <Link href={localize('/city-guide')} className="hover:text-cyan-300 transition-colors">
                                {navUi.allResorts}
                            </Link>
                            <FaChevronRight size={9} className="text-white/40" />
                            <span className="text-white font-bold">{locationName}</span>
                        </nav>
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-cyan-300 font-bold text-xs uppercase tracking-widest mb-4">
                        {dict.city_hub.turkish_coast}
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-xl">
                        {locationName}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow">
                        {info.description || dict.city_hub.default_desc}
                    </p>
                </div>
            </section>

            <div className="portal-container -mt-12 relative z-10 pb-20">
                {/* Quick-Stats Bar */}
                {(() => {
                    const statsObj = quickStatsByCity[location] || quickStatsByCity['dalaman'];
                    const st = statsObj[locale] || statsObj['en'];
                    const ui = statsUiLabels[locale] || statsUiLabels['en'];
                    return (
                        <div className="bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl p-6 md:p-7 shadow-xl border border-white/15 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
                            <div className="flex items-center space-x-4 pt-2 md:pt-0">
                                <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                                    <FaPlaneArrival size={20} />
                                </div>
                                <div>
                                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">{ui.airport}</span>
                                    <span className="text-sm font-bold text-white">{st.airport}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-8">
                                <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                                    <FaSun size={20} />
                                </div>
                                <div>
                                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">{ui.season}</span>
                                    <span className="text-sm font-bold text-white">{st.season}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-8">
                                <div className="w-11 h-11 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                                    <FaHeart size={20} />
                                </div>
                                <div>
                                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">{ui.vibe}</span>
                                    <span className="text-xs md:text-sm font-bold text-white leading-snug block">{st.vibe}</span>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* Intro Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-slate-200/70 mb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-7">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                                {dict.city_hub.magic_prefix}{locationName}:{' '}
                                <span className="text-cyan-600">{dict.city_hub.magic_suffix}</span>
                            </h2>
                            <div
                                className="markdown-body max-w-none"
                                dangerouslySetInnerHTML={{ __html: info.contentHtml }}
                            />
                        </div>
                        <div className="lg:col-span-5 relative h-[360px] sm:h-[440px] rounded-2xl overflow-hidden shadow-md border border-slate-200/60">
                            <Image
                                src={images[1] || heroImage}
                                alt={`${locationName} atmosphere`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Explore Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <FeatureHubCard
                        title={dict.city_hub.beaches_title}
                        description={dict.city_hub.beaches_desc}
                        icon={<FaUmbrellaBeach size={28} />}
                        href={localize(`/${location}/beaches`)}
                        color="bg-cyan-600"
                        image={images[2] || `/dalaman1.jpg`}
                        exploreText={dict.city_hub.explore}
                    />
                    <FeatureHubCard
                        title={dict.city_hub.history_title}
                        description={dict.city_hub.history_desc}
                        icon={<FaHistory size={28} />}
                        href={localize(`/${location}/sights`)}
                        color="bg-amber-600"
                        image={images[3] || `/dalaman2.jpg`}
                        exploreText={dict.city_hub.explore}
                    />
                    <FeatureHubCard
                        title={dict.city_hub.transport_title}
                        description={dict.city_hub.transport_desc}
                        icon={<FaBus size={28} />}
                        href={localize(`/${location}/transport`)}
                        color="bg-slate-800"
                        image={images[4] || `/dalaman1.jpg`}
                        exploreText={dict.city_hub.explore}
                    />
                </div>

                {/* Nearby Gems Section */}
                <div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-3">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                                {dict.city_hub.gems_title}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">
                                {dict.city_hub.gems_subtitle}
                            </p>
                        </div>
                        <Link
                            href={localize(`/${location}/beaches`)}
                            className="text-cyan-600 font-bold text-xs hover:text-cyan-700 flex items-center gap-1.5 uppercase tracking-wider"
                        >
                            {dict.city_hub.beaches_title} <FaChevronRight size={10} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {beaches && beaches.slice(0, 8).map((beach: any, idx: number) => {
                            const isPlaceholder = !beach.image || beach.image.includes('/dalaman');
                            return (
                                <Link
                                    href={localize(beach.href)}
                                    key={idx}
                                    className="group relative h-64 rounded-2xl overflow-hidden shadow-sm border border-slate-200/70 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                                >
                                    <Image
                                        src={beach.image || '/dalaman1.jpg'}
                                        alt={beach.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {isPlaceholder && (
                                        <div className="absolute top-3 right-3 bg-slate-900/65 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-0.5 rounded border border-white/20 z-10">
                                            AI Illustration
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />
                                    <div className="absolute bottom-5 left-5 right-5 text-white">
                                        <h3 className="font-bold text-base leading-snug group-hover:text-cyan-300 transition-colors">{beach.name}</h3>
                                        <p className="text-[11px] text-white/75 font-semibold uppercase tracking-wider mt-1">
                                            {beach.label || (locale === 'ru' ? 'Пляж' : 'Beach')}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Nearby Satellites & Authentic Villages */}
                    {citySatellites.length > 0 && (
                        <div className="mt-12">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-3">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                                        {navUi.satellitesTitle}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                        {navUi.satellitesSubtitle}
                                    </p>
                                </div>
                                <Link
                                    href={localize('/city-guide#satellites')}
                                    className="text-cyan-600 font-bold text-xs hover:text-cyan-700 whitespace-nowrap flex-shrink-0"
                                >
                                    {navUi.satellitesAllLink}
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {citySatellites.map((sat) => {
                                    const isBeach = sat.kind === 'beach_hub';
                                    return (
                                        <Link
                                            key={sat.id}
                                            href={localize(sat.href)}
                                            className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 hover:border-cyan-300 hover:shadow-md transition-all flex flex-col justify-between gap-3"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span
                                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                            isBeach ? 'bg-cyan-50 text-cyan-700' : 'bg-emerald-50 text-emerald-700'
                                                        }`}
                                                    >
                                                        {isBeach ? navUi.satelliteBadgeBeach : navUi.satelliteBadgeVillage}
                                                    </span>
                                                    <span className="text-[11px] font-medium text-slate-400 truncate">
                                                        {sat.meta[activeLoc] || sat.meta.en}
                                                    </span>
                                                </div>
                                                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                                                    {sat.name[activeLoc] || sat.name.en}
                                                </h3>
                                                <p className="text-xs text-slate-600 leading-relaxed">
                                                    {sat.summary[activeLoc] || sat.summary.en}
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 group-hover:text-cyan-700 pt-1">
                                                <span>{navUi.readGuide}</span>
                                                <FaChevronRight size={9} />
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Compare all resorts CTA strip */}
                    <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
                                <FaCompass size={20} />
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1">
                                    {navUi.compareTitle}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                                    {navUi.compareDesc}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={localize('/city-guide')}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex-shrink-0"
                        >
                            <span>{navUi.compareBtn}</span>
                            <FaChevronRight size={10} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureHubCard = ({ title, description, icon, href, color, image, exploreText }: any) => {
    const isPlaceholder = image && image.includes('/dalaman');
    return (
        <Link
            href={href}
            className="group relative h-[340px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/70 flex flex-col justify-end p-7 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/45 to-slate-900/20" />
            {isPlaceholder && (
                <div className="absolute top-4 right-4 bg-slate-900/65 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-0.5 rounded border border-white/20 z-20">
                    AI Illustration
                </div>
            )}
            <div className={`absolute top-6 left-6 w-12 h-12 rounded-xl ${color} text-white shadow-md flex items-center justify-center`}>
                {icon}
            </div>
            <div className="relative z-10 text-white">
                <h3 className="text-2xl font-extrabold mb-2 leading-tight">{title}</h3>
                <p className="text-white/85 text-sm mb-5 leading-relaxed">{description}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300 group-hover:text-cyan-200 transition-colors">
                    {exploreText} <FaChevronRight size={10} />
                </div>
            </div>
        </Link>
    );
};

export default CityHub;
