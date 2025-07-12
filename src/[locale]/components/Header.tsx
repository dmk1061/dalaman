'use client';

import React from 'react';
import Navigation from './Navigation';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

const Header = () => {
  const t = useTranslations('header');

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-100 text-xs text-gray-700">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="mailto:info@dalaman.bel.tr" className="flex items-center hover:text-blue-600">
              <FaEnvelope className="mr-2" />
              info@dalaman.bel.tr
            </a>
            <span className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              0 850 307 1967
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-blue-600">Önemli Linkler</a>
            <a href="#" className="hover:text-blue-600">E-Belediye</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Placeholder for Logo */}
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">DALAMAN</h1>
            <p className="text-sm text-gray-500">BELEDİYE BAŞKANLIĞI</p>
          </div>
        </div>
        <Navigation />
      </div>

      {/* Blue Action Bar */}
      <div className="bg-blue-600">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-white text-sm font-semibold">
           <div className="flex items-center space-x-4">
             <button className="bg-white text-blue-600 px-3 py-1 rounded-md">BİZE ULAŞIN</button>
             <span>0 850 307 1967</span>
             <button className="bg-white text-blue-600 px-3 py-1 rounded-md">ÖNEMLİ LİNKLER</button>
           </div>
           <div className="flex items-center space-x-2">
              <button className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md">E-BELEDİYE</button>
              <button className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md">BORÇ ÖDEME</button>
              <button className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md">NÖBETÇİ ECZANELER</button>
              <input type="text" placeholder="Arama..." className="px-2 py-1 rounded-md text-gray-800 text-sm focus:outline-none" />
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 