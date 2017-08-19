// 应用的入口文件
// 引入框架
const express = require('express');
// 引入模板
const swig = require('swig');
// 执行框架
const app = express();

const fs = require('fs');

app.use('/public', express.static(__dirname + '/public'));
// 配置应用模板
// 定义当前应用所使用的模板引擎
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

swig.setDefaults({
  cache: false
})

// 绑定路由
app.get('/', (req, resp, next) => {
  // resp.send('这是首页');
  resp.render('index');
});
app.get('/programmer-style-xiuzhen.html', (req, resp, next) => {
  resp.render('programmer-style-xiuzhen');
});

app.get('/programmer-style-xiuzhen-src.html', (req, resp, next) => {
  fs.readFile('./views/programmer-style-xiuzhen-src.html', function(err, data) {
    if (err) {
      resp.statusCode = 404;
      resp.end('您读取的数据不存在');
    } else {
      resp.end(data);
    }
  });
});

app.get('/about.html', (req, resp, next) => {
  resp.render('about');
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



// 开启监听
app.listen(8080);
