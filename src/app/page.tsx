'use client'
import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import sections from '@/content/sections.json'
import Header from '@/components/layout/Header'

const HeroSection = dynamic(() => import('@/components/scenes/HeroSection'), { ssr: true })
const AboutSection = dynamic(() => import('@/components/scenes/AboutSection'))
const WorkSection = dynamic(() => import('@/components/scenes/WorkSection'))
const InsightsSection = dynamic(() => import('@/components/scenes/InsightsSection'))
const TrainingSection = dynamic(() => import('@/components/scenes/TrainingSection'))
const RecordSection = dynamic(() => import('@/components/scenes/RecordSection'))
const PublicationStrip = dynamic(() => import('@/components/scenes/PublicationStrip'))
const HarvicsSection = dynamic(() => import('@/components/scenes/HarvicsSection'))
const IntelligenceSection = dynamic(() => import('@/components/scenes/IntelligenceSection'))
const ContactSection = dynamic(() => import('@/components/scenes/ContactSection'))

import { usePersonaEngine } from '@/components/ai/PersonaEngine'
import { useCognitiveLoadBalancer } from '@/components/ai/CognitiveLoadBalancer'
import ReadingProgress from '@/components/effects/ReadingProgress'

function getSection(id: string) {
  return sections.find(s => s.id === id) ?? null
}

type SectionData = (typeof sections)[number]
type HeroButton = {
  label: string
  href: string
  variant: string
}

function hasButtons(data: SectionData): data is SectionData & { buttons: HeroButton[] } {
  return 'buttons' in data && Array.isArray(data.buttons) && data.buttons.length > 0
}

function getRenderData(id: string, data: SectionData, decision: ReturnType<typeof usePersonaEngine>['decision'], mounted: boolean): SectionData {
  if (id !== 'hero' || !mounted || !decision || decision.persona === 'default' || !hasButtons(data)) {
    return data
  }

  const [primaryButton, ...restButtons] = data.buttons
  return {
    ...data,
    buttons: [
      {
        ...primaryButton,
        label: decision.heroCta,
        href: decision.heroCtaHref,
      },
      ...restButtons,
    ],
  }
}

const DATA_SECTION_MAP: Record<string, unknown> = {
  hero:         HeroSection,
  about:        AboutSection,
  work:         WorkSection,
  insights:     InsightsSection,
  record:       RecordSection,
  recognition:  PublicationStrip,
  training:     TrainingSection,
  harvics:      HarvicsSection,
  intelligence: IntelligenceSection,
  contact:      ContactSection,
}



export default function Home() {
  const { decision, sectionOrder } = usePersonaEngine()
  const TOUR_STEPS = sectionOrder
  const { mode, triggered, simplify, restore, dismiss } = useCognitiveLoadBalancer()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

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

      <main id="main-content" tabIndex={-1}>
        {sectionOrder.map(id => {
          const Component = DATA_SECTION_MAP[id]
          const data = getSection(id)
          if (!Component || !data) return null
          const ResolvedComponent = Component as ComponentType<{ data: SectionData }>
          return <ResolvedComponent key={id} data={getRenderData(id, data, decision, mounted)} />
        })}
      </main>

      <ReadingProgress />
    </>
  )
}
