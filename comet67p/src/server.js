
var express = require('express');
var dataman = require('./dataman');

var app = express();

app.get('/viewer', function(request, response) {
  dataman.viewer({}, function(err, data) {
    if (err) {
      response.status(500).send(err);
    }
    else {
      response.setHeader('Content-Type', 'application/json')
      response.send(JSON.stringify(data, null, 4));
    }
  });
});

app.listen(3000, function() {
  console.log('listen port 3000');
});
