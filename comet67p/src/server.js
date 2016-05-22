
var express = require('express');
var dataman = require('./dataman');

var app = express();

app.get('/philae', function(request, response, next){

  dataman.philae(
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
        return next({message: err, status: 500});
      }
    }
  );

  response.send(200);
});

app.get('/viewer', function(request, response) {

  // Show philae position tracking
  // Get info with json and send to view

  response.setHeader('Content-Type', 'application/json');

  dataman.viewer({}, function(err, data) {
    response.send(JSON.stringify(data, null, 4));
  });
});

app.listen(3000, function() {
  console.log('listen port 3000');
});
