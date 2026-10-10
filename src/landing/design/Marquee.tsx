import { Fragment } from 'react'

import { MARQUEE_ITEMS } from './constants'

// The infinite accent marquee band that separates the hero from About. The
// track is rendered twice so the CSS `translateX(-50%)` loop is seamless.
export function Marquee() {
  const track = () =>
    MARQUEE_ITEMS.flatMap((item, index) => [
      <span key={`${item}-${index}`}>{item}</span>,
      <span key={`sep-${index}`}>/</span>,
    ])

  return (
    <div className="marquee" aria-hidden="true">
      <div>
        <Fragment key="copy-a">{track()}</Fragment>
        <Fragment key="copy-b">{track()}</Fragment>
      </div>
    </div>
  )
}
