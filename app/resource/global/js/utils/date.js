/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-04-01 09:40
 * @description
 */

export default {
  /**
   * 截止时间统一 format
   * 截止日期如果跨年显示 2018年6月30日 12：30 2016年6月30日 12：30
   * 截止时间如果是本年度显示 4月29日 12：30 隐藏年份
   * 截止时间如果是昨天显示 昨天12：30
   * 截止时间如果是今天显示 今天12：30
   * 截止时间是明天显示 明天12：30
   * @param value
   * @returns {String}
   */
  dateFormat (value) {
    let date = new Date(value)
    let currentDate = new Date()
    let dateObj = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      displayMonth: ('00' + (date.getMonth() + 1)).slice(-2),
      date: date.getDate(),
      totalDate: parseInt((date.valueOf() + 8 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000)),
      displayDate: ('00' + date.getDate()).slice(-2),
      hours: date.getHours(),
      displayHours: ('00' + date.getHours()).slice(-2),
      minutes: date.getMinutes(),
      displayMinutes: ('00' + date.getMinutes()).slice(-2),
      value: date.valueOf()
    }
    let currentDateObj = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      date: currentDate.getDate(),
      totalDate: parseInt((currentDate.valueOf() + 8 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000)),
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes(),
      value: currentDate.valueOf()
    }

    if (currentDateObj.totalDate === dateObj.totalDate) {
      // 截止时间是今天显示    今天12：30
      return `今天${dateObj.displayHours}：${dateObj.displayMinutes}`
    }
    if (currentDateObj.totalDate - dateObj.totalDate === 1) {
      // 截止时间如果是昨天显示  昨天12：30
      return `昨天${dateObj.displayHours}：${dateObj.displayMinutes}`
    }
    if (dateObj.totalDate - currentDateObj.totalDate === 1) {
      // 截止时间是明天显示    明天12：30
      return `明天${dateObj.displayHours}：${dateObj.displayMinutes}`
    }

    if (currentDateObj.year === dateObj.year) {
      // 截止时间如果是本年度显示 4月29日 12：30  隐藏年份
      return `${dateObj.displayMonth}月${dateObj.displayDate}日 ${dateObj.displayHours}：${dateObj.displayMinutes}`
    } else {
      // 截止日期如果跨年显示 2018年6月30日 12：30   2016年6月30日 12：30
      return `${dateObj.year}年${dateObj.displayMonth}月${dateObj.displayDate}日 ${dateObj.displayHours}：${dateObj.displayMinutes}`
    }
  }
}
