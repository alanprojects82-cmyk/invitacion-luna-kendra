import type { EventConfig } from '@/src/types'
import type { Metadata, Viewport } from 'next'

export function buildMetadata(event: EventConfig): Metadata {
  const title = `${event.title} — ${event.subtitle}`
  const description = event.tagline
  const ogImage = '/images/og-image.png'

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: false, // Private invitation — don't index
      follow: false,
    },
  }
}

export function buildViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#C8692A',
  }
}
