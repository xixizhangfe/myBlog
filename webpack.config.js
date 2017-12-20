const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  entry: {
    'common/main': [srcPath + '/common/main.js', 'webpack-hot-middleware/client?reload=true'],
    'common/admin-lib': ['jquery', 'bootstrap', 'BOOTSTRAP_CSS']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    publicPath: 'http://localhost:3000/public'
  },
  devtool: 'eval-source-map',
  resolve: {
    modules: [srcPath, 'node_modules'], //指定webpack的查找文件目录
    alias: {
      SRC: srcPath,
      BOOTSTRAP_CSS: 'bootstrap/dist/css/bootstrap.css',
      BOOTSTRAP_TABLE_CSS: 'bootstrap-table/dist/bootstrap-table.css',
    }
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      }, {
        test: /\.(png|jpg)$/,
        use: ['url-loader']
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          'file-loader'
        ]
      },
      // {
      //   test: /\.(htm|html)$/i,
      //   use: [
      //     'html-withimg-loader'
      //   ]
      // }
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','es2015'],
            plugins: ['transform-runtime','syntax-dynamic-import']
          }
        }
      }
    ]
  },
  plugins: [
    // 把jquery的全局变量提取出来的插件
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new HtmlWebpackPlugin({
    //   template: 'html-withimg-loader!' + path.resolve('server/views/', 'index.html'),
    //   filename: 'index.html'
    // }),
  ],
}
