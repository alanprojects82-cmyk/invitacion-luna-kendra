import type { EventDate, CountdownTime, CountdownPhase } from '@/src/types'

/**
 * Convert EventDate config into a JS Date object.
 */
export function toDate(eventDate: EventDate): Date {
  return new Date(
    eventDate.year,
    eventDate.month - 1,
    eventDate.day,
    eventDate.hour,
    eventDate.minute,
    0,
  )
}

/**
 * Format a Date into a human-readable Spanish string.
 * e.g. "Sábado, 25 de Julio de 2026"
 */
export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format event time.
 * e.g. "3:00 PM"
 */
export function formatEventTime(date: Date): string {
  return date.toLocaleTimeString('es-MX', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Calculate the countdown from now to the event date.
 */
export function calculateCountdown(eventDate: EventDate): CountdownTime {
  const now = Date.now()
  const target = toDate(eventDate).getTime()
  const eventDuration = 4 * 60 * 60 * 1000 // assume 4-hour event

  let phase: CountdownPhase
  let diff: number

  if (now < target) {
    phase = 'before'
    diff = target - now
  } else if (now < target + eventDuration) {
    phase = 'during'
    diff = 0
  } else {
    phase = 'after'
    diff = 0
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, phase }
}
