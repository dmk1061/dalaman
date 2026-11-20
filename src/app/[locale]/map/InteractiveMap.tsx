"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

interface Pin {
    slug: string;
    top: string;
    left: string;
    labelPos?: 'top' | 'bottom';
    tooltipAlign?: 'left' | 'center' | 'right';
}

const pins: Pin[] = [
    { slug: 'dacha',    top: '57.90%', left: '6.10%',  labelPos: 'top',    tooltipAlign: 'left' },
    { slug: 'marmaris', top: '44.06%', left: '27.61%', labelPos: 'top',    tooltipAlign: 'center' },
    { slug: 'koycegiz', top: '34.60%', left: '44.11%', labelPos: 'top',    tooltipAlign: 'center' },
    { slug: 'dalyan',   top: '41.06%', left: '43.85%', labelPos: 'bottom', tooltipAlign: 'center' },
    { slug: 'dalaman',  top: '42.52%', left: '51.99%', labelPos: 'bottom', tooltipAlign: 'center' },
    { slug: 'gocek',    top: '41.53%', left: '58.13%', labelPos: 'top',    tooltipAlign: 'center' },
    { slug: 'fethiye',  top: '45.94%', left: '68.12%', labelPos: 'top',    tooltipAlign: 'center' },
    { slug: 'kas',      top: '62.31%', left: '95.24%', labelPos: 'top',    tooltipAlign: 'right' }
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
    en: { explore: "Explore", mapAlt: "3D relief diorama map of the coast from Datça to Kaş" },
    ru: { explore: "Исследовать", mapAlt: "Рельефная 3D-карта побережья от Датчи до Каша" },
    de: { explore: "Erkunden", mapAlt: "3D-Reliefkarte der Küste von Datça bis Kaş" },
    tr: { explore: "Keşfet", mapAlt: "Datça'dan Kaş'a 3D kıyı kabartma haritası" }
};

const tooltipPositionClasses: Record<NonNullable<Pin['tooltipAlign']>, string> = {
    left: 'left-0 translate-x-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0 translate-x-0',
};

const InteractiveMap = ({ locale = 'en' }: { locale?: string }) => {
    const [activeSlug, setActiveSlug] = useState<string | null>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const activeLocale = locale || 'en';
    const activePins = pinTranslations[activeLocale] || pinTranslations['en'];
    const t = mapTranslations[activeLocale] || mapTranslations['en'];

    const cancelClose = () => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    };

    const handleEnter = (slug: string) => {
        cancelClose();
        setActiveSlug(slug);
    };

    const handleLeave = (slug: string) => {
        cancelClose();
        closeTimerRef.current = setTimeout(() => {
            setActiveSlug((prev) => (prev === slug ? null : prev));
        }, 220);
    };

    useEffect(() => () => cancelClose(), []);

    return (
        <div
            className="w-full overflow-x-auto rounded-[2rem] bg-[#142c52] border border-slate-200/80"
            onClick={() => {
                cancelClose();
                setActiveSlug(null);
            }}
        >
            <div className="relative w-full min-w-[680px] aspect-[1376/768] overflow-hidden">
                {/* Base Diorama Map Image */}
                <Image
                    src="/map-diorama.webp"
                    alt={t.mapAlt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    className="object-cover select-none"
                    priority
                />

                {/* Subtle inner frame */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />

                {/* Pins */}
                {pins.map((pin) => {
                    const isActive = activeSlug === pin.slug;
                    const city = activePins[pin.slug];
                    const cityName = city?.name || pin.slug;
                    const cityDesc = city?.description || '';
                    const alignClass = tooltipPositionClasses[pin.tooltipAlign || 'center'];
                    const labelPositionClass =
                        pin.labelPos === 'bottom'
                            ? 'top-full'
                            : 'bottom-full';
                    const tooltipBridgePadding =
                        pin.labelPos === 'bottom'
                            ? 'pb-3'
                            : 'pb-6';

                    return (
                        <div
                            key={pin.slug}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 ${isActive ? 'z-40' : 'z-20'}`}
                            style={{ top: pin.top, left: pin.left }}
                            onMouseEnter={() => handleEnter(pin.slug)}
                            onMouseLeave={() => handleLeave(pin.slug)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Hover / Tap tooltip card with continuous padding hover-bridge */}
                            <div
                                onMouseEnter={() => handleEnter(pin.slug)}
                                onMouseLeave={() => handleLeave(pin.slug)}
                                className={`absolute bottom-full ${alignClass} ${tooltipBridgePadding} z-30 transition-all duration-200 ${
                                    isActive
                                        ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                                        : 'opacity-0 translate-y-2 invisible pointer-events-none'
                                }`}
                            >
                                <div className="bg-white/95 backdrop-blur-md text-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 w-52">
                                    <h4 className="font-black text-xs uppercase tracking-wider text-cyan-600 mb-1">
                                        {cityName}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium mb-3 leading-relaxed">
                                        {cityDesc}
                                    </p>
                                    <Link
                                        href={`/${activeLocale}/${pin.slug}`}
                                        className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
                                    >
                                        <span>{t.explore}</span>
                                        <FaChevronRight size={8} />
                                    </Link>
                                </div>
                            </div>

                            {/* Marker Pin */}
                            <button
                                type="button"
                                aria-label={cityName}
                                aria-expanded={isActive}
                                onClick={() => {
                                    cancelClose();
                                    setActiveSlug((prev) => (prev === pin.slug ? null : pin.slug));
                                }}
                                className="relative flex items-center justify-center p-1.5 cursor-pointer focus:outline-none"
                            >
                                {/* Soft ping halo */}
                                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-cyan-400 opacity-50 pointer-events-none" />

                                {/* Luminous dot */}
                                <span
                                    className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white shadow-md transition-transform duration-200 ${
                                        isActive
                                            ? 'bg-cyan-400 scale-125'
                                            : 'bg-cyan-500 hover:bg-cyan-400 hover:scale-125'
                                    }`}
                                />

                                {/* Editorial glass label (interactive so cursor stays inside marker while moving to card) */}
                                <span
                                    className={`absolute left-1/2 -translate-x-1/2 ${labelPositionClass} bg-slate-900/85 backdrop-blur-md text-white border border-cyan-300/40 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider whitespace-nowrap select-none shadow-md transition-colors ${
                                        isActive ? 'border-cyan-300 bg-slate-900/95' : ''
                                    }`}
                                >
                                    {cityName}
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InteractiveMap;
