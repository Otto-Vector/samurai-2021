import Login from "./Login";
import {connect} from "react-redux";
import {AuthThunkActionType, loginIn} from "../../redux/auth-reducer";
import {
  getAuthURL,
  getAuthCaptchaUrl,
  getIsAuthUser,
} from "../../reselect/auth-reselectors";
import {AppStateType} from "../../redux/redux-store";
import {LoginDataType} from "../../redux/types/types";

type MapStatePropsType = {
  isAuth: boolean
  authURL: string
  captchaUrl: string | null
}
type DispatchPropsType = {
  loginIn: (loginData: LoginDataType) => AuthThunkActionType<string[] | null> | Promise<string[] | null>
}
export type LoginContainerType = MapStatePropsType & DispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: getIsAuthUser(state),
    authURL: getAuthURL(state),
    captchaUrl: getAuthCaptchaUrl(state),
  }
}

export default connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>
(mapStateToProps, {loginIn})(Login)
