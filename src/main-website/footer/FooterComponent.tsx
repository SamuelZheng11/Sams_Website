import { Typography } from '@mui/material';
import Layout from '../../core/layout/LayoutComponent';
import './FooterComponent.scss';

const CREDITS = 'Website is developed and maintained wholly by me (sam)';
const CODE_ACKNOWLEDGMENT = 'Developed using React';
const DEPLOYMENT_ACKNOWLEDGMENT = 'Deployed in AWS';


function FooterComponent() {
    return (
        <Layout orientation='vertical' className='footer'>
            <Typography variant="subtitle2" className='footer-text'>{CREDITS}</Typography>
            <Layout orientation='horizontal'>
                <Typography variant="subtitle2" className='footer-text'>{CODE_ACKNOWLEDGMENT} | {DEPLOYMENT_ACKNOWLEDGMENT}</Typography>
            </Layout>
        </Layout>
    );
}

export default FooterComponent