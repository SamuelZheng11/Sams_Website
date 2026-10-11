import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { LandingPages } from '../LandingPageTypes'

import './NavMenu.scss'

interface INavItem {
  title: string
  page: LandingPages
  href: string
}

interface INavMenuProps {
  // The section links shown in the flyout.
  items: INavItem[]
  // The page highlighted as active, or null when not on the landing page.
  activePage: LandingPages | null
  // Runs the section navigation; the component closes the flyout first.
  onNavigate: (page: LandingPages) => void
  // The wordmark repeated at the top of the flyout.
  brand: string
}

// The small-screen navigation: a hamburger toggle in the header plus a flyout
// panel that slides in from the right. The overlay is portalled to the body so
// the header's backdrop-filter does not become its containing block, and the
// body scroll is locked, Escape closes it and the scrim dismisses it.
export function NavMenu({
  items,
  activePage,
  onNavigate,
  brand,
}: INavMenuProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const select = (page: LandingPages) => {
    setOpen(false)
    onNavigate(page)
  }

  return (
    <>
      <button
        className="icon-button menu-toggle"
        id="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        title="Menu"
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {createPortal(
        <>
          <button
            type="button"
            className={`nav-scrim${open ? ' is-open' : ''}`}
            onClick={() => setOpen(false)}
            tabIndex={-1}
            aria-label="Close menu"
          />
          <aside
            id="mobile-menu"
            className={`nav-flyout${open ? ' is-open' : ''}`}
            aria-label="Mobile navigation"
            aria-hidden={!open}
          >
            <div className="nav-flyout-head">
              <span className="logo">{brand}</span>
              <button
                className="icon-button"
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <ul>
              {items.map(({ title, page, href }) => (
                <li key={page}>
                  <a
                    data-nav
                    href={href}
                    className={activePage === page ? 'active' : ''}
                    onClick={(event) => {
                      event.preventDefault()
                      select(page)
                    }}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </>,
        document.body
      )}
    </>
  )
}
