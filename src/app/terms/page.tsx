import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service — Mian Muhammad Usman',
  description: 'Terms governing use of mmusman.eu, including site content, enquiries, intellectual property, and limitations of liability.',
}

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Service"
      summary="These terms govern use of this website, its content, and the contact routes made available through it. Using the site means you accept the boundaries set out below."
      updated="March 30, 2026"
      relatedLinks={[
        { href: '/privacy', label: 'Privacy policy' },
        { href: '/#contact', label: 'Start a conversation' },
      ]}
      sections={[
        {
          title: 'Use of the site',
          body: (
            <p>
              This website is provided for informational and business development purposes. It presents the professional
              profile, background, perspectives, and service areas of Mian Muhammad Usman. You may browse and reference
              the site for legitimate personal or commercial review, but you may not misuse the site, interfere with its
              operation, or attempt to access protected systems or data.
            </p>
          ),
        },
        {
          title: 'No professional advice or engagement',
          body: (
            <p>
              Nothing on this website constitutes legal, financial, investment, or other regulated professional advice.
              Viewing the site or sending an enquiry does not create a client, advisory, fiduciary, or professional
              relationship. Any formal engagement requires a separate written agreement.
            </p>
          ),
        },
        {
          title: 'Content and intellectual property',
          body: (
            <p>
              All copy, design, branding elements, visual assets, and original materials on this site remain the property
              of Mian Muhammad Usman or the relevant rights holder unless stated otherwise. You may not reproduce,
              republish, distribute, adapt, or commercially exploit site content without prior written permission.
            </p>
          ),
        },
        {
          title: 'Third-party services and links',
          body: (
            <p>
              This site may rely on third-party infrastructure or link to external services, including contact and AI
              tooling. Those services operate under their own terms and privacy practices. External links are provided for
              convenience and do not imply endorsement of third-party content or availability.
            </p>
          ),
        },
        {
          title: 'Availability and liability',
          body: (
            <p>
              The site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without warranties of any kind.
              To the fullest extent permitted by law, liability is excluded for loss, damage, interruption, inaccuracy,
              or reliance arising from use of the site or inability to use it.
            </p>
          ),
        },
        {
          title: 'Questions regarding these terms',
          body: (
            <p>
              For enquiries regarding these terms, contact{' '}
              <Link href="mailto:info@mmusman.eu" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>
                info@mmusman.eu
              </Link>
              . Continued use of the site after updates to these terms constitutes acceptance of the revised version.
            </p>
          ),
        },
      ]}
    />
  )
}
