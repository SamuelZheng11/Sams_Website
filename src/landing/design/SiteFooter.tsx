import { useAppSelector } from '../../hooks'
import { useLocalClock } from './design.hooks'
import { LOCATION_TIMEZONE } from './constants'

interface ISiteFooterProps {
  // `sub-footer` renders the compact variant used on sub-pages; the default
  // inherits the contact section's on-accent footer styling.
  className?: string
}

// The site footer shared by the landing contact section and the sub-page
// shell: copyright / name / location, the local clock, the command-menu hint
// and a Back-to-top affordance.
export function SiteFooter({ className = '' }: ISiteFooterProps) {
  const contact = useAppSelector((state) => state.information.bio?.contact)
  const fullName =
    contact && contact.givenNames.length > 0
      ? `${contact.givenNames.join(' ')} ${contact.surname}`
      : 'Samuel Zheng'
  const location = contact?.location ?? 'Sydney, Australia'
  const time = useLocalClock(LOCATION_TIMEZONE)

  return (
    <footer className={className}>
      <span>
        &copy; {new Date().getFullYear()} {fullName} / {location}{' '}
        <span className="clock">{time}</span>
      </span>
      <span className="cmd-hint">Press Ctrl K for the command menu</span>
      <button
        type="button"
        onClick={() => {
          const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches
          window.scrollTo({
            top: 0,
            behavior: reduceMotion ? 'auto' : 'smooth',
          })
        }}
      >
        Back to top &uarr;
      </button>
    </footer>
  )
}
