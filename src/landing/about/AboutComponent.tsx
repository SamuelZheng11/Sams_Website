import { Typography } from '@mui/material';

import LoadingSpinnerComponent from '../../core/loading/LoadingSpinnerComponent';
import { useAppSelector } from '../LandingPageHooks';
import { ABOUT_TITLE } from './AboutConstants';

import './AboutComponent.scss';

function AboutComponent() {
	const contentLoaded = useAppSelector(state => state.information.websiteInfoLoaded);
    const aboutMe = useAppSelector(state => state.information.bio?.aboutMe);

    return (
        <div className='about'>
            <div className="about-title-container">
                <Typography variant='h3'>
                    {ABOUT_TITLE}
                </Typography>
            </div>

            <div className='about-body-container'>
                <LoadingSpinnerComponent loaded={contentLoaded}>
                    <Typography variant="body1" className='about-body-text'>
                        {aboutMe}
                    </Typography>
                </LoadingSpinnerComponent>
            </div>
        </div>
    );
}

export default AboutComponent;