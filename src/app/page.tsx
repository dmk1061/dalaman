"use client";

import React from 'react';
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import LeftSidebar from "./components/LeftSidebar";
import Footer from "./components/Footer";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <Hero />
            <div className="flex flex-grow w-full max-w-[1700px] mx-auto">
                <div className="w-[18%] hidden lg:block px-4 py-8">
                    <LeftSidebar />
                </div>
                <main className="flex-1 px-4 py-8 overflow-hidden">
                    <MainContent />
                </main>
                <div className="w-[22%] hidden xl:block px-4 py-8">
                    <Sidebar />
                </div>
            </div>
            <Footer />
        </div>
    );
}