import {randomFaceImage} from "../api/randomFace";
import {profileAPI} from "../api/samurai-api";
import {PhotosType, PostType, ProfileType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'profile-reducer/ADD-POST'
const SET_PROFILE_STATE = 'profile-reducer/SET-PROFILE-STATE'
const TOGGLE_FETCHING = 'profile-reducer/TOGGLE-FETCHING'
const SET_IS_AUTH_PROFILE = 'profile-reducer/SET-IS-AUTH-PROFILE'
const SET_PHOTO_SUCCESS = 'profile-reducer/SET_PHOTO_SUCCESS'
const SET_STATUS = 'profile-reducer/SET-STATUS-PROFILE'
const TOGGLE_STATUS_FETCHING = 'profile-reducer/TOGGLE-STATUS-FETCHING'
const SET_ERROR_FROM_API = 'profile-reducer/SET_ERROR_FROM_API'

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
  ] as PostType[],

  newPostTextPlaceholder: 'add new post here' as string | null,
  profile: null as ProfileType | null,
  isFetching: true,
  isAuthProfile: false,

  profileStatusText: null as string | null,
  profileStatusFetching: true,
  profileStatusPlaceholder: 'input status here' as string | null,

  errorsFromApi: null as string[] | null
}

export type ProfileReducerStateType = typeof initialState
type ActionsTypes =
  AddPostActionType |
  SetProfileStateActionType |
  SetIsAuthProfileActionType |
  ToggleIsFetchingProfileActionType |
  SetPhotoSuccessActionType |
  SetStatusProfileActionType |
  ToggleStatusProfileFetchingActionType |
  SetErrorFromApiActionType

const profileReducer = (state = initialState, action: ActionsTypes): ProfileReducerStateType => {

  switch (action.type) {
    case ADD_POST : {
      let newPost: PostType = {
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
        profile: {...state.profile, photos: action.photos} as ProfileType
      }
    }
    case  SET_STATUS : {
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
    case SET_ERROR_FROM_API : {
      return {
        ...state,
        errorsFromApi: action.errorsFromApi
      }
    }

    default : {
      return state
    }
  }

  // return state
}

let defaultUserId = 20116
type AddPostActionType = { type: typeof ADD_POST, id: number, newPostText: string }
export const addPost = (id = defaultUserId, newPostText: string): AddPostActionType => ({
  type: ADD_POST,
  id,
  newPostText
})

type SetProfileStateActionType = { type: typeof SET_PROFILE_STATE, profile: ProfileType }
export const setProfileState = (profile: ProfileType): SetProfileStateActionType => ({type: SET_PROFILE_STATE, profile})

type SetIsAuthProfileActionType = { type: typeof SET_IS_AUTH_PROFILE, isAuthProfile: boolean }
export const setIsAuthProfile = (isAuthProfile: boolean): SetIsAuthProfileActionType => (
  {type: SET_IS_AUTH_PROFILE, isAuthProfile})

type ToggleIsFetchingProfileActionType = { type: typeof TOGGLE_FETCHING, isFetching: boolean }
export const toggleIsFetchingProfile = (isFetching: boolean): ToggleIsFetchingProfileActionType => (
  {type: TOGGLE_FETCHING, isFetching})

type SetPhotoSuccessActionType = { type: typeof SET_PHOTO_SUCCESS, photos: PhotosType }
export const setPhotoSuccess = (photos: PhotosType): SetPhotoSuccessActionType => (
  {type: SET_PHOTO_SUCCESS, photos})

type SetStatusProfileActionType = { type: typeof SET_STATUS, profileStatusText: string }
export const setStatusProfile = (profileStatusText: string): SetStatusProfileActionType => (
  {type: SET_STATUS, profileStatusText})

type ToggleStatusProfileFetchingActionType = { type: typeof TOGGLE_STATUS_FETCHING, profileStatusFetching: boolean }
export const toggleStatusProfileFetching = (profileStatusFetching: boolean): ToggleStatusProfileFetchingActionType => (
  {type: TOGGLE_STATUS_FETCHING, profileStatusFetching})

type SetErrorFromApiActionType = { type: typeof SET_ERROR_FROM_API, errorsFromApi: string[] | null }
const setErrorFromApi = (errorsFromApi: string[] | null): SetErrorFromApiActionType =>  ({ type: SET_ERROR_FROM_API, errorsFromApi })


type ProfileThunkActionType<R> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsTypes>

export const getProfile = (userId = defaultUserId): ProfileThunkActionType<void> =>
  async (dispatch) => {
    try {
      dispatch(toggleIsFetchingProfile(true))
      let response = await profileAPI.getProfile(userId)
      dispatch(setProfileState(response))
    } catch (error) {
      // console.error(error)
      let response = await profileAPI.getProfile(defaultUserId)
      dispatch(setProfileState(response))
    }
    dispatch(toggleIsFetchingProfile(false))
  }

export const setPhoto = (userPhoto: string): ProfileThunkActionType<void> =>
  async (dispatch) => {
    let response = await profileAPI.setPhoto(userPhoto)
    if (response.resultCode === 0) {
      dispatch(setPhotoSuccess(response.data.photos))
    }
  }

export const setProfileData = (data: ProfileType): ProfileThunkActionType<void> =>
  async (dispatch) => {
    dispatch(setErrorFromApi(null))
    let response = await profileAPI.setData(data)
    if (response.resultCode === 0) {
      dispatch(setErrorFromApi(null))
      dispatch(getProfile(data.userId))
    } else {
      dispatch(setErrorFromApi(response.messages))
    }
  }


export const getStatus = (userId = defaultUserId): ProfileThunkActionType<void> =>
  async (dispatch) => {
    dispatch(toggleStatusProfileFetching(true))
    try {
      let response = await profileAPI.getStatus(userId)
      dispatch(setStatusProfile(response))
    } catch (error) {
      let response = await profileAPI.getStatus(defaultUserId)
      dispatch(setStatusProfile(response))
    }
    dispatch(toggleStatusProfileFetching(false))
  }

export const updateStatus = (status: string): ProfileThunkActionType<void> =>
  async (dispatch) => {
    let response = await profileAPI.setStatus(status)

    if (response.resultCode === 0) {
      dispatch(setStatusProfile(status))
    }
  }

export default profileReducer;
