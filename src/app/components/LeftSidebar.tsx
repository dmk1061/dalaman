import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlane, FaBus, FaTaxi, FaCarSide, FaUsers, FaSun } from 'react-icons/fa';
import { getDictionary, Locale } from '@/lib/dictionary';

type LeftSidebarProps = {
  locale?: string;
};

const LeftSidebar = async ({ locale = 'ru' }: LeftSidebarProps) => {
    const dict = await getDictionary(locale as Locale);

    const localize = (path: string) => {
      if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `/${locale}${cleanPath}`;
    };

    const transportLinks = [
        { title: dict.left_sidebar.airport_dalaman, href: '/articles/airport-dalaman', icon: <FaPlane /> },
        { title: dict.left_sidebar.intercity_bus, href: '/articles/transport', icon: <FaBus /> },
        { title: dict.left_sidebar.city_transport, href: '/articles/transport', icon: <FaTaxi /> },
        { title: dict.left_sidebar.transfer, href: '/services/transfers', icon: <FaCarSide /> },
        { title: dict.left_sidebar.companions, href: '/articles/guides-and-travel-agencies', icon: <FaUsers /> },
    ];

    const interactiveServicesLinks = [
        { title: locale === 'ru' ? 'Авиабилеты и чартеры' : locale === 'de' ? 'Flüge & Direktcharter' : locale === 'tr' ? 'Uçak Bileti & Çarter' : 'Flights & Direct Charters', href: '/services/flights', icon: <span>🛫</span> },
        { title: locale === 'ru' ? 'Интерактивный атлас троп' : locale === 'de' ? 'Interaktiver Wanderatlas' : locale === 'tr' ? 'İnteraktif Rota Atlası' : 'Interactive Trekking Atlas', href: '/routes/trekking', icon: <span>🥾</span> },
        { title: locale === 'ru' ? 'Сценарии 48ч уикендов' : locale === 'de' ? '48-Stunden-Wochenenden' : locale === 'tr' ? '48 Saatlik Hafta Sonu' : '48-Hour Weekend Guides', href: '/routes/weekends', icon: <span>🍷</span> },
        { title: locale === 'ru' ? 'Аренда яхт и гулет' : locale === 'de' ? 'Jacht- & Bootcharter' : locale === 'tr' ? 'Kiralık Tekne ve Yatlar' : 'Yacht & Gulet Charter', href: '/services/yacht-rental', icon: <span>⚓</span> },
        { title: locale === 'ru' ? 'Секретные бухты и пляжи' : locale === 'de' ? 'Geheime Buchten & Strände' : locale === 'tr' ? 'Gizli Koylar ve Plajlar' : 'Secret Bays & Beaches', href: '/beaches', icon: <FaSun className="text-amber-500" /> },
    ];

    return (
        <div className="space-y-6">
            {/* Transport Panel */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
                <div className="bg-cyan-600 text-white px-5 py-3.5">
                    <h3 className="font-bold text-xs uppercase tracking-wider">{dict.left_sidebar.transport}</h3>
                </div>
                <div className="p-5">
                    <ul className="space-y-3">
                        {transportLinks.map((link) => (
                            <li key={link.title}>
                                <Link
                                    href={localize(link.href)}
                                    className="flex items-center space-x-3 text-slate-700 hover:text-cyan-600 transition-colors font-medium text-sm group"
                                >
                                    <span className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors text-xs">
                                        {link.icon}
                                    </span>
                                    <span className="leading-snug">{link.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Interactive Services & Guides Panel */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
                <div className="bg-cyan-600 text-white px-5 py-3.5">
                    <h3 className="font-bold text-xs uppercase tracking-wider">
                        {locale === 'ru' ? 'Умные сервисы' : locale === 'de' ? 'Smart-Services' : locale === 'tr' ? 'Akıllı Servisler' : 'Smart Hubs & Guides'}
                    </h3>
                </div>
                <div className="p-5">
                    <ul className="space-y-3">
                        {interactiveServicesLinks.map((link) => (
                            <li key={link.title}>
                                <Link
                                    href={localize(link.href)}
                                    className="flex items-center space-x-3 group text-slate-700 hover:text-cyan-600 transition-colors"
                                >
                                    <span className="w-7 h-7 flex items-center justify-center bg-slate-100 rounded-lg text-sm flex-shrink-0 group-hover:bg-cyan-50 transition-colors">
                                        {link.icon}
                                    </span>
                                    <span className="font-medium text-sm leading-snug group-hover:text-cyan-600 transition-colors">
                                        {link.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Flights Promo Block */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/70">
                <div className="bg-cyan-600 text-white px-5 py-3.5">
                    <h3 className="font-bold text-xs uppercase tracking-wider">{dict.left_sidebar.flights}</h3>
                </div>
                <div className="p-5">
                    <div className="relative h-36 mb-4 group/ad overflow-hidden rounded-xl">
                        <Image
                            src="/dalaman1.jpg"
                            fill
                            alt="Dalaman flights"
                            className="object-cover group-hover/ad:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent flex flex-col justify-end p-3.5">
                            <p className="text-white text-xs font-bold uppercase tracking-wider mb-0.5">{dict.left_sidebar.best_prices}</p>
                            <p className="text-white/80 text-[11px]">{dict.left_sidebar.direct_flights}</p>
                        </div>
                    </div>
                    <Link
                        href={localize('/services/flights')}
                        className="w-full block text-center bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl hover:bg-cyan-700 transition-all shadow-sm"
                    >
                        {dict.left_sidebar.find_ticket}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;
