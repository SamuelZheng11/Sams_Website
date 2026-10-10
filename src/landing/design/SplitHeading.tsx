import { CSSProperties, Fragment } from 'react'

export interface ISplitSegment {
  text: string
  em?: boolean
  /** Force this segment onto its own line at smaller breakpoints. */
  stack?: boolean
}

export interface ISplitHeadingProps {
  as: 'h1' | 'h2'
  segments: ISplitSegment[]
  id?: string
  className?: string
  /** Per-word masked wrappers with a staggered word-by-word rise on reveal. */
  split?: boolean
}

// Headings render inside a single masked container that rises from behind a
// clip on reveal, so word spacing is ordinary browser text flow. With `split`,
// each word gets its own mask and rises on a `--stagger` stagger delay, exactly like
// the reference's `[data-split]` processing. Screen readers get the full,
// unmasked text via `aria-label`.
export function SplitHeading({
  as: Tag,
  segments,
  id,
  className,
  split,
}: ISplitHeadingProps) {
  const ariaLabel = segments.map((s) => s.text.trim()).join(' ')

  let content: React.ReactNode
  if (split) {
    let index = -1
    const words = segments.flatMap((segment) =>
      segment.text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => {
          index += 1
          return {
            stack: segment.stack,
            node: (
              <span className="word" aria-hidden="true" key={index}>
                <span style={{ '--stagger': index } as CSSProperties}>
                  {segment.em ? <em>{word}</em> : word}
                </span>
              </span>
            ),
          }
        })
    )
    content = words.map((word, i) => (
      <Fragment key={i}>
        <span
          className={`split-word${word.stack ? ' split-block' : ''}`}
          aria-hidden="true"
        >
          {word.node}
        </span>{' '}
      </Fragment>
    ))
  } else {
    content = (
      <span className="word" aria-hidden="true">
        <span>
          {segments.map((segment, si) => (
            <Fragment key={si}>
              {si > 0 ? ' ' : ''}
              {segment.em ? (
                <em>{segment.text.trim()}</em>
              ) : (
                segment.text.trim()
              )}
            </Fragment>
          ))}
        </span>
      </span>
    )
  }

  return (
    <Tag
      id={id}
      className={`split${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
    >
      {content}
    </Tag>
  )
}
