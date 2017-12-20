const express = require('express');
const router = express.Router();

// 绑定路由
router.get('/', (req, resp, next) => {
  // resp.send('这是首页');
  resp.render('index');
});

router.get('/index', (req, res, next) => {
  res.render('index');
});


router.get('/programmer-style-xiuzhen.html', (req, resp, next) => {
  resp.render('programmer-style-xiuzhen');
});

router.get('/programmer-style-xiuzhen-src.html', (req, resp, next) => {
  fs.readFile('./views/programmer-style-xiuzhen-src.html', function(err, data) {
    if (err) {
      resp.statusCode = 404;
      resp.end('您读取的数据不存在');
    } else {
      resp.end(data);
    }
  });
});

router.get('/about.html', (req, resp, next) => {
  resp.render('about');
});

// 跳转到登陆界面
router.get('/login', (req, resp, next) => {
  resp.render('login');
});

// 跳转到初始界面
router.get('/admin/index', (req, resp, next) => {
  resp.render('admin/index');
});
module.exports = router;
