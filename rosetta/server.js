var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static( __dirname + '/public'))

app.get('/', function(request, response){

	response.sendFile('index.html')
});

app.listen(3000, function(){

	console.log('listen port 3000')
});