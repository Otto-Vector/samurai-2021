import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY" : "2c7ffcd4-043c-4906-ad30-376abef26209"
  }
})

//настроил, чтобы он возвращал только .data
instance.interceptors.response.use(function (response) {
  return response.data
})


export const UsersAPI = {

  getUsers (pageSize=2, page=1, friend=null) {
    return instance.get(`users?count=${pageSize}&page=${page}&friend=${friend}`)
      // .then(response => response.data)
    },

  unfollow (id) {
    return instance.delete(`follow/${id}`)
      // .then(response => response.data)
  },

  follow (id) {
    return instance.post(`follow/${id}`)
      // .then(response => response.data)
  }

}

export const ProfileAPI = {
  getProfile (userId) {
    return instance.get(`profile/${userId}`)
      // .then(response => response.data)
  }
}

export const AuthAPI = {
  getAuth() {
    return instance.get(`auth/me`)
      // .then(({data}) => data)
  }
}

export const StatusAPI = {
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  }
}
