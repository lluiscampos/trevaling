
/* comet67p server and tracker */
var server  = require('./comet67p/src/server')
var tracker = require('./comet67p/src/tracker')

server();
tracker.listen();

/* rosetta static web */
var express = require('express');
var app = express();

app.use(express.static('rosetta/www'));
app.listen(8080, function() {
  console.log('[rosetta]  Listening port 8080');
});
