"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { FaPlane, FaBuilding, FaCar, FaShip, FaUsers, FaConciergeBell, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import InteractiveMap from '@/app/[locale]/map/InteractiveMap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dictionaries: Record<string, any> = { ru, en, de, tr };

interface KaleidoscopeItem {
    title: string;
    image: string;
    href: string;
}

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
    { title: "Эски Датча / Old Datca", image: "/api/images/locations/dacha/todo/eskidacha/eski_dacha.jpg", href: "/dacha/sight/eskidacha" },

    // Koycegiz
    { title: "Экинчик / Ekincik", image: "/api/images/locations/koycegiz/beach/Ekincik/Ekincik.jpg", href: "/koycegiz/beach/Ekincik" },
    { title: "Каунос / Kaunos", image: "/api/images/locations/koycegiz/ruine/Kaunos/kaunos.jpg", href: "/koycegiz/sight/Kaunos" },
    { title: "Термальные источники Султание / Sultaniye", image: "/api/images/locations/koycegiz/todo/Sultanye/sultanye.jpg", href: "/koycegiz/sight/Sultanye" },

    // Dalyan
    { title: "Пляж Изтузу / Iztuzu Beach", image: "/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg", href: "/dalyan/beach/Istuzu" },
    { title: "Аши Кёю / Asi Bay", image: "/api/images/locations/dalyan/beach/asikoyu/asikoyu.jpg", href: "/dalyan/beach/asikoyu" },
    { title: "Ликийские гробницы / Lycian Tombs", image: "/api/images/locations/dalyan/ruine/LycianTombs/lyciantombs.jpg", href: "/dalyan/sight/LycianTombs" },

    // Dalaman
    { title: "Пляж Сарыгерме / Sarigerme Beach", image: "/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg", href: "/dalaman/beach/Sarigerme" },
    { title: "Каяджик / Kayacik", image: "/api/images/locations/dalaman/beach/Kayacik/kayacik.jpg", href: "/dalaman/beach/Kayacik" },
    { title: "Бухта Сарсала / Sarsala Bay", image: "/api/images/locations/dalaman/beach/Sarsala/sarsala.jpg", href: "/dalaman/beach/Sarsala" },

    // Gocek
    { title: "Бухта Бедри Рахми / Bedri Rahmi", image: "/api/images/locations/gocek/beach/bedri/bedri.jpg", href: "/gocek/beach/bedri" },
    { title: "Остров Терсане / Tersane Island", image: "/api/images/locations/gocek/beach/tersane/tersane.jpg", href: "/gocek/beach/tersane" },

    // Fethiye
    { title: "Олюдениз / Oludeniz Blue Lagoon", image: "/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg", href: "/fethiye/beach/bluelagoon" },
    { title: "Долина Бабочек / Butterfly Valley", image: "/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg", href: "/fethiye/beach/kelebekler" },
    { title: "Каякёй / Kayakoy Ghost Town", image: "/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg", href: "/fethiye/sight/kayakoy" },

    // Kas
    { title: "Пляж Капуташ / Kaputas Beach", image: "/api/images/locations/kas/beach/kaputas/kaputas.jpg", href: "/kas/beach/kaputas" },
    { title: "Пляж Патара / Patara Beach", image: "/api/images/locations/kas/beach/patara/patara.jpg", href: "/kas/beach/patara" },
    { title: "Кекова / Kekova Sunken City", image: "/api/images/locations/kas/ruines/kekova/kekova.jpg", href: "/kas/sight/kekova" }
];

const shuffleArray = (array: KaleidoscopeItem[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

type MainContentProps = {
    locale?: string;
};

const MainContent = ({ locale = 'ru' }: MainContentProps) => {
    const dict = dictionaries[locale] || dictionaries['en'];
    const sliderRef = useRef<Slider>(null);
    // Initial deterministic slice prevents layout shift on hydration
    const [kaleidoscopeItems, setKaleidoscopeItems] = useState<KaleidoscopeItem[]>(
        allKaleidoscopeItems.slice(0, 9)
    );

    useEffect(() => {
        const shuffled = shuffleArray(allKaleidoscopeItems).slice(0, 10);
        setKaleidoscopeItems(shuffled);
    }, []);

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${locale}${cleanPath}`;
    };

    const quickLinks = [
        { icon: <FaPlane size={22} />, title: dict.main_content.quick_links.flights, href: localize('/services/flights') },
        { icon: <FaBuilding size={22} />, title: dict.main_content.quick_links.hotels, href: localize('/services/hotels') },
        { icon: <FaCar size={22} />, title: dict.main_content.quick_links.car_rental, href: localize('/services/car-rental') },
        { icon: <FaShip size={22} />, title: dict.main_content.quick_links.yacht_rental, href: localize('/services/yacht-rental') },
        { icon: <FaUsers size={22} />, title: dict.main_content.quick_links.excursions, href: localize('/services/excursions-tours') },
        { icon: <FaConciergeBell size={22} />, title: dict.main_content.quick_links.other_services, href: localize('/services') },
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
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1.15,
                }
            }
        ]
    };

    return (
        <div className="space-y-14 pb-12">
            {/* Quick Links (2x3 / 3x2 grid for generous breathing room inside center column) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {quickLinks.map((link, idx) => (
                    <QuickLinkCard key={idx} icon={link.icon} title={link.title} href={link.href} />
                ))}
            </div>

            {/* Kaleidoscope Section */}
            <section className="relative">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                            {dict.main_content.kaleidoscope.title}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                            {dict.main_content.kaleidoscope.subtitle}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2.5 self-start sm:self-end">
                        <button
                            onClick={() => sliderRef.current?.slickPrev()}
                            aria-label="Previous slide"
                            className="p-2.5 rounded-full bg-white shadow-sm hover:bg-slate-50 transition-all border border-slate-200/80 group"
                        >
                            <FaChevronLeft className="text-slate-500 group-hover:text-cyan-600 transition-colors" size={13} />
                        </button>
                        <button
                            onClick={() => sliderRef.current?.slickNext()}
                            aria-label="Next slide"
                            className="p-2.5 rounded-full bg-white shadow-sm hover:bg-slate-50 transition-all border border-slate-200/80 group"
                        >
                            <FaChevronRight className="text-slate-500 group-hover:text-cyan-600 transition-colors" size={13} />
                        </button>
                        <Link
                            href={localize('/city-guide')}
                            className="ml-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold tracking-wider rounded-full hover:bg-cyan-600 transition-all uppercase"
                        >
                            {dict.main_content.kaleidoscope.all_locations}
                        </Link>
                    </div>
                </div>

                <div className="-mx-2">
                    <Slider ref={sliderRef} {...sliderSettings}>
                        {kaleidoscopeItems.map((item: KaleidoscopeItem, index: number) => (
                            <div key={index} className="px-2.5 py-2">
                                <KaleidoscopeCard title={item.title} image={item.image} href={localize(item.href)} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

            {/* Mosaic Section */}
            <section>
                <div className="mb-8 text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                        {dict.main_content.mosaic.title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                        {dict.main_content.mosaic.subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mosaicItems.map((item, idx) => (
                        <MosaicCard
                            key={idx}
                            title={item.title}
                            description={item.description}
                            href={item.href}
                            image={item.image}
                            readMoreText={dict.main_content.mosaic.read_more}
                        />
                    ))}
                </div>
            </section>

            {/* Collections Section */}
            <section>
                <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                            {dict.main_content.collections.title}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                            {dict.main_content.collections.subtitle}
                        </p>
                    </div>
                    <Link
                        href={localize('/collections')}
                        className="text-cyan-600 font-bold text-xs hover:text-cyan-700 flex items-center gap-1.5 uppercase tracking-wider"
                    >
                        {dict.main_content.collections.view_all} <FaChevronRight size={10} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <CollectionCard
                        title={dict.main_content.collections.romantic}
                        count={dict.main_content.collections.romantic_desc}
                        image="/dalaman1.jpg"
                        tag="Love"
                        href={localize('/routes/weekends')}
                    />
                    <CollectionCard
                        title={dict.main_content.collections.family}
                        count={dict.main_content.collections.family_desc}
                        image="/dalaman2.jpg"
                        tag="Family"
                        href={localize('/collections')}
                    />
                    <CollectionCard
                        title={dict.main_content.collections.gastro}
                        count={dict.main_content.collections.gastro_desc}
                        image="/dalaman1.jpg"
                        tag="Food"
                        href={localize('/articles/gastronomy')}
                    />
                    <CollectionCard
                        title={dict.main_content.collections.bays}
                        count={dict.main_content.collections.bays_desc}
                        image="/dalaman2.jpg"
                        tag="Nature"
                        href={localize('/beaches')}
                    />
                </div>
            </section>

            {/* Interactive Map Section */}
            <section>
                <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {dict.main_content.map.title}
                        </h2>
                    </div>
                    <Link
                        href={localize('/map')}
                        className="text-cyan-600 font-bold text-xs hover:text-cyan-700 flex items-center gap-1.5 uppercase tracking-wider"
                    >
                        {dict.main_content.map.open_interactive} <FaChevronRight size={10} />
                    </Link>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-white">
                    <InteractiveMap locale={locale} />
                </div>
            </section>
        </div>
    );
};

const QuickLinkCard = ({ icon, title, href }: { icon: React.ReactNode, title: string, href: string }) => (
    <Link
        href={href || '#'}
        className="group bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm flex items-center gap-4 hover:border-cyan-500 hover:shadow-md transition-all duration-200"
    >
        <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-cyan-700 leading-snug transition-colors">
            {title}
        </h3>
    </Link>
);

const MosaicCard = ({ title, description, href, image, readMoreText }: { title: string, description: string, href: string, image: string, readMoreText: string }) => {
    const isPlaceholder = image && image.includes('/dalaman');
    return (
        <Link
            href={href}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm flex flex-col h-full hover:-translate-y-1 hover:shadow-md hover:border-cyan-200 transition-all duration-300"
        >
            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                        Portal
                    </span>
                </div>
                {isPlaceholder && (
                    <div className="absolute top-4 right-4 bg-slate-900/65 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-0.5 rounded border border-white/20 z-10">
                        AI Illustration
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-2.5 text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-grow">
                    {description}
                </p>
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 group-hover:text-cyan-700 transition-colors">
                    {readMoreText} <FaChevronRight size={10} />
                </span>
            </div>
        </Link>
    );
};

const CollectionCard = ({ title, count, image, tag, href }: { title: string, count: string, image: string, tag: string, href: string }) => {
    const isPlaceholder = image && image.includes('/dalaman');
    return (
        <Link
            href={href}
            className="group relative h-60 rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 block hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-transparent" />
            <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/25">
                    {tag}
                </span>
            </div>
            {isPlaceholder && (
                <div className="absolute top-4 left-4 bg-slate-900/65 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-0.5 rounded border border-white/20 z-10">
                    AI Illustration
                </div>
            )}
            <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="text-white font-bold text-base leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
                    {title}
                </h3>
                <p className="text-white/75 text-xs font-medium">{count}</p>
            </div>
        </Link>
    );
};

const KaleidoscopeCard = ({ title, image, href }: { title: string, image: string, href: string }) => {
    const [imgSrc, setImgSrc] = useState(image);
    const [isError, setIsError] = useState(false);
    const isPlaceholder = imgSrc && imgSrc.includes('/dalaman');

    return (
        <Link
            href={href}
            className="block relative h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-200/70 group"
        >
            <Image
                src={imgSrc}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={() => {
                    if (!isError) {
                        setImgSrc('/dalaman1.jpg');
                        setIsError(true);
                    }
                }}
            />
            {isPlaceholder && (
                <div className="absolute top-3 right-3 bg-slate-900/65 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-0.5 rounded border border-white/20 z-10">
                    AI Illustration
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent group-hover:from-cyan-950/90 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-bold text-white text-base leading-snug drop-shadow-sm group-hover:text-cyan-200 transition-colors">
                    {title}
                </h3>
                <div className="w-8 h-1 bg-cyan-400 mt-2.5 rounded-full transform scale-x-50 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>
        </Link>
    );
};

export default MainContent;
