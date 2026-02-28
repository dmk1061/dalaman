import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Путеводитель по побережью Турции: от Дачи до Каша",
  description: "Твой гид по городам Дача, Мармарис, Дальян, Даламан, Фетхие и Каш.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-gray-100`}>{children}</body>
    </html>
  );
}
