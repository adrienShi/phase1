//初始红包启动
function fst_prize_start(){
    var fst_prize = $('#fst_prize');
    fst_prize.show();
    $('#fst_prize .btn').tap(function(){
        fst_prize.hide();

    });
    $('#fst_prize .close').tap(function(){
        fst_prize.hide();

    });
}

$(function(){
    fst_prize_start();
});

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