import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronRight,
  FaCompass,
  FaHome,
  FaInfoCircle,
  FaUtensils,
  FaWineGlassAlt,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import GastronomyHub from '@/app/components/GastronomyHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/gastronomy';

interface GastronomyPageCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  activitiesCrumb: string;
  pageCrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  btnDishes: string;
  btnMap: string;
  btnFormats: string;
  btnRules: string;
}

const HERO_IMAGE = '/images/gastronomy/hero-gastronomy.jpg';

const PAGE_COPY: Record<LocaleCode, GastronomyPageCopy> = {
  ru: {
    metaTitle: 'Гастрономия и кухня Турции: 24 блюда региона и 16 мест, где поесть | Дача — Каш',
    metaDescription:
      'Интерактивный гастрономический гид от Датчи до Каша: определитель 24 главных блюд (Чёкертме, голубой краб Дальяна, мезе, пиде, кюнефе) с фото и ценами 2026, карта 16 проверенных кварталов, Рыбный рынок Фетхие и правила турецкого чека.',
    home: 'Главная',
    activitiesCrumb: 'Чем заняться',
    pageCrumb: 'Гастрономия и кухня',
    eyebrow: 'ЭГЕЙСКИЙ СТОЛ, МЕЗЕ И РЕГИОНАЛЬНАЯ КУХНЯ • ДАТЧА — КАШ',
    h1: 'Гастрономия и местная кухня: что и где есть в регионе',
    lead: 'Интерактивный каталог 24 главных блюд Муглы и Бирюзового побережья с реальными фото и подсказками заказа, карта 16 лучших гастро-кварталов и террас, схема Рыбного рынка Фетхие, словарь фраз для официанта и правила турецкого чека.',
    heroAlt: 'Традиционный стол эгейских мезе с оливковым маслом, зеленью и закусками в приморском ресторане Турции',
    btnDishes: 'Энциклопедия блюд (24)',
    btnMap: 'Карта мест и 4 зоны (16)',
    btnFormats: 'Форматы, ритуалы и фразы',
    btnRules: 'Чек и правила 2026',
  },
  en: {
    metaTitle: 'Aegean Gastronomy & Local Cuisine: 24 Must-Try Dishes & 16 Dining Spots | Dalaman Guide',
    metaDescription:
      'Interactive culinary guide from Datça to Kaş: 24 essential Muğla & Turkish dishes (Çökertme, Dalyan blue crab, sea samphire, pide, künefe) with real photos, interactive 16-spot food map, Fethiye Fish Market guide, and 2026 tipping/alcohol rules.',
    home: 'Home',
    activitiesCrumb: 'Things to Do',
    pageCrumb: 'Gastronomy & Cuisine',
    eyebrow: 'AEGEAN TABLE, MEZE & LOCAL FLAVORS • DATÇA TO KAŞ',
    h1: 'Gastronomy & Regional Cuisine: What to Order & Where to Eat',
    lead: 'Interactive encyclopedia of 24 essential dishes across Muğla and Turkey’s Turquoise Coast with real photos and ordering tips, 16 verified dining quarters on a live map, Fethiye Fish Market pick-and-grill guide, waiter phrases, and 2026 bill rules.',
    heroAlt: 'Traditional Turkish Aegean meze spread with cold starters, olive oil greens and seafood in a coastal restaurant',
    btnDishes: '24 Regional Dishes',
    btnMap: 'Dining Map & 4 Zones (16)',
    btnFormats: 'Formats, Rituals & Phrases',
    btnRules: 'Bills & Etiquette 2026',
  },
  de: {
    metaTitle: 'Gastronomie & Lokale Küche: 24 Gerichte & 16 Genussorte | Dalaman Guide',
    metaDescription:
      'Interaktiver Kulinarik-Guide zwischen Datça und Kaş: 24 typische Gerichte der Region Muğla (Çökertme-Kebab, Dalyan-Blaukrabbe, Meeresspargel, Pide, Künefe) mit echten Fotos, interaktive Karte mit 16 Orten, Fischmarkt Fethiye & Tipps 2026.',
    home: 'Startseite',
    activitiesCrumb: 'Aktivitäten',
    pageCrumb: 'Gastronomie & Küche',
    eyebrow: 'ÄGÄIS-KÜCHE, MEZE & REGIONALE SPEZIALITÄTEN • DATÇA BIS KAŞ',
    h1: 'Gastronomie & Regionale Küche: Was bestellen & wo genießen',
    lead: 'Interaktives Lexikon der 24 wichtigsten Gerichte zwischen Datça und Kaş mit echten Fotos und Bestelltipps, interaktive Karte mit 16 kulinarischen Vierteln, Fischmarkt-Prinzip in Fethiye, Wörterbuch und Rechnungsregeln 2026.',
    heroAlt: 'Traditionelle türkische Ägäis-Meze-Tafel mit Olivenöl-Vorspeisen und Meeresfrüchten in einem Küstenrestaurant',
    btnDishes: '24 Gerichte entdecken',
    btnMap: 'Genusskarte & 4 Zonen (16)',
    btnFormats: 'Lokale, Rituale & Sätze',
    btnRules: 'Rechnung & Regeln 2026',
  },
  tr: {
    metaTitle: 'Ege Gastronomisi ve Yöresel Mutfak: 24 Lezzet ve 16 Mekân | Dalaman Rehberi',
    metaDescription:
      'Datça’dan Kaş’a interaktif lezzet rehberi: Muğla ve Turkuaz kıyıların 24 temel yemeği (Çökertme kebabı, Dalyan mavi yengeci, deniz börülcesi, pide, künefe), 16 restoran bölgesi haritası, Fethiye Balık Pazarı ve 2026 adisyon kuralları.',
    home: 'Ana Sayfa',
    activitiesCrumb: 'Ne Yapılır',
    pageCrumb: 'Gastronomi ve Mutfak',
    eyebrow: 'EGE SOFRASI, MEZELER VE YÖRESEL TATLAR • DATÇA’DAN KAŞ’A',
    h1: 'Gastronomi ve Yöresel Mutfak: Ne Yenir, Nerede Yenir?',
    lead: 'Muğla ve kıyı şeridinin gerçek fotoğraflı 24 temel yemeği, 16 onaylı gastronomi durağını gösteren interaktif harita, Fethiye Balık Pazarı rehberi, pratik sipariş sözlüğü ve 2026 adisyon kuralları.',
    heroAlt: 'Türkiye kıyılarında zeytinyağlılar, deniz ürünleri ve geleneksel Ege mezeleriyle donatılmış sofra',
    btnDishes: 'Yemek Ansiklopedisi (24)',
    btnMap: 'Mekân Haritası & 4 Bölge (16)',
    btnFormats: 'Formatlar, Ritüeller & Sözlük',
    btnRules: 'Hesap ve Kurallar 2026',
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
    pathname: '/gastronomy',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function GastronomyPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Culinary Hero Banner */}
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
                href="#dishes"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold tracking-wide transition-colors shadow-lg shadow-amber-600/25"
              >
                <FaUtensils size={12} />
                <span>{copy.btnDishes}</span>
              </a>
              <a
                href="#map-zones"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaCompass size={12} className="text-amber-300" />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#formats"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaWineGlassAlt size={12} className="text-amber-300" />
                <span>{copy.btnFormats}</span>
              </a>
              <a
                href="#rules"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaInfoCircle size={12} className="text-cyan-300" />
                <span>{copy.btnRules}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Interactive Gastronomy Hub */}
        <section className="py-10 md:py-14">
          <div className="portal-container">
            <GastronomyHub locale={activeLocale} />
          </div>
        </section>
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
