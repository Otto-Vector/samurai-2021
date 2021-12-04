// import React from 'react';
import {addMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {getDialogs, getDialogsMessages, getDialogsTextMessagePlaceholder} from "../../reselect/dialogs-reselectors";
import {getAuthorizedUserDataId} from "../../reselect/auth-reselectors";
import {DialogsType, MessagesType} from "../../redux/types/types";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
  authId: number | null
  dialogs: DialogsType[]
  messages: MessagesType[]
  textMessagePlaceholder: string
}

type MapDispatchPropsType = {
  addMessage: (payload: MessagesType) => void
}

export type DialogsContainerType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    authId: getAuthorizedUserDataId(state),
    dialogs: getDialogs(state),
    messages: getDialogsMessages(state),
    textMessagePlaceholder: getDialogsTextMessagePlaceholder(state)
  }
}


export default compose(
  connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps,{
    addMessage
  }),
  withAuthRedirect
)(Dialogs)