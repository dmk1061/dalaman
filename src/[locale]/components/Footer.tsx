'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center">&copy; {new Date().getFullYear()} Dalaman Guide. {t('copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer; 