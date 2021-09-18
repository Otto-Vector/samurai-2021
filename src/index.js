import * as serviceWorker from './serviceWorker';
import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

// import {store} from "./redux/store";
import store from "./redux/redux-store";

export let rerenderEntireTree = (state) => {
  ReactDOM.render(<BrowserRouter>
      <App state={state} />
    </BrowserRouter>,
    document.getElementById('root'))
}

rerenderEntireTree(store)

store.subscribe(() => {
  rerenderEntireTree(store)
});


serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
