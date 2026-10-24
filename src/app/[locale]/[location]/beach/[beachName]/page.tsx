import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { FaChevronRight, FaHome, FaCity, FaUmbrellaBeach } from 'react-icons/fa';
import { Metadata } from 'next';

import { remark } from 'remark';
import html from 'remark-html';

async function getBeachData(location: string, beachName: string, locale: string) {
    const beachDirectory = path.join(process.cwd(), 'content', 'locations', location, 'beach', beachName);

    try {
        if (!fs.existsSync(beachDirectory)) {
            return null;
        }

        const files = fs.readdirSync(beachDirectory);
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
            const rawDescription = lines.slice(1).join('\n').trim();

            const processedContent = await remark()
                .use(html as any)
                .process(rawDescription);
            description = processedContent.toString();
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

const beachSpecsMulti: Record<string, Record<string, { cover: string, entry: string, amenities: string, access: string }>> = {
    'Domuzbuku': {
        ru: { cover: 'Мелкая галька', entry: 'Умеренно глубокий', amenities: 'Дикий пляж, без инфраструктуры', access: 'Только на лодке' },
        en: { cover: 'Fine pebbles', entry: 'Moderately deep', amenities: 'Wild beach, no infrastructure', access: 'Boat access only' },
        de: { cover: 'Feiner Kiesel', entry: 'Mäßig tief', amenities: 'Naturstrand, keine Infrastruktur', access: 'Nur per Boot erreichbar' },
        tr: { cover: 'İnce çakıl', entry: 'Orta derinlikte', amenities: 'Bakir plaj, tesis yok', access: 'Sadece tekne ile ulaşım' }
    },
    'Kargi': {
        ru: { cover: 'Песок и галька', entry: 'Пологий', amenities: 'Шезлонги, зонтики, кафе', access: 'На автомобиле / долмуше' },
        en: { cover: 'Sand and pebbles', entry: 'Gentle slope', amenities: 'Sunbeds, umbrellas, cafes', access: 'By car / dolmus minibus' },
        de: { cover: 'Sand und Kiesel', entry: 'Flach abfallend', amenities: 'Liegen, Schirme, Cafés', access: 'Mit Auto / Dolmus Minibus' },
        tr: { cover: 'Kum ve çakıl', entry: 'Sığ ve eğimli', amenities: 'Şezlong, şemsiye, kafe', access: 'Araç / dolmuş ile ulaşım' }
    },
    'Kumluk': {
        ru: { cover: 'Мелкий золотистый песок', entry: 'Очень пологий, для детей', amenities: 'Полная инфраструктура, променад', access: 'В центре города, пешком' },
        en: { cover: 'Fine golden sand', entry: 'Very shallow, kid-friendly', amenities: 'Full infrastructure, promenade', access: 'In city center, walking distance' },
        de: { cover: 'Feiner goldener Sand', entry: 'Sehr flach, kinderfreundlich', amenities: 'Volle Infrastruktur, Promenade', access: 'Im Stadtzentrum, zu Fuß' },
        tr: { cover: 'İnce altın kum', entry: 'Çok sığ, çocuklara uygun', amenities: 'Tam altyapı, sahil yolu', access: 'Şehir merkezinde, yürüme mesafesi' }
    },
    'kelebekler': {
        ru: { cover: 'Крупная галька', entry: 'Глубокий', amenities: 'Базовое кафе, кемпинг', access: 'На лодке из Олюдениза' },
        en: { cover: 'Coarse pebbles', entry: 'Deep water', amenities: 'Basic cafe, camping area', access: 'By boat from Oludeniz' },
        de: { cover: 'Grobe Kieselsteine', entry: 'Tiefes Wasser', amenities: 'Einfaches Café, Campingplatz', access: 'Per Boot ab Ölüdeniz' },
        tr: { cover: 'İri çakıl', entry: 'Derin su', amenities: 'Temel kafe, kamp alanı', access: 'Ölüdeniz den tekne ile' }
    },
    'Turunc': {
        ru: { cover: 'Песок и мелкая галька', entry: 'Пологий, Голубой флаг', amenities: 'Шезлонги, рестораны, отели', access: 'На автомобиле / водном такси' },
        en: { cover: 'Sand and fine pebbles', entry: 'Gentle slope, Blue Flag', amenities: 'Sunbeds, restaurants, hotels', access: 'By car / water taxi' },
        de: { cover: 'Sand und feiner Kiesel', entry: 'Flach abfallend, Blaue Flagge', amenities: 'Liegen, Restaurants, Hotels', access: 'Mit Auto / Wassertaxi' },
        tr: { cover: 'Kum ve ince çakıl', entry: 'Sığ giriş, Mavi Bayrak', amenities: 'Şezlong, restoranlar, oteller', access: 'Araç / su taksisi ile' }
    },
    'Ciftlik': {
        ru: { cover: 'Крупный зернистый песок', entry: 'Умеренно пологий', amenities: 'Шезлонги, рыбные рестораны', access: 'На автомобиле / катере' },
        en: { cover: 'Coarse grainy sand', entry: 'Moderately gentle', amenities: 'Sunbeds, fish restaurants', access: 'By car / speedboat' },
        de: { cover: 'Grober Sand', entry: 'Mäßig flach', amenities: 'Sonnenliegen, Fischrestaurants', access: 'Mit Auto / Schnellboot' },
        tr: { cover: 'İri taneli kum', entry: 'Orta eğimli', amenities: 'Şezlong, balık restoranları', access: 'Araç / tekne ile' }
    },
    'Ciftebuk': {
        ru: { cover: 'Галька', entry: 'Глубокий, кристально чистый', amenities: 'Полностью дикий', access: 'На яхте или пешком' },
        en: { cover: 'Pebbles', entry: 'Deep, crystal clear water', amenities: 'Completely wild', access: 'By yacht or hiking' },
        de: { cover: 'Kieselsteine', entry: 'Tief, kristallklares Wasser', amenities: 'Völlig naturbelassen', access: 'Mit Yacht oder Wandern' },
        tr: { cover: 'Çakıl', entry: 'Derin, berrak su', amenities: 'Tamamen bakir', access: 'Yat veya yürüyüş ile' }
    },
    'LakeBeach': {
        ru: { cover: 'Трава и песок (пресная вода)', entry: 'Очень пологий', amenities: 'Кафе, туалеты, прокат сапов', access: 'Пешком из Кёйджегиза' },
        en: { cover: 'Grass and sand (freshwater)', entry: 'Very gentle slope', amenities: 'Cafe, restrooms, SUP rental', access: 'Walking from Koycegiz' },
        de: { cover: 'Gras und Sand (Süßwasser)', entry: 'Sehr flach abfallend', amenities: 'Café, Toiletten, SUP-Verleih', access: 'Zu Fuß ab Köyceğiz' },
        tr: { cover: 'Çim ve kum (tatlı su)', entry: 'Çok sığ ve sakin', amenities: 'Kafe, tuvalet, SUP kiralama', access: 'Köyceğiz den yürüyerek' }
    },
    'Ekincik': {
        ru: { cover: 'Темный песок и галька', entry: 'Умеренно глубокий', amenities: 'Марина, рестораны, кемпинг', access: 'На автомобиле / лодке' },
        en: { cover: 'Dark sand and pebbles', entry: 'Moderately deep', amenities: 'Marina, restaurants, camping', access: 'By car / excursion boat' },
        de: { cover: 'Dunkler Sand und Kiesel', entry: 'Mäßig tief', amenities: 'Yachthafen, Restaurants, Camping', access: 'Mit Auto / Ausflugsboot' },
        tr: { cover: 'Koyu kum ve çakıl', entry: 'Orta derinlikte', amenities: 'Marina, restoranlar, kamp', access: 'Araç / gezi teknesi ile' }
    }
};

const defaultSpecsByLocale: Record<string, { cover: string, entry: string, amenities: string, access: string }> = {
    ru: { cover: 'Галька и песок', entry: 'Умеренно пологий', amenities: 'Шезлонги, зонтики, кафе', access: 'На автомобиле или пешком' },
    en: { cover: 'Pebbles and sand', entry: 'Gentle slope', amenities: 'Sunbeds, umbrellas, beach cafe', access: 'By car or short walk' },
    de: { cover: 'Kiesel und Sand', entry: 'Flach abfallend', amenities: 'Liegen, Schirme, Strandcafé', access: 'Mit dem Auto oder zu Fuß' },
    tr: { cover: 'Çakıl ve kum', entry: 'Orta eğimli ve sığ', amenities: 'Şezlong, şemsiye, sahil kafesi', access: 'Araçla veya yürüyerek' }
};

const uiTextsByLocale: Record<string, any> = {
    ru: { specs: 'Характеристики пляжа', cover: 'Покрытие:', entry: 'Вход в воду:', amenities: 'Удобства:', access: 'Доступность:', gmaps: 'Открыть на Google Maps', surr: 'Окрестности', explore: 'Исследовать' },
    en: { specs: 'Beach Specifications', cover: 'Cover:', entry: 'Entry:', amenities: 'Amenities:', access: 'Access:', gmaps: 'Open on Google Maps', surr: 'Surroundings', explore: 'Explore' },
    de: { specs: 'Strandspezifikationen', cover: 'Belag:', entry: 'Einstieg:', amenities: 'Ausstattung:', access: 'Anfahrt:', gmaps: 'Auf Google Maps öffnen', surr: 'Umgebung', explore: 'Erkunden' },
    tr: { specs: 'Plaj Özellikleri', cover: 'Zemin:', entry: 'Deniz Girişi:', amenities: 'İmkanlar:', access: 'Ulaşım:', gmaps: 'Google Haritalarda Aç', surr: 'Çevresi', explore: 'Keşfet' }
};

const locationNames: Record<string, Record<string, string>> = {
  en: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' },
  ru: { 'dacha': 'Датча', 'marmaris': 'Мармарис', 'dalyan': 'Дальян', 'koycegiz': 'Кёйджегиз', 'dalaman': 'Даламан', 'gocek': 'Гёджек', 'fethiye': 'Фетхие', 'kas': 'Каш' },
  de: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' },
  tr: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' }
};

const BeachPage = async ({ params }: BeachPageProps) => {
    const { locale, location, beachName } = params;
    const activeLocale = locale || 'en';
    const beachData = await getBeachData(location, beachName, activeLocale);

    const specObj = beachSpecsMulti[beachName] || {};
    const spec = specObj[activeLocale] || specObj['en'] || defaultSpecsByLocale[activeLocale] || defaultSpecsByLocale['en'];
    const ui = uiTextsByLocale[activeLocale] || uiTextsByLocale['en'];

    const locationName = (locationNames[activeLocale] || locationNames['en'])[location] || location;

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${activeLocale}${cleanPath}`;
    };

    if (!beachData) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-50">
                <Header locale={activeLocale} />
                <main className="flex-grow flex items-center justify-center p-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
                            {activeLocale === 'ru' ? 'Пляж не найден' : 'Beach Not Found'}
                        </h1>
                        <p className="text-slate-500">
                            {activeLocale === 'ru'
                                ? `К сожалению, мы не смогли найти информацию о пляже «${beachName}».`
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
                <div className="relative h-[44vh] min-h-[340px] overflow-hidden flex items-center">
                    <Image
                        src={heroImage}
                        alt={beachData.title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/40 to-slate-950/75" />
                    <div className="relative z-10 portal-container text-center px-4">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-cyan-300 font-bold text-xs uppercase tracking-widest mb-3">
                            <FaUmbrellaBeach /> {locationName}
                        </span>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            {beachData.title}
                        </h1>
                    </div>
                </div>

                <div className="portal-container py-8 md:py-10 pb-20">
                    {/* Breadcrumbs */}
                    <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-8 bg-white px-4 py-2.5 rounded-full w-fit shadow-sm border border-slate-200/70">
                        <Link href={localize('/')} className="hover:text-cyan-600 flex items-center gap-1.5 transition-colors">
                            <FaHome size={12} className="text-cyan-600" /> {activeLocale === 'ru' ? 'Главная' : 'Home'}
                        </Link>
                        <FaChevronRight size={9} className="text-slate-300" />
                        <Link href={localize(`/${location}`)} className="hover:text-cyan-600 flex items-center gap-1.5 transition-colors">
                            <FaCity size={12} className="text-cyan-600" /> {locationName}
                        </Link>
                        <FaChevronRight size={9} className="text-slate-300" />
                        <Link href={localize(`/${location}/beaches`)} className="hover:text-cyan-600 transition-colors">
                            {activeLocale === 'ru' ? 'Пляжи' : 'Beaches'}
                        </Link>
                        <FaChevronRight size={9} className="text-slate-300" />
                        <span className="text-slate-900 font-bold">{beachData.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Main Content */}
                        <article className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border border-slate-200/70">
                            <div className="markdown-body max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: beachData.description }} />
                            </div>

                            {/* Gallery */}
                            {beachData.images.length > 1 && (
                                <div className="mt-12">
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 border-l-4 border-cyan-500 pl-4">
                                        {activeLocale === 'ru' ? 'Фотогалерея пляжа' : 'Beach Photo Gallery'}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {beachData.images.slice(1).map((image, index) => (
                                            <div key={index} className="relative h-60 rounded-2xl overflow-hidden shadow-sm border border-slate-200/70">
                                                <Image src={image} alt={`${beachData.title} ${index + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                                <Link href={localize(`/${location}/beaches`)} className="group flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-cyan-600 transition-all">
                                    <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-cyan-50 flex items-center justify-center transition-colors">←</span>
                                    {activeLocale === 'ru' ? `Все пляжи ${locationName}` : `All beaches of ${locationName}`}
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70 space-y-5">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                                    {ui.specs}
                                </h3>
                                <div className="space-y-3 text-xs text-slate-700">
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-semibold">{ui.cover}</span>
                                        <span className="text-slate-900 font-bold text-right">{spec.cover}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-semibold">{ui.entry}</span>
                                        <span className="text-slate-900 font-bold text-right">{spec.entry}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-semibold">{ui.amenities}</span>
                                        <span className="text-slate-900 font-bold text-right max-w-[180px]">{spec.amenities}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5">
                                        <span className="text-slate-500 font-semibold">{ui.access}</span>
                                        <span className="text-slate-900 font-bold text-right">{spec.access}</span>
                                    </div>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(beachData.title + ' beach ' + locationName)}`}
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
                                    {activeLocale === 'ru'
                                        ? `Этот пляж находится недалеко от других бухт и достопримечательностей региона ${locationName}.`
                                        : activeLocale === 'de'
                                        ? `Dieser Strand befindet sich in der Nähe anderer interessanter Orte in der Region ${locationName}.`
                                        : activeLocale === 'tr'
                                        ? `Bu plaj, ${locationName} bölgesindeki diğer ilgi çekici yerlerin yakınında bulunmaktadır.`
                                        : `This beach is located near other scenic spots in ${locationName}.`}
                                </p>
                                <Link href={localize(`/${location}`)} className="block w-full py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center hover:bg-cyan-600 transition-all">
                                    {`${ui.explore} ${locationName}`}
                                </Link>
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

export async function generateMetadata({ params }: BeachPageProps): Promise<Metadata> {
    const { locale, location, beachName } = params;
    const activeLocale = locale || 'en';
    const beachData = await getBeachData(location, beachName, activeLocale);

    if (!beachData) {
        return {
            title: activeLocale === 'ru' ? 'Пляж не найден' : 'Beach Not Found',
        };
    }

    const cleanDescription = beachData.description
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 160) + '...';

    const locationName = (locationNames[activeLocale] || locationNames['en'])[location] || location;

    return {
        title: `${beachData.title} | ${locationName} | Dalaman.info`,
        description: cleanDescription,
        openGraph: {
            title: `${beachData.title} | ${locationName} | Dalaman.info`,
            description: cleanDescription,
            images: beachData.images.length > 0 ? [{ url: beachData.images[0] }] : []
        }
    };
}

export default BeachPage;
