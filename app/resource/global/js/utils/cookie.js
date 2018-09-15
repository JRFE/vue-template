export default {
  get (name) {
    const value = document.cookie
    let start = value.indexOf(' ' + name + '=')
    if (start === -1) {
      start = value.indexOf(name + '=')
      if (start > 0) {
        return null
      }
    }
    if (start === -1) {
      return null
    }

    start = value.indexOf('=', start) + 1
    let end = value.indexOf(';', start)
    if (end === -1) {
      end = value.length
    }
    return decodeURIComponent(value.substring(start, end))
  },

  set (name, value, days) {
    var days = days || 10;
    var date = new Date();
    date.setTime(date.getTime() + days * 86400 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toGMTString();
  }
}
