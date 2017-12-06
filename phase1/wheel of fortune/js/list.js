$.ajax({
	url: './json/test.json',
	type: 'GET',
	data: {param1: 'value1'},
})
.done(function(r) {
	console.log(r);
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});