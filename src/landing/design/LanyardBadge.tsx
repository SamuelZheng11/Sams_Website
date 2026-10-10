import { CSSProperties, RefObject, useEffect, useRef } from 'react'

import { useAppSelector } from '../../hooks'
import { HERO_BADGE_SHIPPED_TAG, HERO_BADGE_TAGS, HERO_ROLE } from './constants'

interface ILanyardBadgeProps {
  // The hero section element, used to bound the pointer-driven 3D tilt.
  heroRef: RefObject<HTMLElement>
}

const photoPath = `${process.env.PUBLIC_URL}/MyFace.png`

// The interactive lanyard ID badge shown in the hero. The badge swings in on
// load, can be grabbed and dragged to swing on its lanyard, and tilts in 3D
// with the pointer, with an accent glare that follows the cursor.
export function LanyardBadge({ heroRef }: ILanyardBadgeProps) {
  const location = useAppSelector(
    (state) => state.information.bio?.contact?.location
  )
  const lanyardRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({
    active: false,
    startX: 0,
    dx: 0,
    range: 0,
    timers: [] as number[],
  })

  useEffect(() => {
    const hero = heroRef.current
    const lanyard = lanyardRef.current
    const badge = badgeRef.current
    if (!hero || !lanyard || !badge) return

    // Tilt the badge (and move the hero grid spotlight) with the pointer.
    const onPointer = (event: PointerEvent) => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (reduceMotion || event.pointerType === 'touch') return
      if (dragRef.current.active) return

      const h = hero.getBoundingClientRect()
      if (h.bottom > 0) {
        hero.style.setProperty('--spot-x', `${event.clientX - h.left}px`)
        hero.style.setProperty('--spot-y', `${event.clientY - h.top}px`)
        const x = event.clientX / window.innerWidth - 0.5
        const y = (event.clientY - h.top) / h.height - 0.5
        badge.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 12}deg)`
        const b = badge.getBoundingClientRect()
        badge.style.setProperty(
          '--glare-x',
          `${((event.clientX - b.left) / b.width) * 100}%`
        )
        badge.style.setProperty(
          '--glare-y',
          `${((event.clientY - b.top) / b.height) * 100}%`
        )
      }
    }

    window.addEventListener('pointermove', onPointer, { passive: true })

    // Drag-to-swing: grabbing the badge and pulling it sideways rotates the
    // whole lanyard around its pivot, then it settles back with a light catch.
    const drag = dragRef.current
    const computeAngle = () => {
      // The lanyard rotates around its pivot above the badge, so moving the
      // pointer right must rotate counter-clockwise (negative) to swing the
      // badge to the right.
      const angle = -(drag.dx * drag.range) / 140
      return Math.max(-drag.range, Math.min(drag.range, angle))
    }
    const clearSettle = () => {
      drag.timers.forEach((id) => window.clearTimeout(id))
      drag.timers.length = 0
    }
    const schedule = (fn: () => void, ms: number) => {
      drag.timers.push(window.setTimeout(fn, ms))
    }

    const endDrag = (animate: boolean) => {
      if (!drag.active) return
      drag.active = false
      const angle = computeAngle()
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (!animate || reduceMotion || Math.abs(angle) < 0.5) {
        lanyard.style.transition = 'none'
        lanyard.style.transform = ''
        return
      }

      lanyard.style.transition = 'transform 240ms ease-out'
      lanyard.style.transform = 'rotate(0deg)'
      schedule(() => {
        lanyard.style.transition = 'transform 140ms ease-out'
        lanyard.style.transform = `rotate(${-angle * 0.12}deg)`
        schedule(() => {
          lanyard.style.transition = 'transform 200ms ease'
          lanyard.style.transform = 'rotate(0deg)'
          schedule(() => {
            lanyard.style.transition = 'none'
            lanyard.style.transform = ''
          }, 210)
        }, 140)
      }, 240)
    }

    const onDragDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return
      clearSettle()
      const swingRange = parseFloat(
        getComputedStyle(lanyard).getPropertyValue('--swing-angle')
      )
      drag.active = true
      drag.startX = event.clientX
      drag.dx = 0
      drag.range = (Number.isFinite(swingRange) ? swingRange : 1.4) * 3
      lanyard.classList.remove('swing')
      lanyard.style.transition = 'none'
    }

    const onDragMove = (event: PointerEvent) => {
      if (!drag.active) return
      drag.dx = event.clientX - drag.startX
      lanyard.style.transform = `rotate(${computeAngle()}deg)`
    }

    const onDragEnd = (event: PointerEvent) => {
      if (!drag.active) return
      // Even an interrupted drag (pointercancel) settles back smoothly.
      endDrag(event.type === 'pointerup' || event.type === 'pointercancel')
    }

    badge.addEventListener('pointerdown', onDragDown)
    window.addEventListener('pointermove', onDragMove)
    window.addEventListener('pointerup', onDragEnd)
    window.addEventListener('pointercancel', onDragEnd)

    return () => {
      clearSettle()
      badge.removeEventListener('pointerdown', onDragDown)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointermove', onDragMove)
      window.removeEventListener('pointerup', onDragEnd)
      window.removeEventListener('pointercancel', onDragEnd)
    }
  }, [heroRef])

  const displayLocation = location ?? 'Sydney, Australia'

  return (
    <div
      className="badge-stage reveal"
      style={{ '--delay': '150ms' } as CSSProperties}
    >
      <div className="lanyard swing" ref={lanyardRef}>
        <div className="strap">
          <svg viewBox="0 0 700 1660" aria-hidden="true" focusable="false">
            <defs>
              <pattern
                id="wv"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="4" height="4" fill="#15121d" />
                <rect width="2" height="4" fill="#fff" fill-opacity=".055" />
              </pattern>
              <linearGradient id="badgegrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#7d8494" />
                <stop offset=".25" stop-color="#f2f4f8" />
                <stop offset=".55" stop-color="#b3b9c6" />
                <stop offset=".85" stop-color="#eef0f5" />
                <stop offset="1" stop-color="#7d8494" />
              </linearGradient>
            </defs>
            <polygon
              points="166.3,0 192.3,0 350.0,1500 324.0,1500"
              fill="url(#wv)"
            />
            <polygon
              points="507.7,0 533.7,0 376.0,1500 350.0,1500"
              fill="url(#wv)"
            />
            <g fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1">
              <path d="M166.3 0L324.0 1500M192.3 0L350.0 1500M507.7 0L350.0 1500M533.7 0L376.0 1500" />
            </g>
            <g
              fill="none"
              stroke="#fff"
              stroke-opacity=".26"
              stroke-width="1"
              stroke-dasharray="4 4"
            >
              <path d="M169.8 0L327.5 1500M188.8 0L346.5 1500M511.2 0L353.5 1500M530.2 0L372.5 1500" />
            </g>
            <g
              font-family="'JetBrains Mono',ui-monospace,monospace"
              font-size="10.5"
              font-weight="500"
              letter-spacing="1.8"
              fill="#fff"
              fill-opacity=".82"
              dominant-baseline="central"
            >
              <text transform="translate(337.0,1476) rotate(-96.00)">
                SZ / SOFTWARE ENGINEER / SZ / SOFTWARE ENGINEER / SZ / SOFTWARE
                ENGINEER / SZ / SOFTWARE ENGINEER / SZ / SOFTWARE ENGINEER / SZ
                / SOFTWARE ENGINEER / SZ / SOFTWARE ENGINEER / SZ / SOFTWARE
                ENGINEER / SZ / SOFTWARE ENGINEER /{' '}
              </text>
              <text transform="translate(363.0,1476) rotate(-84.00)">
                SZ / SOFTWARE ENGINEER / SZ / SOFTWARE ENGINEER / SZ / SOFTWARE
                ENGINEER / SZ / SOFTWARE ENGINEER / SZ / SOFTWARE ENGINEER / SZ
                / SOFTWARE ENGINEER / SZ / SOFTWARE ENGINEER / SZ / SOFTWARE
                ENGINEER / SZ / SOFTWARE ENGINEER /{' '}
              </text>
            </g>
            <rect
              x="318"
              y="1476"
              width="64"
              height="38"
              rx="9"
              fill="url(#badgegrad)"
              stroke="#59606f"
              stroke-width=".8"
            />
            <path
              d="M323 1488H377M323 1501H377"
              stroke="#59606f"
              stroke-opacity=".55"
              stroke-width=".9"
            />
            <path
              d="M324 1480H376"
              stroke="#fff"
              stroke-opacity=".8"
              stroke-width="1.2"
              stroke-linecap="round"
            />
            <rect
              x="343"
              y="1510"
              width="14"
              height="22"
              rx="5"
              fill="url(#badgegrad)"
              stroke="#59606f"
              stroke-width=".7"
            />
            <path
              d="M344 1521H356"
              stroke="#59606f"
              stroke-opacity=".6"
              stroke-width=".8"
            />
            <ellipse
              cx="350"
              cy="1542"
              rx="9"
              ry="11"
              fill="none"
              stroke="url(#badgegrad)"
              stroke-width="4"
            />
          </svg>
        </div>
        <div className="badge" id="badge" ref={badgeRef} title="Drag to swing">
          <svg
            className="hook"
            viewBox="0 0 40 84"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="hkm" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#7d8494" />
                <stop offset=".3" stop-color="#f2f4f8" />
                <stop offset=".6" stop-color="#b3b9c6" />
                <stop offset=".9" stop-color="#eef0f5" />
                <stop offset="1" stop-color="#7d8494" />
              </linearGradient>
              <linearGradient id="hki" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#000" stop-opacity="0" />
                <stop offset="1" stop-color="#000" stop-opacity=".6" />
              </linearGradient>
            </defs>
            <ellipse
              cx="20"
              cy="66.5"
              rx="10"
              ry="3"
              fill="#000"
              fill-opacity=".1"
            />
            <rect
              x="16"
              y="0"
              width="8"
              height="76"
              rx="4"
              fill="url(#hkm)"
              stroke="#59606f"
              stroke-width=".6"
            />
            <rect x="16" y="66" width="8" height="10" rx="4" fill="url(#hki)" />
            <path
              d="M18.2 3V62"
              stroke="#fff"
              stroke-opacity=".75"
              stroke-width="1.2"
              stroke-linecap="round"
              fill="none"
            />
          </svg>
          <div className="badge-photo">
            <img src={photoPath} alt={'Sam Zheng'} draggable={false} />
          </div>
          <div>
            <div className="badge-name">Sam Zheng</div>
            <div className="badge-role">
              {HERO_ROLE} / {displayLocation}
            </div>
          </div>
          <div className="badge-tags">
            {HERO_BADGE_TAGS.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
            <span className="badge-shipped">{HERO_BADGE_SHIPPED_TAG}</span>
          </div>
          <div className="badge-barcode"></div>
        </div>
      </div>
    </div>
  )
}
