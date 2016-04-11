$( document ).ready(function() {
	$.ajax({
		type:"GET",
		url:"/apiposition",
		success: function(data) {
			$('.position').text(JSON.stringify(data));
		},
		dataType: 'jsonp',
	});
});