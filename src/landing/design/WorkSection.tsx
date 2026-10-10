import { CSSProperties } from 'react'

import { useAppSelector } from '../../hooks'
import { SplitHeading } from './SplitHeading'

interface IProjectVisualProps {
  index: number
}

// The three static visual treatments the reference ships: bars, a trend line
// and a progress ring. They are distributed across the cards by index and
// animate when the card is revealed.
function ProjectVisual({ index }: IProjectVisualProps) {
  if (index % 3 === 1) {
    return (
      <svg
        viewBox="0 0 300 110"
        preserveAspectRatio="none"
        role="img"
        aria-label="Trend line"
      >
        <polyline
          className="trend-line"
          pathLength={1}
          points="4,98 44,86 84,92 124,64 164,70 204,40 244,46 296,10"
        />
      </svg>
    )
  }

  if (index % 3 === 2) {
    return (
      <svg
        viewBox="0 0 100 100"
        style={{ maxHeight: '100%', width: 'auto' }}
        role="img"
        aria-label="Progress ring"
      >
        <circle
          className="progress-ring"
          cx="50"
          cy="50"
          r="40"
          style={{ stroke: 'var(--line)' }}
        />
        <circle
          className="progress-ring progress-ring--active"
          cx="50"
          cy="50"
          r="40"
          pathLength={100}
          transform="rotate(-90 50 50)"
        />
      </svg>
    )
  }

  return (
    <div className="chart-bars" role="img" aria-label="Bar chart">
      {[28, 40, 36, 58, 74, 100].map((height, bar) => (
        <i
          key={height}
          style={
            {
              '--bar-height': `${height}%`,
              '--bar-index': bar % 6,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

// The things-I've-shipped catalogue rendered as cards: each row from the S3
// products blob becomes a tile with its platform / status / tags as pills, its
// name and one-line summary, and a link out to the live product.
export function WorkSection() {
  const productsShipped = useAppSelector(
    (state) => state.information.productsShipped
  )
  const products = productsShipped?.products ?? []

  // Product images may be absolute S3 URLs or bare keys relative to the bucket.
  const resolveImage = (image?: string) => {
    if (!image) return null
    if (/^https?:\/\//i.test(image)) return image
    const base = process.env.REACT_APP_S3_URI ?? ''
    if (!base) return image
    return `${base.replace(/\/$/, '')}/${image.replace(/^\//, '')}`
  }

  return (
    <section id="work" style={{ background: 'var(--surface-muted)' }}>
      <div className="container">
        <div className="eyebrow reveal">02 / Selected work</div>

        <SplitHeading
          as="h2"
          segments={[{ text: "Things I've" }, { text: 'shipped.', em: true }]}
        />

        <div className="work-scroll">
          {products.map((product, index) => {
            const chips = (product.tags ?? []).filter((chip): chip is string =>
              Boolean(chip)
            )

            return (
              <a
                key={product.name}
                className="tile spotlight product-card reveal"
                style={{ '--delay': `${index * 100}ms` } as CSSProperties}
                href={product.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`product-visual${
                    product.image ? ' product-visual-image' : ''
                  }`}
                >
                  {product.image ? (
                    <img
                      src={resolveImage(product.image) ?? undefined}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <ProjectVisual index={index} />
                  )}
                </div>
                {chips.length > 0 && (
                  <div className="chips">
                    {chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                )}
                <h3>{product.name}</h3>
                {product.summary && <p>{product.summary}</p>}
                <span className="product-cta">
                  Open product <i>&rarr;</i>
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
