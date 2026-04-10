'use client'
import { useEffect, useState, useCallback } from 'react'
import { inferPersona, trackDwell, type PersonaDecision } from '@/lib/policyEngine'
import { eventBus, EVENTS } from '@/lib/eventBus'
import { record, initScrollTracking, initSectionTracking, initRageClickTracking } from '@/lib/telemetry'

export function usePersonaEngine() {
  const [engineState, setEngineState] = useState(() => {
    const initialDecision = inferPersona()
    return {
      decision: initialDecision,
      sectionOrder: initialDecision.sectionOrder,
    }
  })

  const refresh = useCallback(() => {
    const d = inferPersona()
    setEngineState({ decision: d, sectionOrder: d.sectionOrder })
    if (d.persona !== 'default') {
      eventBus.emit(EVENTS.SCENE_REORDER, { order: d.sectionOrder, persona: d.persona })
    }
  }, [])

  useEffect(() => {
    if (engineState.decision.persona !== 'default') {
      eventBus.emit(EVENTS.SCENE_REORDER, {
        order: engineState.sectionOrder,
        persona: engineState.decision.persona,
      })
    }

    // Record page view
    record(EVENTS.PAGE_VIEW, {
      url:      window.location.pathname,
      referrer: document.referrer,
    })

    // Init all tracking
    const cleanScroll  = initScrollTracking()
    const cleanSection = initSectionTracking()
    const cleanRage    = initRageClickTracking()

    // Re-infer persona when a section has been dwelt on
    const offDwell = eventBus.on(EVENTS.SECTION_DWELL, (e) => {
      const ev = e as { meta?: { sectionId?: string } }
      if (ev?.meta?.sectionId) {
        trackDwell(ev.meta.sectionId)
        refresh()
      }
    })

    return () => {
      cleanScroll?.()
      cleanSection?.()
      cleanRage?.()
      offDwell()
    }
  }, [engineState.decision.persona, engineState.sectionOrder, refresh])

  return { decision: engineState.decision, sectionOrder: engineState.sectionOrder }
}

// ── Explainability badge ──────────────────────────────────────────────────────
export function PersonaBadge({ decision }: { decision: PersonaDecision | null }) {
  const [visible, setVisible] = useState(false)

  if (!decision || decision.persona === 'default') return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '100px',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <button
        onClick={() => setVisible(v => !v)}
        aria-label="Why am I seeing this layout?"
        aria-expanded={visible}
        style={{
          background: 'rgba(10,10,10,0.9)',
          border: '1px solid var(--color-gold-dim)',
          borderRadius: 'var(--radius-sm)',
          padding: '5px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          cursor: 'pointer',
        }}
      >
        ✦ Adapted for {decision.label}
      </button>

      {visible && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: '36px',
            left: 0,
            background: 'rgba(10,10,10,0.97)',
            border: '1px solid var(--color-gold-dim)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            width: '260px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
          }}
        >
          <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Why this layout?
          </p>
          <p>
            Based on your visit context, we inferred you may be a{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>{decision.label}</strong>.
            Sections most relevant to you are shown first.
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem('mian_dwell_section')
              window.location.reload()
            }}
            style={{
              marginTop: '12px',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.08em',
              color: 'var(--color-text-ghost)',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Reset to default view
          </button>
        </div>
      )}
    </div>
  )
}
