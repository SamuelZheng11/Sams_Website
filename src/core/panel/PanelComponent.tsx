import { ReactElement } from "react"
import { Size } from "../types"
import "./PanelComponent.scss"

export interface PanelProps {
    children?: ReactElement | ReactElement[]
    size?: Size
}

function PanelComponent(props: PanelProps) {

    return (
        <div className="panel" >
            {props.children}
        </div>
    )
}

export default PanelComponent