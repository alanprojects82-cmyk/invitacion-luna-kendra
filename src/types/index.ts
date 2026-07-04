// ─── Event Types ──────────────────────────────────────────────────────────────

export interface EventDate {
  year: number
  month: number // 1-indexed
  day: number
  hour: number
  minute: number
  timezone: string
}

export interface EventLocation {
  name: string
  address: string
  mapsUrl: string
}

export interface EventHero {
  enabled: boolean
  videoSrc: string | null
  posterSrc: string | null
  skipable: boolean
  replayable: boolean
  soundToggle: boolean
  autoplay: boolean
}

export interface EventMusic {
  enabled: boolean
  src: string | null
  songTitle: string
  artist: string
  autoplay: boolean
  loop: boolean
  volume: number
  showControls: boolean
}

export interface CountdownMessages {
  before: string
  during: string
  after: string
}

export interface EventRSVP {
  enabled: boolean
  googleFormsUrl: string | null
  // Future: supabaseTable?: string
}

export interface EventMessages {
  enabled: boolean
  // Future: supabaseTable?: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface EventFooter {
  thankYouMessage: string
  socials: SocialLink[]
}

export interface EventActivity {
  icon: string
  label: string
}

export interface EventConfig {
  id: string
  slug: string
  theme: ThemeId
  title: string
  subtitle: string
  tagline: string
  honorees: string[]
  age: number | null
  date: EventDate
  location: EventLocation
  dressCode: string | null
  eventTheme: string | null
  activities: EventActivity[]
  hero: EventHero
  music: EventMusic
  countdown: {
    enabled: boolean
    messages: CountdownMessages
  }
  rsvp: EventRSVP
  messages: EventMessages
  footer: EventFooter
}

// ─── Theme Types ──────────────────────────────────────────────────────────────

export type ThemeId = 'western' | 'princess' | 'jungle' | 'ocean' | 'default'

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  foreground: string
  muted: string
}

export interface ThemeFonts {
  heading: string
  body: string
}

export interface ThemeConfig {
  id: ThemeId
  name: string
  colors: ThemeColors
  fonts: ThemeFonts
  borderRadius: string
  decorations: string[]
}

// ─── RSVP Form Types ──────────────────────────────────────────────────────────

export interface RSVPFormData {
  name: string
  guests: number
  attending: 'yes' | 'no' | 'maybe'
  message?: string
}

// ─── Message Types ────────────────────────────────────────────────────────────

export interface GuestMessage {
  id: string
  name: string
  message: string
  createdAt: Date
}

// ─── Countdown State ──────────────────────────────────────────────────────────

export type CountdownPhase = 'before' | 'during' | 'after'

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  phase: CountdownPhase
}
