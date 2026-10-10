import { CSSProperties, useRef } from 'react'

import { useAppSelector } from '../../hooks'
import { SplitHeading } from './SplitHeading'
import { useCounter, useLocalClock } from './design.hooks'
import {
  LOCATION_TIMEZONE,
  OPEN_TO_WORK_ROLES,
  STAT_TILES,
  STACK_CHIPS,
} from './constants'

interface IStatTileProps {
  value: number
  prefix: string
  suffix: string
  label: string
  delay: string
}

function StatTile({ value, prefix, suffix, label, delay }: IStatTileProps) {
  const numberRef = useRef<HTMLDivElement>(null)
  useCounter(numberRef)

  return (
    <div
      className="tile spotlight span-2 reveal"
      style={{ '--delay': delay } as CSSProperties}
    >
      <div
        className="stat-number"
        data-to={value}
        data-pre={prefix}
        data-suf={suffix}
        ref={numberRef}
      >
        {prefix}
        {value}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

// The bento grid: a bio lead tile, an availability + clock tile, a muted
// trailing-note tile for any further About paragraphs, three count-up stat
// tiles and a stack-chips tile. All the copy is pulled from the S3 bio or the
// design constants.
export function AboutSection() {
  const aboutMe = useAppSelector((state) => state.information.bio?.aboutMe)
  const location = useAppSelector(
    (state) => state.information.bio?.contact?.location
  )
  const time = useLocalClock(LOCATION_TIMEZONE)

  const [lede, ...notes] = aboutMe?.split(/\n\s*\n/).filter(Boolean) ?? []

  return (
    <section id="about">
      <div className="container">
        <div className="eyebrow reveal">01 / About</div>

        <SplitHeading
          as="h2"
          segments={[{ text: 'Who I' }, { text: 'am.', em: true }]}
        />

        <div className="bento-grid">
          <div className="tile spotlight span-4 reveal">
            <p className="bio">{lede ?? ''}</p>
          </div>

          <div
            className="tile spotlight span-2 status-tile reveal"
            style={{ '--delay': '80ms' } as CSSProperties}
          >
            <div>
              <span className="dot"></span>
              <strong>Open to work</strong>
              <small>{OPEN_TO_WORK_ROLES}</small>
            </div>
            <small>
              {location} / <span className="clock">{time}</span> local time
            </small>
          </div>

          {notes.length > 0 && (
            <div className="tile spotlight span-6 reveal">
              <p className="bio bio-note">{notes.join(' ')}</p>
            </div>
          )}

          {STAT_TILES.map((stat, index) => (
            <StatTile
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              delay={`${index * 80}ms`}
            />
          ))}

          <div className="tile spotlight span-6 reveal">
            <div className="chips">
              {STACK_CHIPS.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
