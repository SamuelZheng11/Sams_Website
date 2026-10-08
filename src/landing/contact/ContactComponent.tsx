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
              {contact?.email}
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
              {contact?.gitHub}
            </Typography>
          </Layout>
          <Layout orientation="horizontal">
            <LinkedInIcon aria-hidden="true" />
            <Typography className="contact-detail-text">
              <span className="visually-hidden">LinkedIn: </span>
              {contact?.linkedIn}
            </Typography>
          </Layout>
        </div>
      </LoadingSpinnerComponent>
    </section>
  )
}

export default ContactComponent