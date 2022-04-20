import { CircularProgress, Fade, Grow } from "@mui/material";
import React from 'react';

export interface ILoadingSpinnerProps {
    children: any;
    loaded: boolean;
}

function LoadingSpinnerComponent(props: ILoadingSpinnerProps) {
    return(
        <React.Fragment>
            <Fade in={!props.loaded} unmountOnExit>
                <CircularProgress/>
            </Fade>

            <Grow in={props.loaded} unmountOnExit>
                {props.children}
            </Grow>
        </React.Fragment>
    );
}

export default LoadingSpinnerComponent;