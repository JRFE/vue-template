/*
 * 项目初始加载文件，服务启动前处理
 * */
"use strict";

const xss = require('./utils/lib-xss');
const util = require('./utils/util.js');

global.util = util;

UA.log = (o, u, s) => {
  u = u || '';
  console.log('================='+ u +'================');
  if(typeof o == 'object') {
    s ? console.log(JSON.stringify(o)) : console.dir(o);
  }else{
    console.log(o);
  }
};

// 检查项目健康状况
UA.onGet('/zbjcheck', function(req, res, next) {
  res.sendStatus(200);
});

UA.filter('/*', UA.filter.session({ expire: 24 * 60 * 60 }));

UA.filter('/api/*', UA.filter.userkey(UA.config.webAppId));

// xss攻击过滤
UA.filter(UA.filter.xss());
