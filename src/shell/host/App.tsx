import './App.scss'
import ShellHeader from '../../shell/header/ShellHeaderComponent';
import HomePageComponent from '../../website/home/HomePageComponent';
import { Provider } from 'react-redux';

function App() {
	return (
		<div className="App">
			<Provider>
				<ShellHeader></ShellHeader>
    	        <HomePageComponent></HomePageComponent>    
			</Provider>
		</div>
	);
}

export default App;
