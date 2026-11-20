import React from 'react';
import { FaMapMarkerAlt, FaMedkit, FaEnvelope, FaCompass } from 'react-icons/fa';
import Link from 'next/link';
import VisitorAnalyticsWidget from '@/app/components/VisitorAnalyticsWidget';
import { getDictionary, Locale } from '@/lib/dictionary';
import { SITE_CONFIG } from '@/lib/site-config';

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
    location:
      locale === 'ru'
        ? 'Даламан / Мугла, Турция'
        : locale === 'de'
        ? 'Dalaman / Muğla, Türkei'
        : locale === 'tr'
        ? 'Dalaman / Muğla, Türkiye'
        : 'Dalaman / Muğla, Türkiye',
    emergency:
      locale === 'ru'
        ? 'Справка 112 и дежурные аптеки'
        : locale === 'de'
        ? 'Notruf (112) & Apotheken'
        : locale === 'tr'
        ? 'Acil Yardım (112) & Eczaneler'
        : 'Emergency (112) & Pharmacies',
    contactPage:
      locale === 'ru'
        ? 'Форма обратной связи →'
        : locale === 'de'
        ? 'Kontaktformular →'
        : locale === 'tr'
        ? 'İletişim Formu →'
        : 'Contact Editorial Team →',
    privacyLink:
      locale === 'ru'
        ? 'Политика конфиденциальности'
        : locale === 'de'
        ? 'Datenschutz & Affiliate-Hinweis'
        : locale === 'tr'
        ? 'Gizlilik Politikası'
        : 'Privacy Policy & Disclosure',
    affiliateDisclaimer:
      locale === 'ru'
        ? 'Портал может получать партнёрскую комиссию с бронирований без доплаты для вас.'
        : locale === 'de'
        ? 'Dieses Portal kann bei Buchungen eine Affiliate-Provision ohne Mehrkosten für Sie erhalten.'
        : locale === 'tr'
        ? 'Bu portal, rezervasyonlardan size ek maliyet yansıtmadan iş ortaklığı komisyonu kazanabilir.'
        : 'This site may earn an affiliate commission from bookings at no extra cost to you.',
  };

  return (
    <footer className="bg-cyan-700 text-white pt-8 pb-20 lg:pb-8 border-t border-cyan-600/50">
      <div className="portal-container space-y-6">
        {/* 1. Visitor Analytics Pulse Banner */}
        <div className="text-slate-900">
          <VisitorAnalyticsWidget variant="footer" locale={locale} />
        </div>

        {/* 2. Compact Bottom Bar: Brand & Copyright on the left, Editorial Contacts & Emergency Info on the right */}
        <div className="pt-4 border-t border-cyan-600/70 flex flex-col xl:flex-row justify-between items-center gap-5 text-xs text-cyan-100">
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
            <Link href={localize('/')} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center shadow-xs group-hover:bg-white/25 transition-colors">
                <FaCompass size={16} />
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">
                DALAMAN<span className="text-cyan-200">.INFO</span>
              </span>
            </Link>
            <div className="space-y-0.5">
              <p className="font-semibold text-white/95">{dict.footer.rights_reserved}</p>
              <p className="text-[11px] text-cyan-200/85">
                {contactLabels.affiliateDisclaimer}{' '}
                <Link
                  href={localize('/privacy')}
                  className="underline decoration-cyan-300/60 underline-offset-2 hover:text-white font-semibold"
                >
                  {contactLabels.privacyLink}
                </Link>
              </p>
            </div>
          </div>

          {/* Right: Editorial Contacts & 112 Info Inline */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <span className="inline-flex items-center gap-1.5 text-cyan-100/90">
              <FaMapMarkerAlt className="text-cyan-300 flex-shrink-0" size={12} />
              <span>{contactLabels.location}</span>
            </span>

            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="inline-flex items-center gap-1.5 text-white hover:text-cyan-200 transition-colors font-semibold"
            >
              <FaEnvelope className="text-cyan-300 flex-shrink-0" size={12} />
              <span>{SITE_CONFIG.contactEmail}</span>
            </a>

            <Link
              href={localize('/articles/useful-contacts')}
              className="inline-flex items-center gap-1.5 text-cyan-100 hover:text-white transition-colors underline decoration-cyan-400/50 underline-offset-2"
            >
              <FaMedkit className="text-cyan-300 flex-shrink-0" size={12} />
              <span>{contactLabels.emergency}</span>
            </Link>

            <Link
              href={localize('/contacts')}
              className="inline-block px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-colors"
            >
              {contactLabels.contactPage}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
