"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { BeachItem } from './page';

interface BeachesClientProps {
    beaches: BeachItem[];
}

const cities = [
    { id: 'all', name: 'Все города' },
    { id: 'dacha', name: 'Датча' },
    { id: 'marmaris', name: 'Мармарис' },
    { id: 'dalyan', name: 'Дальян' },
    { id: 'koycegiz', name: 'Кёйджегиз' },
    { id: 'dalaman', name: 'Даламан' },
    { id: 'gocek', name: 'Гёджек' },
    { id: 'fethiye', name: 'Фетхие' },
    { id: 'kas', name: 'Каш' }
];

const BeachesClient = ({ beaches }: BeachesClientProps) => {
    const [selectedCity, setSelectedCity] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBeaches = beaches.filter(beach => {
        const matchesCity = selectedCity === 'all' || beach.location === selectedCity;
        const matchesSearch = beach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            beach.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            beach.locationName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCity && matchesSearch;
    });

    return (
        <div className="space-y-12">
            {/* Filter and Search Bar */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 premium-shadow border border-slate-100 flex flex-col md:flex-row gap-6 justify-between items-center">
                {/* City Filter Pills */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {cities.map(city => (
                        <button
                            key={city.id}
                            onClick={() => setSelectedCity(city.id)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                                selectedCity === city.id
                                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {city.name}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Найти пляж..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 rounded-full py-3 px-6 pl-12 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all border border-slate-100"
                    />
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
            </div>

            {/* Beaches Grid */}
            {filteredBeaches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBeaches.map((beach, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-[2.5rem] overflow-hidden premium-shadow flex flex-col h-full border border-slate-50 hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={beach.image}
                                    alt={beach.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600 flex items-center gap-1.5">
                                        <FaMapMarkerAlt /> {beach.locationName}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="font-black text-xl mb-4 text-slate-900 group-hover:text-cyan-600 transition-colors uppercase italic">
                                    {beach.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
                                    {beach.description.replace(/[#*_\-`]/g, '')}
                                </p>
                                <Link
                                    href={beach.href}
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors mt-auto"
                                >
                                    Подробнее <FaChevronRight size={10} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[2.5rem] p-16 text-center premium-shadow border border-slate-100">
                    <p className="text-slate-400 text-lg font-medium italic">Пляжи не найдены по вашему запросу.</p>
                </div>
            )}
        </div>
    );
};

export default BeachesClient;
