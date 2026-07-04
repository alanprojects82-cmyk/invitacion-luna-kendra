'use client'

import { motion } from 'framer-motion'
import { MapPin, CheckCircle, MessageCircle } from 'lucide-react'
import type { EventConfig } from '@/src/types'

interface FloatingButtonsProps {
  event: EventConfig
}

export function FloatingButtons({ event }: FloatingButtonsProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const buttons = [
    {
      icon: MapPin,
      label: 'Ubicación',
      href: event.location.mapsUrl,
      external: true,
      show: true,
    },
    {
      icon: CheckCircle,
      label: 'Asistir',
      onClick: () => scrollTo('rsvp'),
      show: event.rsvp.enabled,
    },
    {
      icon: MessageCircle,
      label: 'Mensaje',
      onClick: () => scrollTo('messages'),
      show: event.messages.enabled,
    },
  ].filter((b) => b.show)

  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2"
      aria-label="Acciones rápidas"
    >
      <motion.div
        className="flex items-center gap-2 bg-surface/90 backdrop-blur-md shadow-xl rounded-full px-4 py-2.5 border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {buttons.map((button, i) => {
          const Icon = button.icon
          const content = (
            <motion.span
              key={button.label}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-0.5 px-3 py-1 cursor-pointer"
            >
              <Icon size={20} className="text-primary" aria-hidden="true" />
              <span className="text-foreground text-xs font-sans font-medium">
                {button.label}
              </span>
            </motion.span>
          )

          if (button.href) {
            return (
              <a
                key={button.label}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ir a ${button.label}`}
              >
                {content}
              </a>
            )
          }

          return (
            <button
              key={button.label}
              onClick={button.onClick}
              aria-label={`Ir a ${button.label}`}
            >
              {content}
            </button>
          )
        })}
      </motion.div>
    </nav>
  )
}
