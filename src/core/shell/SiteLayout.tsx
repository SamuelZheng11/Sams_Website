import { ReactElement, useEffect, useRef } from 'react'

import { LandingNav } from '../../landing/design/LandingNav'
import { CommandMenu } from '../../landing/design/CommandMenu'
import { SiteFooter } from '../../landing/design/SiteFooter'
import { useLoadWebsiteInfo } from '../../landing/hooks'

import './SiteLayout.scss'

export interface ISiteLayoutProps {
  children: ReactElement | ReactElement[]
  // Sub-pages (settlement calculator, travel log) render inside a padded,
  // wrapped column with a footer; the landing page is its own full-bleed story.
  subPage?: boolean
}

// The shared page frame: skip link, ID-Badge nav, command menu and main
// content column. Every route renders inside this so the whole site carries
// the same header / theme / accent behaviour.
function SiteLayout({ children, subPage = false }: ISiteLayoutProps) {
  const mainRef = useRef<HTMLElement>(null)
  const { loadWebsiteInfo } = useLoadWebsiteInfo()

  // Website info is shared across routes, so load it once in the shell
  // rather than letting each page own the request.
  useEffect(() => {
    loadWebsiteInfo()
  }, [loadWebsiteInfo])

  return (
    <div className="site-layout">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <LandingNav />

      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="site-layout-main"
      >
        {subPage ? (
          <div className="sub-page">
            <div className="container">
              {children}
              <SiteFooter className="sub-footer" />
            </div>
          </div>
        ) : (
          children
        )}
      </main>

      <CommandMenu />
    </div>
  )
}

export default SiteLayout
