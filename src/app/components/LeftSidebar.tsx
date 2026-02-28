import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlane, FaBus, FaTaxi, FaCarSide, FaUsers, FaHospital, FaBalanceScale } from 'react-icons/fa';

const transportLinks = [
    { title: 'Аэропорт Даламана', href: '/articles/4_aeroport_dalaman_i_aviasoobshchenie', icon: <FaPlane /> },
    { title: 'Междугородние автобусы', href: '/articles/5_transportnaya_sistema_regiona', icon: <FaBus /> },
    { title: 'Городской Транспорт', href: '/articles/5_transportnaya_sistema_regiona', icon: <FaTaxi /> },
    { title: 'Трансфер', href: '#', icon: <FaCarSide /> },
    { title: 'Попутчики', href: '#', icon: <FaUsers /> },
];

const infrastructureLinks = [
    { title: 'Больницы', href: '#', icon: <FaHospital /> },
    { title: 'Полиция', href: '#', icon: <FaBalanceScale /> },
];

const TransportPanel = () => (
    <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
        <div className="bg-cyan-600 text-white px-6 py-4">
            <h3 className="font-black text-sm uppercase tracking-widest italic">Транспорт</h3>
        </div>
        <div className="p-6">
            <ul className="space-y-4">
                {transportLinks.map((link) => (
                    <li key={link.title}>
                        <Link href={link.href} className="flex items-center space-x-4 group text-slate-700 hover:text-cyan-600 transition-colors">
                            <span className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all">{link.icon}</span>
                            <span className="font-bold text-[13px] group-hover:underline italic">{link.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const InfrastructurePanel = () => (
    <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
        <div className="bg-cyan-600 text-white px-6 py-4">
            <h3 className="font-black text-sm uppercase tracking-widest italic">Инфраструктура</h3>
        </div>
        <div className="p-6">
            <ul className="space-y-4">
                {infrastructureLinks.map((link) => (
                    <li key={link.title}>
                        <Link href={link.href} className="flex items-center space-x-4 group text-slate-700 hover:text-cyan-600 transition-colors">
                            <span className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all">{link.icon}</span>
                            <span className="font-bold text-[13px] group-hover:underline italic">{link.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const AdBlock = () => (
    <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
        <div className="bg-cyan-600 text-white px-6 py-4">
            <h3 className="font-black text-sm uppercase tracking-widest italic">Авиабилеты</h3>
        </div>
        <div className="p-6">
            <div className="relative h-40 mb-6 group/ad overflow-hidden rounded-2xl">
                <Image src="/dalaman1.jpg" layout="fill" objectFit="cover" alt="Dalaman ad" className="group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 to-transparent flex flex-col justify-end p-4">
                    <p className="text-white text-xs font-black uppercase tracking-widest mb-1">Лучшие цены</p>
                    <p className="text-white/80 text-[10px] italic">Прямые рейсы в Даламан</p>
                </div>
            </div>
            <button className="w-full bg-cyan-500 text-white font-black text-[11px] uppercase tracking-widest py-3 rounded-xl hover:bg-cyan-600 transition-all shadow-lg active:scale-95">
                Найти билет
            </button>
        </div>
    </div>
);


const LeftSidebar = () => {
    return (
        <div className="space-y-10">
            <TransportPanel />
            <InfrastructurePanel />
            <AdBlock />
        </div>
    );
};

export default LeftSidebar;
