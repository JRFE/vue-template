var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var devConfig = require('./config').getConfig('dev');
var utils = require('./utils');
var baseWebpackConfig = require('./webpack.base.conf');

// var CopyWebpackPlugin = require('copy-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: devConfig.sourceMap,
      extract: true // 提取公共 css
    })
  },
  devtool: devConfig.sourceMap ? '#source-map' : false,
  output: {
    path: devConfig.outPath,
    publicPath: devConfig.assetsPublicPath,
    filename: '[name].[chunkhash:8].js', // .[chunkhash].js TODO
    chunkFilename: '[id].[chunkhash:8]js'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': devConfig.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        // drop_console: true
      },
      sourceMap: true
    }),
    // 提取 css 到一个单独的文件
    // contenthash 代表的是文本文件内容的hash值，也就是只有style文件的hash值
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    // 压缩提取的CSS。
    // 我们使用这个插件，以便剔除从不同组件中的重复的CSS。
    // 它将在Webpack构建期间搜索CSS资源，并将优化/最小化CSS（默认情况下它使用cssnano，但可以指定自定义css处理器）。
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        // 移除全部注释
        discardComments: {removeAll: true},
        // 避免 cssnano 重新计算 z-index
        safe: true
      }
    })
    // copy custom static assets 复制不需要编译的静态资源 TODO
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: devConfig.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ])
  ]
})

//  TODO
// if (devConfig.productionGzip) {
//   var CompressionWebpackPlugin = require('compression-webpack-plugin')
//
//   webpackConfig.plugins.push(
//     new CompressionWebpackPlugin({
//       asset: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: new RegExp(
//         '\\.(' +
//         devConfig.productionGzipExtensions.join('|') +
//         ')$'
//       ),
//       threshold: 10240,
//       minRatio: 0.8
//     })
//   )
// }
// if (devConfig.bundleAnalyzerReport) {
//   var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//   webpackConfig.plugins.push(new BundleAnalyzerPlugin())
// }

module.exports = webpackConfig
