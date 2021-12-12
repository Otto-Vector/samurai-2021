import {randomFaceImage} from "../api/randomFace";
import {ResultCodesEnum} from "../api/samurai-api";
import {PhotosType, PostType, ProfileType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {ActionsAnyType, AppStateType, GetActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";


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
}

export type ProfileReducerStateType = typeof initialState
type ActionsType = GetActionsTypes<typeof profileActions>

const profileReducer = (state = initialState, action: ActionsType): ProfileReducerStateType => {

  switch (action.type) {
    case "profile-reducer/ADD-POST" : {
      let newPost: PostType = {
        id: action.id,
        imageURL: randomFaceImage(action.id), // пока добавляем рандомную фотку
        message: action.newPostText || 'empty',
        likesCount: 0
      }
      return {
        ...state,
        posts: [newPost, ...state.posts],
      }
    }
    case "profile-reducer/SET-PROFILE-STATE" : {
      return {
        ...state,
        profile: action.profile
      }
    }
    case "profile-reducer/TOGGLE-FETCHING" : {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case "profile-reducer/SET-IS-AUTH-PROFILE" : {
      return {
        ...state,
        isAuthProfile: action.isAuthProfile
      }
    }
    case "profile-reducer/SET_PHOTO_SUCCESS" : {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType
      }
    }
    case  "profile-reducer/SET-STATUS-PROFILE" : {
      return {
        ...state,
        profileStatusText: action.profileStatusText
      }
    }
    case "profile-reducer/TOGGLE-STATUS-FETCHING" : {
      return {
        ...state,
        profileStatusFetching: action.profileStatusFetching
      }
    }

    default : {
      return state
    }
  }
}

let defaultUserId = 20116 //маленький костылёк для "кривых" акков

/* ЭКШОНЫ ПРОФИЛЯ */
export const profileActions: ActionsAnyType = {
  addPost: (id = defaultUserId, newPostText: string) => ({
    type: 'profile-reducer/ADD-POST',
    id,
    newPostText
  } as const),

  setProfileState: (profile: ProfileType) => ({
    type: 'profile-reducer/SET-PROFILE-STATE',
    profile
  } as const),

  setIsAuthProfile: (isAuthProfile: boolean) => ({
    type: 'profile-reducer/SET-IS-AUTH-PROFILE',
    isAuthProfile
  } as const),

  toggleIsFetchingProfile: (isFetching: boolean) => ({
    type: 'profile-reducer/TOGGLE-FETCHING',
    isFetching
  } as const),

  setPhotoSuccess: (photos: PhotosType) => ({
    type: 'profile-reducer/SET_PHOTO_SUCCESS',
    photos
  } as const),

  setStatusProfile: (profileStatusText: string | null) => ({
    type: 'profile-reducer/SET-STATUS-PROFILE',
    profileStatusText
  } as const),

  toggleStatusProfileFetching: (profileStatusFetching: boolean) => ({
    type: 'profile-reducer/TOGGLE-STATUS-FETCHING',
    profileStatusFetching
  } as const),
}

/* САНКИ ПРОФИЛЯ*/

export type ProfileThunkActionType<R = void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsType>

// запрос данных профиля из API
export const getProfile = (userId: number): ProfileThunkActionType =>
  async (dispatch) => {
    try {
      dispatch(profileActions.toggleIsFetchingProfile(true))
      const response = await profileAPI.getProfile(userId)
      dispatch(profileActions.setProfileState(response))

    } catch (error) { //если ошибка, то хардкодим на свой акк
      const response = await profileAPI.getProfile(defaultUserId)
      dispatch(profileActions.setProfileState(response))
    }
    dispatch(profileActions.toggleIsFetchingProfile(false))
  }

// отправка на сервер и возврат обработанного фото
export const setPhoto = (userPhoto: File): ProfileThunkActionType =>
  async (dispatch) => {
    const response = await profileAPI.setPhoto(userPhoto)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setPhotoSuccess(response.data.photos))
    }
  }

// изменение данных авторизованного пользователя на API и в state
// возвращает значение ошибки в string[] | null для onSubmit
export const setProfileData = (data: ProfileType): ProfileThunkActionType<string[] | null> =>
  async (dispatch) => {
    const response = await profileAPI.setProfileData(data)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getProfile(data.userId || defaultUserId))
      return null
    } else {
      return response.messages
    }
  }

// запрос данных статуса из API
export const getStatus = (userId = defaultUserId): ProfileThunkActionType =>
  async (dispatch) => {
    dispatch(profileActions.toggleStatusProfileFetching(true))
    try {
      const response = await profileAPI.getStatus(userId)
      dispatch(profileActions.setStatusProfile(response))
    } catch (error) {
      const response = await profileAPI.getStatus(defaultUserId)
      dispatch(profileActions.setStatusProfile(response))
    }
    dispatch(profileActions.toggleStatusProfileFetching(false))
  }

// изменение данных статуса пользователя в API и в React
export const updateStatus = (status: string): ProfileThunkActionType =>
  async (dispatch) => {
    const response = await profileAPI.setStatus(status)

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setStatusProfile(status))
    }
  }

export default profileReducer;
