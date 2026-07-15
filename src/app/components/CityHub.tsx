"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUmbrellaBeach, FaHistory, FaBus, FaCompass, FaChevronRight, FaPlaneArrival, FaSun, FaHeart } from 'react-icons/fa';

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

const CityHub = ({ location, locationName, info, beaches, sights, transport, images = [], locale = 'en' }: CityHubProps) => {
    const dict = dictionaries[locale] || dictionaries['en'];
    // Hero image fallback logic
    const heroImage = images.length > 0 ? images[0] : `/api/images/locations/${location}/ruine/knidos/knidos.jpg`;

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${locale}${cleanPath}`;
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* City Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <Image
                    src={heroImage}
                    alt={locationName}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-[0.7] transform scale-105 hover:scale-110 transition-transform duration-[10s] ease-out"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-50" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.5em] mb-4 drop-shadow-lg animate-fade-in">
                        {dict.city_hub.turkish_coast}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl uppercase italic">
                        {locationName}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl font-medium leading-relaxed drop-shadow-xl italic">
                        {info.description || dict.city_hub.default_desc}
                    </p>
                </div>
            </section>

            <div className="w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-8 -mt-24 relative z-10 pb-20">
                {/* Glassmorphic Quick-Stats Bar */}
                {(() => {
                    const statsObj = quickStatsByCity[location] || quickStatsByCity['dalaman'];
                    const st = statsObj[locale] || statsObj['en'];
                    const ui = statsUiLabels[locale] || statsUiLabels['en'];
                    return (
                        <div className="bg-slate-900/95 backdrop-blur-2xl text-white rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-white/15 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center space-x-4 pt-2 md:pt-0">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                                    <FaPlaneArrival size={22} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">{ui.airport}</span>
                                    <span className="text-sm font-black text-white">{st.airport}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-8">
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                                    <FaSun size={22} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">{ui.season}</span>
                                    <span className="text-sm font-black text-white">{st.season}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-8">
                                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                                    <FaHeart size={22} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">{ui.vibe}</span>
                                    <span className="text-xs md:text-sm font-black text-white leading-tight block">{st.vibe}</span>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* Intro Section - Glass Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 premium-shadow border border-white/50 mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-8 uppercase italic leading-tight">
                                {dict.city_hub.magic_prefix}{locationName}: <br />
                                <span className="text-cyan-600">{dict.city_hub.magic_suffix}</span>
                            </h2>
                             <div
                                className="markdown-body prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-medium"
                                dangerouslySetInnerHTML={{ __html: info.contentHtml }}
                            />
                        </div>
                        <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2">
                            <Image
                                src={images[1] || heroImage}
                                alt="City Atmosphere"
                                layout="fill"
                                objectFit="cover"
                                className="hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Explore Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <FeatureHubCard
                        title={dict.city_hub.beaches_title}
                        description={dict.city_hub.beaches_desc}
                        icon={<FaUmbrellaBeach size={40} />}
                        href={localize(`/${location}/beaches`)}
                        color="bg-cyan-500"
                        image={images[2] || `/dalaman1.jpg`}
                        exploreText={dict.city_hub.explore}
                    />
                    <FeatureHubCard
                        title={dict.city_hub.history_title}
                        description={dict.city_hub.history_desc}
                        icon={<FaHistory size={40} />}
                        href={localize(`/${location}/sights`)}
                        color="bg-amber-600"
                        image={images[3] || `/dalaman2.jpg`}
                        exploreText={dict.city_hub.explore}
                    />
                    <FeatureHubCard
                        title={dict.city_hub.transport_title}
                        description={dict.city_hub.transport_desc}
                        icon={<FaBus size={40} />}
                        href={localize(`/${location}/transport`)}
                        color="bg-slate-800"
                        image={images[4] || `/dalaman1.jpg`}
                        exploreText={dict.city_hub.explore}
                    />
                </div>

                {/* Nearby Gems Section */}
                <div className="mb-20">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">
                                {dict.city_hub.gems_title}
                            </h2>
                            <p className="text-slate-500 font-medium">
                                {dict.city_hub.gems_subtitle}
                            </p>
                        </div>
                        <Link href={localize(`/${location}/guide`)} className="text-cyan-600 font-bold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider">
                            {dict.city_hub.full_guide} <FaChevronRight size={10} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {beaches && beaches.slice(0, 8).map((beach: any, idx: number) => {
                            const isPlaceholder = !beach.image || beach.image.includes('/dalaman');
                            return (
                                <Link href={localize(beach.href)} key={idx} className="group relative h-72 rounded-[2rem] overflow-hidden premium-shadow">
                                    <Image src={beach.image || '/dalaman1.jpg'} alt={beach.name} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-700" />
                                    {isPlaceholder && (
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[8px] font-black px-2 py-0.5 rounded border border-white/20 z-10 tracking-wider uppercase">
                                            {locale === 'ru' ? 'AI Placeholder / Сгенерировано ИИ' : 'AI Placeholder'}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="font-black text-lg uppercase italic">{beach.name}</h3>
                                        <p className="text-xs text-white/70 font-bold uppercase tracking-widest mt-1">
                                            {beach.label || "Пляж"}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureHubCard = ({ title, description, icon, href, color, image, exploreText }: any) => {
    const isPlaceholder = image && image.includes('/dalaman');
    return (
        <Link href={href} className="group relative h-[400px] rounded-[3rem] overflow-hidden premium-shadow flex flex-col justify-end p-10 hover:-translate-y-2 transition-all duration-500">
            <Image src={image} alt={title} layout="fill" objectFit="cover" className="brightness-50 group-hover:brightness-[0.35] transition-all duration-500" />
            {isPlaceholder && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black px-2.5 py-1 rounded border border-white/20 z-20 tracking-wider uppercase">
                    AI Placeholder / Сгенерировано ИИ
                </div>
            )}
            <div className={`absolute top-10 left-10 p-4 rounded-2xl ${color} text-white shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                {icon}
            </div>
            <div className="relative z-10 text-white">
                <h3 className="text-3xl font-black mb-3 uppercase italic leading-tight">{title}</h3>
                <p className="text-white/80 font-medium mb-6 leading-relaxed">{description}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
                    {exploreText} <FaChevronRight size={10} />
                </div>
            </div>
        </Link>
    );
};

export default CityHub;
