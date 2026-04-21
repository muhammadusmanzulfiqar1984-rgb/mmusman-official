'use client'
import { useState } from 'react'
import Image from 'next/image'

interface AboutData {
  eyebrow: string
  label: string
  heading: string
  paragraphs: string[]
  displayTags?: string[]
  tags?: string[]
}

export default function AboutSection({ data }: { data: AboutData }) {
  const [imgError, setImgError] = useState(false)
  const tags = data.displayTags ?? ['Lawyer', 'Trader', 'Founder', 'Strategist']
  return (
    <section id="about" aria-label="About" className="section relative py-[clamp(64px,8vw,100px)] px-[var(--section-pad-x)] border-b-2 border-[var(--color-gold)] box-border">
      <div className="col2-grid items-center">

        {/* LEFT — B&W photo */}
        <div className="reveal relative">
          <div className={`relative rounded-[20px] overflow-hidden border border-[var(--color-gold-dim)] bg-[var(--color-bg-card)] aspect-[3/4] max-h-[min(520px,calc(100dvh-var(--header-h)-clamp(80px,10vw,144px)))] ${imgError ? 'hidden' : 'block'}`}>
            <Image
              src="/images/Usman%20Research.webp"
              alt="Mian Muhammad Usman at his research desk"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-[center_20%] saturate-85 contrast-115 brightness-92"
              onError={() => setImgError(true)}
            />
          </div>
          <div className="absolute bottom-[20px] right-[12px] flex flex-col gap-[6px] items-end">
            {tags.map(t => <span key={t} className="pill text-[0.6rem]">{t}</span>)}
          </div>
        </div>

        {/* RIGHT — content */}
        <div className="text-left">
          <p className="eyebrow reveal mb-[var(--space-3)] text-[var(--color-gold-deep)] font-semibold">{data.eyebrow || data.label}</p>
          <h2 className="h2 reveal mb-[var(--space-6)] text-[var(--color-text-primary)]" style={{ whiteSpace: 'pre-line' }}>{data.heading}</h2>
          <div className="flex flex-col gap-[var(--space-5)]">
            {data.paragraphs.map((p, i) => <p key={i} className="body reveal text-[var(--color-text-secondary)]">{p}</p>)}
          </div>
          <div className="reveal flex flex-wrap gap-[var(--space-3)] mt-[var(--space-8)]">
            <a href="#work" className="btn btn-primary text-[0.8rem]">Explore the work</a>
            <a href="#contact" className="btn btn-primary text-[0.8rem]">Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  )
}
