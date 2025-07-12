import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';

const navItems = [
    {
        name: 'ИНФОРМАЦИЯ',
        href: '#',
        dropdown: [
            { name: 'География и история', href: '/articles/geography-history' },
            { name: 'Климат и сезоны', href: '/articles/climate-seasons' },
        ],
    },
    {
        name: 'ЛОКАЦИИ',
        href: '#',
        dropdown: [
            { name: 'Дача', href: '/dacha' },
            { name: 'Мармарис', href: '/marmaris' },
            { name: 'Фетхие', href: '/fethiye' },
        ],
    },
    {
        name: 'ЧЕМ ЗАНЯТЬСЯ',
        href: '#',
        dropdown: [
            { name: 'Активный отдых', href: '/articles/active-leisure' },
            { name: 'Пляжи', href: '/articles/beaches' },
        ],
    },
    {
        name: 'ПЛАНИРОВАНИЕ',
        href: '#',
        dropdown: [
            { name: 'Транспорт', href: '/articles/transport' },
            { name: 'Проживание', href: '/articles/accommodation' },
        ],
    },
    { name: 'О ДАЛАМАНЕ', href: '/dalaman-guide', dropdown: [] },
    { name: 'КОНТАКТЫ', href: '/contacts', dropdown: [] },
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

const Navigation = () => {
    return (
    <div className="flex flex-col items-end">
      {/* Top Nav */}
      <nav>
        <ul className="flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.name} className="relative group pb-3">
              <Link href={item.href} className="flex items-center text-sm font-semibold text-gray-700 hover:text-cyan-600">
                <span>{item.name}</span>
                {item.dropdown && item.dropdown.length > 0 && <FiChevronDown className="ml-1" size={16} />}
              </Link>
              {item.dropdown && item.dropdown.length > 0 && (
                <div className="absolute top-full left-0 pt-2 w-56 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-20">
                  {item.dropdown.map((subItem) => (
                    <a key={subItem.name} href={subItem.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {/* Bottom Nav / Cities */}
      <nav className="mt-2">
        <ul className="flex items-center space-x-5">
          {cityNavLinks.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="text-sm font-medium text-gray-500 hover:text-cyan-600">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation; 