import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaChevronRight, FaCompass, FaShieldAlt } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/dictionary';
import LanguageSwitcher from './LanguageSwitcher';
import GlobalSearch from './GlobalSearch';
import SideMenu from './SideMenu';

type HeaderProps = {
  locale?: string;
};

const cityNamesMap: Record<string, Record<string, string>> = {
  en: { dacha: 'Datça', marmaris: 'Marmaris', koycegiz: 'Köyceğiz', dalyan: 'Dalyan', dalaman: 'Dalaman', gocek: 'Göcek', fethiye: 'Fethiye', kas: 'Kaş' },
  ru: { dacha: 'Датча', marmaris: 'Мармарис', koycegiz: 'Кёйджегиз', dalyan: 'Дальян', dalaman: 'Даламан', gocek: 'Гёджек', fethiye: 'Фетхие', kas: 'Каш' },
  de: { dacha: 'Datça', marmaris: 'Marmaris', koycegiz: 'Köyceğiz', dalyan: 'Dalyan', dalaman: 'Dalaman', gocek: 'Göcek', fethiye: 'Fethiye', kas: 'Kaş' },
  tr: { dacha: 'Datça', marmaris: 'Marmaris', koycegiz: 'Köyceğiz', dalyan: 'Dalyan', dalaman: 'Dalaman', gocek: 'Göcek', fethiye: 'Fethiye', kas: 'Kaş' }
};

const Header = async ({ locale = 'ru' }: HeaderProps) => {
  const dict = await getDictionary(locale as Locale);
  const cities = cityNamesMap[locale] || cityNamesMap['en'];

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:') || path.startsWith('mailto:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const cityNavLinks = [
    { name: cities.dacha, href: '/dacha' },
    { name: cities.marmaris, href: '/marmaris' },
    { name: cities.koycegiz, href: '/koycegiz' },
    { name: cities.dalyan, href: '/dalyan' },
    { name: cities.dalaman, href: '/dalaman', isGateway: true },
    { name: cities.gocek, href: '/gocek' },
    { name: cities.fethiye, href: '/fethiye' },
    { name: cities.kas, href: '/kas' },
  ];

  const navItems = [
    {
      name: dict.header.nav.preparation,
      href: localize('/articles'),
      dropdown: [
        { name: dict.header.nav.airport_dalaman, href: '/articles/airport-dalaman' },
        { name: dict.header.nav.transport, href: '/articles/transport' },
        { name: locale === 'ru' ? '✈️ Авиабилеты и чартеры' : locale === 'de' ? '✈️ Flüge & Direktcharter' : locale === 'tr' ? '✈️ Uçak Bileti & Çarter' : '✈️ Flights & Direct Charters', href: '/services/flights' },
        { name: dict.header.nav.accommodation, href: '/services/hotels' },
        { name: dict.header.nav.climate_and_seasons, href: '/articles/climate-and-seasons' },
        { name: dict.header.nav.geography, href: '/articles/geography' },
        { name: dict.header.nav.residency, href: '/articles/residency-permit' },
        { name: dict.header.nav.useful_contacts, href: '/articles/useful-contacts' },
      ]
    },
    {
      name: dict.header.nav.discoveries,
      href: localize('/city-guide'),
      dropdown: [
        { name: dict.header.nav.all_cities, href: '/city-guide' },
        { name: dict.header.nav.best_beaches, href: '/beaches' },
        { name: dict.header.nav.ancient_cities, href: '/articles/ancient-cities' },
        { name: dict.header.nav.nature_parks, href: '/articles/national-parks-and-nature-reserves' },
        { name: dict.header.nav.history, href: '/articles/history' },
        { name: dict.header.nav.culture_traditions, href: '/articles/culture-and-traditions' },
      ]
    },
    {
      name: dict.header.nav.experiences,
      href: localize('/collections'),
      dropdown: [
        { name: dict.header.nav.yachting, href: '/articles/yachting' },
        { name: dict.header.nav.diving, href: '/articles/diving' },
        { name: dict.header.nav.paragliding, href: '/articles/paragliding' },
        { name: dict.header.nav.trekking, href: '/routes/trekking' },
        { name: dict.header.nav.kitesurfing, href: '/articles/kitesurfing' },
        { name: dict.header.nav.souvenirs_crafts, href: '/articles/suveniry-i-remesla' },
        { name: dict.header.nav.blogs, href: '/blogs' },
      ]
    },
    {
      name: locale === 'ru' ? 'Маршруты' : locale === 'de' ? 'Routen' : locale === 'tr' ? 'Rotalar' : 'Routes',
      href: localize('/routes'),
      dropdown: [
        { name: locale === 'ru' ? '🥾 Интерактивный Атлас троп' : '🥾 Interactive Trail Atlas', href: '/routes/trekking' },
        { name: locale === 'ru' ? '🍷 Уикенды на 48 часов' : '🍷 48-Hour Weekend Plans', href: '/routes/weekends' },
        { name: locale === 'ru' ? '🚗 Автомаршруты и Базары' : '🚗 Road Trips & Markets', href: '/routes' },
        { name: locale === 'ru' ? '🗺️ Интерактивная карта' : '🗺️ Interactive Coast Map', href: '/map' },
      ]
    }
  ];

  return (
    <header className="glass-header">
      {/* Level 1: Utility Top Bar */}
      <div className="bg-cyan-700 text-white text-[11px] font-semibold">
        <div className="portal-container py-1.5 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href={localize('/contacts')} className="flex items-center gap-1 hover:text-cyan-200 transition-colors">
              <span>{dict.header.contact_us}</span>
              <FaChevronRight size={8} />
            </Link>
            <a href="mailto:info@dalaman.info" className="hidden sm:flex items-center gap-1.5 text-cyan-100 hover:text-white transition-colors">
              <MdEmail size={13} />
              <span>info@dalaman.info</span>
            </a>
            <Link href={localize('/articles/useful-contacts')} className="hidden md:flex items-center gap-1 text-cyan-100 hover:text-white transition-colors">
              <FaShieldAlt size={11} />
              <span>{locale === 'ru' ? 'Справка и Аптеки 24/7' : locale === 'de' ? 'Notdienst & Info' : locale === 'tr' ? 'Nöbetçi Eczaneler' : 'Emergency & Info'}</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 sm:gap-5">
            <Link href={localize('/services/transfers')} className="hidden md:flex items-center gap-1 text-cyan-100 hover:text-white transition-colors">
              <span>{dict.floating_menu?.transfer || (locale === 'ru' ? 'Трансфер из DLM' : 'DLM Transfers')}</span>
              <FaChevronRight size={8} />
            </Link>
            <Link href={localize('/services/excursions-tours')} className="hidden lg:flex items-center gap-1 text-cyan-100 hover:text-white transition-colors">
              <span>{dict.header.excursions}</span>
              <FaChevronRight size={8} />
            </Link>
            <Link href={localize('/services')} className="hidden sm:flex items-center gap-1 hover:text-cyan-200 transition-colors">
              <span>{dict.header.services}</span>
              <FaChevronRight size={8} />
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>

      {/* Level 2: Brand, Main Dropdowns & Global Search */}
      <div className="portal-container py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={localize('/')} className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <FaCompass size={20} />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-cyan-700 transition-colors block leading-none">
              DALAMAN<span className="text-cyan-600">.INFO</span>
            </span>
            <span className="text-[11px] font-medium text-slate-500 block mt-0.5">
              {dict.header.logo_title}
            </span>
          </div>
        </Link>

        {/* Main Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-cyan-700 hover:bg-slate-100/80 transition-colors"
                >
                  <span>{item.name}</span>
                  {item.dropdown && item.dropdown.length > 0 && (
                    <FiChevronDown className="text-slate-400 group-hover:text-cyan-600 transition-transform duration-200 group-hover:rotate-180" size={14} />
                  )}
                </Link>
                {item.dropdown && item.dropdown.length > 0 && (
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible z-40 before:absolute before:inset-x-0 before:-top-3 before:h-3 before:bg-transparent">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={localize(subItem.href)}
                          className="flex justify-between items-center w-full px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-cyan-50/60 hover:text-cyan-700 transition-colors"
                        >
                          <span>{subItem.name}</span>
                          <FaChevronRight size={9} className="opacity-0 group-hover:opacity-40 text-cyan-600" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link
                href={localize('/articles')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-cyan-700 hover:bg-slate-100/80 transition-colors"
              >
                {locale === 'ru' ? 'Статьи' : locale === 'de' ? 'Artikel' : locale === 'tr' ? 'Makaleler' : 'Articles'}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Actions: Global Search & Mobile Drawer Trigger */}
        <div className="flex items-center gap-2.5">
          <GlobalSearch locale={locale} placeholder={dict.header.search_placeholder} />
          <SideMenu locale={locale} />
        </div>
      </div>

      {/* Level 3: Horizontal Resort Ribbon (Datça -> Kaş) */}
      <div className="border-t border-slate-100 bg-slate-50/70">
        <div className="portal-container py-1.5 flex items-center justify-between overflow-x-auto no-scrollbar gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pr-2 flex-shrink-0 hidden sm:inline">
            {locale === 'ru' ? 'Курорты:' : locale === 'de' ? 'Küste:' : locale === 'tr' ? 'Kıyılar:' : 'Resorts:'}
          </span>
          <ul className="flex items-center gap-1 sm:gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
            {cityNavLinks.map((item) => (
              <li key={item.name} className="flex-shrink-0">
                <Link
                  href={localize(item.href)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    item.isGateway
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 hover:bg-cyan-600 hover:text-white'
                      : 'text-slate-600 hover:text-cyan-700 hover:bg-white hover:shadow-xs'
                  }`}
                >
                  {item.isGateway && <span className="text-[10px]">✈️</span>}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
