import * as serviceWorker from './serviceWorker';
import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

import {state, subscriber } from "./redux/state";

export let rerenderEntireTree = (data) =>
{
  ReactDOM.render(<BrowserRouter>
      <App {...data}/>
    </BrowserRouter>,
    document.getElementById('root'));
}

rerenderEntireTree(state);

subscriber(rerenderEntireTree);


serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
