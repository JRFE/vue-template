// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var ip = require('ip');
var pkg = require('../../package.json');

var env = process.argv.slice(-2);
// 获取当前环境变量
env = env[0] === "--env" ? env[1] : `local`;

var staticLibURI;
switch (env) {
  case "product":
    staticLibURI = '//as.zbjimg.com';
    break;
  case  "local":
    staticLibURI = `//${ip.address()}:8888`;
    break;
  default :
    staticLibURI = `//as.${env}.zbjdev.com`;
}

var config = {
  common: {
    resourcePath: path.join(__dirname, '../../app/resource'),
    env: {
      NODE_ENV: '"production"'
    },
    assetsSubDirectory: 'static',
    assetsPublicPath: staticLibURI + `/static/${pkg.name}/`,
    outPath: path.join(__dirname, `../../node_modules/.ua-release-webroot/static/${pkg.name}/`),
    sourceMap: true
  },
  product: {},
  e1: {
    env: {
      NODE_ENV: '"development"'
    }
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    }
  },
  local: {
    env: {
      NODE_ENV: '"development"'
    },
    assetsPublicPath: staticLibURI + `/static/${pkg.name}/`, // 此处为了支持 webpack 热加载，必须写上全路径。（重要）
    outPath: path.join(__dirname, '../../dist'), // 本地开发环境输出到 dist 文件夹
    sourceMap: false
  }
}

/**
 * 获取项目配置
 * @param env 环境变量
 * @returns {*}
 */
module.exports.getConfig = function (env) {
  return Object.assign(config.common, config[env])
}
