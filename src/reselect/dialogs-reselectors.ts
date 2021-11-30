import {AppStateType} from "../redux/redux-store";
import {DialogsReducerStateType} from "../redux/dialogs-reducer";
import {DialogsType, MessagesType} from "../redux/types/types";

type AppStateReturned<T> = (state: AppStateType) => T

export const getDialogs: AppStateReturned<DialogsType[]> = state => state.dialogsPage.dialogs
export const getDialogsMessages: AppStateReturned<MessagesType[]> = state => state.dialogsPage.messages
export const getDialogsTextMessagePlaceholder: AppStateReturned<DialogsReducerStateType['textMessagePlaceholder']> = state => state.dialogsPage.textMessagePlaceholder
