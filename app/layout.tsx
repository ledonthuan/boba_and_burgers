import type { Metadata } from 'next'
import { Bebas_Neue, Playfair_Display, DM_Sans, Caveat } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kain Na! | Filipino Burgers & Boba — Seattle, WA',
    template: '%s | Kain Na!',
  },
  description:
    'Filipino-owned burger and boba shop in Seattle. Smash burgers inspired by Filipino flavors, handcrafted boba drinks. Family-owned, homegrown, community-first.',
  keywords: ['Filipino food', 'boba Seattle', 'smash burger', 'Filipino restaurant', 'bubble tea Seattle'],
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Kain Na! | Filipino Burgers & Boba — Seattle, WA',
    description:
      'Smash burgers with Filipino soul. Handcrafted boba. Family-owned & community-first in Seattle, WA.',
    siteName: 'Kain Na!',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kain Na! — Filipino Burgers & Boba in Seattle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kain Na! | Filipino Burgers & Boba',
    description: 'Smash burgers with Filipino soul. Handcrafted boba. Seattle, WA.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${playfairDisplay.variable} ${dmSans.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
