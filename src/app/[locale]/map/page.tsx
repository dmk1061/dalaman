import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import InteractiveMap from './InteractiveMap';

const translations: Record<string, { badge: string; title: string; subtitle: string }> = {
    en: {
        badge: "INTERACTIVE GUIDE",
        title: "Lycian Coast Map",
        subtitle: "Explore the key cities and resorts of the region from Datça to Kaş. Click on a marker to go to the detailed city guide."
    },
    ru: {
        badge: "ИНТЕРАКТИВНЫЙ ПУТЕВОДИТЕЛЬ",
        title: "Карта Ликийского побережья",
        subtitle: "Исследуйте ключевые города и курорты региона от Датчи до Каша. Нажмите на маркер, чтобы перейти к подробному гиду по городу."
    },
    de: {
        badge: "INTERAKTIVER FÜHRER",
        title: "Karte der lykischen Küste",
        subtitle: "Erkunden Sie die wichtigsten Städte und Ferienorte der Region von Datça bis Kaş. Klicken Sie auf einen Marker, um zum detaillierten Stadtführer zu gelangen."
    },
    tr: {
        badge: "İNTERAKTİF REHBER",
        title: "Likya Kıyısı Haritası",
        subtitle: "Datça'dan Kaş'a kadar bölgenin önemli şehirlerini ve tatil beldelerini keşfedin. Detaylı şehir rehberine gitmek için bir işarete tıklayın."
    }
};

type MapPageProps = {
    params: {
        locale: string;
    }
}

const MapPage = ({ params }: MapPageProps) => {
    const locale = params.locale || 'en';
    const t = translations[locale] || translations['en'];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
            <Header locale={locale} />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">{t.badge}</span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">
                        {t.title}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {t.subtitle}
                    </p>
                </div>

                <div className="bg-white rounded-[3rem] p-4 md:p-8 premium-shadow border border-slate-100 max-w-6xl mx-auto overflow-hidden">
                    <InteractiveMap locale={locale} />
                </div>
            </main>
            
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

export default MapPage;
