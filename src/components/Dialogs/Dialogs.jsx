import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageActionCreator, changeMessageActionCreator} from "../../redux/dialogs-reducer";


const Dialogs = (props) => {

  let textMessagePlaceholder = 'Enter new message (Alt+Enter to send)'

  let addMessage = () => {
    let action = addMessageActionCreator()
    props.dispatch(action)
  }

  let changeMessage = (e) => {
    let text = e.target.value
    let action = changeMessageActionCreator(text)
    props.dispatch(action)
  }

  //считываем alt+Enter(13) для добавления ссобщения
  let onkey = (event) => {
    if (event.keyCode === 13 && event.altKey) {
      addMessage()
    }
  }

  //хардкодим сопоставление иконок айдишникам
  let zz = (idd) => {
        for (let {id, imageURL} of props.dialogs)
           if (id===idd) return imageURL
  }


  let dialogsElements = props.dialogs.map(args => <DialogItem {...args} key={Math.random().toString()}/>)
  let messagesElements = props.messages.map(
    (args) =>
    <Message {...args} key={Math.random().toString()} image={zz(args.id)}/>)

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogsElements}
      </div>

      <div className={styles.messagesField}>
        <div className={styles.messages}>
          {messagesElements}
        </div>
          <div className={styles.addField}>
            <textarea className={styles.textarea}
                      placeholder={textMessagePlaceholder}
                      onChange={changeMessage}
                      onKeyDown={onkey}
                      value={props.newMessageText}/>
            <button className={styles.button}
                    onClick={addMessage}
            >Add message</button>
          </div>
      </div>
    </div>
  )
}

export default Dialogs;
