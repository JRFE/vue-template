/**
 * @desc 系统公共代码工具库
 * @author ranguangyu@zbj.com
 * @date 2018-02-26
 */

var util = {
  doAction(opts) {
    var pro = null;
    var defaultOpts = {
      method: 'post',
      timeout: 20 * 1000,
      retry: 3,
      action: {},
      params: {}
    }
    opts = Object.assign({}, defaultOpts, opts);
    pro = opts.action[opts.method] && opts.action[opts.method](opts.params, {
      timeout: opts.timeout
    });
    return pro;
  }
}

module.exports = util;