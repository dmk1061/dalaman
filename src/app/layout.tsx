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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const locale = params?.locale || "en";
  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}

