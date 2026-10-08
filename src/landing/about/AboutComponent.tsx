import { Typography } from '@mui/material'

import LoadingSpinnerComponent from '../../core/loading/LoadingSpinnerComponent'
import { ABOUT_TITLE } from './AboutConstants'

import './AboutComponent.scss'
import { useAppSelector } from '../../hooks'

function AboutComponent() {
  const contentLoaded = useAppSelector(
    (state) => state.information.websiteInfoLoaded
  )
  const aboutMe = useAppSelector((state) => state.information.bio?.aboutMe)

  // The bio holds the CV summary and the personal narrative as one string,
  // separated by a blank line, rendered as two paragraphs.
  const paragraphs = aboutMe?.split(/\n\s*\n/) ?? []

  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about-title-container">
        <Typography variant="h3" component="h2" id="about-title">
          {ABOUT_TITLE}
        </Typography>
      </div>

      <div className="about-body-container">
        <LoadingSpinnerComponent loaded={contentLoaded}>
          <div>
            {paragraphs.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                className={
                  index === 0
                    ? 'about-body-text about-body-summary'
                    : 'about-body-text'
                }
              >
                {paragraph}
              </Typography>
            ))}
          </div>
        </LoadingSpinnerComponent>
      </div>
    </section>
  )
}

export default AboutComponent
