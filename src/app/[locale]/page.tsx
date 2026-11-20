import React from 'react';
import type { Metadata } from 'next';
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";
import LeftSidebar from "../components/LeftSidebar";
import Footer from "../components/Footer";
import { buildPageMetadata } from '@/lib/seo';
import { getKaleidoscopeLocations } from '@/lib/kaleidoscope';

const homeMetaByLocale: Record<string, { title: string; description: string }> = {
    ru: {
        title: 'Dalaman.info — Путеводитель по Даламану и курортам побережья (Мармарис, Фетхие, Дальян, Датча, Каш)',
        description: 'Ваш экспертный гид по Даламану и курортам юго-запада Турции: Даламан, Сарыгерме, Дальян, Кёйджегиз, Мармарис, Датча, Гёджек, Фетхие, Олюдениз и Каш. Пляжи, маршруты, трансферы и советы.',
    },
    en: {
        title: 'Dalaman.info — Turquoise Coast Travel Guide (Dalaman, Fethiye, Marmaris,Datça, Kaş)',
        description: 'Your authoritative guide to Turkey’s Turquoise Coast around Dalaman (DLM): Datça, Marmaris, Köyceğiz, Dalyan, Dalaman, Göcek, Fethiye, and Kaş. Beaches, routes, airport transfers, and local tips.',
    },
    de: {
        title: 'Dalaman.info — Reiseführer für Dalaman & die Küste (Marmaris, Fethiye, Datça, Kaş)',
        description: 'Ihr Experten-Guide für die Küste rund um Dalaman (DLM): Datça, Marmaris, Köyceğiz, Dalyan, Dalaman, Göcek, Fethiye und Kaş. Strände, Routen und lokale Tipps.',
    },
    tr: {
        title: 'Dalaman.info — Dalaman ve Kıyı Bölgeleri Gezi Rehberi (Marmaris, Fethiye, Datça, Kaş)',
        description: 'Dalaman ve çevresi için kapsamlı gezi rehberi: Datça, Marmaris, Köyceğiz, Dalyan, Dalaman, Göcek, Fethiye ve Kaş. Plajlar, rotalar ve seyahat ipuçları.',
    },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale || 'ru';
    const meta = homeMetaByLocale[locale] || homeMetaByLocale['en'];
    return buildPageMetadata({
        locale,
        pathname: '',
        title: meta.title,
        description: meta.description,
        image: '/hero-bg.jpg',
    });
}

export default function Home({ params }: { params: { locale: string } }) {
    const locale = params.locale || 'en';
    const locationsPool = getKaleidoscopeLocations(locale);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header locale={locale} />
            <Hero locale={locale} />

            <div className="portal-container flex-grow py-4 lg:py-6">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Left Sidebar (Desktop) */}
                    <aside className="w-[275px] flex-shrink-0 hidden lg:block">
                        <LeftSidebar locale={locale} />
                    </aside>

                    {/* Center Main Content */}
                    <main className="flex-1 min-w-0 w-full">
                        <MainContent locale={locale} locationsPool={locationsPool} />
                    </main>

                    {/* Right Sidebar (Wide Desktop) */}
                    <aside className="w-[310px] flex-shrink-0 hidden xl:block">
                        <Sidebar locale={locale} />
                    </aside>
                </div>

                {/* Responsive Fallback Blocks for Mobile & Tablet so no navigation/planner content is lost */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 xl:hidden">
                    <div className="lg:hidden">
                        <LeftSidebar locale={locale} />
                    </div>
                    <div className="xl:hidden">
                        <Sidebar locale={locale} />
                    </div>
                </div>
            </div>

            <Footer locale={locale} />
        </div>
    );
}
