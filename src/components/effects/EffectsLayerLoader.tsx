'use client'
import dynamic from 'next/dynamic'

const EffectsLayer = dynamic(() => import('./EffectsLayer'), { ssr: false })

export default function EffectsLayerLoader() {
  return <EffectsLayer />
}
