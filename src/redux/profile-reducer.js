import {newPostText, posts, newPostTextPlaceholder} from "./postsData";

const ADD_POST = 'ADD-POST'
const CHANGE_POST_TEXT = 'CHANGE-POST-TEXT'

let initialState = {
  posts: posts,
  newPostText: newPostText,
  newPostTextPlaceholder: newPostTextPlaceholder
}

const profileReducer = (state = initialState, action) => {

  let stateCopyFunction = (stateIn) => {

      let stateCopy = {
        ...stateIn,
        posts: [...stateIn.posts]
      }

    return {
      addPost() {
        let newPost = {...stateCopy.posts[0]}
        newPost.message = stateCopy.newPostText
        newPost.likesCount = 0

        if (stateCopy.newPostText) stateCopy.posts.push(newPost)
        stateCopy.newPostText = ''

        return stateCopy
      },

      changePostText(text) {
        stateCopy.newPostText = text
        return stateCopy
      }
    }
  }

  switch (action.type) {
    case ADD_POST : {
      return stateCopyFunction(state).addPost()
    }
    case CHANGE_POST_TEXT : {
      return stateCopyFunction(state).changePostText(action.text)
    }
    default : {
      // return state
    }
  }

  return state
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const changePostActionCreator = (text) => ({type: CHANGE_POST_TEXT, text})

export default profileReducer;
