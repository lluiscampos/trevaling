
/* Create express application */
var express = require('express');
var app = express();

/* Load comet67p server and tracker */
var server  = require('./comet67p/src/server')
var tracker = require('./comet67p/src/tracker')

/* Start listening for philae events */
tracker.listen();

/* Load rosetta static web */
var www = express.static('rosetta/www');

/* Set and start application */
app.use('/', [server, www])
app.listen(8080, function() {
  console.log('Listening port 8080');
});
