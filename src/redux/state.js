import {posts, randomFaceImage, newPostText} from "./postsData.js"
import {dialogs, messages} from "./dialogsData"
import {friends} from "./friendsData";

let rerenderEntireTree = () => {
  console.log('notHotNotSet')
}

let profileFunctions = {
  addPost : () => {
    let newPost = {
      id: 5,
      imageURL: randomFaceImage(),
      message: state.profilePage.newPostText,
      likesCount: 0
    }

    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''

    rerenderEntireTree(state)
  },
  changePostText : (text) => {
    state.profilePage.newPostText = text
    rerenderEntireTree(state)

  }
}

let dialogsFunctions = {
  addMessage : () => {
    let newMessage ={
      id : 1,
      message: state.dialogsPage.newMessageText
    }
    state.dialogsPage.messages.unshift(newMessage)
    state.dialogsPage.newMessageText = ''
    rerenderEntireTree(state)
  },
  changeMessage : (text) => {
    state.dialogsPage.newMessageText = text
    rerenderEntireTree(state)
  }
}
const state = {
  profilePage: {
    posts: posts,
    newPostText : newPostText,
    functions : profileFunctions
  },
  dialogsPage: {
    dialogs: dialogs,
    messages: messages,
    newMessageText : '',
    functions: dialogsFunctions
  },
  sidebar: {
    friends: friends
  }
}

let subscriber = (observer) => {
  rerenderEntireTree = observer
}


export {state, subscriber}
