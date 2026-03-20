'use client'

import React from 'react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ── Shared gradient definitions ───────────────────────────────────────────────
// Rendered ONCE as a hidden SVG so all layer instances share the same IDs.
// Duplicate IDs across mobile + desktop SVGs cause browsers to resolve
// fill="url(#id)" against the first match — often a display:none element —
// making layers appear invisible.
function BurgerDefs() {
  return (
    <svg
      width="0" height="0"
      style={{ position: 'absolute', overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bg-topBunGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#D4A843" />
          <stop offset="60%"  stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
        <linearGradient id="bg-lettuceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6ECF72" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>
        <radialGradient id="bg-tomatoGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#FF5555" />
          <stop offset="100%" stopColor="#CC2200" />
        </radialGradient>
        <linearGradient id="bg-cheeseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFD94A" />
          <stop offset="100%" stopColor="#FFA020" />
        </linearGradient>
        <radialGradient id="bg-pattyGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%"   stopColor="#5C3317" />
          <stop offset="50%"  stopColor="#3E2008" />
          <stop offset="100%" stopColor="#1E0E02" />
        </radialGradient>
        <linearGradient id="bg-botBunGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#CFA030" />
          <stop offset="100%" stopColor="#9A7018" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── Layer SVGs (reference shared IDs, define no gradients themselves) ─────────

function TopBun() {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" aria-hidden="true">
      <ellipse cx="100" cy="44" rx="95" ry="38" fill="url(#bg-topBunGrad)" />
    </svg>
  )
}

function Sesame() {
  const seeds = [
    { cx: 78, cy: 14 }, { cx: 100, cy: 8 }, { cx: 122, cy: 16 },
    { cx: 89, cy: 24 }, { cx: 113, cy: 27 },
  ]
  return (
    <svg width="200" height="36" viewBox="0 0 200 36" fill="none" aria-hidden="true">
      {seeds.map((s, i) => (
        <ellipse key={i} cx={s.cx} cy={s.cy} rx="5" ry="3"
          fill="#FFF5DC" opacity="0.9"
          transform={`rotate(-18 ${s.cx} ${s.cy})`} />
      ))}
    </svg>
  )
}

function Lettuce() {
  return (
    <svg width="220" height="36" viewBox="0 0 220 36" fill="none" aria-hidden="true">
      <path
        d="M8 22 Q28 4 52 18 Q72 4 92 17 Q112 3 132 18 Q152 4 172 17 Q192 3 212 20 L214 32 Q162 42 110 36 Q58 42 6 32 Z"
        fill="url(#bg-lettuceGrad)"
      />
    </svg>
  )
}

function Tomato() {
  return (
    <svg width="184" height="26" viewBox="0 0 184 26" fill="none" aria-hidden="true">
      <ellipse cx="92" cy="13" rx="88" ry="12" fill="url(#bg-tomatoGrad)" />
      <line x1="62"  y1="3"  x2="66"  y2="23" stroke="#AA1800" strokeWidth="1" opacity="0.3" />
      <line x1="92"  y1="2"  x2="92"  y2="24" stroke="#AA1800" strokeWidth="1" opacity="0.3" />
      <line x1="122" y1="3"  x2="118" y2="23" stroke="#AA1800" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

function Cheese() {
  return (
    <svg width="214" height="22" viewBox="0 0 214 22" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="204" height="16" rx="2" fill="url(#bg-cheeseGrad)" />
      <path d="M5 19 L0 7 L5 3"    fill="#E89000" />
      <path d="M209 19 L214 7 L209 3" fill="#E89000" />
    </svg>
  )
}

function Patty() {
  return (
    <svg width="214" height="42" viewBox="0 0 214 42" fill="none" aria-hidden="true">
      <ellipse cx="107" cy="22" rx="102" ry="19" fill="url(#bg-pattyGrad)" />
      <ellipse cx="107" cy="18" rx="92"  ry="7"  fill="rgba(255,255,255,0.05)" />
      <path d="M55 14 Q75 10 95 14"   stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M110 16 Q130 12 150 16" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function BottomBun() {
  return (
    <svg width="200" height="46" viewBox="0 0 200 46" fill="none" aria-hidden="true">
      <ellipse cx="100" cy="23" rx="95" ry="20" fill="url(#bg-botBunGrad)" />
    </svg>
  )
}

// ── Assembled pixel positions inside the stage ────────────────────────────────
const STAGE_W = 320
const STAGE_H = 260

const ASSEMBLED: Record<string, { left: number; top: number; z: number }> = {
  'top-bun':    { left: (STAGE_W - 200) / 2, top:   0, z: 7 },
  'sesame':     { left: (STAGE_W - 200) / 2, top:   4, z: 8 },
  'lettuce':    { left: (STAGE_W - 220) / 2, top:  62, z: 5 },
  'tomato':     { left: (STAGE_W - 184) / 2, top:  88, z: 4 },
  'cheese':     { left: (STAGE_W - 214) / 2, top: 106, z: 3 },
  'patty':      { left: (STAGE_W - 214) / 2, top: 124, z: 2 },
  'bottom-bun': { left: (STAGE_W - 200) / 2, top: 170, z: 1 },
}

const SCATTER: Record<string, { x: number; y: number }> = {
  'top-bun':    { x:    0, y: -280 },
  'sesame':     { x:  120, y: -250 },
  'lettuce':    { x: -210, y:  -90 },
  'tomato':     { x:  200, y:  -50 },
  'cheese':     { x: -180, y:   70 },
  'patty':      { x:    0, y:  130 },
  'bottom-bun': { x:    0, y:  230 },
}

const EXPLODE: Record<string, { x: number; y: number }> = {
  'top-bun':    { x:   10, y: -310 },
  'sesame':     { x:  140, y: -290 },
  'lettuce':    { x: -250, y: -170 },
  'tomato':     { x:  240, y: -130 },
  'cheese':     { x: -220, y:   90 },
  'patty':      { x:   40, y:  180 },
  'bottom-bun': { x:  -20, y:  270 },
}

const LAYER_IDS = ['top-bun', 'sesame', 'lettuce', 'tomato', 'cheese', 'patty', 'bottom-bun']

const LAYER_SVG: Record<string, React.ReactNode> = {
  'top-bun':    <TopBun />,
  'sesame':     <Sesame />,
  'lettuce':    <Lettuce />,
  'tomato':     <Tomato />,
  'cheese':     <Cheese />,
  'patty':      <Patty />,
  'bottom-bun': <BottomBun />,
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BurgerStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const layerRefs  = useRef<Record<string, HTMLDivElement | null>>({})
  const textRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return

    const section = sectionRef.current
    if (!section) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      LAYER_IDS.forEach((id) => {
        const el = layerRefs.current[id]
        if (!el) return
        gsap.set(el, { x: SCATTER[id].x, y: SCATTER[id].y, opacity: 0 })
      })
      if (textRef.current) gsap.set(textRef.current, { opacity: 0, y: 16 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })

      // 0 → 0.5 assemble
      LAYER_IDS.forEach((id) => {
        const el = layerRefs.current[id]
        if (!el) return
        tl.to(el, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)
      })
      tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.08 }, 0.44)

      // 0.5 → 1 explode
      LAYER_IDS.forEach((id) => {
        const el = layerRefs.current[id]
        if (!el) return
        tl.to(el, { x: EXPLODE[id].x, y: EXPLODE[id].y, opacity: 0, duration: 0.5, ease: 'power2.in' }, 0.5)
      })
      tl.to(textRef.current, { opacity: 0, y: -10, duration: 0.1 }, 0.5)

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="burger-story"
      className="relative bg-dark"
      style={{ height: '300vh' }}
    >
      {/* Shared gradient defs — rendered once, referenced by all SVG instances */}
      <BurgerDefs />

      {/* Mobile: static */}
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-20">
        <div className="flex flex-col items-center">
          <TopBun /><Lettuce /><Tomato /><Cheese /><Patty /><BottomBun />
        </div>
        <div className="text-center max-w-md">
          <p className="font-accent text-secondary text-lg mb-3">Smash &amp; Sizzle</p>
          <h2 className="font-display text-5xl text-cream mb-4">The Burger</h2>
          <p className="font-heading text-cream/70 text-lg italic">
            Every patty tells a story. Ours starts in Manila.
          </p>
        </div>
      </div>

      {/* Desktop: CSS sticky + GSAP animated */}
      <div className="hidden md:flex sticky top-0 h-screen flex-col items-center justify-center bg-dark overflow-hidden">
        <div className="relative" style={{ width: STAGE_W, height: STAGE_H }}>
          {LAYER_IDS.map((id) => {
            const { left, top, z } = ASSEMBLED[id]
            return (
              <div
                key={id}
                ref={(el) => { layerRefs.current[id] = el }}
                className="absolute"
                style={{ left, top, zIndex: z }}
              >
                {LAYER_SVG[id]}
              </div>
            )
          })}
        </div>

        <div
          ref={textRef}
          className="absolute bottom-[8%] left-0 right-0 text-center px-4 pointer-events-none"
        >
          <p className="font-accent text-secondary text-xl mb-2">Smash &amp; Sizzle</p>
          <p
            className="font-heading text-cream text-3xl md:text-4xl italic max-w-lg mx-auto"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.9)' }}
          >
            Every patty tells a story.<br />Ours starts in Manila.
          </p>
        </div>
      </div>
    </section>
  )
}
