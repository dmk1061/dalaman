import type { Metadata } from 'next';

const DEFAULT_SITE_URL = 'https://dalaman.info';
export const SUPPORTED_LOCALES = ['ru', 'en', 'de', 'tr'] as const;

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, '');
}

const ogLocaleMap: Record<string, string> = {
  ru: 'ru_RU',
  en: 'en_US',
  de: 'de_DE',
  tr: 'tr_TR',
};

export interface BuildPageMetadataInput {
  locale: string;
  pathname: string;
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description = '',
  image = '/hero-bg.jpg',
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const activeLocale = (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? locale : 'en';

  const trimmedPath = pathname.trim();
  const cleanPath =
    !trimmedPath || trimmedPath === '/'
      ? ''
      : trimmedPath.startsWith('/')
        ? trimmedPath.replace(/\/+$/, '')
        : `/${trimmedPath.replace(/\/+$/, '')}`;

  const canonicalUrl = `${siteUrl}/${activeLocale}${cleanPath}`;
  const fullTitle =
    title.includes('Dalaman.info') || title.includes('Dalaman Guide') || title.includes('Дача — Каш')
      ? title
      : `${title} | Dalaman.info`;

  const resolvedImage = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;

  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    languages[loc] = `${siteUrl}/${loc}${cleanPath}`;
  }
  languages['x-default'] = `${siteUrl}/en${cleanPath}`;

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Dalaman.info',
      locale: ogLocaleMap[activeLocale] || 'en_US',
      type: 'website',
      images: [
        {
          url: resolvedImage,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [resolvedImage],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
  };
}
