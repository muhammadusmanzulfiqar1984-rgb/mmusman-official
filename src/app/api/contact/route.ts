import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const MAX_NAME    = 100
const MAX_EMAIL   = 254
const MAX_MESSAGE = 3000

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { name, email, type, message, _hp } = body as Record<string, unknown>

  // Honeypot — discard silently (spam bot)
  if (_hp) return NextResponse.json({ ok: true })

  const nameStr    = typeof name    === 'string' ? name.trim()    : ''
  const emailStr   = typeof email   === 'string' ? email.trim()   : ''
  const typeStr    = typeof type    === 'string' ? type.trim()    : ''
  const messageStr = typeof message === 'string' ? message.trim() : ''

  if (!nameStr || nameStr.length > MAX_NAME) {
    return NextResponse.json({ error: 'Name is required (max 100 chars)' }, { status: 422 })
  }
  if (!emailStr || !isValidEmail(emailStr) || emailStr.length > MAX_EMAIL) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 422 })
  }
  if (!messageStr || messageStr.length > MAX_MESSAGE) {
    return NextResponse.json({ error: 'Message is required (max 3000 chars)' }, { status: 422 })
  }

  // Log to server console / Vercel logs
  console.log('[contact]', JSON.stringify({
    name: nameStr,
    email: emailStr,
    type: typeStr || '—',
    message: messageStr,
    ts: new Date().toISOString(),
  }))

  // Send email via Resend (active when RESEND_API_KEY is set)
  if (resend) {
    try {
      await resend.emails.send({
        from: 'contact@mmusman.com',
        to: 'Info@mmusman.com',
        replyTo: emailStr,
        subject: `Contact from ${nameStr}${typeStr ? ` — ${typeStr}` : ''}`,
        text: `Name: ${nameStr}\nEmail: ${emailStr}\nEngagement: ${typeStr || '—'}\n\n${messageStr}`,
      })
    } catch (emailErr) {
      // Email failure should not block the user — log and continue
      console.error('[contact] email send failed:', emailErr)
    }
  }

  return NextResponse.json({ ok: true })
}
