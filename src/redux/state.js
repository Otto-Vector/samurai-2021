import {posts, randomFaceImage} from "./postsData.js"
import {dialogs, messages} from "./dialogsData"
import {friends} from "./friendsData";
import {rerenderEntireTree} from "../render";

const state = {
  profilePage: {
    posts: posts
  },
  dialogsPage: {
    dialogs: dialogs,
    messages: messages
  },
  sidebar: {
    friends: friends
  }
}

let addPost = (postMessage) => {
  let newPost = {
    id: 5,
    imageURL: randomFaceImage(),
    message: postMessage,
    likesCount: 0
  }
  state.profilePage.posts.push(newPost)

  rerenderEntireTree(state, addPost)
}


export {state, addPost}
