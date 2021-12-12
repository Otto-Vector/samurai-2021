import {UsersFromSearchType} from "../redux/types/types";
import {instance, ResponseApiType} from "./samurai-api";

// этот тип отличается от других стандартных и подходит только для Users
export type ResponseUsersApiType = {
  items: UsersFromSearchType[]
  totalCount: number
  error: string | null
}
export const UsersAPI = {
  // запрос одной страницы пользователей из сервера
  getUsers(pageSize = 2, page = 1, isFriendsFilter: boolean | null) {
    return instance.get<ResponseUsersApiType>(`users?count=${ pageSize }&page=${ page }&friend=${ isFriendsFilter }`)
      .then(response => response.data)
  },
  // отписаться
  unfollow(id: number) {
    return instance.delete<ResponseApiType>(`follow/${ id }`)
      .then(res => res.data)
  },
  // подписаться
  follow(id: number) {
    return instance.post<ResponseApiType>(`follow/${ id }`)
      .then(res => res.data)
  }
}
