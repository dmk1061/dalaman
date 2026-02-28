import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CityArticle from '@/app/components/CityArticle';
import { getMarkdownData } from '@/lib/markdown';
import path from 'path';
import fs from 'fs';

async function getLocationPageData(location: string, subpage: string) {
    const filePath = path.join(process.cwd(), 'content', 'locations', location, `${subpage}.md`);
    const data = await getMarkdownData(filePath);
    return data as { title?: string; description?: string; contentHtml: string } | null;
}

type SubPageProps = {
    params: {
        location: string;
        subpage: string;
    }
}

const LocationSubPage = async ({ params }: SubPageProps) => {
    const { location, subpage } = params;
    const pageData = await getLocationPageData(location, subpage);

    const locationNames: Record<string, string> = {
        'dacha': 'Дача',
        'marmaris': 'Мармарис',
        'dalyan': 'Дальян',
        'koycegiz': 'Кёйджегиз',
        'dalaman': 'Даламан',
        'gocek': 'Гёджек',
        'fethiye': 'Фетхие',
        'kas': 'Каш'
    };

    const locationName = locationNames[location] || location;

    if (!pageData) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center p-20">
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-slate-900 mb-4">Раздел не найден</h1>
                        <p className="text-slate-500">К сожалению, мы не смогли найти информацию для '{location}/{subpage}'.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    let heroImage = `/api/images/locations/${location}/ruine/knidos/knidos.jpg`;
    try {
        const beachDir = path.join(process.cwd(), 'content', 'locations', location, 'beach');
        if (fs.existsSync(beachDir)) {
            const subDirs = fs.readdirSync(beachDir).filter(d => fs.statSync(path.join(beachDir, d)).isDirectory());
            if (subDirs.length > 0) {
                const files = fs.readdirSync(path.join(beachDir, subDirs[0])).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
                if (files.length > 0) {
                    heroImage = `/api/images/locations/${location}/beach/${subDirs[0]}/${files[0]}`;
                }
            }
        }
    } catch (e) { }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <CityArticle
                    title={pageData.title as string}
                    description={pageData.description as string}
                    contentHtml={pageData.contentHtml}
                    location={location}
                    locationName={locationName}
                    heroImage={heroImage}
                />
            </main>
            <Footer />
        </div>
    );
};

export async function generateStaticParams() {
    const locationsDirectory = path.join(process.cwd(), 'content', 'locations');
    const paths = [];

    try {
        const locations = fs.readdirSync(locationsDirectory).filter(item =>
            fs.statSync(path.join(locationsDirectory, item)).isDirectory()
        );

        for (const location of locations) {
            const subpagesDirectory = path.join(locationsDirectory, location);
            const subpageFiles = fs.readdirSync(subpagesDirectory).filter(file => file.endsWith('.md'));

            for (const file of subpageFiles) {
                paths.push({
                    location: location,
                    subpage: file.replace(/\.md$/, '')
                });
            }
        }
    } catch (error) {
        console.log('Could not generate static params for locations', error);
    }

    return paths;
}

export default LocationSubPage;