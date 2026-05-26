import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { FaChevronRight, FaHome, FaCity, FaUmbrellaBeach } from 'react-icons/fa';

async function getBeachData(location: string, beachName: string, locale: string) {
    const beachDirectory = path.join(process.cwd(), 'content', 'locations', location, 'beach', beachName);

    try {
        if (!fs.existsSync(beachDirectory)) {
            return null;
        }

        const files = fs.readdirSync(beachDirectory);
        // Find language specific text or fallback
        let textFile = files.find(file => file.toLowerCase() === `${beachName.toLowerCase()}.${locale}.txt`);
        if (!textFile) {
            textFile = files.find(file => file.toLowerCase() === `${beachName.toLowerCase()}.txt`);
        }
        if (!textFile) {
            textFile = files.find(file => file.endsWith('.txt'));
        }

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
        locale: string;
        location: string;
        beachName: string;
    }
}

const beachSpecs: Record<string, { cover: string, entry: string, amenities: string, access: string }> = {
    'Domuzbuku': { cover: 'Мелкая галька', entry: 'Умеренно глубокий', amenities: 'Дикий пляж, без инфраструктуры', access: 'Только на лодке' },
    'Kargi': { cover: 'Песок и галька', entry: 'Пологий', amenities: 'Шезлонги, зонтики, кафе', access: 'На автомобиле / долмуше' },
    'Kumluk': { cover: 'Мелкий золотистый песок', entry: 'Очень пологий, для детей', amenities: 'Полная инфраструктура, променад', access: 'В центре города, пешком' },
    'kelebekler': { cover: 'Крупная галька', entry: 'Глубокий', amenities: 'Базовое кафе, кемпинг', access: 'На лодке из Олюдениза' },
    'Turunc': { cover: 'Песок и мелкая галька', entry: 'Пологий, Голубой флаг', amenities: 'Шезлонги, рестораны, отели', access: 'На автомобиле / водном такси' },
    'Ciftlik': { cover: 'Крупный зернистый песок', entry: 'Умеренно пологий', amenities: 'Шезлонги, рыбные рестораны', access: 'На автомобиле / катере' },
    'Ciftebuk': { cover: 'Галька', entry: 'Глубокий, кристально чистый', amenities: 'Полностью дикий', access: 'На яхте или пешком' },
    'LakeBeach': { cover: 'Трава и песок (пресная вода)', entry: 'Очень пологий', amenities: 'Кафе, туалеты, прокат сапов', access: 'Пешком из Кёйджегиза' },
    'Ekincik': { cover: 'Темный песок и галька', entry: 'Умеренно глубокий', amenities: 'Марина, рестораны, кемпинг', access: 'На автомобиле / лодке' }
};

const locationNames: Record<string, Record<string, string>> = {
  en: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' },
  ru: { 'dacha': 'Дача', 'marmaris': 'Мармарис', 'dalyan': 'Дальян', 'koycegiz': 'Кёйджегиз', 'dalaman': 'Даламан', 'gocek': 'Гёджек', 'fethiye': 'Фетхие', 'kas': 'Kaш' },
  de: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' },
  tr: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' }
};

const BeachPage = async ({ params }: BeachPageProps) => {
    const { locale, location, beachName } = params;
    const activeLocale = locale || 'en';
    const beachData = await getBeachData(location, beachName, activeLocale);

    const spec = beachSpecs[beachName] || {
        cover: 'Галька и песок',
        entry: 'Умеренно пологий',
        amenities: 'Шезлонги, зонтики, кафе',
        access: 'На автомобиле или пешком'
    };

    const locationName = (locationNames[activeLocale] || locationNames['en'])[location] || location;

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${activeLocale}${cleanPath}`;
    };

    if (!beachData) {
        return (
            <div className="flex flex-col min-h-screen">
                
                <Header locale={activeLocale} />
                <main className="flex-grow flex items-center justify-center p-20">
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-slate-900 mb-4">
                            {activeLocale === 'ru' ? 'Пляж не найден' : 'Beach Not Found'}
                        </h1>
                        <p className="text-slate-500">
                            {activeLocale === 'ru' 
                                ? `К сожалению, мы не смогли найти информацию о пляже '${beachName}'.`
                                : `Sorry, we could not find info for beach '${beachName}'.`}
                        </p>
                    </div>
                </main>
                
                <Footer locale={activeLocale} />
            </div>
        );
    }

    const heroImage = beachData.images.length > 0 ? beachData.images[0] : `/api/images/locations/${location}/beach/${beachName}/hero.jpg`;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
            <Header locale={activeLocale} />
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
                            <FaUmbrellaBeach /> {activeLocale === 'ru' ? 'ЛУЧШИЕ ПЛЯЖИ' : 'BEST BEACHES'}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl uppercase italic">
                            {beachData.title}
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-10 relative z-10 pb-20">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] mb-10 bg-white/80 backdrop-blur-md p-4 rounded-full w-fit premium-shadow border border-white/50">
                        <Link href={localize('/')} className="text-slate-400 hover:text-cyan-600 flex items-center gap-1 transition-colors">
                            <FaHome size={12} /> {activeLocale === 'ru' ? 'ГЛАВНАЯ' : 'HOME'}
                        </Link>
                        <FaChevronRight size={8} className="text-slate-300" />
                        <Link href={localize(`/${location}`)} className="text-slate-400 hover:text-cyan-600 flex items-center gap-1 transition-colors">
                            <FaCity size={12} /> {locationName}
                        </Link>
                        <FaChevronRight size={8} className="text-slate-300" />
                        <Link href={localize(`/${location}/beaches`)} className="text-slate-400 hover:text-cyan-600 transition-colors">
                            {activeLocale === 'ru' ? 'ПЛЯЖИ' : 'BEACHES'}
                        </Link>
                        <FaChevronRight size={8} className="text-slate-300" />
                        <span className="text-cyan-600">{beachData.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <article className="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-16 premium-shadow border border-white">
                            <div className="markdown-body prose prose-slate prose-lg max-w-none">
                                <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                                    {beachData.description}
                                </p>
                            </div>

                            {/* Gallery */}
                            {beachData.images.length > 1 && (
                                <div className="mt-16">
                                    <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase italic border-l-4 border-cyan-500 pl-6">
                                        {activeLocale === 'ru' ? 'Галерея пляжа' : 'Beach Gallery'}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {beachData.images.slice(1).map((image, index) => (
                                            <div key={index} className="relative h-64 rounded-[2rem] overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 cursor-zoom-in">
                                                <Image src={image} alt={`Photo ${index + 2}`} layout="fill" objectFit="cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                <Link href={localize(`/${location}/beaches`)} className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-cyan-600 transition-all">
                                    <span className="p-3 rounded-full bg-slate-50 group-hover:bg-cyan-50 transition-colors">←</span>
                                    {activeLocale === 'ru' ? `Все пляжи ${locationName}` : `All beaches of ${locationName}`}
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* Beach Specs */}
                            <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-white space-y-6">
                                <h3 className="text-lg font-black text-slate-900 mb-4 uppercase italic border-b border-slate-100 pb-4">
                                    {activeLocale === 'ru' ? 'Характеристики' : 'Specifications'}
                                </h3>
                                <div className="space-y-4 text-xs font-medium text-slate-700">
                                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">
                                            {activeLocale === 'ru' ? 'Покрытие:' : 'Cover:'}
                                        </span>
                                        <span className="text-slate-800 font-black">{spec.cover}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">
                                            {activeLocale === 'ru' ? 'Вход в воду:' : 'Entry:'}
                                        </span>
                                        <span className="text-slate-800 font-black">{spec.entry}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">
                                            {activeLocale === 'ru' ? 'Удобства:' : 'Amenities:'}
                                        </span>
                                        <span className="text-slate-800 font-black text-right max-w-[180px] leading-tight">{spec.amenities}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">
                                            {activeLocale === 'ru' ? 'Доступность:' : 'Access:'}
                                        </span>
                                        <span className="text-slate-800 font-black">{spec.access}</span>
                                    </div>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(beachData.title + ' beach ' + locationName)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center block bg-cyan-600 text-white py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-100/50"
                                >
                                    {activeLocale === 'ru' ? 'Открыть на Google Maps' : 'Open on Google Maps'}
                                </a>
                            </div>

                            <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-white">
                                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase italic border-b border-slate-100 pb-4">
                                    {activeLocale === 'ru' ? 'Окрестности' : 'Surroundings'}
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-xs text-slate-500 font-medium">
                                        {activeLocale === 'ru' 
                                            ? `Этот пляж находится недалеко от других интересных мест в регионе ${locationName}.`
                                            : `This beach is located near other interesting spots in ${locationName}.`}
                                    </p>
                                    <Link href={localize(`/${location}`)} className="block w-full py-3.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full text-center hover:bg-cyan-600 transition-all">
                                        {activeLocale === 'ru' ? `Исследовать ${locationName}` : `Explore ${locationName}`}
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            
            <Footer locale={activeLocale} />
        </div>
    );
};

export async function generateStaticParams() {
    const locationsDirectory = path.join(process.cwd(), 'content', 'locations');
    const paths = [];
    const locales = ['en', 'ru', 'de', 'tr'];

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
                    for (const locale of locales) {
                        paths.push({
                            locale: locale,
                            location: location,
                            beachName: beachName
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.log('Could not generate static params for beaches:', error);
    }

    return paths;
}

export default BeachPage;