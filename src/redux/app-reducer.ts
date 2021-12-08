import {getAuth} from "./auth-reducer";
import {getResponseFriends} from "./friends-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, GetActionsTypes} from "./redux-store";

const initialState = {
  initialazed: false,
}

export type AppReducerStateType = typeof initialState
type ActionTypes = GetActionsTypes<typeof appActions>

const appReducer = (state = initialState,
                    action: ActionTypes) : AppReducerStateType => {

  switch (action.type) {

    case 'app-reducer/SET_INITIALIZED' : {
      return {
        ...state,
        initialazed: true
      }
    }

    default : {
      // возвращаем вообще без изменений
      return state
    }
  }

}


/* ЭКШОНЫ */
const appActions = {
  // при обращении, изменяет стейт initialazed на true
  setInitialazedSuccess: () => ({type: 'app-reducer/SET_INITIALIZED'} as const),
}


/* САНКИ */
// конструктор для санок
export type InitialazedThunkActionType = ThunkAction<void, AppStateType, unknown, ActionTypes>

// просто ещё один Промис для кучи
const sleep = (ms: number) : Promise<Function> => new Promise(resolve => setTimeout(resolve, ms))

// запускаем комбайн загрузок/обращений к API
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
