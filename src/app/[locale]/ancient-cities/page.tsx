import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaCalculator,
  FaChevronRight,
  FaCompass,
  FaHome,
  FaInfoCircle,
  FaLandmark,
} from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import AncientCitiesHub from '@/app/components/AncientCitiesHub';
import { buildPageMetadata } from '@/lib/seo';
import type { LocaleCode } from '@/lib/ancient-cities';

interface AncientCitiesPageCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  placesCrumb: string;
  pageCrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  btnMap: string;
  btnProfiles: string;
  btnCalculator: string;
  btnRules: string;
}

const HERO_IMAGE = '/api/images/locations/kas/ruines/theater/theaterkas3.jpg';

const PAGE_COPY: Record<LocaleCode, AncientCitiesPageCopy> = {
  ru: {
    metaTitle: 'Античные города Ликии и Карии (Патара, Ксантос, Тлос, Книдос, Каунос): 3D-карта и билеты 2026 | Дача — Каш',
    metaDescription:
      'Интерактивный гид по 15 античным городам от Датчи до Демре: 3D-карта руин и гробниц, калькулятор билетов muze.gov.tr и MuseumPass Ege/Akdeniz 2026, 5 бесплатных полисов без касс и готовые маршруты без жары.',
    home: 'Главная',
    placesCrumb: 'Курорты и места',
    pageCrumb: 'Античные города Ликии и Карии',
    eyebrow: 'АРХЕОЛОГИЯ ЛИКИИ И КАРИИ • КНИДОС — КАУНОС — ТЛОС — ПАТАРА — МИРА',
    h1: 'Античные города Ликии и Карии: 3D-карта, маршруты и билеты 2026',
    lead: '15 древних полисов и крепостей от мыса Датчи до скальных гробниц Демре: интерактивный калькулятор MuseumPass по обе стороны реки Эшен, 5 бесплатных горных городов без касс и три маршрута на полдня без теплового удара.',
    heroAlt: 'Античный эллинистический театр Антифеллос в Каше с видом на Средиземное море',
    btnMap: '3D-карта 15 городов',
    btnProfiles: '8 главных руин с фото',
    btnCalculator: 'Калькулятор билетов 2026',
    btnRules: 'Бесплатные руины (0 €) и правила',
  },
  en: {
    metaTitle: 'Ancient Cities of Lycia & Caria (Patara, Xanthos, Tlos, Knidos, Kaunos): 3D Map & 2026 Tickets | Dalaman Guide',
    metaDescription:
      'Interactive guide to 15 ancient ruins from Datça to Demre: live 3D map, 2026 muze.gov.tr ticket & MuseumPass Ege/Akdeniz calculator across the Eşen border, 5 free mountain cities (€0) and heat-smart day loops.',
    home: 'Home',
    placesCrumb: 'Places & Beaches',
    pageCrumb: 'Ancient Cities of Lycia & Caria',
    eyebrow: 'ARCHAEOLOGY OF LYCIA & CARIA • KNİDOS — KAUNOS — TLOS — PATARA — MYRA',
    h1: 'Ancient Cities of Lycia & Caria: 3D Map, Combos & 2026 Pass Check',
    lead: 'Explore 15 ruins from Knidos twin harbors to Patara dunes and Myra cliffs: live Eşen-border ticket calculator, five €0 mountain cities without queues, and heat-proof day itineraries.',
    heroAlt: 'Antiphellos Hellenistic seaside stone amphitheater in Kaş overlooking Mediterranean waters',
    btnMap: '3D Map (15 Sites)',
    btnProfiles: '8 Highlight Profiles',
    btnCalculator: '2026 Ticket Calculator',
    btnRules: '5 Free Sites (€0) & Rules',
  },
  de: {
    metaTitle: 'Antike Städte in Lykien & Karien (Patara, Xanthos, Tlos, Knidos, Kaunos): 3D-Karte & Preise 2026 | Dalaman Guide',
    metaDescription:
      'Interaktiver Ruinen-Guide von Datça bis Demre: 3D-Karte mit 15 antiken Städten, Ticket- & MuseumPass-Rechner 2026 über die Eşen-Grenze, 5 kostenlose Bergruinen (0 €) & Anti-Hitze-Routen.',
    home: 'Startseite',
    placesCrumb: 'Orte & Strände',
    pageCrumb: 'Antike Städte in Lykien & Karien',
    eyebrow: 'ARCHÄOLOGIE LYKIEN & KARIEN • KNİDOS — KAUNOS — TLOS — PATARA — MYRA',
    h1: 'Antike Städte Lykiens & Kariens: 3D-Karte, Routen & Ticketcheck 2026',
    lead: '15 Ausgrabungen von den Häfen in Knidos bis zu den Felsengräbern von Myra: Ticketrechner für MuseumPass Ege vs. Akdeniz, 5 Gratis-Ruinen ohne Kasse und schlaue Tageskombis ohne Hitzestress.',
    heroAlt: 'Antikes hellenistisches Meerestheater Antiphellos in Kaş über dem blauen Mittelmeer',
    btnMap: '3D-Karte (15 Stätten)',
    btnProfiles: '8 Top-Ruinen im Detail',
    btnCalculator: 'Ticketrechner 2026',
    btnRules: '5 Gratis-Orte (0 €) & Regeln',
  },
  tr: {
    metaTitle: 'Likya ve Karya Antik Kentleri (Patara, Ksanthos, Tlos, Knidos, Kaunos): 3D Harita ve Biletler 2026 | Dalaman Rehberi',
    metaDescription:
      'Datça’dan Demre’ye 15 antik kent için interaktif 3D harita, Eşen Çayı sınırı dahil 2026 bilet ve MuseumPass hesaplayıcı, gişesiz 5 ücretsiz ören yeri (0 €) ve sıcaktan kaçan gezi rotaları.',
    home: 'Ana Sayfa',
    placesCrumb: 'Bölgeler & Plajlar',
    pageCrumb: 'Likya ve Karya Antik Kentleri',
    eyebrow: 'LİKYA VE KARYA ARKEOLOJİSİ • KNİDOS — KAUNOS — TLOS — PATARA — MYRA',
    h1: 'Likya ve Karya Antik Kentleri: 3D Harita, Rotalar ve 2026 Bilet Rehberi',
    lead: 'Knidos ikiz limanlarından Patara kumullarına ve Myra kaya mezarlarına 15 antik nokta: Ege/Akdeniz pass hesaplayıcı, ücretsiz 5 dağ kenti ve öğle sıcağına kalmayan akıllı rotalar.',
    heroAlt: 'Kaş merkezde Akdeniz manzaralı tarihî Antiphellos Antik Tiyatrosu',
    btnMap: '3D Harita (15 Kent)',
    btnProfiles: '8 Detaylı Kent Profili',
    btnCalculator: '2026 Bilet Hesaplayıcı',
    btnRules: '5 Ücretsiz Kent (0 €) & Kurallar',
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
    pathname: '/ancient-cities',
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: HERO_IMAGE,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function AncientCitiesPage({ params }: { params: { locale: string } }) {
  const activeLocale = resolveLocale(params.locale);
  const copy = PAGE_COPY[activeLocale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header locale={activeLocale} />

      <main className="flex-grow">
        {/* Classical Coastal Hero Banner */}
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
                href={`/${activeLocale}/city-guide`}
                className="hover:text-amber-300 transition-colors"
              >
                {copy.placesCrumb}
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
                href="#ancient-map"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold tracking-wide transition-colors shadow-lg shadow-amber-600/30"
              >
                <FaCompass size={12} />
                <span>{copy.btnMap}</span>
              </a>
              <a
                href="#ancient-profiles"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaLandmark size={12} className="text-amber-300" />
                <span>{copy.btnProfiles}</span>
              </a>
              <a
                href="#pass-calculator"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaCalculator size={12} className="text-sky-300" />
                <span>{copy.btnCalculator}</span>
              </a>
              <a
                href="#practical-rules"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/65 hover:bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wide transition-colors backdrop-blur-sm"
              >
                <FaInfoCircle size={12} className="text-emerald-300" />
                <span>{copy.btnRules}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Ancient Cities Interactive Hub */}
        <AncientCitiesHub locale={activeLocale} />
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
