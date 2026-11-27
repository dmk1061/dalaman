import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronRight,
  FaCompass,
  FaHome,
  FaInfoCircle,
  FaTint,
  FaTree,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NatureParksHub from '@/app/components/NatureParksHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/nature-parks';

interface NatureParksPageCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  placesCrumb: string;
  pageCrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  btnMap: string;
  btnProfiles: string;
  btnCool: string;
  btnRules: string;
}

const HERO_IMAGE = '/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg';

const PAGE_COPY: Record<LocaleCode, NatureParksPageCopy> = {
  ru: {
    metaTitle: 'Национальные парки, заповедники, каньоны и реки (Изтузу, Саклыкент, Азмак): 3D-карта 2026 | Дача — Каш',
    metaDescription:
      'Интерактивный гид по 15 природным паркам и заповедникам побережья: 3D-карта (центр черепах DEKAMER на Изтузу, ущелье Саклыкент, Олюдениз–Кидрак, Долина Бабочек, Юварлакчай, река Азмак), контраст температур воды (+6…+40 °C), подборщик прохлады и правила 2026.',
    home: 'Главная',
    placesCrumb: 'Курорты и места',
    pageCrumb: 'Природа, нацпарки и заповедники',
    eyebrow: 'НАЦПАРКИ, КАНЬОНЫ И ЗАПОВЕДНИКИ • ГЁКОВА — ДАЛЬЯН — ФЕТХИЕ — ПАТАРА',
    h1: 'Национальные парки, каньоны и заповедники побережья: 3D-гид 2026',
    lead: '15 охраняемых зон, ледяных рек и заповедных лагун от Азмака и Изтузу (DEKAMER) до Саклыкента и Долины Бабочек: куда сбежать от летней жары, где цветут эндемичные рощи, когда пляжи закрываются в 20:00 и что закрыто из-за лесных пожаров.',
    heroAlt: 'Панорама заповедной песчаной косы Изтузу и камышовой дельты реки Дальян',
    btnMap: '3D-карта 15 парков и каньонов',
    btnProfiles: '8 природных чудес с фото',
    btnCool: 'Подборщик прохлады и вода +6 °C',
    btnRules: 'Эндемики и правила 2026',
  },
  en: {
    metaTitle: 'National Parks, Nature Reserves & Canyons (İztuzu, Saklıkent, Azmak): 3D Map 2026 | Dalaman Guide',
    metaDescription:
      'Interactive guide to 15 coastal reserves, canyons & parks: live 3D map (İztuzu DEKAMER turtle hospital, Saklıkent Gorge, Ölüdeniz–Kıdrak, Butterfly Valley, Yuvarlakçay, Azmak River), water temp contrast (+6–40 °C), cool-escape picker & 2026 forest/curfew laws.',
    home: 'Home',
    placesCrumb: 'Places & Beaches',
    pageCrumb: 'National Parks & Nature Reserves',
    eyebrow: 'PARKS, CANYONS & TURTLE RESERVES • GÖKOVA — DALYAN — FETHİYE — PATARA',
    h1: 'Coastal National Parks, Canyons & Wildlife Reserves: 2026 3D Hub',
    lead: 'Explore 15 protected reserves from Azmak and İztuzu DEKAMER to glacial Saklıkent Gorge & Butterfly Valley: cool-escape picker, river temp spectrum (+6–40 °C), endemic species and 2026 beach/wildfire rules.',
    heroAlt: 'Panoramic view of İztuzu protected sandbar and Dalyan river wetland delta',
    btnMap: '3D Map (15 Parks)',
    btnProfiles: '8 Park & Canyon Profiles',
    btnCool: 'Cool Escape & +6 °C Rivers',
    btnRules: 'Endemics & 2026 Laws',
  },
  de: {
    metaTitle: 'Nationalparks, Schutzgebiete & Schluchten (İztuzu, Saklıkent, Azmak): 3D-Karte 2026 | Dalaman Guide',
    metaDescription:
      'Interaktiver Natur-Guide für 15 Parks, Schutzgebiete & Canyons: 3D-Karte (DEKAMER-Klinik İztuzu, Saklıkent-Schlucht, Ölüdeniz–Kıdrak, Schmetterlingstal, Yuvarlakçay & Azmak), Wassertemperatur-Vergleich & Waldsperren 2026.',
    home: 'Startseite',
    placesCrumb: 'Orte & Strände',
    pageCrumb: 'Nationalparks & Naturschutzgebiete',
    eyebrow: 'NATIONALPARKS, SCHLUCHTEN & SCHUTZZONEN • GÖKOVA — DALYAN — FETHİYE',
    h1: 'Nationalparks, Schluchten & Naturwunder der Küste: 3D-Guide 2026',
    lead: '15 Schutzgebiete von Azmak und DEKAMER (İztuzu) bis Saklıkent & Schmetterlingstal: Anti-Hitze-Planer, Fluss-Temperaturskala (+6–40 °C), seltene Endemiten und alle 2026-Regeln.',
    heroAlt: 'Panoramablick auf die geschützte Nehrung İztuzu und das Dalyan-Flussdelta',
    btnMap: '3D-Karte (15 Parks)',
    btnProfiles: '8 Naturwunder im Detail',
    btnCool: 'Abkühlungs-Planer & Flüsse',
    btnRules: 'Endemiten & Regeln 2026',
  },
  tr: {
    metaTitle: 'Millî Parklar, Kanyonlar ve Koruma Alanları (İztuzu, Saklıkent, Azmak): 3D Harita 2026 | Dalaman Rehberi',
    metaDescription:
      '15 doğa parkı, kanyon ve koruma alanı için interaktif 3D harita (İztuzu DEKAMER, Saklıkent Kanyonu, Ölüdeniz–Kıdrak, Kelebekler Vadisi, Yuvarlakçay, Azmak), +6–40 °C su sıcaklığı spektrumu ve 2026 orman/kumsal kuralları.',
    home: 'Ana Sayfa',
    placesCrumb: 'Bölgeler & Plajlar',
    pageCrumb: 'Millî Parklar ve Doğa Koruma Alanları',
    eyebrow: 'MİLLÎ PARKLAR, KANYONLAR VE ÖÇK • GÖKOVA — DALYAN — FETHİYE — PATARA',
    h1: 'Kıyının Millî Parkları, Kanyonları ve Doğa Koruma Alanları: 2026 3D Rehberi',
    lead: 'Azmak ve İztuzu DEKAMER’den Saklıkent Kanyonu ile Kelebekler Vadisi’ne 15 koruma alanı: serin kaçış seçici, +6–40 °C su sıcaklık farkları, endemik türler ve 2026 yasak kuralları.',
    heroAlt: 'İztuzu koruma kumsalı ve Dalyan sazlık deltasının panoramik manzarası',
    btnMap: '3D Harita (15 Alan)',
    btnProfiles: '8 Detaylı Doğa Profili',
    btnCool: 'Serin Rota & +6 °C Sular',
    btnRules: 'Endemikler & 2026 Kuralları',
  },
};

function resolveLocale(rawLocale?: string): LocaleCode {
  return ['ru', 'en', 'de', 'tr'].includes(rawLocale || '') ? (rawLocale as LocaleCode) : 'en';
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];
  return buildPageMetadata({
    locale: activeLocale,
    pathname: '/nature-parks',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function NatureParksPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Emerald Coastal Nature Hero Banner */}
        <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt={copy.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/70 to-slate-950/90" />

          <div className="relative z-10 portal-container py-12 md:py-16">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-white/85 bg-slate-900/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 mb-5"
            >
              <Link
                href={`/${activeLocale}`}
                className="hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <FaHome size={11} className="text-emerald-300" />
                <span>{copy.home}</span>
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <Link
                href={`/${activeLocale}/city-guide`}
                className="hover:text-emerald-300 transition-colors"
              >
                {copy.placesCrumb}
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <span className="text-white font-bold">{copy.pageCrumb}</span>
            </nav>

            <span className="block text-emerald-300 font-bold text-xs uppercase tracking-widest mb-2.5">
              {copy.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-4xl leading-tight mb-4 drop-shadow">
              {copy.h1}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-100/95 max-w-3xl font-medium leading-relaxed mb-7">
              {copy.lead}
            </p>

            <div className="flex flex-wrap gap-2.5">
              <a
                href="#nature-map"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold tracking-wide transition-colors shadow-lg shadow-emerald-600/30"
              >
                <FaCompass size={12} />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#nature-profiles"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaTree size={12} className="text-emerald-300" />
                <span>{copy.btnProfiles}</span>
              </a>
              <a
                href="#cool-escape"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaTint size={12} className="text-sky-300" />
                <span>{copy.btnCool}</span>
              </a>
              <a
                href="#eco-rules"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaInfoCircle size={12} className="text-amber-300" />
                <span>{copy.btnRules}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Nature Parks & Reserves Interactive Hub */}
        <NatureParksHub locale={activeLocale} />
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
