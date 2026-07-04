import type { ThemeConfig } from '@/src/types'

export const princessTheme: ThemeConfig = {
  id: 'princess',
  name: 'Princess',
  colors: {
    primary: '#E91E8C',      // Hot pink
    secondary: '#9C27B0',    // Purple
    accent: '#FFD700',       // Gold
    background: '#FFF0F5',   // Lavender blush
    surface: '#FCE4EC',      // Light pink
    foreground: '#1A0033',   // Deep purple-black
    muted: '#C48FB5',        // Dusty rose
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Lato',
  },
  borderRadius: '9999px',
  decorations: ['crown', 'star', 'heart', 'diamond', 'wand'],
}
