import React from 'react'
import styles from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import MessageTextForm from './MessageTextForm'
import { MessagesType } from '../../redux/types/types'
import withAuthRedirect from '../hoc/withAuthRedirect'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthorizedUserDataId } from '../../reselect/auth-reselectors'
import { getDialogs, getDialogsMessages, getDialogsTextMessagePlaceholder } from '../../reselect/dialogs-reselectors'
import { addMessage } from '../../redux/dialogs-reducer'

const Dialogs: React.FC = () => {

    const dispatch = useDispatch()

    const authId = useSelector( getAuthorizedUserDataId )
    const dialogs = useSelector( getDialogs )
    const messages = useSelector( getDialogsMessages )
    const textMessagePlaceholder = useSelector( getDialogsTextMessagePlaceholder )

    const onSubmit = ( { message }: MessagesType ) => {
        dispatch( addMessage( { id: authId, message } ) )
    }

    const dialogsElements = dialogs.map( ( args ) =>
        <DialogItem { ...args } key={ Math.random() || args.id }/> )

    const messagesElements = messages.map( ( args ) =>
        <Message { ...args } key={ Math.random() || args.id } image={ undefined }/> )

    return (
        <div className={ styles.dialogs }>
            <div className={ styles.dialogsItems }>
                { dialogsElements }
            </div>

            <div className={ styles.messagesField }>
                <div className={ styles.messages }>
                    { messagesElements }
                </div>
                <MessageTextForm onSubmit={ onSubmit }
                                 textMessagePlaceholder={ textMessagePlaceholder }
                />
            </div>
        </div>
    )
}


export default withAuthRedirect( Dialogs )
