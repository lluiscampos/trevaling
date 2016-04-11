$( document ).ready(function() {
	$.ajax({
		type:"GET",
		url:"/position.json",
		success: function(data) {
			$('.position').text(JSON.stringify(data));
		},
		dataType: 'json',
	});

});