import {posts, newPostText} from "./postsData.js"
import {dialogs, messages} from "./dialogsData"
import {friends} from "./friendsData";

let rerenderEntireTree = () => {
  console.log('notHotNotSet')
}

let thisProfileFunctions = {
  addPost () {
    let newPost = { ...this.posts[0] }
    newPost.message = this.newPostText
    newPost.likesCount = 0

    this.posts.push(newPost)
    this.newPostText = ''

    rerenderEntireTree(state)
  },
  changePostText (text) {
    this.newPostText = text
    rerenderEntireTree(state)

  }
}


let thisDialogsFunctions = {
  addMessage() {
    let newMessage ={ ...this.messages[0] }
    newMessage.message = this.newMessageText

    this.messages.unshift(newMessage)
    this.newMessageText = ''
    rerenderEntireTree(state)
  },
  changeMessage (text){
    this.newMessageText = text
    rerenderEntireTree(state)
  }
}

const state = {
  profilePage: {
    posts: posts,
    newPostText : newPostText,
    functions : thisProfileFunctions
  },
  dialogsPage: {
    dialogs: dialogs,
    messages: messages,
    newMessageText : '',
    functions: thisDialogsFunctions
  },
  sidebar: {
    friends: friends
  }
}

function bindAllfunctions(bind) {
    for (let key in bind.functions) {
    if (typeof bind.functions[key] == 'function') {
      bind.functions[key] = bind.functions[key].bind(bind);
    }
  }
}

bindAllfunctions(state.profilePage)
bindAllfunctions(state.dialogsPage)

let subscriber = (observer) => {
  rerenderEntireTree = observer
}


export {state, subscriber}
