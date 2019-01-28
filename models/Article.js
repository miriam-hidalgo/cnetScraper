const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  link: String
})

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;