'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StoryBeat {
  id: number
  heading: string
  body: string
  imageCaption: string
  reverse: boolean
}

const storyBeats: StoryBeat[] = [
  {
    id: 1,
    heading: 'It started with Lola\'s recipes.',
    body: 'Our family brought the flavors of the Philippines to Seattle — slow-cooked adobo, sinigang that fills the whole house, and rice at every meal. Lola\'s kitchen was the neighborhood\'s kitchen.',
    imageCaption: '[Photo of the family]',
    reverse: false,
  },
  {
    id: 2,
    heading: 'We fell in love with burgers, too.',
    body: 'Growing up between two food cultures, we discovered something unexpected: Filipino flavors and American classics belong together. A smash burger with banana ketchup. Garlic rice fries. The fusion that just works.',
    imageCaption: '[Photo of the food]',
    reverse: true,
  },
  {
    id: 3,
    heading: 'This shop is our love letter to the community.',
    body: 'Every dish carries a memory. Every menu item is a conversation between where we came from and where we are now. We built this place for you — neighbors, friends, anyone hungry for something made with real love.',
    imageCaption: '[Photo of the shop]',
    reverse: false,
  },
]

function BananaLeafSVG({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="180"
      height="80"
      viewBox="0 0 180 80"
      fill="none"
      aria-hidden="true"
      style={{ transform: flip ? 'scaleX(-1)' : undefined, opacity: 0.18 }}
    >
      <path
        d="M10 70 Q40 10 90 20 Q130 28 170 15 Q140 40 100 50 Q60 60 10 70Z"
        fill="#2E7D32"
      />
      <path
        d="M90 20 Q100 35 95 50"
        stroke="#1B5E20"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M90 20 Q80 30 75 45" stroke="#1B5E20" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M90 20 Q105 30 108 44" stroke="#1B5E20" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

interface BeatProps {
  beat: StoryBeat
}

function StoryBeatBlock({ beat }: BeatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`grid md:grid-cols-2 gap-10 items-center ${beat.reverse ? 'md:[direction:rtl]' : ''}`}
    >
      {/* Text */}
      <div className={beat.reverse ? 'md:[direction:ltr]' : ''}>
        <h3 className="font-heading text-2xl md:text-3xl text-dark font-bold mb-4 leading-snug">
          {beat.heading}
        </h3>
        <p className="font-body text-dark/70 text-lg leading-relaxed">
          {beat.body}
        </p>
      </div>

      {/* Placeholder image */}
      <div
        className={`aspect-[4/3] bg-dark/10 rounded-2xl flex items-center justify-center ${beat.reverse ? 'md:[direction:ltr]' : ''}`}
        role="img"
        aria-label={beat.imageCaption}
      >
        <span className="font-accent text-dark/40 text-lg text-center px-4" aria-hidden="true">
          {beat.imageCaption}
        </span>
      </div>
    </motion.div>
  )
}

export default function OurStory() {
  return (
    <section id="our-story" className="bg-cream py-24 overflow-hidden">
      {/* Top banana leaf motif */}
      <div className="flex justify-between px-4 mb-8 pointer-events-none">
        <BananaLeafSVG />
        <BananaLeafSVG flip />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="font-accent text-primary text-xl mb-3">The People Behind the Food</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-dark leading-tight">
            From Our Kitchen<br />To Yours
          </h2>
        </div>

        {/* Story beats */}
        <div className="space-y-24">
          {storyBeats.map((beat) => (
            <StoryBeatBlock key={beat.id} beat={beat} />
          ))}
        </div>

        {/* Pull quote */}
        <div className="text-center mt-24 py-12 border-t-2 border-b-2 border-primary/20">
          <p
            className="font-accent text-primary text-4xl md:text-5xl leading-relaxed"
          >
            &ldquo;Pagkain ang pagmamahal.&rdquo;
          </p>
          <p className="font-body text-dark/50 text-sm mt-3 tracking-widest uppercase">
            Food is love.
          </p>
        </div>
      </div>

      {/* Bottom banana leaf motif */}
      <div className="flex justify-between px-4 mt-8 pointer-events-none">
        <BananaLeafSVG flip />
        <BananaLeafSVG />
      </div>
    </section>
  )
}
