import {randomFaceImage} from "../api/randomFace";
const ADD_MESSAGE = 'ADD-MESSAGE'


let initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Dimych',
      imageURL: randomFaceImage,
    },
    {
      id: 2,
      name: 'Andrew',
      imageURL: randomFaceImage,
    },
    {
      id: 3,
      name: 'Sveta',
      imageURL: randomFaceImage,
    },
    {
      id: 4,
      name: 'Sasha',
      imageURL: randomFaceImage,
    },
    {
      id: 5,
      name: 'Viktor',
      imageURL: randomFaceImage,
    },
    {
      id: 6,
      name: 'Valera',
      imageURL: randomFaceImage,
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
  textMessagePlaceholder: 'Enter new message (Alt+Enter to send)'
}


const dialogsReducer = (state = initialState, action) => {


  switch (action.type) {

    case ADD_MESSAGE : {
      let rand = (Math.random() * 10).toFixed(0)
      let newMessage = {
        id: rand,
        message: action.newMessageText || `empty ${rand}`
      }

      return {
        ...state,
        messages: [newMessage, ...state.messages]
      }
    }

    default : {
      // return {...state}
    }
  }

  return state
}

export const addMessage = (newMessageText) => ({type: ADD_MESSAGE, newMessageText})

export default dialogsReducer;
