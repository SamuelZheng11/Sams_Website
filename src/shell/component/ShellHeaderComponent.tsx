import AppBar from '@mui/material/AppBar';
import Layout from '../../core/layout/LayoutComponent';
import TextComponent from '../../core/text/TextComponent';
import './ShellHeaderComponent.scss'

function ShellHeader() {
    return(
        <AppBar color="default" className="shell-header">
            <Layout orientation='horizontal' spacing='fill'>
                <TextComponent>
                    hello
                </TextComponent>
                <TextComponent>
                    world
                </TextComponent>
            </Layout>
        </AppBar>
    )
}

export default ShellHeader;