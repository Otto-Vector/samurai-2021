import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage : profileReducer,
  profileStatus: profileReducer,
  dialogsPage : dialogsReducer,
  sidebar: friendsReducer,
  usersPage : usersReducer,
  auth: authReducer,
  app: appReducer,
  }
)

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store
