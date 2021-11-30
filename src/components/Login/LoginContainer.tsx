import Login from "./Login";
import {connect} from "react-redux";
import {AuthThunkActionType, loginIn} from "../../redux/auth-reducer";
import {
  getAuthURL,
  getAuthCaptchaUrl,
  getIsAuthUser,
  // getAuthErrorsFromApi,
  // getAuthIsFetching
} from "../../reselect/auth-reselectors";
import {AppStateType} from "../../redux/redux-store";
import {LoginDataType} from "../../redux/types/types";

type MapStatePropsType = {
  isAuth: boolean
  authURL: string
  captchaUrl: string | null
  isFetching?: boolean
  errorsFromApi?: string | null
}

type DispatchPropsType = {
  loginIn: (loginData: LoginDataType) => AuthThunkActionType<string|null> | Promise<string|null>
}
//вот такой вот костылёк для TS :)
// type DispatchPropsTypeForComponent = {
//   loginIn: (loginData: LoginDataType) => Promise<string|null>
// }

export type LoginContainerType = MapStatePropsType & DispatchPropsType

// const LoginContainer = (props: LoginContainerType) => {
//
//   return <Login{ ...props }/>;
//
// }

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: getIsAuthUser(state),
    authURL: getAuthURL(state),
    captchaUrl: getAuthCaptchaUrl(state),
    // errorsFromApi: getAuthErrorsFromApi(state),
    // isFetching: getAuthIsFetching(state),
  }
}

export default connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>
(mapStateToProps, {loginIn})(Login)
