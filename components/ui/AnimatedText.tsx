'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  stagger?: number
}

export default function AnimatedText({
  text,
  className = '',
  once = true,
  delay = 0,
  stagger = 0.07,
}: AnimatedTextProps) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once, margin: '-60px 0px' })
  const words  = text.split(' ')

  return (
    <span
      ref={ref}
      className={`inline ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.25em] last:mr-0"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{
            duration: 0.55,
            delay: delay + i * stagger,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
