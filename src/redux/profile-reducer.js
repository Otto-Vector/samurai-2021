import {randomFaceImage} from "../api/randomFace";
import {profileAPI} from "../api/samurai-api";

const ADD_POST = 'ADD-POST'
const SET_PROFILE_STATE = 'SET-PROFILE-STATE'
const SET_STATUS_PROFILE = 'SET-STATUS-PROFILE'
const TOGGLE_FETCHING = 'TOGGLE-FETCHING'
const TOGGLE_STATUS_FETCHING = 'TOGGLE-STATUS-FETCHING'
const SET_IS_AUTH_PROFILE = 'SET-IS-AUTH-PROFILE'

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
  newPostTextPlaceholder: 'add new post here',
  profile: null,
  profileStatusText: '',
  profileStatusFetching: true,
  isFetching: true,
  isAuthProfile: false
}

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST : {
      let newPost = {
        id: action.id,
        imageURL: randomFaceImage(action.id),
        message: action.newPostText || 'empty',
        likesCount: 0
      }
      return {
        ...state,
        posts: [newPost, ...state.posts],
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
    case SET_IS_AUTH_PROFILE : {
      return {
        ...state,
        isAuthProfile: action.isAuthProfile
      }
    }
    default : {
      return state
    }
  }

  // return state
}

let defaultUserId = 11

export const addPost = (id = defaultUserId, newPostText) => ({type: ADD_POST, id, newPostText})
export const setProfileState = profile => ({type: SET_PROFILE_STATE, profile})
export const setStatusProfile = profileStatusText => ({type: SET_STATUS_PROFILE, profileStatusText})
export const setIsAuthProfile = isAuthProfile => ({type: SET_IS_AUTH_PROFILE, isAuthProfile})
export const toggleStatusProfileFetching = profileStatusFetching => ({
  type: TOGGLE_STATUS_FETCHING,
  profileStatusFetching
})
export const toggleIsFetchingProfile = isFetching => ({type: TOGGLE_FETCHING, isFetching})


export const getProfile = (userId = defaultUserId) => dispatch => {
  dispatch(toggleIsFetchingProfile(true))
  profileAPI.getProfile(userId)
    .then(response => {
      dispatch(setProfileState(response))
      dispatch(toggleIsFetchingProfile(false))
    })
}

export const getStatus = (userId = defaultUserId) => dispatch => {
  profileAPI.getStatus(userId)
    .then(response => {
      dispatch(toggleStatusProfileFetching(true))
      dispatch(setStatusProfile(response))
      dispatch(toggleStatusProfileFetching(false))
    })
}

export const updateStatus = status => dispatch => {
  profileAPI.setStatus(status)
    .then(responce => {
      if (responce.resultCode === 0) {
        dispatch(setStatusProfile(status))
      }
    })
}

export default profileReducer;
