import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  // transformResponse: (resp) => resp.data,
  headers: {
    "API-KEY": "2c7ffcd4-043c-4906-ad30-376abef26209"
  }
})

//настроил, чтобы он возвращал только .data
// instance.interceptors.response.use(function (response) {
//   return response.data
// })
// const responseData = (response: any) => response.data

export enum ResultCodesEnum {
  Success = 0,
  Error = 1 //пока нигде не используется, потому что else
}

export enum ResultCodesWithCaptchaEnum {
  CaptchaRequired = 10
}

//стандартно возвращаемый тип с подстановкой
export type ResponseApiType<DataIs = {}> = {
  data: DataIs
  resultCode: ResultCodesEnum | ResultCodesWithCaptchaEnum
  messages: string[]
}


