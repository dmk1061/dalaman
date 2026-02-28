"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUmbrellaBeach, FaHistory, FaBus, FaCompass, FaChevronRight } from 'react-icons/fa';

interface CityHubProps {
    location: string;
    locationName: string;
    info: {
        title: string;
        description: string;
        contentHtml: string;
    };
    beaches?: any;
    sights?: any;
    transport?: any;
    images?: string[];
}

const CityHub = ({ location, locationName, info, beaches, sights, transport, images = [] }: CityHubProps) => {
    // Hero image fallback logic
    const heroImage = images.length > 0 ? images[0] : `/api/images/locations/${location}/ruine/knidos/knidos.jpg`;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* City Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <Image
                    src={heroImage}
                    alt={locationName}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-[0.7] transform scale-105 hover:scale-110 transition-transform duration-[10s] ease-out"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-50" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.5em] mb-4 drop-shadow-lg animate-fade-in">ПОБЕРЕЖЬЕ ТУРЦИИ</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl uppercase italic">
                        {locationName}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl font-medium leading-relaxed drop-shadow-xl italic">
                        {info.description || "Место, где время замирает среди бирюзовых волн и античных руин."}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-10 pb-20">
                {/* Intro Section - Glass Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 premium-shadow border border-white/50 mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-8 uppercase italic leading-tight">
                                Магия {locationName}: <br />
                                <span className="text-cyan-600">больше чем курорт</span>
                            </h2>
                            <div
                                className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-medium"
                                dangerouslySetInnerHTML={{ __html: info.contentHtml }}
                            />
                        </div>
                        <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2">
                            <Image
                                src={images[1] || heroImage}
                                alt="Атмосфера города"
                                layout="fill"
                                objectFit="cover"
                                className="hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Explore Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <FeatureHubCard
                        title="Бирюзовые пляжи"
                        description="Открытые бухты и секретные лагуны с кристальной водой."
                        icon={<FaUmbrellaBeach size={40} />}
                        href={`/${location}/beaches`}
                        color="bg-cyan-500"
                        image={images[2] || `/dalaman1.jpg`}
                    />
                    <FeatureHubCard
                        title="Эхо истории"
                        description="Античные города и руины, хранившие тайны тысячелетий."
                        icon={<FaHistory size={40} />}
                        href={`/${location}/sights`}
                        color="bg-amber-600"
                        image={images[3] || `/dalaman2.jpg`}
                    />
                    <FeatureHubCard
                        title="Как добраться"
                        description="Все варианты транспорта и удобные маршруты до города."
                        icon={<FaBus size={40} />}
                        href={`/${location}/transport`}
                        color="bg-slate-800"
                        image={images[4] || `/dalaman1.jpg`}
                    />
                </div>

                {/* Nearby Gems Section (Placeholder/Example) */}
                <div className="mb-20">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">Жемчужины поблизости</h2>
                            <p className="text-slate-500 font-medium">Обязательные к посещению места в радиусе 20 км</p>
                        </div>
                        <Link href={`/${location}/guide`} className="text-cyan-600 font-bold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider">
                            Полный гид <FaChevronRight size={10} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {beaches && beaches.slice(0, 8).map((beach: any, idx: number) => (
                            <Link href={beach.href} key={idx} className="group relative h-72 rounded-[2rem] overflow-hidden premium-shadow">
                                <Image src={beach.image || '/dalaman1.jpg'} alt={beach.name} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="font-black text-lg uppercase italic">{beach.name}</h3>
                                    <p className="text-xs text-white/70 font-bold uppercase tracking-widest mt-1">
                                        {beach.label || "Пляж"}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureHubCard = ({ title, description, icon, href, color, image }: any) => (
    <Link href={href} className="group relative h-[400px] rounded-[3rem] overflow-hidden premium-shadow flex flex-col justify-end p-10 hover:-translate-y-2 transition-all duration-500">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="brightness-50 group-hover:brightness-[0.35] transition-all duration-500" />
        <div className={`absolute top-10 left-10 p-4 rounded-2xl ${color} text-white shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
            {icon}
        </div>
        <div className="relative z-10 text-white">
            <h3 className="text-3xl font-black mb-3 uppercase italic leading-tight">{title}</h3>
            <p className="text-white/80 font-medium mb-6 leading-relaxed">{description}</p>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
                Исследовать <FaChevronRight size={10} />
            </div>
        </div>
    </Link>
);

export default CityHub;
