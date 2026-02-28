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

const CollectionCard = ({ title, count, image, tag }: { title: string, count: string, image: string, tag: string }) => (
    <div className="group relative h-64 rounded-[2.5rem] overflow-hidden premium-shadow cursor-pointer">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute top-6 right-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase text-white border border-white/20">{tag}</span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8">
            <h3 className="text-white font-black text-lg leading-tight mb-1 group-hover:text-cyan-400 transition-colors">{title}</h3>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{count}</p>
        </div>
    </div>
);

const MainContent = () => {
    const sliderRef = useRef<Slider>(null);
    const [kaleidoscopeItems, setKaleidoscopeItems] = useState<KaleidoscopeItem[]>([]);

    useEffect(() => {
        const randomCount = Math.floor(Math.random() * 5) + 8;
        const randomItems = getRandomItems(allKaleidoscopeItems, randomCount);
        setKaleidoscopeItems(randomItems);
    }, []);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1.5,
                }
            }
        ]
    };

    return (
        <div className="space-y-20 pb-20">
            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {quickLinks.map(link => <QuickLinkCard key={link.title} icon={link.icon} title={link.title} href={link.href} />)}
            </div>

            {/* Kaleidoscope Section */}
            <div className="relative">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">Калейдоскоп</h2>
                        <p className="text-slate-500 font-medium">Случайные открытия на побережье каждый день</p>
                    </div>
                    <div className="flex items-center space-x-3 self-end">
                        <button onClick={() => sliderRef.current?.slickPrev()} className="p-3 rounded-full bg-white premium-shadow hover:bg-slate-50 transition-all border border-slate-100 group">
                            <FaChevronLeft className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                        </button>
                        <button onClick={() => sliderRef.current?.slickNext()} className="p-3 rounded-full bg-white premium-shadow hover:bg-slate-50 transition-all border border-slate-100 group">
                            <FaChevronRight className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                        </button>
                        <Link href="/city-guide" className="ml-4 px-6 py-3 bg-slate-900 text-white text-xs font-bold tracking-widest rounded-full hover:bg-cyan-600 transition-all uppercase">ВСЕ ЛОКАЦИИ</Link>
                    </div>
                </div>

                {kaleidoscopeItems.length > 0 ? (
                    <div className="-mx-2">
                        <Slider ref={sliderRef} {...sliderSettings}>
                            {kaleidoscopeItems.map((item: KaleidoscopeItem, index: number) => (
                                <div key={index} className="px-3 py-4">
                                    <KaleidoscopeCard title={item.title} image={item.image} href={item.href} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="h-64 flex items-center justify-center bg-slate-100 rounded-3xl animate-pulse">
                        <div className="text-slate-400 font-medium italic">Подбираем интересные места...</div>
                    </div>
                )}
            </div>

            {/* Mosaic Section */}
            <div>
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4 uppercase italic">Мозаика впечатлений</h2>
                    <p className="text-slate-500">Погрузитесь в атмосферу региона через истории, советы и живое общение нашего сообщества.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {mosaicItems.map(item => (
                        <MosaicCard key={item.title} {...item} />
                    ))}
                </div>
            </div>

            {/* Collections Section */}
            <div>
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">Кураторские подборки</h2>
                        <p className="text-slate-500 font-medium">Специально отобранные маршруты и места под ваш вкус</p>
                    </div>
                    <Link href="/collections" className="text-cyan-600 font-bold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider">
                        Все коллекции <FaChevronRight size={10} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <CollectionCard title="Романтика для двоих" count="12 мест" image="/dalaman1.jpg" tag="Love" />
                    <CollectionCard title="Семейный отдых" count="8 локаций" image="/dalaman2.jpg" tag="Family" />
                    <CollectionCard title="Гастро-тур по региону" count="15 ресторанов" image="/dalaman1.jpg" tag="Food" />
                    <CollectionCard title="Скрытые бухты" count="10 пляжей" image="/dalaman2.jpg" tag="Nature" />
                </div>
            </div>

            {/* Map Section */}
            <div className="group">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Карта региона</h2>
                    <Link href="/map" className="text-cyan-600 font-bold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider">
                        Открыть интерактивную версию <FaChevronRight size={10} />
                    </Link>
                </div>
                <div className="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden premium-shadow group-hover:shadow-2xl transition-all duration-500 border-4 border-white">
                    <Image
                        src="/map.jpg"
                        alt="Карта побережья Турции"
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-[10s] ease-linear"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </div>
        </div>
    );
};

const QuickLinkCard = ({ icon, title, href }: { icon: React.ReactNode, title: string, href: string }) => (
    <Link href={href || '#'} className="group bg-white p-6 rounded-[2rem] premium-shadow border border-slate-50 flex flex-col items-center justify-center hover:bg-cyan-500 hover:scale-105 transition-all duration-300">
        <div className="text-cyan-500 mb-4 group-hover:text-white transition-colors">{icon}</div>
        <h3 className="font-bold text-xs text-center text-slate-700 group-hover:text-white uppercase tracking-wider">{title}</h3>
    </Link>
);


const MosaicCard = ({ title, description, href, image }: { title: string, description: string, href: string, image: string }) => (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden premium-shadow flex flex-col h-full hover:-translate-y-2 transition-all duration-500 border border-slate-50">
        <div className="relative h-60 w-full overflow-hidden">
            <Image src={image} alt={title} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">Travel</span>
            </div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
            <h3 className="font-black text-xl mb-4 text-slate-900 group-hover:text-cyan-600 transition-colors uppercase italic">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
            <Link href={href} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors">
                Читать больше <FaChevronRight size={10} />
            </Link>
        </div>
    </div>
);

const KaleidoscopeCard = ({ title, image, href }: { title: string, image: string, href: string }) => {
    const [imgSrc, setImgSrc] = useState(image);
    const [isError, setIsError] = useState(false);

    return (
        <Link href={href} className="block relative h-80 rounded-[2.5rem] overflow-hidden premium-shadow group">
            <Image
                src={imgSrc}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-700 ease-out"
                onError={() => {
                    if (!isError) {
                        setImgSrc('/dalaman1.jpg'); // Fallback
                        setIsError(true);
                    }
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-cyan-900/90 group-hover:via-cyan-600/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-bold text-white text-lg leading-tight drop-shadow-md">{title}</h3>
                <div className="w-8 h-1 bg-cyan-400 mt-4 overflow-hidden rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </div>
        </Link>
    );
};


export default MainContent;