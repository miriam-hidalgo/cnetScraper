const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  link: String
})

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;