// ─── Policy Engine ────────────────────────────────────────────────────────────
// Infers visitor persona from heuristics (referrer, search terms, dwell).
// Drives section reordering and CTA swapping.
// All inference is local-only — no data leaves the browser.

import rules from './rules.json'
import { eventBus, EVENTS } from './eventBus'

export type PersonaId = 'recruiter' | 'conference' | 'corporate' | 'default'

export interface PersonaDecision {
  persona:      PersonaId
  label:        string
  sectionOrder: string[]
  heroCta:      string
  heroCtaHref:  string
  confidence:   number // 0–1
}

interface Rule {
  id:       string
  label:    string
  when:     Array<{ key: string; op: string; value: string }>
  matchAny: boolean
  then:     { sectionOrder: string[]; heroCta: string; heroCtaHref: string }
}

interface PolicyContext {
  referrer:     string
  searchTerm:   string
  dwellSection: string
}

function buildContext(): PolicyContext {
  if (typeof window === 'undefined') {
    return { referrer: '', searchTerm: '', dwellSection: '' }
  }
  const ref = document.referrer.toLowerCase()
  const params = new URLSearchParams(window.location.search)
  const searchTerm = (params.get('q') ?? params.get('search') ?? '').toLowerCase()
  const dwell = sessionStorage.getItem('mian_dwell_section') ?? ''
  return { referrer: ref, searchTerm, dwellSection: dwell }
}

function evaluate(rule: Rule, ctx: PolicyContext): boolean {
  if (rule.when.length === 0) return false

  const checks = rule.when.map(condition => {
    const val = ctx[condition.key as keyof PolicyContext] ?? ''
    if (condition.op === 'contains') return val.includes(condition.value)
    if (condition.op === 'equals')   return val === condition.value
    return false
  })

  return rule.matchAny ? checks.some(Boolean) : checks.every(Boolean)
}

export function inferPersona(): PersonaDecision {
  const ctx = buildContext()
  const matchedRules = rules as Rule[]

  for (const rule of matchedRules) {
    if (rule.id === 'default') continue
    const matched = evaluate(rule, ctx)
    if (matched) {
      const decision: PersonaDecision = {
        persona:      rule.id as PersonaId,
        label:        rule.label,
        sectionOrder: rule.then.sectionOrder,
        heroCta:      rule.then.heroCta,
        heroCtaHref:  rule.then.heroCtaHref,
        confidence:   0.8,
      }
      eventBus.emit(EVENTS.PERSONA_UPDATED, decision)
      return decision
    }
  }

  // Default fallback
  const defaultRule = matchedRules.find(r => r.id === 'default')!
  const decision: PersonaDecision = {
    persona:      'default',
    label:        defaultRule.label,
    sectionOrder: defaultRule.then.sectionOrder,
    heroCta:      defaultRule.then.heroCta,
    heroCtaHref:  defaultRule.then.heroCtaHref,
    confidence:   0.5,
  }
  return decision
}

// ── Track dwell for next visit persona inference ──────────────────────────────
export function trackDwell(sectionId: string) {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.setItem('mian_dwell_section', sectionId)
}
