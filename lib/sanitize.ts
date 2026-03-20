/**
 * Input sanitization utilities — use these on ALL user-supplied data
 * before any processing, both client-side and server-side.
 */

/**
 * Trims and validates a string input.
 * Throws a TypeError if value is not a string or exceeds maxLength.
 */
export function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    throw new TypeError('Expected a string')
  }
  const trimmed = value.trim()
  if (trimmed.length > maxLength) {
    throw new TypeError(`Exceeds maximum length of ${maxLength}`)
  }
  return trimmed
}

/**
 * Returns true if the email matches a basic RFC-compliant pattern
 * and is within the maximum email length.
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false
  const trimmed = email.trim()
  if (trimmed.length === 0 || trimmed.length > 254) return false
  // Basic RFC 5322 simplified pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return emailRegex.test(trimmed)
}

/** Strip leading/trailing whitespace */
export function trimInput(value: string): string {
  return value.trim()
}

/** Sanitize a name field: trim + strip HTML-like chars + enforce max length */
export function sanitizeName(value: string): string {
  return value.trim().replace(/[<>"'`]/g, '').slice(0, 100)
}

/** Sanitize a message: trim + strip HTML tags + enforce max length */
export function sanitizeMessage(value: string): string {
  return value.trim().replace(/<[^>]*>/g, '').slice(0, 2000)
}

/** Validate message length */
export function isValidMessage(value: string): boolean {
  const msg = value.trim()
  return msg.length >= 10 && msg.length <= 2000
}
