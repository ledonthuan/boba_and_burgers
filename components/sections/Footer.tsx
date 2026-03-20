function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.79a4.85 4.85 0 01-1.02-.1z"/>
    </svg>
  )
}

// Philippine sun — 8 rays
function PhilippineSun({ size = 48 }: { size?: number }) {
  const rays = Array.from({ length: 8 }, (_, i) => i)
  const cx = 50
  const cy = 50
  const r  = 18
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {/* Rays */}
      {rays.map((i) => {
        const angleDeg = (i * 360) / 8
        const angleRad = (angleDeg * Math.PI) / 180
        const inner    = r + 2
        const outer    = r + 18
        const x1 = cx + inner * Math.cos(angleRad)
        const y1 = cy + inner * Math.sin(angleRad)
        const x2 = cx + outer * Math.cos(angleRad)
        const y2 = cy + outer * Math.sin(angleRad)
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#F39C12"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )
      })}
      {/* Sun circle */}
      <circle cx={cx} cy={cy} r={r} fill="#F39C12" />
      <circle cx={cx} cy={cy} r={r - 5} fill="#C0392B" opacity="0.35" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Menu',      href: '#menu' },
  { label: 'Hours',     href: '#hours' },
  { label: 'Contact',   href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark border-t border-white/10" role="contentinfo">
      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Left: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <PhilippineSun size={40} />
              <p className="font-display text-3xl text-secondary tracking-wider">KAIN NA!</p>
            </div>
            <p className="font-body text-cream/50 text-sm leading-relaxed">
              Filipino flavors. American classics.
            </p>
            <p className="font-accent text-cream/35 text-base">
              Family owned &amp; operated in Seattle, WA
            </p>
          </div>

          {/* Center: Quick nav */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-lg text-secondary tracking-widest uppercase">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3" role="list">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="font-body text-cream/50 hover:text-secondary transition-colors text-sm"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Social + tagline */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-lg text-secondary tracking-widest uppercase">
              Find Us Online
            </h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-cream/50 hover:text-pink transition-colors p-1">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Facebook" className="text-cream/50 hover:text-secondary transition-colors p-1">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="TikTok" className="text-cream/50 hover:text-accent transition-colors p-1">
                <TikTokIcon />
              </a>
            </div>
            <p className="font-accent text-cream/35 text-base mt-2">
              Made with love &amp; adobo 🇵🇭
            </p>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="border-t border-secondary/30" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="font-body text-cream/25 text-xs">
          &copy; {year} Kain Na! All rights reserved.
        </p>
      </div>
    </footer>
  )
}
