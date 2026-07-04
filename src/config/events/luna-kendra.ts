import type { EventConfig } from '@/src/types'

export const lunaKendraEvent: EventConfig = {
  id: 'luna-kendra-2026',
  slug: 'luna-kendra',
  theme: 'western',

  title: 'Luna Kailani & Kendra Leilani',
  subtitle: 'Cumplen 3 Años',
  tagline: 'Se buscan Vaqueras y Vaqueros para mi fiesta.',

  honorees: ['Luna Kailani', 'Kendra Leilani'],
  age: 3,

  date: {
    year: 2026,
    month: 7,
    day: 25,
    hour: 15, // 3:00 PM
    minute: 0,
    timezone: 'America/Mexico_City',
  },

  location: {
    name: 'Salón de los Electricistas',
    address: 'Pastita s/n, Guanajuato',
    mapsUrl: 'https://maps.app.goo.gl/k9mHfxDYrHqhjuMz9?g_st=aw',
  },

  dressCode: 'Ropa Vaquera',
  eventTheme: 'Vaquero',

  activities: [
    { icon: 'gamepad-2', label: 'Juegos' },
    { icon: 'utensils', label: 'Comida' },
    { icon: 'star', label: 'Toro Mecánico' },
    { icon: 'sparkles', label: 'Muchas Sorpresas' },
  ],

  hero: {
    enabled: true,
    videoSrc: '/videos/Video Project 1.mp4',
    posterSrc: '/images/hero-bg.png',
    skipable: true,
    replayable: true,
    soundToggle: true,
    autoplay: true,
  },

  music: {
    enabled: true,
    src: '/audio/Eden Muñoz La Nena.mp3',
    songTitle: 'La Nena',
    artist: 'Eden Muñoz',
    autoplay: false,
    loop: true,
    volume: 0.6,
    showControls: true,
  },

  countdown: {
    enabled: true,
    messages: {
      before: '¡Nos vemos muy pronto!',
      during: '¡La fiesta está comenzando!',
      after: 'Gracias por celebrar con nosotras.',
    },
  },

  rsvp: {
    enabled: true,
    googleFormsUrl: 'https://forms.gle/i4uWqycrfzRcB6n67',
  },

  messages: {
    enabled: true,
    // Future: supabaseTable: 'luna_kendra_messages'
  },

  footer: {
    thankYouMessage: 'No faltes. ¡Te esperamos con mucho cariño!',
    socials: [],
  },
}
