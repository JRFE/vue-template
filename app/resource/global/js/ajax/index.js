/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-03-28 10:03
 * @description
 */
import Vue from 'vue'
import Axios from 'axios'
import jsonp from './jsonp'

// 只有本地 才会走接口平台 mock
if (window.ZBJInfo.runtime === 'local') {
  Axios.interceptors.request.use(function (config) {
    // 如果不是直接的 ajax 那么走代理
    // 默认本地接口均走代理
    if (!config.directAjax) {
      // 判断是否是本地
      config.url = 'http://192.168.143.249:8080/mockjsdata/507' + config.url
    }
    return config
  })
}
else {
  Axios.interceptors.request.use(function (config) {
    // 如果不是直接的 ajax 那么走代理
    // 默认本地接口均走代理
    // 判断是否是本地
    config.url += '?_t=' + Date.now();
    return config
  })
}
// Add a response interceptor
Axios.interceptors.response.use(function (response) {
  // 数据处理
  return response.data
})

Vue.prototype.$ajax = Axios

Vue.prototype.$jsonp = jsonp

export {
  Axios as ajax,
  jsonp
}
