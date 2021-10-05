import {randomFaceImage} from "./randomFace";

const ADD_POST = 'ADD-POST'
const CHANGE_POST_TEXT = 'CHANGE-POST-TEXT'
const SET_PROFILE_STATE = 'SET-PROFILE-STATE'

let initialState = {
  posts: [
    {
      id: 1,
      imageURL: randomFaceImage(),
      message: 'Hi, how are you?',
      likesCount: 12
    },
    {
      id: 2,
      imageURL: randomFaceImage(),
      message: 'It\'s my first post',
      likesCount: 11
    },
    {
      id: 3,
      imageURL: randomFaceImage(),
      message: 'It\'s my SECOND post',
      likesCount: 9
    }
  ],
  newPostText: '',
  newPostTextPlaceholder: 'add new post here',
  profile: null,
}

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST : {
      let newPost = {
        id: action.id,
        imageURL: randomFaceImage(action.id),
        message: state.newPostText || 'empty',
        likesCount: 0
      }
      return {
        ...state,
        posts: [ newPost, ...state.posts ],
        newPostText: ''
      }
    }
    case CHANGE_POST_TEXT : {
      return {
        ...state,
        newPostText: action.newPostText
      }
    }
    case SET_PROFILE_STATE : {
      return {
        ...state,
        profile: action.profile
      }
    }
    default : {
      return state
    }
  }

  // return state
}

export const addPost = (id = 5) => ({type: ADD_POST, id})
export const changePost = (newPostText) => ({type: CHANGE_POST_TEXT, newPostText})
export const setProfileState = (profile) => ({type: SET_PROFILE_STATE, profile})

export default profileReducer;
