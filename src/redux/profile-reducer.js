const ADD_POST = 'ADD-POST'
const CHANGE_POST_TEXT = 'CHANGE-POST-TEXT'

const profileReducer = (state, action) => {

  let profileFunctions = {
    addPost () {
      let newPost = { ...state.posts[0] }
      newPost.message = state.newPostText
      newPost.likesCount = 0

      state.posts.push(newPost)
      state.newPostText = ''
    },

    changePostText (text) {
      state.newPostText = text
    }
  }
   switch (action.type) {
      case ADD_POST : {
        profileFunctions.addPost()
        break
      }
      case CHANGE_POST_TEXT : {
        profileFunctions.changePostText(action.text)
        break
      }
     default : { return state }
    }

  return state
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const changePostActionCreator = (text) => ({ type: CHANGE_POST_TEXT, text })

export default profileReducer;
