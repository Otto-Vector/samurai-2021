import {connect} from "react-redux";
import {loginOut} from "../../redux/auth-reducer";
import Header from "./Header";
import {getAuthorizedUserData, getIsAuthUser} from "../../reselect/auth-reselectors";
import {AppStateType} from "../../redux/redux-store";
import {AuthDataType} from "../../redux/types/types";

type MapStatePropsType = {
  data: AuthDataType
  isAuth: boolean
}

type DispatchPropsType = {
  loginOut: () => void
}
export type HeaderContainerType = MapStatePropsType & DispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    data: getAuthorizedUserData(state),
    isAuth: getIsAuthUser(state),
  }
}

export default connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,
  {loginOut})(Header)

