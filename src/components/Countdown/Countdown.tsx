'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useCountdown } from '@/src/hooks/useCountdown'
import type { EventConfig } from '@/src/types'

interface CountdownProps {
  event: EventConfig
}

export function Countdown({ event }: CountdownProps) {
  const { countdown, date } = event

  const time = useCountdown(date)

  // 🔥 FIX HYDRATION: render solo después de montar en cliente
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!countdown.enabled) return null

  // evita mismatch SSR vs client
  if (!mounted) {
    return (
      <section className="py-12 px-4 bg-surface">
        <div className="max-w-lg mx-auto text-center">
          <span className="block text-muted-foreground text-sm uppercase mb-6">
            Faltan
          </span>

          <div className="flex justify-center gap-3 sm:gap-5">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="bg-primary rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center opacity-40"
              >
                <span className="text-primary-foreground font-bold text-2xl">
                  00
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const units = [
    { label: 'Días', value: time.days },
    { label: 'Horas', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Seg', value: time.seconds },
  ]

  return (
    <section
      className="py-12 px-4 bg-surface"
      aria-label="Cuenta regresiva para el evento"
    >
      <div className="max-w-lg mx-auto text-center">
        {/* Label */}
        <motion.span
          className="block text-muted-foreground text-sm tracking-widest uppercase font-sans font-semibold mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          Faltan
        </motion.span>

        {/* Countdown */}
        {time.phase === 'before' && (
          <div
            className="flex justify-center gap-3 sm:gap-5"
            aria-live="polite"
            aria-label="Cuenta regresiva"
          >
            {units.map((unit, i) => (
              <motion.div
                key={unit.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="bg-primary rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold font-sans text-2xl sm:text-3xl tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>

                <span className="text-muted-foreground text-xs mt-2 font-sans tracking-wide uppercase">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mensaje */}
        <motion.p
          className="text-foreground font-serif text-xl italic mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {countdown.messages[time.phase]}
        </motion.p>
      </div>
    </section>
  )
}