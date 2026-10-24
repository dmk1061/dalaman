import React from 'react';
import { FaMapMarkerAlt, FaMedkit, FaEnvelope } from 'react-icons/fa';
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

    const contactLabels = {
        location: locale === 'ru' ? 'Даламан / Мугла, Турция' : locale === 'de' ? 'Dalaman / Muğla, Türkei' : locale === 'tr' ? 'Dalaman / Muğla, Türkiye' : 'Dalaman / Muğla, Türkiye',
        emergency: locale === 'ru' ? 'Экстренные службы (112) и аптеки' : locale === 'de' ? 'Notruf (112) & Apotheken' : locale === 'tr' ? 'Acil Yardım (112) & Eczaneler' : 'Emergency (112) & Pharmacies',
        contactPage: locale === 'ru' ? 'Форма обратной связи →' : locale === 'de' ? 'Kontaktformular →' : locale === 'tr' ? 'İletişim Formu →' : 'Contact & Partnership →',
    };

    return (
        <footer className="bg-cyan-700 text-white pt-12 pb-20 md:pb-8 border-t border-cyan-600/50">
            <div className="portal-container">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
                    <FooterColumn title={dict.footer.about_region} links={[
                        { name: dict.footer.links.geography_history, href: '/articles/geography' },
                        { name: dict.footer.links.climate_seasons, href: '/articles/climate-and-seasons' },
                        { name: dict.footer.links.culture_traditions, href: '/articles/culture-and-traditions' },
                    ]} localize={localize} />

                    <FooterColumn title={dict.footer.where_to_go} links={[
                        { name: dict.footer.links.main_resorts, href: '/city-guide' },
                        { name: dict.footer.links.small_towns, href: '/city-guide/small-towns' },
                        { name: dict.footer.links.best_beaches, href: '/beaches' },
                    ]} localize={localize} />

                    <FooterColumn title={dict.footer.what_to_do} links={[
                        { name: dict.footer.links.ancient_cities, href: '/articles/ancient-cities' },
                        { name: dict.footer.links.active_recreation, href: '/articles/paragliding' },
                        { name: dict.footer.links.yachting_sailing, href: '/articles/yachting' },
                        { name: dict.footer.links.gastronomy, href: '/articles/gastronomy' },
                        { name: dict.footer.links.markets_shopping, href: '/articles/markets-shopping' },
                    ]} localize={localize} />

                    <FooterColumn title={dict.footer.services} links={[
                        { name: locale === 'ru' ? 'Авиабилеты и чартеры' : locale === 'de' ? 'Flüge & Direktcharter' : locale === 'tr' ? 'Uçak Bileti & Çarter' : 'Flights & Direct Charters', href: '/services/flights' },
                        { name: dict.footer.links.transfers, href: '/services/transfers' },
                        { name: dict.footer.links.car_rental, href: '/services/car-rental' },
                        { name: dict.footer.links.real_estate, href: '/services/real-estate' },
                        { name: dict.footer.links.excursions, href: '/services/excursions-tours' },
                        { name: dict.footer.links.diving, href: '/services/diving' },
                        { name: dict.footer.links.spearfishing, href: '/services/tuna-fishing' },
                    ]} localize={localize} />

                    <FooterColumn title={dict.footer.planning} links={[
                        { name: dict.footer.links.how_to_get_there, href: '/articles/transport' },
                        { name: dict.footer.links.transport, href: '/articles/transport' },
                        { name: dict.footer.links.useful_tips, href: '/articles/useful-tips' },
                    ]} localize={localize} />

                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider text-cyan-100 mb-4">{dict.footer.contacts}</h3>
                        <ul className="space-y-3 text-sm text-cyan-50">
                            <li className="flex items-start gap-2.5">
                                <FaEnvelope className="mt-1 text-cyan-300 flex-shrink-0" size={13} />
                                <a href="mailto:info@dalaman.info" className="hover:text-white transition-colors font-medium break-all">
                                    info@dalaman.info
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <FaMapMarkerAlt className="mt-1 text-cyan-300 flex-shrink-0" size={13} />
                                <span className="text-cyan-100/90 text-xs leading-snug">{contactLabels.location}</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <FaMedkit className="mt-1 text-cyan-300 flex-shrink-0" size={13} />
                                <Link href={localize('/articles/useful-contacts')} className="hover:text-white transition-colors text-xs leading-snug underline decoration-cyan-400/50 underline-offset-2">
                                    {contactLabels.emergency}
                                </Link>
                            </li>
                            <li className="pt-1">
                                <Link
                                    href={localize('/contacts')}
                                    className="inline-block px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-colors"
                                >
                                    {contactLabels.contactPage}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Visitor Analytics Pulse Banner */}
                <div className="text-slate-900 my-6">
                    <VisitorAnalyticsWidget variant="footer" locale={locale} />
                </div>

                <div className="border-t border-cyan-600/80 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-cyan-100">
                    <p>{dict.footer.rights_reserved}</p>
                    <p className="text-cyan-200/90">{dict.footer.developed_by}</p>
                </div>
            </div>
        </footer>
    );
};

const FooterColumn = ({ title, links, localize }: { title: string, links: { name: string, href: string }[], localize: (path: string) => string }) => (
    <div>
        <h3 className="font-bold text-sm uppercase tracking-wider text-cyan-100 mb-4">{title}</h3>
        <ul className="space-y-2 text-sm">
            {links.map(link => (
                <li key={link.name}>
                    <Link href={localize(link.href)} className="text-cyan-50/90 hover:text-white transition-colors">
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default Footer;
