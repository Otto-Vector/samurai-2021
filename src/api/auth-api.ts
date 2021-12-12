import {AuthDataType, LoginDataType} from "../redux/types/types";
import {instance, ResponseApiType} from "./samurai-api";

export const authAPI = {
  //запрашиваем авторизацию по кукам
  getAuth() {
    return instance.get<ResponseApiType<AuthDataType>>(`auth/me`)
      .then(response => response.data)
  },
  //логинимся через лог-пароль
  loginIn(loginData: LoginDataType) {
    return instance.post<LoginDataType, {data: ResponseApiType<{ userId: number }>}>(`auth/login`, {...loginData})
      .then(response => response.data)
  },
  //разлогиниваемся
  loginOut() {
    return instance.delete<ResponseApiType>(`auth/login`)
      .then(response => response.data)
  }
}

export const securityAPI = {
  //для возвращения URL капчи
  getCaptchaUrl() {
    return instance.get<{ url: string }>(`security/get-captcha-url`)
      .then(response => response.data)
  }
}
