"use client";

import React from 'react';
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import LeftSidebar from "./components/LeftSidebar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-grow w-full">
            <div className="w-1/5 hidden lg:block px-4 py-8">
                <LeftSidebar />
            </div>
            <main className="w-3/5 px-4 py-8">
                <MainContent />
            </main>
            <div className="w-1/5 hidden lg:block px-4 py-8">
                <Sidebar />
            </div>
        </div>
        <Footer />
    </div>
  );
} 