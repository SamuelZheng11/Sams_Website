import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.scss';
import './variables.scss'
import './material-overrides.scss';
import LandingPage from './landing/LandingPage';
import reportWebVitals from './reportWebVitals';
import landingPageStore from './landing/LandingPageStore'
import settlementStore from './settlement-calculator/SettlementCalculatorStore'
import { Provider } from 'react-redux'
import SettlementCalculator from './settlement-calculator/SettlementCalculator';


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={
              <Provider store={landingPageStore}>
                <LandingPage />
              </Provider>
            }/>

          <Route path="/settlements" element={
            <Provider store={settlementStore}>
              <SettlementCalculator />
            </Provider>
          }/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
