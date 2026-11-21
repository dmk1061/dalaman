import type { Metadata } from 'next';
import React from 'react';

// Закрываем внутреннюю панель аналитики от индексации поисковыми системами
export const metadata: Metadata = {
  title: 'Центр аналитики — Dalaman.info',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminStatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
