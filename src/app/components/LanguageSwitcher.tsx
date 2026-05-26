"use client";

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiChevronDown } from 'react-icons/fi';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(l => l.code === currentLocale) || languages[0];

  const handleLanguageChange = (code: string) => {
    setIsOpen(false);
    if (!pathname) return;

    const segments = pathname.split('/');
    // pathname starts with /locale (e.g. /ru/city-guide)
    // segments[0] is "", segments[1] is the locale
    if (languages.some(l => l.code === segments[1])) {
      segments[1] = code;
    } else {
      // Fallback if pathname doesn't have locale
      segments.splice(1, 0, code);
    }

    const newPathname = segments.join('/') || '/';
    router.push(newPathname);
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 rounded-full text-xs font-bold text-white transition-all focus:outline-none"
      >
        <span>{currentLanguage.flag}</span>
        <span className="uppercase">{currentLanguage.code}</span>
        <FiChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay to close the dropdown when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-bold text-left hover:bg-slate-50 transition-colors focus:outline-none ${
                  lang.code === currentLocale ? 'text-cyan-600 bg-cyan-50/50' : 'text-slate-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
