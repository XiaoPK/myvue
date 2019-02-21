import http from './httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8089/teacher"
 
export const query = (page, size) => {
  return http.requestQuickGet(apiUrl + "/query/page/" + page + "/" + size);
}

export const add = (teacherObj) => {
  return http.requestPost(apiUrl + "/add", teacherObj)
}

export const update = (teacherObj) => {
  return http.requestPost(apiUrl + "/update", teacherObj)
}

export const  search = (page,size,str) => {
  return http.requestPost(apiUrl + '/query/page/example/' + page + "/" + size, str )
}

// //批量添加-通过文件批量上传
// export const addUpload = (params) => {
//   return http.requestPost(apiUrl + "/add-upload", params);
// }

//删除
export const del = (teacherNumber) => {
  return http.requestDelete(apiUrl + "/delete/" + teacherNumber);
}

//导入接口
export const uploadFile = (file) => {
  return http.requestPost(apiUrl + "/add/import/validate",file)
}

export const queryCache = () => {
  return http.requestQuickGet(apiUrl + "/query/import/cache")
}
export const uploadCache = () => {
  return http.requestPut(apiUrl + "/add/import/save")
}

//导出
export const exportData = () =>{
  return http.requestQuickGet(apiUrl + "/query/1/10000/export/excel")
}