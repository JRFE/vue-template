import './loading.less'
import Vue from 'vue'

// loading html
const loading = `
  <div class="loading-indicator" id="loading-indicator">
    <div class="loading-indicator-img"></div>
  </div>
`
// 加载出错 html
const loadingError = `
  <div class="loading-error">
    <div class="cry-face-bg"></div>
    <p class="error-text">
      页面加载错误，请<a href="javascript:window.location.reload();">刷新</a>页面
    </p>
  </div>
`
const loadingDom = document.createElement('div')
loadingDom.innerHTML = loading
document.body.appendChild(loadingDom)

Vue.prototype.$bus.$on('ready', ready)

// 判断请求是否超过15秒 超过15秒显示 页面加载错误
const errorTimer = setTimeout(() => {
  document.getElementById('loading-indicator').innerHTML = loadingError
}, 10e3)

// 页面有更新
Vue.mixin({
  updated: function () {
    if (this.$options.$isEntryComponent) {
      this.$bus.$emit('ready')
    }
  }
})

// 移除loading
function ready () {
  clearTimeout(errorTimer)
  loadingDom.className = 'loading-indicator loaded'
  setTimeout(() => {
    loadingDom.parentNode.removeChild(loadingDom)
  }, 500)

  Vue.prototype.$bus.$off('ready', ready)
}
