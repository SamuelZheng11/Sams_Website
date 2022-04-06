import { Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

import Layout from '../../core/layout/LayoutComponent';
import Panel from '../../core/panel/PanelComponent';

import './EmploymentComponent.scss'

const EMPLOYMENT_TITLE = 'Employment History';

function EmploymentComponent() {
    return(
        <Layout orientation='vertical' className="employment">
            <div className="employment-title-container">
                <Typography variant='h2'>
                    {EMPLOYMENT_TITLE}
                </Typography>
            </div>

            <Panel className="employment-card">
                    <Layout orientation='horizontal'>
                        <a href="https://wooliesx.com.au/">
                            <Layout className="employment-card-title-container" orientation='horizontal'>
                                <Typography variant="h4">WooliesX</Typography>
                                <Typography variant="subtitle1">(since 2020)</Typography>
                                <LaunchIcon></LaunchIcon>
                            </Layout>
                        </a>
                    </Layout>

                <Typography variant="body1" className="employment-card-body-text">
                    Primarily focused on developing applications Woolworth's delivery network. 
                    Worked on systems which handled high throughput of orders of ~50,000 orders 
                    per day. I also worked on monitoring the delivery/Goods Inward network and 
                    how delivery drivers were tracking on the road. Working on these projects had 
                    improved my Angular and .Net Core development skills to a highly proficently 
                    level, and I also learn how to deploy architecture and various systems with 
                    scalably, as well as how to monitor and maintain them using application health 
                    metrics using appinsights
                </Typography>
            </Panel>

            <Panel className="employment-card">
                <Layout orientation='horizontal'>
                    <a href="https://www.honeywell.com/">
                        <Layout className="employment-card-title-container" orientation='horizontal'>
                            <Typography variant="h4">Honeywell</Typography>
                            <Typography variant="subtitle1">(2020)</Typography>
                            <LaunchIcon></LaunchIcon>
                        </Layout>
                    </a>
                </Layout>


                <Typography variant="body1" className="employment-card-body-text">
                    on-premises software to monitor processes used by over 2,000 customers. At 
                    Honeywell I learned how to use the React library and package managers like 
                    NPM. These skills have furthered my understanding of how to build front-end
                    application and the intricacies of package management.
                </Typography>
            </Panel>

            <Panel className="employment-card">
                <Layout orientation='horizontal'>
                    <a href="https://www.olympic.co.nz/">
                        <Layout className="employment-card-title-container" orientation='horizontal'>
                            <Typography variant="h4">Olympic Software NZ</Typography>
                            <Typography variant="subtitle1">(2017 - 2019)</Typography>
                            <LaunchIcon></LaunchIcon>
                        </Layout>
                    </a>
                </Layout>


                <Typography variant="body1" className="employment-card-body-text">
                    Developed a web application manages business documents between customers with 
                    over 10 Clients. While making the application, I learned how to use the .NET
                    framework, SignalR and Angular Redux (NgRx). These skills allow me to create 
                    and maintain both front-end and back-end real-time applications.
                </Typography>
            </Panel>
        </Layout>
    );
}

export default EmploymentComponent;