/*
 * @desc storage
 * @author ranguangyu@zbj.com
 * @date 2018-02-02
 */

import Vue from 'vue'

let storage = window.localStorage;

Vue.prototype.$storage = {
  get(key) {
    try {
      return JSON.parse(storage.getItem(key));
    } catch(e) {
      return storage.getItem(key);
    }
  },
  set(key, o) {
    if(typeof o == 'object') {
      storage.setItem(key, JSON.stringify(o));
    }else{
      storage.setItem(key, o);
    }
  },
  remove(key) {
    storage.removeItem(key);
  }
}
