import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer from "./users-reducer";
import authReducer, {authInitialStateType} from "./auth-reducer";
import appReducer from "./app-reducer";

let reducersObject = {
  profilePage : profileReducer,
  dialogsPage : dialogsReducer,
  sidebar: friendsReducer,
  usersPage : usersReducer,
  auth: authReducer,
  app: appReducer,
}

export type StateType = {
  auth : authInitialStateType
}

let reducers = combineReducers(reducersObject)

//для расширения reduxDevTool в браузере и отслеживания стейта
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store
