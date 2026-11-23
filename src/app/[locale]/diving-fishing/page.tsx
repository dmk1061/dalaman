import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaAnchor,
  FaChevronRight,
  FaCompass,
  FaFish,
  FaHome,
  FaShieldAlt,
  FaShoppingBag,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import DivingFishingHub from '@/app/components/DivingFishingHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/diving-fishing';

interface DivingFishingPageCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  activitiesCrumb: string;
  pageCrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  btnEncyclopedia: string;
  btnRentals: string;
  btnMap: string;
  btnLaws: string;
}

const HERO_IMAGE = '/api/images/locations/kas/beach/limangzi/limangzi.jpg';

const PAGE_COPY: Record<LocaleCode, DivingFishingPageCopy> = {
  ru: {
    metaTitle: 'Дайвинг и рыбалка в Турции: энциклопедия рыб, прокат и законы 2026 | Дача — Каш',
    metaDescription:
      'Полный гид по дайвингу, снорклингу и морской рыбалке от Датчи до Каша: интерактивная карта спотов, энциклопедия 23 видов рыб с лимитами Tebliğ 6/2, прокат снаряжения, магазины и запретные зоны.',
    home: 'Главная',
    activitiesCrumb: 'Чем заняться',
    pageCrumb: 'Дайвинг и рыбалка',
    eyebrow: 'ПОДВОДНЫЙ МИР И МОРСКАЯ РЫБАЛКА • ДАТЧА — КАШ',
    h1: 'Дайвинг, снорклинг и морская рыбалка',
    lead: 'Интерактивная карта спотов побережья, определитель 23 морских видов (что можно ловить, что под запретом и кого опасаться), цены 2026 года на прокат снаряжения и чартеры, проверенные магазины и правила Tebliğ № 6/2.',
    heroAlt: 'Бирюзовая бухта Лиманагзы у Каша на Бирюзовом побережье Турции',
    btnEncyclopedia: 'Энциклопедия рыб (23)',
    btnRentals: 'Аренда и магазины',
    btnMap: 'Карта спотов и зон',
    btnLaws: 'Законы и штрафы 2026',
  },
  en: {
    metaTitle: 'Diving & Fishing on Turkey’s Turquoise Coast: Fish Guide & Rentals | Dalaman Guide',
    metaDescription:
      'Complete diving, snorkeling, and shore/boat fishing hub from Datça to Kaş: interactive spot map, 23-species marine encyclopedia with Tebliğ 6/2 size limits, rental pricing, tackle shops, and protected zones.',
    home: 'Home',
    activitiesCrumb: 'Things to Do',
    pageCrumb: 'Diving & Fishing',
    eyebrow: 'UNDERWATER WORLD & COASTAL ANGLING • DATÇA TO KAŞ',
    h1: 'Diving, Snorkeling & Coastal Fishing',
    lead: 'Interactive coastal spot map, 23-species marine encyclopedia (legal catch vs protected & venomous fish), 2026 gear rental & boat charter benchmarks, verified tackle shops, and Turkish Tebliğ № 6/2 statutes.',
    heroAlt: 'Crystal-clear turquoise waters of Limanağzı Bay in Kaş, Turkey',
    btnEncyclopedia: 'Fish Encyclopedia (23)',
    btnRentals: 'Rentals & Tackle Shops',
    btnMap: 'Spot Map & 4 Zones',
    btnLaws: 'Laws & Safety 2026',
  },
  de: {
    metaTitle: 'Tauchen & Angeln an der Türkisküste: Fisch-Lexikon & Verleih | Dalaman Guide',
    metaDescription:
      'Interaktiver Guide für Tauchen, Schnorcheln und Angeln von Datça bis Kaş: Spot-Karte, 23-Arten-Fischenzyklopädie nach Tebliğ 6/2, Mietpreise 2026, Angelläden und Schutzzonen.',
    home: 'Startseite',
    activitiesCrumb: 'Aktivitäten',
    pageCrumb: 'Tauchen & Angeln',
    eyebrow: 'UNTERWASSERWELT & KÜSTENANGELN • DATÇA BIS KAŞ',
    h1: 'Tauchen, Schnorcheln & Küstenangeln',
    lead: 'Interaktive Küstenkarte, 23-Arten-Lexikon (erlaubte Fische, Schonzeiten & Giftarten), Mietpreise 2026 für Tauchausrüstung & Angelboote, lokale Fachgeschäfte sowie alle Regeln nach Tebliğ Nr. 6/2.',
    heroAlt: 'Kristallklare Bucht von Limanağzı bei Kaş an der Türkischen Riviera',
    btnEncyclopedia: 'Fisch-Enzyklopädie (23)',
    btnRentals: 'Verleih & Angelläden',
    btnMap: 'Spot-Karte & Zonen',
    btnLaws: 'Gesetze & Sicherheit 2026',
  },
  tr: {
    metaTitle: 'Turkuaz Kıyılarda Dalış ve Balıkçılık: Balık Ansiklopedisi & Kurallar | Dalaman Rehberi',
    metaDescription:
      'Datça’dan Kaş’a dalış, şnorkel ve balık avı rehberi: interaktif kıyı haritası, 23 deniz türü ansiklopedisi ve 6/2 Tebliğ limitleri, kiralama fiyatları, yerel av bayileri ve koruma sahaları.',
    home: 'Ana Sayfa',
    activitiesCrumb: 'Ne Yapılır',
    pageCrumb: 'Dalış ve Balıkçılık',
    eyebrow: 'SUALTI DÜNYASI VE SPORTİF BALIKÇILIK • DATÇA’DAN KAŞ’A',
    h1: 'Dalış, Şnorkel ve Deniz Balıkçılığı',
    lead: 'İnteraktif kıyı haritası, 23 deniz türü ansiklopedisi (serbest, kotalı, yasak ve zehirli türler), 2026 ekipman kiralama ve tekne fiyatları, yerel av bayileri ile 6/2 Tebliğ mevzuatı.',
    heroAlt: 'Kaş Limanağzı koyunun berrak turkuaz suları',
    btnEncyclopedia: 'Balık Ansiklopedisi (23)',
    btnRentals: 'Kiralama & Av Bayileri',
    btnMap: 'Nokta Haritası & Bölgeler',
    btnLaws: 'Yasalar & Güvenlik 2026',
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
    pathname: '/diving-fishing',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function DivingFishingPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Coastal Underwater Hero Banner */}
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
                className="hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <FaHome size={11} className="text-cyan-300" />
                <span>{copy.home}</span>
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <Link
                href={`/${activeLocale}/collections`}
                className="hover:text-cyan-300 transition-colors"
              >
                {copy.activitiesCrumb}
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <span className="text-white font-bold">{copy.pageCrumb}</span>
            </nav>

            <span className="block text-cyan-300 font-bold text-xs uppercase tracking-widest mb-2.5">
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
                href="#encyclopedia"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold tracking-wide transition-colors shadow-lg shadow-cyan-600/25"
              >
                <FaFish size={12} />
                <span>{copy.btnEncyclopedia}</span>
              </a>
              <a
                href="#rentals"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaShoppingBag size={12} className="text-cyan-300" />
                <span>{copy.btnRentals}</span>
              </a>
              <a
                href="#map-zones"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaCompass size={12} className="text-cyan-300" />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#laws"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaShieldAlt size={12} className="text-amber-300" />
                <span>{copy.btnLaws}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Interactive Hub */}
        <section className="py-10 md:py-14">
          <div className="portal-container">
            <DivingFishingHub locale={activeLocale} />
          </div>
        </section>
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
