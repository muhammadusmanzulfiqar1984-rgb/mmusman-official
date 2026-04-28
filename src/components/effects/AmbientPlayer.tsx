'use client'

import { useEffect, useRef, useCallback } from 'react'

const TRACKS = [
  '/Morning_in_the_Tuileries.min.mp3',
  '/A_Measure_of_State.min.mp3',
]

export default function AmbientPlayer() {
  const audioRef   = useRef<HTMLAudioElement | null>(null)
  const fadeRef    = useRef<number | null>(null)
  const retryRef   = useRef<number | null>(null)
  const startedRef = useRef(false)

  const fadeTo = useCallback((audio: HTMLAudioElement, target: number, duration = 3000) => {
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current)
    const start = audio.volume
    const t0    = performance.now()
    const step  = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      audio.volume = start + (target - start) * p
      if (p < 1) fadeRef.current = requestAnimationFrame(step)
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const startMusic = useCallback(async () => {
    if (startedRef.current) return
    const audio = audioRef.current
    if (!audio) return
    try {
      audio.muted  = true
      audio.volume = 0
      await audio.play()
      startedRef.current = true
      if (retryRef.current) { clearInterval(retryRef.current); retryRef.current = null }
      setTimeout(() => {
        if (!audioRef.current) return
        audioRef.current.muted = false
        fadeTo(audioRef.current, 0.5, 3000)
      }, 200)
    } catch { /* blocked — retry loop handles */ }
  }, [fadeTo])

  useEffect(() => {
    const audio = new Audio(TRACKS[0])
    audio.loop   = true
    audio.volume = 0
    audio.muted  = true
    audioRef.current = audio
    void startMusic()
    retryRef.current = window.setInterval(() => { void startMusic() }, 800)
    return () => {
      if (retryRef.current) clearInterval(retryRef.current)
      audio.pause()
      audio.src = ''
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onGesture = () => { void startMusic() }
    const events = ['click','pointerdown','keydown','scroll','touchstart']
    events.forEach(e => window.addEventListener(e, onGesture, { passive: true }))
    return () => events.forEach(e => window.removeEventListener(e, onGesture))
  }, [startMusic])

  useEffect(() => {
    const onBriefingOpened = () => {
      audioRef.current?.pause()
      startedRef.current = false
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'mmusman:briefing-closed') {
        startedRef.current = false
        void startMusic()
      }
      if (e.key === 'mmusman:briefing-open-heartbeat') {
        const last = Number(e.newValue ?? '0')
        if (last > 0 && Date.now() - last < 15000) {
          audioRef.current?.pause()
          startedRef.current = false
        }
      }
    }
    window.addEventListener('briefing-opened', onBriefingOpened)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('briefing-opened', onBriefingOpened)
      window.removeEventListener('storage', onStorage)
    }
  }, [startMusic])

  return null
}
