import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import Layout from '../../core/layout/LayoutComponent';
import { scrollTo } from '../WebsiteNavigationSlice';
import { useAppSelector, useAppDispatch } from '../WebsiteHooks';
import { ContactHeaderTitle, EducationHeaderTitle, EmploymentHeaderTitle, HeaderWebsiteName, HomeHeaderTitle, ProjectHeaderTitle } from './HeaderConstants';

import './HeaderComponent.scss'

function Header() {
    const lastNavView = useAppSelector(state  => state.navigation.view)
    const dispatch = useAppDispatch()

    return(
        <AppBar color="default" className="header">
            <Layout orientation='horizontal' spacing='fill'>
                <Typography variant="h5">
                    {HeaderWebsiteName}
                </Typography>
                
                <Layout className="header-nav-container" orientation='horizontal' spacing='fill'>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(HomeHeaderTitle))}>
                        {HomeHeaderTitle}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(EmploymentHeaderTitle))}>
                        {EmploymentHeaderTitle}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(EducationHeaderTitle))}>
                        {EducationHeaderTitle}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(ProjectHeaderTitle))}>
                        {ProjectHeaderTitle}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo(ContactHeaderTitle))}>
                        {ContactHeaderTitle}
                    </Typography>
                </Layout>
            </Layout>
        </AppBar>
    )
}

export default Header;