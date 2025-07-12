"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { FaPlane, FaBuilding, FaCar, FaShip, FaUsers, FaConciergeBell, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const quickLinks = [
    { icon: <FaPlane size={32} />, title: 'Авиабилеты', href: '#' },
    { icon: <FaBuilding size={32} />, title: 'Бронирование отелей', href: '#' },
    { icon: <FaCar size={32} />, title: 'Аренда авто', href: '/services/car-rental' },
    { icon: <FaShip size={32} />, title: 'Аренда яхт', href: '/services/yacht-rental' },
    { icon: <FaUsers size={32} />, title: 'Экскурсии', href: '/services/excursions-tours' },
    { icon: <FaConciergeBell size={32} />, title: 'Прочие сервисы', href: '#' },
];

const mosaicItems = [
    {
        title: "Блоги",
        description: "Живые истории и советы от путешественников, уже побывавших здесь.",
        href: "#",
        image: "/dalaman2.jpg"
    },
    {
        title: "Гиды",
        description: "Найдите своего идеального проводника по побережью для уникальных экскурсий.",
        href: "#",
        image: "/dalaman1.jpg"
    },
    {
        title: "Форумы",
        description: "Обсуждайте маршруты, делитесь опытом и задавайте вопросы в нашем сообществе.",
        href: "#",
        image: "/dalaman2.jpg"
    }
];

const kaleidoscopeItems = [
    { title: "Letoon", image: "/dalaman1.jpg" },
    { title: "Kas Guide", image: "/dalaman2.jpg" },
    { title: "Ovacik Hisaronu", image: "/dalaman1.jpg" },
    { title: "Dalaman Guide", image: "/dalaman2.jpg" },
    { title: "Turunc", image: "/dalaman1.jpg" },
    { title: "Fethiye", image: "/dalaman2.jpg" },
];

const MainContent = () => {
    const sliderRef = useRef<Slider>(null);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <div className="space-y-12">
            {/* Quick Links */}
             <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                {quickLinks.map(link => <QuickLinkCard key={link.title} icon={link.icon} title={link.title} href={link.href} />)}
            </div>

            {/* Kaleidoscope Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Калейдоскоп</h2>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => sliderRef.current?.slickPrev()} className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition">
                            <FaChevronLeft className="text-gray-600"/>
                        </button>
                        <button onClick={() => sliderRef.current?.slickNext()} className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition">
                            <FaChevronRight className="text-gray-600"/>
                        </button>
                        <Link href="/city-guide" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold text-sm transition-colors">СМОТРЕТЬ ВСЕ</Link>
                    </div>
                </div>
                <Slider ref={sliderRef} {...sliderSettings}>
                    {kaleidoscopeItems.map((item, index) => (
                       <div key={index} className="px-2 py-2">
                           <KaleidoscopeCard title={item.title} image={item.image} />
                       </div>
                    ))}
                </Slider>
            </div>

            {/* Mosaic of Impressions Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Мозаика впечатлений</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {mosaicItems.map(item => (
                        <MosaicCard key={item.title} {...item} />
                    ))}
                </div>
            </div>

            {/* Map Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Карта региона</h2>
                <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md">
                    <Image
                        src="/map.jpg"
                        alt="Карта побережья Турции"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    );
};

const QuickLinkCard = ({ icon, title, href }) => (
    <Link href={href || '#'} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="text-cyan-500 mb-2">{icon}</div>
        <h3 className="font-semibold text-sm text-center text-gray-700">{title}</h3>
    </Link>
);


const MosaicCard = ({ title, description, href, image }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden group h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
            <Image src={image} alt={title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-5">
            <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </div>
);

const KaleidoscopeCard = ({ title, image }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden group">
         <div className="relative h-40 w-full overflow-hidden">
            <Image src={image} alt={title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300"/>
        </div>
        <div className="p-3 text-center bg-white">
            <h3 className="font-semibold text-gray-700 text-sm">{title}</h3>
        </div>
    </div>
);

export default MainContent; 