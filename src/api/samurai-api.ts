import axios from "axios";
import {AuthDataType, LoginDataType, PhotosType, ProfileType, UsersFromSearchType} from "../redux/types/types";

const instance = axios.create({
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
  Error = 1
}

export enum ResultCodesWithCaptchaEnum {
  CaptchaRequired = 10
}

type ResponseApiType<DataIs = {}> = {
  data: DataIs
  resultCode: ResultCodesEnum | ResultCodesWithCaptchaEnum
  messages: string[]
}

type ResponseUserApiType = {
  items: UsersFromSearchType[]
  totalCount: number
  error: string | null
}

export const UsersAPI = {

  getUsers(pageSize = 2, page = 1, isFriendsFilter: boolean | null) {
    return instance.get<ResponseUserApiType>(`users?count=${ pageSize }&page=${ page }&friend=${ isFriendsFilter }`)
      .then(response => response.data)
  },

  unfollow(id: number) {
    return instance.delete<ResponseApiType>(`follow/${ id }`)
      .then(res => res.data)
  },

  follow(id: number) {
    return instance.post<ResponseApiType>(`follow/${ id }`)
      .then(res => res.data)
  }
}


export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${ userId }`)
      .then(response => response.data)
  },

  getStatus(userId: number) {
    return instance.get<string | null>(`profile/status/${ userId }`)
      .then(response => response.data)
  },

  setStatus(status: string) {
    return instance.put<{ status: string }, ResponseApiType<ResponseApiType>>(`profile/status`, {status})
      .then(res => res.data)
  },
  //загрузка фото
  setPhoto(userPhoto: File) {
    let formData = new FormData();
    formData.append("image", userPhoto);
    return instance.put<FormData, ResponseApiType<ResponseApiType<{ photos: PhotosType }>>>(`profile/photo`, formData)
      .then(res => res.data)
  },

  setProfileData(data: ProfileType) {
    // userId, lookingForAJob, lookingForAJobDescription, fullName, aboutMe
    // contacts: { github, vk, facebook, instagram, twitter, website, youtube, mainLink}
    return instance.put<ProfileType, ResponseApiType<ResponseApiType>>(`profile`, data)
      .then(response => response.data)
  }
}


export const authAPI = {
  getAuth() {
    return instance.get<ResponseApiType<AuthDataType>>(`auth/me`)
      .then(response => response.data)
  },
  loginIn(loginData: LoginDataType) {
    return instance.post<LoginDataType, ResponseApiType<ResponseApiType<{ userId: number }>>>(`auth/login`, {...loginData})
      .then(response => response.data)
  },
  loginOut() {
    return instance.delete<ResponseApiType>(`auth/login`)
      .then(response => response.data)
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<{ url: string }>(`security/get-captcha-url`)
      .then(response => response.data)
  }
}

