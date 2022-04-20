import { TSize } from "../CoreTypes"

import "./PanelComponent.scss"

export interface PanelProps {
    className?: string | string[],
    children?: any,
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