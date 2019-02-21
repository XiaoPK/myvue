import http from './httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8089/classroom"
 
export const query = (page, size) => {
  return http.requestQuickGet(apiUrl + "/query/page/" + page + "/" + size);
}

export const add = (labObj) => {
  return http.requestPost(apiUrl + "/add", labObj)
}

export const update = (labObj) => {
  return http.requestPost(apiUrl + "/update", labObj)
}

export const  search = (page,size,str) => {
  return http.requestPost(apiUrl + '/query/page/example/' + page + "/" + size, str )
}

// //批量添加-通过文件批量上传
// export const addUpload = (params) => {
//   return http.requestPost(apiUrl + "/add-upload", params);
// }

//删除
export const del = (labNumber) => {
  return http.requestDelete(apiUrl + "/delete/" + labNumber);
}

// export const download = () => {
//   return http.requestQuickGet(apiUrl + "/query/import-template")
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
