/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-03-14 13:57
 * @description
 */

var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var getConfig = require('./config').getConfig;
var utils = require('./utils');
var webpackConfig = {};
var outPath;
var env = utils.getEnv();

if (env === 'local') {
  // 本地直接以 local 构建
  webpackConfig = require('./webpack.local.conf');
  outPath = getConfig('local').outPath;
} else if (env === 'dev') {
  // 本地直接以 dev 构建
  webpackConfig = require('./webpack.dev.conf');
  outPath = getConfig('dev').outPath;
} else {
  // 本地直接以 production 构建
  webpackConfig = require('./webpack.prod.conf');
  outPath = getConfig(env).outPath;
}

var spinner = ora('building for production...');
spinner.start();

rm(path.join(outPath), err => {
  if (err) throw err;
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
});
