export interface TextComponentProps {
    textToDisplay: string
};

function TextComponent(textComponentProps: TextComponentProps) {
    return(
        <div>{textComponentProps.textToDisplay}</div>
    )
}

export default TextComponent;