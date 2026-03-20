'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollProgress from '@/components/ui/ScrollProgress'

// Boba dot config — defined at module level, no inline event handlers
const BOBA_DOTS = [
  { size: 18, left: '8%',  bottom: '-5%', delay: '0s',    duration: '9s',  animation: 'floatUp' },
  { size: 12, left: '18%', bottom: '-8%', delay: '1.5s',  duration: '11s', animation: 'floatUpB' },
  { size: 22, left: '30%', bottom: '-3%', delay: '0.8s',  duration: '8s',  animation: 'floatUp' },
  { size: 10, left: '42%', bottom: '-6%', delay: '2.2s',  duration: '13s', animation: 'floatUpC' },
  { size: 16, left: '55%', bottom: '-4%', delay: '0.3s',  duration: '10s', animation: 'floatUpB' },
  { size: 20, left: '67%', bottom: '-7%', delay: '1.8s',  duration: '9s',  animation: 'floatUp' },
  { size: 14, left: '78%', bottom: '-2%', delay: '3.1s',  duration: '12s', animation: 'floatUpC' },
  { size: 24, left: '88%', bottom: '-5%', delay: '0.6s',  duration: '8s',  animation: 'floatUp' },
  { size: 11, left: '93%', bottom: '-9%', delay: '2.5s',  duration: '14s', animation: 'floatUpB' },
  { size: 17, left: '50%', bottom: '-6%', delay: '4.0s',  duration: '11s', animation: 'floatUpC' },
] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-dark overflow-hidden"
    >
      <ScrollProgress />

      {/* ── Floating boba dots (CSS animation, no JS) ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {BOBA_DOTS.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width:  dot.size,
              height: dot.size,
              left:   dot.left,
              bottom: dot.bottom,
              background: i % 3 === 0
                ? 'radial-gradient(circle at 35% 35%, #FF6B9D, #C0392B)'
                : i % 3 === 1
                ? 'radial-gradient(circle at 35% 35%, #1ABC9C, #0e8a70)'
                : 'radial-gradient(circle at 35% 35%, #F39C12, #e67e22)',
              animation: `${dot.animation} ${dot.duration} ${dot.delay} infinite linear`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* ── Radial gradient background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(192,57,43,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="font-accent text-secondary text-xl md:text-2xl mb-4 tracking-wide"
        >
          Filipino-owned · Family-run · Community-first
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-display leading-none text-cream mb-6 select-none"
          style={{
            fontSize: 'clamp(5rem, 18vw, 14rem)',
            animation: 'neonPulse 3s ease-in-out infinite',
          }}
        >
          KAIN NA!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="font-accent text-cream/80 text-2xl md:text-3xl mb-12 max-w-2xl mx-auto"
        >
          Filipino flavors. American classics. Made with love.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="btn-fill btn-fill-red inline-block border-2 border-primary text-cream font-body font-semibold px-10 py-4 rounded-full text-base"
          >
            See Our Menu
          </a>
          <a
            href="#our-story"
            className="btn-fill btn-fill-gold inline-block border-2 border-secondary text-secondary font-body font-semibold px-10 py-4 rounded-full text-base hover:text-dark"
          >
            Our Story
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <div
        aria-label="Scroll down"
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ animation: 'arrowBounce 1.8s ease-in-out infinite', transformOrigin: 'bottom center' }}
      >
        <span className="font-body text-cream/40 text-xs tracking-widest uppercase">Scroll</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cream/40"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
