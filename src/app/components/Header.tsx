import React from 'react';
import { MdPhone, MdSearch } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';

// Type definitions for navigation structure
type NavSubSubItem = {
  name: string;
  href: string;
};

type NavSubItem = {
  name: string;
  href: string;
  submenu?: NavSubSubItem[]; // Optional submenu
};

type NavItem = {
  name: string;
  href: string;
  dropdown?: NavSubItem[];
};

const locations = [
  { name: 'Дача', baseHref: '/dacha' },
  { name: 'Мармарис', baseHref: '/marmaris' },
  { name: 'Дальян', baseHref: '/dalyan' },
  { name: 'Кёйджегиз', baseHref: '/koycegiz' },
  { name: 'Даламан', baseHref: '/dalaman' },
  { name: 'Гёджек', baseHref: '/gocek' },
  { name: 'Фетхие', baseHref: '/fethiye' },
  { name: 'Каш', baseHref: '/kas' },
];

const navItems: NavItem[] = [
  {
    name: 'Подготовка', href: '#', dropdown: [
      { name: 'География и природа', href: '/articles/geography' },
      { name: 'Транспорт', href: '/articles/transport' },
      { name: 'Аэропорт Даламан', href: '/articles/airport-dalaman' },
      { name: 'Отели и жилье', href: '/articles/real-estate' },
      { name: 'Климат и сезоны', href: '/articles/climate-and-seasons' },
      { name: 'ВНЖ и переезд', href: '/articles/residency-permit' },
      { name: 'Полезные контакты', href: '/articles/useful-contacts' },
    ]
  },
  {
    name: 'Открытия', href: '#', dropdown: [
      { name: 'Все города (обзор)', href: '/city-guide' },
      { name: 'Лучшие пляжи', href: '/beaches' },
      { name: 'Античные города', href: '/articles/ancient-cities' },
      { name: 'Природа и парки', href: '/articles/flora-fauna' },
      { name: 'История региона', href: '/articles/history' },
      { name: 'Культура и традиции', href: '/articles/culture-and-traditions' },
    ]
  },
  {
    name: 'Впечатления', href: '#', dropdown: [
      { name: 'Яхтинг', href: '/articles/yachting' },
      { name: 'Дайвинг', href: '/articles/diving' },
      { name: 'Параглайдинг', href: '/articles/paragliding' },
      { name: 'Трекинг', href: '/articles/trekking' },
      { name: 'Кайтсерфинг', href: '/articles/kitesurfing' },
      { name: 'Сувениры и ремесла', href: '/articles/suveniry-i-remesla' },
      { name: 'Блоги путешественников', href: '/blogs' },
    ]
  },
];

const cityNavLinks = [
  { name: 'Дача', href: '/dacha' },
  { name: 'Мармарис', href: '/marmaris' },
  { name: 'Кёйджегиз', href: '/koycegiz' },
  { name: 'Дальян', href: '/dalyan' },
  { name: 'Даламан', href: '/dalaman' },
  { name: 'Гёджек', href: '/gocek' },
  { name: 'Фетхие', href: '/fethiye' },
  { name: 'Каш', href: '/kas' },
];

const Header = () => {
  return (
    <header className="glass-header">
      {/* Top Action Bar */}
      <div className="bg-cyan-600/90 text-white text-[10px] font-bold tracking-widest">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link href="/contacts" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors uppercase"><span>СВЯЖИТЕСЬ С НАМИ</span><FaChevronRight size={8} /></Link>
            <Link href="tel:0000000000" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors tracking-tighter"><MdPhone size={14} /><span>+90 000 000 00 00</span></Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/services" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors uppercase"><span>УСЛУГИ</span><FaChevronRight size={8} /></Link>
            <Link href="/services/excursions-tours" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors uppercase"><span>ЭКСКУРСИИ</span><FaChevronRight size={8} /></Link>
            <Link href="/pharmacies" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors uppercase"><span>АПТЕКИ</span><FaChevronRight size={8} /></Link>
            <div className="relative group/search">
              <input type="text" placeholder="Поиск..." className="bg-white/20 text-white placeholder-white/70 rounded-full py-1 px-4 text-xs focus:outline-none focus:bg-white focus:text-gray-800 transition-all w-32 focus:w-48" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white group-focus-within/search:text-gray-500"><MdSearch size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header & Navigation */}
      <div className="container mx-auto px-4 py-4">

        {/* Line 1: Title and Cities */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-cyan-700 hover:text-cyan-800">
            Ваш гид по побережью
          </Link>
          <nav>
            <ul className="flex items-center">
              {cityNavLinks.map((item, index) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm font-medium text-gray-600 hover:text-cyan-600 px-3 py-1">
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
      <div className="container mx-auto px-4 pt-3 pb-3">
        <nav>
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link href={item.href} className="flex items-center text-sm font-bold text-gray-600 hover:text-cyan-600 tracking-wider py-2">
                  <span>{item.name.toUpperCase()}</span>
                  {item.dropdown && item.dropdown.length > 0 && <FiChevronDown className="ml-1" size={16} />}
                </Link>
                {item.dropdown && item.dropdown.length > 0 && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-20 pt-4 -mt-2">
                    <div className="bg-white rounded-md shadow-lg py-1">
                      {item.dropdown.map((subItem) => (
                        <div key={subItem.name} className="relative group/submenu">
                          <Link href={subItem.href} className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <span>{subItem.name}</span>
                            {subItem.submenu && <FaChevronRight size={12} className="text-gray-400" />}
                          </Link>
                          {subItem.submenu && (
                            <div className="absolute left-full -top-1 w-56 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover/submenu:opacity-100 invisible group-hover/submenu:visible z-30">
                              {subItem.submenu.map(subSubItem => (
                                <Link key={subSubItem.name} href={subSubItem.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  {subSubItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
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