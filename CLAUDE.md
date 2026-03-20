# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kain Na!** — A single-page marketing website for a Filipino-owned burger and boba shop. Next.js 14 App Router, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript check (no output files)
npm audit          # Security audit — fix any HIGH/CRITICAL before shipping
```

> **Windows note:** This project requires **64-bit Node.js**. The 32-bit build (`ia32`) crashes on the SWC native binary with `ACCESS_VIOLATION`. Use `C:\Program Files\nodejs\` (x64), not `C:\Program Files (x86)\nodejs\`.

## Architecture

This is a **single-page app** — `app/page.tsx` imports all section components in order. There is no routing beyond the root page and the `/api/contact` API route.

```
app/
  layout.tsx          Root layout: fonts (next/font/google), LenisProvider, metadata
  page.tsx            Composes all sections + Navbar
  globals.css         CSS variables, scrollbar, noise overlay, fade-in animation
  api/contact/route.ts  Server-side contact form handler (POST only)

components/
  ui/                 Navbar, AnimatedText (Framer Motion word-by-word), ScrollProgress
  sections/           One file per page section (Hero → Footer)

lib/
  lenis.tsx           LenisProvider + useLenis hook (client component, wraps body in layout)
  gsap.ts             Registers GSAP ScrollTrigger — import registerGSAP() before using ScrollTrigger
  sanitize.ts         All form input sanitization — use these before any processing

types/index.ts        Shared interfaces: MenuItem, ContactFormData, BusinessHours, SocialLink
```

## Design System

Colors are defined as both CSS variables (`:root` in `globals.css`) and Tailwind config extensions (`tailwind.config.ts`). Use Tailwind classes (`bg-primary`, `text-secondary`, etc.) — not raw hex values.

| Token | Value | Usage |
|---|---|---|
| `primary` | `#C0392B` | Adobo red — CTAs, headings |
| `secondary` | `#F39C12` | Sunshine gold — accents, logo |
| `accent` | `#1ABC9C` | Boba teal — boba section |
| `dark` | `#1A1A1A` | Near-black — dark sections |
| `cream` | `#FDF6EC` | Off-white — light sections |
| `brown` | `#8B4513` | Toasted bun — burger section |
| `pink` | `#FF6B9D` | Boba pink |

Font family classes: `font-display` (Bebas Neue), `font-heading` (Playfair Display), `font-body` (DM Sans), `font-accent` (Caveat). All loaded via `next/font/google` — **never add `<link>` tags for fonts**.

## Security Rules (enforced throughout)

1. **No secrets in client code.** Env vars for SMTP, keys, tokens must have no `NEXT_PUBLIC_` prefix and only be read in server components / API routes / server actions.
2. **`NEXT_PUBLIC_`** is only for non-sensitive config (e.g. `NEXT_PUBLIC_SITE_URL`).
3. **`.env.local` is git-ignored.** Only `.env.local.example` (with dummy values) is committed.
4. **All user input** must go through `lib/sanitize.ts` before any processing — both client-side validation and server-side in the API route.
5. **No inline HTML event handlers** (`onclick="..."`). React event handlers only.
6. **User-facing error messages** must never expose stack traces, file paths, or internal details.
7. Security and CSP headers are set in `next.config.js`. The CSP uses `'unsafe-eval'` and `'unsafe-inline'` for `script-src` because Next.js 14 dev mode and GSAP require them. For production hardening, replace with nonces.

## Key Patterns

**Adding a new section:** Create `components/sections/YourSection.tsx`, add `'use client'` if it uses hooks/animations, import and place it in `app/page.tsx`.

**GSAP ScrollTrigger:** Call `registerGSAP()` from `lib/gsap.ts` inside a `useEffect` before registering any ScrollTrigger animations.

**Lenis:** Access the Lenis instance via `useLenis()` from `lib/lenis.tsx` if you need to programmatically scroll or pause smooth scroll.

**Contact form data flow:** Client (`Contact.tsx`) → sanitize → `POST /api/contact` → server sanitizes again → (future: SMTP via server-only env vars).
