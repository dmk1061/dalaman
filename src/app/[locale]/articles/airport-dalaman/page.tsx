import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import LeftSidebar from '@/app/components/LeftSidebar';
import Sidebar from '@/app/components/Sidebar';
import AirportClient from './AirportClient';

type PageProps = {
  params: {
    locale: string;
  };
};

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
