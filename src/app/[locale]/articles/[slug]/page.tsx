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

    for (const filePath of filePaths) {
        const isLocalized = ['.en.md', '.de.md', '.tr.md'].some(ext => filePath.endsWith(ext));
        if (!isLocalized) {
            try {
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data } = matter(fileContents);
                if (data.slug) {
                    slugMap.set(data.slug, filePath);
                }
            } catch (e) {}
        }
    }

    if (locale && locale !== 'ru') {
        for (const filePath of filePaths) {
            if (filePath.endsWith(`.${locale}.md`)) {
                try {
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data } = matter(fileContents);
                    if (data.slug) {
                        slugMap.set(data.slug, filePath);
                    }
                } catch (e) {}
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
            } catch (e) {}
        }
    }

    return list.sort(() => 0.5 - Math.random()).slice(0, 4);
}

async function getArticleData(slug: string, locale: string) {
    const filePaths = getArticleFilePaths();
    let fileContents = '';

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
    const contentHtml = rawHtml.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, text) => {
        counter++;
        const cleanText = text.replace(/<[^>]*>/g, '').trim();
        const id = `toc-${counter}`;
        toc.push({ id, text: cleanText, level: tag.toLowerCase() === 'h2' ? 2 : 3 });
        return `<${tag}${attrs} id="${id}" class="scroll-mt-28 font-extrabold text-slate-900">${text}</${tag}>`;
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
    ru: { badge: 'ЭКСПЕРТНЫЙ ГАЙД', toc: 'Содержание статьи', rec: 'Рекомендуем прочитать', home: 'На главную', allArticles: 'Все статьи', not_found: 'Статья не найдена', verified: "Проверено редакцией Датча — Каш", updated: "Актуально: сезон 2026", authority: "Экспертный гид по Бирюзовому побережью" },
    en: { badge: 'EXPERT GUIDE', toc: 'Table of Contents', rec: 'Recommended Reading', home: 'Go Home', allArticles: 'All Guides', not_found: 'Article Not Found', verified: "Verified by Local Editorial Team", updated: "Season 2026 Verified", authority: "Turquoise Coast Authority Guide" },
    de: { badge: 'EXPERTEN-GUIDE', toc: 'Inhalt', rec: 'Empfohlene Artikel', home: 'Zur Startseite', allArticles: 'Alle Artikel', not_found: 'Artikel nicht gefunden', verified: "Geprüft von der lokalen Redaktion", updated: "Saison 2026 Aktuell", authority: "Expertenführer Türkische Riviera" },
    tr: { badge: 'UZMAN REHBERİ', toc: 'İçindekiler', rec: 'Önerilen Makaleler', home: 'Ana Sayfa', allArticles: 'Tüm Rehberler', not_found: 'Makale Bulunamadı', verified: "Yerel Editör Ekibi Doğruladı", updated: "2026 Sezonu Güncel", authority: "Turkuaz Kıyılar Resmi Rehberi" }
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
    const ui = articleUiByLocale[activeLocale] || articleUiByLocale['en'];

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${activeLocale}${cleanPath}`;
    };

    if (!articleData) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-50">
                <Header locale={activeLocale} />
                <main className="flex-grow portal-container py-16 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
                        {ui.not_found}
                    </h1>
                    <Link href={localize('/articles')} className="inline-block mt-4 bg-cyan-600 text-white px-6 py-3 rounded-full font-bold text-sm">
                        {ui.allArticles}
                    </Link>
                </main>
                <Footer locale={activeLocale} />
            </div>
        );
    }

    const recommended = getRecommendedArticles(slug, activeLocale);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header locale={activeLocale} />

            <main className="flex-grow">
                {/* Hero Banner Section */}
                <div className="relative h-[44vh] min-h-[340px] overflow-hidden flex items-end">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/45 to-slate-950/30 z-10" />
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={articleData.image}
                            alt={articleData.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    {(articleData.image.includes('/dalaman') || articleData.image.includes('/hero-bg')) && (
                        <div className="absolute top-6 right-6 bg-slate-900/65 backdrop-blur-sm text-white text-[9px] font-semibold px-2.5 py-1 rounded border border-white/20 z-20">
                            AI Illustration
                        </div>
                    )}
                    <div className="relative z-20 portal-container pb-10 pt-16">
                        <div className="flex items-center gap-2 mb-3">
                            <Link
                                href={localize('/articles')}
                                className="text-cyan-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
                            >
                                ← {ui.allArticles}
                            </Link>
                            <span className="text-white/40">•</span>
                            <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">
                                {ui.badge}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight leading-tight max-w-4xl">
                            {articleData.title}
                        </h1>
                        {articleData.description && (
                            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-medium max-w-3xl leading-relaxed">
                                {articleData.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="portal-container py-8 md:py-10 pb-20">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Article Text Content */}
                        <div className="w-full lg:flex-1 min-w-0">
                            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border border-slate-200/70">
                                {/* E-E-A-T Trust Banner & Actions */}
                                <div className="flex flex-wrap items-center gap-2 pb-6 mb-8 border-b border-slate-100 text-xs font-semibold text-slate-600">
                                    <span className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                                        ✍️ {ui.verified}
                                    </span>
                                    <span className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                                        🔄 {ui.updated}
                                    </span>
                                    <div className="ml-auto pt-2 sm:pt-0">
                                        <ArticleActions locale={activeLocale} title={articleData.title} />
                                    </div>
                                </div>

                                {/* Interactive Hub Prompts Above Content */}
                                {(slug.includes('trekking') || slug.includes('peshehodnyy') || slug.includes('babadag') || slug.includes('saklikent') || slug.includes('kayakoy')) && (
                                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white shadow-md border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="space-y-1.5 text-center md:text-left">
                                            <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                                                {activeLocale === 'ru' ? '🧭 Интерактивный сервис' : activeLocale === 'de' ? '🧭 Interaktiver Atlas' : activeLocale === 'tr' ? '🧭 İnteraktif Atlas' : '🧭 Interactive Atlas'}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-bold text-white">
                                                {activeLocale === 'ru'
                                                    ? '🥾 Интерактивный Атлас Треккинга Ликии'
                                                    : activeLocale === 'de'
                                                    ? '🥾 Interaktiver Lykischer Weg Atlas'
                                                    : activeLocale === 'tr'
                                                    ? '🥾 Likya & Karya Yolları İnteraktif Haritası'
                                                    : '🥾 Interactive Lycian Way Trekking Atlas'}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-emerald-100/85 max-w-xl leading-relaxed">
                                                {activeLocale === 'ru'
                                                    ? 'Все 12 этапов Ликийской и Карийской троп с перепадами высот, источниками воды (Çeşme), GPS-точками и фильтром сложности.'
                                                    : activeLocale === 'de'
                                                    ? 'Alle 12 Etappen des Lykischen und Karischen Wegs mit Höhenprofilen, Trinkwasserquellen (Çeşme) und GPS-Koordinaten.'
                                                    : activeLocale === 'tr'
                                                    ? 'Likya ve Karya Yolu üzerindeki 12 ana etap, rakım profilleri, çeşmeler, GPS koordinatları ve zorluk dereceleri.'
                                                    : 'All 12 stages of the Lycian & Carian Trails featuring elevation profiles, drinking fountains (Çeşme), and GPS waypoints.'}
                                            </p>
                                        </div>
                                        <Link
                                            href={localize('/routes/trekking')}
                                            className="flex-shrink-0 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm text-center w-full md:w-auto"
                                        >
                                            {activeLocale === 'ru' ? 'Открыть Атлас →' : activeLocale === 'de' ? 'Zum Atlas →' : activeLocale === 'tr' ? 'Atlası Aç →' : 'Explore Atlas →'}
                                        </Link>
                                    </div>
                                )}

                                {(slug.includes('marshruty') || slug.includes('weekends') || slug.includes('odnodnevnye')) && (
                                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white shadow-md border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="space-y-1.5 text-center md:text-left">
                                            <span className="inline-block px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30">
                                                {activeLocale === 'ru' ? '🗓️ Готовые сценарии' : activeLocale === 'de' ? '🗓️ 48-Stunden-Pläne' : activeLocale === 'tr' ? '🗓️ Hafta Sonu Planları' : '🗓️ Ready 48h Scenarios'}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-bold text-white">
                                                {activeLocale === 'ru'
                                                    ? '🍷 Идеи выходного дня (48 часов на побережье)'
                                                    : activeLocale === 'de'
                                                    ? '🍷 Wochenend-Ideen (48 Stunden an der Küste)'
                                                    : activeLocale === 'tr'
                                                    ? '🍷 Hafta Sonu Fikirleri (48 Saatlik Gezi Rotaları)'
                                                    : '🍷 Weekend Getaways (48-Hour Coastal Itineraries)'}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-indigo-100/85 max-w-xl leading-relaxed">
                                                {activeLocale === 'ru'
                                                    ? 'Пошаговые расписания с пятницы по воскресенье для Каша, Дальяна, Олюдениза и Датчи с расчетом бюджета.'
                                                    : activeLocale === 'de'
                                                    ? 'Schritt-für-Schritt-Abläufe von Freitag bis Sonntag für Kaş, Dalyan, Ölüdeniz und Datça.'
                                                    : activeLocale === 'tr'
                                                    ? 'Kaş, Dalyan, Ölüdeniz ve Datça için Cuma akşamından Pazar gününe saat saat planlar.'
                                                    : 'Hour-by-hour Friday-to-Sunday weekend schedules across Kaş, Dalyan, Ölüdeniz, and Datça.'}
                                            </p>
                                        </div>
                                        <Link
                                            href={localize('/routes/weekends')}
                                            className="flex-shrink-0 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm text-center w-full md:w-auto"
                                        >
                                            {activeLocale === 'ru' ? 'Сценарии уикендов →' : activeLocale === 'de' ? 'Wochenende Pläne →' : activeLocale === 'tr' ? 'Planları Göster →' : 'View Weekend Plans →'}
                                        </Link>
                                    </div>
                                )}

                                {(slug.includes('useful-contacts') || slug.includes('poleznye-ssylki') || slug.includes('pharmacies')) && (
                                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-rose-900 via-slate-900 to-rose-950 text-white shadow-md border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="space-y-1.5 text-center md:text-left">
                                            <span className="inline-block px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/30">
                                                {activeLocale === 'ru' ? '🏥 Официальный онлайн-сервис' : activeLocale === 'de' ? '🏥 Offizieller Notdienst' : activeLocale === 'tr' ? '🏥 Resmi Nöbetçi Eczane Sistemi' : '🏥 Official On-Duty Roster'}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-bold text-white">
                                                {activeLocale === 'ru'
                                                    ? '💊 Дежурные аптеки (Nöbetçi Eczane) 24/7'
                                                    : activeLocale === 'de'
                                                    ? '💊 Notdienstapotheken (Nöbetçi Eczane) 24/7'
                                                    : activeLocale === 'tr'
                                                    ? '💊 Muğla Nöbetçi Eczaneler Sorgulama 7/24'
                                                    : '💊 Find 24/7 On-Duty Pharmacies (Nöbetçi Eczane)'}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-rose-100/85 max-w-xl leading-relaxed">
                                                {activeLocale === 'ru'
                                                    ? 'Проверяйте актуальный список дежурных аптек в Даламане, Фетхие, Мармарисе и Каше на официальном портале Фармацевтической палаты Муглы.'
                                                    : activeLocale === 'de'
                                                    ? 'Prüfen Sie den aktuellen Status der Notdienstapotheken in Dalaman, Fethiye, Marmaris und Kaş über das offizielle Portal Muğlas.'
                                                    : activeLocale === 'tr'
                                                    ? 'Dalaman, Fethiye, Marmaris ve Kaş bölgesindeki anlık nöbetçi eczaneleri Muğla Eczacı Odası resmi portalından sorgulayın.'
                                                    : 'Verify real-time emergency pharmacy rosters across Dalaman, Fethiye, Marmaris, and Kaş via the official Muğla Pharmacists Association portal.'}
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
                                            <a
                                                href="https://www.muglaeo.org.tr/nobetci-eczaneler/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all text-center block"
                                            >
                                                {activeLocale === 'ru' ? 'Список аптек ↗' : activeLocale === 'de' ? 'Apothekenliste ↗' : activeLocale === 'tr' ? 'Nöbetçi Eczaneler ↗' : 'Pharmacy Roster ↗'}
                                            </a>
                                            <Link
                                                href={localize('/pharmacies')}
                                                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all text-center block"
                                            >
                                                {activeLocale === 'ru' ? 'Гид по аптекам →' : activeLocale === 'de' ? 'Apotheken Guide →' : activeLocale === 'tr' ? 'İlaç Rehberi →' : 'Medicine Guide →'}
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                <div className="markdown-body max-w-none" dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
                            </div>
                        </div>

                        {/* Sidebars */}
                        <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6 lg:sticky lg:top-28">
                            {articleData.toc && articleData.toc.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70 p-6 space-y-4">
                                    <h3 className="font-bold text-xs uppercase tracking-wider border-b border-slate-100 pb-3 text-slate-900">
                                        {ui.toc}
                                    </h3>
                                    <ul className="space-y-2 text-xs font-semibold text-slate-600 max-h-[380px] overflow-y-auto pr-2">
                                        {articleData.toc.map((item: any) => (
                                            <li key={item.id} className={item.level === 3 ? 'pl-3.5 font-normal text-slate-500' : ''}>
                                                <a href={`#${item.id}`} className="hover:text-cyan-600 transition-colors block leading-snug py-0.5">
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {recommended.length > 0 && (
                                <RecommendedWidget items={recommended} activeLocale={activeLocale} title={ui.rec} />
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

const RecommendedWidget = ({ items, activeLocale, title }: { items: any[], activeLocale: string, title: string }) => {
    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${activeLocale}${cleanPath}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70 p-6 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider border-b border-slate-100 pb-3 text-slate-900">
                {title}
            </h3>
            <div className="space-y-4">
                {items.map((item) => (
                    <Link key={item.slug} href={localize(`/articles/${item.slug}`)} className="flex items-center space-x-3.5 group">
                        <div className="flex-shrink-0 relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200/80">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex-grow min-w-0">
                            <h4 className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug group-hover:text-cyan-600 transition-colors line-clamp-2">
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
        title: `${articleData.title} | Dalaman.info`,
        description: articleData.description,
        openGraph: {
            title: `${articleData.title} | Dalaman.info`,
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
