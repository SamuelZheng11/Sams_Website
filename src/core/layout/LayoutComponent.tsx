import { ReactElement } from "react";
import { LayoutOrientation, LayoutSpacing } from "./LayoutTypes";
import './LayoutComponent.scss';

export interface LayoutProps {
    children?: ReactElement[];
    orientation: LayoutOrientation;
    spacing: LayoutSpacing;
}

function Layout(props: LayoutProps) {
    return(
        <div className={`layout ${props.orientation === 'horizontal' ? 'layout-horizontal-container' : 'layout-vertical-container'} layout-spacing-${props.spacing}`}>
            {props.children}
        </div>
    )
}

export default Layout;