'use client'

import { useState, FormEvent } from 'react'
import type { ContactFormData, ContactFormErrors } from '@/types'

// Social link SVGs (inline, no external resources)
function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.79a4.85 4.85 0 01-1.02-.1z"/>
    </svg>
  )
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

// Client-side validation — mirrors server validation (defense in depth)
function validateForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or fewer.'
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!emailRegex.test(data.email.trim()) || data.email.trim().length > 254) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.'
  }

  return errors
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear per-field error on change
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Client-side validation first — no network request if invalid
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')
    setSuccessMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send trimmed values only
        body: JSON.stringify({
          name:    formData.name.trim(),
          email:   formData.email.trim(),
          message: formData.message.trim(),
        }),
      })

      if (res.ok) {
        const data = await res.json() as { success?: boolean; message?: string }
        setStatus('success')
        setSuccessMessage(data.message ?? "Thanks! We'll be in touch.")
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
      } else {
        // Never display raw server error — show safe generic message
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 bg-white/5 text-cream font-body placeholder:text-cream/30 focus:outline-none transition-colors'
  const inputIdle   = 'border-white/15 focus:border-secondary'
  const inputError  = 'border-primary focus:border-primary'

  return (
    <section id="contact" className="bg-cream py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-accent text-primary text-xl mb-3">Say Hello</p>
          <h2 className="font-display text-6xl md:text-8xl text-dark tracking-wide">
            Contact Us
          </h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
          aria-label="Contact form"
        >
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block font-body font-semibold text-dark mb-2 text-sm uppercase tracking-wider">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              placeholder="Your name"
              className={`${inputClass} ${errors.name ? inputError : inputIdle} text-dark placeholder:text-dark/30`}
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1.5 text-sm text-primary font-body">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block font-body font-semibold text-dark mb-2 text-sm uppercase tracking-wider">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={254}
              placeholder="you@example.com"
              className={`${inputClass} ${errors.email ? inputError : inputIdle} text-dark placeholder:text-dark/30`}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1.5 text-sm text-primary font-body">
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block font-body font-semibold text-dark mb-2 text-sm uppercase tracking-wider">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              maxLength={2000}
              placeholder="Tell us anything — orders, events, just saying hi 👋"
              className={`${inputClass} ${errors.message ? inputError : inputIdle} text-dark placeholder:text-dark/30 resize-none`}
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={!!errors.message}
            />
            <div className="flex justify-between items-start mt-1">
              {errors.message ? (
                <p id="message-error" role="alert" className="text-sm text-primary font-body">
                  {errors.message}
                </p>
              ) : (
                <span />
              )}
              <span className="text-xs text-dark/35 font-body tabular-nums">
                {formData.message.length}/2000
              </span>
            </div>
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <div role="status" className="rounded-xl bg-accent/10 border border-accent/30 px-4 py-3">
              <p className="text-accent font-body text-sm font-medium">{successMessage}</p>
            </div>
          )}
          {status === 'error' && (
            <div role="alert" className="rounded-xl bg-primary/10 border border-primary/30 px-4 py-3">
              <p className="text-primary font-body text-sm font-medium">
                Something went wrong. Please try again.
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-cream font-body font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                Sending…
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>

        {/* Social links */}
        <div className="mt-14 text-center">
          <p className="font-body text-dark/40 text-sm mb-5 uppercase tracking-widest">Find Us Online</p>
          <div className="flex justify-center gap-5">
            <a
              href="#"
              aria-label="Instagram"
              className="text-dark/50 hover:text-primary transition-colors p-2"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-dark/50 hover:text-primary transition-colors p-2"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="text-dark/50 hover:text-primary transition-colors p-2"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
