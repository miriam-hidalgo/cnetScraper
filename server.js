var express = require("express");
// var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var path = require("path");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Set Handlebars.
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/cnetScraper", { useNewUrlParser: true });

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.get('/saved', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'savedArticles.html'));
});

// A GET route for scraping the cNET website
app.get("/scrape", function(req, res) {  
  // First, we grab the body of the html with axios
  axios.get("https://www.cnet.com/news/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    //console.log($)
    $(".assetText").each(function(i, element) {
    // Save an empty result object
    var result = {};

    // Add the text and href of every link, and save them as properties of the result object
    result.title = $(this).find('h6').text().trim();
    result.author = $(this).find($('.name')).text().trim();
    result.link = $(this).find('a').attr('href');
    console.log(result)
    db.Article.create(result)
    .then(function(dbArticle) {
      console.log(dbArticle)
    })
      });
    });
}); 

app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});