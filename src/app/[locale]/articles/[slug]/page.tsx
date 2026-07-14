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
    ru: { badge: 'ПОЛЕЗНАЯ СТАТЬЯ', toc: 'Содержание', rec: 'Рекомендуем прочитать', home: 'На главную', not_found: 'Статья не найдена' },
    en: { badge: 'USEFUL ARTICLE', toc: 'Table of Contents', rec: 'Recommended Reading', home: 'Go Home', not_found: 'Article Not Found' },
    de: { badge: 'NÜTZLICHER ARTIKEL', toc: 'Inhalt', rec: 'Empfohlene Artikel', home: 'Zur Startseite', not_found: 'Artikel nicht gefunden' },
    tr: { badge: 'FAYDALI MAKALE', toc: 'İçindekiler', rec: 'Önerilen Makaleler', home: 'Ana Sayfa', not_found: 'Makale Bulunamadı' }
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
                    <div className="relative z-20 flex flex-col justify-end h-full max-w-5xl mx-auto px-4 pb-12">
                        <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em] mb-4">
                            {(articleUiByLocale[activeLocale] || articleUiByLocale['en']).badge}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tight leading-tight">
                            {articleData.title}
                        </h1>
                        <p className="text-base md:text-lg text-slate-200 font-medium max-w-3xl leading-relaxed">
                            {articleData.description}
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="container mx-auto px-4 py-12 pb-20">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Article Text Content */}
                        <div className="w-full lg:w-2/3">
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 premium-shadow border border-slate-50">
                                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
                            </div>
                        </div>

                        {/* Sidebars */}
                        <aside className="w-full lg:w-1/3 space-y-10 sticky top-28 self-start">
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