'use client'

import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Shirt,
  Star,
  Gamepad2,
  Utensils,
  Sparkles,
  Music,
  Camera,
  Wine,
} from 'lucide-react'
import type { EventConfig, EventActivity } from '@/src/types'
import { toDate, formatEventDate, formatEventTime } from '@/src/utils/date'

interface InvitationInfoProps {
  event: EventConfig
}

const iconMap: Record<string, React.ElementType> = {
  'gamepad-2': Gamepad2,
  utensils: Utensils,
  star: Star,
  sparkles: Sparkles,
  music: Music,
  camera: Camera,
  wine: Wine,
}

function ActivityIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? Star
  return <Icon size={20} className="text-primary" aria-hidden="true" />
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export function InvitationInfo({ event }: InvitationInfoProps) {
  const eventDate = toDate(event.date)
  const formattedDate = formatEventDate(eventDate)
  const formattedTime = formatEventTime(eventDate)

  const details = [
    {
      icon: Calendar,
      label: 'Fecha',
      value: formattedDate,
    },
    {
      icon: Clock,
      label: 'Hora',
      value: formattedTime,
    },
    {
      icon: MapPin,
      label: 'Lugar',
      value: `${event.location.name}, ${event.location.address}`,
    },
    ...(event.dressCode
      ? [{ icon: Shirt, label: 'Vestimenta', value: event.dressCode }]
      : []),
    ...(event.eventTheme
      ? [{ icon: Star, label: 'Tema', value: event.eventTheme }]
      : []),
  ]

  return (
    <section
      className="py-16 px-4 bg-background"
      aria-label="Detalles del evento"
    >
      <div className="max-w-lg mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-muted-foreground text-sm tracking-widest uppercase font-sans font-semibold">
            La Invitación
          </span>
          <h2 className="font-serif text-3xl text-foreground mt-2 text-balance">
            Detalles del Festejo
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-4" aria-hidden="true" />
        </motion.div>

        {/* Details list */}
        <motion.ul
          className="space-y-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
        >
          {details.map((detail) => {
            const Icon = detail.icon
            return (
              <motion.li
                key={detail.label}
                variants={itemVariants}
                className="flex items-start gap-4 bg-surface rounded-2xl p-4 shadow-sm"
              >
                <div className="bg-primary/10 p-2.5 rounded-xl shrink-0">
                  <Icon
                    size={20}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-sans uppercase tracking-wide font-semibold">
                    {detail.label}
                  </p>
                  <p className="text-foreground font-sans text-base mt-0.5 font-medium capitalize">
                    {detail.value}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </motion.ul>

        {/* Activities */}
        {event.activities.length > 0 && (
          <motion.div
            className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-center font-serif text-xl text-foreground mb-5">
              ¿Qué habrá en la fiesta?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {event.activities.map((activity: EventActivity) => (
                <div
                  key={activity.label}
                  className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-3 shadow-sm"
                >
                  <ActivityIcon name={activity.icon} />
                  <span className="text-foreground font-sans text-sm font-medium">
                    {activity.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
