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


export const getStatus = (userId) => dispatch => {
      dispatch(toggleStatusProfileFetching(true))
  profileAPI.getStatus(userId)
    .then(response => {
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

export default statusReducer;
