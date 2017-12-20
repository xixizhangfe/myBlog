module.exports = app => {
  // 校验是否登录的中间件
  // 在开发模式的时候，让权限校验失效
  // 1、如何判断是什么模式？
  // 方式一：通过判断process.env.NODE_ENV，但是这种方式不通用
  // 方式二：利用express的app.locals全局变量
  // 2、如何让权限失效？
  // 方式一：只在生产模式进行校验,如果只按照下列注释方法判断，则欢迎您后面的名字就没有了。
  // if(!app.locals.isDev){
  //   app.use(require('./auth'));
  // }
  // 方式二：在auth.js里判断是否是开发模式，如果是则伪造一个session
  app.use(require('./auth'));
  //引入路由
  app.use('/api', require('./api'));
  app.use('/admin', require('./admin'));
  app.use('/', require('./main'));
  app.use('/login', require('./login'));
}
