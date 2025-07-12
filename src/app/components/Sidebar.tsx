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
        <div className="space-y-8">
            {/* Day Planner */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-cyan-600 text-white px-4 py-3">
                    <h3 className="font-bold text-lg">Планируем день</h3>
                </div>
                <div className="p-4 space-y-4">
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-cyan-600 text-white px-4 py-3">
                    <h3 className="font-bold text-lg">Планы путешествий</h3>
                </div>
                 <div className="relative h-48">
                    <Image
                        src="/dalaman2.jpg"
                        alt="Планы путешествий"
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                        <p className="text-white text-lg font-semibold text-center">Готовые маршруты для вашего идеального отдыха</p>
                    </div>
                </div>
                <div className="p-4">
                     <Link href="/routes" className="w-full text-center block bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-bold transition-colors">
                        Смотреть варианты
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ArticleItem = ({ title, image, href }) => (
    <Link href={href || '#'} className="flex items-center space-x-3 group">
        <div className="flex-shrink-0">
            <Image
                src={image}
                alt={title}
                width={80}
                height={60}
                className="object-cover rounded-md"
            />
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-cyan-600 transition-colors">
                {title}
            </h4>
        </div>
    </Link>
);

export default Sidebar; 