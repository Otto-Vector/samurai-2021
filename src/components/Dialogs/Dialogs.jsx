import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props) => {

  let textarea = React.createRef();

  let addMessage = () => {
    let type = 'ADD-MESSAGE'
    props.dispatch({type})
  }

  let changeMessage = () => {
    let text = textarea.current.value
    props.dispatch({type: 'CHANGE-MESSAGE', text})
  }

  let onkey = (event) => {
    if (event.key === "Enter") {
      addMessage()
    }
  }

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
                      ref = {textarea}
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
