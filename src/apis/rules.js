import http from './httpServer'
let apiUrl = "http://alish1.iyuhui.cn:8091/course-assign/assign"

export const query = () => {
    return http.requestQuickGet(apiUrl + "/query/rule");
}