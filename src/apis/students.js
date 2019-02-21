import http from './httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8089/student"
 
export const query = (page, size) => {
  return http.requestQuickGet(apiUrl + "/query/page/" + page + "/" + size);
}

export const add = (studentObj) => {
  return http.requestPost(apiUrl + "/add", studentObj)
}

export const update = (studentObj) => {
  return http.requestPost(apiUrl + "/update", studentObj)
}

export const  search = (page,size,str) => {
  return http.requestPost(apiUrl + '/query/page/example/' + page + "/" + size, str )
}

// //批量添加-通过文件批量上传
// export const addUpload = (params) => {
//   return http.requestPost(apiUrl + "/add-upload", params);
// }

//删除
export const del = (studentNumber) => {
  return http.requestDelete(apiUrl + "/delete/" + studentNumber);
}

// export const download = () => {
//     return http.requestGet(apiUrl + "/import-template")
// }
export const uploadFile = (file) => {
  return http.requestPost(apiUrl + "/add/import/validate",file)
}

export const queryCache = () => {
  return http.requestQuickGet(apiUrl + "/query/import/cache")
}
export const uploadCache = () => {
  return http.requestPut(apiUrl + "/add/import/save")
}
