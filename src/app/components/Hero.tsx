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

const Hero = ({ locale = 'ru' }: HeroProps) => {
  const dict = dictionaries[locale] || dictionaries['en'];

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const eyebrowText =
    locale === 'ru'
      ? '🇹🇷 ДАТЧА • МАРМАРИС • ДАЛАМАН • ФЕТХИЕ • КАШ'
      : locale === 'de'
      ? '🇹🇷 DATÇA • MARMARİS • DALAMAN • FETHİYE • KAŞ'
      : locale === 'tr'
      ? '🇹🇷 DATÇA • MARMARİS • DALAMAN • FETHİYE • KAŞ'
      : '🇹🇷 DATÇA • MARMARİS • DALAMAN • FETHİYE • KAŞ';

  return (
    <section className="relative min-h-[440px] md:h-[520px] w-full overflow-hidden mb-8 lg:mb-10 flex items-center">
      {/* Background Image with Enhanced Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Turkish Turquoise Coastline — Dalaman to Kaş"
          fill
          priority
          className="object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-900/40 to-slate-950/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 portal-container text-center py-12 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold uppercase tracking-widest mb-5 shadow-sm">
          {eyebrowText}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight drop-shadow-lg max-w-4xl leading-[1.12]">
          {dict.hero.title_prefix}{' '}
          <span className="text-gradient">{dict.hero.title_highlight}</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 font-medium leading-relaxed drop-shadow max-w-2xl mx-auto">
          {dict.hero.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-3.5">
          <Link
            href={localize('/beaches')}
            className="px-7 py-3.5 bg-cyan-500 text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            {dict.hero.btn_beach}
          </Link>
          <Link
            href={localize('/articles/ancient-cities')}
            className="px-7 py-3.5 bg-white/15 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white/25 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            {dict.hero.btn_history}
          </Link>
          <Link
            href={localize('/services/yacht-rental')}
            className="px-7 py-3.5 bg-white/15 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white/25 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            {dict.hero.btn_sea}
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 22s infinite alternate linear;
        }
      `}</style>
    </section>
  );
};

export default Hero;
