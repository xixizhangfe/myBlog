require('./jquery.pjax.js');
require('./common.js');
require('SRC/index/index.js');
require('SRC/login/login.js');

//按需加载
//实现访问login，就自动帮我们引入login.js，不引入其他的
let modulePath = $('[data-main]').data('main');// login/login
console.log(modulePath);
if (modulePath) {
  //异步引入模块
  import ('../' + modulePath)
  .then(model => {
    console.log('加载模块成功', model)
  }).catch(err => {
    console.log('模块加载失败')
  })
}
if (module.hot) {
  module.hot.accept();
}
