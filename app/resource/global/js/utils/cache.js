export default {
  setData(key, data) {
    if(typeof document !== 'object') {
      return false;
    }
    localStorage.setItem(key, JSON.stringify(data));
  },
  getData(key) {
    if(typeof document !== 'object') {
      return false;
    }
    return JSON.parse(localStorage.getItem(key));
  }
}