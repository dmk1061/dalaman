"use client";

import React, { useEffect, useState } from 'react';
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
    const locale = (params?.locale as string) || 'en';
    const dict = dicts[locale] || dicts['en'];
    const fm = dict.floating_menu || dicts['en'].floating_menu;

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${locale}${cleanPath}`;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 hidden md:block">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 p-2 premium-shadow">
                <div className="flex space-x-2">
                    <FloatingMenuItem 
                        href={localize("/services/transfers")}
                        icon={<FaCarSide size={20} />}
                        label={fm.transfer}
                        sublabel={fm.transfer_sub}
                    />
                    <FloatingMenuItem 
                        href={localize("/services/yacht-rental")}
                        icon={<FaAnchor size={20} />}
                        label={fm.yachts}
                        sublabel={fm.yachts_sub}
                    />
                    <FloatingMenuItem 
                        href={localize("/beaches")}
                        icon={<FaUmbrellaBeach size={20} />}
                        label={fm.beaches}
                        sublabel={fm.beaches_sub}
                    />
                    <FloatingMenuItem 
                        href={localize("/services/excursions-tours")}
                        icon={<FaCompass size={20} />}
                        label={fm.tours}
                        sublabel={fm.tours_sub}
                    />
                </div>
            </div>
        </div>
    );
};

const FloatingMenuItem = ({ href, icon, label, sublabel }: { href: string, icon: React.ReactNode, label: string, sublabel: string }) => {
    return (
        <Link href={href} className="flex items-center space-x-3 py-2 px-3.5 rounded-xl hover:bg-cyan-50/80 text-gray-700 hover:text-cyan-700 transition-all duration-200 group">
            <div className="text-cyan-600 group-hover:scale-110 transition-transform duration-200">
                {icon}
            </div>
            <div>
                <div className="text-xs font-bold leading-tight">{label}</div>
                <div className="text-[10px] text-gray-400 group-hover:text-cyan-600/80 font-medium leading-tight">{sublabel}</div>
            </div>
        </Link>
    );
};

export default FloatingMenu;
