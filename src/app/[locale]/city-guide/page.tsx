import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const CityGuidePage = ({ params }: { params: { locale: string } }) => {
    const locale = params.locale || 'en';

    const localize = (path: string) => {
      if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `/${locale}${cleanPath}`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
            <Header locale={locale} />

            <main className="flex-grow container mx-auto px-4 py-8 pb-20">
                {/* Breadcrumbs */}
                <div className="flex items-center justify-between mb-8 text-xs font-black uppercase tracking-widest text-slate-400">
                    <div className="flex items-center space-x-2">
                        <Link href={localize('/')} className="hover:text-cyan-600 transition-colors">
                            {locale === 'ru' ? 'Главная' : 'Home'}
                        </Link>
                        <span>/</span>
                        <span className="text-slate-600">
                            {locale === 'ru' ? 'Путеводитель' : 'Guide'}
                        </span>
                    </div>
                    <Link href={localize('/')} className="bg-slate-200 hover:bg-cyan-600 hover:text-white text-slate-700 px-5 py-2.5 rounded-full transition-all duration-300 text-[10px]">
                        {locale === 'ru' ? '← Назад на главную' : '← Back Home'}
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                            <div className="bg-cyan-600 text-white px-6 py-4">
                                <h3 className="font-black text-sm uppercase tracking-widest italic">
                                    {locale === 'ru' ? 'Городской путеводитель' : 'City Guide'}
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <SidebarItem title={locale === 'ru' ? 'ОБЪЕКТЫ' : 'COLLECTIONS'} href={localize('/collections')} />
                                <SidebarItem title={locale === 'ru' ? 'ПЛЯЖИ' : 'BEACHES'} href={localize('/beaches')} />
                                <SidebarItem title={locale === 'ru' ? 'ДЕРЕВНИ' : 'VILLAGES'} href={localize('/city-guide/small-towns')} />
                                <SidebarItem title={locale === 'ru' ? 'МЕСТА ДЛЯ ПОСЕЩЕНИЯ' : 'SIGHTS'} href={localize('/city-guide')} active />
                                <SidebarItem title={locale === 'ru' ? 'АВИАСООБЩЕНИЕ' : 'FLIGHTS'} href={localize('/articles/airport-dalaman')} />
                                <SidebarItem title={locale === 'ru' ? 'АВТОБУСНЫЙ ТЕРМИНАЛ' : 'BUS TERMINAL'} href={localize('/articles/transport')} />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 mb-8">
                            <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">
                                {locale === 'ru' ? 'ОБЗОР РЕГИОНА' : 'REGION OVERVIEW'}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 uppercase italic">
                                {locale === 'ru' ? 'Путеводитель по побережью' : 'Coast Guide'}
                            </h1>
                            <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                {locale === 'ru' 
                                    ? 'Добро пожаловать в интерактивный путеводитель по Ликийскому побережью. Наш регион славится невероятным разнообразием: от уютных прибрежных городков до древних античных руин и диких лазурных пляжей. Выберите интересующую категорию ниже, чтобы спланировать свое идеальное путешествие.'
                                    : 'Welcome to the interactive guide to the Lycian Coast. Our region is famous for its incredible diversity: from cozy coastal towns to ancient ruins and wild azure beaches. Select a category below to plan your perfect trip.'}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <GuideImageCard 
                                    title={locale === 'ru' ? 'Деревни и поселки' : 'Villages & Settlements'} 
                                    image="/dalaman1.jpg"
                                    href={localize('/city-guide/small-towns')}
                                    locale={locale}
                                />
                                <GuideImageCard 
                                    title={locale === 'ru' ? 'Лучшие пляжи' : 'Best Beaches'} 
                                    image="/dalaman2.jpg"
                                    href={localize('/beaches')}
                                    locale={locale}
                                />
                                <GuideImageCard 
                                    title={locale === 'ru' ? 'Коллекции мест' : 'Curated Collections'} 
                                    image="/dalaman1.jpg"
                                    href={localize('/collections')}
                                    locale={locale}
                                />
                                <GuideImageCard 
                                    title={locale === 'ru' ? 'Карта мест' : 'Interactive Map'} 
                                    image="/dalaman2.jpg"
                                    href={localize('/map')}
                                    locale={locale}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            
            <Footer locale={locale} />
        </div>
    );
};

const SidebarItem = ({ title, href, active = false }: { title: string, href: string, active?: boolean }) => (
    <Link href={href} className={`px-5 py-4 cursor-pointer flex items-center justify-between transition-all duration-300 ${active ? 'bg-cyan-50/80 text-cyan-600 font-black border-l-4 border-cyan-600' : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-50/50'}`}>
        <span className="text-[13px] font-bold uppercase tracking-wider italic">{title}</span>
        <span className={`${active ? 'text-cyan-600' : 'text-slate-400 group-hover:text-cyan-600'} transition-colors`}>&gt;</span>
    </Link>
);

const GuideImageCard = ({ title, image, href, locale }: { title: string, image: string, href: string, locale: string }) => (
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
                {locale === 'ru' ? 'Открыть раздел \u2192' : 'Open Section \u2192'}
            </span>
            <h3 className="text-white font-black text-xl uppercase italic tracking-wide">
                {title}
            </h3>
        </div>
    </Link>
);

export default CityGuidePage;