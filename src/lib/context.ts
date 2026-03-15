// ─── Context Engine ───────────────────────────────────────────────────────────
// Computes environment flags once on mount. Components read from this
// to make rendering decisions (motion, quality, layout).

export interface AppContext {
  // Device
  viewport:        { w: number; h: number }
  pointer:         'fine' | 'coarse' | 'none'
  hover:           boolean
  touch:           boolean
  // Preferences
  prefersReducedMotion:  boolean
  prefersColorScheme:    'dark' | 'light'
  prefersHighContrast:   boolean
  // Network
  connectionType:  string
  saveData:        boolean
  // Locale
  locale:          string
  // Battery (if available)
  lowPower:        boolean
}

export async function getContext(): Promise<AppContext> {
  if (typeof window === 'undefined') {
    return {
      viewport: { w: 1280, h: 800 },
      pointer: 'fine', hover: true, touch: false,
      prefersReducedMotion: false, prefersColorScheme: 'dark',
      prefersHighContrast: false,
      connectionType: 'unknown', saveData: false,
      locale: 'en', lowPower: false,
    }
  }

  // Battery
  let lowPower = false
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const batt = await (navigator as any).getBattery?.()
    if (batt) lowPower = batt.level < 0.2 && !batt.charging
  } catch { /* not supported */ }

  // Network
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any
  const conn = nav.connection ?? nav.mozConnection ?? nav.webkitConnection
  const connectionType = conn?.effectiveType ?? 'unknown'
  const saveData = conn?.saveData ?? false

  return {
    viewport: { w: window.innerWidth, h: window.innerHeight },
    pointer:  window.matchMedia('(pointer: fine)').matches ? 'fine'
            : window.matchMedia('(pointer: coarse)').matches ? 'coarse' : 'none',
    hover:    window.matchMedia('(hover: hover)').matches,
    touch:    'ontouchstart' in window,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersColorScheme:   window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
    prefersHighContrast:  window.matchMedia('(forced-colors: active)').matches,
    connectionType,
    saveData,
    locale: navigator.language?.slice(0, 2) ?? 'en',
    lowPower,
  }
}
