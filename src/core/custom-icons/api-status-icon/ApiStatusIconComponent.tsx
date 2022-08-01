import { Circle } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import React from "react";
import Layout from "../../layout/LayoutComponent";

import "./ApiStatusIconComponent.scss"

export interface ApiStatusProps {
    online?: boolean
}

const ONLINE_TEXT = "Online"
const OFFLINE_TEXT = "Offline"

function ApiStatusIcon(props: ApiStatusProps) {
    return (
        <React.Fragment>
            <Layout className="api-status-icon" orientation="horizontal">
                <Circle className={`${props.online ? 'online' : 'offline'}`}></Circle>
                <Typography className="api-status-icon-text" variant="body2" >API - {props.online ? ONLINE_TEXT : OFFLINE_TEXT}</Typography>
            </Layout>
        </React.Fragment>
    )
}

export default ApiStatusIcon