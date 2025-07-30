"use client";

import React, { useRef, useState, useEffect } from 'react';
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

// Тип для элементов калейдоскопа
interface KaleidoscopeItem {
    title: string;
    image: string;
    href: string;
}

// Полный список всех доступных локаций для калейдоскопа
const allKaleidoscopeItems: KaleidoscopeItem[] = [
    // Пляжи Мармариса
    { title: "Пляж Ичмелер", image: "/api/images/locations/marmaris/beach/Icmeler/icmeler.jpg", href: "/marmaris/beach/Icmeler" },
    { title: "Турунч", image: "/api/images/locations/marmaris/beach/Turunc/turunc.jpg", href: "/marmaris/beach/Turunc" },
    { title: "Акяка", image: "/api/images/locations/marmaris/beach/Akyaka/Akyaka.jpg", href: "/marmaris/beach/Akyaka" },
    { title: "Бухта Амос", image: "/api/images/locations/marmaris/beach/AmosBay/amosBay.jpg", href: "/marmaris/beach/AmosBay" },
    { title: "Клеопатра Седир", image: "/api/images/locations/marmaris/beach/CleopatraSedir/cleo-sedir.jpg", href: "/marmaris/beach/CleopatraSedir" },
    
    // Пляжи Дачи
    { title: "Домузбуку", image: "/api/images/locations/dacha/beach/Domuzbuku/domuzbuku.jpg", href: "/dacha/beach/Domuzbuku" },
    { title: "Карги", image: "/api/images/locations/dacha/beach/Kargi/kargi.jpg", href: "/dacha/beach/Kargi" },
    { title: "Кумлук", image: "/api/images/locations/dacha/beach/Kumluk/kumluk.jpg", href: "/dacha/beach/Kumluk" },
    { title: "Овобуку", image: "/api/images/locations/dacha/beach/Ovobuku/ovobuku.jpg", href: "/dacha/beach/Ovobuku" },
    { title: "Паламутбуку", image: "/api/images/locations/dacha/beach/Palamutbuku/palamutbuku.jpg", href: "/dacha/beach/Palamutbuku" },
    
    // Достопримечательности Дачи
    { title: "Книдос", image: "/api/images/locations/dacha/ruine/knidos/knidos.jpg", href: "/dacha/sight/knidos" },
    { title: "Эски Дача", image: "/api/images/locations/dacha/todo/eskidacha/eski_dacha.jpg", href: "/dacha/sight/eskidacha" },
    
    // Пляжи Койчегиза
    { title: "Экинчик", image: "/api/images/locations/koycegiz/beach/Ekincik/Ekincik.jpg", href: "/koycegiz/beach/Ekincik" },
    
    // Достопримечательности Койчегиза
    { title: "Каунос", image: "/api/images/locations/koycegiz/ruine/Kaunos/kaunos.jpg", href: "/koycegiz/sight/Kaunos" },
    { title: "Сулунгур", image: "/api/images/locations/koycegiz/todo/Sultanye/sultanye.jpg", href: "/koycegiz/sight/Sultanye" },
    
    // Пляжи Дальяна
    { title: "Пляж Истузу", image: "/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg", href: "/dalyan/beach/Istuzu" },
    { title: "Асикею", image: "/api/images/locations/dalyan/beach/asikoyu/asikoyu.jpg", href: "/dalyan/beach/asikoyu" },
    
    // Достопримечательности Дальяна
    { title: "Ликийские гробницы", image: "/api/images/locations/dalyan/ruine/LycianTombs/lyciantombs.jpg", href: "/dalyan/sight/LycianTombs" },
    { title: "Сулунгур лодки", image: "/api/images/locations/dalyan/todo/boat/boat.jpg", href: "/dalyan/sight/boat" },
    
    // Пляжи Даламана
    { title: "Пляж Саригерме", image: "/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg", href: "/dalaman/beach/Sarigerme" },
    { title: "Каячик", image: "/api/images/locations/dalaman/beach/Kayacik/kayacik.jpg", href: "/dalaman/beach/Kayacik" },
    { title: "Сарсала", image: "/api/images/locations/dalaman/beach/Sarsala/sarsala.jpg", href: "/dalaman/beach/Sarsala" },
    
    // Достопримечательности Даламана
    { title: "Калында", image: "/api/images/locations/dalaman/todo/kalynda/kalynda.jpg", href: "/dalaman/sight/kalynda" },
    { title: "Река Даламан", image: "/api/images/locations/dalaman/todo/river/river.jpg", href: "/dalaman/sight/river" },
    
    // Пляжи Гёджека
    { title: "Бедри Рахми", image: "/api/images/locations/gocek/beach/bedri/bedri.jpg", href: "/gocek/beach/bedri" },
    { title: "Терсане", image: "/api/images/locations/gocek/beach/tersane/tersane.jpg", href: "/gocek/beach/tersane" },
    { title: "Хамам", image: "/api/images/locations/gocek/beach/hamam/hamam.jpg", href: "/gocek/beach/hamam" },
    { title: "Инлидже", image: "/api/images/locations/gocek/beach/inlice/inlice.jpg", href: "/gocek/beach/inlice" },
    
    // Пляжи Фетхие
    { title: "Олюдениз", image: "/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg", href: "/fethiye/beach/bluelagoon" },
    { title: "Бельджекиз", image: "/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg", href: "/fethiye/beach/belcekiz" },
    { title: "Долина Бабочек", image: "/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg", href: "/fethiye/beach/kelebekler" },
    { title: "Кидрак", image: "/api/images/locations/fethiye/beach/kidrak/kidrak.jpg", href: "/fethiye/beach/kidrak" },
    { title: "Кабак Кою", image: "/api/images/locations/fethiye/beach/kabakkoyu/kabakkoyu.jpg", href: "/fethiye/beach/kabakkoyu" },
    
    // Достопримечательности Фетхие
    { title: "Каякёй", image: "/api/images/locations/fethiye/sight/kayakoy/kayakoy.jpg", href: "/fethiye/sight/kayakoy" },
    { title: "Ликийские гробницы Фетхие", image: "/api/images/locations/fethiye/sight/lycaintombs/lycaintombs.jpg", href: "/fethiye/sight/lycaintombs" },
    { title: "Замок Фетхие", image: "/api/images/locations/fethiye/sight/castle/castle.jpg", href: "/fethiye/sight/castle" },
    { title: "Тлос", image: "/api/images/locations/fethiye/sight/tlos/tlos.jpg", href: "/fethiye/sight/tlos" },
    { title: "Саклыкент", image: "/api/images/locations/fethiye/todo/saklikent/saklikent.jpg", href: "/fethiye/sight/saklikent" },
    { title: "Бабадаг", image: "/api/images/locations/fethiye/todo/babadag/babadag.jpg", href: "/fethiye/sight/babadag" },
    
    // Пляжи Каша
    { title: "Пляж Капуташ", image: "/api/images/locations/kas/beach/kaputas/kaputas.jpg", href: "/kas/beach/kaputas" },
    { title: "Пляж Патара", image: "/api/images/locations/kas/beach/patara/patara.jpg", href: "/kas/beach/patara" },
    { title: "Инжебогаз", image: "/api/images/locations/kas/beach/incebogaz/incebogaz.jpg", href: "/kas/beach/incebogaz" },
    { title: "Лиманагзы", image: "/api/images/locations/kas/beach/limangzi/limangzi.jpg", href: "/kas/beach/limangzi" },
    { title: "Кючюк Чакыл", image: "/api/images/locations/kas/beach/kucuk/kucuk.jpg", href: "/kas/beach/kucuk" },
    { title: "Бююк Чакыл", image: "/api/images/locations/kas/beach/buyuk/buyuk.jpg", href: "/kas/beach/buyuk" },
    
    // Достопримечательности Каша
    { title: "Кекова", image: "/api/images/locations/kas/sight/kekova/kekova.jpg", href: "/kas/sight/kekova" },
    { title: "Летоон", image: "/api/images/locations/kas/sight/letoon/letoon.jpg", href: "/kas/sight/letoon" },
    { title: "Ксантос", image: "/api/images/locations/kas/sight/xanthos/xanthos.jpg", href: "/kas/sight/xanthos" },
    { title: "Театр Каша", image: "/api/images/locations/kas/sight/theater/theater.jpg", href: "/kas/sight/theater" },
    { title: "Гробница Льва", image: "/api/images/locations/kas/sight/uzuncarsi/uzuncarsi.jpg", href: "/kas/sight/uzuncarsi" },
    { title: "Скальные гробницы Каша", image: "/api/images/locations/kas/sight/kastombs/kastombs.jpg", href: "/kas/sight/kastombs" }
];

// Функция для перемешивания массива
const shuffleArray = (array: KaleidoscopeItem[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Функция для получения случайных элементов
const getRandomItems = (items: KaleidoscopeItem[], count: number) => {
    const shuffled = shuffleArray(items);
    return shuffled.slice(0, count);
};

const MainContent = () => {
    const sliderRef = useRef<Slider>(null);
    const [kaleidoscopeItems, setKaleidoscopeItems] = useState<KaleidoscopeItem[]>([]);
    
    // Генерируем рандомные элементы при загрузке компонента
    useEffect(() => {
        const randomCount = Math.floor(Math.random() * 5) + 8; // От 8 до 12 элементов
        const randomItems = getRandomItems(allKaleidoscopeItems, randomCount);
        setKaleidoscopeItems(randomItems);
    }, []);

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
                {kaleidoscopeItems.length > 0 ? (
                    <Slider ref={sliderRef} {...sliderSettings}>
                        {kaleidoscopeItems.map((item: KaleidoscopeItem, index: number) => (
                           <div key={index} className="px-2 py-2">
                               <KaleidoscopeCard title={item.title} image={item.image} href={item.href} />
                           </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="h-48 flex items-center justify-center">
                        <div className="text-gray-500">Загрузка локаций...</div>
                    </div>
                )}
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

const QuickLinkCard = ({ icon, title, href }: { icon: React.ReactNode, title: string, href: string }) => (
    <Link href={href || '#'} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="text-cyan-500 mb-2">{icon}</div>
        <h3 className="font-semibold text-sm text-center text-gray-700">{title}</h3>
    </Link>
);


const MosaicCard = ({ title, description, href, image }: { title: string, description: string, href: string, image: string }) => (
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

const KaleidoscopeCard = ({ title, image, href }: { title: string, image: string, href: string }) => (
    <Link href={href} className="block bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
         <div className="relative h-40 w-full overflow-hidden">
            <Image src={image} alt={title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300"/>
        </div>
        <div className="p-3 text-center bg-white">
            <h3 className="font-semibold text-gray-700 text-sm group-hover:text-blue-600 transition-colors">{title}</h3>
        </div>
    </Link>
);

export default MainContent; 