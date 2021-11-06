import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import statusReducer from "./status-reduser";

let reducers = combineReducers({
  profilePage : profileReducer,
  profileStatus: statusReducer,
  dialogsPage : dialogsReducer,
  sidebar: friendsReducer,
  usersPage : usersReducer,
  auth: authReducer,
  app: appReducer,
  }
)

//для расширения reduxDevTool в браузере и отслеживания стейта
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store
