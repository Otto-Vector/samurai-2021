import {getAuth} from "./auth-reducer";

const SET_INITIALAZED = 'SET_INITIALAZED'


let initialState = {
  initialazed: false
}


const appReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_INITIALAZED : {
      return {
        ...state,
        initialazed: true
      }
    }

    default : {
      return {...state}
    }
  }

  // return state
}

export const setInitialazedSuccess = () => ({type: SET_INITIALAZED})
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const initialazedAll = () => {
  return dispatch => {
    let promise = dispatch(getAuth())
    let promise2 = sleep(1500)

    Promise.all([promise, promise2])
      .then(() => {
        dispatch(setInitialazedSuccess())
      })
  }
}


export default appReducer;
