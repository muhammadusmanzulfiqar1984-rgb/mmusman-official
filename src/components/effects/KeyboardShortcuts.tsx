'use client'
import { useEffect, useState } from 'react'

// Keyboard shortcuts overlay - Press '?' to show available shortcuts
// Features: smooth scrolling, accessibility, custom actions

const SHORTCUTS = [
  { key: 'h', label: 'Home/Hero', action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) },
  { key: 'a', label: 'About', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) },
  { key: 'w', label: 'Work', action: () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) },
  { key: 'c', label: 'Contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) },
  { key: 't', label: 'Top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  { key: 'b', label: 'Bottom', action: () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }) },
]

export default function KeyboardShortcuts() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle help overlay with '?'
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setVisible(v => !v)
        return
      }

      // Close overlay with Escape
      if (e.key === 'Escape') {
        setVisible(false)
        return
      }

      // Don't trigger shortcuts if user is typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Execute shortcuts
      const shortcut = SHORTCUTS.find(s => s.key === e.key.toLowerCase())
      if (shortcut && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        shortcut.action()
        setVisible(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts (?)"
        style={{
          position: 'fixed',
          bottom: '32px',
          left: '28px',
          zIndex: 250,
          width: '32px',
          height: '32px',
          background: 'rgba(10,10,10,0.92)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: 'var(--color-text-ghost)',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--color-gold-dim)'
          e.currentTarget.style.color = 'var(--color-gold)'
          e.currentTarget.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.color = 'var(--color-text-ghost)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        ?
      </button>
    )
  }

  return (
    <div
      role="dialog"
      aria-label="Keyboard shortcuts"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 500,
        background: 'rgba(10,10,10,0.97)',
        border: '1px solid var(--color-gold-dim)',
        borderRadius: 'var(--radius-md)',
        padding: '32px',
        maxWidth: '420px',
        width: 'calc(100vw - 48px)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 1px var(--color-gold-dim)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          fontWeight: 300,
        }}>
          Keyboard Shortcuts
        </h2>
        <button
          onClick={() => setVisible(false)}
          aria-label="Close"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-ghost)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-ghost)'}
        >
          ×
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {SHORTCUTS.map(({ key, label }) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              fontWeight: 300,
            }}>
              {label}
            </span>
            <kbd style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              padding: '4px 10px',
              background: 'rgba(232,184,75,0.1)',
              border: '1px solid var(--color-gold-dim)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-gold)',
              fontWeight: 300,
            }}>
              {key}
            </kbd>
          </div>
        ))}
      </div>

      <p style={{
        marginTop: '20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--color-text-dim)',
        textAlign: 'center',
        letterSpacing: '0.05em',
      }}>
        Press <kbd style={{
          padding: '2px 6px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '3px',
          color: 'var(--color-text-ghost)',
        }}>?</kbd> or <kbd style={{
          padding: '2px 6px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '3px',
          color: 'var(--color-text-ghost)',
        }}>ESC</kbd> to close
      </p>

      {/* Backdrop */}
      <div
        onClick={() => setVisible(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'rgba(0,0,0,0.5)',
        }}
      />
    </div>
  )
}
