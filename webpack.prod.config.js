const webpack = require('webpack');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
// 用来将css单独提取出来的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 用来清除文件的插件，每次编译前都会执行
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'common/main': [srcPath + '/common/main.js'],
    'common/admin-lib': ['bootstrap', 'BOOTSTRAP_CSS']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    publicPath: 'http://localhost:8080/public'
  },
  resolve: {
    modules: [srcPath, 'node_modules'], //指定webpack的查找文件目录
    alias: {
      SRC: srcPath,
      BOOTSTRAP_CSS: 'bootstrap/dist/css/bootstrap.css'
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.(png|jpg)$/,
      use: ['url-loader?limit=8192&context=client&name=/images/[name].[ext]']
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: [
        'file-loader?limit=8192&name=/fonts/[name].[ext]'
      ]
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: ['transform-runtime','syntax-dynamic-import']
        }
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new ExtractTextPlugin({
      filename: function(getPath) {
        return getPath('css/[name].css').replace('css/common', 'css');
      },
      allChunks: true
    }),
    // new webpack.optimize.CommonChunkPlugin({
    //   name: 'common',
    //   minChunks: Infinity
    // }),
    // 把jquery的全局变量提取出来的插件
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin(),//这个插件不支持混淆es6
  ]
}
