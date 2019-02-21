require('es6-promise').polyfill()
import axios from 'axios'


axios.defaults.withCredentials = true //跨域
axios.defaults.timeout = 1000000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common = { 'token' : sessionStorage.getItem('token') }

//axios.defaults.headers.token = sessionStorage.getItem('token')
console.log(sessionStorage.getItem('token'))

export default {
  //get请求
  requestGet(url, params = {}) {
    axios.get(url, params).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  },

  //get请求不带参数
  requestQuickGet(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //post请求
  requestPost(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //post请求
  // requestPostForm(url, params = {}) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(url, params, {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     }).then(res => {
  //       resolve(res.data) //注意，res是axios封装的对象，res.data才是服务端返回的信息
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  //put请求
  requestPut(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //delete请求
  requestDelete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}