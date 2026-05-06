'use client'

import dynamic from 'next/dynamic'

const AmbientLight = dynamic(() => import('@/components/effects/AmbientLight'), { ssr: false })
const AmbientPlayer = dynamic(() => import('@/components/effects/AmbientPlayer'), { ssr: false })
const GlowOnScroll = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.GlowOnScroll })), { ssr: false })
const GlassmorphismCards = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.GlassmorphismCards })), { ssr: false })
const AnimatedGradient = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.AnimatedGradient })), { ssr: false })
const TextRevealOnScroll = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.TextRevealOnScroll })), { ssr: false })
const GoldAccents = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.GoldAccents })), { ssr: false })
const ParallaxScroll = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.ParallaxScroll })), { ssr: false })
const HoverGlow = dynamic(() => import('@/components/effects/GlamourEffects').then(m => ({ default: m.HoverGlow })), { ssr: false })

export default function ClientEffects() {
  return (
    <>
      <AmbientLight />
      <AmbientPlayer />
      <AnimatedGradient />
      <GlassmorphismCards />
      <TextRevealOnScroll />
      <GoldAccents />
      <ParallaxScroll />
      <HoverGlow />
      <GlowOnScroll />
    </>
  )
}