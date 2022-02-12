import AppBar from '@mui/material/AppBar';
import Layout from '../../core/layout/LayoutComponent';
import './ShellHeaderComponent.scss'

function ShellHeader() {
    return(
        <AppBar className="shell-header">
            <Layout orientation='horizontal' spacing='fill'>
                <div>
                    hello
                </div>
                <div>
                    world
                </div>
            </Layout>
        </AppBar>
    )
}

export default ShellHeader;