'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const TRACKS = [
  { src: '/Morning_in_the_Tuileries.min.mp3', label: 'Morning in the Tuileries' },
  { src: '/A_Measure_of_State.min.mp3',       label: 'A Measure of State' },
]

export default function AmbientPlayer() {
  const audioRef   = useRef<HTMLAudioElement | null>(null)
  const fadeRef    = useRef<number | null>(null)
  const autoplayRetryRef = useRef<number | null>(null)
  const [playing,  setPlaying]  = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [trackIdx, setTrackIdx] = useState(0)
  const [vol,      setVol]      = useState(0.5)
  const [label,    setLabel]    = useState(TRACKS[0].label)

  // Show player after 4 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true)
    }, 4000)

    return () => {
      clearTimeout(t)
    }
  }, [])

  // Init audio element once and attempt immediate autoplay
  useEffect(() => {
    const audio = new Audio(TRACKS[trackIdx].src)
    audio.loop   = true
    audio.volume = 0
    audio.muted = true
    audioRef.current = audio

    // Attempt immediate autoplay
    audio.play().then(() => {
      setPlaying(true)
      setTimeout(() => {
        if (!audioRef.current) return
        audioRef.current.muted = false
        fadeTo(vol, 4000)
      }, 120)
    }).catch(() => { /* autoplay blocked — first-interaction handler will retry */ })

    return () => {
      audio.pause()
      audio.src = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fade helpers
  const fadeTo = useCallback((target: number, duration = 1200) => {
    if (!audioRef.current) return
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current)
    const audio = audioRef.current
    const start = audio.volume
    const t0    = performance.now()
    const step  = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      audio.volume = start + (target - start) * p
      if (p < 1) fadeRef.current = requestAnimationFrame(step)
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const play = useCallback(async () => {
    if (!audioRef.current) return
    try {
      audioRef.current.muted = true
      await audioRef.current.play()
      setPlaying(true)
      setTimeout(() => {
        if (!audioRef.current) return
        audioRef.current.muted = false
        fadeTo(vol, 4000)
      }, 120)
    } catch { /* autoplay blocked */ }
  }, [fadeTo, vol])

  const tryAutoStart = useCallback(async () => {
    if (!audioRef.current) return false
    try {
      audioRef.current.muted = true
      await audioRef.current.play()
      setPlaying(true)
      setTimeout(() => {
        if (!audioRef.current) return
        audioRef.current.muted = false
        fadeTo(vol, 4000)
      }, 120)
      return true
    } catch {
      return false
    }
  }, [fadeTo, vol])

  const pause = useCallback(() => {
    if (!audioRef.current) return
    fadeTo(0, 800)
    setTimeout(() => { audioRef.current?.pause(); setPlaying(false) }, 850)
  }, [fadeTo])

  const toggle = useCallback(() => {
    playing ? pause() : play()
  }, [playing, pause, play])

  // Switch track
  const switchTrack = useCallback((idx: number) => {
    if (!audioRef.current) return
    const wasPlaying = playing
    fadeTo(0, 400)
    setTimeout(() => {
      if (!audioRef.current) return
      audioRef.current.pause()
      audioRef.current.src    = TRACKS[idx].src
      audioRef.current.load()
      setTrackIdx(idx)
      setLabel(TRACKS[idx].label)
      if (wasPlaying) {
        audioRef.current.play().then(() => fadeTo(vol)).catch(() => {})
      }
    }, 420)
  }, [playing, fadeTo, vol])

  // Sync volume knob → audio
  useEffect(() => {
    if (audioRef.current && playing) {
      fadeTo(vol, 300)
    }
  }, [vol, playing, fadeTo])

  // Auto-play retries and first interaction fallback
  useEffect(() => {
    const tryAutoPlay = () => {
      if (playing) return
      void tryAutoStart()
    }

    // Keep retrying; clear once playback succeeds.
    if (!autoplayRetryRef.current) {
      autoplayRetryRef.current = window.setInterval(() => {
        if (playing) {
          if (autoplayRetryRef.current) {
            clearInterval(autoplayRetryRef.current)
            autoplayRetryRef.current = null
          }
          return
        }
        void tryAutoStart()
      }, 1200)
    }

    window.addEventListener('click',        tryAutoPlay)
    window.addEventListener('pointerdown',  tryAutoPlay)
    window.addEventListener('pointermove',  tryAutoPlay)
    window.addEventListener('wheel',        tryAutoPlay)
    window.addEventListener('scroll',       tryAutoPlay)
    window.addEventListener('keydown',      tryAutoPlay)
    window.addEventListener('touchstart',   tryAutoPlay)
    window.addEventListener('visibilitychange', tryAutoPlay)
    window.addEventListener('pageshow',     tryAutoPlay)
    return () => {
      if (autoplayRetryRef.current) {
        clearInterval(autoplayRetryRef.current)
        autoplayRetryRef.current = null
      }
      window.removeEventListener('click',        tryAutoPlay)
      window.removeEventListener('pointerdown',  tryAutoPlay)
      window.removeEventListener('pointermove',  tryAutoPlay)
      window.removeEventListener('wheel',        tryAutoPlay)
      window.removeEventListener('scroll',       tryAutoPlay)
      window.removeEventListener('keydown',      tryAutoPlay)
      window.removeEventListener('touchstart',   tryAutoPlay)
      window.removeEventListener('visibilitychange', tryAutoPlay)
      window.removeEventListener('pageshow',     tryAutoPlay)
    }
  }, [playing, tryAutoStart])

  // Pause when tab hidden
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && playing) pause()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [playing, pause])

  if (!visible) return null

  return (
    <div
      style={{
        position:       'fixed',
        bottom:         '24px',
        left:           '24px',
        zIndex:         900,
        display:        'flex',
        alignItems:     'center',
        gap:            '10px',
        background:     'rgba(10,7,4,0.82)',
        border:         '1px solid rgba(200,160,96,0.25)',
        borderRadius:   '40px',
        padding:        '8px 16px 8px 10px',
        backdropFilter: 'blur(12px)',
        boxShadow:      '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,160,96,0.08)',
        transition:     'opacity 0.4s',
        opacity:        visible ? 1 : 0,
      }}
      aria-label="Ambient music player"
    >
      {/* Play / Pause */}
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause ambient music' : 'Play ambient music'}
        style={{
          width:        '32px',
          height:       '32px',
          borderRadius: '50%',
          border:       '1px solid rgba(200,160,96,0.4)',
          background:   playing ? 'rgba(200,160,96,0.15)' : 'transparent',
          color:        '#c8a060',
          cursor:       'pointer',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          fontSize:     '12px',
          transition:   'background 0.2s, border-color 0.2s',
          flexShrink:   0,
        }}
      >
        {playing ? '⏸' : '▶'}
      </button>

      {/* Track label + switcher */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
        <span style={{
          fontSize:     '9px',
          letterSpacing: '0.12em',
          color:        'rgba(200,160,96,0.5)',
          textTransform: 'uppercase',
          lineHeight:   1,
        }}>
          {playing ? '♩ NOW PLAYING' : 'AMBIENT'}
        </span>
        <span style={{
          fontSize:   '11px',
          color:      '#e8d0a8',
          whiteSpace: 'nowrap',
          overflow:   'hidden',
          textOverflow: 'ellipsis',
          maxWidth:   '140px',
          lineHeight: 1.2,
        }}>
          {label}
        </span>
      </div>

      {/* Track switcher dots */}
      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
        {TRACKS.map((t, i) => (
          <button
            key={t.src}
            onClick={() => switchTrack(i)}
            aria-label={`Play ${t.label}`}
            title={t.label}
            style={{
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              border:       'none',
              background:   i === trackIdx ? '#c8a060' : 'rgba(200,160,96,0.25)',
              cursor:       'pointer',
              padding:      0,
              transition:   'background 0.2s',
            }}
          />
        ))}
      </div>

      {/* Volume slider */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={vol}
        onChange={e => setVol(parseFloat(e.target.value))}
        aria-label="Volume"
        style={{
          width:       '56px',
          accentColor: '#c8a060',
          cursor:      'pointer',
          flexShrink:  0,
        }}
      />
    </div>
  )
}
