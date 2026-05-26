import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaChevronRight } from 'react-icons/fa';

const blogPosts = [
    {
        title: "Как мы провели 3 дня на яхте в Гёджеке: личный опыт и цены",
        description: "Подробный разбор аренды яхты (гулеты) в Гёджеке: маршруты по 12 островам, стоянки в диких бухтах, меню на борту и реальный бюджет поездки на компанию из 6 человек.",
        image: "/dalaman1.jpg",
        date: "24.05.2026",
        author: "Мария Соколова",
        tag: "Яхтинг",
        href: "/articles/yachting"
    },
    {
        title: "Лучшие рестораны Каша: где попробовать самые вкусные морепродукты",
        description: "Честный обзор гастрономии в богемном Каше. От локальных локант с домашней едой до изысканных террас с видом на греческий остров Мейс. Цены, рекомендации и адреса.",
        image: "/dalaman2.jpg",
        date: "18.05.2026",
        author: "Александр Петров",
        tag: "Еда",
        href: "/articles/gastronomy"
    },
    {
        title: "Ликийская тропа: подробный чек-лист вещей для похода",
        description: "Планируете пройти часть Ликийской тропы? Рассказываем, какую обувь выбрать, сколько воды брать с собой, какие приложения скачать для оффлайн-навигации и как избежать встречи с дикими кабанами.",
        image: "/dalaman1.jpg",
        date: "12.05.2026",
        author: "Дмитрий Власов",
        tag: "Трекинг",
        href: "/articles/trekking"
    },
    {
        title: "Как добраться до Долины Бабочек: лодки, скалы и парапланы",
        description: "Все доступные способы попасть в одну из самых фотогеничных бухт региона. Разбираем опасный спуск по веревкам из деревни Фаралья, расписание лодок из Олюдениза и полеты в тандеме.",
        image: "/dalaman2.jpg",
        date: "05.05.2026",
        author: "Елена Смирнова",
        tag: "Советы",
        href: "/articles/paragliding"
    }
];

const BlogsPage = ({ params }: { params: { locale: string } }) => {
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
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">
                        {locale === 'ru' ? 'БЛОГИ ПУТЕШЕСТВЕННИКОВ' : 'TRAVELERS BLOGS'}
                    </span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">
                        {locale === 'ru' ? 'Истории и личный опыт' : 'Stories & Personal Experience'}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {locale === 'ru'
                            ? 'Живые отзывы, полезные лайфхаки, маршруты и настоящие приключения от авторов, влюбленных в Ликийское побережье Турции.'
                            : 'Live reviews, useful life hacks, itineraries and real adventures from authors in love with the Lycian Coast of Turkey.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
                    {/* Main Blog List */}
                    <div className="lg:col-span-8 space-y-12">
                        {blogPosts.map((post, idx) => (
                            <article key={idx} className="group bg-white rounded-[3rem] overflow-hidden premium-shadow border border-slate-50 hover:-translate-y-1 transition-all duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                    <div className="relative h-64 md:h-full md:col-span-2 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-1.5 bg-cyan-600 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                                                {post.tag}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 md:col-span-3 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center space-x-6 text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-4">
                                                <span className="flex items-center gap-1.5"><FaCalendarAlt /> {post.date}</span>
                                                <span className="flex items-center gap-1.5"><FaUser /> {post.author}</span>
                                            </div>
                                            <h3 className="font-black text-xl mb-4 text-slate-900 group-hover:text-cyan-600 transition-colors uppercase italic leading-tight">
                                                {post.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                                {post.description}
                                            </p>
                                        </div>
                                        <Link
                                            href={localize(post.href)}
                                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors"
                                        >
                                            {locale === 'ru' ? 'Читать далее' : 'Read more'} <FaChevronRight size={10} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50">
                            <h3 className="text-lg font-black text-slate-900 mb-6 uppercase italic border-b border-slate-100 pb-4">
                                {locale === 'ru' ? 'Популярные теги' : 'Popular Tags'}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Яхтинг', 'Еда', 'Трекинг', 'Советы', 'Пляжи', 'Античность', 'Отели'].map((tag) => (
                                    <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 rounded-full text-xs font-bold transition-all cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[2.5rem] p-8 text-white premium-shadow relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-4 uppercase italic leading-tight">
                                    {locale === 'ru' ? 'Хотите стать автором?' : 'Want to write?'}
                                </h3>
                                <p className="text-cyan-100 text-sm font-medium mb-6 leading-relaxed">
                                    {locale === 'ru' 
                                        ? 'Поделитесь своим опытом путешествия по побережью от Датчи до Каша на нашем портале!'
                                        : 'Share your travel experience on our portal!'}
                                </p>
                                <button className="w-full py-4 bg-white text-cyan-600 font-black text-xs uppercase tracking-widest rounded-full hover:bg-cyan-50 transition-all shadow-xl">
                                    {locale === 'ru' ? 'Написать статью' : 'Write an Article'}
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            
            <Footer locale={locale} />
        </div>
    );
};

export default BlogsPage;
