import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Typography } from '@mui/material';

import { EMAIL, FULL_NAME, GIT_HUB, LINKED_IN, PHONE_NUMBER } from './ContactConstants';
import Layout from '../../core/layout/LayoutComponent';

import './ContactComponent.scss'

function ContactComponent() {
    return(
        <div className='contact-container'>
            <div className="filler">asdf</div>
            <Layout orientation='horizontal'>
                <PersonIcon></PersonIcon>
                <Typography className='contact-detail-text'>{FULL_NAME}</Typography>
            </Layout>
            <Layout orientation='horizontal'>
                <MailOutlineIcon></MailOutlineIcon>
                <Typography className='contact-detail-text'>{EMAIL}</Typography>
            </Layout>
            <Layout orientation='horizontal'>
                <PhoneIcon></PhoneIcon>
                <Typography className='contact-detail-text'>{PHONE_NUMBER}</Typography>
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