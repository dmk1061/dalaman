"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';

interface Pin {
    name: string;
    slug: string;
    description: string;
    top: string;
    left: string;
}

const pins: Pin[] = [
    { name: 'Датча', slug: 'dacha', description: 'Там, где встречаются два моря', top: '55%', left: '12%' },
    { name: 'Мармарис', slug: 'marmaris', description: 'Столица ночной жизни и зеленых гор', top: '42%', left: '26%' },
    { name: 'Кёйджегиз', slug: 'koycegiz', description: 'Тихий озерный рай и грязевые ванны', top: '28%', left: '42%' },
    { name: 'Дальян', slug: 'dalyan', description: 'Каунос, ликийские гробницы и черепахи', top: '46%', left: '44%' },
    { name: 'Даламан', slug: 'dalaman', description: 'Ворота побережья и горная река', top: '52%', left: '55%' },
    { name: 'Гёджек', slug: 'gocek', description: 'Премиальный яхтинг и тихие острова', top: '58%', left: '66%' },
    { name: 'Фетхие', slug: 'fethiye', description: 'Голубая лагуна, Бабадаг и Каякёй', top: '70%', left: '76%' },
    { name: 'Каш', slug: 'kas', description: 'Античность, дайвинг и богемный уют', top: '82%', left: '88%' }
];

const InteractiveMap = () => {
    const [hoveredPin, setHoveredPin] = useState<Pin | null>(null);

    return (
        <div className="relative w-full h-[600px] rounded-[2rem] overflow-hidden bg-sky-50 border border-slate-100">
            {/* Base Map Image */}
            <Image
                src="/map.jpg"
                alt="Карта побережья Турции"
                layout="fill"
                objectFit="cover"
                className="select-none"
            />

            {/* Map Overlay to improve contrast slightly */}
            <div className="absolute inset-0 bg-sky-900/5 mix-blend-multiply pointer-events-none" />

            {/* Pins */}
            {pins.map((pin) => (
                <div
                    key={pin.slug}
                    className="absolute z-20 group"
                    style={{ top: pin.top, left: pin.left }}
                >
                    {/* Hover tooltip card */}
                    <div
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white/95 backdrop-blur-md text-slate-800 p-4 rounded-2xl premium-shadow border border-slate-100 w-52 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto ${
                            hoveredPin?.slug === pin.slug || false
                                ? 'opacity-100 translate-y-0 visible'
                                : 'opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                        }`}
                    >
                        <h4 className="font-black text-xs uppercase tracking-wider text-cyan-600 mb-1">{pin.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium mb-3 leading-relaxed">{pin.description}</p>
                        <Link
                            href={`/${pin.slug}`}
                            className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
                        >
                            <span>Исследовать</span>
                            <FaChevronRight size={8} />
                        </Link>
                    </div>

                    {/* Marker Pin */}
                    <button
                        onMouseEnter={() => setHoveredPin(pin)}
                        onMouseLeave={() => setHoveredPin(null)}
                        className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                    >
                        {/* Ping animation effect */}
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-cyan-400 opacity-60"></span>
                        
                        {/* Inner pin button */}
                        <span className="relative flex items-center justify-center rounded-full h-8 w-8 bg-cyan-600 text-white shadow-lg border-2 border-white hover:bg-cyan-500 transition-all duration-300">
                            <FaMapMarkerAlt size={14} />
                        </span>
                        
                        {/* Text label underneath */}
                        <span className="absolute top-full mt-1 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest pointer-events-none select-none shadow-md">
                            {pin.name}
                        </span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default InteractiveMap;
