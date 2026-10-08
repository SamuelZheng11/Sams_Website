import PersonIcon from '@mui/icons-material/Person'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Typography } from '@mui/material'

import { CONTACT_TITLE } from './ContactConstants'
import Layout from '../../core/layout/LayoutComponent'
import LoadingSpinnerComponent from '../../core/loading/LoadingSpinnerComponent'

import './ContactComponent.scss'
import { useAppSelector } from '../../hooks'

const GITHUB_BASE_URL = 'https://github.com'
const LINKED_IN_BASE_URL = 'https://www.linkedin.com'

const toExternalUrl = (baseUrl: string, value: string) =>
  /^https?:\/\//.test(value) ? value : `${baseUrl}${value}`

const toDisplayUrl = (value: string) => value.replace(/^https?:\/\//, '')

const toDialableNumber = (value: string) => value.replace(/[^\d+]/g, '')

function ContactComponent() {
  const contentLoaded = useAppSelector(
    (state) => state.information.websiteInfoLoaded
  )
  const contact = useAppSelector((state) => state.information.bio?.contact)

  const getFullnameFromContact = () => {
    return contact !== null
      ? `${contact?.givenNames.join(' ')} ${contact?.surname}`
      : ''
  }

  const gitHubUrl = toExternalUrl(GITHUB_BASE_URL, contact?.gitHub ?? '')
  const linkedInUrl = toExternalUrl(LINKED_IN_BASE_URL, contact?.linkedIn ?? '')

  return (
    <section className="contact" aria-labelledby="contact-title">
      <div className="contact-title-container">
        <Typography variant="h4" component="h2" id="contact-title">
          {CONTACT_TITLE}
        </Typography>
      </div>

      <LoadingSpinnerComponent loaded={contentLoaded}>
        <div>
          <Layout orientation="horizontal">
            <PersonIcon aria-hidden="true" />
            <Typography className="contact-detail-text">
              <span className="visually-hidden">Name: </span>
              {getFullnameFromContact()}
            </Typography>
          </Layout>
          <Layout orientation="horizontal">
            <MailOutlineIcon aria-hidden="true" />
            <Typography className="contact-detail-text">
              <span className="visually-hidden">Email: </span>
              <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
            </Typography>
          </Layout>
          <Layout orientation="horizontal">
            <LocationOnIcon aria-hidden="true" />
            <Typography className="contact-detail-text">
              <span className="visually-hidden">Location: </span>
              {contact?.location}
            </Typography>
          </Layout>
          <Layout orientation="horizontal">
            <GitHubIcon aria-hidden="true" />
            <Typography className="contact-detail-text">
              <span className="visually-hidden">GitHub: </span>
              <a href={gitHubUrl} rel="noopener noreferrer">
                {toDisplayUrl(gitHubUrl)}
              </a>
            </Typography>
          </Layout>
          <Layout orientation="horizontal">
            <LinkedInIcon aria-hidden="true" />
            <Typography className="contact-detail-text">
              <span className="visually-hidden">LinkedIn: </span>
              <a href={linkedInUrl} rel="noopener noreferrer">
                {toDisplayUrl(linkedInUrl)}
              </a>
            </Typography>
          </Layout>
        </div>
      </LoadingSpinnerComponent>
    </section>
  )
}

export default ContactComponent
