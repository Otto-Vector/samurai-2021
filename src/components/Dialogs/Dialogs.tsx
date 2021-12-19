import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageTextForm from "./MessageTextForm";
import {DialogsContainerType} from "./DialogsContainer";
import {MessagesType} from "../../redux/types/types";

const Dialogs: React.FC<DialogsContainerType> = (
  {dialogs,addMessage,messages,authId,textMessagePlaceholder}) => {


  const onSubmit = ({message}: MessagesType) => {
    addMessage({id: authId, message})
  }


  const dialogsElements = dialogs.map((args) => <DialogItem {...args} key={args.id} />)
  const messagesElements = messages.map(
    (args) => <Message {...args} key={args.id} image={undefined}/>)

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
                         textMessagePlaceholder={textMessagePlaceholder}
        />
      </div>
    </div>
  )
}

export default Dialogs;
