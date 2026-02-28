"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden mb-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg" // We'll need to generate or find this
          alt="Turkish Coastline"
          layout="fill"
          objectFit="cover"
          priority
          className="scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          Откройте для себя <span className="text-gradient">Бирюзовое побережье</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 font-medium leading-relaxed drop-shadow-md">
          Ваш премиальный путеводитель по самому красивому региону Турции: от уютной Датчи до аутентичного Каша.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/beaches" className="px-8 py-4 bg-cyan-500 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl hover:scale-105 active:scale-95">
            На пляж
          </Link>
          <Link href="/articles/ancient-cities" className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/30 transition-all shadow-xl hover:scale-105 active:scale-95">
            В глубь истории
          </Link>
          <Link href="/services/yacht-rental" className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/30 transition-all shadow-xl hover:scale-105 active:scale-95">
            Морские прогулки
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg">
            Начать путешествие
          </button>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/30 backdrop-blur-md transition-all transform hover:scale-105">
            Узнать больше
          </button>
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