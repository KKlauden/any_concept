import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import { Providers } from "./providers";

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
  title: "Klauden",
  description: "Klauden's personal  website.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('locale');if(l==='en'||l==='zh'){document.documentElement.dataset.locale=l;if(l==='en')document.documentElement.lang='en'}}catch(e){}`,
          }}
        />
      </head>
      <body className="font-mono">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
