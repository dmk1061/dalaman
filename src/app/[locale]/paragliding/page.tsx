import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronRight,
  FaClock,
  FaCompass,
  FaHome,
  FaMountain,
  FaShieldAlt,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ParaglidingHub from '@/app/components/ParaglidingHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/paragliding';

interface ParaglidingPageCopy {
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
  btnRunways: string;
  btnSlots: string;
  btnRules: string;
}

const HERO_IMAGE = '/api/images/locations/fethiye/todo/babadag/babadag3.jpg';

const PAGE_COPY: Record<LocaleCode, ParaglidingPageCopy> = {
  ru: {
    metaTitle: 'Параглайдинг в Олюденизе (Бабадаг 1969 м): 3D-карта, цены 2026 и слоты | Дача — Каш',
    metaDescription:
      'Полный интерактивный гид по параглайдингу над Голубой лагуной и регионом Даламан: 3D-карта Бабадага, Сакар-Тепе и Каша, высоты 1200–1969 м, Babadağ Teleferik, выбор времени (08:30–17:00), цены и лимиты SHGM.',
    home: 'Главная',
    activitiesCrumb: 'Чем заняться',
    pageCrumb: 'Параглайдинг',
    eyebrow: 'НЕБО БИРЮЗОВОГО ПОБЕРЕЖЬЯ • БАБАДАГ — ОЛЮДЕНИЗ — КАШ',
    h1: 'Параглайдинг: 3D-карта Бабадага, высоты и полёты 2026',
    lead: 'Интерактивная 3D-карта рельефа, схема 4 стартовых площадок (1200–1969 м), канатная дорога Babadağ Teleferik, сравнение 5 ежедневных слотов, чекер допуска (вес, возраст, дайвинг), цены с учётом 360°-видео и SIV-курсы.',
    heroAlt: 'Закатный полёт на параплане над морем и заливом со смотровой террасы Бабадага',
    btnMap: '3D-карта горы и стартов',
    btnRunways: 'Схема высот (1200–1969 м)',
    btnSlots: 'Слоты, допуск и цены',
    btnRules: 'Правила SHGM 2026',
  },
  en: {
    metaTitle: 'Paragliding in Ölüdeniz (Mount Babadağ): 3D Map, 2026 Prices & Slots | Dalaman Guide',
    metaDescription:
      'Interactive paragliding hub for Ölüdeniz (Babadağ 1,969 m), Sakartepe & Kaş: live 3D relief map, 4 launch runways, Babadağ Teleferik guide, 5 daily flight slots, eligibility checker & SHGM rules.',
    home: 'Home',
    activitiesCrumb: 'Things to Do',
    pageCrumb: 'Paragliding',
    eyebrow: 'TURQUOISE COAST SKIES • BABADAĞ — ÖLÜDENİZ — KAŞ',
    h1: 'Paragliding: Babadağ 3D Map, Runways & 2026 Flight Guide',
    lead: 'Interactive 3D mountain terrain map, 1,200–1,969 m launch elevation profile, Babadağ Teleferik cable car prices, 5 daily flight slots, passenger eligibility checker, 360° media costs & over-water SIV clinics.',
    heroAlt: 'Sunset paraglider flying past Mount Babadağ panoramic terrace overlooking the Mediterranean',
    btnMap: '3D Mountain Map',
    btnRunways: 'Runway Profile (1,200–1,969 m)',
    btnSlots: 'Slots, Checker & Prices',
    btnRules: 'SHGM Safety Rules',
  },
  de: {
    metaTitle: 'Paragliding in Ölüdeniz (Babadağ): 3D-Karte, Preise 2026 & Startplätze | Dalaman Guide',
    metaDescription:
      'Interaktiver Paragliding-Guide für Babadağ (1.969 m), Sakartepe & Kaş: 3D-Geländekarte, 4 Startrampen, Seilbahn Babadağ Teleferik, 5 Tages-Slots, Eignungscheck & SHGM-Regeln.',
    home: 'Startseite',
    activitiesCrumb: 'Aktivitäten',
    pageCrumb: 'Paragliding',
    eyebrow: 'ÜBER DER TÜRKISKÜSTE • BABADAĞ — ÖLÜDENİZ — KAŞ',
    h1: 'Paragliding: Babadağ 3D-Karte, Höhen & Flugguide 2026',
    lead: 'Interaktive 3D-Geländekarte, Höhenprofil der 4 Startplätze (1.200–1.969 m), Babadağ Teleferik Seilbahn, 5 Flugzeiten im Vergleich, Eignungscheck, Preise inkl. 360°-Video und SIV-Trainings.',
    heroAlt: 'Gleitschirmflieger bei Sonnenuntergang vor der Panoramaterrasse am Babadağ',
    btnMap: '3D-Bergkarte',
    btnRunways: 'Höhenprofil (1.200–1.969 m)',
    btnSlots: 'Zeiten, Check & Preise',
    btnRules: 'SHGM-Regeln 2026',
  },
  tr: {
    metaTitle: 'Ölüdeniz Yamaç Paraşütü (Babadağ): 3D Harita, 2026 Fiyatlar & Pistler | Dalaman Rehberi',
    metaDescription:
      'Babadağ (1.969 m), Sakartepe ve Kaş için interaktif yamaç paraşütü rehberi: canlı 3D arazi haritası, 4 pist irtifa şeması, Teleferik ücretleri, 5 uçuş saati, uygunluk testi ve SHGM kuralları.',
    home: 'Ana Sayfa',
    activitiesCrumb: 'Ne Yapılır',
    pageCrumb: 'Yamaç Paraşütü',
    eyebrow: 'TURKUAZ KIYI SEMALARI • BABADAĞ — ÖLÜDENİZ — KAŞ',
    h1: 'Yamaç Paraşütü: Babadağ 3D Harita, Pistler ve 2026 Rehberi',
    lead: 'İnteraktif 3D dağ haritası, 1.200–1.969 m 4 pist yüksekliği şeması, Babadağ Teleferik ücretleri, 5 günlük uçuş saati analizi, yolcu uygunluk testi, 360° medya maliyeti ve SIV kampları.',
    heroAlt: 'Babadağ seyir terası önünde gün batımında süzülen yamaç paraşütü',
    btnMap: '3D Arazi Haritası',
    btnRunways: 'Pist İrtifaları (1.200–1.969 m)',
    btnSlots: 'Saatler, Test & Fiyatlar',
    btnRules: 'SHGM Kuralları 2026',
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
    pathname: '/paragliding',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function ParaglidingPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Mountain Sky Hero Banner */}
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
                href="#flight-map-3d"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold tracking-wide transition-colors shadow-lg shadow-cyan-600/25"
              >
                <FaCompass size={12} />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#runways-teleferik"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaMountain size={12} className="text-cyan-300" />
                <span>{copy.btnRunways}</span>
              </a>
              <a
                href="#slots-schools"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaClock size={12} className="text-cyan-300" />
                <span>{copy.btnSlots}</span>
              </a>
              <a
                href="#safety-rules"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaShieldAlt size={12} className="text-amber-300" />
                <span>{copy.btnRules}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Interactive Hub */}
        <section className="py-10 md:py-14">
          <div className="portal-container">
            <ParaglidingHub locale={activeLocale} />
          </div>
        </section>
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
