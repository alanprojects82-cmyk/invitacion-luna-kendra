'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useAudioPlayer } from '@/src/hooks/useAudioPlayer'
import type { EventConfig } from '@/src/types'

interface MusicPlayerProps {
  event: EventConfig
}

export function MusicPlayer({ event }: MusicPlayerProps) {
  const { music } = event

  const [state, controls] = useAudioPlayer(music)

  // seguridad
  if (!music?.enabled) return null
  if (!music?.src) return null

  return (
    <>
      {/* BOTÓN PRINCIPAL SIEMPRE DISPONIBLE */}
      <AnimatePresence>
        {!state.isPlaying && (
          <motion.button
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-full shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={controls.play}
          >
            <Music size={16} />
            Reproducir música
          </motion.button>
        )}
      </AnimatePresence>

      {/* CONTROLES */}
      {music.showControls && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-lg">
          <button onClick={controls.toggle}>
            {state.isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <span className="text-sm">{music.songTitle}</span>

          <button
            onClick={() =>
              controls.setVolume(state.volume > 0 ? 0 : music.volume)
            }
          >
            {state.volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      )}
    </>
  )
}