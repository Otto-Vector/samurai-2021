import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "2c7ffcd4-043c-4906-ad30-376abef26209"
  }
})

//настроил, чтобы он возвращал только .data
instance.interceptors.response.use(function (response) {
  return response.data
})


export const UsersAPI = {

  getUsers(pageSize = 2, page = 1, friend) {
    return instance.get(`users?count=${pageSize}&page=${page}&friend=${friend}`)
  },

  unfollow(id) {
    return instance.delete(`follow/${id}`)
  },

  follow(id) {
    return instance.post(`follow/${id}`)
  }

}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)
  },

  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },

  setStatus(status) {
    return instance.put(`profile/status/`, {status})
  },

  setPhoto(userPhoto) {
    let formData = new FormData();
    formData.append("image", userPhoto);
    return instance.put(`profile/photo`, formData)
  },

}

export const authAPI = {
  getAuth() {
    return instance.get(`auth/me`)
  },
  loginIn(loginData) {
    return instance.post(`auth/login`, {...loginData})
  },
  loginOut() {
    return instance.delete(`auth/login`)
  }
}

