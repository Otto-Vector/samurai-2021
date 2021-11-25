import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";

import profileReducer, {ProfileReducerStateType} from "./profile-reducer";
import dialogsReducer, {DialogsReducerStateType} from "./dialogs-reducer";
import friendsReducer, {FriendsReducerStateType} from "./friends-reducer";
import usersReducer, {UsersReducerStateType} from "./users-reducer";
import authReducer, {AuthReducerStateType} from "./auth-reducer";
import appReducer, {AppReducerStateType} from "./app-reducer";

let reducersObject = {
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: friendsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
}

export type StateType = {
  auth: AuthReducerStateType
  profilePage: ProfileReducerStateType
  dialogsPage: DialogsReducerStateType,
  sidebar: FriendsReducerStateType,
  usersPage: UsersReducerStateType,
  app: AppReducerStateType
}

let reducers = combineReducers(reducersObject)

//для расширения reduxDevTool в браузере и отслеживания стейта
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store
