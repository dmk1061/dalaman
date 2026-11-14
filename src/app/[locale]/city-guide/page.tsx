import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { buildPageMetadata } from '@/lib/seo';

interface CityGuideTranslation {
    home: string;
    guide: string;
    backHome: string;
    sidebarTitle: string;
    sidebar: {
        collections: string;
        beaches: string;
        villages: string;
        sights: string;
        flights: string;
        bus: string;
    };
    eyebrow: string;
    title: string;
    intro: string;
    openSection: string;
    cards: {
        villages: string;
        beaches: string;
        collections: string;
        map: string;
    };
}

const cityGuideTranslations: Record<string, CityGuideTranslation> = {
    ru: {
        home: 'Главная',
        guide: 'Путеводитель',
        backHome: '← Назад на главную',
        sidebarTitle: 'Городской путеводитель',
        sidebar: {
            collections: 'ОБЪЕКТЫ И КОЛЛЕКЦИИ',
            beaches: 'ПЛЯЖИ',
            villages: 'ДЕРЕВНИ',
            sights: 'МЕСТА ДЛЯ ПОСЕЩЕНИЯ',
            flights: 'АВИАСООБЩЕНИЕ',
            bus: 'АВТОБУСНЫЙ ТЕРМИНАЛ',
        },
        eyebrow: 'ОБЗОР РЕГИОНА',
        title: 'Путеводитель по побережью',
        intro: 'Добро пожаловать в интерактивный путеводитель по Ликийскому и Карийскому побережью от Датчи до Каша. Наш регион славится невероятным разнообразием: от уютных прибрежных городков до древних античных руин и диких лазурных пляжей. Выберите интересующую категорию ниже, чтобы спланировать свое идеальное путешествие.',
        openSection: 'Открыть раздел →',
        cards: {
            villages: 'Деревни и поселки',
            beaches: 'Лучшие пляжи',
            collections: 'Коллекции мест',
            map: 'Карта мест',
        },
    },
    en: {
        home: 'Home',
        guide: 'Guide',
        backHome: '← Back Home',
        sidebarTitle: 'City Guide',
        sidebar: {
            collections: 'COLLECTIONS',
            beaches: 'BEACHES',
            villages: 'VILLAGES',
            sights: 'SIGHTS',
            flights: 'FLIGHTS',
            bus: 'BUS TERMINAL',
        },
        eyebrow: 'REGION OVERVIEW',
        title: 'Coast Guide',
        intro: 'Welcome to the interactive guide to the Turquoise Coast from Datça to Kaş. Our region is famous for its incredible diversity: from cozy coastal towns to ancient Lycian ruins and wild azure beaches. Select a category below to plan your perfect trip.',
        openSection: 'Open Section →',
        cards: {
            villages: 'Villages & Settlements',
            beaches: 'Best Beaches',
            collections: 'Curated Collections',
            map: 'Interactive Map',
        },
    },
    de: {
        home: 'Startseite',
        guide: 'Reiseführer',
        backHome: '← Zurück zur Startseite',
        sidebarTitle: 'Küstenführer',
        sidebar: {
            collections: 'SAMMLUNGEN',
            beaches: 'STRÄNDE',
            villages: 'DÖRFER',
            sights: 'SEHENSWÜRDIGKEITEN',
            flights: 'FLÜGE',
            bus: 'BUSBAHNHOF',
        },
        eyebrow: 'REGIONSÜBERBLICK',
        title: 'Küstenführer: Datça bis Kaş',
        intro: 'Willkommen im interaktiven Reiseführer für die lykische und karische Küste. Unsere Region besticht durch ihre Vielfalt: von idyllischen Küstendörfern über antike Stätten bis hin zu türkisfarbenen Buchten. Wählen Sie unten eine Kategorie, um Ihre Reise zu planen.',
        openSection: 'Bereich öffnen →',
        cards: {
            villages: 'Dörfer & Kleinstädte',
            beaches: 'Die schönsten Strände',
            collections: 'Kuratierte Sammlungen',
            map: 'Interaktive Karte',
        },
    },
    tr: {
        home: 'Ana Sayfa',
        guide: 'Rehber',
        backHome: '← Ana Sayfaya Dön',
        sidebarTitle: 'Bölge Rehberi',
        sidebar: {
            collections: 'KOLEKSİYONLAR',
            beaches: 'PLAJLAR',
            villages: 'KÖYLER',
            sights: 'GEZİLECEK YERLER',
            flights: 'UÇUŞLAR',
            bus: 'OTOBÜS TERMİNALİ',
        },
        eyebrow: 'BÖLGEYE GENEL BAKIŞ',
        title: 'Turkuaz Kıyılar Rehberi',
        intro: 'Datça’dan Kaş’a uzanan eşsiz kıyı şeridinin interaktif gezi rehberine hoş geldiniz. Bölgemiz şirin sahil kasabalarından antik Likya kentlerine ve el değmemiş koylara kadar büyüleyici bir çeşitlilik sunar. Seyahatinizi planlamak için aşağıdan bir kategori seçin.',
        openSection: 'Bölümü Aç →',
        cards: {
            villages: 'Köyler ve Kasabalar',
            beaches: 'En İyi Plajlar',
            collections: 'Özel Koleksiyonlar',
            map: 'İnteraktif Harita',
        },
    },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale || 'en';
    const t = cityGuideTranslations[locale] || cityGuideTranslations['en'];
    return buildPageMetadata({
        locale,
        pathname: '/city-guide',
        title: `${t.title} — ${t.sidebarTitle}`,
        description: t.intro.slice(0, 158),
        image: '/dalaman1.jpg',
    });
}

const CityGuidePage = ({ params }: { params: { locale: string } }) => {
    const locale = params.locale || 'en';
    const t = cityGuideTranslations[locale] || cityGuideTranslations['en'];

    const localize = (path: string) => {
      if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `/${locale}${cleanPath}`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header locale={locale} />

            <main className="flex-grow container mx-auto px-4 py-8 pb-20">
                {/* Breadcrumbs */}
                <div className="flex items-center justify-between mb-8 text-xs font-black uppercase tracking-widest text-slate-400">
                    <div className="flex items-center space-x-2">
                        <Link href={localize('/')} className="hover:text-cyan-600 transition-colors">
                            {t.home}
                        </Link>
                        <span>/</span>
                        <span className="text-slate-600">
                            {t.guide}
                        </span>
                    </div>
                    <Link href={localize('/')} className="bg-slate-200 hover:bg-cyan-600 hover:text-white text-slate-700 px-5 py-2.5 rounded-full transition-all duration-300 text-[10px]">
                        {t.backHome}
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                            <div className="bg-cyan-600 text-white px-6 py-4">
                                <h3 className="font-black text-sm uppercase tracking-widest italic">
                                    {t.sidebarTitle}
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <SidebarItem title={t.sidebar.collections} href={localize('/collections')} />
                                <SidebarItem title={t.sidebar.beaches} href={localize('/beaches')} />
                                <SidebarItem title={t.sidebar.villages} href={localize('/city-guide/small-towns')} />
                                <SidebarItem title={t.sidebar.sights} href={localize('/city-guide')} active />
                                <SidebarItem title={t.sidebar.flights} href={localize('/articles/airport-dalaman')} />
                                <SidebarItem title={t.sidebar.bus} href={localize('/articles/transport')} />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 mb-8">
                            <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">
                                {t.eyebrow}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 uppercase italic">
                                {t.title}
                            </h1>
                            <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                {t.intro}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <GuideImageCard
                                    title={t.cards.villages}
                                    image="/dalaman1.jpg"
                                    href={localize('/city-guide/small-towns')}
                                    openLabel={t.openSection}
                                />
                                <GuideImageCard
                                    title={t.cards.beaches}
                                    image="/dalaman2.jpg"
                                    href={localize('/beaches')}
                                    openLabel={t.openSection}
                                />
                                <GuideImageCard
                                    title={t.cards.collections}
                                    image="/dalaman1.jpg"
                                    href={localize('/collections')}
                                    openLabel={t.openSection}
                                />
                                <GuideImageCard
                                    title={t.cards.map}
                                    image="/dalaman2.jpg"
                                    href={localize('/map')}
                                    openLabel={t.openSection}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer locale={locale} />
        </div>
    );
};

const SidebarItem = ({ title, href, active = false }: { title: string, href: string, active?: boolean }) => (
    <Link href={href} className={`px-5 py-4 cursor-pointer flex items-center justify-between transition-all duration-300 ${active ? 'bg-cyan-50/80 text-cyan-600 font-black border-l-4 border-cyan-600' : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-50/50'}`}>
        <span className="text-[13px] font-bold uppercase tracking-wider italic">{title}</span>
        <span className={`${active ? 'text-cyan-600' : 'text-slate-400 group-hover:text-cyan-600'} transition-colors`}>&gt;</span>
    </Link>
);

const GuideImageCard = ({ title, image, href, openLabel }: { title: string, image: string, href: string, openLabel: string }) => (
    <Link href={href} className="group relative rounded-[2rem] overflow-hidden premium-shadow cursor-pointer h-56 block border border-slate-100 hover:-translate-y-1 transition-all duration-300">
        <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
            <span className="text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                {openLabel}
            </span>
            <h3 className="text-white font-black text-xl uppercase italic tracking-wide">
                {title}
            </h3>
        </div>
    </Link>
);

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'ru' },
        { locale: 'de' },
        { locale: 'tr' },
    ];
}

export default CityGuidePage;
