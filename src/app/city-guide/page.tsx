import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CityGuidePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="text-cyan-600 font-semibold">МЕСТА ДЛЯ ПОСЕЩЕНИЯ</span>
                            <span>&gt;</span>
                            <Link href="/" className="text-gray-500 hover:text-cyan-600">ГЛАВНАЯ</Link>
                            <span>&gt;</span>
                            <span className="text-gray-800">МЕСТА ДЛЯ ПОСЕЩЕНИЯ</span>
                        </div>
                        <Link href="/" className="bg-cyan-600 text-white px-4 py-2 rounded text-sm hover:bg-cyan-700">
                            ← НАЗАД
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <div className="w-1/4">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-cyan-600 text-white px-4 py-3 font-semibold">
                                ГОРОДСКОЙ ПУТЕВОДИТЕЛЬ
                            </div>
                            <div className="divide-y divide-gray-200">
                                <SidebarItem title="ОБЪЕКТЫ" />
                                <SidebarItem title="ПЛЯЖИ" />
                                <SidebarItem title="ДЕРЕВНИ" />
                                <SidebarItem title="МЕСТА ДЛЯ ПОСЕЩЕНИЯ" active />
                                <SidebarItem title="АВИАСООБЩЕНИЕ" />
                                <SidebarItem title="АВТОБУСНЫЙ ТЕРМИНАЛ" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-3/4">
                        <div className="grid grid-cols-2 gap-4">
                            <GuideImageCard 
                                title="Деревни" 
                                image="/dalaman1.jpg"
                            />
                            <GuideImageCard 
                                title="Пляжи" 
                                image="/dalaman2.jpg"
                            />
                            <GuideImageCard 
                                title="Объекты" 
                                image="/dalaman1.jpg"
                            />
                            <GuideImageCard 
                                title="Места для посещения" 
                                image="/dalaman2.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SidebarItem = ({ title, active = false }: { title: string, active?: boolean }) => (
    <div className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between ${active ? 'bg-gray-50 text-cyan-600 font-semibold' : 'text-gray-700'}`}>
        <span>{title}</span>
        <span className="text-gray-400">&gt;</span>
    </div>
);

const GuideImageCard = ({ title, image }: { title: string, image: string }) => (
    <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 h-48">
        <Image 
            src={image} 
            alt={title} 
            layout="fill" 
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
            <div className="text-white font-bold text-lg p-4">
                {title}
            </div>
        </div>
    </div>
);

export default CityGuidePage; 