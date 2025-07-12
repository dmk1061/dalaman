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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-cyan-600 text-white px-4 py-3">
            <h3 className="font-bold text-lg">Транспорт</h3>
        </div>
        <div className="p-4">
            <ul className="space-y-3">
                {transportLinks.map((link) => (
                    <li key={link.title}>
                        <Link href={link.href} className="flex items-center space-x-3 group text-gray-700 hover:text-cyan-600">
                            <span className="text-cyan-600">{link.icon}</span>
                            <span className="font-medium text-sm group-hover:underline">{link.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const InfrastructurePanel = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-cyan-600 text-white px-4 py-3">
            <h3 className="font-bold text-lg">Инфраструктура</h3>
        </div>
        <div className="p-4">
            <ul className="space-y-3">
                {infrastructureLinks.map((link) => (
                    <li key={link.title}>
                        <Link href={link.href} className="flex items-center space-x-3 group text-gray-700 hover:text-cyan-600">
                            <span className="text-cyan-600">{link.icon}</span>
                            <span className="font-medium text-sm group-hover:underline">{link.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const AdBlock = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-cyan-600 text-white px-4 py-3">
            <h3 className="font-bold text-lg">Рекламный блок</h3>
        </div>
        <div className="p-4">
            <div className="relative h-32 mb-4">
                <Image src="/dalaman1.jpg" layout="fill" objectFit="cover" alt="Dalaman ad" className="rounded-md" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <p className="text-white font-semibold text-center">Найти лучшие цены на перелет</p>
                </div>
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Поиск билетов
            </button>
        </div>
    </div>
);


const LeftSidebar = () => {
    return (
        <div className="space-y-8">
            <TransportPanel />
            <InfrastructurePanel />
            <AdBlock />
        </div>
    );
};

export default LeftSidebar; 