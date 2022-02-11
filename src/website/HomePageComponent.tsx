import TextComponent from '../core/text/TextComponent';

function HomePageComponent() {
    const textToDisplay = 'Hello World';

    return(
        <div>
            <TextComponent textToDisplay={textToDisplay}></TextComponent>
        </div>
    )
}

export default HomePageComponent;