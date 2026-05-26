import React from 'react';
import fs from 'fs';
import path from 'path';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BeachesClient from './BeachesClient';

export interface BeachItem {
    id: string;
    title: string;
    description: string;
    image: string;
    location: string;
    locationName: string;
    href: string;
}

function getBeaches(): BeachItem[] {
    const locationsDirectory = path.join(process.cwd(), 'content', 'locations');
    const locations = fs.readdirSync(locationsDirectory).filter(item =>
        fs.statSync(path.join(locationsDirectory, item)).isDirectory()
    );

    const locationNames: Record<string, string> = {
        'dacha': 'Датча',
        'marmaris': 'Мармарис',
        'dalyan': 'Дальян',
        'koycegiz': 'Кёйджегиз',
        'dalaman': 'Даламан',
        'gocek': 'Гёджек',
        'fethiye': 'Фетхие',
        'kas': 'Каш'
    };

    const allBeaches: BeachItem[] = [];

    for (const location of locations) {
        const beachDir = path.join(locationsDirectory, location, 'beach');
        if (fs.existsSync(beachDir) && fs.statSync(beachDir).isDirectory()) {
            const beachItems = fs.readdirSync(beachDir);
            for (const item of beachItems) {
                const itemPath = path.join(beachDir, item);
                if (fs.statSync(itemPath).isDirectory()) {
                    const files = fs.readdirSync(itemPath);
                    const textFile = files.find(file => file.endsWith('.txt'));
                    let title = item;
                    let description = '';
                    if (textFile) {
                        const textContent = fs.readFileSync(path.join(itemPath, textFile), 'utf8');
                        const lines = textContent.split('\n');
                        title = lines[0] || item;
                        description = lines.slice(1).join('\n').trim();
                    }
                    const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i));
                    const image = imageFiles.length > 0 ? `/api/images/locations/${location}/beach/${item}/${imageFiles[0]}` : '/dalaman1.jpg';

                    allBeaches.push({
                        id: item,
                        title,
                        description,
                        image,
                        location,
                        locationName: locationNames[location] || location,
                        href: `/${location}/beach/${item}`
                    });
                }
            }
        }
    }
    return allBeaches;
}

const BeachesPage = () => {
    const beaches = getBeaches();

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow">
                {/* Banner Section */}
                <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-800 to-blue-900 opacity-90 z-10" />
                    <div className="absolute inset-0 z-0">
                        <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center brightness-[0.4]" />
                    </div>
                    <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4">
                        <span className="text-cyan-300 font-black text-xs uppercase tracking-[0.5em] mb-4">БИРЮЗОВОЕ ПОБЕРЕЖЬЕ</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase italic">
                            Лучшие пляжи региона
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium italic">
                            От бескрайних песчаных кос Олюдениза до уединенных скалистых бухт Датчи
                        </p>
                    </div>
                </div>

                {/* Main dynamic section */}
                <div className="container mx-auto px-4 -mt-10 relative z-30 pb-20">
                    <BeachesClient beaches={beaches} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BeachesPage;
