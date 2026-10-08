import { Typography } from '@mui/material'

import { introMessage, name, welcomeMessage } from './IntroConstants'

import './IntroComponent.scss'

function IntroComponent() {
  return (
    <section className="intro" aria-labelledby="intro-name">
      <img
        src="MyFace.png"
        alt="Portrait of Sam"
        className="profile-image"
        width={250}
        height={250}
      />
      <Typography
        variant="subtitle1"
        component="p"
        className="intro-message"
      >
        {introMessage}
      </Typography>
      <Typography variant="h2" component="h1" id="intro-name">
        {name}
      </Typography>
      <Typography variant="h5" component="p">
        {welcomeMessage}
      </Typography>
    </section>
  )
}

export default IntroComponent