import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Sidebar from '@/app/components/Sidebar';
import ArticleActions from '@/app/components/ArticleActions';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

const slugImages: Record<string, string> = {
    'history': '/api/images/locations/dacha/ruine/knidos/knidos.jpg',
    'flora-fauna': '/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg',
    'geography': '/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg',
    'ancient-cities': '/api/images/locations/kas/ruines/patara/patara.jpg',
    'yachting': '/dalaman1.jpg',
    'diving': '/api/images/locations/kas/beach/limangzi/limangzi.jpg',
    'paragliding': '/dalaman2.jpg',
    'trekking': '/dalaman2.jpg',
    'airport-dalaman': '/dalaman1.jpg',
    'transport': '/dalaman1.jpg',
    'real-estate': '/dalaman2.jpg',
    'climate-and-seasons': '/hero-bg.jpg',
    'useful-contacts': '/dalaman1.jpg',
    'residency-permit': '/dalaman2.jpg',
    'culture-and-traditions': '/dalaman1.jpg',
    'kitesurfing': '/dalaman2.jpg',
    'suveniry-i-remesla': '/dalaman1.jpg',
    'dalyan-guide': '/api/images/locations/dalyan/ruine/LycianTombs/lyciantombs.jpg',
    'saklikent-gorge': '/api/images/locations/fethiye/todo/saklikent/saklikent.jpg',
    'kayakoy-ghost-town': '/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg',
    'tlos-ancient-city': '/api/images/locations/fethiye/ruines/tlos/tlos.jpg',
    'xanthos-ancient-city': '/api/images/locations/kas/ruines/xanthos/xanthos.jpg',
    'babadag': '/api/images/locations/fethiye/todo/babadag/babadag.jpg',
    'butterfly-valley': '/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg',
    'calis-beach': '/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg',
    'oludeniz': '/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg',
    'iztuzu-beach': '/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg',
    'koycegiz-lake': '/api/images/locations/koycegiz/beach/LakeBeach/lakebeach.png',
    'ekincik-bay': '/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg',
    'ciftlik-bay': '/api/images/locations/marmaris/beach/Ciftlik/ciftlik.jpg',
    'icmeler': '/api/images/locations/marmaris/beach/Icmeler/icmeler.jpg',
    'turunc': '/api/images/locations/marmaris/beach/Turunc/turunc.jpg',
    'datca-peninsula': '/api/images/locations/dacha/ruine/knidos/knidos.jpg',
    'kas-guide': '/api/images/locations/kas/ruines/kastombs/kastombs.jpg',
    'gocek-guide': '/api/images/locations/gocek/beach/dresort/dresort.jpg',
    'myra-ancient-city': '/api/images/locations/kas/ruines/kekova/kekova.jpg',
    'pamukkale-hierapolis': '/dalaman1.jpg',
    'st-nicholas-island': '/api/images/locations/fethiye/beach/belcekiz/belcekiz2.jpg',
};

function getArticleFilePaths(dir: string = articlesDirectory): string[] {
    const result: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            result.push(...getArticleFilePaths(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            result.push(fullPath);
        }
    }
    return result;
}

function getRecommendedArticles(currentSlug: string, locale: string) {
    const filePaths = getArticleFilePaths();
    const slugMap = new Map<string, string>();
    
    // First pass: add default files
    for (const filePath of filePaths) {
        const isLocalized = ['.en.md', '.de.md', '.tr.md'].some(ext => filePath.endsWith(ext));
        if (!isLocalized) {
            try {
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data } = matter(fileContents);
                if (data.slug) {
                    slugMap.set(data.slug, filePath);
                }
            } catch(e) {}
        }
    }
    
    // Second pass: override with localized files if available
    if (locale && locale !== 'ru') {
        for (const filePath of filePaths) {
            if (filePath.endsWith(`.${locale}.md`)) {
                try {
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data } = matter(fileContents);
                    if (data.slug) {
                        slugMap.set(data.slug, filePath);
                    }
                } catch(e) {}
            }
        }
    }

    const list: any[] = [];
    for (const [slug, filePath] of Array.from(slugMap.entries())) {
        if (slug !== currentSlug) {
            try {
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data } = matter(fileContents);
                if (data.title) {
                    list.push({
                        title: data.title,
                        slug: slug,
                        image: slugImages[slug] || '/dalaman1.jpg'
                    });
                }
            } catch(e) {}
        }
    }
    
    return list.sort(() => 0.5 - Math.random()).slice(0, 4);
}

async function getArticleData(slug: string, locale: string) {
    const filePaths = getArticleFilePaths();
    let fileContents = '';

    // 1. Try to find localized file first
    if (locale && locale !== 'ru') {
        for (const filePath of filePaths) {
            if (filePath.endsWith(`.${locale}.md`)) {
                const currentFileContents = fs.readFileSync(filePath, 'utf8');
                const matterResult = matter(currentFileContents);
                if (matterResult.data.slug === slug) {
                    fileContents = currentFileContents;
                    break;
                }
            }
        }
    }

    // 2. Fallback to default
    if (!fileContents) {
        for (const filePath of filePaths) {
            const isLocalized = ['.en.md', '.de.md', '.tr.md'].some(ext => filePath.endsWith(ext));
            if (!isLocalized) {
                const currentFileContents = fs.readFileSync(filePath, 'utf8');
                const matterResult = matter(currentFileContents);
                if (matterResult.data.slug === slug) {
                    fileContents = currentFileContents;
                    break;
                }
            }
        }
    }

    if (!fileContents) {
        return null;
    }

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(remarkHtml, { sanitize: false })
        .process(matterResult.content);
    const rawHtml = processedContent.toString();

    const toc: { id: string; text: string; level: number }[] = [];
    let counter = 0;
    const contentHtml = rawHtml.replace(/<(h[23])([^>]*)>(.*?)<\/>/gi, (match, tag, attrs, text) => {
        counter++;
        const cleanText = text.replace(/<[^>]*>/g, '').trim();
        const id = `toc-${counter}`;
        toc.push({ id, text: cleanText, level: tag.toLowerCase() === 'h2' ? 2 : 3 });
        return `<${tag}${attrs} id="${id}" class="scroll-mt-28 font-black text-slate-900">${text}</${tag}>`;
    });

    const image = matterResult.data.image || slugImages[slug] || '/hero-bg.jpg';

    return {
        title: matterResult.data.title || 'Статья',
        description: matterResult.data.description || '',
        image,
        contentHtml,
        toc
    };
}

const articleUiByLocale: Record<string, any> = {
    ru: { badge: 'ПОЛЕЗНАЯ СТАТЬЯ', toc: 'Содержание', rec: 'Рекомендуем прочитать', home: 'На главную', not_found: 'Статья не найдена', verified: "Проверено редакцией Дача — Каш", updated: "Обновлено: Июль 2026", authority: "Экспертный гид по Бирюзовому побережью" },
    en: { badge: 'USEFUL ARTICLE', toc: 'Table of Contents', rec: 'Recommended Reading', home: 'Go Home', not_found: 'Article Not Found', verified: "Verified by Local Editorial Team", updated: "Updated: July 2026", authority: "Turquoise Coast Authority Guide" },
    de: { badge: 'NÜTZLICHER ARTIKEL', toc: 'Inhalt', rec: 'Empfohlene Artikel', home: 'Zur Startseite', not_found: 'Artikel nicht gefunden', verified: "Geprüft von der lokalen Redaktion", updated: "Aktualisiert: Juli 2026", authority: "Expertenführer Türkische Riviera" },
    tr: { badge: 'FAYDALI MAKALE', toc: 'İçindekiler', rec: 'Önerilen Makaleler', home: 'Ana Sayfa', not_found: 'Makale Bulunamadı', verified: "Yerel Editör Ekibi Doğruladı", updated: "Güncelleme: Temmuz 2026", authority: "Turkuaz Kıyılar Resmi Rehberi" }
};

type ArticlePageProps = {
    params: {
        locale: string;
        slug: string;
    };
};

const ArticlePage = async ({ params }: ArticlePageProps) => {
    const { locale, slug } = params;
    const activeLocale = locale || 'en';
    const articleData = await getArticleData(slug, activeLocale);

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${activeLocale}${cleanPath}`;
    };

    if (!articleData) {
        return (
             <div className="flex flex-col min-h-screen bg-slate-50">
                
                <Header locale={activeLocale} />
                <main className="flex-grow container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-black text-slate-800 mb-4">
                        {(articleUiByLocale[activeLocale] || articleUiByLocale['en']).not_found}
                    </h1>
                    <Link href={localize('/')} className="inline-block mt-4 bg-cyan-600 text-white px-6 py-3 rounded-full font-bold">
                        {(articleUiByLocale[activeLocale] || articleUiByLocale['en']).home}
                    </Link>
                </main>
                
                <Footer locale={activeLocale} />
            </div>
        )
    }

    const recommended = getRecommendedArticles(slug, activeLocale);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
            <Header locale={activeLocale} />
            
            <main className="flex-grow">
                {/* Hero Banner Section */}
                <div className="relative h-[50vh] min-h-[380px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
                    <div className="absolute inset-0 z-0">
                        <Image 
                            src={articleData.image} 
                            alt={articleData.title}
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="brightness-75"
                        />
                    </div>
                    {(articleData.image.includes('/dalaman') || articleData.image.includes('/hero-bg')) && (
                        <div className="absolute top-24 right-6 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black px-2.5 py-1 rounded border border-white/20 z-20 tracking-wider uppercase">
                            AI Placeholder / Сгенерировано ИИ
                        </div>
                    )}
                    <div className="relative z-20 flex flex-col justify-end h-full w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-11 lg:px-11 pb-12">
                        <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em] mb-4">
                            {(articleUiByLocale[activeLocale] || articleUiByLocale['en']).badge}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tight leading-tight max-w-5xl">
                            {articleData.title}
                        </h1>
                        <p className="text-base md:text-lg text-slate-200 font-medium max-w-4xl leading-relaxed">
                            {articleData.description}
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-11 lg:px-11 py-10 pb-20">
                    <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
                        {/* Article Text Content */}
                        <div className="w-full lg:w-[71%] xl:w-[74%]">
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 premium-shadow border border-slate-50">
                                {/* E-E-A-T Trust Banner & Actions */}
                                <div className="flex flex-wrap items-center gap-2.5 pb-6 mb-8 border-b border-slate-100 text-[11px] font-bold text-slate-500">
                                    <span className="flex items-center gap-1.5 text-emerald-700 font-black bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                                        ✍️ {(articleUiByLocale[activeLocale] || articleUiByLocale['en']).verified}
                                    </span>
                                    <span className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
                                        🔄 {(articleUiByLocale[activeLocale] || articleUiByLocale['en']).updated}
                                    </span>
                                    <span className="flex items-center gap-1 bg-cyan-50 text-cyan-800 px-3 py-1.5 rounded-full border border-cyan-100 shadow-sm">
                                        🛡️ {(articleUiByLocale[activeLocale] || articleUiByLocale['en']).authority}
                                    </span>
                                    <div className="ml-auto pt-2 sm:pt-0">
                                        <ArticleActions locale={activeLocale} title={articleData.title} />
                                    </div>
                                </div>

                                {/* Interactive Hub Prompts Above Content */}
                                {(slug.includes('trekking') || slug.includes('peshehodnyy') || slug.includes('babadag') || slug.includes('saklikent') || slug.includes('kayakoy')) && (
                                    <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white shadow-2xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="space-y-2 text-center md:text-left">
                                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                                                {activeLocale === 'ru' ? '🧭 Интерактивный Сервис' : activeLocale === 'de' ? '🧭 Interaktiver Atlas' : activeLocale === 'tr' ? '🧭 İnteraktif Atlas' : '🧭 Interactive Atlas'}
                                            </span>
                                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                                {activeLocale === 'ru' 
                                                    ? '🥾 Перейдите в Интерактивный Атлас Треккинга Ликии' 
                                                    : activeLocale === 'de' 
                                                    ? '🥾 Entdecken Sie den interaktiven Lykischen Weg Atlas' 
                                                    : activeLocale === 'tr' 
                                                    ? '🥾 Likya & Karya Yolları İnteraktif Haritasını Açın' 
                                                    : '🥾 Launch the Interactive Lycian Way Trekking Atlas'}
                                            </h3>
                                            <p className="text-xs md:text-sm text-emerald-100/80 max-w-xl leading-relaxed font-medium">
                                                {activeLocale === 'ru'
                                                    ? 'Все 12 этапов Ликийской и Карийской троп с перепадами высот, родниками питьевой воды (Çeşme), GPS-точками и выбором сложности в 1 клик.'
                                                    : activeLocale === 'de'
                                                    ? 'Alle 12 Etappen des Lykischen und Karischen Wegs mit Höhenprofilen, Trinkwasserquellen (Çeşme) und GPS-Koordinaten auf einen Blick.'
                                                    : activeLocale === 'tr'
                                                    ? 'Likya ve Karya Yolu üzerindeki 12 ana etap, rakım profilleri, çeşmeler, GPS koordinatları ve zorluk dereceleri.'
                                                    : 'All 12 stages of the Lycian & Carian Trails featuring elevation profiles, drinking fountains (Çeşme), GPS waypoints, and stage difficulty filters.'}
                                            </p>
                                        </div>
                                        <Link
                                            href={localize('/routes/trekking')}
                                            className="flex-shrink-0 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/20 hover:scale-105 text-center block md:inline-block w-full md:w-auto"
                                        >
                                            {activeLocale === 'ru' ? 'Открыть Атлас Троп →' : activeLocale === 'de' ? 'Zum Atlas →' : activeLocale === 'tr' ? 'Atlası Aç →' : 'Explore Atlas →'}
                                        </Link>
                                    </div>
                                )}

                                {(slug.includes('marshruty') || slug.includes('weekends') || slug.includes('odnodnevnye')) && (
                                    <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white shadow-2xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="space-y-2 text-center md:text-left">
                                            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
                                                {activeLocale === 'ru' ? '🗓️ Готовые Сценарии' : activeLocale === 'de' ? '🗓️ 48-Stunden-Pläne' : activeLocale === 'tr' ? '🗓️ Hafta Sonu Planları' : '🗓️ Ready 48h Scenarios'}
                                            </span>
                                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                                {activeLocale === 'ru' 
                                                    ? '🍷 Идеи Выходного Дня (48 часов на Побережье)' 
                                                    : activeLocale === 'de' 
                                                    ? '🍷 Wochenend-Ideen (48 Stunden an der Küste)' 
                                                    : activeLocale === 'tr' 
                                                    ? '🍷 Hafta Sonu Fikirleri (48 Saatlik Gezi Rotaları)' 
                                                    : '🍷 Weekend Getaways (48-Hour Coastal Itineraries)'}
                                            </h3>
                                            <p className="text-xs md:text-sm text-indigo-100/80 max-w-xl leading-relaxed font-medium">
                                                {activeLocale === 'ru'
                                                    ? 'Пошаговые расписания с пятницы по воскресенье для Каша, Дальяна, Олюдениза и Датчи с расчетом бюджета (Щит от инфляции 2026).'
                                                    : activeLocale === 'de'
                                                    ? 'Schritt-für-Schritt-Abläufe von Freitag bis Sonntag für Kaş, Dalyan, Ölüdeniz und Datça inkl. Budget-Schutz.'
                                                    : activeLocale === 'tr'
                                                    ? 'Kaş, Dalyan, Ölüdeniz ve Datça için Cuma akşamından Pazar gününe saat saat planlar ve 2026 bütçe kalkanı.'
                                                    : 'Hour-by-hour Friday-to-Sunday weekend schedules across Kaş, Dalyan, Ölüdeniz, and Datça with 2026 budget breakdown.'}
                                            </p>
                                        </div>
                                        <Link
                                            href={localize('/routes/weekends')}
                                            className="flex-shrink-0 px-6 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-indigo-500/20 hover:scale-105 text-center block md:inline-block w-full md:w-auto"
                                        >
                                            {activeLocale === 'ru' ? 'Сценарии Уикендов →' : activeLocale === 'de' ? 'Wochenende Pläne →' : activeLocale === 'tr' ? 'Planları Göster →' : 'View Weekend Plans →'}
                                        </Link>
                                    </div>
                                )}

                                {(slug.includes('useful-contacts') || slug.includes('poleznye-ssylki') || slug.includes('pharmacies')) && (
                                    <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-rose-900 via-slate-900 to-rose-950 text-white shadow-2xl border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="space-y-2 text-center md:text-left">
                                            <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase tracking-widest border border-rose-500/30">
                                                {activeLocale === 'ru' ? '🏥 Официальный Онлайн-Сервис' : activeLocale === 'de' ? '🏥 Offizieller Notdienst' : activeLocale === 'tr' ? '🏥 Resmi Nöbetçi Eczane Sistemi' : '🏥 Official On-Duty Roster'}
                                            </span>
                                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                                {activeLocale === 'ru' 
                                                    ? '💊 Поиск дежурных аптек (Nöbetçi Eczane) 24/7' 
                                                    : activeLocale === 'de' 
                                                    ? '💊 Notdienstapotheken (Nöbetçi Eczane) 24/7' 
                                                    : activeLocale === 'tr' 
                                                    ? '💊 Muğla Nöbetçi Eczaneler Sorgulama 7/24' 
                                                    : '💊 Find 24/7 On-Duty Pharmacies (Nöbetçi Eczane)'}
                                            </h3>
                                            <p className="text-xs md:text-sm text-rose-100/80 max-w-xl leading-relaxed font-medium">
                                                {activeLocale === 'ru'
                                                    ? 'Всегда проверяйте актуальный статус дежурных аптек в Даламане, Фетхие, Мармарисе и Каше на официальном портале Муглы (Muğla Eczacı Odası).'
                                                    : activeLocale === 'de'
                                                    ? 'Prüfen Sie den aktuellen Status der Notdienstapotheken in Dalaman, Fethiye, Marmaris und Kaş über das offizielle Portal Muğlas.'
                                                    : activeLocale === 'tr'
                                                    ? 'Dalaman, Fethiye, Marmaris ve Kaş bölgesindeki anlık nöbetçi eczaneleri Muğla Eczacı Odası resmi portalından sorgulayın.'
                                                    : 'Verify real-time emergency pharmacy rosters across Dalaman, Fethiye, Marmaris, and Kaş via the official Muğla Pharmacists Association portal.'}
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                            <a
                                                href="https://www.muglaeo.org.tr/nobetci-eczaneler/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-rose-600/30 hover:scale-105 text-center block"
                                            >
                                                {activeLocale === 'ru' ? 'Открытый Список Аптек ↗' : activeLocale === 'de' ? 'Apothekenliste öffnen ↗' : activeLocale === 'tr' ? 'Nöbetçi Eczaneleri Aç ↗' : 'Open Pharmacy Roster ↗'}
                                            </a>
                                            <Link
                                                href={localize('/pharmacies')}
                                                className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all text-center block"
                                            >
                                                {activeLocale === 'ru' ? 'Гид по лекарствам →' : activeLocale === 'de' ? 'Medikamente Guide →' : activeLocale === 'tr' ? 'İlaç Rehberi →' : 'Medicine Guide →'}
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />

                                {/* Interactive Hub Prompts Below Content */}
                                {(slug.includes('trekking') || slug.includes('peshehodnyy') || slug.includes('babadag') || slug.includes('saklikent') || slug.includes('kayakoy')) && (
                                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
                                        <div>
                                            <h4 className="font-black text-slate-800 text-base">
                                                {activeLocale === 'ru' ? 'Ищете подробные карты троп и перепады высот?' : activeLocale === 'de' ? 'Suchen Sie detaillierte Wanderkarten?' : activeLocale === 'tr' ? 'Detaylı rota haritaları mı arıyorsunuz?' : 'Looking for detailed trail maps & elevations?'}
                                            </h4>
                                            <p className="text-xs text-slate-600 font-medium">
                                                {activeLocale === 'ru' ? 'Воспользуйтесь нашим интерактивным Атласом треккинга с 12 маршрутами.' : activeLocale === 'de' ? 'Nutzen Sie unseren interaktiven Wanderatlas mit 12 Etappen.' : activeLocale === 'tr' ? '12 etaplı interaktif Trekking Atlasımızı kullanın.' : 'Use our interactive Trekking Atlas featuring 12 curated stages.'}
                                            </p>
                                        </div>
                                        <Link
                                            href={localize('/routes/trekking')}
                                            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex-shrink-0"
                                        >
                                            {activeLocale === 'ru' ? 'Перейти в Атлас →' : activeLocale === 'de' ? 'Zum Atlas →' : activeLocale === 'tr' ? 'Atlasa Git →' : 'Open Atlas →'}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebars */}
                        <aside className="w-full lg:w-[29%] xl:w-[26%] space-y-8 sticky top-28 self-start">
                            {articleData.toc && articleData.toc.length > 0 && (
                                <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50 p-6 space-y-4">
                                    <h3 className="font-black text-sm uppercase tracking-widest italic border-b border-slate-100 pb-3 text-slate-800">
                                        {(articleUiByLocale[activeLocale] || articleUiByLocale['en']).toc}
                                    </h3>
                                    <ul className="space-y-2.5 text-xs font-bold text-slate-600 max-h-[450px] overflow-y-auto pr-2">
                                        {articleData.toc.map((item: any) => (
                                            <li key={item.id} className={item.level === 3 ? 'pl-4 font-medium text-slate-400' : ''}>
                                                <a href={`#${item.id}`} className="hover:text-cyan-600 transition-colors block leading-snug">
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {recommended.length > 0 && (
                                <RecommendedWidget items={recommended} activeLocale={activeLocale} />
                            )}
                            
                            <Sidebar locale={activeLocale} />
                        </aside>
                    </div>
                </div>
            </main>

            
            <Footer locale={activeLocale} />
        </div>
    );
};

const RecommendedWidget = ({ items, activeLocale }: { items: any[], activeLocale: string }) => {
    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${activeLocale}${cleanPath}`;
    };

    return (
        <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50 p-6 space-y-6">
            <h3 className="font-black text-sm uppercase tracking-widest italic border-b border-slate-100 pb-4 text-slate-800">
                {(articleUiByLocale[activeLocale] || articleUiByLocale['en']).rec}
            </h3>
            <div className="space-y-6">
                {items.map((item) => (
                    <Link key={item.slug} href={localize(`/articles/${item.slug}`)} className="flex items-center space-x-4 group">
                        <div className="flex-shrink-0 relative w-16 h-16 rounded-xl overflow-hidden premium-shadow border border-slate-100">
                            <Image
                                src={item.image}
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                                className="group-hover:scale-110 transition-transform duration-500"
                            />
                            {(item.image.includes('/dalaman') || item.image.includes('/hero-bg')) && (
                                <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[6px] font-black px-1 py-0.5 rounded z-10 uppercase tracking-tighter">
                                    AI
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-cyan-600 transition-colors">
                                {item.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export async function generateStaticParams() {
    const filePaths = getArticleFilePaths();
    const slugs = filePaths.map(filePath => {
        try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const matterResult = matter(fileContents);
            return matterResult.data.slug;
        } catch (e) {
            return null;
        }
    }).filter(item => item);

    const uniqueSlugs = Array.from(new Set(slugs));
    const paths = [];
    const locales = ['en', 'ru', 'de', 'tr'];

    for (const slug of uniqueSlugs) {
        for (const locale of locales) {
            paths.push({
                slug: slug,
                locale: locale
            });
        }
    }

    return paths;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { locale, slug } = params;
    const activeLocale = locale || 'en';
    const articleData = await getArticleData(slug, activeLocale);
    
    if (!articleData) {
        return {
            title: activeLocale === 'ru' ? 'Статья не найдена' : 'Article Not Found',
        };
    }
    
    return {
        title: `${articleData.title} | Dolaman.info`,
        description: articleData.description,
        openGraph: {
            title: `${articleData.title} | Dolaman.info`,
            description: articleData.description,
            images: [
                {
                    url: articleData.image,
                }
            ]
        }
    };
}

export default ArticlePage;