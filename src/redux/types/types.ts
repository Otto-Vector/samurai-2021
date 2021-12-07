export type AuthDataType = {
  id: number | null,
  email: string | null,
  login: string | null
}

export type LoginDataType = {
  email: string
  login: string
  rememberMe: boolean
  captcha: string | null
}

export type DialogsType = {
  id: number,
  name: string
}
export type MessagesType = {
  id: number | null,
  message: string
}

export type PhotosType = {
  small: string | null
  large: string | null
}

//Объект, возвращаемый при поиске пользователей
export type UsersFromSearchType = {
  id: number
  name: string
  status: string | null
  photos: PhotosType
  followed: boolean
}

export type PostType = {
  id: number
  imageURL: string | null
  message: string | null
  likesCount: number | null
}

export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type ProfileType = {
  aboutMe: string | null,
  userId: number | undefined
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string
  contacts: ContactsType
  photos: PhotosType
}
