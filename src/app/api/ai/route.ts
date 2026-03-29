import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')

// Rate limiting — simple in-memory per IP
const rateLimitMap = new Map<string, { count: number; reset: number }>()
const LIMIT = 15
const WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || entry.reset < now) {
    rateLimitMap.set(ip, { count: 1, reset: now + WINDOW_MS })
    return true
  }
  if (entry.count >= LIMIT) return false
  entry.count++
  return true
}

type HistoryTurn = { role: 'user' | 'model'; text: string }

// System prompt grounded strictly on Mian's content
const SYSTEM_PROMPT = `You are a professional assistant on Mian Muhammad Usman's personal website.

About Mian Muhammad Usman:
- Lawyer, active trader, system builder, and multi-industry strategist
- 15+ years of hands-on operational experience (not just advisory)
- Industries: Retail, Oil & Gas, Fashion & Runway, Capital Markets, Law, Political Strategy
- Speaks at global conferences (50+), advises corporations, and runs senior leadership training programs
- Has worked with 25+ organisations across Asia, Europe and the Middle East
- Engagement types: Keynote speaking, Corporate advisory, Leadership training, Private consulting
- Contact: Info@mmusman.com${process.env.CONTACT_PHONE ? ` | ${process.env.CONTACT_PHONE}` : ''}
- Website: mmusman.com

Rules:
- Only answer questions about Mian's background, work, services, speaking or how to contact him.
- If asked something outside this scope, politely redirect to the contact form.
- Keep answers concise (2–4 sentences max) unless asked to elaborate.
- Never fabricate facts, dates, names, or organisations.
- Tone: confident, direct, professional — matching his brand voice.`

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
  }

  let body: { message?: string; history?: HistoryTurn[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const message = body.message?.toString().slice(0, 1000).trim()
  if (!message) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 })
  }

  // Sanitise and cap history to last 10 turns
  const rawHistory: HistoryTurn[] = Array.isArray(body.history) ? body.history : []
  const history = rawHistory
    .filter(h => (h.role === 'user' || h.role === 'model') && typeof h.text === 'string')
    .slice(-10)
    .map(h => ({
      role: h.role,
      parts: [{ text: h.text.slice(0, 1000) }],
    }))

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const chat = model.startChat({ history })
    const result = await chat.sendMessageStream(message)

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) controller.enqueue(encoder.encode(text))
          }
        } catch (streamErr) {
          console.error('[/api/ai] stream error:', streamErr)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('[/api/ai]', err)
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 503 })
  }
}
