import type { ThemeConfig, ThemeId } from '@/src/types'
import { westernTheme } from './western'
import { princessTheme } from './princess'

export const themes: Record<ThemeId, ThemeConfig> = {
  western: westernTheme,
  princess: princessTheme,
  jungle: westernTheme,   // placeholder — swap when needed
  ocean: westernTheme,    // placeholder — swap when needed
  default: westernTheme,  // placeholder — swap when needed
}

export function getTheme(id: ThemeId): ThemeConfig {
  return themes[id] ?? themes.default
}

export { westernTheme, princessTheme }
