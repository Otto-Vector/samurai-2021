import {getAuth} from "./auth-reducer";
import {getResponseFriends} from "./friends-reducer";

const SET_INITIALAZED = 'SET_INITIALAZED'

export type AppReducerStateType = {
  initialazed: boolean,
}

let initialState: AppReducerStateType = {
  initialazed: false,
}


const appReducer = (state = initialState,
                    action: setInitialazedSuccessActionType) : AppReducerStateType => {

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
type setInitialazedSuccessActionType = { type: typeof SET_INITIALAZED }
export const setInitialazedSuccess = (): setInitialazedSuccessActionType => ({type: SET_INITIALAZED})
const sleep = (ms: number) : Promise<Function> => new Promise(resolve => setTimeout(resolve, ms))

export const initialazedAll = () => {
  return (dispatch : Function) => {
    let promise = dispatch(getAuth())
    let promise2 = sleep(100)
    let friends = dispatch(getResponseFriends())

    Promise.all([
        promise,
        promise2,
        friends
      ])
      .then(() => {
        dispatch(setInitialazedSuccess())
      })
  }
}


export default appReducer;
