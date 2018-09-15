var utils = require('./utils')
var getConfig = require('./config').getConfig
var isProduction;

// 获取环境标识
var env = utils.getEnv();

var sourceMap = getConfig(env).sourceMap

isProduction = utils.getEnv() !== 'local'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMap,
    extract: isProduction
  }),
  preserveWhitespace: false
}
