import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { FaToolbox, FaCompass } from 'react-icons/fa';
import Link from 'next/link';

type PlaceholderPageProps = {
    title: string;
    description: string;
};

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow flex items-center justify-center py-20 px-4 relative overflow-hidden">
                {/* Visual backdrops */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 text-center premium-shadow">
                    <div className="inline-flex items-center justify-center p-6 bg-cyan-50 text-cyan-600 rounded-3xl mb-8 transform -rotate-6 shadow-md">
                        <FaToolbox size={48} className="animate-pulse" />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase italic tracking-tight">
                        {title}
                    </h1>
                    
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium mb-10 max-w-lg mx-auto">
                        {description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/" 
                            className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-cyan-600 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <FaCompass /> На главную
                        </Link>
                        <Link 
                            href="/city-guide" 
                            className="px-8 py-4 bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200 font-black text-xs uppercase tracking-widest rounded-full hover:bg-slate-100 transition-all shadow-md hover:scale-105 active:scale-95"
                        >
                            Все города
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PlaceholderPage;