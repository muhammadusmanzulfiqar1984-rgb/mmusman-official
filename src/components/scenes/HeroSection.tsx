'use client'
import { useEffect, useRef } from 'react'
import MagneticButton from '@/components/effects/MagneticButton'

interface HeroData {
  eyebrow: string
  heading: string
  body: string
  buttons: Array<{ label: string; href: string; variant: string }>
  pill: string
  quote: string
  quoteSupport: string
}

export default function HeroSection({ data }: { data: HeroData }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const mousePos     = useRef({ x: 0, y: 0 })
  const currentPos   = useRef({ x: 0, y: 0 })
  const parallaxRaf  = useRef<number | undefined>(undefined)
  const isKeyboard   = useRef(false)

  // ── WebGL ambient background ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return
    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; gl.viewport(0,0,canvas.width,canvas.height) }
    resize(); window.addEventListener('resize', resize)
    const vSrc = `attribute vec2 a_pos; void main(){gl_Position=vec4(a_pos,0,1);}`
    const fSrc = `
      precision mediump float;
      uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse;
      float noise(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float sn(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);return mix(mix(noise(i),noise(i+vec2(1,0)),f.x),mix(noise(i+vec2(0,1)),noise(i+vec2(1,1)),f.x),f.y);}
      void main(){
        vec2 uv=gl_FragCoord.xy/u_res; float t=u_time*.15;
        float n=(sn(uv*2.8+t)+.5*sn(uv*5.6-t*.6)+.25*sn(uv*11.+t*1.2))/1.75;
        float d=length(uv-u_mouse/u_res);
        vec3 col=mix(vec3(.038,.036,.034),mix(vec3(.35,.28,.16),vec3(.52,.43,.26),n),n*(.18+smoothstep(.35,0.,d)*.1));
        gl_FragColor=vec4(col,1.);
      }`
    const mk=(t: number,s: string)=>{const sh=gl.createShader(t)!;gl.shaderSource(sh,s);gl.compileShader(sh);return sh}
    const prog=gl.createProgram()!;gl.attachShader(prog,mk(gl.VERTEX_SHADER,vSrc));gl.attachShader(prog,mk(gl.FRAGMENT_SHADER,fSrc));gl.linkProgram(prog);gl.useProgram(prog)
    const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW)
    const loc=gl.getAttribLocation(prog,'a_pos');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0)
    const uTime=gl.getUniformLocation(prog,'u_time'),uRes=gl.getUniformLocation(prog,'u_res'),uMouse=gl.getUniformLocation(prog,'u_mouse')
    let mouse={x:0,y:0}; const onMove=(e: MouseEvent)=>{mouse={x:e.clientX,y:e.clientY}}
    window.addEventListener('mousemove',onMove)
    let raf: number
    const render=(t: number)=>{gl.uniform1f(uTime,t*.001);gl.uniform2f(uRes,canvas.width,canvas.height);gl.uniform2f(uMouse,mouse.x,canvas.height-mouse.y);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);raf=requestAnimationFrame(render)}
    raf=requestAnimationFrame(render)
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);window.removeEventListener('mousemove',onMove)}
  }, [])

  // ── Ludic Micro-Parallax (±6px pointer nudge, spring return) ──────────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (document.documentElement.classList.contains('classic-view')) return

    const el = contentRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      if (isKeyboard.current) return
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      mousePos.current = {
        x: ((e.clientX - cx) / cx) * 6,
        y: ((e.clientY - cy) / cy) * 4,
      }
    }

    const onKeyDown = () => {
      isKeyboard.current = true
      mousePos.current   = { x: 0, y: 0 }
    }
    const onMouseMove = () => { isKeyboard.current = false }
    const onBlur = () => { mousePos.current = { x: 0, y: 0 } }

    const animate = () => {
      // Spring interpolation
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.06
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.06
      const { x, y } = currentPos.current
      if (el) el.style.transform = `translate(${x.toFixed(3)}px, ${y.toFixed(3)}px)`
      parallaxRaf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove,     { passive: true })
    window.addEventListener('keydown',   onKeyDown)
    window.addEventListener('mousemove', onMouseMove,{ passive: true })
    window.addEventListener('blur',      onBlur)
    parallaxRaf.current = requestAnimationFrame(animate)

    return () => {
      if (parallaxRaf.current) cancelAnimationFrame(parallaxRaf.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('keydown',   onKeyDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('blur',      onBlur)
      if (el) el.style.transform = ''
    }
  }, [])

  const lines  = data.heading.split('\n')
  const words2 = (lines[1] ?? '').split(' ')
  const pivot  = Math.ceil(words2.length * 0.55)

  return (
    <section
      id="hero" aria-label="Hero"
      style={{
        position: 'relative', minHeight: '100dvh',
        paddingTop: 'calc(var(--header-h) + 60px)',
        paddingBottom: 'var(--section-pad-y)',
        paddingLeft: 'var(--section-pad-x)',
        paddingRight: 'var(--section-pad-x)',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
        borderBottom: '2px solid var(--color-gold)',
      }}
    >
      <canvas
        id="hero-canvas"
        ref={canvasRef}
        aria-hidden="true"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0, opacity:0.55 }}
      />

      {/* Parallax container */}
      <div
        ref={contentRef}
        style={{ position:'relative', zIndex:1, width:'100%', display:'grid', gridTemplateColumns:'1.35fr 1fr', gap:'var(--space-16)', alignItems:'center', maxWidth:'var(--container-max)', margin:'0 auto', willChange:'transform' }}
      >
        {/* LEFT */}
        <div>
          <h1 className="headline-shimmer reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.1rem, 3.2vw, 3rem)',
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-6)',
          }}>
            {lines[0]}<br />
            {words2.slice(0, pivot).join(' ')}{' '}
            <span style={{ color: 'var(--color-gold)' }}>{words2.slice(pivot).join(' ')}</span>
          </h1>

          <p className="body reveal" style={{ maxWidth:'520px', marginBottom:'var(--space-8)' }}>{data.body}</p>

          <div className="reveal" style={{ display:'flex', gap:'var(--space-3)', flexWrap:'wrap', marginBottom:'var(--space-10)' }}>
            {data.buttons.map(b => (
              <MagneticButton key={b.href} className="hero-btn-wrap">
                <a href={b.href} className="btn" style={{
                  fontSize:'0.8rem',
                  background: 'var(--color-gold)',
                  color: '#0a0a0a',
                  border: 'none',
                  position: 'relative',
                  zIndex: 1,
                  padding: '11px 28px',
                  letterSpacing: '0.04em',
                  fontWeight: 400,
                }}>{b.label}</a>
              </MagneticButton>
            ))}
          </div>

          <div className="reveal" style={{ display:'flex', gap:'var(--space-8)', paddingTop:'var(--space-6)', borderTop:'1px solid var(--color-border-soft)' }}>
            {([['50+','Conferences'],['15+','Years'],['6','Industries'],['25+','Organisations']] as [string,string][]).map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--font-body)', fontSize:'1.6rem', color:'rgba(255,255,255,0.9)', lineHeight:1, fontWeight:300, letterSpacing:'-0.03em' }}>{v}</div>
                <div style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', color:'var(--color-gold)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'6px', fontWeight:300 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="reveal" style={{ position:'relative' }}>
          <div style={{ borderRadius:'24px', overflow:'hidden', background:'var(--color-bg-card)', border:'1px solid var(--color-border)', aspectRatio:'3/4', position:'relative', maxHeight:'520px' }}>
            <img
              src="/images/hero.jpeg"
              alt="Mian Muhammad Usman"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', filter:'contrast(1.05) brightness(0.92)', display:'block' }}
              onError={e => { const el=e.target as HTMLImageElement; const ph=el.parentElement!; el.style.display='none'; ph.style.background='linear-gradient(135deg,#1a1510,#0d0d0d)'; ph.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:serif;font-size:2rem;color:rgba(200,169,110,0.3)">MMU</div>' }}
            />

          </div>

          {/* Floating quote card */}
          <div style={{
            position:'absolute', bottom:'20px', left:'-20px', right:'16px',
            padding:'var(--space-4) var(--space-5)',
            borderRadius:'var(--radius-md)',
            background: 'rgba(10,8,5,0.88)',
            border: '1px solid rgba(200,169,110,0.4)',
            backdropFilter: 'blur(16px)',
          }}>
            <span style={{
              display:'inline-block',
              fontFamily:'var(--font-mono)',
              fontSize:'0.52rem',
              letterSpacing:'0.14em',
              textTransform:'uppercase',
              color:'var(--color-gold)',
              marginBottom:'var(--space-3)',
            }}>{data.pill}</span>
            <blockquote style={{ fontFamily:'var(--font-display)', fontSize:'0.88rem', fontStyle:'italic', color:'var(--color-gold)', lineHeight:1.55, fontWeight:300, borderLeft:'2px solid var(--color-gold)', paddingLeft:'var(--space-4)', margin:0, letterSpacing:'-0.01em' }}>
              &ldquo;{data.quote}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
