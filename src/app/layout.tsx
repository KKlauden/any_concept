import './globals.css'
import type { Metadata } from 'next'
import { Geist, Noto_Serif_SC, Noto_Sans_SC } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-noto-serif-sc',
  display: 'swap',
  preload: false,
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Klauden',
  description: "Klauden's Website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${jetBrainsMono.variable} ${notoSerifSC.variable} ${notoSansSC.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
