import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import WeekendHub from '@/app/components/WeekendHub';
import Link from 'next/link';
import { FaChevronLeft, FaCalendarAlt, FaCompass } from 'react-icons/fa';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

const weekendsMetaByLocale: Record<string, { title: string; description: string }> = {
    ru: {
        title: 'Идеи выходного дня: Готовые 48-часовые уикенды на Ликийском побережье | Дача — Каш',
        description: 'Пошаговые 48-часовые сценарии идеальных выходных в Каше, Дальяне, Олюденизе и Датче. Расписание по часам, бюджет на двоих в евро и лирах и чек-листы в дорогу.',
    },
    en: {
        title: 'Weekend Getaway Ideas: Curated 48-Hour Itineraries | Dalaman Guide',
        description: 'Turnkey 48-hour schedules for perfect weekends across Kaş, Dalyan, Ölüdeniz, and Datça. Hour-by-hour timelines, 2-person budget breakdowns, and packing checklists.',
    },
    de: {
        title: 'Wochenend-Ideen: Fertige 48-Stunden-Reisepläne an der Küste | Dalaman Guide',
        description: 'Fertige 48-Stunden-Pläne für ein perfektes Wochenende in Kaş, Dalyan, Ölüdeniz und Datça. Stundenpläne, Budgetübersichten in Euro & Lira und Packlisten.',
    },
    tr: {
        title: 'Hafta Sonu Fikirleri: Hazır 48 Saatlik Kıyı Rotaları | Dalaman Rehberi',
        description: 'Kaş, Dalyan, Ölüdeniz ve Datça için saatlik 48 saatlik hafta sonu planları. İki kişilik bütçe hesaplamaları, rota çizelgeleri ve seyahat kontrol listeleri.',
    },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale || 'en';
    const meta = weekendsMetaByLocale[locale] || weekendsMetaByLocale['en'];
    return buildPageMetadata({
        locale,
        pathname: '/routes/weekends',
        title: meta.title,
        description: meta.description,
        image: '/api/images/locations/kas/ruines/kastombs/kastombs.jpg',
    });
}

export default function WeekendRoutesPage({ params: { locale } }: { params: { locale: string } }) {
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
                            <FaCalendarAlt className="text-emerald-500" /> {isRu ? 'Центр Идей Выходного Дня' : 'Weekend Getaways Center'}
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:self-end">
                        <Link
                            href={`/${locale}/routes/trekking`}
                            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black uppercase tracking-wider border border-slate-700 transition-all"
                        >
                            {isRu ? '🥾 Треккинг и Ликийская тропа' : '🥾 Trekking & Lycian Way'}
                        </Link>
                        <Link
                            href={`/${locale}/collections`}
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30"
                        >
                            {isRu ? '🗂️ Все коллекции' : '🗂️ All Collections'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Interactive Weekend Hub */}
            <div className="flex-grow py-12 md:py-20 px-4">
                <div className="w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-8">
                    <WeekendHub locale={locale} />
                </div>
            </div>

            <Footer />
        </main>
    );
}
