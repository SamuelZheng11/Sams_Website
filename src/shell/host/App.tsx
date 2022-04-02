import './App.scss'
import ShellHeader from '../../shell/header/ShellHeaderComponent';
import HomePageComponent from '../../website/home/HomePageComponent';

function App() {
	return (
		<div className="App">
			<ShellHeader></ShellHeader>
			<HomePageComponent></HomePageComponent>    
		</div>
	);
}

export default App;
