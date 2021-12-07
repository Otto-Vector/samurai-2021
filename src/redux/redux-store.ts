import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

// export type StateType = {
//   auth: AuthReducerStateType
//   profilePage: ProfileReducerStateType
//   dialogsPage: DialogsReducerStateType,
//   sidebar: FriendsReducerStateType,
//   usersPage: UsersReducerStateType,
//   app: AppReducerStateType
// }


const reducersObject = {
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: friendsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
}

let rootReducer = combineReducers(reducersObject)

type StateType = typeof rootReducer
export type AppStateType = ReturnType<StateType>

// export type ActionsAnyType = {[key: string]: (...args: any[]) => any}
export type ActionsAnyType = Record<string, (...args: any[]) => any>
export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type GetActionsTypes<T extends ActionsAnyType> = ReturnType<PropertiesType<T>>

//для расширения reduxDevTool в браузере и отслеживания стейта
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store
