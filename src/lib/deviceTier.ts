/**
 * Device capability detection for performance optimization
 * Returns tier: 'high' (desktop/flagship), 'medium' (mid-range mobile), 'low' (budget mobile)
 * 
 * Strategy:
 * - Desktop always gets 'high' tier (full effects)
 * - Mobile devices tiered by: CPU cores, memory, GPU capability
 * - Default to 'low' for conservative fallback
 */

export type DeviceTier = 'high' | 'medium' | 'low'

let cachedTier: DeviceTier | null = null

export function getDeviceTier(): DeviceTier {
  // Return cached result if available (avoid repeated detection)
  if (cachedTier !== null) return cachedTier

  // Server-side: default to low tier
  if (typeof window === 'undefined') {
    cachedTier = 'low'
    return cachedTier
  }

  // Check sessionStorage cache
  const cached = sessionStorage.getItem('deviceTier')
  if (cached === 'high' || cached === 'medium' || cached === 'low') {
    cachedTier = cached
    return cachedTier
  }

  // Desktop detection: width > 1024px = always high tier
  if (window.innerWidth > 1024) {
    cachedTier = 'high'
    sessionStorage.setItem('deviceTier', cachedTier)
    return cachedTier
  }

  // Mobile device: detect capability
  let score = 0

  // 1. CPU cores (higher = better)
  const cores = navigator.hardwareConcurrency || 2
  if (cores >= 8) score += 3
  else if (cores >= 6) score += 2
  else if (cores >= 4) score += 1

  // 2. Memory (if available)
  const memory = (navigator as any).deviceMemory
  if (memory) {
    if (memory >= 8) score += 3
    else if (memory >= 4) score += 2
    else if (memory >= 2) score += 1
  }

  // 3. GPU capability via canvas performance test
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl) {
      const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        // High-end GPU indicators
        if (renderer && (
          renderer.includes('Apple') ||
          renderer.includes('Adreno 6') ||
          renderer.includes('Adreno 7') ||
          renderer.includes('Mali-G7') ||
          renderer.includes('Mali-G9')
        )) {
          score += 2
        }
      }
    }
  } catch {
    // GPU detection failed, no score change
  }

  // 4. Connection speed (faster = likely better device)
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  if (connection) {
    const effectiveType = connection.effectiveType
    if (effectiveType === '4g') score += 1
  }

  // 5. Battery status (low battery = reduce effects to save power)
  // Note: Battery API is deprecated but still check if available
  let lowPower = false
  if ('getBattery' in navigator) {
    ;(navigator as any).getBattery?.().then((battery: any) => {
      if (battery.level < 0.2 && !battery.charging) {
        lowPower = true
        // Force low tier if battery critical
        if (cachedTier === 'medium' || cachedTier === 'high') {
          cachedTier = 'low'
          sessionStorage.setItem('deviceTier', 'low')
        }
      }
    }).catch(() => {})
  }

  // Determine tier based on score
  let tier: DeviceTier
  if (score >= 7) {
    tier = 'high'  // Flagship mobile (iPhone 15, Samsung S24, Pixel 8)
  } else if (score >= 4) {
    tier = 'medium'  // Mid-range mobile (iPhone 12, mid-tier Android)
  } else {
    tier = 'low'  // Budget mobile (iPhone SE, budget Android)
  }

  cachedTier = tier
  sessionStorage.setItem('deviceTier', tier)
  return tier
}

/**
 * Get particle count for effects based on device tier
 */
export function getParticleCount(base: number): number {
  const tier = getDeviceTier()
  if (tier === 'high') return base
  if (tier === 'medium') return Math.floor(base * 0.5)
  return Math.floor(base * 0.25)
}

/**
 * Check if heavy effects should be enabled
 */
export function shouldEnableHeavyEffects(): boolean {
  return getDeviceTier() !== 'low'
}
