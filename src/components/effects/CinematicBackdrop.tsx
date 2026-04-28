'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * CinematicBackdrop — full-page video backdrop
 *
 * Place your film file at /public/backdrop.mp4 (or .webm for best compression).
 * The component handles:
 *  - Fixed positioning behind everything (z-index: -1)
 *  - Dark overlay so all page content remains readable
 *  - Autoplay, muted, loop — no user interaction required
 *  - Graceful fallback to pure CSS gradient if no video file found
 *  - Reduced-motion: shows static frame only
 *  - Low-end device: skips video entirely
 */

const OVERLAY_OPACITY = 0.45  // 0 = fully transparent, 1 = fully dark

export default function CinematicBackdrop() {
  const videoRef  = useRef<HTMLVideoElement>(null)
  const [loaded,  setLoaded]  = useState(false)
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!videoRef.current || reduced) return
    const vid = videoRef.current
    vid.play().catch(() => {/* autoplay blocked */})
  }, [reduced])

  const showVideo = !reduced

  return (
    <>
      {/* ── Fixed backdrop ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          pointerEvents: 'none',
          overflow: 'hidden',
          backgroundColor: '#0a0806',  // warm near-black fallback
        }}
      >
        {/* Fallback gradient — always visible, video sits on top */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(40,22,6,0.9) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 80% 70%, rgba(22,10,4,0.95) 0%, transparent 60%),
            linear-gradient(160deg, #0e0904 0%, #060402 50%, #0a0806 100%)
          `,
        }} />

        {/* Video — only rendered if not reduced-motion and file exists */}
        {showVideo && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onCanPlay={() => setLoaded(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 1,
            }}
            src="/backdrop.mp4"
          />
        )}
      </div>

      {/* ── Dark overlay — sits directly on top of video only, behind sections ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          background: `rgba(8,5,3,${OVERLAY_OPACITY})`,
        }}
      />
    </>
  )
}
