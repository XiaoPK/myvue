import http from './httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8091/course-assign" 


export const assign = (termId,rules) => {
  return http.requestPost(apiUrl + "/assign/" + termId, rules);
}

export const assignSimple = (termId,rules) => {
  return http.requestPost(apiUrl + "/assign/" + termId + '/simple', rules)
}
