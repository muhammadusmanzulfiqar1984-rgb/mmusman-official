'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LaVividWorkPlatformPage() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ok = window.sessionStorage.getItem('la_vivid_work_ok') === 'true'
    if (!ok) {
      router.replace('/la-vinda')
      return
    }
    setAllowed(true)
  }, [router])

  if (!allowed) {
    return null
  }

  const collections = [
    {
      id: '01',
      title: 'Textile',
      description: 'Strategy, sourcing, portfolio, and execution references.',
      cta: 'Enter Code ->',
      onClick: () => {
        window.location.href = '/la-vinda/platform/access?target=textile'
      },
      enabled: true,
    },
    {
      id: '02',
      title: 'Logistics',
      description: 'Routes, distribution architecture, and operational lanes.',
      cta: 'Enter Code ->',
      onClick: () => {
        window.location.href = '/la-vinda/platform/access?target=logistics'
      },
      enabled: true,
    },
    {
      id: '03',
      title: 'FMCG',
      description: 'Buyer channels, category motion, and pricing structures.',
      cta: 'Enter Code ->',
      onClick: () => {
        window.location.href = '/la-vinda/platform/access?target=fmcg'
      },
      enabled: true,
    },
    {
      id: '04',
      title: 'Energy',
      description: 'Field playbooks, execution dashboards, and strategic briefs.',
      cta: 'Enter Code ->',
      onClick: () => {
        window.location.href = '/la-vinda/platform/access?target=energy'
      },
      enabled: true,
    },
  ]

  return (
    <main className="lvw-page">
      <div className="lvw-backdrop" aria-hidden="true">
        <span className="lvw-orb lvw-orb-a" />
        <span className="lvw-orb lvw-orb-b" />
        <span className="lvw-orb lvw-orb-c" />
        <span className="lvw-scan" />
      </div>

      <section className="lvw-shell">
        <p className="lvw-kicker">La Vivid Work</p>
        <h1 className="lvw-title">Archive</h1>
        <p className="lvw-sub">Access granted. Choose a collection below.</p>

        <div className="lvw-grid">
          {collections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              aria-label={`Open ${collection.title}`}
              onClick={collection.onClick}
              className="lvw-card"
            >
              <div>
                <p className="lvw-card-kicker">{`Collection ${collection.id}`}</p>
                <h2 className="lvw-card-title">{collection.title}</h2>
                <p className="lvw-card-copy">{collection.description}</p>
              </div>
              <span className="lvw-card-cta">{collection.cta}</span>
            </button>
          ))}
        </div>

        <Link href="/la-vinda" className="lvw-back-link">
          Return To Gate
        </Link>
      </section>

      <style jsx>{`
        .lvw-page {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          padding: clamp(88px, 8vw, 116px) 24px;
          background:
            radial-gradient(circle at 10% 12%, rgba(172, 148, 108, 0.12), transparent 48%),
            radial-gradient(circle at 86% 80%, rgba(136, 112, 80, 0.12), transparent 44%),
            linear-gradient(180deg, #100d0b 0%, #0c0a09 52%, #070605 100%);
        }

        .lvw-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .lvw-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(42px);
          opacity: 0.34;
          animation: drift 18s ease-in-out infinite;
        }

        .lvw-orb-a {
          width: 36vw;
          height: 36vw;
          min-width: 260px;
          min-height: 260px;
          left: -8vw;
          top: -8vh;
          background: radial-gradient(circle, rgba(170, 146, 110, 0.46) 0%, rgba(170, 146, 110, 0) 68%);
        }

        .lvw-orb-b {
          width: 30vw;
          height: 30vw;
          min-width: 220px;
          min-height: 220px;
          right: -6vw;
          top: 24vh;
          background: radial-gradient(circle, rgba(132, 112, 84, 0.38) 0%, rgba(132, 112, 84, 0) 70%);
          animation-delay: -6s;
        }

        .lvw-orb-c {
          width: 34vw;
          height: 34vw;
          min-width: 240px;
          min-height: 240px;
          left: 34vw;
          bottom: -12vh;
          background: radial-gradient(circle, rgba(182, 162, 130, 0.22) 0%, rgba(182, 162, 130, 0) 72%);
          animation-delay: -10s;
        }

        .lvw-scan {
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              175deg,
              rgba(255, 255, 255, 0.02) 0 1px,
              transparent 1px 72px
            );
          opacity: 0.3;
          transform: translateY(0);
          animation: scanMove 9s linear infinite;
        }

        .lvw-shell {
          position: relative;
          z-index: 1;
          width: min(100%, 1080px);
          margin: 0 auto;
          border: 1px solid rgba(210, 198, 180, 0.1);
          border-radius: 30px;
          background: linear-gradient(165deg, rgba(22, 20, 18, 0.78), rgba(13, 12, 11, 0.74));
          box-shadow:
            0 28px 80px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 rgba(162, 138, 104, 0.12);
          padding: clamp(28px, 4.2vw, 58px);
          backdrop-filter: blur(18px) saturate(116%);
        }

        .lvw-kicker {
          margin: 0 0 8px;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(202, 186, 162, 0.68);
        }

        .lvw-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(2.15rem, 5vw, 3.55rem);
          line-height: 1.01;
          font-weight: 350;
          color: rgba(244, 240, 232, 0.95);
          letter-spacing: -0.018em;
        }

        .lvw-sub {
          margin: 12px 0 34px;
          max-width: 52ch;
          color: rgba(206, 196, 178, 0.84);
          font-size: 0.93rem;
          line-height: 1.78;
        }

        .lvw-grid {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          margin-bottom: 34px;
        }

        @media (min-width: 840px) {
          .lvw-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .lvw-card {
          text-align: left;
          border: 1px solid rgba(220, 214, 198, 0.12);
          border-radius: 22px;
          padding: 22px 22px 20px;
          min-height: 210px;
          background: linear-gradient(155deg, rgba(34, 31, 28, 0.72), rgba(21, 19, 17, 0.7));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(146, 124, 92, 0.12);
          cursor: pointer;
          transition:
            transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 260ms ease,
            box-shadow 260ms ease,
            background 260ms ease;
        }

        .lvw-card:hover {
          transform: translateY(-4px) scale(1.008);
          border-color: rgba(236, 228, 211, 0.24);
          box-shadow:
            0 22px 44px rgba(0, 0, 0, 0.42),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(176, 152, 118, 0.18);
          background: linear-gradient(155deg, rgba(42, 37, 33, 0.76), rgba(24, 21, 19, 0.72));
        }

        .lvw-card-kicker {
          margin: 0 0 10px;
          color: rgba(198, 182, 156, 0.65);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }

        .lvw-card-title {
          margin: 0 0 8px;
          color: rgba(247, 243, 235, 0.94);
          font-family: var(--font-display);
          font-size: clamp(1.86rem, 2.6vw, 2.35rem);
          font-weight: 360;
          line-height: 1.05;
          letter-spacing: -0.012em;
        }

        .lvw-card-copy {
          margin: 0;
          color: rgba(204, 195, 178, 0.83);
          font-size: 0.88rem;
          line-height: 1.68;
          max-width: 38ch;
        }

        .lvw-card-cta {
          margin-top: 16px;
          color: rgba(220, 209, 189, 0.78);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .lvw-back-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          border: 1px solid rgba(224, 216, 196, 0.16);
          border-radius: 999px;
          padding: 8px 14px;
          color: rgba(226, 216, 194, 0.82);
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
        }

        .lvw-back-link:hover {
          border-color: rgba(238, 230, 212, 0.28);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(245, 238, 227, 0.92);
        }

        @keyframes drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(18px, -16px, 0) scale(1.06);
          }
        }

        @keyframes scanMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(72px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lvw-orb,
          .lvw-scan {
            animation: none;
          }
          .lvw-card {
            transition: none;
          }
          .lvw-card:hover {
            transform: none;
          }
        }
      `}</style>
    </main>
  )
}
