import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageTextForm from "./MessageTextForm";

const Dialogs = (props) => {

  let onSubmit = (formData, form) => {
    props.addMessage({id: props.authId, message: formData.message})
    //сброс значений после ввода
    form.reset()
  }

  //хардкодим сопоставление иконок айдишникам
  let zz = (idd) => {
    for (let {id} of props.dialogs)
      if (id === +idd) return null
  }


  let dialogsElements = props.dialogs.map(args => <DialogItem {...args} key={Math.random().toString()}/>)
  let messagesElements = props.messages.map(
    args => <Message {...args} key={Math.random().toString()} image={zz(args.id)}/>)

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogsElements}
      </div>

      <div className={styles.messagesField}>
        <div className={styles.messages}>
          {messagesElements}
        </div>
        <MessageTextForm onSubmit={onSubmit}
                         textMessagePlaceholder={props.textMessagePlaceholder}
        />
      </div>
    </div>
  )
}

export default Dialogs;
