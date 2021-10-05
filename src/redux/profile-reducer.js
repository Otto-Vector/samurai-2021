import {newPostText, posts, newPostTextPlaceholder} from "./postsData";
import {randomFaceImage} from "./randomFace";

const ADD_POST = 'ADD-POST'
const CHANGE_POST_TEXT = 'CHANGE-POST-TEXT'

let initialState = {
  posts: posts,
  newPostText: newPostText,
  newPostTextPlaceholder: newPostTextPlaceholder
}

const profileReducer = (state = initialState, action) => {

  let functions = {

    addPost(id=5) {
      let newPost = {
        id,
        imageURL: randomFaceImage(id),
        message: state.newPostText,
        likesCount: 0
      }

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText : ''
      }
    },

    changePostText(newPostText) {
      return {
       ...state,
       newPostText
      }
    }
  }

  switch (action.type) {
    case ADD_POST : {
      return functions.addPost(action.id)
    }
    case CHANGE_POST_TEXT : {
      return functions.changePostText(action.newPostText)
    }
    default : {
      return state
    }
  }

  // return state
}

export const addPost = (id) => ({type: ADD_POST, id})
export const changePost = (newPostText) => ({type: CHANGE_POST_TEXT, newPostText})

export default profileReducer;
