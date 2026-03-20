export interface MenuItem {
  name: string
  description: string
  price: string
}

export interface MenuData {
  burgers: MenuItem[]
  boba: MenuItem[]
  sides: MenuItem[]
}

export interface HoursEntry {
  day: string
  time: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

export interface BusinessHours {
  day: string
  open: string
  close: string
  closed?: boolean
}

export interface SocialLink {
  platform: string
  url: string
  label: string
}
