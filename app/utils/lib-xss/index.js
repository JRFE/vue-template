var jsXss = require('xss');
var url = require('url');
var _ = require('underscore');

//默认配置，删除不在白名单中的标签和属性
var DEFAULT_CONFIG = {
    stripIgnoreTag: true,
    stripIgnoreTagBody: true
}

/**
 * 用js-xss 对html过滤
 *
 * @param {String} str
 * @return {String} str
 */
function filterHtml(str) {
    var xssObj = new jsXss.FilterXSS(DEFAULT_CONFIG);
    return xssObj.process(str);
}

/**
 * 参数过滤，对敏感字符进行转义
 *
 * @param {String} str
 * @return {object}
 *   - {Boolean} isMatched:是否匹配到敏感字符
 *   - {String}  value:过滤后的字符串
 *   - {String}  matchedChar:敏感字符
 */
function escapeParams(str){
    var isMatched = false;
    var matchedChar = '';
    var type = typeof str === 'object';
    var str = type ? JSON.stringify(str) : str;
    if(typeof str === 'string'){
        str = str.replace(/[<>\\]/g,function(e){
            isMatched = true;
            matchedChar = e;
            return '&#'+e.charCodeAt()+';'
        })
    }

    return {
        isMatched: isMatched,
        value: type ? JSON.parse(str) : str,
        matchedChar: matchedChar
    }
}

/**
 * 对编码后的字符进行解码
 * @param str
 * @returns str
 */
function unescapeParams(str) {
    var res = String(str).replace(/&#(\d{2});/g, function (all, $1) {
        return String.fromCharCode($1);
    });
    return res;
}
/**
 * 判断是否是html结尾的参数名
 *
 * @param {String} param
 * @return {Boolean}
 */
function isHtmlParam(param) {
    var REGEXP_HTML = /(html)$/i;
    return REGEXP_HTML.test(param);
}

module.exports = function (config) {

    if (config && typeof config === 'object') {
        _.extend(DEFAULT_CONFIG, config);
    }

    return function (req, res, next) {
        req.xss = {};
        req.xss.unescape = unescapeParams;
        req.xss.escape = function(str){
            return escapeParams(str).value;
        };
        //过滤query参数
        for (var query in req.query) {
            if (query) {
                if (isHtmlParam(query)) {
                    req.query[query] = filterHtml(req.query[query]);
                }
                else {
                    req.query[query] = escapeParams(req.query[query]).value;
                }
            }
        }
        //过滤路由参数params
        if (req.url) {
            var pathname = url.parse(req.url).pathname;//获取req.url的路径，不包含query
            var decodePathname = decodeURI(pathname);//解码pathname
            var escapedParams = escapeParams(decodePathname);//转义字符
            if (escapedParams.isMatched) {
                var securityError = new Error('路由参数params xss过滤，出现不安全字符:' + escapedParams.matchedChar);
                next(securityError);
                return;
            }
            req.url = encodeURI(escapedParams.value);
        }
        //过滤body参数
        for (var body in req.body) {
            if (body) {
                if (isHtmlParam(body)) {
                    req.body[body] = filterHtml(req.body[body]);
                }
                else {
                    req.body[body] = escapeParams(req.body[body]).value;
                }
            }
        }
        next();
    }
};