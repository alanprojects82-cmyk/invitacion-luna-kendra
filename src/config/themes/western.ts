import type { ThemeConfig } from '@/src/types'

export const westernTheme: ThemeConfig = {
  id: 'western',
  name: 'Western',
  colors: {
    primary: '#C8692A',      // Burnt orange
    secondary: '#8B4513',    // Saddle brown
    accent: '#D4A853',       // Golden amber
    background: '#FDF6E3',   // Warm cream
    surface: '#F5E6C8',      // Light parchment
    foreground: '#2C1810',   // Dark espresso
    muted: '#9E7B5A',        // Warm taupe
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Lato',
  },
  borderRadius: '0.5rem',
  decorations: ['star', 'horseshoe', 'boot', 'hat', 'cactus'],
}
