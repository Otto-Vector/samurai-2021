// import {randomFaceImage} from "../api/randomFace";
import {DialogsType, MessagesType} from "./types/types";

const ADD_MESSAGE = 'dialog-reducer/ADD-MESSAGE'

let initialState = {
    dialogs: [
        {
            id: 1,
            name: 'Dimych',
        },
        {
            id: 2,
            name: 'Andrew',
        },
        {
            id: 3,
            name: 'Sveta',
        },
        {
            id: 4,
            name: 'Sasha',
        },
        {
            id: 5,
            name: 'Viktor',
        },
        {
            id: 6,
            name: 'Valera',
        }
    ] as DialogsType[],
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
    ] as MessagesType[],
    textMessagePlaceholder: 'Enter new message (Alt+Enter to send)',
}

export type DialogsReducerStateType = typeof initialState
type ActionsType = addMessageActionType;

const dialogsReducer = (state = initialState, action: ActionsType): DialogsReducerStateType => {

    switch (action.type) {

        case ADD_MESSAGE : {

            return {
                ...state,
                messages: [
                    action.payload,
                  ...state.messages]
            }
        }

        default : {
            // return {...state}
        }
    }

    return state
}

type addMessageActionType = {
  type: typeof ADD_MESSAGE
  payload : MessagesType
}
export const addMessage = (payload: MessagesType) => ({type: ADD_MESSAGE, payload})

export default dialogsReducer;
