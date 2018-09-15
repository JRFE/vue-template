import Vue from 'vue'
import App from './app'

export default function (router, store, template) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: template || '<app/>',
    components: {App}
  })
}
