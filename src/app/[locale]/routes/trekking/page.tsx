import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaChevronRight, FaRoute, FaHiking, FaBookOpen } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import TrekkingAtlas from '@/app/components/TrekkingAtlas';
import { buildPageMetadata } from '@/lib/seo';

type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

interface TrekkingPageCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  routesCrumb: string;
  atlasCrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  btnRoutes: string;
  btnGuideTips: string;
  btnCoastalTrails: string;
}

const HERO_IMAGE = '/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg';

const PAGE_COPY: Record<LocaleCode, TrekkingPageCopy> = {
  ru: {
    metaTitle: 'Треккинг и Хайкинг в Турции: Атлас Ликийской и Карийской троп | Дача — Каш',
    metaDescription:
      'Интерактивный атлас пешеходных маршрутов Ликийской и Карийской троп от Датчи до Каша: дистанции, перепады высот, источники воды и маршруты на карте.',
    home: 'Главная',
    routesCrumb: 'Маршруты',
    atlasCrumb: 'Атлас треккинга',
    eyebrow: 'ЛИКИЙСКАЯ И КАРИЙСКАЯ ТРОПЫ • ДАТЧА — КАШ',
    h1: 'Интерактивный Атлас треккинга и горных троп',
    lead: 'Каталог пеших маршрутов Бирюзового побережья: этапы Ликийской и Карийской троп, однодневные прогулки по сосновым перевалам и водные каньоны с перепадами высот, родниками и треками.',
    heroAlt: 'Каменные руины Каякёя на фоне гор Бабадаг у начала Ликийской тропы',
    btnRoutes: 'Маршруты и логистика',
    btnGuideTips: 'Гид и советы хайкерам',
    btnCoastalTrails: 'Обзор 6 однодневных троп',
  },
  en: {
    metaTitle: 'Trekking & Hiking in Turkey: Lycian & Carian Trail Atlas | Dalaman Guide',
    metaDescription:
      'Interactive atlas of hiking trails across the Lycian Way and Carian Trail from Datça to Kaş: distances, elevation gain, drinking fountains, and trail map links.',
    home: 'Home',
    routesCrumb: 'Routes',
    atlasCrumb: 'Trail Atlas',
    eyebrow: 'LYCIAN WAY & CARIAN TRAIL • DATÇA TO KAŞ',
    h1: 'Interactive Trekking & Mountain Trail Atlas',
    lead: 'Curated directory of coastal and mountain hikes across the Turquoise Coast: Lycian Way and Carian Trail stages, pine-pass day hikes, and canyons with elevation metrics, springs, and route links.',
    heroAlt: 'Stone ruins of Kayaköy backed by Mount Babadağ near the western Lycian Way',
    btnRoutes: 'Routes & Logistics',
    btnGuideTips: 'Hiking Guide & Tips',
    btnCoastalTrails: '6 Best Day Hikes Guide',
  },
  de: {
    metaTitle: 'Trekking & Wandern in der Türkei: Lykischer & Karischer Weg Atlas | Dalaman Guide',
    metaDescription:
      'Interaktiver Wanderatlas für den Lykischen und Karischen Weg von Datça bis Kaş: Distanzen, Höhenmeter, Trinkwasserquellen und direkte Kartenrouten.',
    home: 'Startseite',
    routesCrumb: 'Routen',
    atlasCrumb: 'Wanderatlas',
    eyebrow: 'LYKISCHER & KARISCHER WEG • DATÇA BIS KAŞ',
    h1: 'Interaktiver Trekking- und Wanderatlas',
    lead: 'Katalog der schönsten Küsten- und Bergtouren rund um Dalaman: Etappen des Lykischen und Karischen Weges, Tageswanderungen und Schluchten mit Höhenmetern, Quellen und Routenlinks.',
    heroAlt: 'Steinerne Ruinen von Kayaköy vor den Bergen des Babadağ am westlichen Lykischen Weg',
    btnRoutes: 'Routen & Logistik',
    btnGuideTips: 'Wander-Guide & Tipps',
    btnCoastalTrails: '6 Tagestouren im Überblick',
  },
  tr: {
    metaTitle: 'Türkiye’de Trekking ve Yürüyüş: Likya ve Karya Yolu Atlası | Dalaman Rehberi',
    metaDescription:
      'Datça’dan Kaş’a Likya ve Karya Yolları için interaktif yürüyüş atlası: mesafe, irtifa kazanımı, içme suyu çeşmeleri ve harita rotaları.',
    home: 'Ana Sayfa',
    routesCrumb: 'Rotalar',
    atlasCrumb: 'Yürüyüş Atlası',
    eyebrow: 'LİKYA VE KARYA YOLU • DATÇA’DAN KAŞ’A',
    h1: 'İnteraktif Trekking ve Patika Atlası',
    lead: 'Turkuaz Kıyıların yürüyüş rehberi: Likya ve Karya Yolu etapları, çam ormanı geçitleri ve kanyon rotaları; rakım profilleri, su çeşmeleri ve harita bağlantılarıyla.',
    heroAlt: 'Batı Likya Yolu başlangıcındaki Babadağ eteklerinde Kayaköy taş kalıntıları',
    btnRoutes: 'Rotalar ve Lojistik',
    btnGuideTips: 'Yürüyüş Rehberi & İpuçları',
    btnCoastalTrails: 'En İyi 6 Günübirlik Rota',
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
    pathname: '/routes/trekking',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function TrekkingRoutesPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Mountain Hero Banner */}
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
              <Link href={`/${activeLocale}/routes`} className="hover:text-cyan-300 transition-colors">
                {copy.routesCrumb}
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <span className="text-white font-bold">{copy.atlasCrumb}</span>
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
              <Link
                href={`/${activeLocale}/routes`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaRoute size={12} className="text-cyan-300" />
                <span>{copy.btnRoutes}</span>
              </Link>
              <Link
                href={`/${activeLocale}/articles/trekking`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaHiking size={12} className="text-cyan-300" />
                <span>{copy.btnGuideTips}</span>
              </Link>
              <Link
                href={`/${activeLocale}/articles/trekking-routes-lycian-coast`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold tracking-wide transition-colors shadow-lg shadow-cyan-600/25"
              >
                <FaBookOpen size={12} />
                <span>{copy.btnCoastalTrails}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Main Interactive Atlas Section */}
        <section className="py-10 md:py-14">
          <div className="portal-container">
            <TrekkingAtlas locale={activeLocale} />
          </div>
        </section>
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
