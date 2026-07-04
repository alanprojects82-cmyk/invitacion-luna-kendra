'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Users, Baby, User, PartyPopper } from 'lucide-react'
import type { EventConfig } from '@/src/types'

interface RSVPProps {
  event: EventConfig
}

interface RSVPFormData {
  name: string
  attending: 'yes' | 'no'
  adults: number
  children: number
}

interface RSVPEntry extends RSVPFormData {
  id: string
  submittedAt: Date
}

function validateRSVP(data: RSVPFormData): Record<string, string> {
  const errs: Record<string, string> = {}
  if (!data.name || data.name.trim().length < 2)
    errs.name = 'Escribe tu nombre (mínimo 2 letras)'
  if (data.attending === 'yes') {
    if (!data.adults || data.adults < 1)
      errs.adults = 'Al menos 1 adulto'
    if (data.children === undefined || data.children < 0)
      errs.children = 'Número de niños inválido'
  }
  return errs
}

export function RSVP({ event }: RSVPProps) {
  const { rsvp } = event
  const [entries, setEntries] = useState<RSVPEntry[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<RSVPFormData>({
    defaultValues: { attending: 'yes', adults: 1, children: 0 },
  })

  const attending = watch('attending')

  if (!rsvp.enabled) return null

  const onSubmit = async (data: RSVPFormData) => {
  const errs = validateRSVP(data)

  if (Object.keys(errs).length > 0) {
    setFormErrors(errs)
    return
  }

  setFormErrors({})

  try {
    const formData = new FormData()

    formData.append('entry.1441458668', data.name)

    formData.append(
      'entry.564903626',
      data.attending === 'yes'
        ? '🤠 Sí, asistiré.'
        : '😔 No podré asistir.',
    )

    formData.append(
      'entry.616878955',
      data.attending === 'yes'
        ? String(data.adults)
        : '0',
    )

    formData.append(
      'entry.869569105',
      data.attending === 'yes'
        ? String(data.children)
        : '0',
    )

    formData.append('entry.785473388', '')

    await fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSeYiFQq37STPTxVCSfX7673WKscoqWaG3wcZGq6H43uMLUC2Q/formResponse',
      {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      },
    )

    setSubmitted(true)

    reset({
      name: '',
      attending: 'yes',
      adults: 1,
      children: 0,
    })
  } catch (error) {
    console.error(error)
    alert('Ocurrió un error al enviar la confirmación.')
  }
}

  return (
    <section
      className="py-16 px-4 bg-background"
      aria-label="Confirmar asistencia"
      id="rsvp"
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
            Confirmación
          </span>
          <h2 className="font-serif text-3xl text-foreground mt-2 text-balance">
            ¿Vas a venir?
          </h2>
          <p className="text-muted-foreground font-sans text-sm mt-2">
            Ya puedes confirmar. Ponle tu nombre y cuántos van a ir.
          </p>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-4" aria-hidden="true" />
        </motion.div>

        {/* Form card */}
        <motion.div
          className="bg-surface rounded-3xl p-6 shadow-md border border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                className="flex flex-col items-center text-center py-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <PartyPopper
                    size={36}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-serif text-2xl text-foreground mb-2">
                  ¡Anotado!
                </p>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-5">
                  Tu confirmación ya quedó registrada. ¡Te esperamos con todo
                  el cariño!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-primary font-sans text-sm underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Confirmar otra persona
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="flex items-center gap-1.5 text-foreground font-sans text-sm font-semibold mb-1.5"
                  >
                    <User size={14} aria-hidden="true" />
                    Tu nombre
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    placeholder="¿Cómo te llamas?"
                    autoComplete="name"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? 'rsvp-name-error' : undefined}
                    {...register('name')}
                  />
                  {formErrors.name && (
                    <p id="rsvp-name-error" className="text-red-600 text-xs mt-1 font-sans" role="alert">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Attending yes / no */}
                <div>
                  <span className="block text-foreground font-sans text-sm font-semibold mb-2">
                    ¿Vas a ir?
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'yes', label: 'Si voy', emoji: '🤠' },
                      { value: 'no', label: 'No puedo', emoji: '😢' },
                    ].map(({ value, label, emoji }) => (
                      <label
                        key={value}
                        className={`
                          flex items-center justify-center gap-2 rounded-2xl border-2 py-3 cursor-pointer font-sans text-sm font-semibold transition-all
                          ${attending === value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-background text-muted-foreground hover:border-primary/40'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          value={value}
                          className="sr-only"
                          {...register('attending')}
                        />
                        <span aria-hidden="true">{emoji}</span>
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Adults + children — only when attending */}
                <AnimatePresence>
                  {attending === 'yes' && (
                    <motion.div
                      key="guest-counts"
                      className="grid grid-cols-2 gap-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Adults */}
                      <div>
                        <label
                          htmlFor="rsvp-adults"
                          className="flex items-center gap-1.5 text-foreground font-sans text-sm font-semibold mb-1.5"
                        >
                          <Users size={14} aria-hidden="true" />
                          Adultos
                        </label>
                        <input
                          id="rsvp-adults"
                          type="number"
                          min={1}
                          max={20}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 font-sans text-foreground text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                          aria-invalid={!!formErrors.adults}
                          aria-describedby={formErrors.adults ? 'rsvp-adults-error' : undefined}
                          {...register('adults', { valueAsNumber: true })}
                        />
                        {formErrors.adults && (
                          <p id="rsvp-adults-error" className="text-red-600 text-xs mt-1 font-sans" role="alert">
                            {formErrors.adults}
                          </p>
                        )}
                      </div>

                      {/* Children */}
                      <div>
                        <label
                          htmlFor="rsvp-children"
                          className="flex items-center gap-1.5 text-foreground font-sans text-sm font-semibold mb-1.5"
                        >
                          <Baby size={14} aria-hidden="true" />
                          Niños
                        </label>
                        <input
                          id="rsvp-children"
                          type="number"
                          min={0}
                          max={20}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 font-sans text-foreground text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                          aria-invalid={!!formErrors.children}
                          aria-describedby={formErrors.children ? 'rsvp-children-error' : undefined}
                          {...register('children', { valueAsNumber: true })}
                        />
                        {formErrors.children && (
                          <p id="rsvp-children-error" className="text-red-600 text-xs mt-1 font-sans" role="alert">
                            {formErrors.children}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-sans font-semibold py-4 rounded-2xl shadow-md hover:bg-primary/90 active:scale-95 transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <CheckCircle size={18} aria-hidden="true" />
                  {attending === 'yes' ? 'Confirmar asistencia' : 'Enviar respuesta'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submitted entries list */}
        <AnimatePresence>
          {entries.length > 0 && (
            <motion.div
              className="mt-6 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-center text-muted-foreground font-sans text-xs tracking-widest uppercase font-semibold mb-3">
                Ya confirmaron
              </p>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  className="bg-surface rounded-2xl px-4 py-3 border border-border flex items-center justify-between gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${entry.attending === 'yes' ? 'bg-primary' : 'bg-muted-foreground/40'}`}
                      aria-hidden="true"
                    />
                    <span className="font-sans font-semibold text-foreground text-sm truncate">
                      {entry.name}
                    </span>
                  </div>
                  {entry.attending === 'yes' ? (
                    <span className="text-muted-foreground font-sans text-xs flex-shrink-0">
                      {entry.adults} adulto{entry.adults !== 1 ? 's' : ''}
                      {entry.children > 0 &&
                        `, ${entry.children} niño${entry.children !== 1 ? 's' : ''}`}
                    </span>
                  ) : (
                    <span className="text-muted-foreground font-sans text-xs flex-shrink-0 italic">
                      No puede ir
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
