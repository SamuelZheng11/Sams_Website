import { Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

import Layout from '../../core/layout/LayoutComponent';
import Panel from '../../core/panel/PanelComponent';
import LoadingSpinnerComponent from '../../core/loading/LoadingSpinnerComponent';
import { useAppSelector } from '../LandingPageHooks';
import { getYearRangeBetween } from '../../core/date.functions';
import { EMPLOYMENT_TITLE } from './EmploymentConstants';

import './EmploymentComponent.scss'

function EmploymentComponent() {
    const contentLoaded = useAppSelector(state => state.information.websiteInfoLoaded);
    const employments = useAppSelector(state => state.information.employments);

    return(
        <Layout className="employment">
            <div className="employment-title-container">
                <Typography variant='h3'>
                    {EMPLOYMENT_TITLE}
                </Typography>
            </div>

            <LoadingSpinnerComponent loaded={contentLoaded}>
                <div>
                    {employments?.map(employment => (
                        <Panel className="employment-card" key={employment.employer}>
                            <Layout orientation='horizontal'>
                                <a href={employment.employerWebsite}>
                                    <Layout className="employment-card-title-container" orientation='horizontal'>
                                        <Typography variant="h4">{employment.employer}</Typography>
                                        <Typography variant="subtitle1">{getYearRangeBetween(employment.startDate, employment.endDate)}</Typography>
                                        <LaunchIcon></LaunchIcon>
                                    </Layout>
                                </a>
                            </Layout>

                            {employment.summaries.map(summary => (
                                <Typography variant="body1" className="employment-card-body-text" key={summary.length}>
                                    {summary}
                                </Typography>
                            ))}
                        </Panel>
                    ))}
                </div>
            </LoadingSpinnerComponent>
        </Layout>
    );
}

export default EmploymentComponent;