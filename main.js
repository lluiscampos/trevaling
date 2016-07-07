
var server  = require('./comet67p/src/server')
var tracker = require('./comet67p/src/tracker')

server();
tracker.listen();
