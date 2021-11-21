// import React from 'react';
import {addMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {getDialogs, getDialogsMessages, getDialogsTextMessagePlaceholder} from "../../reselect/dialogs-reselectors";


let mapStateToProps = state => {
  return {
    dialogs: getDialogs(state),
    messages: getDialogsMessages(state),
    textMessagePlaceholder: getDialogsTextMessagePlaceholder(state)
  }
}


export default compose(
  connect(mapStateToProps,{
    addMessage
  }),
  withAuthRedirect
)(Dialogs)

