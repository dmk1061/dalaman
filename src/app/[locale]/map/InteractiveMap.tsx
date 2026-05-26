"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';

interface Pin {
    slug: string;
    top: string;
    left: string;
}

const pins: Pin[] = [
    { slug: 'dacha', top: '55%', left: '12%' },
    { slug: 'marmaris', top: '42%', left: '26%' },
    { slug: 'koycegiz', top: '28%', left: '42%' },
    { slug: 'dalyan', top: '46%', left: '44%' },
    { slug: 'dalaman', top: '52%', left: '55%' },
    { slug: 'gocek', top: '58%', left: '66%' },
    { slug: 'fethiye', top: '70%', left: '76%' },
    { slug: 'kas', top: '82%', left: '88%' }
];

interface PinTranslation {
    name: string;
    description: string;
}

const pinTranslations: Record<string, Record<string, PinTranslation>> = {
    en: {
        dacha: { name: 'Datça', description: 'Where two seas meet' },
        marmaris: { name: 'Marmaris', description: 'Capital of nightlife and green mountains' },
        koycegiz: { name: 'Köyceğiz', description: 'Quiet lake paradise and mud baths' },
        dalyan: { name: 'Dalyan', description: 'Kaunos, Lycian tombs, and turtles' },
        dalaman: { name: 'Dalaman', description: 'Gateway to the coast and mountain river' },
        gocek: { name: 'Göcek', description: 'Premium yachting and quiet islands' },
        fethiye: { name: 'Fethiye', description: 'Blue Lagoon, Babadağ, and Kayaköy' },
        kas: { name: 'Kaş', description: 'Antiquity, diving, and bohemian comfort' }
    },
    ru: {
        dacha: { name: 'Датча', description: 'Там, где встречаются два моря' },
        marmaris: { name: 'Мармарис', description: 'Столица ночной жизни и зеленых гор' },
        koycegiz: { name: 'Кёйджегиз', description: 'Тихий озерный рай и грязевые ванны' },
        dalyan: { name: 'Дальян', description: 'Каунос, ликийские гробницы и черепахи' },
        dalaman: { name: 'Даламан', description: 'Ворота побережья и горная река' },
        gocek: { name: 'Гёджек', description: 'Премиальный яхтинг и тихие острова' },
        fethiye: { name: 'Фетхие', description: 'Голубая лагуна, Бабадаг и Каякёй' },
        kas: { name: 'Каш', description: 'Античность, дайвинг и богемный уют' }
    },
    de: {
        dacha: { name: 'Datça', description: 'Wo zwei Meere aufeinandertreffen' },
        marmaris: { name: 'Marmaris', description: 'Hauptstadt des Nachtlebens und der grünen Berge' },
        koycegiz: { name: 'Köyceğiz', description: 'Ruhiges Seeparadies und Schlammbäder' },
        dalyan: { name: 'Dalyan', description: 'Kaunos, lykische Gräber und Schildkröten' },
        dalaman: { name: 'Dalaman', description: 'Tor zur Küste und Gebirgsfluss' },
        gocek: { name: 'Göcek', description: 'Premium-Yachting und ruhige Inseln' },
        fethiye: { name: 'Fethiye', description: 'Blaue Lagune, Babadağ und Kayaköy' },
        kas: { name: 'Kaş', description: 'Antike, Tauchen und bohemische Gemütlichkeit' }
    },
    tr: {
        dacha: { name: 'Datça', description: 'İki denizin buluştuğu yer' },
        marmaris: { name: 'Marmaris', description: 'Gece hayatının ve yeşil dağların başkenti' },
        koycegiz: { name: 'Köyceğiz', description: 'Sakin göl cenneti ve çamur banyoları' },
        dalyan: { name: 'Dalyan', description: 'Kaunos, Likya mezarları ve kaplumbağalar' },
        dalaman: { name: 'Dalaman', description: 'Sahilin kapısı ve dağ nehri' },
        gocek: { name: 'Göcek', description: 'Premium yatçılık ve sakin adalar' },
        fethiye: { name: 'Fethiye', description: 'Ölüdeniz, Babadağ ve Kayaköy' },
        kas: { name: 'Kaş', description: 'Antik çağ, dalış ve bohem konfor' }
    }
};

const mapTranslations: Record<string, { explore: string; mapAlt: string }> = {
    en: { explore: "Explore", mapAlt: "Map of the coast of Turkey" },
    ru: { explore: "Исследовать", mapAlt: "Карта побережья Турции" },
    de: { explore: "Erkunden", mapAlt: "Karte der Küste der Türkei" },
    tr: { explore: "Keşfet", mapAlt: "Türkiye kıyı haritası" }
};

const InteractiveMap = ({ locale = 'en' }: { locale?: string }) => {
    const [hoveredPin, setHoveredPin] = useState<Pin | null>(null);
    const activeLocale = locale || 'en';
    const activePins = pinTranslations[activeLocale] || pinTranslations['en'];
    const t = mapTranslations[activeLocale] || mapTranslations['en'];

    return (
        <div className="relative w-full h-[600px] rounded-[2rem] overflow-hidden bg-sky-50 border border-slate-100">
            {/* Base Map Image */}
            <Image
                src="/map.jpg"
                alt={t.mapAlt}
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
                        <h4 className="font-black text-xs uppercase tracking-wider text-cyan-600 mb-1">
                            {activePins[pin.slug]?.name || pin.slug}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium mb-3 leading-relaxed">
                            {activePins[pin.slug]?.description || ''}
                        </p>
                        <Link
                            href={`/${activeLocale}/${pin.slug}`}
                            className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
                        >
                            <span>{t.explore}</span>
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
                            {activePins[pin.slug]?.name || pin.slug}
                        </span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default InteractiveMap;
