import ShellHost from './shell/host/ShellHostComponent';
import './App.css'

/* Import Typography */
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

function App() {
	return (
		<div className="App">
			<ShellHost></ShellHost>
		</div>
	);
}

export default App;
