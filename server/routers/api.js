const express = require('express');
const router = express.Router();

let User = require('../dbModel/User');
let resposeMesg;

router.use((req, res, next) => {
    console.log('中间件');
    responseMesg = {
      success: false,
      message: ''
    };
    next();
  })
  // 校验用户名和密码
router.post('/user/check', (req, res, next) => {
  let parms = req.body;
  if (!parms.username || !parms.password) {
    responseMesg.message = "用户名或者密码不能为空!";
    res.json(responseMesg);
    return;
  }
  User.findOne({
      username: parms.username,
      password: parms.password
    })
    .then((user) => {
      console.log('查询结果');
      if (user) {
        responseMesg.success = true;
        responseMesg.message = "登陆成功";
        req.session.user = user;
        res.json(responseMesg);
      } else {
        responseMesg.message = "用户名或者密码不正确";
        res.json(responseMesg);
      }
    })
})
module.exports = router;
