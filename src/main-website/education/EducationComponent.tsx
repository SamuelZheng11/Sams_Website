import { Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

import Layout from '../../core/layout/LayoutComponent';
import './EducationComponent.scss'
import Panel from '../../core/panel/PanelComponent';

const EDUCATION_TITLE = 'Education';

function EducationComponent() {
    return(
        <div className='education'>
            <div className="education-title-container">
                <Typography variant='h3'>
                    {EDUCATION_TITLE}
                </Typography>
            </div>

            <Panel className='education-card'>
                <Layout orientation='horizontal'>
                    <a href="https://www.auckland.ac.nz/en/engineering.html">
                        <Layout className="education-card-title-container" orientation='horizontal'>
                            <Typography variant="h4">University of Auckland</Typography>
                            <Typography variant="subtitle1">(2016 - 2019)</Typography>
                            <LaunchIcon></LaunchIcon>
                        </Layout>
                    </a>
                </Layout>

                <Typography variant="body1" className="education-card-body-text">
                    In 2019 I graduated from the University of Auckland Specializing in Software Engineering.
                </Typography>

                <Typography variant="body1" className="education-card-body-text">
                    During my tenure I studied a variety of subjects ranging from operating systems, software 
                    design and architecture, mobile security, algorithm and data structures, software development methodologies, 
                    image processing and artificial intelligence
                </Typography>
                
                <Typography variant="body1" className="education-card-body-text">
                    At UoA I was achieved the awards/milestones:
                    <ul>
                        <li> Dean's Honours List class of 2019 (Top 5% of their year of study) </li>
                        <li> First in class SOFTENG 762: Robotics Process Automation </li>
                        <li> First Class Honours </li>
                        <li> GPA of 7.3/9.0 </li>
                    </ul>
                </Typography>
            </Panel>
        </div>
    );
}

export default EducationComponent;