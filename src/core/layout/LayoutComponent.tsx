import { LayoutOrientation } from "./LayoutTypes";

export interface LayoutProps {
    orientation: LayoutOrientation
}

function Layout(props: LayoutProps) {
    const getLayoutContainer = () => {
        switch(props.orientation) {
            case 'horizontal':
                return(
                    <div className="layout-vertical-container">

                    </div>
                );

            case 'vertical':
                return(
                    <div className="layout-horizontal-container"></div>
                );

            default:
                return(
                    <div></div>
                );
        }
    }

    return getLayoutContainer()
}

export default Layout;