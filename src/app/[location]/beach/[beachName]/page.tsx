import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { FaChevronRight, FaHome, FaCity, FaUmbrellaBeach } from 'react-icons/fa';

async function getBeachData(location: string, beachName: string) {
    const beachDirectory = path.join(process.cwd(), 'content', 'locations', location, 'beach', beachName);

    try {
        if (!fs.existsSync(beachDirectory)) {
            return null;
        }

        const files = fs.readdirSync(beachDirectory);
        const textFile = files.find(file => file.endsWith('.txt'));
        let description = '';
        let title = beachName;

        if (textFile) {
            const textContent = fs.readFileSync(path.join(beachDirectory, textFile), 'utf8');
            const lines = textContent.split('\n');
            title = lines[0] || beachName;
            description = lines.slice(1).join('\n').trim();
        }

        const images = files
            .filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i))
            .map(file => `/api/images/locations/${location}/beach/${beachName}/${file}`);

        return {
            title,
            description,
            images,
            beachName
        };
    } catch (error) {
        console.error(`Could not read beach data for ${location}/${beachName}:`, error);
        return null;
    }
}

type BeachPageProps = {
    params: {
        location: string;
        beachName: string;
    }
}

const BeachPage = async ({ params }: BeachPageProps) => {
    const { location, beachName } = params;
    const beachData = await getBeachData(location, beachName);

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

    if (!beachData) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center p-20">
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-slate-900 mb-4">Пляж не найден</h1>
                        <p className="text-slate-500">К сожалению, мы не смогли найти информацию о пляже '{beachName}'.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const heroImage = beachData.images.length > 0 ? beachData.images[0] : `/api/images/locations/${location}/beach/${beachName}/hero.jpg`;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
                    <Image
                        src={heroImage}
                        alt={beachData.title}
                        layout="fill"
                        objectFit="cover"
                        className="brightness-[0.7] transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-50/20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.5em] mb-4 drop-shadow-lg flex items-center gap-2">
                            <FaUmbrellaBeach /> ЛУЧШИЕ ПЛЯЖИ
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl uppercase italic">
                            {beachData.title}
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-10 relative z-10 pb-20">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] mb-10 bg-white/80 backdrop-blur-md p-4 rounded-full w-fit premium-shadow border border-white/50">
                        <Link href="/" className="text-slate-400 hover:text-cyan-600 flex items-center gap-1 transition-colors">
                            <FaHome size={12} /> ГЛАВНАЯ
                        </Link>
                        <FaChevronRight size={8} className="text-slate-300" />
                        <Link href={`/${location}`} className="text-slate-400 hover:text-cyan-600 flex items-center gap-1 transition-colors">
                            <FaCity size={12} /> {locationName}
                        </Link>
                        <FaChevronRight size={8} className="text-slate-300" />
                        <Link href={`/${location}/beaches`} className="text-slate-400 hover:text-cyan-600 transition-colors">
                            ПЛЯЖИ
                        </Link>
                        <FaChevronRight size={8} className="text-slate-300" />
                        <span className="text-cyan-600">{beachData.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <article className="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-16 premium-shadow border border-white">
                            <div className="prose prose-slate prose-lg max-w-none">
                                <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                                    {beachData.description}
                                </p>
                            </div>

                            {/* Gallery */}
                            {beachData.images.length > 1 && (
                                <div className="mt-16">
                                    <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase italic border-l-4 border-cyan-500 pl-6">Галерея пляжа</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {beachData.images.slice(1).map((image, index) => (
                                            <div key={index} className="relative h-64 rounded-[2rem] overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 cursor-zoom-in">
                                                <Image src={image} alt={`Фото ${index + 2}`} layout="fill" objectFit="cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                <Link href={`/${location}/beaches`} className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-cyan-600 transition-all">
                                    <span className="p-3 rounded-full bg-slate-50 group-hover:bg-cyan-50 transition-colors">←</span>
                                    Все пляжи {locationName}
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-8">
                            <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-white">
                                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase italic border-b border-slate-100 pb-4">Окрестности</h3>
                                <div className="space-y-4">
                                    <p className="text-xs text-slate-500 font-medium">Этот пляж находится недалеко от других интересных мест в регионе {locationName}.</p>
                                    <Link href={`/${location}`} className="block w-full py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full text-center hover:bg-cyan-600 transition-all">
                                        Исследовать {locationName}
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
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
            const locationDirectory = path.join(locationsDirectory, location);
            const beachDirectory = path.join(locationDirectory, 'beach');

            if (fs.existsSync(beachDirectory) && fs.statSync(beachDirectory).isDirectory()) {
                const beachItems = fs.readdirSync(beachDirectory);
                const beachDirectories = beachItems.filter(item => {
                    const itemPath = path.join(beachDirectory, item);
                    return fs.statSync(itemPath).isDirectory();
                });

                for (const beachName of beachDirectories) {
                    paths.push({
                        location: location,
                        beachName: beachName
                    });
                }
            }
        }
    } catch (error) {
        console.log('Could not generate static params for beaches:', error);
    }

    return paths;
}

export default BeachPage;