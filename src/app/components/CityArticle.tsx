"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight, FaHome, FaCity } from 'react-icons/fa';
import ArticleActions from './ArticleActions';

interface CityArticleProps {
    title: string;
    description?: string;
    contentHtml: string;
    location: string;
    locationName: string;
    heroImage?: string;
    locale?: string;
}

const uiByLocale: Record<string, {
    home: string;
    backTo: string;
    otherSections: string;
    beaches: string;
    sights: string;
    transport: string;
    guide: string;
    needHelpTitle: string;
    needHelpDesc: string;
    contactUs: string;
}> = {
    ru: {
        home: 'Главная',
        backTo: 'Назад в',
        otherSections: 'Другие разделы курорта',
        beaches: 'Пляжи и бухты',
        sights: 'Достопримечательности',
        transport: 'Транспорт и как добраться',
        guide: 'Полный гид по городу',
        needHelpTitle: 'Нужна помощь в планировании?',
        needHelpDesc: 'Наши эксперты помогут составить маршрут, подобрать яхту или индивидуальный трансфер по побережью.',
        contactUs: 'Связаться с нами',
    },
    en: {
        home: 'Home',
        backTo: 'Back to',
        otherSections: 'Other Resort Sections',
        beaches: 'Beaches & Bays',
        sights: 'Sights & Ruins',
        transport: 'Transport & Access',
        guide: 'Complete City Guide',
        needHelpTitle: 'Need Help Planning?',
        needHelpDesc: 'Our local team can help you craft the ideal coastal itinerary, yacht charter, or private transfer.',
        contactUs: 'Contact Us',
    },
    de: {
        home: 'Startseite',
        backTo: 'Zurück nach',
        otherSections: 'Weitere Bereiche',
        beaches: 'Strände & Buchten',
        sights: 'Sehenswürdigkeiten',
        transport: 'Transport & Anreise',
        guide: 'Kompletter Stadtführer',
        needHelpTitle: 'Hilfe bei der Planung?',
        needHelpDesc: 'Unsere Experten helfen Ihnen bei der Zusammenstellung Ihrer Reiseroute, Yachtcharter oder privatem Transfer.',
        contactUs: 'Kontaktieren Sie uns',
    },
    tr: {
        home: 'Ana Sayfa',
        backTo: 'Geri dön:',
        otherSections: 'Diğer Bölümler',
        beaches: 'Plajlar ve Koylar',
        sights: 'Gezilecek Yerler',
        transport: 'Ulaşım Rehberi',
        guide: 'Şehir Rehberi',
        needHelpTitle: 'Planlama Yardımı İster misiniz?',
        needHelpDesc: 'Uzman ekibimiz rota planlama, yat kiralama veya özel transfer konularında size yardımcı olabilir.',
        contactUs: 'Bize Ulaşın',
    }
};

const CityArticle = ({ title, description, contentHtml, location, locationName, heroImage, locale = 'ru' }: CityArticleProps) => {
    const activeLocale = locale || 'ru';
    const ui = uiByLocale[activeLocale] || uiByLocale['en'];
    const finalHeroImage = heroImage || `/api/images/locations/${location}/ruine/knidos/knidos.jpg`;

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${activeLocale}${cleanPath}`;
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Banner */}
            <div className="relative h-[38vh] min-h-[280px] overflow-hidden flex items-center">
                <Image
                    src={finalHeroImage}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-900/45 to-slate-950/80" />

                <div className="relative z-10 portal-container text-center px-4">
                    <span className="inline-block text-cyan-300 font-bold text-xs uppercase tracking-widest mb-2">
                        {locationName}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-md">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            <div className="portal-container py-8 md:py-10 pb-20">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-8 bg-white px-4 py-2.5 rounded-full w-fit shadow-sm border border-slate-200/70">
                    <Link href={localize('/')} className="hover:text-cyan-600 flex items-center gap-1.5 transition-colors">
                        <FaHome size={12} className="text-cyan-600" /> {ui.home}
                    </Link>
                    <FaChevronRight size={9} className="text-slate-300" />
                    <Link href={localize(`/${location}`)} className="hover:text-cyan-600 flex items-center gap-1.5 transition-colors">
                        <FaCity size={12} className="text-cyan-600" /> {locationName}
                    </Link>
                    <FaChevronRight size={9} className="text-slate-300" />
                    <span className="text-slate-900 font-bold">{title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Main Content */}
                    <article className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border border-slate-200/70">
                        <div
                            className="markdown-body max-w-none"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />

                        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <Link
                                href={localize(`/${location}`)}
                                className="group flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-cyan-600 transition-all"
                            >
                                <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-cyan-50 flex items-center justify-center transition-colors">←</span>
                                {ui.backTo} {locationName}
                            </Link>

                            <ArticleActions locale={activeLocale} title={title} />
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70">
                            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider border-b border-slate-100 pb-3">
                                {ui.otherSections}
                            </h3>
                            <ul className="space-y-2.5">
                                <SidebarLink href={localize(`/${location}/beaches`)} label={ui.beaches} />
                                <SidebarLink href={localize(`/${location}/sights`)} label={ui.sights} />
                                <SidebarLink href={localize(`/${location}/transport`)} label={ui.transport} />
                                <SidebarLink href={localize(`/${location}/guide`)} label={ui.guide} />
                            </ul>
                        </div>

                        <div className="bg-cyan-600 rounded-2xl p-6 text-white shadow-sm relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2.5 leading-snug">{ui.needHelpTitle}</h3>
                                <p className="text-cyan-50 text-xs sm:text-sm mb-5 leading-relaxed">{ui.needHelpDesc}</p>
                                <Link
                                    href={localize('/contacts')}
                                    className="w-full py-3 bg-white text-cyan-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-50 transition-all shadow-sm block text-center"
                                >
                                    {ui.contactUs}
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

const SidebarLink = ({ href, label }: { href: string; label: string }) => (
    <li>
        <Link href={href} className="flex items-center justify-between group py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors">
            <span className="text-sm font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors">{label}</span>
            <FaChevronRight size={10} className="text-slate-300 group-hover:text-cyan-500 transition-colors" />
        </Link>
    </li>
);

export default CityArticle;
