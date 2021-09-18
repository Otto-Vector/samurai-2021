import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props) => {

  let textMessagePlaceholder = props.textMessagePlaceholder
  let newMessageText = props.newMessageText

  let addMessage = () => {
    props.addMessage()
  }
  //считываем alt+Enter(13) для добавления ссобщения
  let onkey = (event) => {
    if (event.keyCode === 13 && event.altKey) {
      addMessage()
    }
  }

  let changeMessage = (e) => {
    let text = e.target.value
    props.changeMessage(text)
  }

  //хардкодим сопоставление иконок айдишникам
  let zz = (idd) => {
        for (let {id, imageURL} of props.dialogs)
           if (id===idd) return imageURL
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
          <div className={styles.addField}>
            <textarea className={styles.textarea}
                      placeholder={textMessagePlaceholder}
                      onChange={changeMessage}
                      onKeyDown={onkey}
                      value={newMessageText}/>
            <button className={styles.button}
                    onClick={addMessage}
            >Add message</button>
          </div>
      </div>
    </div>
  )
}

export default Dialogs;
