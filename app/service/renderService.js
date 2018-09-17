/**
 * @desc 页面渲染服务
 * @author ranguangyu@zbj.com
 * @date 2017-06-29
 */
"use strict";

// 资源表
const resourceMap = require("../../node_modules/.ua-resource.map/resource.map.json");
const utils = require('../utils');

module.exports = function (pageName, data) {
  var linkList = ``;
  var scriptList = ``;

  resourceMap[pageName].js.forEach(function (item) {
    var script = `<script src="${item}"></script>`;
    scriptList = scriptList + script;
  });

  resourceMap[pageName].css.forEach(function (item) {
    var link = `<link rel="stylesheet" href="${item}">`;
    linkList = linkList + link;
  });

  return `
    <!DOCTYPE html>
    <html data-dpr="1">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="renderer" content="webkit"/>
    <meta http-equiv="Cache-Control" content="no-transform "/>
    <meta name="apple-touch-fullscreen" content="yes" >
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="format-detection" content="telephone=no, address=no">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover">
    <title>八戒金融H5项目骨架</title>
    <meta name='keywords' content=''/>
    <meta name='description' content=''/>
    <link rel="dns-prefetch" href="${UA.config.staticLibURI}">
    <link rel="stylesheet" href="//at.alicdn.com/t/font_293950_a1xqhgex0d9.css">
    <link rel="shortcut icon" href="//a.zbjimg.com/static/financial-common/default/img/faviconjr.ico" type="image/x-icon"/>
    ${linkList}
    <script type="text/javascript">
      //存放一些基本的页面信息
      window.ZBJInfo = {
        baseURI: ${UA.config.baseURI ? `"${UA.config.baseURI}"` : null}, // baseURI
        staticLibURI: ${UA.config.staticLibURI ? `"${UA.config.staticLibURI}"` : null}, // 前端静态资源 as.zbjimg.com
        qiniuUploadTokenUrl: ${UA.config.qiniuUploadTokenUrl ? `"${UA.config.qiniuUploadTokenUrl}"` : null},
        runtime: ${UA.config.runtime ? `"${UA.config.runtime}"` : null},
      };
    </script>
    <script>
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?c94a0116e87ede9c1eadfff7b1fec231";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    </script>
    </head>
    <body class="">
    <div id="app"></div>
    ${scriptList}
    ${utils.outputCount()}
    <script type='text/javascript' src='https://webchat.7moor.com/javascripts/7moorInit.js?accessId=e46dbe60-92db-11e7-8ee0-c759bde986cf&autoShow=false' async='async'>
    </script>
    <script type='text/javascript' src='https://payfingerprint.zbj.com/public/downloads/frms-fingerprint.js?custID=123&serviceUrl=https://payfingerprint.zbj.com/public/generate/jsonp'>
    </script>
    </body>
    </html>`;
};
