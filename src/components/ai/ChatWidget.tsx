'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_REPLIES = [
  'Who is Mian?',
  'Speaking topics',
  'How to contact?',
  'Advisory services',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! Ask me anything about Mian's work, speaking topics, experience, or how to get in touch." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (text: string) => {
    const msg = text.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply ?? data.error ?? 'Something went wrong.',
      }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Service temporarily unavailable.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
        aria-controls="chat-panel"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 300,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--color-gold)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-gold-strong)',
          fontSize: '1.2rem',
          transition: 'transform var(--duration-base) var(--ease-spring)',
          transform: open ? 'rotate(45deg)' : 'none',
        }}
      >
        {open ? '✕' : '✦'}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label="AI assistant"
          aria-modal="false"
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '28px',
            width: '340px',
            maxHeight: '480px',
            zIndex: 299,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--color-gold-dim)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-gold-strong)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            padding: 'var(--space-4) var(--space-5)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--color-gold)',
              boxShadow: '0 0 8px var(--color-gold)',
            }} aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', color: 'var(--color-gold)' }}>
              Ask about Mian
            </span>
          </div>

          {/* Messages */}
          <div
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.role === 'user' ? 'var(--color-gold)' : 'rgba(255,255,255,0.04)',
                  color: m.role === 'user' ? '#0a0a0a' : 'var(--color-text-muted)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  fontWeight: m.role === 'user' ? 500 : 300,
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                thinking…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {messages.length === 1 && (
            <div style={{ padding: '0 var(--space-5) var(--space-3)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {QUICK_REPLIES.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  style={{
                    background: 'var(--color-gold-glow)',
                    border: '1px solid var(--color-gold-dim)',
                    color: 'var(--color-gold)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.08em',
                    padding: '5px 10px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: 'var(--space-3) var(--space-4)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            gap: 'var(--space-3)',
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Ask anything…"
              aria-label="Message input"
              maxLength={500}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 300,
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                background: input.trim() ? 'var(--color-gold)' : 'transparent',
                border: '1px solid var(--color-gold-dim)',
                color: input.trim() ? '#0a0a0a' : 'var(--color-gold-dim)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'all var(--duration-fast) var(--ease-out)',
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
