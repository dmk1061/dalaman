import React from 'react';
import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import LeftSidebar from '@/app/components/LeftSidebar';
import Sidebar from '@/app/components/Sidebar';
import TransportClient from './TransportClient';
import { buildPageMetadata } from '@/lib/seo';

type PageProps = {
  params: {
    locale: string;
  };
};

const transportMetaByLocale: Record<string, { title: string; description: string }> = {
  ru: {
    title: 'Транспорт региона Даламан: автобусы Havaş и Muttaş, долмуши, такси и паромы',
    description: 'Актуальный гид по транспорту провинции Мугла: расписание шаттлов из аэропорта Даламан, тарифы такси UKOME, аренда авто, долмуши и морские маршруты.',
  },
  en: {
    title: 'Dalaman Region Transport Guide: Havaş & Muttaş Buses, Taxis, Dolmuş & Ferries',
    description: 'Complete transportation guide for the Muğla Turquoise Coast: Dalaman Airport shuttles, official UKOME taxi fare calculator, car hire, dolmuş routes, and ferries.',
  },
  de: {
    title: 'Transport-Guide Region Dalaman: Havaş & Muttaş Busse, Taxis, Dolmuş & Fähren',
    description: 'Alle Infos zum Nahverkehr in Muğla: Flughafenshuttles ab Dalaman, offizielle UKOME-Taxitarife, Mietwagen, Dolmuş-Linien und Fährverbindungen.',
  },
  tr: {
    title: 'Dalaman ve Muğla Ulaşım Rehberi: Havaş, Muttaş, Taksi, Dolmuş ve Feribotlar',
    description: 'Muğla bölgesi için eksiksiz ulaşım rehberi: Dalaman Havalimanı servisleri, resmi UKOME taksi ücret hesaplayıcısı, araç kiralama ve deniz ulaşımı.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || 'en';
  const meta = transportMetaByLocale[locale] || transportMetaByLocale['en'];
  return buildPageMetadata({
    locale,
    pathname: '/articles/transport',
    title: meta.title,
    description: meta.description,
    image: '/dalaman1.jpg',
  });
}

const TransportPage = async ({ params }: PageProps) => {
  const locale = params.locale || 'en';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header locale={locale} />
      <div className="portal-container flex-grow py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <aside className="w-[270px] flex-shrink-0 hidden lg:block">
            <LeftSidebar locale={locale} />
          </aside>
          <main className="flex-1 min-w-0 w-full overflow-hidden">
            <TransportClient locale={locale} />
          </main>
          <aside className="w-[300px] flex-shrink-0 hidden xl:block">
            <Sidebar locale={locale} />
          </aside>
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

export default TransportPage;
