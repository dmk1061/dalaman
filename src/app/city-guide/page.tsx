import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const CityGuidePage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8 pb-20">
                {/* Breadcrumbs */}
                <div className="flex items-center justify-between mb-8 text-xs font-black uppercase tracking-widest text-slate-400">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="hover:text-cyan-600 transition-colors">Главная</Link>
                        <span>/</span>
                        <span className="text-slate-600">Путеводитель</span>
                    </div>
                    <Link href="/" className="bg-slate-200 hover:bg-cyan-600 hover:text-white text-slate-700 px-5 py-2.5 rounded-full transition-all duration-300 text-[10px]">
                        ← Назад на главную
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                            <div className="bg-cyan-600 text-white px-6 py-4">
                                <h3 className="font-black text-sm uppercase tracking-widest italic">Городской путеводитель</h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <SidebarItem title="ОБЪЕКТЫ" href="/collections" />
                                <SidebarItem title="ПЛЯЖИ" href="/beaches" />
                                <SidebarItem title="ДЕРЕВНИ" href="/city-guide/small-towns" />
                                <SidebarItem title="МЕСТА ДЛЯ ПОСЕЩЕНИЯ" href="/city-guide" active />
                                <SidebarItem title="АВИАСООБЩЕНИЕ" href="/articles/airport-dalaman" />
                                <SidebarItem title="АВТОБУСНЫЙ ТЕРМИНАЛ" href="/articles/transport" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 mb-8">
                            <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">ОБЗОР РЕГИОНА</span>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 uppercase italic">Путеводитель по побережью</h1>
                            <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                Добро пожаловать в интерактивный путеводитель по Ликийскому побережью. Наш регион славится невероятным разнообразием: от уютных прибрежных городков до древних античных руин и диких лазурных пляжей. Выберите интересующую категорию ниже, чтобы спланировать свое идеальное путешествие.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <GuideImageCard 
                                    title="Деревни и поселки" 
                                    image="/dalaman1.jpg"
                                    href="/city-guide/small-towns"
                                />
                                <GuideImageCard 
                                    title="Лучшие пляжи" 
                                    image="/dalaman2.jpg"
                                    href="/beaches"
                                />
                                <GuideImageCard 
                                    title="Коллекции мест" 
                                    image="/dalaman1.jpg"
                                    href="/collections"
                                />
                                <GuideImageCard 
                                    title="Карта мест" 
                                    image="/dalaman2.jpg"
                                    href="/map"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const SidebarItem = ({ title, href, active = false }: { title: string, href: string, active?: boolean }) => (
    <Link href={href} className={`px-5 py-4 cursor-pointer flex items-center justify-between transition-all duration-300 ${active ? 'bg-cyan-50/80 text-cyan-600 font-black border-l-4 border-cyan-600' : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-50/50'}`}>
        <span className="text-[13px] font-bold uppercase tracking-wider italic">{title}</span>
        <span className={`${active ? 'text-cyan-600' : 'text-slate-400 group-hover:text-cyan-600'} transition-colors`}>&gt;</span>
    </Link>
);

const GuideImageCard = ({ title, image, href }: { title: string, image: string, href: string }) => (
    <Link href={href} className="group relative rounded-[2rem] overflow-hidden premium-shadow cursor-pointer h-56 block border border-slate-100 hover:-translate-y-1 transition-all duration-300">
        <Image 
            src={image} 
            alt={title} 
            layout="fill" 
            objectFit="cover"
            className="transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
            <span className="text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                Открыть раздел &rarr;
            </span>
            <h3 className="text-white font-black text-xl uppercase italic tracking-wide">
                {title}
            </h3>
        </div>
    </Link>
);

export default CityGuidePage;