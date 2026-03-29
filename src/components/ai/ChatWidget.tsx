'use client'
import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// History format the API expects (Gemini roles)
interface HistoryTurn {
  role: 'user' | 'model'
  text: string
}

const WELCOME = "Hi! Ask me anything about Mian's work, speaking topics, experience, or how to get in touch."

const QUICK_REPLIES = [
  'Who is Mian?',
  'Speaking topics',
  'How to contact?',
  'Advisory services',
]

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME }
  ])
  const [history, setHistory] = useState<HistoryTurn[]>([])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const clearChat = useCallback(() => {
    setMessages([{ role: 'assistant', content: WELCOME }])
    setHistory([])
    setInput('')
  }, [])

  const send = async (text: string) => {
    const msg = text.trim()
    if (!msg || loading) return
    setInput('')

    // Append user bubble immediately
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    // Add streaming assistant placeholder
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      })

      if (!res.ok || !res.body) {
        // Non-streaming error response
        const err = await res.json().catch(() => ({ error: 'Something went wrong.' }))
        setMessages(prev => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: err.error ?? 'Something went wrong.' }
          return next
        })
        return
      }

      // Stream tokens into the last (placeholder) bubble
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullReply = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        fullReply += chunk
        setMessages(prev => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: fullReply }
          return next
        })
      }

      // Store completed turn in history for next request
      setHistory(prev => [
        ...prev,
        { role: 'user', text: msg },
        { role: 'model', text: fullReply },
      ])
    } catch {
      setMessages(prev => {
        const next = [...prev]
        next[next.length - 1] = { role: 'assistant', content: 'Service temporarily unavailable.' }
        return next
      })
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
              background: loading ? 'var(--color-gold)' : 'var(--color-gold)',
              boxShadow: loading ? '0 0 12px var(--color-gold)' : '0 0 8px var(--color-gold)',
              transition: 'box-shadow 0.3s ease',
              animation: loading ? 'pulse 1.2s ease-in-out infinite' : 'none',
            }} aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', color: 'var(--color-gold)', flex: 1 }}>
              {loading ? 'Gemini is writing…' : 'Ask about Mian'}
            </span>
            {messages.length > 1 && (
              <button
                onClick={clearChat}
                aria-label="Clear conversation"
                title="Clear conversation"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  padding: '2px 6px',
                }}
              >
                clear
              </button>
            )}
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
            {loading && messages[messages.length - 1]?.content === '' && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.7 }}>
                ▍
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
