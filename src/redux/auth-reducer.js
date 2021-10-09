
const SET_AUTH = 'SET-AUTH'


let initialState = {
    data: {
      id: null,
      email: null,
      login: null
    },
  isFetching: false,
  isAuth: false
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
    default : {
      // return {...state}
    }
  }

  return state
}

export const setAuthUserData = (data) => ({type: SET_AUTH, data})

export default authReducer;
