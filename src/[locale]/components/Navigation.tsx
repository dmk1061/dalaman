'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaChevronDown } from 'react-icons/fa';

const Navigation = () => {
  const t = useTranslations('navigation');
  
  const navItems = [
    { href: '/about', label: t('about'), dropdown: true },
    { href: '/dalaman', label: t('dalaman'), dropdown: true },
    { href: '/news', label: t('news') },
    { href: '/projects', label: t('projects'), dropdown: true },
    { href: '/city-guide', label: t('city_guide'), dropdown: true },
    { href: '/services', label: t('services'), dropdown: true },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav>
      <ul className="flex items-center space-x-8">
        {navItems.map((item) => (
          <li key={item.href} className="flex items-center">
            <Link href={item.href}>
              <span className="text-gray-700 uppercase tracking-wider font-bold text-sm hover:text-blue-600 transition-colors duration-300 cursor-pointer">{item.label}</span>
            </Link>
            {item.dropdown && <FaChevronDown className="ml-2 text-xs text-gray-500" />}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation; 