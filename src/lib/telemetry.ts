// ─── Telemetry ────────────────────────────────────────────────────────────────
// Local-first analytics. Events are stored in localStorage only.
// Nothing is sent to any external server. Consent-gated.

import { eventBus, EVENTS } from './eventBus'

const STORAGE_KEY = 'mian_telemetry'
const SESSION_KEY = 'mian_session'
const CONSENT_KEY = 'mian_consent'

export type ConsentTier = 'none' | 'local'

export interface TelemetryEvent {
  ts:          number
  sessionId:   string
  type:        string
  targetId?:   string
  meta?:       Record<string, unknown>
  consentTier: ConsentTier
}

// ── Session ID ────────────────────────────────────────────────────────────────
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr'
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    // Non-reversible hash — no PII
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

// ── Consent ───────────────────────────────────────────────────────────────────
export function getConsent(): ConsentTier {
  if (typeof window === 'undefined') return 'none'
  return (localStorage.getItem(CONSENT_KEY) as ConsentTier) ?? 'none'
}

export function setConsent(tier: ConsentTier) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONSENT_KEY, tier)
  eventBus.emit(tier === 'local' ? EVENTS.CONSENT_GRANTED : EVENTS.CONSENT_DENIED, { tier })
}

// ── Record ────────────────────────────────────────────────────────────────────
export function record(type: string, meta?: Record<string, unknown>, targetId?: string) {
  const consent = getConsent()
  if (consent === 'none') return

  const event: TelemetryEvent = {
    ts:          Date.now(),
    sessionId:   getSessionId(),
    type,
    targetId,
    meta,
    consentTier: consent,
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const events: TelemetryEvent[] = raw ? JSON.parse(raw) : []
    // Keep last 200 events max
    events.push(event)
    if (events.length > 200) events.splice(0, events.length - 200)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch { /* storage full */ }

  eventBus.emit(type, event)
}

// ── Core Web Vitals ───────────────────────────────────────────────────────────
// Call initCWV() only from a 'use client' component, not during SSR.
export function initCWV() {
  if (typeof window === 'undefined') return
  // Dynamically load web-vitals at runtime — does not run during SSR
  void (async () => {
    try {
      const wv = await import('web-vitals')
      const report = (name: string) => (m: { name: string; value: number; rating: string }) =>
        record(EVENTS.CWV, { name, value: Math.round(m.value), rating: m.rating })
      wv.onLCP(report('LCP'))
      wv.onCLS(report('CLS'))
      wv.onINP(report('INP'))
      wv.onFCP(report('FCP'))
      wv.onTTFB(report('TTFB'))
    } catch { /* web-vitals unavailable */ }
  })()
}

// ── Scroll depth ──────────────────────────────────────────────────────────────
export function initScrollTracking() {
  if (typeof window === 'undefined') return
  let maxDepth = 0
  const onScroll = () => {
    const depth = Math.round(
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
    )
    if (depth > maxDepth + 10) {
      maxDepth = depth
      record(EVENTS.SCROLL_DEPTH, { depth })
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}

// ── Section visibility ────────────────────────────────────────────────────────
export function initSectionTracking() {
  if (typeof window === 'undefined') return
  const dwellTimers = new Map<string, number>()

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const id = (e.target as HTMLElement).id
      if (!id) return
      if (e.isIntersecting) {
        record(EVENTS.SECTION_VISIBLE, { sectionId: id }, id)
        dwellTimers.set(id, window.setTimeout(() => {
          record(EVENTS.SECTION_DWELL, { sectionId: id, ms: 3000 }, id)
        }, 3000))
      } else {
        const t = dwellTimers.get(id)
        if (t) { clearTimeout(t); dwellTimers.delete(id) }
      }
    })
  }, { threshold: 0.4 })

  document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
  return () => observer.disconnect()
}

// ── Rage click ────────────────────────────────────────────────────────────────
export function initRageClickTracking() {
  if (typeof window === 'undefined') return
  const clicks: number[] = []
  const onClick = (e: MouseEvent) => {
    const now = Date.now()
    clicks.push(now)
    const recent = clicks.filter(t => now - t < 1000)
    if (recent.length >= 3) {
      const el = e.target as HTMLElement
      record(EVENTS.RAGE_CLICK, { targetTag: el.tagName, targetId: el.id })
    }
    if (clicks.length > 20) clicks.splice(0, clicks.length - 20)
  }
  window.addEventListener('click', onClick)
  return () => window.removeEventListener('click', onClick)
}

// ── Export data (for privacy panel) ──────────────────────────────────────────
export function exportData(): TelemetryEvent[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch { return [] }
}

export function deleteData() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(CONSENT_KEY)
}
