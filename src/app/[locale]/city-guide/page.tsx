import React from 'react';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CityGuideClient, { type EnrichedResortItem } from './CityGuideClient';
import { RESORTS_CATALOG, type LocaleCode } from '@/lib/resorts-data';
import { buildPageMetadata, getSiteUrl } from '@/lib/seo';

interface PageCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
}

const PAGE_COPY: Record<LocaleCode, PageCopy> = {
  ru: {
    metaTitle: 'Все курорты региона Даламан (от Датчи до Каша): сравнение, расстояния от DLM и подбор',
    metaDescription:
      'Честное сравнение всех 8 курортов побережья от Датчи до Каша: время трансфера из аэропорта Даламан (DLM), тип пляжей, бюджет и фильтр подбора под ваш формат отдыха.',
    home: 'Главная',
    breadcrumbCurrent: 'Все курорты региона',
    eyebrow: '8 КУРОРТОВ ОТ ДАТЧИ ДО КАША',
    h1: 'Все курорты региона: где остановиться',
    lead: 'Побережье вокруг аэропорта Даламан (DLM) объединяет восемь совершенно разных мест — от тихого озера Кёйджегиз и черепашьей косы Дальяна до яхтенного Гёджека, Олюдениза и богемного Каша. Сравните расстояния, пляжи и подберите свою базу.',
    heroAlt: 'Панорама бухты Сарсала в регионе Даламан',
  },
  en: {
    metaTitle: 'All 8 Coastal Resorts Around Dalaman (Datça to Kaş): Comparison & Finder',
    metaDescription:
      'Honest comparison of all 8 resorts on Turkey’s Turquoise Coast from Datça to Kaş: DLM airport transfer times, beach profiles, budget tiers, and interactive trip finder.',
    home: 'Home',
    breadcrumbCurrent: 'All Resorts Overview',
    eyebrow: '8 COASTAL HUBS FROM DATÇA TO KAŞ',
    h1: 'All Resorts of the Region: Where to Stay',
    lead: 'The coastline anchored by Dalaman Airport (DLM) brings together eight distinct destinations—from freshwater Lake Köyceğiz and riverfront Dalyan to yachting Göcek, lively Fethiye, and bohemian Kaş. Compare distances, beaches, and find your match.',
    heroAlt: 'Sarsala Bay panorama in the Dalaman region',
  },
  de: {
    metaTitle: 'Alle 8 Küstenorte rund um Dalaman (Datça bis Kaş): Vergleich & Auswahlhilfe',
    metaDescription:
      'Übersicht und direkter Vergleich aller 8 Urlaubsorte von Datça bis Kaş: Transferzeiten ab Flughafen Dalaman (DLM), Strandtypen, Budgetklassen und interaktiver Ortsfinder.',
    home: 'Startseite',
    breadcrumbCurrent: 'Alle Küstenorte',
    eyebrow: '8 URLAUBSORTE VON DATÇA BIS KAŞ',
    h1: 'Alle Küstenorte der Region im Vergleich',
    lead: 'Die Küste rund um den Flughafen Dalaman (DLM) verbindet acht völlig unterschiedliche Reiseziele – vom ruhigen Köyceğiz-See und Dalyan über die Marina-Stadt Göcek bis nach Fethiye und Kaş. Vergleichen Sie Fahrzeiten, Strände und Reisestil.',
    heroAlt: 'Panorama der Sarsala-Bucht in der Region Dalaman',
  },
  tr: {
    metaTitle: 'Dalaman Bölgesindeki 8 Tatil Beldesi (Datça’dan Kaş’a): Karşılaştırma ve Rehber',
    metaDescription:
      'Datça’dan Kaş’a uzanan 8 ana tatil beldesinin dürüst karşılaştırması: Dalaman Havalimanı (DLM) transfer süreleri, plaj tipleri, bütçe sınıfı ve tatil tarzına göre filtreleme.',
    home: 'Ana Sayfa',
    breadcrumbCurrent: 'Tüm Tatil Bölgeleri',
    eyebrow: 'DATÇA’DAN KAŞ’A 8 TATİL MERKEZİ',
    h1: 'Bölgedeki Tüm Tatil Beldeleri: Nerede Kalmalı?',
    lead: 'Dalaman Havalimanı (DLM) çevresindeki kıyı şeridi sekiz farklı dünyayı bir araya getiriyor: sakin Köyceğiz Gölü ve Dalyan’dan yat başkenti Göcek’e, Ölüdeniz’e ve bohem Kaş’a kadar mesafeleri ve plajları karşılaştırın.',
    heroAlt: 'Dalaman bölgesindeki Sarsala Koyu panoraması',
  },
};

function countSubdirectories(dirPath: string): number {
  try {
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      return 0;
    }
    return fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory()).length;
  } catch {
    return 0;
  }
}

function getEnrichedResorts(): EnrichedResortItem[] {
  const locationsRoot = path.join(process.cwd(), 'content', 'locations');

  return RESORTS_CATALOG.map((resort) => {
    const resortRoot = path.join(locationsRoot, resort.slug);
    const beachCount = countSubdirectories(path.join(resortRoot, 'beach'));
    const sightCount =
      countSubdirectories(path.join(resortRoot, 'ruine')) +
      countSubdirectories(path.join(resortRoot, 'ruines')) +
      countSubdirectories(path.join(resortRoot, 'todo'));

    return {
      ...resort,
      beachCount,
      sightCount,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (['ru', 'en', 'de', 'tr'].includes(params.locale) ? params.locale : 'en') as LocaleCode;
  const copy = PAGE_COPY[locale];

  return buildPageMetadata({
    locale,
    pathname: '/city-guide',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: '/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg',
  });
}

export default function CityGuidePage({ params }: { params: { locale: string } }) {
  const activeLocale = (['ru', 'en', 'de', 'tr'].includes(params.locale) ? params.locale : 'en') as LocaleCode;
  const copy = PAGE_COPY[activeLocale];
  const enrichedResorts = getEnrichedResorts();
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: copy.home,
            item: `${siteUrl}/${activeLocale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: copy.breadcrumbCurrent,
            item: `${siteUrl}/${activeLocale}/city-guide`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: copy.h1,
        description: copy.metaDescription,
        numberOfItems: enrichedResorts.length,
        itemListElement: enrichedResorts.map((resort, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: resort.name[activeLocale] || resort.name.en,
          url: `${siteUrl}/${activeLocale}/${resort.slug}`,
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Banner */}
        <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center overflow-hidden">
          <Image
            src="/api/images/locations/dalaman/beach/Sarsala/sarsala.jpg"
            alt={copy.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/60 to-slate-950/85" />

          <div className="relative z-10 portal-container py-12 pb-20">
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-white/85 bg-slate-900/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 mb-5"
            >
              <Link href={`/${activeLocale}`} className="hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors">
                <FaHome size={11} className="text-cyan-300" />
                <span>{copy.home}</span>
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <span className="text-white font-bold">{copy.breadcrumbCurrent}</span>
            </nav>

            <span className="block text-cyan-300 font-bold text-xs uppercase tracking-widest mb-2.5">
              {copy.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-4xl leading-tight mb-4 drop-shadow">
              {copy.h1}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-100/95 max-w-3xl font-medium leading-relaxed">
              {copy.lead}
            </p>
          </div>
        </section>

        {/* Interactive Explorer, Cards, Comparison Table & Interlinking */}
        <CityGuideClient locale={activeLocale} resorts={enrichedResorts} />
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}
