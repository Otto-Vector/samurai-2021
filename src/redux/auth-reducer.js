import {authAPI} from "../api/samurai-api";

const SET_AUTH = 'SET-AUTH'
const IS_FETCHING_SWICH_TO = 'IS-FETCHING-SWICH-TO'

let initialState = {
    data: {
      id: null,
      email: null,
      login: null
    },
  isFetching: true,
  isAuth: false,
}


const authReducer = (state = initialState, action) => {

   switch (action.type) {

    case SET_AUTH : {
      return {
        ...state,
        data: {...action.data},
        isAuth: true
      }
    }
      case IS_FETCHING_SWICH_TO : {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    default : {
      // return {...state}
    }
  }

  return state
}

export const setAuthUserData = (data) => ({type: SET_AUTH, data})
export const isFetchingSwichTo = (isFetching) => ({type: IS_FETCHING_SWICH_TO, isFetching})

 export const getAuth = () => {
   return (dispatch) => {
     dispatch(isFetchingSwichTo(true))
     authAPI.getAuth()
       .then(response => {
         if (response.resultCode === 0) {
           dispatch(setAuthUserData(response.data))
           dispatch(isFetchingSwichTo(false))
         }
       })
   }
 }
export default authReducer;
