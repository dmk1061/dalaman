import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaUserFriends, FaUtensils, FaCompass, FaChevronRight } from 'react-icons/fa';
import { getDictionary, Locale } from '@/lib/dictionary';

const getCollections = (dict: any) => [
    {
        title: dict.main_content.collections.romantic,
        count: dict.main_content.collections.romantic_desc,
        image: "/dalaman1.jpg",
        tag: "Love",
        icon: <FaHeart />,
        description: "Уединенные бутик-отели, рестораны с видом на закат и скрытые от посторонних глаз бухты для идеального романтического уикенда.",
        color: "bg-pink-500"
    },
    {
        title: dict.main_content.collections.family,
        count: dict.main_content.collections.family_desc,
        image: "/dalaman2.jpg",
        tag: "Family",
        icon: <FaUserFriends />,
        description: "Песчаные пляжи с пологим входом, отели с детскими клубами и развлекательные парки, подходящие для отдыха с детьми любого возраста.",
        color: "bg-blue-500"
    },
    {
        title: dict.main_content.collections.gastro,
        count: dict.main_content.collections.gastro_desc,
        image: "/dalaman1.jpg",
        tag: "Food",
        icon: <FaUtensils />,
        description: "Маршруты для настоящих гурманов: от традиционных турецких завтраков в горах до рыбных ресторанов на набережной и дегустаций местных вин.",
        color: "bg-amber-500"
    },
    {
        title: dict.main_content.collections.bays,
        count: dict.main_content.collections.bays_desc,
        image: "/dalaman2.jpg",
        tag: "Nature",
        icon: <FaCompass />,
        description: "Девственная природа, кристально чистая бирюзовая вода и полное отсутствие толп. Подборка бухт, куда можно добраться только пешком или по воде.",
        color: "bg-emerald-500"
    }
];

const CollectionsPage = async ({ params }: { params: { locale: string } }) => {
    const locale = params.locale || 'en';
    const dict = await getDictionary(locale as Locale);
    const list = getCollections(dict);

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
                        {dict.main_content.collections.title}
                    </span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">
                        {locale === 'ru' ? 'Коллекции впечатлений' : 'Curated Collections'}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {dict.main_content.collections.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {list.map((item, idx) => (
                        <div key={idx} className="group bg-white rounded-[3rem] overflow-hidden premium-shadow border border-slate-50 flex flex-col hover:-translate-y-1 transition-all duration-300">
                            <div className="relative h-64 w-full">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute top-6 right-6">
                                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase text-white border border-white/20">
                                        {item.tag}
                                    </span>
                                </div>
                                <div className="absolute bottom-6 left-8 flex items-center space-x-4">
                                    <div className={`p-3 rounded-2xl ${item.color} text-white shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div className="text-white">
                                        <h3 className="font-black text-xl leading-tight uppercase italic">{item.title}</h3>
                                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">{item.count}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-between flex-grow">
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    {item.description}
                                </p>
                                <Link
                                    href={localize('/city-guide')}
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors"
                                >
                                    {locale === 'ru' ? 'Смотреть места' : 'Explore Places'} <FaChevronRight size={10} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            
            <Footer locale={locale} />
        </div>
    );
};

export default CollectionsPage;
