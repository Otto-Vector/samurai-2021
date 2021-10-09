import {randomFaceImage} from "./randomFace";

const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_MESSAGE = 'CHANGE-MESSAGE'


let initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Dimych',
      imageURL: randomFaceImage(1),
    },
    {
      id: 2,
      name: 'Andrew',
      imageURL: randomFaceImage(2),
    },
    {
      id: 3,
      name: 'Sveta',
      imageURL: randomFaceImage(3),
    },
    {
      id: 4,
      name: 'Sasha',
      imageURL: randomFaceImage(4),
    },
    {
      id: 5,
      name: 'Viktor',
      imageURL: randomFaceImage(5),
    },
    {
      id: 6,
      name: 'Valera',
      imageURL: randomFaceImage(6),
    }
  ],
  messages: [
    {id: 1, message: 'Hi'},
    {id: 5, message: 'How is your it-kamasutra?(5)'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'YoMi'},
    {id: 4, message: 'YoG'},
    {id: 6, message: 'YoZh'},
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How is your it-kamasutra?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'YoMi'},
    {id: 4, message: 'YoG'},
    {id: 5, message: 'YoZh'},

  ],
  newMessageText: '',
  textMessagePlaceholder: 'Enter new message (Alt+Enter to send)'
}


const dialogsReducer = (state = initialState, action) => {


  switch (action.type) {

    case ADD_MESSAGE : {
      let rand = (Math.random() * 10).toFixed(0)
      let newMessage = {
        id: rand,
        message: state.newMessageText || `empty ${rand}`
      }

      return {
        ...state,
        newMessageText: '',
        messages: [newMessage, ...state.messages]
      }
    }

    case CHANGE_MESSAGE : {
       return {
        ...state,
        newMessageText: action.text
      }
    }

    default : {
      // return {...state}
    }
  }

  return state
}

export const addMessage = () => ({type: ADD_MESSAGE})
export const changeMessage = (text) => ({type: CHANGE_MESSAGE, text})

export default dialogsReducer;
