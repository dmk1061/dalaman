import React from 'react';
import FloatingMenu from '../components/FloatingMenu';
import { SUPPORTED_LOCALES } from '@/lib/seo';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ru' },
    { locale: 'de' },
    { locale: 'tr' }
  ];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const activeLocale = (SUPPORTED_LOCALES as readonly string[]).includes(params?.locale)
    ? params.locale
    : 'ru';

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{document.documentElement.lang=${JSON.stringify(activeLocale)};}catch(e){}`,
        }}
      />
      {children}
      <FloatingMenu />
    </>
  );
}
