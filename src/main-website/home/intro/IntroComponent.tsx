import { Typography } from "@mui/material";
import './IntroComponent.scss'
import { introMessage, name, welcomeMessage } from "./IntroConstants";

function IntroComponent() {
    return(
        <div className='intro'>
            <img src="MyFace.png" className="profile-image"></img>
            <Typography variant="subtitle1" className='intro-message'>{introMessage}</Typography>
            <Typography variant="h2">{name}</Typography>
            <Typography variant="h5">{welcomeMessage}</Typography>
        </div>
    )
}

export default IntroComponent;