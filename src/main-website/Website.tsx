import './Website.scss'
import Header from './header/HeaderComponent';
import HomePageComponent from './home/HomePageComponent';

function Website() {
	return (
		<div className="website">
			<Header></Header>
			<HomePageComponent></HomePageComponent>    
		</div>
	);
}

export default Website;
