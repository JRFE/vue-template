// api权鉴
var apiAuth = function (req, res, next, userId) {
    var backurl = req.headers['referer'];
    backurl = encodeURIComponent(backurl);
    var loginUrl = 'https://loginjr.' + UA.config.baseURI + '?productNo=10001' + '&backUrl=' + backurl;
    judgeLogin(userId, function() {
        next;
        }, function() {
            var json = { success: false, type: 'apiAuth', data: '用户未登录', url: loginUrl };
            res.send(json);
        }
    );
}

// page权鉴
var pageAuth = function (req, res, next, userId) {
    var backurl = req.headers['referer'];
    backurl = encodeURIComponent(backurl);

    var loginUrl = 'https://loginjr.' + UA.config.pageDomain + '?productNo=10001' + '&backUrl=' + backurl;

    judgeLogin(userId, function() {
        next();
        }, function() {
            res.redirect(loginUrl);
        }
    );
}

// 判断处理登录逻辑
function judgeLogin(userId, hasLoginCallback, notLoginCallback) {
    console.log('---------------------------');
    console.log(userId);
  if (userId) {
    hasLoginCallback && hasLoginCallback();
  } else {
    notLoginCallback && notLoginCallback();
  }
}

module.exports = {
    apiAuth: apiAuth,
    pageAuth: pageAuth
};
