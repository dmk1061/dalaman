import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

type PlaceholderPageProps = {
    title: string;
    description: string;
};

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16 text-center">
                <h1 className="text-5xl font-bold text-cyan-700 mb-4">{title}</h1>
                <p className="text-xl text-gray-600">{description}</p>
                <div className="mt-8">
                    <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PlaceholderPage; 