import { NextResponse } from 'next/server'

// Premade voice (free-plan compatible) — "Roger" (resonant executive tone)
const VOICE_ID = 'CwhRBWXzGAHq8TQ4Fs17'
const API_KEY = process.env.ELEVENLABS_API_KEY

const INTRO_TEXT =
  'Identity Verified. You are accessing the Restricted Mandate of Muhammad Usman. This briefing - addressing the Strait of Hormuz Boomerang and the architecture of the Arabian Sea Bridge - is provided for the Academy\'s eyes only. Access remains active for forty-eight hours. Proceed... with the Gaze of a Principal.'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      { error: { code: 'ELEVENLABS_KEY_MISSING', message: 'ELEVENLABS_API_KEY is not configured.' } },
      { status: 500 }
    )
  }

  try {
    let res: Response | null = null
    for (let attempt = 0; attempt < 3; attempt++) {
      res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
          },
          body: JSON.stringify({
            text: INTRO_TEXT,
            model_id: 'eleven_v3',
            voice_settings: { stability: 0.72, similarity_boost: 0.85, style: 0, use_speaker_boost: true },
          }),
        }
      )

      if (res.ok) break
      const retryable = res.status === 429 || res.status >= 500
      if (retryable && attempt < 2) {
        await sleep(300 * (attempt + 1))
        continue
      }

      const details = await res.text()
      return NextResponse.json(
        {
          error: {
            code: 'ELEVENLABS_UPSTREAM_ERROR',
            message: 'Failed to synthesize speech from ElevenLabs.',
            details,
          },
        },
        { status: res.status }
      )
    }

    if (!res || !res.ok) {
      return NextResponse.json(
        { error: { code: 'ELEVENLABS_UNAVAILABLE', message: 'Unable to reach ElevenLabs.' } },
        { status: 503 }
      )
    }

    const buffer = await res.arrayBuffer()
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type':  'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (e) {
    return NextResponse.json(
      {
        error: {
          code: 'ELEVENLABS_REQUEST_FAILED',
          message: 'Speech request failed.',
          details: String(e),
        },
      },
      { status: 500 }
    )
  }
}
