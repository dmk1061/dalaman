import React from 'react';
import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import LeftSidebar from '@/app/components/LeftSidebar';
import Sidebar from '@/app/components/Sidebar';
import AirportClient from './AirportClient';
import { buildPageMetadata } from '@/lib/seo';

type PageProps = {
  params: {
    locale: string;
  };
};

const airportMetaByLocale: Record<string, { title: string; description: string }> = {
  ru: {
    title: 'Аэропорт Даламан (DLM): онлайн-табло, терминалы, Duty Free и трансферы',
    description: 'Полный гид по международному аэропорту Даламан (DLM): прилет и вылет, схемы терминалов, багаж, обмен валюты, автобусы Havaş/Muttaş и такси на курорты.',
  },
  en: {
    title: 'Dalaman Airport (DLM) Guide: Flight Board, Terminals, Duty Free & Transfers',
    description: 'Complete guide to Dalaman International Airport (DLM): arrivals and departures, domestic & international terminals, Havaş/Muttaş shuttles, and resort transfers.',
  },
  de: {
    title: 'Flughafen Dalaman (DLM) Leitfaden: Terminals, Ankunft, Abflug & Transfers',
    description: 'Umfassender Leitfaden für den Flughafen Dalaman (DLM): Ankünfte, Abflüge, Terminals, Duty-Free-Tipps, Havaş/Muttaş-Shuttlebusse und Taxis.',
  },
  tr: {
    title: 'Dalaman Havalimanı (DLM) Rehberi: Terminaller, Uçuşlar ve Ulaşım',
    description: 'Dalaman Uluslararası Havalimanı (DLM) için kapsamlı rehber: iç ve dış hat terminalleri, uçuş bilgileri, Havaş/Muttaş servisleri ve transfer seçenekleri.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || 'en';
  const meta = airportMetaByLocale[locale] || airportMetaByLocale['en'];
  return buildPageMetadata({
    locale,
    pathname: '/articles/airport-dalaman',
    title: meta.title,
    description: meta.description,
    image: '/dalaman1.jpg',
  });
}

const AirportPage = async ({ params }: PageProps) => {
  const locale = params.locale || 'en';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header locale={locale} />
      <div className="flex flex-grow w-full max-w-[1700px] mx-auto">
        <div className="w-[18%] hidden lg:block px-4 py-8">
          <LeftSidebar locale={locale} />
        </div>
        <main className="flex-1 px-4 py-8 overflow-hidden">
          <AirportClient locale={locale} />
        </main>
        <div className="w-[22%] hidden xl:block px-4 py-8">
          <Sidebar locale={locale} />
        </div>
      </div>
      <Footer locale={locale} />
    </div>
  );
};

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ru' },
    { locale: 'de' },
    { locale: 'tr' }
  ];
}

export default AirportPage;
