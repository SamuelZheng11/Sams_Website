import { ReactElement, useEffect, useState } from 'react'
import {
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'

import Layout from '../../core/layout/LayoutComponent'
import HideOnScroll from './hide-on-scroll/HideOnScrollComponent'
import { LandingPages } from '../LandingPageTypes'
import { scrollTo } from '../slice/LandingPageNavigationSlice'
import { ThemeSwitch } from './assets/HeaderThemeSwitchComponent'
import {
  CONTACT_HEADER_TITLE,
  EDUCATION_HEADER_TITLE,
  EMPLOYMENT_HEADER_TITLE,
  HEADER_WEBSITE_NAME,
  HOME_HEADER_TITLE,
  PROJECT_HEADER_TITLE,
} from './HeaderConstants'
import { toggleTheme } from '../../theme/slice/ThemeSlice'

import './HeaderComponent.scss'
import CustomIcon from '../../core/custom-icons/CustomIconComponent'
import { useAppDispatch, useAppSelector } from '../../hooks'

export interface IHeaderProps {
  children?: ReactElement
}

const NAVIGATION_ITEMS: { title: string; page: LandingPages }[] = [
  { title: HOME_HEADER_TITLE, page: LandingPages.home },
  { title: EMPLOYMENT_HEADER_TITLE, page: LandingPages.employment },
  { title: PROJECT_HEADER_TITLE, page: LandingPages.project },
  { title: EDUCATION_HEADER_TITLE, page: LandingPages.education },
  { title: CONTACT_HEADER_TITLE, page: LandingPages.contact },
]

const DARK_MODE_LABEL_ID = 'header-dark-mode-label'
const NAVIGATION_MENU_ID = 'header-navigation-menu'
const THEME_TOGGLE_ARIA_LABEL = 'Toggle between dark and light mode'

function HeaderComponent(props: IHeaderProps) {
  const loadWithDarkTheme =
    useAppSelector((state) => state.theme.theme) === 'dark'
  const apiOnline = useAppSelector((state) => state.information.apiOnline)
  const dispatch = useAppDispatch()
  const isMobile = useMediaQuery('(max-width: 900px)')
  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(
    null
  )

  const menuOpen = menuAnchorElement !== null

  useEffect(() => {
    if (!isMobile) setMenuAnchorElement(null)
  }, [isMobile])

  const navigateTo = (page: LandingPages) => {
    dispatch(scrollTo(page))
    setMenuAnchorElement(null)
  }

  const themeSwitch = (labelledById?: string) => (
    <ThemeSwitch
      checked={loadWithDarkTheme}
      onChange={() => dispatch(toggleTheme())}
      inputProps={
        labelledById
          ? {
              'aria-label': THEME_TOGGLE_ARIA_LABEL,
              'aria-labelledby': labelledById,
            }
          : { 'aria-label': THEME_TOGGLE_ARIA_LABEL }
      }
    />
  )

  return (
    <HideOnScroll {...props}>
      <AppBar className="header">
        <Layout orientation="horizontal" spacing="fill">
          <Typography
            variant="h5"
            component="span"
            className="header-website-name"
          >
            {HEADER_WEBSITE_NAME}
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                className="header-menu-button"
                color="inherit"
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls={menuOpen ? NAVIGATION_MENU_ID : undefined}
                onClick={(event) => setMenuAnchorElement(event.currentTarget)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                id={NAVIGATION_MENU_ID}
                anchor="right"
                open={menuOpen}
                onClose={() => setMenuAnchorElement(null)}
                PaperProps={{
                  className: 'header-menu-paper',
                  role: 'dialog',
                  'aria-modal': true,
                  'aria-label': 'Navigation menu',
                }}
              >
                <div className="header-menu-header">
                  <Typography variant="h6" component="span">
                    {HEADER_WEBSITE_NAME}
                  </Typography>
                  <IconButton
                    className="header-menu-close-button"
                    color="inherit"
                    aria-label="Close navigation menu"
                    onClick={() => setMenuAnchorElement(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>

                <Divider />

                <nav
                  className="header-menu-nav"
                  aria-label="Main navigation"
                >
                  {NAVIGATION_ITEMS.map(({ title, page }) => (
                    <button
                      key={page}
                      type="button"
                      className="header-menu-nav-option"
                      onClick={() => navigateTo(page)}
                    >
                      {title}
                    </button>
                  ))}
                </nav>

                <Divider />

                <div className="header-menu-preferences">
                  <span id={DARK_MODE_LABEL_ID}>Dark mode</span>
                  {themeSwitch(DARK_MODE_LABEL_ID)}
                </div>

                <div className="header-menu-preferences">
                  <CustomIcon type="api-status" active={apiOnline} />
                </div>
              </Drawer>
            </>
          ) : (
            <Layout
              component="nav"
              aria-label="Main navigation"
              className="header-nav-container"
              orientation="horizontal"
              spacing="fill"
            >
              {NAVIGATION_ITEMS.map(({ title, page }) => (
                <button
                  key={page}
                  type="button"
                  className="header-nav-option"
                  onClick={() => navigateTo(page)}
                >
                  {title}
                </button>
              ))}

              {themeSwitch()}
              <CustomIcon type="api-status" active={apiOnline} />
            </Layout>
          )}
        </Layout>
      </AppBar>
    </HideOnScroll>
  )
}

export default HeaderComponent
