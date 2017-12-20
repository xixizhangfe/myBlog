const express = require('express');
const router = express.Router();

let Article = require('../dbModel/Article.js');
let num = 1;
/**
 * 跳转到登陆后的首页
 */
router.get('/article-list', (req, res, next) => {
  res.render('admin/article-list', {
    user: req.session.user
  });
});

// 查询列表
router.get('/article/list', (req, res, next) => {
  Article.find().then(articles => {
    res.json(articles);
  })
})

// 保存文章接口
router.get('/article/save', (req, res, next) => {
  new Article({
    title: (num++) + '文章',
    body: '内容',
    comments: [{
      body: '评论'
    }]
  }).save().then(article => {
    res.json(article)
  })
})
module.exports = router;
