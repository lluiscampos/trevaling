var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {

	response.writeHead( 200, {'Content-Type': 'text/html'});
	switch(request.url){
	
		case '/':
			template = "index.html";
			break;
		
		case '/api':

			template = "api.html";
			break;
		
		default:

			template = "404.html";
			break;
	}

	fs.readFile("./templates/" + template, function(error, data){

		response.write(data);
		response.end();
	});


}).listen(3000,'localhost');

console.log('Server http://localhost:3000');