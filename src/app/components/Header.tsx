import React from 'react';
import { MdPhone, MdSearch } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/dictionary';
import LanguageSwitcher from './LanguageSwitcher';

type HeaderProps = {
  locale?: string;
};

const cityNamesMap: Record<string, Record<string, string>> = {
  en: { dacha: 'Datça', marmaris: 'Marmaris', koycegiz: 'Köyceğiz', dalyan: 'Dalyan', dalaman: 'Dalaman', gocek: 'Göcek', fethiye: 'Fethiye', kas: 'Kaş' },
  ru: { dacha: 'Датча', marmaris: 'Мармарис', koycegiz: 'Кёйджегиз', dalyan: 'Дальян', dalaman: 'Даламан', gocek: 'Гёджек', fethiye: 'Фетхие', kas: 'Каш' },
  de: { dacha: 'Datça', marmaris: 'Marmaris', koycegiz: 'Köyceğiz', dalyan: 'Dalyan', dalaman: 'Dalaman', gocek: 'Göcek', fethiye: 'Fethiye', kas: 'Kaş' },
  tr: { dacha: 'Datça', marmaris: 'Marmaris', koycegiz: 'Köyceğiz', dalyan: 'Dalyan', dalaman: 'Dalaman', gocek: 'Göcek', fethiye: 'Fethiye', kas: 'Kaş' }
};

const Header = async ({ locale = 'en' }: HeaderProps) => {
  const dict = await getDictionary(locale as Locale);
  const cities = cityNamesMap[locale] || cityNamesMap['en'];

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const cityNavLinks = [
    { name: cities.dacha, href: '/dacha' },
    { name: cities.marmaris, href: '/marmaris' },
    { name: cities.koycegiz, href: '/koycegiz' },
    { name: cities.dalyan, href: '/dalyan' },
    { name: cities.dalaman, href: '/dalaman' },
    { name: cities.gocek, href: '/gocek' },
    { name: cities.fethiye, href: '/fethiye' },
    { name: cities.kas, href: '/kas' },
  ];

  const navItems = [
    {
      name: dict.header.nav.preparation, href: localize('/articles'), dropdown: [
        { name: dict.header.nav.geography, href: '/articles/geography' },
        { name: dict.header.nav.transport, href: '/articles/transport' },
        { name: dict.header.nav.airport_dalaman, href: '/articles/airport-dalaman' },
        { name: dict.header.nav.accommodation, href: '/articles/accommodation' },
        { name: dict.header.nav.climate_and_seasons, href: '/articles/climate-and-seasons' },
        { name: dict.header.nav.residency, href: '/articles/residency-permit' },
        { name: dict.header.nav.useful_contacts, href: '/articles/useful-contacts' },
      ]
    },
    {
      name: dict.header.nav.discoveries, href: localize('/articles'), dropdown: [
        { name: dict.header.nav.all_cities, href: '/city-guide' },
        { name: dict.header.nav.best_beaches, href: '/beaches' },
        { name: dict.header.nav.ancient_cities, href: '/articles/ancient-cities' },
        { name: dict.header.nav.nature_parks, href: '/articles/national-parks-and-nature-reserves' },
        { name: dict.header.nav.history, href: '/articles/history' },
        { name: dict.header.nav.culture_traditions, href: '/articles/culture-and-traditions' },
      ]
    },
    {
      name: dict.header.nav.experiences, href: localize('/articles'), dropdown: [
        { name: dict.header.nav.yachting, href: '/articles/yachting' },
        { name: dict.header.nav.diving, href: '/articles/diving' },
        { name: dict.header.nav.paragliding, href: '/articles/paragliding' },
        { name: dict.header.nav.trekking, href: '/articles/trekking' },
        { name: dict.header.nav.kitesurfing, href: '/articles/kitesurfing' },
        { name: dict.header.nav.souvenirs_crafts, href: '/articles/suveniry-i-remesla' },
        { name: dict.header.nav.blogs, href: '/blogs' },
      ]
    },
  ];

  return (
    <header className="glass-header">
      {/* Top Action Bar */}
      <div className="bg-cyan-600/90 text-white text-[10px] font-bold tracking-widest">
        <div className="w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-11 lg:px-11 py-1.5 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link href={localize('/contacts')} className="flex items-center space-x-1 hover:text-cyan-200 transition-colors uppercase">
              <span>{dict.header.contact_us}</span>
              <FaChevronRight size={8} />
            </Link>
            <Link href="tel:0000000000" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors tracking-tighter">
              <MdPhone size={14} />
              <span>+90 000 000 00 00</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href={localize('/services')} className="flex items-center space-x-1 hover:text-cyan-200 transition-colors uppercase">
              <span>{dict.header.services}</span>
              <FaChevronRight size={8} />
            </Link>
            <Link href={localize('/services/excursions-tours')} className="flex items-center space-x-1 hover:text-cyan-200 transition-colors uppercase">
              <span>{dict.header.excursions}</span>
              <FaChevronRight size={8} />
            </Link>
            <Link href={localize('/services/transfers')} className="flex items-center space-x-1 hover:text-cyan-200 transition-colors uppercase">
              <span>{dict.floating_menu?.transfer || (locale === 'ru' ? 'Трансфер из DLM' : 'DLM Transfers')}</span>
              <FaChevronRight size={8} />
            </Link>
            <div className="relative group/search">
              <input type="text" placeholder={dict.header.search_placeholder} className="bg-white/20 text-white placeholder-white/70 rounded-full py-1 px-4 text-xs focus:outline-none focus:bg-white focus:text-gray-800 transition-all w-32 focus:w-48" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white group-focus-within/search:text-gray-500">
                <MdSearch size={16} />
              </button>
            </div>
            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>

      {/* Main Header & Navigation */}
      <div className="w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-11 lg:px-11 py-4">
        {/* Line 1: Title and Cities */}
        <div className="flex justify-between items-center">
          <Link href={localize('/')} className="text-2xl font-bold text-cyan-700 hover:text-cyan-800">
            {dict.header.logo_title}
          </Link>
          <nav>
            <ul className="flex items-center">
              {cityNavLinks.map((item, index) => (
                <li key={item.name} className="flex items-center">
                  <Link href={localize(item.href)} className="text-sm font-semibold text-gray-600 hover:text-cyan-600 px-3 py-1 transition-colors">
                    {item.name}
                  </Link>
                  {index < cityNavLinks.length - 1 && <span className="text-gray-300">|</span>}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-200" />
      {/* Line 2: Main Navigation */}
      <div className="w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-11 lg:px-11 pt-3 pb-3">
        <nav>
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link href={item.href} className="flex items-center text-sm font-bold text-gray-600 hover:text-cyan-600 tracking-wider py-2">
                  <span>{item.name.toUpperCase()}</span>
                  {item.dropdown && item.dropdown.length > 0 && <FiChevronDown className="ml-1" size={16} />}
                </Link>
                {item.dropdown && item.dropdown.length > 0 && (
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible z-20 before:absolute before:inset-x-0 before:-top-4 before:h-4 before:bg-transparent">
                    <div className="bg-white rounded-2xl premium-shadow border border-slate-50 py-2">
                      {item.dropdown.map((subItem) => (
                        <div key={subItem.name} className="relative group/submenu">
                          <Link href={localize(subItem.href)} className="flex justify-between items-center w-full px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-cyan-600 transition-colors">
                            <span className="font-medium">{subItem.name}</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;