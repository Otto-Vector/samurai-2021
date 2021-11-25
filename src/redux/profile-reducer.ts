import {randomFaceImage} from "../api/randomFace";
import {profileAPI} from "../api/samurai-api";
import {PhotosType, PostType, ProfileType} from "./types/types";
import {Dispatch} from "redux";

const ADD_POST = 'ADD-POST'
const SET_PROFILE_STATE = 'SET-PROFILE-STATE'
const TOGGLE_FETCHING = 'TOGGLE-FETCHING'
const SET_IS_AUTH_PROFILE = 'SET-IS-AUTH-PROFILE'
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'
const SET_STATUS = 'SET-STATUS-PROFILE'
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
    ] as PostType[],

    newPostTextPlaceholder: 'add new post here' as string | null,
    profile: null as ProfileType | null,
    isFetching: true,
    isAuthProfile: false,

    profileStatusText: null as string | null,
    profileStatusFetching: true,
    profileStatusPlaceholder: 'input status here' as string | null
}

export type ProfileReducerStateType = typeof initialState
type ActionsTypes =
    AddPostActionType |
    SetProfileStateActionType |
    SetIsAuthProfileActionType |
    ToggleIsFetchingProfileActionType |
    SetPhotoSuccessActionType |
    SetStatusProfileActionType |
    ToggleStatusProfileFetchingActionType

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

export const getProfile = (userId = defaultUserId) =>
    async (dispatch: Function) => {
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

export const setPhoto = (userPhoto: string) =>
    async (dispatch: Dispatch<SetPhotoSuccessActionType>) => {
        let response = await profileAPI.setPhoto(userPhoto)
        if (response.resultCode === 0) {
            dispatch(setPhotoSuccess(response.data.photos))
        }
    }

export const setProfileData = (data: ProfileType) =>
    async (dispatch: Function) => {
        let response = await profileAPI.setData(data)
        if (response.resultCode === 0) {
            dispatch(getProfile(data.userId))
            return null
        } else {
            return response.messages
        }

    }


export const getStatus = (userId = defaultUserId) =>
    async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(toggleStatusProfileFetching(true))
        try {
            let response = await profileAPI.getStatus(userId)
            dispatch(setStatusProfile(response))
        } catch (error) {
            // console.error(error)
            let response = await profileAPI.getStatus(defaultUserId)
            dispatch(setStatusProfile(response))
        }
        dispatch(toggleStatusProfileFetching(false))
    }

export const updateStatus = (status: string) =>
    async (dispatch: Dispatch<SetStatusProfileActionType>) => {
        let response = await profileAPI.setStatus(status)

        if (response.resultCode === 0) {
            dispatch(setStatusProfile(status))
        }
    }

export default profileReducer;
