import http from './httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8089/student-course"
 
export const query = (page, size) => {
  return http.requestQuickGet(apiUrl + "/query/page/" + page + "/" + size);
}

export const add = (labObj) => {
  return http.requestPost(apiUrl + "/add", labObj)
}


//删除
export const del = (labNumber) => {
  return http.requestDelete(apiUrl + "/delete/" + labNumber);
}


