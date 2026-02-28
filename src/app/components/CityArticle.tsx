"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight, FaHome, FaCity } from 'react-icons/fa';

interface CityArticleProps {
    title: string;
    description?: string;
    contentHtml: string;
    location: string;
    locationName: string;
    heroImage?: string;
}

const CityArticle = ({ title, description, contentHtml, location, locationName, heroImage }: CityArticleProps) => {
    const finalHeroImage = heroImage || `/api/images/locations/${location}/ruine/knidos/knidos.jpg`;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Minimal Hero / Banner */}
            <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
                <Image
                    src={finalHeroImage}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-[0.6] blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-slate-50/20" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl uppercase italic">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium italic drop-shadow-lg">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10 pb-20">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] mb-10 bg-white/80 backdrop-blur-md p-4 rounded-full w-fit premium-shadow border border-white/50">
                    <Link href="/" className="text-slate-400 hover:text-cyan-600 flex items-center gap-1 transition-colors">
                        <FaHome size={12} /> ГЛАВНАЯ
                    </Link>
                    <FaChevronRight size={8} className="text-slate-300" />
                    <Link href={`/${location}`} className="text-slate-400 hover:text-cyan-600 flex items-center gap-1 transition-colors">
                        <FaCity size={12} /> {locationName}
                    </Link>
                    <FaChevronRight size={8} className="text-slate-300" />
                    <span className="text-cyan-600">{title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-16 premium-shadow border border-white">
                        <div
                            className="prose prose-slate prose-lg max-w-none 
                                prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tight
                                prose-h2:text-3xl prose-h2:text-slate-900 prose-h2:border-l-4 prose-h2:border-cyan-500 prose-h2:pl-6
                                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
                                prose-strong:text-slate-900 prose-strong:font-black
                                prose-a:text-cyan-600 prose-a:font-bold hover:prose-a:text-cyan-500
                                prose-img:rounded-[2rem] prose-img:shadow-2xl"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />

                        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <Link href={`/${location}`} className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-cyan-600 transition-all">
                                <span className="p-3 rounded-full bg-slate-50 group-hover:bg-cyan-50 transition-colors">←</span>
                                Назад в {locationName}
                            </Link>

                            <div className="flex gap-4">
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest self-center">Поделиться:</span>
                                {/* Placeholder social buttons */}
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-not-allowed">f</div>
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-not-allowed">t</div>
                            </div>
                        </div>
                    </article>

                    {/* Simple Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-white">
                            <h3 className="text-lg font-black text-slate-900 mb-6 uppercase italic border-b border-slate-100 pb-4">Другие разделы</h3>
                            <ul className="space-y-4">
                                <SidebarLink href={`/${location}/beaches`} label="Пляжи" />
                                <SidebarLink href={`/${location}/sights`} label="Достопримечательности" />
                                <SidebarLink href={`/${location}/transport`} label="Транспорт" />
                                <SidebarLink href={`/${location}/todo`} label="Чем заняться" />
                            </ul>
                        </div>

                        <div className="bg-cyan-600 rounded-[2.5rem] p-8 text-white premium-shadow relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-4 uppercase italic leading-tight">Нужна помощь в планировании?</h3>
                                <p className="text-cyan-100 text-sm font-medium mb-6 leading-relaxed">Наши эксперты помогут составить идеальный маршрут по Даламанскому побережью.</p>
                                <button className="w-full py-4 bg-white text-cyan-600 font-black text-xs uppercase tracking-widest rounded-full hover:bg-cyan-50 transition-all shadow-xl">
                                    Связаться с нами
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

const SidebarLink = ({ href, label }: { href: string, label: string }) => (
    <li>
        <Link href={href} className="flex items-center justify-between group py-2 hover:translate-x-1 transition-transform">
            <span className="text-sm font-bold text-slate-600 group-hover:text-cyan-600 transition-colors uppercase tracking-wider">{label}</span>
            <FaChevronRight size={10} className="text-slate-300 group-hover:text-cyan-500 transition-colors" />
        </Link>
    </li>
);

export default CityArticle;
