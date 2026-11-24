import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlane, FaBus, FaTaxi, FaCarSide, FaKey, FaCompass, FaSun, FaUtensils, FaLandmark, FaMapMarkedAlt, FaFish, FaPaperPlane, FaWind, FaHotTub, FaShoppingBag } from 'react-icons/fa';
import { getDictionary, Locale } from '@/lib/dictionary';

type LeftSidebarProps = {
  locale?: string;
};

const LeftSidebar = async ({ locale = 'ru' }: LeftSidebarProps) => {
  const dict = await getDictionary(locale as Locale);

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const transportLinks = [
    { title: dict.left_sidebar.airport_dalaman, href: '/articles/airport-dalaman', icon: <FaPlane /> },
    {
      title:
        locale === 'ru'
          ? 'Шаттлы Havaş и Muttaş'
          : locale === 'de'
          ? 'Havaş & Muttaş Flughafenbusse'
          : locale === 'tr'
          ? 'Havaş ve Muttaş Servisleri'
          : 'Havaş & Muttaş Airport Shuttles',
      href: '/articles/transport',
      icon: <FaBus />,
    },
    { title: dict.left_sidebar.city_transport, href: '/articles/transport', icon: <FaTaxi /> },
    { title: dict.left_sidebar.transfer, href: '/services/transfers', icon: <FaCarSide /> },
    {
      title:
        locale === 'ru'
          ? 'Аренда авто без депозита'
          : locale === 'de'
          ? 'Mietwagen ohne Kaution'
          : locale === 'tr'
          ? 'Depozitosuz Araç Kiralama'
          : 'Car Rental (No Deposit)',
      href: '/services/car-rental',
      icon: <FaKey />,
    },
  ];

  const interactiveServicesLinks = [
    {
      title:
        locale === 'ru'
          ? 'Все курорты: куда поехать?'
          : locale === 'de'
          ? 'Alle Orte: Wohin reisen?'
          : locale === 'tr'
          ? 'Tüm Bölgeler: Nereye Gitmeli?'
          : 'All Resorts: Where to Go?',
      href: '/city-guide',
      icon: <FaMapMarkedAlt className="text-cyan-600" />,
    },
    {
      title:
        locale === 'ru'
          ? 'Интерактивный атлас троп'
          : locale === 'de'
          ? 'Interaktiver Wanderatlas'
          : locale === 'tr'
          ? 'İnteraktif Rota Atlası'
          : 'Interactive Trekking Atlas',
      href: '/routes/trekking',
      icon: <FaCompass className="text-emerald-600" />,
    },
    {
      title:
        locale === 'ru'
          ? 'Уикенды на 48 часов (4 плана)'
          : locale === 'de'
          ? '48-Stunden-Wochenenden'
          : locale === 'tr'
          ? '48 Saatlik Hafta Sonu'
          : '48-Hour Weekend Guides',
      href: '/routes/weekends',
      icon: <span>🍷</span>,
    },
    {
      title:
        locale === 'ru'
          ? 'Лучшие бухты и пляжи'
          : locale === 'de'
          ? 'Geheime Buchten & Strände'
          : locale === 'tr'
          ? 'En İyi Koylar ve Plajlar'
          : 'Best Bays & Beaches',
      href: '/beaches',
      icon: <FaSun className="text-amber-500" />,
    },
    {
      title:
        locale === 'ru'
          ? 'Дайвинг и рыбалка'
          : locale === 'de'
          ? 'Tauchen & Angeln'
          : locale === 'tr'
          ? 'Dalış ve Balıkçılık'
          : 'Diving & Fishing',
      href: '/diving-fishing',
      icon: <FaFish className="text-cyan-600" />,
    },
    {
      title:
        locale === 'ru'
          ? 'Параглайдинг (Бабадаг)'
          : locale === 'de'
          ? 'Paragliding (Babadağ)'
          : locale === 'tr'
          ? 'Yamaç Paraşütü (Babadağ)'
          : 'Paragliding (Babadağ)',
      href: '/paragliding',
      icon: <FaPaperPlane className="text-sky-600" />,
    },
    {
      title:
        locale === 'ru'
          ? 'Кайт и виндсёрфинг'
          : locale === 'de'
          ? 'Kite & Windsurfen'
          : locale === 'tr'
          ? 'Kite & Rüzgar Sörfü'
          : 'Kite & Windsurfing',
      href: '/kitesurfing',
      icon: <FaWind className="text-cyan-600" />,
    },
    {
      title:
        locale === 'ru'
          ? 'Термы, хаммамы и СПА'
          : locale === 'de'
          ? 'Thermen & Hamams'
          : locale === 'tr'
          ? 'Kaplıcalar ve Hamam'
          : 'Hot Springs & Hammams',
      href: '/thermal-spa',
      icon: <FaHotTub className="text-orange-600" />,
    },
    {
      title:
        locale === 'ru'
          ? 'Рынки, базары и ремёсла'
          : locale === 'de'
          ? 'Märkte & Handwerk'
          : locale === 'tr'
          ? 'Pazarlar ve El Sanatları'
          : 'Markets & Crafts',
      href: '/markets-crafts',
      icon: <FaShoppingBag className="text-amber-600" />,
    },
    {
      title:
        locale === 'ru'
          ? 'Гастрономия и базары'
          : locale === 'de'
          ? 'Gastronomie & Wochenmärkte'
          : locale === 'tr'
          ? 'Gastronomi ve Pazarlar'
          : 'Gastronomy & Local Markets',
      href: '/articles/gastronomy',
      icon: <FaUtensils className="text-rose-500" />,
    },
    {
      title:
        locale === 'ru'
          ? 'Античные города Карии и Ликии'
          : locale === 'de'
          ? 'Antike Städte (Karien & Lykien)'
          : locale === 'tr'
          ? 'Antik Kentler (Karya ve Likya)'
          : 'Ancient Cities of Caria & Lycia',
      href: '/articles/ancient-cities',
      icon: <FaLandmark className="text-indigo-600" />,
    },
  ];

  const gatewayTitle =
    locale === 'ru'
      ? 'Главные ворота: Даламан'
      : locale === 'de'
      ? 'Das Tor zur Region: Dalaman'
      : locale === 'tr'
      ? 'Bölgenin Kapısı: Dalaman'
      : 'Gateway Hub: Dalaman';

  const gatewayPlace =
    locale === 'ru'
      ? 'Бухта Сарсала, Сарыгерме и термы'
      : locale === 'de'
      ? 'Sarsala-Bucht, Sarıgerme & Thermen'
      : locale === 'tr'
      ? 'Sarsala Koyu, Sarıgerme ve Kaplıcalar'
      : 'Sarsala Bay, Sarıgerme & Thermal Springs';

  const gatewaySub =
    locale === 'ru'
      ? '15–25 минут от аэропорта DLM'
      : locale === 'de'
      ? '15–25 Min. vom Flughafen DLM'
      : locale === 'tr'
      ? 'DLM Havalimanına 15–25 dk'
      : '15–25 min from DLM Airport';

  const gatewayBtn =
    locale === 'ru'
      ? 'Открыть гид по Даламану'
      : locale === 'de'
      ? 'Dalaman-Guide öffnen'
      : locale === 'tr'
      ? 'Dalaman Rehberini Aç'
      : 'Explore Dalaman Guide';

  return (
    <div className="space-y-6">
      {/* 1. Top Priority: Dalaman Gateway Spotlight Block */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
        <div className="bg-cyan-600 text-white px-5 py-3.5">
          <h3 className="font-bold text-xs uppercase tracking-wider">{gatewayTitle}</h3>
        </div>
        <div className="p-5">
          <Link href={localize('/dalaman')} className="block relative h-40 mb-4 group/ad overflow-hidden rounded-xl">
            <Image
              src="/api/images/locations/dalaman/beach/Sarsala/sarsala.jpg"
              fill
              alt="Sarsala Bay Dalaman"
              className="object-cover group-hover/ad:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent flex flex-col justify-end p-3.5">
              <p className="text-white text-xs font-bold leading-snug mb-0.5">{gatewayPlace}</p>
              <p className="text-cyan-200 text-[11px] font-medium">{gatewaySub}</p>
            </div>
          </Link>
          <Link
            href={localize('/dalaman')}
            className="w-full block text-center bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl hover:bg-cyan-700 transition-all shadow-sm"
          >
            {gatewayBtn}
          </Link>
        </div>
      </div>

      {/* 2. Interactive Guides & Navigators Panel */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
        <div className="bg-cyan-600 text-white px-5 py-3.5">
          <h3 className="font-bold text-xs uppercase tracking-wider">
            {locale === 'ru'
              ? 'Навигатор путеводителя'
              : locale === 'de'
              ? 'Guide-Navigator'
              : locale === 'tr'
              ? 'Rehber Gezgini'
              : 'Guide Navigator'}
          </h3>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {interactiveServicesLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={localize(link.href)}
                  className="flex items-center space-x-3 group text-slate-700 hover:text-cyan-600 transition-colors"
                >
                  <span className="w-7 h-7 flex items-center justify-center bg-slate-100 rounded-lg text-sm flex-shrink-0 group-hover:bg-cyan-50 transition-colors">
                    {link.icon}
                  </span>
                  <span className="font-medium text-sm leading-snug group-hover:text-cyan-600 transition-colors">
                    {link.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Transport & Airport Logistics Panel (Moved below Gateway & Navigator) */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
        <div className="bg-cyan-600 text-white px-5 py-3.5">
          <h3 className="font-bold text-xs uppercase tracking-wider">{dict.left_sidebar.transport}</h3>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {transportLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={localize(link.href)}
                  className="flex items-center space-x-3 text-slate-700 hover:text-cyan-600 transition-colors font-medium text-sm group"
                >
                  <span className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors text-xs">
                    {link.icon}
                  </span>
                  <span className="leading-snug">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
