import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

// Функция для получения данных статьи по слагу
async function getArticleData(slug: string) {
    const fileNames = fs.readdirSync(articlesDirectory);
    let fullPath = '';
    let fileContents = '';

    for (const fileName of fileNames) {
        const filePath = path.join(articlesDirectory, fileName);
        const currentFileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(currentFileContents);
        if (matterResult.data.slug === slug) {
            fullPath = filePath;
            fileContents = currentFileContents;
            break;
        }
    }

    if (!fileContents) {
        return null; // или обработать как 404
    }

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        title: matterResult.data.title,
        description: matterResult.data.description,
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
             <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <article>
                    <h1 className="text-4xl font-bold mb-2">{articleData.title}</h1>
                    <p className="text-lg text-gray-500 mb-8">{articleData.description}</p>
                    <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
                </article>
            </main>
            <Footer />
        </div>
    );
};

// Функция для генерации статических путей
export async function generateStaticParams() {
    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames.map(fileName => {
        const fileContents = fs.readFileSync(path.join(articlesDirectory, fileName), 'utf8');
        const matterResult = matter(fileContents);
        return {
            slug: matterResult.data.slug,
        }
    }).filter(item => item.slug); // Фильтруем те, у которых есть slug
}


export default ArticlePage; 