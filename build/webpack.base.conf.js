const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const utils = require('./utils');
const commonConfig = require('./config').getConfig('common');
const vueLoaderConfig = require('./vue-loader.conf');

const webpackConfig = module.exports = {
  entry: Object.assign(utils.getEntry(`${commonConfig.resourcePath}/page/*/index.js`), {
    'project': `${commonConfig.resourcePath}/global/index.js`
  }),
  externals: {
    // 'echarts': 'echarts'
  },
  resolve: {
    // 配置别名，在项目中可缩减引用路径
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // assets: join(commonConfig.resourcePath, '/assets'),  TODO 公共图片等资源考虑是否单独提出来
      'components': path.join(commonConfig.resourcePath, '/components'),
      // root: join(__dirname, 'node_modules'),
      'vue$': 'vue/dist/vue.esm.js',
      '@': commonConfig.resourcePath,
    }
  },
  module: {
    // webpack2.0 中 module.loaders 改成了 module.rules
    // 旧的 loader 配置被更强大的 rules 系统取代，后者允许配置 loader 以及其他更多项。
    rules: [
      {
        test: /\.(less|vue)$/,
        loader: '@zbj/vue-mixin-loader',
        enforce: 'pre',
        options: {
          mixinPath: path.join(commonConfig.resourcePath, "./global/css/mixin/mixin.less")
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [commonConfig.resourcePath]
      },
      // url-loader 工作流与 file-loader 相似，但如果文件小于字节限制，则可以返回数据URL (例如图片会编译成 base64)
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: utils.assetsPath('[name].[hash:8].[ext]')
        }
      },
      // 字体文件依然同上
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: utils.assetsPath('[name].[hash:8].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // 提取 node_modules 中的 modules 到 vendor.js
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // 将 webpack 运行时和模块清单提取到自己的文件中，防止在更新业务代码时更新 hash
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // 用md5替换标准 webpack chunkhash 的插件。解决了没有修改 init.js 但是重新生成新的 init.js 的问题。
    // 不建议使用 因为即使你没有修改 init.js ,但是生成的 init.js 内容也可能不同, 如果采用该组件, 会导致时间戳会因为内有修改 init.js 而不更新, 最终到时用户缓存了错误的 init.js
    // new WebpackMd5Hash(),
    function () {
      // 数据处理 用于生成 webpackMap
      this.plugin('done', function (map) {
        var webpackMap = {};

        // 调用 webpack map toJson 生成 jsonMap
        map = map.toJson();

        Object.keys(map.entrypoints).forEach(function (item) {

          // 如果入口路径不包含 / 则不输出 例如 入口  name == 'project'
          if (item.indexOf('/') < 0) {
            return;
          }

          // 页面名
          var pageName = item.split('/')[0];

          webpackMap[pageName] = {};
          webpackMap[pageName].js = [];
          webpackMap[pageName].css = [];

          // webpack资源 (映射) 处理
          [].concat(map.assetsByChunkName['manifest']).forEach(mapAsset);

          // 公共资源 (映射) 处理
          [].concat(map.assetsByChunkName['vendor']).forEach(mapAsset);

          // 项目公共资源 (映射) 处理
          [].concat(map.assetsByChunkName['project']).forEach(mapAsset);

          // 页面级别资源 (映射) 处理
          [].concat(map.assetsByChunkName[item]).forEach(mapAsset);

          /**
           * 根据资源类型，将其映射(map)到对应的数组中
           * @param assetsPath  资源路径
           */
          function mapAsset (assetsPath) {
            if (path.extname(assetsPath) === '.js') {
              // 绝对路径 = publicPath +  assetsPath
              webpackMap[pageName].js.push(map.publicPath + assetsPath);
            } else if (path.extname(assetsPath) === '.css') {
              webpackMap[pageName].css.push(map.publicPath + assetsPath);
            }
          }
        });

        utils.mkdir(path.join(__dirname, '../node_modules/.ua-resource.map'));

        // webpackMap 写入 config.json
        require('fs').writeFileSync(
          path.join(__dirname, '../node_modules/.ua-resource.map', 'resource.map.json'),
          JSON.stringify(webpackMap, null, '  '));

        // TODO 暂时测试使用
        require('fs').writeFileSync(
          path.join(__dirname, '../node_modules/.ua-resource.map', 'webpack.map.json'),
          JSON.stringify(map, null, '  '));

      });
    }
  ]
}
