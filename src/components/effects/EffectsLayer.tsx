'use client'
import dynamic from 'next/dynamic'
import { useGlassPhobic, useInertialHover } from './GlassPhobic'

// Dynamically import canvas/JS-heavy effects (no SSR)
const SilkCursor            = dynamic(() => import('./SilkCursor'),                   { ssr: false })
const GoldWave              = dynamic(() => import('./GoldWave'),                     { ssr: false })
const GoldDust              = dynamic(() => import('./GoldDust'),                     { ssr: false })
const SilkWeave             = dynamic(() => import('./SilkWeave'),                   { ssr: false })
const DepthBreathing        = dynamic(() => import('./DepthBreathing'),               { ssr: false })
const MicroPulse            = dynamic(() => import('./MicroPulse'),                  { ssr: false })
const IntentHints           = dynamic(() => import('./IntentHints'),                 { ssr: false })
const FocusNarrow           = dynamic(() => import('./FocusNarrow'),                 { ssr: false })
const IdleAmbient           = dynamic(() => import('./IdleAmbient'),                 { ssr: false })
const SectionTransitionBeam = dynamic(() => import('./SectionTransitionBeam'),       { ssr: false })
const ExplainOverlay        = dynamic(() => import('../ai/ExplainOverlay'),           { ssr: false })
const ComfortAutopilot      = dynamic(() => import('../ai/ComfortAutopilot'),         { ssr: false })
const ReadingPaceDetector   = dynamic(() => import('../ai/ReadingPaceDetector'),      { ssr: false })

export default function EffectsLayer() {
  useGlassPhobic()
  useInertialHover()

  return (
    <>
      {/* Background layers (low z-index) */}
      <SilkWeave />
      <GoldWave />
      <GoldDust />

      {/* Ambient behavior */}
      <DepthBreathing />
      <IdleAmbient />
      <FocusNarrow />
      <SectionTransitionBeam />

      {/* Foreground / UX */}
      <SilkCursor />
      <MicroPulse />
      <IntentHints />

      {/* AI / Adaptive UX */}
      <ExplainOverlay />
      <ComfortAutopilot />
      <ReadingPaceDetector />
    </>
  )
}

