import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Mian Muhammad Usman',
}

export default function PrivacyPage() {
  return (
    <main style={{
      maxWidth: '720px',
      margin: '0 auto',
      padding: '120px 32px 80px',
      fontFamily: 'var(--font-body)',
      color: 'var(--color-text-muted)',
      fontWeight: 300,
      lineHeight: 1.8,
    }}>
      <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--color-gold)', textDecoration: 'none', textTransform: 'uppercase' }}>
        ← Back
      </Link>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-text-primary)', marginTop: '40px', marginBottom: '32px', fontStyle: 'italic' }}>
        Privacy Policy
      </h1>

      <p style={{ marginBottom: '16px', fontSize: '0.8rem', color: 'var(--color-text-ghost)' }}>Last updated: March 2026</p>

      <Section title="Information we collect">
        When you use the contact form on this site, we collect the name, email address, and message you voluntarily provide. We do not collect any information automatically beyond standard server logs.
      </Section>

      <Section title="How we use your information">
        Information submitted via the contact form is used solely to respond to your enquiry. We do not sell, share, or distribute your personal data to third parties.
      </Section>

      <Section title="Cookies">
        This site uses no tracking cookies. Anonymous analytics may be collected via Vercel Analytics, which does not use cookies and is privacy-first by design.
      </Section>

      <Section title="Data retention">
        Contact form submissions are retained only as long as necessary to respond to your enquiry. You may request deletion at any time by emailing Info@mmusman.com.
      </Section>

      <Section title="Contact">
        For any privacy-related enquiries, contact: <a href="mailto:Info@mmusman.com" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Info@mmusman.com</a>
      </Section>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>{title}</h2>
      <p style={{ fontSize: '0.9rem' }}>{children}</p>
    </div>
  )
}
