import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronRight,
  FaClock,
  FaCompass,
  FaHome,
  FaShieldAlt,
  FaWind,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import KitesurfingHub from '@/app/components/KitesurfingHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/kitesurfing';

interface KitesurfPageCopy {
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
  btnThermal: string;
  btnSchools: string;
  btnRules: string;
}

const HERO_IMAGE = '/api/images/locations/marmaris/beach/Akyaka/Akyaka.jpg';

const PAGE_COPY: Record<LocaleCode, KitesurfPageCopy> = {
  ru: {
    metaTitle: 'Кайт и виндсёрфинг (Акьяка, Датча, Сарыгерме): 3D-карта, термик и цены 2026 | Дача — Каш',
    metaDescription:
      'Интерактивный гид по кайтсёрфингу, виндсёрфингу и вингфойлу в регионе Даламан: 3D-карта залива Гёкова (Акчапынар), Датчи, Сарыгерме и Чалыша, профиль термика 09:00–19:00, калькулятор кайта, IKO 1–3, цены 2026 и разбор запрещённых зон.',
    home: 'Главная',
    activitiesCrumb: 'Чем заняться',
    pageCrumb: 'Кайт и виндсёрфинг',
    eyebrow: 'ВЕТЕР ЭГЕЙСКОГО ПОБЕРЕЖЬЯ • АКЬЯКА — ДАТЧА — САРЫГЕРМЕ — ЧАЛЫШ',
    h1: 'Кайтсёрфинг, виндсёрфинг и вингфойл: 3D-карта спотов 2026',
    lead: 'Интерактивная 3D-карта ветровых заливов и красных зон, часовой профиль термика в Гёкове (09:00–19:00), калькулятор размера купола, паруса и гидрокостюма, дорожная карта IKO 1–3, цены школ и честный разбор мифов про Каш, Гёчек и Олюдениз.',
    heroAlt: 'Разноцветные кайты над заливом Гёкова и кайт-пляжем Акчапынар на фоне гор Сакартепе в Акьяке',
    btnMap: '3D-карта спотов и зон',
    btnThermal: 'Профиль термика и подбор размера',
    btnSchools: 'Курсы IKO, прокат и школы 2026',
    btnRules: 'Правила воды, страховка и 112',
  },
  en: {
    metaTitle: 'Kite & Windsurfing in Akyaka, Datça & Sarıgerme: 3D Map, Thermal Curve & 2026 Rates | Dalaman Guide',
    metaDescription:
      'Interactive kitesurfing, windsurfing, and wingfoil hub across Muğla & Dalaman: live 3D bay map (Akçapınar, Kızlan, Sarıgerme, Çalış), hourly thermal curve, kite & wetsuit sizer, IKO Levels 1–3, 2026 prices & no-kite red zones.',
    home: 'Home',
    activitiesCrumb: 'Things to Do',
    pageCrumb: 'Kite & Windsurfing',
    eyebrow: 'TURQUOISE COAST WINDS • AKYAKA — DATÇA — SARIGERME — ÇALIŞ',
    h1: 'Kitesurfing, Windsurfing & Wingfoil: 3D Spot Hub 2026',
    lead: 'Live 3D relief & wind zoning map, Gökova’s diurnal thermal wind engine (09:00–19:00), interactive kite/sail/wetsuit sizing calculator, IKO 1–3 roadmap, verified 2026 school rates & myth-busting Red Zones.',
    heroAlt: 'Colorful kites aloft above Akyaka Akçapınar Kite Beach with Sakartepe mountains behind Gökova Bay',
    btnMap: '3D Wind & Zone Map',
    btnThermal: 'Thermal Curve & Gear Sizer',
    btnSchools: 'Courses, Rentals & Schools 2026',
    btnRules: 'Water Rules, Insurance & 112',
  },
  de: {
    metaTitle: 'Kite & Windsurfen (Akyaka, Datça, Sarıgerme): 3D-Karte, Thermik & Preise 2026 | Dalaman Guide',
    metaDescription:
      'Interaktiver Windsurf-, Wingfoil- und Kitesurf-Hub rund um Dalaman: 3D-Revierkarte (Akçapınar, Kızlan, Sarıgerme, Çalış), Tagesthermik-Kurve, Größenrechner, IKO Level 1–3, Preise 2026 & Verbotszonen.',
    home: 'Startseite',
    activitiesCrumb: 'Aktivitäten',
    pageCrumb: 'Kite & Windsurfen',
    eyebrow: 'ÄGÄIS-WINDE VON DATÇA BIS FETHIYE • AKYAKA — DATÇA — SARIGERME',
    h1: 'Kitesurfen, Windsurfen & Wingfoil: 3D-Revierguide 2026',
    lead: 'Interaktive 3D-Buchten- und Zonenkarte, stündlicher Thermik-Verlauf am Golf von Gökova (09:00–19:00), Größenrechner für Kite/Segel/Wing & Neopren, IKO-Stufenplan, Kurspreise 2026 und Verbotszonen.',
    heroAlt: 'Bunte Kites am Himmel über dem Strand Akçapınar in Akyaka vor dem Bergzug von Sakartepe',
    btnMap: '3D-Revierkarte',
    btnThermal: 'Thermik-Kurve & Größenrechner',
    btnSchools: 'Kurse, Verleih & Basen 2026',
    btnRules: 'Wasserregeln, Schutz & 112',
  },
  tr: {
    metaTitle: 'Kite & Rüzgar Sörfü (Akyaka, Datça, Sarıgerme): 3D Harita, Termik & 2026 Fiyatları | Dalaman Rehberi',
    metaDescription:
      'Dalaman ve Muğla kıyılarına özel interaktif kitesurf, rüzgar sörfü ve wingfoil rehberi: canlı 3D koy haritası, saatlik termik eğrisi, ekipman boy hesaplayıcı, IKO 1–3, 2026 fiyatları ve kite yasak bölgeleri.',
    home: 'Ana Sayfa',
    activitiesCrumb: 'Ne Yapılır',
    pageCrumb: 'Kite & Rüzgar Sörfü',
    eyebrow: 'EGE & AKDENİZ RÜZGÂRI • AKYAKA — DATÇA — SARIGERME — ÇALIŞ',
    h1: 'Kitesurf, Rüzgar Sörfü ve Wingfoil: 3D Saha Rehberi 2026',
    lead: 'Canlı 3D koy ve yasaklı bölge haritası, Gökova Körfezi saatlik termik rüzgâr eğrisi (09:00–19:00), kilo ve mevsime göre kite/yelken/wetsuit hesaplayıcı, IKO 1–3 haritası ve 2026 okul tarifeleri.',
    heroAlt: 'Akyaka Akçapınar sahili ve Sakartepe dağları önünde gökyüzünü süsleyen rengarenk kite uçurtmaları',
    btnMap: '3D Saha & Yasak Bölge Haritası',
    btnThermal: 'Termik Profili & Boy Hesaplayıcı',
    btnSchools: 'Kurs, Kiralama & Okullar 2026',
    btnRules: 'Su Kuralları, Sigorta & 112',
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
    pathname: '/kitesurfing',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function KitesurfingPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Coastal Wind & Lagoon Hero Banner */}
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
                href="#wind-map"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold tracking-wide transition-colors shadow-lg shadow-cyan-600/25"
              >
                <FaCompass size={12} />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#thermal-profile"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaClock size={12} className="text-cyan-300" />
                <span>{copy.btnThermal}</span>
              </a>
              <a
                href="#schools-prices"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaWind size={12} className="text-cyan-300" />
                <span>{copy.btnSchools}</span>
              </a>
              <a
                href="#rules-safety"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaShieldAlt size={12} className="text-amber-300" />
                <span>{copy.btnRules}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Interactive Hub */}
        <KitesurfingHub locale={activeLocale} />
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
