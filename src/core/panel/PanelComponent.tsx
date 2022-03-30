import { ReactElement } from "react"
import { Size } from "../types"
import "./PanelComponent.scss"

export interface PanelProps {
    children?: ReactElement
    size?: Size
}

function PanelComponent(props: PanelProps) {

    return (
        <div className="panel" >
            hello
            {props.children}
        </div>
    )
}

export default PanelComponent