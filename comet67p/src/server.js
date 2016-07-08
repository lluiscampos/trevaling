
var dataman = require('./dataman');
dataman.init();

var express = require('express');
var app = express.Router();
app.get('/viewer', function(request, response) {
  dataman.viewer({}, function(err, data) {
    if (err) {
      response.status(500).send(err);
    }
    else {
      response.json(data);
    }
  });
});

module.exports = app;
