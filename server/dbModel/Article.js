// 文章 表
const mongoose = require('mongoose');

let listSchema = new mongoose.Schema({
  title: String,
  body: String,
  comments: [{
    body: String,
    date: {
      type: Date,
      default: Date.now,
    }
  }],
  time: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Article', listSchema);
