'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import type { EventConfig } from '@/src/types'
import { MusicPlayer } from '@/src/components/MusicPlayer'

interface FooterProps {
  event: EventConfig
}

export function Footer({ event }: FooterProps) {
  const { footer } = event

  return (
    <footer
      className="py-16 px-4 bg-foreground text-surface"
      aria-label="Pie de página"
    >
      <div className="max-w-lg mx-auto text-center">
        {/* Stars divider */}
        <motion.div
          className="flex justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          <span className="text-accent">✦</span>
          <span className="text-accent/70">✦</span>
          <span className="text-accent">✦</span>
        </motion.div>

        {/* Thank you message */}
        <motion.h2
          className="font-serif text-2xl text-surface font-medium mb-3 text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {footer.thankYouMessage}
        </motion.h2>

        {/* Honorees */}
        <motion.p
          className="font-serif text-lg text-accent italic mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {event.honorees.join(' & ')}
        </motion.p>

        {/* Music player */}
        {event.music.enabled && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
          </motion.div>
        )}

        {/* Social links */}
        {footer.socials.length > 0 && (
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {footer.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface/60 hover:text-accent transition-colors font-sans text-sm capitalize"
                aria-label={`Ir a ${social.platform}`}
              >
                {social.platform}
              </a>
            ))}
          </motion.div>
        )}

        {/* Branding */}
        <motion.div
          className="flex items-center justify-center gap-1.5 text-surface/40 font-sans text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span>Hecho con</span>
          <Heart size={12} className="text-primary" aria-hidden="true" />
          <span>por</span>
          <span className="text-surface/60 font-semibold">InvitaPro</span>
        </motion.div>
      </div>
    </footer>
  )
}
