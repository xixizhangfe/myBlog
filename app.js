// 应用的入口文件
// 引入框架
const express = require('express');
// 引入模板
const swig = require('swig');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
// 执行框架
const app = express();

// 
app.use(session({
  secret: 'alibaba',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());



const fs = require('fs');

// 配置应用模板
// 定义当前应用所使用的模板引擎
app.engine('html', swig.renderFile);
app.set('views', './server/views');
app.set('view engine', 'html');

console.log('取出的变量值', process.env.NODE_ENV);
// 是否是开发模式
const isDEV = process.env.NODE_ENV === 'dev';
// 将是否是开发模式存放到locals全局变量中共，方便在其他任何地方获取
app.locals.isDev=isDEV;

if (isDEV) {
  swig.setDefaults({
    cache: false
  });
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  const compiler = webpack(webpackConfig);

  const webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
      colors: true
    },
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  const browserSync = require('browser-sync').create();

  // 绑定路由
  app.get('/', (req, resp, next) => {
    // resp.send('这是首页');
    resp.render('index');
  });

  require('./server/routers/routes.js')(app);

  // 开启监听
  const reload = require('reload');
  const http = require('http');
  const server = http.createServer(app);
  reload(app);
  server.listen(8080, () => {
    browserSync.init({
      ui: false,
      open: false,
      online: false,
      notify: false,
      proxy: 'localhost:8080',
      files: './server/views/**',
      port: '3000'
    }, () => console.log('开发模式，代理服务器启动成功'));
  });

} else {
  app.use('/public', express.static(__dirname + '/public'));

  require('./server/routers/routes')(app);



  // app.use('/', require('./server/routers/api'));

  // 开启监听
  app.listen(8080, () => {
    console.log('生产模式');
  });
}

mongoose.connect('mongodb://localhost:27017/Blog', {useMongoClient: true})
.on('open',()=>{
  console.log('数据库连接成功');
})
.on('error',(error)=>{
  console.log('数据库连接失败'+error);
});

// // 以下是测试例子
// app.get('/test2', (req, resp, next) => {
//   resp.render('test2');
// });

// app.get('/test3', (req, resp, next) => {
//   resp.render('test3');
// });

// app.get('/test.json', (req, resp, next) => {
//   fs.readFile('./views/test.json', function(err, data) {
//     if (err) {
//       resp.statusCode = 404;
//       resp.end('您读取的数据不存在');
//     } else {
//       resp.end(data);
//     }
//   });
// });
