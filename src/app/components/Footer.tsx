import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';
import VisitorAnalyticsWidget from '@/app/components/VisitorAnalyticsWidget';
import { getDictionary, Locale } from '@/lib/dictionary';

type FooterProps = {
  locale?: string;
};

const Footer = async ({ locale = 'ru' }: FooterProps) => {
    const dict = await getDictionary(locale as Locale);

    const localize = (path: string) => {
      if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `/${locale}${cleanPath}`;
    };

    return (
        <footer className="bg-cyan-700 text-white pt-10 pb-4">
            <div className="w-full max-w-[2180px] mx-auto px-4 sm:px-6 md:px-11 lg:px-11">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
                    <FooterColumn title={dict.footer.about_region} links={[
                        { name: dict.footer.links.geography_history, href: '/articles/geography' },
                        { name: dict.footer.links.climate_seasons, href: '/articles/climate-and-seasons' },
                        { name: dict.footer.links.culture_traditions, href: '/articles/culture-and-traditions' },
                    ]} localize={localize}/>
                     <FooterColumn title={dict.footer.where_to_go} links={[
                        { name: dict.footer.links.main_resorts, href: '/city-guide' },
                        { name: dict.footer.links.small_towns, href: '/city-guide/small-towns' },
                        { name: dict.footer.links.best_beaches, href: '/beaches' },
                    ]} localize={localize}/>
                     <FooterColumn title={dict.footer.what_to_do} links={[
                        { name: dict.footer.links.ancient_cities, href: '/articles/ancient-cities' },
                        { name: dict.footer.links.active_recreation, href: '/articles/paragliding' },
                        { name: dict.footer.links.yachting_sailing, href: '/articles/yachting' },
                        { name: dict.footer.links.gastronomy, href: '/articles/gastronomy' },
                        { name: dict.footer.links.markets_shopping, href: '/articles/markets-shopping' },
                    ]} localize={localize}/>
                    <FooterColumn title={dict.footer.services} links={[
                        { name: dict.footer.links.transfers, href: '/services/transfers' },
                        { name: dict.footer.links.car_rental, href: '/services/car-rental' },
                        { name: dict.footer.links.real_estate, href: '/services/real-estate' },
                        { name: dict.footer.links.excursions, href: '/services/excursions-tours' },
                        { name: dict.footer.links.diving, href: '/services/diving' },
                        { name: dict.footer.links.spearfishing, href: '/services/tuna-fishing' },
                    ]} localize={localize}/>
                    <FooterColumn title={dict.footer.planning} links={[
                        { name: dict.footer.links.how_to_get_there, href: '/articles/transport' },
                        { name: dict.footer.links.transport, href: '/articles/transport' },
                        { name: dict.footer.links.useful_tips, href: '/articles/useful-tips' },
                    ]} localize={localize}/>
                     <div>
                        <h3 className="font-bold text-lg mb-4">{dict.footer.contacts}</h3>
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

                {/* Visitor Analytics Pulse Banner (Plug & Play Preview) */}
                <div className="text-slate-900 my-6">
                    <VisitorAnalyticsWidget variant="footer" locale={locale} />
                </div>

                <div className="border-t border-cyan-600 mt-8 pt-4 flex justify-between items-center text-sm">
                    <p>{dict.footer.rights_reserved}</p>
                    <p>{dict.footer.developed_by}</p>
                </div>
            </div>
        </footer>
    );
};

const FooterColumn = ({ title, links, localize }: { title: string, links: { name: string, href: string }[], localize: (path: string) => string }) => (
    <div>
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <ul>
            {links.map(link => (
                <li key={link.name} className="mb-2">
                    <Link href={localize(link.href)} className="hover:text-blue-300">
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)

export default Footer;