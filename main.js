
/* Get settings from OpenShift */
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

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
app.listen(server_port, server_ip_address, function() {
  console.log('Listening port ' + server_port);
});
