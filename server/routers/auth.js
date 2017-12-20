// 处理登录鉴权的模块
// 校验是否登录的中间件
module.exports = (req, resp, next) => {
  // 如果是开发模式，则自己伪造一个user对象放到session中，以此来跳过登录鉴权
  // 注意这里要通过req.app来获得app.js里的express()产生的实例
  if(req.app.locals.isDev){
    req.session.user={
      username: 'zhangsan',
      _id:'59aa10798c43f4bc08d05ac9',
    }
  }
  console.log('拦截所有请求', req.url);
  // 有些请求是不应该被拦截的，登录注册不能被拦截
  //  /admin/index
  //  如果请求以 /admin开头，就要拦截对其进行权限校验
  if (req.url.startsWith('/admin')) {
    if (req.session.user) {
      // 存在session，放行
      console.log('有权限');
      next();
    } else {
      console.log('没有登录，不允许访问，先跳转到登陆');
      // 重定向跳转到登陆页面
      resp.redirect('/login');
    }
  } else {
    next();
  }
}
