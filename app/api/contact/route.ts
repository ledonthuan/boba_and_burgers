import { NextRequest, NextResponse } from 'next/server'
import { sanitizeString, isValidEmail } from '@/lib/sanitize'

// ── In-memory rate limiter ────────────────────────────────────────────────────
// TODO: Replace with Redis/Upstash for production multi-instance deployments
interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true
  }

  entry.count += 1
  return false
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function badRequest() {
  // Never echo user input or expose field-level details in error responses
  return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
}

// ── Route handlers ────────────────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PATCH() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function POST(request: NextRequest) {
  try {
    // ── Rate limiting ───────────────────────────────────────────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // ── Parse body ──────────────────────────────────────────────────────────
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return badRequest()
    }

    if (!body || typeof body !== 'object') {
      return badRequest()
    }

    const raw = body as Record<string, unknown>

    // ── Validate & sanitize all fields server-side ──────────────────────────
    let name: string
    let email: string
    let message: string

    try {
      name = sanitizeString(raw.name, 100)
      email = sanitizeString(raw.email, 254)
      message = sanitizeString(raw.message, 2000)
    } catch {
      return badRequest()
    }

    if (!name || name.length < 2) return badRequest()
    if (!isValidEmail(email)) return badRequest()
    if (!message || message.length < 10) return badRequest()

    // ── Process valid submission ────────────────────────────────────────────
    // TODO: Integrate email service here using process.env.EMAIL_API_KEY (server-side only)
    // Example: await sendEmail({ to: process.env.CONTACT_EMAIL_TO, from: email, name, message })

    // Server-side log only — never surfaces to client
    console.log('[contact] new submission — from:', email.slice(0, 4) + '***')

    return NextResponse.json(
      { success: true, message: "Thanks! We'll be in touch." },
      { status: 200 }
    )
  } catch {
    // Never expose stack traces, file paths, or implementation details
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
