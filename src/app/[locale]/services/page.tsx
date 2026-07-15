import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { FaCar, FaAnchor, FaMapMarkedAlt, FaHome, FaShuttleVan, FaFish, FaWater, FaChevronRight, FaPlane } from 'react-icons/fa';

const servicesConfig = [
    {
        key: "flights",
        href: "/services/flights",
        icon: <FaPlane size={28} />,
        color: "bg-sky-600"
    },
    {
        key: "transfers",
        href: "/services/transfers",
        icon: <FaShuttleVan size={28} />,
        color: "bg-blue-500"
    },
    {
        key: "car_rental",
        href: "/services/car-rental",
        icon: <FaCar size={28} />,
        color: "bg-cyan-500"
    },
    {
        key: "yacht_rental",
        href: "/services/yacht-rental",
        icon: <FaAnchor size={28} />,
        color: "bg-emerald-500"
    },
    {
        key: "excursions",
        href: "/services/excursions-tours",
        icon: <FaMapMarkedAlt size={28} />,
        color: "bg-amber-500"
    },
    {
        key: "diving",
        href: "/services/diving",
        icon: <FaWater size={28} />,
        color: "bg-sky-500"
    },
    {
        key: "tuna_fishing",
        href: "/services/tuna-fishing",
        icon: <FaFish size={28} />,
        color: "bg-indigo-500"
    },
    {
        key: "real_estate",
        href: "/services/real-estate",
        icon: <FaHome size={28} />,
        color: "bg-teal-500"
    }
];

const translations: Record<string, {
    badge: string;
    title: string;
    subtitle: string;
    moreDetails: string;
    items: Record<string, { title: string; description: string }>;
}> = {
    en: {
        badge: "OUR SERVICES",
        title: "Coast Services",
        subtitle: "Everything you need for your comfortable holiday and stay on the Lycian coast: from organizing transfers to renting villas and yachts.",
        moreDetails: "More Details",
        items: {
            flights: {
                title: "Flights & Tickets",
                description: "Direct charters and scheduled flights to Dalaman Airport (DLM) with Aviasales integration and smart benchmarks."
            },
            transfers: {
                title: "Transfers",
                description: "Comfortable private transfers from Dalaman airport to any hotel or resort at a fixed price."
            },
            car_rental: {
                title: "Car Rental",
                description: "A wide range of cars from economy to SUVs for self-guided travel around the region."
            },
            yacht_rental: {
                title: "Yacht Rental",
                description: "Rental of traditional Turkish gulets, sailing and motor yachts for an unforgettable holiday in the bays of Göcek and Fethiye."
            },
            excursions: {
                title: "Excursions & Tours",
                description: "Group and individual programs: ancient cities of Lycia, Dalyan river, Saklıkent gorge and paragliding flights."
            },
            diving: {
                title: "Diving",
                description: "Dives for beginners and certified divers in the crystal clear waters of Kaş - the best dive spot in Turkey."
            },
            tuna_fishing: {
                title: "Underwater Hunting",
                description: "Exclusive fishing tours and underwater hunting for tuna with experienced local captains."
            },
            real_estate: {
                title: "Real Estate",
                description: "Purchase and long-term rental of villas and apartments in Dalaman, Fethiye, Göcek and Kaş."
            }
        }
    },
    ru: {
        badge: "НАШИ СЕРВИСЫ",
        title: "Услуги на побережье",
        subtitle: "Всё необходимое для вашего комфортного отдыха и проживания на Ликийском побережье: от организации трансферов до аренды вилл и яхт.",
        moreDetails: "Подробнее",
        items: {
            flights: {
                title: "Авиабилеты",
                description: "Прямые чартеры и регулярные рейсы в аэропорт Даламан (DLM) с поиском через Aviasales по лучшим ценам."
            },
            transfers: {
                title: "Трансферы",
                description: "Комфортабельные индивидуальные трансферы из аэропорта Даламан до любого отеля или курорта по фиксированной цене."
            },
            car_rental: {
                title: "Аренда авто",
                description: "Широкий выбор автомобилей от эконом-класса до внедорожников для самостоятельных путешествий по региону."
            },
            yacht_rental: {
                title: "Аренда яхт",
                description: "Аренда традиционных турецких гулет, парусных и моторных яхт для незабываемого отдыха в бухтах Гёджека и Фетхие."
            },
            excursions: {
                title: "Экскурсии и туры",
                description: "Групповые и индивидуальные программы: древние города Ликии, река Дальян, ущелье Саклыкент и полеты на параплане."
            },
            diving: {
                title: "Дайвинг",
                description: "Погружения для новичков и сертифицированных дайверов в кристально чистых водах Каша — лучшем дайв-споте Турции."
            },
            tuna_fishing: {
                title: "Подводная охота",
                description: "Эксклюзивные рыболовные туры и подводная охота на тунца с опытными местными капитанами."
            },
            real_estate: {
                title: "Недвижимость",
                description: "Покупка и долгосрочная аренда вилл и апартаментов в Даламане, Фетхие, Гёджеке и Каше."
            }
        }
    },
    de: {
        badge: "UNSERE DIENSTE",
        title: "Dienstleistungen an der Küste",
        subtitle: "Alles, was Sie für einen komfortablen Urlaub und Aufenthalt an der lykischen Küste benötigen: von der Organisation von Transfers bis zur Anmietung von Villen und Yachten.",
        moreDetails: "Details",
        items: {
            flights: {
                title: "Flüge & Tickets",
                description: "Direkte Charter und Linienflüge zum Flughafen Dalaman (DLM) mit Aviasales-Integration und Live-Vergleich."
            },
            transfers: {
                title: "Transfers",
                description: "Komfortable private Transfers vom Flughafen Dalaman zu jedem Hotel oder Resort zum Festpreis."
            },
            car_rental: {
                title: "Autovermietung",
                description: "Große Auswahl an Fahrzeugen von der Economy-Klasse bis hin zu SUVs für individuelle Reisen in der Region."
            },
            yacht_rental: {
                title: "Yachtcharter",
                description: "Vermietung von traditionellen türkischen Gulets, Segel- und Motoryachten für einen unvergesslichen Urlaub in den Buchten von Göcek und Fethiye."
            },
            excursions: {
                title: "Ausflüge & Touren",
                description: "Gruppen- und Einzelprogramme: antike Städte Lykiens, Fluss Dalyan, Saklıkent-Schlucht und Paragliding-Flüge."
            },
            diving: {
                title: "Tauchen",
                description: "Tauchgänge für Anfänger und zertifizierte Taucher im kristallklaren Wasser von Kaş - dem besten Tauchplatz der Türkei."
            },
            tuna_fishing: {
                title: "Unterwasserjagd",
                description: "Exklusive Angeltouren und Unterwasserjagd auf Thunfisch mit erfahrenen lokalen Kapitänen."
            },
            real_estate: {
                title: "Immobilien",
                description: "Kauf und langfristige Vermietung von Villen und Apartments in Dalaman, Fethiye, Göcek und Kaş."
            }
        }
    },
    tr: {
        badge: "HİZMETLERİMİZ",
        title: "Sahil Hizmetleri",
        subtitle: "Likya kıyılarında konforlu bir tatil ve konaklama için ihtiyacınız olan her şey: transfer organizasyonundan villa ve yat kiralamaya kadar.",
        moreDetails: "Daha Fazla Bilgi",
        items: {
            flights: {
                title: "Uçak Bileti",
                description: "Aviasales entegrasyonuyla Dalaman Havalimanı (DLM) yönüne en uygun doğrudan ve aktarmalı uçak biletleri."
            },
            transfers: {
                title: "Transferler",
                description: "Dalaman Havalimanı'ndan herhangi bir otele veya tesise sabit fiyatla konforlu özel transferler."
            },
            car_rental: {
                title: "Araç Kiralama",
                description: "Bölgede bağımsız seyahatler için ekonomik sınıftan SUV'lara kadar geniş araç yelpazesi."
            },
            yacht_rental: {
                title: "Yat Kiralama",
                description: "Göcek ve Fethiye koylarında unutulmaz bir tatil için geleneksel Türk guletleri, yelkenli ve motorlu yat kiralama."
            },
            excursions: {
                title: "Geziler ve Turlar",
                description: "Grup ve bireysel programlar: Likya'nın antik kentleri, Dalyan çayı, Saklıkent kanyonu ve yamaç paraşütü uçuşları."
            },
            diving: {
                title: "Dalış",
                description: "Türkiye'nin en iyi dalış noktası olan Kaş'ın kristal berraklığındaki sularında yeni başlayanlar ve sertifikalı dalgıçlar için dalışlar."
            },
            tuna_fishing: {
                title: "Zıpkınla Avcılık",
                description: "Deneyimli yerel kaptanlarla özel balıkçılık turları ve zıpkınla orkinos avcılığı."
            },
            real_estate: {
                title: "Emlak",
                description: "Dalaman, Fethiye, Göcek ve Kaş'ta satılık ve uzun dönem kiralık villa ve daireler."
            }
        }
    }
};

const ServicesPage = ({ params }: { params: { locale: string } }) => {
    const locale = params.locale || 'en';
    const t = translations[locale] || translations['en'];

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${locale}${cleanPath}`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
            <Header locale={locale} />
            <main className="flex-grow container mx-auto px-4 py-12 pb-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">{t.badge}</span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">
                        {t.title}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {servicesConfig.map((service, index) => {
                        const itemTranslation = t.items[service.key] || { title: service.key, description: "" };
                        return (
                            <div key={index} className="group bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                                <div>
                                    <div className={`inline-flex items-center justify-center p-4 rounded-2xl ${service.color} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="font-black text-xl text-slate-900 mb-3 uppercase italic">
                                        {itemTranslation.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                                        {itemTranslation.description}
                                    </p>
                                </div>
                                <Link 
                                    href={localize(service.href)}
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors mt-auto"
                                >
                                    {t.moreDetails} <FaChevronRight size={10} />
                                </Link>
                            </div>
                        );
                    })}
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
    { locale: 'tr' }
  ];
}

export default ServicesPage;