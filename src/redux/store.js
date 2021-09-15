import {posts, newPostText} from "./postsData.js"
import {dialogs, messages} from "./dialogsData"
import {friends} from "./sidebar"

import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


export const store = {
  _state: {
    profilePage: {
      posts: posts,
      newPostText : newPostText,
    },
    dialogsPage: {
      dialogs: dialogs,
      messages: messages,
      newMessageText : '',
    },
    sidebar: {
      friends: friends
    },
  },

  _callSubscriber() {
    console.log("no Listener observed")
  },
  subscriber (observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    //перерисовываем React здесь
    this._callSubscriber(this._state)
  },

  getState() {
    return this._state
  }
}

//байндим диспатч на корень store
store.dispatch = store.dispatch.bind(store)
