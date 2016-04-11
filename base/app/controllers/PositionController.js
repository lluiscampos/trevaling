var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Position = mongoose.model('position');

module.exports = function(app){
	app.use('/',router);
};

router.get('/viewposition',function(request, response, next){

	Position.find(function(err, position){
		if (err) return next(err);

		response.json({ position: position});

		response.render('index',{

			position: position
		});
	});
});