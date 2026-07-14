import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlane, FaBus, FaTaxi, FaCarSide, FaUsers, FaPassport, FaAddressBook, FaSun } from 'react-icons/fa';
import { getDictionary, Locale } from '@/lib/dictionary';

type LeftSidebarProps = {
  locale?: string;
};

const LeftSidebar = async ({ locale = 'en' }: LeftSidebarProps) => {
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
        { title: dict.left_sidebar.companions, href: '#', icon: <FaUsers /> },
    ];

    const usefulInfoLinks = [
        { title: dict.header?.nav?.useful_contacts || (locale === 'ru' ? 'Справка и дежурные аптеки' : 'Useful Contacts & Pharmacies'), href: '/articles/useful-contacts', icon: <FaAddressBook /> },
        { title: dict.header?.nav?.residency || (locale === 'ru' ? 'Виза и ВНЖ в Турции' : 'Residency & Visa Rules'), href: '/articles/residency-permit', icon: <FaPassport /> },
        { title: dict.header?.nav?.climate_and_seasons || (locale === 'ru' ? 'Погода и сезоны' : 'Climate & Seasons'), href: '/articles/climate-and-seasons', icon: <FaSun /> },
    ];

    return (
        <div className="space-y-10">
            {/* Transport Panel */}
            <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                <div className="bg-cyan-600 text-white px-6 py-4">
                    <h3 className="font-black text-sm uppercase tracking-widest italic">{dict.left_sidebar.transport}</h3>
                </div>
                <div className="p-6">
                    <ul className="space-y-4">
                        {transportLinks.map((link) => (
                            <li key={link.title}>
                                <Link href={localize(link.href)} className="flex items-center space-x-4 group text-slate-700 hover:text-cyan-600 transition-colors">
                                    <span className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all">{link.icon}</span>
                                    <span className="font-bold text-[13px] group-hover:underline italic">{link.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Useful Guides Panel (Instead of Alarmist Infrastructure) */}
            <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                <div className="bg-cyan-600 text-white px-6 py-4">
                    <h3 className="font-black text-sm uppercase tracking-widest italic">{dict.header?.nav?.preparation || (locale === 'ru' ? 'Полезно знать' : 'Traveler Info')}</h3>
                </div>
                <div className="p-6">
                    <ul className="space-y-4">
                        {usefulInfoLinks.map((link) => (
                            <li key={link.title}>
                                <Link href={localize(link.href)} className="flex items-center space-x-4 group text-slate-700 hover:text-cyan-600 transition-colors">
                                    <span className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all">{link.icon}</span>
                                    <span className="font-bold text-[13px] group-hover:underline italic">{link.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Ad Block */}
            <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                <div className="bg-cyan-600 text-white px-6 py-4">
                    <h3 className="font-black text-sm uppercase tracking-widest italic">{dict.left_sidebar.flights}</h3>
                </div>
                <div className="p-6">
                    <div className="relative h-40 mb-6 group/ad overflow-hidden rounded-2xl">
                        <Image src="/dalaman1.jpg" layout="fill" objectFit="cover" alt="Dalaman ad" className="group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 to-transparent flex flex-col justify-end p-4">
                            <p className="text-white text-xs font-black uppercase tracking-widest mb-1">{dict.left_sidebar.best_prices}</p>
                            <p className="text-white/80 text-[10px] italic">{dict.left_sidebar.direct_flights}</p>
                        </div>
                    </div>
                    <button className="w-full bg-cyan-500 text-white font-black text-[11px] uppercase tracking-widest py-3 rounded-xl hover:bg-cyan-600 transition-all shadow-lg active:scale-95">
                        {dict.left_sidebar.find_ticket}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;
