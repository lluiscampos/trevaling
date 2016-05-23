
var app     = require('express')();

var dataman = require('./dataman');
dataman.init(function(err) {
  if (err)
  {
    throw new Error('Failed to initialize database: ' + err);
  }
});

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

app.listen(3000, function() {
  console.log('listen port 3000');
});
