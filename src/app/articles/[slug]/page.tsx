import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Image from 'next/image';
import Link from 'next/link';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Sidebar from '@/app/components/Sidebar';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

// Dynamic slug-to-image mapping
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

// Function to get other recommended articles
function getRecommendedArticles(currentSlug: string) {
    const filePaths = getArticleFilePaths();
    const list: any[] = [];
    
    for (const filePath of filePaths) {
        try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents);
            if (data.slug && data.slug !== currentSlug && data.title) {
                list.push({
                    title: data.title,
                    slug: data.slug,
                    image: slugImages[data.slug] || '/dalaman1.jpg'
                });
            }
        } catch (e) {
            // Ignore malformed files
        }
    }
    // Shuffle and pick 4
    return list.sort(() => 0.5 - Math.random()).slice(0, 4);
}

async function getArticleData(slug: string) {
    const filePaths = getArticleFilePaths();
    let fileContents = '';

    for (const filePath of filePaths) {
        const currentFileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(currentFileContents);
        if (matterResult.data.slug === slug) {
            fileContents = currentFileContents;
            break;
        }
    }

    if (!fileContents) {
        return null;
    }

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(remarkHtml, { sanitize: false })
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Determine hero image
    const image = matterResult.data.image || slugImages[slug] || '/hero-bg.jpg';

    return {
        title: matterResult.data.title || 'Статья',
        description: matterResult.data.description || '',
        image,
        contentHtml,
    };
}

type ArticlePageProps = {
    params: {
        slug: string;
    };
};

const ArticlePage = async ({ params }: ArticlePageProps) => {
    const articleData = await getArticleData(params.slug);

    if (!articleData) {
        return (
             <div className="flex flex-col min-h-screen bg-slate-50">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-black text-slate-800 mb-4">Статья не найдена</h1>
                    <Link href="/" className="inline-block mt-4 bg-cyan-600 text-white px-6 py-3 rounded-full font-bold">
                        На главную
                    </Link>
                </main>
                <Footer />
            </div>
        )
    }

    const recommended = getRecommendedArticles(params.slug);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            
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
                        <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em] mb-4">ПОЛЕЗНАЯ СТАТЬЯ</span>
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
                        <aside className="w-full lg:w-1/3 space-y-10">
                            {recommended.length > 0 && (
                                <RecommendedWidget items={recommended} />
                            )}
                            <Sidebar />
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const RecommendedWidget = ({ items }: { items: any[] }) => (
    <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50 p-6 space-y-6">
        <h3 className="font-black text-sm uppercase tracking-widest italic border-b border-slate-100 pb-4 text-slate-800">
            Рекомендуем прочитать
        </h3>
        <div className="space-y-6">
            {items.map((item) => (
                <Link key={item.slug} href={`/articles/${item.slug}`} className="flex items-center space-x-4 group">
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

export async function generateStaticParams() {
    const filePaths = getArticleFilePaths();
    return filePaths.map(filePath => {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContents);
        return {
            slug: matterResult.data.slug,
        }
    }).filter(item => item.slug);
}

export default ArticlePage;