import {posts, newPostText} from "./postsData.js"
import {dialogs, messages} from "./dialogsData"
import {friends} from "./friendsData"

let rerenderEntireTree = () => {
  console.log('notHotNotSet')
}

//функции для профиля
let thisProfileFunctions = {
  addPost () {

    let newPost = { ...this.profilePage.posts[0] }
    newPost.message = this.profilePage.newPostText
    newPost.likesCount = 0

    this.profilePage.posts.push(newPost)
    this.profilePage.newPostText = ''

    rerenderEntireTree(state)
  },

  changePostText (text) {
    this.profilePage.newPostText = text
    rerenderEntireTree(state)
  }
}

//функции для диологов
let thisDialogsFunctions = {
  addMessage() {
    let newMessage ={ ...this.dialogsPage.messages[0] }
    newMessage.message = this.dialogsPage.newMessageText

    this.dialogsPage.messages.unshift(newMessage)
    this.dialogsPage.newMessageText = ''
    rerenderEntireTree(state)
  },

  changeMessage (text){
    this.dialogsPage.newMessageText = text
    rerenderEntireTree(state)
  }
}

const state = {
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

  _functions: {
    ...thisProfileFunctions,
    ...thisDialogsFunctions
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
  }
}

//функция автоматического байндинга всех функций
function bindAllfunctions(bind) {
    for (let key in bind.functions) {
    if (typeof bind.functions[key] == 'function') {
      bind.functions[key] = bind.functions[key].bind(bind)
    }
  }
}

//байндим диспатч и функции на корень state
state['dispatch'] = state.dispatch.bind(state)
bindAllfunctions(state)


let subscriber = (observer) => {
  rerenderEntireTree = observer
}

export {state, subscriber}
