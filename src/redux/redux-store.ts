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
// создал тип с обязательным type среди возвращаемых ключей для actions
export type ActionsAnyType = Record<string, (...args: any[]) => {type: string,[key: string]: any}>
// export type ActionsAnyType = Record<string, (...args infer U) => {type: string,[U]: any}>
// комбайним все значения объекта
export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
// возвращаем комбайн возвращаемых значений, также extends-ом проверяем, является ли он типом ActionsAnyType
// также удаляем вcе undefined и null
export type GetActionsTypes<T extends ActionsAnyType> = NonNullable<ReturnType<PropertiesType<T>>>

// для расширения reduxDevTool в браузере и отслеживания стейта
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// возвращаем стор вместе с санками
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));
// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));
export default store
