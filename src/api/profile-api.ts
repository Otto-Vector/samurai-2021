import {PhotosType, ProfileType} from "../redux/types/types";
import {instance, ResponseApiType} from "./samurai-api";

export const profileAPI = {
  // запрос на сервер за данными пользователя
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${ userId }`)
      .then(response => response.data)
  },
  // загрузка данных профиля из формы на сервер
  setProfileData(data: ProfileType) {
    return instance.put<ProfileType, { data: ResponseApiType }>(`profile`, data)
      .then(response => response.data)
  },
  // запрос статуса пользователя
  getStatus(userId: number) {
    return instance.get<string | null>(`profile/status/${ userId }`)
      .then(response => response.data)
  },
  // загрузка строки в статус пользователя на сервер
  setStatus(status: string) {
    return instance.put<{ status: string }, { data: ResponseApiType }>(`profile/status`, {status})
      .then(res => res.data)
  },
  //загрузка фото на сервер и возврат двух ссылок
  setPhoto(userPhoto: File) {
    let formData = new FormData();
    formData.append("image", userPhoto);
    return instance.put<FormData, { data: ResponseApiType<{ photos: PhotosType }> }>(`profile/photo`, formData)
      .then(res => res.data)
  },
}
