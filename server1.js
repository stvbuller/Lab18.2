//express setup
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var mongojs = require('mongojs');
var db = mongojs("zoo_db", ["animals"])
db.on('error', function(err) {
  console.error("Database error", err);
});

app.use(express.static("public"));


//routes
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + "/index.html");
});

app.get('/animals', function(req, res) {
  db.animals.find({}, function (err, dbResults) {
  // dbResults is an array of all the documents in animals
    if(err) {
      throw err;
    }
    res.json(dbResults);
  })
});

app.get('/animals/weight', function(req, res) {
  db.animals.find().sort({weight:1}, function (err, dbResults) {
    if(err) {
      throw err;
    }
    res.json(dbResults);
  })
});

app.get('/animals/name', function(req, res) {
  db.animals.find().sort({name:1},function (err, dbResults) {
    if(err) {
      throw err;
    }
    res.json(dbResults);
  })
});

app.get('/animals/numlegs', function(req, res) {
  db.animals.find().sort({numlegs:1},function (err, dbResults) {
    if(err) {
      throw err;
    }
    res.json(dbResults);
  })
});

app.get('/animals/isMammal', function(req, res) {
  db.animals.find({class:"mammal"},function (err, dbResults) {
    if(err) {
      throw err;
    }
    res.json(dbResults);
  })
});





app.listen(PORT, function() {
  console.log("Listening at %s", PORT);
});
