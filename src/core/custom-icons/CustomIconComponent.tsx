import React from "react";
import ApiStatusIcon from "./api-status-icon/ApiStatusIconComponent";

import "./CustomIconComponent.scss"

export interface CustomIconProps {
    className?: string | string[],
    type?: CustomIconType,
    active?: boolean,
}

export type CustomIconType = 'api-status';

function CustomIcon(props: CustomIconProps) {

    const getCustomIcon = (type?: CustomIconType, active?: boolean) => {
        switch(type) {
            case 'api-status': 
                return (
                    <React.Fragment>
                        <ApiStatusIcon online={active}></ApiStatusIcon>
                    </React.Fragment>
                )

            default:
                return (<div>Unrecognised Custom Icon Type</div>);
        }
    }

    return (
        <div className={`customIcon online ${props.className}`}>
            {getCustomIcon(props.type, props.active)}
        </div>
    )
}

export default CustomIcon