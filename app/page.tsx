'use client'

import { currentEvent } from '@/src/config/currentEvent'
import { features } from '@/src/config/features'
import { InvitationPage } from '@/src/app/InvitationPage'

export default function Page() {
  return <InvitationPage event={currentEvent} features={features} />
}
