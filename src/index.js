import * as serviceWorker from './serviceWorker';
import React from 'react'
import ReactDOM from 'react-dom';

import './index.css';
import {AppContainer} from './App';


ReactDOM.render(<AppContainer/>, document.getElementById('root'))


serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
