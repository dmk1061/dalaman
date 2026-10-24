import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaBookOpen, FaChevronRight, FaHome } from 'react-icons/fa';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

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
    if (!fs.existsSync(dir)) return result;
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

interface ArticleSummary {
    slug: string;
    title: string;
    description: string;
    image: string;
    category: string;
}

function getAllArticlesForLocale(locale: string): ArticleSummary[] {
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

    const items: ArticleSummary[] = [];
    for (const [slug, filePath] of Array.from(slugMap.entries())) {
        try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents);
            if (data.title) {
                const relDir = path.relative(articlesDirectory, path.dirname(filePath));
                items.push({
                    slug,
                    title: data.title,
                    description: data.description || '',
                    image: data.image || slugImages[slug] || '/dalaman1.jpg',
                    category: relDir.split(path.sep)[0] || 'general',
                });
            }
        } catch (e) {}
    }

    return items.sort((a, b) => a.title.localeCompare(b.title));
}

const hubTexts: Record<string, {
    eyebrow: string;
    title: string;
    subtitle: string;
    home: string;
    readArticle: string;
    countLabel: string;
}> = {
    ru: {
        eyebrow: 'БАЗА ЗНАНИЙ ПОРТАЛА',
        title: 'Путеводители, статьи и подготовка к поездке',
        subtitle: 'Все экспертные материалы о регионе от Датчи до Каша: транспорт, визы, яхтинг, античные города, пляжи и практические советы.',
        home: 'Главная',
        readArticle: 'Читать гид',
        countLabel: 'материалов в библиотеке',
    },
    en: {
        eyebrow: 'PORTAL KNOWLEDGE HUB',
        title: 'Travel Guides, Articles & Trip Preparation',
        subtitle: 'All expert guides across the Turquoise Coast from Datça to Kaş: transport, visas, yachting, ancient cities, beaches, and local tips.',
        home: 'Home',
        readArticle: 'Read guide',
        countLabel: 'guides in library',
    },
    de: {
        eyebrow: 'WISSENSDATENBANK DES PORTALS',
        title: 'Reiseführer, Artikel & Reisevorbereitung',
        subtitle: 'Alle Expertenartikel zur Region von Datça bis Kaş: Transport, Visa, Yachting, antike Städte, Strände und praktische Tipps.',
        home: 'Startseite',
        readArticle: 'Guide lesen',
        countLabel: 'Artikel in der Bibliothek',
    },
    tr: {
        eyebrow: 'PORTAL BİLGİ MERKEZİ',
        title: 'Gezi Rehberleri, Makaleler ve Seyahat Hazırlığı',
        subtitle: 'Datça\'dan Kaş\'a tüm uzman rehberler: ulaşım, vize, yatçılık, antik kentler, plajlar ve pratik yerel ipuçları.',
        home: 'Ana Sayfa',
        readArticle: 'Rehberi oku',
        countLabel: 'rehber mevcut',
    }
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const activeLocale = params.locale || 'ru';
    const t = hubTexts[activeLocale] || hubTexts['en'];
    return {
        title: `${t.title} | Dalaman.info`,
        description: t.subtitle,
    };
}

export default function ArticlesIndexPage({ params }: { params: { locale: string } }) {
    const activeLocale = params.locale || 'ru';
    const t = hubTexts[activeLocale] || hubTexts['en'];
    const articles = getAllArticlesForLocale(activeLocale);

    const localize = (p: string) => `/${activeLocale}${p.startsWith('/') ? p : `/${p}`}`;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header locale={activeLocale} />

            <main className="flex-grow">
                {/* Hero Banner */}
                <section className="relative bg-slate-900 text-white py-14 md:py-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <Image
                            src="/hero-bg.jpg"
                            alt={t.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90" />

                    <div className="relative z-10 portal-container">
                        <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-300 mb-6">
                            <Link href={localize('/')} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                                <FaHome size={12} /> {t.home}
                            </Link>
                            <FaChevronRight size={9} className="text-slate-500" />
                            <span className="text-cyan-400">{t.eyebrow}</span>
                        </nav>

                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-[11px] font-bold uppercase tracking-widest mb-4">
                            <FaBookOpen size={12} /> {t.eyebrow} • {articles.length} {t.countLabel}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 max-w-3xl">
                            {t.title}
                        </h1>
                        <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
                            {t.subtitle}
                        </p>
                    </div>
                </section>

                {/* Articles Grid */}
                <section className="portal-container py-10 md:py-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {articles.map((article) => {
                            const isPlaceholder = article.image.includes('/dalaman') || article.image.includes('/hero-bg');
                            return (
                                <Link
                                    key={article.slug}
                                    href={localize(`/articles/${article.slug}`)}
                                    className="group portal-card overflow-hidden flex flex-col h-full"
                                >
                                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {isPlaceholder && (
                                            <div className="absolute top-3 right-3 bg-slate-900/65 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-0.5 rounded border border-white/20 z-10">
                                                AI Illustration
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h2 className="font-bold text-base text-slate-900 group-hover:text-cyan-600 transition-colors mb-2 line-clamp-2 leading-snug">
                                            {article.title}
                                        </h2>
                                        {article.description && (
                                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4 flex-grow">
                                                {article.description}
                                            </p>
                                        )}
                                        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600 group-hover:text-cyan-700">
                                            <span>{t.readArticle}</span>
                                            <FaChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>

            <Footer locale={activeLocale} />
        </div>
    );
}
