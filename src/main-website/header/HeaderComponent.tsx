import { ReactElement } from 'react';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useAppDispatch, useAppSelector } from '../WebsiteHooks';

import Layout from '../../core/layout/LayoutComponent';
import HideOnScroll from './hide-on-scroll/HideOnScrollComponent';
import { EWebsitePages } from '../WebsiteTypes';
import { scrollTo } from '../slice/WebsiteNavigationSlice';
import { ThemeSwitch } from './assets/HeaderThemeSwitchComponent';
import { CONTACT_HEADER_TITLE, EDUCATION_HEADER_TITLE, EMPLOYMENT_HEADER_TITLE, HEADER_WEBSITE_NAME, HOME_HEADER_TITLE, PROJECT_HEADER_TITLE } from './HeaderConstants';
import { toggleTheme } from '../slice/WebsiteThemeSlice';

import './HeaderComponent.scss'
import CustomIcon from '../../core/custom-icons/CustomIconComponent';

export interface IHeaderProps {
    children?: ReactElement;
}

function HeaderComponent(props: IHeaderProps) {
    const loadWithDarkTheme = useAppSelector(state => state.theme.theme) === 'dark';
    const apiOnline = useAppSelector(state => state.information.apiOnline);
    const dispatch = useAppDispatch()

    return(
        <HideOnScroll {...props}>
            <AppBar className="header" >
                <Layout orientation='horizontal' spacing='fill'>
                    <Typography variant="h5">
                        {HEADER_WEBSITE_NAME}
                    </Typography>
                    
                    <Layout className="header-nav-container" orientation='horizontal' spacing='fill'>
                        <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(EWebsitePages.home))}>
                            {HOME_HEADER_TITLE}
                        </Typography>
                        <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(EWebsitePages.employment))}>
                            {EMPLOYMENT_HEADER_TITLE}
                        </Typography>
                        <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(EWebsitePages.project))}>
                            {PROJECT_HEADER_TITLE}
                        </Typography>
                        <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(EWebsitePages.education))}>
                            {EDUCATION_HEADER_TITLE}
                        </Typography>
                        <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(EWebsitePages.contact))}>
                            {CONTACT_HEADER_TITLE}
                        </Typography>

                        <ThemeSwitch defaultChecked={loadWithDarkTheme} onChange={() => dispatch(toggleTheme())} sx={{ m: 1 }} />
                        <CustomIcon type="api-status" active={apiOnline}></CustomIcon>
                    </Layout>
                </Layout>
            </AppBar>
        </HideOnScroll>
    )
}

export default HeaderComponent;