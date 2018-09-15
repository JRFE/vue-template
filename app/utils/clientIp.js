/**
 * @desc 获取客户端IP
 * @author qinxuhao@zbj.com
 * @date 2017-11-17
 */

"use strict";
function getClientIp(req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
  ip = ip.split(',')[0];
  ip = ip.split(':').slice(-1);

  console.log('ip address--------: ' + ip);
  return ip[0].replace(/[^\d\.]/img, '');
}

module.exports = {
  getClientIp: getClientIp
}
