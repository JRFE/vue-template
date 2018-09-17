/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-03-20 16:06
 * @description   global javascript
 */
import 'babel-polyfill'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 全局引入 event-bus 用于代理全局事件
import './js/event-bus'

import './page-loading'

// 全局常量引入
import './js/constant'

// 全局引入 ajax 组件
import './js/ajax'

// 全局引入全局 less
import './index.less'

// import filters
import './js/filters'

// 引入flexible
import './flexible.js'

// storage
import './js/storage/index'

// md5
import './js/md5/index'
