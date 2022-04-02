import './Website.scss'
import Header from './header/HeaderComponent';
import HomePageComponent from './home/HomePageComponent';
import ContactComponent from './contact/ContactComponent';

function Website() {
	return (
		<div className="website">
			<Header></Header>
			<HomePageComponent></HomePageComponent>
			<ContactComponent></ContactComponent>
		</div>
	);
}

export default Website;
