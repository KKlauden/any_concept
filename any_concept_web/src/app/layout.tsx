import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://klauden.xyz'),
  title: {
    default: 'Klauden — Full-Stack Designer',
    template: '%s | Klauden',
  },
  description: 'Klauden 的个人网站。全栈设计师，专注于 UI/UX 设计与前端开发，基于上海。',
  keywords: ['Klauden', 'Full-Stack Designer', 'UI/UX', '前端开发', '上海', 'Portfolio'],
  authors: [{ name: 'Klauden' }],
  creator: 'Klauden',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    siteName: 'Klauden',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${jetBrainsMono.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-mono">
        {children}
      </body>
    </html>
  );
}
