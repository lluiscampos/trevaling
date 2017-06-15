
var logger = require('./logger').server;

var dataman = require('./dataman');
dataman.init();

var express = require('express');
var app = express.Router();

logger.info("initializing server");

app.get('/viewer', function(request, response) {
  dataman.viewer({}, function(err, data) {
    if (err) {
      response.status(500).send(err);
    }
    else {
      logger.silly('serving trip');
      var first_trip = data[0]
      response.json(first_trip);
    }
  });
});

module.exports = app;
