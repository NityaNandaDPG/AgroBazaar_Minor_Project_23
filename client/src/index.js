import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; 

import reportWebVitals from './reportWebVitals';

import './index.css';
import App2 from './App2';
import { store } from "./redux/index.js";
// import App from './App';

// const store = configureStore({
//   reducer: {
//     counter: counterReducer, // Add your slice's reducer here
//   },
// });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App2 />
    </Provider>
    {/* <App /> */}
  </React.StrictMode>
);
reportWebVitals();
