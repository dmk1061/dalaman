import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dalaman.info"),
  title: "Dalaman.info — Путеводитель от Датчи до Каша",
  description: "Ваш экспертный гид по Бирюзовому побережью Турции: Датча, Мармарис, Кёйджегиз, Дальян, Даламан, Гёджек, Фетхие и Каш.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className={`${inter.className} antialiased text-slate-800 bg-slate-50 selection:bg-cyan-100 selection:text-cyan-900`}>
        {children}
      </body>
    </html>
  );
}
