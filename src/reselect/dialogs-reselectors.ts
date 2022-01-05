import { AppStateType } from '../redux/redux-store'
import { DialogsReducerStateType } from '../redux/dialogs-reducer'

type DialogsReselector<T extends keyof Y, Y = DialogsReducerStateType> = ( state: AppStateType ) => Y[T]

export const getDialogs: DialogsReselector<'dialogs'> = state => state.dialogsPage.dialogs
export const getDialogsMessages: DialogsReselector<'messages'> = state => state.dialogsPage.messages
export const getDialogsTextMessagePlaceholder: DialogsReselector<'textMessagePlaceholder'> = state => state.dialogsPage.textMessagePlaceholder
