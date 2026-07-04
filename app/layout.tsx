import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import { currentEvent } from '@/src/config/currentEvent'
import { buildMetadata, buildViewport } from '@/src/config/seo'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = buildMetadata(currentEvent)
export const viewport: Viewport = buildViewport()

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${lato.variable} bg-background`}
    >
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
