// Smooth-scrolls to a section element by id, honouring reduced motion.
export const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}