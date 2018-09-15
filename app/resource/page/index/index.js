import entryFactory from '../../entry'
import router from './router';
import store from './store';
// import store from './store'

router.beforeEach((to, from, next) => {  
  // 统计代码  
  if (to.path) {  
    _hmt.push(['_trackPageview', '/index#' + to.fullPath]);
  }  
  next();  
})

entryFactory(router, store);

