import { Typography } from "@mui/material";
import TextComponent from "../../../core/text/TextComponent";
import './IntroComponent.scss'

function IntroComponent() {
    return(
        <div className='intro'>
            <img src="MyFace.jpg" className="profile-image"></img>
            <Typography>Hi there! I'm</Typography>
            <TextComponent>Sam Zheng</TextComponent>
            <TextComponent>Welcome to my Website</TextComponent>
        </div>
    )
}

export default IntroComponent;