'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Pearl {
  cx: number
  cy: number
  r: number
  color: string
  floatY: number
}

const PEARLS: Pearl[] = [
  { cx: 95,  cy: 310, r: 14, color: '#2A1A0A', floatY: -50 },
  { cx: 130, cy: 315, r: 12, color: '#1A0A0A', floatY: -65 },
  { cx: 160, cy: 308, r: 13, color: '#2A1A0A', floatY: -42 },
  { cx: 75,  cy: 325, r: 11, color: '#1A0A0A', floatY: -70 },
  { cx: 115, cy: 330, r: 10, color: '#2A1A0A', floatY: -55 },
  { cx: 148, cy: 328, r: 12, color: '#1A0A0A', floatY: -60 },
]

function BobaStaticFull() {
  return (
    <svg width="260" height="380" viewBox="0 0 260 380" fill="none" aria-label="Full boba cup">
      <defs>
        <linearGradient id="liquidFullS" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,107,157,0.85)" />
          <stop offset="100%" stopColor="rgba(26,188,156,0.9)" />
        </linearGradient>
        <linearGradient id="strawGradS" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="100%" stopColor="#ff9fc0" />
        </linearGradient>
        <clipPath id="cupClipS">
          <path d="M55 80 L205 80 L190 360 Q185 375 130 375 Q75 375 70 360 Z" />
        </clipPath>
      </defs>
      <ellipse cx="130" cy="55" rx="90" ry="30" fill="#FF6B9D" opacity="0.7" />
      <ellipse cx="130" cy="45" rx="70" ry="20" fill="rgba(255,255,255,0.15)" />
      <path d="M55 80 L205 80 L190 360 Q185 375 130 375 Q75 375 70 360 Z"
        fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <rect x="0" y="0" width="260" height="380" fill="url(#liquidFullS)" clipPath="url(#cupClipS)" />
      {PEARLS.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.color} opacity="0.9" />
      ))}
      <rect x="118" y="0" width="14" height="200" rx="7" fill="url(#strawGradS)" />
      <path d="M70 100 Q80 200 75 300" stroke="rgba(255,255,255,0.15)"
        strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default function BobaStory() {
  const sectionRef  = useRef<HTMLElement>(null)
  const clipRectRef = useRef<SVGRectElement>(null)
  const pearlRefs   = useRef<(SVGCircleElement | null)[]>([])
  const textRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return

    const section = sectionRef.current
    if (!section) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Initial state
      if (clipRectRef.current) gsap.set(clipRectRef.current, { attr: { y: 380 } })
      pearlRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0 })
      })
      if (textRef.current) gsap.set(textRef.current, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          // No pin:true — CSS sticky handles the visual lock
        },
      })

      // Liquid rises: clip rect y from 380 → 80
      tl.to(clipRectRef.current, { attr: { y: 80 }, duration: 0.7, ease: 'none' }, 0)

      // Pearls appear and float up
      PEARLS.forEach((pearl, i) => {
        const el = pearlRefs.current[i]
        if (!el) return
        tl.to(el, { opacity: 0.9, y: pearl.floatY, duration: 0.15, ease: 'power1.out' }, 0.25 + i * 0.06)
      })

      // Text reveal at ~75%
      tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.15, ease: 'power1.out' }, 0.75)

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="boba-story"
      className="relative bg-dark"
      style={{ height: '250vh' }}
    >
      {/* Mobile: static */}
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-20 bg-dark">
        <BobaStaticFull />
        <div className="text-center max-w-md">
          <p className="font-accent text-pink text-lg mb-3">Shaken &amp; Stirred</p>
          <h2 className="font-display text-5xl text-cream mb-4">The Boba</h2>
          <p className="font-heading text-cream/70 text-lg italic">
            Handcrafted. One sip at a time.
          </p>
        </div>
      </div>

      {/* Desktop: sticky viewport */}
      <div className="hidden md:flex sticky top-0 h-screen flex-col items-center justify-center bg-dark gap-8 overflow-hidden">
        <svg width="260" height="380" viewBox="0 0 260 380" fill="none"
          aria-label="Boba cup filling animation">
          <defs>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,107,157,0.85)" />
              <stop offset="100%" stopColor="rgba(26,188,156,0.9)" />
            </linearGradient>
            <linearGradient id="strawGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6B9D" />
              <stop offset="100%" stopColor="#ff9fc0" />
            </linearGradient>
            {/* Animated clip — y value driven by GSAP */}
            <clipPath id="liquidClip">
              <rect ref={clipRectRef} x="0" y="380" width="260" height="300" />
            </clipPath>
            <clipPath id="cupClip">
              <path d="M55 80 L205 80 L190 360 Q185 375 130 375 Q75 375 70 360 Z" />
            </clipPath>
          </defs>

          {/* Lid */}
          <ellipse cx="130" cy="55" rx="90" ry="30" fill="#FF6B9D" opacity="0.7" />
          <ellipse cx="130" cy="45" rx="70" ry="20" fill="rgba(255,255,255,0.15)" />

          {/* Cup outline */}
          <path d="M55 80 L205 80 L190 360 Q185 375 130 375 Q75 375 70 360 Z"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />

          {/* Rising liquid — double-clipped: cup shape + rising rect */}
          <g clipPath="url(#cupClip)">
            <rect x="0" y="0" width="260" height="380"
              fill="url(#liquidGrad)" clipPath="url(#liquidClip)" />
          </g>

          {/* Pearls */}
          {PEARLS.map((pearl, i) => (
            <circle key={i}
              ref={(el) => { pearlRefs.current[i] = el }}
              cx={pearl.cx} cy={pearl.cy} r={pearl.r}
              fill={pearl.color} opacity="0" />
          ))}

          {/* Straw */}
          <rect x="118" y="0" width="14" height="200" rx="7" fill="url(#strawGrad)" />

          {/* Highlight */}
          <path d="M70 100 Q80 200 75 300" stroke="rgba(255,255,255,0.12)"
            strokeWidth="8" strokeLinecap="round" fill="none" />
        </svg>

        {/* Text */}
        <div ref={textRef} className="text-center px-4 pointer-events-none">
          <p className="font-accent text-pink text-2xl mb-3">Shaken &amp; Stirred</p>
          <p className="font-heading text-cream text-3xl md:text-4xl italic max-w-md mx-auto"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
            Handcrafted. One sip at a time.
          </p>
        </div>
      </div>
    </section>
  )
}
