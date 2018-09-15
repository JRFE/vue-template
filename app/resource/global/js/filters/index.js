/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-04-01 09:26
 * @description   公共过滤器
 */
import Vue from 'vue'
import utils from '../utils'

Vue.filter('datetime', function (value) {
  if (value !== null && value !== undefined) {
    return utils.dateFormat(value)
  } else {
    return '时间格式有误';
  }
})

Vue.filter('dateformat', function (value) {
  if (value !== null && value !== undefined) {
    return value.replace(/\d+-(\d+)-(\d+)/, function(all, $1, $2) {
      return $1 + '月' + $2 + '日';
    });
  } else {
    return '';
  }
})

Vue.filter('dateformat2', function (value) {
  if (value !== null && value !== undefined) {
    return value.replace(/(\d+)-(\d+)-(\d+) ([\w:])/, function(all, $1, $2, $3, $4) {
      return $1 + '年' + $2 + '月' + $3 + '日<br>' + $4;
    });
  } else {
    return '';
  }
})

/**
 * 昵称截取
 * @param subLength 截取的个数
 * @param reverse 是否倒序
 */
Vue.filter('nickName', function (value, subLength, reverse) {
  subLength = subLength || 2
  if (value) {
    if (reverse) { // 倒序截取最后面的文字
      let startIndex = value.length - subLength
      return value.substr(startIndex)
    } else {
      let curLength = value.length
      return curLength <= subLength ? value : value.substr(0, subLength) + '...'
    }
  }
})
