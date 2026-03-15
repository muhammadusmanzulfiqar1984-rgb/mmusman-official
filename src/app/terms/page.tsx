import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Mian Muhammad Usman',
}

export default function TermsPage() {
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
        Terms of Service
      </h1>

      <p style={{ marginBottom: '16px', fontSize: '0.8rem', color: 'var(--color-text-ghost)' }}>Last updated: March 2026</p>

      <Section title="Use of this site">
        This website is provided for informational purposes only. The content represents the professional background and services of Mian Muhammad Usman. You may not reproduce, republish, or distribute any content without prior written permission.
      </Section>

      <Section title="No professional advice">
        Nothing on this site constitutes legal, financial, or professional advice. Any engagement with Mian Muhammad Usman is subject to a separate written agreement.
      </Section>

      <Section title="Intellectual property">
        All content, design, and copy on this site is the intellectual property of Mian Muhammad Usman. All rights reserved.
      </Section>

      <Section title="Limitation of liability">
        This site is provided "as is" without warranties of any kind. We accept no liability for any loss or damage arising from your use of this site.
      </Section>

      <Section title="Contact">
        For any enquiries regarding these terms: <a href="mailto:Info@mmusman.com" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Info@mmusman.com</a>
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
