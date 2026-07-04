'use client'
import { MusicPlayer } from '@/src/components/MusicPlayer'
import { useState } from 'react'
import type { EventConfig } from '@/src/types'
import type { features as FeaturesConfig } from '@/src/config/features'
import { Hero } from '@/src/components/Hero'
import { Countdown } from '@/src/components/Countdown'
import { InvitationInfo } from '@/src/components/InvitationInfo'
import { Location } from '@/src/components/Location'
import { RSVP } from '@/src/components/RSVP'
import { Messages } from '@/src/components/Messages'
import { Footer } from '@/src/components/Footer'
import { FloatingButtons } from '@/src/components/FloatingButtons'
import { VideoPlayer } from '@/src/components/VideoPlayer'

interface InvitationPageProps {
  event: EventConfig
  features: typeof FeaturesConfig
}

export function InvitationPage({ event, features }: InvitationPageProps) {
  const [heroComplete, setHeroComplete] = useState(!event.hero.enabled || !event.hero.videoSrc)

 return (
  <>
    {/* Hero / Intro */}
    {features.hero && (
      <Hero event={event} onComplete={() => setHeroComplete(true)} />
    )}

    {/* 🎵 Reproductor de música */}
    {features.musicPlayer && (
      <MusicPlayer event={event} />
    )}

    {/* Main content — revealed after hero transition */}
    {heroComplete && (
      <main id="main-content">
        <VideoPlayer event={event} />
        {features.countdown && <Countdown event={event} />}
        {features.invitationInfo && <InvitationInfo event={event} />}
        {features.location && <Location event={event} />}
        {features.rsvp && <RSVP event={event} />}
        {features.messages && <Messages event={event} />}
        {features.footer && <Footer event={event} />}
      </main>
    )}

    {/* Floating action bar */}
    {features.floatingButtons && heroComplete && (
      <FloatingButtons event={event} />
    )}
  </>
)
}