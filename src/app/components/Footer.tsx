import React from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="bg-cyan-700 text-white pt-10 pb-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
                    <FooterColumn title="О регионе" links={[
                        { name: 'География и история', href: '/articles/geography-history' },
                        { name: 'Климат и сезоны', href: '/articles/climate-seasons' },
                        { name: 'Культура и традиции', href: '/articles/culture-traditions' },
                    ]}/>
                     <FooterColumn title="Куда поехать" links={[
                        { name: 'Основные курорты', href: '/city-guide/main-resorts' },
                        { name: 'Малые города', href: '/city-guide/small-towns' },
                        { name: 'Лучшие пляжи', href: '/articles/beaches' },
                    ]}/>
                     <FooterColumn title="Чем заняться" links={[
                        { name: 'Античные города', href: '/articles/ancient-cities' },
                        { name: 'Активный отдых', href: '/articles/active-leisure' },
                        { name: 'Яхтинг и парусный спорт', href: '/articles/yachting-guide' },
                        { name: 'Гастрономия', href: '/articles/gastronomy' },
                        { name: 'Рынки и шопинг', href: '/articles/markets-shopping' },
                    ]}/>
                    <FooterColumn title="Услуги" links={[
                        { name: 'Трансферы', href: '/services/transfers' },
                        { name: 'Аренда авто', href: '/services/car-rental' },
                        { name: 'Недвижимость', href: '/services/real-estate' },
                        { name: 'Экскурсии', href: '/services/excursions-tours' },
                        { name: 'Дайвинг', href: '/services/diving' },
                        { name: 'Подводная охота', href: '/services/tuna-fishing' },
                    ]}/>
                    <FooterColumn title="Планирование" links={[
                        { name: 'Как добраться', href: '/articles/how-to-get-there' },
                        { name: 'Транспорт', href: '/articles/transport' },
                        { name: 'Полезные советы', href: '/articles/useful-tips' },
                    ]}/>
                     <div>
                        <h3 className="font-bold text-lg mb-4">Контакты</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <FaPhoneAlt className="mr-3" />
                                <span>000-000-00-00</span>
                            </li>
                            <li className="flex items-center">
                                <FaWhatsapp className="mr-3" />
                                <span>000-000-00-00</span>
                            </li>
                             <li className="flex items-center">
                                <MdEmail className="mr-3" />
                                <span>dmk1061@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-cyan-600 mt-8 pt-4 flex justify-between items-center text-sm">
                    <p>© 2025 Твой гид по Ликии. Все права защищены.</p>
                    <p>Разработано AI</p>
                </div>
            </div>
        </footer>
    );
};

const FooterColumn = ({ title, links }: { title: string, links: { name: string, href: string }[] }) => (
    <div>
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <ul>
            {links.map(link => (
                <li key={link.name} className="mb-2"><a href={link.href} className="hover:text-blue-300">{link.name}</a></li>
            ))}
        </ul>
    </div>
)

export default Footer; 