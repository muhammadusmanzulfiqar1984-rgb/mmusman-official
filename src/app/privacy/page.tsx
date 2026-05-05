import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — Mian Muhammad Usman',
  description: 'Privacy policy for mmusman.com covering contact submissions, local analytics, AI assistant usage, and data handling.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      summary="This site is designed to be direct, low-noise, and privacy-conscious. The only information collected is what a visitor actively submits or explicitly allows for local-only experience features."
      updated="March 30, 2026"
      relatedLinks={[
        { href: '/terms', label: 'Terms of service' },
        { href: '/#contact', label: 'Contact' },
      ]}
      sections={[
        {
          title: 'Information provided by you',
          body: (
            <p>
              When you use the contact form or signal list form, this site may collect the name, email address,
              engagement type, and message you choose to provide. That information is used only to review the enquiry
              and respond directly. It is not sold, rented, or disclosed for advertising purposes.
            </p>
          ),
        },
        {
          title: 'Local analytics and on-device signals',
          body: (
            <p>
              This site includes local-only analytics and adaptive interface features. When enabled, interaction data is
              stored in your browser to improve the experience on this device. It is not transmitted to a third-party
              analytics platform by that local telemetry layer. Separate platform-level hosting logs may still exist for
              security and operational purposes.
            </p>
          ),
        },
        {
          title: 'AI assistant and voice features',
          body: (
            <p>
              Questions submitted through the AI assistant are processed to generate a response about Mian Muhammad
              Usman&apos;s background, speaking, advisory work, and contact routes. If you use microphone features, audio
              permissions are requested by your browser and controlled by you. Avoid submitting confidential or sensitive
              information through the assistant.
            </p>
          ),
        },
        {
          title: 'Cookies and storage',
          body: (
            <p>
              This site does not rely on tracking cookies for advertising. It may use browser storage such as
              localStorage or sessionStorage for consent preferences, adaptive experience settings, and local-only
              telemetry. You can clear that information from your browser at any time.
            </p>
          ),
        },
        {
          title: 'Retention and protection',
          body: (
            <p>
              Submitted messages are retained only for as long as reasonably necessary to review, respond, and maintain a
              record of legitimate business enquiries. Reasonable technical and operational measures are used to protect
              submitted information, but no internet transmission or storage system can be guaranteed as completely secure.
            </p>
          ),
        },
        {
          title: 'Your choices and contact',
          body: (
            <p>
              For privacy-related requests, including deletion enquiries, contact{' '}
              <Link href="mailto:info@mmusman.com" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>
                info@mmusman.com
              </Link>
              . If you do not agree with this policy, do not use the contact or assistant features.
            </p>
          ),
        },
      ]}
    />
  )
}
