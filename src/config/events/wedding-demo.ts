import type { EventConfig } from '@/src/types'

export const weddingDemoEvent: EventConfig = {
  id: 'wedding-demo-2026',
  slug: 'wedding-demo',
  theme: 'default',

  title: 'Ana & Carlos',
  subtitle: '¡Se Casan!',
  tagline: 'Los invitamos a celebrar el amor.',

  honorees: ['Ana García', 'Carlos Mendoza'],
  age: null,

  date: {
    year: 2026,
    month: 12,
    day: 12,
    hour: 18,
    minute: 0,
    timezone: 'America/Mexico_City',
  },

  location: {
    name: 'Jardín Las Palomas',
    address: 'Carretera a Silao Km 4, Guanajuato',
    mapsUrl: 'https://maps.google.com',
  },

  dressCode: 'Formal',
  eventTheme: null,

  activities: [
    { icon: 'music', label: 'Música en Vivo' },
    { icon: 'utensils', label: 'Cena' },
    { icon: 'wine', label: 'Barra Libre' },
    { icon: 'camera', label: 'Foto Booth' },
  ],

  hero: {
    enabled: true,
    videoSrc: null,
    posterSrc: '/images/hero-bg.png',
    skipable: true,
    replayable: true,
    soundToggle: true,
    autoplay: false,
  },

  music: {
    enabled: false,
    src: null,
    songTitle: '',
    artist: '',
    autoplay: false,
    loop: true,
    volume: 0.5,
    showControls: false,
  },

  countdown: {
    enabled: true,
    messages: {
      before: '¡Pronto compartiremos este momento!',
      during: '¡La boda está comenzando!',
      after: 'Gracias por acompañarnos.',
    },
  },

  rsvp: {
    enabled: true,
    googleFormsUrl: null,
  },

  messages: {
    enabled: true,
  },

  footer: {
    thankYouMessage: 'Su presencia es el mejor regalo.',
    socials: [],
  },
}
