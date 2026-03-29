'use client'
import dynamic from 'next/dynamic'

const DevOverlay = dynamic(() => import('./DevOverlay'), { ssr: false })

export default function DevOverlayLoader() {
  if (process.env.NODE_ENV !== 'development') return null
  return <DevOverlay />
}
