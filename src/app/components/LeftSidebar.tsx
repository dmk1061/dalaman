import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlane, FaBus, FaTaxi, FaCarSide, FaUsers, FaPassport, FaAddressBook, FaSun } from 'react-icons/fa';
import { getDictionary, Locale } from '@/lib/dictionary';
import VisitorAnalyticsWidget from '@/app/components/VisitorAnalyticsWidget';

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
        { title: locale === 'ru' ? '🧭 Интерактивный Атлас Троп' : locale === 'de' ? '🧭 Interaktiver Wanderatlas' : locale === 'tr' ? '🧭 İnteraktif Rota Atlası' : '🧭 Interactive Trekking Atlas', href: '/routes/trekking', icon: <span className="text-emerald-500 font-bold">🥾</span> },
        { title: locale === 'ru' ? '🗓️ Сценарии 48ч Уикендов' : locale === 'de' ? '🗓️ 48-Stunden-Wochenenden' : locale === 'tr' ? '🗓️ 48 Saatlik Hafta Sonu' : '🗓️ 48-Hour Weekend Guides', href: '/routes/weekends', icon: <span className="text-indigo-500 font-bold">🍷</span> },
        { title: locale === 'ru' ? '⛵ Аренда Яхт и Гулет' : locale === 'de' ? '⛵ Jacht- & Bootcharter' : locale === 'tr' ? '⛵ Kiralık Tekne ve Yatlar' : '⛵ Yacht & Gulet Charter', href: '/services/yacht-rental', icon: <span className="text-cyan-500 font-bold">⚓</span> },
        { title: locale === 'ru' ? '🏝️ Секретные Бухты и Пляжи' : locale === 'de' ? '🏝️ Geheime Buchten & Strände' : locale === 'tr' ? '🏝️ Gizli Koylar ve Plajlar' : '🏝️ Secret Bays & Beaches', href: '/beaches', icon: <FaSun className="text-amber-500" /> },
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

            {/* Interactive & Revenue Services Panel */}
            <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                <div className="bg-gradient-to-r from-slate-900 to-cyan-900 text-white px-6 py-4">
                    <h3 className="font-black text-sm uppercase tracking-widest italic">
                        {locale === 'ru' ? '🔥 Главные Сервисы' : locale === 'de' ? '🔥 Top-Services & Guides' : locale === 'tr' ? '🔥 Öne Çıkan Rehberler' : '🔥 Top Interactive Guides'}
                    </h3>
                </div>
                <div className="p-6">
                    <ul className="space-y-4">
                        {interactiveServicesLinks.map((link) => (
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

            {/* Live Telemetry Pulse Widget */}
            <div className="w-full">
                <VisitorAnalyticsWidget variant="sidebar" locale={locale} />
            </div>

            {/* Ad Block */}
            <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                <div className="bg-cyan-600 text-white px-6 py-4">
                    <h3 className="font-black text-sm uppercase tracking-widest italic">{dict.left_sidebar.flights}</h3>
                </div>
                <div className="p-6">
                    <div className="relative h-40 mb-6 group/ad overflow-hidden rounded-2xl">
                        <Image src="/dalaman1.jpg" layout="fill" objectFit="cover" alt="Dalaman ad" className="group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded border border-white/20 z-10 tracking-wider uppercase">
                            {locale === 'ru' ? 'AI Placeholder / Сгенерировано ИИ' : 'AI Placeholder'}
                        </div>
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
