//setup request and cheerio
var request = require('request');
var cheerio = require('cheerio');

//setup express
var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

//database configuration
var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});


//routes
//scrape data and save to database
app.get('/scrape', function(req, res) {
  request('https://www.reddit.com/', function (error, response, html) {
    var $ = cheerio.load(html);
    var result = [];
    $(".title").each(function(i, element){

      //scrape some stuff, put it in an object and add it to the result array

      var title = $(this).text();
      var link = $(element).children().attr('href');

      if (title && link) {
        db.scrapedData.save({
          title: title,
          link: link
        }, function(err, saved) {
          if (err) {
            console.log(err);
          } else {
            console.log(saved);
          }
        });
      }
    });
  });
  res.send("Scrapped saved");
});

//get data from the database
app.get('/illegal', function(req, res) {
  db.scrapedData.find(function (err, dbResults) {
  // dbResults is an array of all the documents in scrapedData
    if(err) {
      throw err;
    }
    res.json(dbResults);
  })
});

app.listen(PORT, function() {
  console.log("Listening at %s", PORT);
});
