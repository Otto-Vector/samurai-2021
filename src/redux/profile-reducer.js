import {randomFaceImage} from "../api/randomFace";
import {profileAPI} from "../api/samurai-api";

const ADD_POST = 'ADD-POST'
const SET_PROFILE_STATE = 'SET-PROFILE-STATE'
const TOGGLE_FETCHING = 'TOGGLE-FETCHING'
const SET_IS_AUTH_PROFILE = 'SET-IS-AUTH-PROFILE'
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'

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
  isFetching: true,
  isAuthProfile: false,
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

    case SET_PHOTO_SUCCESS : {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos }
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
export const setIsAuthProfile = isAuthProfile => ({type: SET_IS_AUTH_PROFILE, isAuthProfile})
export const toggleIsFetchingProfile = isFetching => ({type: TOGGLE_FETCHING, isFetching})
export const setPhotoSuccess = photos => ({type:SET_PHOTO_SUCCESS, photos})

export const getProfile = (userId = defaultUserId) =>
  async dispatch => {
    dispatch(toggleIsFetchingProfile(true))
    let response = await profileAPI.getProfile(userId)
    dispatch(setProfileState(response))
    dispatch(toggleIsFetchingProfile(false))
  }

export const setPhoto = userPhoto =>
async dispatch => {
  let response = await profileAPI.setPhoto(userPhoto)
  if (response.resultCode === 0) {
    dispatch(setPhotoSuccess(response.data.photos))
  }
}

export const setProfileData = data =>
  async dispatch => {
  let response = await profileAPI.setData(data)
  if (response.resultCode === 0) {
    dispatch(getProfile(data.userId))
    return null
  } else {
    return response.messages
  }

  }

export default profileReducer;
