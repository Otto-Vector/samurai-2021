import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props) => {

  //считываем alt+Enter(13) для добавления ссобщения
  let onkey = (event) => {
    if (event.keyCode === 13 && event.altKey) {
      props.addMessage()
    }
  }

  //хардкодим сопоставление иконок айдишникам
  let zz = (idd) => {
    for (let {id, imageURL} of props.dialogs)
      if (id === +idd) return imageURL
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
                      placeholder={props.textMessagePlaceholder}
                      onKeyDown={onkey}
                      onChange={(e) => {
                        props.changeMessage(e.target.value)
                      }}
                      value={props.newMessageText}/>
          <button className={styles.button}
                  onClick={() => {
                    props.addMessage()
                  }}
          >Add message
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dialogs;
