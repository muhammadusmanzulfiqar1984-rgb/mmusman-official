import Link from 'next/link'

const descriptions: Record<string, string> = {
  logistics:
    'Global route architecture, freight discipline, and distribution command references.',
  fmcg:
    'Retail channel strategy, product-market fit notes, and category acceleration decks.',
  energy:
    'Operational intelligence briefs, field templates, and deployment blueprints.',
}

const labels: Record<string, string> = {
  logistics: 'Logistics',
  fmcg: 'FMCG',
  energy: 'Energy',
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const key = slug.toLowerCase()
  const title = labels[key] || 'Collection'
  const description = descriptions[key] || 'Collection module.'

  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{
        background:
          'radial-gradient(circle at 18% 18%, rgba(166,136,88,0.2), transparent 42%), radial-gradient(circle at 84% 76%, rgba(148,118,72,0.14), transparent 38%), linear-gradient(180deg, #120d0a 0%, #0d0a08 55%, #080605 100%)',
      }}
    >
      <section
        className="mx-auto w-full max-w-4xl"
        style={{
          border: '1px solid rgba(166,136,88,0.28)',
          borderRadius: '22px',
          background: 'linear-gradient(165deg, rgba(22,18,14,0.92), rgba(14,11,9,0.88))',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(210,184,131,0.08)',
          padding: 'clamp(24px, 4vw, 46px)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-dim)',
            marginBottom: 'var(--space-3)',
          }}
        >
          La Vivid Work
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: '1.03',
            fontWeight: 300,
            color: 'rgba(232,220,196,0.95)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.95rem',
            lineHeight: '1.78',
            maxWidth: '58ch',
            marginBottom: 'var(--space-8)',
          }}
        >
          {description}
        </p>

        <Link
          href="/la-vinda/platform"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            border: '1px solid rgba(166,136,88,0.34)',
            borderRadius: '999px',
            padding: '8px 14px',
            color: 'var(--color-gold)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Back To Archive
        </Link>
      </section>
    </main>
  )
}
