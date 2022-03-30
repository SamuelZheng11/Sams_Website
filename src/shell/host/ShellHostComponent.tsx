import HomePageComponent from "../../website/home/HomePageComponent";
import ShellHeader from "../header-component/ShellHeaderComponent";
import './ShellHostComponent.scss'

function ShellHost() {
    return(
        <div className="shellHost">
            <ShellHeader></ShellHeader>
            <HomePageComponent></HomePageComponent>         
        </div>
    )
}

export default ShellHost;