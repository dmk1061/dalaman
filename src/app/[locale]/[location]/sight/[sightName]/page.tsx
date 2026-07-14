import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import { FaHome, FaCity, FaHistory, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt, FaLandmark, FaTicketAlt } from 'react-icons/fa';
import Footer from '@/app/components/Footer';
import { Metadata } from 'next';

import { remark } from 'remark';
import html from 'remark-html';

async function getSightData(location: string, sightName: string, locale: string) {
    const possiblePaths = [
        path.join(process.cwd(), 'content', 'locations', location, 'ruine', sightName),
        path.join(process.cwd(), 'content', 'locations', location, 'ruines', sightName),
        path.join(process.cwd(), 'content', 'locations', location, 'todo', sightName),
        path.join(process.cwd(), 'content', 'locations', location, sightName)
    ];
    
    let sightDirectory: string | null = null;
    
    for (const dirPath of possiblePaths) {
        if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
            sightDirectory = dirPath;
            break;
        }
    }
    
    if (!sightDirectory) {
        return null;
    }

    try {
        const files = fs.readdirSync(sightDirectory);
        
        let textFile = files.find(file => file.toLowerCase() === `${sightName.toLowerCase()}.${locale}.txt`);
        if (!textFile) {
            textFile = files.find(file => file.toLowerCase() === `${sightName.toLowerCase()}.txt`);
        }
        if (!textFile) {
            textFile = files.find(file => file.endsWith('.txt'));
        }
        let description = '';
        let title = sightName;
        
        if (textFile) {
            const textContent = fs.readFileSync(path.join(sightDirectory, textFile), 'utf8');
            const lines = textContent.split('\n');
            title = lines[0] || sightName;
            const rawDescription = lines.slice(1).join('\n').trim();
            
            const processedContent = await remark()
                .use(html as any)
                .process(rawDescription);
            description = processedContent.toString();
        }

        const pathSegment = sightDirectory.includes('ruine') ? 'ruine' : 
                          sightDirectory.includes('ruines') ? 'ruines' : 
                          sightDirectory.includes('todo') ? 'todo' : '';
        
        const images = files
            .filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i))
            .map(file => `/api/images/locations/${location}/${pathSegment}/${sightName}/${file}`);

        return {
            title,
            description,
            images,
            sightName
        };
    } catch (error) {
        console.error(`Could not read sight data for ${location}/${sightName}:`, error);
        return null;
    }
}

type SightPageProps = {
    params: {
        locale: string;
        location: string;
        sightName: string;
    }
}

const uiTextsByLocale: Record<string, any> = {
    ru: {
        home: 'Главная',
        sights: 'Достопримечательности',
        quick_facts: 'Историческая сводка',
        era_label: 'Эпоха / Период:',
        era_val: 'Античность / Ликийский союз',
        type_label: 'Тип объекта:',
        type_val: 'Исторический памятник',
        adm_label: 'Вход:',
        adm_val: 'Museum Pass / Свободный',
        gmaps: 'Открыть на Google Maps',
        surr: 'Окрестности',
        surr_desc: 'Этот объект находится недалеко от других живописных мест региона.',
        explore: 'Исследовать'
    },
    en: {
        home: 'Home',
        sights: 'Sights & Ruins',
        quick_facts: 'Quick Facts',
        era_label: 'Era / Period:',
        era_val: 'Antiquity / Lycian League',
        type_label: 'Type:',
        type_val: 'Historical Monument',
        adm_label: 'Admission:',
        adm_val: 'Museum Pass / Free',
        gmaps: 'Open on Google Maps',
        surr: 'Surroundings',
        surr_desc: 'This site is located near other scenic landmarks across the region.',
        explore: 'Explore'
    },
    de: {
        home: 'Startseite',
        sights: 'Sehenswürdigkeiten',
        quick_facts: 'Historische Übersicht',
        era_label: 'Epoche / Periode:',
        era_val: 'Antike / Lykischer Bund',
        type_label: 'Objekttyp:',
        type_val: 'Historisches Denkmal',
        adm_label: 'Eintritt:',
        adm_val: 'Museum Pass / Frei',
        gmaps: 'Auf Google Maps öffnen',
        surr: 'Umgebung',
        surr_desc: 'Dieses Objekt befindet sich in der Nähe weiterer Attraktionen in der Region.',
        explore: 'Erkunden'
    },
    tr: {
        home: 'Ana Sayfa',
        sights: 'Görülecek Yerler',
        quick_facts: 'Kısa Özet',
        era_label: 'Dönem:',
        era_val: 'Antik Çağ / Likya Birliği',
        type_label: 'Anıt Türü:',
        type_val: 'Tarihi ve Kültürel Anıt',
        adm_label: 'Giriş Ücreti:',
        adm_val: 'Müzekart / Ücretsiz',
        gmaps: 'Google Haritalarda Aç',
        surr: 'Çevresi',
        surr_desc: 'Bu tarihi alan, bölgedeki diğer ilgi çekici noktalara yakın mesafededir.',
        explore: 'Keşfet'
    }
};

const locationNames: Record<string, Record<string, string>> = {
  en: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' },
  ru: { 'dacha': 'Дача', 'marmaris': 'Мармарис', 'dalyan': 'Дальян', 'koycegiz': 'Кёйджегиз', 'dalaman': 'Даламан', 'gocek': 'Гёджек', 'fethiye': 'Фетхие', 'kas': 'Kaш' },
  de: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' },
  tr: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' }
};

const SightPage = async ({ params }: SightPageProps) => {
    const { locale, location, sightName } = params;
    const activeLocale = locale || 'en';
    const sightData = await getSightData(location, sightName, activeLocale);

    const locationName = (locationNames[activeLocale] || locationNames['en'])[location] || location;

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${activeLocale}${cleanPath}`;
    };

    if (!sightData) {
        return (
            <div className="flex flex-col min-h-screen">
                
                <Header locale={activeLocale} />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4">
                        {activeLocale === 'ru' ? 'Достопримечательность не найдена' : 'Sight Not Found'}
                    </h1>
                    <p>
                        {activeLocale === 'ru'
                            ? `К сожалению, мы не смогли найти информацию о достопримечательности '${sightName}' в ${locationName}.`
                            : `Sorry, we could not find info for sight '${sightName}' in ${locationName}.`}
                    </p>
                </main>
                
                <Footer locale={activeLocale} />
            </div>
        );
    }

    const ui = uiTextsByLocale[activeLocale] || uiTextsByLocale['en'];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header locale={activeLocale} />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-8 overflow-x-auto pb-2">
                    <Link href={localize('/')} className="flex items-center hover:text-cyan-600 transition-colors">
                        <FaHome className="mr-1.5 text-cyan-600" />
                        <span>{ui.home}</span>
                    </Link>
                    <FaChevronRight size={10} className="text-slate-300" />
                    <Link href={localize(`/${location}`)} className="flex items-center hover:text-cyan-600 transition-colors">
                        <FaCity className="mr-1.5 text-cyan-600" />
                        <span>{locationName}</span>
                    </Link>
                    <FaChevronRight size={10} className="text-slate-300" />
                    <Link href={localize(`/${location}/sights`)} className="flex items-center hover:text-cyan-600 transition-colors">
                        <FaHistory className="mr-1.5 text-cyan-600" />
                        <span>{ui.sights}</span>
                    </Link>
                    <FaChevronRight size={10} className="text-slate-300" />
                    <span className="text-slate-700 font-black truncate max-w-[200px]">{sightData.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Main Content Article */}
                    <article className="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-14 premium-shadow border border-white">
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 uppercase italic tracking-tight leading-tight">
                            {sightData.title}
                        </h1>
                        
                        {/* Image Gallery */}
                        {sightData.images.length > 0 && (
                            <div className="mb-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {sightData.images.map((image, index) => (
                                        <div key={index} className={`relative overflow-hidden rounded-3xl premium-shadow border border-slate-100 ${index === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
                                            <Image
                                                src={image}
                                                alt={`${sightData.sightName} - photo ${index + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div className="markdown-body prose lg:prose-xl max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-a:text-cyan-600">
                            <div 
                                dangerouslySetInnerHTML={{ __html: sightData.description }}
                                className="text-slate-700 leading-relaxed font-medium"
                            />
                        </div>

                        {/* Navigation link back */}
                        <div className="mt-14 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <Link 
                                href={localize(`/${location}/sights`)}
                                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-cyan-600 transition-colors"
                            >
                                {activeLocale === 'ru' ? `← Все достопримечательности ${locationName}` : `← ${ui.sights} of ${locationName}`}
                            </Link>
                        </div>
                    </article>

                    {/* Aside Quick Facts */}
                    <aside className="lg:col-span-4 space-y-8 sticky top-28">
                        <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-white space-y-6">
                            <h3 className="text-lg font-black text-slate-900 mb-4 uppercase italic border-b border-slate-100 pb-4">
                                {ui.quick_facts}
                            </h3>
                            <div className="space-y-4 text-xs font-medium text-slate-700">
                                <div className="flex justify-between py-2 border-b border-slate-50">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                        <FaCalendarAlt className="text-cyan-600" /> {ui.era_label}
                                    </span>
                                    <span className="text-slate-800 font-black text-right">{ui.era_val}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-50">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                        <FaLandmark className="text-cyan-600" /> {ui.type_label}
                                    </span>
                                    <span className="text-slate-800 font-black text-right">{ui.type_val}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                        <FaTicketAlt className="text-cyan-600" /> {ui.adm_label}
                                    </span>
                                    <span className="text-slate-800 font-black text-right">{ui.adm_val}</span>
                                </div>
                            </div>
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sightData.title + ' ' + locationName)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center block bg-cyan-600 text-white py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-100/50"
                            >
                                {ui.gmaps}
                            </a>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-white">
                            <h3 className="text-lg font-black text-slate-900 mb-6 uppercase italic border-b border-slate-100 pb-4">
                                {ui.surr}
                            </h3>
                            <div className="space-y-4">
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    {ui.surr_desc}
                                </p>
                                <Link href={localize(`/${location}`)} className="block w-full py-3.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full text-center hover:bg-cyan-600 transition-all">
                                    {`${ui.explore} ${locationName}`}
                                </Link>
                            </div>
                        </div>
                    </aside>
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
            const possibleSightDirs = ['ruine', 'ruines', 'todo'];
            
            for (const sightDir of possibleSightDirs) {
                const sightPath = path.join(locationDirectory, sightDir);
                if (fs.existsSync(sightPath) && fs.statSync(sightPath).isDirectory()) {
                    const sightItems = fs.readdirSync(sightPath);
                    
                    const sightDirectories = sightItems.filter(item => {
                        const itemPath = path.join(sightPath, item);
                        return fs.statSync(itemPath).isDirectory();
                    });

                    for (const sightName of sightDirectories) {
                        for (const locale of locales) {
                            paths.push({
                                locale: locale,
                                location: location,
                                sightName: sightName
                            });
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.log('Could not generate static params for sights:', error);
    }

    return paths;
}

export async function generateMetadata({ params }: SightPageProps): Promise<Metadata> {
    const { locale, location, sightName } = params;
    const activeLocale = locale || 'en';
    const sightData = await getSightData(location, sightName, activeLocale);

    if (!sightData) {
        return {
            title: activeLocale === 'ru' ? 'Достопримечательность не найдена' : 'Sight Not Found',
        };
    }

    const cleanDescription = sightData.description
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 160) + '...';

    const locationName = (locationNames[activeLocale] || locationNames['en'])[location] || location;

    return {
        title: `${sightData.title} | ${locationName} | Dolaman.info`,
        description: cleanDescription,
        openGraph: {
            title: `${sightData.title} | ${locationName} | Dolaman.info`,
            description: cleanDescription,
            images: sightData.images.length > 0 ? [{ url: sightData.images[0] }] : []
        }
    };
}

export default SightPage;