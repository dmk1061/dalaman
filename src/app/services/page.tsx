import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { FaCar, FaAnchor, FaMapMarkedAlt, FaHome, FaShuttleVan, FaFish, FaWater, FaChevronRight } from 'react-icons/fa';

const services = [
    {
        title: "Трансферы",
        description: "Комфортабельные индивидуальные трансферы из аэропорта Даламан до любого отеля или курорта по фиксированной цене.",
        href: "/services/transfers",
        icon: <FaShuttleVan size={28} />,
        color: "bg-blue-500"
    },
    {
        title: "Аренда авто",
        description: "Широкий выбор автомобилей от эконом-класса до внедорожников для самостоятельных путешествий по региону.",
        href: "/services/car-rental",
        icon: <FaCar size={28} />,
        color: "bg-cyan-500"
    },
    {
        title: "Аренда яхт",
        description: "Аренда традиционных турецких гулет, парусных и моторных яхт для незабываемого отдыха в бухтах Гёджека и Фетхие.",
        href: "/services/yacht-rental",
        icon: <FaAnchor size={28} />,
        color: "bg-emerald-500"
    },
    {
        title: "Экскурсии и туры",
        description: "Групповые и индивидуальные программы: древние города Ликии, река Дальян, ущелье Саклыкент и полеты на параплане.",
        href: "/services/excursions-tours",
        icon: <FaMapMarkedAlt size={28} />,
        color: "bg-amber-500"
    },
    {
        title: "Дайвинг",
        description: "Погружения для новичков и сертифицированных дайверов в кристально чистых водах Каша — лучшем дайв-споте Турции.",
        href: "/services/diving",
        icon: <FaWater size={28} />,
        color: "bg-sky-500"
    },
    {
        title: "Подводная охота",
        description: "Эксклюзивные рыболовные туры и подводная охота на тунца с опытными местными капитанами.",
        href: "/services/tuna-fishing",
        icon: <FaFish size={28} />,
        color: "bg-indigo-500"
    },
    {
        title: "Недвижимость",
        description: "Покупка и долгосрочная аренда вилл и апартаментов в Даламане, Фетхие, Гёджеке и Каше.",
        href: "/services/real-estate",
        icon: <FaHome size={28} />,
        color: "bg-teal-500"
    }
];

const ServicesPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 pb-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">НАШИ СЕРВИСЫ</span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">
                        Услуги на побережье
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Всё необходимое для вашего комфортного отдыха и проживания на Ликийском побережье: от организации трансферов до аренды вилл и яхт.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <div key={index} className="group bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                            <div>
                                <div className={`inline-flex items-center justify-center p-4 rounded-2xl ${service.color} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {service.icon}
                                </div>
                                <h3 className="font-black text-xl text-slate-900 mb-3 uppercase italic">
                                    {service.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                                    {service.description}
                                </p>
                            </div>
                            <Link 
                                href={service.href}
                                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors mt-auto"
                            >
                                Подробнее <FaChevronRight size={10} />
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ServicesPage;