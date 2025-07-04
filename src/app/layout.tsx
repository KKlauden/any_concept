import './globals.css'
import type { Metadata } from 'next'
import { Geist, Noto_Serif_SC, Noto_Sans_SC } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  variable: '--font-noto-serif-sc',
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  display: 'swap',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Any Concept',
  description: 'Explore and Create',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${jetBrainsMono.variable} ${notoSerifSC.variable} ${notoSansSC.variable}`}>
      <body>{children}</body>
    </html>
  )
}
