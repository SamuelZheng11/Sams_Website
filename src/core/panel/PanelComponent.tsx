import { ReactElement } from "react"
import { TSize } from "../CoreTypes"
import "./PanelComponent.scss"

export interface PanelProps {
    className?: string | string[],
    children?: ReactElement | ReactElement[],
    size?: TSize
}

function Panel(props: PanelProps) {

    return (
        <div className={`panel ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Panel