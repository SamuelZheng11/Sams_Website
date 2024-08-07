import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import './variables.scss'
import './material-overrides.scss'
import reportWebVitals from './reportWebVitals'
import { App } from './App'
import appStore from './AppStore'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
