import PanelComponent from '../../core/panel/PanelComponent';
import TextComponent from '../../core/text/TextComponent';

function HomePageComponent() {
    return(
        <div>
            <PanelComponent size="medium">
                <TextComponent>Hello this is the home page welcome</TextComponent>
            </PanelComponent>
        </div>
    )
}

export default HomePageComponent;