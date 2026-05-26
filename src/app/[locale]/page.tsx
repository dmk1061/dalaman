import React from 'react';
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";
import LeftSidebar from "../components/LeftSidebar";
import Footer from "../components/Footer";

export default function Home({ params }: { params: { locale: string } }) {
    const locale = params.locale || 'en';

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header locale={locale} />
            <Hero locale={locale} />
            <div className="flex flex-grow w-full max-w-[1700px] mx-auto">
                <div className="w-[18%] hidden lg:block px-4 py-8">
                    
                    <LeftSidebar locale={locale} />
                </div>
                <main className="flex-1 px-4 py-8 overflow-hidden">
                    <MainContent locale={locale} />
                </main>
                <div className="w-[22%] hidden xl:block px-4 py-8">
                    
                    <Sidebar locale={locale} />
                </div>
            </div>
            
            <Footer locale={locale} />
        </div>
    );
}