
var app     = require('express')();

var dataman = require('./dataman');
dataman.init();

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

var start = function()
{
  app.listen(3000, function() {
    console.log('[comet67p] Listening port 3000');
  });
}

module.exports = start;
