"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import {
  FaPlane,
  FaBuilding,
  FaCar,
  FaShip,
  FaCompass,
  FaCarSide,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaComments,
  FaBookReader,
  FaBullhorn,
} from 'react-icons/fa';
import InteractiveMap from '@/app/[locale]/map/InteractiveMap';
import type { KaleidoscopeLocationItem } from '@/lib/kaleidoscope';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dictionaries: Record<string, any> = { ru, en, de, tr };

interface ResortShowcaseItem {
  slug: string;
  name: Record<string, string>;
  highlights: Record<string, string>;
  image: string;
  isGateway?: boolean;
}

const resortsShowcase: ResortShowcaseItem[] = [
  {
    slug: '/dalaman',
    isGateway: true,
    name: { ru: 'Даламан', en: 'Dalaman', de: 'Dalaman', tr: 'Dalaman' },
    highlights: {
      ru: 'Главные ворота (DLM) • Сарыгерме • Бухта Сарсала • Термы',
      en: 'Main Gateway (DLM) • Sarıgerme • Sarsala Bay • Hot Springs',
      de: 'Haupttor (DLM) • Sarıgerme • Sarsala-Bucht • Thermen',
      tr: 'Ana Kapı (DLM) • Sarıgerme • Sarsala Koyu • Kaplıcalar',
    },
    image: '/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg',
  },
  {
    slug: '/fethiye',
    name: { ru: 'Фетхие', en: 'Fethiye', de: 'Fethiye', tr: 'Fethiye' },
    highlights: {
      ru: 'Голубая лагуна Олюдениз • Гора Бабадаг • Долина Бабочек • Каякёй',
      en: 'Ölüdeniz Blue Lagoon • Babadağ • Butterfly Valley • Kayaköy',
      de: 'Ölüdeniz Lagune • Babadağ • Schmetterlingstal • Kayaköy',
      tr: 'Ölüdeniz • Babadağ • Kelebekler Vadisi • Kayaköy',
    },
    image: '/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg',
  },
  {
    slug: '/marmaris',
    name: { ru: 'Мармарис', en: 'Marmaris', de: 'Marmaris', tr: 'Marmaris' },
    highlights: {
      ru: 'Ичмелер • Бухта Турунч • Античный Амос • Акьяка и кайтсёрфинг',
      en: 'İçmeler • Turunç Bay • Ancient Amos • Akyaka Kitesurf',
      de: 'İçmeler • Turunç-Bucht • Amos • Akyaka Kitesurfen',
      tr: 'İçmeler • Turunç • Amos Koyu • Akyaka & Azmak',
    },
    image: '/api/images/locations/marmaris/beach/Icmeler/icmeler.jpg',
  },
  {
    slug: '/kas',
    name: { ru: 'Каш и Калкан', en: 'Kaş & Kalkan', de: 'Kaş & Kalkan', tr: 'Kaş & Kalkan' },
    highlights: {
      ru: 'Пляж Капуташ • Дюны Патары • Затонувший город Кекова • Дайвинг',
      en: 'Kaputaş Beach • Patara Dunes • Kekova Sunken City • Diving',
      de: 'Kaputaş-Strand • Patara • Versunkene Stadt Kekova • Tauchen',
      tr: 'Kaputaş Plajı • Patara • Kekova Batık Şehir • Dalış',
    },
    image: '/api/images/locations/kas/beach/kaputas/kaputas.jpg',
  },
  {
    slug: '/dalyan',
    name: { ru: 'Дальян', en: 'Dalyan', de: 'Dalyan', tr: 'Dalyan' },
    highlights: {
      ru: 'Черепаший пляж Изтузу • Ликийские гробницы Кауноса • Речные лодки',
      en: 'İztuzu Turtle Beach • Kaunos Rock Tombs • River Boats',
      de: 'İztuzu-Strand • Kaunos-Felsengräber • Flussboote',
      tr: 'İztuzu Plajı • Kaunos Kral Mezarları • Tekne Turu',
    },
    image: '/api/images/locations/dalyan/ruine/LycianTombs/lyciantombs.jpg',
  },
  {
    slug: '/gocek',
    name: { ru: 'Гёджек', en: 'Göcek', de: 'Göcek', tr: 'Göcek' },
    highlights: {
      ru: 'Яхтенная столица • 6 марин • Тур по 12 островам • Бухта Бедри Рахми',
      en: 'Yachting Capital • 6 Marinas • 12 Islands Cruise • Secret Bays',
      de: 'Yacht-Hauptstadt • 6 Marinas • 12-Inseln-Tour • Buchten',
      tr: 'Yatçılık Merkezi • 6 Marina • 12 Adalar • Bedri Rahmi Koyu',
    },
    image: '/api/images/locations/gocek/beach/bedri/bedri.jpg',
  },
  {
    slug: '/dacha',
    name: { ru: 'Датча', en: 'Datça', de: 'Datça', tr: 'Datça' },
    highlights: {
      ru: 'Мыс двух морей и Книдос • Паламутбюкю • Старая Датча • Миндаль',
      en: 'Two Seas & Ancient Knidos • Palamutbükü • Old Datça',
      de: 'Zwei Meere & Knidos • Palamutbükü • Alt-Datça',
      tr: 'İki Denizin Buluştuğu Knidos • Palamutbükü • Eski Datça',
    },
    image: '/api/images/locations/dacha/ruine/knidos/knidos.jpg',
  },
  {
    slug: '/koycegiz',
    name: { ru: 'Кёйджегиз', en: 'Köyceğiz', de: 'Köyceğiz', tr: 'Köyceğiz' },
    highlights: {
      ru: 'Реликтовое озеро • Термы Султание • Бухта Экинчик • Водопады Юварлакчай',
      en: 'Scenic Lake • Sultaniye Hot Springs • Ekincik Bay • Yuvarlakçay',
      de: 'Köyceğiz-See • Sultaniye-Thermen • Ekincik-Bucht • Yuvarlakçay',
      tr: 'Köyceğiz Gölü • Sultaniye Kaplıcaları • Ekincik • Yuvarlakçay',
    },
    image: '/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg',
  },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

type MainContentProps = {
  locale?: string;
  locationsPool?: KaleidoscopeLocationItem[];
};

const MainContent = ({ locale = 'ru', locationsPool = [] }: MainContentProps) => {
  const dict = dictionaries[locale] || dictionaries['en'];
  const sliderRef = useRef<Slider>(null);

  // Initial deterministic slice prevents hydration mismatch; useEffect shuffles across the full dynamic pool of 55+ locations
  const [kaleidoscopeItems, setKaleidoscopeItems] = useState<KaleidoscopeLocationItem[]>(
    locationsPool.slice(0, 12)
  );

  useEffect(() => {
    if (locationsPool.length > 0) {
      setKaleidoscopeItems(shuffleArray(locationsPool).slice(0, 18));
    }
  }, [locationsPool]);

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const quickLinks = [
    {
      icon: <FaCarSide size={20} />,
      title: locale === 'ru' ? 'Трансфер из DLM' : locale === 'de' ? 'DLM Transfer' : locale === 'tr' ? 'DLM Transfer' : 'DLM Transfers',
      href: localize('/services/transfers'),
    },
    {
      icon: <FaCar size={20} />,
      title: dict.main_content.quick_links.car_rental,
      href: localize('/services/car-rental'),
    },
    {
      icon: <FaBuilding size={20} />,
      title: dict.main_content.quick_links.hotels,
      href: localize('/services/hotels'),
    },
    {
      icon: <FaShip size={20} />,
      title: dict.main_content.quick_links.yacht_rental,
      href: localize('/services/yacht-rental'),
    },
    {
      icon: <FaCompass size={20} />,
      title: dict.main_content.quick_links.excursions,
      href: localize('/services/excursions-tours'),
    },
    {
      icon: <FaPlane size={20} />,
      title: dict.main_content.quick_links.flights,
      href: localize('/services/flights'),
    },
  ];

  // Mosaic of Impressions: strictly Personal Experience (Traveler Diaries, Video/YouTube Reviews, Forum Discussions)
  const mosaicItems = [
    {
      badge: locale === 'ru' ? 'Личный опыт' : locale === 'de' ? 'Erfahrungen' : locale === 'tr' ? 'Gezgin Deneyimi' : 'First-Hand Stories',
      icon: <FaBookReader size={12} />,
      title:
        locale === 'ru'
          ? 'Дневники и отчёты туристов'
          : locale === 'de'
          ? 'Reisetagebücher & Berichte'
          : locale === 'tr'
          ? 'Gezgin Günlükleri ve Notlar'
          : 'Traveler Diaries & Trip Reports',
      description:
        locale === 'ru'
          ? 'Живые истории поездок, личные впечатления от пляжей и отелей, реальные расходы и маршруты от первого лица.'
          : locale === 'de'
          ? 'Echte Reiseberichte, persönliche Eindrücke von Stränden und Routen aus erster Hand.'
          : locale === 'tr'
          ? 'Gerçek gezi hikayeleri, plaj ve rota deneyimleri, birinci ağızdan tatil izlenimleri.'
          : 'Real trip stories, personal impressions of beaches and towns, and candid itineraries from travelers.',
      href: localize('/blogs'),
      image: '/api/images/locations/gocek/beach/bedri/bedri.jpg',
    },
    {
      badge: locale === 'ru' ? 'Видео и YouTube' : locale === 'de' ? 'Video-Guides' : locale === 'tr' ? 'Video İncelemeler' : 'Video & YouTube',
      icon: <FaPlay size={11} />,
      title:
        locale === 'ru'
          ? 'Видеообзоры курортов и дорог'
          : locale === 'de'
          ? 'Video-Reviews der Küste & Straßen'
          : locale === 'tr'
          ? 'Koylar ve Yollar Video Rehberi'
          : 'Coastal Video Guides & Vlogs',
      description:
        locale === 'ru'
          ? 'Подборка лучших видеообзоров региона: проезды по серпантинам, полёты с Бабадага, яхтинг и пляжи без фильтров.'
          : locale === 'de'
          ? 'Die besten Video-Einblicke: Küstenstraßen, Paragliding vom Babadağ, Yachting und Buchten ohne Filter.'
          : locale === 'tr'
          ? 'Bölgenin en iyi video incelemeleri: sahil yolları, Babadağ uçuşları, yat turları ve plajlar.'
          : 'Curated video reviews of the region: coastal drives, Babadağ paragliding, yachting, and beaches unfiltered.',
      href: localize('/blogs'),
      image: '/api/images/locations/fethiye/todo/babadag/babadag.jpg',
    },
    {
      badge: locale === 'ru' ? 'Сообщество' : locale === 'de' ? 'Community' : locale === 'tr' ? 'Topluluk & Forum' : 'Community & Forums',
      icon: <FaComments size={12} />,
      title:
        locale === 'ru'
          ? 'Обсуждения, форумы и попутчики'
          : locale === 'de'
          ? 'Diskussionen, Foren & Mitreisende'
          : locale === 'tr'
          ? 'Forumlar, Tartışmalar ve Yol Arkadaşı'
          : 'Forums, Discussions & Travel Buddies',
      description:
        locale === 'ru'
          ? 'Обмен свежим опытом, ссылки на профильные ветки форумов и чаты побережья, поиск компании для аренды авто или лодки.'
          : locale === 'de'
          ? 'Erfahrungsaustausch, Links zu regionalen Foren & Chats sowie Mitfahrgelegenheiten für Mietwagen und Boote.'
          : locale === 'tr'
          ? 'Güncel bilgi paylaşımı, bölge forumları ve tekne/araç paylaşımı için yol arkadaşı bulma.'
          : 'Exchange fresh tips, explore regional forum threads and chats, and find companions to share a car or boat.',
      href: localize('/blogs'),
      image: '/api/images/locations/dacha/todo/port/port.png',
    },
  ];

  // Regional Pulse: Local News, Seasonal Updates & Coastal Events (Replaces artificial "Curated Collections")
  const regionalPulseItems = [
    {
      category: locale === 'ru' ? 'Аэропорт DLM и логистика' : locale === 'de' ? 'Flughafen DLM' : locale === 'tr' ? 'DLM Havalimanı' : 'DLM Airport & Shuttles',
      dateLabel: locale === 'ru' ? 'Актуально • Сезон 2026' : 'Live • 2026 Season',
      title:
        locale === 'ru'
          ? 'Расписание шаттлов Havaş и Muttaş под прилёты в аэропорт Даламан'
          : locale === 'de'
          ? 'Havaş & Muttaş Shuttle-Fahrpläne ab Flughafen Dalaman (DLM)'
          : locale === 'tr'
          ? 'Dalaman Havalimanı Havaş ve Muttaş Güncel Ulaşım Rehberi'
          : 'Havaş & Muttaş Shuttle Schedules Synchronized with Dalaman Arrivals',
      summary:
        locale === 'ru'
          ? 'Как быстро уехать из терминала DLM в Мармарис, Фетхие и Датчу: стоянки автобусов, оплата картами и тарифы.'
          : 'Direct bus connections from DLM Domestic ramp to Fethiye, Marmaris, and Datça Harbor.',
      href: localize('/articles/airport-dalaman'),
      image: '/api/images/locations/dalaman/beach/Kayacik/kayacik.jpg',
    },
    {
      category: locale === 'ru' ? 'Экология и пляжи' : locale === 'de' ? 'Natur & Strände' : locale === 'tr' ? 'Doğa ve Plajlar' : 'Nature & Beaches',
      dateLabel: locale === 'ru' ? 'Дальян и Сарыгерме' : 'Dalyan & Sarıgerme',
      title:
        locale === 'ru'
          ? 'Сезон морских черепах Caretta caretta на косе Изтузу и пляжах Даламана'
          : locale === 'de'
          ? 'Caretta-caretta-Schildkrötensaison am İztuzu-Strand & in Dalaman'
          : locale === 'tr'
          ? 'İztuzu ve Sarıgerme Sahillerinde Caretta Caretta Koruma Sezonu'
          : 'Caretta caretta Sea Turtle Nesting Season at İztuzu & Sarıgerme',
      summary:
        locale === 'ru'
          ? 'Часы доступа на заповедную косу, работа госпиталя черепах DEKAMER и правила вечернего посещения.'
          : 'Visiting hours, DEKAMER rescue center open tours, and conservation rules along the coast.',
      href: localize('/articles/iztuzu-beach'),
      image: '/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg',
    },
    {
      category: locale === 'ru' ? 'События и фестивали' : locale === 'de' ? 'Events & Festivals' : locale === 'tr' ? 'Festival ve Etkinlikler' : 'Events & Regattas',
      dateLabel: locale === 'ru' ? 'Афиша побережья' : 'Coastal Calendar',
      title:
        locale === 'ru'
          ? 'Календарь событий региона: от парусных регат в Гёджеке до фестивалей в Датче и Фетхие'
          : locale === 'de'
          ? 'Veranstaltungskalender: Von den Göcek-Regatten bis zu den Festspielen in Datça'
          : locale === 'tr'
          ? 'Bölge Etkinlik Takvimi: Göcek Regattalarından Datça ve Fethiye Festivallerine'
          : 'Regional Event Calendar: From Göcek Regattas to Datça & Fethiye Festivals',
      summary:
        locale === 'ru'
          ? 'Главные культурные праздники, гастрономические ярмарки, заплывы и регаты по месяцам года.'
          : 'Key cultural festivals, culinary fairs, open-water swims, and international yacht regattas month by month.',
      href: localize('/articles/events-and-festivals-calendar'),
      image: '/api/images/locations/gocek/beach/tersane/tersane.jpg',
    },
    {
      category: locale === 'ru' ? 'Горы и маршруты' : locale === 'de' ? 'Berge & Routen' : locale === 'tr' ? 'Doğa ve Rotalar' : 'Trails & Mountains',
      dateLabel: locale === 'ru' ? 'Фетхие и Олюдениз' : 'Fethiye & Ölüdeniz',
      title:
        locale === 'ru'
          ? 'Канатная дорога Бабадаг (Babadağ Teleferik) и панорамные станции над Олюденизом'
          : locale === 'de'
          ? 'Babadağ-Seilbahn (Teleferik) und Aussichtsplattformen über Ölüdeniz'
          : locale === 'tr'
          ? 'Babadağ Teleferik İstasyonları ve Ölüdeniz Seyir Terasları'
          : 'Babadağ Cable Car Stations & Panoramic Decks Above Ölüdeniz',
      summary:
        locale === 'ru'
          ? 'Режим работы подъёмников, смотровые площадки на высоте 1700–1969 м и старты тандем-парапланов.'
          : 'Lift operating hours, 1700m–1969m viewpoints, alpine dining, and tandem paragliding takeoffs.',
      href: localize('/articles/babadag'),
      image: '/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg',
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3800,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.15,
        },
      },
    ],
  };

  const resortsSectionTitle =
    locale === 'ru'
      ? '8 курортов вокруг Даламана: куда поехать'
      : locale === 'de'
      ? '8 Küstenregionen rund um Dalaman'
      : locale === 'tr'
      ? 'Dalaman Çevresindeki 8 Tatil Bölgesi'
      : '8 Resorts Around Dalaman: Where to Go';

  const resortsSectionSub =
    locale === 'ru'
      ? 'От центрального хаба Даламан на запад к Мармарису и Датче — и на восток к Фетхие, Олюденизу и Кашу'
      : locale === 'de'
      ? 'Vom Knotenpunkt Dalaman westwärts nach Marmaris & Datça — und ostwärts nach Fethiye, Ölüdeniz & Kaş'
      : locale === 'tr'
      ? 'Dalaman merkezinden batıda Marmaris ve Datça’ya, doğuda Fethiye, Ölüdeniz ve Kaş’a uzanan kıyı kuşağı'
      : 'From Dalaman Gateway west to Marmaris & Datça — and east to Fethiye, Ölüdeniz & Kaş';

  const pulseTitle =
    locale === 'ru'
      ? 'Пульс региона: новости, сезон и события'
      : locale === 'de'
      ? 'Puls der Region: Aktuelles, Saison & Events'
      : locale === 'tr'
      ? 'Bölgenin Nabzı: Güncel Haberler ve Etkinlikler'
      : 'Regional Pulse: Local News, Season & Events';

  const pulseSubtitle =
    locale === 'ru'
      ? 'Главные новости побережья, изменения в логистике, природные сезоны и календарь фестивалей'
      : locale === 'de'
      ? 'Wichtige Küsten-Updates, Logistik, Natursaisons und Veranstaltungskalender'
      : locale === 'tr'
      ? 'Sahil hattından güncel gelişmeler, ulaşım, doğa sezonları ve festival takvimi'
      : 'Key coastal updates, transport logistics, wildlife seasons, and the regional festival calendar';

  return (
    <div className="space-y-12 pb-12">
      {/* 1. 8 Coastal Resorts Showcase */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-5 gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
              {resortsSectionTitle}
            </h2>
            <p className="text-sm text-slate-500 font-medium">{resortsSectionSub}</p>
          </div>
          <Link
            href={localize('/city-guide')}
            className="text-cyan-600 font-bold text-xs hover:text-cyan-700 flex items-center gap-1.5 uppercase tracking-wider flex-shrink-0"
          >
            {dict.main_content.kaleidoscope.all_locations} <FaChevronRight size={10} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resortsShowcase.map((resort) => (
            <Link
              key={resort.slug}
              href={localize(resort.slug)}
              className={`group relative h-44 rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                resort.isGateway ? 'border-cyan-500/80 ring-2 ring-cyan-500/20' : 'border-slate-200/70'
              }`}
            >
              <Image
                src={resort.image}
                alt={resort.name[locale] || resort.name['en']}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
              {resort.isGateway && (
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    ✈️ {locale === 'ru' ? 'Главные ворота' : 'Main Gateway'}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-white font-extrabold text-base leading-tight mb-1 group-hover:text-cyan-300 transition-colors">
                  {resort.name[locale] || resort.name['en']}
                </h3>
                <p className="text-white/80 text-[11px] font-medium leading-snug line-clamp-2">
                  {resort.highlights[locale] || resort.highlights['en']}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Compact Service Tools Bar */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link, idx) => (
            <QuickLinkCard key={idx} icon={link.icon} title={link.title} href={link.href} />
          ))}
        </div>
      </section>

      {/* 3. Kaleidoscope Section (100% Dynamic from all location folders in content/locations) */}
      <section className="relative">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-5 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-600 mb-1">
              <span>
                {locale === 'ru'
                  ? `Случайная лента • ${locationsPool.length} локаций в базе`
                  : `Dynamic Randomizer • ${locationsPool.length} Locations`}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
              {dict.main_content.kaleidoscope.title}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {dict.main_content.kaleidoscope.subtitle}
            </p>
          </div>
          <div className="flex items-center space-x-2.5 self-start sm:self-end">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous slide"
              className="p-2.5 rounded-full bg-white shadow-sm hover:bg-slate-50 transition-all border border-slate-200/80 group"
            >
              <FaChevronLeft className="text-slate-500 group-hover:text-cyan-600 transition-colors" size={13} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next slide"
              className="p-2.5 rounded-full bg-white shadow-sm hover:bg-slate-50 transition-all border border-slate-200/80 group"
            >
              <FaChevronRight className="text-slate-500 group-hover:text-cyan-600 transition-colors" size={13} />
            </button>
            <Link
              href={localize('/beaches')}
              className="ml-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold tracking-wider rounded-full hover:bg-cyan-600 transition-all uppercase"
            >
              {locale === 'ru' ? 'Все пляжи и места' : 'All Locations'}
            </Link>
          </div>
        </div>

        <div className="-mx-2">
          <Slider ref={sliderRef} {...sliderSettings}>
            {kaleidoscopeItems.map((item) => (
              <div key={item.id} className="px-2.5 py-2">
                <KaleidoscopeCard
                  title={item.title}
                  subtitle={item.subtitle}
                  region={item.regionName}
                  image={item.image}
                  href={localize(item.href)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* 4. Mosaic of Impressions (Personal Experience: Diaries, Video Reviews & Community Forums) */}
      <section>
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
            {dict.main_content.mosaic.title}
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            {locale === 'ru'
              ? 'Живой опыт от первого лица: дневники путешественников, видеообзоры с YouTube и обсуждения на форумах'
              : dict.main_content.mosaic.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mosaicItems.map((item, idx) => (
            <MosaicCard
              key={idx}
              badge={item.badge}
              icon={item.icon}
              title={item.title}
              description={item.description}
              href={item.href}
              image={item.image}
              readMoreText={dict.main_content.mosaic.read_more}
            />
          ))}
        </div>
      </section>

      {/* 5. Regional Pulse: Local News, Season & Events (Replaces Curated Collections) */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-5 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <FaBullhorn size={11} />
              <span>{locale === 'ru' ? 'Дайджест побережья Даламан — Мугла' : 'Dalaman & Muğla Coast Digest'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
              {pulseTitle}
            </h2>
            <p className="text-sm text-slate-500 font-medium">{pulseSubtitle}</p>
          </div>
          <Link
            href={localize('/articles/events-and-festivals-calendar')}
            className="text-cyan-600 font-bold text-xs hover:text-cyan-700 flex items-center gap-1.5 uppercase tracking-wider flex-shrink-0"
          >
            {locale === 'ru' ? 'Календарь событий' : 'Event Calendar'} <FaChevronRight size={10} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {regionalPulseItems.map((news, idx) => (
            <Link
              key={idx}
              href={news.href}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="relative w-full sm:w-40 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-bold uppercase tracking-wider">
                      {news.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">{news.dateLabel}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug mb-1.5">
                    {news.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{news.summary}</p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-cyan-600 group-hover:text-cyan-700">
                  {locale === 'ru' ? 'Читать подробнее' : 'Read update'} <FaChevronRight size={9} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Interactive Map Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-5 gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {dict.main_content.map.title}
            </h2>
          </div>
          <Link
            href={localize('/map')}
            className="text-cyan-600 font-bold text-xs hover:text-cyan-700 flex items-center gap-1.5 uppercase tracking-wider"
          >
            {dict.main_content.map.open_interactive} <FaChevronRight size={10} />
          </Link>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-white">
          <InteractiveMap locale={locale} />
        </div>
      </section>
    </div>
  );
};

const QuickLinkCard = ({ icon, title, href }: { icon: React.ReactNode; title: string; href: string }) => (
  <Link
    href={href || '#'}
    className="group bg-white px-4 py-3.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col items-center text-center gap-2 hover:border-cyan-500 hover:shadow-md transition-all duration-200"
  >
    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="font-bold text-xs text-slate-800 group-hover:text-cyan-700 leading-snug transition-colors">
      {title}
    </h3>
  </Link>
);

const MosaicCard = ({
  badge,
  icon,
  title,
  description,
  href,
  image,
  readMoreText,
}: {
  badge: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  image: string;
  readMoreText: string;
}) => (
  <Link
    href={href}
    className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm flex flex-col h-full hover:-translate-y-1 hover:shadow-md hover:border-cyan-200 transition-all duration-300"
  >
    <div className="relative h-52 w-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      <div className="absolute top-3.5 left-3.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-700 shadow-xs">
          {icon}
          <span>{badge}</span>
        </span>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="font-bold text-base sm:text-lg mb-2 text-slate-900 group-hover:text-cyan-600 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-grow">{description}</p>
      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 group-hover:text-cyan-700 transition-colors">
        {readMoreText} <FaChevronRight size={10} />
      </span>
    </div>
  </Link>
);

const KaleidoscopeCard = ({
  title,
  subtitle,
  region,
  image,
  href,
}: {
  title: string;
  subtitle?: string;
  region: string;
  image: string;
  href: string;
}) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [isError, setIsError] = useState(false);

  return (
    <Link
      href={href}
      className="block relative h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-200/70 group"
    >
      <Image
        src={imgSrc}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        onError={() => {
          if (!isError) {
            setImgSrc('/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg');
            setIsError(true);
          }
        }}
      />
      <div className="absolute top-3.5 left-3.5 z-10">
        <span className="px-2.5 py-1 rounded-full bg-slate-900/75 backdrop-blur-md text-cyan-200 border border-white/15 text-[10px] font-bold uppercase tracking-wider">
          {region}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent group-hover:from-cyan-950/90 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-bold text-white text-base leading-snug drop-shadow-sm group-hover:text-cyan-200 transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-white/75 text-xs font-medium mt-1 line-clamp-1">{subtitle}</p>
        )}
        <div className="w-8 h-1 bg-cyan-400 mt-2.5 rounded-full transform scale-x-50 group-hover:scale-x-100 transition-transform origin-left duration-300" />
      </div>
    </Link>
  );
};

export default MainContent;
