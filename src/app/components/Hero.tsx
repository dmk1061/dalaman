"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dictionaries: Record<string, any> = { ru, en, de, tr };

type HeroProps = {
  locale?: string;
};

const Hero = ({ locale = 'en' }: HeroProps) => {
  const dict = dictionaries[locale] || dictionaries['en'];

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  return (
    <section className="relative h-[600px] w-full overflow-hidden mb-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Turkish Coastline"
          layout="fill"
          objectFit="cover"
          priority
          className="scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col justify-center h-full">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          {dict.hero.title_prefix} <span className="text-gradient">{dict.hero.title_highlight}</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 font-medium leading-relaxed drop-shadow-md max-w-3xl mx-auto">
          {dict.hero.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href={localize('/beaches')} className="px-8 py-4 bg-cyan-500 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl hover:scale-105 active:scale-95">
            {dict.hero.btn_beach}
          </Link>
          <Link href={localize('/articles/ancient-cities')} className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/30 transition-all shadow-xl hover:scale-105 active:scale-95">
            {dict.hero.btn_history}
          </Link>
          <Link href={localize('/services/yacht-rental')} className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/30 transition-all shadow-xl hover:scale-105 active:scale-95">
            {dict.hero.btn_sea}
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
      `}</style>
    </section>
  );
};

export default Hero;