import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const dayPlanItems = [
    {
        title: "Пляж Капуташ: рай в бирюзовой бухте",
        image: "/dalaman1.jpg",
        href: "/articles/kaputas-beach"
    },
    {
        title: "Ликийская тропа: лучший хайкинг-маршрут Турции",
        image: "/dalaman2.jpg",
        href: "/articles/lycian-way"
    },
    {
        title: "Секреты затонувшего города Кекова",
        image: "/dalaman1.jpg",
        href: "/articles/kekova-sunken-city"
    },
    {
        title: "Олюдениз: мировая столица параглайдинга",
        image: "/dalaman2.jpg",
        href: "/articles/oludeniz-paragliding"
    },
    {
        title: "Дальян: черепахи, гробницы и грязевые ванны",
        image: "/dalaman1.jpg",
        href: "/articles/dalyan-turtles"
    },
];

const Sidebar = () => {
    return (
        <div className="space-y-10">
            {/* Day Planner */}
            <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                <div className="bg-cyan-600 text-white px-6 py-4">
                    <h3 className="font-black text-sm uppercase tracking-widest italic">Планируем день</h3>
                </div>
                <div className="p-6 space-y-6">
                    {dayPlanItems.map((item) => (
                        <ArticleItem
                            key={item.title}
                            title={item.title}
                            image={item.image}
                            href={item.href}
                        />
                    ))}
                </div>
            </div>

            {/* Travel Plans */}
            <div className="group bg-white rounded-[2rem] premium-shadow overflow-hidden border border-slate-50">
                <div className="bg-cyan-600 text-white px-6 py-4">
                    <h3 className="font-black text-sm uppercase tracking-widest italic">Маршруты</h3>
                </div>
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src="/dalaman2.jpg"
                        alt="Планы путешествий"
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <p className="text-white text-sm font-bold mb-4">Готовые сценарии идеального отдыха</p>
                        <Link href="/routes" className="w-full text-center block bg-cyan-500 text-white py-3 rounded-xl hover:bg-cyan-600 font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95">
                            Смотреть все
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArticleItem = ({ title, image, href }: { title: string, image: string, href: string }) => (
    <Link href={href || '#'} className="flex items-center space-x-4 group">
        <div className="flex-shrink-0 relative w-16 h-16 rounded-xl overflow-hidden premium-shadow border border-slate-100">
            <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-500"
            />
        </div>
        <div className="flex-1">
            <h4 className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-cyan-600 transition-colors">
                {title}
            </h4>
        </div>
    </Link>
);

export default Sidebar; 