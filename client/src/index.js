import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import './index.css';
// import App from './App';
import App2 from './App2';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    {/* <Provider store={store}></Provider> */}
    {/* <App /> */}
    <App2 />
  </Provider>
);
reportWebVitals();
