import {getAuth} from "./auth-reducer";
import {getResponseFriends} from "./friends-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, GetActionsTypes} from "./redux-store";

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

const sleep = (ms: number) : Promise<Function> => new Promise(resolve => setTimeout(resolve, ms))

const appActions = {
  setInitialazedSuccess: () => ({type: 'app-reducer/SET_INITIALAZED'} as const),
}

// const importedActions: ActionsAnyType = {
// const importedActions = {
//   getAuth, //санка
//   getResponseFriends //тоже санка
// }
// почему-то работает без этого типа в InitialazedThunkActionType
// type ImportedActionTypes = GetActionsTypes<typeof importedActions>

export type InitialazedThunkActionType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const initialazedAll = (): InitialazedThunkActionType =>
  (dispatch) => {
    let promise = dispatch(getAuth())
    let promise2 = sleep(100)
    let friends = dispatch(getResponseFriends())

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
