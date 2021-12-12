import {PhotosType, ProfileType} from "../redux/types/types";
import {instance, ResponseApiType} from "./samurai-api";

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
