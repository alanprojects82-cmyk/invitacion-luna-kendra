'use client'

import { useState, useEffect } from 'react'
import type { EventDate, CountdownTime } from '@/src/types'
import { calculateCountdown } from '@/src/utils/date'

const EMPTY: CountdownTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  phase: 'before',
}

export function useCountdown(eventDate: EventDate): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>(EMPTY)

  useEffect(() => {
    // 🔥 calcular inmediato en cliente
    setCountdown(calculateCountdown(eventDate))

    const timer = setInterval(() => {
      setCountdown(calculateCountdown(eventDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [eventDate])

  return countdown
}