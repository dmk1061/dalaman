import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronRight,
  FaChild,
  FaCompass,
  FaHome,
  FaShieldAlt,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FamilyHub from '@/app/components/FamilyHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/family';

interface FamilyPageCopy {
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
  btnActivities: string;
  btnResorts: string;
  btnGuide: string;
}

const HERO_IMAGE = '/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg';

const PAGE_COPY: Record<LocaleCode, FamilyPageCopy> = {
  ru: {
    metaTitle: 'Семейный отдых с детьми (Датча — Каш): 18 идей, карта 16 мест и индекс коляски | Дача — Каш',
    metaDescription:
      'Интерактивный гид по отдыху с детьми вокруг Даламана: фильтр по возрасту (0–17) и индексу коляски, 16 мест на карте (пляжи без волн Сарыгерме и Кумбурну, аквапарки Orka World и Atlantis, черепахи DEKAMER, канатка Бабадаг), сравнение 7 курортов и шпаргалка родителя 2026.',
    home: 'Главная',
    activitiesCrumb: 'Чем заняться',
    pageCrumb: 'Семейный отдых с детьми',
    eyebrow: 'ОТПУСК С ДЕТЬМИ БЕЗ СЮРПРИЗОВ • ОТ 0 ДО 17 ЛЕТ',
    h1: 'Семейный отдых с детьми от Мармариса до Каша',
    lead: 'Где нет волн и камней, проедет ли прогулочная коляска, сколько минут ехать из аэропорта Даламан после ночного рейса и куда спрятаться в полуденный зной: карта 16 мест, 18 активностей и честная матрица 7 курортов.',
    heroAlt: 'Широкий песчаный пляж Сарыгерме с пологим входом и сосновым парком в регионе Даламан',
    btnMap: 'Карта 16 мест и коляски',
    btnActivities: '18 идей (0–17 лет)',
    btnResorts: '7 курортов: куда с детьми',
    btnGuide: 'Шпаргалка родителя 2026',
  },
  en: {
    metaTitle: 'Family Vacation with Kids (Dalaman to Kaş): 18 Activities, 16-Spot Map & Stroller Index',
    metaDescription:
      'Interactive family travel planner around Dalaman: age (0–17) and stroller index filters, live 16-spot map (Sarıgerme, Blue Lagoon, Orka World & Atlantis waterparks, DEKAMER sea turtles, Babadağ lift), 7-town matrix, and 2026 heat/pharmacy tips.',
    home: 'Home',
    activitiesCrumb: 'Things to Do',
    pageCrumb: 'Family Vacation with Kids',
    eyebrow: 'STRESS-FREE FAMILY COASTAL PLANNER • AGES 0 TO 17',
    h1: 'Family Vacation with Kids: Calm Beaches, Waterparks & Stroller Guide',
    lead: 'See at a glance where toddlers get shallow rock-free sand, which towns take strollers effortlessly, exact transfer times from Dalaman Airport (DLM), and how to beat 12:00–16:00 heat.',
    heroAlt: 'Wide calm golden sand beach and coastal pine trees at Sarıgerme near Dalaman',
    btnMap: '16 Family Spots Map',
    btnActivities: '18 Kid Ideas (0–17)',
    btnResorts: '7 Resorts Matrix',
    btnGuide: '2026 Parent Cheat Sheet',
  },
  de: {
    metaTitle: 'Familienurlaub mit Kindern (Datça – Kaş): 18 Ideen, 16-Orte-Karte & Buggy-Index',
    metaDescription:
      'Interaktiver Familien-Guide rund um Dalaman: Filter nach Alter (0–17) & Kinderwagen-Index, Karte mit 16 Orten (Sarıgerme, Blaue Lagune, Orka World, DEKAMER-Schildkröten, Seilbahn Babadağ), 7-Orte-Vergleich und Tipps 2026.',
    home: 'Startseite',
    activitiesCrumb: 'Aktivitäten',
    pageCrumb: 'Familienurlaub mit Kindern',
    eyebrow: 'URLAUB MIT KINDERN OHNE STRESS • VON 0 BIS 17 JAHRE',
    h1: 'Familienurlaub mit Kindern von Marmaris bis Kaş',
    lead: 'Wo feiner Sand ohne Brandung liegt, wo der Buggy problemlos rollt, wie lange der Transfer ab Flughafen Dalaman (DLM) dauert und was bei Mittagshitze hilft: 16 Karten-Spots, 18 Ideen & 7-Orte-Matrix.',
    heroAlt: 'Breiter, ruhiger Sandstrand in Sarıgerme mit Pinien direkt am Wasser nahe Dalaman',
    btnMap: 'Karte & Buggy-Index (16)',
    btnActivities: '18 Ideen (0–17 Jahre)',
    btnResorts: '7 Badeorte im Vergleich',
    btnGuide: 'Eltern-Spickzettel 2026',
  },
  tr: {
    metaTitle: 'Çocuklarla Aile Tatili (Marmaris – Kaş): 18 Aktivite, 16 Duraklı Harita ve Puset İndeksi',
    metaDescription:
      'Dalaman ve Likya kıyısı için çocuklu aile rehberi: yaş (0–17) ve puset uygunluk filtresi, 16 noktalı interaktif harita (Sarıgerme, Ölüdeniz Lagünü, Orka World, DEKAMER, Babadağ Teleferik), 7 belde karşılaştırması ve 2026 ipuçları.',
    home: 'Ana Sayfa',
    activitiesCrumb: 'Ne Yapılır',
    pageCrumb: 'Çocuklarla Aile Tatili',
    eyebrow: '0–17 YAŞ AİLE TATİLİ REHBERİ • DLM’DEN KAŞ’A',
    h1: 'Çocuklarla Aile Tatili: Sığ Kumsallar, Su Parkları ve Puset Rehberi',
    lead: 'Hangi sahilde taş ve dalga olmadığını, bebek arabasının nerede rahat sürüldüğünü, Dalaman Havalimanı’ndan gerçek transfer dakikalarını ve 12:00–16:00 sıcağında nereye gidileceğini tek ekranda görün.',
    heroAlt: 'Dalaman Sarıgerme’de ince kumlu sığ deniz ve çam ağaçları',
    btnMap: '16 Duraklı Aile Haritası',
    btnActivities: '18 Aktivite (0–17 Yaş)',
    btnResorts: '7 Belde Karşılaştırması',
    btnGuide: '2026 Ebeveyn İpuçları',
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
    pathname: '/family',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function FamilyPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Family Vacation Hero Banner */}
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
                className="hover:text-sky-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <FaHome size={11} className="text-sky-300" />
                <span>{copy.home}</span>
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <Link
                href={`/${activeLocale}/collections`}
                className="hover:text-sky-300 transition-colors"
              >
                {copy.activitiesCrumb}
              </Link>
              <FaChevronRight size={9} className="text-white/40" />
              <span className="text-white font-bold">{copy.pageCrumb}</span>
            </nav>

            <span className="block text-sky-300 font-bold text-xs uppercase tracking-widest mb-2.5">
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
                href="#map-zones"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold tracking-wide transition-colors shadow-lg shadow-sky-600/25"
              >
                <FaCompass size={12} />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#activities"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaChild size={12} className="text-sky-300" />
                <span>{copy.btnActivities}</span>
              </a>
              <a
                href="#resorts-matrix"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaUmbrellaBeach size={12} className="text-amber-300" />
                <span>{copy.btnResorts}</span>
              </a>
              <a
                href="#parent-guide"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaShieldAlt size={12} className="text-emerald-300" />
                <span>{copy.btnGuide}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Interactive Family Vacation Hub */}
        <section className="py-10 md:py-14">
          <div className="portal-container">
            <FamilyHub locale={activeLocale} />
          </div>
        </section>
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
