// import React from 'react';
import {addMessageActionCreator, changeMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


// const DialogsContainer = (props) => {
//
//   let state = props.state.getState().dialogsPage
//
//   let addMessage = () => {
//     let action = addMessageActionCreator()
//     props.state.dispatch(action)
//   }
//
//   let changeMessage = (text) => {
//     let action = changeMessageActionCreator(text)
//     props.state.dispatch(action)
//   }
//
//
//   return <Dialogs
//     dialogs={state.dialogs}
//     messages={state.messages}
//     newMessageText = {state.newMessageText}
//     textMessagePlaceholder = {state.textMessagePlaceholder}
//     addMessage = {addMessage}
//     changeMessage = {changeMessage}
//   />;
// }

let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText,
    textMessagePlaceholder: state.dialogsPage.textMessagePlaceholder
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: () => {
      dispatch(addMessageActionCreator())
    },
    changeMessage: (text) => {
      dispatch(changeMessageActionCreator(text))
    }
  }
}

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)

export default DialogsContainer;
