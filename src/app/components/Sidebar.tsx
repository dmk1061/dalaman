import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaMoneyBillWave,
  FaWifi,
  FaCalculator,
  FaSun,
  FaShieldAlt,
  FaRoute,
  FaCalendarAlt,
  FaCompass,
  FaChevronRight,
} from 'react-icons/fa';
import { getDictionary, Locale } from '@/lib/dictionary';

type SidebarProps = {
  locale?: string;
};

const Sidebar = async ({ locale = 'ru' }: SidebarProps) => {
  const dict = await getDictionary(locale as Locale);

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const cheatSheetTitle =
    locale === 'ru'
      ? 'Шпаргалка туриста'
      : locale === 'de'
      ? 'Reise-Spickzettel'
      : locale === 'tr'
      ? 'Gezgin Rehberi (Önemli Bilgiler)'
      : 'Traveler Cheat Sheet';

  const cheatSheetItems = [
    {
      icon: <FaMoneyBillWave className="text-emerald-600" size={14} />,
      bg: 'bg-emerald-50',
      title:
        locale === 'ru'
          ? 'Деньги, лиры и банковские карты'
          : locale === 'de'
          ? 'Währung, Lira & Bankkarten'
          : locale === 'tr'
          ? 'Döviz, Nakit ve Kart Kullanımı'
          : 'Currency, Turkish Lira & Cards',
      subtitle:
        locale === 'ru'
          ? 'Где менять валюту и как платить без комиссий'
          : 'Where to exchange money & avoid ATM traps',
      href: '/articles/currency-exchange-and-payments',
    },
    {
      icon: <FaWifi className="text-sky-600" size={14} />,
      bg: 'bg-sky-50',
      title:
        locale === 'ru'
          ? 'Связь, интернет и правила eSIM'
          : locale === 'de'
          ? 'Mobilfunk, Internet & eSIM-Regeln'
          : locale === 'tr'
          ? 'İnternet, SIM Kart ve eSIM'
          : 'Internet, SIM Cards & eSIM Rules',
      subtitle:
        locale === 'ru'
          ? 'Как обойти блокировку BTK и выбрать тариф'
          : 'How to set up eSIM before arrival in Turkey',
      href: '/articles/mobile-connection-and-internet-sim-cards',
    },
    {
      icon: <FaCalculator className="text-amber-600" size={14} />,
      bg: 'bg-amber-50',
      title:
        locale === 'ru'
          ? 'Бюджет поездки и цены 2026'
          : locale === 'de'
          ? 'Reisebudget & Preise 2026'
          : locale === 'tr'
          ? 'Tatil Bütçesi ve Fiyatlar 2026'
          : 'Trip Budget & Real Prices 2026',
      subtitle:
        locale === 'ru'
          ? 'Ориентиры цен на кафе, жильё и транспорт'
          : 'Realistic daily costs for dining, stays & transport',
      href: '/articles/travel-budget-and-money-saving-tips',
    },
    {
      icon: <FaSun className="text-orange-500" size={14} />,
      bg: 'bg-orange-50',
      title:
        locale === 'ru'
          ? 'Климат, сезоны и температура моря'
          : locale === 'de'
          ? 'Klima, Reisezeit & Wassertemperatur'
          : locale === 'tr'
          ? 'İklim, Sezonlar ve Deniz Suyu'
          : 'Climate, Seasons & Sea Temps',
      subtitle:
        locale === 'ru'
          ? 'Календарь погоды с апреля по ноябрь'
          : 'Month-by-month weather & swimming guide',
      href: '/articles/climate-and-seasons',
    },
    {
      icon: <FaShieldAlt className="text-cyan-600" size={14} />,
      bg: 'bg-cyan-50',
      title:
        locale === 'ru'
          ? 'Безопасность, дороги и медицина'
          : locale === 'de'
          ? 'Sicherheit, Straßen & Medizin'
          : locale === 'tr'
          ? 'Güvenlik, Yollar ve Sağlık İpuçları'
          : 'Safety, Roads & Medical Tips',
      subtitle:
        locale === 'ru'
          ? 'Практические советы и страховка в регионе'
          : 'Practical rules, driving tips & insurance',
      href: '/articles/useful-tips',
    },
  ];

  const readyRoutesList = [
    {
      icon: <FaCalendarAlt className="text-cyan-300" size={12} />,
      label:
        locale === 'ru'
          ? '4 сценария уикендов на 48 часов'
          : locale === 'de'
          ? '48-Stunden-Wochenendpläne (4 Routen)'
          : locale === 'tr'
          ? '48 Saatlik 4 Hafta Sonu Rotası'
          : '4 Turnkey 48-Hour Weekend Plans',
      href: '/routes/weekends',
    },
    {
      icon: <FaCompass className="text-emerald-300" size={12} />,
      label:
        locale === 'ru'
          ? 'Атлас Ликийской и Карийской троп'
          : locale === 'de'
          ? 'Wanderatlas: Lykischer & Karischer Weg'
          : locale === 'tr'
          ? 'Likya ve Karya Yolu Trekking Atlası'
          : 'Lycian & Carian Way Trail Atlas',
      href: '/routes/trekking',
    },
    {
      icon: <FaRoute className="text-amber-300" size={12} />,
      label:
        locale === 'ru'
          ? 'Автомаршруты на 1–7 дней из Даламана'
          : locale === 'de'
          ? 'Roadtrips für 1–7 Tage ab Dalaman'
          : locale === 'tr'
          ? 'Dalaman Çıkışlı 1–7 Günlük Araç Rotaları'
          : '1–7 Day Road Trips from Dalaman',
      href: '/routes',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Traveler Cheat Sheet (Essential Pre-Trip & On-Site Practical Guides — zero overlap with Kaleidoscope) */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
        <div className="bg-cyan-600 text-white px-5 py-3.5">
          <h3 className="font-bold text-xs uppercase tracking-wider">{cheatSheetTitle}</h3>
        </div>
        <div className="p-4 space-y-3">
          {cheatSheetItems.map((item) => (
            <Link
              key={item.href}
              href={localize(item.href)}
              className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <span
                className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}
              >
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug group-hover:text-cyan-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Single Unified "Ready Routes" Block (Weekends, Trekking Atlas & Road Trips) */}
      <div className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
        <div className="bg-cyan-600 text-white px-5 py-3.5">
          <h3 className="font-bold text-xs uppercase tracking-wider">{dict.sidebar.routes}</h3>
        </div>
        <div className="relative h-40 overflow-hidden">
          <Image
            src="/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg"
            alt={dict.sidebar.routes}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-white text-xs sm:text-sm font-bold leading-snug">
              {dict.sidebar.scenarios_subtitle}
            </p>
          </div>
        </div>
        <div className="p-4 bg-slate-900 text-white space-y-2.5">
          {readyRoutesList.map((r) => (
            <Link
              key={r.href}
              href={localize(r.href)}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
            >
              <span className="flex items-center gap-2 truncate pr-2">
                {r.icon}
                <span className="truncate">{r.label}</span>
              </span>
              <FaChevronRight size={9} className="text-cyan-300 flex-shrink-0" />
            </Link>
          ))}
          <Link
            href={localize('/routes')}
            className="w-full text-center block bg-cyan-500 text-white py-2.5 rounded-xl hover:bg-cyan-400 font-bold text-xs uppercase tracking-wider transition-all shadow-sm mt-2"
          >
            {dict.sidebar.view_all}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
