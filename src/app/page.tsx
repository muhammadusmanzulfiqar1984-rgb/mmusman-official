'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import sections from '@/content/sections.json'
import Header from '@/components/layout/Header'

const HeroSection = dynamic(() => import('@/components/scenes/HeroSection'), { ssr: true })
const AboutSection = dynamic(() => import('@/components/scenes/AboutSection'))
const WorkSection = dynamic(() => import('@/components/scenes/WorkSection'))
const InsightsSection = dynamic(() => import('@/components/scenes/InsightsSection'))
const SpeakingSection = dynamic(() => import('@/components/scenes/SpeakingSection'))
const TrainingSection = dynamic(() => import('@/components/scenes/TrainingSection'))
const TalksSection = dynamic(() => import('@/components/scenes/TalksSection'))
const ContactSection = dynamic(() => import('@/components/scenes/ContactSection'))
const SkillscapeSection = dynamic(() => import('@/components/scenes/SkillscapeSection'))
const TruthLens = dynamic(() => import('@/components/scenes/TruthLens'))
const ConversationsSection = dynamic(() => import('@/components/scenes/ConversationsSection'))

import { usePersonaEngine, PersonaBadge } from '@/components/ai/PersonaEngine'
import { useCognitiveLoadBalancer, CognitiveLoadPrompt, SimplifiedModeBanner } from '@/components/ai/CognitiveLoadBalancer'
import KeyboardShortcuts from '@/components/effects/KeyboardShortcuts'
import ReadingProgress from '@/components/effects/ReadingProgress'

function getSection(id: string) {
  return sections.find(s => s.id === id)!
}

const DATA_SECTION_MAP: Record<string, any> = {
  hero:       HeroSection,
  about:      AboutSection,
  work:       WorkSection,
  insights:   InsightsSection,
  speaking:   SpeakingSection,
  training:   TrainingSection,
  talks:      TalksSection,
  skillscape: SkillscapeSection,
  media:      ConversationsSection,
  truth:      TruthLens,
  contact:    ContactSection,
}

const STANDALONE_MAP: Record<string, React.FC> = {}

const TOUR_STEPS = ['hero','about','work','insights','speaking','talks','training','skillscape','media','truth','contact']

export default function Home() {
  const { decision, sectionOrder } = usePersonaEngine()
  const { mode, triggered, simplify, restore, dismiss } = useCognitiveLoadBalancer()

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
    return () => document.documentElement.removeAttribute('data-mode')
  }, [mode])

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }) },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionOrder])

  const runTour = () => {
    let i = 0
    const step = () => {
      if (i >= TOUR_STEPS.length) return
      const el = document.getElementById(TOUR_STEPS[i++])
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (i < TOUR_STEPS.length) setTimeout(step, 2200)
    }
    step()
  }

  return (
    <>
      <Header />

      {mode === 'simplified' && <SimplifiedModeBanner onRestore={restore} />}
      <CognitiveLoadPrompt triggered={triggered} onSimplify={simplify} onDismiss={dismiss} />

      <main id="main-content" tabIndex={-1}>
        {sectionOrder.map(id => {
          const Standalone = STANDALONE_MAP[id]
          if (Standalone) return <Standalone key={id} />
          const Component = DATA_SECTION_MAP[id]
          const data = getSection(id)
          if (!Component || !data) return null
          return <Component key={id} data={data as any} />
        })}
      </main>

      <PersonaBadge decision={decision} />
      <KeyboardShortcuts />
      <ReadingProgress />

      {/* Site tour button */}
      <button
        onClick={runTour}
        aria-label="Start guided site tour"
        style={{
          position: 'fixed',
          bottom: '92px',
          right: '28px',
          zIndex: 250,
          background: 'rgba(10,10,10,0.92)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          color: 'var(--color-text-ghost)',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          transition: 'border-color var(--duration-base), color var(--duration-base)',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-gold-dim)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-gold)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-ghost)' }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Site tour
      </button>
    </>
  )
}
