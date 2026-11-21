import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import TrailDetailClient from '@/app/components/TrailDetailClient';
import { buildPageMetadata } from '@/lib/seo';
import { getDetailedTrailGuide, getTrailTrackData } from '@/lib/trail-guides';
import {
  DETAILED_TRAIL_SLUGS,
  TRAIL_STAGES,
  type LocaleCode,
} from '@/lib/trekking-data';

const SUPPORTED_LOCALES: LocaleCode[] = ['en', 'ru', 'de', 'tr'];

const CRUMB_LABELS: Record<
  LocaleCode,
  { home: string; routes: string; atlas: string; metaBrand: string }
> = {
  ru: {
    home: 'Главная',
    routes: 'Маршруты',
    atlas: 'Атлас треккинга',
    metaBrand: 'Дача — Каш',
  },
  en: {
    home: 'Home',
    routes: 'Routes',
    atlas: 'Trail Atlas',
    metaBrand: 'Dalaman Guide',
  },
  de: {
    home: 'Startseite',
    routes: 'Routen',
    atlas: 'Wanderatlas',
    metaBrand: 'Dalaman Guide',
  },
  tr: {
    home: 'Ana Sayfa',
    routes: 'Rotalar',
    atlas: 'Yürüyüş Atlası',
    metaBrand: 'Dalaman Rehberi',
  },
};

function resolveLocale(rawLocale?: string): LocaleCode {
  return SUPPORTED_LOCALES.includes(rawLocale as LocaleCode)
    ? (rawLocale as LocaleCode)
    : 'en';
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of DETAILED_TRAIL_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const activeLocale = resolveLocale(params.locale);
  const stage = TRAIL_STAGES.find((s) => s.id === params.slug);
  if (!stage || !(DETAILED_TRAIL_SLUGS as readonly string[]).includes(params.slug)) {
    return {};
  }

  const guide = getDetailedTrailGuide(params.slug, activeLocale);
  if (!guide) {
    return {};
  }
  const brand = CRUMB_LABELS[activeLocale].metaBrand;

  return buildPageMetadata({
    locale: activeLocale,
    pathname: `/routes/trekking/${params.slug}`,
    title: `${guide.h1} | ${brand}`,
    description: guide.lead,
    image: stage.image,
  });
}

export default function DetailedTrailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const activeLocale = resolveLocale(params.locale);

  if (!(DETAILED_TRAIL_SLUGS as readonly string[]).includes(params.slug)) {
    notFound();
  }

  const stage = TRAIL_STAGES.find((s) => s.id === params.slug);
  const guide = getDetailedTrailGuide(params.slug, activeLocale);
  const trackData = getTrailTrackData(params.slug);
  if (!stage || !guide || !trackData) {
    notFound();
  }

  const crumbs = CRUMB_LABELS[activeLocale];
  const nearbyStages = TRAIL_STAGES.filter(
    (s) => s.zoneId === stage.zoneId && s.id !== stage.id
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Compact Hero Banner */}
        <section className="relative min-h-[280px] sm:min-h-[320px] flex items-center overflow-hidden">
          <Image
            src={stage.image}
            alt={guide.h1}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/70 to-slate-950/90" />

          <div className="relative z-10 portal-container py-10 md:py-12">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-white/85 bg-slate-900/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 mb-4"
            >
              <Link
                href={`/${activeLocale}`}
                className="hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <FaHome size={11} className="text-cyan-300" />
                <span>{crumbs.home}</span>
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <Link href={`/${activeLocale}/routes`} className="hover:text-cyan-300 transition-colors">
                {crumbs.routes}
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <Link
                href={`/${activeLocale}/routes/trekking`}
                className="hover:text-cyan-300 transition-colors"
              >
                {crumbs.atlas}
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <span className="text-white font-bold">
                TREK {String(stage.trekNumber).padStart(2, '0')}
              </span>
            </nav>

            <span className="block text-cyan-300 font-bold text-xs uppercase tracking-widest mb-2">
              {guide.eyebrow}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-4xl leading-tight mb-3 drop-shadow">
              {guide.h1}
            </h1>
            <p className="text-xs sm:text-base text-slate-100/95 max-w-3xl font-medium leading-relaxed">
              {guide.lead}
            </p>
          </div>
        </section>

        {/* Detailed Trail Magazine Spread */}
        <section className="py-10 md:py-12">
          <div className="portal-container">
            <TrailDetailClient
              locale={activeLocale}
              stage={stage}
              guide={guide}
              track={trackData}
              nearbyStages={nearbyStages}
            />
          </div>
        </section>
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
