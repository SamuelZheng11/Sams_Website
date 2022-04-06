import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from '@mui/material';

import { CONTACT_TITLE, EMAIL, FULL_NAME, GIT_HUB, LINKED_IN, LOCATION } from './ContactConstants';
import Layout from '../../core/layout/LayoutComponent';

import './ContactComponent.scss'

function ContactComponent() {
    return(
        <div className='contact'>
            <div className='contact-title-container'>
                <Typography variant="h4">{CONTACT_TITLE}</Typography>
            </div>

            <Layout orientation='horizontal'>
                <PersonIcon></PersonIcon>
                <Typography className='contact-detail-text'>{FULL_NAME}</Typography>
            </Layout>
            <Layout orientation='horizontal'>
                <MailOutlineIcon></MailOutlineIcon>
                <Typography className='contact-detail-text'>{EMAIL}</Typography>
            </Layout>
            <Layout orientation='horizontal'>
                <LocationOnIcon></LocationOnIcon>
                <Typography className='contact-detail-text'>{LOCATION}</Typography>
            </Layout>
            <Layout orientation='horizontal'>
                <GitHubIcon></GitHubIcon>
                <Typography className='contact-detail-text'>{GIT_HUB}</Typography>
            </Layout>
            <Layout orientation='horizontal'>
                <LinkedInIcon></LinkedInIcon>
                <Typography className='contact-detail-text'>{LINKED_IN}</Typography>
            </Layout>
        </div>
    )
}

export default ContactComponent;