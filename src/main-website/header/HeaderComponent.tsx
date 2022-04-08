import { ReactElement } from 'react';
import { Slide, Typography, useScrollTrigger } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useAppDispatch, useAppSelector } from '../WebsiteHooks';

import Layout from '../../core/layout/LayoutComponent';
import { EWebsitePages } from '../WebsiteTypes';
import { scrollTo, toggleTheme } from '../WebsiteNavigationSlice';
import { ThemeSwitch } from './HeaderThemeSwitchComponent';
import { CONTACT_HEADER_TITLE, EDUCATION_HEADER_TITLE, EMPLOYMENT_HEADER_TITLE, HEADER_WEBSITE_NAME, HOME_HEADER_TITLE, PROJECT_HEADER_TITLE } from './HeaderConstants';

import './HeaderComponent.scss'

export interface IHideOnScrollProps {
    children: ReactElement;
}

export interface IHeaderProps {
    children?: ReactElement;
}

function HideOnScroll(props: IHideOnScrollProps) { 
    const { children } = props;
    const scrollTrigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!scrollTrigger}>
          {children}
        </Slide>
      );
}

function HeaderComponent(props: IHeaderProps) {
    const dispatch = useAppDispatch()
	const theme = useAppSelector(state  => state.navigation.theme);

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

                        <ThemeSwitch onChange={() => dispatch(toggleTheme())} sx={{ m: 1 }} />
                    </Layout>
                </Layout>
            </AppBar>
        </HideOnScroll>
    )
}

export default HeaderComponent;