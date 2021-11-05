import {connect} from "react-redux";
import ProfileStatusFunc from "./ProfileStatusFunc";
import {getStatus, updateStatus} from "../../../../redux/status-reduser";

let mapStateToProps = state => {
  return {
    profileStatusText: state.profileStatus.profileStatusText,
    profileStatusFetching: state.profileStatus.profileStatusFetching,
    profileStatusPlaceholder: state.profileStatus.profileStatusPlaceholder,
    isAuthProfile: state.profilePage.isAuthProfile
  }
}

export const ProfileStatusContainer = connect(mapStateToProps, {
  getStatus,
  updateStatus
})(ProfileStatusFunc)
