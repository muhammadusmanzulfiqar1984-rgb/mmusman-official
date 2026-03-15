'use client'
import { useEffect, useRef, useMemo } from 'react'

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

interface Props {
  text: string
  tag?: Tag
  className?: string
  style?: React.CSSProperties
  /** Delay between words in ms (default 42) */
  staggerMs?: number
}

// Splits text into words, each hidden initially.
// On intersection, staggers opacity + translateY reveal.
// Falls back to instant visibility under prefers-reduced-motion.

export default function TextRevealOnScroll({
  text,
  tag = 'p',
  className,
  style,
  staggerMs = 42,
}: Props) {
  const containerRef = useRef<HTMLElement>(null)
  const revealed     = useRef(false)
  const words        = useMemo(() => text.split(' '), [text])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-word]'))

    // Reduced motion: make all words visible immediately, no animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spans.forEach(s => {
        s.style.opacity   = '1'
        s.style.transform = 'none'
      })
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting || revealed.current) return
        revealed.current = true
        observer.disconnect()
        spans.forEach((s, i) => {
          setTimeout(() => {
            s.style.opacity   = '1'
            s.style.transform = 'translateY(0)'
          }, i * staggerMs)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [staggerMs])

  const Tag = tag as React.ElementType

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLElement>}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <span
          key={i}
          data-word=""
          style={{
            display:    'inline-block',
            opacity:    0,
            transform:  'translateY(9px)',
            transition: `opacity 0.58s var(--ease-out, cubic-bezier(0.22,1,0.36,1)),
                         transform 0.58s var(--ease-out, cubic-bezier(0.22,1,0.36,1))`,
          }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
