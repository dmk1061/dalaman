"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { FaPlane, FaBuilding, FaCar, FaShip, FaUsers, FaConciergeBell, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dictionaries: Record<string, any> = { ru, en, de, tr };

// Type for kaleidoscope items
interface KaleidoscopeItem {
    title: string;
    image: string;
    href: string;
}

// Full list of all available locations for kaleidoscope
const allKaleidoscopeItems: KaleidoscopeItem[] = [
    // Marmaris
    { title: "Пляж Ичмелер / Icmeler Beach", image: "/api/images/locations/marmaris/beach/Icmeler/icmeler.jpg", href: "/marmaris/beach/Icmeler" },
    { title: "Турунч / Turunc", image: "/api/images/locations/marmaris/beach/Turunc/turunc.jpg", href: "/marmaris/beach/Turunc" },
    { title: "Акяка / Akyaka", image: "/api/images/locations/marmaris/beach/Akyaka/Akyaka.jpg", href: "/marmaris/beach/Akyaka" },
    { title: "Бухта Амос / Amos Bay", image: "/api/images/locations/marmaris/beach/AmosBay/amosBay.jpg", href: "/marmaris/beach/AmosBay" },
    { title: "Клеопатра Седир / Cleopatra Sedir", image: "/api/images/locations/marmaris/beach/CleopatraSedir/cleo-sedir.jpg", href: "/marmaris/beach/CleopatraSedir" },

    // Datca
    { title: "Домузбуку / Domuzbuku", image: "/api/images/locations/dacha/beach/Domuzbuku/domuzbuku.jpg", href: "/dacha/beach/Domuzbuku" },
    { title: "Карги / Kargi", image: "/api/images/locations/dacha/beach/Kargi/kargi.jpg", href: "/dacha/beach/Kargi" },
    { title: "Кумлук / Kumluk", image: "/api/images/locations/dacha/beach/Kumluk/kumluk.jpg", href: "/dacha/beach/Kumluk" },
    { title: "Овобуку / Ovobuku", image: "/api/images/locations/dacha/beach/Ovobuku/ovobuku.jpg", href: "/dacha/beach/Ovobuku" },
    { title: "Паламутбуку / Palamutbuku", image: "/api/images/locations/dacha/beach/Palamutbuku/palamutbuku.jpg", href: "/dacha/beach/Palamutbuku" },
    { title: "Книдос / Knidos", image: "/api/images/locations/dacha/ruine/knidos/knidos.jpg", href: "/dacha/sight/knidos" },
    { title: "Эски Дача / Old Datca", image: "/api/images/locations/dacha/todo/eskidacha/eski_dacha.jpg", href: "/dacha/sight/eskidacha" },

    // Koycegiz
    { title: "Экинчик / Ekincik", image: "/api/images/locations/koycegiz/beach/Ekincik/Ekincik.jpg", href: "/koycegiz/beach/Ekincik" },
    { title: "Каунос / Kaunos", image: "/api/images/locations/koycegiz/ruine/Kaunos/kaunos.jpg", href: "/koycegiz/sight/Kaunos" },
    { title: "Термальные источники Султание / Sultaniye Hot Springs", image: "/api/images/locations/koycegiz/todo/Sultanye/sultanye.jpg", href: "/koycegiz/sight/Sultanye" },

    // Dalyan
    { title: "Пляж Истузу / Iztuzu Beach", image: "/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg", href: "/dalyan/beach/Istuzu" },
    { title: "Асикею / Asi Bay", image: "/api/images/locations/dalyan/beach/asikoyu/asikoyu.jpg", href: "/dalyan/beach/asikoyu" },
    { title: "Ликийские гробницы / Lycian Tombs", image: "/api/images/locations/dalyan/ruine/LycianTombs/lyciantombs.jpg", href: "/dalyan/sight/LycianTombs" },

    // Dalaman
    { title: "Пляж Саригерме / Sarigerme Beach", image: "/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg", href: "/dalaman/beach/Sarigerme" },
    { title: "Каячик / Kayacik", image: "/api/images/locations/dalaman/beach/Kayacik/kayacik.jpg", href: "/dalaman/beach/Kayacik" },
    { title: "Сарсала / Sarsala", image: "/api/images/locations/dalaman/beach/Sarsala/sarsala.jpg", href: "/dalaman/beach/Sarsala" },

    // Gocek
    { title: "Бедри Рахми / Bedri Rahmi", image: "/api/images/locations/gocek/beach/bedri/bedri.jpg", href: "/gocek/beach/bedri" },
    { title: "Терсане / Tersane Island", image: "/api/images/locations/gocek/beach/tersane/tersane.jpg", href: "/gocek/beach/tersane" },

    // Fethiye
    { title: "Олюдениз / Oludeniz Blue Lagoon", image: "/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg", href: "/fethiye/beach/bluelagoon" },
    { title: "Долина Бабочек / Butterfly Valley", image: "/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg", href: "/fethiye/beach/kelebekler" },
    { title: "Каякёй / Kayakoy Ghost Town", image: "/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg", href: "/fethiye/sight/kayakoy" },

    // Kas
    { title: "Пляж Капуташ / Kaputas Beach", image: "/api/images/locations/kas/beach/kaputas/kaputas.jpg", href: "/kas/beach/kaputas" },
    { title: "Пляж Патара / Patara Beach", image: "/api/images/locations/kas/beach/patara/patara.jpg", href: "/kas/beach/patara" },
    { title: "Кекова / Kekova Sunken City", image: "/api/images/locations/kas/ruines/kekova/kekova.jpg", href: "/kas/sight/kekova" }
];

// Shuffle helper
const shuffleArray = (array: KaleidoscopeItem[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const getRandomItems = (items: KaleidoscopeItem[], count: number) => {
    const shuffled = shuffleArray(items);
    return shuffled.slice(0, count);
};

type MainContentProps = {
  locale?: string;
};

const MainContent = ({ locale = 'ru' }: MainContentProps) => {
    const dict = dictionaries[locale] || dictionaries['en'];
    const sliderRef = useRef<Slider>(null);
    const [kaleidoscopeItems, setKaleidoscopeItems] = useState<KaleidoscopeItem[]>([]);

    useEffect(() => {
        const randomCount = Math.floor(Math.random() * 5) + 8;
        const randomItems = getRandomItems(allKaleidoscopeItems, randomCount);
        setKaleidoscopeItems(randomItems);
    }, []);

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${locale}${cleanPath}`;
    };

    const quickLinks = [
        { icon: <FaPlane size={32} />, title: dict.main_content.quick_links.flights, href: localize('/services/flights') },
        { icon: <FaBuilding size={32} />, title: dict.main_content.quick_links.hotels, href: localize('/services/hotels') },
        { icon: <FaCar size={32} />, title: dict.main_content.quick_links.car_rental, href: localize('/services/car-rental') },
        { icon: <FaShip size={32} />, title: dict.main_content.quick_links.yacht_rental, href: localize('/services/yacht-rental') },
        { icon: <FaUsers size={32} />, title: dict.main_content.quick_links.excursions, href: localize('/services/excursions-tours') },
        { icon: <FaConciergeBell size={32} />, title: dict.main_content.quick_links.other_services, href: localize('/services') },
    ];

    const mosaicItems = [
        {
            title: dict.main_content.mosaic.blogs_title,
            description: dict.main_content.mosaic.blogs_desc,
            href: localize('/blogs'),
            image: "/dalaman2.jpg"
        },
        {
            title: dict.main_content.mosaic.guides_title,
            description: dict.main_content.mosaic.guides_desc,
            href: localize('/services/excursions-tours'),
            image: "/dalaman1.jpg"
        },
        {
            title: dict.main_content.mosaic.forums_title,
            description: dict.main_content.mosaic.forums_desc,
            href: localize('/contacts'),
            image: "/dalaman2.jpg"
        }
    ];

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1.5,
                }
            }
        ]
    };

    return (
        <div className="space-y-20 pb-20">
            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {quickLinks.map((link, idx) => (
                    <QuickLinkCard key={idx} icon={link.icon} title={link.title} href={link.href} />
                ))}
            </div>

            {/* Kaleidoscope Section */}
            <div className="relative">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">
                            {dict.main_content.kaleidoscope.title}
                        </h2>
                        <p className="text-slate-500 font-medium">
                            {dict.main_content.kaleidoscope.subtitle}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3 self-end">
                        <button onClick={() => sliderRef.current?.slickPrev()} className="p-3 rounded-full bg-white premium-shadow hover:bg-slate-50 transition-all border border-slate-100 group">
                            <FaChevronLeft className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                        </button>
                        <button onClick={() => sliderRef.current?.slickNext()} className="p-3 rounded-full bg-white premium-shadow hover:bg-slate-50 transition-all border border-slate-100 group">
                            <FaChevronRight className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                        </button>
                        <Link href={localize('/city-guide')} className="ml-4 px-6 py-3 bg-slate-900 text-white text-xs font-bold tracking-widest rounded-full hover:bg-cyan-600 transition-all uppercase">
                            {dict.main_content.kaleidoscope.all_locations}
                        </Link>
                    </div>
                </div>

                {kaleidoscopeItems.length > 0 ? (
                    <div className="-mx-2">
                        <Slider ref={sliderRef} {...sliderSettings}>
                            {kaleidoscopeItems.map((item: KaleidoscopeItem, index: number) => (
                                <div key={index} className="px-3 py-4">
                                    <KaleidoscopeCard title={item.title} image={item.image} href={localize(item.href)} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="h-64 flex items-center justify-center bg-slate-100 rounded-3xl animate-pulse">
                        <div className="text-slate-400 font-medium italic">
                            {dict.main_content.kaleidoscope.picking}
                        </div>
                    </div>
                )}
            </div>

            {/* Mosaic Section */}
            <div>
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4 uppercase italic">
                        {dict.main_content.mosaic.title}
                    </h2>
                    <p className="text-slate-500">
                        {dict.main_content.mosaic.subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {mosaicItems.map((item, idx) => (
                        <MosaicCard key={idx} title={item.title} description={item.description} href={item.href} image={item.image} readMoreText={dict.main_content.mosaic.read_more} />
                    ))}
                </div>
            </div>

            {/* Collections Section */}
            <div>
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">
                            {dict.main_content.collections.title}
                        </h2>
                        <p className="text-slate-500 font-medium">
                            {dict.main_content.collections.subtitle}
                        </p>
                    </div>
                    <Link href={localize('/collections')} className="text-cyan-600 font-bold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider">
                        {dict.main_content.collections.view_all} <FaChevronRight size={10} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <CollectionCard title={dict.main_content.collections.romantic} count={dict.main_content.collections.romantic_desc} image="/dalaman1.jpg" tag="Love" />
                    <CollectionCard title={dict.main_content.collections.family} count={dict.main_content.collections.family_desc} image="/dalaman2.jpg" tag="Family" />
                    <CollectionCard title={dict.main_content.collections.gastro} count={dict.main_content.collections.gastro_desc} image="/dalaman1.jpg" tag="Food" />
                    <CollectionCard title={dict.main_content.collections.bays} count={dict.main_content.collections.bays_desc} image="/dalaman2.jpg" tag="Nature" />
                </div>
            </div>

            {/* Map Section */}
            <div className="group">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">
                        {dict.main_content.map.title}
                    </h2>
                    <Link href={localize('/map')} className="text-cyan-600 font-bold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider">
                        {dict.main_content.map.open_interactive} <FaChevronRight size={10} />
                    </Link>
                </div>
                <div className="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden premium-shadow group-hover:shadow-2xl transition-all duration-500 border-4 border-white">
                    <Image
                        src="/map.jpg"
                        alt="Map"
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-[10s] ease-linear"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </div>
        </div>
    );
};

const QuickLinkCard = ({ icon, title, href }: { icon: React.ReactNode, title: string, href: string }) => (
    <Link href={href || '#'} className="group bg-white p-6 rounded-[2rem] premium-shadow border border-slate-50 flex flex-col items-center justify-center hover:bg-cyan-500 hover:scale-105 transition-all duration-300">
        <div className="text-cyan-500 mb-4 group-hover:text-white transition-colors">{icon}</div>
        <h3 className="font-bold text-xs text-center text-slate-700 group-hover:text-white uppercase tracking-wider">{title}</h3>
    </Link>
);

const MosaicCard = ({ title, description, href, image, readMoreText }: { title: string, description: string, href: string, image: string, readMoreText: string }) => {
    const isPlaceholder = image && image.includes('/dalaman');
    return (
        <div className="group bg-white rounded-[2.5rem] overflow-hidden premium-shadow flex flex-col h-full hover:-translate-y-2 transition-all duration-500 border border-slate-50">
            <div className="relative h-60 w-full overflow-hidden">
                <Image src={image} alt={title} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">Travel</span>
                </div>
                {isPlaceholder && (
                    <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm text-white text-[8px] font-black px-2 py-0.5 rounded border border-white/20 z-10 tracking-wider uppercase">
                        AI Placeholder / Сгенерировано ИИ
                    </div>
                )}
            </div>
            <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-black text-xl mb-4 text-slate-900 group-hover:text-cyan-600 transition-colors uppercase italic">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
                <Link href={href} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors">
                    {readMoreText} <FaChevronRight size={10} />
                </Link>
            </div>
        </div>
    );
};

const CollectionCard = ({ title, count, image, tag }: { title: string, count: string, image: string, tag: string }) => {
    const isPlaceholder = image && image.includes('/dalaman');
    return (
        <div className="group relative h-64 rounded-[2.5rem] overflow-hidden premium-shadow cursor-pointer">
            <Image src={image} alt={title} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute top-6 right-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase text-white border border-white/20">{tag}</span>
            </div>
            {isPlaceholder && (
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm text-white text-[8px] font-black px-2 py-0.5 rounded border border-white/20 z-10 tracking-wider uppercase">
                    AI Placeholder
                </div>
            )}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-white font-black text-lg leading-tight mb-1 group-hover:text-cyan-400 transition-colors">{title}</h3>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{count}</p>
            </div>
        </div>
    );
};

const KaleidoscopeCard = ({ title, image, href }: { title: string, image: string, href: string }) => {
    const [imgSrc, setImgSrc] = useState(image);
    const [isError, setIsError] = useState(false);
    const isPlaceholder = imgSrc && imgSrc.includes('/dalaman');

    return (
        <Link href={href} className="block relative h-80 rounded-[2.5rem] overflow-hidden premium-shadow group">
            <Image
                src={imgSrc}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-700 ease-out"
                onError={() => {
                    if (!isError) {
                        setImgSrc('/dalaman1.jpg');
                        setIsError(true);
                    }
                }}
            />
            {isPlaceholder && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[8px] font-black px-2 py-0.5 rounded border border-white/20 z-10 tracking-wider uppercase">
                    AI Placeholder
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-cyan-900/90 group-hover:via-cyan-600/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-bold text-white text-lg leading-tight drop-shadow-md">{title}</h3>
                <div className="w-8 h-1 bg-cyan-400 mt-4 overflow-hidden rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </div>
        </Link>
    );
};

export default MainContent;