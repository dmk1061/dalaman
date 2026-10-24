import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import { FaHome, FaCity, FaHistory, FaChevronRight, FaCalendarAlt, FaLandmark, FaTicketAlt } from 'react-icons/fa';
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
  ru: { 'dacha': 'Датча', 'marmaris': 'Мармарис', 'dalyan': 'Дальян', 'koycegiz': 'Кёйджегиз', 'dalaman': 'Даламан', 'gocek': 'Гёджек', 'fethiye': 'Фетхие', 'kas': 'Каш' },
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
            <div className="flex flex-col min-h-screen bg-slate-50">
                <Header locale={activeLocale} />
                <main className="flex-grow portal-container py-16 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
                        {activeLocale === 'ru' ? 'Достопримечательность не найдена' : 'Sight Not Found'}
                    </h1>
                    <p className="text-slate-500">
                        {activeLocale === 'ru'
                            ? `К сожалению, мы не смогли найти информацию о достопримечательности «${sightName}» в ${locationName}.`
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
            <main className="flex-grow portal-container py-8 md:py-10 pb-20">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-8 bg-white px-4 py-2.5 rounded-full w-fit shadow-sm border border-slate-200/70">
                    <Link href={localize('/')} className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                        <FaHome size={12} className="text-cyan-600" />
                        <span>{ui.home}</span>
                    </Link>
                    <FaChevronRight size={9} className="text-slate-300" />
                    <Link href={localize(`/${location}`)} className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                        <FaCity size={12} className="text-cyan-600" />
                        <span>{locationName}</span>
                    </Link>
                    <FaChevronRight size={9} className="text-slate-300" />
                    <Link href={localize(`/${location}/sights`)} className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                        <FaHistory size={12} className="text-cyan-600" />
                        <span>{ui.sights}</span>
                    </Link>
                    <FaChevronRight size={9} className="text-slate-300" />
                    <span className="text-slate-900 font-bold truncate max-w-[220px]">{sightData.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Main Content Article */}
                    <article className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border border-slate-200/70">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                            {sightData.title}
                        </h1>

                        {/* Image Gallery */}
                        {sightData.images.length > 0 && (
                            <div className="mb-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {sightData.images.map((image, index) => (
                                        <div key={index} className={`relative overflow-hidden rounded-2xl shadow-sm border border-slate-200/70 ${index === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
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
                        <div className="markdown-body max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: sightData.description }} />
                        </div>

                        {/* Navigation link back */}
                        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <Link
                                href={localize(`/${location}/sights`)}
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-cyan-600 transition-colors"
                            >
                                {activeLocale === 'ru' ? `← Все достопримечательности ${locationName}` : `← ${ui.sights} of ${locationName}`}
                            </Link>
                        </div>
                    </article>

                    {/* Aside Quick Facts */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70 space-y-5">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                                {ui.quick_facts}
                            </h3>
                            <div className="space-y-3 text-xs text-slate-700">
                                <div className="flex justify-between py-1.5 border-b border-slate-100">
                                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                                        <FaCalendarAlt className="text-cyan-600" /> {ui.era_label}
                                    </span>
                                    <span className="text-slate-900 font-bold text-right">{ui.era_val}</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-slate-100">
                                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                                        <FaLandmark className="text-cyan-600" /> {ui.type_label}
                                    </span>
                                    <span className="text-slate-900 font-bold text-right">{ui.type_val}</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                                        <FaTicketAlt className="text-cyan-600" /> {ui.adm_label}
                                    </span>
                                    <span className="text-slate-900 font-bold text-right">{ui.adm_val}</span>
                                </div>
                            </div>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sightData.title + ' ' + locationName)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center block bg-cyan-600 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-cyan-700 transition-all shadow-sm"
                            >
                                {ui.gmaps}
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70">
                            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-100 pb-3">
                                {ui.surr}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                {ui.surr_desc}
                            </p>
                            <Link href={localize(`/${location}`)} className="block w-full py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center hover:bg-cyan-600 transition-all">
                                {`${ui.explore} ${locationName}`}
                            </Link>
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
        title: `${sightData.title} | ${locationName} | Dalaman.info`,
        description: cleanDescription,
        openGraph: {
            title: `${sightData.title} | ${locationName} | Dalaman.info`,
            description: cleanDescription,
            images: sightData.images.length > 0 ? [{ url: sightData.images[0] }] : []
        }
    };
}

export default SightPage;
