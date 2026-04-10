import { useEffect, useRef } from 'react'

export function useWebGLBackground(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    let raf: number
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(render)
      } else {
        if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      }
    })
    observer.observe(canvas)

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
        vec3 col=mix(vec3(.05,.032,.038),mix(vec3(.28,.12,.18),vec3(.42,.18,.26),n),n*(.18+smoothstep(.35,0.,d)*.1));
        gl_FragColor=vec4(col,1.);
      }`
    const mk=(t: number,s: string)=>{const sh=gl.createShader(t)!;gl.shaderSource(sh,s);gl.compileShader(sh);return sh}
    const prog=gl.createProgram()!;gl.attachShader(prog,mk(gl.VERTEX_SHADER,vSrc));gl.attachShader(prog,mk(gl.FRAGMENT_SHADER,fSrc));gl.linkProgram(prog);gl.useProgram(prog)
    const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW)
    const loc=gl.getAttribLocation(prog,'a_pos');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0)
    const uTime=gl.getUniformLocation(prog,'u_time'),uRes=gl.getUniformLocation(prog,'u_res'),uMouse=gl.getUniformLocation(prog,'u_mouse')
    let mouse={x:0,y:0}; const onMove=(e: MouseEvent)=>{mouse={x:e.clientX,y:e.clientY}}
    window.addEventListener('mousemove',onMove)
    
    const render=(t: number)=>{
      gl.uniform1f(uTime,t*.001);
      gl.uniform2f(uRes,canvas.width,canvas.height);
      gl.uniform2f(uMouse,mouse.x,canvas.height-mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
      raf=requestAnimationFrame(render)
    }
    raf=requestAnimationFrame(render)
    return ()=>{
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect()
      window.removeEventListener('resize',resize);
      window.removeEventListener('mousemove',onMove)
      
      // Cleanup WebGL resources
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
      const shaders = gl.getAttachedShaders(prog);
      if (shaders) shaders.forEach(sh => gl.deleteShader(sh));
    }
  }, [canvasRef])
}

export function useMicroParallax(contentRef: React.RefObject<HTMLDivElement | null>) {
  const mousePos     = useRef({ x: 0, y: 0 })
  const currentPos   = useRef({ x: 0, y: 0 })
  const parallaxRaf  = useRef<number | undefined>(undefined)
  const isKeyboard   = useRef(false)

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
  }, [contentRef])
}
