
import * as serviceWorker from './serviceWorker';

import {rerenderEntireTree} from "./render";
import {state, addPost} from "./redux/state";

const dataBaseToProps = state
const functions = addPost


rerenderEntireTree(dataBaseToProps, functions);

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
