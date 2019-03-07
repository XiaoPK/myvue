import http from './httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8091/course-assign" 


export const assign = (termId,rules) => {
  return http.requestPost(apiUrl + "/assign/" + termId, rules);
}

export const assignSimple = (termId,rules) => {
  return http.requestPost(apiUrl + "/assign/assign/" + termId + '/simple', rules)
}


export const query = () => {
  return http.requestQuickGet(apiUrl + "/assign/query/rule");
}

export const queryAll = () => {
  return http.requestQuickGet(apiUrl +　"/assign/result/query/all")
}