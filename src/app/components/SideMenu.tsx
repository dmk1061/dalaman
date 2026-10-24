"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaTimes, FaBars, FaCompass, FaUmbrellaBeach, FaBookOpen, FaConciergeBell, FaRoute, FaPhoneAlt, FaChevronRight } from 'react-icons/fa';

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dicts: Record<string, any> = { ru, en, de, tr };

const cityMap: Record<string, { slug: string; name: string }[]> = {
  ru: [
    { slug: 'dacha', name: 'Датча' },
    { slug: 'marmaris', name: 'Мармарис' },
    { slug: 'koycegiz', name: 'Кёйджегиз' },
    { slug: 'dalyan', name: 'Дальян' },
    { slug: 'dalaman', name: 'Даламан' },
    { slug: 'gocek', name: 'Гёджек' },
    { slug: 'fethiye', name: 'Фетхие' },
    { slug: 'kas', name: 'Каш' },
  ],
  en: [
    { slug: 'dacha', name: 'Datça' },
    { slug: 'marmaris', name: 'Marmaris' },
    { slug: 'koycegiz', name: 'Köyceğiz' },
    { slug: 'dalyan', name: 'Dalyan' },
    { slug: 'dalaman', name: 'Dalaman' },
    { slug: 'gocek', name: 'Göcek' },
    { slug: 'fethiye', name: 'Fethiye' },
    { slug: 'kas', name: 'Kaş' },
  ],
  de: [
    { slug: 'dacha', name: 'Datça' },
    { slug: 'marmaris', name: 'Marmaris' },
    { slug: 'koycegiz', name: 'Köyceğiz' },
    { slug: 'dalyan', name: 'Dalyan' },
    { slug: 'dalaman', name: 'Dalaman' },
    { slug: 'gocek', name: 'Göcek' },
    { slug: 'fethiye', name: 'Fethiye' },
    { slug: 'kas', name: 'Kaş' },
  ],
  tr: [
    { slug: 'dacha', name: 'Datça' },
    { slug: 'marmaris', name: 'Marmaris' },
    { slug: 'koycegiz', name: 'Köyceğiz' },
    { slug: 'dalyan', name: 'Dalyan' },
    { slug: 'dalaman', name: 'Dalaman' },
    { slug: 'gocek', name: 'Göcek' },
    { slug: 'fethiye', name: 'Fethiye' },
    { slug: 'kas', name: 'Kaş' },
  ],
};

type SideMenuProps = {
  isOpen?: boolean;
  onClose?: () => void;
  locale?: string;
};

const SideMenu = ({ isOpen: controlledOpen, onClose, locale: propLocale }: SideMenuProps) => {
  const params = useParams();
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = typeof controlledOpen === 'boolean';
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const handleClose = () => {
    if (onClose) onClose();
    setInternalOpen(false);
  };

  const locale = propLocale || (params?.locale as string) || 'ru';
  const dict = dicts[locale] || dicts['ru'];
  const sm = dict.side_menu || dicts['ru'].side_menu;
  const cities = cityMap[locale] || cityMap['en'];

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  return (
    <>
      {!isControlled && (
        <button
          onClick={() => setInternalOpen(true)}
          className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 transition-colors border border-slate-200/80"
          aria-label="Open menu"
        >
          <FaBars size={18} />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-cyan-700 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold tracking-widest uppercase block text-cyan-200">DALAMAN.INFO</span>
            <h2 className="text-sm font-bold">{sm.menu_title}</h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close menu"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Cities Grid */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {locale === 'ru' ? 'Курорты побережья' : locale === 'de' ? 'Küstenstädte' : locale === 'tr' ? 'Sahil Şehirleri' : 'Coastal Resorts'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={localize(`/${c.slug}`)}
                  onClick={handleClose}
                  className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 text-xs font-bold border border-slate-200/60 transition-colors flex items-center justify-between"
                >
                  <span>{c.name}</span>
                  <FaChevronRight size={9} className="text-slate-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Main Navigation */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {locale === 'ru' ? 'Разделы портала' : 'Navigation'}
            </div>
            <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl overflow-hidden">
              <MenuItem icon={<FaCompass className="text-cyan-600" />} title={sm.home} href={localize('/')} onClose={handleClose} />
              <MenuItem icon={<FaUmbrellaBeach className="text-amber-500" />} title={dict.header?.nav?.best_beaches || 'Пляжи'} href={localize('/beaches')} onClose={handleClose} />
              <MenuItem icon={<FaRoute className="text-emerald-600" />} title={locale === 'ru' ? 'Маршруты и Атлас троп' : 'Routes & Trails'} href={localize('/routes')} onClose={handleClose} />
              <MenuItem icon={<FaBookOpen className="text-indigo-500" />} title={sm.articles} href={localize('/articles')} onClose={handleClose} />
              <MenuItem icon={<FaConciergeBell className="text-sky-600" />} title={sm.services} href={localize('/services')} onClose={handleClose} />
              <MenuItem icon={<FaPhoneAlt className="text-rose-500" />} title={sm.contacts} href={localize('/articles/useful-contacts')} onClose={handleClose} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ icon, title, href, onClose }: { icon: React.ReactNode; title: string; href: string; onClose: () => void }) => (
  <Link
    href={href}
    onClick={onClose}
    className="flex items-center justify-between px-4 py-3.5 bg-white hover:bg-slate-50 transition-colors"
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-xs font-bold text-slate-700">{title}</span>
    </div>
    <FaChevronRight size={10} className="text-slate-300" />
  </Link>
);

export default SideMenu;
