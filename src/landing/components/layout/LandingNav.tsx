import { useLocation, useNavigate } from 'react-router-dom'

import { LandingPages } from '../../LandingPageTypes'
import { NAVIGATION_ITEMS } from '../../header/HeaderConstants'
import { scrollTo } from '../../slice/LandingPageNavigationSlice'
import { cyclePalette, toggleTheme } from '../../../theme/slice/ThemeSlice'
import { useJsClass, useScrollProgress, useShortcutLabel } from '../helpers/hooks'
import { NavMenu } from './NavMenu'
import { useAppDispatch, useAppSelector } from '../../../hooks'

import './LandingNav.scss'

const THEME_SWITCH_LABEL = 'Dark mode'
const SITE_NAME = 'samuelzheng.com'

// The fixed, translucent header with section pills, the command-menu trigger,
// the accent dot, the light/dark switch and the scroll progress bar. On small
// screens the section pills collapse into a slide-in flyout (see `NavMenu`)
// behind a hamburger toggle, while the logo and the tools stay in the header.
export function LandingNav() {
  useJsClass()
  useScrollProgress()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isDark = useAppSelector((state) => state.theme.theme) === 'dark'
  const activeView = useAppSelector((state) => state.navigation.activeView)
  const shortcutLabel = useShortcutLabel()

  const isOnLanding = pathname === '/'

  const navigateTo = (page: LandingPages) => {
    dispatch(scrollTo(page))
    if (!isOnLanding) navigate('/')
  }

  const onThemeKey = (event: React.KeyboardEvent) => {
    if (
      (event.key === 'ArrowLeft' && isDark) ||
      (event.key === 'ArrowRight' && !isDark)
    ) {
      event.preventDefault()
      dispatch(toggleTheme())
    }
  }

  return (
    <nav aria-label="Main">
      <div className="inner">
        <a
          className="logo"
          href="#home"
          onClick={() => navigateTo(LandingPages.home)}
        >
          {SITE_NAME}
        </a>
        <ul>
          {NAVIGATION_ITEMS.map(({ title, page, href }) => (
            <li key={page}>
              <a
                data-nav
                href={href}
                className={isOnLanding && activeView === page ? 'active' : ''}
                onClick={(event) => {
                  event.preventDefault()
                  navigateTo(page)
                }}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
        <div className="tools">
          <button
            className="icon-button"
            id="command-trigger"
            type="button"
            aria-label="Open command menu"
          >
            {shortcutLabel}
          </button>
          <NavMenu
            items={NAVIGATION_ITEMS}
            activePage={isOnLanding ? activeView : null}
            onNavigate={navigateTo}
            brand={SITE_NAME}
          />
          <button
            className="icon-button"
            id="accent-switcher"
            type="button"
            aria-label="Change accent colour"
            title="Change accent colour"
            onClick={() => dispatch(cyclePalette())}
          >
            <i></i>
          </button>
          <button
            className={`theme-toggle${isDark ? ' is-dark' : ''}`}
            id="theme"
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label={THEME_SWITCH_LABEL}
            title="Light / dark"
            onClick={() => dispatch(toggleTheme())}
            onKeyDown={onThemeKey}
          >
            <i></i>
            <svg
              className="sun"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg
              className="moon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          </button>
        </div>
      </div>
      <div id="scroll-progress"></div>
    </nav>
  )
}
