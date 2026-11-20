import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";

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

const travelpayoutsDriveUrl = SITE_CONFIG.affiliates.travelpayoutsDriveScript;
const travelpayoutsDriveInlineCode = `(function () {
  var script = document.createElement("script");
  script.async = 1;
  script.setAttribute("data-cmp-ab", "2");
  script.src = ${JSON.stringify(travelpayoutsDriveUrl)};
  document.head.appendChild(script);
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={inter.variable}>
      <head>
        {travelpayoutsDriveUrl ? (
          <script
            data-noptimize="1"
            data-cfasync="false"
            data-wpfc-render="false"
            data-no-defer="1"
            data-cmp-ab="2"
            dangerouslySetInnerHTML={{ __html: travelpayoutsDriveInlineCode }}
          />
        ) : null}
      </head>
      <body className={`${inter.className} antialiased text-slate-800 bg-slate-50 selection:bg-cyan-100 selection:text-cyan-900`}>
        {children}
      </body>
    </html>
  );
}
