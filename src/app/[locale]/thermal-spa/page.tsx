import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronRight,
  FaCompass,
  FaFire,
  FaHome,
  FaSpa,
  FaThermometerHalf,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ThermalSpaHub from '@/app/components/ThermalSpaHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/thermal-spa';

interface ThermalPageCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  activitiesCrumb: string;
  pageCrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  btnMap: string;
  btnSprings: string;
  btnHammam: string;
  btnPrices: string;
}

const HERO_IMAGE = '/api/images/locations/koycegiz/todo/Sultanye/sultanye2.jpg';

const PAGE_COPY: Record<LocaleCode, ThermalPageCopy> = {
  ru: {
    metaTitle: 'Горячие источники, хаммамы и СПА (Султание, Даламан, Паспатур): 3D-карта и цены 2026 | Дача — Каш',
    metaDescription:
      'Интерактивный гид в первую очередь по горячим источникам и грязям (Султание 42 °C, Даламан Капыкаргын, Датча Ылыджа Гёлю, Памуккале 2026) и традиционным османским хаммамам Фетхие и Мармариса: 3D-карта, график загрузки 08:30–18:30, чекер противопоказаний и тарифы.',
    home: 'Главная',
    activitiesCrumb: 'Чем заняться',
    pageCrumb: 'Термы, хаммамы и СПА',
    eyebrow: 'ГЕОТЕРМАЛЬНЫЕ ВОДЫ И ХАММАМЫ • СУЛТАНИЕ — ДАЛАМАН — ФЕТХИЕ — ПАМУККАЛЕ',
    h1: 'Горячие источники, лечебные грязи и хаммамы: 3D-гид 2026',
    lead: 'Приоритет на природные термы: 3D-карта 11 точек (Султание 40 °C, Капыкаргын 28 °C у DLM, бесплатное озеро Датчи, обновлённый Памуккале), график толп от лодок Дальяна, 5 этапов настоящего хаммама и чекер здоровья (давление, загар, дайвинг).',
    heroAlt: 'Исторический купольный горячий термальный бассейн Султание на озере Кёйджегиз',
    btnMap: '3D-карта источников и бань',
    btnSprings: 'Горячие источники и грязи (6)',
    btnHammam: '5 этапов хаммама + чекер',
    btnPrices: 'Цены 2026 и правила серы',
  },
  en: {
    metaTitle: 'Hot Springs, Mud Baths & Hammams (Sultaniye, Dalaman, Paspatur): 3D Map & 2026 Guide | Dalaman Guide',
    metaDescription:
      'Geothermal-first interactive guide to Muğla hot springs (Sultaniye 39–42 °C, Dalaman Kapıkargın, Datça Ilıca, Pamukkale Antique Pool) plus historic Ottoman hammams in Fethiye & Marmaris: 3D map, crowd-wave timer, medical readiness & 2026 prices.',
    home: 'Home',
    activitiesCrumb: 'Things to Do',
    pageCrumb: 'Hot Springs, Hammams & Spa',
    eyebrow: 'GEOTHERMAL SPRINGS & TURKISH BATHS • SULTANİYE — DALAMAN — FETHİYE — PAMUKKALE',
    h1: 'Hot Springs, Peloid Mud Baths & Turkish Hammams: 2026 3D Hub',
    lead: 'Hot springs first: explore a live 3D geothermal & bathhouse map, compare 6 real mineral sites (40 °C Lake Köyceğiz domes, free DLM selenium springs & Datça soda lake), dodge Dalyan boat peaks, and check hammam readiness.',
    heroAlt: 'Historic stone-domed +40 °C thermal pool inside Sultaniye Hot Springs beside Lake Köyceğiz',
    btnMap: '3D Geothermal & Hammam Map',
    btnSprings: 'Hot Springs & Muds First (6)',
    btnHammam: '5-Stage Hammam & Checker',
    btnPrices: '2026 Rates & Safety Rules',
  },
  de: {
    metaTitle: 'Thermalquellen, Schlammbäder & Hamams (Sultaniye, Dalaman, Fethiye): 3D-Karte 2026 | Dalaman Guide',
    metaDescription:
      'Interaktiver Thermal- und Wellness-Hub rund um Dalaman: Heiße Quellen zuerst (Sultaniye 40 °C, Kapıkargın 28 °C, Datça Ilıca, Pamukkale 2026), osmanische Kuppel-Hamams, 3D-Karte, Bootswellen-Timer, Eignungscheck & Preise.',
    home: 'Startseite',
    activitiesCrumb: 'Aktivitäten',
    pageCrumb: 'Thermalquellen, Hamam & Spa',
    eyebrow: 'THERMALQUELLEN & HAMAMS • SULTANİYE — DALAMAN — FETHİYE — PAMUKKALE',
    h1: 'Heiße Quellen, Schlammbäder & Türkische Hamams: 3D-Hub 2026',
    lead: 'Thermalquellen im Mittelpunkt: Interaktive 3D-Karte aller 11 Standorte, Vergleich von 6 Naturquellen (40 °C-Kuppel Sultaniye, Gratis-Schwefel am Flughafen DLM, Sodasee Datça), Bootstour-Timing und Hamam-Gesundheitscheck.',
    heroAlt: 'Überdachtes +40 °C Thermalbecken der historischen Quellen von Sultaniye am Köyceğiz-See',
    btnMap: '3D-Quellen- & Hamam-Karte',
    btnSprings: 'Thermalquellen & Schlamm (6)',
    btnHammam: '5 Hamam-Schritte & Check',
    btnPrices: 'Preise 2026 & Regeln',
  },
  tr: {
    metaTitle: 'Kaplıcalar, Çamur Banyoları & Hamamlar (Sultaniye, Dalaman, Fethiye): 3D Rehber 2026 | Dalaman Rehberi',
    metaDescription:
      'Önceliği sıcak kaplıcalara veren interaktif 3D rehber: Sultaniye (42 °C), Dalaman Kapıkargın, Datça Ilıca Gölü, Pamukkale Antik Havuz ile Fethiye Paspatur & Marmaris hamamları; yoğunluk saatleri, sağlık testi ve 2026 ücretleri.',
    home: 'Ana Sayfa',
    activitiesCrumb: 'Ne Yapılır',
    pageCrumb: 'Kaplıcalar, Hamam ve Spa',
    eyebrow: 'DOĞAL KAPLICALAR VE OSMANLI HAMAMLARI • SULTANİYE — DALAMAN — FETHİYE — PAMUKKALE',
    h1: 'Sıcak Kaplıcalar, Çamur Banyoları ve Hamamlar: 3D Rehber 2026',
    lead: 'İlk sırada kaplıcalar: 11 noktalı canlı 3D harita, 6 termal kaynağın (40 °C Sultaniye, DLM yanı ücretsiz selenyum, Datça Sodalı Göl, Mayıs 2026’da açılan Pamukkale) karşılaştırması, tekne kalabalığı saatleri ve 5 aşamalı hamam sağlığı testi.',
    heroAlt: 'Köyceğiz Gölü kıyısındaki Sultaniye Kaplıcalarının kubbeli sıcak termal havuzu',
    btnMap: '3D Kaplıca & Hamam Haritası',
    btnSprings: 'Önce Sıcak Kaplıcalar (6)',
    btnHammam: '5 Aşamalı Hamam & Test',
    btnPrices: '2026 Fiyatları & Kurallar',
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
    pathname: '/thermal-spa',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function ThermalSpaPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Geothermal Hero Banner */}
        <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt={copy.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/65 to-slate-950/90" />

          <div className="relative z-10 portal-container py-12 md:py-16">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-white/85 bg-slate-900/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 mb-5"
            >
              <Link
                href={`/${activeLocale}`}
                className="hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <FaHome size={11} className="text-amber-300" />
                <span>{copy.home}</span>
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <Link
                href={`/${activeLocale}/collections`}
                className="hover:text-amber-300 transition-colors"
              >
                {copy.activitiesCrumb}
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <span className="text-white font-bold">{copy.pageCrumb}</span>
            </nav>

            <span className="block text-amber-300 font-bold text-xs uppercase tracking-widest mb-2.5">
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
                href="#thermal-map"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold tracking-wide transition-colors shadow-lg shadow-amber-500/25"
              >
                <FaCompass size={12} />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#thermal-springs"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaFire size={12} className="text-orange-400" />
                <span>{copy.btnSprings}</span>
              </a>
              <a
                href="#hammam-ritual"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaSpa size={12} className="text-cyan-300" />
                <span>{copy.btnHammam}</span>
              </a>
              <a
                href="#prices-rules"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaThermometerHalf size={12} className="text-amber-300" />
                <span>{copy.btnPrices}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Hot-Springs-First Interactive Hub */}
        <ThermalSpaHub locale={activeLocale} />
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
