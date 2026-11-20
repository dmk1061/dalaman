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
} from 'react-icons/fa';
import InteractiveMap from '@/app/[locale]/map/InteractiveMap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dictionaries: Record<string, any> = { ru, en, de, tr };

interface KaleidoscopeItem {
  title: Record<string, string>;
  region: Record<string, string>;
  image: string;
  href: string;
}

const allKaleidoscopeItems: KaleidoscopeItem[] = [
  // Dalaman
  {
    title: { ru: 'Пляж Сарыгерме', en: 'Sarıgerme Beach', de: 'Sarıgerme Strand', tr: 'Sarıgerme Plajı' },
    region: { ru: 'Даламан', en: 'Dalaman', de: 'Dalaman', tr: 'Dalaman' },
    image: '/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg',
    href: '/dalaman/beach/Sarigerme',
  },
  {
    title: { ru: 'Бухта Сарсала', en: 'Sarsala Bay', de: 'Sarsala Bucht', tr: 'Sarsala Koyu' },
    region: { ru: 'Даламан', en: 'Dalaman', de: 'Dalaman', tr: 'Dalaman' },
    image: '/api/images/locations/dalaman/beach/Sarsala/sarsala.jpg',
    href: '/dalaman/beach/Sarsala',
  },
  {
    title: { ru: 'Пляж Каяджик', en: 'Kayacık Beach', de: 'Kayacık Strand', tr: 'Kayacık Sahili' },
    region: { ru: 'Даламан', en: 'Dalaman', de: 'Dalaman', tr: 'Dalaman' },
    image: '/api/images/locations/dalaman/beach/Kayacik/kayacik.jpg',
    href: '/dalaman/beach/Kayacik',
  },

  // Fethiye
  {
    title: { ru: 'Голубая лагуна Олюдениз', en: 'Ölüdeniz Blue Lagoon', de: 'Ölüdeniz Blaue Lagune', tr: 'Ölüdeniz Mavi Lagün' },
    region: { ru: 'Фетхие', en: 'Fethiye', de: 'Fethiye', tr: 'Fethiye' },
    image: '/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg',
    href: '/fethiye/beach/bluelagoon',
  },
  {
    title: { ru: 'Долина Бабочек', en: 'Butterfly Valley', de: 'Schmetterlingstal', tr: 'Kelebekler Vadisi' },
    region: { ru: 'Фетхие', en: 'Fethiye', de: 'Fethiye', tr: 'Fethiye' },
    image: '/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg',
    href: '/fethiye/beach/kelebekler',
  },
  {
    title: { ru: 'Город-призрак Каякёй', en: 'Kayaköy Ghost Town', de: 'Geisterstadt Kayaköy', tr: 'Kayaköy Antik Köyü' },
    region: { ru: 'Фетхие', en: 'Fethiye', de: 'Fethiye', tr: 'Fethiye' },
    image: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg',
    href: '/fethiye/sight/kayakoy',
  },

  // Dalyan
  {
    title: { ru: 'Черепаший пляж Изтузу', en: 'İztuzu Turtle Beach', de: 'İztuzu Schildkrötenstrand', tr: 'İztuzu Plajı' },
    region: { ru: 'Дальян', en: 'Dalyan', de: 'Dalyan', tr: 'Dalyan' },
    image: '/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg',
    href: '/dalyan/beach/Istuzu',
  },
  {
    title: { ru: 'Ликийские скальные гробницы', en: 'Lycian Rock Tombs', de: 'Lykische Felsengräber', tr: 'Kaunos Kral Mezarları' },
    region: { ru: 'Дальян', en: 'Dalyan', de: 'Dalyan', tr: 'Dalyan' },
    image: '/api/images/locations/dalyan/ruine/LycianTombs/lyciantombs.jpg',
    href: '/dalyan/sight/LycianTombs',
  },
  {
    title: { ru: 'Бухта Аши Кёю', en: 'Aşı Koyu Bay', de: 'Aşı-Bucht', tr: 'Aşı Koyu' },
    region: { ru: 'Дальян', en: 'Dalyan', de: 'Dalyan', tr: 'Dalyan' },
    image: '/api/images/locations/dalyan/beach/asikoyu/asikoyu.jpg',
    href: '/dalyan/beach/asikoyu',
  },

  // Marmaris
  {
    title: { ru: 'Пляж Ичмелер', en: 'İçmeler Beach', de: 'İçmeler Strand', tr: 'İçmeler Plajı' },
    region: { ru: 'Мармарис', en: 'Marmaris', de: 'Marmaris', tr: 'Marmaris' },
    image: '/api/images/locations/marmaris/beach/Icmeler/icmeler.jpg',
    href: '/marmaris/beach/Icmeler',
  },
  {
    title: { ru: 'Бухта Турунч', en: 'Turunç Bay', de: 'Turunç Bucht', tr: 'Turunç Koyu' },
    region: { ru: 'Мармарис', en: 'Marmaris', de: 'Marmaris', tr: 'Marmaris' },
    image: '/api/images/locations/marmaris/beach/Turunc/turunc.jpg',
    href: '/marmaris/beach/Turunc',
  },
  {
    title: { ru: 'Акьяка и река Азмак', en: 'Akyaka & Azmak River', de: 'Akyaka & Azmak-Fluss', tr: 'Akyaka ve Azmak Nehri' },
    region: { ru: 'Мармарис', en: 'Marmaris', de: 'Marmaris', tr: 'Marmaris' },
    image: '/api/images/locations/marmaris/beach/Akyaka/Akyaka.jpg',
    href: '/marmaris/beach/Akyaka',
  },
  {
    title: { ru: 'Бухта и каньон Амос', en: 'Amos Bay & Ruins', de: 'Amos-Bucht', tr: 'Amos Koyu' },
    region: { ru: 'Мармарис', en: 'Marmaris', de: 'Marmaris', tr: 'Marmaris' },
    image: '/api/images/locations/marmaris/beach/AmosBay/amosBay.jpg',
    href: '/marmaris/beach/AmosBay',
  },
  {
    title: { ru: 'Остров Клеопатры (Седир)', en: 'Cleopatra Sedir Island', de: 'Kleopatra-Insel (Sedir)', tr: 'Sedir Adası (Kleopatra)' },
    region: { ru: 'Мармарис', en: 'Marmaris', de: 'Marmaris', tr: 'Marmaris' },
    image: '/api/images/locations/marmaris/beach/CleopatraSedir/cleo-sedir.jpg',
    href: '/marmaris/beach/CleopatraSedir',
  },

  // Kas
  {
    title: { ru: 'Пляж Капуташ', en: 'Kaputaş Beach', de: 'Kaputaş Strand', tr: 'Kaputaş Plajı' },
    region: { ru: 'Каш и Калкан', en: 'Kaş & Kalkan', de: 'Kaş & Kalkan', tr: 'Kaş & Kalkan' },
    image: '/api/images/locations/kas/beach/kaputas/kaputas.jpg',
    href: '/kas/beach/kaputas',
  },
  {
    title: { ru: 'Дюны и пляж Патара', en: 'Patara Beach & Dunes', de: 'Patara Strand & Dünen', tr: 'Patara Plajı' },
    region: { ru: 'Каш', en: 'Kaş', de: 'Kaş', tr: 'Kaş' },
    image: '/api/images/locations/kas/beach/patara/patara.jpg',
    href: '/kas/beach/patara',
  },
  {
    title: { ru: 'Затонувший город Кекова', en: 'Kekova Sunken City', de: 'Versunkene Stadt Kekova', tr: 'Kekova Batık Şehir' },
    region: { ru: 'Каш', en: 'Kaş', de: 'Kaş', tr: 'Kaş' },
    image: '/api/images/locations/kas/ruines/kekova/kekova.jpg',
    href: '/kas/sight/kekova',
  },

  // Gocek
  {
    title: { ru: 'Бухта Бедри Рахми', en: 'Bedri Rahmi Bay', de: 'Bedri-Rahmi-Bucht', tr: 'Bedri Rahmi Koyu' },
    region: { ru: 'Гёджек', en: 'Göcek', de: 'Göcek', tr: 'Göcek' },
    image: '/api/images/locations/gocek/beach/bedri/bedri.jpg',
    href: '/gocek/beach/bedri',
  },
  {
    title: { ru: 'Остров Терсане', en: 'Tersane Island', de: 'Tersane-Insel', tr: 'Tersane Adası' },
    region: { ru: 'Гёджек', en: 'Göcek', de: 'Göcek', tr: 'Göcek' },
    image: '/api/images/locations/gocek/beach/tersane/tersane.jpg',
    href: '/gocek/beach/tersane',
  },

  // Datca
  {
    title: { ru: 'Античный Книдос', en: 'Ancient Knidos', de: 'Antikes Knidos', tr: 'Knidos Antik Kenti' },
    region: { ru: 'Датча', en: 'Datça', de: 'Datça', tr: 'Datça' },
    image: '/api/images/locations/dacha/ruine/knidos/knidos.jpg',
    href: '/dacha/sight/knidos',
  },
  {
    title: { ru: 'Пляж Паламутбюкю', en: 'Palamutbükü Beach', de: 'Palamutbükü Strand', tr: 'Palamutbükü Sahili' },
    region: { ru: 'Датча', en: 'Datça', de: 'Datça', tr: 'Datça' },
    image: '/api/images/locations/dacha/beach/Palamutbuku/palamutbuku.jpg',
    href: '/dacha/beach/Palamutbuku',
  },
  {
    title: { ru: 'Эски Датча (Старый город)', en: 'Old Datça (Eski Datça)', de: 'Alt-Datça (Eski Datça)', tr: 'Eski Datça Sokakları' },
    region: { ru: 'Датча', en: 'Datça', de: 'Datça', tr: 'Datça' },
    image: '/api/images/locations/dacha/todo/eskidacha/eski_dacha.jpg',
    href: '/dacha/sight/eskidacha',
  },

  // Koycegiz
  {
    title: { ru: 'Бухта Экинчик', en: 'Ekincik Bay', de: 'Ekincik-Bucht', tr: 'Ekincik Koyu' },
    region: { ru: 'Кёйджегиз', en: 'Köyceğiz', de: 'Köyceğiz', tr: 'Köyceğiz' },
    image: '/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg',
    href: '/koycegiz/beach/Ekincik',
  },
  {
    title: { ru: 'Термы Султание на озере', en: 'Sultaniye Hot Springs', de: 'Sultaniye-Thermalquellen', tr: 'Sultaniye Kaplıcaları' },
    region: { ru: 'Кёйджегиз', en: 'Köyceğiz', de: 'Köyceğiz', tr: 'Köyceğiz' },
    image: '/api/images/locations/koycegiz/todo/Sultanye/sultanye.jpg',
    href: '/koycegiz/sight/Sultanye',
  },
];

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

const shuffleArray = (array: KaleidoscopeItem[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

type MainContentProps = {
  locale?: string;
};

const MainContent = ({ locale = 'ru' }: MainContentProps) => {
  const dict = dictionaries[locale] || dictionaries['en'];
  const sliderRef = useRef<Slider>(null);
  const [kaleidoscopeItems, setKaleidoscopeItems] = useState<KaleidoscopeItem[]>(
    allKaleidoscopeItems.slice(0, 9)
  );

  useEffect(() => {
    const shuffled = shuffleArray(allKaleidoscopeItems).slice(0, 12);
    setKaleidoscopeItems(shuffled);
  }, []);

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

  const mosaicItems = [
    {
      badge: locale === 'ru' ? 'Главные ворота' : locale === 'de' ? 'Haupttor DLM' : locale === 'tr' ? 'Bölgenin Kapısı' : 'Gateway Hub',
      title:
        locale === 'ru'
          ? 'Даламан — больше чем аэропорт'
          : locale === 'de'
          ? 'Dalaman — mehr als nur ein Flughafen'
          : locale === 'tr'
          ? 'Dalaman — Havalimanından Fazlası'
          : 'Dalaman — More Than an Airport',
      description:
        locale === 'ru'
          ? 'Пляж Сарыгерме, секретная бухта Сарсала, серные термы и горный рафтинг в 20 минутах от прилёта.'
          : locale === 'de'
          ? 'Sarıgerme-Strand, Sarsala-Bucht, Schwefelthermen und Rafting nur 20 Minuten nach der Landung.'
          : locale === 'tr'
          ? 'Sarıgerme Plajı, Sarsala Koyu, kükürtlü kaplıcalar ve Dalaman Çayı rafting rotaları.'
          : 'Sarıgerme sandy beach, secret Sarsala Bay, thermal springs, and river rafting 20 minutes from DLM.',
      href: localize('/dalaman'),
      image: '/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg',
    },
    {
      badge: locale === 'ru' ? 'Приключения' : locale === 'de' ? 'Erlebnisse' : locale === 'tr' ? 'Deneyimler' : 'Adventures',
      title: dict.main_content.mosaic.guides_title,
      description: dict.main_content.mosaic.guides_desc,
      href: localize('/services/excursions-tours'),
      image: '/api/images/locations/fethiye/todo/saklikent/saklikent.jpg',
    },
    {
      badge: locale === 'ru' ? 'Опыт и маршруты' : locale === 'de' ? 'Reiseberichte' : locale === 'tr' ? 'Gezi Notları' : 'Travel Stories',
      title: dict.main_content.mosaic.blogs_title,
      description: dict.main_content.mosaic.blogs_desc,
      href: localize('/blogs'),
      image: '/api/images/locations/gocek/beach/bedri/bedri.jpg',
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

  return (
    <div className="space-y-12 pb-12">
      {/* 1. 8 Coastal Resorts Showcase (Editorial Priority #1) */}
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

      {/* 2. Compact Service Tools Bar (6 Trip Essentials) */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link, idx) => (
            <QuickLinkCard key={idx} icon={link.icon} title={link.title} href={link.href} />
          ))}
        </div>
      </section>

      {/* 3. Kaleidoscope Section (Clean Single-Language Titles + Geo Badges) */}
      <section className="relative">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-5 gap-4">
          <div>
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
              {locale === 'ru' ? 'Все пляжи и бухты' : 'All Beaches'}
            </Link>
          </div>
        </div>

        <div className="-mx-2">
          <Slider ref={sliderRef} {...sliderSettings}>
            {kaleidoscopeItems.map((item: KaleidoscopeItem, index: number) => (
              <div key={index} className="px-2.5 py-2">
                <KaleidoscopeCard
                  title={item.title[locale] || item.title['en']}
                  region={item.region[locale] || item.region['en']}
                  image={item.image}
                  href={localize(item.href)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* 4. Mosaic Section (Authentic Photos + Dalaman Gateway Feature instead of Contact Form) */}
      <section>
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
            {dict.main_content.mosaic.title}
          </h2>
          <p className="text-sm text-slate-500 font-medium">{dict.main_content.mosaic.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mosaicItems.map((item, idx) => (
            <MosaicCard
              key={idx}
              badge={item.badge}
              title={item.title}
              description={item.description}
              href={item.href}
              image={item.image}
              readMoreText={dict.main_content.mosaic.read_more}
            />
          ))}
        </div>
      </section>

      {/* 5. Curated Collections Section (100% Authentic Location Photos) */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-5 gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
              {dict.main_content.collections.title}
            </h2>
            <p className="text-sm text-slate-500 font-medium">{dict.main_content.collections.subtitle}</p>
          </div>
          <Link
            href={localize('/collections')}
            className="text-cyan-600 font-bold text-xs hover:text-cyan-700 flex items-center gap-1.5 uppercase tracking-wider"
          >
            {dict.main_content.collections.view_all} <FaChevronRight size={10} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <CollectionCard
            title={dict.main_content.collections.romantic}
            count={dict.main_content.collections.romantic_desc}
            image="/api/images/locations/dacha/todo/eskidacha/eski_dacha.jpg"
            tag={locale === 'ru' ? 'Уикенды' : 'Weekends'}
            href={localize('/routes/weekends')}
          />
          <CollectionCard
            title={dict.main_content.collections.family}
            count={dict.main_content.collections.family_desc}
            image="/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg"
            tag={locale === 'ru' ? 'Семья' : 'Family'}
            href={localize('/articles/family-vacation-kids-entertainment')}
          />
          <CollectionCard
            title={dict.main_content.collections.gastro}
            count={dict.main_content.collections.gastro_desc}
            image="/api/images/locations/koycegiz/todo/Seafront/seafront.jpg"
            tag={locale === 'ru' ? 'Кухня' : 'Food'}
            href={localize('/articles/gastronomy')}
          />
          <CollectionCard
            title={dict.main_content.collections.bays}
            count={dict.main_content.collections.bays_desc}
            image="/api/images/locations/marmaris/beach/AmosBay/amosBay.jpg"
            tag={locale === 'ru' ? 'Бухты' : 'Bays'}
            href={localize('/beaches')}
          />
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
  title,
  description,
  href,
  image,
  readMoreText,
}: {
  badge: string;
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
        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-700 shadow-xs">
          {badge}
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

const CollectionCard = ({
  title,
  count,
  image,
  tag,
  href,
}: {
  title: string;
  count: string;
  image: string;
  tag: string;
  href: string;
}) => (
  <Link
    href={href}
    className="group relative h-60 rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 block hover:-translate-y-1 hover:shadow-md transition-all duration-300"
  >
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-transparent" />
    <div className="absolute top-3.5 right-3.5">
      <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/25">
        {tag}
      </span>
    </div>
    <div className="absolute inset-0 flex flex-col justify-end p-5">
      <h3 className="text-white font-bold text-base leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
        {title}
      </h3>
      <p className="text-white/80 text-xs font-medium">{count}</p>
    </div>
  </Link>
);

const KaleidoscopeCard = ({
  title,
  region,
  image,
  href,
}: {
  title: string;
  region: string;
  image: string;
  href: string;
}) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [isError, setIsError] = useState(false);

  return (
    <Link
      href={href}
      className="block relative h-68 sm:h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-200/70 group"
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
        <span className="px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-cyan-200 border border-white/15 text-[10px] font-bold uppercase tracking-wider">
          {region}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent group-hover:from-cyan-950/90 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-bold text-white text-base leading-snug drop-shadow-sm group-hover:text-cyan-200 transition-colors">
          {title}
        </h3>
        <div className="w-8 h-1 bg-cyan-400 mt-2.5 rounded-full transform scale-x-50 group-hover:scale-x-100 transition-transform origin-left duration-300" />
      </div>
    </Link>
  );
};

export default MainContent;
