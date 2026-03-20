import type { HoursEntry } from '@/types'

const hours: HoursEntry[] = [
  { day: 'Monday – Thursday', time: '11:00 AM – 9:00 PM' },
  { day: 'Friday – Saturday', time: '11:00 AM – 10:00 PM' },
  { day: 'Sunday',            time: '12:00 PM – 8:00 PM' },
]

export default function Hours() {
  return (
    <section id="hours" className="bg-dark py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-accent text-secondary text-xl mb-3">Come Find Us</p>
          <h2 className="font-display text-6xl md:text-8xl text-cream tracking-wide">
            Hours &amp; Location
          </h2>
        </div>

        {/* Hours table */}
        <div className="mb-12">
          {hours.map(({ day, time }) => (
            <div
              key={day}
              className="flex justify-between items-center py-4 border-b border-white/10 last:border-0"
            >
              <span className="font-heading text-cream font-medium text-lg">{day}</span>
              <span className="font-body text-cream/65 text-base">{time}</span>
            </div>
          ))}
        </div>

        {/* Address + phone */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 space-y-3">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary mt-0.5 shrink-0" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <p className="font-body text-cream/80 text-base">
              1234 Elm Street, Seattle, WA 98101
            </p>
          </div>
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary shrink-0" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <a
              href="tel:+12065550199"
              className="font-body text-cream/80 text-base hover:text-secondary transition-colors"
            >
              (206) 555-0199
            </a>
          </div>

          {/* Neon OPEN badge */}
          <div className="pt-2">
            <span
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest px-4 py-1.5 rounded-full border border-accent/50 text-accent"
              style={{
                animation: 'neonPulseGreen 2s ease-in-out infinite',
                boxShadow: '0 0 8px rgba(26,188,156,0.4)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-accent"
                style={{ animation: 'neonPulseGreen 2s ease-in-out infinite' }}
              />
              OPEN NOW
            </span>
          </div>
        </div>

        {/* Google Maps placeholder */}
        <div className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-8 text-center space-y-3">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 mx-auto" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <p className="font-body text-cream/40 text-sm leading-relaxed max-w-sm mx-auto">
            Embed your Google Maps iframe here.<br />
            Also update <code className="text-secondary/70 text-xs">frame-src</code> in{' '}
            <code className="text-secondary/70 text-xs">next.config.js</code> CSP to allow{' '}
            <code className="text-secondary/70 text-xs">maps.google.com</code>
          </p>
        </div>

      </div>
    </section>
  )
}
