'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import type { EventConfig } from '@/src/types'

interface VideoPlayerProps {
  event: EventConfig
}

/**
 * Vertical video slot — shown between the Hero and the Countdown.
 * When `videoSrc` is null it renders a placeholder the host can tap to
 * record/upload later. Designed to fill the full mobile viewport width
 * in a 9:16 aspect ratio so it looks native on WhatsApp preview opens.
 */
export function VideoPlayer({ event }: VideoPlayerProps) {
  const { hero } = event
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }, [playing])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted((m) => !m)
  }, [muted])

  const handleEnded = useCallback(() => setPlaying(false), [])

  return (
    <section
      className="px-4 py-6 bg-surface"
      aria-label="Video especial de la fiesta"
    >
      <div className="max-w-sm mx-auto">
        {/* Section label */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-muted-foreground text-sm tracking-widest uppercase font-sans font-semibold">
            Te invitamos...
          </span>
        </motion.div>

        {/* Video container — 9:16 vertical aspect ratio */}
        <motion.div
          className="relative w-full overflow-hidden rounded-3xl shadow-xl border border-border bg-foreground"
          style={{ aspectRatio: '9 / 16' }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {hero.videoSrc ? (
            <>
              <video
                ref={videoRef}
                src={hero.videoSrc}
                poster={hero.posterSrc ?? undefined}
                muted={muted}
                playsInline
                loop={false}
                onEnded={handleEnded}
                className="absolute inset-0 w-full h-full object-cover"
                aria-label="Video especial de la fiesta"
              />

              {/* Gradient overlay at bottom for controls */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Centre play/pause tap area */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label={playing ? 'Pausar video' : 'Reproducir video'}
              >
                <span
                  className={`
                    bg-surface/80 backdrop-blur-sm rounded-full p-4 shadow-lg
                    transition-all duration-200
                    ${playing ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100' : 'opacity-100 scale-100'}
                  `}
                >
                  {playing ? (
                    <Pause size={28} className="text-foreground" />
                  ) : (
                    <Play size={28} className="text-foreground fill-foreground" />
                  )}
                </span>
              </button>

              {/* Mute toggle — bottom right */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-surface/75 backdrop-blur-sm rounded-full p-2 shadow transition-colors hover:bg-surface"
                aria-label={muted ? 'Activar sonido' : 'Silenciar'}
              >
                {muted ? (
                  <VolumeX size={18} className="text-foreground" />
                ) : (
                  <Volume2 size={18} className="text-foreground" />
                )}
              </button>
            </>
          ) : (
            /* ── Placeholder when no video is uploaded yet ── */
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              {/* Decorative film icon */}
              <div className="mb-5 opacity-30" aria-hidden="true">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-surface"
                >
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                  <line x1="7" y1="2" x2="7" y2="22" />
                  <line x1="17" y1="2" x2="17" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="2" y1="7" x2="7" y2="7" />
                  <line x1="2" y1="17" x2="7" y2="17" />
                  <line x1="17" y1="17" x2="22" y2="17" />
                  <line x1="17" y1="7" x2="22" y2="7" />
                </svg>
              </div>
              <p className="text-surface/70 font-serif text-lg italic leading-snug mb-2">
                Aqui va tu video
              </p>
              <p className="text-surface/45 font-sans text-xs leading-relaxed">
                Graba un mensajito vertical y lo ponemos aqui para todos tus
                invitados.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
