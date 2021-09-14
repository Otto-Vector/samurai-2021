import {posts, newPostText} from "./postsData.js"
import {dialogs, messages} from "./dialogsData"
import {friends} from "./friendsData"

//функции для профиля
let thisProfileFunctions = {

  addPost () {
    let newPost = { ...this._state.profilePage.posts[0] }
    newPost.message = this._state.profilePage.newPostText
    newPost.likesCount = 0

    this._state.profilePage.posts.push(newPost)
    this._state.profilePage.newPostText = ''
  },

  changePostText (text) {
    this._state.profilePage.newPostText = text
  }
}

//функции для диологов
let thisDialogsFunctions = {

  addMessage() {
    let newMessage ={ ...this._state.dialogsPage.messages[0] }
    newMessage.message = this._state.dialogsPage.newMessageText

    this._state.dialogsPage.messages.unshift(newMessage)
    this._state.dialogsPage.newMessageText = ''
  },

  changeMessage (text){
    this._state.dialogsPage.newMessageText = text
  }
}

const store = {
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

  _functions: {
    ...thisProfileFunctions,
    ...thisDialogsFunctions
  },

  _listener() {
    console.log("no Listener observed")
  },
  subscriber (observer) {
    this._listener = observer
  },

  dispatch(action) {
    switch (action.type) {
      case 'ADD-POST' : {
        this._functions.addPost()
        break
      }
      case 'CHANGE-POST-TEXT' : {
        this._functions.changePostText(action.text)
        break
      }
      case 'ADD-MESSAGE' : {
        this._functions.addMessage()
        break
      }
      case 'CHANGE-MESSAGE' : {
        this._functions.changeMessage(action.text)
        break
      }
      default : {
        console.log("no validate value in dispatch!!")
      }
    }
    //перерисовываем React здесь
    this._listener()
  },

  state() {
    return this._state
  }
}

//функция автоматического байндинга всех функций
function bindAllfunctions(bind) {
    for (let key in bind._functions) {
    if (typeof bind._functions[key] == 'function') {
      bind._functions[key] = bind._functions[key].bind(bind)
    }
  }
}

//байндим диспатч и функции на корень state
store['dispatch'] = store.dispatch.bind(store)
bindAllfunctions(store)


// let subscriber = (observer) => {
//   rerenderEntireTree = observer
// }

export {store}
