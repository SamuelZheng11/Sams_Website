import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../core/layout/LayoutComponent';
import NavigationSlice from '../host/NavigationState';
import { scrollTo } from '../host/NavigationState';
import { ContactHeaderTitle, EducationHeaderTitle, EmploymentHeaderTitle, HeaderWebsiteName, HomeHeaderTitle, ProjectHeaderTitle } from './ShellHeaderConstants';

import './ShellHeaderComponent.scss'

function ShellHeader() {
    const lastNavView = useSelector(state => state.counter)
    const dispatch = useDispatch()

    return(
        <AppBar color="default" className="shell-header">
            <Layout orientation='horizontal' spacing='fill'>
                <Typography variant="h5">
                    {HeaderWebsiteName}
                </Typography>
                
                <Layout className="header-nav-container" orientation='horizontal' spacing='fill'>
                    <Typography className="header-nav-option" variant="h6" onClick={() => dispatch(scrollTo())}>
                        {HomeHeaderTitle}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6">
                        {EmploymentHeaderTitle}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6">
                        {EducationHeaderTitle}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6">
                        {ProjectHeaderTitle}
                    </Typography>
                    <Typography className="header-nav-option" variant="h6">
                        {ContactHeaderTitle}
                    </Typography>
                </Layout>
            </Layout>
        </AppBar>
    )
}

export default ShellHeader;