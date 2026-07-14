import React from 'react';
import Link from 'next/link';
import { FaCarSide, FaAnchor, FaUmbrellaBeach, FaCompass, FaCalendarAlt } from 'react-icons/fa';

const FloatingMenu = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50 hidden md:block">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 p-2 premium-shadow">
                <div className="flex space-x-2">
                    <FloatingMenuItem 
                        href="/services/transfers"
                        icon={<FaCarSide size={20} />}
                        label="Трансфер"
                        sublabel="Из аэропорта DLM"
                    />
                    <FloatingMenuItem 
                        href="/services/yacht-rental"
                        icon={<FaAnchor size={20} />}
                        label="Аренда яхт"
                        sublabel="Морские прогулки"
                    />
                    <FloatingMenuItem 
                        href="/beaches"
                        icon={<FaUmbrellaBeach size={20} />}
                        label="Пляжи"
                        sublabel="Лучшие бухты"
                    />
                    <FloatingMenuItem 
                        href="/services/excursions-tours"
                        icon={<FaCompass size={20} />}
                        label="Экскурсии"
                        sublabel="Туры по Ликии"
                    />
                    <FloatingMenuItem 
                        href="/articles/24_sobytiya_festivali_i_prazdniki"
                        icon={<FaCalendarAlt size={20} />}
                        label="События"
                        sublabel="Фестивали и праздники"
                    />
                </div>
            </div>
        </div>
    );
};

const FloatingMenuItem = ({ href, icon, label, sublabel }: { href: string, icon: React.ReactNode, label: string, sublabel: string }) => (
    <Link href={href} className="flex flex-col items-center p-3 hover:bg-cyan-50 rounded-xl cursor-pointer transition-all duration-200 min-w-[90px] group">
        <div className="text-cyan-600 mb-2 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div className="text-center">
            <div className="text-xs font-black text-slate-800 leading-tight group-hover:text-cyan-700 transition-colors">
                {label}
            </div>
            <div className="text-[10px] font-medium text-slate-500 mt-1 leading-tight">
                {sublabel}
            </div>
        </div>
    </Link>
);

export default FloatingMenu; 