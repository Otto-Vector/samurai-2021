// import React from 'react';
import {addMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {getDialogs, getDialogsMessages, getDialogsTextMessagePlaceholder} from "../../reselect/dialogs-reselectors";
import {getAuthorizedUserDataId} from "../../reselect/auth-reselectors";


let mapStateToProps = state => {
  return {
    authId: getAuthorizedUserDataId(state),
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

