import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage : profileReducer,
  dialogsPage : dialogsReducer,
  sidebar: sidebarReducer,
  usersPage : usersReducer,
  auth: authReducer,
  app: appReducer,
  }
)

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store
