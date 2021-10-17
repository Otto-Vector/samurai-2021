// import React from 'react';
import {addMessage, changeMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText,
    textMessagePlaceholder: state.dialogsPage.textMessagePlaceholder
  }
}


// const DialogsContainer = withAuthRedirect(
//   connect(mapStateToProps,{addMessage, changeMessage})(Dialogs))

export default compose(
  connect(mapStateToProps,{
    addMessage, changeMessage
  }),
  withAuthRedirect
)(Dialogs)

