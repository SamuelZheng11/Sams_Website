import PanelComponent from '../../core/panel/PanelComponent';
import TextComponent from '../../core/text/TextComponent';
import './HomePageComponent.scss'

function HomePageComponent() {
    return(
        <div className='home-page'>
            <img src="MyFace.jpg" className="profile-image"></img>
            <PanelComponent size="medium">
                <TextComponent>Hello this is the home page welcome</TextComponent>
            </PanelComponent>
        </div>
    )
}

export default HomePageComponent;