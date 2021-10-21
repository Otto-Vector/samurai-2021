import {randomFaceImage} from "./randomFace";
import {profileAPI} from "../api/samurai-api";

const ADD_POST = 'ADD-POST'
const CHANGE_POST_TEXT = 'CHANGE-POST-TEXT'
const SET_PROFILE_STATE = 'SET-PROFILE-STATE'
const SET_STATUS_PROFILE = 'SET-STATUS-PROFILE'
const TOGGLE_FETCHING = 'TOGGLE-FETCHING'
const TOGGLE_STATUS_FETCHING = 'TOGGLE-STATUS-FETCHING'

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
  profileStatusText: '',
  profileStatusFetching: true,
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
        posts: [newPost, ...state.posts],
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
    case  SET_STATUS_PROFILE : {
      return {
        ...state,
        profileStatusText: action.profileStatusText
      }
    }
    case TOGGLE_STATUS_FETCHING : {
      return {
        ...state,
        profileStatusFetching: action.profileStatusFetching
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
export const setStatusProfile = (profileStatusText) => ({type: SET_STATUS_PROFILE, profileStatusText})
export const toggleStatusProfileFetching = (profileStatusFetching) => ({
  type: TOGGLE_STATUS_FETCHING,
  profileStatusFetching
})
export const toggleIsFetchingProfile = (isFetching) => ({type: TOGGLE_FETCHING, isFetching})

let defaultUserId = 11

export const getProfile = (userId = defaultUserId) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingProfile(true))
    profileAPI.getProfile(userId)
      .then(response => {
        dispatch(setProfileState(response))
        dispatch(toggleIsFetchingProfile(false))
      })
  }
}

export const getStatus = (userId = defaultUserId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId)
      .then(response => {
        dispatch(toggleStatusProfileFetching(true))
        dispatch(setStatusProfile(response))
        dispatch(toggleStatusProfileFetching(false))
      })
  }
}

export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.setStatus(status)
      .then( responce => {
        if (responce.resultCode ===0 ) {
          dispatch(setStatusProfile(status))
        }
      })
  }
}
export default profileReducer;
