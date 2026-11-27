"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FaTimes,
  FaBars,
  FaCompass,
  FaUmbrellaBeach,
  FaBookOpen,
  FaConciergeBell,
  FaRoute,
  FaPlaneArrival,
  FaMapMarkedAlt,
  FaChevronRight,
  FaFish,
  FaPaperPlane,
  FaWind,
  FaHotTub,
  FaShoppingBag,
  FaUtensils,
  FaChild,
  FaCocktail,
  FaLandmark,
  FaTree,
} from 'react-icons/fa';
import LivePortalInformers from './LivePortalInformers';

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dicts: Record<string, any> = { ru, en, de, tr };

const cityMap: Record<string, { slug: string; name: string; isGateway?: boolean }[]> = {
  ru: [
    { slug: 'dalaman', name: '✈️ Даламан', isGateway: true },
    { slug: 'fethiye', name: 'Фетхие' },
    { slug: 'marmaris', name: 'Мармарис' },
    { slug: 'kas', name: 'Каш' },
    { slug: 'dalyan', name: 'Дальян' },
    { slug: 'gocek', name: 'Гёджек' },
    { slug: 'dacha', name: 'Датча' },
    { slug: 'koycegiz', name: 'Кёйджегиз' },
  ],
  en: [
    { slug: 'dalaman', name: '✈️ Dalaman', isGateway: true },
    { slug: 'fethiye', name: 'Fethiye' },
    { slug: 'marmaris', name: 'Marmaris' },
    { slug: 'kas', name: 'Kaş' },
    { slug: 'dalyan', name: 'Dalyan' },
    { slug: 'gocek', name: 'Göcek' },
    { slug: 'dacha', name: 'Datça' },
    { slug: 'koycegiz', name: 'Köyceğiz' },
  ],
  de: [
    { slug: 'dalaman', name: '✈️ Dalaman', isGateway: true },
    { slug: 'fethiye', name: 'Fethiye' },
    { slug: 'marmaris', name: 'Marmaris' },
    { slug: 'kas', name: 'Kaş' },
    { slug: 'dalyan', name: 'Dalyan' },
    { slug: 'gocek', name: 'Göcek' },
    { slug: 'dacha', name: 'Datça' },
    { slug: 'koycegiz', name: 'Köyceğiz' },
  ],
  tr: [
    { slug: 'dalaman', name: '✈️ Dalaman', isGateway: true },
    { slug: 'fethiye', name: 'Fethiye' },
    { slug: 'marmaris', name: 'Marmaris' },
    { slug: 'kas', name: 'Kaş' },
    { slug: 'dalyan', name: 'Dalyan' },
    { slug: 'gocek', name: 'Göcek' },
    { slug: 'dacha', name: 'Datça' },
    { slug: 'koycegiz', name: 'Köyceğiz' },
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
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Live Weather & Currency Informers */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {locale === 'ru' ? 'Погода и курс лиры' : locale === 'de' ? 'Wetter & Wechselkurs' : locale === 'tr' ? 'Hava Durumu & Kur' : 'Live Weather & TRY Rate'}
            </div>
            <LivePortalInformers locale={locale} variant="drawer" />
          </div>

          {/* Cities Grid */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {locale === 'ru' ? 'Курорты побережья' : locale === 'de' ? 'Küstenstädte' : locale === 'tr' ? 'Sahil Şehirleri' : 'Coastal Resorts'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={localize(`/${c.slug}`)}
                  onClick={handleClose}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-between ${
                    c.isGateway
                      ? 'bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700'
                      : 'bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 border-slate-200/60'
                  }`}
                >
                  <span>{c.name}</span>
                  <FaChevronRight size={9} className={c.isGateway ? 'text-cyan-200' : 'text-slate-300'} />
                </Link>
              ))}
            </div>
            <Link
              href={localize('/city-guide')}
              onClick={handleClose}
              className="mt-2.5 w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200/80 text-xs font-bold transition-colors"
            >
              <span>
                {locale === 'ru'
                  ? 'Сравнить все 8 курортов'
                  : locale === 'de'
                  ? 'Alle 8 Orte vergleichen'
                  : locale === 'tr'
                  ? '8 Bölgeyi Karşılaştır'
                  : 'Compare All 8 Resorts'}
              </span>
              <FaChevronRight size={10} className="text-cyan-600" />
            </Link>
          </div>

          {/* Main Navigation */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {locale === 'ru' ? 'Разделы путеводителя' : 'Guide Navigation'}
            </div>
            <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl overflow-hidden">
              <MenuItem icon={<FaCompass className="text-cyan-600" />} title={sm.home} href={localize('/')} onClose={handleClose} />
              <MenuItem
                icon={<FaPlaneArrival className="text-sky-600" />}
                title={locale === 'ru' ? 'ПРИЛЁТ В ДАЛАМАН (DLM)' : 'DALAMAN AIRPORT (DLM)'}
                href={localize('/articles/airport-dalaman')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaMapMarkedAlt className="text-teal-600" />}
                title={locale === 'ru' ? 'ИНТЕРАКТИВНАЯ КАРТА' : 'INTERACTIVE MAP'}
                href={localize('/map')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaUmbrellaBeach className="text-amber-500" />}
                title={locale === 'ru' ? 'ЛУЧШИЕ ПЛЯЖИ И БУХТЫ' : 'BEST BEACHES & BAYS'}
                href={localize('/beaches')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaLandmark className="text-amber-600" />}
                title={
                  locale === 'ru'
                    ? 'АНТИЧНЫЕ ГОРОДА (ЛИКИЯ И КАРИЯ)'
                    : locale === 'de'
                    ? 'ANTIKE STÄDTE (LYKIEN & KARIEN)'
                    : locale === 'tr'
                    ? 'ANTİK KENTLER (LİKYA & KARYA)'
                    : 'ANCIENT CITIES (LYCIA & CARIA)'
                }
                href={localize('/ancient-cities')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaTree className="text-emerald-600" />}
                title={
                  locale === 'ru'
                    ? 'ПРИРОДА И НАЦПАРКИ'
                    : locale === 'de'
                    ? 'NATUR & NATIONALPARKS'
                    : locale === 'tr'
                    ? 'DOĞA VE MİLLÎ PARKLAR'
                    : 'NATURE & NATIONAL PARKS'
                }
                href={localize('/nature-parks')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaRoute className="text-emerald-600" />}
                title={locale === 'ru' ? 'МАРШРУТЫ И АТЛАС ТРОП' : 'ROUTES & TRAILS'}
                href={localize('/routes')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaFish className="text-cyan-600" />}
                title={
                  locale === 'ru'
                    ? 'ДАЙВИНГ И РЫБАЛКА'
                    : locale === 'de'
                    ? 'TAUCHEN & ANGELN'
                    : locale === 'tr'
                    ? 'DALIŞ VE BALIKÇILIK'
                    : 'DIVING & FISHING'
                }
                href={localize('/diving-fishing')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaPaperPlane className="text-sky-600" />}
                title={
                  locale === 'ru'
                    ? 'ПАРАГЛАЙДИНГ (БАБАДАГ)'
                    : locale === 'de'
                    ? 'PARAGLIDING (BABADAĞ)'
                    : locale === 'tr'
                    ? 'YAMAÇ PARAŞÜTÜ (BABADAĞ)'
                    : 'PARAGLIDING (BABADAĞ)'
                }
                href={localize('/paragliding')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaWind className="text-cyan-500" />}
                title={
                  locale === 'ru'
                    ? 'КАЙТ И ВИНДСЁРФИНГ'
                    : locale === 'de'
                    ? 'KITE & WINDSURFEN'
                    : locale === 'tr'
                    ? 'KITE & RÜZGAR SÖRFÜ'
                    : 'KITE & WINDSURFING'
                }
                href={localize('/kitesurfing')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaHotTub className="text-orange-500" />}
                title={
                  locale === 'ru'
                    ? 'ТЕРМЫ И ХАММАМЫ'
                    : locale === 'de'
                    ? 'THERMEN & HAMAMS'
                    : locale === 'tr'
                    ? 'KAPLICALAR & HAMAMLAR'
                    : 'HOT SPRINGS & HAMMAMS'
                }
                href={localize('/thermal-spa')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaShoppingBag className="text-amber-500" />}
                title={
                  locale === 'ru'
                    ? 'РЫНКИ, БАЗАРЫ И РЕМЁСЛА'
                    : locale === 'de'
                    ? 'MÄRKTE & HANDWERK'
                    : locale === 'tr'
                    ? 'PAZARLAR & EL SANATLARI'
                    : 'MARKETS & CRAFTS'
                }
                href={localize('/markets-crafts')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaUtensils className="text-rose-500" />}
                title={
                  locale === 'ru'
                    ? 'ГАСТРОНОМИЯ И КУХНЯ'
                    : locale === 'de'
                    ? 'GASTRONOMIE & KÜCHE'
                    : locale === 'tr'
                    ? 'GASTRONOMİ VE MUTFAK'
                    : 'GASTRONOMY & CUISINE'
                }
                href={localize('/gastronomy')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaChild className="text-blue-500" />}
                title={
                  locale === 'ru'
                    ? 'СЕМЕЙНЫЙ ОТДЫХ С ДЕТЬМИ'
                    : locale === 'de'
                    ? 'FAMILIENURLAUB MIT KINDERN'
                    : locale === 'tr'
                    ? 'ÇOCUKLARLA AİLE TATİLİ'
                    : 'FAMILY VACATION WITH KIDS'
                }
                href={localize('/family')}
                onClose={handleClose}
              />
              <MenuItem
                icon={<FaCocktail className="text-rose-500" />}
                title={
                  locale === 'ru'
                    ? 'ВЕЧЕРНЯЯ ЖИЗНЬ И ФЕСТИВАЛИ'
                    : locale === 'de'
                    ? 'NACHTLEBEN & FESTIVALS'
                    : locale === 'tr'
                    ? 'GECE HAYATI & FESTİVALLER'
                    : 'NIGHTLIFE & FESTIVALS'
                }
                href={localize('/nightlife')}
                onClose={handleClose}
              />
              <MenuItem icon={<FaBookOpen className="text-indigo-500" />} title={sm.articles} href={localize('/articles')} onClose={handleClose} />
              <MenuItem icon={<FaConciergeBell className="text-cyan-600" />} title={sm.services} href={localize('/services')} onClose={handleClose} />
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
    className="flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 transition-colors"
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-xs font-bold text-slate-700">{title}</span>
    </div>
    <FaChevronRight size={10} className="text-slate-300" />
  </Link>
);

export default SideMenu;
