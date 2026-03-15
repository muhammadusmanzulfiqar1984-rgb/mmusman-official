// ─── Event Bus ───────────────────────────────────────────────────────────────
// Lightweight pub/sub. All telemetry, persona updates, and scene control
// flow through here so modules stay decoupled.

type Handler = (payload: unknown) => void

const listeners = new Map<string, Set<Handler>>()

export const eventBus = {
  on(event: string, handler: Handler) {
    if (!listeners.has(event)) listeners.set(event, new Set())
    listeners.get(event)!.add(handler)
    return () => listeners.get(event)?.delete(handler)
  },

  emit(event: string, payload?: unknown) {
    listeners.get(event)?.forEach(h => h(payload))
  },

  off(event: string, handler: Handler) {
    listeners.get(event)?.delete(handler)
  },
}

// ─── Event catalogue ─────────────────────────────────────────────────────────
export const EVENTS = {
  PAGE_VIEW:        'page:view',
  SECTION_VISIBLE:  'section:visible',
  SECTION_DWELL:    'section:dwell',
  SCROLL_DEPTH:     'scroll:depth',
  CLICK:            'ui:click',
  RAGE_CLICK:       'ui:rage_click',
  HOVER:            'ui:hover',
  FORM_START:       'form:start',
  FORM_SUBMIT:      'form:submit',
  CHAT_OPEN:        'chat:open',
  CHAT_MESSAGE:     'chat:message',
  PERSONA_UPDATED:  'persona:updated',
  SCENE_REORDER:    'scene:reorder',
  CWV:              'perf:cwv',
  CONSENT_GRANTED:  'privacy:consent_granted',
  CONSENT_DENIED:   'privacy:consent_denied',
} as const
