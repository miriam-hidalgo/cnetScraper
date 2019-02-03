const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  link: String
})

const article = mongoose.model('article', ArticleSchema);

module.exports = article;