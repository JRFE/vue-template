var ip = require('ip')
var webpack = require('webpack');
var merge = require('webpack-merge');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var utils = require('./utils');
var localConfig = require('./config').getConfig('local');
var baseWebpackConfig = require('./webpack.base.conf');

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: localConfig.sourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#eval-source-map',
  output: {
    path: localConfig.outPath,
    publicPath: localConfig.assetsPublicPath,
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': localConfig.env
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    host: ip.address(),
    headers: { 'Access-Control-Allow-Origin': '*' },
  }
});

module.exports = webpackConfig;
