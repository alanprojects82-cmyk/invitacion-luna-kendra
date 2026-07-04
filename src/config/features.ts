/**
 * Global feature flags for InvitaPro.
 * Toggle features without modifying components.
 */
export const features = {
  hero: true,
  countdown: true,
  invitationInfo: true,
  location: true,
  rsvp: true,
  messages: true,
  musicPlayer: true,
  floatingButtons: true,
  footer: true,
} as const

export type FeatureKey = keyof typeof features
