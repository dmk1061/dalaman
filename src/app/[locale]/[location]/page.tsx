import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CityHub from '@/app/components/CityHub';
import { getMarkdownData, getLocationData } from '@/lib/markdown';
import path from 'path';
import fs from 'fs';

type LocationPageProps = {
  params: {
    locale: string;
    location: string;
  }
}

const locationNames: Record<string, Record<string, string>> = {
  en: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' },
  ru: { 'dacha': 'Дача', 'marmaris': 'Мармарис', 'dalyan': 'Дальян', 'koycegiz': 'Кёйджегиз', 'dalaman': 'Даламан', 'gocek': 'Гёджек', 'fethiye': 'Фетхие', 'kas': 'Каш' },
  de: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' },
  tr: { 'dacha': 'Datça', 'marmaris': 'Marmaris', 'dalyan': 'Dalyan', 'koycegiz': 'Köyceğiz', 'dalaman': 'Dalaman', 'gocek': 'Göcek', 'fethiye': 'Fethiye', 'kas': 'Kaş' }
};

const LocationPage = async ({ params }: LocationPageProps) => {
  const { locale, location } = params;
  const activeLocale = locale || 'en';

  const locationName = (locationNames[activeLocale] || locationNames['en'])[location] || location;
  const paths = getLocationData(location);
  const infoData = await getMarkdownData(paths.infoPath, activeLocale);

  if (!infoData) {
    return (
      <div className="min-h-screen flex flex-col">
        
        <Header locale={activeLocale} />
        <main className="flex-grow flex items-center justify-center p-20">
          <div className="text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-4">
              {activeLocale === 'ru' ? 'Локация не найдена' : 'Location Not Found'}
            </h1>
            <p className="text-slate-500">
              {activeLocale === 'ru' 
                ? 'К сожалению, мы еще не подготовили путеводитель по этому городу.' 
                : 'Sorry, we have not prepared a guide for this city yet.'}
            </p>
          </div>
        </main>
        
        <Footer locale={activeLocale} />
      </div>
    );
  }

  // Fetch all "Gems" (Beaches, Ruins, ToDo)
  const gems: any[] = [];
  const categories = [
    { dir: 'beach', label: 'Пляж', slugPart: 'beach' },
    { dir: 'ruine', label: 'История', slugPart: 'sight' },
    { dir: 'todo', label: 'Развлечение', slugPart: 'sight' }
  ];

  for (const cat of categories) {
    try {
      const dirPath = path.join(process.cwd(), 'content', 'locations', location, cat.dir);
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        const subDirs = fs.readdirSync(dirPath).filter(d => fs.statSync(path.join(dirPath, d)).isDirectory());
        for (const sub of subDirs) {
          const fullSubPath = path.join(dirPath, sub);
          const files = fs.readdirSync(fullSubPath).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
          gems.push({
            name: sub,
            label: cat.label,
            slug: sub,
            href: `/${location}/${cat.slugPart}/${sub}`,
            image: files.length > 0 ? `/api/images/locations/${location}/${cat.dir}/${sub}/${files[0]}` : null
          });
        }
      }
    } catch (e) { }
  }

  // Determine Hero images
  const heroImages = gems.filter(g => g.image).map(g => g.image).slice(0, 5);
  if (heroImages.length === 0) {
    heroImages.push(`/api/images/locations/${location}/ruine/knidos/knidos.jpg`); // Default fallback
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <Header locale={activeLocale} />
      <main className="flex-grow">
        <CityHub
          location={location}
          locationName={locationName}
          info={infoData as any}
          beaches={gems.slice(0, 8)} // Pass mixed gems here
          images={heroImages}
          locale={activeLocale}
        />
      </main>
      
      <Footer locale={activeLocale} />
    </div>
  );
};

export async function generateStaticParams() {
  const locations = ['dacha', 'marmaris', 'dalyan', 'koycegiz', 'dalaman', 'gocek', 'fethiye', 'kas'];
  const locales = ['en', 'ru', 'de', 'tr'];
  const params = [];
  for (const location of locations) {
    for (const locale of locales) {
      params.push({ location, locale });
    }
  }
  return params;
}

export default LocationPage;