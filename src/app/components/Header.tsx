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
  { name: 'Фетхие', baseHref: '/fethiye' },
  { name: 'Каш', baseHref: '/kas' },
];

const navItems: NavItem[] = [
    { name: 'Информация', href: '#', dropdown: [
        { name: 'География и история', href: '/articles/1_geografiya_i_obshchaya_informatsiya_o_regione' },
        { name: 'Климат и сезоны', href: '/articles/3_klimat_i_luchshee_vremya_dlya_poseshcheniya' },
        { name: 'Природа: флора и фауна', href: '/articles/37_flora_i_fauna_priroda_regiona' },
        { name: 'Культура и традиции', href: '/articles/31_kulturnye_osobennosti_i_tradicii' },
    ]},
    { name: 'Локации', href: '#', dropdown: locations.map(l => ({
        name: l.name,
        href: l.baseHref,
        submenu: [
            { name: 'Общая информация', href: `${l.baseHref}/info` },
            { name: 'Пляжи', href: `${l.baseHref}/beaches` },
            { name: 'Достопримечательности', href: `${l.baseHref}/sights` },
            { name: 'Транспорт', href: `${l.baseHref}/transport` },
        ]
    }))},
    { name: 'Чем заняться', href: '#', dropdown: [
        { name: 'Дайвинг', href: '/articles/17_vodnye_vidy_sporta_dayving_vindserfing' },
        { name: 'Трекинг', href: '/articles/16_peshehodnyy_turizm_i_trekking' },
        { name: 'Параглайдинг', href: '/articles/15_aktivnyy_otdyh_i_ekstremalnyy_sport' },
        { name: 'Античные города', href: '/articles/13_antichnye_goroda_i_arkheologicheskie_pamyatniki' },
        { name: 'Яхтинг', href: '/articles/18_yahting_i_morskie_progulki' },
    ]},
    { name: 'Переезд', href: '#', dropdown: [
        { name: 'ВНЖ', href: '#' },
        { name: 'Недвижимость', href: '/articles/35_nedvizhimost_v_regione_pokupka_i_arenda' },
        { name: 'Полезные ссылки', href: '/articles/50_poleznye_ssylki_i_kontakty' },
    ]},
    { name: 'Сувениры', href: '/articles/48_tradicionnye_remesla_i_suveniry', dropdown: []},
];

const cityNavLinks = [
  { name: 'Дача', href: '/dacha' },
  { name: 'Мармарис', href: '/marmaris' },
  { name: 'Кёйджегиз', href: '/koycegiz' },
  { name: 'Дальян', href: '/dalyan' },
  { name: 'Даламан', href: '/dalaman' },
  { name: 'Геджех', href: '/gocek' },
  { name: 'Фетхие', href: '/fethiye' },
  { name: 'Каш', href: '/kas' },
];

const Header = () => {
  return (
    <header className="bg-white text-gray-800 shadow-sm">
      {/* Top Action Bar */}
      <div className="bg-[#00a8e0] text-white text-xs font-bold">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
             <Link href="/contacts" className="flex items-center space-x-1 hover:underline"><span>СВЯЖИТЕСЬ С НАМИ</span><FaChevronRight size={10} /></Link>
             <Link href="tel:0000000000" className="flex items-center space-x-1 hover:underline"><MdPhone /><span>000 000 00 00</span></Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/services" className="flex items-center space-x-1 hover:underline"><span>НАШИ УСЛУГИ</span><FaChevronRight size={10} /></Link>
            <Link href="/services/excursions-tours" className="flex items-center space-x-1 hover:underline"><span>ЭКСКУРСИИ</span><FaChevronRight size={10} /></Link>
            <Link href="/pharmacies" className="flex items-center space-x-1 hover:underline"><span>ДЕЖУРНЫЕ АПТЕКИ</span><FaChevronRight size={10} /></Link>
            <div className="relative">
                <input type="text" placeholder="Поиск..." className="bg-white text-gray-800 rounded-full py-1 pl-4 pr-10 text-sm focus:outline-none w-48"/>
                <button className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-black"><MdSearch /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header & Navigation */}
      <div className="container mx-auto px-4 pt-3 pb-3">
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
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-20">
                      {item.dropdown.map((subItem) => (
                        <div key={subItem.name} className="relative group/submenu">
                           <a href={subItem.href} className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <span>{subItem.name}</span>
                                {subItem.submenu && <FaChevronRight size={12} className="text-gray-400" />}
                           </a>
                           {subItem.submenu && (
                               <div className="absolute left-full -top-1 w-56 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover/submenu:opacity-100 invisible group-hover/submenu:visible z-30">
                                   {subItem.submenu.map(subSubItem => (
                                       <a key={subSubItem.name} href={subSubItem.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                           {subSubItem.name}
                                       </a>
                                   ))}
                               </div>
                           )}
                        </div>
                      ))}
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