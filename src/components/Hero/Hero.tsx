'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SkipForward, RefreshCw, Volume2, VolumeX } from 'lucide-react'
import type { EventConfig } from '@/src/types'

interface HeroProps {
  event: EventConfig
  onComplete: () => void
}

export function Hero({ event, onComplete }: HeroProps) {
  const { hero, title, subtitle, tagline } = event
  const videoRef = useRef<HTMLVideoElement>(null)
  

  const [isMuted, setIsMuted] = useState(!hero.soundToggle)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showContent, setShowContent] = useState(!hero.videoSrc)

  // 🔥 BLOQUEA SCROLL PERO CON SEGURIDAD
  useEffect(() => {

    const fallback = setTimeout(() => {
    setVideoEnded(true)
    setShowContent(true)
    onComplete()
}, 100)

    return () => {
      clearTimeout(fallback)
      document.body.style.overflow = 'auto'
    }
  }, [onComplete])

  const handleVideoEnd = useCallback(() => {
    setVideoEnded(true)

    document.body.style.overflow = 'auto'

    setTimeout(() => {
      setShowContent(true)
      onComplete()
    }, 400)
  }, [onComplete])

  const handleSkip = useCallback(() => {
    setVideoEnded(true)
    setShowContent(true)

    document.body.style.overflow = 'auto'

    onComplete()
  }, [onComplete])

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setVideoEnded(false)
      setShowContent(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted((m) => !m)
    }
  }, [isMuted])

  if (!hero.enabled) return null

  // 🖼️ HERO SIN VIDEO
  if (!hero.videoSrc) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero.posterSrc ?? '/images/hero-bg.png'}
            alt="Fondo de invitación"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>

        <HeroContent
          title={title}
          subtitle={subtitle}
          tagline={tagline}
          age={event.age}
          honorees={event.honorees}
        />
      </section>
    )
  }

  // 🎬 HERO CON VIDEO
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground">

      {/* fondo siempre visible */}
      <div className="absolute inset-0">
        <Image
          src={hero.posterSrc ?? '/images/hero-bg.png'}
          alt="Fondo de invitación"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* video */}
      <AnimatePresence>
        {!videoEnded && (
          <motion.div
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <video
              ref={videoRef}
              src={hero.videoSrc}
              poster={hero.posterSrc ?? undefined}
              autoPlay={hero.autoplay}
              muted={isMuted}
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* controles */}
      {!showContent && (

      <div className="absolute top-4 right-4 flex gap-2 z-20">
        {hero.soundToggle && (
          <button
            onClick={toggleMute}
            className="bg-surface/80 p-2 rounded-full"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}

        {hero.replayable && videoEnded && (
          <button
            onClick={handleReplay}
            className="bg-surface/80 p-2 rounded-full"
          >
            <RefreshCw size={18} />
          </button>
        )}
      </div>
)}

      {hero.skipable && !videoEnded && !showContent && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-4 bg-surface/80 px-4 py-2 rounded-full"
        >
          <SkipForward size={16} />
          Saltar intro
        </button>
      )}

      <AnimatePresence>
        {showContent && (
          <HeroContent
            title={title}
            subtitle={subtitle}
            tagline={tagline}
            age={event.age}
            honorees={event.honorees}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

interface HeroContentProps {
  title: string
  subtitle: string
  tagline: string
  age: number | null
  honorees: string[]
}

function HeroContent({
  title,
  subtitle,
  tagline,
  age,
  honorees,
}: HeroContentProps) {
  return (
    <motion.div
      className="relative z-10 text-center px-6 py-12 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Stars decoration */}
      <motion.div
        className="flex justify-center gap-2 mb-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        aria-hidden="true"
      >
        {['✦', '✦', '✦'].map((star, i) => (
          <span key={i} className="text-accent text-lg">
            {star}
          </span>
        ))}
      </motion.div>

      {/* Age badge */}
      {age !== null && (
        <motion.div
          className="inline-block mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="bg-accent text-foreground text-sm font-bold px-4 py-1 rounded-full font-sans tracking-widest uppercase">
            {age} Años
          </span>
        </motion.div>
      )}

      {/* Names */}
      <motion.h1
        className="font-serif text-4xl sm:text-5xl font-bold text-surface leading-tight mb-2 text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {honorees.length > 1 ? (
          <>
            {honorees[0]}
            <span className="block text-accent text-3xl sm:text-4xl my-1 font-serif">
              &amp;
            </span>
            {honorees[1]}
          </>
        ) : (
          title
        )}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-surface/90 text-xl font-sans mt-3 mb-6 font-light tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {subtitle}
      </motion.p>

      {/* Tagline */}
      <motion.p
        className="font-serif text-xl sm:text-2xl font-bold italic leading-relaxed text-balance text-accent"
        style={{
          WebkitTextStroke: '1.5px #1a0a00',
          textShadow: '0 2px 8px rgba(0,0,0,0.55)',
          paintOrder: 'stroke fill',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        &ldquo;{tagline}&rdquo;
      </motion.p>

      {/* Bottom stars */}
      <motion.div
        className="flex justify-center gap-3 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="text-accent/60 text-sm">— ✦ ✦ ✦ —</span>
      </motion.div>
    </motion.div>
  )
}
