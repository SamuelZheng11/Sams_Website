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

  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about-title-container">
        <Typography variant="h3" component="h2" id="about-title">
          {ABOUT_TITLE}
        </Typography>
      </div>

      <div className="about-body-container">
        <LoadingSpinnerComponent loaded={contentLoaded}>
          <Typography variant="body1" className="about-body-text">
            {aboutMe}
          </Typography>
        </LoadingSpinnerComponent>
      </div>
    </section>
  )
}

export default AboutComponent