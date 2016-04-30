
var express = require('express');
var fs = require('fs');
var TAFFY = require('taffy');
// load json file with db
var myData = require('../db.json');

var jsondb = JSON.stringify(myData);
var db = TAFFY(''+jsondb);

var app = express();

app.get('/philae', function(request, response, next){

  db.insert(
    {
      "id": 2,
      "title": "first-trip",
      "locations": [
        {
          "time": "now",
          "latitud": "sur"
        }
      ]
    },
    function(err) {
      if(err){
        return next({message: 'failed to query db (insert)', status: 500});
      }
    }
  );
  console.log(db().get());

  try {
    fs.writeFileSync("db.json", JSON.stringify(db().get(), null, 4));
  }
  catch (err) {
    return next({message: 'failed to query db (Sync)', status: 500});
  }

  response.send(200);
});

app.get('/viewer', function(request, response) {

  // Show philae position tracking
  // Get info with json and send to view

  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(db().get(), null, 4));
});

app.listen(3000, function() {
  console.log('listen port 3000');
});
