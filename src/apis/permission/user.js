import http from '../httpServer'
let apiUrl = "http://txsh1.iyuhui.cn:8093/user"
 
export const query = () => {
  return http.requestQuickGet(apiUrl + "/query/all");
}

export const add = (menu) => {
  return http.requestPost(apiUrl + "/add", menu)
}

export const del = (menuID) => {
  return http.requestDelete(apiUrl + "/delete/" + menuID)
}

export const login = (accPaw) => {
  return http.requestPost(apiUrl + "/login", accPaw)
}

export const update = (password) => {
  return http.requestPost(apiUrl +"/update/password?password=" + password)
}