import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import InteractiveMap from './InteractiveMap';

const MapPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">ИНТЕРАКТИВНЫЙ ПУТЕВОДИТЕЛЬ</span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">
                        Карта Ликийского побережья
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Исследуйте ключевые города и курорты региона от Датчи до Каша. Нажмите на маркер, чтобы перейти к подробному гиду по городу.
                    </p>
                </div>

                <div className="bg-white rounded-[3rem] p-4 md:p-8 premium-shadow border border-slate-100 max-w-6xl mx-auto overflow-hidden">
                    <InteractiveMap />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MapPage;
