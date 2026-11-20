import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/dictionary';

type SidebarProps = {
  locale?: string;
};

const Sidebar = async ({ locale = 'ru' }: SidebarProps) => {
  const dict = await getDictionary(locale as Locale);

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const dayPlanItems = [
    {
      title: dict.sidebar.item_kaputas,
      image: '/api/images/locations/kas/beach/kaputas/kaputas.jpg',
      href: '/kas/beach/kaputas',
    },
    {
      title: dict.sidebar.item_lycian_way,
      image: '/api/images/locations/fethiye/todo/babadag/babadag.jpg',
      href: '/routes/trekking',
    },
    {
      title: dict.sidebar.item_kekova,
      image: '/api/images/locations/kas/ruines/kekova/kekova.jpg',
      href: '/kas/sight/kekova',
    },
    {
      title: dict.sidebar.item_oludeniz,
      image: '/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg',
      href: '/fethiye/beach/bluelagoon',
    },
    {
      title: dict.sidebar.item_dalyan,
      image: '/api/images/locations/dalyan/ruine/LycianTombs/lyciantombs.jpg',
      href: '/articles/dalyan-guide',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Day Planner with 100% Authentic Location Photos */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
        <div className="bg-cyan-600 text-white px-5 py-3.5">
          <h3 className="font-bold text-xs uppercase tracking-wider">{dict.sidebar.plan_day}</h3>
        </div>
        <div className="p-5 space-y-4">
          {dayPlanItems.map((item) => (
            <ArticleItem
              key={item.title}
              title={item.title}
              image={item.image}
              href={localize(item.href)}
            />
          ))}
        </div>
      </div>

      {/* Ready Travel Plans with Authentic Butterfly Valley Photo */}
      <div className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
        <div className="bg-cyan-600 text-white px-5 py-3.5">
          <h3 className="font-bold text-xs uppercase tracking-wider">{dict.sidebar.routes}</h3>
        </div>
        <div className="relative h-52 overflow-hidden">
          <Image
            src="/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg"
            alt={dict.sidebar.routes}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/25 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <p className="text-white text-sm font-semibold mb-3.5 leading-snug">{dict.sidebar.scenarios_subtitle}</p>
            <Link
              href={localize('/routes')}
              className="w-full text-center block bg-cyan-500 text-white py-2.5 rounded-xl hover:bg-cyan-600 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              {dict.sidebar.view_all}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleItem = ({ title, image, href }: { title: string; image: string; href: string }) => (
  <Link href={href || '#'} className="flex items-center space-x-3.5 group">
    <div className="flex-shrink-0 relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200/80">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug group-hover:text-cyan-600 transition-colors">
        {title}
      </h4>
    </div>
  </Link>
);

export default Sidebar;
