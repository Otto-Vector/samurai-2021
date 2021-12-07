import {getAuth} from "./auth-reducer";
import {getResponseFriends} from "./friends-reducer";
import {ThunkAction} from "redux-thunk";
import {ActionsAnyType, AppStateType, GetActionsTypes} from "./redux-store";

// const SET_INITIALAZED = 'app-reducer/SET_INITIALAZED'


let initialState = {
  initialazed: false,
}

export type AppReducerStateType = typeof initialState

type ActionTypes = GetActionsTypes<typeof appActions>

const appReducer = (state = initialState,
                    action: ActionTypes) : AppReducerStateType => {

  switch (action.type) {

    case 'app-reducer/SET_INITIALAZED' : {
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
// type setInitialazedSuccessActionType = { type: typeof SET_INITIALAZED }
// export const setInitialazedSuccess = (): setInitialazedSuccessActionType => ({type: 'app-reducer/SET_INITIALAZED'})
const sleep = (ms: number) : Promise<Function> => new Promise(resolve => setTimeout(resolve, ms))

const appActions = {
  setInitialazedSuccess: () => ({type: 'app-reducer/SET_INITIALAZED'} as const),
}

// const importedActions: ActionsAnyType = {
const importedActions = {
  getAuth,
  getResponseFriends
}
// почему-то работает без этого типа в InitialazedThunkActionType
// type ImportedActionTypes = GetActionsTypes<typeof importedActions>

export type InitialazedThunkActionType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const initialazedAll = (): InitialazedThunkActionType =>
  (dispatch) => {
    let promise = dispatch(importedActions.getAuth())
    let promise2 = sleep(100)
    let friends = dispatch(importedActions.getResponseFriends())

    Promise.all([
        promise,
        promise2,
        friends
      ])
      .then(() => {
        dispatch(appActions.setInitialazedSuccess())
      })
}


export default appReducer;
