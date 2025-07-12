import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Путеводитель по Даламану",
  description: "Все о регионе Даламан в Турции",
};

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-gray-50`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 