import { LandingPages } from '../LandingPageTypes'

export const TRAVELS_ROUTE = '/travels'
export const SETTLEMENTS_ROUTE = '/settlements'

export const NAVIGATION_ITEMS: {
  title: string
  page: LandingPages
  href: string
}[] = [
  { title: 'Home', page: LandingPages.home, href: '#home' },
  { title: 'About', page: LandingPages.about, href: '#about' },
  { title: 'Work', page: LandingPages.work, href: '#work' },
  { title: 'Experience', page: LandingPages.experience, href: '#experience' },
  { title: 'Projects', page: LandingPages.products, href: '#writing' },
  { title: 'Contact', page: LandingPages.contact, href: '#contact' },
]
