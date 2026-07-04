'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { EventMusic } from '@/src/types'

interface AudioPlayerState {
  isPlaying: boolean
  isLoaded: boolean
  needsInteraction: boolean
  currentTime: number
  duration: number
  volume: number
}

interface AudioPlayerControls {
  play: () => void
  pause: () => void
  toggle: () => void
  setVolume: (v: number) => void
}

export function useAudioPlayer(
  config: EventMusic,
): [AudioPlayerState, AudioPlayerControls] {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoaded: false,
    needsInteraction: false,
    currentTime: 0,
    duration: 0,
    volume: config.volume,
  })

  useEffect(() => {
    if (!config.src) return

    const audio = new Audio(config.src)
    audio.loop = config.loop
    audio.volume = config.volume
    audioRef.current = audio

    audio.addEventListener('loadeddata', () => {
      setState((s) => ({ ...s, isLoaded: true, duration: audio.duration }))
    })

    audio.addEventListener('timeupdate', () => {
      setState((s) => ({ ...s, currentTime: audio.currentTime }))
    })

    audio.addEventListener('ended', () => {
      setState((s) => ({ ...s, isPlaying: false }))
    })

    if (config.autoplay) {
      audio
        .play()
        .then(() => setState((s) => ({ ...s, isPlaying: true })))
        .catch(() => setState((s) => ({ ...s, needsInteraction: true })))
    }

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [config.src, config.loop, config.volume, config.autoplay])

  const play = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current
      .play()
      .then(() =>
        setState((s) => ({ ...s, isPlaying: true, needsInteraction: false })),
      )
      .catch(console.error)
  }, [])

  const pause = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setState((s) => ({ ...s, isPlaying: false }))
  }, [])

  const toggle = useCallback(() => {
    if (state.isPlaying) pause()
    else play()
  }, [state.isPlaying, play, pause])

  const setVolume = useCallback((v: number) => {
    if (!audioRef.current) return
    audioRef.current.volume = v
    setState((s) => ({ ...s, volume: v }))
  }, [])

  return [state, { play, pause, toggle, setVolume }]
}
