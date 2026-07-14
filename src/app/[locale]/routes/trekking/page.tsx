import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import TrekkingAtlas from '@/app/components/TrekkingAtlas';
import Link from 'next/link';
import { FaChevronLeft, FaRoute, FaCompass } from 'react-icons/fa';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const isRu = params.locale === 'ru';
    return {
        title: isRu
            ? 'Треккинг и Хайкинг в Турции: Атлас Ликийской и Карийской троп | Дача — Каш'
            : 'Trekking & Hiking in Turkey: Lycian & Carian Trail Atlas | Dalaman Guide',
        description: isRu
            ? 'Исчерпывающий интерактивный атлас пешеходных маршрутов Ликийской и Карийской троп. Перепады высот, источники воды, GPS координаты и уровни сложности.'
            : 'Definitive interactive atlas of hiking trails across the Lycian Way and Carian Trail. Elevation profiles, drinking fountains, GPS waypoints, and stage difficulty ratings.',
        openGraph: {
            title: isRu ? 'Атлас Треккинга Ликийской Тропы' : 'Lycian Way Trekking Atlas',
            description: isRu ? 'Все этапы и тропы: от Оваджика до Каша и полуострова Датча' : 'All stages and trails: from Ovacik to Kas and Datca Peninsula',
            images: ['/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg']
        }
    };
}

export default function TrekkingRoutesPage({ params: { locale } }: { params: { locale: string } }) {
    const isRu = locale === 'ru';
    
    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
            <Header />

            {/* Sub-Header Breadcrumb & Navigation */}
            <div className="bg-slate-900 text-white pt-24 pb-12 px-4 border-b border-slate-800">
                <div className="w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link 
                            href={`/${locale}/routes`}
                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors mb-3"
                        >
                            <FaChevronLeft size={10} /> {isRu ? 'Назад к общим маршрутам и логистике' : 'Back to Routes & Logistics'}
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight text-white flex items-center gap-3">
                            <FaCompass className="text-emerald-500" /> {isRu ? 'Центр Треккинга и Троп' : 'Trekking & Trails Center'}
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:self-end">
                        <Link
                            href={`/${locale}/collections`}
                            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black uppercase tracking-wider border border-slate-700 transition-all"
                        >
                            {isRu ? '🗂️ Коллекции уикендов' : '🗂️ Weekend Collections'}
                        </Link>
                        <Link
                            href={`/${locale}/articles/trekking`}
                            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black uppercase tracking-wider border border-slate-700 transition-all"
                        >
                            {isRu ? '🥾 Гид и Советы' : '🥾 Guide & Tips'}
                        </Link>
                        <Link
                            href={`/${locale}/articles/trekking-routes-lycian-coast`}
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30"
                        >
                            {isRu ? '📖 Статья: Маршруты троп' : '📖 Guide: Coastal Trails'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Interactive Atlas Section */}
            <div className="flex-grow py-12 md:py-20 px-4">
                <div className="w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-8">
                    <TrekkingAtlas locale={locale} />
                </div>
            </div>

            <Footer />
        </main>
    );
}
