import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";


export let rerenderEntireTree = (data, functions) =>
{
  ReactDOM.render(<BrowserRouter>
      <App {...data} func={functions}/>
    </BrowserRouter>,
    document.getElementById('root'));
}
