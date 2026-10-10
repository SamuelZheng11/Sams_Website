import { CSSProperties, useRef } from 'react'

import { useAppSelector } from '../../hooks'
import { SplitHeading } from './SplitHeading'
import { LanyardBadge } from './LanyardBadge'
import { usePointerSpotlight } from './design.hooks'
import { HERO_TAGLINE } from './constants'
import { scrollToSection } from './scroll'

// The full-viewport hero: accent background with a pointer-tracked grid
// spotlight, the masked headline on the left and the draggable lanyard ID
// badge on the right.
export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  const contact = useAppSelector((state) => state.information.bio?.contact)
  const location = contact?.location ?? 'Sydney, Australia'

  usePointerSpotlight()

  return (
    <section id="home" ref={heroRef}>
      <div className="container">
        <div className="hero-copy">
          <div className="eyebrow reveal">Software engineer / {location}</div>

          <SplitHeading
            as="h1"
            split
            segments={[
              { text: 'Meet Sam' },
              { text: 'the', em: true, stack: true },
              { text: 'engineer.' },
            ]}
          />

          <p className="reveal" style={{ '--delay': '300ms' } as CSSProperties}>
            {HERO_TAGLINE}
          </p>

          <div
            className="hero-actions reveal"
            style={{ '--delay': '400ms' } as CSSProperties}
          >
            <a
              className="btn btn--solid"
              href="#work"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('work')
              }}
            >
              View my work
            </a>
            <a
              className="btn"
              href="#contact"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('contact')
              }}
            >
              Get in touch
            </a>
          </div>

          <button
            className="scroll-cue reveal"
            style={{ '--delay': '500ms' } as CSSProperties}
            data-go="#about"
            type="button"
            onClick={() => scrollToSection('about')}
          >
            SCROLL <b>&darr;</b>
          </button>
        </div>

        <LanyardBadge heroRef={heroRef} />
      </div>
    </section>
  )
}
