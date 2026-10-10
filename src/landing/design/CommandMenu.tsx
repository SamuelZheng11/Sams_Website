import { ReactNode, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { LandingPages } from '../LandingPageTypes'
import { scrollTo } from '../slice/LandingPageNavigationSlice'
import { SETTLEMENTS_ROUTE, TRAVELS_ROUTE } from '../header/HeaderConstants'
import { cyclePalette, toggleTheme } from '../../theme/slice/ThemeSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

interface ICommand {
  label: string
  group: string
  run: () => void
}

const GITHUB_BASE_URL = 'https://github.com'

// The Ctrl/Cmd + K command palette. Renders as a native <dialog> so focus
// trapping, Esc and the backdrop are free; typing filters, arrows move the
// selection and Enter runs the highlighted command.
export function CommandMenu() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const email = useAppSelector((state) => state.information.bio?.contact?.email)
  const gitHub = useAppSelector(
    (state) => state.information.bio?.contact?.gitHub
  )

  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [commands, setCommands] = useState<ICommand[]>([])

  const buildCommands = (): ICommand[] => {
    const goTo = (page: LandingPages) => () => {
      dispatch(scrollTo(page))
      if (pathname !== '/') navigate('/')
    }
    const goToRoute = (route: string) => () => navigate(route)

    const copyEmail = () => {
      if (!email) return
      try {
        navigator.clipboard.writeText(email).catch(() => {
          window.location.href = `mailto:${email}`
        })
      } catch {
        window.location.href = `mailto:${email}`
      }
    }

    const openGitHub = () => {
      window.open(
        `${GITHUB_BASE_URL}${gitHub ?? ''}`,
        '_blank',
        'noopener,noreferrer'
      )
    }

    return [
      { label: 'Go to Home', group: 'Section', run: goTo(LandingPages.home) },
      { label: 'Go to About', group: 'Section', run: goTo(LandingPages.about) },
      { label: 'Go to Work', group: 'Section', run: goTo(LandingPages.work) },
      {
        label: 'Go to Experience',
        group: 'Section',
        run: goTo(LandingPages.experience),
      },
      {
        label: 'Go to Projects',
        group: 'Section',
        run: goTo(LandingPages.products),
      },
      {
        label: 'Go to Contact',
        group: 'Section',
        run: goTo(LandingPages.contact),
      },
      {
        label: 'Toggle light / dark',
        group: 'Theme',
        run: () => dispatch(toggleTheme()),
      },
      {
        label: 'Switch accent colour',
        group: 'Theme',
        run: () => dispatch(cyclePalette()),
      },
      { label: 'Copy email address', group: 'Action', run: copyEmail },
      { label: 'Open GitHub', group: 'Link', run: openGitHub },
      { label: 'Travel log', group: 'Link', run: goToRoute(TRAVELS_ROUTE) },
      {
        label: 'Settlement calculator',
        group: 'Link',
        run: goToRoute(SETTLEMENTS_ROUTE),
      },
    ]
  }

  const open = () => {
    setQuery('')
    setCommands(buildCommands())
    setSelected(0)
    dialogRef.current?.showModal()
    inputRef.current?.focus()
  }

  const close = () => dialogRef.current?.close()

  const filtered = commands.filter((command) =>
    command.label.toLowerCase().includes(query.toLowerCase())
  )

  const run = (command: ICommand | undefined) => {
    if (!command) return
    close()
    window.setTimeout(() => command.run(), 60)
  }

  // The keyboard shortcut and the nav "Ctrl K" button live in one-off event
  // listeners, so call through a ref to always run the latest `open`.
  const openRef = useRef(open)
  useEffect(() => {
    openRef.current = open
  })

  useEffect(() => {
    const onGlobalKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (dialogRef.current?.open) close()
        else openRef.current()
      }
    }
    const onKbClick = () => openRef.current()
    const kbButton = document.getElementById('command-trigger')
    kbButton?.addEventListener('click', onKbClick)
    window.addEventListener('keydown', onGlobalKey)
    return () => {
      kbButton?.removeEventListener('click', onKbClick)
      window.removeEventListener('keydown', onGlobalKey)
    }
  }, [])

  const onInputKey = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((previous) => Math.min(previous + 1, filtered.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((previous) => Math.max(previous - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      run(filtered[selected])
    }
  }

  const rows: ReactNode[] =
    filtered.length > 0
      ? filtered.map((command, index) => (
          <li
            key={command.label}
            className={index === selected ? 'is-selected' : ''}
            data-i={index}
            onClick={() => run(filtered[index])}
          >
            <span>{command.label}</span>
            <small>{command.group}</small>
          </li>
        ))
      : [<li key="empty">No results</li>]

  return (
    <dialog
      ref={dialogRef}
      id="command-dialog"
      aria-label="Command menu"
      onClick={(event) => {
        if (event.target === dialogRef.current) close()
      }}
    >
      <input
        ref={inputRef}
        id="command-input"
        placeholder="Jump to a section or run a command..."
        autoComplete="off"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setSelected(0)
        }}
        onKeyDown={onInputKey}
      />
      <ul id="command-list">{rows}</ul>
    </dialog>
  )
}
