import React from 'react';
import {addMessageActionCreator, changeMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {

  let state = props.state.getState().dialogsPage

  let addMessage = () => {
    let action = addMessageActionCreator()
    props.state.dispatch(action)
  }

  let changeMessage = (text) => {
    let action = changeMessageActionCreator(text)
    props.state.dispatch(action)
  }


  return <Dialogs
    dialogs={state.dialogs}
    messages={state.messages}
    newMessageText = {state.newMessageText}
    textMessagePlaceholder = {state.textMessagePlaceholder}
    addMessage = {addMessage}
    changeMessage = {changeMessage}
  />;
}

export default DialogsContainer;
