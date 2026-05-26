import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

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
            description = lines.slice(1).join('\n').trim();
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

    return (
        <div className="flex flex-col min-h-screen">
            
            <Header locale={activeLocale} />
            <main className="flex-grow container mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">{sightData.title}</h1>
                    
                    {/* Image Gallery */}
                    {sightData.images.length > 0 && (
                        <div className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {sightData.images.map((image, index) => (
                                    <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                                        <Image
                                            src={image}
                                            alt={`${sightData.sightName} - photo ${index + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="markdown-body prose lg:prose-xl max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {sightData.description}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <Link 
                            href={localize(`/${location}/sights`)}
                            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-cyan-600 transition-colors"
                        >
                            {activeLocale === 'ru' ? `← Все достопримечательности ${locationName}` : `← All sights of ${locationName}`}
                        </Link>

                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sightData.title + ' ' + locationName)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3.5 bg-cyan-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-100/50"
                        >
                            {activeLocale === 'ru' ? 'Открыть на Google Maps' : 'Open on Google Maps'}
                        </a>
                    </div>
                </article>
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

export default SightPage;