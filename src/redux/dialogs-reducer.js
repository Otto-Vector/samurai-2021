import {dialogs, messages} from "./dialogsData";

const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_MESSAGE = 'CHANGE-MESSAGE'

let initialState = {
      dialogs: dialogs,
      messages: messages,
      newMessageText : '',
    }


const dialogReducer = (state = initialState, action) => {

  let dialogFunctions = {

    addMessage() {
      let newMessage = {...state.messages[0]}
      newMessage.message = state.newMessageText
      if (state.newMessageText) state.messages.unshift(newMessage)
      state.newMessageText = ''
    },

    changeMessage(text) {
      state.newMessageText = text
    }
  }

  switch (action.type) {

    case ADD_MESSAGE : {
      dialogFunctions.addMessage()
      break
    }
    case CHANGE_MESSAGE : {
      dialogFunctions.changeMessage(action.text)
      break
    }
    default : {
      return state
    }
  }

  return state
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})
export const changeMessageActionCreator = (text) => ({type: CHANGE_MESSAGE, text})

export default dialogReducer;
