import * as serviceWorker from './serviceWorker';
import React from 'react'
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import store from "./redux/redux-store";

import {
  BrowserRouter,
  // HashRouter
} from "react-router-dom";
import {Provider} from "react-redux";


ReactDOM.render(
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>, document.getElementById('root'))

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
