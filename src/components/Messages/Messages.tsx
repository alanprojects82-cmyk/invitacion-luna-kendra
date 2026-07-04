'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MessageCircle, Send, Heart } from 'lucide-react'
import type { EventConfig, GuestMessage } from '@/src/types'

interface MessagesProps {
  event: EventConfig
}

interface MessageFormData {
  name: string
  message: string
}

function validateForm(data: MessageFormData): Record<string, string> {
  const errs: Record<string, string> = {}
  if (data.name.trim().length < 2) errs.name = 'El nombre debe tener al menos 2 caracteres'
  if (data.message.trim().length < 5) errs.message = 'El mensaje debe tener al menos 5 caracteres'
  if (data.message.trim().length > 200) errs.message = 'El mensaje no puede superar los 200 caracteres'
  return errs
}

/**
 * Messages component — currently uses local state.
 * Architecture is ready to swap in Supabase without modifying this component:
 * just update the onSubmit handler to call a server action.
 */
export function Messages({ event }: MessagesProps) {
  const { messages } = event
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<MessageFormData>()

  if (!messages.enabled) return null

const onSubmit = async (data: MessageFormData) => {
  const errs = validateForm(data)

  if (Object.keys(errs).length > 0) {
    setFormErrors(errs)
    return
  }

  setFormErrors({})

  // Número de WhatsApp de la clienta
  const phone = '524735608712'

  const text = `🤠 ¡Hola!

Quiero dejar un mensaje para Luna Kailani y Kendra Leilani.

👤 Nombre:
${data.name}

💌 Mensaje:
${data.message}`

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`

  window.open(whatsappUrl, '_blank')

  setSubmitted(true)
  reset()

  setTimeout(() => {
    setSubmitted(false)
  }, 3000)
}

  return (
    <section
      className="py-16 px-4 bg-surface"
      aria-label="Mensajes de los invitados"
      id="messages"
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
            Mensajes
          </span>
          <h2 className="font-serif text-3xl text-foreground mt-2 text-balance">
            Déjales un Mensaje
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-4" aria-hidden="true" />
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-background rounded-3xl p-5 shadow-md border border-border mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label
                htmlFor="message-name"
                className="block text-foreground font-sans text-sm font-semibold mb-1.5"
              >
                Tu nombre
              </label>
              <input
                id="message-name"
                type="text"
                placeholder="Ej. Tío Poncho"
                autoComplete="name"
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? 'name-error' : undefined}
                {...register('name')}
              />
              {formErrors.name && (
                <p
                  id="name-error"
                  className="text-destructive text-xs mt-1 font-sans"
                  role="alert"
                >
                  {formErrors.name}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="message-text"
                className="block text-foreground font-sans text-sm font-semibold mb-1.5"
              >
                Tu mensaje
              </label>
              <textarea
                id="message-text"
                rows={4}
                placeholder="Escribe algo bonito para Luna y Kendra..."
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? 'message-error' : undefined}
                {...register('message')}
              />
              {formErrors.message && (
                <p
                  id="message-error"
                  className="text-destructive text-xs mt-1 font-sans"
                  role="alert"
                >
                  {formErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-sans font-semibold py-4 rounded-2xl shadow-md hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Enviar mensaje"
            >
              <Send size={18} aria-hidden="true" />
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.div
                className="mt-4 flex items-center justify-center gap-2 text-primary font-sans text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                aria-live="polite"
              >
                <Heart size={16} aria-hidden="true" />
                ¡Mensaje enviado con amor!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Messages list */}
        <AnimatePresence>
          {guestMessages.length > 0 && (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="font-sans text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <MessageCircle size={14} aria-hidden="true" />
                Mensajes ({guestMessages.length})
              </h3>
              {guestMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className="bg-background rounded-2xl p-4 shadow-sm border border-border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-sans font-semibold text-foreground text-sm">
                    {msg.name}
                  </p>
                  <p className="font-sans text-foreground/80 text-sm mt-1 leading-relaxed">
                    {msg.message}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
