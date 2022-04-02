import './HomePageComponent.scss'
import IntroComponent from './intro/IntroComponent';

function HomePageComponent() {
    return(
        <div>
            <div id="intro">
                <IntroComponent></IntroComponent>
            </div>
        </div>
    )
}

export default HomePageComponent;