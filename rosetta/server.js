var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static( __dirname + '/public'))

app.get('/', function(request, response){

	response.sendFile('index.html')
});

app.get('/philae', function(request, response){

	// Is this you Philae?

		// Yes?
		// Connect with database and save position
		// No?
		// Send error message

	response.sendFile('index.html')
});

app.get('/viewer', function(request, response){

	// Show philae position tracking
	// Get info with json and send to view

	response.sendFile('index.html')
});

app.listen(3000, function(){

	console.log('listen port 3000')
});
