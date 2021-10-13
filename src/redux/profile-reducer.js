import {randomFaceImage} from "./randomFace";
import {ProfileAPI} from "../api/samurai-api";

const ADD_POST = 'ADD-POST'
const CHANGE_POST_TEXT = 'CHANGE-POST-TEXT'
const SET_PROFILE_STATE = 'SET-PROFILE-STATE'
const TOGGLE_FETCHING = 'TOGGLE-FETCHING'

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
  newPostTextPlaceholder: 'add new pos-t here',
  profile: null,
  isFetching: true
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
    case TOGGLE_FETCHING : {
      return {
        ...state,
        isFetching: action.isFetching
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
export const toggleIsFetchingProfile = (isFetching) => ({type: TOGGLE_FETCHING, isFetching})


export const getProfile = (userId = 11) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingProfile(true))
        ProfileAPI.getProfile(userId)
          .then(response => {
            dispatch(setProfileState(response))
            dispatch(toggleIsFetchingProfile(false))
          })
    }
}

export default profileReducer;
