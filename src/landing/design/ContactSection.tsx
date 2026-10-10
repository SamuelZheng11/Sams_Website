import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../hooks'
import { SplitHeading } from './SplitHeading'
import { SiteFooter } from './SiteFooter'
import { CONTACT_INTRO } from './constants'

const GITHUB_BASE_URL = 'https://github.com'
const LINKED_IN_BASE_URL = 'https://www.linkedin.com'

const COPY_LABEL = 'to copy'
const COPIED_LABEL = 'Copied'

const toExternalUrl = (baseUrl: string, value?: string) =>
  value ? (value.startsWith('http') ? value : `${baseUrl}${value}`) : baseUrl

export function ContactSection() {
  const contact = useAppSelector((state) => state.information.bio?.contact)
  const email = contact?.email ?? 'sam@samuelzheng.com'
  const fullName =
    contact && contact.givenNames.length > 0
      ? `${contact.givenNames.join(' ')} ${contact.surname}`
      : 'Samuel Zheng'

  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    if (!contact?.email) return
    const confirmCopied = () => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    }
    try {
      navigator.clipboard.writeText(email).then(confirmCopied, () => {
        window.location.href = `mailto:${email}`
      })
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  const gitHubUrl = toExternalUrl(GITHUB_BASE_URL, contact?.gitHub)
  const linkedInUrl = toExternalUrl(LINKED_IN_BASE_URL, contact?.linkedIn)

  return (
    <section id="contact">
      <div className="container">
        <SplitHeading
          as="h2"
          segments={[{ text: "Let's build" }, { text: 'something.', em: true }]}
        />

        <p className="reveal">{CONTACT_INTRO}</p>

        <div className="mail-row reveal">
          <div className="btn btn--solid mail">
            <button
              className="copy-button"
              id="copy-button"
              type="button"
              aria-label={`Copy ${fullName}'s email address`}
              onClick={copyEmail}
            >
              <span>{email}</span>
              <small id="copy-hint">
                {copied ? (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {COPIED_LABEL}
                  </>
                ) : (
                  <>
                    <i className="hint-click">Click</i>
                    <i className="hint-tap">Tap</i> {COPY_LABEL}
                  </>
                )}
              </small>
            </button>
            <a
              className="mailto-button"
              id="mailto-link"
              href={`mailto:${email}`}
              aria-label={`Email ${fullName}`}
              title="Open in your email app"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="social-links reveal">
          <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link to="/travels">Travel log</Link>
          <Link to="/settlements">Settlement calculator</Link>
        </div>

        <div className="site-credit">
          <p className="credit">
            This website is developed and maintained wholly by me.
          </p>
          <p className="stack">
            Developed using React &amp; .Net | Deployed on AWS | Data hosted on
            MongoDB Cloud / S3 Buckets
          </p>
        </div>

        <SiteFooter />
      </div>
    </section>
  )
}
