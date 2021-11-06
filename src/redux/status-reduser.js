import {profileAPI} from "../api/samurai-api";

const SET_STATUS = 'SET-STATUS-PROFILE'
const TOGGLE_STATUS_FETCHING = 'TOGGLE-STATUS-FETCHING'

let initialState = {
  profileStatusText: '',
  profileStatusFetching: true,
  profileStatusPlaceholder: 'введите статус',
}

const statusReducer = (state = initialState, action) => {

  switch (action.type) {

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


export const setStatusProfile = profileStatusText => ({type: SET_STATUS, profileStatusText})
export const toggleStatusProfileFetching = profileStatusFetching => ({
  type: TOGGLE_STATUS_FETCHING,
  profileStatusFetching
})


export const getStatus = (userId = 11) =>
  async dispatch => {
    dispatch(toggleStatusProfileFetching(true))
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatusProfile(response))
    dispatch(toggleStatusProfileFetching(false))
  }

export const updateStatus = status =>
  async dispatch => {
    let response = await profileAPI.setStatus(status)

    if (response.resultCode === 0) {
      dispatch(setStatusProfile(status))
    }
  }

export default statusReducer;
