import { RefObject, useEffect, useMemo, useState } from 'react'

// Marks the document as JS-powered so reveal styles (`.js .reveal`) apply. The
// animations themselves are neutralised by the `prefers-reduced-motion` CSS.
export const useJsClass = () => {
  useEffect(() => {
    document.documentElement.classList.add('js')
  }, [])
}

// Tracks the pointer over any `.spotlight` element (bento tiles, cards) and publishes
// the cursor position as `--spot-x` / `--spot-y` for the radial accent spotlight.
export const usePointerSpotlight = () => {
  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      const spotlight = event.target as HTMLElement
      const fx = spotlight.closest && spotlight.closest('.spotlight')
      if (fx && fx instanceof HTMLElement) {
        const r = fx.getBoundingClientRect()
        fx.style.setProperty('--spot-x', `${event.clientX - r.left}px`)
        fx.style.setProperty('--spot-y', `${event.clientY - r.top}px`)
      }
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => window.removeEventListener('pointermove', onPointer)
  }, [])
}

// Reveal-on-scroll: turns on `.visible` for every `.reveal` / `.split` element as it
// enters the viewport. `ready` is used to (re)observe once async content has
// been fetched from the API / S3 so late-mounted sections are not left hidden.
export const useScrollReveal = (ready = true) => {
  useEffect(() => {
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !ready
    ) {
      return
    }

    const observed = new Set<HTMLElement>()
    let mutationObserver: MutationObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null

    const observeAll = () => {
      document
        .querySelectorAll<HTMLElement>('.reveal, .split')
        .forEach((el) => {
          if (el.classList.contains('in') || observed.has(el)) return
          observed.add(el)
          intersectionObserver?.observe(el)
        })
    }

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            intersectionObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    observeAll()
    mutationObserver = new MutationObserver(observeAll)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver?.disconnect()
      intersectionObserver?.disconnect()
      observed.clear()
    }
  }, [ready])
}

// Counts a `<[data-to]>` element up from 0 to its target once it is 60% in
// view, using the reference's 1.5s ease-out-cubic curve.
export const useCounter = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const animate = () => {
      const to = Number(el.dataset.to || 0)
      if (reduceMotion) {
        el.textContent = (el.dataset.pre || '') + to + (el.dataset.suf || '')
        return
      }
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1500, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent =
          (el.dataset.pre || '') +
          Math.round(to * eased) +
          (el.dataset.suf || '')
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            animate()
          }
        })
      },
      { threshold: 0.6 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

// The local time shown in the status tile and the footer, refreshed every 30s.
export const useLocalClock = (timeZone: string) => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      let next: string
      try {
        next = new Intl.DateTimeFormat([], {
          hour: 'numeric',
          minute: '2-digit',
          timeZone,
        }).format(new Date())
      } catch {
        next = new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        })
      }
      setTime(next)
    }
    tick()
    const id = window.setInterval(tick, 30000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}

// Scales the nav's progress bar (`#scroll-progress`) with vertical scroll.
export const useScrollProgress = () => {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    let raf = 0
    const update = () => {
      raf = 0
      const height = document.documentElement.scrollHeight - window.innerHeight
      bar.style.transform =
        'scaleX(' +
        (height > 0 ? Math.min(window.scrollY / height, 1) : 0) +
        ')'
    }
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])
}

// Fills the experience timeline line (`--progress`) as it scrolls through the viewport.
export const useTimelineFill = (timelineRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const tl = timelineRef.current
    if (!tl) return

    let raf = 0
    const update = () => {
      raf = 0
      const r = tl.getBoundingClientRect()
      const p = Math.max(
        0,
        Math.min((window.innerHeight * 0.65 - r.top) / r.height, 1)
      )
      tl.style.setProperty('--progress', String(p))
    }
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [timelineRef])
}

// Replaces the "Ctrl K" nav hint with "⌘ K" on Apple platforms.
export const useShortcutLabel = () => {
  return useMemo(
    () => (/(Mac|iPhone|iPad)/.test(navigator.platform) ? '⌘ K' : 'Ctrl K'),
    []
  )
}
