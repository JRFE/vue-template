"use strict";

const cookieOpts = {
  path: '/',
  domain: '.' + UA.config.baseURI
}

module.exports = {
  getIPAdress: function () {
      let interfaces = require('os').networkInterfaces();
      for (let devName in interfaces) {
            let iface = interfaces[devName];
            for(let i = 0; i < iface.length; i++) {
                 let alias = iface[i];
                 if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                       return alias.address;
                 }
            }
      }
  },
  isRestfulMethod: function (val) {
    return ['delete', 'patch', 'put', 'post'].indexOf(val) >= 0
  },
  cros: function (res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  },
  genLoginUrl: function (req) {
    return 'https://login.' + UA.config.tpBaseURI + '/login/TpIndex?fromurl=' + UA.config.teamURL + req.originalUrl
  },
  forbiddenExplore: function (req) {
    let ua = req.headers['user-agent'].toLowerCase()
    return ua.match(/msie ([\d.]+)/)
  },
  isWindows: function (req) {
    let ua = req.headers['user-agent'].toLowerCase()
    return ua.match(/windows/)
  },
  setCookie: function (tmUid, res) {
    const crypto = require('crypto')
    const encoder = crypto.createHash('sha256')
    const key = encoder.update('Skapp+' + tmUid + '+echciurakCacBolsitnuvJed4quocezceho').digest('hex')
    res.cookie('tmUid', tmUid, cookieOpts)
    res.cookie('tmUKey', key, cookieOpts)
  },
  genFileAddress: function (fileUrl, isDownload, fileName) {
    const currentDate = new Date()
    let validDate = parseInt(currentDate.setDate(currentDate.getDate() + 5) / 1000)
    validDate = validDate.toString(16)
    const fileInfo = require('url').parse(fileUrl)
    console.log(fileInfo)
    const filePath = fileInfo.path
    const baseName = require('path').basename(filePath)
    const path = encodeURI(filePath)
    const key = UA.config.qiniuKey
    const urlToSign = key + path + validDate
    const encoder = require('crypto').createHash('md5')
    const str = encoder.update(urlToSign).digest('hex').toLowerCase()

    if (isDownload) {
      fileName = '&attname=' + (fileName || baseName)
    } else {
      fileName = ''
    }
    return fileInfo.protocol + '//' + fileInfo.host + path + '?v=1.1&sign='+ str +'&t=' + validDate + fileName
  },
  outputCount: function () {
    return `
      <script>
        var date = new Date();
  
        var timestamp = '' + date.getFullYear() + date.getMonth() + 1 + date.getDate() + date.getHours();
        var scriptUrl = 'http://t5.zbjimg.com/t5s/output/common/js/count.js?' + timestamp;
        if (document.location.protocol === 'https:') {
          scriptUrl = 'https://login.zbj.com/v5style/t5s/output/common/js/count.js?' + timestamp;
        }
        var countScript = document.createElement('script');
        countScript.type = 'text/javascript';
        countScript.async = 1;
        countScript.src = scriptUrl;
        var sourceScript = document.getElementsByTagName('script')[0];
        sourceScript.parentNode.insertBefore(countScript, sourceScript);
      </script>
    `
  }
}