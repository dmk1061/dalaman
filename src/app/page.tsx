import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SplashPage() {
  const languages = [
    { code: 'en', name: 'English', label: 'Main Version', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', label: 'Русская версия', flag: '🇷🇺' },
    { code: 'de', name: 'Deutsch', label: 'Deutsche Version', flag: '🇩🇪' },
    { code: 'tr', name: 'Türkçe', label: 'Türkçe Sürüm', flag: '🇹🇷' }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Lycian Coast Background"
          fill
          priority
          quality={90}
          className="object-cover object-center scale-105 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/80 via-slate-950/60 to-blue-950/80 backdrop-blur-[2px]" />
      </div>

      {/* Main Glassmorphic Panel */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center">
          
          {/* Logo / Badge */}
          <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 mb-8 animate-pulse">
            <span className="text-2xl">🇹🇷</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase italic mb-2">
            Lycian Coast Guide
          </h1>
          <p className="text-cyan-300 font-bold text-xs uppercase tracking-[0.25em] mb-8">
            Dalaman • Fethiye • Marmaris • Kaş
          </p>

          {/* Welcome Messages (Rotating styling in a column) */}
          <div className="space-y-1 mb-8 text-slate-300 text-sm font-medium">
            <p className="italic">Welcome to the Turquoise Coast of Turkey</p>
            <p className="italic text-xs opacity-80">Добро пожаловать на Бирюзовое побережье</p>
            <p className="italic text-xs opacity-70">Willkommen an der Türkisküste</p>
            <p className="italic text-xs opacity-60">Turkuaz Kıyılara Hoş Geldiniz</p>
          </div>

          <div className="border-t border-white/5 my-6" />

          <h2 className="text-white font-black text-xs uppercase tracking-widest mb-6">
            Select Language / Выберите язык
          </h2>

          {/* Language Selection Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={`/${lang.code}`}
                className="group relative flex items-center justify-between px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-cyan-400/40 text-left transition-all duration-300 shadow-sm hover:shadow-cyan-500/10"
              >
                <div>
                  <span className="block text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {lang.name}
                  </span>
                  <span className="block text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors">
                    {lang.label}
                  </span>
                </div>
                <span className="text-2xl filter drop-shadow group-hover:scale-110 transition-transform duration-300">
                  {lang.flag}
                </span>
              </Link>
            ))}
          </div>

          {/* Footer Info */}
          <p className="text-[10px] text-slate-500 mt-8 font-semibold tracking-wider">
            DEFAULT VERSION IS ENGLISH
          </p>
        </div>
      </div>
    </div>
  );
}
