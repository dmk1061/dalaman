import React from 'react';
import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaChevronRight } from 'react-icons/fa';
import { buildPageMetadata } from '@/lib/seo';

interface BlogPost {
    title: string;
    description: string;
    image: string;
    date: string;
    author: string;
    tag: string;
    href: string;
}

interface BlogsTranslation {
    badge: string;
    title: string;
    subtitle: string;
    readMore: string;
    popularTagsTitle: string;
    tags: string[];
    authorCtaTitle: string;
    authorCtaText: string;
    authorCtaBtn: string;
    posts: BlogPost[];
}

const blogsTranslations: Record<string, BlogsTranslation> = {
    ru: {
        badge: 'БЛОГИ ПУТЕШЕСТВЕННИКОВ',
        title: 'Истории и личный опыт',
        subtitle: 'Живые отзывы, полезные лайфхаки, маршруты и настоящие приключения от авторов, влюбленных в Ликийское побережье Турции.',
        readMore: 'Читать далее',
        popularTagsTitle: 'Популярные теги',
        tags: ['Яхтинг', 'Еда', 'Трекинг', 'Советы', 'Пляжи', 'Античность', 'Отели'],
        authorCtaTitle: 'Хотите стать автором?',
        authorCtaText: 'Поделитесь своим опытом путешествия по побережью от Датчи до Каша на нашем портале!',
        authorCtaBtn: 'Связаться с редакцией',
        posts: [
            {
                title: 'Как мы провели 3 дня на яхте в Гёджеке: личный опыт и цены',
                description: 'Подробный разбор аренды яхты (гулеты) в Гёджеке: маршруты по 12 островам, стоянки в диких бухтах, меню на борту и реальный бюджет поездки на компанию из 6 человек.',
                image: '/dalaman1.jpg',
                date: '24.05.2026',
                author: 'Мария Соколова',
                tag: 'Яхтинг',
                href: '/articles/yachting',
            },
            {
                title: 'Лучшие рестораны Каша: где попробовать самые вкусные морепродукты',
                description: 'Честный обзор гастрономии в богемном Каше. От локальных локант с домашней едой до изысканных террас с видом на греческий остров Мейс. Цены, рекомендации и адреса.',
                image: '/dalaman2.jpg',
                date: '18.05.2026',
                author: 'Александр Петров',
                tag: 'Еда',
                href: '/articles/gastronomy',
            },
            {
                title: 'Ликийская тропа: подробный чек-лист вещей для похода',
                description: 'Планируете пройти часть Ликийской тропы? Рассказываем, какую обувь выбрать, сколько воды брать с собой, какие приложения скачать для оффлайн-навигации и как подготовиться к маршруту.',
                image: '/dalaman1.jpg',
                date: '12.05.2026',
                author: 'Дмитрий Власов',
                tag: 'Трекинг',
                href: '/articles/trekking',
            },
            {
                title: 'Как добраться до Долины Бабочек: лодки, скалы и парапланы',
                description: 'Все доступные способы попасть в одну из самых фотогеничных бухт региона. Разбираем спуск со стороны деревни Фаралья, расписание лодок из Олюдениза и полеты в тандеме.',
                image: '/dalaman2.jpg',
                date: '05.05.2026',
                author: 'Елена Смирнова',
                tag: 'Советы',
                href: '/articles/paragliding',
            },
        ],
    },
    en: {
        badge: 'TRAVELER BLOGS',
        title: 'Stories & Personal Experience',
        subtitle: 'First-hand reviews, practical tips, coastal itineraries, and real adventures from writers who know Turkey’s Turquoise Coast inside out.',
        readMore: 'Read more',
        popularTagsTitle: 'Popular Tags',
        tags: ['Yachting', 'Food', 'Trekking', 'Tips', 'Beaches', 'History', 'Hotels'],
        authorCtaTitle: 'Want to contribute?',
        authorCtaText: 'Share your first-hand travel stories from Datça to Kaş with our international community.',
        authorCtaBtn: 'Contact Editorial',
        posts: [
            {
                title: '3 Days on a Yacht in Göcek: Route, Wild Bays & Real Budget',
                description: 'A detailed breakdown of chartering a gulet or yacht in Göcek: 12 Islands routes, quiet overnight anchorages, onboard dining, and actual costs for a group of six.',
                image: '/dalaman1.jpg',
                date: '24.05.2026',
                author: 'Maria Sokolova',
                tag: 'Yachting',
                href: '/articles/yachting',
            },
            {
                title: 'Best Restaurants in Kaş: Where to Eat Fresh Seafood',
                description: 'An honest dining guide to bohemian Kaş: from family-run lokantas serving home-style meze to sea-view terraces overlooking Kastellorizo.',
                image: '/dalaman2.jpg',
                date: '18.05.2026',
                author: 'Alexander Petrov',
                tag: 'Food',
                href: '/articles/gastronomy',
            },
            {
                title: 'The Lycian Way: Complete Packing & Navigation Checklist',
                description: 'Planning to hike a stretch of the Lycian Way? Here is what footwear works on limestone trails, how much water to carry between springs, and the best offline map apps.',
                image: '/dalaman1.jpg',
                date: '12.05.2026',
                author: 'Dmitry Vlasov',
                tag: 'Trekking',
                href: '/articles/trekking',
            },
            {
                title: 'How to Reach Butterfly Valley: Boats, Trails & Paragliding',
                description: 'All realistic ways to experience one of Turkey’s most photographed coves: boat shuttles from Ölüdeniz, the steep trail from Faralya, and tandem flights from Babadağ.',
                image: '/dalaman2.jpg',
                date: '05.05.2026',
                author: 'Elena Smirnova',
                tag: 'Tips',
                href: '/articles/paragliding',
            },
        ],
    },
    de: {
        badge: 'REISEBLOGS',
        title: 'Geschichten & Reiseberichte',
        subtitle: 'Ehrliche Erfahrungsberichte, praktische Insidertipps und echte Abenteuer von Autoren, die die türkische Südwestküste von Datça bis Kaş bestens kennen.',
        readMore: 'Weiterlesen',
        popularTagsTitle: 'Beliebte Themen',
        tags: ['Yachting', 'Essen', 'Trekking', 'Tipps', 'Strände', 'Antike', 'Hotels'],
        authorCtaTitle: 'Autor werden?',
        authorCtaText: 'Teilen Sie Ihre persönlichen Reiseerfahrungen entlang der Küste zwischen Datça und Kaş!',
        authorCtaBtn: 'Redaktion kontaktieren',
        posts: [
            {
                title: '3 Tage auf einer Yacht in Göcek: Route, Buchten & echte Kosten',
                description: 'Ausführlicher Erfahrungsbericht zum Yachtcharter in Göcek: die Route durch die 12 Inseln, ruhige Ankerplätze, Verpflegung an Bord und das Budget für 6 Personen.',
                image: '/dalaman1.jpg',
                date: '24.05.2026',
                author: 'Maria Sokolova',
                tag: 'Yachting',
                href: '/articles/yachting',
            },
            {
                title: 'Die besten Restaurants in Kaş: Frischer Fisch & Meze',
                description: 'Ein ehrlicher Restaurantführer für das böhmische Kaş: von gemütlichen Lokantas mit Hausmannskost bis zu Terrassen mit Blick auf die Insel Kastellorizo.',
                image: '/dalaman2.jpg',
                date: '18.05.2026',
                author: 'Alexander Petrov',
                tag: 'Essen',
                href: '/articles/gastronomy',
            },
            {
                title: 'Der Lykische Weg: Packliste & Tipps für die Wanderung',
                description: 'Sie planen eine Etappe auf dem Lykischen Weg? Erfahren Sie, welche Wanderschuhe nötig sind, wie viel Wasser Sie mitnehmen sollten und welche Offline-Karten helfen.',
                image: '/dalaman1.jpg',
                date: '12.05.2026',
                author: 'Dmitry Vlasov',
                tag: 'Trekking',
                href: '/articles/trekking',
            },
            {
                title: 'Anreise ins Schmetterlingstal: Boote, Pfade & Paragliding',
                description: 'Alle Möglichkeiten, die berühmte Bucht zu erreichen: Ausflugsboote ab Ölüdeniz, der steile Pfad ab Faralya und Tandemflüge vom Babadağ.',
                image: '/dalaman2.jpg',
                date: '05.05.2026',
                author: 'Elena Smirnova',
                tag: 'Tipps',
                href: '/articles/paragliding',
            },
        ],
    },
    tr: {
        badge: 'GEZGİN BLOGLARI',
        title: 'Hikayeler ve Kişisel Deneyimler',
        subtitle: 'Datça’dan Kaş’a Turkuaz Kıyıları yakından tanıyan gezginlerden gerçek deneyimler, pratik ipuçları ve özgün keşif rotaları.',
        readMore: 'Devamını oku',
        popularTagsTitle: 'Popüler Etiketler',
        tags: ['Yatçılık', 'Gastronomi', 'Trekking', 'İpuçları', 'Plajlar', 'Antik Kentler', 'Oteller'],
        authorCtaTitle: 'Yazar olmak ister misiniz?',
        authorCtaText: 'Datça ve Kaş arasındaki seyahat anılarınızı ve önerilerinizi portalımızda paylaşın!',
        authorCtaBtn: 'Editörle İletişime Geç',
        posts: [
            {
                title: 'Göcek’te 3 Günlük Yat Turu: Rota, Bakir Koylar ve Gerçek Bütçe',
                description: 'Göcek’te tekne ve gulet kiralama rehberi: 12 Adalar rotası, sakin demirleme koyları, tekne menüsü ve 6 kişilik bir grup için gerçek maliyet analizi.',
                image: '/dalaman1.jpg',
                date: '24.05.2026',
                author: 'Maria Sokolova',
                tag: 'Yatçılık',
                href: '/articles/yachting',
            },
            {
                title: 'Kaş’ın En İyi Restoranları: Taze Deniz Ürünleri Nerede Yenir?',
                description: 'Bohem Kaş için samimi bir lezzet rehberi: yerel ev yemekleri sunan esnaf lokantalarından Meis Adası manzaralı seçkin teraslara kadar öneriler.',
                image: '/dalaman2.jpg',
                date: '18.05.2026',
                author: 'Alexander Petrov',
                tag: 'Gastronomi',
                href: '/articles/gastronomy',
            },
            {
                title: 'Likya Yolu Yürüyüşü: Kapsamlı Çanta Hazırlığı ve Rota Kontrol Listesi',
                description: 'Likya Yolu’nun bir etabını yürümeyi mi planlıyorsunuz? Doğru ayakkabı seçimi, çeşmeler arası su planlaması ve çevrimdışı harita uygulamaları burada.',
                image: '/dalaman1.jpg',
                date: '12.05.2026',
                author: 'Dmitry Vlasov',
                tag: 'Trekking',
                href: '/articles/trekking',
            },
            {
                title: 'Kelebekler Vadisi’ne Nasıl Gidilir: Tekneler, Patikalar ve Paraşüt',
                description: 'Bölgenin en fotojenik koyuna ulaşmanın tüm yolları: Ölüdeniz’den tekne seferleri, Faralya’dan iniş rotası ve Babadağ’dan yamaç paraşütü uçuşları.',
                image: '/dalaman2.jpg',
                date: '05.05.2026',
                author: 'Elena Smirnova',
                tag: 'İpuçları',
                href: '/articles/paragliding',
            },
        ],
    },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale || 'en';
    const t = blogsTranslations[locale] || blogsTranslations['en'];
    return buildPageMetadata({
        locale,
        pathname: '/blogs',
        title: `${t.title} — ${t.badge}`,
        description: t.subtitle,
        image: '/dalaman1.jpg',
    });
}

const BlogsPage = ({ params }: { params: { locale: string } }) => {
    const locale = params.locale || 'en';
    const t = blogsTranslations[locale] || blogsTranslations['en'];

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
                        {t.badge}
                    </span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">
                        {t.title}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
                    {/* Main Blog List */}
                    <div className="lg:col-span-8 space-y-12">
                        {t.posts.map((post, idx) => (
                            <article key={idx} className="group bg-white rounded-[3rem] overflow-hidden premium-shadow border border-slate-50 hover:-translate-y-1 transition-all duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                    <div className="relative h-64 md:h-full md:col-span-2 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
                                            <h2 className="font-black text-xl mb-4 text-slate-900 group-hover:text-cyan-600 transition-colors uppercase italic leading-tight">
                                                {post.title}
                                            </h2>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                                {post.description}
                                            </p>
                                        </div>
                                        <Link
                                            href={localize(post.href)}
                                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors"
                                        >
                                            {t.readMore} <FaChevronRight size={10} />
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
                                {t.popularTagsTitle}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {t.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={localize('/articles')}
                                        className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 rounded-full text-xs font-bold transition-all"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[2.5rem] p-8 text-white premium-shadow relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-4 uppercase italic leading-tight">
                                    {t.authorCtaTitle}
                                </h3>
                                <p className="text-cyan-100 text-sm font-medium mb-6 leading-relaxed">
                                    {t.authorCtaText}
                                </p>
                                <Link
                                    href={localize('/contacts')}
                                    className="block w-full text-center py-4 bg-white text-cyan-600 font-black text-xs uppercase tracking-widest rounded-full hover:bg-cyan-50 transition-all shadow-xl"
                                >
                                    {t.authorCtaBtn}
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer locale={locale} />
        </div>
    );
};

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'ru' },
        { locale: 'de' },
        { locale: 'tr' },
    ];
}

export default BlogsPage;
