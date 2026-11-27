import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaCalendarAlt,
  FaChevronRight,
  FaClock,
  FaCoins,
  FaCompass,
  FaHome,
  FaMusic,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NightlifeHub from '@/app/components/NightlifeHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/nightlife';

interface NightlifePageCopy {
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
  btnDistricts: string;
  btnPlanner: string;
  btnFestivals: string;
  btnPrices: string;
}

const HERO_IMAGE = '/images/nightlife/hero-cocktail.jpg';

const PAGE_COPY: Record<LocaleCode, NightlifePageCopy> = {
  ru: {
    metaTitle: 'Вечерняя жизнь, бары и фестивали 2026–2027 (Мармарис, Фетхие, Каш): 3D-карта | Дача — Каш',
    metaDescription:
      'Интерактивный гид по вечерней жизни и фестивалям побережья: 3D-карта 21 точки (Bar Street, Хисароню, Паспатур, крыши Каша + фестивали и регаты), ритм ночи до/после 00:00, календарь событий, праздники 2027, цены и такси UKOME.',
    home: 'Главная',
    activitiesCrumb: 'Чем заняться',
    pageCrumb: 'Вечерняя жизнь, бары и фестивали',
    eyebrow: 'НОЧНАЯ ЖИЗНЬ, ФЕСТИВАЛИ И РЕГАТЫ • МАРМАРИС — ФЕТХИЕ — ДАТЧА — КАШ',
    h1: 'Вечерняя жизнь, бары, руфтопы и фестивали побережья 2026',
    lead: 'Где танцуют до 04:00, где слушают джаз на крышах Каша и когда прилетать на миндальный фестиваль Датчи, Воздушные игры Олюдениза и осенние регаты: 3D-карта 21 локации, подборщик вечера, календарь праздников 2027 и цены.',
    heroAlt: 'Коктейль со льдом на барной стойке на фоне вечерних неоновых огней',
    btnMap: '3D-карта 21 локации',
    btnDistricts: '5 характеров курортов',
    btnPlanner: 'График ночи и подборщик',
    btnFestivals: 'Фестивали, регаты и 2027',
    btnPrices: 'Цены 2026 и закон 00:00',
  },
  en: {
    metaTitle: 'Nightlife, Bar Streets, Rooftops & Coastal Festivals 2026–2027: 3D Map | Dalaman Guide',
    metaDescription:
      'Interactive guide to Turquoise Coast nightlife & festivals: 3D map of 21 locations (Marmaris Bar Street, Hisarönü, Paspatur, Kaş rooftops + festival & regatta sites), midnight curfew rules, 12-month event calendar, 2027 Bayram surges & UKOME taxis.',
    home: 'Home',
    activitiesCrumb: 'Things to Do',
    pageCrumb: 'Nightlife, Bars & Festivals',
    eyebrow: 'NIGHTLIFE, FESTIVALS & REGATTAS • MARMARİS — FETHİYE — DATÇA — KAŞ',
    h1: 'Coastal Nightlife, Rooftops, Jazz & Seasonal Festivals: 2026 Hub',
    lead: 'Where dancefloors run until 04:00, where marinas sleep at midnight, plus Datça Almond Blossom, Ölüdeniz Air Games & Marmaris Race Week: 21-pin 3D map, evening destination matcher, 2027 holiday alerts & drink prices.',
    heroAlt: 'Chilled cocktail glass glowing under colorful neon nightlife bar lights',
    btnMap: '3D Map (21 Pins)',
    btnDistricts: '5 Resort Personalities',
    btnPlanner: 'Night Rhythm & Matcher',
    btnFestivals: 'Festivals, Regattas & 2027',
    btnPrices: '2026 Prices & 00:00 Rules',
  },
  de: {
    metaTitle: 'Nachtleben, Bars, Rooftops & Küsten-Festivals 2026–2027: 3D-Karte | Dalaman Guide',
    metaDescription:
      'Interaktiver Guide für Nachtleben & Festivals von Datça bis Kaş: 3D-Karte mit 21 Zielen (Bar Street, Hisarönü, Paspatur, Kaş Dachterrassen & Festival-Orte), 00:00-Sperrstunde, Festivalkalender, Bayram-Termine 2027 & UKOME-Taxi.',
    home: 'Startseite',
    activitiesCrumb: 'Aktivitäten',
    pageCrumb: 'Nachtleben, Bars & Festivals',
    eyebrow: 'NACHTLEBEN, FESTIVALS & REGATTEN • MARMARİS — FETHİYE — DATÇA — KAŞ',
    h1: 'Nachtleben, Bar Street, Rooftops & Festivals an der Küste 2026',
    lead: 'Wo man bis 04:00 tanzt, wo es ab 00:00 ruhig wird plus Mandelblüte Datça, Ölüdeniz Air Games & Marmaris Race Week: 3D-Karte mit 21 Zielen, Ausgeh-Matcher, Feiertage 2027 & Preise.',
    heroAlt: 'Gekühlter Cocktail an einer Bar vor leuchtenden Neonlichtern bei Nacht',
    btnMap: '3D-Karte (21 Spots)',
    btnDistricts: '5 Nacht-Charaktere',
    btnPlanner: 'Nachtrhythmus & Planer',
    btnFestivals: 'Festivals, Regatten & 2027',
    btnPrices: 'Preise 2026 & 00:00-Regel',
  },
  tr: {
    metaTitle: 'Gece Hayatı, Barlar, Teraslar ve Bölge Festivalleri 2026–2027: 3D Harita | Dalaman Rehberi',
    metaDescription:
      'Muğla ve Kaş kıyılarının interaktif gece hayatı ve festival rehberi: 21 noktalı 3D harita (Marmaris Barlar Sokağı, Hisarönü, Paspatur, Kaş terasları + festival ve yarış alanları), 00:00 ses kuralı, 2027 bayram tarihleri & UKOME taksi.',
    home: 'Ana Sayfa',
    activitiesCrumb: 'Ne Yapılır',
    pageCrumb: 'Gece Hayatı, Barlar ve Festivaller',
    eyebrow: 'GECE HAYATI, FESTİVALLER VE YELKEN • MARMARİS — FETHİYE — DATÇA — KAŞ',
    h1: 'Kıyıda Gece Hayatı, Teraslar, Caz ve Bölge Festivalleri 2026',
    lead: 'Sabah 04:00’e kadar süren kulüpler ve sakin marinalarla birlikte Datça Badem Çiçeği, Ölüdeniz Hava Oyunları ve Marmaris Yarış Haftası: 21 noktalı 3D harita, akşam planlayıcı, 2027 bayram takvimi ve fiyatlar.',
    heroAlt: 'Gece kulübü neon ışıkları altında buzlu kokteyl bardağı',
    btnMap: '3D Harita (21 Nokta)',
    btnDistricts: '5 Kıyı Karakteri',
    btnPlanner: 'Gece Akışı ve Seçici',
    btnFestivals: 'Festivaller, Regattalar & 2027',
    btnPrices: '2026 Fiyatları & 00:00 Kuralı',
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
    pathname: '/nightlife',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function NightlifePage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Neon Nightlife Hero Banner */}
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
                className="hover:text-rose-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <FaHome size={11} className="text-rose-300" />
                <span>{copy.home}</span>
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <Link
                href={`/${activeLocale}/collections`}
                className="hover:text-rose-300 transition-colors"
              >
                {copy.activitiesCrumb}
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <span className="text-white font-bold">{copy.pageCrumb}</span>
            </nav>

            <span className="block text-rose-300 font-bold text-xs uppercase tracking-widest mb-2.5">
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
                href="#nightlife-map"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold tracking-wide transition-colors shadow-lg shadow-rose-600/30"
              >
                <FaCompass size={12} />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#night-districts"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaMusic size={12} className="text-amber-300" />
                <span>{copy.btnDistricts}</span>
              </a>
              <a
                href="#evening-planner"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaClock size={12} className="text-violet-300" />
                <span>{copy.btnPlanner}</span>
              </a>
              <a
                href="#festivals"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaCalendarAlt size={12} className="text-emerald-300" />
                <span>{copy.btnFestivals}</span>
              </a>
              <a
                href="#prices-rules"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaCoins size={12} className="text-cyan-300" />
                <span>{copy.btnPrices}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Nightlife Interactive Hub */}
        <NightlifeHub locale={activeLocale} />
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
