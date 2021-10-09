// import React from 'react';
import {addMessage, changeMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText,
    textMessagePlaceholder: state.dialogsPage.textMessagePlaceholder
  }
}


const DialogsContainer = connect(mapStateToProps,
  {addMessage, changeMessage})(Dialogs)

export default DialogsContainer;
