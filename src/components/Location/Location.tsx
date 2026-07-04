'use client'

import { motion } from 'framer-motion'
import { MapPin, ExternalLink, Navigation } from 'lucide-react'
import type { EventConfig } from '@/src/types'

interface LocationProps {
  event: EventConfig
}

export function Location({ event }: LocationProps) {
  const { location } = event

  return (
    <section
      className="py-16 px-4 bg-surface"
      aria-label="Ubicación del evento"
    >
      <div className="max-w-lg mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-muted-foreground text-sm tracking-widest uppercase font-sans font-semibold">
            ¿Dónde?
          </span>
          <h2 className="font-serif text-3xl text-foreground mt-2 text-balance">
            Ubicación
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-4" aria-hidden="true" />
        </motion.div>

        {/* Location card */}
        <motion.div
          className="bg-background rounded-3xl overflow-hidden shadow-md border border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {/* Map placeholder */}
          <div
            className="relative h-48 bg-primary/10 flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute inset-0">
              {/* Decorative grid using Tailwind classes */}
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-primary/25"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="bg-primary rounded-full p-4 shadow-lg">
                <MapPin size={28} className="text-primary-foreground" />
              </div>
              <span className="text-foreground font-serif text-base font-medium mt-1">
                {location.name}
              </span>
            </div>
          </div>

          {/* Address info */}
          <div className="p-5">
            <div className="flex items-start gap-3 mb-5">
              <Navigation
                size={18}
                className="text-muted-foreground mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-foreground font-sans font-semibold text-base">
                  {location.name}
                </p>
                <p className="text-muted-foreground font-sans text-sm mt-0.5">
                  {location.address}
                </p>
              </div>
            </div>

            {/* Maps button */}
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-sans font-semibold py-3.5 rounded-2xl shadow-md hover:bg-primary/90 active:scale-95 transition-all"
              aria-label={`Abrir ${location.name} en Google Maps`}
            >
              <MapPin size={18} aria-hidden="true" />
              Cómo llegar
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
