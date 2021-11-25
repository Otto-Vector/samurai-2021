export type AuthDataType =  {
    id: number | null,
    email: string | null,
    login: string | null
}

export type DialogsType = {
  id: number,
  name: string
}
export type MessagesType = {
  id: number,
  message: string
}

export type PhotosType = {
  small: string | null
  large: string | null
}

export type UsersFromType = {
  id: number
  name: string
  status: string | null
  photos: PhotosType
  followed: boolean
}

export type PostType = {
    id: number | null
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
    userId: number | undefined
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
