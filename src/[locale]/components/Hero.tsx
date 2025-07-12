'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <div className="relative h-96 rounded-lg bg-cover bg-center text-white flex items-center justify-center my-8" style={{ backgroundImage: "url('/dalaman1.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
      
      <div className="relative z-10 text-center">
        <h2 className="text-5xl font-extrabold">{t('title')}</h2>
        <p className="mt-4 text-xl">{t('subtitle')}</p>
        
        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
            <input 
              type="text" 
              placeholder={t('search_placeholder')}
              className="w-full max-w-lg px-4 py-3 rounded-l-md text-gray-800 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-md font-semibold">
              {t('search_button')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 