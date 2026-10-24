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

            <div className="portal-container flex-grow py-4 lg:py-6">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Sidebar (Desktop) */}
                    <aside className="w-[260px] flex-shrink-0 hidden lg:block">
                        <LeftSidebar locale={locale} />
                    </aside>

                    {/* Center Main Content */}
                    <main className="flex-1 min-w-0 w-full">
                        <MainContent locale={locale} />
                    </main>

                    {/* Right Sidebar (Wide Desktop) */}
                    <aside className="w-[300px] flex-shrink-0 hidden xl:block">
                        <Sidebar locale={locale} />
                    </aside>
                </div>

                {/* Responsive Fallback Blocks for Mobile & Tablet so no navigation/planner content is lost */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 xl:hidden">
                    <div className="lg:hidden">
                        <LeftSidebar locale={locale} />
                    </div>
                    <div className="xl:hidden">
                        <Sidebar locale={locale} />
                    </div>
                </div>
            </div>

            <Footer locale={locale} />
        </div>
    );
}
