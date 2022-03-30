export interface TextComponentProps {
    children: string
};

function TextComponent(textComponentProps: TextComponentProps) {
    return(
        <div>{textComponentProps.children}</div>
    )
}

export default TextComponent;