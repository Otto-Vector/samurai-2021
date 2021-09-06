import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";



const Dialogs = (props) => {


    let dialogsElements = props.dialogs.map(args => <DialogItem {...args} />)
    let messagesElements =  props.messages.map(args => <Message {...args}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>


            <div className={s.messages}>
                { messagesElements }
            </div>
        </div>
    )
}

export default Dialogs;
