import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {posts} from "./BLL/PostsData";
import {dialogs, messages} from "./BLL/dialogsData";


const dataBaseToProps = {
    posts: posts,
    dialogs: {
        dialogs: dialogs,
        messages: messages
    }
}

ReactDOM.render(<App {...dataBaseToProps} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
