import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App2 from './App2';
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App2 />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();