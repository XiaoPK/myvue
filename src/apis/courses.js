import http from './httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8089/course"

//定义方法，准备请求服务端的页面查询接口
export const query = (page, size) => {
  // var queryVo = {"courseNumber": params.courseNumber};
  // if (params.courseName != "") {
  //   queryVo.courseName = params.courseName;
  // }
  return http.requestPost(apiUrl + "/query/" + page + "/" + size);
}

export const add = (courseObj) => {
    return http.requestPostForm(apiUrl + "/add", courseObj)
}

// //更新授权url
// export const updateOssUrl = (audioId) => {
//   return http.requestQuickGet(apiUrl + "/update-ossurl/" + audioId);
// }

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
