import http from './httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8089/course"
//let apiUrl = "/api"
//定义方法，准备请求服务端的页面查询接口
export const query = (page, size) => {
  // var queryVo = {"courseNumber": params.courseNumber};
  // if (params.courseName != "") {
  //   queryVo.courseName = params.courseName;
  // }
  return http.requestQuickGet(apiUrl + "/query/page/" + page + "/" + size);
}

export const add = (courseObj) => {
  return http.requestPost(apiUrl + "/add", courseObj)
}

export const update = (courseObj) => {
  return http.requestPost(apiUrl + "/update", courseObj)
}


// //批量添加-通过文件批量上传
// export const addUpload = (params) => {
//   return http.requestPost(apiUrl + "/add-upload", params);
// }

//删除
export const del = (courseNumber) => {
  return http.requestDelete(apiUrl + "/delete/" + courseNumber);
}

// export const download = () => {
//   return http.requestGet(apiUrl + "/import-template")
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