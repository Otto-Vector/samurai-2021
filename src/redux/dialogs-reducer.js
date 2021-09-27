import {dialogs, messages} from "./dialogsData";

const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_MESSAGE = 'CHANGE-MESSAGE'

let initialState = {
      dialogs: dialogs,
      messages: messages,
      newMessageText : '',
      textMessagePlaceholder : 'Enter new message (Alt+Enter to send)'
    }


const dialogsReducer = (state = initialState, action) => {

  let stateCopyFunction = {

    addMessage() {
      let rand = (Math.random() * 10).toFixed(0)
      let newMessage = {
        id: rand,
        message: state.newMessageText || `empty ${rand}`
      }

      return {
        ...state,
        newMessageText: '',
        messages: [ newMessage, ...state.messages ]
      }

    },

    changeMessage(text) {
      return {
        ...state,
        newMessageText: text
      }

    }
  }


  switch (action.type) {

    case ADD_MESSAGE : {
      return stateCopyFunction.addMessage()

    }
    case CHANGE_MESSAGE : {
      return stateCopyFunction.changeMessage( action.text )
    }
    default : {
      // return {...state}
    }
  }

  return state
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})
export const changeMessageActionCreator = (text) => ({type: CHANGE_MESSAGE, text})

export default dialogsReducer;
