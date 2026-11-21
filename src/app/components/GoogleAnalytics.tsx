"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { SITE_CONFIG } from '@/lib/site-config';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const TP_CAMPAIGN_PARTNERS: Record<string, string> = {
  '100': 'aviasales',
  '87': 'localrent',
  '1': 'kiwitaxi',
  '147': 'gettransfer',
  '541': 'airalo',
  '57': 'bikesbooking',
  '86': 'compensair',
};

const PARTNER_DOMAIN_RULES: Array<[string, string]> = [
  ['tp.media', 'travelpayouts'],
  ['emrldtp', 'travelpayouts'],
  ['aviasales', 'aviasales'],
  ['localrent', 'localrent'],
  ['kiwitaxi', 'kiwitaxi'],
  ['gettransfer', 'gettransfer'],
  ['airalo', 'airalo'],
  ['bikesbooking', 'bikesbooking'],
  ['compensair', 'compensair'],
  ['booking.com', 'booking'],
  ['otelz.com', 'otelz'],
  ['sputnik8', 'sputnik8'],
  ['tripster', 'tripster'],
  ['getyourguide', 'getyourguide'],
  ['trip.com', 'tripcom'],
  ['klook', 'klook'],
];

function isIgnoreSelfEnabled(): boolean {
  try {
    return window.localStorage.getItem('dalaman_ignore_analytics') === '1';
  } catch {
    return false;
  }
}

function isTrackingDisabled(pathname: string): boolean {
  if ((pathname || '').includes('/admin-stats')) {
    return true;
  }
  return isIgnoreSelfEnabled();
}

function resolveAffiliateTarget(
  host: string,
  parsedUrl: URL
): { partner: string; subId: string; isKnownDomain: boolean } {
  if (host === 'tp.media' || host.endsWith('.tp.media')) {
    const campaignId = parsedUrl.searchParams.get('campaign_id') || '';
    const subId = parsedUrl.searchParams.get('sub_id') || '';
    return {
      partner: TP_CAMPAIGN_PARTNERS[campaignId] || 'travelpayouts',
      subId,
      isKnownDomain: true,
    };
  }

  for (const [needle, partnerName] of PARTNER_DOMAIN_RULES) {
    if (host.includes(needle)) {
      return {
        partner: partnerName,
        subId: '',
        isKnownDomain: true,
      };
    }
  }

  return {
    partner: host,
    subId: '',
    isKnownDomain: false,
  };
}

/**
 * Глобальный компонент Google Analytics 4: инициализация gtag.js,
 * передача SPA-переходов, исключение админ-страницы и учёт кликов по монетизации.
 */
export default function GoogleAnalytics() {
  const ga4Id = SITE_CONFIG.analytics.ga4MeasurementId;
  const pathname = usePathname();
  const initializedRef = useRef(false);
  const lastPagePathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!ga4Id) return;

    const ignoreSelf = isIgnoreSelfEnabled();
    window[`ga-disable-${ga4Id}`] = ignoreSelf;
    if (ignoreSelf) return;

    const currentPathname = pathname || '/';
    if (currentPathname.includes('/admin-stats')) return;

    if (!initializedRef.current) {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== 'function') {
        // Для корректной работы gtag.js в dataLayer должен попадать именно объект Arguments
        window.gtag = function gtag() {
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer?.push(arguments);
        };
      }
      window.gtag('js', new Date());
      window.gtag('config', ga4Id, { send_page_view: false });
      initializedRef.current = true;
    }

    const search = window.location.search || '';
    const pagePath = `${currentPathname}${search}`;
    if (lastPagePathRef.current !== pagePath) {
      lastPagePathRef.current = pagePath;
      window.gtag?.('event', 'page_view', {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, ga4Id]);

  useEffect(() => {
    if (!ga4Id) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const currentPath = window.location.pathname || '/';
      if (isTrackingDisabled(currentPath)) return;

      const rawHref = (anchor.getAttribute('href') || '').trim();
      if (!rawHref) return;

      if (rawHref.toLowerCase().startsWith('mailto:')) {
        window.gtag?.('event', 'contact_click', {
          channel: 'email',
          page_path: currentPath,
        });
        return;
      }

      let parsed: URL;
      try {
        parsed = new URL(anchor.href);
      } catch {
        return;
      }

      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return;

      const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
      const currentHost = window.location.hostname.toLowerCase().replace(/^www\./, '');
      if (!host || host === currentHost) return;

      if (host === 'wa.me' || host.includes('whatsapp.com')) {
        window.gtag?.('event', 'contact_click', {
          channel: 'whatsapp',
          page_path: currentPath,
        });
        return;
      }

      if (host === 't.me' || host.includes('telegram.me') || host.includes('telegram.org')) {
        window.gtag?.('event', 'contact_click', {
          channel: 'telegram',
          page_path: currentPath,
        });
        return;
      }

      const relTokens = (anchor.getAttribute('rel') || '').toLowerCase().split(/\s+/);
      const isSponsored = relTokens.includes('sponsored');
      const { partner, subId, isKnownDomain } = resolveAffiliateTarget(host, parsed);

      if (!isSponsored && !isKnownDomain) return;

      window.gtag?.('event', 'affiliate_click', {
        partner,
        link_domain: host,
        link_url: parsed.href.slice(0, 200),
        sub_id: subId || undefined,
        page_path: currentPath,
      });
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [ga4Id]);

  if (!ga4Id) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
      strategy="afterInteractive"
    />
  );
}
