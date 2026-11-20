"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaCarSide, FaAnchor, FaUmbrellaBeach, FaCompass } from 'react-icons/fa';

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dicts: Record<string, any> = { ru, en, de, tr };

const FloatingMenu = () => {
  const params = useParams();
  const locale = (params?.locale as string) || 'ru';
  const dict = dicts[locale] || dicts['ru'];
  const fm = dict.floating_menu || dicts['ru'].floating_menu;

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const items = [
    { href: localize('/services/transfers'), icon: <FaCarSide size={18} />, label: fm.transfer },
    { href: localize('/services/yacht-rental'), icon: <FaAnchor size={18} />, label: fm.yachts },
    { href: localize('/beaches'), icon: <FaUmbrellaBeach size={18} />, label: fm.beaches },
    { href: localize('/services/excursions-tours'), icon: <FaCompass size={18} />, label: fm.tours },
  ];

  return (
    /* Mobile & Tablet App Bottom Tab Bar (Hidden on Desktop so it doesn't duplicate main navigation) */
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg px-2 py-1.5">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-600 hover:text-cyan-700 active:bg-cyan-50 transition-colors"
          >
            <span className="text-cyan-600 mb-0.5">{item.icon}</span>
            <span className="text-[10px] font-bold leading-tight truncate max-w-full">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FloatingMenu;
