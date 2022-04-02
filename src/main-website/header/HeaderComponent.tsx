import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import Layout from '../../core/layout/LayoutComponent';
import { scrollTo } from '../WebsiteNavigationSlice';
import { useAppSelector, useAppDispatch } from '../WebsiteHooks';
import { CONTACT_HEADER_TITLE, EDUCATION_HEADER_TITLE, EMPLOYMENT_HEADER_TITLE, HEADER_WEBSITE_NAME, HOME_HEADER_TITLE, PROJECT_HEADER_TITLE } from './HeaderConstants';

import './HeaderComponent.scss'

function Header() {
    const lastNavView = useAppSelector(state  => state.navigation.view)
    const dispatch = useAppDispatch()

    return(
        <AppBar color="default" className="header">
            <Layout orientation='horizontal' spacing='fill'>
                <Typography variant="h5">
                    {HEADER_WEBSITE_NAME}
                </Typography>
                
                <Layout className="header-nav-container" orientation='horizontal' spacing='fill'>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(HOME_HEADER_TITLE))}>
                        {HOME_HEADER_TITLE}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(EMPLOYMENT_HEADER_TITLE))}>
                        {EMPLOYMENT_HEADER_TITLE}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(EDUCATION_HEADER_TITLE))}>
                        {EDUCATION_HEADER_TITLE}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(PROJECT_HEADER_TITLE))}>
                        {PROJECT_HEADER_TITLE}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(CONTACT_HEADER_TITLE))}>
                        {CONTACT_HEADER_TITLE}
                    </Typography>
                </Layout>
            </Layout>
        </AppBar>
    )
}

export default Header;