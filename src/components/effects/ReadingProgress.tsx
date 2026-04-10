'use client'
import { useEffect, useState, useRef } from 'react'

// Reading time estimator - Calculates estimated reading time based on content
// Displays progress as user reads through the page

const WORDS_PER_MINUTE = 200 // Average reading speed
const SECTIONS_TO_ANALYZE = ['hero', 'about', 'work', 'insights', 'speaking', 'training', 'talks', 'contact']

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    let hasCalculatedReadingTime = false

    // Track scroll progress with RAF for smoothness
    const updateProgress = () => {
      if (!hasCalculatedReadingTime) {
        let totalWords = 0
        SECTIONS_TO_ANALYZE.forEach(id => {
          const section = document.getElementById(id)
          if (!section) return

          const text = section.innerText || ''
          const words = text.trim().split(/\s+/).filter(Boolean).length
          totalWords += words
        })
        hasCalculatedReadingTime = true
        setReadingTime(Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE)))
      }

      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progressValue = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0
      
      setProgress(progressValue)
      setVisible(scrolled > 100) // Show after scrolling past hero

      rafRef.current = requestAnimationFrame(updateProgress)
    }

    rafRef.current = requestAnimationFrame(updateProgress)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-label={`Reading progress: ${Math.round(progress)}%`}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '28px',
        zIndex: 240,
        background: 'rgba(10,10,10,0.92)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-full)',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'opacity 0.3s, transform 0.3s',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
      }}
    >
      {/* Circular progress */}
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
        {/* Progress circle */}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeDasharray={`${2 * Math.PI * 14}`}
          strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
        />
      </svg>

      {/* Text info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-gold)',
          fontWeight: 300,
          letterSpacing: '0.05em',
        }}>
          {Math.round(progress)}%
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'var(--color-text-ghost)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {readingTime} min read
        </span>
      </div>
    </div>
  )
}
