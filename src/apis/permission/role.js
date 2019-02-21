import http from '../httpServer'
let apiUrl = "http://txsh1.iyuhui.cn:8093/role"
 
export const query = () => {
  return http.requestQuickGet(apiUrl + "/query/all");
}

export const add = (menu) => {
  return http.requestPost(apiUrl + "/add", menu)
}

export const del = (menuID) => {
  return http.requestDelete(apiUrl + "/delete/" + menuID)
}