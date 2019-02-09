import http from 'httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8089/swagger-ui.html#/"

//定义方法，准备请求服务端的页面查询接口
export const query = (page, size, params) => {
  var queryVo = {"categoryId": params.categoryId};
  if (params.audioName != "") {
    queryVo.audioName = params.audioName;
  }
  return http.requestPost(apiUrl + "/query/" + page + "/" + size, queryVo);
}

//更新授权url
export const updateOssUrl = (audioId) => {
  return http.requestQuickGet(apiUrl + "/update-ossurl/" + audioId);
}

export const updateName = (audio) => {
  return http.requestPost(apiUrl + "/update", audio)
}


//批量添加-通过文件批量上传
export const addUpload = (params) => {
  return http.requestPost(apiUrl + "/add-upload", params);
}

//删除
export const del = (audioId) => {
  return http.requestDelete(apiUrl + "/delete/" + audioId);
}
