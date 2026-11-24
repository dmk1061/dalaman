import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaAward,
  FaBalanceScale,
  FaCalendarAlt,
  FaChevronRight,
  FaCompass,
  FaHome,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import MarketsCraftsHub from '@/app/components/MarketsCraftsHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/markets-crafts';

interface MarketsPageCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  activitiesCrumb: string;
  pageCrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  btnCalendar: string;
  btnMap: string;
  btnCrafts: string;
  btnChecker: string;
}

const HERO_IMAGE = '/images/markets-crafts/hero-spices.jpg';

const PAGE_COPY: Record<LocaleCode, MarketsPageCopy> = {
  ru: {
    metaTitle: 'Рынки, базары и ремёсла (Фетхие, Кёйджегиз, Каш, Датча): 3D-карта и гид 2026 | Дача — Каш',
    metaDescription:
      'Интерактивный гид по кочующим еженедельным рынкам (Пн–Вс), старым кварталам Паспатур и Узун-Чарши, настоящим ремёслам Ликии (дастар, килимы, масло сыгла, сосновый мёд): 3D-карта, график свежести, правила торга и Закон № 2863.',
    home: 'Главная',
    activitiesCrumb: 'Чем заняться',
    pageCrumb: 'Рынки, базары и ремёсла',
    eyebrow: 'БАЗАРЫ, РЕМЁСЛА И ГАСТРОНОМИЯ • ФЕТХИЕ — КЁЙДЖЕГИЗ — ДАТЧА — КАШ',
    h1: 'Еженедельные рынки, старые базары и ремёсла: 3D-гид 2026',
    lead: 'Интерактивный календарь Пн–Вс по 16 базарам, 3D-карта 15 торговых точек и деревень мастеров, 5-секундный тест подлинности килимов, пештемалей и дастара, правила торга «пазарлык» и таможенный чекер DLM (Закон № 2863).',
    heroAlt: 'Красочные пирамиды специй, сумаха, шафрана и чая на турецком базаре',
    btnCalendar: 'Календарь рынков Пн–Вс',
    btnMap: '3D-карта 15 базаров',
    btnCrafts: 'Ремёсла и анти-фейк тест',
    btnChecker: 'Чекер торга и таможни',
  },
  en: {
    metaTitle: 'Weekly Markets, Bazaars & Authentic Crafts (Fethiye, Kaş, Datça): 3D Map & 2026 Guide | Dalaman Guide',
    metaDescription:
      'Complete 4-season interactive hub to Muğla & Lycian markets (Mon–Sun Pazars), Paspatur & Kaş Uzun Çarşı, dastar hand-weaving, Yörük kilims & pine honey: live 3D map, market-hour curve, 25–35% haggling rules & Law No. 2863 customs check.',
    home: 'Home',
    activitiesCrumb: 'Things to Do',
    pageCrumb: 'Weekly Markets, Bazaars & Crafts',
    eyebrow: 'PAZARS, ARTISAN QUARTERS & LOCAL CRAFTS • FETHİYE — KÖYCEĞİZ — DATÇA — KAŞ',
    h1: 'Weekly Markets, Old Bazaars & Authentic Crafts: 2026 3D Hub',
    lead: 'Plan every morning with a Mon–Sun Coastal Market Calendar, inspect 15 live pins on a 3D map, check genuine Yeşilüzümlü dastar linen, 100% peştemal towels & warp-fringed kilims, and verify DLM customs rules before packing.',
    heroAlt: 'Vibrant pyramids of Turkish sumac, saffron spice, teas and dried herbs on a sunlit market stall',
    btnCalendar: 'Mon–Sun Pazar Calendar',
    btnMap: '3D Map (15 Spots)',
    btnCrafts: 'Crafts & Authenticity Tests',
    btnChecker: 'Haggle & DLM Customs Check',
  },
  de: {
    metaTitle: 'Wochenmärkte, Basare & Echtes Handwerk (Fethiye, Kaş, Datça): 3D-Karte 2026 | Dalaman Guide',
    metaDescription:
      'Interaktiver Markt- & Handwerks-Hub zwischen Datça und Kaş: Wochenmarkt-Kalender (Mo–So), Altstadtgassen Paspatur & Uzun Çarşı, 8 echte Spezialitäten (Dastar, Kelims, Sığla-Öl, Honig), 3D-Karte, Pazarlık-Regeln & Gesetz Nr. 2863.',
    home: 'Startseite',
    activitiesCrumb: 'Aktivitäten',
    pageCrumb: 'Wochenmärkte, Basare & Handwerk',
    eyebrow: 'WOCHENMÄRKTE & KUNSTHANDWERK • FETHİYE — KÖYCEĞİZ — DATÇA — KAŞ',
    h1: 'Wochenmärkte, Altstadt-Basare & Echtes Handwerk: 3D-Hub 2026',
    lead: 'Alle 16 Küstenmärkte von Montag bis Sonntag im Überblick, interaktive 3D-Karte mit 15 Stationen, Echtheits-Checks für Handweberei, Kelims & Peştemals sowie Feilsch- und Zoll-Checker für den Rückflug ab Dalaman.',
    heroAlt: 'Leuchtende Gewürzpyramiden mit Sumach, Safran und Tees auf einem türkischen Wochenmarkt',
    btnCalendar: 'Marktkalender Mo–So',
    btnMap: '3D-Karte (15 Orte)',
    btnCrafts: 'Handwerk & Echtheitscheck',
    btnChecker: 'Handeln & Zoll-Check DLM',
  },
  tr: {
    metaTitle: 'Halk Pazarları, Tarihî Çarşılar ve El Sanatları (Fethiye, Kaş, Datça): 3D Rehber 2026 | Dalaman Rehberi',
    metaDescription:
      'Muğla ve Likya kıyılarının interaktif pazar ve zanaat rehberi: Pazartesi–Pazar halk pazarları takvimi, Paspatur ve Uzun Çarşı, Yeşilüzümlü dastar, Yörük kilimi, sığla yağı, 3D harita ve 2863 sayılı kanun gümrük testi.',
    home: 'Ana Sayfa',
    activitiesCrumb: 'Ne Yapılır',
    pageCrumb: 'Pazarlar, Çarşılar ve El Sanatları',
    eyebrow: 'HAFTALIK PAZARLAR VE YEREL MİRAS • FETHİYE — KÖYCEĞİZ — DATÇA — KAŞ',
    h1: 'Halk Pazarları, Tarihî Çarşılar ve El Sanatları: 3D Rehber 2026',
    lead: 'Pazartesiden Pazara 16 semt pazarı takvimi, 15 noktalı 3D kıyı haritası, Yeşilüzümlü dastarı, %100 pamuk peştemal ve Yörük kilimi doğrulama testleri ile akıllı pazarlık ve Dalaman havalimanı bagaj kontrolü.',
    heroAlt: 'Türk çarşısında rengarenk sumak, safran, meyve çayları ve yöresel baharat tezgâhı',
    btnCalendar: 'Pzt–Paz Pazar Takvimi',
    btnMap: '3D Harita (15 Nokta)',
    btnCrafts: 'El Sanatları & Orijinallik',
    btnChecker: 'Pazarlık & Gümrük Testi',
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
    pathname: '/markets-crafts',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function MarketsCraftsPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Vibrant Bazaars & Crafts Hero Banner */}
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
                href="#markets-map"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold tracking-wide transition-colors shadow-lg shadow-amber-500/25"
              >
                <FaCompass size={12} />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#weekly-calendar"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaCalendarAlt size={12} className="text-emerald-400" />
                <span>{copy.btnCalendar}</span>
              </a>
              <a
                href="#authentic-crafts"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaAward size={12} className="text-amber-300" />
                <span>{copy.btnCrafts}</span>
              </a>
              <a
                href="#haggle-customs"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaBalanceScale size={12} className="text-cyan-300" />
                <span>{copy.btnChecker}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Markets & Crafts Interactive Hub */}
        <MarketsCraftsHub locale={activeLocale} />
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
