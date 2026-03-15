import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')

// Rate limiting — simple in-memory per IP
const rateLimitMap = new Map<string, { count: number; reset: number }>()
const LIMIT = 10
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

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: { message?: string; context?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const message = body.message?.toString().slice(0, 1000).trim()
  if (!message) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 })
  }

  // System prompt grounded strictly on Mian's content
  const systemPrompt = `You are an assistant for Mian Muhammad Usman's personal website.
Mian Muhammad Usman is a lawyer, trader, system builder, and multi-industry strategist.
He has 15+ years of hands-on experience across retail, oil & gas, fashion/runway, capital markets, law, and political strategy.
He speaks at conferences, advises corporations, and runs tailored leadership training programs.
Contact: Info@mmusman.com | +44 7830 755932

Answer questions only based on the above. If asked something outside this scope, politely redirect to the contact form.
Be concise, confident, and professional — matching his brand voice.`

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt,
    })
    const result = await model.generateContent(message)
    const reply = result.response.text()
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('[/api/ai]', err)
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 503 })
  }
}
