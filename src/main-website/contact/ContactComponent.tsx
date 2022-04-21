import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from '@mui/material';

import { useAppSelector } from '../WebsiteHooks';
import { CONTACT_TITLE } from './ContactConstants';
import Layout from '../../core/layout/LayoutComponent';
import LoadingSpinnerComponent from '../../core/loading/LoadingSpinnerComponent';

import './ContactComponent.scss'

function ContactComponent() {
    const contentLoaded = useAppSelector(state => state.information.websiteInfoLoaded);
    const contact = useAppSelector(state => state.information.bio?.contact);

    const getFullnameFromContact = () => {
        return contact !== null ? `${contact?.givenNames.join(' ')} ${contact?.surname}` : '';
    };

    return(
        <div className='contact'>
            <div className='contact-title-container'>
                <Typography variant="h4">{CONTACT_TITLE}</Typography>
            </div>

            <LoadingSpinnerComponent loaded={contentLoaded}>
                <div>
                    <Layout orientation='horizontal'>
                        <PersonIcon></PersonIcon>
                        <Typography className='contact-detail-text'>{getFullnameFromContact()}</Typography>
                    </Layout>
                    <Layout orientation='horizontal'>
                        <MailOutlineIcon></MailOutlineIcon>
                        <Typography className='contact-detail-text'>{contact?.email}</Typography>
                    </Layout>
                    <Layout orientation='horizontal'>
                        <LocationOnIcon></LocationOnIcon>
                        <Typography className='contact-detail-text'>{contact?.location}</Typography>
                    </Layout>
                    <Layout orientation='horizontal'>
                        <GitHubIcon></GitHubIcon>
                        <Typography className='contact-detail-text'>{contact?.gitHub}</Typography>
                    </Layout>
                    <Layout orientation='horizontal'>
                        <LinkedInIcon></LinkedInIcon>
                        <Typography className='contact-detail-text'>{contact?.linkedIn}</Typography>
                    </Layout>
                </div>
            </LoadingSpinnerComponent>
        </div>
    )
}

export default ContactComponent;