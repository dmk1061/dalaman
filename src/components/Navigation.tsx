import React from 'react';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/articles', label: 'Статьи' },
  { href: '/excursions', label: 'Экскурсии' },
  { href: '/about', label: 'О проекте' },
  { href: '/contact', label: 'Контакты' },
];

const Navigation = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <span className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation; 